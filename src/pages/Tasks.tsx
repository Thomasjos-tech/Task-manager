// // // // // // // // // // // // // import { useMemo, useState } from "react";
// // // // // // // // // // // // // import { useSearchParams } from "react-router-dom";
// // // // // // // // // // // // // import { Plus, Trash2, AlertTriangle, Search, Flag } from "lucide-react";
// // // // // // // // // // // // // import { useStore, Status, Task, Priority, isOverdue } from "@/lib/store";
// // // // // // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // // // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // // // // // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
// // // // // // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // // // // // import { StatusBadge } from "@/components/StatusBadge";
// // // // // // // // // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // // // // // // // // import { toast } from "sonner";
// // // // // // // // // // // // // import { cn } from "@/lib/utils";

// // // // // // // // // // // // // const STATUSES: Status[] = ["Todo", "In Progress", "Done"];
// // // // // // // // // // // // // const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

// // // // // // // // // // // // // const priorityStyles: Record<Priority, string> = {
// // // // // // // // // // // // //   High: "text-destructive bg-destructive/10 border-destructive/20",
// // // // // // // // // // // // //   Medium: "text-warning bg-warning/10 border-warning/20",
// // // // // // // // // // // // //   Low: "text-muted-foreground bg-muted border-border",
// // // // // // // // // // // // // };

// // // // // // // // // // // // // const Tasks = () => {
// // // // // // // // // // // // //   const { tasks, projects, users, currentUser, addTask, updateTask, deleteTask } = useStore();
// // // // // // // // // // // // //   const [params, setParams] = useSearchParams();
// // // // // // // // // // // // //   const projectFilter = params.get("project") || "all";
// // // // // // // // // // // // //   const [userFilter, setUserFilter] = useState("all");
// // // // // // // // // // // // //   const [statusFilter, setStatusFilter] = useState<string>("all");
// // // // // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // // // // //   const [open, setOpen] = useState(false);
// // // // // // // // // // // // //   const isAdmin = currentUser?.role === "Admin";

// // // // // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // // // // //     title: "",
// // // // // // // // // // // // //     description: "",
// // // // // // // // // // // // //     projectId: projects[0]?.id || "",
// // // // // // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // // // // // //     priority: "Medium" as Priority,
// // // // // // // // // // // // //     dueDate: "",
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // // // // // //     return tasks.filter((t) => {
// // // // // // // // // // // // //       if (projectFilter !== "all" && t.projectId !== projectFilter) return false;
// // // // // // // // // // // // //       if (userFilter !== "all" && t.assigneeId !== userFilter) return false;
// // // // // // // // // // // // //       if (statusFilter !== "all" && t.status !== statusFilter) return false;
// // // // // // // // // // // // //       if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
// // // // // // // // // // // // //       return true;
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   }, [tasks, projectFilter, userFilter, statusFilter, search]);

// // // // // // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // // // // // //     const g: Record<Status, Task[]> = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // // // // // //     filtered.forEach((t) => g[t.status].push(t));
// // // // // // // // // // // // //     return g;
// // // // // // // // // // // // //   }, [filtered]);

// // // // // // // // // // // // //   const create = (e: React.FormEvent) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     addTask({
// // // // // // // // // // // // //       title: form.title,
// // // // // // // // // // // // //       description: form.description,
// // // // // // // // // // // // //       projectId: form.projectId,
// // // // // // // // // // // // //       status: "Todo",
// // // // // // // // // // // // //       priority: form.priority,
// // // // // // // // // // // // //       assigneeId: form.assigneeId === "unassigned" ? undefined : form.assigneeId,
// // // // // // // // // // // // //       dueDate: form.dueDate || undefined,
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     toast.success("Task created");
// // // // // // // // // // // // //     setForm({ ...form, title: "", description: "", assigneeId: "unassigned", dueDate: "" });
// // // // // // // // // // // // //     setOpen(false);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const canEditStatus = (t: Task) => isAdmin || t.assigneeId === currentUser?.id;

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // // // // // //       <PageHeader
// // // // // // // // // // // // //         title="Tasks"
// // // // // // // // // // // // //         description="Track work across all your projects."
// // // // // // // // // // // // //         action={
// // // // // // // // // // // // //           isAdmin && (
// // // // // // // // // // // // //             <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // // // // // //               <DialogTrigger asChild>
// // // // // // // // // // // // //                 <Button className="bg-gradient-primary border-0 shadow-elegant">
// // // // // // // // // // // // //                   <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // // // // // //                 </Button>
// // // // // // // // // // // // //               </DialogTrigger>
// // // // // // // // // // // // //               <DialogContent>
// // // // // // // // // // // // //                 <DialogHeader><DialogTitle>Create task</DialogTitle></DialogHeader>
// // // // // // // // // // // // //                 <form onSubmit={create} className="space-y-4">
// // // // // // // // // // // // //                   <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
// // // // // // // // // // // // //                   <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
// // // // // // // // // // // // //                   <div className="grid grid-cols-2 gap-3">
// // // // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // // // //                       <Label>Project</Label>
// // // // // // // // // // // // //                       <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
// // // // // // // // // // // // //                         <SelectTrigger><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //                         <SelectContent>{projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
// // // // // // // // // // // // //                       </Select>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // // // //                       <Label>Assignee</Label>
// // // // // // // // // // // // //                       <Select value={form.assigneeId} onValueChange={(v) => setForm({ ...form, assigneeId: v })}>
// // // // // // // // // // // // //                         <SelectTrigger><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //                         <SelectContent>
// // // // // // // // // // // // //                           <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // // // // // // // // // //                           {users.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
// // // // // // // // // // // // //                         </SelectContent>
// // // // // // // // // // // // //                       </Select>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="grid grid-cols-2 gap-3">
// // // // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // // // //                       <Label>Priority</Label>
// // // // // // // // // // // // //                       <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as Priority })}>
// // // // // // // // // // // // //                         <SelectTrigger><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //                         <SelectContent>{PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
// // // // // // // // // // // // //                       </Select>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // // // //                       <Label>Due date</Label>
// // // // // // // // // // // // //                       <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <DialogFooter><Button type="submit" className="bg-gradient-primary border-0">Create</Button></DialogFooter>
// // // // // // // // // // // // //                 </form>
// // // // // // // // // // // // //               </DialogContent>
// // // // // // // // // // // // //             </Dialog>
// // // // // // // // // // // // //           )
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       />

// // // // // // // // // // // // //       <div className="flex flex-wrap gap-2 mb-6">
// // // // // // // // // // // // //         <div className="relative flex-1 min-w-[200px]">
// // // // // // // // // // // // //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // // // // // // // // // // // //           <Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <Select value={projectFilter} onValueChange={(v) => setParams(v === "all" ? {} : { project: v })}>
// // // // // // // // // // // // //           <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //           <SelectContent>
// // // // // // // // // // // // //             <SelectItem value="all">All projects</SelectItem>
// // // // // // // // // // // // //             {projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
// // // // // // // // // // // // //           </SelectContent>
// // // // // // // // // // // // //         </Select>
// // // // // // // // // // // // //         <Select value={userFilter} onValueChange={setUserFilter}>
// // // // // // // // // // // // //           <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //           <SelectContent>
// // // // // // // // // // // // //             <SelectItem value="all">All users</SelectItem>
// // // // // // // // // // // // //             {users.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
// // // // // // // // // // // // //           </SelectContent>
// // // // // // // // // // // // //         </Select>
// // // // // // // // // // // // //         <Select value={statusFilter} onValueChange={setStatusFilter}>
// // // // // // // // // // // // //           <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //           <SelectContent>
// // // // // // // // // // // // //             <SelectItem value="all">All statuses</SelectItem>
// // // // // // // // // // // // //             {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // // // // // // // // // //           </SelectContent>
// // // // // // // // // // // // //         </Select>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // // // // // //           <div key={status}>
// // // // // // // // // // // // //             <div className="flex items-center justify-between mb-3 px-1">
// // // // // // // // // // // // //               <div className="flex items-center gap-2">
// // // // // // // // // // // // //                 <StatusBadge status={status} />
// // // // // // // // // // // // //                 <span className="text-xs text-muted-foreground">{grouped[status].length}</span>
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="space-y-3">
// // // // // // // // // // // // //               {grouped[status].map((t) => {
// // // // // // // // // // // // //                 const project = projects.find((p) => p.id === t.projectId);
// // // // // // // // // // // // //                 const assignee = users.find((u) => u.id === t.assigneeId);
// // // // // // // // // // // // //                 const overdue = isOverdue(t);
// // // // // // // // // // // // //                 return (
// // // // // // // // // // // // //                   <Card key={t.id} className="p-4 shadow-card border-0 hover:shadow-elegant transition-smooth">
// // // // // // // // // // // // //                     <div className="flex items-start gap-2 mb-2">
// // // // // // // // // // // // //                       <div className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ background: `hsl(${project?.color})` }} />
// // // // // // // // // // // // //                       <p className="font-medium text-sm flex-1">{t.title}</p>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                     {t.description && <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t.description}</p>}
// // // // // // // // // // // // //                     <div className="flex items-center gap-2 mb-3 flex-wrap">
// // // // // // // // // // // // //                       <span className="text-[11px] text-muted-foreground">{project?.name}</span>
// // // // // // // // // // // // //                       <span className={cn("text-[10px] px-1.5 py-0.5 rounded border inline-flex items-center gap-1", priorityStyles[t.priority])}>
// // // // // // // // // // // // //                         <Flag className="h-2.5 w-2.5" />{t.priority}
// // // // // // // // // // // // //                       </span>
// // // // // // // // // // // // //                     </div>

// // // // // // // // // // // // //                     <div className="flex items-center justify-between gap-2">
// // // // // // // // // // // // //                       <div className="flex items-center gap-2 min-w-0">
// // // // // // // // // // // // //                         {assignee ? (
// // // // // // // // // // // // //                           <Avatar className="h-6 w-6">
// // // // // // // // // // // // //                             <AvatarFallback className="bg-accent text-accent-foreground text-[10px]">
// // // // // // // // // // // // //                               {assignee.name.split(" ").map((n) => n[0]).join("")}
// // // // // // // // // // // // //                             </AvatarFallback>
// // // // // // // // // // // // //                           </Avatar>
// // // // // // // // // // // // //                         ) : (
// // // // // // // // // // // // //                           <span className="text-[11px] text-muted-foreground">Unassigned</span>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                         {t.dueDate && (
// // // // // // // // // // // // //                           <span className={`text-[11px] flex items-center gap-1 ${overdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
// // // // // // // // // // // // //                             {overdue && <AlertTriangle className="h-3 w-3" />}
// // // // // // // // // // // // //                             {new Date(t.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
// // // // // // // // // // // // //                           </span>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                       <div className="flex gap-1">
// // // // // // // // // // // // //                         {isAdmin && (
// // // // // // // // // // // // //                           <Select value={t.assigneeId || "unassigned"} onValueChange={(v) => updateTask(t.id, { assigneeId: v === "unassigned" ? undefined : v })}>
// // // // // // // // // // // // //                             <SelectTrigger className="h-7 text-xs w-[110px]"><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //                             <SelectContent>
// // // // // // // // // // // // //                               <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // // // // // // // // // //                               {users.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
// // // // // // // // // // // // //                             </SelectContent>
// // // // // // // // // // // // //                           </Select>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                         {canEditStatus(t) && (
// // // // // // // // // // // // //                           <Select value={t.status} onValueChange={(v) => updateTask(t.id, { status: v as Status })}>
// // // // // // // // // // // // //                             <SelectTrigger className="h-7 text-xs w-[110px]"><SelectValue /></SelectTrigger>
// // // // // // // // // // // // //                             <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
// // // // // // // // // // // // //                           </Select>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                         {isAdmin && (
// // // // // // // // // // // // //                           <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { deleteTask(t.id); toast.success("Task deleted"); }}>
// // // // // // // // // // // // //                             <Trash2 className="h-3.5 w-3.5" />
// // // // // // // // // // // // //                           </Button>
// // // // // // // // // // // // //                         )}
// // // // // // // // // // // // //                       </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   </Card>
// // // // // // // // // // // // //                 );
// // // // // // // // // // // // //               })}
// // // // // // // // // // // // //               {grouped[status].length === 0 && (
// // // // // // // // // // // // //                 <p className="text-xs text-muted-foreground text-center py-8">No tasks</p>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         ))}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Tasks;
// // // // // // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // // // // // import { Plus, Trash2, AlertTriangle, Search, Flag } from "lucide-react";

// // // // // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // // // // // // // import {
// // // // // // // // // // // //   Select,
// // // // // // // // // // // //   SelectContent,
// // // // // // // // // // // //   SelectItem,
// // // // // // // // // // // //   SelectTrigger,
// // // // // // // // // // // //   SelectValue,
// // // // // // // // // // // // } from "@/components/ui/select";
// // // // // // // // // // // // import {
// // // // // // // // // // // //   Dialog,
// // // // // // // // // // // //   DialogContent,
// // // // // // // // // // // //   DialogHeader,
// // // // // // // // // // // //   DialogTitle,
// // // // // // // // // // // //   DialogTrigger,
// // // // // // // // // // // //   DialogFooter,
// // // // // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // // // // import { StatusBadge } from "@/components/StatusBadge";
// // // // // // // // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // // // // // // // import { toast } from "sonner";
// // // // // // // // // // // // import { cn } from "@/lib/utils";

// // // // // // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // // // // // const priorityStyles = {
// // // // // // // // // // // //   High: "text-destructive bg-destructive/10 border-destructive/20",
// // // // // // // // // // // //   Medium: "text-warning bg-warning/10 border-warning/20",
// // // // // // // // // // // //   Low: "text-muted-foreground bg-muted border-border",
// // // // // // // // // // // // };

// // // // // // // // // // // // const Tasks = () => {
// // // // // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // // // // // //   // TEMP USERS + PROJECTS (you can connect backend later)
// // // // // // // // // // // //   const [projects] = useState([
// // // // // // // // // // // //     { id: "1", name: "Website Redesign", color: "220 80% 50%" },
// // // // // // // // // // // //   ]);

// // // // // // // // // // // //   const [users] = useState([
// // // // // // // // // // // //     { id: "1", name: "Jordan Lee" },
// // // // // // // // // // // //     { id: "2", name: "Sam Patel" },
// // // // // // // // // // // //   ]);

// // // // // // // // // // // //   const currentUser = { id: "1", role: "Admin" };

// // // // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // // // //     title: "",
// // // // // // // // // // // //     description: "",
// // // // // // // // // // // //     projectId: "1",
// // // // // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // // // // //     priority: "Medium",
// // // // // // // // // // // //     dueDate: "",
// // // // // // // // // // // //   });

