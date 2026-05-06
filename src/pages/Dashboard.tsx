// // // // // // // import { useStore, isOverdue } from "@/lib/store";
// // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // import { StatusBadge } from "@/components/StatusBadge";
// // // // // // // import { CheckSquare, Clock, AlertTriangle, FolderKanban } from "lucide-react";
// // // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // // import { Link } from "react-router-dom";

// // // // // // // const Dashboard = () => {
// // // // // // //   const { tasks, projects, users, currentUser } = useStore();

// // // // // // //   const myTasks = tasks.filter((t) => t.assigneeId === currentUser?.id);
// // // // // // //   const stats = [
// // // // // // //     { label: "Projects", value: projects.length, icon: FolderKanban, color: "text-primary bg-accent" },
// // // // // // //     { label: "Total tasks", value: tasks.length, icon: CheckSquare, color: "text-primary bg-accent" },
// // // // // // //     { label: "In progress", value: tasks.filter((t) => t.status === "In Progress").length, icon: Clock, color: "text-warning bg-warning/10" },
// // // // // // //     { label: "Overdue", value: tasks.filter(isOverdue).length, icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // //       <PageHeader
// // // // // // //         title={`Welcome back, ${currentUser?.name.split(" ")[0]} 👋`}
// // // // // // //         description="Here's what's happening across your team today."
// // // // // // //       />

// // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // // // // //         {stats.map((s) => (
// // // // // // //           <Card key={s.label} className="p-5 shadow-card border-0">
// // // // // // //             <div className="flex items-center justify-between mb-3">
// // // // // // //               <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.color}`}>
// // // // // // //                 <s.icon className="h-5 w-5" />
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //             <p className="text-3xl font-bold">{s.value}</p>
// // // // // // //             <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // // // // //         <Card className="lg:col-span-2 p-6 shadow-card border-0">
// // // // // // //           <div className="flex items-center justify-between mb-4">
// // // // // // //             <h2 className="font-semibold text-lg">My tasks</h2>
// // // // // // //             <Link to="/tasks" className="text-sm text-primary hover:underline">View all</Link>
// // // // // // //           </div>
// // // // // // //           {myTasks.length === 0 ? (
// // // // // // //             <p className="text-sm text-muted-foreground py-8 text-center">No tasks assigned to you yet.</p>
// // // // // // //           ) : (
// // // // // // //             <ul className="divide-y">
// // // // // // //               {myTasks.slice(0, 6).map((t) => {
// // // // // // //                 const project = projects.find((p) => p.id === t.projectId);
// // // // // // //                 const overdue = isOverdue(t);
// // // // // // //                 return (
// // // // // // //                   <li key={t.id} className="py-3 flex items-center justify-between gap-4">
// // // // // // //                     <div className="min-w-0">
// // // // // // //                       <p className="font-medium truncate">{t.title}</p>
// // // // // // //                       <p className="text-xs text-muted-foreground mt-0.5">
// // // // // // //                         {project?.name}
// // // // // // //                         {t.dueDate && (
// // // // // // //                           <span className={overdue ? "text-destructive font-medium ml-2" : "ml-2"}>
// // // // // // //                             · Due {new Date(t.dueDate).toLocaleDateString()}
// // // // // // //                           </span>
// // // // // // //                         )}
// // // // // // //                       </p>
// // // // // // //                     </div>
// // // // // // //                     <StatusBadge status={t.status} />
// // // // // // //                   </li>
// // // // // // //                 );
// // // // // // //               })}
// // // // // // //             </ul>
// // // // // // //           )}
// // // // // // //         </Card>

// // // // // // //         <Card className="p-6 shadow-card border-0">
// // // // // // //           <h2 className="font-semibold text-lg mb-4">Team</h2>
// // // // // // //           <ul className="space-y-3">
// // // // // // //             {users.map((u) => (
// // // // // // //               <li key={u.id} className="flex items-center gap-3">
// // // // // // //                 <Avatar className="h-9 w-9">
// // // // // // //                   <AvatarFallback className="bg-accent text-accent-foreground text-xs">
// // // // // // //                     {u.name.split(" ").map((n) => n[0]).join("")}
// // // // // // //                   </AvatarFallback>
// // // // // // //                 </Avatar>
// // // // // // //                 <div className="min-w-0 flex-1">
// // // // // // //                   <p className="text-sm font-medium truncate">{u.name}</p>
// // // // // // //                   <p className="text-xs text-muted-foreground truncate">{u.email}</p>
// // // // // // //                 </div>
// // // // // // //               </li>
// // // // // // //             ))}
// // // // // // //           </ul>
// // // // // // //         </Card>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Dashboard;
// // // // // // import { useStore, isOverdue } from "@/lib/store";
// // // // // // import { Card } from "@/components/ui/card";
// // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // import { StatusBadge } from "@/components/StatusBadge";
// // // // // // import { CheckSquare, Clock, AlertTriangle, FolderKanban } from "lucide-react";
// // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // import { Link } from "react-router-dom";

// // // // // // const Dashboard = () => {
// // // // // //   const { tasks, projects, users, currentUser } = useStore();

// // // // // //   // ✅ prevent crash if store is empty
// // // // // //   if (!currentUser) {
// // // // // //     return (
// // // // // //       <div className="p-8 text-center">
// // // // // //         <h2 className="text-lg font-semibold">Loading dashboard...</h2>
// // // // // //         <p className="text-sm text-muted-foreground mt-2">
// // // // // //           No user data found. Please login again.
// // // // // //         </p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   const safeTasks = tasks || [];
// // // // // //   const safeProjects = projects || [];
// // // // // //   const safeUsers = users || [];

// // // // // //   const myTasks = safeTasks.filter(
// // // // // //     (t) => t.assigneeId === currentUser?.id
// // // // // //   );

// // // // // //   const stats = [
// // // // // //     {
// // // // // //       label: "Projects",
// // // // // //       value: safeProjects.length,
// // // // // //       icon: FolderKanban,
// // // // // //       color: "text-primary bg-accent",
// // // // // //     },
// // // // // //     {
// // // // // //       label: "Total tasks",
// // // // // //       value: safeTasks.length,
// // // // // //       icon: CheckSquare,
// // // // // //       color: "text-primary bg-accent",
// // // // // //     },
// // // // // //     {
// // // // // //       label: "In progress",
// // // // // //       value: safeTasks.filter((t) => t.status === "In Progress").length,
// // // // // //       icon: Clock,
// // // // // //       color: "text-warning bg-warning/10",
// // // // // //     },
// // // // // //     {
// // // // // //       label: "Overdue",
// // // // // //       value: safeTasks.filter(isOverdue).length,
// // // // // //       icon: AlertTriangle,
// // // // // //       color: "text-destructive bg-destructive/10",
// // // // // //     },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="p-8 max-w-7xl mx-auto">

// // // // // //       {/* ✅ SAFE HEADER */}
// // // // // //       <PageHeader
// // // // // //         title={`Welcome back, ${
// // // // // //           currentUser?.name?.split(" ")[0] || "User"
// // // // // //         } 👋`}
// // // // // //         description="Here's what's happening across your team today."
// // // // // //       />

// // // // // //       {/* STATS */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// // // // // //         {stats.map((s) => (
// // // // // //           <Card key={s.label} className="p-5 shadow-card border-0">
// // // // // //             <div className="flex items-center justify-between mb-3">
// // // // // //               <div
// // // // // //                 className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.color}`}
// // // // // //               >
// // // // // //                 <s.icon className="h-5 w-5" />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <p className="text-3xl font-bold">{s.value}</p>
// // // // // //             <p className="text-sm text-muted-foreground mt-1">
// // // // // //               {s.label}
// // // // // //             </p>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* MAIN GRID */}
// // // // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// // // // // //         {/* MY TASKS */}
// // // // // //         <Card className="lg:col-span-2 p-6 shadow-card border-0">
// // // // // //           <div className="flex items-center justify-between mb-4">
// // // // // //             <h2 className="font-semibold text-lg">My tasks</h2>
// // // // // //             <Link
// // // // // //               to="/tasks"
// // // // // //               className="text-sm text-primary hover:underline"
// // // // // //             >
// // // // // //               View all
// // // // // //             </Link>
// // // // // //           </div>

// // // // // //           {myTasks.length === 0 ? (
// // // // // //             <p className="text-sm text-muted-foreground py-8 text-center">
// // // // // //               No tasks assigned to you yet.
// // // // // //             </p>
// // // // // //           ) : (
// // // // // //             <ul className="divide-y">
// // // // // //               {myTasks.slice(0, 6).map((t) => {
// // // // // //                 const project = safeProjects.find(
// // // // // //                   (p) => p.id === t.projectId
// // // // // //                 );
// // // // // //                 const overdue = isOverdue(t);

// // // // // //                 return (
// // // // // //                   <li
// // // // // //                     key={t.id}
// // // // // //                     className="py-3 flex items-center justify-between gap-4"
// // // // // //                   >
// // // // // //                     <div className="min-w-0">
// // // // // //                       <p className="font-medium truncate">{t.title}</p>
// // // // // //                       <p className="text-xs text-muted-foreground mt-0.5">
// // // // // //                         {project?.name || "No project"}
// // // // // //                         {t.dueDate && (
// // // // // //                           <span
// // // // // //                             className={
// // // // // //                               overdue
// // // // // //                                 ? "text-destructive font-medium ml-2"
// // // // // //                                 : "ml-2"
// // // // // //                             }
// // // // // //                           >
// // // // // //                             · Due{" "}
// // // // // //                             {new Date(t.dueDate).toLocaleDateString()}
// // // // // //                           </span>
// // // // // //                         )}
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                     <StatusBadge status={t.status} />
// // // // // //                   </li>
// // // // // //                 );
// // // // // //               })}
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </Card>

// // // // // //         {/* TEAM */}
// // // // // //         <Card className="p-6 shadow-card border-0">
// // // // // //           <h2 className="font-semibold text-lg mb-4">Team</h2>

// // // // // //           {safeUsers.length === 0 ? (
// // // // // //             <p className="text-sm text-muted-foreground text-center">
// // // // // //               No team members found
// // // // // //             </p>
// // // // // //           ) : (
// // // // // //             <ul className="space-y-3">
// // // // // //               {safeUsers.map((u) => (
// // // // // //                 <li
// // // // // //                   key={u.id}
// // // // // //                   className="flex items-center gap-3"
// // // // // //                 >
// // // // // //                   <Avatar className="h-9 w-9">
// // // // // //                     <AvatarFallback className="bg-accent text-accent-foreground text-xs">
// // // // // //                       {(u.name || "U")
// // // // // //                         .split(" ")
// // // // // //                         .map((n: string) => n[0])
// // // // // //                         .join("")}
// // // // // //                     </AvatarFallback>
// // // // // //                   </Avatar>

// // // // // //                   <div className="min-w-0 flex-1">
// // // // // //                     <p className="text-sm font-medium truncate">
// // // // // //                       {u.name || "Unknown"}
// // // // // //                     </p>
// // // // // //                     <p className="text-xs text-muted-foreground truncate">
// // // // // //                       {u.email || "No email"}
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </li>
// // // // // //               ))}
// // // // // //             </ul>
// // // // // //           )}
// // // // // //         </Card>

// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Dashboard;
// // // // // import { useEffect, useState } from "react";
// // // // // import {
// // // // //   FolderKanban,
// // // // //   CheckSquare,
// // // // //   Clock,
// // // // //   AlertTriangle,
// // // // // } from "lucide-react";

// // // // // import { Card } from "@/components/ui/card";
// // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // import { toast } from "sonner";

// // // // // const API = "http://localhost:5000/api/dashboard";

// // // // // export default function Dashboard() {
// // // // //   const [data, setData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // ================= FETCH =================
// // // // //   const loadDashboard = async () => {
// // // // //     try {
// // // // //       const res = await fetch(API);
// // // // //       const json = await res.json();
// // // // //       setData(json);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       toast.error("Failed to load dashboard");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     loadDashboard();
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return <div className="p-8">Loading...</div>;
// // // // //   }

// // // // //   const stats = data?.stats || {};
// // // // //   const team = data?.team || [];

