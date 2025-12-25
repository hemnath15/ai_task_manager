import { useEffect, useState } from "react";
import { fetchTasksAPI } from "../features/tasks/taskAPI";
import { setTasks } from "../features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/modal.css";

const Task = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [open, setOpen] = useState(false);

  const loadTasks = async () => {
    const res = await fetchTasksAPI();
    dispatch(setTasks(res.data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <div className="task-topbar">
        <div />
        <button className="add-btn" onClick={() => setOpen(true)}>
          + Add Task
        </button>
      </div>

      <TaskList tasks={tasks} refresh={loadTasks} />

      {/* POPUP MODAL */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Add Task</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <TaskForm
              refresh={() => {
                loadTasks();
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
