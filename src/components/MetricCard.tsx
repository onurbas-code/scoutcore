type MetricCardProps = {
  title: string;
  value: string;
  detail: string;
};

export default function MetricCard({ title, value, detail }: MetricCardProps) {
  return (
    <div className="metricCard">
      <span>{title}</span>
      <strong>{value}</strong>
      <em>{detail}</em>
    </div>
  );
}