// // // // //   return (
// // // // //     <div className="p-8 space-y-6">
// // // // //       {/* HEADER */}
// // // // //       <div>
// // // // //         <h1 className="text-2xl font-bold">
// // // // //           Welcome back, th 👋
// // // // //         </h1>
// // // // //         <p className="text-sm text-gray-500">
// // // // //           Here's what's happening across your team today.
// // // // //         </p>
// // // // //       </div>

// // // // //       {/* ================= STATS ================= */}
// // // // //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // // //         {/* Projects */}
// // // // //         <Card className="p-5">
// // // // //           <div className="mb-3">
// // // // //             <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
// // // // //               <FolderKanban className="h-5 w-5 text-purple-600" />
// // // // //             </div>
// // // // //           </div>
// // // // //           <p className="text-3xl font-bold">
// // // // //             {stats.totalProjects || 0}
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-500">Projects</p>
// // // // //         </Card>

// // // // //         {/* Tasks */}
// // // // //         <Card className="p-5">
// // // // //           <div className="mb-3">
// // // // //             <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
// // // // //               <CheckSquare className="h-5 w-5 text-purple-600" />
// // // // //             </div>
// // // // //           </div>
// // // // //           <p className="text-3xl font-bold">
// // // // //             {stats.totalTasks || 0}
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-500">Total tasks</p>
// // // // //         </Card>

// // // // //         {/* In Progress */}
// // // // //         <Card className="p-5">
// // // // //           <div className="mb-3">
// // // // //             <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
// // // // //               <Clock className="h-5 w-5 text-yellow-600" />
// // // // //             </div>
// // // // //           </div>
// // // // //           <p className="text-3xl font-bold">
// // // // //             {stats.inProgress || 0}
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-500">In progress</p>
// // // // //         </Card>

// // // // //         {/* Overdue */}
// // // // //         <Card className="p-5">
// // // // //           <div className="mb-3">
// // // // //             <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
// // // // //               <AlertTriangle className="h-5 w-5 text-red-600" />
// // // // //             </div>
// // // // //           </div>
// // // // //           <p className="text-3xl font-bold">
// // // // //             {stats.overdue || 0}
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-500">Overdue</p>
// // // // //         </Card>
// // // // //       </div>

// // // // //       {/* ================= LOWER SECTION ================= */}
// // // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
// // // // //         {/* MY TASKS */}
// // // // //         <Card className="p-6 lg:col-span-2">
// // // // //           <div className="flex justify-between mb-4">
// // // // //             <h2 className="font-semibold">My tasks</h2>
// // // // //             <span className="text-sm text-purple-600 cursor-pointer">
// // // // //               View all
// // // // //             </span>
// // // // //           </div>

// // // // //           {/* (Optional: you can later connect this to user tasks) */}
// // // // //           <p className="text-sm text-gray-500 text-center">
// // // // //             No tasks assigned to you yet.
// // // // //           </p>
// // // // //         </Card>

// // // // //         {/* TEAM */}
// // // // //         <Card className="p-6">
// // // // //           <h2 className="font-semibold mb-4">Team</h2>

// // // // //           <div className="space-y-4">
// // // // //             {team.map((u) => (
// // // // //               <div key={u._id} className="flex items-center gap-3">
// // // // //                 <Avatar>
// // // // //                   <AvatarFallback>
// // // // //                     {u.name
// // // // //                       .split(" ")
// // // // //                       .map((n) => n[0])
// // // // //                       .join("")}
// // // // //                   </AvatarFallback>
// // // // //                 </Avatar>

// // // // //                 <div>
// // // // //                   <p className="text-sm font-medium">{u.name}</p>
// // // // //                   <p className="text-xs text-gray-500">
// // // // //                     {u.email}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </Card>

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import { useEffect, useState, useRef } from "react";
// // // // import {
// // // //   FolderKanban,
// // // //   CheckSquare,
// // // //   Clock,
// // // //   AlertTriangle,
// // // //   TrendingUp,
// // // //   MoreHorizontal,
// // // // } from "lucide-react";
// // // // import {
// // // //   AreaChart,
// // // //   Area,
// // // //   BarChart,
// // // //   Bar,
// // // //   LineChart,
// // // //   Line,
// // // //   XAxis,
// // // //   YAxis,
// // // //   CartesianGrid,
// // // //   Tooltip,
// // // //   ResponsiveContainer,
// // // //   Legend,
// // // //   RadialBarChart,
// // // //   RadialBar,
// // // //   PieChart,
// // // //   Pie,
// // // //   Cell,
// // // // } from "recharts";
// // // // import { Card } from "@/components/ui/card";
// // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // import { toast } from "sonner";

// // // // const API = "http://localhost:5000/api/dashboard";

// // // // // ── Sparkline data for stat cards ──────────────────────────────────────────
// // // // const sparklineData = {
// // // //   projects: [3, 5, 4, 7, 6, 8, 9],
// // // //   tasks: [12, 18, 15, 22, 19, 26, 30],
// // // //   inProgress: [4, 6, 5, 8, 7, 9, 11],
// // // //   overdue: [2, 3, 4, 2, 5, 3, 2],
// // // // };

// // // // // ── Sample chart data (replace with real backend data as needed) ────────────
// // // // const areaData = [
// // // //   { name: "Mon", Tasks: 4, Completed: 2, Overdue: 1 },
// // // //   { name: "Tue", Tasks: 7, Completed: 5, Overdue: 2 },
// // // //   { name: "Wed", Tasks: 6, Completed: 4, Overdue: 1 },
// // // //   { name: "Thu", Tasks: 9, Completed: 7, Overdue: 0 },
// // // //   { name: "Fri", Tasks: 8, Completed: 6, Overdue: 2 },
// // // //   { name: "Sat", Tasks: 5, Completed: 5, Overdue: 0 },
// // // //   { name: "Sun", Tasks: 3, Completed: 3, Overdue: 0 },
// // // // ];

// // // // const barData = [
// // // //   { name: "Jan", ProjectA: 4, ProjectB: 3, ProjectC: 2 },
// // // //   { name: "Feb", ProjectA: 5, ProjectB: 4, ProjectC: 3 },
// // // //   { name: "Mar", ProjectA: 3, ProjectB: 5, ProjectC: 4 },
// // // //   { name: "Apr", ProjectA: 7, ProjectB: 3, ProjectC: 5 },
// // // //   { name: "May", ProjectA: 6, ProjectB: 6, ProjectC: 3 },
// // // //   { name: "Jun", ProjectA: 8, ProjectB: 4, ProjectC: 6 },
// // // // ];

// // // // const radialData = [
// // // //   { name: "Done", value: 68, fill: "#6366f1" },
// // // //   { name: "In Progress", value: 22, fill: "#f59e0b" },
// // // //   { name: "Todo", value: 10, fill: "#e2e8f0" },
// // // // ];

// // // // // ── Sparkline mini chart ────────────────────────────────────────────────────
// // // // function Sparkline({ data, color }) {
// // // //   return (
// // // //     <ResponsiveContainer width="100%" height={48}>
// // // //       <LineChart data={data.map((v, i) => ({ v, i }))}>
// // // //         <Line
// // // //           type="monotone"
// // // //           dataKey="v"
// // // //           stroke={color}
// // // //           strokeWidth={2}
// // // //           dot={false}
// // // //           isAnimationActive={true}
// // // //           animationDuration={1200}
// // // //         />
// // // //       </LineChart>
// // // //     </ResponsiveContainer>
// // // //   );
// // // // }

// // // // // ── Stat card ───────────────────────────────────────────────────────────────
// // // // function StatCard({ icon: Icon, iconBg, iconColor, value, label, sparkData, sparkColor, trend }) {
// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         background: "#fff",
// // // //         borderRadius: 20,
// // // //         padding: "22px 24px 14px",
// // // //         boxShadow: "0 2px 24px 0 rgba(99,102,241,0.07)",
// // // //         border: "1px solid #f1f5f9",
// // // //         display: "flex",
// // // //         flexDirection: "column",
// // // //         gap: 0,
// // // //         transition: "box-shadow 0.25s",
// // // //         cursor: "default",
// // // //       }}
// // // //       onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 40px 0 rgba(99,102,241,0.13)"}
// // // //       onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 24px 0 rgba(99,102,241,0.07)"}
// // // //     >
// // // //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
// // // //         <div
// // // //           style={{
// // // //             width: 44,
// // // //             height: 44,
// // // //             borderRadius: 12,
// // // //             background: iconBg,
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             justifyContent: "center",
// // // //           }}
// // // //         >
// // // //           <Icon size={20} color={iconColor} />
// // // //         </div>
// // // //         <span style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}>
// // // //           <TrendingUp size={13} color={sparkColor} /> {trend}
// // // //         </span>
// // // //       </div>

// // // //       <p style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", margin: "14px 0 2px", fontFamily: "'Sora', sans-serif", letterSpacing: -1 }}>
// // // //         {value}
// // // //       </p>
// // // //       <p style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 8 }}>{label}</p>

// // // //       <Sparkline data={sparkData} color={sparkColor} />
// // // //     </div>
// // // //   );
// // // // }

// // // // // ── Custom Tooltip ──────────────────────────────────────────────────────────
// // // // function CustomTooltip({ active, payload, label }) {
// // // //   if (!active || !payload?.length) return null;
// // // //   return (
// // // //     <div style={{
// // // //       background: "#fff",
// // // //       border: "1px solid #e2e8f0",
// // // //       borderRadius: 12,
// // // //       padding: "10px 16px",
// // // //       boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
// // // //       fontSize: 13,
// // // //     }}>
// // // //       <p style={{ fontWeight: 700, marginBottom: 4, color: "#0f172a" }}>{label}</p>
// // // //       {payload.map((p, i) => (
// // // //         <div key={i} style={{ color: p.color, display: "flex", gap: 8, alignItems: "center" }}>
// // // //           <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "inline-block" }} />
// // // //           {p.name}: <b>{p.value}</b>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ── Main Dashboard ──────────────────────────────────────────────────────────
// // // // export default function Dashboard() {
// // // //   const [data, setData] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const loadDashboard = async () => {
// // // //     try {
// // // //       const res = await fetch(API);
// // // //       const json = await res.json();
// // // //       setData(json);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       toast.error("Failed to load dashboard");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadDashboard();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div style={{
// // // //         minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
// // // //         background: "#f8fafc", fontFamily: "'Sora', sans-serif", color: "#6366f1", fontSize: 16
// // // //       }}>
// // // //         <div style={{ textAlign: "center" }}>
// // // //           <div style={{
// // // //             width: 48, height: 48, borderRadius: "50%", border: "3px solid #e2e8f0",
// // // //             borderTop: "3px solid #6366f1", animation: "spin 0.9s linear infinite",
// // // //             margin: "0 auto 16px"
// // // //           }} />
// // // //           Loading your workspace…
// // // //         </div>
// // // //         <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const stats = data?.stats || {};
// // // //   const team = data?.team || [];

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
// // // //         * { box-sizing: border-box; }
// // // //         body { background: #f8fafc !important; }
// // // //         .recharts-cartesian-axis-tick text { font-family: 'DM Sans', sans-serif; fill: #94a3b8; font-size: 12px; }
// // // //         .recharts-legend-item-text { font-family: 'DM Sans', sans-serif !important; font-size: 12px !important; color: #64748b !important; }
// // // //       `}</style>

// // // //       <div style={{
// // // //         minHeight: "100vh",
// // // //         background: "#f8fafc",
// // // //         fontFamily: "'DM Sans', sans-serif",
// // // //         padding: "36px 40px",
// // // //       }}>

// // // //         {/* ── HEADER ── */}
// // // //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
// // // //           <div>
// // // //             <h1 style={{
// // // //               fontFamily: "'Sora', sans-serif",
// // // //               fontSize: 28,
// // // //               fontWeight: 800,
// // // //               color: "#0f172a",
// // // //               margin: 0,
// // // //               letterSpacing: -0.5,
// // // //             }}>
// // // //               Welcome back 👋
// // // //             </h1>
// // // //             <p style={{ color: "#94a3b8", margin: "6px 0 0", fontSize: 14 }}>
// // // //               Here's what's happening across your team today.
// // // //             </p>
// // // //           </div>
// // // //           <div style={{
// // // //             background: "#fff",
// // // //             border: "1px solid #e2e8f0",
// // // //             borderRadius: 40,
// // // //             padding: "8px 20px",
// // // //             fontSize: 13,
// // // //             color: "#64748b",
// // // //             display: "flex",
// // // //             alignItems: "center",
// // // //             gap: 8,
// // // //             fontWeight: 500,
// // // //             boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
// // // //           }}>
// // // //             <Clock size={14} color="#6366f1" />
// // // //             {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
// // // //           </div>
// // // //         </div>

