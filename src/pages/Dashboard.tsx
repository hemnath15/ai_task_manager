import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import StatsCard from "../components/StatsCard";
import axios from "../services/axios";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: "high" | "medium" | "low";
  createdAt: string;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
const [aiInsights, setAiInsights] = useState("");
const [aiLoading, setAiLoading] = useState(true);
const fetchAIInsights = async () => {
  try {
    const res = await axios.get(
      "https://ai-task-manager-backend-clean.onrender.com/api/insights",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setAiInsights(res.data.insights);
  } catch (error) {
    console.error("Failed to load AI insights", error);
    setAiInsights("Unable to generate insights right now.");
  } finally {
    setAiLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
     fetchAIInsights();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://ai-task-manager-backend-clean.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status == "completed").length;
  const pending = tasks.filter(t => t.status == "pending").length;

  const progressPercent =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header">
          <h2>Track your Tasks</h2>
        </div>
        <span className="date">{new Date().toDateString()}</span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatsCard title="Total Tasks" value={total} color="purple" />

        <StatsCard title="Completed" value={completed} color="green" />

        <StatsCard title="Pending" value={pending} color="blue" />
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {/* Progress */}
        <div className="ai-card">
          {/* AI Insights */}
  <h4>AI Task Insights</h4>

  {aiLoading ? (
    <p>Analyzing your tasks...</p>
  ) : (
    <p style={{ whiteSpace: "pre-line" }}>
      {aiInsights}
    </p>
  )}
        </div>

        {/* Recent Tasks */}
        <div className="card">
          <div className="card-header">
            <h4>Recent Tasks</h4>
            <span>{total} total</span>
          </div>

          <ul className="task-list">
            {recentTasks.map(task => (
              <li key={task._id} className="task">
                <div>
                  <p className="title">{task.title}</p>
                  <span>
                    Created:{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className={`badge ${task.priority}`}>
                  {task.priority}
                </span>
              </li>
            ))}

            {recentTasks.length === 0 && (
              <p style={{ padding: "12px", color: "#64748b" }}>
                No tasks found
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
