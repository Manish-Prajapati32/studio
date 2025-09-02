"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { time: "15 sec ago", bookings: 11500 },
  { time: "38 sec ago", bookings: 1000 },
  { time: "1 min ago", bookings: 8000 },
  { time: "2 min ago", bookings: 2500 },
  { time: "1 week ago", bookings: 3000 },
  { time: "1 month ago", bookings: 3000 },
  { time: "1 month ago ", bookings: 3000 },
]

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))",
  },
}

export function BookingChart() {
  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="bookings" fill="var(--color-bookings)" radius={4} />
        </BarChart>
      </ChartContainer>
  )
}
