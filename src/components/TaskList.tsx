import { useState } from "react";
import {
  Task,
  deleteTaskAPI,
  updateTaskAPI,
} from "../features/tasks/taskAPI";
import "../styles/tasklist.css";

const TaskList = ({
  tasks,
  refresh,
}: {
  tasks: Task[];
  refresh: () => void;
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<"ALL" | "pending" | "completed">("ALL");

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "ALL" || task.status === status;

    return matchSearch && matchStatus;
  });

  const toggleStatus = async (task: Task) => {
    await updateTaskAPI(task._id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    refresh();
  };

  return (
    <div className="task-table-container">
      {/* Filters */}
      <div className="task-filters">
        <input
          placeholder="Search Task Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "ALL" | "pending" | "completed")
          }
        >
          <option value="ALL">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.priority}</td>
              <td>
                <span
                  className={`status ${
                    t.status === "completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {t.status.toUpperCase()}
                </span>
              </td>

              <td className="actions">
                <button onClick={() => toggleStatus(t)}>
                  {t.status === "pending"
                    ? "Mark Completed"
                    : "Mark Pending"}
                </button>

                <button
                  className="danger"
                  onClick={async () => {
                    await deleteTaskAPI(t._id);
                    refresh();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredTasks.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
