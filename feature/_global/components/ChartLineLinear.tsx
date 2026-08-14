"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useTransactionAnalytics } from "@/hooks/useTransactions";
import { formatRupiah } from "@/feature/dashboard/helpers/formatRupuah";

const chartConfig = {
  desktop: {
    label: "Pendapatan",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function ChartLineLinear() {
  const { data, isLoading } = useTransactionAnalytics();
  const chartData = data?.chartData || [];
  const totalRevenue = data?.totalRevenue || 0;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-bold text-lg">PENDAPATAN</CardTitle>
        <span className="text-base font-bold text-green-600">
          {formatRupiah(totalRevenue)}
        </span>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500 py-10 text-center">Memuat grafik pendapatan...</p>
        ) : (
          <ChartContainer config={chartConfig} className="h-72 w-full px-2">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="linear"
                stroke="#2563eb"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
