"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Languages, Loader2 } from "lucide-react";
import {
  multiLanguageAudioGuideNarration,
  MultiLanguageAudioGuideNarrationOutput,
} from "@/ai/flows/multi-language-audio-guide-narration";
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
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const availableLanguages = [
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "de", label: "German" },
  { id: "hi", label: "Hindi" },
];

const formSchema = z.object({
  text: z.string().min(10, "Please enter at least 10 characters of text to narrate."),
  languages: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one language.",
  }),
});

export default function AudioGuidePage() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<MultiLanguageAudioGuideNarrationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "Welcome to the Rumtek Monastery, a place of peace and spiritual learning. This monastery is one of the most significant in Sikkim.",
      languages: ["en"],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setResults(null);
    startTransition(async () => {
      try {
        const res = await multiLanguageAudioGuideNarration(values);
        setResults(res);
      } catch (e) {
        setError("An error occurred while generating audio. Please try again.");
      }
    });
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader
        title="Multi-language Audio Guide"
        description="Create accessible audio narrations for your guides in various languages instantly."
      />

      <Card className="mt-8">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Narration Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the text you want to convert to audio..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languages"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Select Languages</FormLabel>
                      <FormDescription>
                        Choose the languages for audio generation.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {availableLanguages.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="languages"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Languages className="mr-2 h-4 w-4" />
                    Generate Audio
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && <p className="mt-4 text-destructive">{error}</p>}

      {results && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Generated Audio Guides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(results).map(([lang, audioData]) => (
              <div key={lang}>
                <h3 className="mb-2 font-semibold">
                  {availableLanguages.find(l => l.id === lang)?.label || lang.toUpperCase()}
                </h3>
                <audio controls src={audioData} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
