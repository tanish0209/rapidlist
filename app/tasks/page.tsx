"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskCard, { TaskStatus, TaskPriority } from "@/components/TaskCard";
import TaskSidebar from "@/components/TaskSideBar";
import Navbar from "@/components/Navbar";

interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string | null;
}

interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All">(
    "All"
  );
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    priority: "Medium",
    status: "To_Do",
    description: "",
    dueDate: "",
  });

  async function fetchTasks() {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    try {
      await axios.post("/api/tasks", {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
      });

      setShowForm(false);
      setFormData({
        title: "",
        priority: "Medium",
        status: "To_Do",
        description: "",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Failed to create task");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="mt-25 mx-5">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="text-2xl text-orange-600">My Tasks</div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search tasks"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as TaskStatus | "All")
              }
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl"
            >
              <option value="All">All Status</option>
              <option value="To_Do">To Do</option>
              <option value="In_Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as TaskPriority | "All")
              }
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl"
            >
              <option value="All">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
          >
            {showForm ? "Cancel" : "Add Task"}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks
            .filter((task) => {
              const query = search.toLowerCase();

              const matchesSearch =
                task.title.toLowerCase().includes(query) ||
                (task.description?.toLowerCase().includes(query) ?? false);

              const matchesStatus =
                statusFilter === "All" || task.status === statusFilter;

              const matchesPriority =
                priorityFilter === "All" || task.priority === priorityFilter;

              return matchesSearch && matchesStatus && matchesPriority;
            })
            .sort((a, b) => {
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              );
            })
            .map((task) => (
              <TaskCard key={task.id} task={task} onOpen={setActiveTask} />
            ))}

          {tasks.length > 0 &&
            tasks.filter((task) => {
              const query = search.toLowerCase();
              const matchesSearch =
                task.title.toLowerCase().includes(query) ||
                (task.description?.toLowerCase().includes(query) ?? false);
              const matchesStatus =
                statusFilter === "All" || task.status === statusFilter;
              const matchesPriority =
                priorityFilter === "All" || task.priority === priorityFilter;

              return matchesSearch && matchesStatus && matchesPriority;
            }).length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No matching tasks found.
              </p>
            )}
        </div>
        {activeTask && (
          <TaskSidebar
            task={activeTask}
            onClose={() => setActiveTask(null)}
            onUpdated={fetchTasks}
          />
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/80">
            <form
              onSubmit={handleAddTask}
              className="w-[95%] sm:w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl space-y-4 shadow-lg"
            >
              <h2 className="text-xl font-bold text-center">Add New Task</h2>

              <input
                type="text"
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                className="w-full px-3 py-2 border border-gray-200 rounded"
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: e.target.value as TaskPriority,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as TaskStatus,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded"
              >
                <option value="To_Do">To Do</option>
                <option value="In_Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded"
              />

              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-200 rounded"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Create Task
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
