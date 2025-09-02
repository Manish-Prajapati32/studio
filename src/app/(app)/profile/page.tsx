"use client";

import { useState, useEffect } from "react";
import { BarChart, User, LogOut, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookingChart } from "@/components/booking-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const profileData = {
  name: "Visitor",
  email: "visitor@example.com",
  phone: "123-456-7890",
  address: "Sikkim, India",
  avatar: "https://picsum.photos/100",
};

const bookings = [
  {
    name: "Wine Tasting in Tuscany",
    user: "sgxmrbibek",
    email: "aryalb652@gmail.com",
    date: "2027-05-16",
    image: "https://picsum.photos/40/40?random=1",
    aiHint: "wine tasting",
  },
  {
    name: "Wine Tasting in Tuscany",
    user: "dddd",
    email: "dddd@gmail.com",
    date: "2024-12-02",
    image: "https://picsum.photos/40/40?random=2",
    aiHint: "tuscany landscape",
  },
  {
    name: "European Adventure",
    user: "triveni",
    email: "tiru.1310k@gmail.com",
    date: "2024-06-20",
    image: "https://picsum.photos/40/40?random=3",
    aiHint: "european city",
  },
];

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <aside className="col-span-1 flex flex-col gap-8">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Avatar className="size-24">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback>
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </CardContent>
          <Separator />
          <CardContent className="p-6">
            <h3 className="mb-2 font-semibold">Details</h3>
            <div className="flex justify-between gap-4">
              <Button variant="outline" className="w-full border-red-500 text-red-500 hover:border-red-600 hover:text-red-600">
                <LogOut className="mr-2" /> Log-out
              </Button>
              <Button className="w-full">
                <Edit className="mr-2" /> Edit Profile
              </Button>
            </div>
            <Separator className="my-6" />
            <div>
              <h2 className="text-2xl font-bold">Hi {profileData.name}!</h2>
              <p className="text-muted-foreground">Email: {profileData.email}</p>
              <p className="text-muted-foreground">Phone: {profileData.phone}</p>
              <p className="text-muted-foreground">Address: {profileData.address}</p>
            </div>
            <Separator className="my-6" />
            <Button variant="link" className="text-destructive p-0 h-auto">
              <Trash2 className="mr-2" /> Delete account
            </Button>
          </CardContent>
        </Card>
      </aside>

      <main className="col-span-1 md:col-span-2">
        <Tabs defaultValue="bookings">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="packages">All Packages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Bookings</CardTitle>
                  <Input
                    placeholder="Search Username or Email"
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <BookingChart />
                <div className="mt-8">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, index) => (
                        <TableRow key={index}>
                          <TableCell className="flex items-center gap-2">
                            <Avatar className="hidden size-8 sm:flex">
                              <AvatarImage src={booking.image} alt={booking.name} data-ai-hint={booking.aiHint}/>
                            </Avatar>
                            <span>{booking.name}</span>
                          </TableCell>
                          <TableCell>{booking.user}</TableCell>
                          <TableCell>{booking.email}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>All Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Package management will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p>User management will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Booking history will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
