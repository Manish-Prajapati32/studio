
"use client";

import Image from "next/image";
import { Button } from "./ui/button";

interface Booking {
    tourName: string;
    username: string;
    email: string;
    date: string;
    imageUrl: string;
}

interface BookingListItemProps {
    booking: Booking;
}

export function BookingListItem({ booking }: BookingListItemProps) {
    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-4">
                <Image src={booking.imageUrl} alt={booking.tourName} width={40} height={40} className="rounded-md" />
                <div className="grid grid-cols-4 gap-4 items-center w-full">
                    <span className="col-span-1">{booking.tourName}</span>
                    <span className="col-span-1">{booking.username}</span>
                    <span className="col-span-1 text-muted-foreground">{booking.email}</span>
                    <span className="col-span-1 text-muted-foreground">{booking.date}</span>
                </div>
            </div>
            <Button variant="destructive" size="sm">Cancel</Button>
        </div>
    );
}

    