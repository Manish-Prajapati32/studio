"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Archive,
  ArrowRight,
  Bot,
  Globe,
  Languages,
  Map,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const features = [
  {
    icon: Globe,
    title: "360° Virtual Tours",
    description: "Experience immersive tours of Sikkim monasteries with interactive hotspots.",
    href: "/virtual-tours",
  },
  {
    icon: Map,
    title: "Interactive Map",
    description: "Discover monastery locations on an interactive map with filtering options.",
    href: "/interactive-map",
  },
  {
    icon: Archive,
    title: "Digital Archives",
    description: "Browse and search manuscripts, murals, and documents with AI-powered search.",
    href: "/digital-archives",
  },
  {
    icon: Bot,
    title: "AI Tour Planner",
    description: "Get optimal monastery visiting routes based on your preferences.",
    href: "/tour-planner",
  },
  {
    icon: Languages,
    title: "Audio Guides",
    description: "Listen to narrations in multiple languages for an accessible experience.",
    href: "/audio-guide",
  },
];

const touristPlaces = [
  {
    name: "Tsongmo Lake",
    image: "https://picsum.photos/600/400?random=4",
    aiHint: "snowy lake"
  },
  {
    name: "Yumthang Valley",
    image: "https://picsum.photos/600/400?random=5",
    aiHint: "flower valley"
  },
  {
    name: "Khecheopalri lake",
    image: "https://picsum.photos/600/400?random=6",
    aiHint: "sacred lake"
  },
  {
    name: "Tathagata Tsal",
    image: "https://picsum.photos/600/400?random=7",
    aiHint: "buddha park"
  },
  {
    name: "Gurudongmar Lake",
    image: "https://picsum.photos/600/400?random=8",
    aiHint: "high-altitude lake"
  },
  {
    name: "Triveni Camping",
    image: "https://picsum.photos/600/400?random=9",
    aiHint: "river camping"
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-black/50 shadow-2xl">
        <Image
          src="https://picsum.photos/1600/900?random=1"
          alt="Sikkim panoramic view"
          fill
          className="-z-10 object-cover"
          data-ai-hint="sikkim monastery"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="z-10 flex flex-col items-center gap-4 text-center text-white">
          <h1 className="font-headline text-5xl font-bold drop-shadow-lg md:text-7xl">
            The Travel Index
          </h1>
          <p className="max-w-2xl text-lg text-primary-foreground/90 drop-shadow-md">
            Make Your Travel Dream Come True With Our Amazing Packages
          </p>
          <div className="mt-4 flex w-full max-w-xl items-center gap-2 rounded-full bg-white/20 p-2 backdrop-blur-sm">
            <Input
              type="search"
              placeholder="Search for destinations, monasteries..."
              className="border-none bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="icon" className="flex-shrink-0 rounded-full">
              <Search />
            </Button>
          </div>
        </div>
      </div>

      <div className="py-8">
        <h2 className="mb-6 font-headline text-3xl font-bold text-primary text-center">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex transform-gpu flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="flex-row items-center gap-4">
                <feature.icon className="size-8 text-accent" />
                <CardTitle className="font-headline text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <CardDescription className="flex-1">
                  {feature.description}
                </CardDescription>
                <Button asChild className="mt-4 w-full">
                  <Link href={feature.href}>
                    Explore <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-primary">Sikkim Tourist Places</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            Tourism in Sikkim has experienced a boom in recent decades for its astounding views of the mighty Himalayas and the stunning adventures the tourists experience with their visits here. <Link href="#" className="text-destructive font-semibold">Read more .....</Link>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {touristPlaces.map((place) => (
            <Card key={place.name} className="relative overflow-hidden rounded-lg group">
              <Image 
                src={place.image} 
                alt={place.name} 
                width={600} 
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={place.aiHint}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-headline text-2xl font-bold text-white drop-shadow-lg">{place.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
