"use client";

import { useState } from "react";
import { 
  Github, 
  Star, 
  GitFork, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  AlertCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

interface GitHubRepoCardProps {
  repo: {
    owner: string;
    name: string;
    description?: string | null;
    stars: number;
    forks: number;
    language?: string | null;
    lastCommitMsg?: string | null;
    lastPushedAt?: Date | string | null;
    readmeContent?: string | null;
    status: 'ACTIVE' | 'DEGRADED' | 'DELETED';
    htmlUrl: string;
  };
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`overflow-hidden shadow-none border ${repo.status === 'DEGRADED' ? 'border-orange-200 bg-orange-50/10' : ''}`}>
      <CardHeader className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <CardTitle className="text-sm font-bold hover:underline cursor-pointer">
              <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                {repo.owner} / {repo.name}
              </a>
            </CardTitle>
            {repo.status === 'DEGRADED' && (
              <Badge variant="outline" className="text-[10px] bg-orange-100 text-orange-700 border-orange-200 gap-1 h-5">
                <AlertCircle className="h-3 w-3" />
                Disconnected — last known data
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {repo.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {repo.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-muted-foreground font-medium">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              {repo.language}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks}
          </div>
          {repo.lastPushedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {formatDistanceToNow(new Date(repo.lastPushedAt))} ago
            </div>
          )}
        </div>

        {repo.lastCommitMsg && !isExpanded && (
          <div className="bg-muted/50 p-2 rounded text-[10px] font-mono truncate">
            Last commit: {repo.lastCommitMsg}
          </div>
        )}
      </CardHeader>

      {isExpanded && repo.readmeContent && (
        <CardContent className="p-4 pt-0 border-t bg-muted/20">
          <div className="prose prose-xs dark:prose-invert max-w-none mt-4 max-h-[400px] overflow-y-auto pr-2">
            <ReactMarkdown>{repo.readmeContent}</ReactMarkdown>
          </div>
        </CardContent>
      )}
      
      {isExpanded && !repo.readmeContent && (
        <CardContent className="p-8 text-center border-t bg-muted/20">
          <p className="text-xs text-muted-foreground italic">No README content available.</p>
        </CardContent>
      )}

      <div className="bg-muted/30 px-4 py-2 flex justify-end border-t">
        <Button variant="link" size="sm" className="h-auto p-0 text-[10px] gap-1" asChild>
          <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
            View on GitHub <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
