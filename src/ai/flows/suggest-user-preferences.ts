
'use server';

/**
 * @fileOverview AI-powered travel preference suggestion flow.
 *
 * - suggestUserPreferences - A function that suggests travel preferences based on user profile.
 * - SuggestUserPreferencesInput - The input type for the suggestUserPreferences function.
 * - SuggestUserPreferencesOutput - The return type for the suggestUserPreferences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUserPreferencesInputSchema = z.object({
  userProfile: z.object({
    name: z.string().describe("The user's name."),
    email: z.string().describe("The user's email."),
    phone: z.string().optional().describe("The user's phone number."),
  }),
  currentPreferences: z.string().optional().describe('The current travel preferences of the user.'),
});
export type SuggestUserPreferencesInput = z.infer<typeof SuggestUserPreferencesInputSchema>;

const SuggestUserPreferencesOutputSchema = z.object({
  suggestedPreferences: z.string().describe('A paragraph of suggested travel preferences, tailored to a traveler interested in Sikkim monasteries.'),
});
export type SuggestUserPreferencesOutput = z.infer<typeof SuggestUserPreferencesOutputSchema>;

export async function suggestUserPreferences(input: SuggestUserPreferencesInput): Promise<SuggestUserPreferencesOutput> {
  return suggestUserPreferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUserPreferencesPrompt',
  input: {schema: SuggestUserPreferencesInputSchema},
  output: {schema: SuggestUserPreferencesOutputSchema},
  prompt: `You are a helpful travel assistant for a tourist visiting Sikkim.
Your goal is to suggest personalized travel preferences for the user based on their profile.
The user is interested in visiting monasteries in Sikkim.

User's Name: {{{userProfile.name}}}
{{#if userProfile.email}}User's Email: {{{userProfile.email}}}{{/if}}
{{#if currentPreferences}}Current Preferences: {{{currentPreferences}}}{{/if}}

Based on this information, generate a new, enhanced paragraph of travel preferences.
The preferences should be exciting and relevant to Sikkim tourism, focusing on monasteries, culture, nature, and adventure.
If the user has existing preferences, build upon them. If not, create a good starting point.

Example output:
"Passionate about exploring historical monasteries and their unique art forms. Keen on trekking to remote spiritual sites for photography opportunities. Also interested in experiencing local Sikkimese culture, cuisine, and attending traditional festivals if possible."
`,
});

const suggestUserPreferencesFlow = ai.defineFlow(
  {
    name: 'suggestUserPreferencesFlow',
    inputSchema: SuggestUserPreferencesInputSchema,
    outputSchema: SuggestUserPreferencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
