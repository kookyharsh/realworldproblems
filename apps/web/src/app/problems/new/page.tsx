"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  PlusCircle, 
  Github, 
  Eye, 
  Send, 
  Info,
  CheckCircle2,
  Copy,
  Lock
} from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(300, "Title must be under 300 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  tags: z.string().optional(), // In a real app, this would be a multi-select component
  isAnonymous: z.boolean().default(false),
  githubRepoId: z.string().optional(),
});

export default function NewProblemPage() {
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [anonToken, setAnonToken] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      isAnonymous: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate submission
    if (values.isAnonymous) {
      setAnonToken("rwp_anon_1234567890abcdefghijklmnopqrstuvwxyz");
    }
    setIsSubmitted(true);
    toast.success("Problem posted successfully!");
  }

  const titleValue = form.watch("title");

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Problem Posted Successfully!</CardTitle>
            <CardDescription>Your problem is now live and the community can start solving it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {anonToken ? (
              <div className="bg-white border-2 border-dashed border-orange-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2 text-orange-700 font-bold">
                  <Lock className="h-5 w-5" />
                  IMPORTANT: Save your management token
                </div>
                <p className="text-sm text-muted-foreground">
                  Since you posted anonymously, this token is the <strong>only way</strong> to manage your post (edit, delete, or mark solutions as accepted).
                </p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-muted p-3 rounded font-mono text-xs break-all">
                    {anonToken}
                  </code>
                  <Button variant="outline" size="icon" onClick={() => {
                    navigator.clipboard.writeText(anonToken);
                    toast.success("Token copied to clipboard!");
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-orange-50 p-3 rounded-md text-xs text-orange-800 flex gap-2">
                  <Info className="h-4 w-4 shrink-0" />
                  Lost tokens cannot be recovered. Save it now!
                </div>
              </div>
            ) : null}

            <div className="flex gap-4">
              <Button className="flex-1" asChild>
                <Link href="/">Back to Feed</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/problems/1">View Your Problem</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Post a Problem</h1>
        <p className="text-muted-foreground mt-2">
          Describe the challenge you're facing. The world will work together to solve it.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-none">
            <CardContent className="p-6 space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-end">
                      <FormLabel className="text-base">Title</FormLabel>
                      <span className={`text-[10px] font-medium ${titleValue.length > 250 ? "text-orange-500" : "text-muted-foreground"}`}>
                        {titleValue.length}/300
                      </span>
                    </div>
                    <FormControl>
                      <Input 
                        placeholder="What is the problem you're facing? Be specific." 
                        {...field} 
                        className="text-lg font-semibold h-12"
                      />
                    </FormControl>
                    <FormDescription>
                      Think of this as your problem's headline. Maximum 300 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel className="text-base">Description</FormLabel>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-2"
                        onClick={() => setIsPreview(!isPreview)}
                      >
                        <Eye className="h-4 w-4" />
                        {isPreview ? "Edit" : "Preview"}
                      </Button>
                    </div>
                    <FormControl>
                      {isPreview ? (
                        <div className="min-h-[300px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>{field.value || "*No description yet*"}</ReactMarkdown>
                        </div>
                      ) : (
                        <Textarea 
                          placeholder="Describe your problem in detail. Use markdown for better formatting." 
                          className="min-h-[300px] font-mono text-sm leading-relaxed"
                          {...field} 
                        />
                      )}
                    </FormControl>
                    <FormDescription>
                      Explain the context, what you've tried, and what the ideal outcome looks like.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Tags Field (Simplified) */}
                <div className="space-y-3">
                  <FormLabel className="text-base">Tags</FormLabel>
                  <Input placeholder="e.g. react, nodejs, startup" />
                  <p className="text-xs text-muted-foreground">Add up to 5 tags to categorize your problem.</p>
                </div>

                {/* GitHub Repo Field */}
                <div className="space-y-3">
                  <FormLabel className="text-base">GitHub Context Repo (Optional)</FormLabel>
                  <Button variant="outline" className="w-full justify-start gap-3 h-10 border-dashed" type="button">
                    <Github className="h-5 w-5" />
                    Connect a repository
                  </Button>
                  <p className="text-xs text-muted-foreground">Provide a code context for better solutions.</p>
                </div>
              </div>

              <Separator />

              {/* Anonymous Toggle */}
              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/10">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-bold cursor-pointer">
                        Post Anonymously
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Your username will not be associated with this problem. You will receive a unique token to manage it.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4">
            <Button variant="ghost" type="button" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" className="px-10 gap-2">
              <Send className="h-4 w-4" />
              Post Problem
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
