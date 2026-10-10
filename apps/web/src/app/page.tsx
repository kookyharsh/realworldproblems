"use client";

import { useState } from "react";
import { ArrowBigUp, MessageSquare, Clock, Share2, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data for initial UI
const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "How to handle state synchronization between multiple browser tabs in a real-time React app?",
    description: "I'm building a dashboard where users can have multiple tabs open. When one tab updates, I need the others to reflect that immediately without a full reload or constant polling.",
    author: "tech_guru",
    isAnonymous: false,
    meTooCount: 145,
    solutionCount: 12,
    status: "OPEN",
    createdAt: "2h ago",
    tags: ["react", "frontend", "real-time"],
  },
  {
    id: "2",
    title: "Scaling a startup's customer support with zero budget",
    description: "We're growing fast but don't have the funds for Zendesk or a dedicated team. How are others handling high volume support requests effectively?",
    author: "anonymous",
    isAnonymous: true,
    meTooCount: 89,
    solutionCount: 5,
    status: "SOLVED",
    createdAt: "5h ago",
    tags: ["business", "startup", "support"],
  },
  {
    id: "3",
    title: "Reducing Docker image size for Go applications",
    description: "My current images are over 800MB. I've tried multi-stage builds but still seeing huge layers. Any tips for getting them under 50MB?",
    author: "gopher_dev",
    isAnonymous: false,
    meTooCount: 230,
    solutionCount: 18,
    status: "OPEN",
    createdAt: "1d ago",
    tags: ["go", "docker", "devops"],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("hot");

  return (
    <div className="space-y-6">
      {/* Sort Tabs */}
      <div className="flex items-center justify-between border-b pb-2">
        <Tabs defaultValue="hot" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent h-auto p-0 gap-2">
            <TabsTrigger 
              value="hot" 
              className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Hot
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              New
            </TabsTrigger>
            <TabsTrigger 
              value="top" 
              className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Top
            </TabsTrigger>
            <TabsTrigger 
              value="unsolved" 
              className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              Unsolved
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {MOCK_PROBLEMS.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      <div className="flex justify-center py-8">
        <Button variant="outline" className="rounded-full px-8">
          Load More
        </Button>
      </div>
    </div>
  );
}

function ProblemCard({ problem }: { problem: any }) {
  return (
    <Card className="hover:bg-accent/5 transition-colors group border-none shadow-none border-b rounded-none pb-4">
      <CardContent className="p-0 flex gap-4">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-500/10 hover:text-orange-500 group-hover:opacity-100 opacity-70">
            <ArrowBigUp className="h-6 w-6" />
          </Button>
          <span className="text-sm font-bold">{problem.meTooCount}</span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase">Me Too</span>
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-2 pt-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {problem.isAnonymous ? (
              <span className="italic">Posted anonymously</span>
            ) : (
              <Link href={`/u/${problem.author}`} className="font-semibold text-foreground hover:underline">
                u/{problem.author}
              </Link>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {problem.createdAt}
            </div>
            {problem.status === "SOLVED" && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none h-5 px-1.5 gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Solved
              </Badge>
            )}
          </div>

          <Link href={`/problems/${problem.id}`} className="block">
            <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
              {problem.title}
            </h3>
          </Link>

          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="bg-muted/30 text-[10px] font-medium rounded-sm border-none">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-2 text-muted-foreground hover:bg-muted">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{problem.solutionCount} Solutions</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-2 text-muted-foreground hover:bg-muted">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
