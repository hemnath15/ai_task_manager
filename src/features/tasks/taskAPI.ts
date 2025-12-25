import api from "../../services/axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "pending" | "completed";
}

export const fetchTasksAPI = () => api.get<Task[]>("/tasks");

export const createTaskAPI = (task: Partial<Task>) =>
  api.post("/tasks", task);

export const updateTaskAPI = (id: string, task: Partial<Task>) =>
  api.put(`/tasks/${id}`, task);

export const deleteTaskAPI = (id: string) =>
  api.delete(`/tasks/${id}`);
