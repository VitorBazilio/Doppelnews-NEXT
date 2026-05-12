type DashboardCardProps = {
  label: string;
  value: number | string;
};

export default function DashboardCard({ label, value }: DashboardCardProps) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
