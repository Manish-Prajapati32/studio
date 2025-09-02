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
import { BookingChart } from "@/components/booking-chart";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 flex flex-col gap-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="https://picsum.photos/100" alt={userProfile?.name} />
              <AvatarFallback>{userProfile?.name?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{userProfile?.name}</h2>
            <p className="text-muted-foreground">{userProfile?.email}</p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="destructive">Logout</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          rows={3}
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
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                    ) : (
                      <><Save className="mr-2 h-4 w-4" />Save Changes</>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleSuggestPreferences} disabled={isSuggesting}>
                    {isSuggesting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>
                    ) : (
                      <><Wand2 className="mr-2 h-4 w-4" />Suggest</>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Bookings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Bookings
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    +1 since last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Spent
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,250</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bookings Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BookingChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  A log of your recent bookings and activities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/100" alt="Avatar" />
                    <AvatarFallback>YL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Pelling Tour</p>
                    <p className="text-sm text-muted-foreground">Booked on 2023-10-22</p>
                  </div>
                  <div className="ml-auto font-medium">-$250.00</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="https://picsum.photos/101" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Gangtok Homestay</p>
                    <p className="text-sm text-muted-foreground">Booked on 2023-10-15</p>
                  </div>
                  <div className="ml-auto font-medium">-$150.00</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