// // // //         {/* ── STAT CARDS ── */}
// // // //         <div style={{
// // // //           display: "grid",
// // // //           gridTemplateColumns: "repeat(4, 1fr)",
// // // //           gap: 20,
// // // //           marginBottom: 28,
// // // //         }}>
// // // //           <StatCard
// // // //             icon={FolderKanban}
// // // //             iconBg="#ede9fe"
// // // //             iconColor="#7c3aed"
// // // //             value={stats.totalProjects || 0}
// // // //             label="Projects"
// // // //             sparkData={sparklineData.projects}
// // // //             sparkColor="#7c3aed"
// // // //             trend="+12%"
// // // //           />
// // // //           <StatCard
// // // //             icon={CheckSquare}
// // // //             iconBg="#dbeafe"
// // // //             iconColor="#2563eb"
// // // //             value={stats.totalTasks || 0}
// // // //             label="Total tasks"
// // // //             sparkData={sparklineData.tasks}
// // // //             sparkColor="#2563eb"
// // // //             trend="+8%"
// // // //           />
// // // //           <StatCard
// // // //             icon={Clock}
// // // //             iconBg="#fef9c3"
// // // //             iconColor="#d97706"
// // // //             value={stats.inProgress || 0}
// // // //             label="In progress"
// // // //             sparkData={sparklineData.inProgress}
// // // //             sparkColor="#f59e0b"
// // // //             trend="+5%"
// // // //           />
// // // //           <StatCard
// // // //             icon={AlertTriangle}
// // // //             iconBg="#fee2e2"
// // // //             iconColor="#dc2626"
// // // //             value={stats.overdue || 0}
// // // //             label="Overdue"
// // // //             sparkData={sparklineData.overdue}
// // // //             sparkColor="#ef4444"
// // // //             trend="-3%"
// // // //           />
// // // //         </div>

// // // //         {/* ── CHARTS ROW ── */}
// // // //         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 28 }}>

// // // //           {/* Area Chart */}
// // // //           <div style={{
// // // //             background: "#fff",
// // // //             borderRadius: 20,
// // // //             padding: "24px 28px",
// // // //             border: "1px solid #f1f5f9",
// // // //             boxShadow: "0 2px 24px 0 rgba(99,102,241,0.07)",
// // // //           }}>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
// // // //               <div>
// // // //                 <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", margin: 0 }}>
// // // //                   Weekly Activity
// // // //                 </h2>
// // // //                 <p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>Tasks overview this week</p>
// // // //               </div>
// // // //               <button style={{
// // // //                 background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
// // // //                 padding: "6px 8px", cursor: "pointer", color: "#64748b"
// // // //               }}>
// // // //                 <MoreHorizontal size={16} />
// // // //               </button>
// // // //             </div>
// // // //             <ResponsiveContainer width="100%" height={220}>
// // // //               <AreaChart data={areaData}>
// // // //                 <defs>
// // // //                   <linearGradient id="gTasks" x1="0" y1="0" x2="0" y2="1">
// // // //                     <stop offset="0%" stopColor="#6366f1" stopOpacity={0.18} />
// // // //                     <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
// // // //                   </linearGradient>
// // // //                   <linearGradient id="gCompleted" x1="0" y1="0" x2="0" y2="1">
// // // //                     <stop offset="0%" stopColor="#10b981" stopOpacity={0.18} />
// // // //                     <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
// // // //                   </linearGradient>
// // // //                   <linearGradient id="gOverdue" x1="0" y1="0" x2="0" y2="1">
// // // //                     <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.18} />
// // // //                     <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
// // // //                   </linearGradient>
// // // //                 </defs>
// // // //                 <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
// // // //                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // // //                 <YAxis axisLine={false} tickLine={false} />
// // // //                 <Tooltip
// // // //   contentStyle={{
// // // //     background: "#fff",
// // // //     border: "1px solid #e2e8f0",
// // // //     borderRadius: 12,
// // // //     padding: "10px 16px",
// // // //     boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
// // // //     fontSize: 13,
// // // //   }}
// // // //   itemStyle={{ color: "#0f172a" }}
// // // //   labelStyle={{ fontWeight: 700, color: "#0f172a" }}
// // // // />
// // // //                 <Legend />
// // // //                 <Area type="monotone" dataKey="Tasks" stroke="#6366f1" strokeWidth={2.5} fill="url(#gTasks)" animationDuration={1500} />
// // // //                 <Area type="monotone" dataKey="Completed" stroke="#10b981" strokeWidth={2.5} fill="url(#gCompleted)" animationDuration={1700} />
// // // //                 <Area type="monotone" dataKey="Overdue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#gOverdue)" animationDuration={1900} />
// // // //               </AreaChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* Radial / Donut */}
// // // //           <div style={{
// // // //             background: "#fff",
// // // //             borderRadius: 20,
// // // //             padding: "24px 28px",
// // // //             border: "1px solid #f1f5f9",
// // // //             boxShadow: "0 2px 24px 0 rgba(99,102,241,0.07)",
// // // //           }}>
// // // //             <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", margin: "0 0 4px" }}>
// // // //               Task Status
// // // //             </h2>
// // // //             <p style={{ color: "#94a3b8", fontSize: 12, margin: "0 0 16px" }}>Completion breakdown</p>
// // // //             <ResponsiveContainer width="100%" height={180}>
// // // //               <PieChart>
// // // //                 <Pie
// // // //                   data={radialData}
// // // //                   cx="50%"
// // // //                   cy="50%"
// // // //                   innerRadius={52}
// // // //                   outerRadius={80}
// // // //                   paddingAngle={4}
// // // //                   dataKey="value"
// // // //                   animationBegin={200}
// // // //                   animationDuration={1400}
// // // //                 >
// // // //                   {radialData.map((entry, i) => (
// // // //                     <Cell key={i} fill={entry.fill} />
// // // //                   ))}
// // // //                 </Pie>
// // // //                 <Tooltip
// // // //   contentStyle={{
// // // //     background: "#fff",
// // // //     border: "1px solid #e2e8f0",
// // // //     borderRadius: 12,
// // // //     padding: "10px 16px",
// // // //     boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
// // // //     fontSize: 13,
// // // //   }}
// // // //   itemStyle={{ color: "#0f172a" }}
// // // //   labelStyle={{ fontWeight: 700, color: "#0f172a" }}
// // // // />
// // // //               </PieChart>
// // // //             </ResponsiveContainer>
// // // //             <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
// // // //               {radialData.map((d, i) => (
// // // //                 <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // //                     <span style={{ width: 10, height: 10, borderRadius: 3, background: d.fill, display: "inline-block" }} />
// // // //                     <span style={{ fontSize: 13, color: "#64748b" }}>{d.name}</span>
// // // //                   </div>
// // // //                   <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{d.value}%</span>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* ── BOTTOM ROW ── */}
// // // //         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>

// // // //           {/* Bar Chart */}
// // // //           <div style={{
// // // //             background: "#fff",
// // // //             borderRadius: 20,
// // // //             padding: "24px 28px",
// // // //             border: "1px solid #f1f5f9",
// // // //             boxShadow: "0 2px 24px 0 rgba(99,102,241,0.07)",
// // // //           }}>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
// // // //               <div>
// // // //                 <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", margin: 0 }}>
// // // //                   Project Performance
// // // //                 </h2>
// // // //                 <p style={{ color: "#94a3b8", fontSize: 12, margin: "4px 0 0" }}>Tasks completed by project</p>
// // // //               </div>
// // // //             </div>
// // // //             <ResponsiveContainer width="100%" height={200}>
// // // //               <BarChart data={barData} barGap={4} barSize={10}>
// // // //                 <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
// // // //                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
// // // //                 <YAxis axisLine={false} tickLine={false} />
// // // //                 <Tooltip
// // // //   contentStyle={{
// // // //     background: "#fff",
// // // //     border: "1px solid #e2e8f0",
// // // //     borderRadius: 12,
// // // //     padding: "10px 16px",
// // // //     boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
// // // //     fontSize: 13,
// // // //   }}
// // // //   itemStyle={{ color: "#0f172a" }}
// // // //   labelStyle={{ fontWeight: 700, color: "#0f172a" }}
// // // // />
// // // //                 <Legend />
// // // //                 <Bar dataKey="ProjectA" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1400} />
// // // //                 <Bar dataKey="ProjectB" fill="#f59e0b" radius={[4, 4, 0, 0]} animationDuration={1600} />
// // // //                 <Bar dataKey="ProjectC" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1800} />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* Team */}
// // // //           <div style={{
// // // //             background: "#fff",
// // // //             borderRadius: 20,
// // // //             padding: "24px 28px",
// // // //             border: "1px solid #f1f5f9",
// // // //             boxShadow: "0 2px 24px 0 rgba(99,102,241,0.07)",
// // // //           }}>
// // // //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// // // //               <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", margin: 0 }}>
// // // //                 Team
// // // //               </h2>
// // // //               <span style={{ fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 600 }}>View all</span>
// // // //             </div>

// // // //             {team.length === 0 ? (
// // // //               <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginTop: 40 }}>No team members yet.</p>
// // // //             ) : (
// // // //               <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// // // //                 {team.map((u, idx) => {
// // // //                   const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"];
// // // //                   const bg = colors[idx % colors.length];
// // // //                   const initials = u.name.split(" ").map(n => n[0]).join("").toUpperCase();
// // // //                   return (
// // // //                     <div key={u._id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
// // // //                       <div style={{
// // // //                         width: 40, height: 40, borderRadius: 12,
// // // //                         background: bg + "22",
// // // //                         border: `2px solid ${bg}33`,
// // // //                         display: "flex", alignItems: "center", justifyContent: "center",
// // // //                         fontWeight: 700, color: bg, fontSize: 14,
// // // //                         fontFamily: "'Sora', sans-serif",
// // // //                         flexShrink: 0,
// // // //                       }}>
// // // //                         {initials}
// // // //                       </div>
// // // //                       <div style={{ flex: 1, minWidth: 0 }}>
// // // //                         <p style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</p>
// // // //                         <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</p>
// // // //                       </div>
// // // //                       <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
// // // //                     </div>
// // // //                   );
// // // //                 })}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //       </div>
// // // //     </>
// // // //   );
// // // // }
// // // import { useEffect, useMemo, useState } from "react";
// // // import {
// // //   FolderOpen,
// // //   CheckSquare,
// // //   Clock3,
// // //   AlertTriangle,
// // // } from "lucide-react";

// // // import {
// // //   ResponsiveContainer,
// // //   AreaChart,
// // //   Area,
// // //   XAxis,
// // //   Tooltip,
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   BarChart,
// // //   Bar,
// // // } from "recharts";

// // // const BASE = "http://localhost:5000/api";

// // // export default function Dashboard() {
// // //   const [projects, setProjects] = useState([]);
// // //   const [tasks, setTasks] = useState([]);
// // //   const [team, setTeam] = useState([]);
// // //   const [currentUser, setCurrentUser] = useState(null);

// // //   const token = localStorage.getItem("token");

// // //   // ================= LOAD =================
// // //   useEffect(() => {
// // //     loadDashboard();
// // //   }, []);

// // //   const loadDashboard = async () => {
// // //     try {
// // //       const [pRes, tRes, uRes, meRes] = await Promise.all([
// // //         fetch(`${BASE}/projects`),

// // //         fetch(`${BASE}/tasks`),

// // //         fetch(`${BASE}/admin/users`, {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }),

// // //         fetch(`${BASE}/auth/me`, {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }),
// // //       ]);

// // //       const pData = await pRes.json();
// // //       const tData = await tRes.json();
// // //       const uData = await uRes.json();
// // //       const meData = await meRes.json();

// // //       setProjects(Array.isArray(pData) ? pData : []);
// // //       setTasks(Array.isArray(tData) ? tData : []);
// // //       setTeam(Array.isArray(uData) ? uData : []);
// // //       setCurrentUser(meData);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };

