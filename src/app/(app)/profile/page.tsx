"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().max(160, "Bio cannot be longer than 160 characters.").optional(),
  preferences: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const initialProfileData: ProfileFormValues = {
  name: "Visitor",
  email: "visitor@example.com",
  bio: "Eager to explore the serene monasteries of Sikkim and capture its beauty.",
  preferences: "Historical sites, authentic local food, and nature photography.",
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState(initialProfileData);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    setProfileData(data);
    form.reset(data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader
        title="Your Profile"
        description="View and manage your profile information."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="relative">
                  <Avatar className="size-24">
                    <AvatarImage src="https://picsum.photos/100" alt="User" />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full"
                  >
                    <Camera className="size-4" />
                    <span className="sr-only">Change photo</span>
                  </Button>
                </div>
                <div className="flex-1">
                  <CardTitle>Edit Your Profile</CardTitle>
                  <CardDescription>
                    Update your personal details and travel preferences.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Interested in photography, meditation, local cuisine..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit">Save Changes</Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
