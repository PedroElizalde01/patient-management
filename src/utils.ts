export function formatDate(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 30) {
    if (days <= 0) {
      return 'today';
    }
    return `${days}d ago`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo ago`;
  }
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}
