"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Wand2 } from "lucide-react";
import { aiTourPlanner, AiTourPlannerOutput } from "@/ai/flows/ai-tour-planner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  userLocation: z.string().min(1, "Current location is required."),
  preferences: z.string().min(1, "Please tell us your preferences."),
  duration: z.string().min(1, "Tour duration is required."),
});

export default function TourPlannerPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AiTourPlannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userLocation: "Gangtok, Sikkim",
      preferences: "Interested in historical monasteries, photography spots, and less crowded places.",
      duration: "3 days",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const res = await aiTourPlanner(values);
        setResult(res);
      } catch (e) {
        setError("An error occurred while planning the tour. Please try again.");
      }
    });
  }

  return (
    <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <PageHeader
          title="AI Tour Planner"
          description="Let our AI craft the perfect monastery tour for you based on your interests and schedule."
        />
        <Card className="mt-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Starting Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Gangtok, Sikkim" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 days" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what you'd like to see and do..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Planning...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Plan My Tour
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Your Custom Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {result ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <pre className="whitespace-pre-wrap font-body text-base">
                  {result.routeSuggestion}
                </pre>
              </div>
            ) : (
              !isPending && (
                <p className="text-muted-foreground">
                  Your personalized tour plan will appear here. Fill out the form
                  and let our AI work its magic!
                </p>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
