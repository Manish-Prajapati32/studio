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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

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

const carouselImages = [
  {
    src: "https://picsum.photos/1600/600?random=1",
    alt: "Sikkim Monastery",
    aiHint: "sikkim monastery",
    title: "Sikkim Serenity",
    description: "Discover the timeless beauty and spiritual heritage of Sikkim's monasteries.",
  },
  {
    src: "https://picsum.photos/1600/600?random=2",
    alt: "Himalayan Landscape",
    aiHint: "himalayan landscape",
    title: "Himalayan Majesty",
    description: "Explore the breathtaking landscapes of the Himalayas.",
  },
  {
    src: "https://picsum.photos/1600/600?random=3",
    alt: "Tsomgo Lake",
    aiHint: "tsomgo lake",
    title: "Tsomgo Lake",
    description: "Visit the stunning glacial Tsomgo Lake.",
  },
  {
    src: "https://picsum.photos/1600/600?random=4",
    alt: "Pelling Skywalk",
    aiHint: "pelling skywalk",
    title: "Pelling Skywalk",
    description: "Walk amongst the clouds on the Pelling Skywalk.",
  },
  {
    src: "https://picsum.photos/1600/600?random=5",
    alt: "Tea Gardens",
    aiHint: "tea gardens",
    title: "Lush Tea Gardens",
    description: "Stroll through the verdant tea gardens of Sikkim.",
  },
]

export default function DashboardPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col gap-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.aiHint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h1 className="font-headline text-5xl font-bold drop-shadow-lg md:text-7xl">
                    {image.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-lg text-primary-foreground/90 drop-shadow-md">
                    {image.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex transform-gpu flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader className="flex-row items-center gap-4">
              <feature.icon className="size-8 text-accent" />
              <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
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
  );
}
