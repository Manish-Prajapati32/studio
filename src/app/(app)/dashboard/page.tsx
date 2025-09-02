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

      <div>
        <h2 className="mb-6 font-headline text-3xl font-bold text-primary">
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
    </div>
  );
}
