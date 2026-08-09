export function formatDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const diff = end - start;
  
  if (Number.isNaN(diff) || diff < 0) return "0ms";
  
  if (diff < 1000) {
    return `${diff}ms`;
  }
  
  const seconds = diff / 1000;
  if (seconds < 60) {
    return `${Number(seconds.toFixed(1))}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}
