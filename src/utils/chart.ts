export const formatMonth = (month: number) => {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ]
  return months[month - 1]
}

export const mapRevenueChart = (revenueChart: any[]) => {
  return revenueChart.map((item) => ({
    label: formatMonth(item.month),
    value: item.total,
  }))
}