'use server';

/**
 * @fileOverview A flow to optimize website content based on user prompts.
 *
 * - optimizeWebsiteContent - A function that handles the content optimization process.
 * - OptimizeWebsiteContentInput - The input type for the optimizeWebsiteContent function.
 * - OptimizeWebsiteContentOutput - The return type for the optimizeWebsiteContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeWebsiteContentInputSchema = z.object({
  content: z.string().describe('The website content to be optimized.'),
  prompt: z.string().describe('The prompt for optimizing the content.'),
});
export type OptimizeWebsiteContentInput = z.infer<typeof OptimizeWebsiteContentInputSchema>;

const OptimizeWebsiteContentOutputSchema = z.object({
  optimizedContent: z.string().describe('The optimized website content.'),
});
export type OptimizeWebsiteContentOutput = z.infer<typeof OptimizeWebsiteContentOutputSchema>;

export async function optimizeWebsiteContent(input: OptimizeWebsiteContentInput): Promise<OptimizeWebsiteContentOutput> {
  return optimizeWebsiteContentFlow(input);
}

const optimizeWebsiteContentPrompt = ai.definePrompt({
  name: 'optimizeWebsiteContentPrompt',
  input: {schema: OptimizeWebsiteContentInputSchema},
  output: {schema: OptimizeWebsiteContentOutputSchema},
  prompt: `Optimize the following website content based on the user prompt.\n\nUser Prompt: {{{prompt}}}\n\nWebsite Content: {{{content}}}`,
});

const optimizeWebsiteContentFlow = ai.defineFlow(
  {
    name: 'optimizeWebsiteContentFlow',
    inputSchema: OptimizeWebsiteContentInputSchema,
    outputSchema: OptimizeWebsiteContentOutputSchema,
  },
  async input => {
    const {output} = await optimizeWebsiteContentPrompt(input);
    return output!;
  }
);