// // //   // ================= COUNTS =================
// // //   const totalProjects = projects.length;

// // //   const totalTasks = tasks.length;

// // //   const inProgressTasks = tasks.filter(
// // //     (t) => t.status === "In Progress"
// // //   ).length;

// // //   const overdueTasks = tasks.filter((t) => {
// // //     return (
// // //       t.dueDate &&
// // //       new Date(t.dueDate) < new Date() &&
// // //       t.status !== "Done"
// // //     );
// // //   }).length;

// // //   // ================= MY TASKS =================
// // //   const myTasks = tasks.filter(
// // //     (t) => t.assigneeId === currentUser?._id
// // //   );

// // //   // ================= WEEKLY ACTIVITY =================
// // //   const weeklyActivity = useMemo(() => {
// // //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// // //     const result = days.map((d) => ({
// // //       day: d,
// // //       count: 0,
// // //     }));

// // //     tasks.forEach((task) => {
// // //       const date = new Date(task.createdAt);
// // //       const dayIndex = date.getDay();

// // //       result[dayIndex].count += 1;
// // //     });

// // //     return result;
// // //   }, [tasks]);

// // //   // ================= TASK STATUS =================
// // //   const taskStatus = [
// // //     {
// // //       label: "Todo",
// // //       count: tasks.filter((t) => t.status === "Todo").length,
// // //       color: "#94a3b8",
// // //     },

// // //     {
// // //       label: "In Progress",
// // //       count: tasks.filter((t) => t.status === "In Progress").length,
// // //       color: "#f59e0b",
// // //     },

// // //     {
// // //       label: "Done",
// // //       count: tasks.filter((t) => t.status === "Done").length,
// // //       color: "#22c55e",
// // //     },

// // //     {
// // //       label: "Overdue",
// // //       count: overdueTasks,
// // //       color: "#ef4444",
// // //     },
// // //   ];

// // //   // ================= PROJECT PERFORMANCE =================
// // //   const projectPerformance = projects.map((project) => {
// // //     const projectTasks = tasks.filter(
// // //       (t) => t.projectId === project._id
// // //     );

// // //     const doneTasks = projectTasks.filter(
// // //       (t) => t.status === "Done"
// // //     ).length;

// // //     const percentage =
// // //       projectTasks.length === 0
// // //         ? 0
// // //         : Math.round((doneTasks / projectTasks.length) * 100);

// // //     return {
// // //       name: project.name,
// // //       progress: percentage,
// // //       total: projectTasks.length,
// // //     };
// // //   });

// // //   return (
// // //     <div className="p-6">
// // //       {/* HEADER */}
// // //       <div className="mb-8">
// // //         <h1 className="text-5xl font-bold text-[#0f172a]">
// // //           Welcome back, {currentUser?.name || "User"} 👋
// // //         </h1>

// // //         <p className="text-[#64748b] mt-3 text-xl">
// // //           Here's what's happening across your team today.
// // //         </p>
// // //       </div>

// // //       {/* TOP CARDS */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
// // //         {/* PROJECTS */}
// // //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// // //           <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-5">
// // //             <FolderOpen className="text-[#7c3aed]" />
// // //           </div>

// // //           <h2 className="text-4xl font-bold text-[#0f172a]">
// // //             {totalProjects}
// // //           </h2>

// // //           <p className="text-[#64748b] mt-2 text-lg">
// // //             Projects
// // //           </p>
// // //         </div>

// // //         {/* TASKS */}
// // //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// // //           <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mb-5">
// // //             <CheckSquare className="text-[#2563eb]" />
// // //           </div>

// // //           <h2 className="text-4xl font-bold text-[#0f172a]">
// // //             {totalTasks}
// // //           </h2>

// // //           <p className="text-[#64748b] mt-2 text-lg">
// // //             Total tasks
// // //           </p>
// // //         </div>

// // //         {/* IN PROGRESS */}
// // //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// // //           <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] flex items-center justify-center mb-5">
// // //             <Clock3 className="text-[#f59e0b]" />
// // //           </div>

// // //           <h2 className="text-4xl font-bold text-[#0f172a]">
// // //             {inProgressTasks}
// // //           </h2>

// // //           <p className="text-[#64748b] mt-2 text-lg">
// // //             In progress
// // //           </p>
// // //         </div>

// // //         {/* OVERDUE */}
// // //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// // //           <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-5">
// // //             <AlertTriangle className="text-[#ef4444]" />
// // //           </div>

// // //           <h2 className="text-4xl font-bold text-[#0f172a]">
// // //             {overdueTasks}
// // //           </h2>

// // //           <p className="text-[#64748b] mt-2 text-lg">
// // //             Overdue
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* MAIN */}
// // //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
// // //         {/* LEFT */}
// // //         <div className="xl:col-span-2 flex flex-col gap-6">
// // //           {/* MY TASKS */}
// // //           <div className="bg-white rounded-2xl border border-gray-100 p-6">
// // //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-6">
// // //               My tasks
// // //             </h2>

// // //             {myTasks.length === 0 ? (
// // //               <div className="h-[220px] flex items-center justify-center text-[#64748b] text-lg">
// // //                 No tasks assigned to you yet.
// // //               </div>
// // //             ) : (
// // //               <div className="space-y-4">
// // //                 {myTasks.map((task) => (
// // //                   <div
// // //                     key={task._id}
// // //                     className="border border-gray-100 rounded-2xl p-5"
// // //                   >
// // //                     <div className="flex justify-between">
// // //                       <div>
// // //                         <h3 className="font-semibold text-lg">
// // //                           {task.title}
// // //                         </h3>

// // //                         <p className="text-[#64748b] mt-1">
// // //                           {task.description}
// // //                         </p>
// // //                       </div>

// // //                       <span className="text-sm text-[#64748b]">
// // //                         {task.status}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* WEEKLY ACTIVITY */}
// // //           <div className="bg-white rounded-2xl border border-gray-100 p-6">
// // //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-6">
// // //               Weekly activity
// // //             </h2>

// // //             <div className="h-[260px]">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <AreaChart data={weeklyActivity}>
// // //                   <defs>
// // //                     <linearGradient
// // //                       id="colorActivity"
// // //                       x1="0"
// // //                       y1="0"
// // //                       x2="0"
// // //                       y2="1"
// // //                     >
// // //                       <stop
// // //                         offset="5%"
// // //                         stopColor="#7c3aed"
// // //                         stopOpacity={0.4}
// // //                       />

// // //                       <stop
// // //                         offset="95%"
// // //                         stopColor="#7c3aed"
// // //                         stopOpacity={0}
// // //                       />
// // //                     </linearGradient>
// // //                   </defs>

// // //                   <XAxis
// // //                     dataKey="day"
// // //                     axisLine={false}
// // //                     tickLine={false}
// // //                   />

// // //                   <Tooltip />

// // //                   <Area
// // //                     type="monotone"
// // //                     dataKey="count"
// // //                     stroke="#7c3aed"
// // //                     strokeWidth={3}
// // //                     fillOpacity={1}
// // //                     fill="url(#colorActivity)"
// // //                     animationDuration={1200}
// // //                   />
// // //                 </AreaChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //           </div>

// // //           {/* PROJECT PERFORMANCE */}
// // //           <div className="bg-white rounded-2xl border border-gray-100 p-6">
// // //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-6">
// // //               Project performance
// // //             </h2>

// // //             <div className="h-[300px]">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <BarChart data={projectPerformance}>
// // //                   <XAxis
// // //                     dataKey="name"
// // //                     axisLine={false}
// // //                     tickLine={false}
// // //                   />

// // //                   <Tooltip />

// // //                   <Bar
// // //                     dataKey="progress"
// // //                     radius={[10, 10, 0, 0]}
// // //                     fill="#7c3aed"
// // //                     animationDuration={1200}
// // //                   />
// // //                 </BarChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* RIGHT */}
// // //         <div className="flex flex-col gap-6">
// // //           {/* TEAM */}
// // //           <div className="bg-white rounded-2xl border border-gray-100 p-6">
// // //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-6">
// // //               Team
// // //             </h2>

// // //             <div className="space-y-5">
// // //               {team
// // //                 .filter((u) => u.role === "Member")
// // //                 .map((member) => (
// // //                   <div
// // //                     key={member._id}
// // //                     className="flex items-center gap-4"
// // //                   >
// // //                     <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold">
// // //                       {member.name?.charAt(0)}
// // //                     </div>

// // //                     <div>
// // //                       <h3 className="font-medium text-[#0f172a]">
// // //                         {member.name}
// // //                       </h3>

// // //                       <p className="text-[#64748b] text-sm">
// // //                         {member.email}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //             </div>
// // //           </div>

// // //           {/* TASK STATUS */}
// // //           <div className="bg-white rounded-2xl border border-gray-100 p-6">
// // //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-6">
// // //               Task status
// // //             </h2>

// // //             <div className="h-[260px]">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <PieChart>
// // //                   <Pie
// // //                     data={taskStatus}
// // //                     dataKey="count"
// // //                     nameKey="label"
// // //                     outerRadius={90}
// // //                     innerRadius={55}
// // //                     paddingAngle={3}
// // //                     animationDuration={1200}
// // //                   >
// // //                     {taskStatus.map((entry, index) => (
// // //                       <Cell
// // //                         key={index}
// // //                         fill={entry.color}
// // //                       />
// // //                     ))}
// // //                   </Pie>

// // //                   <Tooltip />
// // //                 </PieChart>
// // //               </ResponsiveContainer>
// // //             </div>

// // //             <div className="space-y-3 mt-4">
// // //               {taskStatus.map((item, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className="flex items-center justify-between"
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <div
// // //                       className="w-3 h-3 rounded-full"
// // //                       style={{
// // //                         background: item.color,
// // //                       }}
// // //                     />

// // //                     <span className="text-sm text-[#0f172a]">
// // //                       {item.label}
// // //                     </span>
// // //                   </div>

// // //                   <span className="text-sm text-[#64748b]">
// // //                     {item.count}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useMemo, useState } from "react";
// // import {
// //   FolderOpen,
// //   CheckSquare,
// //   Clock3,
// //   AlertTriangle,
// // } from "lucide-react";

// // import {
// //   ResponsiveContainer,
// //   AreaChart,
// //   Area,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// // } from "recharts";

// // const BASE = "http://localhost:5000/api";

// // export default function Dashboard() {
// //   const [projects, setProjects] = useState([]);
// //   const [tasks, setTasks] = useState([]);
// //   const [team, setTeam] = useState([]);
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const token = localStorage.getItem("token");

// //   // ================= LOAD =================
// //   useEffect(() => {
// //     loadDashboard();
// //   }, []);

// //   const loadDashboard = async () => {
// //     try {
// //       const [pRes, tRes, uRes, meRes] = await Promise.all([
// //         fetch(`${BASE}/projects`),

// //         fetch(`${BASE}/tasks`),

// //         fetch(`${BASE}/admin/users`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }),

// //         fetch(`${BASE}/auth/me`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }),
// //       ]);

// //       const pData = await pRes.json();
// //       const tData = await tRes.json();
// //       const uData = await uRes.json();
// //       const meData = await meRes.json();

// //       setProjects(Array.isArray(pData) ? pData : []);
// //       setTasks(Array.isArray(tData) ? tData : []);
// //       setTeam(Array.isArray(uData) ? uData : []);
// //       setCurrentUser(meData);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // ================= COUNTS =================
// //   const totalProjects = projects.length;

// //   const totalTasks = tasks.length;

// //   const inProgressTasks = tasks.filter(
// //     (t) => t.status === "In Progress"
// //   ).length;

// //   const overdueTasks = tasks.filter((t) => {
// //     return (
// //       t.dueDate &&
// //       new Date(t.dueDate) < new Date() &&
// //       t.status !== "Done"
// //     );
// //   }).length;

// //   // ================= MY TASKS =================
// //   const myTasks = tasks.filter(
// //     (t) => t.assigneeId === currentUser?._id
// //   );

// //   // ================= WEEKLY ACTIVITY =================
// //   const weeklyActivity = useMemo(() => {
// //     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// //     const result = days.map((day) => ({
// //       day,
// //       tasks: 0,
// //       completed: 0,
// //       overdue: 0,
// //     }));

