import "../styles/aiinsights.css";
type Props = {
  insights: string;
  loading: boolean;
};

const AIInsightsCard = ({ insights, loading }: Props) => {
  return (
    <div className="ai-card">
      <h3>AI Task Insights</h3>

      {loading ? (
        <p>Analyzing your tasks...</p>
      ) : (
        <p style={{ whiteSpace: "pre-line" }}>{insights}</p>
      )}
    </div>
  );
};

export default AIInsightsCard;
