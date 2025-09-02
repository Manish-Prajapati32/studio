// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An AI tour planner that suggests optimal monastery visiting routes in Sikkim based on user location and preferences.
 *
 * - aiTourPlanner - A function that suggests monastery routes based on user preferences.
 * - AiTourPlannerInput - The input type for the aiTourPlanner function.
 * - AiTourPlannerOutput - The return type for the aiTourPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTourPlannerInputSchema = z.object({
  userLocation: z
    .string()
    .describe('The current location of the user (e.g., "Gangtok, Sikkim").'),
  preferences: z
    .string()
    .describe(
      'The user\u2019s preferences for the tour (e.g., "interested in historical monasteries, photography spots, and less crowded places").'
    ),
  duration: z
    .string()
    .describe(
      'The duration of the tour in days (e.g., "3 days"). Include the unit in the string.'
    ),
});
export type AiTourPlannerInput = z.infer<typeof AiTourPlannerInputSchema>;

const AiTourPlannerOutputSchema = z.object({
  routeSuggestion: z
    .string()
    .describe(
      'A detailed route suggestion including a list of monasteries to visit in order, along with estimated travel times and activity suggestions at each location.'
    ),
});
export type AiTourPlannerOutput = z.infer<typeof AiTourPlannerOutputSchema>;

export async function aiTourPlanner(input: AiTourPlannerInput): Promise<AiTourPlannerOutput> {
  return aiTourPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTourPlannerPrompt',
  input: {schema: AiTourPlannerInputSchema},
  output: {schema: AiTourPlannerOutputSchema},
  prompt: `You are an expert travel guide specializing in Sikkim monasteries.

You will use the user's location, preferences, and duration to suggest an optimal monastery visiting route in Sikkim.

User Location: {{{userLocation}}}
Preferences: {{{preferences}}}
Duration: {{{duration}}}

Consider travel times between monasteries and suggest activities at each location.

Output the route suggestion in a well-structured and readable format.
`,
});

const aiTourPlannerFlow = ai.defineFlow(
  {
    name: 'aiTourPlannerFlow',
    inputSchema: AiTourPlannerInputSchema,
    outputSchema: AiTourPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
