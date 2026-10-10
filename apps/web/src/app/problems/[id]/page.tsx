"use client";

import { useState } from "react";
import { 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageSquare, 
  Clock, 
  Share2, 
  MoreHorizontal, 
  CheckCircle2, 
  Trophy, 
  Github,
  ChevronDown,
  ChevronUp,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

// Mock data for problem detail
const MOCK_PROBLEM = {
  id: "1",
  title: "How to handle state synchronization between multiple browser tabs in a real-time React app?",
  description: `I'm building a real-time collaborative dashboard where users can have multiple tabs open. When one tab updates (e.g., a notification is read, or a project status changes), I need all other tabs to reflect that change immediately.

### Requirements:
- Real-time updates across tabs
- No full page reload
- Minimize server polling if possible
- Should work in modern browsers (Chrome, Firefox, Safari)

I've considered **LocalStorage events** and **Broadcast Channel API**, but I'm not sure which one is more robust for a production app. Has anyone implemented this at scale?`,
  author: {
    username: "tech_guru",
    image: null,
    karma: 1250,
  },
  isAnonymous: false,
  meTooCount: 145,
  solutionCount: 3,
  status: "OPEN",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  tags: [
    { name: "react", category: "coding", slug: "react" },
    { name: "frontend", category: "coding", slug: "frontend" },
    { name: "real-time", category: "coding", slug: "real-time" },
  ],
  contextRepo: {
    name: "react-tab-sync-demo",
    owner: "tech_guru",
    description: "A small reproduction of the synchronization issue.",
    stars: 12,
    forks: 2,
    language: "TypeScript",
  }
};

const MOCK_SOLUTIONS = [
  {
    id: "s1",
    content: `The **Broadcast Channel API** is definitely the modern way to go. It's specifically designed for this use case and is more efficient than LocalStorage events.

\`\`\`javascript
const bc = new BroadcastChannel('app_state_sync');

// To send a message
bc.postMessage({ type: 'UPDATE_STATUS', id: 123 });

// To receive
bc.onmessage = (event) => {
  console.log('Received update:', event.data);
};
\`\`\`

It has great support in modern browsers. For Safari versions < 15.4, you might need a polyfill or fallback to LocalStorage.`,
    author: {
      username: "browser_wiz",
      image: null,
    },
    upvoteCount: 45,
    downvoteCount: 2,
    isAccepted: true,
    isCommunityFav: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
  },
  {
    id: "s2",
    content: `If you're already using a library like **TanStack Query** (React Query), you can actually leverage its multi-tab synchronization feature which uses the Broadcast Channel API under the hood if configured.

This way you don't have to manage the low-level events yourself. Just invalidate the query in one tab, and the others will refetch automatically.`,
    author: {
      username: "query_master",
      image: null,
    },
    upvoteCount: 62,
    downvoteCount: 1,
    isAccepted: false,
    isCommunityFav: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  }
];

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [solutionSort, setSolutionSort] = useState("top");

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Problem Section */}
      <article className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="flex">
          {/* Vote Sidebar (Reddit Style) */}
          <div className="w-12 bg-muted/20 flex flex-col items-center py-4 gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-500/10 hover:text-orange-500">
              <ArrowBigUp className="h-7 w-7" />
            </Button>
            <span className="text-sm font-bold">{MOCK_PROBLEM.meTooCount}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500">
              <ArrowBigDown className="h-7 w-7" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Avatar className="h-5 w-5">
                <AvatarImage src="" />
                <AvatarFallback>{MOCK_PROBLEM.author.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <Link href={`/u/${MOCK_PROBLEM.author.username}`} className="font-semibold text-foreground hover:underline">
                u/{MOCK_PROBLEM.author.username}
              </Link>
              <span>•</span>
              <span>{formatDistanceToNow(MOCK_PROBLEM.createdAt)} ago</span>
              {MOCK_PROBLEM.status === "SOLVED" && (
                <Badge variant="outline" className="ml-auto bg-green-500/10 text-green-600 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Solved
                </Badge>
              )}
            </div>

            <h1 className="text-2xl font-bold leading-tight">{MOCK_PROBLEM.title}</h1>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{MOCK_PROBLEM.description}</ReactMarkdown>
            </div>

            <div className="flex flex-wrap gap-2">
              {MOCK_PROBLEM.tags.map((tag) => (
                <Badge key={tag.slug} variant="secondary" className="rounded-full px-3">
                  #{tag.name}
                </Badge>
              ))}
            </div>

            {MOCK_PROBLEM.contextRepo && (
              <Card className="bg-muted/30 border-dashed shadow-none">
                <CardHeader className="py-3 px-4 flex flex-row items-center gap-3 space-y-0">
                  <Github className="h-5 w-5" />
                  <div className="flex-1">
                    <CardTitle className="text-sm font-semibold">
                      {MOCK_PROBLEM.contextRepo.owner} / {MOCK_PROBLEM.contextRepo.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{MOCK_PROBLEM.contextRepo.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank">View Repo</a>
                  </Button>
                </CardHeader>
              </Card>
            )}

            <div className="flex items-center gap-4 pt-2">
              <Button variant="secondary" size="sm" className="gap-2 bg-orange-500 text-white hover:bg-orange-600">
                <ArrowBigUp className="h-4 w-4" />
                Me Too
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {MOCK_PROBLEM.solutionCount} Solutions
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Submit Solution Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold px-1">Submit a solution</h2>
        <Card className="shadow-none">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea 
                  placeholder="What's your solution? Support markdown and code blocks..." 
                  className="min-h-[150px] focus-visible:ring-primary"
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    Attach Repo
                  </Button>
                  <Button size="sm" className="gap-2 px-6">
                    <Send className="h-4 w-4" />
                    Submit Solution
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Solutions List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold">Solutions</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase font-bold">Sort by:</span>
            <select 
              className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
              value={solutionSort}
              onChange={(e) => setSolutionSort(e.target.value)}
            >
              <option value="top">Top Voted</option>
              <option value="new">Newest</option>
              <option value="accepted">Accepted First</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SolutionCard({ solution }: { solution: any }) {
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);

  return (
    <Card className="shadow-none group border-muted">
      <div className="flex">
        {/* Vote Sidebar */}
        <div className="w-12 flex flex-col items-center py-4 gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-500/10 hover:text-orange-500">
            <ArrowBigUp className={`h-7 w-7 ${solution.isCommunityFav ? "text-orange-500" : ""}`} />
          </Button>
          <span className="text-sm font-bold">{solution.upvoteCount - solution.downvoteCount}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500">
            <ArrowBigDown className="h-7 w-7" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <Link href={`/u/${solution.author.username}`} className="font-semibold hover:underline">
              u/{solution.author.username}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{formatDistanceToNow(solution.createdAt)} ago</span>
            
            <div className="ml-auto flex gap-2">
              {solution.isAccepted && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Accepted
                </Badge>
              )}
              {solution.isCommunityFav && (
                <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-none gap-1">
                  <Trophy className="h-3 w-3" />
                  Community Fav
                </Badge>
              )}
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{solution.content}</ReactMarkdown>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 gap-2 text-muted-foreground"
              onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">12 Comments</span>
              {isCommentsExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Share</span>
            </Button>
          </div>

          {isCommentsExpanded && (
            <div className="pt-2 pl-4 border-l-2 border-muted space-y-4">
              <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted/30 p-2 rounded-md">
                  <p className="text-xs font-semibold mb-1">u/random_user</p>
                  <p className="text-sm">Great point about the polyfill! I used the one from NPM and it worked like a charm.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
