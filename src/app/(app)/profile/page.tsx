
"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db, app } from "@/lib/firebase";
import { Loader2, Save, Wand2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import {
  suggestUserPreferences,
  SuggestUserPreferencesInput,
  SuggestUserPreferencesOutput,
} from "@/ai/flows/suggest-user-preferences";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  preferences: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  preferences?: string;
}

export default function UserProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useTransition();
  const [isSuggesting, setIsSuggesting] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferences: "",
    },
  });

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const profile = docSnap.data() as UserProfile;
          setUserProfile(profile);
          form.reset(profile);
        } else {
          // If no profile exists, use basic info from auth
          const profile = {
            name: currentUser.displayName || "New User",
            email: currentUser.email || "",
          };
          setUserProfile(profile);
          form.reset(profile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    setIsSaving(async () => {
      try {
        await setDoc(doc(db, "users", user.uid), values, { merge: true });
        setUserProfile(values);
        form.reset(values); // This resets the 'dirty' state
        toast({
          title: "Success",
          description: "Your profile has been saved.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save your profile. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleSuggestPreferences = async () => {
    const currentValues = form.getValues();
    const input: SuggestUserPreferencesInput = {
      currentPreferences: currentValues.preferences || "",
      userProfile: {
        name: currentValues.name,
        email: currentValues.email,
        phone: currentValues.phone || "",
      },
    };

    setIsSuggesting(async () => {
      try {
        const result: SuggestUserPreferencesOutput = await suggestUserPreferences(input);
        form.setValue("preferences", result.suggestedPreferences, { shouldDirty: true });
        toast({
          title: "Suggestions Added",
          description: "AI-powered suggestions have been added to your preferences.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get AI suggestions. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl">
        <PageHeader title="User Profile" description="Manage your profile information." />
        <Card className="mt-8">
          <CardHeader>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl text-center">
         <PageHeader title="Access Denied" description="Please sign in to view your profile." />
         <Button asChild className="mt-4">
            <Link href="/login">Sign In</Link>
         </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <PageHeader
        title="User Profile"
        description="Manage your profile information and preferences."
      />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>
            Update your personal details and travel preferences below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
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
                        placeholder="e.g., Interested in photography, trekking, and local cuisine."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                 <Button type="submit" disabled={!form.formState.isDirty || isSaving}>
                   {isSaving ? (
                     <>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Saving...
                     </>
                   ) : (
                     <>
                       <Save className="mr-2 h-4 w-4" />
                       Save Changes
                     </>
                   )}
                 </Button>
                 <Button type="button" variant="outline" onClick={handleSuggestPreferences} disabled={isSuggesting}>
                   {isSuggesting ? (
                     <>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Generating...
                     </>
                   ) : (
                     <>
                      <Wand2 className="mr-2 h-4 w-4" />
                       Suggest Preferences
                     </>
                   )}
                 </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
