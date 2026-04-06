"use client"

import { useTheme } from '@mui/material/styles';
import {
  Area,
  AreaChart as AreaChartRecharts,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import * as S from './style';

interface ChartData {
  label: string;
  value: number;
}

interface MonthlyAreaChartProps {
  title: string;
  data: ChartData[];
  dataKeyName?: string;
  unit?: string;
  color?: string; 
}

export function AreaChart({
  title,
  data,
  dataKeyName = "Valor",
  unit = "",
  color
}: MonthlyAreaChartProps) {
  const theme = useTheme();

  const mainColor = color || theme.palette.primary.main;
  const gridColor = theme.palette.divider;
  const textColor = theme.palette.text.secondary;
  const tooltipBg = theme.palette.background.paper;

  return (
    <S.ChartContainer>
      <S.ChartHeader>
        <S.ChartTitle>{title}</S.ChartTitle>
      </S.ChartHeader>
      
      <S.ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChartRecharts data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={mainColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={mainColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            
            <XAxis
              dataKey="label"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            
            <YAxis
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}${unit}`}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${gridColor}`,
                borderRadius: '8px',
                color: theme.palette.text.primary,
              }}
              itemStyle={{ color: mainColor }}
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke={mainColor}
              strokeWidth={3}
              fill="url(#colorGradient)"
              name={dataKeyName}
              animationDuration={1500}
            />
          </AreaChartRecharts>
        </ResponsiveContainer>
      </S.ChartContent>
    </S.ChartContainer>
  );
}