"use client"

import { useTheme } from '@mui/material/styles';
import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import * as S from './style';

interface RevenuePoint {
  month: number;
  reference: string;
  total: number;
  year: number;
}

interface RevenueAreaChartProps {
  data: RevenuePoint[];
  title?: string;
}

export function RevenueAreaChart({ data, title = "Faturamento Mensal" }: RevenueAreaChartProps) {
  const theme = useTheme();

  const mainColor = theme.palette.success.main;
  const gridColor = theme.palette.divider;
  const textColor = theme.palette.text.secondary;
  const tooltipBg = theme.palette.background.paper;

  const formatMonth = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
  };

  return (
    <S.ChartContainer>
      <S.ChartHeader>
        <S.ChartTitle>{title}</S.ChartTitle>
      </S.ChartHeader>
      
      <S.ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="month"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatMonth}
              dy={10}
            />
            
            <YAxis
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `R$ ${val}`}
            />
            
            <Tooltip
              formatter={(value: any) => [
                new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(value), 
                "Receita"
              ]}
              labelFormatter={(label) => `Mês: ${formatMonth(label)}`}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${gridColor}`,
                borderRadius: '8px',
                color: theme.palette.text.primary,
              }}
            />
            
            <Area
              type="monotone"
              dataKey="total"
              stroke={mainColor}
              strokeWidth={3}
              fill="url(#revenueGradient)"
              animationDuration={1500}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </S.ChartContent>
    </S.ChartContainer>
  );
}