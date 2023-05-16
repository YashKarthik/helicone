import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { clsx } from "../../shared/clsx";

export function MultilineRenderLineChart<T>({
  data,
  timeMap,
  valueFormatter,
  className,
}: {
  data: {
    [key in keyof T]: any;
  } & {
    time: Date;
  }[];
  timeMap: (date: Date) => string;
  valueFormatter?: (value: ValueType) => string | string[];
  className?: string;
}) {
  const chartData = data.map((d) => ({
    ...d,
    time: timeMap(d.time),
  }));
  return (
    <div className={clsx("w-full h-full", className)}>
      <ResponsiveContainer className={"w-full h-full"}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} opacity={50} strokeOpacity={0.5} />
          {chartData &&
            chartData.length > 0 &&
            Object.keys(chartData[0])
              .filter((key) => key !== "time")
              .map((key, i) => (
                <Line
                  type="monotone"
                  dot={false}
                  dataKey={key}
                  stroke={`hsl(${
                    (i * 360) / (Object.keys(chartData[0]).length - 1)
                  }, 100%, 50%)`}
                  strokeWidth={1.5}
                  animationDuration={0}
                  key={`line-${i}`}
                />
              ))}

          <XAxis
            dataKey="time"
            style={{
              fontSize: "0.85rem",
            }}
          />
          <YAxis
            style={{
              fontSize: "0.85rem",
            }}
          />
          <Tooltip
            formatter={(value) =>
              valueFormatter ? valueFormatter(value) : value
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}