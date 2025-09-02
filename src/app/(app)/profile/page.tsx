import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <PageHeader
        title="Your Profile"
        description="View and manage your profile information."
      />
      <Card className="mt-8">
        <CardHeader className="items-center text-center">
          <Avatar className="size-24">
            <AvatarImage src="https://picsum.photos/100" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="pt-4 text-3xl">Visitor</CardTitle>
          <CardDescription>visitor@example.com</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2 text-center text-sm text-muted-foreground">
            <p>This is a placeholder profile page.</p>
            <p>
              In a real application, you would be able to edit your name, email,
              and other settings here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
