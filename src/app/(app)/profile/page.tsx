
"use client";

import { useState } from "react";
import { Loader2, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const profileSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;


const staticUserProfile = {
  name: "Sikkim Explorer",
  email: "demo@sikkimserenity.com",
  phone: "123-456-7890",
  address: "Gangtok, Sikkim",
};


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
  const [userProfile, setUserProfile] = useState(staticUserProfile);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile,
  });

  const onSubmit = async (values: ProfileFormValues) => {
    // In a real app, you'd save this. Here we just update the state.
    setUserProfile(values);
    form.reset(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
      <div className="col-span-1 flex flex-col gap-4">
        <Card>
          <CardContent className="p-4">
            <Avatar className="w-full h-auto rounded-lg mb-4 aspect-square">
              <AvatarImage src="https://picsum.photos/300/300" alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-lg">Details</p>
              <hr className="my-2"/>
              <div className="flex justify-center gap-2">
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
                          <Button type="submit" disabled={!form.formState.isDirty}>
                              <Save className="mr-2 h-4 w-4" />Save Changes
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
                <h3 className="text-xl font-bold">Hi {userProfile.name}!</h3>
                <p className="text-sm text-muted-foreground truncate">Email: {userProfile.email}</p>
                <p className="text-sm text-muted-foreground">Phone: {userProfile.phone || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">Address: {userProfile.address || 'N/A'}</p>
            </CardContent>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-3">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7">
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
                <div className="w-full h-[300px]">
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
           <TabsContent value="add-packages">
                <p>Add Packages Content</p>
           </TabsContent>
            <TabsContent value="all-packages">
                <p>All Packages Content</p>
            </TabsContent>
            <TabsContent value="users">
                <p>Users Content</p>
            </TabsContent>
            <TabsContent value="payments">
                <p>Payments Content</p>
            </TabsContent>
            <TabsContent value="ratings">
                <p>Ratings Content</p>
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