// //     tasks.forEach((task) => {
// //       const date = new Date(task.createdAt);

// //       let dayIndex = date.getDay();

// //       dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

// //       result[dayIndex].tasks += 1;

// //       if (task.status === "Done") {
// //         result[dayIndex].completed += 1;
// //       }

// //       const overdue =
// //         task.dueDate &&
// //         new Date(task.dueDate) < new Date() &&
// //         task.status !== "Done";

// //       if (overdue) {
// //         result[dayIndex].overdue += 1;
// //       }
// //     });

// //     return result;
// //   }, [tasks]);

// //   // ================= TASK STATUS =================
// //   const taskStatus = [
// //     {
// //       label: "Todo",
// //       count: tasks.filter((t) => t.status === "Todo").length,
// //       color: "#94a3b8",
// //     },

// //     {
// //       label: "In Progress",
// //       count: tasks.filter((t) => t.status === "In Progress").length,
// //       color: "#f59e0b",
// //     },

// //     {
// //       label: "Done",
// //       count: tasks.filter((t) => t.status === "Done").length,
// //       color: "#22c55e",
// //     },

// //     {
// //       label: "Overdue",
// //       count: overdueTasks,
// //       color: "#ef4444",
// //     },
// //   ];

// //   // ================= PROJECT PERFORMANCE =================
// //   const projectPerformance = projects.map((project) => {
// //     const projectTasks = tasks.filter(
// //       (t) => t.projectId === project._id
// //     );

// //     const doneTasks = projectTasks.filter(
// //       (t) => t.status === "Done"
// //     ).length;

// //     const percentage =
// //       projectTasks.length === 0
// //         ? 0
// //         : Math.round((doneTasks / projectTasks.length) * 100);

// //     return {
// //       name: project.name,
// //       progress: percentage,
// //       total: projectTasks.length,
// //     };
// //   });

// //   return (
// //     <div className="p-4 scale-[0.95] origin-top">
// //       {/* HEADER */}
// //       <div className="mb-7">
// //         <h1 className="text-5xl font-bold text-[#0f172a]">
// //           Welcome back, {currentUser?.name || "User"} 👋
// //         </h1>

// //         <p className="text-[#64748b] mt-3 text-xl">
// //           Here's what's happening across your team today.
// //         </p>
// //       </div>

// //       {/* TOP CARDS */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
// //         {/* PROJECTS */}
// //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// //           <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-5">
// //             <FolderOpen className="text-[#7c3aed]" />
// //           </div>

// //           <h2 className="text-4xl font-bold text-[#0f172a]">
// //             {totalProjects}
// //           </h2>

// //           <p className="text-[#64748b] mt-2 text-lg">
// //             Projects
// //           </p>
// //         </div>

// //         {/* TASKS */}
// //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// //           <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mb-5">
// //             <CheckSquare className="text-[#2563eb]" />
// //           </div>

// //           <h2 className="text-4xl font-bold text-[#0f172a]">
// //             {totalTasks}
// //           </h2>

// //           <p className="text-[#64748b] mt-2 text-lg">
// //             Total tasks
// //           </p>
// //         </div>

// //         {/* IN PROGRESS */}
// //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// //           <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] flex items-center justify-center mb-5">
// //             <Clock3 className="text-[#f59e0b]" />
// //           </div>

// //           <h2 className="text-4xl font-bold text-[#0f172a]">
// //             {inProgressTasks}
// //           </h2>

// //           <p className="text-[#64748b] mt-2 text-lg">
// //             In progress
// //           </p>
// //         </div>

// //         {/* OVERDUE */}
// //         <div className="bg-white rounded-2xl p-5 border border-gray-100">
// //           <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-5">
// //             <AlertTriangle className="text-[#ef4444]" />
// //           </div>

// //           <h2 className="text-4xl font-bold text-[#0f172a]">
// //             {overdueTasks}
// //           </h2>

// //           <p className="text-[#64748b] mt-2 text-lg">
// //             Overdue
// //           </p>
// //         </div>
// //       </div>

// //       {/* MAIN */}
// //       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
// //         {/* LEFT */}
// //         <div className="xl:col-span-2 flex flex-col gap-6">
// //           {/* MY TASKS */}
// //           <div className="bg-white rounded-2xl border border-gray-100 p-5">
// //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
// //               My tasks
// //             </h2>

// //             {myTasks.length === 0 ? (
// //               <div className="h-[180px] flex items-center justify-center text-[#64748b]">
// //                 No tasks assigned to you yet.
// //               </div>
// //             ) : (
// //               <div className="space-y-4">
// //                 {myTasks.map((task) => (
// //                   <div
// //                     key={task._id}
// //                     className="border border-gray-100 rounded-2xl p-4"
// //                   >
// //                     <div className="flex justify-between">
// //                       <div>
// //                         <h3 className="font-semibold text-lg">
// //                           {task.title}
// //                         </h3>

// //                         <p className="text-[#64748b] mt-1">
// //                           {task.description}
// //                         </p>
// //                       </div>

// //                       <span className="text-sm text-[#64748b]">
// //                         {task.status}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* WEEKLY ACTIVITY */}
// //           <div className="bg-white rounded-2xl border border-gray-100 p-5">
// //             <div className="flex items-start justify-between mb-5">
// //               <div>
// //                 <h2 className="text-[28px] font-bold text-[#0f172a]">
// //                   Weekly Activity
// //                 </h2>

// //                 <p className="text-[#94a3b8] mt-1 text-sm">
// //                   Tasks overview this week
// //                 </p>
// //               </div>

// //               <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#64748b]">
// //                 •••
// //               </button>
// //             </div>

// //             <div className="h-[320px]">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <AreaChart data={weeklyActivity}>
// //                   <defs>
// //                     <linearGradient
// //                       id="taskGradient"
// //                       x1="0"
// //                       y1="0"
// //                       x2="0"
// //                       y2="1"
// //                     >
// //                       <stop
// //                         offset="5%"
// //                         stopColor="#6366f1"
// //                         stopOpacity={0.25}
// //                       />

// //                       <stop
// //                         offset="95%"
// //                         stopColor="#6366f1"
// //                         stopOpacity={0}
// //                       />
// //                     </linearGradient>

// //                     <linearGradient
// //                       id="completedGradient"
// //                       x1="0"
// //                       y1="0"
// //                       x2="0"
// //                       y2="1"
// //                     >
// //                       <stop
// //                         offset="5%"
// //                         stopColor="#10b981"
// //                         stopOpacity={0.2}
// //                       />

// //                       <stop
// //                         offset="95%"
// //                         stopColor="#10b981"
// //                         stopOpacity={0}
// //                       />
// //                     </linearGradient>
// //                   </defs>

// //                   <CartesianGrid
// //                     strokeDasharray="4 4"
// //                     vertical={false}
// //                     stroke="#e2e8f0"
// //                   />

