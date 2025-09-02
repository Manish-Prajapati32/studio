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
      <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl shadow-2xl">
        <Image
          src="https://picsum.photos/1600/600"
          alt="Sikkim panoramic view"
          fill
          className="object-cover"
          data-ai-hint="sikkim monastery"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-5xl font-bold drop-shadow-lg md:text-7xl">
            Sikkim Serenity
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-primary-foreground/90 drop-shadow-md">
            Discover the timeless beauty and spiritual heritage of Sikkim&apos;s monasteries.
          </p>
        </div>
      </div>

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
