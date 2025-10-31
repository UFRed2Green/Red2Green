/**
 * Date formatting utilities
 */
export function formatTradeDate(dateString: string): string {
  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}
