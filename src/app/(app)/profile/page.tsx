
"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User, signOut, deleteUser } from "firebase/auth";
import { db, app } from "@/lib/firebase";
import { Loader2, Save, Search, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { BookingChart } from "@/components/booking-chart";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { BookingListItem } from "@/components/booking-list-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

const bookings = [
    {
        tourName: "Wine Tasting in Tuscany",
        username: "sgxmrbibek",
        email: "aryalb652@gmail.com",
        date: "2027-05-16",
        imageUrl: "https://picsum.photos/100/100?random=1"
    },
    {
        tourName: "Wine Tasting in Tuscany",
        username: "dddd",
        email: "dddd@gmail.com",
        date: "2024-12-02",
        imageUrl: "https://picsum.photos/100/100?random=2"
    },
    {
        tourName: "European Adventure",
        username: "triveni",
        email: "tiru.1310k@gmail.com",
        date: "2024-06-20",
        imageUrl: "https://picsum.photos/100/100?random=3"
    }
]


export default function UserProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
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
          const profile = {
            name: currentUser.displayName || "New User",
            email: currentUser.email || "",
            phone: currentUser.phoneNumber || "",
            address: "karnataka, india"
          };
          setUserProfile(profile);
          form.reset(profile);
        }
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [form, router]);
  
  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push("/login");
    } catch (error) {
      toast({ title: "Error", description: "Failed to log out. Please try again.", variant: "destructive" });
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!user) return;
    const auth = getAuth(app);
    
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      toast({ title: "Account Deleted", description: "Your account has been permanently deleted." });
      router.push("/signup");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast({ title: "Error", description: `Failed to delete account: ${error.message}`, variant: "destructive" });
    }
  };


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

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
      <div className="col-span-1 flex flex-col gap-4">
        <Card>
          <CardContent className="p-4">
            <Avatar className="w-full h-auto rounded-lg mb-4">
              <AvatarImage src="https://picsum.photos/300/300" alt={userProfile?.name} />
              <AvatarFallback>{userProfile?.name?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-lg">Details</p>
              <hr className="my-2"/>
              <div className="flex justify-between gap-2">
                <Button variant="destructive" onClick={handleLogout}>Log-out</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                      <AlertDialogDescription>
                        Update your personal information here.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
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
                                <Input type="email" placeholder="Your email address" {...field} readOnly />
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
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Your address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Button type="submit" disabled={!form.formState.isDirty || isSaving}>
                            {isSaving ? (
                              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                            ) : (
                              <><Save className="mr-2 h-4 w-4" />Save Changes</>
                            )}
                          </Button>
                        </AlertDialogFooter>
                      </form>
                    </Form>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4">
                <h3 className="text-xl font-bold">Hi {userProfile?.name}!</h3>
                <p className="text-sm text-muted-foreground">Email: {userProfile?.email}</p>
                <p className="text-sm text-muted-foreground">Phone: {userProfile?.phone}</p>
                <p className="text-sm text-muted-foreground">Address: {userProfile?.address}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="text-destructive p-0 h-auto mt-4">Delete account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-3">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="add-packages">Add Packages</TabsTrigger>
            <TabsTrigger value="all-packages">All Packages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="ratings">Ratings/Reviews</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                    <div className="relative w-full max-w-sm">
                        <Input placeholder="Search Username or Email" className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Bookings</h3>
                <div className="w-full h-[200px]">
                    <BookingChart />
                </div>
                <div className="mt-4 space-y-2">
                   {bookings.map((booking, index) => (
                       <BookingListItem key={index} booking={booking} />
                   ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>History</CardTitle>
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

    