// //                   <XAxis
// //                     dataKey="day"
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tick={{
// //                       fill: "#94a3b8",
// //                       fontSize: 14,
// //                     }}
// //                   />

// //                   <YAxis
// //                     axisLine={false}
// //                     tickLine={false}
// //                     tick={{
// //                       fill: "#94a3b8",
// //                       fontSize: 14,
// //                     }}
// //                   />

// //                   <Tooltip />

// //                   <Legend />

// //                   {/* TASKS */}
// //                   <Area
// //                     type="monotone"
// //                     dataKey="tasks"
// //                     stroke="#6366f1"
// //                     strokeWidth={3}
// //                     fill="url(#taskGradient)"
// //                     dot={{
// //                       r: 0,
// //                     }}
// //                     activeDot={{
// //                       r: 6,
// //                     }}
// //                     animationDuration={1800}
// //                   />

// //                   {/* COMPLETED */}
// //                   <Area
// //                     type="monotone"
// //                     dataKey="completed"
// //                     stroke="#10b981"
// //                     strokeWidth={3}
// //                     fill="url(#completedGradient)"
// //                     dot={{
// //                       r: 0,
// //                     }}
// //                     activeDot={{
// //                       r: 6,
// //                     }}
// //                     animationDuration={2200}
// //                   />

// //                   {/* OVERDUE */}
// //                   <Area
// //                     type="monotone"
// //                     dataKey="overdue"
// //                     stroke="#f59e0b"
// //                     strokeWidth={3}
// //                     fillOpacity={0}
// //                     dot={{
// //                       r: 0,
// //                     }}
// //                     activeDot={{
// //                       r: 6,
// //                     }}
// //                     animationDuration={2600}
// //                   />
// //                 </AreaChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           {/* PROJECT PERFORMANCE */}
// //           <div className="bg-white rounded-2xl border border-gray-100 p-5">
// //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
// //               Project performance
// //             </h2>

// //             <div className="h-[280px]">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={projectPerformance}>
// //                   <XAxis
// //                     dataKey="name"
// //                     axisLine={false}
// //                     tickLine={false}
// //                   />

// //                   <Tooltip />

// //                   <Bar
// //                     dataKey="progress"
// //                     radius={[10, 10, 0, 0]}
// //                     fill="#7c3aed"
// //                     animationDuration={1400}
// //                   />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT */}
// //         <div className="flex flex-col gap-6">
// //           {/* TEAM */}
// //           <div className="bg-white rounded-2xl border border-gray-100 p-5">
// //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
// //               Team
// //             </h2>

// //             <div className="space-y-5">
// //               {team
// //                 .filter((u) => u.role === "Member")
// //                 .map((member) => (
// //                   <div
// //                     key={member._id}
// //                     className="flex items-center gap-4"
// //                   >
// //                     <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold">
// //                       {member.name?.charAt(0)}
// //                     </div>

// //                     <div>
// //                       <h3 className="font-medium text-[#0f172a]">
// //                         {member.name}
// //                       </h3>

// //                       <p className="text-[#64748b] text-sm">
// //                         {member.email}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //             </div>
// //           </div>

// //           {/* TASK STATUS */}
// //           <div className="bg-white rounded-2xl border border-gray-100 p-5">
// //             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
// //               Task status
// //             </h2>

// //             <div className="h-[240px]">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <PieChart>
// //                   <Pie
// //                     data={taskStatus}
// //                     dataKey="count"
// //                     nameKey="label"
// //                     outerRadius={85}
// //                     innerRadius={50}
// //                     paddingAngle={3}
// //                     animationDuration={1200}
// //                   >
// //                     {taskStatus.map((entry, index) => (
// //                       <Cell
// //                         key={index}
// //                         fill={entry.color}
// //                       />
// //                     ))}
// //                   </Pie>

// //                   <Tooltip />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>

// //             <div className="space-y-3 mt-3">
// //               {taskStatus.map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center justify-between"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div
// //                       className="w-3 h-3 rounded-full"
// //                       style={{
// //                         background: item.color,
// //                       }}
// //                     />

// //                     <span className="text-sm text-[#0f172a]">
// //                       {item.label}
// //                     </span>
// //                   </div>

// //                   <span className="text-sm text-[#64748b]">
// //                     {item.count}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useMemo, useState } from "react";
// import {
//   FolderOpen,
//   CheckSquare,
//   Clock3,
//   AlertTriangle,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
// } from "recharts";

// const BASE = "http://localhost:5000/api";

// const PROJECT_COLORS = [
//   "#6366f1", // indigo
//   "#f59e0b", // amber
//   "#10b981", // emerald
//   "#ef4444", // red
//   "#3b82f6", // blue
//   "#ec4899", // pink
//   "#8b5cf6", // violet
//   "#14b8a6", // teal
// ];

// const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [team, setTeam] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const [pRes, tRes, uRes, meRes] = await Promise.all([
//         fetch(`${BASE}/projects`),
//         fetch(`${BASE}/tasks`),
//         fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
//         fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);

//       const pData = await pRes.json();
//       const tData = await tRes.json();
//       const uData = await uRes.json();
//       const meData = await meRes.json();

//       setProjects(Array.isArray(pData) ? pData : []);
//       setTasks(Array.isArray(tData) ? tData : []);
//       setTeam(Array.isArray(uData) ? uData : []);
//       setCurrentUser(meData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= COUNTS =================
//   const totalProjects = projects.length;
//   const totalTasks = tasks.length;
//   const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
//   const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done").length;

//   // ================= MY TASKS =================
//   const myTasks = tasks.filter((t) => t.assigneeId === currentUser?._id);

//   // ================= WEEKLY ACTIVITY =================
//   const weeklyActivity = useMemo(() => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const result = days.map((day) => ({ day, tasks: 0, completed: 0, overdue: 0 }));

//     tasks.forEach((task) => {
//       const date = new Date(task.createdAt);
//       let dayIndex = date.getDay();
//       dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
//       result[dayIndex].tasks += 1;
//       if (task.status === "Done") result[dayIndex].completed += 1;
//       const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
//       if (overdue) result[dayIndex].overdue += 1;
//     });

//     return result;
//   }, [tasks]);

//   // ================= TASK STATUS =================
//   const taskStatus = [
//     { label: "Todo",        count: tasks.filter((t) => t.status === "Todo").length,        color: "#94a3b8" },
//     { label: "In Progress", count: tasks.filter((t) => t.status === "In Progress").length, color: "#f59e0b" },
//     { label: "Done",        count: tasks.filter((t) => t.status === "Done").length,        color: "#22c55e" },
//     { label: "Overdue",     count: overdueTasks,                                           color: "#ef4444" },
//   ];

//   // ================= PROJECT PERFORMANCE (grouped by month) =================
//   // Build chart data: each entry = { month: "Jan", ProjectA: N, ProjectB: N, ... }
//   // where N = number of "Done" tasks for that project in that month (by dueDate or createdAt)
//   const { projectPerformanceData, projectNames } = useMemo(() => {
//     if (!projects.length || !tasks.length) return { projectPerformanceData: [], projectNames: [] };

//     // Determine which months have data
//     const monthSet = new Set();
//     tasks.forEach((t) => {
//       const date = new Date(t.createdAt);
//       if (!isNaN(date)) monthSet.add(date.getMonth());
//     });

//     // Sort months chronologically
//     const sortedMonths = [...monthSet].sort((a, b) => a - b);

//     // Project name lookup
//     const projectMap = {};
//     projects.forEach((p) => { projectMap[p._id] = p.name; });

//     const pNames = projects.map((p) => p.name);

//     // Build month rows
//     const rows = sortedMonths.map((monthIndex) => {
//       const row = { month: MONTHS[monthIndex] };
//       projects.forEach((p) => {
//         // Count Done tasks for this project in this month
//         const count = tasks.filter((t) => {
//           const date = new Date(t.createdAt);
//           return (
//             t.projectId === p._id &&
//             t.status === "Done" &&
//             !isNaN(date) &&
//             date.getMonth() === monthIndex
//           );
//         }).length;
//         row[p.name] = count;
//       });
//       return row;
//     });

//     return { projectPerformanceData: rows, projectNames: pNames };
//   }, [projects, tasks]);

//   return (
//     <div className="p-4 scale-[0.95] origin-top">
//       {/* HEADER */}
//       <div className="mb-7">
//         <h1 className="text-5xl font-bold text-[#0f172a]">
//           Welcome back, {currentUser?.name || "User"} 👋
//         </h1>
//         <p className="text-[#64748b] mt-3 text-xl">
//           Here's what's happening across your team today.
//         </p>
//       </div>

//       {/* TOP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-5">
//             <FolderOpen className="text-[#7c3aed]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{totalProjects}</h2>
//           <p className="text-[#64748b] mt-2 text-lg">Projects</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mb-5">
//             <CheckSquare className="text-[#2563eb]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{totalTasks}</h2>
//           <p className="text-[#64748b] mt-2 text-lg">Total tasks</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] flex items-center justify-center mb-5">
//             <Clock3 className="text-[#f59e0b]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{inProgressTasks}</h2>
//           <p className="text-[#64748b] mt-2 text-lg">In progress</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-5">
//             <AlertTriangle className="text-[#ef4444]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{overdueTasks}</h2>
//           <p className="text-[#64748b] mt-2 text-lg">Overdue</p>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* LEFT */}
//         <div className="xl:col-span-2 flex flex-col gap-6">
//           {/* MY TASKS */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">My tasks</h2>
//             {myTasks.length === 0 ? (
//               <div className="h-[180px] flex items-center justify-center text-[#64748b]">
//                 No tasks assigned to you yet.
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {myTasks.map((task) => (
//                   <div key={task._id} className="border border-gray-100 rounded-2xl p-4">
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-semibold text-lg">{task.title}</h3>
//                         <p className="text-[#64748b] mt-1">{task.description}</p>
//                       </div>
//                       <span className="text-sm text-[#64748b]">{task.status}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* WEEKLY ACTIVITY */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <div className="flex items-start justify-between mb-5">
//               <div>
//                 <h2 className="text-[28px] font-bold text-[#0f172a]">Weekly Activity</h2>
//                 <p className="text-[#94a3b8] mt-1 text-sm">Tasks overview this week</p>
//               </div>
//               <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#64748b]">
//                 •••
//               </button>
//             </div>
//             <div className="h-[320px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={weeklyActivity}>
//                   <defs>
//                     <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 14 }} />
//                   <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 14 }} />
//                   <Tooltip />
//                   <Legend />
//                   <Area type="monotone" dataKey="tasks"     stroke="#6366f1" strokeWidth={3} fill="url(#taskGradient)"      dot={{ r: 0 }} activeDot={{ r: 6 }} animationDuration={1800} />
//                   <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fill="url(#completedGradient)" dot={{ r: 0 }} activeDot={{ r: 6 }} animationDuration={2200} />
//                   <Area type="monotone" dataKey="overdue"   stroke="#f59e0b" strokeWidth={3} fillOpacity={0}                dot={{ r: 0 }} activeDot={{ r: 6 }} animationDuration={2600} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* PROJECT PERFORMANCE — grouped bar chart, real data only */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <div className="mb-5">
//               <h2 className="text-2xl font-semibold text-[#0f172a]">Project Performance</h2>
//               <p className="text-[#94a3b8] text-sm mt-1">Tasks completed by project</p>
//             </div>

//             {projectPerformanceData.length === 0 ? (
//               <div className="h-[280px] flex items-center justify-center text-[#64748b] text-sm">
//                 No completed task data yet.
//               </div>
//             ) : (
//               <div className="h-[280px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={projectPerformanceData}
//                     barCategoryGap="30%"
//                     barGap={3}
//                   >
//                     <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                     <XAxis
//                       dataKey="month"
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "#94a3b8", fontSize: 13 }}
//                     />
//                     <YAxis
//                       axisLine={false}
//                       tickLine={false}
//                       tick={{ fill: "#94a3b8", fontSize: 13 }}
//                       allowDecimals={false}
//                     />
//                     <Tooltip
//                       cursor={{ fill: "rgba(0,0,0,0.04)" }}
//                       contentStyle={{
//                         borderRadius: 10,
//                         border: "1px solid #e2e8f0",
//                         fontSize: 13,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                       }}
//                     />
//                     <Legend
//                       iconType="circle"
//                       iconSize={9}
//                       wrapperStyle={{ fontSize: 13, paddingTop: 16 }}
//                     />
//                     {projectNames.map((name, idx) => (
//                       <Bar
//                         key={name}
//                         dataKey={name}
//                         fill={PROJECT_COLORS[idx % PROJECT_COLORS.length]}
//                         radius={[5, 5, 0, 0]}
//                         animationDuration={1400 + idx * 200}
//                       />
//                     ))}
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col gap-6">
//           {/* TEAM */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">Team</h2>
//             <div className="space-y-5">
//               {team
//                 .filter((u) => u.role === "Member")
//                 .map((member) => (
//                   <div key={member._id} className="flex items-center gap-4">
//                     <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold">
//                       {member.name?.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-[#0f172a]">{member.name}</h3>
//                       <p className="text-[#64748b] text-sm">{member.email}</p>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {/* TASK STATUS */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">Task status</h2>
//             <div className="h-[240px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={taskStatus}
//                     dataKey="count"
//                     nameKey="label"
//                     outerRadius={85}
//                     innerRadius={50}
//                     paddingAngle={3}
//                     animationDuration={1200}
//                   >
//                     {taskStatus.map((entry, index) => (
//                       <Cell key={index} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="space-y-3 mt-3">
//               {taskStatus.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
//                     <span className="text-sm text-[#0f172a]">{item.label}</span>
//                   </div>
//                   <span className="text-sm text-[#64748b]">{item.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useMemo, useState } from "react";
// import {
//   FolderOpen,
//   CheckSquare,
//   Clock3,
//   AlertTriangle,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
// } from "recharts";

// const BASE = "http://localhost:5000/api";

// const PROJECT_COLORS = [
//   "#6366f1",
//   "#f59e0b",
//   "#10b981",
//   "#ef4444",
//   "#3b82f6",
//   "#ec4899",
//   "#8b5cf6",
//   "#14b8a6",
// ];

// const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [team, setTeam] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const [pRes, tRes, uRes, meRes] = await Promise.all([
//         fetch(`${BASE}/projects`),
//         fetch(`${BASE}/tasks`),
//         fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
//         fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);

//       const pData = await pRes.json();
//       const tData = await tRes.json();
//       const uData = await uRes.json();
//       const meData = await meRes.json();

//       setProjects(Array.isArray(pData) ? pData : []);
//       setTasks(Array.isArray(tData) ? tData : []);
//       setTeam(Array.isArray(uData) ? uData : []);
//       setCurrentUser(meData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= COUNTS =================
//   const totalProjects = projects.length;
//   const totalTasks = tasks.length;
//   const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
//   const overdueTasks = tasks.filter(
//     (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
//   ).length;

//   // ================= MY TASKS =================
//   const myTasks = tasks.filter((t) => t.assigneeId === currentUser?._id);

//   // ================= WEEKLY ACTIVITY =================
//   const weeklyActivity = useMemo(() => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const result = days.map((day) => ({ day, tasks: 0, completed: 0, overdue: 0 }));

//     tasks.forEach((task) => {
//       const date = new Date(task.createdAt);
//       let dayIndex = date.getDay();
//       dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
//       result[dayIndex].tasks += 1;
//       if (task.status === "Done") result[dayIndex].completed += 1;
//       const overdue =
//         task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
//       if (overdue) result[dayIndex].overdue += 1;
//     });

//     return result;
//   }, [tasks]);

//   // ================= TASK STATUS =================
//   const taskStatus = [
//     { label: "Todo",        count: tasks.filter((t) => t.status === "Todo").length,        color: "#94a3b8" },
//     { label: "In Progress", count: tasks.filter((t) => t.status === "In Progress").length, color: "#f59e0b" },
//     { label: "Done",        count: tasks.filter((t) => t.status === "Done").length,        color: "#22c55e" },
//     { label: "Overdue",     count: overdueTasks,                                           color: "#ef4444" },
//   ];

//   // ================= PROJECT PERFORMANCE =================
//   const { projectPerformanceData, projectNames } = useMemo(() => {
//     if (!projects.length || !tasks.length) return { projectPerformanceData: [], projectNames: [] };

//     const monthSet = new Set();
//     tasks.forEach((t) => {
//       const date = new Date(t.createdAt);
//       if (!isNaN(date)) monthSet.add(date.getMonth());
//     });

//     const sortedMonths = [...monthSet].sort((a, b) => a - b);
//     const pNames = projects.map((p) => p.name);

//     const rows = sortedMonths.map((monthIndex) => {
//       const row = { month: MONTHS[monthIndex] };
//       projects.forEach((p) => {
//         const count = tasks.filter((t) => {
//           const date = new Date(t.createdAt);
//           return (
//             t.projectId === p._id &&
//             t.status === "Done" &&
//             !isNaN(date) &&
//             date.getMonth() === monthIndex
//           );
//         }).length;
//         row[p.name] = count;
//       });
//       return row;
//     });

//     return { projectPerformanceData: rows, projectNames: pNames };
//   }, [projects, tasks]);

//   return (
//     // Removed scale-[0.95] and origin-top — parent layout handles scroll
//     <div className="p-4">
//       {/* HEADER */}
//       <div className="mb-5">
//         <h1 className="text-3xl font-bold text-[#0f172a]">
//           Welcome back, {currentUser?.name || "User"} 👋
//         </h1>
//         <p className="text-[#64748b] mt-1 text-sm">
//           Here's what's happening across your team today.
//         </p>
//       </div>

//       {/* TOP CARDS */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
//         <div className="bg-white rounded-xl p-4 border border-gray-100">
//           <div className="w-9 h-9 rounded-xl bg-[#ede9fe] flex items-center justify-center mb-3">
//             <FolderOpen size={17} className="text-[#7c3aed]" />
//           </div>
//           <h2 className="text-3xl font-bold text-[#0f172a]">{totalProjects}</h2>
//           <p className="text-[#64748b] mt-1 text-sm">Projects</p>
//         </div>

//         <div className="bg-white rounded-xl p-4 border border-gray-100">
//           <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center mb-3">
//             <CheckSquare size={17} className="text-[#2563eb]" />
//           </div>
//           <h2 className="text-3xl font-bold text-[#0f172a]">{totalTasks}</h2>
//           <p className="text-[#64748b] mt-1 text-sm">Total tasks</p>
//         </div>

//         <div className="bg-white rounded-xl p-4 border border-gray-100">
//           <div className="w-9 h-9 rounded-xl bg-[#fef3c7] flex items-center justify-center mb-3">
//             <Clock3 size={17} className="text-[#f59e0b]" />
//           </div>
//           <h2 className="text-3xl font-bold text-[#0f172a]">{inProgressTasks}</h2>
//           <p className="text-[#64748b] mt-1 text-sm">In progress</p>
//         </div>

//         <div className="bg-white rounded-xl p-4 border border-gray-100">
//           <div className="w-9 h-9 rounded-xl bg-[#fee2e2] flex items-center justify-center mb-3">
//             <AlertTriangle size={17} className="text-[#ef4444]" />
//           </div>
//           <h2 className="text-3xl font-bold text-[#0f172a]">{overdueTasks}</h2>
//           <p className="text-[#64748b] mt-1 text-sm">Overdue</p>
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
//         {/* LEFT */}
//         <div className="xl:col-span-2 flex flex-col gap-4">

//           {/* MY TASKS */}
//           <div className="bg-white rounded-xl border border-gray-100 p-4">
//             <h2 className="text-base font-semibold text-[#0f172a] mb-3">My tasks</h2>
//             {myTasks.length === 0 ? (
//               <div className="h-[80px] flex items-center justify-center text-[#94a3b8] text-sm">
//                 No tasks assigned to you yet.
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 {myTasks.map((task) => (
//                   <div key={task._id} className="border border-gray-100 rounded-xl p-3">
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-semibold text-sm">{task.title}</h3>
//                         <p className="text-[#64748b] mt-0.5 text-xs">{task.description}</p>
//                       </div>
//                       <span className="text-xs text-[#64748b]">{task.status}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* WEEKLY ACTIVITY */}
//           <div className="bg-white rounded-xl border border-gray-100 p-4">
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <h2 className="text-base font-bold text-[#0f172a]">Weekly Activity</h2>
//                 <p className="text-[#94a3b8] text-xs mt-0.5">Tasks overview this week</p>
//               </div>
//               <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-[#64748b] text-xs">
//                 •••
//               </button>
//             </div>
//             <div className="h-[220px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={weeklyActivity}>
//                   <defs>
//                     <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
//                   <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
//                   <Tooltip />
//                   <Legend wrapperStyle={{ fontSize: 11 }} />
//                   <Area type="monotone" dataKey="tasks"     stroke="#6366f1" strokeWidth={2.5} fill="url(#taskGradient)"      dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={1800} />
//                   <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} fill="url(#completedGradient)" dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={2200} />
//                   <Area type="monotone" dataKey="overdue"   stroke="#f59e0b" strokeWidth={2.5} fillOpacity={0}                dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={2600} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* PROJECT PERFORMANCE */}
//           <div className="bg-white rounded-xl border border-gray-100 p-4">
//             <div className="mb-3">
//               <h2 className="text-base font-semibold text-[#0f172a]">Project Performance</h2>
//               <p className="text-[#94a3b8] text-xs mt-0.5">Tasks completed by project</p>
//             </div>

//             {projectPerformanceData.length === 0 ? (
//               <div className="h-[160px] flex items-center justify-center text-[#64748b] text-sm">
//                 No completed task data yet.
//               </div>
//             ) : (
//               <div className="h-[180px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={projectPerformanceData} barCategoryGap="30%" barGap={3}>
//                     <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} allowDecimals={false} />
//                     <Tooltip
//                       cursor={{ fill: "rgba(0,0,0,0.04)" }}
//                       contentStyle={{
//                         borderRadius: 8,
//                         border: "1px solid #e2e8f0",
//                         fontSize: 11,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                       }}
//                     />
//                     <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
//                     {projectNames.map((name, idx) => (
//                       <Bar
//                         key={name}
//                         dataKey={name}
//                         fill={PROJECT_COLORS[idx % PROJECT_COLORS.length]}
//                         radius={[4, 4, 0, 0]}
//                         animationDuration={1400 + idx * 200}
//                       />
//                     ))}
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col gap-4">

//           {/* TEAM */}
//           <div className="bg-white rounded-xl border border-gray-100 p-4">
//             <h2 className="text-base font-semibold text-[#0f172a] mb-3">Team</h2>
//             <div className="space-y-3">
//               {team
//                 .filter((u) => u.role === "Member")
//                 .map((member) => (
//                   <div key={member._id} className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold text-sm flex-shrink-0">
//                       {member.name?.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-sm text-[#0f172a]">{member.name}</h3>
//                       <p className="text-[#64748b] text-xs">{member.email}</p>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {/* TASK STATUS */}
//           <div className="bg-white rounded-xl border border-gray-100 p-4">
//             <h2 className="text-base font-semibold text-[#0f172a] mb-3">Task status</h2>
//             <div className="h-[180px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={taskStatus}
//                     dataKey="count"
//                     nameKey="label"
//                     outerRadius={70}
//                     innerRadius={42}
//                     paddingAngle={3}
//                     animationDuration={1200}
//                   >
//                     {taskStatus.map((entry, index) => (
//                       <Cell key={index} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="space-y-2 mt-2">
//               {taskStatus.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
//                     <span className="text-xs text-[#0f172a]">{item.label}</span>
//                   </div>
//                   <span className="text-xs text-[#64748b]">{item.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useMemo, useState } from "react";
// import {
//   FolderOpen,
//   CheckSquare,
//   Clock3,
//   AlertTriangle,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
// } from "recharts";

// const BASE = "http://localhost:5000/api";

// const PROJECT_COLORS = [
//   "#6366f1",
//   "#f59e0b",
//   "#10b981",
//   "#ef4444",
//   "#3b82f6",
//   "#ec4899",
//   "#8b5cf6",
//   "#14b8a6",
// ];

// const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export default function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [team, setTeam] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const [pRes, tRes, uRes, meRes] = await Promise.all([
//         fetch(`${BASE}/projects`),
//         fetch(`${BASE}/tasks`),
//         fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
//         fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } }),
//       ]);

//       const pData = await pRes.json();
//       const tData = await tRes.json();
//       const uData = await uRes.json();
//       const meData = await meRes.json();

//       setProjects(Array.isArray(pData) ? pData : []);
//       setTasks(Array.isArray(tData) ? tData : []);
//       setTeam(Array.isArray(uData) ? uData : []);
//       setCurrentUser(meData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= COUNTS =================
//   const totalProjects = projects.length;
//   const totalTasks = tasks.length;
//   const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
//   const overdueTasks = tasks.filter(
//     (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
//   ).length;

//   // ================= MY TASKS =================
//   const myTasks = tasks.filter((t) => t.assigneeId === currentUser?._id);

//   // ================= WEEKLY ACTIVITY =================
//   const weeklyActivity = useMemo(() => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const result = days.map((day) => ({ day, tasks: 0, completed: 0, overdue: 0 }));

//     tasks.forEach((task) => {
//       const date = new Date(task.createdAt);
//       let dayIndex = date.getDay();
//       dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
//       result[dayIndex].tasks += 1;
//       if (task.status === "Done") result[dayIndex].completed += 1;
//       const overdue =
//         task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
//       if (overdue) result[dayIndex].overdue += 1;
//     });

//     return result;
//   }, [tasks]);

//   // ================= TASK STATUS =================
//   const taskStatus = [
//     { label: "Todo",        count: tasks.filter((t) => t.status === "Todo").length,        color: "#94a3b8" },
//     { label: "In Progress", count: tasks.filter((t) => t.status === "In Progress").length, color: "#f59e0b" },
//     { label: "Done",        count: tasks.filter((t) => t.status === "Done").length,        color: "#22c55e" },
//     { label: "Overdue",     count: overdueTasks,                                           color: "#ef4444" },
//   ];

//   // ================= PROJECT PERFORMANCE =================
//   const { projectPerformanceData, projectNames } = useMemo(() => {
//     if (!projects.length || !tasks.length) return { projectPerformanceData: [], projectNames: [] };

//     const monthSet = new Set();
//     tasks.forEach((t) => {
//       const date = new Date(t.createdAt);
//       if (!isNaN(date)) monthSet.add(date.getMonth());
//     });

//     const sortedMonths = [...monthSet].sort((a, b) => a - b);
//     const pNames = projects.map((p) => p.name);

//     const rows = sortedMonths.map((monthIndex) => {
//       const row = { month: MONTHS[monthIndex] };
//       projects.forEach((p) => {
//         const count = tasks.filter((t) => {
//           const date = new Date(t.createdAt);
//           return (
//             t.projectId === p._id &&
//             t.status === "Done" &&
//             !isNaN(date) &&
//             date.getMonth() === monthIndex
//           );
//         }).length;
//         row[p.name] = count;
//       });
//       return row;
//     });

//     return { projectPerformanceData: rows, projectNames: pNames };
//   }, [projects, tasks]);

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-[#0f172a]">
//           Welcome back, {currentUser?.name || "User"} 👋
//         </h1>
//         <p className="text-[#64748b] mt-2 text-base">
//           Here's what's happening across your team today.
//         </p>
//       </div>

//       {/* TOP CARDS */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-11 h-11 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-4">
//             <FolderOpen size={20} className="text-[#7c3aed]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{totalProjects}</h2>
//           <p className="text-[#64748b] mt-1.5 text-base">Projects</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-11 h-11 rounded-2xl bg-[#dbeafe] flex items-center justify-center mb-4">
//             <CheckSquare size={20} className="text-[#2563eb]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{totalTasks}</h2>
//           <p className="text-[#64748b] mt-1.5 text-base">Total tasks</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-11 h-11 rounded-2xl bg-[#fef3c7] flex items-center justify-center mb-4">
//             <Clock3 size={20} className="text-[#f59e0b]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{inProgressTasks}</h2>
//           <p className="text-[#64748b] mt-1.5 text-base">In progress</p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-gray-100">
//           <div className="w-11 h-11 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-4">
//             <AlertTriangle size={20} className="text-[#ef4444]" />
//           </div>
//           <h2 className="text-4xl font-bold text-[#0f172a]">{overdueTasks}</h2>
//           <p className="text-[#64748b] mt-1.5 text-base">Overdue</p>
//         </div>
//       </div>

//       {/* MAIN GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
//         {/* LEFT */}
//         <div className="xl:col-span-2 flex flex-col gap-5">

//           {/* MY TASKS */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-lg font-semibold text-[#0f172a] mb-4">My tasks</h2>
//             {myTasks.length === 0 ? (
//               <div className="h-[100px] flex items-center justify-center text-[#94a3b8] text-sm">
//                 No tasks assigned to you yet.
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {myTasks.map((task) => (
//                   <div key={task._id} className="border border-gray-100 rounded-xl p-4">
//                     <div className="flex justify-between">
//                       <div>
//                         <h3 className="font-semibold text-sm">{task.title}</h3>
//                         <p className="text-[#64748b] mt-1 text-xs">{task.description}</p>
//                       </div>
//                       <span className="text-xs text-[#64748b]">{task.status}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* WEEKLY ACTIVITY */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h2 className="text-lg font-bold text-[#0f172a]">Weekly Activity</h2>
//                 <p className="text-[#94a3b8] text-xs mt-1">Tasks overview this week</p>
//               </div>
//               <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-[#64748b] text-sm">
//                 •••
//               </button>
//             </div>
//             <div className="h-[280px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={weeklyActivity}>
//                   <defs>
//                     <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
//                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                     </linearGradient>
//                     <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
//                       <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                   <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                   <Tooltip />
//                   <Legend wrapperStyle={{ fontSize: 12 }} />
//                   <Area type="monotone" dataKey="tasks"     stroke="#6366f1" strokeWidth={2.5} fill="url(#taskGradient)"      dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={1800} />
//                   <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} fill="url(#completedGradient)" dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={2200} />
//                   <Area type="monotone" dataKey="overdue"   stroke="#f59e0b" strokeWidth={2.5} fillOpacity={0}                dot={{ r: 0 }} activeDot={{ r: 5 }} animationDuration={2600} />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* PROJECT PERFORMANCE */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <div className="mb-4">
//               <h2 className="text-lg font-semibold text-[#0f172a]">Project Performance</h2>
//               <p className="text-[#94a3b8] text-xs mt-1">Tasks completed by project</p>
//             </div>

//             {projectPerformanceData.length === 0 ? (
//               <div className="h-[200px] flex items-center justify-center text-[#64748b] text-sm">
//                 No completed task data yet.
//               </div>
//             ) : (
//               <div className="h-[220px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={projectPerformanceData} barCategoryGap="30%" barGap={3}>
//                     <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
//                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} allowDecimals={false} />
//                     <Tooltip
//                       cursor={{ fill: "rgba(0,0,0,0.04)" }}
//                       contentStyle={{
//                         borderRadius: 10,
//                         border: "1px solid #e2e8f0",
//                         fontSize: 12,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                       }}
//                     />
//                     <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
//                     {projectNames.map((name, idx) => (
//                       <Bar
//                         key={name}
//                         dataKey={name}
//                         fill={PROJECT_COLORS[idx % PROJECT_COLORS.length]}
//                         radius={[5, 5, 0, 0]}
//                         animationDuration={1400 + idx * 200}
//                       />
//                     ))}
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col gap-5">

//           {/* TEAM */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-lg font-semibold text-[#0f172a] mb-4">Team</h2>
//             <div className="space-y-4">
//               {team
//                 .filter((u) => u.role === "Member")
//                 .map((member) => (
//                   <div key={member._id} className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold text-sm flex-shrink-0">
//                       {member.name?.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-sm text-[#0f172a]">{member.name}</h3>
//                       <p className="text-[#64748b] text-xs">{member.email}</p>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {/* TASK STATUS */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-5">
//             <h2 className="text-lg font-semibold text-[#0f172a] mb-4">Task status</h2>
//             <div className="h-[220px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={taskStatus}
//                     dataKey="count"
//                     nameKey="label"
//                     outerRadius={85}
//                     innerRadius={52}
//                     paddingAngle={3}
//                     animationDuration={1200}
//                   >
//                     {taskStatus.map((entry, index) => (
//                       <Cell key={index} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="space-y-3 mt-2">
//               {taskStatus.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2.5">
//                     <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
//                     <span className="text-sm text-[#0f172a]">{item.label}</span>
//                   </div>
//                   <span className="text-sm text-[#64748b]">{item.count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import {
  FolderOpen,
  CheckSquare,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
 CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const BASE = "http://localhost:5000/api";

const PROJECT_COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [currentUser, setCurrentUser] =
    useState(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    loadDashboard();
  }, []);

  // ================= LOAD =================
  const loadDashboard = async () => {
    try {
      const authHeaders = {
        Authorization: `Bearer ${token}`,
      };

      const [
        pRes,
        tRes,
        uRes,
        meRes,
      ] = await Promise.all([
        fetch(`${BASE}/projects`, {
          headers: authHeaders,
        }),

        fetch(`${BASE}/tasks`, {
          headers: authHeaders,
        }),

        fetch(`${BASE}/admin/users`, {
          headers: authHeaders,
        }),

        fetch(`${BASE}/auth/me`, {
          headers: authHeaders,
        }),
      ]);

      const pData = await pRes.json();
      const tData = await tRes.json();
      const uData = await uRes.json();
      const meData =
        await meRes.json();

      setProjects(
        Array.isArray(pData)
          ? pData
          : []
      );

      setTasks(
        Array.isArray(tData)
          ? tData
          : []
      );

      setTeam(
        Array.isArray(uData)
          ? uData
          : []
      );

      setCurrentUser(meData);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= COUNTS =================
  const totalProjects =
    projects.length;

  const totalTasks = tasks.length;

  const inProgressTasks =
    tasks.filter(
      (t) =>
        t.status ===
        "In Progress"
    ).length;

  const overdueTasks =
    tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) <
          new Date() &&
        t.status !== "Done"
    ).length;

  // ================= MY TASKS =================
  const myTasks = tasks.filter(
    (t) =>
      t.assigneeId ===
      currentUser?._id
  );

  // ================= WEEKLY ACTIVITY =================
  const weeklyActivity =
    useMemo(() => {
      const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ];

      const result = days.map(
        (day) => ({
          day,
          tasks: 0,
          completed: 0,
          overdue: 0,
        })
      );

      tasks.forEach((task) => {
        const date = new Date(
          task.createdAt
        );

        let dayIndex =
          date.getDay();

        dayIndex =
          dayIndex === 0
            ? 6
            : dayIndex - 1;

        result[dayIndex].tasks += 1;

        if (
          task.status === "Done"
        ) {
          result[
            dayIndex
          ].completed += 1;
        }

        const overdue =
          task.dueDate &&
          new Date(
            task.dueDate
          ) < new Date() &&
          task.status !== "Done";

        if (overdue) {
          result[
            dayIndex
          ].overdue += 1;
        }
      });

      return result;
    }, [tasks]);

  // ================= TASK STATUS =================
  const taskStatus = [
    {
      label: "Todo",
      count: tasks.filter(
        (t) =>
          t.status === "Todo"
      ).length,
      color: "#94a3b8",
    },

    {
      label: "In Progress",
      count: tasks.filter(
        (t) =>
          t.status ===
          "In Progress"
      ).length,
      color: "#f59e0b",
    },

    {
      label: "Done",
      count: tasks.filter(
        (t) =>
          t.status === "Done"
      ).length,
      color: "#22c55e",
    },

    {
      label: "Overdue",
      count: overdueTasks,
      color: "#ef4444",
    },
  ];

  // ================= PROJECT PERFORMANCE =================
  const {
    projectPerformanceData,
    projectNames,
  } = useMemo(() => {
    if (
      !projects.length ||
      !tasks.length
    ) {
      return {
        projectPerformanceData:
          [],
        projectNames: [],
      };
    }

    const monthSet =
      new Set();

    tasks.forEach((t) => {
      const date = new Date(
        t.createdAt
      );

      if (!isNaN(date)) {
        monthSet.add(
          date.getMonth()
        );
      }
    });

    const sortedMonths = [
      ...monthSet,
    ].sort((a, b) => a - b);

    const pNames =
      projects.map(
        (p) => p.name
      );

    const rows =
      sortedMonths.map(
        (monthIndex) => {
          const row = {
            month:
              MONTHS[
                monthIndex
              ],
          };

          projects.forEach(
            (p) => {
              const count =
                tasks.filter(
                  (t) => {
                    const date =
                      new Date(
                        t.createdAt
                      );

                    return (
                      t.projectId ===
                        p._id &&
                      t.status ===
                        "Done" &&
                      !isNaN(
                        date
                      ) &&
                      date.getMonth() ===
                        monthIndex
                    );
                  }
                ).length;

              row[p.name] =
                count;
            }
          );

          return row;
        }
      );

    return {
      projectPerformanceData:
        rows,
      projectNames: pNames,
    };
  }, [projects, tasks]);

  return (
    <div className="p-5 max-w-[1600px] mx-auto">

      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-4xl font-bold text-[#0f172a]">
          Welcome back,{" "}
          {currentUser?.name ||
            "User"}{" "}
          👋
        </h1>

        <p className="text-[#64748b] mt-2 text-sm">
          Here's what's happening
          across your team today.
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

        {/* PROJECTS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-11 h-11 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-4">
            <FolderOpen
              size={20}
              className="text-[#7c3aed]"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#0f172a]">
            {totalProjects}
          </h2>

          <p className="text-[#64748b] mt-1 text-sm">
            Projects
          </p>
        </div>

        {/* TASKS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-11 h-11 rounded-2xl bg-[#dbeafe] flex items-center justify-center mb-4">
            <CheckSquare
              size={20}
              className="text-[#2563eb]"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#0f172a]">
            {totalTasks}
          </h2>

          <p className="text-[#64748b] mt-1 text-sm">
            Total tasks
          </p>
        </div>

        {/* IN PROGRESS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-11 h-11 rounded-2xl bg-[#fef3c7] flex items-center justify-center mb-4">
            <Clock3
              size={20}
              className="text-[#f59e0b]"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#0f172a]">
            {inProgressTasks}
          </h2>

          <p className="text-[#64748b] mt-1 text-sm">
            In progress
          </p>
        </div>

        {/* OVERDUE */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="w-11 h-11 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-4">
            <AlertTriangle
              size={20}
              className="text-[#ef4444]"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#0f172a]">
            {overdueTasks}
          </h2>

          <p className="text-[#64748b] mt-1 text-sm">
            Overdue
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* LEFT */}
        <div className="xl:col-span-2 flex flex-col gap-5">

          {/* MY TASKS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
              My tasks
            </h2>

            {myTasks.length ===
            0 ? (
              <div className="h-[100px] flex items-center justify-center text-[#94a3b8] text-sm">
                No tasks assigned
                to you yet.
              </div>
            ) : (
              <div className="space-y-3">
                {myTasks.map(
                  (task) => (
                    <div
                      key={task._id}
                      className="border border-gray-100 rounded-xl p-4"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">
                            {
                              task.title
                            }
                          </h3>

                          <p className="text-[#64748b] mt-1 text-xs">
                            {
                              task.description
                            }
                          </p>
                        </div>

                        <span className="text-xs text-[#64748b]">
                          {
                            task.status
                          }
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* WEEKLY ACTIVITY */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0f172a]">
                  Weekly Activity
                </h2>

                <p className="text-[#94a3b8] text-xs mt-1">
                  Tasks overview
                  this week
                </p>
              </div>

              <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-[#64748b] text-sm">
                •••
              </button>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart
                  data={
                    weeklyActivity
                  }
                >
                  <defs>
                    <linearGradient
                      id="taskGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#6366f1"
                        stopOpacity={
                          0.25
                        }
                      />

                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>

                    <linearGradient
                      id="completedGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={
                          0.2
                        }
                      />

                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={
                      false
                    }
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip />

                  <Legend
                    wrapperStyle={{
                      fontSize: 12,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#6366f1"
                    strokeWidth={
                      2.5
                    }
                    fill="url(#taskGradient)"
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                    }}
                    animationDuration={
                      1800
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={
                      2.5
                    }
                    fill="url(#completedGradient)"
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                    }}
                    animationDuration={
                      2200
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="overdue"
                    stroke="#f59e0b"
                    strokeWidth={
                      2.5
                    }
                    fillOpacity={0}
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                    }}
                    animationDuration={
                      2600
                    }
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5">

          {/* TEAM */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
              Team
            </h2>

            <div className="space-y-4">
              {team
                .filter(
                  (u) =>
                    u.role ===
                    "Member"
                )
                .map((member) => (
                  <div
                    key={
                      member._id
                    }
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold text-sm">
                      {member.name?.charAt(
                        0
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-sm text-[#0f172a]">
                        {
                          member.name
                        }
                      </h3>

                      <p className="text-[#64748b] text-xs">
                        {
                          member.email
                        }
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* TASK STATUS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
              Task status
            </h2>

            <div className="h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={taskStatus}
                    dataKey="count"
                    nameKey="label"
                    outerRadius={
                      85
                    }
                    innerRadius={
                      52
                    }
                    paddingAngle={
                      3
                    }
                    animationDuration={
                      1200
                    }
                  >
                    {taskStatus.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={
                            index
                          }
                          fill={
                            entry.color
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-2">
              {taskStatus.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background:
                            item.color,
                        }}
                      />

                      <span className="text-sm text-[#0f172a]">
                        {
                          item.label
                        }
                      </span>
                    </div>

                    <span className="text-sm text-[#64748b]">
                      {
                        item.count
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}