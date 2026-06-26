export function Badge({ children, type = "neutral" }: { children: React.ReactNode; type?: string }) {
  return <span className={`badge ${type}`}>{children}</span>;
}
