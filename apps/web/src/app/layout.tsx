import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";
import Link from "next/link";
import { Home, TrendingUp, HelpCircle, Tag, Trophy, PlusCircle, Users, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RWP — RealWorldProblems",
  description: "A community-driven platform where anyone can post real-world problems and the community works together to solve them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh bg-background`}>
        <Providers>
          <div className="relative flex min-h-svh flex-col">
            <Header />
            <div className="flex-1">
              <div className="container max-w-screen-2xl mx-auto px-4 py-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr_300px] gap-6">
                  {/* Left Sidebar */}
                  <aside className="hidden md:flex flex-col gap-4">
                    <nav className="flex flex-col gap-1">
                      <SidebarLink href="/" icon={<Home className="h-4 w-4" />} label="Home" active />
                      <SidebarLink href="/top" icon={<TrendingUp className="h-4 w-4" />} label="Top" />
                      <SidebarLink href="/unsolved" icon={<HelpCircle className="h-4 w-4" />} label="Unsolved" />
                      <SidebarLink href="/tags" icon={<Tag className="h-4 w-4" />} label="Tags" />
                      <SidebarLink href="/leaderboard" icon={<Trophy className="h-4 w-4" />} label="Leaderboard" />
                    </nav>
                    
                    <Separator />
                    
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Resources
                    </div>
                    <nav className="flex flex-col gap-1">
                      <SidebarLink href="/about" label="About RWP" />
                      <SidebarLink href="/guidelines" label="Community Guidelines" />
                      <SidebarLink href="/help" label="Help Center" />
                    </nav>
                  </aside>

                  {/* Main Content Area */}
                  <main className="min-w-0 w-full overflow-hidden">
                    {children}
                  </main>

                  {/* Right Sidebar */}
                  <aside className="hidden lg:flex flex-col gap-6">
                    {/* CTA Section */}
                    <Card className="bg-primary/5 border-primary/20 shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Have a problem?</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Post it anonymously or with your profile. The community will help you find a solution.
                        </p>
                        <Button className="w-full gap-2" asChild>
                          <Link href="/problems/new">
                            <PlusCircle className="h-4 w-4" />
                            Post a Problem
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Stats Section */}
                    <Card className="shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Community Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4" />
                            Problems
                          </div>
                          <span className="text-sm font-semibold">1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            Solutions
                          </div>
                          <span className="text-sm font-semibold">5,678</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            Users
                          </div>
                          <span className="text-sm font-semibold">910</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Tags Section */}
                    <Card className="shadow-none">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Top Tags</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#javascript</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#react</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#business</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#design</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#python</Badge>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">#marketing</Badge>
                        <Link href="/tags" className="text-xs text-primary hover:underline mt-1 w-full text-center">
                          View all tags
                        </Link>
                      </CardContent>
                    </Card>

                    <footer className="text-[10px] text-muted-foreground px-2">
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                        <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
                      </div>
                      <p>© 2026 RealWorldProblems. All rights reserved.</p>
                    </footer>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label, active = false }: { href: string; icon?: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
