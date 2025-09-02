"use client";

import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Archive,
  ArrowRight,
  Bot,
  CalendarDays,
  Globe,
  Languages,
  Map,
  Search,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    src: "https://picsum.photos/1600/900?random=1",
    alt: "Sikkim panoramic view",
    aiHint: "sikkim monastery",
  },
  {
    src: "https://picsum.photos/1600/900?random=2",
    alt: "Lush green valley in Sikkim",
    aiHint: "sikkim valley",
  },
  {
    src: "https://picsum.photos/1600/900?random=3",
    alt: "Snow-capped mountains in Sikkim",
    aiHint: "sikkim mountains",
  },
  {
    src: "https://picsum.photos/1600/900?random=10",
    alt: "Sikkim lake mountains",
    aiHint: "sikkim lake mountains",
  },
  {
    src: "https://picsum.photos/1600/900?random=11",
    alt: "Winding road mountains",
    aiHint: "winding road mountains",
  },
  {
    src: "https://picsum.photos/1600/900?random=12",
    alt: "Buddha statue park",
    aiHint: "buddha statue park",
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

const tourPackages = [
  {
    title: "North Sikkim Tour Package",
    image: "https://picsum.photos/600/400?random=10",
    aiHint: "sikkim lake mountains",
    duration: "4 Night 5 Days",
    covering: "Lachen, Lachung, Yumthang, Gurudongmar Lake, Gangtok",
    cost: "Starting from Rs 9800/-",
  },
  {
    title: "East Sikkim Tour (Silk Route)",
    image: "https://picsum.photos/600/400?random=11",
    aiHint: "winding road mountains",
    duration: "4 Night 5 Days",
    covering: "Reshikhola, Aritar, Zuluk, Padamchen, Nathang",
    cost: "Starting from Rs 7500/-",
  },
  {
    title: "Pelling Ravangla Trip",
    image: "https://picsum.photos/600/400?random=12",
    aiHint: "buddha statue park",
    duration: "4 Night 5 Days",
    covering: "Pelling, Ravangla, Namchi, Buddha Park, Temi Tea Garden",
    cost: "Starting from Rs 9000/-",
  },
];

const otherOffers = [
  {
    title: "Sikkim Treks",
    description: "The Sikkim trek is a once-in-a-lifetime trek allowing a sublime discovery of the unparalleled beauty",
    image: "https://picsum.photos/600/400?random=13",
    aiHint: "mountain trekking",
  },
  {
    title: "Sikkim Honeymoon packages",
    description: "The secretive seclusion offered by Sikkim made it one of our top choices to offer",
    image: "https://picsum.photos/600/400?random=14",
    aiHint: "couple sunset",
  },
  {
    title: "Adventure Activities in Sikkim",
    description: "You are free to unleash your daredevil side with our range of exciting and thrilling",
    image: "https://picsum.photos/600/400?random=15",
    aiHint: "river rafting",
  },
  {
    title: "Nearby Tour packages",
    description: "Our nearby Sikkim tour packages are crafted with great care to explore the unparalleled beauty",
    image: "https://picsum.photos/600/400?random=16",
    aiHint: "train station",
  },
]

const adventureActivities = [
    {
      name: "Trekking in Sikkim",
      image: "https://picsum.photos/600/400?random=17",
      aiHint: "mountain trekking snow"
    },
    {
      name: "Camping in Sikkim",
      image: "https://picsum.photos/600/400?random=18",
      aiHint: "tent night sky"
    },
    {
      name: "Rafting in Sikkim",
      image: "https://picsum.photos/600/400?random=19",
      aiHint: "river rafting group"
    },
  ];

const whyBookWithUs = [
  "Our aim is not just to guarantee locations, but we believe in giving a delightful, spectacular journey and experience to all our customers. Hence, we vouch for the utmost customer satisfaction.",
  "Our travel experience and good knowledge of the place make us a trustworthy tour operator. We are also respected in this arena for our calibre in exhibiting the finer aspects of tourism in Sikkim. With us, you will have the chance to experience Sikkim's raw beauty and its finest side.",
  "We have curated the entire tour by fusing the local specialists in Sikkim, allowing our customers to immerse in Sikkim's rich heritage and the vibrancy of its culture.",
];


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 2000 })]}
          className="h-full w-full"
        >
          <CarouselContent className="h-full">
            {carouselImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="-z-10 object-cover"
                    data-ai-hint={img.aiHint}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 transform" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 transform" />
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center text-white">
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
      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-primary">Sikkim Tour Packages</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            You are heartily welcome to embark on the excellent Sikkim tour package which will unveil the true beauty of Sikkim in its raw form, with some exhilarating sights of the mighty alpine forests, the marvels of ancient architectural designs on the Buddhist monasteries and the elegance of the panoramic views of the mighty mountain ranges, exhibiting unmatched beauty.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((pkg) => (
            <Card key={pkg.title} className="overflow-hidden bg-card transition-shadow hover:shadow-xl">
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-headline text-center">{pkg.title}</CardTitle>
                <div className="w-24 h-0.5 bg-primary mx-auto" />
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={pkg.aiHint}
                  />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CalendarDays className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span><b>Duration:</b> {pkg.duration}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Map className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span><b>Covering:</b> {pkg.covering}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Wallet className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span><b>Cost:</b> {pkg.cost}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

       <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-primary">Other Interesting Offers in our Tourism Package</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            This once-in-a-lifetime tour needs to be captivating to ensure the experience is etched in our minds. We are here to curate exclusive tours for you with some enticing offers to have a blissful experience of the unique and rich culture of the region. We assure you that we will make this trip an unforgettable one to Sikkim with all the added comforts and amenities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherOffers.map((offer) => (
            <Card key={offer.title} className="flex flex-col overflow-hidden bg-card transition-shadow hover:shadow-xl">
               <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    data-ai-hint={offer.aiHint}
                  />
                </div>
              <CardHeader>
                <CardTitle className="text-xl font-headline">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {offer.description} <Link href="#" className="text-destructive font-semibold">Read More</Link>
                </p>
              </CardContent>
              <CardFooter>
                 <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-primary">Adventure Tourism in Sikkim</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            The thrills of the trekking routes can be enjoyed once you join us in our action-packed activities. We promise to help you experience adventurous trekking in Sikkim on the trails, the pulsating river rafting to give you that sudden adrenaline rush and the wondrous landscapes of the Himalayas, making it a remarkable memory. Escaping into these wonders will need you to plan your trip to Sikkim with us. Places of such adventurous activities include Goecha La Trek, Varsey Nature Trail, Dzongri Trek, Maenam Peak Trek, Phoktey Dara Trek, Teesta Triveni Camping and Rafting and Singalila Top with Phalut Trek.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventureActivities.map((activity) => (
            <Card key={activity.name} className="relative overflow-hidden rounded-lg group">
              <Image 
                src={activity.image} 
                alt={activity.name} 
                width={600} 
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={activity.aiHint}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-headline text-2xl font-bold text-yellow-400 drop-shadow-lg">{activity.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl font-bold text-primary">Why book Sikkim Tourism with Us?</h2>
        </div>
        <ul className="space-y-6 max-w-4xl mx-auto">
          {whyBookWithUs.map((reason, index) => (
            <li key={index} className="flex items-start gap-4">
              <ArrowRight className="size-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">{reason}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
