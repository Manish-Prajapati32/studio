import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="container mx-auto flex h-[70vh] flex-col items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Log Out</CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button variant="destructive">Log Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
