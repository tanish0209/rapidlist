"use client";

import axios from "axios";
import { X, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TaskSidebar({
  task,
  onClose,
  onUpdated,
}: {
  task: any;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      await axios.patch(`/api/tasks/${task.id}`, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        status,
        priority,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await axios.delete(`/api/tasks/${task.id}`);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full bg-white p-4 sm:p-6 overflow-y-auto transition-all">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">
            Task Details
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-500">Title</label>
              <Pencil
                onClick={() => setEditTitle((p) => !p)}
                className="w-4 h-4 cursor-pointer text-orange-600"
              />
            </div>

            {editTitle ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 border px-3 py-2 sm:py-2.5 rounded text-sm sm:text-base"
              />
            ) : (
              <p className="font-semibold mt-1">{title}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-500">Description</label>
              <Pencil
                onClick={() => setEditDescription((p) => !p)}
                className="w-4 h-4 cursor-pointer text-orange-600"
              />
            </div>

            {editDescription ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 border px-3 py-2 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
              />
            ) : (
              <p className="mt-1">{description || "No description"}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-500">Due Date</label>
              <Pencil
                onClick={() => setEditDueDate((p) => !p)}
                className="w-4 h-4 cursor-pointer text-orange-600"
              />
            </div>

            {editDueDate ? (
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full mt-1 border px-3 py-2 sm:py-2.5 rounded text-sm sm:text-base"
              />
            ) : (
              <p className="mt-1">
                {dueDate ? new Date(dueDate).toDateString() : "No deadline"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 text-sm sm:text-base"
            >
              <option value="To_Do">To Do</option>
              <option value="In_Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2 text-sm sm:text-base"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-3 rounded bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-full py-3 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {deleting ? "Deleting..." : "Delete Task"}
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
