'use server';

/**
 * @fileOverview Implements the Multi-language Audio Guide Narration feature.
 *
 * - multiLanguageAudioGuideNarration - A function that translates text to audio in multiple languages.
 * - MultiLanguageAudioGuideNarrationInput - The input type for the multiLanguageAudioGuideNarration function.
 * - MultiLanguageAudioGuideNarrationOutput - The return type for the multiLanguageAudioGuideNarration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const MultiLanguageAudioGuideNarrationInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  languages: z
    .array(z.string())
    .describe('An array of language codes to generate audio for (e.g., [\"en\", \"es\", \"fr\"]).'),
});
export type MultiLanguageAudioGuideNarrationInput =
  z.infer<typeof MultiLanguageAudioGuideNarrationInputSchema>;

const MultiLanguageAudioGuideNarrationOutputSchema = z.record(
  z.string(),
  z.string().describe('Base64 encoded WAV audio data for each language.')
);
export type MultiLanguageAudioGuideNarrationOutput =
  z.infer<typeof MultiLanguageAudioGuideNarrationOutputSchema>;

export async function multiLanguageAudioGuideNarration(
  input: MultiLanguageAudioGuideNarrationInput
): Promise<MultiLanguageAudioGuideNarrationOutput> {
  return multiLanguageAudioGuideNarrationFlow(input);
}

const multiLanguageAudioGuideNarrationFlow = ai.defineFlow(
  {
    name: 'multiLanguageAudioGuideNarrationFlow',
    inputSchema: MultiLanguageAudioGuideNarrationInputSchema,
    outputSchema: MultiLanguageAudioGuideNarrationOutputSchema,
  },
  async input => {
    const audioData: MultiLanguageAudioGuideNarrationOutput = {};

    for (const language of input.languages) {
      const prompt = `Translate the following text to ${language} and generate audio for it:\n\n${input.text}`;

      const {media} = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: language === 'en' ? 'Algenib' : 'Achernar',
              },
            },
          },
        },
        prompt: prompt,
      });

      if (!media) {
        throw new Error(`no media returned for ${language}`);
      }

      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );

      audioData[language] = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
    }

    return audioData;
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
