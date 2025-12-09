'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { optimizeWebsiteContent, type OptimizeWebsiteContentOutput } from '@/ai/flows/optimize-website-content';
import { Loader2 } from 'lucide-react';

const optimizeSchema = z.object({
  content: z.string().min(20, 'Content must be at least 20 characters long.'),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long.'),
});

export default function OptimizePage() {
  const { toast } = useToast();
  const [optimizedResult, setOptimizedResult] = useState<OptimizeWebsiteContentOutput | null>(null);

  const form = useForm<z.infer<typeof optimizeSchema>>({
    resolver: zodResolver(optimizeSchema),
    defaultValues: {
      content: '',
      prompt: 'Make the tone more professional and persuasive for companies in the Gulf region looking to hire manpower.',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof optimizeSchema>) {
    setOptimizedResult(null);
    try {
      const result = await optimizeWebsiteContent(values);
      setOptimizedResult(result);
      toast({
        title: 'Content Optimized!',
        description: 'The AI has generated an optimized version of your content.',
      });
    } catch (error) {
      console.error('Optimization failed:', error);
      toast({
        variant: 'destructive',
        title: 'Optimization Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }

  return (
    <div>
      <section className="relative bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
            AI Content Optimizer
          </h1>
          <p className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-muted-foreground">
            Use AI to improve and rewrite your website content. This page is for internal use.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Optimize Website Content</CardTitle>
              <CardDescription>
                Enter the content you wish to improve and provide a prompt for the AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste your existing website content here..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Optimization Prompt</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Make this sound more professional for Gulf-based companies"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Optimizing...' : 'Optimize with AI'}
                  </Button>
                </form>
              </Form>

              {optimizedResult && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-4 font-headline">Optimized Result</h3>
                  <Card className="bg-secondary">
                    <CardContent className="p-6">
                      <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                        {optimizedResult.optimizedContent}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
