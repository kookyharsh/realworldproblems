"use client";

import { useState } from "react";
import { 
  User as UserIcon, 
  Trophy, 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Github,
  Award,
  Clock,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitHubRepoCard } from "@/components/github-repo-card";
import Link from "next/link";
import { format } from "date-fns";

// Mock data for user profile
const MOCK_USER = {
  username: "tech_guru",
  name: "Alex Johnson",
  bio: "Full-stack developer passionate about real-time systems and collaborative tools. Always looking for hard problems to solve.",
  karma: 1250,
  tier: "Trusted Solver",
  avatar: null,
  createdAt: new Date(2025, 5, 15),
  expertise: ["React", "TypeScript", "Node.js", "PostgreSQL", "System Architecture"],
};

const MOCK_USER_PROBLEMS = [
  {
    id: "1",
    title: "How to handle state synchronization between multiple browser tabs in a real-time React app?",
    meTooCount: 145,
    solutionCount: 12,
    createdAt: "2d ago",
    status: "OPEN",
  }
];

const MOCK_USER_SOLUTIONS = [
  {
    id: "s1",
    problemId: "2",
    problemTitle: "Scaling a startup's customer support with zero budget",
    content: "My solution for scaling support involved building a custom Slack bot...",
    upvoteCount: 85,
    isAccepted: true,
    isCommunityFav: true,
    createdAt: "1w ago",
  }
];

const MOCK_USER_REPOS = [
  {
    owner: "tech_guru",
    name: "react-tab-sync-demo",
    description: "A small reproduction of the synchronization issue.",
    stars: 12,
    forks: 2,
    language: "TypeScript",
    status: "ACTIVE" as const,
    htmlUrl: "https://github.com/tech_guru/react-tab-sync-demo",
    lastPushedAt: "2d ago"
  }
];

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState("problems");

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Profile Header */}
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={MOCK_USER.avatar || ""} />
              <AvatarFallback className="text-4xl">{MOCK_USER.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{MOCK_USER.name}</h1>
                  <p className="text-muted-foreground text-lg">u/{MOCK_USER.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Share Profile
                  </Button>
                  <Button size="sm" className="gap-2">
                    Follow
                  </Button>
                </div>
              </div>

              <p className="text-base max-w-2xl">{MOCK_USER.bio}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-orange-500" />
                  <span className="font-bold text-foreground">{MOCK_USER.karma}</span> Karma
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 ml-1">
                    {MOCK_USER.tier}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {format(MOCK_USER.createdAt, "MMMM yyyy")}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {MOCK_USER.expertise.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content Tabs */}
      <Tabs defaultValue="problems" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8">
          <TabsTrigger 
            value="problems" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3"
          >
            Problems Posted
          </TabsTrigger>
          <TabsTrigger 
            value="solutions" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3"
          >
            Solutions Submitted
          </TabsTrigger>
          <TabsTrigger 
            value="repos" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-3"
          >
            GitHub Repos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="problems" className="pt-6">
          <div className="grid gap-4">
            {MOCK_USER_PROBLEMS.map((problem) => (
              <Card key={problem.id} className="shadow-none hover:bg-muted/30 transition-colors">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <Link href={`/problems/${problem.id}`} className="hover:underline">
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
                    </Link>
                    <Badge variant={problem.status === "SOLVED" ? "secondary" : "outline"}>
                      {problem.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {problem.meTooCount} Me Too
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {problem.solutionCount} Solutions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {problem.createdAt}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="solutions" className="pt-6">
          <div className="grid gap-4">
            {MOCK_USER_SOLUTIONS.map((solution) => (
              <Card key={solution.id} className="shadow-none border-l-4 border-l-primary/30">
                <CardHeader className="p-4 pb-2">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Solution for:</p>
                  <Link href={`/problems/${solution.problemId}`} className="hover:underline">
                    <CardTitle className="text-base text-primary">{solution.problemTitle}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <p className="text-sm line-clamp-3 text-muted-foreground">{solution.content}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 h-5 text-[10px]">
                      {solution.upvoteCount} Upvotes
                    </Badge>
                    {solution.isAccepted && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 h-5 text-[10px]">
                        Accepted
                      </Badge>
                    )}
                    {solution.isCommunityFav && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 h-5 text-[10px]">
                        Community Fav
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="repos" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_USER_REPOS.map((repo) => (
              <GitHubRepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
