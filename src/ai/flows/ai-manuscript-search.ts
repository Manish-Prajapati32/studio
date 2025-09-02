'use server';

/**
 * @fileOverview AI-powered manuscript search flow for the digital archives of Sikkim monasteries.
 *
 * - manuscriptSearch - A function that handles the manuscript search process.
 * - ManuscriptSearchInput - The input type for the manuscriptSearch function.
 * - ManuscriptSearchOutput - The return type for the manuscriptSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ManuscriptSearchInputSchema = z.object({
  query: z.string().describe('The search query to use for finding relevant manuscripts, murals, and documents.'),
});
export type ManuscriptSearchInput = z.infer<typeof ManuscriptSearchInputSchema>;

const ManuscriptSearchOutputSchema = z.object({
  results: z.array(
    z.object({
      title: z.string().describe('The title of the manuscript or document.'),
      description: z.string().describe('A brief summary of the manuscript or document.'),
      url: z.string().url().describe('The URL where the manuscript or document can be accessed.'),
      category: z.string().describe('The category or type of the manuscript or document (e.g., manuscript, mural, document).'),
    })
  ).describe('A list of search results matching the query.'),
});
export type ManuscriptSearchOutput = z.infer<typeof ManuscriptSearchOutputSchema>;

export async function manuscriptSearch(input: ManuscriptSearchInput): Promise<ManuscriptSearchOutput> {
  return manuscriptSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'manuscriptSearchPrompt',
  input: {schema: ManuscriptSearchInputSchema},
  output: {schema: ManuscriptSearchOutputSchema},
  prompt: `You are a digital archivist specializing in the manuscripts, murals, and documents from Sikkim monasteries.

You will use the provided search query to find relevant information in the digital archives.
Return a list of results, including the title, description, URL, and category of each item.

Search Query: {{{query}}}
`,
});

const manuscriptSearchFlow = ai.defineFlow(
  {
    name: 'manuscriptSearchFlow',
    inputSchema: ManuscriptSearchInputSchema,
    outputSchema: ManuscriptSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
