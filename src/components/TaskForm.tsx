import { useState } from "react";
import { createTaskAPI } from "../features/tasks/taskAPI";

const TaskForm = ({ refresh }: { refresh: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");

const submit = async () => {
  await createTaskAPI({ title, description, priority, dueDate });
  refresh();
  setTitle("");
  setDescription("");
  setPriority("low");
  setDueDate("");
};

return (
  <div className="task-form-column">
    <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

    <input
      placeholder="Description"
      onChange={(e) => setDescription(e.target.value)}
    />

    <select onChange={(e) => setPriority(e.target.value as any)}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <input type="date" onChange={(e) => setDueDate(e.target.value)} />

    <div className="form-actions">
      <button onClick={submit}>Add Task</button>
    </div>
  </div>
);


};

export default TaskForm;
