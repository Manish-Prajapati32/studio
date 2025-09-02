import Image from "next/image";
import { Pin, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tours = [
  {
    name: "Rumtek Monastery",
    location: "Near Gangtok",
    image: "https://picsum.photos/300/200?random=1",
    aiHint: "monastery exterior"
  },
  {
    name: "Pemayangtse Monastery",
    location: "Pelling",
    image: "https://picsum.photos/300/200?random=2",
    aiHint: "ancient monastery"
  },
  {
    name: "Tashiding Monastery",
    location: "West Sikkim",
    image: "https://picsum.photos/300/200?random=3",
    aiHint: "mountain monastery"
  },
];

const hotspots = [
  { top: "20%", left: "30%", label: "Main Shrine" },
  { top: "50%", left: "60%", label: "Ancient Murals" },
  { top: "75%", left: "25%", label: "Courtyard View" },
];

export default function VirtualToursPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <PageHeader
        title="360° Virtual Tours"
        description="Step inside Sikkim's most sacred monasteries from anywhere in the world."
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="relative aspect-video p-0">
              <Image
                src="https://picsum.photos/1280/720"
                alt="360 view of Rumtek Monastery"
                fill
                className="object-cover"
                data-ai-hint="monastery interior"
              />
              <TooltipProvider>
                {hotspots.map((hotspot) => (
                  <Tooltip key={hotspot.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute rounded-full shadow-lg"
                        style={{ top: hotspot.top, left: hotspot.left }}
                        aria-label={`Hotspot: ${hotspot.label}`}
                      >
                        <Pin className="text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{hotspot.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-headline text-2xl font-semibold">Available Tours</h2>
          {tours.map((tour) => (
            <Card key={tour.name} className="overflow-hidden">
              <div className="flex items-center">
                <div className="relative h-24 w-1/3 flex-shrink-0">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover"
                    data-ai-hint={tour.aiHint}
                  />
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="text-lg">{tour.name}</CardTitle>
                  <CardDescription>{tour.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <Button variant="ghost" size="icon">
                    <PlayCircle className="text-primary" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
