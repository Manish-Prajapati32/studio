"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const monasteries = [
  {
    key: "rumtek",
    name: "Rumtek Monastery",
    position: { lat: 27.288, lng: 88.5668 },
  },
  {
    key: "pemayangtse",
    name: "Pemayangtse Monastery",
    position: { lat: 27.3005, lng: 88.2575 },
  },
  {
    key: "tashiding",
    name: "Tashiding Monastery",
    position: { lat: 27.2711, lng: 88.2863 },
  },
  {
    key: "dubdi",
    name: "Dubdi Monastery",
    position: { lat: 27.3592, lng: 88.2192 },
  },
];

export function MapView() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selected, setSelected] = useState<string | null>(null);

  if (!apiKey) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Google Maps API Key Missing</AlertTitle>
        <AlertDescription>
          Please provide a Google Maps API key in your environment variables as
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to display the map.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Card>
        <CardContent className="p-0">
          <div style={{ height: "70vh", width: "100%" }}>
            <Map
              defaultCenter={{ lat: 27.533, lng: 88.5122 }}
              defaultZoom={9}
              mapId="sikkim_serenity_map"
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              {monasteries.map((monastery) => (
                <AdvancedMarker
                  key={monastery.key}
                  position={monastery.position}
                  onClick={() => setSelected(monastery.key)}
                >
                  <Pin
                    background={"hsl(var(--primary))"}
                    borderColor={"hsl(var(--primary-foreground))"}
                    glyphColor={"hsl(var(--primary-foreground))"}
                  />
                </AdvancedMarker>
              ))}

              {selected && (
                <InfoWindow
                  position={
                    monasteries.find((m) => m.key === selected)?.position
                  }
                  onCloseClick={() => setSelected(null)}
                >
                  <h3 className="font-bold">
                    {monasteries.find((m) => m.key === selected)?.name}
                  </h3>
                </InfoWindow>
              )}
            </Map>
          </div>
        </CardContent>
      </Card>
    </APIProvider>
  );
}
