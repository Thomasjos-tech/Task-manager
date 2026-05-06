import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  FolderOpen,
  Flag,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const API =
  "http://localhost:5000/api/tasks";

const PROJECT_API =
  "http://localhost:5000/api/projects";

const statusMeta = {
  Todo: {
    color: "text-slate-500",
    bg: "bg-slate-100",
  },

  "In Progress": {
    color: "text-amber-600",
    bg: "bg-amber-100",
  },

  Done: {
    color: "text-green-600",
    bg: "bg-green-100",
  },

  Overdue: {
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

const priorityMeta = {
  High: {
    color: "text-red-600",
    bg: "bg-red-100",
  },

  Medium: {
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },

  Low: {
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
};

export default function AssignedTasks() {
  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

const currentUser = JSON.parse(
  localStorage.getItem("user") || "{}"
);

console.log("CURRENT USER", currentUser);
  // ================= LOAD =================

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const [tRes, pRes] =
            await Promise.all([
              fetch(API, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),

              fetch(PROJECT_API, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),
            ]);

          const [
            taskData,
            projectData,
          ] = await Promise.all([
            tRes.json(),
            pRes.json(),
          ]);

          // ONLY ASSIGNED TASKS
       const myTasks = Array.isArray(taskData)
  ? taskData.filter((task) => {
      console.log(
        "TASK ASSIGNEE:",
        task.assigneeId
      );

      console.log(
        "CURRENT USER:",
        currentUser._id
      );

      return (
        String(task.assigneeId).trim() ===
        String(currentUser._id).trim()
      );
    })
  : [];

          setTasks(myTasks);

          setProjects(
            Array.isArray(
              projectData
            )
              ? projectData
              : []
          );

        } catch (err) {
          console.log(err);

          toast.error(
            "Failed to load assigned tasks"
          );

        } finally {
          setLoading(false);
        }
      };

    loadData();
  }, []);

  // ================= PROJECT NAME =================

  const getProjectName = (
    id
  ) => {
    const project =
      projects.find(
        (p) => p._id === id
      );

    return (
      project?.name ||
      "Unknown Project"
    );
  };

  // ================= UPDATE STATUS =================

  const updateTaskStatus =
    async (
      taskId,
      status
    ) => {
      try {
        const res = await fetch(
          `${API}/${taskId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              status,
            }),
          }
        );

        const updated =
          await res.json();

        setTasks((prev) =>
          prev.map((t) =>
            t._id === taskId
              ? updated
              : t
          )
        );

        toast.success(
          "Task updated"
        );

      } catch {
        toast.error(
          "Update failed"
        );
      }
    };

  // ================= OVERDUE =================

  const finalTasks =
    useMemo(() => {
      return tasks.map((t) => {
        const overdue =
          t.dueDate &&
          new Date(t.dueDate) <
            new Date() &&
          t.status !== "Done";

        return {
          ...t,
          displayStatus:
            overdue
              ? "Overdue"
              : t.status,
        };
      });
    }, [tasks]);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading tasks...
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-8">

        <p className="text-violet-600 font-semibold text-sm">
          Assigned Tasks
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Tasks assigned by admin
        </p>
      </div>

      {/* EMPTY */}

      {finalTasks.length ===
      0 ? (
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="py-28 text-center">

            <CheckCircle2 className="mx-auto h-16 w-16 text-violet-300 mb-6" />

            <h2 className="text-2xl font-bold mb-2">
              No assigned tasks
            </h2>

            <p className="text-gray-500">
              Admin has not assigned any tasks yet.
            </p>
          </CardContent>
        </Card>
      ) : (

        // TASK GRID

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {finalTasks.map(
            (task) => (
              <Card
                key={task._id}
                className="rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">

                  {/* TOP */}

                  <div className="flex items-start justify-between mb-5">

                    <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                      <FolderOpen className="h-7 w-7 text-violet-600" />

                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusMeta[
                          task
                            .displayStatus
                        ]?.bg
                      } ${
                        statusMeta[
                          task
                            .displayStatus
                        ]?.color
                      }`}
                    >
                      {
                        task.displayStatus
                      }
                    </div>
                  </div>

                  {/* TITLE */}

                  <h2 className="text-xl font-bold mb-2">
                    {task.title}
                  </h2>

                  {/* DESC */}

                  <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                    {
                      task.description
                    }
                  </p>

                  {/* PROJECT */}

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">

                    <FolderOpen className="h-4 w-4" />

                    {getProjectName(
                      task.projectId
                    )}
                  </div>

                  {/* PRIORITY */}

                  <div className="mb-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        priorityMeta[
                          task.priority
                        ]?.bg
                      } ${
                        priorityMeta[
                          task.priority
                        ]?.color
                      }`}
                    >
                      <Flag className="inline h-3 w-3 mr-1" />

                      {
                        task.priority
                      }
                    </span>
                  </div>

                  {/* DATE */}

                  {task.dueDate && (
                    <div
                      className={`flex items-center gap-2 text-sm mb-5 ${
                        task.displayStatus ===
                        "Overdue"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      <CalendarDays className="h-4 w-4" />

                      {new Date(
                        task.dueDate
                      ).toLocaleString()}
                    </div>
                  )}

                  {/* STATUS */}

                  <Select
                    value={task.status}
                    onValueChange={(
                      value
                    ) =>
                      updateTaskStatus(
                        task._id,
                        value
                      )
                    }
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Todo">
                        Todo
                      </SelectItem>

                      <SelectItem value="In Progress">
                        In Progress
                      </SelectItem>

                      <SelectItem value="Done">
                        Done
                      </SelectItem>

                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}