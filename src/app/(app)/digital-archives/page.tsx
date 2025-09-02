"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Search } from "lucide-react";
import { manuscriptSearch, ManuscriptSearchOutput } from "@/ai/flows/ai-manuscript-search";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  query: z.string().min(3, "Search query must be at least 3 characters long."),
});

export default function DigitalArchivesPage() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<ManuscriptSearchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setResults(null);
    startTransition(async () => {
      try {
        const res = await manuscriptSearch(values);
        setResults(res);
      } catch (e) {
        setError("An error occurred during the search. Please try again.");
      }
    });
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader
        title="Digital Archives"
        description="Search through a vast collection of scanned manuscripts, murals, and historical documents from Sikkim's monasteries."
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex items-start gap-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="e.g., 'Lotus-Born Master scrolls'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && <p className="mt-4 text-destructive">{error}</p>}

      <div className="mt-8 space-y-6">
        {results && (
          <>
            {results.results.length === 0 ? (
              <p>No results found for your query.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {results.results.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{result.title}</CardTitle>
                        <Badge variant="secondary">{result.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{result.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          View Document
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
