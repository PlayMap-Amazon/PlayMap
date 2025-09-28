import { useState } from "react";
import Portal from "./Portal.jsx";
import styles from "./TaskTracker.module.css";

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [activeTab, setActiveTab] = useState("active");
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (!taskName || !deadline || !priority) return;
    const newTask = {
      taskName,
      deadline,
      priority,
      completed: false,
    };
    setTasks((prev) =>
      [...prev, newTask].sort((a, b) =>
        priorityValue(b.priority) - priorityValue(a.priority)
      )
    );
    setTaskName("");
    setDeadline("");
    setPriority("Medium");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const priorityValue = (p) => (p === "High" ? 3 : p === "Medium" ? 2 : 1);

  const now = new Date();

  const filteredTasks = tasks.filter(
    (task) => task.completed === (activeTab === "completed")
  );

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.taskTitle}>Task Tracker</div>

      <div className={styles.tabs}>
        <button
          className={activeTab === "active" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={activeTab === "completed" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>
          {activeTab === "active" && (
            <button className={styles.openModalButton} onClick={() => setShowModal(true)}>
              + New Task
            </button>
          )}

        <ul className={styles.taskList}>
        {filteredTasks.length === 0 ? (
            <div className={styles.noTasksMessage}>
            {activeTab === "completed"
                ? "No completed tasks yet. Keep going!"
                : "No active tasks. Enjoy your free time!"}
            </div>
        ) : (
            filteredTasks.map((task, i) => {
            const taskDate = new Date(task.deadline);
            const isOverdue = !task.completed && taskDate < now;

            return (
                <li key={i} className={styles.taskItem}>
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(i)}
                    />
                    <span className={styles.taskName}>{task.taskName}</span>
                  </label>
                  – due on {task.deadline}
                  <span
                      className={`${styles.tag} ${styles[task.priority.toLowerCase()]}`}
                  >
                      {task.priority}
                  </span>
                  {isOverdue && (
                      <span className={styles.overdue}> ⚠️ Deadline passed!</span>
                  )}
                </li>
            );
            })
        )}
        </ul>

    {showModal && (
      <Portal>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <div className={styles.modalButtons}>
              <button
                onClick={() => {
                  addTask();
                  setShowModal(false);
                }}
              >
                Add
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Portal>
    )}
    </div>
  );
}
