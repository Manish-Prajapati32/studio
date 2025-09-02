
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function DemoLoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome</CardTitle>
        <CardDescription>
          This is a demonstration of the login and authentication flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          You can sign in with a traditional email and password or use Google for a quick and secure login.
        </p>
        <Button asChild>
          <Link href="/login">
            Proceed to Login <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
