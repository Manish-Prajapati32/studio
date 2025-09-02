import { cn } from "@/lib/utils";
import type React from "react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({
  title,
  description,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
