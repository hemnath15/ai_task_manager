type StatsCardProps = {
  title: string;
  value: number;
  color: "purple" | "green" | "yellow" | "blue";
  subtitle?: string;
};

const StatsCard = ({ title, value, color, subtitle }: StatsCardProps) => {
  return (
    <div className={`stat-card ${color}`}>
      <p>{title}</p>
      <h3>{value}</h3>
      {subtitle && <span className="trend">{subtitle}</span>}
    </div>
  );
};

export default StatsCard;