// // // // // // // // // // // //   // 🔥 LOAD TASKS FROM BACKEND
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     loadTasks();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const loadTasks = async () => {
// // // // // // // // // // // //     const res = await fetch("http://localhost:5000/api/tasks");
// // // // // // // // // // // //     const data = await res.json();
// // // // // // // // // // // //     setTasks(data);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // 🔍 FILTER
// // // // // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // // // // //     return tasks.filter((t) =>
// // // // // // // // // // // //       t.title.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // // // //     );
// // // // // // // // // // // //   }, [tasks, search]);

// // // // // // // // // // // //   // 📊 GROUP
// // // // // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // // // // //     filtered.forEach((t) => g[t.status].push(t));
// // // // // // // // // // // //     return g;
// // // // // // // // // // // //   }, [filtered]);

// // // // // // // // // // // //   // ➕ CREATE
// // // // // // // // // // // //   const create = async (e) => {
// // // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // // //     const res = await fetch("http://localhost:5000/api/tasks", {
// // // // // // // // // // // //       method: "POST",
// // // // // // // // // // // //       headers: {
// // // // // // // // // // // //         "Content-Type": "application/json",
// // // // // // // // // // // //       },
// // // // // // // // // // // //       body: JSON.stringify({ ...form, status: "Todo" }),
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const newTask = await res.json();
// // // // // // // // // // // //     setTasks((prev) => [...prev, newTask]);

// // // // // // // // // // // //     setForm({
// // // // // // // // // // // //       title: "",
// // // // // // // // // // // //       description: "",
// // // // // // // // // // // //       projectId: "1",
// // // // // // // // // // // //       assigneeId: "unassigned",
// // // // // // // // // // // //       priority: "Medium",
// // // // // // // // // // // //       dueDate: "",
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setOpen(false);
// // // // // // // // // // // //     toast.success("Task created");
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // ✏️ UPDATE
// // // // // // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // // // // // //     const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // // // //       method: "PUT",
// // // // // // // // // // // //       headers: { "Content-Type": "application/json" },
// // // // // // // // // // // //       body: JSON.stringify(updates),
// // // // // // // // // // // //     });

// // // // // // // // // // // //     const updated = await res.json();

// // // // // // // // // // // //     setTasks((prev) =>
// // // // // // // // // // // //       prev.map((t) => (t._id === id ? updated : t))
// // // // // // // // // // // //     );
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // 🗑️ DELETE
// // // // // // // // // // // //   const deleteTask = async (id) => {
// // // // // // // // // // // //     await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // // // //       method: "DELETE",
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // // // // // //     toast.success("Task deleted");
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // // // // //       <PageHeader
// // // // // // // // // // // //         title="Tasks"
// // // // // // // // // // // //         description="Track work across all your projects."
// // // // // // // // // // // //         action={
// // // // // // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // // // // //             <DialogTrigger asChild>
// // // // // // // // // // // //               <Button>
// // // // // // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // // // // //               </Button>
// // // // // // // // // // // //             </DialogTrigger>

// // // // // // // // // // // //             <DialogContent>
// // // // // // // // // // // //               <DialogHeader>
// // // // // // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // // // // // //               </DialogHeader>

// // // // // // // // // // // //               <form onSubmit={create} className="space-y-4">
// // // // // // // // // // // //                 <div>
// // // // // // // // // // // //                   <Label>Title</Label>
// // // // // // // // // // // //                   <Input
// // // // // // // // // // // //                     value={form.title}
// // // // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // // // //                       setForm({ ...form, title: e.target.value })
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                     required
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <div>
// // // // // // // // // // // //                   <Label>Description</Label>
// // // // // // // // // // // //                   <Textarea
// // // // // // // // // // // //                     value={form.description}
// // // // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // // // //                       setForm({ ...form, description: e.target.value })
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <div className="grid grid-cols-2 gap-3">
// // // // // // // // // // // //                   <Select
// // // // // // // // // // // //                     value={form.priority}
// // // // // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // // // // //                       setForm({ ...form, priority: v })
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     <SelectTrigger>
// // // // // // // // // // // //                       <SelectValue />
// // // // // // // // // // // //                     </SelectTrigger>
// // // // // // // // // // // //                     <SelectContent>
// // // // // // // // // // // //                       {PRIORITIES.map((p) => (
// // // // // // // // // // // //                         <SelectItem key={p} value={p}>
// // // // // // // // // // // //                           {p}
// // // // // // // // // // // //                         </SelectItem>
// // // // // // // // // // // //                       ))}
// // // // // // // // // // // //                     </SelectContent>
// // // // // // // // // // // //                   </Select>

// // // // // // // // // // // //                   <Input
// // // // // // // // // // // //                     type="date"
// // // // // // // // // // // //                     value={form.dueDate}
// // // // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // // // //                       setForm({ ...form, dueDate: e.target.value })
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                   />
// // // // // // // // // // // //                 </div>

// // // // // // // // // // // //                 <DialogFooter>
// // // // // // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // // // // // //                 </DialogFooter>
// // // // // // // // // // // //               </form>
// // // // // // // // // // // //             </DialogContent>
// // // // // // // // // // // //           </Dialog>
// // // // // // // // // // // //         }
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {/* SEARCH */}
// // // // // // // // // // // //       <div className="mb-6">
// // // // // // // // // // // //         <Input
// // // // // // // // // // // //           placeholder="Search tasks..."
// // // // // // // // // // // //           value={search}
// // // // // // // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* BOARD */}
// // // // // // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // // // // //           <div key={status}>
// // // // // // // // // // // //             <div className="flex justify-between mb-2">
// // // // // // // // // // // //               <StatusBadge status={status} />
// // // // // // // // // // // //               <span>{grouped[status].length}</span>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {grouped[status].map((t) => {
// // // // // // // // // // // //               const assignee = users.find(
// // // // // // // // // // // //                 (u) => u.id === t.assigneeId
// // // // // // // // // // // //               );

// // // // // // // // // // // //               return (
// // // // // // // // // // // //                 <Card key={t._id} className="p-4 mb-3">
// // // // // // // // // // // //                   <p className="font-medium">{t.title}</p>

// // // // // // // // // // // //                   <div className="flex justify-between mt-2">
// // // // // // // // // // // //                     <span
// // // // // // // // // // // //                       className={cn(
// // // // // // // // // // // //                         "text-xs px-2 py-1 rounded border",
// // // // // // // // // // // //                         priorityStyles[t.priority]
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // // // // // //                       {t.priority}
// // // // // // // // // // // //                     </span>

// // // // // // // // // // // //                     <Select
// // // // // // // // // // // //                       value={t.status}
// // // // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // // // //                         updateTask(t._id, { status: v })
// // // // // // // // // // // //                       }
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // // // // // //                         <SelectValue />
// // // // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // // // //                       <SelectContent>
// // // // // // // // // // // //                         {STATUSES.map((s) => (
// // // // // // // // // // // //                           <SelectItem key={s} value={s}>
// // // // // // // // // // // //                             {s}
// // // // // // // // // // // //                           </SelectItem>
// // // // // // // // // // // //                         ))}
// // // // // // // // // // // //                       </SelectContent>
// // // // // // // // // // // //                     </Select>
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   <div className="flex justify-between mt-3">
// // // // // // // // // // // //                     <Avatar className="h-6 w-6">
// // // // // // // // // // // //                       <AvatarFallback>
// // // // // // // // // // // //                         {assignee?.name?.[0] || "U"}
// // // // // // // // // // // //                       </AvatarFallback>
// // // // // // // // // // // //                     </Avatar>

// // // // // // // // // // // //                     <Button
// // // // // // // // // // // //                       size="icon"
// // // // // // // // // // // //                       variant="ghost"
// // // // // // // // // // // //                       onClick={() => deleteTask(t._id)}
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // // // // // // // //                     </Button>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //               );
// // // // // // // // // // // //             })}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ))}
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Tasks;
// // // // // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // // // // import { Plus, Trash2, Search, Flag } from "lucide-react";

// // // // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // // // // // // import {
// // // // // // // // // // //   Select,
// // // // // // // // // // //   SelectContent,
// // // // // // // // // // //   SelectItem,
// // // // // // // // // // //   SelectTrigger,
// // // // // // // // // // //   SelectValue,
// // // // // // // // // // // } from "@/components/ui/select";
// // // // // // // // // // // import {
// // // // // // // // // // //   Dialog,
// // // // // // // // // // //   DialogContent,
// // // // // // // // // // //   DialogHeader,
// // // // // // // // // // //   DialogTitle,
// // // // // // // // // // //   DialogTrigger,
// // // // // // // // // // //   DialogFooter,
// // // // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // // // import { StatusBadge } from "@/components/StatusBadge";
// // // // // // // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // // // // // // import { toast } from "sonner";
// // // // // // // // // // // import { cn } from "@/lib/utils";

// // // // // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // // // // const priorityStyles = {
// // // // // // // // // // //   High: "text-destructive bg-destructive/10 border-destructive/20",
// // // // // // // // // // //   Medium: "text-warning bg-warning/10 border-warning/20",
// // // // // // // // // // //   Low: "text-muted-foreground bg-muted border-border",
// // // // // // // // // // // };

// // // // // // // // // // // const Tasks = () => {
// // // // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // // // // //   const [projects] = useState([
// // // // // // // // // // //     { id: "1", name: "Website Redesign", color: "220 80% 50%" },
// // // // // // // // // // //   ]);

// // // // // // // // // // //   const [users] = useState([
// // // // // // // // // // //     { id: "1", name: "Jordan Lee" },
// // // // // // // // // // //     { id: "2", name: "Sam Patel" },
// // // // // // // // // // //   ]);

// // // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // // //     title: "",
// // // // // // // // // // //     description: "",
// // // // // // // // // // //     projectId: "1",
// // // // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // // // //     priority: "Medium",
// // // // // // // // // // //     dueDate: "",
// // // // // // // // // // //   });

// // // // // // // // // // //   // ✅ LOAD TASKS (SAFE)
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     loadTasks();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const loadTasks = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch("http://localhost:5000/api/tasks");

// // // // // // // // // // //       if (!res.ok) throw new Error("Failed to fetch");

// // // // // // // // // // //       const data = await res.json();

// // // // // // // // // // //       console.log("API DATA:", data); // debug

// // // // // // // // // // //       // ✅ IMPORTANT FIX
// // // // // // // // // // //       if (Array.isArray(data)) {
// // // // // // // // // // //         setTasks(data);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         setTasks([]);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       console.error(err);
// // // // // // // // // // //       setTasks([]);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // ✅ SAFE FILTER
// // // // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // // // //     if (!Array.isArray(tasks)) return [];

// // // // // // // // // // //     return tasks.filter((t) =>
// // // // // // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // // //     );
// // // // // // // // // // //   }, [tasks, search]);

// // // // // // // // // // //   // GROUP
// // // // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // // // //     filtered.forEach((t) => {
// // // // // // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // // // // // //     });
// // // // // // // // // // //     return g;
// // // // // // // // // // //   }, [filtered]);

// // // // // // // // // // //   // CREATE
// // // // // // // // // // //   const create = async (e) => {
// // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch("http://localhost:5000/api/tasks", {
// // // // // // // // // // //         method: "POST",
// // // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // // //         body: JSON.stringify({ ...form, status: "Todo" }),
// // // // // // // // // // //       });

// // // // // // // // // // //       const newTask = await res.json();

// // // // // // // // // // //       setTasks((prev) => [...prev, newTask]);

// // // // // // // // // // //       setForm({
// // // // // // // // // // //         title: "",
// // // // // // // // // // //         description: "",
// // // // // // // // // // //         projectId: "1",
// // // // // // // // // // //         assigneeId: "unassigned",
// // // // // // // // // // //         priority: "Medium",
// // // // // // // // // // //         dueDate: "",
// // // // // // // // // // //       });

// // // // // // // // // // //       setOpen(false);
// // // // // // // // // // //       toast.success("Task created");
// // // // // // // // // // //     } catch {
// // // // // // // // // // //       toast.error("Failed to create task");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // UPDATE
// // // // // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // // //         method: "PUT",
// // // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // // //         body: JSON.stringify(updates),
// // // // // // // // // // //       });

// // // // // // // // // // //       const updated = await res.json();

// // // // // // // // // // //       setTasks((prev) =>
// // // // // // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // // // // // //       );
// // // // // // // // // // //     } catch {
// // // // // // // // // // //       toast.error("Update failed");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // DELETE
// // // // // // // // // // //   const deleteTask = async (id) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // // //         method: "DELETE",
// // // // // // // // // // //       });

// // // // // // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // // // // //       toast.success("Task deleted");
// // // // // // // // // // //     } catch {
// // // // // // // // // // //       toast.error("Delete failed");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // // // //       <PageHeader
// // // // // // // // // // //         title="Tasks"
// // // // // // // // // // //         description="Track work across all your projects."
// // // // // // // // // // //         action={
// // // // // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // // // //             <DialogTrigger asChild>
// // // // // // // // // // //               <Button>
// // // // // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // // // //               </Button>
// // // // // // // // // // //             </DialogTrigger>

// // // // // // // // // // //             <DialogContent>
// // // // // // // // // // //               <DialogHeader>
// // // // // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // // // // //               </DialogHeader>

// // // // // // // // // // //               <form onSubmit={create} className="space-y-4">
// // // // // // // // // // //                 <div>
// // // // // // // // // // //                   <Label>Title</Label>
// // // // // // // // // // //                   <Input
// // // // // // // // // // //                     value={form.title}
// // // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // // //                       setForm({ ...form, title: e.target.value })
// // // // // // // // // // //                     }
// // // // // // // // // // //                     required
// // // // // // // // // // //                   />
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <div>
// // // // // // // // // // //                   <Label>Description</Label>
// // // // // // // // // // //                   <Textarea
// // // // // // // // // // //                     value={form.description}
// // // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // // //                       setForm({ ...form, description: e.target.value })
// // // // // // // // // // //                     }
// // // // // // // // // // //                   />
// // // // // // // // // // //                 </div>

// // // // // // // // // // //                 <DialogFooter>
// // // // // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // // // // //                 </DialogFooter>
// // // // // // // // // // //               </form>
// // // // // // // // // // //             </DialogContent>
// // // // // // // // // // //           </Dialog>
// // // // // // // // // // //         }
// // // // // // // // // // //       />

// // // // // // // // // // //       <Input
// // // // // // // // // // //         placeholder="Search tasks..."
// // // // // // // // // // //         value={search}
// // // // // // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // // //         className="mb-6"
// // // // // // // // // // //       />

// // // // // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // // // //           <div key={status}>
// // // // // // // // // // //             <div className="flex justify-between mb-2">
// // // // // // // // // // //               <StatusBadge status={status} />
// // // // // // // // // // //               <span>{grouped[status].length}</span>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {grouped[status].map((t) => {
// // // // // // // // // // //               const assignee = users.find(
// // // // // // // // // // //                 (u) => u.id === t.assigneeId
// // // // // // // // // // //               );

// // // // // // // // // // //               return (
// // // // // // // // // // //                 <Card key={t._id} className="p-4 mb-3">
// // // // // // // // // // //                   <p>{t.title}</p>

// // // // // // // // // // //                   <div className="flex justify-between mt-2">
// // // // // // // // // // //                     <span className={cn("text-xs px-2 py-1 rounded border", priorityStyles[t.priority])}>
// // // // // // // // // // //                       <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // // // // //                       {t.priority}
// // // // // // // // // // //                     </span>

// // // // // // // // // // //                     <Select
// // // // // // // // // // //                       value={t.status}
// // // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // // //                         updateTask(t._id, { status: v })
// // // // // // // // // // //                       }
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // // // // //                         <SelectValue />
// // // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // // //                       <SelectContent>
// // // // // // // // // // //                         {STATUSES.map((s) => (
// // // // // // // // // // //                           <SelectItem key={s} value={s}>
// // // // // // // // // // //                             {s}
// // // // // // // // // // //                           </SelectItem>
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                       </SelectContent>
// // // // // // // // // // //                     </Select>
// // // // // // // // // // //                   </div>

// // // // // // // // // // //                   <div className="flex justify-between mt-3">
// // // // // // // // // // //                     <Avatar className="h-6 w-6">
// // // // // // // // // // //                       <AvatarFallback>
// // // // // // // // // // //                         {assignee?.name?.[0] || "U"}
// // // // // // // // // // //                       </AvatarFallback>
// // // // // // // // // // //                     </Avatar>

// // // // // // // // // // //                     <Button
// // // // // // // // // // //                       size="icon"
// // // // // // // // // // //                       variant="ghost"
// // // // // // // // // // //                       onClick={() => deleteTask(t._id)}
// // // // // // // // // // //                     >
// // // // // // // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // // // // // // //                     </Button>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //               );
// // // // // // // // // // //             })}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Tasks;
// // // // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // // // // // import {
// // // // // // // // // //   Select,
// // // // // // // // // //   SelectContent,
// // // // // // // // // //   SelectItem,
// // // // // // // // // //   SelectTrigger,
// // // // // // // // // //   SelectValue,
// // // // // // // // // // } from "@/components/ui/select";

// // // // // // // // // // import {
// // // // // // // // // //   Dialog,
// // // // // // // // // //   DialogContent,
// // // // // // // // // //   DialogHeader,
// // // // // // // // // //   DialogTitle,
// // // // // // // // // //   DialogTrigger,
// // // // // // // // // //   DialogFooter,
// // // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // // import { cn } from "@/lib/utils";
// // // // // // // // // // import { toast } from "sonner";

// // // // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // // // const priorityStyles = {
// // // // // // // // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // // // // // // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // // // // // // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // // // // // // // };

// // // // // // // // // // export default function Tasks() {
// // // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // // // //   // dummy data (same as UI screenshot)
// // // // // // // // // //   const [projects] = useState([
// // // // // // // // // //     { id: "1", name: "Website Redesign" },
// // // // // // // // // //     { id: "2", name: "Mobile App Launch" },
// // // // // // // // // //   ]);

// // // // // // // // // //   const [users] = useState([
// // // // // // // // // //     { id: "1", name: "Jordan Lee" },
// // // // // // // // // //     { id: "2", name: "Sam Patel" },
// // // // // // // // // //     { id: "3", name: "Alex Morgan" },
// // // // // // // // // //     { id: "4", name: "Taylor Kim" },
// // // // // // // // // //   ]);

// // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // //     title: "",
// // // // // // // // // //     description: "",
// // // // // // // // // //     projectId: "1",
// // // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // // //     priority: "Medium",
// // // // // // // // // //     dueDate: "",
// // // // // // // // // //   });

// // // // // // // // // //   // ================= LOAD TASKS =================
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     loadTasks();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const loadTasks = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch("http://localhost:5000/api/tasks");
// // // // // // // // // //       if (!res.ok) throw new Error("Failed");

// // // // // // // // // //       const data = await res.json();
// // // // // // // // // //       setTasks(Array.isArray(data) ? data : []);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       setTasks([]);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= FILTER =================
// // // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // // //     return tasks.filter((t) =>
// // // // // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // //     );
// // // // // // // // // //   }, [tasks, search]);

// // // // // // // // // //   // ================= GROUP =================
// // // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // // //     filtered.forEach((t) => {
// // // // // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // // // // //     });
// // // // // // // // // //     return g;
// // // // // // // // // //   }, [filtered]);

// // // // // // // // // //   // ================= CREATE =================
// // // // // // // // // //   const create = async (e) => {
// // // // // // // // // //     e.preventDefault();

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch("http://localhost:5000/api/tasks", {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify({ ...form, status: "Todo" }),
// // // // // // // // // //       });

// // // // // // // // // //       if (!res.ok) throw new Error("Failed");

// // // // // // // // // //       const newTask = await res.json();

// // // // // // // // // //       setTasks((prev) => [...prev, newTask]);

// // // // // // // // // //       setForm({
// // // // // // // // // //         title: "",
// // // // // // // // // //         description: "",
// // // // // // // // // //         projectId: "1",
// // // // // // // // // //         assigneeId: "unassigned",
// // // // // // // // // //         priority: "Medium",
// // // // // // // // // //         dueDate: "",
// // // // // // // // // //       });

// // // // // // // // // //       setOpen(false);
// // // // // // // // // //       toast.success("Task created");
// // // // // // // // // //     } catch {
// // // // // // // // // //       toast.error("Failed to create task");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= UPDATE =================
// // // // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // //         method: "PUT",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify(updates),
// // // // // // // // // //       });

// // // // // // // // // //       const updated = await res.json();

// // // // // // // // // //       setTasks((prev) =>
// // // // // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // // // // //       );
// // // // // // // // // //     } catch {
// // // // // // // // // //       toast.error("Update failed");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= DELETE =================
// // // // // // // // // //   const deleteTask = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       await fetch(`http://localhost:5000/api/tasks/${id}`, {
// // // // // // // // // //         method: "DELETE",
// // // // // // // // // //       });

// // // // // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // // // //       toast.success("Deleted");
// // // // // // // // // //     } catch {
// // // // // // // // // //       toast.error("Delete failed");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= HELPERS =================
// // // // // // // // // //   const getUser = (id) =>
// // // // // // // // // //     users.find((u) => u.id === id)?.name || "Unassigned";

// // // // // // // // // //   const getProject = (id) =>
// // // // // // // // // //     projects.find((p) => p.id === id)?.name || "Project";

// // // // // // // // // //   // ================= UI =================
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // // //       <PageHeader
// // // // // // // // // //         title="Tasks"
// // // // // // // // // //         description="Track work across all your projects."
// // // // // // // // // //         action={
// // // // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // // //             <DialogTrigger asChild>
// // // // // // // // // //               <Button>
// // // // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // // //               </Button>
// // // // // // // // // //             </DialogTrigger>

// // // // // // // // // //             <DialogContent>
// // // // // // // // // //               <DialogHeader>
// // // // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // // // //               </DialogHeader>

// // // // // // // // // //               {/* ================= FORM ================= */}
// // // // // // // // // //               <form onSubmit={create} className="space-y-4">
// // // // // // // // // //                 <div>
// // // // // // // // // //                   <Label>Title</Label>
// // // // // // // // // //                   <Input
// // // // // // // // // //                     value={form.title}
// // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // //                       setForm({ ...form, title: e.target.value })
// // // // // // // // // //                     }
// // // // // // // // // //                     required
// // // // // // // // // //                   />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div>
// // // // // // // // // //                   <Label>Description</Label>
// // // // // // // // // //                   <Textarea
// // // // // // // // // //                     value={form.description}
// // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // //                       setForm({ ...form, description: e.target.value })
// // // // // // // // // //                     }
// // // // // // // // // //                   />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Project</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.projectId}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, projectId: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         {projects.map((p) => (
// // // // // // // // // //                           <SelectItem key={p.id} value={p.id}>
// // // // // // // // // //                             {p.name}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Assignee</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.assigneeId}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, assigneeId: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue placeholder="Unassigned" />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         <SelectItem value="unassigned">
// // // // // // // // // //                           Unassigned
// // // // // // // // // //                         </SelectItem>
// // // // // // // // // //                         {users.map((u) => (
// // // // // // // // // //                           <SelectItem key={u.id} value={u.id}>
// // // // // // // // // //                             {u.name}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Priority</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.priority}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, priority: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         {PRIORITIES.map((p) => (
// // // // // // // // // //                           <SelectItem key={p} value={p}>
// // // // // // // // // //                             {p}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Due date</Label>
// // // // // // // // // //                     <Input
// // // // // // // // // //                       type="date"
// // // // // // // // // //                       value={form.dueDate}
// // // // // // // // // //                       onChange={(e) =>
// // // // // // // // // //                         setForm({ ...form, dueDate: e.target.value })
// // // // // // // // // //                       }
// // // // // // // // // //                     />
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <DialogFooter>
// // // // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // // // //                 </DialogFooter>
// // // // // // // // // //               </form>
// // // // // // // // // //             </DialogContent>
// // // // // // // // // //           </Dialog>
// // // // // // // // // //         }
// // // // // // // // // //       />

// // // // // // // // // //       {/* SEARCH */}
// // // // // // // // // //       <Input
// // // // // // // // // //         placeholder="Search tasks..."
// // // // // // // // // //         value={search}
// // // // // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // //         className="mb-6"
// // // // // // // // // //       />

// // // // // // // // // //       {/* BOARD */}
// // // // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // // //           <div key={status}>
// // // // // // // // // //             <p className="mb-2 font-semibold">{status}</p>

// // // // // // // // // //             {grouped[status].map((t) => (
// // // // // // // // // //               <Card key={t._id} className="p-4 mb-3 rounded-xl">
// // // // // // // // // //                 <p className="font-medium">{t.title}</p>

// // // // // // // // // //                 <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
// // // // // // // // // //                   <span>{getProject(t.projectId)}</span>

// // // // // // // // // //                   <span
// // // // // // // // // //                     className={cn(
// // // // // // // // // //                       "text-xs px-2 py-1 rounded border",
// // // // // // // // // //                       priorityStyles[t.priority]
// // // // // // // // // //                     )}
// // // // // // // // // //                   >
// // // // // // // // // //                     <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // // // //                     {t.priority}
// // // // // // // // // //                   </span>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {t.dueDate && (
// // // // // // // // // //                   <p className="text-xs mt-1 text-red-500">
// // // // // // // // // //                     {new Date(t.dueDate).toDateString()}
// // // // // // // // // //                   </p>
// // // // // // // // // //                 )}

// // // // // // // // // //                 <div className="flex justify-between mt-3 items-center">
// // // // // // // // // //                   <span className="text-xs">{getUser(t.assigneeId)}</span>

// // // // // // // // // //                   <Select
// // // // // // // // // //                     value={t.status}
// // // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // // //                       updateTask(t._id, { status: v })
// // // // // // // // // //                     }
// // // // // // // // // //                   >
// // // // // // // // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // // // //                       <SelectValue />
// // // // // // // // // //                     </SelectTrigger>
// // // // // // // // // //                     <SelectContent>
// // // // // // // // // //                       {STATUSES.map((s) => (
// // // // // // // // // //                         <SelectItem key={s} value={s}>
// // // // // // // // // //                           {s}
// // // // // // // // // //                         </SelectItem>
// // // // // // // // // //                       ))}
// // // // // // // // // //                     </SelectContent>
// // // // // // // // // //                   </Select>

// // // // // // // // // //                   <Button
// // // // // // // // // //                     size="icon"
// // // // // // // // // //                     variant="ghost"
// // // // // // // // // //                     onClick={() => deleteTask(t._id)}
// // // // // // // // // //                   >
// // // // // // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </Card>
// // // // // // // // // //             ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // // // // // import {
// // // // // // // // // //   Select,
// // // // // // // // // //   SelectContent,
// // // // // // // // // //   SelectItem,
// // // // // // // // // //   SelectTrigger,
// // // // // // // // // //   SelectValue,
// // // // // // // // // // } from "@/components/ui/select";

// // // // // // // // // // import {
// // // // // // // // // //   Dialog,
// // // // // // // // // //   DialogContent,
// // // // // // // // // //   DialogHeader,
// // // // // // // // // //   DialogTitle,
// // // // // // // // // //   DialogTrigger,
// // // // // // // // // //   DialogFooter,
// // // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // // import { cn } from "@/lib/utils";
// // // // // // // // // // import { toast } from "sonner";

// // // // // // // // // // const API = "http://localhost:5000/api/tasks";

// // // // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // // // const priorityStyles = {
// // // // // // // // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // // // // // // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // // // // // // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // // // // // // // };

// // // // // // // // // // export default function Tasks() {
// // // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // // // //   // dummy UI data (matches backend string IDs)
// // // // // // // // // //   const [projects] = useState([
// // // // // // // // // //     { id: "1", name: "Website Redesign" },
// // // // // // // // // //     { id: "2", name: "Mobile App Launch" },
// // // // // // // // // //   ]);

// // // // // // // // // //   const [users] = useState([
// // // // // // // // // //     { id: "1", name: "Jordan Lee" },
// // // // // // // // // //     { id: "2", name: "Sam Patel" },
// // // // // // // // // //     { id: "3", name: "Alex Morgan" },
// // // // // // // // // //     { id: "4", name: "Taylor Kim" },
// // // // // // // // // //   ]);

// // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // //     title: "",
// // // // // // // // // //     description: "",
// // // // // // // // // //     projectId: "1",
// // // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // // //     priority: "Medium",
// // // // // // // // // //     dueDate: "",
// // // // // // // // // //   });

// // // // // // // // // //   // ================= LOAD =================
// // // // // // // // // //   const loadTasks = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(API);

// // // // // // // // // //       if (!res.ok) throw new Error("Fetch failed");

// // // // // // // // // //       const data = await res.json();
// // // // // // // // // //       setTasks(Array.isArray(data) ? data : []);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       toast.error("Failed to load tasks");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     loadTasks();
// // // // // // // // // //   }, []);

// // // // // // // // // //   // ================= FILTER =================
// // // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // // //     return tasks.filter((t) =>
// // // // // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // //     );
// // // // // // // // // //   }, [tasks, search]);

// // // // // // // // // //   // ================= GROUP =================
// // // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // // //     filtered.forEach((t) => {
// // // // // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // // // // //     });
// // // // // // // // // //     return g;
// // // // // // // // // //   }, [filtered]);

// // // // // // // // // //   // ================= CREATE =================
// // // // // // // // // //   const createTask = async (e) => {
// // // // // // // // // //     e.preventDefault();

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(API, {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // //           ...form,
// // // // // // // // // //           status: "Todo",
// // // // // // // // // //         }),
// // // // // // // // // //       });

// // // // // // // // // //       if (!res.ok) throw new Error("Create failed");

// // // // // // // // // //       const newTask = await res.json();

// // // // // // // // // //       setTasks((prev) => [newTask, ...prev]);

// // // // // // // // // //       setForm({
// // // // // // // // // //         title: "",
// // // // // // // // // //         description: "",
// // // // // // // // // //         projectId: "1",
// // // // // // // // // //         assigneeId: "unassigned",
// // // // // // // // // //         priority: "Medium",
// // // // // // // // // //         dueDate: "",
// // // // // // // // // //       });

// // // // // // // // // //       setOpen(false);
// // // // // // // // // //       toast.success("Task created");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       toast.error("Failed to create task");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= UPDATE =================
// // // // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // // // // // //         method: "PUT",
// // // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // // //         body: JSON.stringify(updates),
// // // // // // // // // //       });

// // // // // // // // // //       if (!res.ok) throw new Error("Update failed");

// // // // // // // // // //       const updated = await res.json();

// // // // // // // // // //       setTasks((prev) =>
// // // // // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // // // // //       );
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       toast.error("Update failed");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= DELETE =================
// // // // // // // // // //   const deleteTask = async (id) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // // // // // //         method: "DELETE",
// // // // // // // // // //       });

// // // // // // // // // //       if (!res.ok) throw new Error("Delete failed");

// // // // // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // // // //       toast.success("Task deleted");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error(err);
// // // // // // // // // //       toast.error("Delete failed");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // ================= HELPERS =================
// // // // // // // // // //   const getUser = (id) =>
// // // // // // // // // //     users.find((u) => u.id === id)?.name || "Unassigned";

// // // // // // // // // //   const getProject = (id) =>
// // // // // // // // // //     projects.find((p) => p.id === id)?.name || "Project";

// // // // // // // // // //   // ================= UI =================
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // // //       <PageHeader
// // // // // // // // // //         title="Tasks"
// // // // // // // // // //         description="Track work across all your projects."
// // // // // // // // // //         action={
// // // // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // // //             <DialogTrigger asChild>
// // // // // // // // // //               <Button>
// // // // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // // //               </Button>
// // // // // // // // // //             </DialogTrigger>

// // // // // // // // // //             <DialogContent>
// // // // // // // // // //               <DialogHeader>
// // // // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // // // //               </DialogHeader>

// // // // // // // // // //               <form onSubmit={createTask} className="space-y-4">
// // // // // // // // // //                 <div>
// // // // // // // // // //                   <Label>Title</Label>
// // // // // // // // // //                   <Input
// // // // // // // // // //                     value={form.title}
// // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // //                       setForm({ ...form, title: e.target.value })
// // // // // // // // // //                     }
// // // // // // // // // //                     required
// // // // // // // // // //                   />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div>
// // // // // // // // // //                   <Label>Description</Label>
// // // // // // // // // //                   <Textarea
// // // // // // // // // //                     value={form.description}
// // // // // // // // // //                     onChange={(e) =>
// // // // // // // // // //                       setForm({ ...form, description: e.target.value })
// // // // // // // // // //                     }
// // // // // // // // // //                   />
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Project</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.projectId}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, projectId: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         {projects.map((p) => (
// // // // // // // // // //                           <SelectItem key={p.id} value={p.id}>
// // // // // // // // // //                             {p.name}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Assignee</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.assigneeId}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, assigneeId: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue placeholder="Unassigned" />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         <SelectItem value="unassigned">
// // // // // // // // // //                           Unassigned
// // // // // // // // // //                         </SelectItem>
// // // // // // // // // //                         {users.map((u) => (
// // // // // // // // // //                           <SelectItem key={u.id} value={u.id}>
// // // // // // // // // //                             {u.name}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Priority</Label>
// // // // // // // // // //                     <Select
// // // // // // // // // //                       value={form.priority}
// // // // // // // // // //                       onValueChange={(v) =>
// // // // // // // // // //                         setForm({ ...form, priority: v })
// // // // // // // // // //                       }
// // // // // // // // // //                     >
// // // // // // // // // //                       <SelectTrigger>
// // // // // // // // // //                         <SelectValue />
// // // // // // // // // //                       </SelectTrigger>
// // // // // // // // // //                       <SelectContent>
// // // // // // // // // //                         {PRIORITIES.map((p) => (
// // // // // // // // // //                           <SelectItem key={p} value={p}>
// // // // // // // // // //                             {p}
// // // // // // // // // //                           </SelectItem>
// // // // // // // // // //                         ))}
// // // // // // // // // //                       </SelectContent>
// // // // // // // // // //                     </Select>
// // // // // // // // // //                   </div>

// // // // // // // // // //                   <div>
// // // // // // // // // //                     <Label>Due date</Label>
// // // // // // // // // //                     <Input
// // // // // // // // // //                       type="date"
// // // // // // // // // //                       value={form.dueDate}
// // // // // // // // // //                       onChange={(e) =>
// // // // // // // // // //                         setForm({ ...form, dueDate: e.target.value })
// // // // // // // // // //                       }
// // // // // // // // // //                     />
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 <DialogFooter>
// // // // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // // // //                 </DialogFooter>
// // // // // // // // // //               </form>
// // // // // // // // // //             </DialogContent>
// // // // // // // // // //           </Dialog>
// // // // // // // // // //         }
// // // // // // // // // //       />

// // // // // // // // // //       {/* SEARCH */}
// // // // // // // // // //       <Input
// // // // // // // // // //         placeholder="Search tasks..."
// // // // // // // // // //         value={search}
// // // // // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // //         className="mb-6"
// // // // // // // // // //       />

// // // // // // // // // //       {/* BOARD */}
// // // // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // // //           <div key={status}>
// // // // // // // // // //             <p className="mb-2 font-semibold">{status}</p>

// // // // // // // // // //             {grouped[status].map((t) => (
// // // // // // // // // //               <Card key={t._id} className="p-4 mb-3 rounded-xl">
// // // // // // // // // //                 <p className="font-medium">{t.title}</p>

// // // // // // // // // //                 <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
// // // // // // // // // //                   <span>{getProject(t.projectId)}</span>

// // // // // // // // // //                   <span
// // // // // // // // // //                     className={cn(
// // // // // // // // // //                       "text-xs px-2 py-1 rounded border",
// // // // // // // // // //                       priorityStyles[t.priority]
// // // // // // // // // //                     )}
// // // // // // // // // //                   >
// // // // // // // // // //                     <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // // // //                     {t.priority}
// // // // // // // // // //                   </span>
// // // // // // // // // //                 </div>

// // // // // // // // // //                 {t.dueDate && (
// // // // // // // // // //                   <p className="text-xs mt-1 text-red-500">
// // // // // // // // // //                     {new Date(t.dueDate).toDateString()}
// // // // // // // // // //                   </p>
// // // // // // // // // //                 )}

// // // // // // // // // //                 <div className="flex justify-between mt-3 items-center">
// // // // // // // // // //                   <span className="text-xs">
// // // // // // // // // //                     {getUser(t.assigneeId)}
// // // // // // // // // //                   </span>

// // // // // // // // // //                   <Select
// // // // // // // // // //                     value={t.status}
// // // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // // //                       updateTask(t._id, { status: v })
// // // // // // // // // //                     }
// // // // // // // // // //                   >
// // // // // // // // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // // // //                       <SelectValue />
// // // // // // // // // //                     </SelectTrigger>
// // // // // // // // // //                     <SelectContent>
// // // // // // // // // //                       {STATUSES.map((s) => (
// // // // // // // // // //                         <SelectItem key={s} value={s}>
// // // // // // // // // //                           {s}
// // // // // // // // // //                         </SelectItem>
// // // // // // // // // //                       ))}
// // // // // // // // // //                     </SelectContent>
// // // // // // // // // //                   </Select>

// // // // // // // // // //                   <Button
// // // // // // // // // //                     size="icon"
// // // // // // // // // //                     variant="ghost"
// // // // // // // // // //                     onClick={() => deleteTask(t._id)}
// // // // // // // // // //                   >
// // // // // // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </Card>
// // // // // // // // // //             ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // // // // import {
// // // // // // // // //   Select,
// // // // // // // // //   SelectContent,
// // // // // // // // //   SelectItem,
// // // // // // // // //   SelectTrigger,
// // // // // // // // //   SelectValue,
// // // // // // // // // } from "@/components/ui/select";

// // // // // // // // // import {
// // // // // // // // //   Dialog,
// // // // // // // // //   DialogContent,
// // // // // // // // //   DialogHeader,
// // // // // // // // //   DialogTitle,
// // // // // // // // //   DialogTrigger,
// // // // // // // // //   DialogFooter,
// // // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // // import { cn } from "@/lib/utils";
// // // // // // // // // import { toast } from "sonner";

// // // // // // // // // const API = "http://localhost:5000/api/tasks";
// // // // // // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // // const priorityStyles = {
// // // // // // // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // // // // // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // // // // // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // // // // // // };

// // // // // // // // // export default function Tasks() {
// // // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // // //   const [users, setUsers] = useState([]);

// // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // // //   const token = localStorage.getItem("token");

// // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // //     title: "",
// // // // // // // // //     description: "",
// // // // // // // // //     projectId: "",
// // // // // // // // //     assigneeId: "unassigned",
// // // // // // // // //     priority: "Medium",
// // // // // // // // //     dueDate: "",
// // // // // // // // //   });

// // // // // // // // //   // ================= FETCH =================

// // // // // // // // //   const loadTasks = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(API);
// // // // // // // // //       const data = await res.json();
// // // // // // // // //       setTasks(Array.isArray(data) ? data : []);
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Failed to load tasks");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const fetchProjects = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BASE_URL}/projects`);
// // // // // // // // //       const data = await res.json();
// // // // // // // // //       setProjects(data);
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Failed to load projects");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const fetchUsers = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // // // // // // //         headers: {
// // // // // // // // //           Authorization: `Bearer ${token}`,
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       const data = await res.json();
// // // // // // // // //       setUsers(data);
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Failed to load users");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadTasks();
// // // // // // // // //     fetchProjects();
// // // // // // // // //     fetchUsers();
// // // // // // // // //   }, []);

// // // // // // // // //   // ================= FILTER =================

// // // // // // // // //   const filtered = useMemo(() => {
// // // // // // // // //     return tasks.filter((t) =>
// // // // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // // // //     );
// // // // // // // // //   }, [tasks, search]);

// // // // // // // // //   const grouped = useMemo(() => {
// // // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // // //     filtered.forEach((t) => {
// // // // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // // // //     });
// // // // // // // // //     return g;
// // // // // // // // //   }, [filtered]);

// // // // // // // // //   // ================= CREATE =================

// // // // // // // // //   const createTask = async (e) => {
// // // // // // // // //     e.preventDefault();

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(API, {
// // // // // // // // //         method: "POST",
// // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           ...form,
// // // // // // // // //           status: "Todo",
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       if (!res.ok) throw new Error();

// // // // // // // // //       const newTask = await res.json();

// // // // // // // // //       setTasks((prev) => [newTask, ...prev]);

// // // // // // // // //       setForm({
// // // // // // // // //         title: "",
// // // // // // // // //         description: "",
// // // // // // // // //         projectId: "",
// // // // // // // // //         assigneeId: "unassigned",
// // // // // // // // //         priority: "Medium",
// // // // // // // // //         dueDate: "",
// // // // // // // // //       });

// // // // // // // // //       setOpen(false);
// // // // // // // // //       toast.success("Task created");
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Create failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ================= UPDATE =================

// // // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // // // // //         method: "PUT",
// // // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // // //         body: JSON.stringify(updates),
// // // // // // // // //       });

// // // // // // // // //       const updated = await res.json();

// // // // // // // // //       setTasks((prev) =>
// // // // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // // // //       );
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Update failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ================= DELETE =================

// // // // // // // // //   const deleteTask = async (id) => {
// // // // // // // // //     try {
// // // // // // // // //       await fetch(`${API}/${id}`, {
// // // // // // // // //         method: "DELETE",
// // // // // // // // //       });

// // // // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // // //       toast.success("Deleted");
// // // // // // // // //     } catch {
// // // // // // // // //       toast.error("Delete failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ================= HELPERS =================

// // // // // // // // //   const getUser = (id) =>
// // // // // // // // //     users.find((u) => u._id === id)?.name || "Unassigned";

// // // // // // // // //   const getProject = (id) =>
// // // // // // // // //     projects.find((p) => p._id === id)?.name || "Project";

// // // // // // // // //   // ================= UI =================

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // // //       <PageHeader
// // // // // // // // //         title="Tasks"
// // // // // // // // //         description="Track work across all your projects."
// // // // // // // // //         action={
// // // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // // //             <DialogTrigger asChild>
// // // // // // // // //               <Button>
// // // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // // //               </Button>
// // // // // // // // //             </DialogTrigger>

// // // // // // // // //             <DialogContent>
// // // // // // // // //               <DialogHeader>
// // // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // // //               </DialogHeader>

// // // // // // // // //               <form onSubmit={createTask} className="space-y-4">
// // // // // // // // //                 <Input
// // // // // // // // //                   placeholder="Title"
// // // // // // // // //                   value={form.title}
// // // // // // // // //                   onChange={(e) =>
// // // // // // // // //                     setForm({ ...form, title: e.target.value })
// // // // // // // // //                   }
// // // // // // // // //                   required
// // // // // // // // //                 />

// // // // // // // // //                 <Textarea
// // // // // // // // //                   placeholder="Description"
// // // // // // // // //                   value={form.description}
// // // // // // // // //                   onChange={(e) =>
// // // // // // // // //                     setForm({ ...form, description: e.target.value })
// // // // // // // // //                   }
// // // // // // // // //                 />

// // // // // // // // //                 {/* PROJECT + USER */}
// // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                   <Select
// // // // // // // // //                     value={form.projectId}
// // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // //                       setForm({ ...form, projectId: v })
// // // // // // // // //                     }
// // // // // // // // //                   >
// // // // // // // // //                     <SelectTrigger>
// // // // // // // // //                       <SelectValue placeholder="Select project" />
// // // // // // // // //                     </SelectTrigger>
// // // // // // // // //                     <SelectContent>
// // // // // // // // //                       {projects.map((p) => (
// // // // // // // // //                         <SelectItem key={p._id} value={p._id}>
// // // // // // // // //                           {p.name}
// // // // // // // // //                         </SelectItem>
// // // // // // // // //                       ))}
// // // // // // // // //                     </SelectContent>
// // // // // // // // //                   </Select>

// // // // // // // // //                   <Select
// // // // // // // // //                     value={form.assigneeId}
// // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // //                       setForm({ ...form, assigneeId: v })
// // // // // // // // //                     }
// // // // // // // // //                   >
// // // // // // // // //                     <SelectTrigger>
// // // // // // // // //                       <SelectValue placeholder="Select user" />
// // // // // // // // //                     </SelectTrigger>
// // // // // // // // //                     <SelectContent>
// // // // // // // // //                       <SelectItem value="unassigned">
// // // // // // // // //                         Unassigned
// // // // // // // // //                       </SelectItem>
// // // // // // // // //                       {users.map((u) => (
// // // // // // // // //                         <SelectItem key={u._id} value={u._id}>
// // // // // // // // //                           {u.name}
// // // // // // // // //                         </SelectItem>
// // // // // // // // //                       ))}
// // // // // // // // //                     </SelectContent>
// // // // // // // // //                   </Select>
// // // // // // // // //                 </div>

// // // // // // // // //                 {/* PRIORITY + DATE */}
// // // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                   <Select
// // // // // // // // //                     value={form.priority}
// // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // //                       setForm({ ...form, priority: v })
// // // // // // // // //                     }
// // // // // // // // //                   >
// // // // // // // // //                     <SelectTrigger>
// // // // // // // // //                       <SelectValue />
// // // // // // // // //                     </SelectTrigger>
// // // // // // // // //                     <SelectContent>
// // // // // // // // //                       {PRIORITIES.map((p) => (
// // // // // // // // //                         <SelectItem key={p} value={p}>
// // // // // // // // //                           {p}
// // // // // // // // //                         </SelectItem>
// // // // // // // // //                       ))}
// // // // // // // // //                     </SelectContent>
// // // // // // // // //                   </Select>

// // // // // // // // //                   <Input
// // // // // // // // //                     type="date"
// // // // // // // // //                     value={form.dueDate}
// // // // // // // // //                     onChange={(e) =>
// // // // // // // // //                       setForm({ ...form, dueDate: e.target.value })
// // // // // // // // //                     }
// // // // // // // // //                   />
// // // // // // // // //                 </div>

// // // // // // // // //                 <DialogFooter>
// // // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // // //                 </DialogFooter>
// // // // // // // // //               </form>
// // // // // // // // //             </DialogContent>
// // // // // // // // //           </Dialog>
// // // // // // // // //         }
// // // // // // // // //       />

// // // // // // // // //       {/* SEARCH */}
// // // // // // // // //       <Input
// // // // // // // // //         placeholder="Search tasks..."
// // // // // // // // //         value={search}
// // // // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // // // //         className="mb-6"
// // // // // // // // //       />

// // // // // // // // //       {/* BOARD */}
// // // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // // //         {STATUSES.map((status) => (
// // // // // // // // //           <div key={status}>
// // // // // // // // //             <p className="mb-2 font-semibold">{status}</p>

// // // // // // // // //             {grouped[status].map((t) => (
// // // // // // // // //               <Card key={t._id} className="p-4 mb-3">
// // // // // // // // //                 <p className="font-medium">{t.title}</p>

// // // // // // // // //                 <p className="text-sm text-gray-500">
// // // // // // // // //                   {getProject(t.projectId)}
// // // // // // // // //                 </p>

// // // // // // // // //                 <span
// // // // // // // // //                   className={cn(
// // // // // // // // //                     "text-xs px-2 py-1 rounded border",
// // // // // // // // //                     priorityStyles[t.priority]
// // // // // // // // //                   )}
// // // // // // // // //                 >
// // // // // // // // //                   <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // // //                   {t.priority}
// // // // // // // // //                 </span>

// // // // // // // // //                 <div className="flex justify-between mt-3 items-center">
// // // // // // // // //                   <span className="text-xs">
// // // // // // // // //                     {getUser(t.assigneeId)}
// // // // // // // // //                   </span>

// // // // // // // // //                   <Select
// // // // // // // // //                     value={t.status}
// // // // // // // // //                     onValueChange={(v) =>
// // // // // // // // //                       updateTask(t._id, { status: v })
// // // // // // // // //                     }
// // // // // // // // //                   >
// // // // // // // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // // //                       <SelectValue />
// // // // // // // // //                     </SelectTrigger>
// // // // // // // // //                     <SelectContent>
// // // // // // // // //                       {STATUSES.map((s) => (
// // // // // // // // //                         <SelectItem key={s} value={s}>
// // // // // // // // //                           {s}
// // // // // // // // //                         </SelectItem>
// // // // // // // // //                       ))}
// // // // // // // // //                     </SelectContent>
// // // // // // // // //                   </Select>

// // // // // // // // //                   <Button
// // // // // // // // //                     size="icon"
// // // // // // // // //                     variant="ghost"
// // // // // // // // //                     onClick={() => deleteTask(t._id)}
// // // // // // // // //                   >
// // // // // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // // // // //                   </Button>
// // // // // // // // //                 </div>
// // // // // // // // //               </Card>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // // // import {
// // // // // // // //   Select,
// // // // // // // //   SelectContent,
// // // // // // // //   SelectItem,
// // // // // // // //   SelectTrigger,
// // // // // // // //   SelectValue,
// // // // // // // // } from "@/components/ui/select";

// // // // // // // // import {
// // // // // // // //   Dialog,
// // // // // // // //   DialogContent,
// // // // // // // //   DialogHeader,
// // // // // // // //   DialogTitle,
// // // // // // // //   DialogTrigger,
// // // // // // // //   DialogFooter,
// // // // // // // // } from "@/components/ui/dialog";

// // // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // // import { cn } from "@/lib/utils";
// // // // // // // // import { toast } from "sonner";

// // // // // // // // const API = "http://localhost:5000/api/tasks";
// // // // // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // // const priorityStyles = {
// // // // // // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // // // // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // // // // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // // // // // };

// // // // // // // // export default function Tasks() {
// // // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // // //   const [users, setUsers] = useState([]);

// // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // //   const [open, setOpen] = useState(false);

// // // // // // // //   const token = localStorage.getItem("token");

// // // // // // // //   const [form, setForm] = useState({
// // // // // // // //     title: "",
// // // // // // // //     description: "",
// // // // // // // //     projectId: "",
// // // // // // // //     assigneeId: "unassigned",
// // // // // // // //     priority: "Medium",
// // // // // // // //     dueDate: "",
// // // // // // // //   });

// // // // // // // //   // ================= FETCH =================

// // // // // // // //   const loadTasks = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(API);
// // // // // // // //       const data = await res.json();
// // // // // // // //       setTasks(Array.isArray(data) ? data : []);
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Failed to load tasks");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const fetchProjects = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BASE_URL}/projects`);
// // // // // // // //       const data = await res.json();
// // // // // // // //       setProjects(data);
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Failed to load projects");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const fetchUsers = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // // // // // //         headers: {
// // // // // // // //           Authorization: `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       const data = await res.json();
// // // // // // // //       setUsers(data);
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Failed to load users");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadTasks();
// // // // // // // //     fetchProjects();
// // // // // // // //     fetchUsers();
// // // // // // // //   }, []);

// // // // // // // //   // ================= FILTER =================

// // // // // // // //   const filtered = useMemo(() => {
// // // // // // // //     return tasks.filter((t) =>
// // // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // // //     );
// // // // // // // //   }, [tasks, search]);

// // // // // // // //   const grouped = useMemo(() => {
// // // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // // //     filtered.forEach((t) => {
// // // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // // //     });
// // // // // // // //     return g;
// // // // // // // //   }, [filtered]);

// // // // // // // //   // 🔥 FILTER ONLY MEMBERS (IMPORTANT)
// // // // // // // //   const memberUsers = users.filter((u) => u.role === "Member");

// // // // // // // //   // ================= CREATE =================

// // // // // // // //   const createTask = async (e) => {
// // // // // // // //     e.preventDefault();

// // // // // // // //     if (!form.projectId) {
// // // // // // // //       return toast.error("Please select a project");
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const res = await fetch(API, {
// // // // // // // //         method: "POST",
// // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           ...form,
// // // // // // // //           status: "Todo",
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       if (!res.ok) throw new Error();

// // // // // // // //       const newTask = await res.json();

// // // // // // // //       setTasks((prev) => [newTask, ...prev]);

// // // // // // // //       setForm({
// // // // // // // //         title: "",
// // // // // // // //         description: "",
// // // // // // // //         projectId: "",
// // // // // // // //         assigneeId: "unassigned",
// // // // // // // //         priority: "Medium",
// // // // // // // //         dueDate: "",
// // // // // // // //       });

// // // // // // // //       setOpen(false);
// // // // // // // //       toast.success("Task created");
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Create failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ================= UPDATE =================

// // // // // // // //   const updateTask = async (id, updates) => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // // // //         method: "PUT",
// // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // //         body: JSON.stringify(updates),
// // // // // // // //       });

// // // // // // // //       const updated = await res.json();

// // // // // // // //       setTasks((prev) =>
// // // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // // //       );
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Update failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ================= DELETE =================

// // // // // // // //   const deleteTask = async (id) => {
// // // // // // // //     try {
// // // // // // // //       await fetch(`${API}/${id}`, {
// // // // // // // //         method: "DELETE",
// // // // // // // //       });

// // // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // // //       toast.success("Deleted");
// // // // // // // //     } catch {
// // // // // // // //       toast.error("Delete failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ================= HELPERS =================

// // // // // // // //   const getUser = (id) =>
// // // // // // // //     users.find((u) => u._id === id)?.name || "Unassigned";

// // // // // // // //   const getProject = (id) =>
// // // // // // // //     projects.find((p) => p._id === id)?.name || "Project";

// // // // // // // //   // ================= UI =================

// // // // // // // //   return (
// // // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // // //       <PageHeader
// // // // // // // //         title="Tasks"
// // // // // // // //         description="Track work across all your projects."
// // // // // // // //         action={
// // // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // // //             <DialogTrigger asChild>
// // // // // // // //               <Button>
// // // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // // //               </Button>
// // // // // // // //             </DialogTrigger>

// // // // // // // //             <DialogContent>
// // // // // // // //               <DialogHeader>
// // // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // // //               </DialogHeader>

// // // // // // // //               <form onSubmit={createTask} className="space-y-4">
// // // // // // // //                 <Input
// // // // // // // //                   placeholder="Title"
// // // // // // // //                   value={form.title}
// // // // // // // //                   onChange={(e) =>
// // // // // // // //                     setForm({ ...form, title: e.target.value })
// // // // // // // //                   }
// // // // // // // //                   required
// // // // // // // //                 />

// // // // // // // //                 <Textarea
// // // // // // // //                   placeholder="Description"
// // // // // // // //                   value={form.description}
// // // // // // // //                   onChange={(e) =>
// // // // // // // //                     setForm({ ...form, description: e.target.value })
// // // // // // // //                   }
// // // // // // // //                 />

// // // // // // // //                 {/* PROJECT + ASSIGNEE */}
// // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // //                   {/* PROJECT */}
// // // // // // // //                   <Select
// // // // // // // //                     value={form.projectId}
// // // // // // // //                     onValueChange={(v) =>
// // // // // // // //                       setForm({ ...form, projectId: v })
// // // // // // // //                     }
// // // // // // // //                   >
// // // // // // // //                     <SelectTrigger>
// // // // // // // //                       <SelectValue placeholder="Select project" />
// // // // // // // //                     </SelectTrigger>
// // // // // // // //                     <SelectContent>
// // // // // // // //                       {projects.map((p) => (
// // // // // // // //                         <SelectItem key={p._id} value={p._id}>
// // // // // // // //                           {p.name}
// // // // // // // //                         </SelectItem>
// // // // // // // //                       ))}
// // // // // // // //                     </SelectContent>
// // // // // // // //                   </Select>

// // // // // // // //                   {/* ASSIGNEE (ONLY MEMBERS) */}
// // // // // // // //                   <Select
// // // // // // // //                     value={form.assigneeId}
// // // // // // // //                     onValueChange={(v) =>
// // // // // // // //                       setForm({ ...form, assigneeId: v })
// // // // // // // //                     }
// // // // // // // //                   >
// // // // // // // //                     <SelectTrigger>
// // // // // // // //                       <SelectValue placeholder="Assign member" />
// // // // // // // //                     </SelectTrigger>
// // // // // // // //                     <SelectContent>
// // // // // // // //                       <SelectItem value="unassigned">
// // // // // // // //                         Unassigned
// // // // // // // //                       </SelectItem>

// // // // // // // //                       {memberUsers.length === 0 ? (
// // // // // // // //                         <SelectItem value="none" disabled>
// // // // // // // //                           No members available
// // // // // // // //                         </SelectItem>
// // // // // // // //                       ) : (
// // // // // // // //                         memberUsers.map((u) => (
// // // // // // // //                           <SelectItem key={u._id} value={u._id}>
// // // // // // // //                             {u.name}
// // // // // // // //                           </SelectItem>
// // // // // // // //                         ))
// // // // // // // //                       )}
// // // // // // // //                     </SelectContent>
// // // // // // // //                   </Select>
// // // // // // // //                 </div>

// // // // // // // //                 {/* PRIORITY + DATE */}
// // // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // // //                   <Select
// // // // // // // //                     value={form.priority}
// // // // // // // //                     onValueChange={(v) =>
// // // // // // // //                       setForm({ ...form, priority: v })
// // // // // // // //                     }
// // // // // // // //                   >
// // // // // // // //                     <SelectTrigger>
// // // // // // // //                       <SelectValue />
// // // // // // // //                     </SelectTrigger>
// // // // // // // //                     <SelectContent>
// // // // // // // //                       {PRIORITIES.map((p) => (
// // // // // // // //                         <SelectItem key={p} value={p}>
// // // // // // // //                           {p}
// // // // // // // //                         </SelectItem>
// // // // // // // //                       ))}
// // // // // // // //                     </SelectContent>
// // // // // // // //                   </Select>

// // // // // // // //                   <Input
// // // // // // // //                     type="date"
// // // // // // // //                     value={form.dueDate}
// // // // // // // //                     onChange={(e) =>
// // // // // // // //                       setForm({ ...form, dueDate: e.target.value })
// // // // // // // //                     }
// // // // // // // //                   />
// // // // // // // //                 </div>

// // // // // // // //                 <DialogFooter>
// // // // // // // //                   <Button type="submit">Create</Button>
// // // // // // // //                 </DialogFooter>
// // // // // // // //               </form>
// // // // // // // //             </DialogContent>
// // // // // // // //           </Dialog>
// // // // // // // //         }
// // // // // // // //       />

// // // // // // // //       {/* SEARCH */}
// // // // // // // //       <Input
// // // // // // // //         placeholder="Search tasks..."
// // // // // // // //         value={search}
// // // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // // //         className="mb-6"
// // // // // // // //       />

// // // // // // // //       {/* BOARD */}
// // // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // // //         {STATUSES.map((status) => (
// // // // // // // //           <div key={status}>
// // // // // // // //             <p className="mb-2 font-semibold">{status}</p>

// // // // // // // //             {grouped[status].map((t) => (
// // // // // // // //               <Card key={t._id} className="p-4 mb-3">
// // // // // // // //                 <p className="font-medium">{t.title}</p>

// // // // // // // //                 <p className="text-sm text-gray-500">
// // // // // // // //                   {getProject(t.projectId)}
// // // // // // // //                 </p>

// // // // // // // //                 <span
// // // // // // // //                   className={cn(
// // // // // // // //                     "text-xs px-2 py-1 rounded border",
// // // // // // // //                     priorityStyles[t.priority]
// // // // // // // //                   )}
// // // // // // // //                 >
// // // // // // // //                   <Flag className="inline w-3 h-3 mr-1" />
// // // // // // // //                   {t.priority}
// // // // // // // //                 </span>

// // // // // // // //                 <div className="flex justify-between mt-3 items-center">
// // // // // // // //                   <span className="text-xs">
// // // // // // // //                     {getUser(t.assigneeId)}
// // // // // // // //                   </span>

// // // // // // // //                   <Select
// // // // // // // //                     value={t.status}
// // // // // // // //                     onValueChange={(v) =>
// // // // // // // //                       updateTask(t._id, { status: v })
// // // // // // // //                     }
// // // // // // // //                   >
// // // // // // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // // //                       <SelectValue />
// // // // // // // //                     </SelectTrigger>
// // // // // // // //                     <SelectContent>
// // // // // // // //                       {STATUSES.map((s) => (
// // // // // // // //                         <SelectItem key={s} value={s}>
// // // // // // // //                           {s}
// // // // // // // //                         </SelectItem>
// // // // // // // //                       ))}
// // // // // // // //                     </SelectContent>
// // // // // // // //                   </Select>

// // // // // // // //                   <Button
// // // // // // // //                     size="icon"
// // // // // // // //                     variant="ghost"
// // // // // // // //                     onClick={() => deleteTask(t._id)}
// // // // // // // //                   >
// // // // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // // // //                   </Button>
// // // // // // // //                 </div>
// // // // // // // //               </Card>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // import { useEffect, useMemo, useState } from "react";
// // // // // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // // import {
// // // // // // //   Select,
// // // // // // //   SelectContent,
// // // // // // //   SelectItem,
// // // // // // //   SelectTrigger,
// // // // // // //   SelectValue,
// // // // // // // } from "@/components/ui/select";

// // // // // // // import {
// // // // // // //   Dialog,
// // // // // // //   DialogContent,
// // // // // // //   DialogHeader,
// // // // // // //   DialogTitle,
// // // // // // //   DialogTrigger,
// // // // // // //   DialogFooter,
// // // // // // // } from "@/components/ui/dialog";

// // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // import { cn } from "@/lib/utils";
// // // // // // // import { toast } from "sonner";

// // // // // // // const API = "http://localhost:5000/api/tasks";
// // // // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // // const priorityStyles = {
// // // // // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // // // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // // // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // // // // };

// // // // // // // export default function Tasks() {
// // // // // // //   const [tasks, setTasks] = useState([]);
// // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // //   const [users, setUsers] = useState([]);

// // // // // // //   const [search, setSearch] = useState("");
// // // // // // //   const [open, setOpen] = useState(false);

// // // // // // //   const token = localStorage.getItem("token");

// // // // // // //   const [form, setForm] = useState({
// // // // // // //     title: "",
// // // // // // //     description: "",
// // // // // // //     projectId: "",
// // // // // // //     assigneeId: "unassigned",
// // // // // // //     priority: "Medium",
// // // // // // //     dueDate: "",
// // // // // // //   });

// // // // // // //   // ================= FETCH =================

// // // // // // //   const loadTasks = async () => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(API);
// // // // // // //       const data = await res.json();
// // // // // // //       setTasks(Array.isArray(data) ? data : []);
// // // // // // //     } catch {
// // // // // // //       toast.error("Failed to load tasks");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const fetchProjects = async () => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BASE_URL}/projects`);
// // // // // // //       const data = await res.json();
// // // // // // //       setProjects(data);
// // // // // // //     } catch {
// // // // // // //       toast.error("Failed to load projects");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const fetchUsers = async () => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // // // // //         headers: {
// // // // // // //           Authorization: `Bearer ${token}`,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       const data = await res.json();
// // // // // // //       setUsers(data);
// // // // // // //     } catch {
// // // // // // //       toast.error("Failed to load users");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     loadTasks();
// // // // // // //     fetchProjects();
// // // // // // //     fetchUsers();
// // // // // // //   }, []);

// // // // // // //   // ================= FILTER =================

// // // // // // //   const filtered = useMemo(() => {
// // // // // // //     return tasks.filter((t) =>
// // // // // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // // // // //     );
// // // // // // //   }, [tasks, search]);

// // // // // // //   const grouped = useMemo(() => {
// // // // // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // // // // //     filtered.forEach((t) => {
// // // // // // //       if (g[t.status]) g[t.status].push(t);
// // // // // // //     });
// // // // // // //     return g;
// // // // // // //   }, [filtered]);

// // // // // // //   // 🔥 ONLY MEMBERS
// // // // // // //   const memberUsers = users.filter((u) => u.role === "Member");

// // // // // // //   // ================= CREATE =================

// // // // // // //   const createTask = async (e) => {
// // // // // // //     e.preventDefault();

// // // // // // //     if (!form.projectId) {
// // // // // // //       return toast.error("Please select a project");
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const res = await fetch(API, {
// // // // // // //         method: "POST",
// // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // //         body: JSON.stringify({
// // // // // // //           ...form,
// // // // // // //           status: "Todo",
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       if (!res.ok) throw new Error();

// // // // // // //       const newTask = await res.json();

// // // // // // //       setTasks((prev) => [newTask, ...prev]);

// // // // // // //       setForm({
// // // // // // //         title: "",
// // // // // // //         description: "",
// // // // // // //         projectId: "",
// // // // // // //         assigneeId: "unassigned",
// // // // // // //         priority: "Medium",
// // // // // // //         dueDate: "",
// // // // // // //       });

// // // // // // //       setOpen(false);
// // // // // // //       toast.success("Task created");
// // // // // // //     } catch {
// // // // // // //       toast.error("Create failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ================= UPDATE =================

// // // // // // //   const updateTask = async (id, updates) => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // // //         method: "PUT",
// // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // //         body: JSON.stringify(updates),
// // // // // // //       });

// // // // // // //       const updated = await res.json();

// // // // // // //       setTasks((prev) =>
// // // // // // //         prev.map((t) => (t._id === id ? updated : t))
// // // // // // //       );
// // // // // // //     } catch {
// // // // // // //       toast.error("Update failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ================= DELETE =================

// // // // // // //   const deleteTask = async (id) => {
// // // // // // //     try {
// // // // // // //       await fetch(`${API}/${id}`, {
// // // // // // //         method: "DELETE",
// // // // // // //       });

// // // // // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // // // // //       toast.success("Deleted");
// // // // // // //     } catch {
// // // // // // //       toast.error("Delete failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ================= HELPERS =================

// // // // // // //   const getProject = (id) =>
// // // // // // //     projects.find((p) => p._id === id)?.name || "Project";

// // // // // // //   // ================= UI =================

// // // // // // //   return (
// // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // //       <PageHeader
// // // // // // //         title="Tasks"
// // // // // // //         description="Track work across all your projects."
// // // // // // //         action={
// // // // // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // // // // //             <DialogTrigger asChild>
// // // // // // //               <Button>
// // // // // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // // // // //               </Button>
// // // // // // //             </DialogTrigger>

// // // // // // //             <DialogContent>
// // // // // // //               <DialogHeader>
// // // // // // //                 <DialogTitle>Create task</DialogTitle>
// // // // // // //               </DialogHeader>

// // // // // // //               <form onSubmit={createTask} className="space-y-4">
// // // // // // //                 <Input
// // // // // // //                   placeholder="Title"
// // // // // // //                   value={form.title}
// // // // // // //                   onChange={(e) =>
// // // // // // //                     setForm({ ...form, title: e.target.value })
// // // // // // //                   }
// // // // // // //                   required
// // // // // // //                 />

// // // // // // //                 <Textarea
// // // // // // //                   placeholder="Description"
// // // // // // //                   value={form.description}
// // // // // // //                   onChange={(e) =>
// // // // // // //                     setForm({ ...form, description: e.target.value })
// // // // // // //                   }
// // // // // // //                 />

// // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // //                   {/* PROJECT */}
// // // // // // //                   <Select
// // // // // // //                     value={form.projectId}
// // // // // // //                     onValueChange={(v) =>
// // // // // // //                       setForm({ ...form, projectId: v })
// // // // // // //                     }
// // // // // // //                   >
// // // // // // //                     <SelectTrigger>
// // // // // // //                       <SelectValue placeholder="Select project" />
// // // // // // //                     </SelectTrigger>
// // // // // // //                     <SelectContent>
// // // // // // //                       {projects.map((p) => (
// // // // // // //                         <SelectItem key={p._id} value={p._id}>
// // // // // // //                           {p.name}
// // // // // // //                         </SelectItem>
// // // // // // //                       ))}
// // // // // // //                     </SelectContent>
// // // // // // //                   </Select>

// // // // // // //                   {/* ASSIGNEE */}
// // // // // // //                   <Select
// // // // // // //                     value={form.assigneeId}
// // // // // // //                     onValueChange={(v) =>
// // // // // // //                       setForm({ ...form, assigneeId: v })
// // // // // // //                     }
// // // // // // //                   >
// // // // // // //                     <SelectTrigger>
// // // // // // //                       <SelectValue placeholder="Assign member" />
// // // // // // //                     </SelectTrigger>
// // // // // // //                     <SelectContent>
// // // // // // //                       <SelectItem value="unassigned">
// // // // // // //                         Unassigned
// // // // // // //                       </SelectItem>

// // // // // // //                       {memberUsers.map((u) => (
// // // // // // //                         <SelectItem key={u._id} value={u._id}>
// // // // // // //                           {u.name}
// // // // // // //                         </SelectItem>
// // // // // // //                       ))}
// // // // // // //                     </SelectContent>
// // // // // // //                   </Select>
// // // // // // //                 </div>

// // // // // // //                 <div className="grid grid-cols-2 gap-4">
// // // // // // //                   <Select
// // // // // // //                     value={form.priority}
// // // // // // //                     onValueChange={(v) =>
// // // // // // //                       setForm({ ...form, priority: v })
// // // // // // //                     }
// // // // // // //                   >
// // // // // // //                     <SelectTrigger>
// // // // // // //                       <SelectValue />
// // // // // // //                     </SelectTrigger>
// // // // // // //                     <SelectContent>
// // // // // // //                       {PRIORITIES.map((p) => (
// // // // // // //                         <SelectItem key={p} value={p}>
// // // // // // //                           {p}
// // // // // // //                         </SelectItem>
// // // // // // //                       ))}
// // // // // // //                     </SelectContent>
// // // // // // //                   </Select>

// // // // // // //                   <Input
// // // // // // //                     type="date"
// // // // // // //                     value={form.dueDate}
// // // // // // //                     onChange={(e) =>
// // // // // // //                       setForm({ ...form, dueDate: e.target.value })
// // // // // // //                     }
// // // // // // //                   />
// // // // // // //                 </div>

// // // // // // //                 <DialogFooter>
// // // // // // //                   <Button type="submit">Create</Button>
// // // // // // //                 </DialogFooter>
// // // // // // //               </form>
// // // // // // //             </DialogContent>
// // // // // // //           </Dialog>
// // // // // // //         }
// // // // // // //       />

// // // // // // //       {/* SEARCH */}
// // // // // // //       <Input
// // // // // // //         placeholder="Search tasks..."
// // // // // // //         value={search}
// // // // // // //         onChange={(e) => setSearch(e.target.value)}
// // // // // // //         className="mb-6"
// // // // // // //       />

// // // // // // //       {/* BOARD */}
// // // // // // //       <div className="grid md:grid-cols-3 gap-4">
// // // // // // //         {STATUSES.map((status) => (
// // // // // // //           <div key={status}>
// // // // // // //             <p className="mb-2 font-semibold">{status}</p>

// // // // // // //             {grouped[status].map((t) => (
// // // // // // //               <Card key={t._id} className="p-4 mb-3">
// // // // // // //                 <p className="font-medium">{t.title}</p>

// // // // // // //                 <p className="text-sm text-gray-500">
// // // // // // //                   {getProject(t.projectId)}
// // // // // // //                 </p>

// // // // // // //                 <span
// // // // // // //                   className={cn(
// // // // // // //                     "text-xs px-2 py-1 rounded border",
// // // // // // //                     priorityStyles[t.priority]
// // // // // // //                   )}
// // // // // // //                 >
// // // // // // //                   <Flag className="inline w-3 h-3 mr-1" />
// // // // // // //                   {t.priority}
// // // // // // //                 </span>

// // // // // // //                 {/* 🔥 EDITABLE ASSIGNEE */}
// // // // // // //                 <div className="flex justify-between mt-3 items-center gap-2">

// // // // // // //                   {/* ASSIGNEE DROPDOWN */}
// // // // // // //                   <Select
// // // // // // //                     value={t.assigneeId || "unassigned"}
// // // // // // //                     onValueChange={(v) =>
// // // // // // //                       updateTask(t._id, { assigneeId: v })
// // // // // // //                     }
// // // // // // //                   >
// // // // // // //                     <SelectTrigger className="h-7 text-xs w-[130px]">
// // // // // // //                       <SelectValue />
// // // // // // //                     </SelectTrigger>

// // // // // // //                     <SelectContent>
// // // // // // //                       <SelectItem value="unassigned">
// // // // // // //                         Unassigned
// // // // // // //                       </SelectItem>

// // // // // // //                       {memberUsers.map((u) => (
// // // // // // //                         <SelectItem key={u._id} value={u._id}>
// // // // // // //                           {u.name}
// // // // // // //                         </SelectItem>
// // // // // // //                       ))}
// // // // // // //                     </SelectContent>
// // // // // // //                   </Select>

// // // // // // //                   {/* STATUS */}
// // // // // // //                   <Select
// // // // // // //                     value={t.status}
// // // // // // //                     onValueChange={(v) =>
// // // // // // //                       updateTask(t._id, { status: v })
// // // // // // //                     }
// // // // // // //                   >
// // // // // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // // // // //                       <SelectValue />
// // // // // // //                     </SelectTrigger>
// // // // // // //                     <SelectContent>
// // // // // // //                       {STATUSES.map((s) => (
// // // // // // //                         <SelectItem key={s} value={s}>
// // // // // // //                           {s}
// // // // // // //                         </SelectItem>
// // // // // // //                       ))}
// // // // // // //                     </SelectContent>
// // // // // // //                   </Select>

// // // // // // //                   {/* DELETE */}
// // // // // // //                   <Button
// // // // // // //                     size="icon"
// // // // // // //                     variant="ghost"
// // // // // // //                     onClick={() => deleteTask(t._id)}
// // // // // // //                   >
// // // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </Card>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import { useEffect, useMemo, useState, type CSSProperties } from "react";
// // // // // // import { Plus, Trash2, Search, Calendar, User } from "lucide-react";
// // // // // // import {
// // // // // //   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// // // // // // } from "@/components/ui/select";
// // // // // // import {
// // // // // //   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
// // // // // // } from "@/components/ui/dialog";
// // // // // // import { toast } from "sonner";

// // // // // // const API      = "http://localhost:5000/api/tasks";
// // // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // // const STATUSES  = ["Todo", "In Progress", "Done"];
// // // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // // const priorityMeta = {
// // // // // //   High:   { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
// // // // // //   Medium: { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
// // // // // //   Low:    { color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" },
// // // // // // };

// // // // // // const statusMeta = {
// // // // // //   "Todo":        { dot: "#9ca3af", ring: "#e5e7eb", pillBg: "#f3f4f6", pillText: "#374151" },
// // // // // //   "In Progress": { dot: "#f59e0b", ring: "#fde68a", pillBg: "#fffbeb", pillText: "#92400e" },
// // // // // //   "Done":        { dot: "#10b981", ring: "#a7f3d0", pillBg: "#ecfdf5", pillText: "#065f46" },
// // // // // // };

// // // // // // const avatarPalette = [
// // // // // //   ["#e0e7ff","#4338ca"], ["#fce7f3","#9d174d"], ["#d1fae5","#065f46"],
// // // // // //   ["#fee2e2","#991b1b"], ["#ede9fe","#5b21b6"], ["#fef3c7","#92400e"],
// // // // // // ];

// // // // // // function getAvatarPair(name = "") {
// // // // // //   return avatarPalette[(name.charCodeAt(0) || 0) % avatarPalette.length];
// // // // // // }

// // // // // // function Avatar({ name, size = 26 }) {
// // // // // //   if (!name) return (
// // // // // //     <div style={{
// // // // // //       width: size, height: size, borderRadius: "50%",
// // // // // //       border: "1.5px dashed #d1d5db", flexShrink: 0,
// // // // // //       display: "flex", alignItems: "center", justifyContent: "center",
// // // // // //     }}>
// // // // // //       <User size={11} color="#d1d5db" />
// // // // // //     </div>
// // // // // //   );
// // // // // //   const [bg, fg] = getAvatarPair(name);
// // // // // //   const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
// // // // // //   return (
// // // // // //     <div style={{
// // // // // //       width: size, height: size, borderRadius: "50%",
// // // // // //       background: bg, color: fg,
// // // // // //       fontSize: size * 0.36, fontWeight: 600,
// // // // // //       display: "flex", alignItems: "center", justifyContent: "center",
// // // // // //       flexShrink: 0, letterSpacing: "0.02em",
// // // // // //     }}>
// // // // // //       {initials}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // ── Shared field base (inputs / textareas only) ──
// // // // // // const fBase: CSSProperties = {
// // // // // //   width: "100%",
// // // // // //   padding: "9px 13px",
// // // // // //   fontSize: 14,
// // // // // //   borderRadius: 10,
// // // // // //   border: "1.5px solid #e5e7eb",
// // // // // //   background: "#fff",
// // // // // //   color: "#111",
// // // // // //   outline: "none",
// // // // // //   transition: "border-color .15s, box-shadow .15s",
// // // // // //   boxSizing: "border-box",
// // // // // //   fontFamily: "inherit",
// // // // // // };

// // // // // // // ── SelectTrigger style (compatible subset only) ──
// // // // // // const sTrigger = {
// // // // // //   height: 40,
// // // // // //   width: "100%",
// // // // // //   fontSize: 14,
// // // // // //   borderRadius: 10,
// // // // // //   border: "1.5px solid #e5e7eb",
// // // // // //   background: "#fff",
// // // // // //   color: "#111",
// // // // // //   fontFamily: "inherit",
// // // // // // };

// // // // // // export default function Tasks() {
// // // // // //   const [tasks,    setTasks]    = useState([]);
// // // // // //   const [projects, setProjects] = useState([]);
// // // // // //   const [users,    setUsers]    = useState([]);
// // // // // //   const [search,   setSearch]   = useState("");
// // // // // //   const [open,     setOpen]     = useState(false);

// // // // // //   const token = localStorage.getItem("token");

// // // // // //   const [form, setForm] = useState({
// // // // // //     title: "", description: "",
// // // // // //     projectId: "", assigneeId: "unassigned",
// // // // // //     priority: "Medium", dueDate: "",
// // // // // //   });

// // // // // //   const loadTasks = async () => {
// // // // // //     try { const d = await (await fetch(API)).json(); setTasks(Array.isArray(d) ? d : []); }
// // // // // //     catch { toast.error("Failed to load tasks"); }
// // // // // //   };
// // // // // //   const fetchProjects = async () => {
// // // // // //     try { setProjects(await (await fetch(`${BASE_URL}/projects`)).json()); }
// // // // // //     catch { toast.error("Failed to load projects"); }
// // // // // //   };
// // // // // //   const fetchUsers = async () => {
// // // // // //     try {
// // // // // //       setUsers(await (await fetch(`${BASE_URL}/admin/users`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       })).json());
// // // // // //     } catch { toast.error("Failed to load users"); }
// // // // // //   };
// // // // // //   useEffect(() => { loadTasks(); fetchProjects(); fetchUsers(); }, []);

// // // // // //   const filtered = useMemo(() =>
// // // // // //     tasks.filter(t => t.title?.toLowerCase().includes(search.toLowerCase())),
// // // // // //     [tasks, search]
// // // // // //   );
// // // // // //   const grouped = useMemo(() => {
// // // // // //     const g = { "Todo": [], "In Progress": [], "Done": [] };
// // // // // //     filtered.forEach(t => { if (g[t.status]) g[t.status].push(t); });
// // // // // //     return g;
// // // // // //   }, [filtered]);

// // // // // //   const members = users.filter(u => u.role === "Member");

// // // // // //   const createTask = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!form.projectId) return toast.error("Please select a project");
// // // // // //     try {
// // // // // //       const res = await fetch(API, {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({ ...form, status: "Todo" }),
// // // // // //       });
// // // // // //       if (!res.ok) throw new Error();
// // // // // //       const newTask = await res.json();
// // // // // //       setTasks(p => [newTask, ...p]);
// // // // // //       setForm({ title:"", description:"", projectId:"", assigneeId:"unassigned", priority:"Medium", dueDate:"" });
// // // // // //       setOpen(false);
// // // // // //       toast.success("Task created");
// // // // // //     } catch { toast.error("Create failed"); }
// // // // // //   };

// // // // // //   const updateTask = async (id, upd) => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${API}/${id}`, {
// // // // // //         method: "PUT",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify(upd),
// // // // // //       });
// // // // // //       const updated = await res.json();
// // // // // //       setTasks(p => p.map(t => t._id === id ? updated : t));
// // // // // //     } catch { toast.error("Update failed"); }
// // // // // //   };

// // // // // //   const deleteTask = async (id) => {
// // // // // //     try {
// // // // // //       await fetch(`${API}/${id}`, { method: "DELETE" });
// // // // // //       setTasks(p => p.filter(t => t._id !== id));
// // // // // //       toast.success("Deleted");
// // // // // //     } catch { toast.error("Delete failed"); }
// // // // // //   };

// // // // // //   const getProject  = id => projects.find(p => p._id === id)?.name ?? "";
// // // // // //   const getUser     = id => users.find(u => u._id === id);

// // // // // //   return (
// // // // // //     <>
// // // // // //       <style>{`
// // // // // //         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');

// // // // // //         .tr { background:#fff; min-height:100vh; font-family:'Geist',sans-serif; color:#111; }

// // // // // //         /* ── Focus rings ── */
// // // // // //         .tr input:focus, .tr textarea:focus,
// // // // // //         [data-radix-select-trigger]:focus-visible,
// // // // // //         .tr button:focus-visible {
// // // // // //           outline: none !important;
// // // // // //           border-color: #111 !important;
// // // // // //           box-shadow: 0 0 0 3px rgba(17,17,17,.1) !important;
// // // // // //         }

// // // // // //         /* ── Primary button ── */
// // // // // //         .btn-p {
// // // // // //           display:inline-flex; align-items:center; gap:7px;
// // // // // //           padding:9px 18px; font-size:13.5px; font-weight:500;
// // // // // //           background:#0a0a0a; color:#fff; border:none; border-radius:11px;
// // // // // //           cursor:pointer; font-family:'Geist',sans-serif; letter-spacing:-.01em;
// // // // // //           transition:background .15s, box-shadow .18s, transform .1s;
// // // // // //         }
// // // // // //         .btn-p:hover { background:#1a1a1a; box-shadow:0 6px 22px rgba(0,0,0,.18); transform:translateY(-1px); }
// // // // // //         .btn-p:active { transform:none; }
// // // // // //         .btn-p:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(17,17,17,.22) !important; }

// // // // // //         /* ── Secondary button ── */
// // // // // //         .btn-s {
// // // // // //           padding:9px 18px; font-size:13.5px; font-weight:500;
// // // // // //           background:#fff; color:#374151;
// // // // // //           border:1.5px solid #e5e7eb; border-radius:10px;
// // // // // //           cursor:pointer; font-family:'Geist',sans-serif;
// // // // // //           transition:background .12s, border-color .12s;
// // // // // //         }
// // // // // //         .btn-s:hover { background:#f9fafb; border-color:#d1d5db; }
// // // // // //         .btn-s:focus-visible { outline:none; border-color:#111 !important; box-shadow:0 0 0 3px rgba(17,17,17,.1) !important; }

// // // // // //         /* ── Search wrapper ── */
// // // // // //         .sw { position:relative; }
// // // // // //         .sw svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none; }
// // // // // //         .sw input { padding-left:38px !important; }

// // // // // //         /* ── Column header ── */
// // // // // //         .col-hdr {
// // // // // //           display:flex; align-items:center; gap:10px;
// // // // // //           padding-bottom:14px;
// // // // // //           border-bottom:1.5px solid #f3f4f6;
// // // // // //           margin-bottom:16px;
// // // // // //         }

// // // // // //         /* ── Task card ── */
// // // // // //         .tc {
// // // // // //           background:#fff;
// // // // // //           border:1.5px solid #f0f0ef;
// // // // // //           border-radius:16px;
// // // // // //           padding:17px 17px 14px;
// // // // // //           position:relative;
// // // // // //           transition:border-color .18s, box-shadow .18s, transform .18s;
// // // // // //           animation: cIn .22s ease both;
// // // // // //         }
// // // // // //         .tc:hover { border-color:#e2e2e0; box-shadow:0 8px 30px rgba(0,0,0,.07); transform:translateY(-2px); }
// // // // // //         @keyframes cIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }

// // // // // //         /* delete button */
// // // // // //         .del {
// // // // // //           position:absolute; top:11px; right:11px;
// // // // // //           width:28px; height:28px; border-radius:8px;
// // // // // //           border:none; background:transparent; cursor:pointer;
// // // // // //           display:flex; align-items:center; justify-content:center;
// // // // // //           opacity:0; transition:opacity .15s, background .12s;
// // // // // //         }
// // // // // //         .tc:hover .del { opacity:1; }
// // // // // //         .del:hover { background:#fef2f2; }
// // // // // //         .del:focus-visible { opacity:1; outline:none; box-shadow:0 0 0 2px #dc2626; }

// // // // // //         /* ── Empty state ── */
// // // // // //         .empty {
// // // // // //           border:1.5px dashed #e5e7eb; border-radius:14px;
// // // // // //           padding:36px 16px; text-align:center; color:#d1d5db; font-size:13px;
// // // // // //         }

// // // // // //         /* ── Slim status/assignee selects inside card ── */
// // // // // //         .ss [data-radix-select-trigger] {
// // // // // //           height:28px !important; font-size:12px !important;
// // // // // //           padding:0 9px !important; border-radius:8px !important;
// // // // // //           border:1.5px solid transparent !important;
// // // // // //           background:transparent !important;
// // // // // //           transition:border-color .12s, background .12s !important;
// // // // // //         }
// // // // // //         .ss [data-radix-select-trigger]:hover { background:#f9fafb !important; border-color:#e5e7eb !important; }
// // // // // //         .ss [data-radix-select-trigger]:focus-visible {
// // // // // //           border-color:#111 !important;
// // // // // //           box-shadow:0 0 0 3px rgba(17,17,17,.09) !important;
// // // // // //         }

// // // // // //         /* scrollbar */
// // // // // //         .cs { scrollbar-width:thin; scrollbar-color:#ececec transparent; }
// // // // // //         .cs::-webkit-scrollbar { width:3px; }
// // // // // //         .cs::-webkit-scrollbar-thumb { background:#e5e7eb; border-radius:4px; }
// // // // // //       `}</style>

// // // // // //       <div className="tr">
// // // // // //         <div style={{ maxWidth:1280, margin:"0 auto", padding:"52px 44px 80px" }}>

// // // // // //           {/* ═══ TOP BAR ═══ */}
// // // // // //           <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:44 }}>

// // // // // //             {/* Left: wordmark */}
// // // // // //             <div>
// // // // // //               <span style={{
// // // // // //                 display:"block", fontSize:10.5, fontWeight:600,
// // // // // //                 letterSpacing:"0.14em", textTransform:"uppercase",
// // // // // //                 color:"#9ca3af", marginBottom:10,
// // // // // //               }}>
// // // // // //                 Workspace
// // // // // //               </span>
// // // // // //               <h1 style={{
// // // // // //                 fontFamily:"'Instrument Serif', serif",
// // // // // //                 fontSize:48, fontWeight:400, fontStyle:"italic",
// // // // // //                 letterSpacing:"-0.025em", color:"#0a0a0a",
// // // // // //                 lineHeight:1, margin:0,
// // // // // //               }}>
// // // // // //                 Tasks
// // // // // //               </h1>
// // // // // //               <p style={{ fontSize:13.5, color:"#9ca3af", marginTop:9, fontWeight:400 }}>
// // // // // //                 Track and manage work across all your projects.
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             {/* Right: status pills + button */}
// // // // // //             <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
// // // // // //               <div style={{ display:"flex", gap:6 }}>
// // // // // //                 {STATUSES.map(s => {
// // // // // //                   const m = statusMeta[s];
// // // // // //                   return (
// // // // // //                     <div key={s} style={{
// // // // // //                       display:"flex", alignItems:"center", gap:6,
// // // // // //                       padding:"5px 11px", borderRadius:9,
// // // // // //                       background:m.pillBg, border:`1.5px solid ${m.ring}`,
// // // // // //                     }}>
// // // // // //                       <div style={{ width:6, height:6, borderRadius:"50%", background:m.dot }} />
// // // // // //                       <span style={{ fontSize:12, fontWeight:500, color:m.pillText }}>{s}</span>
// // // // // //                       <span style={{
// // // // // //                         fontSize:11.5, fontWeight:700, color:m.pillText,
// // // // // //                         background:"rgba(0,0,0,.07)", borderRadius:6,
// // // // // //                         padding:"1px 6px",
// // // // // //                       }}>
// // // // // //                         {grouped[s]?.length ?? 0}
// // // // // //                       </span>
// // // // // //                     </div>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>

// // // // // //               <Dialog open={open} onOpenChange={setOpen}>
// // // // // //                 <DialogTrigger asChild>
// // // // // //                   <button className="btn-p">
// // // // // //                     <Plus size={15} strokeWidth={2.5} /> New task
// // // // // //                   </button>
// // // // // //                 </DialogTrigger>

// // // // // //                 <DialogContent style={{
// // // // // //                   borderRadius:20, border:"1.5px solid #f0f0f0",
// // // // // //                   boxShadow:"0 32px 80px rgba(0,0,0,.13)",
// // // // // //                   padding:"30px 30px 26px", maxWidth:460,
// // // // // //                   background:"#fff", fontFamily:"'Geist',sans-serif",
// // // // // //                 }}>
// // // // // //                   <DialogHeader style={{ marginBottom:22 }}>
// // // // // //                     <DialogTitle style={{
// // // // // //                       fontFamily:"'Instrument Serif',serif",
// // // // // //                       fontSize:26, fontWeight:400, fontStyle:"italic",
// // // // // //                       color:"#0a0a0a", letterSpacing:"-0.02em",
// // // // // //                     }}>
// // // // // //                       Create a task
// // // // // //                     </DialogTitle>
// // // // // //                   </DialogHeader>

// // // // // //                   <form onSubmit={createTask}>
// // // // // //                     <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

// // // // // //                       {/* Title */}
// // // // // //                       <div>
// // // // // //                         <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Title</label>
// // // // // //                         <input style={fBase} className="tr" placeholder="What needs to be done?"
// // // // // //                           value={form.title} onChange={e => setForm({...form, title:e.target.value})} required />
// // // // // //                       </div>

// // // // // //                       {/* Description */}
// // // // // //                       <div>
// // // // // //                         <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Description</label>
// // // // // //                         <textarea style={{ ...fBase, resize:"none", minHeight:76, lineHeight:1.6 }} className="tr"
// // // // // //                           placeholder="Add more context…"
// // // // // //                           value={form.description} onChange={e => setForm({...form, description:e.target.value})} />
// // // // // //                       </div>

// // // // // //                       {/* Project / Assignee */}
// // // // // //                       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
// // // // // //                         <div>
// // // // // //                           <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Project</label>
// // // // // //                           <Select value={form.projectId} onValueChange={v => setForm({...form, projectId:v})}>
// // // // // //                             <SelectTrigger style={sTrigger}><SelectValue placeholder="Select project" /></SelectTrigger>
// // // // // //                             <SelectContent>{projects.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}</SelectContent>
// // // // // //                           </Select>
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                           <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Assignee</label>
// // // // // //                           <Select value={form.assigneeId} onValueChange={v => setForm({...form, assigneeId:v})}>
// // // // // //                             <SelectTrigger style={sTrigger}><SelectValue placeholder="Assign to" /></SelectTrigger>
// // // // // //                             <SelectContent>
// // // // // //                               <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // // //                               {members.map(u => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// // // // // //                             </SelectContent>
// // // // // //                           </Select>
// // // // // //                         </div>
// // // // // //                       </div>

// // // // // //                       {/* Priority / Due date */}
// // // // // //                       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
// // // // // //                         <div>
// // // // // //                           <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Priority</label>
// // // // // //                           <Select value={form.priority} onValueChange={v => setForm({...form, priority:v})}>
// // // // // //                             <SelectTrigger style={sTrigger}><SelectValue /></SelectTrigger>
// // // // // //                             <SelectContent>{PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
// // // // // //                           </Select>
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                           <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", marginBottom:6 }}>Due date</label>
// // // // // //                           <input type="date" style={{ ...fBase, height:40 }} className="tr"
// // // // // //                             value={form.dueDate} onChange={e => setForm({...form, dueDate:e.target.value})} />
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </div>

// // // // // //                     <div style={{ display:"flex", justifyContent:"flex-end", gap:10, marginTop:24 }}>
// // // // // //                       <button type="button" className="btn-s" onClick={() => setOpen(false)}>Cancel</button>
// // // // // //                       <button type="submit" className="btn-p"><Plus size={14} /> Create task</button>
// // // // // //                     </div>
// // // // // //                   </form>
// // // // // //                 </DialogContent>
// // // // // //               </Dialog>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* ═══ SEARCH ═══ */}
// // // // // //           <div style={{ maxWidth:360, marginBottom:36 }} className="sw">
// // // // // //             <Search size={14} color="#9ca3af" />
// // // // // //             <input
// // // // // //               style={{ ...fBase, paddingLeft:38, height:40, background:"#fafafa", fontSize:13.5 }}
// // // // // //               className="tr"
// // // // // //               placeholder="Search tasks…"
// // // // // //               value={search}
// // // // // //               onChange={e => setSearch(e.target.value)}
// // // // // //             />
// // // // // //           </div>

// // // // // //           {/* ═══ BOARD ═══ */}
// // // // // //           <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
// // // // // //             {STATUSES.map(status => {
// // // // // //               const m = statusMeta[status];
// // // // // //               const col = grouped[status];
// // // // // //               return (
// // // // // //                 <div key={status} style={{ display:"flex", flexDirection:"column" }}>

// // // // // //                   {/* Column header */}
// // // // // //                   <div className="col-hdr">
// // // // // //                     <div style={{
// // // // // //                       width:10, height:10, borderRadius:"50%", background:m.dot,
// // // // // //                       boxShadow:`0 0 0 3px ${m.ring}`, flexShrink:0,
// // // // // //                     }} />
// // // // // //                     <span style={{ fontSize:13.5, fontWeight:600, color:"#111", letterSpacing:"-.01em" }}>
// // // // // //                       {status}
// // // // // //                     </span>
// // // // // //                     <span style={{
// // // // // //                       marginLeft:"auto", fontSize:11.5, fontWeight:700,
// // // // // //                       background:m.pillBg, color:m.pillText,
// // // // // //                       padding:"2px 8px", borderRadius:7,
// // // // // //                       border:`1.5px solid ${m.ring}`,
// // // // // //                     }}>
// // // // // //                       {col.length}
// // // // // //                     </span>
// // // // // //                   </div>

// // // // // //                   {/* Cards */}
// // // // // //                   <div className="cs" style={{ flex:1, maxHeight:"72vh", display:"flex", flexDirection:"column", gap:10, paddingBottom:2 }}>
// // // // // //                     {col.length === 0 ? (
// // // // // //                       <div className="empty">
// // // // // //                         <div style={{ fontSize:20, opacity:.4, marginBottom:6, letterSpacing:4 }}>· · ·</div>
// // // // // //                         No tasks here
// // // // // //                       </div>
// // // // // //                     ) : col.map((t, i) => {
// // // // // //                       const pm   = priorityMeta[t.priority] || priorityMeta.Medium;
// // // // // //                       const user = getUser(t.assigneeId);
// // // // // //                       const proj = getProject(t.projectId);
// // // // // //                       return (
// // // // // //                         <div key={t._id} className="tc" style={{ animationDelay:`${i * 0.04}s` }}>

// // // // // //                           {/* Top priority bar */}
// // // // // //                           <div style={{
// // // // // //                             position:"absolute", top:0, left:0, right:0, height:3,
// // // // // //                             background:`linear-gradient(90deg,${pm.color}55,transparent 70%)`,
// // // // // //                             borderRadius:"14px 14px 0 0",
// // // // // //                           }} />

// // // // // //                           {/* Delete */}
// // // // // //                           <button className="del" onClick={() => deleteTask(t._id)} aria-label="Delete task">
// // // // // //                             <Trash2 size={13} color="#ef4444" />
// // // // // //                           </button>

// // // // // //                           {/* Title */}
// // // // // //                           <p style={{ fontSize:14, fontWeight:500, color:"#0a0a0a", margin:"4px 0 4px", paddingRight:28, lineHeight:1.45, letterSpacing:"-.01em" }}>
// // // // // //                             {t.title}
// // // // // //                           </p>

// // // // // //                           {/* Project + due */}
// // // // // //                           <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
// // // // // //                             {proj && <span style={{ fontSize:12, color:"#9ca3af" }}>{proj}</span>}
// // // // // //                             {t.dueDate && (
// // // // // //                               <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:11.5, color:"#9ca3af" }}>
// // // // // //                                 <Calendar size={10} />
// // // // // //                                 {new Date(t.dueDate).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}
// // // // // //                               </span>
// // // // // //                             )}
// // // // // //                           </div>

// // // // // //                           {/* Priority */}
// // // // // //                           <span style={{
// // // // // //                             display:"inline-flex", alignItems:"center", gap:5,
// // // // // //                             fontSize:11.5, fontWeight:600, color:pm.color,
// // // // // //                             background:pm.bg, border:`1.5px solid ${pm.border}`,
// // // // // //                             padding:"3px 9px", borderRadius:7, letterSpacing:".02em",
// // // // // //                             marginBottom:13,
// // // // // //                           }}>
// // // // // //                             <span style={{ width:5, height:5, borderRadius:"50%", background:pm.color, display:"inline-block" }} />
// // // // // //                             {t.priority}
// // // // // //                           </span>

// // // // // //                           {/* Divider */}
// // // // // //                           <div style={{ height:1, background:"#f3f4f6", marginBottom:11 }} />

// // // // // //                           {/* Footer */}
// // // // // //                           <div style={{ display:"flex", alignItems:"center", gap:8 }}>

// // // // // //                             {/* Assignee */}
// // // // // //                             <div style={{ display:"flex", alignItems:"center", gap:7, flex:1, minWidth:0 }} className="ss">
// // // // // //                               <Avatar name={user?.name} size={24} />
// // // // // //                               <Select value={t.assigneeId || "unassigned"} onValueChange={v => updateTask(t._id,{assigneeId:v})}>
// // // // // //                                 <SelectTrigger style={{ height:28, fontSize:12, border:"none", background:"transparent", padding:0, color:"#6b7280", boxShadow:"none", maxWidth:104 }}>
// // // // // //                                   <SelectValue />
// // // // // //                                 </SelectTrigger>
// // // // // //                                 <SelectContent>
// // // // // //                                   <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // // //                                   {members.map(u => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// // // // // //                                 </SelectContent>
// // // // // //                               </Select>
// // // // // //                             </div>

// // // // // //                             {/* Status */}
// // // // // //                             <div className="ss">
// // // // // //                               <Select value={t.status} onValueChange={v => updateTask(t._id,{status:v})}>
// // // // // //                                 <SelectTrigger style={{
// // // // // //                                   height:28, fontSize:12, fontWeight:500, minWidth:96,
// // // // // //                                   border:`1.5px solid ${m.ring}`,
// // // // // //                                   background:m.pillBg, color:m.pillText,
// // // // // //                                   borderRadius:8, padding:"0 10px",
// // // // // //                                   fontFamily:"'Geist',sans-serif",
// // // // // //                                 }}>
// // // // // //                                   <SelectValue />
// // // // // //                                 </SelectTrigger>
// // // // // //                                 <SelectContent>
// // // // // //                                   {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // // //                                 </SelectContent>
// // // // // //                               </Select>
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       );
// // // // // //                     })}
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </>
// // // // // //   );
// // // // // // }
// // // // // import { useEffect, useMemo, useState, type CSSProperties } from "react";
// // // // // import { Plus, Trash2, Search, Calendar, User, LayoutGrid, List, X, ChevronUp, ChevronDown } from "lucide-react";
// // // // // import {
// // // // //   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// // // // // } from "@/components/ui/select";
// // // // // import {
// // // // //   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
// // // // // } from "@/components/ui/dialog";
// // // // // import { toast } from "sonner";

// // // // // const API      = "http://localhost:5000/api/tasks";
// // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // const STATUSES   = ["Todo", "In Progress", "Done"];
// // // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // // const priorityMeta = {
// // // // //   High:   { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", dot: "#dc2626" },
// // // // //   Medium: { color: "#d97706", bg: "#fffbeb", border: "#fde68a", dot: "#d97706" },
// // // // //   Low:    { color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", dot: "#9ca3af" },
// // // // // };

// // // // // const statusMeta = {
// // // // //   "Todo":        { dot: "#9ca3af", ring: "#e5e7eb", pillBg: "#f3f4f6", pillText: "#374151" },
// // // // //   "In Progress": { dot: "#f59e0b", ring: "#fde68a", pillBg: "#fffbeb", pillText: "#92400e" },
// // // // //   "Done":        { dot: "#10b981", ring: "#a7f3d0", pillBg: "#ecfdf5", pillText: "#065f46" },
// // // // // };

// // // // // const avatarPalette = [
// // // // //   ["#e0e7ff","#4338ca"], ["#fce7f3","#9d174d"], ["#d1fae5","#065f46"],
// // // // //   ["#fee2e2","#991b1b"], ["#ede9fe","#5b21b6"], ["#fef3c7","#92400e"],
// // // // // ];

// // // // // function getAvatarPair(name = "") {
// // // // //   return avatarPalette[(name.charCodeAt(0) || 0) % avatarPalette.length];
// // // // // }

// // // // // function Avatar({ name, size = 26 }) {
// // // // //   if (!name) return (
// // // // //     <div style={{
// // // // //       width: size, height: size, borderRadius: "50%",
// // // // //       border: "1.5px dashed #d1d5db", flexShrink: 0,
// // // // //       display: "flex", alignItems: "center", justifyContent: "center",
// // // // //     }}>
// // // // //       <User size={size * 0.44} color="#d1d5db" />
// // // // //     </div>
// // // // //   );
// // // // //   const [bg, fg] = getAvatarPair(name);
// // // // //   const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
// // // // //   return (
// // // // //     <div style={{
// // // // //       width: size, height: size, borderRadius: "50%",
// // // // //       background: bg, color: fg,
// // // // //       fontSize: size * 0.36, fontWeight: 600,
// // // // //       display: "flex", alignItems: "center", justifyContent: "center",
// // // // //       flexShrink: 0, letterSpacing: "0.02em",
// // // // //     }}>
// // // // //       {initials}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // const fBase: CSSProperties = {
// // // // //   width: "100%",
// // // // //   padding: "9px 13px",
// // // // //   fontSize: 14,
// // // // //   borderRadius: 10,
// // // // //   border: "1.5px solid #e5e7eb",
// // // // //   background: "#fff",
// // // // //   color: "#111",
// // // // //   outline: "none",
// // // // //   transition: "border-color .15s, box-shadow .15s",
// // // // //   boxSizing: "border-box",
// // // // //   fontFamily: "inherit",
// // // // // };

// // // // // const sTrigger = {
// // // // //   height: 40,
// // // // //   width: "100%",
// // // // //   fontSize: 14,
// // // // //   borderRadius: 10,
// // // // //   border: "1.5px solid #e5e7eb",
// // // // //   background: "#fff",
// // // // //   color: "#111",
// // // // //   fontFamily: "inherit",
// // // // // };

// // // // // export default function Tasks() {
// // // // //   const [tasks,    setTasks]    = useState([]);
// // // // //   const [projects, setProjects] = useState([]);
// // // // //   const [users,    setUsers]    = useState([]);
// // // // //   const [search,   setSearch]   = useState("");
// // // // //   const [open,     setOpen]     = useState(false);
// // // // //   const [view,     setView]     = useState<"board" | "table">("board");
// // // // //   const [searchFocused, setSearchFocused] = useState(false);
// // // // //   const [sortCol,  setSortCol]  = useState<string | null>(null);
// // // // //   const [sortDir,  setSortDir]  = useState<"asc" | "desc">("asc");

// // // // //   const token = localStorage.getItem("token");

// // // // //   const [form, setForm] = useState({
// // // // //     title: "", description: "",
// // // // //     projectId: "", assigneeId: "unassigned",
// // // // //     priority: "Medium", dueDate: "",
// // // // //   });

// // // // //   const loadTasks    = async () => {
// // // // //     try { const d = await (await fetch(API)).json(); setTasks(Array.isArray(d) ? d : []); }
// // // // //     catch { toast.error("Failed to load tasks"); }
// // // // //   };
// // // // //   const fetchProjects = async () => {
// // // // //     try { setProjects(await (await fetch(`${BASE_URL}/projects`)).json()); }
// // // // //     catch { toast.error("Failed to load projects"); }
// // // // //   };
// // // // //   const fetchUsers = async () => {
// // // // //     try {
// // // // //       setUsers(await (await fetch(`${BASE_URL}/admin/users`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       })).json());
// // // // //     } catch { toast.error("Failed to load users"); }
// // // // //   };
// // // // //   useEffect(() => { loadTasks(); fetchProjects(); fetchUsers(); }, []);

// // // // //   const filtered = useMemo(() =>
// // // // //     tasks.filter(t => t.title?.toLowerCase().includes(search.toLowerCase())),
// // // // //     [tasks, search]
// // // // //   );

// // // // //   const grouped = useMemo(() => {
// // // // //     const g = { "Todo": [], "In Progress": [], "Done": [] };
// // // // //     filtered.forEach(t => { if (g[t.status]) g[t.status].push(t); });
// // // // //     return g;
// // // // //   }, [filtered]);

// // // // //   const sortedFlat = useMemo(() => {
// // // // //     if (!sortCol) return filtered;
// // // // //     return [...filtered].sort((a, b) => {
// // // // //       let va = a[sortCol] ?? "", vb = b[sortCol] ?? "";
// // // // //       const priOrder = { High: 0, Medium: 1, Low: 2 };
// // // // //       if (sortCol === "priority") { va = priOrder[va] ?? 9; vb = priOrder[vb] ?? 9; }
// // // // //       if (va < vb) return sortDir === "asc" ? -1 : 1;
// // // // //       if (va > vb) return sortDir === "asc" ? 1 : -1;
// // // // //       return 0;
// // // // //     });
// // // // //   }, [filtered, sortCol, sortDir]);

// // // // //   const members = users.filter(u => u.role === "Member");

// // // // //   const createTask = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!form.projectId) return toast.error("Please select a project");
// // // // //     try {
// // // // //       const res = await fetch(API, {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ ...form, status: "Todo" }),
// // // // //       });
// // // // //       if (!res.ok) throw new Error();
// // // // //       const newTask = await res.json();
// // // // //       setTasks(p => [newTask, ...p]);
// // // // //       setForm({ title:"", description:"", projectId:"", assigneeId:"unassigned", priority:"Medium", dueDate:"" });
// // // // //       setOpen(false);
// // // // //       toast.success("Task created");
// // // // //     } catch { toast.error("Create failed"); }
// // // // //   };

// // // // //   const updateTask = async (id, upd) => {
// // // // //     try {
// // // // //       const res = await fetch(`${API}/${id}`, {
// // // // //         method: "PUT", headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify(upd),
// // // // //       });
// // // // //       const updated = await res.json();
// // // // //       setTasks(p => p.map(t => t._id === id ? updated : t));
// // // // //     } catch { toast.error("Update failed"); }
// // // // //   };

// // // // //   const deleteTask = async (id) => {
// // // // //     try {
// // // // //       await fetch(`${API}/${id}`, { method: "DELETE" });
// // // // //       setTasks(p => p.filter(t => t._id !== id));
// // // // //       toast.success("Deleted");
// // // // //     } catch { toast.error("Delete failed"); }
// // // // //   };

// // // // //   const getProject = id => projects.find(p => p._id === id)?.name ?? "";
// // // // //   const getUser    = id => users.find(u => u._id === id);

// // // // //   const handleSort = (col: string) => {
// // // // //     if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
// // // // //     else { setSortCol(col); setSortDir("asc"); }
// // // // //   };

// // // // //   const SortIcon = ({ col }: { col: string }) => {
// // // // //     if (sortCol !== col) return <span style={{ opacity: 0.25, marginLeft: 4 }}><ChevronUp size={11} /></span>;
// // // // //     return sortDir === "asc"
// // // // //       ? <ChevronUp size={11} style={{ marginLeft: 4, color: "#111" }} />
// // // // //       : <ChevronDown size={11} style={{ marginLeft: 4, color: "#111" }} />;
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <style>{`
// // // // //         @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');

// // // // //         .tr { background: #fafaf9; min-height: 100vh; font-family: 'Geist', sans-serif; color: #111; }

// // // // //         /* Focus */
// // // // //         .tr input:focus, .tr textarea:focus,
// // // // //         [data-radix-select-trigger]:focus-visible,
// // // // //         .tr button:focus-visible {
// // // // //           outline: none !important;
// // // // //           border-color: #111 !important;
// // // // //           box-shadow: 0 0 0 3px rgba(17,17,17,.1) !important;
// // // // //         }

// // // // //         /* Primary button */
// // // // //         .btn-p {
// // // // //           display: inline-flex; align-items: center; gap: 7px;
// // // // //           padding: 9px 18px; font-size: 13.5px; font-weight: 500;
// // // // //           background: #0a0a0a; color: #fff; border: none; border-radius: 11px;
// // // // //           cursor: pointer; font-family: 'Geist', sans-serif; letter-spacing: -.01em;
// // // // //           transition: background .15s, box-shadow .18s, transform .1s;
// // // // //         }
// // // // //         .btn-p:hover { background: #1a1a1a; box-shadow: 0 6px 22px rgba(0,0,0,.18); transform: translateY(-1px); }
// // // // //         .btn-p:active { transform: none; }

// // // // //         /* Secondary button */
// // // // //         .btn-s {
// // // // //           padding: 9px 18px; font-size: 13.5px; font-weight: 500;
// // // // //           background: #fff; color: #374151;
// // // // //           border: 1.5px solid #e5e7eb; border-radius: 10px;
// // // // //           cursor: pointer; font-family: 'Geist', sans-serif;
// // // // //           transition: background .12s, border-color .12s;
// // // // //         }
// // // // //         .btn-s:hover { background: #f9fafb; border-color: #d1d5db; }

// // // // //         /* View toggle button */
// // // // //         .view-btn {
// // // // //           display: inline-flex; align-items: center; justify-content: center;
// // // // //           width: 36px; height: 36px; border-radius: 9px;
// // // // //           border: 1.5px solid #e5e7eb; background: #fff;
// // // // //           cursor: pointer; transition: all .15s;
// // // // //           color: #9ca3af;
// // // // //         }
// // // // //         .view-btn:hover { border-color: #d1d5db; color: #374151; background: #f9fafb; }
// // // // //         .view-btn.active { background: #0a0a0a; border-color: #0a0a0a; color: #fff; }

// // // // //         /* ── Animated Search ── */
// // // // //         .search-wrap {
// // // // //           position: relative;
// // // // //           transition: width .3s cubic-bezier(.4,0,.2,1);
// // // // //         }
// // // // //         .search-wrap .search-icon {
// // // // //           position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
// // // // //           pointer-events: none; transition: color .2s;
// // // // //           color: #9ca3af;
// // // // //         }
// // // // //         .search-wrap.focused .search-icon { color: #0a0a0a; }
// // // // //         .search-input {
// // // // //           width: 100%;
// // // // //           padding: 9px 36px 9px 38px !important;
// // // // //           height: 40px;
// // // // //           font-size: 13.5px;
// // // // //           border-radius: 12px;
// // // // //           border: 1.5px solid #e5e7eb;
// // // // //           background: #fff;
// // // // //           color: #111;
// // // // //           outline: none;
// // // // //           transition: border-color .2s, box-shadow .2s, background .2s;
// // // // //           box-sizing: border-box;
// // // // //           font-family: 'Geist', sans-serif;
// // // // //         }
// // // // //         .search-input::placeholder { color: #c4c4c0; }
// // // // //         .search-input:focus {
// // // // //           border-color: #0a0a0a !important;
// // // // //           box-shadow: 0 0 0 3px rgba(10,10,10,.08) !important;
// // // // //           background: #fff !important;
// // // // //         }
// // // // //         .search-clear {
// // // // //           position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
// // // // //           width: 20px; height: 20px; border-radius: 50%;
// // // // //           border: none; background: #e5e7eb; cursor: pointer;
// // // // //           display: flex; align-items: center; justify-content: center;
// // // // //           transition: background .15s, opacity .2s, transform .2s;
// // // // //           opacity: 0; pointer-events: none; transform: translateY(-50%) scale(0.7);
// // // // //         }
// // // // //         .search-clear.visible { opacity: 1; pointer-events: all; transform: translateY(-50%) scale(1); }
// // // // //         .search-clear:hover { background: #d1d5db; }

// // // // //         /* Column header */
// // // // //         .col-hdr {
// // // // //           display: flex; align-items: center; gap: 10px;
// // // // //           padding-bottom: 14px;
// // // // //           border-bottom: 1.5px solid #ededeb;
// // // // //           margin-bottom: 16px;
// // // // //         }

// // // // //         /* Task card */
// // // // //         .tc {
// // // // //           background: #fff;
// // // // //           border: 1.5px solid #ededeb;
// // // // //           border-radius: 16px;
// // // // //           padding: 17px 17px 14px;
// // // // //           position: relative;
// // // // //           transition: border-color .18s, box-shadow .2s, transform .2s;
// // // // //           animation: cIn .24s ease both;
// // // // //         }
// // // // //         .tc:hover { border-color: #e2e2e0; box-shadow: 0 8px 30px rgba(0,0,0,.07); transform: translateY(-2px); }
// // // // //         @keyframes cIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }

// // // // //         /* delete */
// // // // //         .del {
// // // // //           position: absolute; top: 11px; right: 11px;
// // // // //           width: 28px; height: 28px; border-radius: 8px;
// // // // //           border: none; background: transparent; cursor: pointer;
// // // // //           display: flex; align-items: center; justify-content: center;
// // // // //           opacity: 0; transition: opacity .15s, background .12s;
// // // // //         }
// // // // //         .tc:hover .del { opacity: 1; }
// // // // //         .del:hover { background: #fef2f2; }

// // // // //         /* Empty state */
// // // // //         .empty {
// // // // //           border: 1.5px dashed #e5e7eb; border-radius: 14px;
// // // // //           padding: 36px 16px; text-align: center; color: #d1d5db; font-size: 13px;
// // // // //         }

// // // // //         /* Slim selects */
// // // // //         .ss [data-radix-select-trigger] {
// // // // //           height: 28px !important; font-size: 12px !important;
// // // // //           padding: 0 9px !important; border-radius: 8px !important;
// // // // //           border: 1.5px solid transparent !important;
// // // // //           background: transparent !important;
// // // // //           transition: border-color .12s, background .12s !important;
// // // // //         }
// // // // //         .ss [data-radix-select-trigger]:hover { background: #f9fafb !important; border-color: #e5e7eb !important; }

// // // // //         /* Table */
// // // // //         .tasks-table {
// // // // //           width: 100%;
// // // // //           border-collapse: separate;
// // // // //           border-spacing: 0;
// // // // //           animation: cIn .2s ease both;
// // // // //         }
// // // // //         .tasks-table th {
// // // // //           text-align: left;
// // // // //           font-size: 11px; font-weight: 600; letter-spacing: .09em;
// // // // //           text-transform: uppercase; color: #9ca3af;
// // // // //           padding: 11px 16px;
// // // // //           background: #f7f7f6;
// // // // //           border-top: 1.5px solid #ededeb;
// // // // //           border-bottom: 1.5px solid #ededeb;
// // // // //           white-space: nowrap;
// // // // //           cursor: pointer;
// // // // //           user-select: none;
// // // // //           transition: background .12s;
// // // // //         }
// // // // //         .tasks-table th:first-child { border-left: 1.5px solid #ededeb; border-radius: 12px 0 0 0; }
// // // // //         .tasks-table th:last-child  { border-right: 1.5px solid #ededeb; border-radius: 0 12px 0 0; }
// // // // //         .tasks-table th:hover { background: #f0f0ef; color: #374151; }
// // // // //         .tasks-table td {
// // // // //           padding: 13px 16px;
// // // // //           border-bottom: 1px solid #f3f3f2;
// // // // //           font-size: 13.5px; color: #374151;
// // // // //           vertical-align: middle;
// // // // //           background: #fff;
// // // // //           transition: background .12s;
// // // // //         }
// // // // //         .tasks-table tr:last-child td { border-bottom: none; }
// // // // //         .tasks-table tr:last-child td:first-child { border-radius: 0 0 0 12px; }
// // // // //         .tasks-table tr:last-child td:last-child  { border-radius: 0 0 12px 0; }
// // // // //         .tasks-table tbody tr:hover td { background: #fafaf9; }
// // // // //         .tasks-table td:first-child { border-left: 1.5px solid #ededeb; }
// // // // //         .tasks-table td:last-child  { border-right: 1.5px solid #ededeb; }
// // // // //         .tasks-table tbody tr:last-child td:first-child { border-bottom-left-radius: 12px; border-bottom: 1.5px solid #ededeb; }
// // // // //         .tasks-table tbody tr:last-child td:last-child  { border-bottom-right-radius: 12px; border-bottom: 1.5px solid #ededeb; }
// // // // //         .tasks-table tbody tr:last-child td { border-bottom: 1.5px solid #ededeb; }
// // // // //         .table-del {
// // // // //           width: 28px; height: 28px; border-radius: 7px;
// // // // //           border: none; background: transparent; cursor: pointer;
// // // // //           display: flex; align-items: center; justify-content: center;
// // // // //           opacity: 0; transition: opacity .15s, background .12s;
// // // // //         }
// // // // //         .tasks-table tbody tr:hover .table-del { opacity: 1; }
// // // // //         .table-del:hover { background: #fef2f2; }

// // // // //         /* Highlight matched text */
// // // // //         mark { background: #fef9c3; color: #78350f; border-radius: 3px; padding: 0 2px; }

// // // // //         /* scrollbar */
// // // // //         .cs { scrollbar-width: thin; scrollbar-color: #ececec transparent; }
// // // // //         .cs::-webkit-scrollbar { width: 3px; }
// // // // //         .cs::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

// // // // //         /* no-results */
// // // // //         .no-results {
// // // // //           padding: 64px 16px; text-align: center;
// // // // //           animation: cIn .2s ease both;
// // // // //         }
// // // // //       `}</style>

// // // // //       <div className="tr">
// // // // //         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "52px 44px 80px" }}>

// // // // //           {/* ═══ TOP BAR ═══ */}
// // // // //           <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 44 }}>
// // // // //             <div>
// // // // //               <span style={{
// // // // //                 display: "block", fontSize: 10.5, fontWeight: 600,
// // // // //                 letterSpacing: "0.14em", textTransform: "uppercase",
// // // // //                 color: "#9ca3af", marginBottom: 10,
// // // // //               }}>Workspace</span>
// // // // //               <h1 style={{
// // // // //                 fontFamily: "'Instrument Serif', serif",
// // // // //                 fontSize: 48, fontWeight: 400, fontStyle: "italic",
// // // // //                 letterSpacing: "-0.025em", color: "#0a0a0a",
// // // // //                 lineHeight: 1, margin: 0,
// // // // //               }}>Tasks</h1>
// // // // //               <p style={{ fontSize: 13.5, color: "#9ca3af", marginTop: 9, fontWeight: 400 }}>
// // // // //                 Track and manage work across all your projects.
// // // // //               </p>
// // // // //             </div>

// // // // //             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
// // // // //               {/* Status pills */}
// // // // //               <div style={{ display: "flex", gap: 6 }}>
// // // // //                 {STATUSES.map(s => {
// // // // //                   const m = statusMeta[s];
// // // // //                   return (
// // // // //                     <div key={s} style={{
// // // // //                       display: "flex", alignItems: "center", gap: 6,
// // // // //                       padding: "5px 11px", borderRadius: 9,
// // // // //                       background: m.pillBg, border: `1.5px solid ${m.ring}`,
// // // // //                     }}>
// // // // //                       <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot }} />
// // // // //                       <span style={{ fontSize: 12, fontWeight: 500, color: m.pillText }}>{s}</span>
// // // // //                       <span style={{
// // // // //                         fontSize: 11.5, fontWeight: 700, color: m.pillText,
// // // // //                         background: "rgba(0,0,0,.07)", borderRadius: 6, padding: "1px 6px",
// // // // //                       }}>{grouped[s]?.length ?? 0}</span>
// // // // //                     </div>
// // // // //                   );
// // // // //                 })}
// // // // //               </div>

// // // // //               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // // //                 {/* View toggle */}
// // // // //                 <div style={{ display: "flex", gap: 4, padding: "3px", background: "#f3f4f6", borderRadius: 11 }}>
// // // // //                   <button
// // // // //                     className={`view-btn${view === "board" ? " active" : ""}`}
// // // // //                     onClick={() => setView("board")}
// // // // //                     title="Board view"
// // // // //                     style={{ border: "none" }}
// // // // //                   >
// // // // //                     <LayoutGrid size={15} />
// // // // //                   </button>
// // // // //                   <button
// // // // //                     className={`view-btn${view === "table" ? " active" : ""}`}
// // // // //                     onClick={() => setView("table")}
// // // // //                     title="Table view"
// // // // //                     style={{ border: "none" }}
// // // // //                   >
// // // // //                     <List size={15} />
// // // // //                   </button>
// // // // //                 </div>

// // // // //                 {/* New task */}
// // // // //                 <Dialog open={open} onOpenChange={setOpen}>
// // // // //                   <DialogTrigger asChild>
// // // // //                     <button className="btn-p">
// // // // //                       <Plus size={15} strokeWidth={2.5} /> New task
// // // // //                     </button>
// // // // //                   </DialogTrigger>

// // // // //                   <DialogContent style={{
// // // // //                     borderRadius: 20, border: "1.5px solid #f0f0f0",
// // // // //                     boxShadow: "0 32px 80px rgba(0,0,0,.13)",
// // // // //                     padding: "30px 30px 26px", maxWidth: 460,
// // // // //                     background: "#fff", fontFamily: "'Geist',sans-serif",
// // // // //                   }}>
// // // // //                     <DialogHeader style={{ marginBottom: 22 }}>
// // // // //                       <DialogTitle style={{
// // // // //                         fontFamily: "'Instrument Serif',serif",
// // // // //                         fontSize: 26, fontWeight: 400, fontStyle: "italic",
// // // // //                         color: "#0a0a0a", letterSpacing: "-0.02em",
// // // // //                       }}>Create a task</DialogTitle>
// // // // //                     </DialogHeader>

// // // // //                     <form onSubmit={createTask}>
// // // // //                       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// // // // //                         <div>
// // // // //                           <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Title</label>
// // // // //                           <input style={fBase} placeholder="What needs to be done?"
// // // // //                             value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                           <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Description</label>
// // // // //                           <textarea style={{ ...fBase, resize: "none", minHeight: 76, lineHeight: 1.6 }}
// // // // //                             placeholder="Add more context…"
// // // // //                             value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
// // // // //                         </div>
// // // // //                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// // // // //                           <div>
// // // // //                             <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Project</label>
// // // // //                             <Select value={form.projectId} onValueChange={v => setForm({...form, projectId: v})}>
// // // // //                               <SelectTrigger style={sTrigger}><SelectValue placeholder="Select project" /></SelectTrigger>
// // // // //                               <SelectContent>{projects.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}</SelectContent>
// // // // //                             </Select>
// // // // //                           </div>
// // // // //                           <div>
// // // // //                             <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Assignee</label>
// // // // //                             <Select value={form.assigneeId} onValueChange={v => setForm({...form, assigneeId: v})}>
// // // // //                               <SelectTrigger style={sTrigger}><SelectValue placeholder="Assign to" /></SelectTrigger>
// // // // //                               <SelectContent>
// // // // //                                 <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // //                                 {members.map(u => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// // // // //                               </SelectContent>
// // // // //                             </Select>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// // // // //                           <div>
// // // // //                             <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Priority</label>
// // // // //                             <Select value={form.priority} onValueChange={v => setForm({...form, priority: v})}>
// // // // //                               <SelectTrigger style={sTrigger}><SelectValue /></SelectTrigger>
// // // // //                               <SelectContent>{PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
// // // // //                             </Select>
// // // // //                           </div>
// // // // //                           <div>
// // // // //                             <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Due date</label>
// // // // //                             <input type="date" style={{ ...fBase, height: 40 }}
// // // // //                               value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
// // // // //                         <button type="button" className="btn-s" onClick={() => setOpen(false)}>Cancel</button>
// // // // //                         <button type="submit" className="btn-p"><Plus size={14} /> Create task</button>
// // // // //                       </div>
// // // // //                     </form>
// // // // //                   </DialogContent>
// // // // //                 </Dialog>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* ═══ SEARCH ═══ */}
// // // // //           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
// // // // //             <div
// // // // //               className={`search-wrap${searchFocused ? " focused" : ""}`}
// // // // //               style={{ width: searchFocused || search ? 340 : 280 }}
// // // // //             >
// // // // //               <Search size={14} className="search-icon" />
// // // // //               <input
// // // // //                 className="search-input"
// // // // //                 placeholder="Search tasks…"
// // // // //                 value={search}
// // // // //                 onChange={e => setSearch(e.target.value)}
// // // // //                 onFocus={() => setSearchFocused(true)}
// // // // //                 onBlur={() => setSearchFocused(false)}
// // // // //               />
// // // // //               <button
// // // // //                 className={`search-clear${search ? " visible" : ""}`}
// // // // //                 onClick={() => setSearch("")}
// // // // //                 tabIndex={-1}
// // // // //                 type="button"
// // // // //               >
// // // // //                 <X size={11} color="#6b7280" />
// // // // //               </button>
// // // // //             </div>

// // // // //             {search && (
// // // // //               <span style={{
// // // // //                 fontSize: 12.5, color: "#9ca3af",
// // // // //                 animation: "cIn .15s ease both",
// // // // //               }}>
// // // // //                 {filtered.length} result{filtered.length !== 1 ? "s" : ""} for <strong style={{ color: "#374151" }}>"{search}"</strong>
// // // // //               </span>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* ═══ BOARD VIEW ═══ */}
// // // // //           {view === "board" && (
// // // // //             <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
// // // // //               {STATUSES.map(status => {
// // // // //                 const m   = statusMeta[status];
// // // // //                 const col = grouped[status];
// // // // //                 return (
// // // // //                   <div key={status} style={{ display: "flex", flexDirection: "column" }}>
// // // // //                     <div className="col-hdr">
// // // // //                       <div style={{
// // // // //                         width: 10, height: 10, borderRadius: "50%", background: m.dot,
// // // // //                         boxShadow: `0 0 0 3px ${m.ring}`, flexShrink: 0,
// // // // //                       }} />
// // // // //                       <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111", letterSpacing: "-.01em" }}>{status}</span>
// // // // //                       <span style={{
// // // // //                         marginLeft: "auto", fontSize: 11.5, fontWeight: 700,
// // // // //                         background: m.pillBg, color: m.pillText,
// // // // //                         padding: "2px 8px", borderRadius: 7, border: `1.5px solid ${m.ring}`,
// // // // //                       }}>{col.length}</span>
// // // // //                     </div>

// // // // //                     <div className="cs" style={{ flex: 1, maxHeight: "72vh", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 2 }}>
// // // // //                       {col.length === 0 ? (
// // // // //                         <div className="empty">
// // // // //                           <div style={{ fontSize: 20, opacity: .4, marginBottom: 6, letterSpacing: 4 }}>· · ·</div>
// // // // //                           No tasks here
// // // // //                         </div>
// // // // //                       ) : col.map((t, i) => {
// // // // //                         const pm   = priorityMeta[t.priority] || priorityMeta.Medium;
// // // // //                         const user = getUser(t.assigneeId);
// // // // //                         const proj = getProject(t.projectId);
// // // // //                         return (
// // // // //                           <div key={t._id} className="tc" style={{ animationDelay: `${i * 0.04}s` }}>
// // // // //                             <div style={{
// // // // //                               position: "absolute", top: 0, left: 0, right: 0, height: 3,
// // // // //                               background: `linear-gradient(90deg,${pm.color}55,transparent 70%)`,
// // // // //                               borderRadius: "14px 14px 0 0",
// // // // //                             }} />
// // // // //                             <button className="del" onClick={() => deleteTask(t._id)} aria-label="Delete task">
// // // // //                               <Trash2 size={13} color="#ef4444" />
// // // // //                             </button>
// // // // //                             <p style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", margin: "4px 0 4px", paddingRight: 28, lineHeight: 1.45, letterSpacing: "-.01em" }}>
// // // // //                               <HighlightedText text={t.title} query={search} />
// // // // //                             </p>
// // // // //                             <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
// // // // //                               {proj && <span style={{ fontSize: 12, color: "#9ca3af" }}>{proj}</span>}
// // // // //                               {t.dueDate && (
// // // // //                                 <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#9ca3af" }}>
// // // // //                                   <Calendar size={10} />
// // // // //                                   {new Date(t.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
// // // // //                                 </span>
// // // // //                               )}
// // // // //                             </div>
// // // // //                             <span style={{
// // // // //                               display: "inline-flex", alignItems: "center", gap: 5,
// // // // //                               fontSize: 11.5, fontWeight: 600, color: pm.color,
// // // // //                               background: pm.bg, border: `1.5px solid ${pm.border}`,
// // // // //                               padding: "3px 9px", borderRadius: 7, letterSpacing: ".02em",
// // // // //                               marginBottom: 13,
// // // // //                             }}>
// // // // //                               <span style={{ width: 5, height: 5, borderRadius: "50%", background: pm.color, display: "inline-block" }} />
// // // // //                               {t.priority}
// // // // //                             </span>
// // // // //                             <div style={{ height: 1, background: "#f3f3f2", marginBottom: 11 }} />
// // // // //                             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // // //                               <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, minWidth: 0 }} className="ss">
// // // // //                                 <Avatar name={user?.name} size={24} />
// // // // //                                 <Select value={t.assigneeId || "unassigned"} onValueChange={v => updateTask(t._id, { assigneeId: v })}>
// // // // //                                   <SelectTrigger style={{ height: 28, fontSize: 12, border: "none", background: "transparent", padding: 0, color: "#6b7280", boxShadow: "none", maxWidth: 104 }}>
// // // // //                                     <SelectValue />
// // // // //                                   </SelectTrigger>
// // // // //                                   <SelectContent>
// // // // //                                     <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // //                                     {members.map(u => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// // // // //                                   </SelectContent>
// // // // //                                 </Select>
// // // // //                               </div>
// // // // //                               <div className="ss">
// // // // //                                 <Select value={t.status} onValueChange={v => updateTask(t._id, { status: v })}>
// // // // //                                   <SelectTrigger style={{
// // // // //                                     height: 28, fontSize: 12, fontWeight: 500, minWidth: 96,
// // // // //                                     border: `1.5px solid ${m.ring}`,
// // // // //                                     background: m.pillBg, color: m.pillText,
// // // // //                                     borderRadius: 8, padding: "0 10px",
// // // // //                                     fontFamily: "'Geist',sans-serif",
// // // // //                                   }}>
// // // // //                                     <SelectValue />
// // // // //                                   </SelectTrigger>
// // // // //                                   <SelectContent>
// // // // //                                     {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // //                                   </SelectContent>
// // // // //                                 </Select>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         );
// // // // //                       })}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 );
// // // // //               })}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* ═══ TABLE VIEW ═══ */}
// // // // //           {view === "table" && (
// // // // //             <div>
// // // // //               {sortedFlat.length === 0 ? (
// // // // //                 <div className="no-results">
// // // // //                   <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.2 }}>⌕</div>
// // // // //                   <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>
// // // // //                     {search ? `No tasks matching "${search}"` : "No tasks yet"}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <table className="tasks-table">
// // // // //                   <thead>
// // // // //                     <tr>
// // // // //                       {[
// // // // //                         { key: "title",      label: "Task" },
// // // // //                         { key: "status",     label: "Status" },
// // // // //                         { key: "priority",   label: "Priority" },
// // // // //                         { key: "projectId",  label: "Project" },
// // // // //                         { key: "assigneeId", label: "Assignee" },
// // // // //                         { key: "dueDate",    label: "Due" },
// // // // //                       ].map(col => (
// // // // //                         <th key={col.key} onClick={() => handleSort(col.key)}>
// // // // //                           <span style={{ display: "inline-flex", alignItems: "center" }}>
// // // // //                             {col.label}
// // // // //                             <SortIcon col={col.key} />
// // // // //                           </span>
// // // // //                         </th>
// // // // //                       ))}
// // // // //                       <th style={{ width: 44, cursor: "default" }} onClick={undefined}></th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     {sortedFlat.map((t, i) => {
// // // // //                       const pm   = priorityMeta[t.priority] || priorityMeta.Medium;
// // // // //                       const sm   = statusMeta[t.status]     || statusMeta["Todo"];
// // // // //                       const user = getUser(t.assigneeId);
// // // // //                       const proj = getProject(t.projectId);
// // // // //                       return (
// // // // //                         <tr key={t._id} style={{ animationDelay: `${i * 0.02}s` }}>
// // // // //                           {/* Title */}
// // // // //                           <td style={{ fontWeight: 500, color: "#0a0a0a", maxWidth: 280 }}>
// // // // //                             <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
// // // // //                               <div style={{
// // // // //                                 width: 3, height: "100%", minHeight: 18, borderRadius: 4,
// // // // //                                 background: pm.color, flexShrink: 0, marginTop: 3,
// // // // //                               }} />
// // // // //                               <span style={{ lineHeight: 1.4 }}>
// // // // //                                 <HighlightedText text={t.title} query={search} />
// // // // //                               </span>
// // // // //                             </div>
// // // // //                           </td>

// // // // //                           {/* Status */}
// // // // //                           <td>
// // // // //                             <div className="ss">
// // // // //                               <Select value={t.status} onValueChange={v => updateTask(t._id, { status: v })}>
// // // // //                                 <SelectTrigger style={{
// // // // //                                   height: 28, fontSize: 12, fontWeight: 500,
// // // // //                                   width: "auto", minWidth: 100,
// // // // //                                   border: `1.5px solid ${sm.ring}`,
// // // // //                                   background: sm.pillBg, color: sm.pillText,
// // // // //                                   borderRadius: 8, padding: "0 10px",
// // // // //                                   fontFamily: "'Geist',sans-serif",
// // // // //                                 }}>
// // // // //                                   <SelectValue />
// // // // //                                 </SelectTrigger>
// // // // //                                 <SelectContent>
// // // // //                                   {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
// // // // //                                 </SelectContent>
// // // // //                               </Select>
// // // // //                             </div>
// // // // //                           </td>

// // // // //                           {/* Priority */}
// // // // //                           <td>
// // // // //                             <span style={{
// // // // //                               display: "inline-flex", alignItems: "center", gap: 5,
// // // // //                               fontSize: 12, fontWeight: 600, color: pm.color,
// // // // //                               background: pm.bg, border: `1.5px solid ${pm.border}`,
// // // // //                               padding: "3px 9px", borderRadius: 7,
// // // // //                             }}>
// // // // //                               <span style={{ width: 5, height: 5, borderRadius: "50%", background: pm.color, display: "inline-block" }} />
// // // // //                               {t.priority}
// // // // //                             </span>
// // // // //                           </td>

// // // // //                           {/* Project */}
// // // // //                           <td style={{ color: "#6b7280", fontSize: 13 }}>{proj || <span style={{ color: "#d1d5db" }}>—</span>}</td>

// // // // //                           {/* Assignee */}
// // // // //                           <td>
// // // // //                             <div style={{ display: "flex", alignItems: "center", gap: 7 }} className="ss">
// // // // //                               <Avatar name={user?.name} size={24} />
// // // // //                               <Select value={t.assigneeId || "unassigned"} onValueChange={v => updateTask(t._id, { assigneeId: v })}>
// // // // //                                 <SelectTrigger style={{ height: 28, fontSize: 12, border: "none", background: "transparent", padding: 0, color: "#6b7280", boxShadow: "none", maxWidth: 110 }}>
// // // // //                                   <SelectValue />
// // // // //                                 </SelectTrigger>
// // // // //                                 <SelectContent>
// // // // //                                   <SelectItem value="unassigned">Unassigned</SelectItem>
// // // // //                                   {members.map(u => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// // // // //                                 </SelectContent>
// // // // //                               </Select>
// // // // //                             </div>
// // // // //                           </td>

// // // // //                           {/* Due */}
// // // // //                           <td style={{ color: "#9ca3af", fontSize: 13, whiteSpace: "nowrap" }}>
// // // // //                             {t.dueDate ? (
// // // // //                               <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
// // // // //                                 <Calendar size={11} />
// // // // //                                 {new Date(t.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
// // // // //                               </span>
// // // // //                             ) : <span style={{ color: "#d1d5db" }}>—</span>}
// // // // //                           </td>

// // // // //                           {/* Delete */}
// // // // //                           <td style={{ textAlign: "center" }}>
// // // // //                             <button className="table-del" onClick={() => deleteTask(t._id)} aria-label="Delete task">
// // // // //                               <Trash2 size={13} color="#ef4444" />
// // // // //                             </button>
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       );
// // // // //                     })}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               )}
// // // // //             </div>
// // // // //           )}

// // // // //         </div>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }

// // // // // // ── Highlighted text helper ──
// // // // // function HighlightedText({ text = "", query = "" }) {
// // // // //   if (!query.trim()) return <>{text}</>;
// // // // //   const idx = text.toLowerCase().indexOf(query.toLowerCase());
// // // // //   if (idx === -1) return <>{text}</>;
// // // // //   return (
// // // // //     <>
// // // // //       {text.slice(0, idx)}
// // // // //       <mark>{text.slice(idx, idx + query.length)}</mark>
// // // // //       {text.slice(idx + query.length)}
// // // // //     </>
// // // // //   );
// // // // // }
// // // // import { useEffect, useMemo, useState } from "react";
// // // // import { Plus, Trash2, Flag } from "lucide-react";

// // // // import { Card } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Textarea } from "@/components/ui/textarea";

// // // // import {
// // // //   Select,
// // // //   SelectContent,
// // // //   SelectItem,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // // } from "@/components/ui/select";

// // // // import {
// // // //   Dialog,
// // // //   DialogContent,
// // // //   DialogHeader,
// // // //   DialogTitle,
// // // //   DialogTrigger,
// // // //   DialogFooter,
// // // // } from "@/components/ui/dialog";

// // // // import { PageHeader } from "@/components/PageHeader";
// // // // import { cn } from "@/lib/utils";
// // // // import { toast } from "sonner";

// // // // const API = "http://localhost:5000/api/tasks";
// // // // const BASE_URL = "http://localhost:5000/api";

// // // // const STATUSES = ["Todo", "In Progress", "Done"];
// // // // const PRIORITIES = ["High", "Medium", "Low"];

// // // // const priorityStyles = {
// // // //   High: "text-red-500 bg-red-100 border-red-200",
// // // //   Medium: "text-yellow-600 bg-yellow-100 border-yellow-200",
// // // //   Low: "text-gray-500 bg-gray-100 border-gray-200",
// // // // };

// // // // export default function Tasks() {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [projects, setProjects] = useState([]);
// // // //   const [users, setUsers] = useState([]);

// // // //   const [search, setSearch] = useState("");
// // // //   const [open, setOpen] = useState(false);

// // // //   const token = localStorage.getItem("token");

// // // //   const [form, setForm] = useState({
// // // //     title: "",
// // // //     description: "",
// // // //     projectId: "",
// // // //     assigneeId: "unassigned",
// // // //     priority: "Medium",
// // // //     dueDate: "",
// // // //   });

// // // //   // ================= FETCH =================

// // // //   const loadTasks = async () => {
// // // //     try {
// // // //       const res = await fetch(API);
// // // //       const data = await res.json();
// // // //       setTasks(Array.isArray(data) ? data : []);
// // // //     } catch {
// // // //       toast.error("Failed to load tasks");
// // // //     }
// // // //   };

// // // //   const fetchProjects = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/projects`);
// // // //       const data = await res.json();
// // // //       setProjects(data);
// // // //     } catch {
// // // //       toast.error("Failed to load projects");
// // // //     }
// // // //   };

// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });

// // // //       const data = await res.json();
// // // //       setUsers(data);
// // // //     } catch {
// // // //       toast.error("Failed to load users");
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     loadTasks();
// // // //     fetchProjects();
// // // //     fetchUsers();
// // // //   }, []);

// // // //   // ================= FILTER =================

// // // //   const filtered = useMemo(() => {
// // // //     return tasks.filter((t) =>
// // // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // // //     );
// // // //   }, [tasks, search]);

// // // //   const grouped = useMemo(() => {
// // // //     const g = { Todo: [], "In Progress": [], Done: [] };
// // // //     filtered.forEach((t) => {
// // // //       if (g[t.status]) g[t.status].push(t);
// // // //     });
// // // //     return g;
// // // //   }, [filtered]);

// // // //   // 🔥 ONLY MEMBERS
// // // //   const memberUsers = users.filter((u) => u.role === "Member");

// // // //   // ================= CREATE =================

// // // //   const createTask = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!form.projectId) {
// // // //       return toast.error("Please select a project");
// // // //     }

// // // //     try {
// // // //       const res = await fetch(API, {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           ...form,
// // // //           status: "Todo",
// // // //         }),
// // // //       });

// // // //       if (!res.ok) throw new Error();

// // // //       const newTask = await res.json();

// // // //       setTasks((prev) => [newTask, ...prev]);

// // // //       setForm({
// // // //         title: "",
// // // //         description: "",
// // // //         projectId: "",
// // // //         assigneeId: "unassigned",
// // // //         priority: "Medium",
// // // //         dueDate: "",
// // // //       });

// // // //       setOpen(false);
// // // //       toast.success("Task created");
// // // //     } catch {
// // // //       toast.error("Create failed");
// // // //     }
// // // //   };

// // // //   // ================= UPDATE =================

// // // //   const updateTask = async (id, updates) => {
// // // //     try {
// // // //       const res = await fetch(`${API}/${id}`, {
// // // //         method: "PUT",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(updates),
// // // //       });

// // // //       const updated = await res.json();

// // // //       setTasks((prev) =>
// // // //         prev.map((t) => (t._id === id ? updated : t))
// // // //       );
// // // //     } catch {
// // // //       toast.error("Update failed");
// // // //     }
// // // //   };

// // // //   // ================= DELETE =================

// // // //   const deleteTask = async (id) => {
// // // //     try {
// // // //       await fetch(`${API}/${id}`, {
// // // //         method: "DELETE",
// // // //       });

// // // //       setTasks((prev) => prev.filter((t) => t._id !== id));
// // // //       toast.success("Deleted");
// // // //     } catch {
// // // //       toast.error("Delete failed");
// // // //     }
// // // //   };

// // // //   // ================= HELPERS =================

// // // //   const getProject = (id) =>
// // // //     projects.find((p) => p._id === id)?.name || "Project";

// // // //   // ================= UI =================

// // // //   return (
// // // //     <div className="p-8 max-w-7xl mx-auto">
// // // //       <PageHeader
// // // //         title="Tasks"
// // // //         description="Track work across all your projects."
// // // //         action={
// // // //           <Dialog open={open} onOpenChange={setOpen}>
// // // //             <DialogTrigger asChild>
// // // //               <Button>
// // // //                 <Plus className="h-4 w-4 mr-2" /> New task
// // // //               </Button>
// // // //             </DialogTrigger>

// // // //             <DialogContent>
// // // //               <DialogHeader>
// // // //                 <DialogTitle>Create task</DialogTitle>
// // // //               </DialogHeader>

// // // //               <form onSubmit={createTask} className="space-y-4">
// // // //                 <Input
// // // //                   placeholder="Title"
// // // //                   value={form.title}
// // // //                   onChange={(e) =>
// // // //                     setForm({ ...form, title: e.target.value })
// // // //                   }
// // // //                   required
// // // //                 />

// // // //                 <Textarea
// // // //                   placeholder="Description"
// // // //                   value={form.description}
// // // //                   onChange={(e) =>
// // // //                     setForm({ ...form, description: e.target.value })
// // // //                   }
// // // //                 />

// // // //                 <div className="grid grid-cols-2 gap-4">
// // // //                   {/* PROJECT */}
// // // //                   <Select
// // // //                     value={form.projectId}
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, projectId: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select project" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       {projects.map((p) => (
// // // //                         <SelectItem key={p._id} value={p._id}>
// // // //                           {p.name}
// // // //                         </SelectItem>
// // // //                       ))}
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   {/* ASSIGNEE */}
// // // //                   <Select
// // // //                     value={form.assigneeId}
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, assigneeId: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Assign member" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="unassigned">
// // // //                         Unassigned
// // // //                       </SelectItem>

// // // //                       {memberUsers.map((u) => (
// // // //                         <SelectItem key={u._id} value={u._id}>
// // // //                           {u.name}
// // // //                         </SelectItem>
// // // //                       ))}
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>

// // // //                 <div className="grid grid-cols-2 gap-4">
// // // //                   <Select
// // // //                     value={form.priority}
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, priority: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger>
// // // //                       <SelectValue />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       {PRIORITIES.map((p) => (
// // // //                         <SelectItem key={p} value={p}>
// // // //                           {p}
// // // //                         </SelectItem>
// // // //                       ))}
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   <Input
// // // //                     type="date"
// // // //                     value={form.dueDate}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, dueDate: e.target.value })
// // // //                     }
// // // //                   />
// // // //                 </div>

// // // //                 <DialogFooter>
// // // //                   <Button type="submit">Create</Button>
// // // //                 </DialogFooter>
// // // //               </form>
// // // //             </DialogContent>
// // // //           </Dialog>
// // // //         }
// // // //       />

// // // //       {/* SEARCH */}
// // // //       <Input
// // // //         placeholder="Search tasks..."
// // // //         value={search}
// // // //         onChange={(e) => setSearch(e.target.value)}
// // // //         className="mb-6"
// // // //       />

// // // //       {/* BOARD */}
// // // //       <div className="grid md:grid-cols-3 gap-4">
// // // //         {STATUSES.map((status) => (
// // // //           <div key={status}>
// // // //             <p className="mb-2 font-semibold">{status}</p>

// // // //             {grouped[status].map((t) => (
// // // //               <Card key={t._id} className="p-4 mb-3">
// // // //                 <p className="font-medium">{t.title}</p>

// // // //                 <p className="text-sm text-gray-500">
// // // //                   {getProject(t.projectId)}
// // // //                 </p>

// // // //                 <span
// // // //                   className={cn(
// // // //                     "text-xs px-2 py-1 rounded border",
// // // //                     priorityStyles[t.priority]
// // // //                   )}
// // // //                 >
// // // //                   <Flag className="inline w-3 h-3 mr-1" />
// // // //                   {t.priority}
// // // //                 </span>

// // // //                 {/* 🔥 EDITABLE ASSIGNEE */}
// // // //                 <div className="flex justify-between mt-3 items-center gap-2">

// // // //                   {/* ASSIGNEE DROPDOWN */}
// // // //                   <Select
// // // //                     value={t.assigneeId || "unassigned"}
// // // //                     onValueChange={(v) =>
// // // //                       updateTask(t._id, { assigneeId: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger className="h-7 text-xs w-[130px]">
// // // //                       <SelectValue />
// // // //                     </SelectTrigger>

// // // //                     <SelectContent>
// // // //                       <SelectItem value="unassigned">
// // // //                         Unassigned
// // // //                       </SelectItem>

// // // //                       {memberUsers.map((u) => (
// // // //                         <SelectItem key={u._id} value={u._id}>
// // // //                           {u.name}
// // // //                         </SelectItem>
// // // //                       ))}
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   {/* STATUS */}
// // // //                   <Select
// // // //                     value={t.status}
// // // //                     onValueChange={(v) =>
// // // //                       updateTask(t._id, { status: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger className="h-7 text-xs w-[110px]">
// // // //                       <SelectValue />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       {STATUSES.map((s) => (
// // // //                         <SelectItem key={s} value={s}>
// // // //                           {s}
// // // //                         </SelectItem>
// // // //                       ))}
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   {/* DELETE */}
// // // //                   <Button
// // // //                     size="icon"
// // // //                     variant="ghost"
// // // //                     onClick={() => deleteTask(t._id)}
// // // //                   >
// // // //                     <Trash2 className="h-4 w-4" />
// // // //                   </Button>
// // // //                 </div>
// // // //               </Card>
// // // //             ))}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useMemo, useState } from "react";
// // // import {
// // //   Plus,
// // //   Trash2,
// // //   Flag,
// // //   CalendarDays,
// // // } from "lucide-react";

// // // import { Card } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";

// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";

// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // //   DialogFooter,
// // // } from "@/components/ui/dialog";

// // // import { toast } from "sonner";

// // // const API = "http://localhost:5000/api/tasks";
// // // const BASE = "http://localhost:5000/api";

// // // const STATUSES = [
// // //   "Todo",
// // //   "In Progress",
// // //   "Done",
// // //   "Overdue",
// // // ];

// // // const PRIORITIES = ["High", "Medium", "Low"];

// // // const priorityStyles = {
// // //   High: "bg-red-100 text-red-600 border-red-200",
// // //   Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
// // //   Low: "bg-gray-100 text-gray-600 border-gray-200",
// // // };

// // // const statusStyles = {
// // //   Todo: "bg-gray-100 text-gray-700",
// // //   "In Progress": "bg-yellow-100 text-yellow-700",
// // //   Done: "bg-green-100 text-green-700",
// // //   Overdue: "bg-red-100 text-red-700",
// // // };

// // // export default function Tasks() {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [projects, setProjects] = useState([]);
// // //   const [users, setUsers] = useState([]);

// // //   const [search, setSearch] = useState("");
// // //   const [open, setOpen] = useState(false);

// // //   const token = localStorage.getItem("token");

// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     description: "",
// // //     projectId: "",
// // //     assigneeId: "unassigned",
// // //     priority: "Medium",
// // //     dueDate: "",
// // //   });

// // //   // ================= FETCH =================

// // //   const loadTasks = async () => {
// // //     try {
// // //       const res = await fetch(API);
// // //       const data = await res.json();
// // //       setTasks(Array.isArray(data) ? data : []);
// // //     } catch {
// // //       toast.error("Failed to load tasks");
// // //     }
// // //   };

// // //   const loadProjects = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE}/projects`);
// // //       const data = await res.json();
// // //       setProjects(data);
// // //     } catch {
// // //       toast.error("Failed to load projects");
// // //     }
// // //   };

// // //   const loadUsers = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE}/admin/users`, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });

// // //       const data = await res.json();

// // //       // only members
// // //       setUsers(
// // //         data.filter((u) => u.role === "Member")
// // //       );
// // //     } catch {
// // //       toast.error("Failed to load users");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadTasks();
// // //     loadProjects();
// // //     loadUsers();
// // //   }, []);

// // //   // ================= FILTER =================

// // //   const filtered = useMemo(() => {
// // //     return tasks.filter((t) =>
// // //       t.title?.toLowerCase().includes(search.toLowerCase())
// // //     );
// // //   }, [tasks, search]);

// // //   // ================= OVERDUE LOGIC =================

// // //   const grouped = useMemo(() => {
// // //     const g = {
// // //       Todo: [],
// // //       "In Progress": [],
// // //       Done: [],
// // //       Overdue: [],
// // //     };

// // //     filtered.forEach((t) => {
// // //       const overdue =
// // //         t.dueDate &&
// // //         new Date(t.dueDate) < new Date() &&
// // //         t.status !== "Done";

// // //       if (overdue) {
// // //         g["Overdue"].push(t);
// // //       } else if (g[t.status]) {
// // //         g[t.status].push(t);
// // //       }
// // //     });

// // //     return g;
// // //   }, [filtered]);

// // //   // ================= HELPERS =================

// // //   const getProjectName = (id) => {
// // //     return (
// // //       projects.find((p) => p._id === id)?.name ||
// // //       "Project"
// // //     );
// // //   };

// // //   const getUserName = (id) => {
// // //     if (!id || id === "unassigned") {
// // //       return "Unassigned";
// // //     }

// // //     return (
// // //       users.find((u) => u._id === id)?.name ||
// // //       "Unknown"
// // //     );
// // //   };

// // //   // ================= CREATE =================

// // //   const createTask = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const res = await fetch(API, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },

// // //         body: JSON.stringify({
// // //           ...form,
// // //           status: "Todo",
// // //         }),
// // //       });

// // //       if (!res.ok) throw new Error();

// // //       const newTask = await res.json();

// // //       setTasks((prev) => [newTask, ...prev]);

// // //       setForm({
// // //         title: "",
// // //         description: "",
// // //         projectId: "",
// // //         assigneeId: "unassigned",
// // //         priority: "Medium",
// // //         dueDate: "",
// // //       });

// // //       setOpen(false);

// // //       toast.success("Task created");
// // //     } catch {
// // //       toast.error("Create failed");
// // //     }
// // //   };

// // //   // ================= UPDATE =================

// // //   const updateTask = async (id, updates) => {
// // //     try {
// // //       const res = await fetch(`${API}/${id}`, {
// // //         method: "PUT",

// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },

// // //         body: JSON.stringify(updates),
// // //       });

// // //       const updated = await res.json();

// // //       setTasks((prev) =>
// // //         prev.map((t) =>
// // //           t._id === id ? updated : t
// // //         )
// // //       );
// // //     } catch {
// // //       toast.error("Update failed");
// // //     }
// // //   };

// // //   // ================= DELETE =================

// // //   const deleteTask = async (id) => {
// // //     try {
// // //       await fetch(`${API}/${id}`, {
// // //         method: "DELETE",
// // //       });

// // //       setTasks((prev) =>
// // //         prev.filter((t) => t._id !== id)
// // //       );

// // //       toast.success("Deleted");
// // //     } catch {
// // //       toast.error("Delete failed");
// // //     }
// // //   };

// // //   // ================= UI =================

// // //   return (
// // //     <div className="p-8 max-w-7xl mx-auto">

// // //       {/* HEADER */}
// // //       <div className="flex justify-between items-center mb-6">
// // //         <div>
// // //           <h1 className="text-3xl font-bold">
// // //             Tasks
// // //           </h1>

// // //           <p className="text-gray-500 mt-1">
// // //             Track work across all projects.
// // //           </p>
// // //         </div>

// // //         <Dialog open={open} onOpenChange={setOpen}>
// // //           <DialogTrigger asChild>
// // //             <Button>
// // //               <Plus className="h-4 w-4 mr-2" />
// // //               New task
// // //             </Button>
// // //           </DialogTrigger>

// // //           {/* CREATE MODAL */}
// // //           <DialogContent>
// // //             <DialogHeader>
// // //               <DialogTitle>
// // //                 Create task
// // //               </DialogTitle>
// // //             </DialogHeader>

// // //             <form
// // //               onSubmit={createTask}
// // //               className="space-y-4"
// // //             >
// // //               {/* TITLE */}
// // //               <Input
// // //                 placeholder="Task title"
// // //                 value={form.title}
// // //                 onChange={(e) =>
// // //                   setForm({
// // //                     ...form,
// // //                     title: e.target.value,
// // //                   })
// // //                 }
// // //                 required
// // //               />

// // //               {/* DESCRIPTION */}
// // //               <Textarea
// // //                 placeholder="Description"
// // //                 value={form.description}
// // //                 onChange={(e) =>
// // //                   setForm({
// // //                     ...form,
// // //                     description: e.target.value,
// // //                   })
// // //                 }
// // //               />

// // //               {/* PROJECT + MEMBER */}
// // //               <div className="grid grid-cols-2 gap-4">

// // //                 {/* PROJECT */}
// // //                 <Select
// // //                   value={form.projectId}
// // //                   onValueChange={(v) =>
// // //                     setForm({
// // //                       ...form,
// // //                       projectId: v,
// // //                     })
// // //                   }
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select project" />
// // //                   </SelectTrigger>

// // //                   <SelectContent>
// // //                     {projects.map((p) => (
// // //                       <SelectItem
// // //                         key={p._id}
// // //                         value={p._id}
// // //                       >
// // //                         {p.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>

// // //                 {/* ASSIGNEE */}
// // //                 <Select
// // //                   value={form.assigneeId}
// // //                   onValueChange={(v) =>
// // //                     setForm({
// // //                       ...form,
// // //                       assigneeId: v,
// // //                     })
// // //                   }
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Assign member" />
// // //                   </SelectTrigger>

// // //                   <SelectContent>
// // //                     <SelectItem value="unassigned">
// // //                       Unassigned
// // //                     </SelectItem>

// // //                     {users.map((u) => (
// // //                       <SelectItem
// // //                         key={u._id}
// // //                         value={u._id}
// // //                       >
// // //                         {u.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               {/* PRIORITY + DATE */}
// // //               <div className="grid grid-cols-2 gap-4">

// // //                 {/* PRIORITY */}
// // //                 <Select
// // //                   value={form.priority}
// // //                   onValueChange={(v) =>
// // //                     setForm({
// // //                       ...form,
// // //                       priority: v,
// // //                     })
// // //                   }
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue />
// // //                   </SelectTrigger>

// // //                   <SelectContent>
// // //                     {PRIORITIES.map((p) => (
// // //                       <SelectItem
// // //                         key={p}
// // //                         value={p}
// // //                       >
// // //                         {p}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>

// // //                 {/* DATE */}
// // //                 <Input
// // //                   type="date"
// // //                   value={form.dueDate}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       dueDate: e.target.value,
// // //                     })
// // //                   }
// // //                 />
// // //               </div>

// // //               <DialogFooter>
// // //                 <Button type="submit">
// // //                   Create
// // //                 </Button>
// // //               </DialogFooter>
// // //             </form>
// // //           </DialogContent>
// // //         </Dialog>
// // //       </div>

// // //       {/* SEARCH */}
// // //       <Input
// // //         placeholder="Search tasks..."
// // //         value={search}
// // //         onChange={(e) =>
// // //           setSearch(e.target.value)
// // //         }
// // //         className="mb-6"
// // //       />

// // //       {/* BOARD */}
// // //       <div className="grid md:grid-cols-4 gap-4">

// // //         {STATUSES.map((status) => (
// // //           <div key={status}>
// // //             {/* COLUMN HEADER */}
// // //             <div className="flex items-center gap-2 mb-3">
// // //               <span
// // //                 className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}
// // //               >
// // //                 {status}
// // //               </span>

// // //               <span className="text-sm text-gray-500">
// // //                 {grouped[status]?.length || 0}
// // //               </span>
// // //             </div>

// // //             {/* TASKS */}
// // //             <div className="space-y-3">
// // //               {grouped[status]?.map((t) => {

// // //                 const overdue =
// // //                   t.dueDate &&
// // //                   new Date(t.dueDate) < new Date() &&
// // //                   t.status !== "Done";

// // //                 return (
// // //                   <Card
// // //                     key={t._id}
// // //                     className="p-4"
// // //                   >
// // //                     {/* TITLE */}
// // //                     <h3 className="font-semibold text-sm mb-2">
// // //                       {t.title}
// // //                     </h3>

// // //                     {/* PROJECT */}
// // //                     <p className="text-xs text-gray-500 mb-2">
// // //                       {getProjectName(t.projectId)}
// // //                     </p>

// // //                     {/* PRIORITY */}
// // //                     <span
// // //                       className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded border mb-3 ${priorityStyles[t.priority]}`}
// // //                     >
// // //                       <Flag className="h-3 w-3" />
// // //                       {t.priority}
// // //                     </span>

// // //                     {/* DUE DATE */}
// // //                     {t.dueDate && (
// // //                       <div
// // //                         className={`flex items-center gap-1 text-xs mb-3 ${
// // //                           overdue
// // //                             ? "text-red-600"
// // //                             : "text-gray-500"
// // //                         }`}
// // //                       >
// // //                         <CalendarDays className="h-3 w-3" />

// // //                         {new Date(
// // //                           t.dueDate
// // //                         ).toLocaleDateString()}
// // //                       </div>
// // //                     )}

// // //                     {/* FOOTER */}
// // //                     <div className="flex justify-between items-center gap-2">

// // //                       {/* ASSIGNEE */}
// // //                       <Select
// // //                         value={
// // //                           t.assigneeId ||
// // //                           "unassigned"
// // //                         }
// // //                         onValueChange={(v) =>
// // //                           updateTask(t._id, {
// // //                             assigneeId: v,
// // //                           })
// // //                         }
// // //                       >
// // //                         <SelectTrigger className="h-7 text-xs w-[130px]">
// // //                           <SelectValue>
// // //                             {getUserName(
// // //                               t.assigneeId
// // //                             )}
// // //                           </SelectValue>
// // //                         </SelectTrigger>

// // //                         <SelectContent>
// // //                           <SelectItem value="unassigned">
// // //                             Unassigned
// // //                           </SelectItem>

// // //                           {users.map((u) => (
// // //                             <SelectItem
// // //                               key={u._id}
// // //                               value={u._id}
// // //                             >
// // //                               {u.name}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>

// // //                       {/* STATUS */}
// // //                       <Select
// // //                         value={t.status}
// // //                         onValueChange={(v) =>
// // //                           updateTask(t._id, {
// // //                             status: v,
// // //                           })
// // //                         }
// // //                       >
// // //                         <SelectTrigger className="h-7 text-xs w-[120px]">
// // //                           <SelectValue />
// // //                         </SelectTrigger>

// // //                         <SelectContent>
// // //                           <SelectItem value="Todo">
// // //                             Todo
// // //                           </SelectItem>

// // //                           <SelectItem value="In Progress">
// // //                             In Progress
// // //                           </SelectItem>

// // //                           <SelectItem value="Done">
// // //                             Done
// // //                           </SelectItem>
// // //                         </SelectContent>
// // //                       </Select>

// // //                       {/* DELETE */}
// // //                       <Button
// // //                         size="icon"
// // //                         variant="ghost"
// // //                         onClick={() =>
// // //                           deleteTask(t._id)
// // //                         }
// // //                       >
// // //                         <Trash2 className="h-4 w-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </Card>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // import { useEffect, useMemo, useState } from "react";
// // // import {
// // //   Plus,
// // //   Trash2,
// // //   Flag,
// // //   CalendarDays,
// // // } from "lucide-react";

// // // import { Card } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";

// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";

// // // import {
// // //   Dialog,
// // //   DialogContent,
// // //   DialogHeader,
// // //   DialogTitle,
// // //   DialogTrigger,
// // //   DialogFooter,
// // // } from "@/components/ui/dialog";

// // // import { toast } from "sonner";

// // // const API = "http://localhost:5000/api/tasks";
// // // const BASE = "http://localhost:5000/api";

// // // const STATUSES = [
// // //   "Todo",
// // //   "In Progress",
// // //   "Done",
// // //   "Overdue",
// // // ];

// // // const PRIORITIES = ["High", "Medium", "Low"];

// // // const priorityStyles = {
// // //   High: "bg-red-100 text-red-600 border-red-200",
// // //   Medium:
// // //     "bg-yellow-100 text-yellow-700 border-yellow-200",
// // //   Low: "bg-gray-100 text-gray-600 border-gray-200",
// // // };

// // // const statusStyles = {
// // //   Todo: "bg-gray-100 text-gray-700",
// // //   "In Progress":
// // //     "bg-yellow-100 text-yellow-700",
// // //   Done: "bg-green-100 text-green-700",
// // //   Overdue: "bg-red-100 text-red-700",
// // // };

// // // export default function Tasks() {
// // //   const [tasks, setTasks] = useState([]);
// // //   const [projects, setProjects] = useState([]);
// // //   const [users, setUsers] = useState([]);

// // //   const [search, setSearch] = useState("");
// // //   const [open, setOpen] = useState(false);

// // //   const token = localStorage.getItem("token");

// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     description: "",
// // //     projectId: "",
// // //     assigneeId: "unassigned",
// // //     priority: "Medium",
// // //     dueDate: "",
// // //   });

// // //   // ================= FETCH =================

// // //   const loadTasks = async () => {
// // //     try {
// // //       const res = await fetch(API);
// // //       const data = await res.json();

// // //       setTasks(Array.isArray(data) ? data : []);
// // //     } catch {
// // //       toast.error("Failed to load tasks");
// // //     }
// // //   };

// // //   const loadProjects = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE}/projects`);
// // //       const data = await res.json();

// // //       setProjects(data);
// // //     } catch {
// // //       toast.error("Failed to load projects");
// // //     }
// // //   };

// // //   const loadUsers = async () => {
// // //     try {
// // //       const res = await fetch(
// // //         `${BASE}/admin/users`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       const data = await res.json();

// // //       // only members
// // //       setUsers(
// // //         data.filter((u) => u.role === "Member")
// // //       );
// // //     } catch {
// // //       toast.error("Failed to load users");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadTasks();
// // //     loadProjects();
// // //     loadUsers();
// // //   }, []);

// // //   // ================= FILTER =================

// // //   const filtered = useMemo(() => {
// // //     return tasks.filter((t) =>
// // //       t.title
// // //         ?.toLowerCase()
// // //         .includes(search.toLowerCase())
// // //     );
// // //   }, [tasks, search]);

// // //   // ================= OVERDUE =================

// // //   const grouped = useMemo(() => {
// // //     const g = {
// // //       Todo: [],
// // //       "In Progress": [],
// // //       Done: [],
// // //       Overdue: [],
// // //     };

// // //     filtered.forEach((t) => {
// // //       const overdue =
// // //         t.dueDate &&
// // //         new Date(t.dueDate).getTime() <
// // //           new Date().getTime() &&
// // //         t.status !== "Done";

// // //       if (overdue) {
// // //         g["Overdue"].push(t);
// // //       } else {
// // //         g[t.status]?.push(t);
// // //       }
// // //     });

// // //     return g;
// // //   }, [filtered]);

// // //   // ================= HELPERS =================

// // //   const getProjectName = (id) => {
// // //     return (
// // //       projects.find((p) => p._id === id)
// // //         ?.name || "Project"
// // //     );
// // //   };

// // //   const getUserName = (id) => {
// // //     if (!id || id === "unassigned") {
// // //       return "Unassigned";
// // //     }

// // //     return (
// // //       users.find((u) => u._id === id)
// // //         ?.name || "Unknown"
// // //     );
// // //   };

// // //   // ================= CREATE =================

// // //   const createTask = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const res = await fetch(API, {
// // //         method: "POST",

// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },

// // //         body: JSON.stringify({
// // //           ...form,
// // //           status: "Todo",
// // //         }),
// // //       });

// // //       if (!res.ok) throw new Error();

// // //       const newTask = await res.json();

// // //       setTasks((prev) => [newTask, ...prev]);

// // //       setForm({
// // //         title: "",
// // //         description: "",
// // //         projectId: "",
// // //         assigneeId: "unassigned",
// // //         priority: "Medium",
// // //         dueDate: "",
// // //       });

// // //       setOpen(false);

// // //       toast.success("Task created");
// // //     } catch {
// // //       toast.error("Create failed");
// // //     }
// // //   };

// // //   // ================= UPDATE =================

// // //   const updateTask = async (
// // //     id,
// // //     updates
// // //   ) => {
// // //     try {
// // //       const res = await fetch(
// // //         `${API}/${id}`,
// // //         {
// // //           method: "PUT",

// // //           headers: {
// // //             "Content-Type":
// // //               "application/json",
// // //           },

// // //           body: JSON.stringify(updates),
// // //         }
// // //       );

// // //       const updated = await res.json();

// // //       setTasks((prev) =>
// // //         prev.map((t) =>
// // //           t._id === id ? updated : t
// // //         )
// // //       );
// // //     } catch {
// // //       toast.error("Update failed");
// // //     }
// // //   };

// // //   // ================= DELETE =================

// // //   const deleteTask = async (id) => {
// // //     try {
// // //       await fetch(`${API}/${id}`, {
// // //         method: "DELETE",
// // //       });

// // //       setTasks((prev) =>
// // //         prev.filter((t) => t._id !== id)
// // //       );

// // //       toast.success("Deleted");
// // //     } catch {
// // //       toast.error("Delete failed");
// // //     }
// // //   };

// // //   // ================= UI =================

// // //   return (
// // //     <div className="p-8 max-w-7xl mx-auto">

// // //       {/* HEADER */}
// // //       <div className="flex justify-between items-center mb-6">
// // //         <div>
// // //           <h1 className="text-3xl font-bold">
// // //             Tasks
// // //           </h1>

// // //           <p className="text-gray-500 mt-1">
// // //             Track work across all projects.
// // //           </p>
// // //         </div>

// // //         {/* CREATE TASK */}
// // //         <Dialog
// // //           open={open}
// // //           onOpenChange={setOpen}
// // //         >
// // //           <DialogTrigger asChild>
// // //             <Button>
// // //               <Plus className="h-4 w-4 mr-2" />
// // //               New task
// // //             </Button>
// // //           </DialogTrigger>

// // //           <DialogContent>
// // //             <DialogHeader>
// // //               <DialogTitle>
// // //                 Create task
// // //               </DialogTitle>
// // //             </DialogHeader>

// // //             <form
// // //               onSubmit={createTask}
// // //               className="space-y-4"
// // //             >

// // //               {/* TITLE */}
// // //               <Input
// // //                 placeholder="Task title"
// // //                 value={form.title}
// // //                 onChange={(e) =>
// // //                   setForm({
// // //                     ...form,
// // //                     title: e.target.value,
// // //                   })
// // //                 }
// // //                 required
// // //               />

// // //               {/* DESCRIPTION */}
// // //               <Textarea
// // //                 placeholder="Description"
// // //                 value={form.description}
// // //                 onChange={(e) =>
// // //                   setForm({
// // //                     ...form,
// // //                     description:
// // //                       e.target.value,
// // //                   })
// // //                 }
// // //               />

// // //               {/* PROJECT + ASSIGNEE */}
// // //               <div className="grid grid-cols-2 gap-4">

// // //                 {/* PROJECT */}
// // //                 <Select
// // //                   value={form.projectId}
// // //                   onValueChange={(v) =>
// // //                     setForm({
// // //                       ...form,
// // //                       projectId: v,
// // //                     })
// // //                   }
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Select project" />
// // //                   </SelectTrigger>

// // //                   <SelectContent>
// // //                     {projects.map((p) => (
// // //                       <SelectItem
// // //                         key={p._id}
// // //                         value={p._id}
// // //                       >
// // //                         {p.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>

// // //                 {/* ASSIGNEE */}
// // //                 <Select
// // //                   value={form.assigneeId}
// // //                   onValueChange={(v) =>
// // //                     setForm({
// // //                       ...form,
// // //                       assigneeId: v,
// // //                     })
// // //                   }
// // //                 >
// // //                   <SelectTrigger>
// // //                     <SelectValue placeholder="Assign member" />
// // //                   </SelectTrigger>

// // //                   <SelectContent>
// // //                     <SelectItem value="unassigned">
// // //                       Unassigned
// // //                     </SelectItem>

// // //                     {users.map((u) => (
// // //                       <SelectItem
// // //                         key={u._id}
// // //                         value={u._id}
// // //                       >
// // //                         {u.name}
// // //                       </SelectItem>
// // //                     ))}
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>

// // //               {/* PRIORITY */}
// // //               <Select
// // //                 value={form.priority}
// // //                 onValueChange={(v) =>
// // //                   setForm({
// // //                     ...form,
// // //                     priority: v,
// // //                   })
// // //                 }
// // //               >
// // //                 <SelectTrigger>
// // //                   <SelectValue />
// // //                 </SelectTrigger>

// // //                 <SelectContent>
// // //                   {PRIORITIES.map((p) => (
// // //                     <SelectItem
// // //                       key={p}
// // //                       value={p}
// // //                     >
// // //                       {p}
// // //                     </SelectItem>
// // //                   ))}
// // //                 </SelectContent>
// // //               </Select>

// // //               {/* DUE DATE + TIME */}
// // //               <div>
// // //                 <p className="text-sm font-medium mb-1">
// // //                   Due Date & Time
// // //                 </p>

// // //                 <Input
// // //                   type="datetime-local"
// // //                   value={form.dueDate}
// // //                   onChange={(e) =>
// // //                     setForm({
// // //                       ...form,
// // //                       dueDate:
// // //                         e.target.value,
// // //                     })
// // //                   }
// // //                 />
// // //               </div>

// // //               <DialogFooter>
// // //                 <Button type="submit">
// // //                   Create
// // //                 </Button>
// // //               </DialogFooter>
// // //             </form>
// // //           </DialogContent>
// // //         </Dialog>
// // //       </div>

// // //       {/* SEARCH */}
// // //       <Input
// // //         placeholder="Search tasks..."
// // //         value={search}
// // //         onChange={(e) =>
// // //           setSearch(e.target.value)
// // //         }
// // //         className="mb-6"
// // //       />

// // //       {/* BOARD */}
// // //       <div className="grid md:grid-cols-4 gap-4">

// // //         {STATUSES.map((status) => (
// // //           <div key={status}>

// // //             {/* COLUMN HEADER */}
// // //             <div className="flex items-center gap-2 mb-3">
// // //               <span
// // //                 className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}
// // //               >
// // //                 {status}
// // //               </span>

// // //               <span className="text-sm text-gray-500">
// // //                 {grouped[status]?.length ||
// // //                   0}
// // //               </span>
// // //             </div>

// // //             {/* TASKS */}
// // //             <div className="space-y-3">
// // //               {grouped[status]?.map((t) => {

// // //                 const overdue =
// // //                   t.dueDate &&
// // //                   new Date(
// // //                     t.dueDate
// // //                   ).getTime() <
// // //                     new Date().getTime() &&
// // //                   t.status !== "Done";

// // //                 return (
// // //                   <Card
// // //                     key={t._id}
// // //                     className={`p-4 ${
// // //                       overdue
// // //                         ? "border-red-300"
// // //                         : ""
// // //                     }`}
// // //                   >

// // //                     {/* TITLE */}
// // //                     <h3 className="font-semibold text-sm mb-2">
// // //                       {t.title}
// // //                     </h3>

// // //                     {/* PROJECT */}
// // //                     <p className="text-xs text-gray-500 mb-2">
// // //                       {getProjectName(
// // //                         t.projectId
// // //                       )}
// // //                     </p>

// // //                     {/* PRIORITY */}
// // //                     <span
// // //                       className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded border mb-3 ${priorityStyles[t.priority]}`}
// // //                     >
// // //                       <Flag className="h-3 w-3" />
// // //                       {t.priority}
// // //                     </span>

// // //                     {/* DUE DATE */}
// // //                     {t.dueDate && (
// // //                       <div
// // //                         className={`flex items-center gap-1 text-xs mb-3 ${
// // //                           overdue
// // //                             ? "text-red-600"
// // //                             : "text-gray-500"
// // //                         }`}
// // //                       >
// // //                         <CalendarDays className="h-3 w-3" />

// // //                         {new Date(
// // //                           t.dueDate
// // //                         ).toLocaleString()}
// // //                       </div>
// // //                     )}

// // //                     {/* FOOTER */}
// // //                     <div className="flex justify-between items-center gap-2">

// // //                       {/* ASSIGNEE */}
// // //                       <Select
// // //                         value={
// // //                           t.assigneeId ||
// // //                           "unassigned"
// // //                         }
// // //                         onValueChange={(v) =>
// // //                           updateTask(
// // //                             t._id,
// // //                             {
// // //                               assigneeId:
// // //                                 v,
// // //                             }
// // //                           )
// // //                         }
// // //                       >
// // //                         <SelectTrigger className="h-7 text-xs w-[130px]">
// // //                           <SelectValue>
// // //                             {getUserName(
// // //                               t.assigneeId
// // //                             )}
// // //                           </SelectValue>
// // //                         </SelectTrigger>

// // //                         <SelectContent>
// // //                           <SelectItem value="unassigned">
// // //                             Unassigned
// // //                           </SelectItem>

// // //                           {users.map(
// // //                             (u) => (
// // //                               <SelectItem
// // //                                 key={
// // //                                   u._id
// // //                                 }
// // //                                 value={
// // //                                   u._id
// // //                                 }
// // //                               >
// // //                                 {u.name}
// // //                               </SelectItem>
// // //                             )
// // //                           )}
// // //                         </SelectContent>
// // //                       </Select>

// // //                       {/* STATUS */}
// // //                       <Select
// // //                         value={t.status}
// // //                         onValueChange={(v) =>
// // //                           updateTask(
// // //                             t._id,
// // //                             {
// // //                               status:
// // //                                 v,
// // //                             }
// // //                           )
// // //                         }
// // //                       >
// // //                         <SelectTrigger className="h-7 text-xs w-[120px]">
// // //                           <SelectValue />
// // //                         </SelectTrigger>

// // //                         <SelectContent>
// // //                           <SelectItem value="Todo">
// // //                             Todo
// // //                           </SelectItem>

// // //                           <SelectItem value="In Progress">
// // //                             In Progress
// // //                           </SelectItem>

// // //                           <SelectItem value="Done">
// // //                             Done
// // //                           </SelectItem>
// // //                         </SelectContent>
// // //                       </Select>

// // //                       {/* DELETE */}
// // //                       <Button
// // //                         size="icon"
// // //                         variant="ghost"
// // //                         onClick={() =>
// // //                           deleteTask(
// // //                             t._id
// // //                           )
// // //                         }
// // //                       >
// // //                         <Trash2 className="h-4 w-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </Card>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useMemo, useState } from "react";
// // import { Plus, Trash2, Flag, CalendarDays, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown } from "lucide-react";
// // import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { toast } from "sonner";

// // const API  = "http://localhost:5000/api/tasks";
// // const BASE = "http://localhost:5000/api";

// // const STATUSES   = ["Todo", "In Progress", "Done", "Overdue"];
// // const PRIORITIES = ["High", "Medium", "Low"];

// // const statusMeta = {
// //   "Todo":        { bg: "#f3f4f6", color: "#374151",  dot: "#9ca3af"  },
// //   "In Progress": { bg: "#fef9c3", color: "#854d0e",  dot: "#eab308"  },
// //   "Done":        { bg: "#dcfce7", color: "#166534",  dot: "#22c55e"  },
// //   "Overdue":     { bg: "#fee2e2", color: "#991b1b",  dot: "#ef4444"  },
// // };

// // const priorityMeta = {
// //   High:   { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" },
// //   Medium: { bg: "#fef9c3", color: "#ca8a04", border: "#fde68a" },
// //   Low:    { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" },
// // };

// // // ─── Shared input style ───────────────────────────────────────────────────────
// // const inp = {
// //   width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
// //   padding: "9px 12px", fontSize: 14, color: "#111827",
// //   background: "#f9fafb", outline: "none", fontFamily: "inherit",
// //   transition: "border-color .15s, box-shadow .15s",
// // };

// // // ─── Card View ────────────────────────────────────────────────────────────────
// // function CardView({ grouped, getProjectName, getUserName, users, updateTask, deleteTask }) {
// //   return (
// //     <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
// //       {STATUSES.map((status) => {
// //         const meta  = statusMeta[status];
// //         const tasks = grouped[status] || [];
// //         return (
// //           <div key={status}>
// //             {/* Column header */}
// //             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
// //               <span style={{
// //                 display: "inline-flex", alignItems: "center", gap: 6,
// //                 background: meta.bg, color: meta.color,
// //                 fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
// //               }}>
// //                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: meta.dot, flexShrink: 0 }} />
// //                 {status}
// //               </span>
// //               <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{tasks.length}</span>
// //             </div>

// //             {/* Task cards */}
// //             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //               {tasks.length === 0 && (
// //                 <div style={{ border: "1px dashed #e5e7eb", borderRadius: 10, padding: "24px 16px", textAlign: "center", color: "#d1d5db", fontSize: 12 }}>
// //                   No tasks
// //                 </div>
// //               )}
// //               {tasks.map((t) => {
// //                 const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
// //                 const pm = priorityMeta[t.priority] || priorityMeta.Medium;
// //                 return (
// //                   <div key={t._id} className="task-card" style={{
// //                     background: "#fff", borderRadius: 10,
// //                     border: `1px solid ${overdue ? "#fecaca" : "#e5e7eb"}`,
// //                     padding: "14px 16px",
// //                     transition: "box-shadow .15s, border-color .15s",
// //                   }}>
// //                     <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{t.title}</div>
// //                     <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{getProjectName(t.projectId)}</div>

// //                     <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
// //                       <span style={{
// //                         display: "inline-flex", alignItems: "center", gap: 4,
// //                         fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
// //                         background: pm.bg, color: pm.color, border: `1px solid ${pm.border}`,
// //                       }}>
// //                         <Flag size={10} />{t.priority}
// //                       </span>
// //                     </div>

// //                     {t.dueDate && (
// //                       <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: overdue ? "#dc2626" : "#6b7280", marginBottom: 12 }}>
// //                         <CalendarDays size={11} />
// //                         {new Date(t.dueDate).toLocaleString()}
// //                       </div>
// //                     )}

// //                     {/* Footer */}
// //                     <div style={{ display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid #f3f4f6", paddingTop: 10, flexWrap: "wrap" }}>
// //                       <Select value={t.assigneeId || "unassigned"} onValueChange={(v) => updateTask(t._id, { assigneeId: v })}>
// //                         <SelectTrigger style={{ height: 28, fontSize: 11, flex: 1, minWidth: 90 }}>
// //                           <SelectValue>{getUserName(t.assigneeId)}</SelectValue>
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="unassigned">Unassigned</SelectItem>
// //                           {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// //                         </SelectContent>
// //                       </Select>

// //                       <Select value={t.status} onValueChange={(v) => updateTask(t._id, { status: v })}>
// //                         <SelectTrigger style={{ height: 28, fontSize: 11, flex: 1, minWidth: 90 }}>
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="Todo">Todo</SelectItem>
// //                           <SelectItem value="In Progress">In Progress</SelectItem>
// //                           <SelectItem value="Done">Done</SelectItem>
// //                         </SelectContent>
// //                       </Select>

// //                       <button className="icon-btn danger" onClick={() => deleteTask(t._id)} title="Delete" style={{
// //                         width: 28, height: 28, border: "1px solid #e5e7eb", background: "#fff",
// //                         borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center",
// //                         justifyContent: "center", color: "#9ca3af", transition: "all .15s", flexShrink: 0,
// //                       }}>
// //                         <Trash2 size={13} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // // ─── Table View ───────────────────────────────────────────────────────────────
// // function TableView({ grouped, getProjectName, getUserName, users, updateTask, deleteTask }) {
// //   const [sortKey, setSortKey] = useState("title");
// //   const [sortDir, setSortDir] = useState("asc");

// //   const allTasks = STATUSES.flatMap((s) => grouped[s] || []);

// //   const sorted = [...allTasks].sort((a, b) => {
// //     let av = a[sortKey] || "", bv = b[sortKey] || "";
// //     if (typeof av === "string") av = av.toLowerCase();
// //     if (typeof bv === "string") bv = bv.toLowerCase();
// //     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
// //   });

// //   function toggleSort(key) {
// //     if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
// //     else { setSortKey(key); setSortDir("asc"); }
// //   }

// //   function SortIcon({ col }) {
// //     if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />;
// //     return sortDir === "asc" ? <ChevronUp size={11} style={{ color: "#7c3aed" }} /> : <ChevronDown size={11} style={{ color: "#7c3aed" }} />;
// //   }

// //   const thStyle = {
// //     padding: "10px 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
// //     textTransform: "uppercase", color: "#9ca3af", background: "#f9fafb",
// //     borderBottom: "1px solid #e5e7eb", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
// //   };
// //   const tdStyle = { padding: "12px 16px", fontSize: 13, color: "#111827", borderBottom: "1px solid #f3f4f6", verticalAlign: "middle" };

// //   if (!allTasks.length) return (
// //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// //       <p style={{ fontSize: 14 }}>No tasks yet.</p>
// //     </div>
// //   );

// //   return (
// //     <div style={{ overflowX: "auto" }}>
// //       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
// //         <thead>
// //           <tr>
// //             {[
// //               { key: "title",     label: "Task"     },
// //               { key: "projectId", label: "Project"  },
// //               { key: "priority",  label: "Priority" },
// //               { key: "status",    label: "Status"   },
// //               { key: "dueDate",   label: "Due Date" },
// //               { key: null,        label: "Assignee" },
// //               { key: null,        label: ""         },
// //             ].map(({ key, label }) => (
// //               <th key={label} style={{ ...thStyle, cursor: key ? "pointer" : "default" }} onClick={() => key && toggleSort(key)}>
// //                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
// //                   {label}{key && <SortIcon col={key} />}
// //                 </span>
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sorted.map((t) => {
// //             const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
// //             const pm   = priorityMeta[t.priority] || priorityMeta.Medium;
// //             const smeta = statusMeta[overdue ? "Overdue" : t.status] || statusMeta["Todo"];
// //             return (
// //               <tr key={t._id} className="table-row" style={{ transition: "background .1s" }}>
// //                 <td style={tdStyle}>
// //                   <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
// //                   {t.description && <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{t.description.slice(0, 60)}{t.description.length > 60 ? "…" : ""}</div>}
// //                 </td>
// //                 <td style={{ ...tdStyle, color: "#6b7280" }}>{getProjectName(t.projectId)}</td>
// //                 <td style={tdStyle}>
// //                   <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: pm.bg, color: pm.color, border: `1px solid ${pm.border}` }}>
// //                     <Flag size={10} />{t.priority}
// //                   </span>
// //                 </td>
// //                 <td style={tdStyle}>
// //                   <Select value={t.status} onValueChange={(v) => updateTask(t._id, { status: v })}>
// //                     <SelectTrigger style={{ height: 28, fontSize: 11, width: 120 }}>
// //                       <SelectValue>
// //                         <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: smeta.color }}>
// //                           <span style={{ width: 6, height: 6, borderRadius: "50%", background: smeta.dot, flexShrink: 0 }} />
// //                           {overdue ? "Overdue" : t.status}
// //                         </span>
// //                       </SelectValue>
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="Todo">Todo</SelectItem>
// //                       <SelectItem value="In Progress">In Progress</SelectItem>
// //                       <SelectItem value="Done">Done</SelectItem>
// //                     </SelectContent>
// //                   </Select>
// //                 </td>
// //                 <td style={{ ...tdStyle, fontSize: 12, color: overdue ? "#dc2626" : "#6b7280", whiteSpace: "nowrap" }}>
// //                   {t.dueDate ? (
// //                     <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
// //                       <CalendarDays size={12} />{new Date(t.dueDate).toLocaleDateString()}
// //                     </span>
// //                   ) : "—"}
// //                 </td>
// //                 <td style={tdStyle}>
// //                   <Select value={t.assigneeId || "unassigned"} onValueChange={(v) => updateTask(t._id, { assigneeId: v })}>
// //                     <SelectTrigger style={{ height: 28, fontSize: 11, width: 120 }}>
// //                       <SelectValue>{getUserName(t.assigneeId)}</SelectValue>
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       <SelectItem value="unassigned">Unassigned</SelectItem>
// //                       {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// //                     </SelectContent>
// //                   </Select>
// //                 </td>
// //                 <td style={{ ...tdStyle, width: 48 }}>
// //                   <button onClick={() => deleteTask(t._id)} style={{
// //                     width: 28, height: 28, border: "1px solid #e5e7eb", background: "#fff",
// //                     borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center",
// //                     justifyContent: "center", color: "#9ca3af", transition: "all .15s",
// //                   }}
// //                     onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
// //                     onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "#fff"; }}
// //                   >
// //                     <Trash2 size={13} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // // ─── Main ─────────────────────────────────────────────────────────────────────
// // export default function Tasks() {
// //   const [tasks,    setTasks]    = useState([]);
// //   const [projects, setProjects] = useState([]);
// //   const [users,    setUsers]    = useState([]);
// //   const [search,   setSearch]   = useState("");
// //   const [view,     setView]     = useState("card");
// //   const [open,     setOpen]     = useState(false);
// //   const [loading,  setLoading]  = useState(true);

// //   const token = localStorage.getItem("token");

// //   const [form, setForm] = useState({
// //     title: "", description: "", projectId: "",
// //     assigneeId: "unassigned", priority: "Medium", dueDate: "",
// //   });

// //   // Load
// //   useEffect(() => {
// //     const loadAll = async () => {
// //       try {
// //         const [tRes, pRes, uRes] = await Promise.all([
// //           fetch(API),
// //           fetch(`${BASE}/projects`),
// //           fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
// //         ]);
// //         const [tData, pData, uData] = await Promise.all([tRes.json(), pRes.json(), uRes.json()]);
// //         setTasks(Array.isArray(tData) ? tData : []);
// //         setProjects(pData);
// //         setUsers(uData.filter((u) => u.role === "Member"));
// //       } catch { toast.error("Failed to load"); }
// //       finally { setLoading(false); }
// //     };
// //     loadAll();
// //   }, []);

// //   const filtered = useMemo(() =>
// //     tasks.filter((t) => t.title?.toLowerCase().includes(search.toLowerCase())),
// //   [tasks, search]);

// //   const grouped = useMemo(() => {
// //     const g = { "Todo": [], "In Progress": [], "Done": [], "Overdue": [] };
// //     filtered.forEach((t) => {
// //       const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
// //       (overdue ? g["Overdue"] : (g[t.status] || g["Todo"])).push(t);
// //     });
// //     return g;
// //   }, [filtered]);

// //   const getProjectName = (id) => projects.find((p) => p._id === id)?.name || "—";
// //   const getUserName    = (id) => (!id || id === "unassigned") ? "Unassigned" : (users.find((u) => u._id === id)?.name || "Unknown");

// //   const createTask = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(API, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ ...form, status: "Todo" }),
// //       });
// //       if (!res.ok) throw new Error();
// //       const newTask = await res.json();
// //       setTasks((p) => [newTask, ...p]);
// //       setForm({ title: "", description: "", projectId: "", assigneeId: "unassigned", priority: "Medium", dueDate: "" });
// //       setOpen(false);
// //       toast.success("Task created");
// //     } catch { toast.error("Create failed"); }
// //   };

// //   const updateTask = async (id, updates) => {
// //     try {
// //       const res = await fetch(`${API}/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(updates),
// //       });
// //       const updated = await res.json();
// //       setTasks((p) => p.map((t) => t._id === id ? updated : t));
// //     } catch { toast.error("Update failed"); }
// //   };

// //   const deleteTask = async (id) => {
// //     try {
// //       await fetch(`${API}/${id}`, { method: "DELETE" });
// //       setTasks((p) => p.filter((t) => t._id !== id));
// //       toast.success("Deleted");
// //     } catch { toast.error("Delete failed"); }
// //   };

// //   const totalCount = tasks.length;

// //   return (
// //     <>
// //       <style>{`
// //         .tasks-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

// //         .task-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); border-color: #c4b5fd !important; }
// //         .table-row:hover { background: #fafafa; }

// //         .view-btn {
// //           background: transparent; border: 1px solid #e5e7eb; border-radius: 7px;
// //           padding: 8px 10px; cursor: pointer; color: #9ca3af;
// //           display: flex; align-items: center; transition: all .15s;
// //         }
// //         .view-btn:hover  { border-color: #7c3aed; color: #7c3aed; }
// //         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

// //         .new-task-btn { background: #7c3aed; border: none; width: 42px; height: 42px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; transition: background .15s, box-shadow .15s; box-shadow: 0 1px 4px rgba(124,58,237,.3); }
// //         .new-task-btn:hover { background: #6d28d9 !important; box-shadow: 0 4px 12px rgba(124,58,237,.4) !important; }
// //         .new-task-wrap:hover .new-task-label { opacity: 1 !important; transform: translateY(0) !important; }

// //         .pm-search { width:100%; border:1px solid #e5e7eb; border-radius:8px; padding:9px 14px; font-size:14px; color:#111827; background:#fff; outline:none; transition:border-color .15s,box-shadow .15s; font-family:inherit; }
// //         .pm-search:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,.1); }
// //         .pm-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
// //       `}</style>

// //       <div className="tasks-root" style={{ padding: "32px", maxWidth: 1400, margin: "0 auto" }}>

// //         {/* ── Header ── */}
// //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, overflow: "visible" }}>
// //           <div>
// //             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>Workspace</div>
// //             <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>Tasks</h1>
// //             <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Track work across all projects.</p>
// //           </div>

// //           {/* Icon-only button with hover label */}
// //           <div className="new-task-wrap" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
// //             <button className="new-task-btn" onClick={() => setOpen(true)}>
// //               <Plus size={20} strokeWidth={2.2} />
// //             </button>
// //             <span className="new-task-label" style={{
// //               position: "absolute", top: "calc(100% + 6px)",
// //               fontSize: 11, fontWeight: 600, color: "#7c3aed",
// //               whiteSpace: "nowrap", letterSpacing: "0.03em",
// //               opacity: 0, transform: "translateY(-4px)",
// //               transition: "opacity .18s, transform .18s",
// //               pointerEvents: "none",
// //             }}>
// //               New Task
// //             </span>
// //           </div>
// //         </div>

// //         {/* ── Search + view toggle ── */}
// //         <div style={{
// //           display: "flex", alignItems: "center", gap: 12,
// //           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
// //           padding: "10px 0", marginBottom: 0,
// //         }}>
// //           <input
// //             className="pm-search"
// //             placeholder="Search tasks…"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             style={{ flex: 1 }}
// //           />
// //           <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>
// //             {loading ? "Loading…" : `${totalCount} task${totalCount !== 1 ? "s" : ""}`}
// //           </span>
// //           <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
// //             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={20} /></button>
// //             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={20} /></button>
// //           </div>
// //         </div>

// //         {/* ── Board / Table ── */}
// //         <div style={{
// //           border: "1px solid #e5e7eb", borderTop: "none",
// //           borderRadius: "0 0 10px 10px", overflow: "hidden",
// //           background: "#fff",
// //         }}>
// //           {loading ? (
// //             <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading tasks…</div>
// //           ) : view === "card" ? (
// //             <div style={{ padding: 20 }}>
// //               <CardView grouped={grouped} getProjectName={getProjectName} getUserName={getUserName} users={users} updateTask={updateTask} deleteTask={deleteTask} />
// //             </div>
// //           ) : (
// //             <TableView grouped={grouped} getProjectName={getProjectName} getUserName={getUserName} users={users} updateTask={updateTask} deleteTask={deleteTask} />
// //           )}
// //         </div>

// //         {/* ── Create Dialog ── */}
// //         <Dialog open={open} onOpenChange={setOpen}>
// //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
// //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Task</DialogTitle>
// //             </div>

// //             <form onSubmit={createTask}>
// //               <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// //                 <div>
// //                   <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Task title</label>
// //                   <input className="pm-input" style={inp} placeholder="e.g. Design landing page"
// //                     value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
// //                 </div>
// //                 <div>
// //                   <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Description</label>
// //                   <textarea className="pm-input" style={{ ...inp, resize: "none", height: 72, lineHeight: 1.55 }}
// //                     placeholder="Optional details…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
// //                 </div>

// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// //                   <div>
// //                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Project</label>
// //                     <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
// //                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue placeholder="Select project" /></SelectTrigger>
// //                       <SelectContent>{projects.map((p) => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Assignee</label>
// //                     <Select value={form.assigneeId} onValueChange={(v) => setForm({ ...form, assigneeId: v })}>
// //                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue placeholder="Assign member" /></SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="unassigned">Unassigned</SelectItem>
// //                         {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                 </div>

// //                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
// //                   <div>
// //                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Priority</label>
// //                     <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
// //                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue /></SelectTrigger>
// //                       <SelectContent>{PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Due date & time</label>
// //                     <input className="pm-input" type="datetime-local" style={{ ...inp, fontSize: 13 }}
// //                       value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// //                 <button type="button" onClick={() => setOpen(false)} style={{
// //                   background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// //                   padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// //                 }}>Cancel</button>
// //                 <button type="submit" style={{
// //                   background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// //                   padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// //                 }}>Create</button>
// //               </div>
// //             </form>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </>
// //   );
// // }
// import { useEffect, useMemo, useState } from "react";
// import { Plus, Trash2, Flag, CalendarDays, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown } from "lucide-react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// const API  = "http://localhost:5000/api/tasks";
// const BASE = "http://localhost:5000/api";

// const STATUSES   = ["Todo", "In Progress", "Done", "Overdue"];
// const PRIORITIES = ["High", "Medium", "Low"];

// const statusMeta = {
//   "Todo":        { bg: "#f3f4f6", color: "#374151", dot: "#9ca3af" },
//   "In Progress": { bg: "#fef9c3", color: "#854d0e", dot: "#eab308" },
//   "Done":        { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
//   "Overdue":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
// };

// const priorityMeta = {
//   High:   { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" },
//   Medium: { bg: "#fef9c3", color: "#ca8a04", border: "#fde68a" },
//   Low:    { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" },
// };

// const inp = {
//   width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
//   padding: "9px 12px", fontSize: 14, color: "#111827",
//   background: "#f9fafb", outline: "none", fontFamily: "inherit",
//   transition: "border-color .15s, box-shadow .15s",
// };

// // ─── Card View ────────────────────────────────────────────────────────────────
// function CardView({ grouped, getProjectName, getUserName, users, updateTask, deleteTask }) {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
//       {STATUSES.map((status) => {
//         const meta  = statusMeta[status];
//         const tasks = grouped[status] || [];
//         return (
//           <div key={status}>
//             {/* Column header */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
//               <span style={{
//                 display: "inline-flex", alignItems: "center", gap: 7,
//                 background: meta.bg, color: meta.color,
//                 fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 20,
//               }}>
//                 <span style={{ width: 7, height: 7, borderRadius: "50%", background: meta.dot, flexShrink: 0 }} />
//                 {status}
//               </span>
//               <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>{tasks.length}</span>
//             </div>

//             {/* Task cards */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               {tasks.length === 0 && (
//                 <div style={{ border: "1px dashed #e5e7eb", borderRadius: 12, padding: "32px 20px", textAlign: "center", color: "#d1d5db", fontSize: 13 }}>
//                   No tasks
//                 </div>
//               )}
//               {tasks.map((t) => {
//                 const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
//                 const pm = priorityMeta[t.priority] || priorityMeta.Medium;
//                 return (
//                   <div key={t._id} className="task-card" style={{
//                     background: "#fff", borderRadius: 12,
//                     border: `1px solid ${overdue ? "#fecaca" : "#e5e7eb"}`,
//                     padding: "20px 22px",
//                     transition: "box-shadow .18s, border-color .18s, outline .18s",
//                   }}>
//                     <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 5, lineHeight: 1.4 }}>{t.title}</div>
//                     <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 13 }}>{getProjectName(t.projectId)}</div>

//                     <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
//                       <span style={{
//                         display: "inline-flex", alignItems: "center", gap: 5,
//                         fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 7,
//                         background: pm.bg, color: pm.color, border: `1px solid ${pm.border}`,
//                       }}>
//                         <Flag size={11} />{t.priority}
//                       </span>
//                     </div>

//                     {t.dueDate && (
//                       <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: overdue ? "#dc2626" : "#6b7280", marginBottom: 14 }}>
//                         <CalendarDays size={13} />
//                         {new Date(t.dueDate).toLocaleString()}
//                       </div>
//                     )}

//                     {/* Footer */}
//                     <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid #f3f4f6", paddingTop: 13, flexWrap: "wrap" }}>
//                       <Select value={t.assigneeId || "unassigned"} onValueChange={(v) => updateTask(t._id, { assigneeId: v })}>
//                         <SelectTrigger style={{ height: 34, fontSize: 12, flex: 1, minWidth: 100 }}>
//                           <SelectValue>{getUserName(t.assigneeId)}</SelectValue>
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="unassigned">Unassigned</SelectItem>
//                           {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
//                         </SelectContent>
//                       </Select>

//                       <Select value={t.status} onValueChange={(v) => updateTask(t._id, { status: v })}>
//                         <SelectTrigger style={{ height: 34, fontSize: 12, flex: 1, minWidth: 100 }}>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Todo">Todo</SelectItem>
//                           <SelectItem value="In Progress">In Progress</SelectItem>
//                           <SelectItem value="Done">Done</SelectItem>
//                         </SelectContent>
//                       </Select>

//                       <button
//                         onClick={() => deleteTask(t._id)}
//                         title="Delete"
//                         style={{
//                           width: 34, height: 34, border: "1px solid #e5e7eb", background: "#fff",
//                           borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center",
//                           justifyContent: "center", color: "#9ca3af", transition: "all .15s", flexShrink: 0,
//                         }}
//                         onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
//                         onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "#fff"; }}
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Table View ───────────────────────────────────────────────────────────────
// function TableView({ grouped, getProjectName, getUserName, users, updateTask, deleteTask }) {
//   const [sortKey, setSortKey] = useState("title");
//   const [sortDir, setSortDir] = useState("asc");

//   const allTasks = STATUSES.flatMap((s) => grouped[s] || []);

//   const sorted = [...allTasks].sort((a, b) => {
//     let av = a[sortKey] || "", bv = b[sortKey] || "";
//     if (typeof av === "string") av = av.toLowerCase();
//     if (typeof bv === "string") bv = bv.toLowerCase();
//     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
//   });

//   function toggleSort(key) {
//     if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
//     else { setSortKey(key); setSortDir("asc"); }
//   }

//   function SortIcon({ col }) {
//     if (sortKey !== col) return <ChevronUp size={12} style={{ opacity: 0.2 }} />;
//     return sortDir === "asc"
//       ? <ChevronUp size={12} style={{ color: "#7c3aed" }} />
//       : <ChevronDown size={12} style={{ color: "#7c3aed" }} />;
//   }

//   const thStyle = {
//     padding: "14px 22px", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em",
//     textTransform: "uppercase", color: "#9ca3af", background: "#f9fafb",
//     borderBottom: "1px solid #e5e7eb", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
//   };
//   const tdStyle = {
//     padding: "16px 22px", fontSize: 14, color: "#111827",
//     borderBottom: "1px solid #f3f4f6", verticalAlign: "middle",
//   };

//   if (!allTasks.length) return (
//     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
//       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
//       <p style={{ fontSize: 14 }}>No tasks yet.</p>
//     </div>
//   );

//   return (
//     <div style={{ overflowX: "auto" }}>
//       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
//         <thead>
//           <tr>
//             {[
//               { key: "title",     label: "Task"     },
//               { key: "projectId", label: "Project"  },
//               { key: "priority",  label: "Priority" },
//               { key: "status",    label: "Status"   },
//               { key: "dueDate",   label: "Due Date" },
//               { key: null,        label: "Assignee" },
//               { key: null,        label: ""         },
//             ].map(({ key, label }) => (
//               <th key={label} style={{ ...thStyle, cursor: key ? "pointer" : "default" }} onClick={() => key && toggleSort(key)}>
//                 <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
//                   {label}{key && <SortIcon col={key} />}
//                 </span>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sorted.map((t) => {
//             const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
//             const pm    = priorityMeta[t.priority] || priorityMeta.Medium;
//             const smeta = statusMeta[overdue ? "Overdue" : t.status] || statusMeta["Todo"];
//             return (
//               <tr key={t._id} className="table-row" style={{ transition: "background .12s, box-shadow .12s" }}>
//                 <td style={tdStyle}>
//                   <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
//                   {t.description && (
//                     <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>
//                       {t.description.slice(0, 70)}{t.description.length > 70 ? "…" : ""}
//                     </div>
//                   )}
//                 </td>
//                 <td style={{ ...tdStyle, color: "#6b7280" }}>{getProjectName(t.projectId)}</td>
//                 <td style={tdStyle}>
//                   <span style={{
//                     display: "inline-flex", alignItems: "center", gap: 5,
//                     fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 7,
//                     background: pm.bg, color: pm.color, border: `1px solid ${pm.border}`,
//                   }}>
//                     <Flag size={11} />{t.priority}
//                   </span>
//                 </td>
//                 <td style={tdStyle}>
//                   <Select value={t.status} onValueChange={(v) => updateTask(t._id, { status: v })}>
//                     <SelectTrigger style={{ height: 34, fontSize: 12, width: 136 }}>
//                       <SelectValue>
//                         <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: smeta.color }}>
//                           <span style={{ width: 7, height: 7, borderRadius: "50%", background: smeta.dot, flexShrink: 0 }} />
//                           {overdue ? "Overdue" : t.status}
//                         </span>
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Todo">Todo</SelectItem>
//                       <SelectItem value="In Progress">In Progress</SelectItem>
//                       <SelectItem value="Done">Done</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </td>
//                 <td style={{ ...tdStyle, fontSize: 13, color: overdue ? "#dc2626" : "#6b7280", whiteSpace: "nowrap" }}>
//                   {t.dueDate ? (
//                     <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                       <CalendarDays size={14} />{new Date(t.dueDate).toLocaleDateString()}
//                     </span>
//                   ) : "—"}
//                 </td>
//                 <td style={tdStyle}>
//                   <Select value={t.assigneeId || "unassigned"} onValueChange={(v) => updateTask(t._id, { assigneeId: v })}>
//                     <SelectTrigger style={{ height: 34, fontSize: 12, width: 136 }}>
//                       <SelectValue>{getUserName(t.assigneeId)}</SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="unassigned">Unassigned</SelectItem>
//                       {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </td>
//                 <td style={{ ...tdStyle, width: 58 }}>
//                   <button
//                     onClick={() => deleteTask(t._id)}
//                     style={{
//                       width: 34, height: 34, border: "1px solid #e5e7eb", background: "#fff",
//                       borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center",
//                       justifyContent: "center", color: "#9ca3af", transition: "all .15s",
//                     }}
//                     onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
//                     onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "#fff"; }}
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────
// export default function Tasks() {
//   const [tasks,    setTasks]    = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [users,    setUsers]    = useState([]);
//   const [search,   setSearch]   = useState("");
//   const [view,     setView]     = useState("card");
//   const [open,     setOpen]     = useState(false);
//   const [loading,  setLoading]  = useState(true);

//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     title: "", description: "", projectId: "",
//     assigneeId: "unassigned", priority: "Medium", dueDate: "",
//   });

//   useEffect(() => {
//     const loadAll = async () => {
//       try {
//         const [tRes, pRes, uRes] = await Promise.all([
//           fetch(API),
//           fetch(`${BASE}/projects`),
//           fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
//         ]);
//         const [tData, pData, uData] = await Promise.all([tRes.json(), pRes.json(), uRes.json()]);
//         setTasks(Array.isArray(tData) ? tData : []);
//         setProjects(Array.isArray(pData) ? pData : []);
//         setUsers(Array.isArray(uData) ? uData.filter((u) => u.role === "Member") : []);
//       } catch { toast.error("Failed to load"); }
//       finally { setLoading(false); }
//     };
//     loadAll();
//   }, []);

//   const filtered = useMemo(() =>
//     tasks.filter((t) => t.title?.toLowerCase().includes(search.toLowerCase())),
//   [tasks, search]);

//   const grouped = useMemo(() => {
//     const g = { "Todo": [], "In Progress": [], "Done": [], "Overdue": [] };
//     filtered.forEach((t) => {
//       const overdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done";
//       (overdue ? g["Overdue"] : (g[t.status] || g["Todo"])).push(t);
//     });
//     return g;
//   }, [filtered]);

//   const getProjectName = (id) => projects.find((p) => p._id === id)?.name || "—";
//   const getUserName    = (id) => (!id || id === "unassigned") ? "Unassigned" : (users.find((u) => u._id === id)?.name || "Unknown");

//   const createTask = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, status: "Todo" }),
//       });
//       if (!res.ok) throw new Error();
//       const newTask = await res.json();
//       setTasks((p) => [newTask, ...p]);
//       setForm({ title: "", description: "", projectId: "", assigneeId: "unassigned", priority: "Medium", dueDate: "" });
//       setOpen(false);
//       toast.success("Task created");
//     } catch { toast.error("Create failed"); }
//   };

//   const updateTask = async (id, updates) => {
//     try {
//       const res = await fetch(`${API}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updates),
//       });
//       const updated = await res.json();
//       setTasks((p) => p.map((t) => t._id === id ? updated : t));
//     } catch { toast.error("Update failed"); }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await fetch(`${API}/${id}`, { method: "DELETE" });
//       setTasks((p) => p.filter((t) => t._id !== id));
//       toast.success("Deleted");
//     } catch { toast.error("Delete failed"); }
//   };

//   const totalCount = tasks.length;

//   return (
//     <>
//       <style>{`
//         .tasks-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

//         /* Card: shadow lift + purple focus ring */
//         .task-card:hover {
//           box-shadow: 0 8px 28px rgba(0,0,0,0.10);
//           border-color: #a78bfa !important;
//           outline: 3px solid rgba(124,58,237,0.14);
//           outline-offset: 1px;
//         }

//         /* Table row: bg tint + purple left-edge accent bar */
//         .table-row:hover {
//           background: #faf8ff;
//           box-shadow: inset 4px 0 0 0 #7c3aed;
//         }

//         .view-btn {
//           background: transparent; border: 1px solid #e5e7eb; border-radius: 8px;
//           padding: 10px 12px; cursor: pointer; color: #9ca3af;
//           display: flex; align-items: center; transition: all .15s;
//         }
//         .view-btn:hover  { border-color: #7c3aed; color: #7c3aed; }
//         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

//         .new-task-btn {
//           background: #7c3aed; border: none; width: 44px; height: 44px;
//           border-radius: 11px; cursor: pointer; display: flex; align-items: center;
//           justify-content: center; color: #fff;
//           transition: background .15s, box-shadow .15s;
//           box-shadow: 0 1px 4px rgba(124,58,237,.3);
//         }
//         .new-task-btn:hover { background: #6d28d9 !important; box-shadow: 0 4px 12px rgba(124,58,237,.4) !important; }
//         .new-task-wrap:hover .new-task-label { opacity: 1 !important; transform: translateY(0) !important; }

//         .pm-search {
//           width: 100%; border: 1px solid #e5e7eb; border-radius: 9px;
//           padding: 11px 16px; font-size: 14px; color: #111827; background: #fff;
//           outline: none; transition: border-color .15s, box-shadow .15s; font-family: inherit;
//         }
//         .pm-search:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.1); }
//         .pm-input:focus  { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
//       `}</style>

//       <div className="tasks-root" style={{ padding: "36px", maxWidth: 1500, margin: "0 auto" }}>

//         {/* ── Header ── */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40, overflow: "visible" }}>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 5 }}>Workspace</div>
//             <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>Tasks</h1>
//             <p style={{ fontSize: 14, color: "#6b7280", marginTop: 5 }}>Track work across all projects.</p>
//           </div>

//           <div className="new-task-wrap" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <button className="new-task-btn" onClick={() => setOpen(true)}>
//               <Plus size={22} strokeWidth={2.2} />
//             </button>
//             <span className="new-task-label" style={{
//               position: "absolute", top: "calc(100% + 7px)",
//               fontSize: 11, fontWeight: 600, color: "#7c3aed",
//               whiteSpace: "nowrap", letterSpacing: "0.03em",
//               opacity: 0, transform: "translateY(-4px)",
//               transition: "opacity .18s, transform .18s",
//               pointerEvents: "none",
//             }}>
//               New Task
//             </span>
//           </div>
//         </div>

//         {/* ── Search + view toggle ── */}
//         <div style={{
//           display: "flex", alignItems: "center", gap: 14,
//           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
//           padding: "14px 0", marginBottom: 0,
//         }}>
//           <input
//             className="pm-search"
//             placeholder="Search tasks…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ flex: 1 }}
//           />
//           <span style={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}>
//             {loading ? "Loading…" : `${totalCount} task${totalCount !== 1 ? "s" : ""}`}
//           </span>
//           <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
//             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={22} /></button>
//             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={22} /></button>
//           </div>
//         </div>

//         {/* ── Board / Table ── */}
//         <div style={{
//           border: "1px solid #e5e7eb", borderTop: "none",
//           borderRadius: "0 0 12px 12px", overflow: "hidden",
//           background: "#fff",
//         }}>
//           {loading ? (
//             <div style={{ padding: 80, textAlign: "center", color: "#9ca3af", fontSize: 15 }}>Loading tasks…</div>
//           ) : view === "card" ? (
//             <div style={{ padding: 26 }}>
//               <CardView grouped={grouped} getProjectName={getProjectName} getUserName={getUserName} users={users} updateTask={updateTask} deleteTask={deleteTask} />
//             </div>
//           ) : (
//             <TableView grouped={grouped} getProjectName={getProjectName} getUserName={getUserName} users={users} updateTask={updateTask} deleteTask={deleteTask} />
//           )}
//         </div>

//         {/* ── Create Dialog ── */}
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
//             <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid #f3f4f6" }}>
//               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
//               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Task</DialogTitle>
//             </div>

//             <form onSubmit={createTask}>
//               <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
//                 <div>
//                   <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Task title</label>
//                   <input className="pm-input" style={inp} placeholder="e.g. Design landing page"
//                     value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
//                 </div>
//                 <div>
//                   <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Description</label>
//                   <textarea className="pm-input" style={{ ...inp, resize: "none", height: 72, lineHeight: 1.55 }}
//                     placeholder="Optional details…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Project</label>
//                     <Select value={form.projectId} onValueChange={(v) => setForm({ ...form, projectId: v })}>
//                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue placeholder="Select project" /></SelectTrigger>
//                       <SelectContent>{projects.map((p) => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}</SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Assignee</label>
//                     <Select value={form.assigneeId} onValueChange={(v) => setForm({ ...form, assigneeId: v })}>
//                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue placeholder="Assign member" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="unassigned">Unassigned</SelectItem>
//                         {users.map((u) => <SelectItem key={u._id} value={u._id}>{u.name}</SelectItem>)}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Priority</label>
//                     <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
//                       <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue /></SelectTrigger>
//                       <SelectContent>{PRIORITIES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" }}>Due date & time</label>
//                     <input className="pm-input" type="datetime-local" style={{ ...inp, fontSize: 13 }}
//                       value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
//                   </div>
//                 </div>
//               </div>

//               <div style={{ padding: "14px 26px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
//                 <button type="button" onClick={() => setOpen(false)} style={{
//                   background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
//                   padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
//                 }}>Cancel</button>
//                 <button type="submit" style={{
//                   background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
//                   padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
//                 }}>Create</button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// }
// ===============================
// Tasks.tsx FINAL UPDATED
// ===============================

import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  Trash2,
  Flag,
  CalendarDays,
  LayoutGrid,
  List,
  FolderOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const API = "http://localhost:5000/api/tasks";
const BASE = "http://localhost:5000/api";

const STATUSES = [
  "Todo",
  "In Progress",
  "Done",
  "Overdue",
];

const PRIORITIES = [
  "High",
  "Medium",
  "Low",
];

// =========================================
// STATUS COLORS
// =========================================

const statusMeta = {
  Todo: {
    bg: "#f3f4f6",
    color: "#374151",
    dot: "#9ca3af",
  },

  "In Progress": {
    bg: "#fef9c3",
    color: "#854d0e",
    dot: "#eab308",
  },

  Done: {
    bg: "#dcfce7",
    color: "#166534",
    dot: "#22c55e",
  },

  Overdue: {
    bg: "#fee2e2",
    color: "#991b1b",
    dot: "#ef4444",
  },
};

const priorityMeta = {
  High: {
    bg: "#fee2e2",
    color: "#dc2626",
    border: "#fecaca",
  },

  Medium: {
    bg: "#fef9c3",
    color: "#ca8a04",
    border: "#fde68a",
  },

  Low: {
    bg: "#f3f4f6",
    color: "#6b7280",
    border: "#e5e7eb",
  },
};

// =========================================
// MAIN
// =========================================

export default function Tasks() {
  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [view, setView] =
    useState("card");

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // =========================================
  // FORM
  // =========================================

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      projectId: "",
      assigneeId: "unassigned",
      priority: "Medium",
      dueDate: "",
    });

  // =========================================
  // LOAD
  // =========================================

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [tRes, pRes, uRes] =
          await Promise.all([
            fetch(API, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch(
              `${BASE}/projects`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            fetch(
              `${BASE}/admin/users`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

        const [
          tData,
          pData,
          uData,
        ] = await Promise.all([
          tRes.json(),
          pRes.json(),
          uRes.json(),
        ]);

        setTasks(
          Array.isArray(tData)
            ? tData
            : []
        );

        setProjects(
          Array.isArray(pData)
            ? pData
            : []
        );

        setUsers(
          Array.isArray(uData)
            ? uData.filter(
                (u) =>
                  u.role ===
                  "Member"
              )
            : []
        );

      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load"
        );

      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  // =========================================
  // HELPERS
  // =========================================

  const getProjectName = (
    id
  ) => {
    if (!Array.isArray(projects))
      return "—";

    return (
      projects.find(
        (p) => p._id === id
      )?.name || "—"
    );
  };

  const getUserName = (id) => {
    if (
      !id ||
      id === "unassigned"
    )
      return "Unassigned";

    if (!Array.isArray(users))
      return "Unknown";

    return (
      users.find(
        (u) => u._id === id
      )?.name || "Unknown"
    );
  };

  // =========================================
  // FILTER
  // =========================================

  const filtered = useMemo(
    () =>
      tasks.filter((t) =>
        t.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ),
    [tasks, search]
  );

  // =========================================
  // GROUP
  // =========================================

  const grouped = useMemo(() => {
    const g = {
      Todo: [],
      "In Progress": [],
      Done: [],
      Overdue: [],
    };

    filtered.forEach((t) => {
      const overdue =
        t.dueDate &&
        new Date(t.dueDate) <
          new Date() &&
        t.status !== "Done";

      if (overdue) {
        g["Overdue"].push(t);
      } else {
        g[t.status]?.push(t);
      }
    });

    return g;
  }, [filtered]);

  // =========================================
  // CREATE TASK
  // =========================================

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,
            status: "Todo",
          }),
        }
      );

      if (!res.ok)
        throw new Error();

      const newTask =
        await res.json();

      setTasks((prev) => [
        newTask,
        ...prev,
      ]);

      setForm({
        title: "",
        description: "",
        projectId: "",
        assigneeId:
          "unassigned",
        priority: "Medium",
        dueDate: "",
      });

      setOpen(false);

      toast.success(
        "Task created"
      );

    } catch {
      toast.error(
        "Create failed"
      );
    }
  };

  // =========================================
  // UPDATE TASK
  // =========================================

  const updateTask = async (
    id,
    updates
  ) => {
    try {
      const res = await fetch(
        `${API}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            updates
          ),
        }
      );

      const updated =
        await res.json();

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id
            ? updated
            : t
        )
      );

    } catch {
      toast.error(
        "Update failed"
      );
    }
  };

  // =========================================
  // DELETE TASK
  // =========================================

  const deleteTask = async (
    id
  ) => {
    try {
      await fetch(
        `${API}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prev) =>
        prev.filter(
          (t) => t._id !== id
        )
      );

      toast.success(
        "Deleted"
      );

    } catch {
      toast.error(
        "Delete failed"
      );
    }
  };

  // =========================================
  // TABLE VIEW
  // =========================================

  const allTasks = STATUSES.flatMap(
    (s) => grouped[s] || []
  );

  // =========================================
  // UI
  // =========================================

  return (
    <div className="p-8 max-w-[1600px] mx-auto">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="uppercase text-xs tracking-widest text-violet-600 font-semibold">
            Workspace
          </p>

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500 mt-1">
            Track work across all projects
          </p>
        </div>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
            h-11 w-11 rounded-xl
            bg-violet-600 text-white
            flex items-center justify-center
            hover:bg-violet-700
            transition
          "
        >
          <Plus size={22} />
        </button>
      </div>

      {/* SEARCH + VIEW */}

      <div className="flex gap-4 items-center border-y py-4 mb-0">

        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            flex-1 border rounded-xl
            px-4 py-3 outline-none
            focus:ring-2 focus:ring-violet-200
          "
        />

        <span className="text-sm text-gray-500 whitespace-nowrap">
          {tasks.length} tasks
        </span>

        <button
          onClick={() =>
            setView("card")
          }
          className={`
            h-11 w-11 rounded-xl border
            flex items-center justify-center
            ${
              view === "card"
                ? "bg-violet-600 text-white border-violet-600"
                : ""
            }
          `}
        >
          <LayoutGrid size={20} />
        </button>

        <button
          onClick={() =>
            setView("table")
          }
          className={`
            h-11 w-11 rounded-xl border
            flex items-center justify-center
            ${
              view === "table"
                ? "bg-violet-600 text-white border-violet-600"
                : ""
            }
          `}
        >
          <List size={20} />
        </button>
      </div>

      {/* CONTENT */}

      <div className="border border-t-0 rounded-b-2xl bg-white overflow-hidden">

        {loading ? (
          <div className="p-20 text-center text-gray-400">
            Loading...
          </div>
        ) : view === "card" ? (

          // ======================================
          // CARD VIEW
          // ======================================

          <div className="grid grid-cols-4 gap-6 p-6">

            {STATUSES.map(
              (status) => (
                <div key={status}>

                  <div className="flex items-center gap-2 mb-5">

                    <span
                      className="px-4 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background:
                          statusMeta[
                            status
                          ].bg,

                        color:
                          statusMeta[
                            status
                          ].color,
                      }}
                    >
                      {status}
                    </span>

                    <span className="text-sm text-gray-400">
                      {
                        grouped[
                          status
                        ]?.length
                      }
                    </span>
                  </div>

                  <div className="space-y-4">

                    {grouped[
                      status
                    ]?.map((t) => {
                      const overdue =
                        t.dueDate &&
                        new Date(
                          t.dueDate
                        ) <
                          new Date() &&
                        t.status !==
                          "Done";

                      return (
                        <div
                          key={t._id}
                          className="
                            border rounded-2xl
                            p-5 bg-white
                            hover:shadow-xl
                            transition
                          "
                        >

                          <h3 className="font-semibold text-gray-900">
                            {t.title}
                          </h3>

                          <p className="text-sm text-gray-400 mt-1 mb-4">
                            {getProjectName(
                              t.projectId
                            )}
                          </p>

                          {/* PRIORITY */}

                          <div className="mb-3">
                            <span
                              className="text-xs px-3 py-1 rounded-lg font-semibold"
                              style={{
                                background:
                                  priorityMeta[
                                    t.priority
                                  ].bg,

                                color:
                                  priorityMeta[
                                    t.priority
                                  ].color,

                                border: `1px solid ${priorityMeta[t.priority].border}`,
                              }}
                            >
                              {t.priority}
                            </span>
                          </div>

                          {/* DUE DATE */}

                          {t.dueDate && (
                            <div
                              className={`flex items-center gap-2 text-sm mb-4 ${
                                overdue
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <CalendarDays size={14} />

                              {new Date(
                                t.dueDate
                              ).toLocaleString()}
                            </div>
                          )}

                          {/* ASSIGNEE */}

                          <div className="space-y-3">

                            <Select
                              value={
                                t.assigneeId ||
                                "unassigned"
                              }
                              onValueChange={(
                                v
                              ) =>
                                updateTask(
                                  t._id,
                                  {
                                    assigneeId:
                                      v,
                                  }
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue>
                                  {getUserName(
                                    t.assigneeId
                                  )}
                                </SelectValue>
                              </SelectTrigger>

                              <SelectContent>

                                <SelectItem value="unassigned">
                                  Unassigned
                                </SelectItem>

                                {users.map(
                                  (
                                    u
                                  ) => (
                                    <SelectItem
                                      key={
                                        u._id
                                      }
                                      value={
                                        u._id
                                      }
                                    >
                                      {
                                        u.name
                                      }
                                    </SelectItem>
                                  )
                                )}

                              </SelectContent>
                            </Select>

                            {/* STATUS */}

                            <Select
                              value={
                                t.status
                              }
                              onValueChange={(
                                v
                              ) =>
                                updateTask(
                                  t._id,
                                  {
                                    status:
                                      v,
                                  }
                                )
                              }
                            >
                              <SelectTrigger>
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

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                deleteTask(
                                  t._id
                                )
                              }
                              className="
                                w-full h-10 border rounded-xl
                                flex items-center justify-center
                                text-red-500
                                hover:bg-red-50
                              "
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (

          // ======================================
          // TABLE VIEW
          // ======================================

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Task
                  </th>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Project
                  </th>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Priority
                  </th>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Status
                  </th>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Due Date
                  </th>

                  <th className="text-left p-4 text-xs uppercase text-gray-400">
                    Assignee
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>

                {allTasks.map((t) => {
                  const overdue =
                    t.dueDate &&
                    new Date(
                      t.dueDate
                    ) <
                      new Date() &&
                    t.status !==
                      "Done";

                  return (
                    <tr
                      key={t._id}
                      className="border-b hover:bg-violet-50 transition"
                    >

                      <td className="p-4">
                        <div className="font-semibold">
                          {t.title}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          {t.description}
                        </div>
                      </td>

                      <td className="p-4 text-gray-500">
                        {getProjectName(
                          t.projectId
                        )}
                      </td>

                      <td className="p-4">

                        <span
                          className="text-xs px-3 py-1 rounded-lg font-semibold"
                          style={{
                            background:
                              priorityMeta[
                                t.priority
                              ].bg,

                            color:
                              priorityMeta[
                                t.priority
                              ].color,
                          }}
                        >
                          {t.priority}
                        </span>
                      </td>

                      <td className="p-4">

                        <Select
                          value={
                            t.status
                          }
                          onValueChange={(
                            v
                          ) =>
                            updateTask(
                              t._id,
                              {
                                status:
                                  v,
                              }
                            )
                          }
                        >
                          <SelectTrigger className="w-[140px]">
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
                      </td>

                      <td
                        className={`p-4 text-sm ${
                          overdue
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {t.dueDate
                          ? new Date(
                              t.dueDate
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="p-4">

                        <Select
                          value={
                            t.assigneeId ||
                            "unassigned"
                          }
                          onValueChange={(
                            v
                          ) =>
                            updateTask(
                              t._id,
                              {
                                assigneeId:
                                  v,
                              }
                            )
                          }
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue>
                              {getUserName(
                                t.assigneeId
                              )}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>

                            <SelectItem value="unassigned">
                              Unassigned
                            </SelectItem>

                            {users.map(
                              (
                                u
                              ) => (
                                <SelectItem
                                  key={
                                    u._id
                                  }
                                  value={
                                    u._id
                                  }
                                >
                                  {
                                    u.name
                                  }
                                </SelectItem>
                              )
                            )}

                          </SelectContent>
                        </Select>
                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            deleteTask(
                              t._id
                            )
                          }
                          className="
                            h-9 w-9 rounded-lg border
                            flex items-center justify-center
                            hover:bg-red-50
                            text-red-500
                          "
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE TASK */}

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-lg rounded-2xl">

          <DialogTitle className="text-xl font-bold">
            Create Task
          </DialogTitle>

          <form
            onSubmit={createTask}
            className="space-y-4 mt-5"
          >

            <input
              required
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />

            <textarea
              placeholder="Description"
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-4 py-3 h-24
              "
            />

            {/* PROJECT */}

            <Select
              value={form.projectId}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  projectId: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>

              <SelectContent>

                {projects.map(
                  (p) => (
                    <SelectItem
                      key={p._id}
                      value={p._id}
                    >
                      {p.name}
                    </SelectItem>
                  )
                )}

              </SelectContent>
            </Select>

            {/* ASSIGNEE */}

            <Select
              value={
                form.assigneeId
              }
              onValueChange={(v) =>
                setForm({
                  ...form,
                  assigneeId: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="unassigned">
                  Unassigned
                </SelectItem>

               {users.map((u) => {
  console.log("USER:", u);

  return (
    <SelectItem
      key={u._id}
      value={u._id}
    >
      {u.name}
    </SelectItem>
  );
})}

              </SelectContent>
            </Select>

            {/* PRIORITY */}

            <Select
              value={form.priority}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  priority: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>

                {PRIORITIES.map(
                  (p) => (
                    <SelectItem
                      key={p}
                      value={p}
                    >
                      {p}
                    </SelectItem>
                  )
                )}

              </SelectContent>
            </Select>

            {/* DUE DATE */}

            <input
              type="datetime-local"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate:
                    e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-4 py-3
              "
            />

            <button
              type="submit"
              className="
                w-full h-11 rounded-xl
                bg-violet-600 text-white
                font-medium
                hover:bg-violet-700
              "
            >
              Create Task
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}