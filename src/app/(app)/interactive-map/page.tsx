import { PageHeader } from "@/components/page-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapView } from "@/components/map-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InteractiveMapPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <PageHeader
        title="Interactive Monastery Map"
        description="Discover the locations of Sikkim's spiritual centers and plan your journey."
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="major" defaultChecked />
                <Label htmlFor="major">Major Monasteries</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ancient" />
                <Label htmlFor="ancient">Ancient Sites</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="offbeat" />
                <Label htmlFor="offbeat">Offbeat Locations</Label>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <MapView />
        </div>
      </div>
    </div>
  );
}
