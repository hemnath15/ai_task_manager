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
  const [viewTask, setViewTask] = useState<Task | null>(null);
const [editTask, setEditTask] = useState<Task | null>(null);

const [editTitle, setEditTitle] = useState("");
const [editPriority, setEditPriority] = useState<"low" | "medium" | "high">("low");
const [editDueDate, setEditDueDate] = useState("");
const openEdit = (task: Task) => {
  setEditTask(task);
  setEditTitle(task.title);
  setEditPriority(task.priority);
  setEditDueDate(
      task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
    );
};

const saveEdit = async () => {
  if (!editTask) return;

  await updateTaskAPI(editTask._id, {
    title: editTitle,
    priority: editPriority,
    dueDate: editDueDate,
  });

  setEditTask(null);
  refresh();
};

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
const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null)
const toggleStatus = async (task: Task) => {
  setLoadingTaskId(task._id);

  try {
    await updateTaskAPI(task._id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    await refresh();
  } finally {
    setLoadingTaskId(null);
  }
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
            <th>Due Date</th>
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
<td>
  {t.dueDate
    ? new Date(t.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-"}
</td>
              <td className="actions">
                  <button onClick={() => setViewTask(t)}>View</button>

  <button onClick={() => openEdit(t)}>Edit</button>
                <button
  className="status-btn"
  onClick={() => toggleStatus(t)}
  disabled={loadingTaskId === t._id}
>
  {loadingTaskId === t._id ? (
    <span className="spinner" />
  ) : t.status === "pending" ? (
    "Mark Completed"
  ) : (
    "Mark Pending"
  )}
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
    {viewTask && (
  <div className="view-backdrop">
    <div className="view">
      <h3>View Task</h3>

      <p><strong>Title:</strong> {viewTask.title}</p>

      {/* Priority + Status Row */}
      <div className="meta-row">
        <div>
          <span className="label">Priority</span>
          <span className={`badge ${viewTask.priority}`}>
            {viewTask.priority}
          </span>
        </div>
         <div>
          <span className="label">dueDate</span>
          <span className={`badge ${viewTask.priority}`}>
            {viewTask.dueDate}
          </span>
         </div>
        <div>
          <span className="label">Status</span>
          <span className={`badge ${viewTask.status}`}>
            {viewTask.status}
          </span>
        </div>
      </div>

      {/* Description Box */}
      <div className="description-box">
        <span className="label">Description</span>
        <p>{viewTask.description || "No description provided"}</p>
      </div>

      <button onClick={() => setViewTask(null)}>Close</button>
    </div>
  </div>
)}

{editTask && (
  <div className="edit-backdrop">
    <div className="edit">
      <h3>Edit Task</h3>

      {/* Title */}
      <div className="form-group">
        <label>Title</label>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>

      {/* Priority + Due Date */}
      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select
            value={editPriority}
            onChange={(e) =>
              setEditPriority(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="edit-actions">
        <button className="primary" onClick={saveEdit}>
          Save Changes
        </button>
        <button className="danger" onClick={() => setEditTask(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TaskList;
