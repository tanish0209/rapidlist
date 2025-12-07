"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
export type TaskStatus = "To_Do" | "In_Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";
interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string | null;
    dueDate?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
  };
  onOpen: (task: any) => void;
}

export default function TaskCard({ task, onOpen }: TaskCardProps) {
  const getStatusColor = () => {
    switch (task.status) {
      case "To_Do":
        return "bg-orange-200 text-orange-700";
      case "In_Progress":
        return "bg-blue-200 text-blue-700";
      case "Done":
        return "bg-green-200 text-green-700";
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "bg-red-200 text-red-700";
      case "Medium":
        return "bg-yellow-200 text-yellow-700";
      case "Low":
        return "bg-green-200 text-green-700";
    }
  };

  return (
    <div className="relative p-5 rounded-xl shadow border border-orange-300 bg-white">
      <div className="flex gap-2">
        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor()}`}>
          {task.status.replace("_", " ")}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs ${getPriorityColor()}`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">
        Due:{" "}
        {task.dueDate ? new Date(task.dueDate).toDateString() : "No deadline"}
      </p>

      <button
        onClick={() => onOpen(task)}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
