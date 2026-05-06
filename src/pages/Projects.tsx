// // // // // // // import { useState } from "react";
// // // // // // // import { Link } from "react-router-dom";
// // // // // // // import { Plus, MoreHorizontal, Trash2, Pencil, UserPlus, Crown } from "lucide-react";
// // // // // // // import { useStore } from "@/lib/store";
// // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
// // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // // // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // // import { toast } from "sonner";

// // // // // // // const colors = ["248 80% 60%", "152 70% 42%", "38 92% 50%", "0 75% 58%", "200 85% 50%"];

// // // // // // // const Projects = () => {
// // // // // // //   const { projects, tasks, users, currentUser, addProject, updateProject, deleteProject, addProjectMember, removeProjectMember } = useStore();
// // // // // // //   const [createOpen, setCreateOpen] = useState(false);
// // // // // // //   const [editId, setEditId] = useState<string | null>(null);
// // // // // // //   const [memberId, setMemberId] = useState<string | null>(null);
// // // // // // //   const [name, setName] = useState("");
// // // // // // //   const [desc, setDesc] = useState("");
// // // // // // //   const [newMember, setNewMember] = useState("");
// // // // // // //   const isAdmin = currentUser?.role === "Admin";

// // // // // // //   const openCreate = () => { setName(""); setDesc(""); setCreateOpen(true); };
// // // // // // //   const openEdit = (id: string) => {
// // // // // // //     const p = projects.find((x) => x.id === id)!;
// // // // // // //     setName(p.name); setDesc(p.description); setEditId(id);
// // // // // // //   };

// // // // // // //   const create = (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();
// // // // // // //     addProject({ name, description: desc, color: colors[projects.length % colors.length], ownerId: currentUser!.id, members: [currentUser!.id] });
// // // // // // //     toast.success("Project created");
// // // // // // //     setCreateOpen(false);
// // // // // // //   };

// // // // // // //   const saveEdit = (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!editId) return;
// // // // // // //     updateProject(editId, { name, description: desc });
// // // // // // //     toast.success("Project updated");
// // // // // // //     setEditId(null);
// // // // // // //   };

// // // // // // //   const memberProject = memberId ? projects.find((p) => p.id === memberId) : null;
// // // // // // //   const availableUsers = memberProject ? users.filter((u) => !memberProject.members.includes(u.id)) : [];

// // // // // // //   return (
// // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // //       <PageHeader
// // // // // // //         title="Projects"
// // // // // // //         description="Organize work into projects and track progress."
// // // // // // //         action={
// // // // // // //           isAdmin && (
// // // // // // //             <Button onClick={openCreate} className="bg-gradient-primary border-0 shadow-elegant">
// // // // // // //               <Plus className="h-4 w-4 mr-2" /> New project
// // // // // // //             </Button>
// // // // // // //           )
// // // // // // //         }
// // // // // // //       />

// // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // // //         {projects.map((p) => {
// // // // // // //           const ptasks = tasks.filter((t) => t.projectId === p.id);
// // // // // // //           const done = ptasks.filter((t) => t.status === "Done").length;
// // // // // // //           const pct = ptasks.length ? Math.round((done / ptasks.length) * 100) : 0;
// // // // // // //           const members = users.filter((u) => p.members.includes(u.id));
// // // // // // //           const owner = users.find((u) => u.id === p.ownerId);

// // // // // // //           return (
// // // // // // //             <Card key={p.id} className="p-5 shadow-card border-0 hover:shadow-elegant transition-smooth group">
// // // // // // //               <div className="flex items-start justify-between mb-3">
// // // // // // //                 <div className="h-10 w-10 rounded-lg" style={{ background: `hsl(${p.color})` }} />
// // // // // // //                 {isAdmin && (
// // // // // // //                   <DropdownMenu>
// // // // // // //                     <DropdownMenuTrigger asChild>
// // // // // // //                       <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
// // // // // // //                         <MoreHorizontal className="h-4 w-4" />
// // // // // // //                       </Button>
// // // // // // //                     </DropdownMenuTrigger>
// // // // // // //                     <DropdownMenuContent align="end">
// // // // // // //                       <DropdownMenuItem onClick={() => openEdit(p.id)}>
// // // // // // //                         <Pencil className="h-4 w-4 mr-2" /> Edit project
// // // // // // //                       </DropdownMenuItem>
// // // // // // //                       <DropdownMenuItem onClick={() => { setMemberId(p.id); setNewMember(""); }}>
// // // // // // //                         <UserPlus className="h-4 w-4 mr-2" /> Manage members
// // // // // // //                       </DropdownMenuItem>
// // // // // // //                       <DropdownMenuSeparator />
// // // // // // //                       <DropdownMenuItem className="text-destructive" onClick={() => { deleteProject(p.id); toast.success("Project deleted"); }}>
// // // // // // //                         <Trash2 className="h-4 w-4 mr-2" /> Delete
// // // // // // //                       </DropdownMenuItem>
// // // // // // //                     </DropdownMenuContent>
// // // // // // //                   </DropdownMenu>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //               <Link to={`/tasks?project=${p.id}`}>
// // // // // // //                 <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-smooth">{p.name}</h3>
// // // // // // //               </Link>
// // // // // // //               <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">{p.description}</p>

// // // // // // //               {owner && (
// // // // // // //                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
// // // // // // //                   <Crown className="h-3 w-3 text-warning" />
// // // // // // //                   <span>Owner: <span className="text-foreground font-medium">{owner.name}</span></span>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               <div className="space-y-2 mb-4">
// // // // // // //                 <div className="flex justify-between text-xs">
// // // // // // //                   <span className="text-muted-foreground">Progress</span>
// // // // // // //                   <span className="font-medium">{pct}%</span>
// // // // // // //                 </div>
// // // // // // //                 <div className="h-1.5 bg-muted rounded-full overflow-hidden">
// // // // // // //                   <div className="h-full bg-gradient-primary rounded-full transition-smooth" style={{ width: `${pct}%` }} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div className="flex items-center justify-between">
// // // // // // //                 <div className="flex -space-x-2">
// // // // // // //                   {members.slice(0, 4).map((m) => (
// // // // // // //                     <Avatar key={m.id} className="h-7 w-7 ring-2 ring-card">
// // // // // // //                       <AvatarFallback className="bg-accent text-accent-foreground text-[10px]">
// // // // // // //                         {m.name.split(" ").map((n) => n[0]).join("")}
// // // // // // //                       </AvatarFallback>
// // // // // // //                     </Avatar>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //                 <span className="text-xs text-muted-foreground">{ptasks.length} tasks</span>
// // // // // // //               </div>
// // // // // // //             </Card>
// // // // // // //           );
// // // // // // //         })}
// // // // // // //       </div>

// // // // // // //       {/* Create */}
// // // // // // //       <Dialog open={createOpen} onOpenChange={setCreateOpen}>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogHeader><DialogTitle>Create project</DialogTitle></DialogHeader>
// // // // // // //           <form onSubmit={create} className="space-y-4">
// // // // // // //             <div className="space-y-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
// // // // // // //             <div className="space-y-2"><Label>Description</Label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
// // // // // // //             <DialogFooter><Button type="submit" className="bg-gradient-primary border-0">Create</Button></DialogFooter>
// // // // // // //           </form>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>

// // // // // // //       {/* Edit */}
// // // // // // //       <Dialog open={!!editId} onOpenChange={(o) => !o && setEditId(null)}>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogHeader><DialogTitle>Edit project</DialogTitle></DialogHeader>
// // // // // // //           <form onSubmit={saveEdit} className="space-y-4">
// // // // // // //             <div className="space-y-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
// // // // // // //             <div className="space-y-2"><Label>Description</Label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} /></div>
// // // // // // //             <DialogFooter><Button type="submit" className="bg-gradient-primary border-0">Save</Button></DialogFooter>
// // // // // // //           </form>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>

// // // // // // //       {/* Members */}
// // // // // // //       <Dialog open={!!memberId} onOpenChange={(o) => !o && setMemberId(null)}>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogHeader><DialogTitle>Manage members — {memberProject?.name}</DialogTitle></DialogHeader>
// // // // // // //           <div className="space-y-4">
// // // // // // //             <div className="space-y-2">
// // // // // // //               <Label>Add member</Label>
// // // // // // //               <div className="flex gap-2">
// // // // // // //                 <Select value={newMember} onValueChange={setNewMember}>
// // // // // // //                   <SelectTrigger><SelectValue placeholder={availableUsers.length ? "Select a user" : "All users added"} /></SelectTrigger>
// // // // // // //                   <SelectContent>
// // // // // // //                     {availableUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.name} ({u.email})</SelectItem>)}
// // // // // // //                   </SelectContent>
// // // // // // //                 </Select>
// // // // // // //                 <Button type="button" disabled={!newMember} onClick={() => { addProjectMember(memberId!, newMember); toast.success("Member added"); setNewMember(""); }}>Add</Button>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //             <div className="space-y-2">
// // // // // // //               <Label>Current members</Label>
// // // // // // //               <div className="space-y-2">
// // // // // // //                 {memberProject?.members.map((mid) => {
// // // // // // //                   const u = users.find((x) => x.id === mid);
// // // // // // //                   if (!u) return null;
// // // // // // //                   const isOwner = mid === memberProject.ownerId;
// // // // // // //                   return (
// // // // // // //                     <div key={mid} className="flex items-center justify-between p-2 rounded-lg border">
// // // // // // //                       <div className="flex items-center gap-2">
// // // // // // //                         <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px]">{u.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
// // // // // // //                         <span className="text-sm">{u.name}</span>
// // // // // // //                         {isOwner && <Crown className="h-3 w-3 text-warning" />}
// // // // // // //                       </div>
// // // // // // //                       {!isOwner && (
// // // // // // //                         <Button size="sm" variant="ghost" onClick={() => { removeProjectMember(memberId!, mid); toast.success("Removed"); }}>
// // // // // // //                           <Trash2 className="h-3.5 w-3.5" />
// // // // // // //                         </Button>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   );
// // // // // // //                 })}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Projects;
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { Plus, Trash2, Pencil } from "lucide-react";
// // // // // // // import { Card } from "@/components/ui/card";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Label } from "@/components/ui/label";
// // // // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // // // import {
// // // // // // //   Dialog,
// // // // // // //   DialogContent,
// // // // // // //   DialogHeader,
// // // // // // //   DialogTitle,
// // // // // // //   DialogFooter,
// // // // // // // } from "@/components/ui/dialog";
// // // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // // import { toast } from "sonner";

// // // // // // // const API = "http://localhost:5000/api/projects";

// // // // // // // const colors = [
// // // // // // //   "248 80% 60%",
// // // // // // //   "152 70% 42%",
// // // // // // //   "38 92% 50%",
// // // // // // //   "0 75% 58%",
// // // // // // //   "200 85% 50%",
// // // // // // // ];

// // // // // // // export default function Projects() {
// // // // // // //   const [projects, setProjects] = useState([]);
// // // // // // //   const [open, setOpen] = useState(false);

// // // // // // //   const [name, setName] = useState("");
// // // // // // //   const [desc, setDesc] = useState("");

// // // // // // //   // ================= LOAD =================
// // // // // // //   const loadProjects = async () => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(API);
// // // // // // //       const data = await res.json();
// // // // // // //       setProjects(data);
// // // // // // //     } catch (err) {
// // // // // // //       console.error(err);
// // // // // // //       toast.error("Failed to load projects");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     loadProjects();
// // // // // // //   }, []);

// // // // // // //   // ================= CREATE =================
// // // // // // //   const createProject = async (e) => {
// // // // // // //     e.preventDefault();

// // // // // // //     try {
// // // // // // //       const res = await fetch(API, {
// // // // // // //         method: "POST",
// // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // //         body: JSON.stringify({
// // // // // // //           name,
// // // // // // //           description: desc,
// // // // // // //           color: colors[projects.length % colors.length],
// // // // // // //           ownerId: "demo-user",
// // // // // // //           members: ["demo-user"],
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       if (!res.ok) throw new Error();

// // // // // // //       const newProject = await res.json();

// // // // // // //       setProjects((prev) => [newProject, ...prev]);

// // // // // // //       setName("");
// // // // // // //       setDesc("");
// // // // // // //       setOpen(false);

// // // // // // //       toast.success("Project created");
// // // // // // //     } catch {
// // // // // // //       toast.error("Create failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ================= DELETE =================
// // // // // // //   const deleteProject = async (id) => {
// // // // // // //     try {
// // // // // // //       await fetch(`${API}/${id}`, {
// // // // // // //         method: "DELETE",
// // // // // // //       });

// // // // // // //       setProjects((prev) => prev.filter((p) => p._id !== id));

// // // // // // //       toast.success("Deleted");
// // // // // // //     } catch {
// // // // // // //       toast.error("Delete failed");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ================= UI =================
// // // // // // //   return (
// // // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // // //       <PageHeader
// // // // // // //         title="Projects"
// // // // // // //         description="Organize work into projects and track progress."
// // // // // // //         action={
// // // // // // //           <Button onClick={() => setOpen(true)}>
// // // // // // //             <Plus className="h-4 w-4 mr-2" /> New project
// // // // // // //           </Button>
// // // // // // //         }
// // // // // // //       />

// // // // // // //       {/* GRID */}
// // // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // // //         {projects.map((p) => (
// // // // // // //           <Card key={p._id} className="p-5">
// // // // // // //             <div
// // // // // // //               className="h-10 w-10 rounded-lg mb-3"
// // // // // // //               style={{ background: `hsl(${p.color})` }}
// // // // // // //             />

// // // // // // //             <h3 className="font-semibold text-lg">{p.name}</h3>
// // // // // // //             <p className="text-sm text-gray-500 mb-3">
// // // // // // //               {p.description}
// // // // // // //             </p>

// // // // // // //             <div className="flex justify-between items-center">
// // // // // // //               <span className="text-xs text-gray-400">
// // // // // // //                 {p.members?.length || 0} members
// // // // // // //               </span>

// // // // // // //               <Button
// // // // // // //                 size="icon"
// // // // // // //                 variant="ghost"
// // // // // // //                 onClick={() => deleteProject(p._id)}
// // // // // // //               >
// // // // // // //                 <Trash2 className="h-4 w-4" />
// // // // // // //               </Button>
// // // // // // //             </div>
// // // // // // //           </Card>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* CREATE MODAL */}
// // // // // // //       <Dialog open={open} onOpenChange={setOpen}>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogHeader>
// // // // // // //             <DialogTitle>Create project</DialogTitle>
// // // // // // //           </DialogHeader>

// // // // // // //           <form onSubmit={createProject} className="space-y-4">
// // // // // // //             <div>
// // // // // // //               <Label>Name</Label>
// // // // // // //               <Input
// // // // // // //                 value={name}
// // // // // // //                 onChange={(e) => setName(e.target.value)}
// // // // // // //                 required
// // // // // // //               />
// // // // // // //             </div>

// // // // // // //             <div>
// // // // // // //               <Label>Description</Label>
// // // // // // //               <Textarea
// // // // // // //                 value={desc}
// // // // // // //                 onChange={(e) => setDesc(e.target.value)}
// // // // // // //               />
// // // // // // //             </div>

// // // // // // //             <DialogFooter>
// // // // // // //               <Button type="submit">Create</Button>
// // // // // // //             </DialogFooter>
// // // // // // //           </form>
// // // // // // //         </DialogContent>
// // // // // // //       </Dialog>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Plus, Trash2 } from "lucide-react";

// // // // // // import { Card } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Label } from "@/components/ui/label";
// // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // import {
// // // // // //   Select,
// // // // // //   SelectContent,
// // // // // //   SelectItem,
// // // // // //   SelectTrigger,
// // // // // //   SelectValue,
// // // // // // } from "@/components/ui/select";

// // // // // // import {
// // // // // //   Dialog,
// // // // // //   DialogContent,
// // // // // //   DialogHeader,
// // // // // //   DialogTitle,
// // // // // //   DialogFooter,
// // // // // // } from "@/components/ui/dialog";

// // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // import { toast } from "sonner";

// // // // // // const API = "http://localhost:5000/api/projects";
// // // // // // const BASE = "http://localhost:5000/api";

// // // // // // const colors = [
// // // // // //   "248 80% 60%",
// // // // // //   "152 70% 42%",
// // // // // //   "38 92% 50%",
// // // // // //   "0 75% 58%",
// // // // // //   "200 85% 50%",
// // // // // // ];

// // // // // // export default function Projects() {
// // // // // //   const [projects, setProjects] = useState([]);
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [currentUser, setCurrentUser] = useState(null);

// // // // // //   const [open, setOpen] = useState(false);
// // // // // //   const [selectedMembers, setSelectedMembers] = useState([]);

// // // // // //   const [name, setName] = useState("");
// // // // // //   const [desc, setDesc] = useState("");

// // // // // //   const token = localStorage.getItem("token");

// // // // // //   // ================= LOAD =================

// // // // // //   const loadProjects = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(API);
// // // // // //       const data = await res.json();
// // // // // //       setProjects(data);
// // // // // //     } catch {
// // // // // //       toast.error("Failed to load projects");
// // // // // //     }
// // // // // //   };

// // // // // //   const getMe = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${BASE}/auth/me`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       const data = await res.json();
// // // // // //       setCurrentUser(data);
// // // // // //     } catch {
// // // // // //       toast.error("User load failed");
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchUsers = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${BASE}/admin/users`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       const data = await res.json();

// // // // // //       // 🔥 ONLY MEMBERS (no admins)
// // // // // //       setUsers(data.filter((u) => u.role === "Member"));
// // // // // //     } catch {
// // // // // //       toast.error("Users load failed");
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     loadProjects();
// // // // // //     getMe();
// // // // // //     fetchUsers();
// // // // // //   }, []);

// // // // // //   // ================= CREATE =================

// // // // // //   const createProject = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     if (!currentUser) return toast.error("User not loaded");

// // // // // //     try {
// // // // // //       const res = await fetch(API, {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({
// // // // // //           name,
// // // // // //           description: desc,
// // // // // //           color: colors[projects.length % colors.length],
// // // // // //           ownerId: currentUser._id, // ✅ manager
// // // // // //           members: [currentUser._id, ...selectedMembers],
// // // // // //         }),
// // // // // //       });

// // // // // //       if (!res.ok) throw new Error();

// // // // // //       const newProject = await res.json();

// // // // // //       setProjects((prev) => [newProject, ...prev]);

// // // // // //       setName("");
// // // // // //       setDesc("");
// // // // // //       setSelectedMembers([]);
// // // // // //       setOpen(false);

// // // // // //       toast.success("Project created");
// // // // // //     } catch {
// // // // // //       toast.error("Create failed");
// // // // // //     }
// // // // // //   };

// // // // // //   // ================= DELETE =================

// // // // // //   const deleteProject = async (id) => {
// // // // // //     try {
// // // // // //       await fetch(`${API}/${id}`, { method: "DELETE" });

// // // // // //       setProjects((prev) => prev.filter((p) => p._id !== id));
// // // // // //       toast.success("Deleted");
// // // // // //     } catch {
// // // // // //       toast.error("Delete failed");
// // // // // //     }
// // // // // //   };

// // // // // //   // ================= UI =================

// // // // // //   return (
// // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // //       <PageHeader
// // // // // //         title="Projects"
// // // // // //         description="Organize work into projects and track progress."
// // // // // //         action={
// // // // // //           <Button onClick={() => setOpen(true)}>
// // // // // //             <Plus className="h-4 w-4 mr-2" />
// // // // // //             New project
// // // // // //           </Button>
// // // // // //         }
// // // // // //       />

// // // // // //       {/* PROJECT LIST */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //         {projects.map((p) => (
// // // // // //           <Card key={p._id} className="p-5">
// // // // // //             <div
// // // // // //               className="h-10 w-10 rounded-lg mb-3"
// // // // // //               style={{ background: `hsl(${p.color})` }}
// // // // // //             />

// // // // // //             <h3 className="font-semibold text-lg">{p.name}</h3>

// // // // // //             <p className="text-sm text-gray-500 mb-2">
// // // // // //               {p.description}
// // // // // //             </p>

// // // // // //             <p className="text-xs text-gray-400 mb-2">
// // // // // //               Members: {p.members?.length || 0}
// // // // // //             </p>

// // // // // //             <Button
// // // // // //               size="icon"
// // // // // //               variant="ghost"
// // // // // //               onClick={() => deleteProject(p._id)}
// // // // // //             >
// // // // // //               <Trash2 className="h-4 w-4" />
// // // // // //             </Button>
// // // // // //           </Card>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {/* CREATE MODAL */}
// // // // // //       <Dialog open={open} onOpenChange={setOpen}>
// // // // // //         <DialogContent>
// // // // // //           <DialogHeader>
// // // // // //             <DialogTitle>Create Project</DialogTitle>
// // // // // //           </DialogHeader>

// // // // // //           <form onSubmit={createProject} className="space-y-4">
// // // // // //             {/* NAME */}
// // // // // //             <div>
// // // // // //               <Label>Name</Label>
// // // // // //               <Input
// // // // // //                 value={name}
// // // // // //                 onChange={(e) => setName(e.target.value)}
// // // // // //                 required
// // // // // //               />
// // // // // //             </div>

// // // // // //             {/* DESCRIPTION */}
// // // // // //             <div>
// // // // // //               <Label>Description</Label>
// // // // // //               <Textarea
// // // // // //                 value={desc}
// // // // // //                 onChange={(e) => setDesc(e.target.value)}
// // // // // //               />
// // // // // //             </div>

// // // // // //             {/* MANAGER */}
// // // // // //             <div>
// // // // // //               <Label>Manager</Label>
// // // // // //               <Input value={currentUser?.name || ""} disabled />
// // // // // //             </div>

// // // // // //             {/* MEMBERS DROPDOWN */}
// // // // // //             <div>
// // // // // //               <Label>Select Members</Label>

// // // // // //               <Select
// // // // // //                 onValueChange={(v) =>
// // // // // //                   setSelectedMembers((prev) =>
// // // // // //                     prev.includes(v) ? prev : [...prev, v]
// // // // // //                   )
// // // // // //                 }
// // // // // //               >
// // // // // //                 <SelectTrigger>
// // // // // //                   <SelectValue placeholder="Select team members" />
// // // // // //                 </SelectTrigger>

// // // // // //                 <SelectContent>
// // // // // //                   {users.map((u) => (
// // // // // //                     <SelectItem key={u._id} value={u._id}>
// // // // // //                       {u.name}
// // // // // //                     </SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>

// // // // // //               {/* SHOW SELECTED */}
// // // // // //               <div className="flex gap-2 mt-2 flex-wrap">
// // // // // //                 {selectedMembers.map((id) => {
// // // // // //                   const u = users.find((x) => x._id === id);
// // // // // //                   return (
// // // // // //                     <span
// // // // // //                       key={id}
// // // // // //                       className="text-xs bg-gray-200 px-2 py-1 rounded"
// // // // // //                     >
// // // // // //                       {u?.name}
// // // // // //                     </span>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <DialogFooter>
// // // // // //               <Button type="submit">Create</Button>
// // // // // //             </DialogFooter>
// // // // // //           </form>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { Plus, Trash2, Pencil } from "lucide-react";

// // // // // // import { Card } from "@/components/ui/card";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Label } from "@/components/ui/label";
// // // // // // import { Textarea } from "@/components/ui/textarea";

// // // // // // import {
// // // // // //   Select,
// // // // // //   SelectContent,
// // // // // //   SelectItem,
// // // // // //   SelectTrigger,
// // // // // //   SelectValue,
// // // // // // } from "@/components/ui/select";

// // // // // // import {
// // // // // //   Dialog,
// // // // // //   DialogContent,
// // // // // //   DialogHeader,
// // // // // //   DialogTitle,
// // // // // //   DialogFooter,
// // // // // // } from "@/components/ui/dialog";

// // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // import { toast } from "sonner";

// // // // // // const API = "http://localhost:5000/api/projects";
// // // // // // const BASE = "http://localhost:5000/api";

// // // // // // const colors = [
// // // // // //   "248 80% 60%",
// // // // // //   "152 70% 42%",
// // // // // //   "38 92% 50%",
// // // // // //   "0 75% 58%",
// // // // // //   "200 85% 50%",
// // // // // // ];

// // // // // // export default function Projects() {
// // // // // //   const [projects, setProjects] = useState([]);
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [currentUser, setCurrentUser] = useState(null);

// // // // // //   const [open, setOpen] = useState(false);
// // // // // //   const [editOpen, setEditOpen] = useState(false);

// // // // // //   const [editingProject, setEditingProject] = useState(null);

// // // // // //   const [name, setName] = useState("");
// // // // // //   const [desc, setDesc] = useState("");

// // // // // //   const [selectedMembers, setSelectedMembers] = useState([]);
// // // // // //   const [editMembers, setEditMembers] = useState([]);

// // // // // //   const token = localStorage.getItem("token");

// // // // // //   // ================= LOAD =================

// // // // // //   const loadProjects = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(API);
// // // // // //       const data = await res.json();
// // // // // //       setProjects(data);
// // // // // //     } catch {
// // // // // //       toast.error("Failed to load projects");
// // // // // //     }
// // // // // //   };

// // // // // //   const getMe = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${BASE}/auth/me`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       const data = await res.json();
// // // // // //       setCurrentUser(data);
// // // // // //     } catch {
// // // // // //       toast.error("User load failed");
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchUsers = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${BASE}/admin/users`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });

// // // // // //       const data = await res.json();

// // // // // //       // only members
// // // // // //       setUsers(data.filter((u) => u.role === "Member"));
// // // // // //     } catch {
// // // // // //       toast.error("Users load failed");
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     loadProjects();
// // // // // //     getMe();
// // // // // //     fetchUsers();
// // // // // //   }, []);

// // // // // //   // ================= CREATE =================

// // // // // //   const createProject = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     try {
// // // // // //       const res = await fetch(API, {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({
// // // // // //           name,
// // // // // //           description: desc,
// // // // // //           color: colors[projects.length % colors.length],
// // // // // //           ownerId: currentUser._id,
// // // // // //           members: [currentUser._id, ...selectedMembers],
// // // // // //         }),
// // // // // //       });

// // // // // //       if (!res.ok) throw new Error();

// // // // // //       const newProject = await res.json();

// // // // // //       setProjects((prev) => [newProject, ...prev]);

// // // // // //       setName("");
// // // // // //       setDesc("");
// // // // // //       setSelectedMembers([]);
// // // // // //       setOpen(false);

// // // // // //       toast.success("Project created");
// // // // // //     } catch {
// // // // // //       toast.error("Create failed");
// // // // // //     }
// // // // // //   };

// // // // // //   // ================= DELETE =================

// // // // // //   const deleteProject = async (id) => {
// // // // // //     try {
// // // // // //       await fetch(`${API}/${id}`, { method: "DELETE" });

// // // // // //       setProjects((prev) => prev.filter((p) => p._id !== id));
// // // // // //       toast.success("Deleted");
// // // // // //     } catch {
// // // // // //       toast.error("Delete failed");
// // // // // //     }
// // // // // //   };

// // // // // //   // ================= EDIT =================

// // // // // //   const openEdit = (project) => {
// // // // // //     setEditingProject(project);

// // // // // //     const onlyMembers = project.members.filter(
// // // // // //       (m) => m !== project.ownerId
// // // // // //     );

// // // // // //     setEditMembers(onlyMembers);
// // // // // //     setEditOpen(true);
// // // // // //   };

// // // // // //   const updateProject = async () => {
// // // // // //     try {
// // // // // //       const res = await fetch(`${API}/${editingProject._id}`, {
// // // // // //         method: "PUT",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({
// // // // // //           members: [editingProject.ownerId, ...editMembers],
// // // // // //         }),
// // // // // //       });

// // // // // //       if (!res.ok) throw new Error();

// // // // // //       toast.success("Updated");
// // // // // //       setEditOpen(false);
// // // // // //       loadProjects();
// // // // // //     } catch {
// // // // // //       toast.error("Update failed");
// // // // // //     }
// // // // // //   };

// // // // // //   // ================= UI =================

// // // // // //   return (
// // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // //       <PageHeader
// // // // // //         title="Projects"
// // // // // //         description="Organize work into projects and track progress."
// // // // // //         action={
// // // // // //           <Button onClick={() => setOpen(true)}>
// // // // // //             <Plus className="h-4 w-4 mr-2" />
// // // // // //             New project
// // // // // //           </Button>
// // // // // //         }
// // // // // //       />

// // // // // //       {/* GRID */}
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //         {projects.map((p) => {
// // // // // //           const manager =
// // // // // //             currentUser?._id === p.ownerId
// // // // // //               ? "You"
// // // // // //               : users.find((u) => u._id === p.ownerId)?.name;

// // // // // //           const memberCount =
// // // // // //             p.members?.filter((m) => m !== p.ownerId).length || 0;

// // // // // //           return (
// // // // // //             <Card key={p._id} className="p-5">
// // // // // //               <div
// // // // // //                 className="h-10 w-10 rounded-lg mb-3"
// // // // // //                 style={{ background: `hsl(${p.color})` }}
// // // // // //               />

// // // // // //               <h3 className="font-semibold text-lg">{p.name}</h3>

// // // // // //               <p className="text-sm text-gray-500 mb-2">
// // // // // //                 {p.description}
// // // // // //               </p>

// // // // // //               <p className="text-xs text-gray-500">
// // // // // //                 Manager: {manager}
// // // // // //               </p>

// // // // // //               <div className="flex justify-between items-center mt-2">
// // // // // //                 <span className="text-xs text-gray-400">
// // // // // //                   {memberCount} members
// // // // // //                 </span>

// // // // // //                 <div className="flex gap-2">
// // // // // //                   <Button
// // // // // //                     size="icon"
// // // // // //                     variant="ghost"
// // // // // //                     onClick={() => openEdit(p)}
// // // // // //                   >
// // // // // //                     <Pencil className="h-4 w-4" />
// // // // // //                   </Button>

// // // // // //                   <Button
// // // // // //                     size="icon"
// // // // // //                     variant="ghost"
// // // // // //                     onClick={() => deleteProject(p._id)}
// // // // // //                   >
// // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </Card>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>

// // // // // //       {/* CREATE */}
// // // // // //       <Dialog open={open} onOpenChange={setOpen}>
// // // // // //         <DialogContent>
// // // // // //           <DialogHeader>
// // // // // //             <DialogTitle>Create Project</DialogTitle>
// // // // // //           </DialogHeader>

// // // // // //           <form onSubmit={createProject} className="space-y-4">
// // // // // //             <Input
// // // // // //               placeholder="Name"
// // // // // //               value={name}
// // // // // //               onChange={(e) => setName(e.target.value)}
// // // // // //               required
// // // // // //             />

// // // // // //             <Textarea
// // // // // //               placeholder="Description"
// // // // // //               value={desc}
// // // // // //               onChange={(e) => setDesc(e.target.value)}
// // // // // //             />

// // // // // //             <div>
// // // // // //               <Label>Manager</Label>
// // // // // //               <Input value={currentUser?.name || ""} disabled />
// // // // // //             </div>

// // // // // //             <div>
// // // // // //               <Label>Select Members</Label>

// // // // // //               <Select
// // // // // //                 onValueChange={(v) =>
// // // // // //                   setSelectedMembers((prev) =>
// // // // // //                     prev.includes(v) ? prev : [...prev, v]
// // // // // //                   )
// // // // // //                 }
// // // // // //               >
// // // // // //                 <SelectTrigger>
// // // // // //                   <SelectValue placeholder="Select members" />
// // // // // //                 </SelectTrigger>

// // // // // //                 <SelectContent>
// // // // // //                   {users.map((u) => (
// // // // // //                     <SelectItem key={u._id} value={u._id}>
// // // // // //                       {u.name}
// // // // // //                     </SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>

// // // // // //               <div className="flex gap-2 mt-2 flex-wrap">
// // // // // //                 {selectedMembers.map((id) => {
// // // // // //                   const u = users.find((x) => x._id === id);
// // // // // //                   return (
// // // // // //                     <span
// // // // // //                       key={id}
// // // // // //                       className="text-xs bg-gray-200 px-2 py-1 rounded"
// // // // // //                     >
// // // // // //                       {u?.name}
// // // // // //                     </span>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <DialogFooter>
// // // // // //               <Button type="submit">Create</Button>
// // // // // //             </DialogFooter>
// // // // // //           </form>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>

// // // // // //       {/* EDIT */}
// // // // // //       <Dialog open={editOpen} onOpenChange={setEditOpen}>
// // // // // //         <DialogContent>
// // // // // //           <DialogHeader>
// // // // // //             <DialogTitle>Edit Members</DialogTitle>
// // // // // //           </DialogHeader>

// // // // // //           <div className="space-y-4">
// // // // // //             <div>
// // // // // //               <Label>Manager</Label>
// // // // // //               <Input
// // // // // //                 value={
// // // // // //                   currentUser?._id === editingProject?.ownerId
// // // // // //                     ? "You"
// // // // // //                     : users.find(
// // // // // //                         (u) => u._id === editingProject?.ownerId
// // // // // //                       )?.name || ""
// // // // // //                 }
// // // // // //                 disabled
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div>
// // // // // //               <Label>Add Members</Label>

// // // // // //               <Select
// // // // // //                 onValueChange={(v) =>
// // // // // //                   setEditMembers((prev) =>
// // // // // //                     prev.includes(v) ? prev : [...prev, v]
// // // // // //                   )
// // // // // //                 }
// // // // // //               >
// // // // // //                 <SelectTrigger>
// // // // // //                   <SelectValue placeholder="Select members" />
// // // // // //                 </SelectTrigger>

// // // // // //                 <SelectContent>
// // // // // //                   {users.map((u) => (
// // // // // //                     <SelectItem key={u._id} value={u._id}>
// // // // // //                       {u.name}
// // // // // //                     </SelectItem>
// // // // // //                   ))}
// // // // // //                 </SelectContent>
// // // // // //               </Select>

// // // // // //               <div className="flex gap-2 mt-2 flex-wrap">
// // // // // //                 {editMembers.map((id) => {
// // // // // //                   const u = users.find((x) => x._id === id);
// // // // // //                   return (
// // // // // //                     <span
// // // // // //                       key={id}
// // // // // //                       className="text-xs bg-gray-200 px-2 py-1 rounded"
// // // // // //                     >
// // // // // //                       {u?.name}
// // // // // //                     </span>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <DialogFooter>
// // // // // //             <Button onClick={updateProject}>Save</Button>
// // // // // //           </DialogFooter>
// // // // // //         </DialogContent>
// // // // // //       </Dialog>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // import { useEffect, useState, useCallback } from "react";
// // // // // import { Plus, Trash2, Pencil, LayoutGrid, List, Users, FolderOpen, ChevronUp, ChevronDown } from "lucide-react";
// // // // // import { Card } from "@/components/ui/card";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Label } from "@/components/ui/label";
// // // // // import { Textarea } from "@/components/ui/textarea";
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // import { toast } from "sonner";

// // // // // const API = "http://localhost:5000/api/projects";
// // // // // const BASE = "http://localhost:5000/api";

// // // // // const PALETTE = [
// // // // //   { accent: "#b89a5a", bg: "#f7f3eb", text: "#7a6030", label: "Amber"   },
// // // // //   { accent: "#5a7ab8", bg: "#ebf0f7", text: "#304470", label: "Sapphire" },
// // // // //   { accent: "#6db87a", bg: "#ebf5ed", text: "#2d6637", label: "Jade"    },
// // // // //   { accent: "#b85a7a", bg: "#f7ebef", text: "#703040", label: "Rose"    },
// // // // //   { accent: "#7a5ab8", bg: "#f0ebf7", text: "#442870", label: "Violet"  },
// // // // // ];

// // // // // function initials(name = "") {
// // // // //   return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
// // // // // }

// // // // // function Avatar({ name, size = 28, style = {} }) {
// // // // //   const pal = PALETTE[Math.abs(name.charCodeAt(0) - 65) % PALETTE.length];
// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         width: size, height: size, borderRadius: "50%",
// // // // //         background: pal.bg, color: pal.text,
// // // // //         display: "flex", alignItems: "center", justifyContent: "center",
// // // // //         fontSize: size * 0.36, fontWeight: 500, flexShrink: 0,
// // // // //         fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
// // // // //         ...style,
// // // // //       }}
// // // // //     >
// // // // //       {initials(name)}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function MemberTags({ members, onRemove }) {
// // // // //   if (!members.length) return null;
// // // // //   return (
// // // // //     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
// // // // //       {members.map((id) => (
// // // // //         <span
// // // // //           key={id}
// // // // //           style={{
// // // // //             fontSize: 11, background: "#0f0e0d", color: "#fff",
// // // // //             padding: "4px 10px", borderRadius: 20,
// // // // //             display: "flex", alignItems: "center", gap: 6,
// // // // //           }}
// // // // //         >
// // // // //           {id}
// // // // //           {onRemove && (
// // // // //             <span
// // // // //               onClick={() => onRemove(id)}
// // // // //               style={{ cursor: "pointer", opacity: 0.55, fontSize: 14, lineHeight: 1 }}
// // // // //             >×</span>
// // // // //           )}
// // // // //         </span>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── Card View ────────────────────────────────────────────────────────────────
// // // // // function CardView({ projects, users, currentUser, onEdit, onDelete }) {
// // // // //   if (!projects.length) {
// // // // //     return (
// // // // //       <div style={{ padding: "80px 32px", textAlign: "center", color: "#7a7673" }}>
// // // // //         <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.25 }} />
// // // // //         <p style={{ fontSize: 14, fontWeight: 300 }}>No projects yet. Create one to get started.</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         display: "grid",
// // // // //         gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// // // // //         gap: 1,
// // // // //         background: "#e8e4de",
// // // // //       }}
// // // // //     >
// // // // //       {projects.map((p, i) => {
// // // // //         const pal = PALETTE[i % PALETTE.length];
// // // // //         const manager = p.ownerId === currentUser?._id
// // // // //           ? currentUser?.name
// // // // //           : users.find((u) => u._id === p.ownerId)?.name || "—";
// // // // //         const memberCount = (p.members || []).filter((m) => m !== p.ownerId).length;

// // // // //         return (
// // // // //           <div
// // // // //             key={p._id}
// // // // //             className="project-card"
// // // // //             style={{
// // // // //               background: "#fff", padding: "24px 22px",
// // // // //               position: "relative", overflow: "hidden",
// // // // //               transition: "background 0.15s",
// // // // //             }}
// // // // //           >
// // // // //             {/* accent stripe */}
// // // // //             <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: pal.accent }} />

// // // // //             {/* monogram icon */}
// // // // //             <div style={{
// // // // //               width: 38, height: 38, borderRadius: 4, marginBottom: 16,
// // // // //               background: pal.bg, color: pal.text,
// // // // //               display: "flex", alignItems: "center", justifyContent: "center",
// // // // //               fontSize: 15, fontWeight: 500,
// // // // //               fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
// // // // //             }}>
// // // // //               {initials(p.name)}
// // // // //             </div>

// // // // //             <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#0f0e0d", marginBottom: 4, lineHeight: 1.25 }}>
// // // // //               {p.name}
// // // // //             </div>
// // // // //             <div style={{ fontSize: 12, color: "#7a7673", lineHeight: 1.55, fontWeight: 300, minHeight: 36 }}>
// // // // //               {p.description || "—"}
// // // // //             </div>

// // // // //             <div style={{
// // // // //               marginTop: 18, paddingTop: 14,
// // // // //               borderTop: "0.5px solid #e8e4de",
// // // // //               display: "flex", alignItems: "center", justifyContent: "space-between",
// // // // //             }}>
// // // // //               <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// // // // //                 <Avatar name={manager} size={22} />
// // // // //                 <span style={{ fontSize: 11, color: "#7a7673" }}>{manager}</span>
// // // // //               </div>
// // // // //               <span style={{
// // // // //                 fontSize: 10, color: "#7a7673",
// // // // //                 background: "#f2f0ec", padding: "3px 9px", borderRadius: 20,
// // // // //               }}>
// // // // //                 {memberCount} member{memberCount !== 1 ? "s" : ""}
// // // // //               </span>
// // // // //             </div>

// // // // //             {/* hover actions */}
// // // // //             <div className="card-actions" style={{
// // // // //               position: "absolute", bottom: 18, right: 18,
// // // // //               display: "flex", gap: 4,
// // // // //               opacity: 0, transition: "opacity 0.15s",
// // // // //             }}>
// // // // //               <button className="icon-btn" onClick={() => onEdit(p)} title="Edit">
// // // // //                 <Pencil size={13} />
// // // // //               </button>
// // // // //               <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete">
// // // // //                 <Trash2 size={13} />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         );
// // // // //       })}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── Table View ───────────────────────────────────────────────────────────────
// // // // // function TableView({ projects, users, currentUser, onEdit, onDelete }) {
// // // // //   const [sortKey, setSortKey] = useState("name");
// // // // //   const [sortDir, setSortDir] = useState("asc");

// // // // //   function toggleSort(key) {
// // // // //     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
// // // // //     else { setSortKey(key); setSortDir("asc"); }
// // // // //   }

// // // // //   const sorted = [...projects].sort((a, b) => {
// // // // //     let av = a[sortKey] || "";
// // // // //     let bv = b[sortKey] || "";
// // // // //     if (sortKey === "members") { av = (a.members || []).length; bv = (b.members || []).length; }
// // // // //     if (typeof av === "string") av = av.toLowerCase();
// // // // //     if (typeof bv === "string") bv = bv.toLowerCase();
// // // // //     if (av < bv) return sortDir === "asc" ? -1 : 1;
// // // // //     if (av > bv) return sortDir === "asc" ? 1 : -1;
// // // // //     return 0;
// // // // //   });

// // // // //   function SortIcon({ col }) {
// // // // //     if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />;
// // // // //     return sortDir === "asc" ? <ChevronUp size={11} style={{ color: "#b89a5a" }} /> : <ChevronDown size={11} style={{ color: "#b89a5a" }} />;
// // // // //   }

// // // // //   const thStyle = {
// // // // //     padding: "10px 16px",
// // // // //     fontSize: 10, fontWeight: 500, letterSpacing: "0.1em",
// // // // //     textTransform: "uppercase", color: "#7a7673",
// // // // //     background: "#faf9f7", borderBottom: "0.5px solid #e8e4de",
// // // // //     cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
// // // // //   };
// // // // //   const tdStyle = {
// // // // //     padding: "14px 16px", fontSize: 13,
// // // // //     color: "#0f0e0d", borderBottom: "0.5px solid #f2f0ec",
// // // // //     verticalAlign: "middle",
// // // // //   };

// // // // //   if (!projects.length) {
// // // // //     return (
// // // // //       <div style={{ padding: "80px 32px", textAlign: "center", color: "#7a7673" }}>
// // // // //         <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.25 }} />
// // // // //         <p style={{ fontSize: 14, fontWeight: 300 }}>No projects yet.</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div style={{ overflowX: "auto" }}>
// // // // //       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
// // // // //         <thead>
// // // // //           <tr>
// // // // //             {[
// // // // //               { key: "name", label: "Project" },
// // // // //               { key: "description", label: "Description" },
// // // // //               { key: "ownerId", label: "Manager" },
// // // // //               { key: "members", label: "Members" },
// // // // //               { key: null, label: "Actions" },
// // // // //             ].map(({ key, label }) => (
// // // // //               <th
// // // // //                 key={label}
// // // // //                 style={{ ...thStyle, cursor: key ? "pointer" : "default" }}
// // // // //                 onClick={() => key && toggleSort(key)}
// // // // //               >
// // // // //                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // // //                   {label}
// // // // //                   {key && <SortIcon col={key} />}
// // // // //                 </span>
// // // // //               </th>
// // // // //             ))}
// // // // //           </tr>
// // // // //         </thead>
// // // // //         <tbody>
// // // // //           {sorted.map((p, i) => {
// // // // //             const pal = PALETTE[i % PALETTE.length];
// // // // //             const manager = p.ownerId === currentUser?._id
// // // // //               ? currentUser?.name
// // // // //               : users.find((u) => u._id === p.ownerId)?.name || "—";
// // // // //             const memberNames = (p.members || [])
// // // // //               .filter((m) => m !== p.ownerId)
// // // // //               .map((id) => users.find((u) => u._id === id)?.name || id);

// // // // //             return (
// // // // //               <tr
// // // // //                 key={p._id}
// // // // //                 className="table-row"
// // // // //                 style={{ transition: "background 0.12s" }}
// // // // //               >
// // // // //                 {/* Project */}
// // // // //                 <td style={tdStyle}>
// // // // //                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // // // //                     <div style={{
// // // // //                       width: 30, height: 30, borderRadius: 4, flexShrink: 0,
// // // // //                       background: pal.bg, color: pal.text,
// // // // //                       display: "flex", alignItems: "center", justifyContent: "center",
// // // // //                       fontSize: 11, fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
// // // // //                     }}>
// // // // //                       {initials(p.name)}
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div>
// // // // //                       <div style={{ width: 28, height: 2, background: pal.accent, borderRadius: 2, marginTop: 3 }} />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </td>

// // // // //                 {/* Description */}
// // // // //                 <td style={{ ...tdStyle, color: "#7a7673", fontWeight: 300, maxWidth: 220 }}>
// // // // //                   <div style={{
// // // // //                     overflow: "hidden", textOverflow: "ellipsis",
// // // // //                     whiteSpace: "nowrap", maxWidth: 200,
// // // // //                   }}>
// // // // //                     {p.description || "—"}
// // // // //                   </div>
// // // // //                 </td>

// // // // //                 {/* Manager */}
// // // // //                 <td style={tdStyle}>
// // // // //                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // // //                     <Avatar name={manager} size={24} />
// // // // //                     <span style={{ fontSize: 13 }}>{manager}</span>
// // // // //                   </div>
// // // // //                 </td>

// // // // //                 {/* Members */}
// // // // //                 <td style={tdStyle}>
// // // // //                   {memberNames.length === 0 ? (
// // // // //                     <span style={{ color: "#b4b2a9", fontSize: 12 }}>No members</span>
// // // // //                   ) : (
// // // // //                     <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // // //                       <div style={{ display: "flex" }}>
// // // // //                         {memberNames.slice(0, 4).map((name, idx) => (
// // // // //                           <Avatar
// // // // //                             key={idx}
// // // // //                             name={name}
// // // // //                             size={24}
// // // // //                             style={{ marginLeft: idx > 0 ? -6 : 0, border: "1.5px solid #fff", zIndex: 10 - idx }}
// // // // //                           />
// // // // //                         ))}
// // // // //                       </div>
// // // // //                       {memberNames.length > 4 && (
// // // // //                         <span style={{ fontSize: 11, color: "#7a7673", marginLeft: 6 }}>+{memberNames.length - 4}</span>
// // // // //                       )}
// // // // //                       <span style={{ fontSize: 11, color: "#7a7673", marginLeft: 6 }}>
// // // // //                         {memberNames.length} member{memberNames.length !== 1 ? "s" : ""}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </td>

// // // // //                 {/* Actions */}
// // // // //                 <td style={{ ...tdStyle, width: 80 }}>
// // // // //                   <div style={{ display: "flex", gap: 4 }}>
// // // // //                     <button className="icon-btn" onClick={() => onEdit(p)} title="Edit">
// // // // //                       <Pencil size={13} />
// // // // //                     </button>
// // // // //                     <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete">
// // // // //                       <Trash2 size={13} />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             );
// // // // //           })}
// // // // //         </tbody>
// // // // //       </table>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // // // export default function Projects() {
// // // // //   const [projects, setProjects]     = useState([]);
// // // // //   const [users, setUsers]           = useState([]);
// // // // //   const [currentUser, setCurrentUser] = useState(null);
// // // // //   const [view, setView]             = useState("card"); // "card" | "table"
// // // // //   const [loading, setLoading]       = useState(true);

// // // // //   const [createOpen, setCreateOpen] = useState(false);
// // // // //   const [editOpen, setEditOpen]     = useState(false);
// // // // //   const [editingProject, setEditingProject] = useState(null);

// // // // //   const [name, setName]             = useState("");
// // // // //   const [desc, setDesc]             = useState("");
// // // // //   const [selectedMembers, setSelectedMembers] = useState([]);
// // // // //   const [editMembers, setEditMembers]         = useState([]);

// // // // //   const token = localStorage.getItem("token");

// // // // //   // ── Load ──────────────────────────────────────────────────────────────────
// // // // //   const loadProjects = useCallback(async () => {
// // // // //     try {
// // // // //       const res = await fetch(API);
// // // // //       const data = await res.json();
// // // // //       setProjects(data);
// // // // //     } catch {
// // // // //       toast.error("Failed to load projects");
// // // // //     }
// // // // //   }, []);

// // // // //   const getMe = useCallback(async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE}/auth/me`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       setCurrentUser(data);
// // // // //     } catch {
// // // // //       toast.error("Failed to load user");
// // // // //     }
// // // // //   }, [token]);

// // // // //   const fetchUsers = useCallback(async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE}/admin/users`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       setUsers(data.filter((u) => u.role === "Member"));
// // // // //     } catch {
// // // // //       toast.error("Failed to load users");
// // // // //     }
// // // // //   }, [token]);

// // // // //   useEffect(() => {
// // // // //     Promise.all([loadProjects(), getMe(), fetchUsers()]).finally(() =>
// // // // //       setLoading(false)
// // // // //     );
// // // // //   }, [loadProjects, getMe, fetchUsers]);

// // // // //   // ── Create ────────────────────────────────────────────────────────────────
// // // // //   const createProject = async (e) => {
// // // // //     e.preventDefault();
// // // // //     try {
// // // // //       const res = await fetch(API, {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           name,
// // // // //           description: desc,
// // // // //           color: PALETTE[projects.length % PALETTE.length].accent,
// // // // //           ownerId: currentUser._id,
// // // // //           members: [currentUser._id, ...selectedMembers],
// // // // //         }),
// // // // //       });
// // // // //       if (!res.ok) throw new Error();
// // // // //       const newProject = await res.json();
// // // // //       setProjects((prev) => [newProject, ...prev]);
// // // // //       setName(""); setDesc(""); setSelectedMembers([]);
// // // // //       setCreateOpen(false);
// // // // //       toast.success("Project created");
// // // // //     } catch {
// // // // //       toast.error("Create failed");
// // // // //     }
// // // // //   };

// // // // //   // ── Delete ────────────────────────────────────────────────────────────────
// // // // //   const deleteProject = async (id) => {
// // // // //     try {
// // // // //       await fetch(`${API}/${id}`, { method: "DELETE" });
// // // // //       setProjects((prev) => prev.filter((p) => p._id !== id));
// // // // //       toast.success("Project deleted");
// // // // //     } catch {
// // // // //       toast.error("Delete failed");
// // // // //     }
// // // // //   };

// // // // //   // ── Edit ──────────────────────────────────────────────────────────────────
// // // // //   const openEdit = (project) => {
// // // // //     setEditingProject(project);
// // // // //     setEditMembers(project.members.filter((m) => m !== project.ownerId));
// // // // //     setEditOpen(true);
// // // // //   };

// // // // //   const updateProject = async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${API}/${editingProject._id}`, {
// // // // //         method: "PUT",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           members: [editingProject.ownerId, ...editMembers],
// // // // //         }),
// // // // //       });
// // // // //       if (!res.ok) throw new Error();
// // // // //       toast.success("Project updated");
// // // // //       setEditOpen(false);
// // // // //       await loadProjects();
// // // // //     } catch {
// // // // //       toast.error("Update failed");
// // // // //     }
// // // // //   };

// // // // //   // ── Member selection helpers ───────────────────────────────────────────────
// // // // //   const addMember = (id) => {
// // // // //     if (id && !selectedMembers.includes(id))
// // // // //       setSelectedMembers((prev) => [...prev, id]);
// // // // //   };
// // // // //   const removeMember = (id) => setSelectedMembers((prev) => prev.filter((m) => m !== id));

// // // // //   const addEditMember = (id) => {
// // // // //     if (id && !editMembers.includes(id))
// // // // //       setEditMembers((prev) => [...prev, id]);
// // // // //   };
// // // // //   const removeEditMember = (id) => setEditMembers((prev) => prev.filter((m) => m !== id));

// // // // //   // ── Resolved names for tag display ────────────────────────────────────────
// // // // //   const resolveName = (id) => {
// // // // //     if (id === currentUser?._id) return currentUser.name;
// // // // //     return users.find((u) => u._id === id)?.name || id;
// // // // //   };

// // // // //   // ── UI ────────────────────────────────────────────────────────────────────
// // // // //   return (
// // // // //     <>
// // // // //       {/* Google Fonts */}
// // // // //       <style>{`
// // // // //         @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

// // // // //         .projects-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
// // // // //         .projects-root h1, .projects-root .serif { font-family: 'DM Serif Display', serif; }

// // // // //         .view-btn { background: transparent; border: 0.5px solid #e8e4de; border-radius: 4px; padding: 7px 9px; cursor: pointer; color: #7a7673; display:flex; align-items:center; transition: all 0.15s; }
// // // // //         .view-btn:hover { border-color: #b89a5a; color: #b89a5a; }
// // // // //         .view-btn.active { background: #0f0e0d; border-color: #0f0e0d; color: #fff; }

// // // // //         .project-card:hover { background: #faf9f7 !important; }
// // // // //         .project-card:hover .card-actions { opacity: 1 !important; }

// // // // //         .table-row:hover { background: #faf9f7; }

// // // // //         .icon-btn { width: 28px; height: 28px; border: 0.5px solid #e8e4de; background: #fff; border-radius: 4px; cursor: pointer; display:flex; align-items:center; justify-content:center; color:#7a7673; transition: all 0.15s; }
// // // // //         .icon-btn:hover { border-color: #7a7673; color: #0f0e0d; }
// // // // //         .icon-btn.danger:hover { border-color: #c0392b; color: #c0392b; }

// // // // //         .pm-input { width:100%; border:0.5px solid #e8e4de; border-radius:4px; padding:10px 12px; font-family:'DM Sans',sans-serif; font-size:14px; color:#0f0e0d; background:#faf9f7; outline:none; transition:border-color 0.15s; }
// // // // //         .pm-input:focus { border-color:#b89a5a; background:#fff; }
// // // // //         .pm-input:disabled { color:#7a7673; cursor:not-allowed; }
// // // // //         textarea.pm-input { resize:none; height:76px; line-height:1.55; }
// // // // //         .pm-label { font-size:10px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:#7a7673; margin-bottom:6px; }
// // // // //       `}</style>

// // // // //       <div className="projects-root" style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

// // // // //         {/* ── Page Header ── */}
// // // // //         <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
// // // // //           <div>
// // // // //             <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#b89a5a", marginBottom: 6 }}>
// // // // //               Workspace
// // // // //             </div>
// // // // //             <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: "#0f0e0d", lineHeight: 1.1, margin: 0 }}>
// // // // //               Projects
// // // // //             </h1>
// // // // //             <p style={{ fontSize: 13, color: "#7a7673", marginTop: 5, fontWeight: 300 }}>
// // // // //               Organize work into projects and track progress.
// // // // //             </p>
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={() => setCreateOpen(true)}
// // // // //             style={{
// // // // //               background: "#0f0e0d", color: "#fff", border: "none",
// // // // //               padding: "10px 20px", fontFamily: "'DM Sans', sans-serif",
// // // // //               fontSize: 12, fontWeight: 500, letterSpacing: "0.07em",
// // // // //               textTransform: "uppercase", borderRadius: 4, cursor: "pointer",
// // // // //               display: "flex", alignItems: "center", gap: 8, transition: "opacity 0.15s",
// // // // //             }}
// // // // //           >
// // // // //             <Plus size={13} style={{ opacity: 0.7 }} />
// // // // //             New project
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* ── Toolbar ── */}
// // // // //         <div style={{
// // // // //           display: "flex", alignItems: "center", justifyContent: "space-between",
// // // // //           borderTop: "0.5px solid #e8e4de", borderBottom: "0.5px solid #e8e4de",
// // // // //           padding: "12px 0", marginBottom: 0,
// // // // //         }}>
// // // // //           <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// // // // //             <span style={{ fontSize: 13, color: "#7a7673", fontWeight: 300 }}>
// // // // //               {loading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
// // // // //             </span>
// // // // //           </div>
// // // // //           <div style={{ display: "flex", gap: 4 }}>
// // // // //             <button className={`view-btn${view === "card" ? " active" : ""}`} onClick={() => setView("card")} title="Card view">
// // // // //               <LayoutGrid size={15} />
// // // // //             </button>
// // // // //             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view">
// // // // //               <List size={15} />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ── Main Content ── */}
// // // // //         <div style={{
// // // // //           border: "0.5px solid #e8e4de", borderTop: "none",
// // // // //           borderRadius: "0 0 8px 8px", overflow: "hidden",
// // // // //           background: view === "table" ? "#fff" : "transparent",
// // // // //         }}>
// // // // //           {loading ? (
// // // // //             <div style={{ padding: 60, textAlign: "center", color: "#7a7673", fontSize: 13 }}>
// // // // //               Loading projects…
// // // // //             </div>
// // // // //           ) : view === "card" ? (
// // // // //             <CardView
// // // // //               projects={projects}
// // // // //               users={users}
// // // // //               currentUser={currentUser}
// // // // //               onEdit={openEdit}
// // // // //               onDelete={deleteProject}
// // // // //             />
// // // // //           ) : (
// // // // //             <TableView
// // // // //               projects={projects}
// // // // //               users={users}
// // // // //               currentUser={currentUser}
// // // // //               onEdit={openEdit}
// // // // //               onDelete={deleteProject}
// // // // //             />
// // // // //           )}
// // // // //         </div>

// // // // //         {/* ── Create Dialog ── */}
// // // // //         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
// // // // //           <DialogContent style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 8, padding: 0, overflow: "hidden", border: "0.5px solid #e8e4de", maxWidth: 460 }}>
// // // // //             <div style={{ padding: "24px 28px 18px", borderBottom: "0.5px solid #e8e4de" }}>
// // // // //               <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#b89a5a", marginBottom: 4 }}>New</div>
// // // // //               <DialogTitle style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#0f0e0d", margin: 0 }}>Create Project</DialogTitle>
// // // // //             </div>

// // // // //             <form onSubmit={createProject}>
// // // // //               <div style={{ padding: "22px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
// // // // //                 <div>
// // // // //                   <div className="pm-label">Project name</div>
// // // // //                   <input className="pm-input" placeholder="e.g. Brand Refresh" value={name} onChange={(e) => setName(e.target.value)} required />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <div className="pm-label">Description</div>
// // // // //                   <textarea className="pm-input" placeholder="Brief overview…" value={desc} onChange={(e) => setDesc(e.target.value)} />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <div className="pm-label">Manager</div>
// // // // //                   <input className="pm-input" value={currentUser?.name || "Loading…"} disabled />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <div className="pm-label">Add members</div>
// // // // //                   <select
// // // // //                     className="pm-input"
// // // // //                     style={{ cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a7673' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
// // // // //                     value=""
// // // // //                     onChange={(e) => { addMember(e.target.value); e.target.value = ""; }}
// // // // //                   >
// // // // //                     <option value="">Select a member…</option>
// // // // //                     {users.filter((u) => !selectedMembers.includes(u._id)).map((u) => (
// // // // //                       <option key={u._id} value={u._id}>{u.name}</option>
// // // // //                     ))}
// // // // //                   </select>
// // // // //                   <MemberTags
// // // // //                     members={selectedMembers.map(resolveName)}
// // // // //                     onRemove={(name) => {
// // // // //                       const user = users.find((u) => u.name === name);
// // // // //                       if (user) removeMember(user._id);
// // // // //                     }}
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div style={{ padding: "14px 28px", borderTop: "0.5px solid #e8e4de", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // // // //                 <button type="button" onClick={() => setCreateOpen(false)} style={{ background: "transparent", border: "0.5px solid #e8e4de", borderRadius: 4, padding: "9px 18px", fontSize: 12, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", color: "#3a3835", transition: "border-color 0.15s" }}>Cancel</button>
// // // // //                 <button type="submit" style={{ background: "#0f0e0d", color: "#fff", border: "none", borderRadius: 4, padding: "9px 20px", fontSize: 12, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer" }}>Create</button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </DialogContent>
// // // // //         </Dialog>

// // // // //         {/* ── Edit Dialog ── */}
// // // // //         <Dialog open={editOpen} onOpenChange={setEditOpen}>
// // // // //           <DialogContent style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 8, padding: 0, overflow: "hidden", border: "0.5px solid #e8e4de", maxWidth: 460 }}>
// // // // //             <div style={{ padding: "24px 28px 18px", borderBottom: "0.5px solid #e8e4de" }}>
// // // // //               <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#b89a5a", marginBottom: 4 }}>Edit</div>
// // // // //               <DialogTitle style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#0f0e0d", margin: 0 }}>
// // // // //                 {editingProject?.name || "Edit Project"}
// // // // //               </DialogTitle>
// // // // //             </div>

// // // // //             <div style={{ padding: "22px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
// // // // //               <div>
// // // // //                 <div className="pm-label">Manager</div>
// // // // //                 <input
// // // // //                   className="pm-input"
// // // // //                   value={
// // // // //                     currentUser?._id === editingProject?.ownerId
// // // // //                       ? currentUser?.name
// // // // //                       : users.find((u) => u._id === editingProject?.ownerId)?.name || "—"
// // // // //                   }
// // // // //                   disabled
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <div className="pm-label">Members</div>
// // // // //                 <select
// // // // //                   className="pm-input"
// // // // //                   style={{ cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a7673' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
// // // // //                   value=""
// // // // //                   onChange={(e) => { addEditMember(e.target.value); e.target.value = ""; }}
// // // // //                 >
// // // // //                   <option value="">Add a member…</option>
// // // // //                   {users.filter((u) => !editMembers.includes(u._id)).map((u) => (
// // // // //                     <option key={u._id} value={u._id}>{u.name}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //                 <MemberTags
// // // // //                   members={editMembers.map(resolveName)}
// // // // //                   onRemove={(name) => {
// // // // //                     const user = users.find((u) => u.name === name);
// // // // //                     if (user) removeEditMember(user._id);
// // // // //                   }}
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div style={{ padding: "14px 28px", borderTop: "0.5px solid #e8e4de", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // // // //               <button onClick={() => setEditOpen(false)} style={{ background: "transparent", border: "0.5px solid #e8e4de", borderRadius: 4, padding: "9px 18px", fontSize: 12, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", color: "#3a3835" }}>Cancel</button>
// // // // //               <button onClick={updateProject} style={{ background: "#0f0e0d", color: "#fff", border: "none", borderRadius: 4, padding: "9px 20px", fontSize: 12, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer" }}>Save changes</button>
// // // // //             </div>
// // // // //           </DialogContent>
// // // // //         </Dialog>

// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }
// // // // import { useEffect, useState, useCallback } from "react";
// // // // import { Plus, Trash2, Pencil, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown } from "lucide-react";
// // // // import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// // // // import { toast } from "sonner";

// // // // const API  = "http://localhost:5000/api/projects";
// // // // const BASE = "http://localhost:5000/api";

// // // // // Purple palette — mirrors the sidebar accent
// // // // const PALETTE = [
// // // //   { accent: "#7c3aed", bg: "#f3f0ff", text: "#5b21b6" },
// // // //   { accent: "#2563eb", bg: "#eff6ff", text: "#1d4ed8" },
// // // //   { accent: "#059669", bg: "#ecfdf5", text: "#047857" },
// // // //   { accent: "#db2777", bg: "#fdf2f8", text: "#be185d" },
// // // //   { accent: "#d97706", bg: "#fffbeb", text: "#b45309" },
// // // // ];

// // // // function initials(name = "") {
// // // //   return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
// // // // }

// // // // function Avatar({ name = "", size = 28, style = {} }) {
// // // //   const pal = PALETTE[Math.abs((name.charCodeAt(0) || 65) - 65) % PALETTE.length];
// // // //   return (
// // // //     <div style={{
// // // //       width: size, height: size, borderRadius: "50%",
// // // //       background: pal.bg, color: pal.text,
// // // //       display: "flex", alignItems: "center", justifyContent: "center",
// // // //       fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
// // // //       ...style,
// // // //     }}>
// // // //       {initials(name)}
// // // //     </div>
// // // //   );
// // // // }

// // // // function MemberTags({ members, onRemove }) {
// // // //   if (!members.length) return null;
// // // //   return (
// // // //     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
// // // //       {members.map((id) => (
// // // //         <span key={id} style={{
// // // //           fontSize: 12, background: "#f3f0ff", color: "#5b21b6",
// // // //           padding: "3px 10px", borderRadius: 20,
// // // //           display: "flex", alignItems: "center", gap: 6,
// // // //           border: "1px solid #ddd6fe",
// // // //         }}>
// // // //           {id}
// // // //           {onRemove && (
// // // //             <span onClick={() => onRemove(id)}
// // // //               style={{ cursor: "pointer", opacity: 0.55, fontSize: 14, lineHeight: 1 }}>×</span>
// // // //           )}
// // // //         </span>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Card View ────────────────────────────────────────────────────────────────
// // // // function CardView({ projects, users, currentUser, onEdit, onDelete }) {
// // // //   if (!projects.length) return (
// // // //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// // // //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// // // //       <p style={{ fontSize: 14 }}>No projects yet. Create one to get started.</p>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div style={{
// // // //       display: "grid",
// // // //       gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// // // //       gap: 16, padding: 20,
// // // //     }}>
// // // //       {projects.map((p, i) => {
// // // //         const pal = PALETTE[i % PALETTE.length];
// // // //         const manager = p.ownerId === currentUser?._id
// // // //           ? currentUser?.name
// // // //           : users.find((u) => u._id === p.ownerId)?.name || "—";
// // // //         const memberCount = (p.members || []).filter((m) => m !== p.ownerId).length;

// // // //         return (
// // // //           <div key={p._id} className="project-card" style={{
// // // //             background: "#fff", borderRadius: 10,
// // // //             border: "1px solid #e5e7eb", padding: "18px 20px",
// // // //             position: "relative", overflow: "hidden",
// // // //             transition: "box-shadow 0.15s, border-color 0.15s",
// // // //           }}>
// // // //             {/* top accent line */}
// // // //             <div style={{
// // // //               position: "absolute", top: 0, left: 0, right: 0, height: 3,
// // // //               background: pal.accent, borderRadius: "10px 10px 0 0",
// // // //             }} />

// // // //             {/* monogram */}
// // // //             <div style={{
// // // //               width: 36, height: 36, borderRadius: 8,
// // // //               background: pal.bg, color: pal.text,
// // // //               display: "flex", alignItems: "center", justifyContent: "center",
// // // //               fontSize: 14, fontWeight: 700, marginBottom: 12,
// // // //             }}>
// // // //               {initials(p.name)}
// // // //             </div>

// // // //             <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
// // // //               {p.name}
// // // //             </div>
// // // //             <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, minHeight: 36 }}>
// // // //               {p.description || "—"}
// // // //             </div>

// // // //             <div style={{
// // // //               marginTop: 14, paddingTop: 12,
// // // //               borderTop: "1px solid #f3f4f6",
// // // //               display: "flex", alignItems: "center", justifyContent: "space-between",
// // // //             }}>
// // // //               <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// // // //                 <Avatar name={manager} size={22} />
// // // //                 <span style={{ fontSize: 12, color: "#6b7280" }}>{manager}</span>
// // // //               </div>
// // // //               <span style={{
// // // //                 fontSize: 11, color: "#6b7280",
// // // //                 background: "#f9fafb", border: "1px solid #e5e7eb",
// // // //                 padding: "2px 8px", borderRadius: 20,
// // // //               }}>
// // // //                 {memberCount} member{memberCount !== 1 ? "s" : ""}
// // // //               </span>
// // // //             </div>

// // // //             {/* hover actions */}
// // // //             <div className="card-actions" style={{
// // // //               position: "absolute", bottom: 14, right: 14,
// // // //               display: "flex", gap: 4, opacity: 0, transition: "opacity 0.15s",
// // // //             }}>
// // // //               <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// // // //               <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// // // //             </div>
// // // //           </div>
// // // //         );
// // // //       })}
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Table View ───────────────────────────────────────────────────────────────
// // // // function TableView({ projects, users, currentUser, onEdit, onDelete }) {
// // // //   const [sortKey, setSortKey] = useState("name");
// // // //   const [sortDir, setSortDir] = useState("asc");

// // // //   function toggleSort(key) {
// // // //     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
// // // //     else { setSortKey(key); setSortDir("asc"); }
// // // //   }

// // // //   const sorted = [...projects].sort((a, b) => {
// // // //     let av = sortKey === "members" ? (a.members || []).length : (a[sortKey] || "");
// // // //     let bv = sortKey === "members" ? (b.members || []).length : (b[sortKey] || "");
// // // //     if (typeof av === "string") av = av.toLowerCase();
// // // //     if (typeof bv === "string") bv = bv.toLowerCase();
// // // //     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
// // // //   });

// // // //   function SortIcon({ col }) {
// // // //     if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />;
// // // //     return sortDir === "asc"
// // // //       ? <ChevronUp size={11} style={{ color: "#7c3aed" }} />
// // // //       : <ChevronDown size={11} style={{ color: "#7c3aed" }} />;
// // // //   }

// // // //   const thStyle = {
// // // //     padding: "10px 16px", fontSize: 11, fontWeight: 600,
// // // //     letterSpacing: "0.05em", textTransform: "uppercase",
// // // //     color: "#9ca3af", background: "#f9fafb",
// // // //     borderBottom: "1px solid #e5e7eb",
// // // //     cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
// // // //   };
// // // //   const tdStyle = {
// // // //     padding: "13px 16px", fontSize: 13, color: "#111827",
// // // //     borderBottom: "1px solid #f3f4f6", verticalAlign: "middle",
// // // //   };

// // // //   if (!projects.length) return (
// // // //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// // // //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// // // //       <p style={{ fontSize: 14 }}>No projects yet.</p>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div style={{ overflowX: "auto" }}>
// // // //       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
// // // //         <thead>
// // // //           <tr>
// // // //             {[
// // // //               { key: "name",        label: "Project"     },
// // // //               { key: "description", label: "Description" },
// // // //               { key: "ownerId",     label: "Manager"     },
// // // //               { key: "members",     label: "Members"     },
// // // //               { key: null,          label: "Actions"     },
// // // //             ].map(({ key, label }) => (
// // // //               <th key={label}
// // // //                 style={{ ...thStyle, cursor: key ? "pointer" : "default" }}
// // // //                 onClick={() => key && toggleSort(key)}
// // // //               >
// // // //                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // //                   {label}{key && <SortIcon col={key} />}
// // // //                 </span>
// // // //               </th>
// // // //             ))}
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {sorted.map((p, i) => {
// // // //             const pal = PALETTE[i % PALETTE.length];
// // // //             const manager = p.ownerId === currentUser?._id
// // // //               ? currentUser?.name
// // // //               : users.find((u) => u._id === p.ownerId)?.name || "—";
// // // //             const memberNames = (p.members || [])
// // // //               .filter((m) => m !== p.ownerId)
// // // //               .map((id) => users.find((u) => u._id === id)?.name || id);

// // // //             return (
// // // //               <tr key={p._id} className="table-row" style={{ transition: "background 0.1s" }}>
// // // //                 <td style={tdStyle}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // // //                     <div style={{
// // // //                       width: 32, height: 32, borderRadius: 7, flexShrink: 0,
// // // //                       background: pal.bg, color: pal.text,
// // // //                       display: "flex", alignItems: "center", justifyContent: "center",
// // // //                       fontSize: 12, fontWeight: 700,
// // // //                     }}>{initials(p.name)}</div>
// // // //                     <span style={{ fontWeight: 500 }}>{p.name}</span>
// // // //                   </div>
// // // //                 </td>
// // // //                 <td style={{ ...tdStyle, color: "#6b7280", maxWidth: 220 }}>
// // // //                   <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
// // // //                     {p.description || "—"}
// // // //                   </div>
// // // //                 </td>
// // // //                 <td style={tdStyle}>
// // // //                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // // //                     <Avatar name={manager} size={26} />
// // // //                     <span>{manager}</span>
// // // //                   </div>
// // // //                 </td>
// // // //                 <td style={tdStyle}>
// // // //                   {memberNames.length === 0 ? (
// // // //                     <span style={{ color: "#d1d5db", fontSize: 12 }}>No members</span>
// // // //                   ) : (
// // // //                     <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // // //                       <div style={{ display: "flex" }}>
// // // //                         {memberNames.slice(0, 4).map((name, idx) => (
// // // //                           <Avatar key={idx} name={name} size={26}
// // // //                             style={{ marginLeft: idx > 0 ? -8 : 0, border: "2px solid #fff", zIndex: 10 - idx }}
// // // //                           />
// // // //                         ))}
// // // //                       </div>
// // // //                       {memberNames.length > 4 && (
// // // //                         <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>+{memberNames.length - 4}</span>
// // // //                       )}
// // // //                       <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
// // // //                         {memberNames.length} member{memberNames.length !== 1 ? "s" : ""}
// // // //                       </span>
// // // //                     </div>
// // // //                   )}
// // // //                 </td>
// // // //                 <td style={{ ...tdStyle, width: 80 }}>
// // // //                   <div style={{ display: "flex", gap: 4 }}>
// // // //                     <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// // // //                     <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// // // //                   </div>
// // // //                 </td>
// // // //               </tr>
// // // //             );
// // // //           })}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // // export default function Projects() {
// // // //   const [projects,       setProjects]       = useState([]);
// // // //   const [users,          setUsers]          = useState([]);
// // // //   const [currentUser,    setCurrentUser]    = useState(null);
// // // //   const [view,           setView]           = useState("card");
// // // //   const [loading,        setLoading]        = useState(true);
// // // //   const [createOpen,     setCreateOpen]     = useState(false);
// // // //   const [editOpen,       setEditOpen]       = useState(false);
// // // //   const [editingProject, setEditingProject] = useState(null);
// // // //   const [name,           setName]           = useState("");
// // // //   const [desc,           setDesc]           = useState("");
// // // //   const [selectedMembers, setSelectedMembers] = useState([]);
// // // //   const [editMembers,    setEditMembers]    = useState([]);

// // // //   const token = localStorage.getItem("token");

// // // //   const loadProjects = useCallback(async () => {
// // // //     try {
// // // //       const res  = await fetch(API);
// // // //       const data = await res.json();
// // // //       setProjects(data);
// // // //     } catch { toast.error("Failed to load projects"); }
// // // //   }, []);

// // // //   const getMe = useCallback(async () => {
// // // //     try {
// // // //       const res  = await fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
// // // //       const data = await res.json();
// // // //       setCurrentUser(data);
// // // //     } catch { toast.error("Failed to load user"); }
// // // //   }, [token]);

// // // //   const fetchUsers = useCallback(async () => {
// // // //     try {
// // // //       const res  = await fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
// // // //       const data = await res.json();
// // // //       setUsers(data.filter((u) => u.role === "Member"));
// // // //     } catch { toast.error("Failed to load users"); }
// // // //   }, [token]);

// // // //   useEffect(() => {
// // // //     Promise.all([loadProjects(), getMe(), fetchUsers()]).finally(() => setLoading(false));
// // // //   }, [loadProjects, getMe, fetchUsers]);

// // // //   const createProject = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const res = await fetch(API, {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           name, description: desc,
// // // //           color: PALETTE[projects.length % PALETTE.length].accent,
// // // //           ownerId: currentUser._id,
// // // //           members: [currentUser._id, ...selectedMembers],
// // // //         }),
// // // //       });
// // // //       if (!res.ok) throw new Error();
// // // //       const newProject = await res.json();
// // // //       setProjects((prev) => [newProject, ...prev]);
// // // //       setName(""); setDesc(""); setSelectedMembers([]);
// // // //       setCreateOpen(false);
// // // //       toast.success("Project created");
// // // //     } catch { toast.error("Create failed"); }
// // // //   };

// // // //   const deleteProject = async (id) => {
// // // //     try {
// // // //       await fetch(`${API}/${id}`, { method: "DELETE" });
// // // //       setProjects((prev) => prev.filter((p) => p._id !== id));
// // // //       toast.success("Project deleted");
// // // //     } catch { toast.error("Delete failed"); }
// // // //   };

// // // //   const openEdit = (project) => {
// // // //     setEditingProject(project);
// // // //     setEditMembers(project.members.filter((m) => m !== project.ownerId));
// // // //     setEditOpen(true);
// // // //   };

// // // //   const updateProject = async () => {
// // // //     try {
// // // //       const res = await fetch(`${API}/${editingProject._id}`, {
// // // //         method: "PUT",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ members: [editingProject.ownerId, ...editMembers] }),
// // // //       });
// // // //       if (!res.ok) throw new Error();
// // // //       toast.success("Project updated");
// // // //       setEditOpen(false);
// // // //       await loadProjects();
// // // //     } catch { toast.error("Update failed"); }
// // // //   };

// // // //   const addMember    = (id) => { if (id && !selectedMembers.includes(id)) setSelectedMembers((p) => [...p, id]); };
// // // //   const removeMember = (id) => setSelectedMembers((p) => p.filter((m) => m !== id));
// // // //   const addEditMember    = (id) => { if (id && !editMembers.includes(id)) setEditMembers((p) => [...p, id]); };
// // // //   const removeEditMember = (id) => setEditMembers((p) => p.filter((m) => m !== id));
// // // //   const resolveName  = (id) => {
// // // //     if (id === currentUser?._id) return currentUser.name;
// // // //     return users.find((u) => u._id === id)?.name || id;
// // // //   };

// // // //   // Shared dialog input styles
// // // //   const inputStyle = {
// // // //     width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
// // // //     padding: "9px 12px", fontSize: 14, color: "#111827",
// // // //     background: "#f9fafb", outline: "none", fontFamily: "inherit",
// // // //     transition: "border-color 0.15s, box-shadow 0.15s",
// // // //   };
// // // //   const labelStyle = {
// // // //     fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block",
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <style>{`
// // // //         .projects-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

// // // //         .view-btn {
// // // //           background: transparent; border: 1px solid #e5e7eb; border-radius: 7px;
// // // //           padding: 6px 9px; cursor: pointer; color: #9ca3af;
// // // //           display: flex; align-items: center; transition: all 0.15s;
// // // //         }
// // // //         .view-btn:hover { border-color: #7c3aed; color: #7c3aed; }
// // // //         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

// // // //         .project-card:hover {
// // // //           box-shadow: 0 4px 16px rgba(0,0,0,0.08);
// // // //           border-color: #c4b5fd !important;
// // // //         }
// // // //         .project-card:hover .card-actions { opacity: 1 !important; }

// // // //         .table-row:hover { background: #fafafa; }

// // // //         .icon-btn {
// // // //           width: 28px; height: 28px; border: 1px solid #e5e7eb; background: #fff;
// // // //           border-radius: 6px; cursor: pointer; display: flex; align-items: center;
// // // //           justify-content: center; color: #9ca3af; transition: all 0.15s;
// // // //         }
// // // //         .icon-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f3f0ff; }
// // // //         .icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

// // // //         .pm-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
// // // //       `}</style>

// // // //       <div className="projects-root" style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

// // // //         {/* ── Page Header ── */}
// // // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
// // // //           <div>
// // // //             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>
// // // //               Workspace
// // // //             </div>
// // // //             <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
// // // //               Projects
// // // //             </h1>
// // // //             <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
// // // //               Organize work into projects and track progress.
// // // //             </p>
// // // //           </div>
// // // //           <button
// // // //             onClick={() => setCreateOpen(true)}
// // // //             style={{
// // // //               background: "#7c3aed", color: "#fff", border: "none",
// // // //               padding: "9px 18px", fontSize: 13, fontWeight: 600,
// // // //               borderRadius: 8, cursor: "pointer",
// // // //               display: "flex", alignItems: "center", gap: 7,
// // // //               transition: "background 0.15s, box-shadow 0.15s",
// // // //               boxShadow: "0 1px 4px rgba(124,58,237,0.3)",
// // // //             }}
// // // //             onMouseEnter={(e) => e.currentTarget.style.background = "#6d28d9"}
// // // //             onMouseLeave={(e) => e.currentTarget.style.background = "#7c3aed"}
// // // //           >
// // // //             <Plus size={15} /> New Project
// // // //           </button>
// // // //         </div>

// // // //         {/* ── Toolbar ── */}
// // // //         <div style={{
// // // //           display: "flex", alignItems: "center", justifyContent: "space-between",
// // // //           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
// // // //           padding: "10px 0", marginBottom: 0, background: "#fff",
// // // //         }}>
// // // //           <span style={{ fontSize: 13, color: "#6b7280" }}>
// // // //             {loading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
// // // //           </span>
// // // //           <div style={{ display: "flex", gap: 6 }}>
// // // //             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={15} /></button>
// // // //             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={15} /></button>
// // // //           </div>
// // // //         </div>

// // // //         {/* ── Main Content ── */}
// // // //         <div style={{
// // // //           border: "1px solid #e5e7eb", borderTop: "none",
// // // //           borderRadius: "0 0 10px 10px", overflow: "hidden",
// // // //           background: "#fff",
// // // //         }}>
// // // //           {loading ? (
// // // //             <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading projects…</div>
// // // //           ) : view === "card" ? (
// // // //             <CardView projects={projects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} />
// // // //           ) : (
// // // //             <TableView projects={projects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} />
// // // //           )}
// // // //         </div>

// // // //         {/* ── Create Dialog ── */}
// // // //         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
// // // //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// // // //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// // // //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
// // // //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Project</DialogTitle>
// // // //             </div>

// // // //             <form onSubmit={createProject}>
// // // //               <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// // // //                 <div>
// // // //                   <label style={labelStyle}>Project name</label>
// // // //                   <input className="pm-input" style={inputStyle} placeholder="e.g. Brand Refresh"
// // // //                     value={name} onChange={(e) => setName(e.target.value)} required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label style={labelStyle}>Description</label>
// // // //                   <textarea className="pm-input" style={{ ...inputStyle, resize: "none", height: 76, lineHeight: 1.55 }}
// // // //                     placeholder="Brief overview…" value={desc} onChange={(e) => setDesc(e.target.value)} />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label style={labelStyle}>Manager</label>
// // // //                   <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// // // //                     value={currentUser?.name || "Loading…"} disabled />
// // // //                 </div>
// // // //                 <div>
// // // //                   <label style={labelStyle}>Add members</label>
// // // //                   <select className="pm-input" style={{
// // // //                     ...inputStyle, cursor: "pointer", appearance: "none",
// // // //                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// // // //                     backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// // // //                   }}
// // // //                     value="" onChange={(e) => { addMember(e.target.value); e.target.value = ""; }}
// // // //                   >
// // // //                     <option value="">Select a member…</option>
// // // //                     {users.filter((u) => !selectedMembers.includes(u._id)).map((u) => (
// // // //                       <option key={u._id} value={u._id}>{u.name}</option>
// // // //                     ))}
// // // //                   </select>
// // // //                   <MemberTags
// // // //                     members={selectedMembers.map(resolveName)}
// // // //                     onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeMember(u._id); }}
// // // //                   />
// // // //                 </div>
// // // //               </div>
// // // //               <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // // //                 <button type="button" onClick={() => setCreateOpen(false)} style={{
// // // //                   background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// // // //                   padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// // // //                 }}>Cancel</button>
// // // //                 <button type="submit" style={{
// // // //                   background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// // // //                   padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// // // //                 }}>Create</button>
// // // //               </div>
// // // //             </form>
// // // //           </DialogContent>
// // // //         </Dialog>

// // // //         {/* ── Edit Dialog ── */}
// // // //         <Dialog open={editOpen} onOpenChange={setEditOpen}>
// // // //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// // // //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// // // //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>Edit</div>
// // // //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
// // // //                 {editingProject?.name || "Edit Project"}
// // // //               </DialogTitle>
// // // //             </div>

// // // //             <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// // // //               <div>
// // // //                 <label style={labelStyle}>Manager</label>
// // // //                 <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// // // //                   value={
// // // //                     currentUser?._id === editingProject?.ownerId
// // // //                       ? currentUser?.name
// // // //                       : users.find((u) => u._id === editingProject?.ownerId)?.name || "—"
// // // //                   } disabled />
// // // //               </div>
// // // //               <div>
// // // //                 <label style={labelStyle}>Members</label>
// // // //                 <select className="pm-input" style={{
// // // //                   ...inputStyle, cursor: "pointer", appearance: "none",
// // // //                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// // // //                   backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// // // //                 }}
// // // //                   value="" onChange={(e) => { addEditMember(e.target.value); e.target.value = ""; }}
// // // //                 >
// // // //                   <option value="">Add a member…</option>
// // // //                   {users.filter((u) => !editMembers.includes(u._id)).map((u) => (
// // // //                     <option key={u._id} value={u._id}>{u.name}</option>
// // // //                   ))}
// // // //                 </select>
// // // //                 <MemberTags
// // // //                   members={editMembers.map(resolveName)}
// // // //                   onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeEditMember(u._id); }}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // // //               <button onClick={() => setEditOpen(false)} style={{
// // // //                 background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// // // //                 padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// // // //               }}>Cancel</button>
// // // //               <button onClick={updateProject} style={{
// // // //                 background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// // // //                 padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// // // //               }}>Save changes</button>
// // // //             </div>
// // // //           </DialogContent>
// // // //         </Dialog>

// // // //       </div>
// // // //     </>
// // // //   );
// // // // }
// // // import { useEffect, useState, useCallback } from "react";
// // // import { Plus, Trash2, Pencil, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown } from "lucide-react";
// // // import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// // // import { toast } from "sonner";

// // // const API  = "http://localhost:5000/api/projects";
// // // const BASE = "http://localhost:5000/api";

// // // // Purple palette — mirrors the sidebar accent
// // // const PALETTE = [
// // //   { accent: "#7c3aed", bg: "#f3f0ff", text: "#5b21b6" },
// // //   { accent: "#2563eb", bg: "#eff6ff", text: "#1d4ed8" },
// // //   { accent: "#059669", bg: "#ecfdf5", text: "#047857" },
// // //   { accent: "#db2777", bg: "#fdf2f8", text: "#be185d" },
// // //   { accent: "#d97706", bg: "#fffbeb", text: "#b45309" },
// // // ];

// // // function initials(name = "") {
// // //   return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
// // // }

// // // function Avatar({ name = "", size = 28, style = {} }) {
// // //   const pal = PALETTE[Math.abs((name.charCodeAt(0) || 65) - 65) % PALETTE.length];
// // //   return (
// // //     <div style={{
// // //       width: size, height: size, borderRadius: "50%",
// // //       background: pal.bg, color: pal.text,
// // //       display: "flex", alignItems: "center", justifyContent: "center",
// // //       fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
// // //       ...style,
// // //     }}>
// // //       {initials(name)}
// // //     </div>
// // //   );
// // // }

// // // function MemberTags({ members, onRemove }) {
// // //   if (!members.length) return null;
// // //   return (
// // //     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
// // //       {members.map((id) => (
// // //         <span key={id} style={{
// // //           fontSize: 12, background: "#f3f0ff", color: "#5b21b6",
// // //           padding: "3px 10px", borderRadius: 20,
// // //           display: "flex", alignItems: "center", gap: 6,
// // //           border: "1px solid #ddd6fe",
// // //         }}>
// // //           {id}
// // //           {onRemove && (
// // //             <span onClick={() => onRemove(id)}
// // //               style={{ cursor: "pointer", opacity: 0.55, fontSize: 14, lineHeight: 1 }}>×</span>
// // //           )}
// // //         </span>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // // ─── Card View ────────────────────────────────────────────────────────────────
// // // function CardView({ projects, users, currentUser, onEdit, onDelete }) {
// // //   if (!projects.length) return (
// // //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// // //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// // //       <p style={{ fontSize: 14 }}>No projects yet. Create one to get started.</p>
// // //     </div>
// // //   );

// // //   return (
// // //     <div style={{
// // //       display: "grid",
// // //       gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// // //       gap: 16, padding: 20,
// // //     }}>
// // //       {projects.map((p, i) => {
// // //         const pal = PALETTE[i % PALETTE.length];
// // //         const manager = p.ownerId === currentUser?._id
// // //           ? currentUser?.name
// // //           : users.find((u) => u._id === p.ownerId)?.name || "—";
// // //         const memberCount = (p.members || []).filter((m) => m !== p.ownerId).length;

// // //         return (
// // //           <div key={p._id} className="project-card" style={{
// // //             background: "#fff", borderRadius: 10,
// // //             border: "1px solid #e5e7eb", padding: "18px 20px",
// // //             position: "relative", overflow: "hidden",
// // //             transition: "box-shadow 0.15s, border-color 0.15s",
// // //           }}>
// // //             {/* top accent line */}
// // //             <div style={{
// // //               position: "absolute", top: 0, left: 0, right: 0, height: 3,
// // //               background: pal.accent, borderRadius: "10px 10px 0 0",
// // //             }} />

// // //             {/* monogram */}
// // //             <div style={{
// // //               width: 36, height: 36, borderRadius: 8,
// // //               background: pal.bg, color: pal.text,
// // //               display: "flex", alignItems: "center", justifyContent: "center",
// // //               fontSize: 14, fontWeight: 700, marginBottom: 12,
// // //             }}>
// // //               {initials(p.name)}
// // //             </div>

// // //             <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
// // //               {p.name}
// // //             </div>
// // //             <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, minHeight: 36 }}>
// // //               {p.description || "—"}
// // //             </div>

// // //             <div style={{
// // //               marginTop: 14, paddingTop: 12,
// // //               borderTop: "1px solid #f3f4f6",
// // //               display: "flex", alignItems: "center", justifyContent: "space-between",
// // //             }}>
// // //               <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// // //                 <Avatar name={manager} size={22} />
// // //                 <span style={{ fontSize: 12, color: "#6b7280" }}>{manager}</span>
// // //               </div>
// // //               <span style={{
// // //                 fontSize: 11, color: "#6b7280",
// // //                 background: "#f9fafb", border: "1px solid #e5e7eb",
// // //                 padding: "2px 8px", borderRadius: 20,
// // //               }}>
// // //                 {memberCount} member{memberCount !== 1 ? "s" : ""}
// // //               </span>
// // //             </div>

// // //             {/* hover actions — top-right, never covers footer */}
// // //             <div className="card-actions" style={{
// // //               position: "absolute", top: 12, right: 12,
// // //               display: "flex", gap: 4, opacity: 0, transition: "opacity 0.15s",
// // //             }}>
// // //               <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// // //               <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// // //             </div>
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // }

// // // // ─── Table View ───────────────────────────────────────────────────────────────
// // // function TableView({ projects, users, currentUser, onEdit, onDelete }) {
// // //   const [sortKey, setSortKey] = useState("name");
// // //   const [sortDir, setSortDir] = useState("asc");

// // //   function toggleSort(key) {
// // //     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
// // //     else { setSortKey(key); setSortDir("asc"); }
// // //   }

// // //   const sorted = [...projects].sort((a, b) => {
// // //     let av = sortKey === "members" ? (a.members || []).length : (a[sortKey] || "");
// // //     let bv = sortKey === "members" ? (b.members || []).length : (b[sortKey] || "");
// // //     if (typeof av === "string") av = av.toLowerCase();
// // //     if (typeof bv === "string") bv = bv.toLowerCase();
// // //     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
// // //   });

// // //   function SortIcon({ col }) {
// // //     if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />;
// // //     return sortDir === "asc"
// // //       ? <ChevronUp size={11} style={{ color: "#7c3aed" }} />
// // //       : <ChevronDown size={11} style={{ color: "#7c3aed" }} />;
// // //   }

// // //   const thStyle = {
// // //     padding: "10px 16px", fontSize: 11, fontWeight: 600,
// // //     letterSpacing: "0.05em", textTransform: "uppercase",
// // //     color: "#9ca3af", background: "#f9fafb",
// // //     borderBottom: "1px solid #e5e7eb",
// // //     cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
// // //   };
// // //   const tdStyle = {
// // //     padding: "13px 16px", fontSize: 13, color: "#111827",
// // //     borderBottom: "1px solid #f3f4f6", verticalAlign: "middle",
// // //   };

// // //   if (!projects.length) return (
// // //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// // //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// // //       <p style={{ fontSize: 14 }}>No projects yet.</p>
// // //     </div>
// // //   );

// // //   return (
// // //     <div style={{ overflowX: "auto" }}>
// // //       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
// // //         <thead>
// // //           <tr>
// // //             {[
// // //               { key: "name",        label: "Project"     },
// // //               { key: "description", label: "Description" },
// // //               { key: "ownerId",     label: "Manager"     },
// // //               { key: "members",     label: "Members"     },
// // //               { key: null,          label: "Actions"     },
// // //             ].map(({ key, label }) => (
// // //               <th key={label}
// // //                 style={{ ...thStyle, cursor: key ? "pointer" : "default" }}
// // //                 onClick={() => key && toggleSort(key)}
// // //               >
// // //                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // //                   {label}{key && <SortIcon col={key} />}
// // //                 </span>
// // //               </th>
// // //             ))}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {sorted.map((p, i) => {
// // //             const pal = PALETTE[i % PALETTE.length];
// // //             const manager = p.ownerId === currentUser?._id
// // //               ? currentUser?.name
// // //               : users.find((u) => u._id === p.ownerId)?.name || "—";
// // //             const memberNames = (p.members || [])
// // //               .filter((m) => m !== p.ownerId)
// // //               .map((id) => users.find((u) => u._id === id)?.name || id);

// // //             return (
// // //               <tr key={p._id} className="table-row" style={{ transition: "background 0.1s" }}>
// // //                 <td style={tdStyle}>
// // //                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// // //                     <div style={{
// // //                       width: 32, height: 32, borderRadius: 7, flexShrink: 0,
// // //                       background: pal.bg, color: pal.text,
// // //                       display: "flex", alignItems: "center", justifyContent: "center",
// // //                       fontSize: 12, fontWeight: 700,
// // //                     }}>{initials(p.name)}</div>
// // //                     <span style={{ fontWeight: 500 }}>{p.name}</span>
// // //                   </div>
// // //                 </td>
// // //                 <td style={{ ...tdStyle, color: "#6b7280", maxWidth: 220 }}>
// // //                   <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
// // //                     {p.description || "—"}
// // //                   </div>
// // //                 </td>
// // //                 <td style={tdStyle}>
// // //                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //                     <Avatar name={manager} size={26} />
// // //                     <span>{manager}</span>
// // //                   </div>
// // //                 </td>
// // //                 <td style={tdStyle}>
// // //                   {memberNames.length === 0 ? (
// // //                     <span style={{ color: "#d1d5db", fontSize: 12 }}>No members</span>
// // //                   ) : (
// // //                     <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// // //                       <div style={{ display: "flex" }}>
// // //                         {memberNames.slice(0, 4).map((name, idx) => (
// // //                           <Avatar key={idx} name={name} size={26}
// // //                             style={{ marginLeft: idx > 0 ? -8 : 0, border: "2px solid #fff", zIndex: 10 - idx }}
// // //                           />
// // //                         ))}
// // //                       </div>
// // //                       {memberNames.length > 4 && (
// // //                         <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>+{memberNames.length - 4}</span>
// // //                       )}
// // //                       <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
// // //                         {memberNames.length} member{memberNames.length !== 1 ? "s" : ""}
// // //                       </span>
// // //                     </div>
// // //                   )}
// // //                 </td>
// // //                 <td style={{ ...tdStyle, width: 80 }}>
// // //                   <div style={{ display: "flex", gap: 4 }}>
// // //                     <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// // //                     <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             );
// // //           })}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }

// // // // ─── Main Component ───────────────────────────────────────────────────────────
// // // export default function Projects() {
// // //   const [projects,       setProjects]       = useState([]);
// // //   const [users,          setUsers]          = useState([]);
// // //   const [currentUser,    setCurrentUser]    = useState(null);
// // //   const [view,           setView]           = useState("card");
// // //   const [loading,        setLoading]        = useState(true);
// // //   const [createOpen,     setCreateOpen]     = useState(false);
// // //   const [editOpen,       setEditOpen]       = useState(false);
// // //   const [editingProject, setEditingProject] = useState(null);
// // //   const [name,           setName]           = useState("");
// // //   const [desc,           setDesc]           = useState("");
// // //   const [selectedMembers, setSelectedMembers] = useState([]);
// // //   const [editMembers,    setEditMembers]    = useState([]);

// // //   const token = localStorage.getItem("token");

// // //   const loadProjects = useCallback(async () => {
// // //     try {
// // //       const res  = await fetch(API);
// // //       const data = await res.json();
// // //       setProjects(data);
// // //     } catch { toast.error("Failed to load projects"); }
// // //   }, []);

// // //   const getMe = useCallback(async () => {
// // //     try {
// // //       const res  = await fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
// // //       const data = await res.json();
// // //       setCurrentUser(data);
// // //     } catch { toast.error("Failed to load user"); }
// // //   }, [token]);

// // //   const fetchUsers = useCallback(async () => {
// // //     try {
// // //       const res  = await fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
// // //       const data = await res.json();
// // //       setUsers(data.filter((u) => u.role === "Member"));
// // //     } catch { toast.error("Failed to load users"); }
// // //   }, [token]);

// // //   useEffect(() => {
// // //     Promise.all([loadProjects(), getMe(), fetchUsers()]).finally(() => setLoading(false));
// // //   }, [loadProjects, getMe, fetchUsers]);

// // //   const createProject = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const res = await fetch(API, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           name, description: desc,
// // //           color: PALETTE[projects.length % PALETTE.length].accent,
// // //           ownerId: currentUser._id,
// // //           members: [currentUser._id, ...selectedMembers],
// // //         }),
// // //       });
// // //       if (!res.ok) throw new Error();
// // //       const newProject = await res.json();
// // //       setProjects((prev) => [newProject, ...prev]);
// // //       setName(""); setDesc(""); setSelectedMembers([]);
// // //       setCreateOpen(false);
// // //       toast.success("Project created");
// // //     } catch { toast.error("Create failed"); }
// // //   };

// // //   const deleteProject = async (id) => {
// // //     try {
// // //       await fetch(`${API}/${id}`, { method: "DELETE" });
// // //       setProjects((prev) => prev.filter((p) => p._id !== id));
// // //       toast.success("Project deleted");
// // //     } catch { toast.error("Delete failed"); }
// // //   };

// // //   const openEdit = (project) => {
// // //     setEditingProject(project);
// // //     setEditMembers(project.members.filter((m) => m !== project.ownerId));
// // //     setEditOpen(true);
// // //   };

// // //   const updateProject = async () => {
// // //     try {
// // //       const res = await fetch(`${API}/${editingProject._id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ members: [editingProject.ownerId, ...editMembers] }),
// // //       });
// // //       if (!res.ok) throw new Error();
// // //       toast.success("Project updated");
// // //       setEditOpen(false);
// // //       await loadProjects();
// // //     } catch { toast.error("Update failed"); }
// // //   };

// // //   const addMember    = (id) => { if (id && !selectedMembers.includes(id)) setSelectedMembers((p) => [...p, id]); };
// // //   const removeMember = (id) => setSelectedMembers((p) => p.filter((m) => m !== id));
// // //   const addEditMember    = (id) => { if (id && !editMembers.includes(id)) setEditMembers((p) => [...p, id]); };
// // //   const removeEditMember = (id) => setEditMembers((p) => p.filter((m) => m !== id));
// // //   const resolveName  = (id) => {
// // //     if (id === currentUser?._id) return currentUser.name;
// // //     return users.find((u) => u._id === id)?.name || id;
// // //   };

// // //   // Shared dialog input styles
// // //   const inputStyle = {
// // //     width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
// // //     padding: "9px 12px", fontSize: 14, color: "#111827",
// // //     background: "#f9fafb", outline: "none", fontFamily: "inherit",
// // //     transition: "border-color 0.15s, box-shadow 0.15s",
// // //   };
// // //   const labelStyle = {
// // //     fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block",
// // //   };

// // //   return (
// // //     <>
// // //       <style>{`
// // //         .projects-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

// // //         .view-btn {
// // //           background: transparent; border: 1px solid #e5e7eb; border-radius: 7px;
// // //           padding: 6px 9px; cursor: pointer; color: #9ca3af;
// // //           display: flex; align-items: center; transition: all 0.15s;
// // //         }
// // //         .view-btn:hover { border-color: #7c3aed; color: #7c3aed; }
// // //         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

// // //         .project-card:hover {
// // //           box-shadow: 0 4px 16px rgba(0,0,0,0.08);
// // //           border-color: #c4b5fd !important;
// // //         }
// // //         .project-card:hover .card-actions { opacity: 1 !important; }

// // //         .table-row:hover { background: #fafafa; }

// // //         .icon-btn {
// // //           width: 28px; height: 28px; border: 1px solid #e5e7eb; background: #fff;
// // //           border-radius: 6px; cursor: pointer; display: flex; align-items: center;
// // //           justify-content: center; color: #9ca3af; transition: all 0.15s;
// // //         }
// // //         .icon-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f3f0ff; }
// // //         .icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

// // //         .pm-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }

// // //         .new-project-btn:hover { background: #6d28d9 !important; box-shadow: 0 4px 12px rgba(124,58,237,0.4) !important; }
// // //         .new-project-wrap:hover .new-project-label { opacity: 1 !important; transform: translateY(0) !important; }

// // //         .view-btn { padding: 8px 10px; }
// // //       `}</style>

// // //       <div className="projects-root" style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

// // //         {/* ── Page Header ── */}
// // //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, overflow: "visible" }}>
// // //           <div>
// // //             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>
// // //               Workspace
// // //             </div>
// // //             <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
// // //               Projects
// // //             </h1>
// // //             <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
// // //               Organize work into projects and track progress.
// // //             </p>
// // //           </div>
// // //           {/* New Project — icon only, label appears below on hover */}
// // //           <div className="new-project-wrap" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
// // //             <button
// // //               className="new-project-btn"
// // //               onClick={() => setCreateOpen(true)}
// // //               style={{
// // //                 background: "#7c3aed", color: "#fff", border: "none",
// // //                 width: 42, height: 42, borderRadius: 10, cursor: "pointer",
// // //                 display: "flex", alignItems: "center", justifyContent: "center",
// // //                 transition: "background 0.15s, box-shadow 0.15s",
// // //                 boxShadow: "0 1px 4px rgba(124,58,237,0.3)",
// // //               }}
// // //             >
// // //               <Plus size={20} strokeWidth={2.2} />
// // //             </button>
// // //             <span className="new-project-label" style={{
// // //               position: "absolute", top: "calc(100% + 6px)",
// // //               fontSize: 11, fontWeight: 600, color: "#7c3aed",
// // //               whiteSpace: "nowrap", letterSpacing: "0.03em",
// // //               opacity: 0, transform: "translateY(-4px)",
// // //               transition: "opacity 0.18s, transform 0.18s",
// // //               pointerEvents: "none",
// // //             }}>
// // //               New Project
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* ── Toolbar ── */}
// // //         <div style={{
// // //           display: "flex", alignItems: "center", justifyContent: "space-between",
// // //           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
// // //           padding: "10px 0", marginBottom: 0, background: "#fff",
// // //         }}>
// // //           <span style={{ fontSize: 13, color: "#6b7280" }}>
// // //             {loading ? "Loading…" : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
// // //           </span>
// // //           <div style={{ display: "flex", gap: 6 }}>
// // //             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={20} /></button>
// // //             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={20} /></button>
// // //           </div>
// // //         </div>

// // //         {/* ── Main Content ── */}
// // //         <div style={{
// // //           border: "1px solid #e5e7eb", borderTop: "none",
// // //           borderRadius: "0 0 10px 10px", overflow: "hidden",
// // //           background: "#fff",
// // //         }}>
// // //           {loading ? (
// // //             <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading projects…</div>
// // //           ) : view === "card" ? (
// // //             <CardView projects={projects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} />
// // //           ) : (
// // //             <TableView projects={projects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} />
// // //           )}
// // //         </div>

// // //         {/* ── Create Dialog ── */}
// // //         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
// // //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// // //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// // //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
// // //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Project</DialogTitle>
// // //             </div>

// // //             <form onSubmit={createProject}>
// // //               <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// // //                 <div>
// // //                   <label style={labelStyle}>Project name</label>
// // //                   <input className="pm-input" style={inputStyle} placeholder="e.g. Brand Refresh"
// // //                     value={name} onChange={(e) => setName(e.target.value)} required />
// // //                 </div>
// // //                 <div>
// // //                   <label style={labelStyle}>Description</label>
// // //                   <textarea className="pm-input" style={{ ...inputStyle, resize: "none", height: 76, lineHeight: 1.55 }}
// // //                     placeholder="Brief overview…" value={desc} onChange={(e) => setDesc(e.target.value)} />
// // //                 </div>
// // //                 <div>
// // //                   <label style={labelStyle}>Manager</label>
// // //                   <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// // //                     value={currentUser?.name || "Loading…"} disabled />
// // //                 </div>
// // //                 <div>
// // //                   <label style={labelStyle}>Add members</label>
// // //                   <select className="pm-input" style={{
// // //                     ...inputStyle, cursor: "pointer", appearance: "none",
// // //                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// // //                     backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// // //                   }}
// // //                     value="" onChange={(e) => { addMember(e.target.value); e.target.value = ""; }}
// // //                   >
// // //                     <option value="">Select a member…</option>
// // //                     {users.filter((u) => !selectedMembers.includes(u._id)).map((u) => (
// // //                       <option key={u._id} value={u._id}>{u.name}</option>
// // //                     ))}
// // //                   </select>
// // //                   <MemberTags
// // //                     members={selectedMembers.map(resolveName)}
// // //                     onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeMember(u._id); }}
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // //                 <button type="button" onClick={() => setCreateOpen(false)} style={{
// // //                   background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// // //                   padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// // //                 }}>Cancel</button>
// // //                 <button type="submit" style={{
// // //                   background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// // //                   padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// // //                 }}>Create</button>
// // //               </div>
// // //             </form>
// // //           </DialogContent>
// // //         </Dialog>

// // //         {/* ── Edit Dialog ── */}
// // //         <Dialog open={editOpen} onOpenChange={setEditOpen}>
// // //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// // //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// // //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>Edit</div>
// // //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
// // //                 {editingProject?.name || "Edit Project"}
// // //               </DialogTitle>
// // //             </div>

// // //             <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// // //               <div>
// // //                 <label style={labelStyle}>Manager</label>
// // //                 <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// // //                   value={
// // //                     currentUser?._id === editingProject?.ownerId
// // //                       ? currentUser?.name
// // //                       : users.find((u) => u._id === editingProject?.ownerId)?.name || "—"
// // //                   } disabled />
// // //               </div>
// // //               <div>
// // //                 <label style={labelStyle}>Members</label>
// // //                 <select className="pm-input" style={{
// // //                   ...inputStyle, cursor: "pointer", appearance: "none",
// // //                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// // //                   backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// // //                 }}
// // //                   value="" onChange={(e) => { addEditMember(e.target.value); e.target.value = ""; }}
// // //                 >
// // //                   <option value="">Add a member…</option>
// // //                   {users.filter((u) => !editMembers.includes(u._id)).map((u) => (
// // //                     <option key={u._id} value={u._id}>{u.name}</option>
// // //                   ))}
// // //                 </select>
// // //                 <MemberTags
// // //                   members={editMembers.map(resolveName)}
// // //                   onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeEditMember(u._id); }}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// // //               <button onClick={() => setEditOpen(false)} style={{
// // //                 background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// // //                 padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// // //               }}>Cancel</button>
// // //               <button onClick={updateProject} style={{
// // //                 background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// // //                 padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// // //               }}>Save changes</button>
// // //             </div>
// // //           </DialogContent>
// // //         </Dialog>

// // //       </div>
// // //     </>
// // //   );
// // // }
// // import { useEffect, useState, useCallback, useMemo } from "react";
// // import { Plus, Trash2, Pencil, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown, Search, X, SlidersHorizontal } from "lucide-react";
// // import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// // import { toast } from "sonner";

// // const API  = "http://localhost:5000/api/projects";
// // const BASE = "http://localhost:5000/api";

// // const PALETTE = [
// //   { accent: "#7c3aed", bg: "#f3f0ff", text: "#5b21b6" },
// //   { accent: "#2563eb", bg: "#eff6ff", text: "#1d4ed8" },
// //   { accent: "#059669", bg: "#ecfdf5", text: "#047857" },
// //   { accent: "#db2777", bg: "#fdf2f8", text: "#be185d" },
// //   { accent: "#d97706", bg: "#fffbeb", text: "#b45309" },
// // ];

// // function initials(name = "") {
// //   return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
// // }

// // function Avatar({ name = "", size = 28, style = {} }) {
// //   const pal = PALETTE[Math.abs((name.charCodeAt(0) || 65) - 65) % PALETTE.length];
// //   return (
// //     <div style={{
// //       width: size, height: size, borderRadius: "50%",
// //       background: pal.bg, color: pal.text,
// //       display: "flex", alignItems: "center", justifyContent: "center",
// //       fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
// //       ...style,
// //     }}>
// //       {initials(name)}
// //     </div>
// //   );
// // }

// // function MemberTags({ members, onRemove }) {
// //   if (!members.length) return null;
// //   return (
// //     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
// //       {members.map((id) => (
// //         <span key={id} style={{
// //           fontSize: 12, background: "#f3f0ff", color: "#5b21b6",
// //           padding: "3px 10px", borderRadius: 20,
// //           display: "flex", alignItems: "center", gap: 6,
// //           border: "1px solid #ddd6fe",
// //         }}>
// //           {id}
// //           {onRemove && (
// //             <span onClick={() => onRemove(id)}
// //               style={{ cursor: "pointer", opacity: 0.55, fontSize: 14, lineHeight: 1 }}>×</span>
// //           )}
// //         </span>
// //       ))}
// //     </div>
// //   );
// // }

// // // ─── Highlight matching text ──────────────────────────────────────────────────
// // function Highlighted({ text = "", query = "" }) {
// //   if (!query) return <>{text}</>;
// //   const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// //   const parts = text.split(new RegExp(`(${esc})`, "gi"));
// //   return (
// //     <>
// //       {parts.map((part, i) =>
// //         part.toLowerCase() === query.toLowerCase()
// //           ? <mark key={i} style={{ background: "#fef08a", borderRadius: 2, padding: "0 1px" }}>{part}</mark>
// //           : part
// //       )}
// //     </>
// //   );
// // }

// // // ─── Active filter tag pill ───────────────────────────────────────────────────
// // function FilterPill({ label, onRemove }) {
// //   return (
// //     <span style={{
// //       display: "inline-flex", alignItems: "center", gap: 4,
// //       background: "#f3f0ff", color: "#5b21b6",
// //       border: "1px solid #ddd6fe", padding: "2px 8px 2px 10px",
// //       borderRadius: 20, fontSize: 11, fontWeight: 500,
// //     }}>
// //       {label}
// //       <span onClick={onRemove} style={{
// //         cursor: "pointer", display: "flex", alignItems: "center",
// //         opacity: 0.6, lineHeight: 1,
// //       }}>
// //         <X size={11} />
// //       </span>
// //     </span>
// //   );
// // }

// // // ─── Card View ────────────────────────────────────────────────────────────────
// // function CardView({ projects, users, currentUser, onEdit, onDelete, query }) {
// //   if (!projects.length) return (
// //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// //       <p style={{ fontSize: 14 }}>No projects match your search.</p>
// //     </div>
// //   );

// //   return (
// //     <div style={{
// //       display: "grid",
// //       gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
// //       gap: 16, padding: 20,
// //     }}>
// //       {projects.map((p, i) => {
// //         const pal = PALETTE[i % PALETTE.length];
// //         const manager = p.ownerId === currentUser?._id
// //           ? currentUser?.name
// //           : users.find((u) => u._id === p.ownerId)?.name || "—";
// //         const memberCount = (p.members || []).filter((m) => m !== p.ownerId).length;

// //         return (
// //           <div key={p._id} className="project-card" style={{
// //             background: "#fff", borderRadius: 10,
// //             border: "1px solid #e5e7eb", padding: "18px 20px",
// //             position: "relative", overflow: "hidden",
// //             transition: "box-shadow 0.15s, border-color 0.15s",
// //           }}>
// //             <div style={{
// //               position: "absolute", top: 0, left: 0, right: 0, height: 3,
// //               background: pal.accent, borderRadius: "10px 10px 0 0",
// //             }} />
// //             <div style={{
// //               width: 36, height: 36, borderRadius: 8,
// //               background: pal.bg, color: pal.text,
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //               fontSize: 14, fontWeight: 700, marginBottom: 12,
// //             }}>
// //               {initials(p.name)}
// //             </div>
// //             <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
// //               <Highlighted text={p.name} query={query} />
// //             </div>
// //             <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, minHeight: 36 }}>
// //               <Highlighted text={p.description || "—"} query={query} />
// //             </div>
// //             <div style={{
// //               marginTop: 14, paddingTop: 12,
// //               borderTop: "1px solid #f3f4f6",
// //               display: "flex", alignItems: "center", justifyContent: "space-between",
// //             }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //                 <Avatar name={manager} size={22} />
// //                 <span style={{ fontSize: 12, color: "#6b7280" }}>
// //                   <Highlighted text={manager} query={query} />
// //                 </span>
// //               </div>
// //               <span style={{
// //                 fontSize: 11, color: "#6b7280",
// //                 background: "#f9fafb", border: "1px solid #e5e7eb",
// //                 padding: "2px 8px", borderRadius: 20,
// //               }}>
// //                 {memberCount} member{memberCount !== 1 ? "s" : ""}
// //               </span>
// //             </div>
// //             <div className="card-actions" style={{
// //               position: "absolute", top: 12, right: 12,
// //               display: "flex", gap: 4, opacity: 0, transition: "opacity 0.15s",
// //             }}>
// //               <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// //               <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// // // ─── Table View ───────────────────────────────────────────────────────────────
// // function TableView({ projects, users, currentUser, onEdit, onDelete, query }) {
// //   const [sortKey, setSortKey] = useState("name");
// //   const [sortDir, setSortDir] = useState("asc");

// //   function toggleSort(key) {
// //     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
// //     else { setSortKey(key); setSortDir("asc"); }
// //   }

// //   const sorted = [...projects].sort((a, b) => {
// //     let av = sortKey === "members" ? (a.members || []).length : (a[sortKey] || "");
// //     let bv = sortKey === "members" ? (b.members || []).length : (b[sortKey] || "");
// //     if (typeof av === "string") av = av.toLowerCase();
// //     if (typeof bv === "string") bv = bv.toLowerCase();
// //     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
// //   });

// //   function SortIcon({ col }) {
// //     if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />;
// //     return sortDir === "asc"
// //       ? <ChevronUp size={11} style={{ color: "#7c3aed" }} />
// //       : <ChevronDown size={11} style={{ color: "#7c3aed" }} />;
// //   }

// //   const thStyle = {
// //     padding: "10px 16px", fontSize: 11, fontWeight: 600,
// //     letterSpacing: "0.05em", textTransform: "uppercase",
// //     color: "#9ca3af", background: "#f9fafb",
// //     borderBottom: "1px solid #e5e7eb",
// //     cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
// //   };
// //   const tdStyle = {
// //     padding: "13px 16px", fontSize: 13, color: "#111827",
// //     borderBottom: "1px solid #f3f4f6", verticalAlign: "middle",
// //   };

// //   if (!projects.length) return (
// //     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
// //       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// //       <p style={{ fontSize: 14 }}>No projects match your search.</p>
// //     </div>
// //   );

// //   return (
// //     <div style={{ overflowX: "auto" }}>
// //       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
// //         <thead>
// //           <tr>
// //             {[
// //               { key: "name",        label: "Project"     },
// //               { key: "description", label: "Description" },
// //               { key: "ownerId",     label: "Manager"     },
// //               { key: "members",     label: "Members"     },
// //               { key: null,          label: "Actions"     },
// //             ].map(({ key, label }) => (
// //               <th key={label}
// //                 style={{ ...thStyle, cursor: key ? "pointer" : "default" }}
// //                 onClick={() => key && toggleSort(key)}
// //               >
// //                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
// //                   {label}{key && <SortIcon col={key} />}
// //                 </span>
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sorted.map((p, i) => {
// //             const pal = PALETTE[i % PALETTE.length];
// //             const manager = p.ownerId === currentUser?._id
// //               ? currentUser?.name
// //               : users.find((u) => u._id === p.ownerId)?.name || "—";
// //             const memberNames = (p.members || [])
// //               .filter((m) => m !== p.ownerId)
// //               .map((id) => users.find((u) => u._id === id)?.name || id);

// //             return (
// //               <tr key={p._id} className="table-row" style={{ transition: "background 0.1s" }}>
// //                 <td style={tdStyle}>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                     <div style={{
// //                       width: 32, height: 32, borderRadius: 7, flexShrink: 0,
// //                       background: pal.bg, color: pal.text,
// //                       display: "flex", alignItems: "center", justifyContent: "center",
// //                       fontSize: 12, fontWeight: 700,
// //                     }}>{initials(p.name)}</div>
// //                     <span style={{ fontWeight: 500 }}><Highlighted text={p.name} query={query} /></span>
// //                   </div>
// //                 </td>
// //                 <td style={{ ...tdStyle, color: "#6b7280", maxWidth: 220 }}>
// //                   <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
// //                     <Highlighted text={p.description || "—"} query={query} />
// //                   </div>
// //                 </td>
// //                 <td style={tdStyle}>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //                     <Avatar name={manager} size={26} />
// //                     <span><Highlighted text={manager} query={query} /></span>
// //                   </div>
// //                 </td>
// //                 <td style={tdStyle}>
// //                   {memberNames.length === 0 ? (
// //                     <span style={{ color: "#d1d5db", fontSize: 12 }}>No members</span>
// //                   ) : (
// //                     <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
// //                       <div style={{ display: "flex" }}>
// //                         {memberNames.slice(0, 4).map((name, idx) => (
// //                           <Avatar key={idx} name={name} size={26}
// //                             style={{ marginLeft: idx > 0 ? -8 : 0, border: "2px solid #fff", zIndex: 10 - idx }}
// //                           />
// //                         ))}
// //                       </div>
// //                       {memberNames.length > 4 && (
// //                         <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 6 }}>+{memberNames.length - 4}</span>
// //                       )}
// //                       <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
// //                         {memberNames.length} member{memberNames.length !== 1 ? "s" : ""}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </td>
// //                 <td style={{ ...tdStyle, width: 80 }}>
// //                   <div style={{ display: "flex", gap: 4 }}>
// //                     <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={13} /></button>
// //                     <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={13} /></button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // // ─── Main Component ───────────────────────────────────────────────────────────
// // export default function Projects() {
// //   const [projects,        setProjects]        = useState([]);
// //   const [users,           setUsers]           = useState([]);
// //   const [currentUser,     setCurrentUser]     = useState(null);
// //   const [view,            setView]            = useState("card");
// //   const [loading,         setLoading]         = useState(true);
// //   const [createOpen,      setCreateOpen]      = useState(false);
// //   const [editOpen,        setEditOpen]        = useState(false);
// //   const [editingProject,  setEditingProject]  = useState(null);
// //   const [name,            setName]            = useState("");
// //   const [desc,            setDesc]            = useState("");
// //   const [selectedMembers, setSelectedMembers] = useState([]);
// //   const [editMembers,     setEditMembers]     = useState([]);

// //   // ── Search / filter state ──────────────────────────────────────────────────
// //   const [searchQuery,  setSearchQuery]  = useState("");
// //   const [sortOption,   setSortOption]   = useState("");   // "name-asc" | "name-desc" | "members-desc" | "members-asc"
// //   const [memberFilter, setMemberFilter] = useState("");   // "solo" | "small" | "large"

// //   const token = localStorage.getItem("token");

// //   const loadProjects = useCallback(async () => {
// //     try {
// //       const res  = await fetch(API);
// //       const data = await res.json();
// //       setProjects(data);
// //     } catch { toast.error("Failed to load projects"); }
// //   }, []);

// //   const getMe = useCallback(async () => {
// //     try {
// //       const res  = await fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
// //       const data = await res.json();
// //       setCurrentUser(data);
// //     } catch { toast.error("Failed to load user"); }
// //   }, [token]);

// //   const fetchUsers = useCallback(async () => {
// //     try {
// //       const res  = await fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
// //       const data = await res.json();
// //       setUsers(data.filter((u) => u.role === "Member"));
// //     } catch { toast.error("Failed to load users"); }
// //   }, [token]);

// //   useEffect(() => {
// //     Promise.all([loadProjects(), getMe(), fetchUsers()]).finally(() => setLoading(false));
// //   }, [loadProjects, getMe, fetchUsers]);

// //   // ── Filtered + sorted project list ────────────────────────────────────────
// //   const filteredProjects = useMemo(() => {
// //     let list = [...projects];

// //     // Text search — name, description, manager name
// //     if (searchQuery.trim()) {
// //       const q = searchQuery.toLowerCase();
// //       list = list.filter((p) => {
// //         const managerName = p.ownerId === currentUser?._id
// //           ? currentUser?.name
// //           : users.find((u) => u._id === p.ownerId)?.name || "";
// //         return (
// //           p.name.toLowerCase().includes(q) ||
// //           (p.description || "").toLowerCase().includes(q) ||
// //           managerName.toLowerCase().includes(q)
// //         );
// //       });
// //     }

// //     // Member size filter
// //     if (memberFilter === "solo")  list = list.filter((p) => (p.members || []).filter((m) => m !== p.ownerId).length === 0);
// //     if (memberFilter === "small") list = list.filter((p) => { const c = (p.members || []).filter((m) => m !== p.ownerId).length; return c >= 1 && c <= 3; });
// //     if (memberFilter === "large") list = list.filter((p) => (p.members || []).filter((m) => m !== p.ownerId).length >= 4);

// //     // Sort
// //     if (sortOption === "name-asc")      list.sort((a, b) => a.name.localeCompare(b.name));
// //     if (sortOption === "name-desc")     list.sort((a, b) => b.name.localeCompare(a.name));
// //     if (sortOption === "members-desc")  list.sort((a, b) => (b.members || []).length - (a.members || []).length);
// //     if (sortOption === "members-asc")   list.sort((a, b) => (a.members || []).length - (b.members || []).length);

// //     return list;
// //   }, [projects, searchQuery, memberFilter, sortOption, currentUser, users]);

// //   const hasActiveFilters = searchQuery || memberFilter || sortOption;

// //   function clearAllFilters() {
// //     setSearchQuery("");
// //     setMemberFilter("");
// //     setSortOption("");
// //   }

// //   // ── CRUD ──────────────────────────────────────────────────────────────────
// //   const createProject = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch(API, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name, description: desc,
// //           color: PALETTE[projects.length % PALETTE.length].accent,
// //           ownerId: currentUser._id,
// //           members: [currentUser._id, ...selectedMembers],
// //         }),
// //       });
// //       if (!res.ok) throw new Error();
// //       const newProject = await res.json();
// //       setProjects((prev) => [newProject, ...prev]);
// //       setName(""); setDesc(""); setSelectedMembers([]);
// //       setCreateOpen(false);
// //       toast.success("Project created");
// //     } catch { toast.error("Create failed"); }
// //   };

// //   const deleteProject = async (id) => {
// //     try {
// //       await fetch(`${API}/${id}`, { method: "DELETE" });
// //       setProjects((prev) => prev.filter((p) => p._id !== id));
// //       toast.success("Project deleted");
// //     } catch { toast.error("Delete failed"); }
// //   };

// //   const openEdit = (project) => {
// //     setEditingProject(project);
// //     setEditMembers(project.members.filter((m) => m !== project.ownerId));
// //     setEditOpen(true);
// //   };

// //   const updateProject = async () => {
// //     try {
// //       const res = await fetch(`${API}/${editingProject._id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ members: [editingProject.ownerId, ...editMembers] }),
// //       });
// //       if (!res.ok) throw new Error();
// //       toast.success("Project updated");
// //       setEditOpen(false);
// //       await loadProjects();
// //     } catch { toast.error("Update failed"); }
// //   };

// //   const addMember    = (id) => { if (id && !selectedMembers.includes(id)) setSelectedMembers((p) => [...p, id]); };
// //   const removeMember = (id) => setSelectedMembers((p) => p.filter((m) => m !== id));
// //   const addEditMember    = (id) => { if (id && !editMembers.includes(id)) setEditMembers((p) => [...p, id]); };
// //   const removeEditMember = (id) => setEditMembers((p) => p.filter((m) => m !== id));
// //   const resolveName  = (id) => {
// //     if (id === currentUser?._id) return currentUser.name;
// //     return users.find((u) => u._id === id)?.name || id;
// //   };

// //   const inputStyle = {
// //     width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
// //     padding: "9px 12px", fontSize: 14, color: "#111827",
// //     background: "#f9fafb", outline: "none", fontFamily: "inherit",
// //     transition: "border-color 0.15s, box-shadow 0.15s",
// //   };
// //   const labelStyle = {
// //     fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block",
// //   };

// //   // Shared select style with active highlight
// //   const filterSelectStyle = (hasValue) => ({
// //     padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 500,
// //     border: `1px solid ${hasValue ? "#7c3aed" : "#e5e7eb"}`, borderRadius: 7,
// //     background: hasValue
// //       ? `#f9f7ff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237c3aed' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 9px center`
// //       : `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 9px center`,
// //     appearance: "none", color: hasValue ? "#7c3aed" : "#374151",
// //     cursor: "pointer", outline: "none",
// //     transition: "border-color 0.15s",
// //   });

// //   return (
// //     <>
// //       <style>{`
// //         .projects-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

// //         .view-btn {
// //           background: transparent; border: 1px solid #e5e7eb; border-radius: 7px;
// //           padding: 6px 9px; cursor: pointer; color: #9ca3af;
// //           display: flex; align-items: center; transition: all 0.15s;
// //         }
// //         .view-btn:hover { border-color: #7c3aed; color: #7c3aed; }
// //         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

// //         .project-card:hover {
// //           box-shadow: 0 4px 16px rgba(0,0,0,0.08);
// //           border-color: #c4b5fd !important;
// //         }
// //         .project-card:hover .card-actions { opacity: 1 !important; }

// //         .table-row:hover { background: #fafafa; }

// //         .icon-btn {
// //           width: 28px; height: 28px; border: 1px solid #e5e7eb; background: #fff;
// //           border-radius: 6px; cursor: pointer; display: flex; align-items: center;
// //           justify-content: center; color: #9ca3af; transition: all 0.15s;
// //         }
// //         .icon-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f3f0ff; }
// //         .icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

// //         .pm-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
// //         .search-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
// //         .filter-select:hover { border-color: #7c3aed !important; }
// //         .filter-select:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); outline: none; }

// //         .new-project-btn:hover { background: #6d28d9 !important; box-shadow: 0 4px 12px rgba(124,58,237,0.4) !important; }
// //         .new-project-wrap:hover .new-project-label { opacity: 1 !important; transform: translateY(0) !important; }
// //       `}</style>

// //       <div className="projects-root" style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

// //         {/* ── Page Header ── */}
// //         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, overflow: "visible" }}>
// //           <div>
// //             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>
// //               Workspace
// //             </div>
// //             <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
// //               Projects
// //             </h1>
// //             <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
// //               Organize work into projects and track progress.
// //             </p>
// //           </div>
// //           <div className="new-project-wrap" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
// //             <button
// //               className="new-project-btn"
// //               onClick={() => setCreateOpen(true)}
// //               style={{
// //                 background: "#7c3aed", color: "#fff", border: "none",
// //                 width: 42, height: 42, borderRadius: 10, cursor: "pointer",
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 transition: "background 0.15s, box-shadow 0.15s",
// //                 boxShadow: "0 1px 4px rgba(124,58,237,0.3)",
// //               }}
// //             >
// //               <Plus size={20} strokeWidth={2.2} />
// //             </button>
// //             <span className="new-project-label" style={{
// //               position: "absolute", top: "calc(100% + 6px)",
// //               fontSize: 11, fontWeight: 600, color: "#7c3aed",
// //               whiteSpace: "nowrap", letterSpacing: "0.03em",
// //               opacity: 0, transform: "translateY(-4px)",
// //               transition: "opacity 0.18s, transform 0.18s",
// //               pointerEvents: "none",
// //             }}>
// //               New Project
// //             </span>
// //           </div>
// //         </div>

// //         {/* ── Toolbar ── */}
// //         <div style={{
// //           display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
// //           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
// //           padding: "10px 0", marginBottom: 0, background: "#fff",
// //         }}>

// //           {/* Search input */}
// //           <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
// //             <Search size={14} style={{
// //               position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
// //               color: "#9ca3af", pointerEvents: "none",
// //             }} />
// //             <input
// //               className="search-input"
// //               type="text"
// //               placeholder="Search projects…"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               style={{
// //                 width: "100%", padding: "7px 32px 7px 30px",
// //                 border: "1px solid #e5e7eb", borderRadius: 8,
// //                 fontSize: 13, color: "#111827", background: "#f9fafb",
// //                 outline: "none", fontFamily: "inherit",
// //                 transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
// //               }}
// //             />
// //             {searchQuery && (
// //               <button
// //                 onClick={() => setSearchQuery("")}
// //                 style={{
// //                   position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
// //                   background: "none", border: "none", cursor: "pointer",
// //                   color: "#9ca3af", display: "flex", padding: 2, borderRadius: 4,
// //                 }}
// //                 title="Clear search"
// //               >
// //                 <X size={13} />
// //               </button>
// //             )}
// //           </div>

// //           {/* Sort select */}
// //           <select
// //             className="filter-select"
// //             style={filterSelectStyle(!!sortOption)}
// //             value={sortOption}
// //             onChange={(e) => setSortOption(e.target.value)}
// //             title="Sort projects"
// //           >
// //             <option value="">Sort: Default</option>
// //             <option value="name-asc">Name A → Z</option>
// //             <option value="name-desc">Name Z → A</option>
// //             <option value="members-desc">Most members</option>
// //             <option value="members-asc">Fewest members</option>
// //           </select>

// //           {/* Member size filter */}
// //           <select
// //             className="filter-select"
// //             style={filterSelectStyle(!!memberFilter)}
// //             value={memberFilter}
// //             onChange={(e) => setMemberFilter(e.target.value)}
// //             title="Filter by team size"
// //           >
// //             <option value="">All sizes</option>
// //             <option value="solo">Solo (0 members)</option>
// //             <option value="small">Small (1–3)</option>
// //             <option value="large">Large (4+)</option>
// //           </select>

// //           {/* Divider */}
// //           <div style={{ width: 1, height: 24, background: "#e5e7eb", margin: "0 2px" }} />

// //           {/* Project count */}
// //           <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
// //             {loading ? "Loading…" : `${filteredProjects.length} of ${projects.length} project${projects.length !== 1 ? "s" : ""}`}
// //           </span>

// //           {/* View toggles */}
// //           <div style={{ display: "flex", gap: 4 }}>
// //             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={20} /></button>
// //             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={20} /></button>
// //           </div>
// //         </div>

// //         {/* ── Active filter pills ── */}
// //         {hasActiveFilters && (
// //           <div style={{
// //             display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6,
// //             padding: "8px 0 0", fontSize: 12, color: "#9ca3af",
// //           }}>
// //             <SlidersHorizontal size={12} style={{ color: "#9ca3af" }} />
// //             <span>Filters:</span>
// //             {searchQuery && (
// //               <FilterPill label={`"${searchQuery}"`} onRemove={() => setSearchQuery("")} />
// //             )}
// //             {memberFilter && (
// //               <FilterPill
// //                 label={{ solo: "Solo", small: "Small (1–3)", large: "Large (4+)" }[memberFilter]}
// //                 onRemove={() => setMemberFilter("")}
// //               />
// //             )}
// //             {sortOption && (
// //               <FilterPill
// //                 label={{ "name-asc": "A→Z", "name-desc": "Z→A", "members-desc": "Most members", "members-asc": "Fewest members" }[sortOption]}
// //                 onRemove={() => setSortOption("")}
// //               />
// //             )}
// //             <button
// //               onClick={clearAllFilters}
// //               style={{
// //                 marginLeft: "auto", background: "none", border: "none",
// //                 fontSize: 11, color: "#7c3aed", cursor: "pointer", fontWeight: 500,
// //                 fontFamily: "inherit",
// //               }}
// //             >
// //               Clear all
// //             </button>
// //           </div>
// //         )}

// //         {/* ── Main Content ── */}
// //         <div style={{
// //           border: "1px solid #e5e7eb",
// //           borderTop: hasActiveFilters ? "1px solid #e5e7eb" : "none",
// //           borderRadius: hasActiveFilters ? "0 0 10px 10px" : "0 0 10px 10px",
// //           overflow: "hidden", background: "#fff",
// //           marginTop: hasActiveFilters ? 8 : 0,
// //         }}>
// //           {loading ? (
// //             <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading projects…</div>
// //           ) : view === "card" ? (
// //             <CardView projects={filteredProjects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} query={searchQuery} />
// //           ) : (
// //             <TableView projects={filteredProjects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} query={searchQuery} />
// //           )}
// //         </div>

// //         {/* ── Create Dialog ── */}
// //         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
// //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
// //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Project</DialogTitle>
// //             </div>
// //             <form onSubmit={createProject}>
// //               <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// //                 <div>
// //                   <label style={labelStyle}>Project name</label>
// //                   <input className="pm-input" style={inputStyle} placeholder="e.g. Brand Refresh"
// //                     value={name} onChange={(e) => setName(e.target.value)} required />
// //                 </div>
// //                 <div>
// //                   <label style={labelStyle}>Description</label>
// //                   <textarea className="pm-input" style={{ ...inputStyle, resize: "none", height: 76, lineHeight: 1.55 }}
// //                     placeholder="Brief overview…" value={desc} onChange={(e) => setDesc(e.target.value)} />
// //                 </div>
// //                 <div>
// //                   <label style={labelStyle}>Manager</label>
// //                   <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// //                     value={currentUser?.name || "Loading…"} disabled />
// //                 </div>
// //                 <div>
// //                   <label style={labelStyle}>Add members</label>
// //                   <select className="pm-input" style={{
// //                     ...inputStyle, cursor: "pointer", appearance: "none",
// //                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// //                     backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// //                   }}
// //                     value="" onChange={(e) => { addMember(e.target.value); e.target.value = ""; }}
// //                   >
// //                     <option value="">Select a member…</option>
// //                     {users.filter((u) => !selectedMembers.includes(u._id)).map((u) => (
// //                       <option key={u._id} value={u._id}>{u.name}</option>
// //                     ))}
// //                   </select>
// //                   <MemberTags
// //                     members={selectedMembers.map(resolveName)}
// //                     onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeMember(u._id); }}
// //                   />
// //                 </div>
// //               </div>
// //               <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// //                 <button type="button" onClick={() => setCreateOpen(false)} style={{
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

// //         {/* ── Edit Dialog ── */}
// //         <Dialog open={editOpen} onOpenChange={setEditOpen}>
// //           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
// //             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
// //               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>Edit</div>
// //               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
// //                 {editingProject?.name || "Edit Project"}
// //               </DialogTitle>
// //             </div>
// //             <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
// //               <div>
// //                 <label style={labelStyle}>Manager</label>
// //                 <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
// //                   value={
// //                     currentUser?._id === editingProject?.ownerId
// //                       ? currentUser?.name
// //                       : users.find((u) => u._id === editingProject?.ownerId)?.name || "—"
// //                   } disabled />
// //               </div>
// //               <div>
// //                 <label style={labelStyle}>Members</label>
// //                 <select className="pm-input" style={{
// //                   ...inputStyle, cursor: "pointer", appearance: "none",
// //                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
// //                   backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
// //                 }}
// //                   value="" onChange={(e) => { addEditMember(e.target.value); e.target.value = ""; }}
// //                 >
// //                   <option value="">Add a member…</option>
// //                   {users.filter((u) => !editMembers.includes(u._id)).map((u) => (
// //                     <option key={u._id} value={u._id}>{u.name}</option>
// //                   ))}
// //                 </select>
// //                 <MemberTags
// //                   members={editMembers.map(resolveName)}
// //                   onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeEditMember(u._id); }}
// //                 />
// //               </div>
// //             </div>
// //             <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
// //               <button onClick={() => setEditOpen(false)} style={{
// //                 background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
// //                 padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
// //               }}>Cancel</button>
// //               <button onClick={updateProject} style={{
// //                 background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
// //                 padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
// //               }}>Save changes</button>
// //             </div>
// //           </DialogContent>
// //         </Dialog>

// //       </div>
// //     </>
// //   );
// // }
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { Plus, Trash2, Pencil, LayoutGrid, List, FolderOpen, ChevronUp, ChevronDown, Search, X, SlidersHorizontal } from "lucide-react";
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { toast } from "sonner";

// const API  = "http://localhost:5000/api/projects";
// const BASE = "http://localhost:5000/api";

// const PALETTE = [
//   { accent: "#7c3aed", bg: "#f3f0ff", text: "#5b21b6" },
//   { accent: "#2563eb", bg: "#eff6ff", text: "#1d4ed8" },
//   { accent: "#059669", bg: "#ecfdf5", text: "#047857" },
//   { accent: "#db2777", bg: "#fdf2f8", text: "#be185d" },
//   { accent: "#d97706", bg: "#fffbeb", text: "#b45309" },
// ];

// function initials(name = "") {
//   return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
// }

// function Avatar({ name = "", size = 28, style = {} }) {
//   const pal = PALETTE[Math.abs((name.charCodeAt(0) || 65) - 65) % PALETTE.length];
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: pal.bg, color: pal.text,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
//       ...style,
//     }}>
//       {initials(name)}
//     </div>
//   );
// }

// function MemberTags({ members, onRemove }) {
//   if (!members.length) return null;
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
//       {members.map((id) => (
//         <span key={id} style={{
//           fontSize: 12, background: "#f3f0ff", color: "#5b21b6",
//           padding: "3px 10px", borderRadius: 20,
//           display: "flex", alignItems: "center", gap: 6,
//           border: "1px solid #ddd6fe",
//         }}>
//           {id}
//           {onRemove && (
//             <span onClick={() => onRemove(id)}
//               style={{ cursor: "pointer", opacity: 0.55, fontSize: 14, lineHeight: 1 }}>×</span>
//           )}
//         </span>
//       ))}
//     </div>
//   );
// }

// function Highlighted({ text = "", query = "" }) {
//   if (!query) return <>{text}</>;
//   const esc = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const parts = text.split(new RegExp(`(${esc})`, "gi"));
//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === query.toLowerCase()
//           ? <mark key={i} style={{ background: "#fef08a", borderRadius: 2, padding: "0 1px" }}>{part}</mark>
//           : part
//       )}
//     </>
//   );
// }

// function FilterPill({ label, onRemove }) {
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 4,
//       background: "#f3f0ff", color: "#5b21b6",
//       border: "1px solid #ddd6fe", padding: "2px 8px 2px 10px",
//       borderRadius: 20, fontSize: 11, fontWeight: 500,
//     }}>
//       {label}
//       <span onClick={onRemove} style={{
//         cursor: "pointer", display: "flex", alignItems: "center",
//         opacity: 0.6, lineHeight: 1,
//       }}>
//         <X size={11} />
//       </span>
//     </span>
//   );
// }

// // ─── Card View ────────────────────────────────────────────────────────────────
// function CardView({ projects, users, currentUser, onEdit, onDelete, query }) {
//   if (!projects.length) return (
//     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
//       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
//       <p style={{ fontSize: 14 }}>No projects match your search.</p>
//     </div>
//   );

//   return (
//     <div style={{
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",  /* wider min */
//       gap: 20, padding: 28,                                           /* more gap + padding */
//     }}>
//       {projects.map((p, i) => {
//         const pal = PALETTE[i % PALETTE.length];
//         const manager = p.ownerId === currentUser?._id
//           ? currentUser?.name
//           : users.find((u) => u._id === p.ownerId)?.name || "—";
//         const memberCount = (p.members || []).filter((m) => m !== p.ownerId).length;

//         return (
//           <div key={p._id} className="project-card" style={{
//             background: "#fff", borderRadius: 12,
//             border: "1px solid #e5e7eb", padding: "26px 28px",  /* bigger padding */
//             position: "relative", overflow: "hidden",
//             transition: "box-shadow 0.15s, border-color 0.15s",
//           }}>
//             {/* top accent bar */}
//             <div style={{
//               position: "absolute", top: 0, left: 0, right: 0, height: 4,  /* slightly thicker */
//               background: pal.accent, borderRadius: "12px 12px 0 0",
//             }} />

//             {/* project icon — larger */}
//             <div style={{
//               width: 48, height: 48, borderRadius: 10,
//               background: pal.bg, color: pal.text,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 17, fontWeight: 700, marginBottom: 16,
//             }}>
//               {initials(p.name)}
//             </div>

//             {/* title */}
//             <div style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
//               <Highlighted text={p.name} query={query} />
//             </div>

//             {/* description */}
//             <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, minHeight: 44 }}>
//               <Highlighted text={p.description || "—"} query={query} />
//             </div>

//             {/* footer */}
//             <div style={{
//               marginTop: 20, paddingTop: 16,
//               borderTop: "1px solid #f3f4f6",
//               display: "flex", alignItems: "center", justifyContent: "space-between",
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//                 <Avatar name={manager} size={28} />  {/* larger avatar */}
//                 <span style={{ fontSize: 13, color: "#6b7280" }}>
//                   <Highlighted text={manager} query={query} />
//                 </span>
//               </div>
//               <span style={{
//                 fontSize: 12, color: "#6b7280",
//                 background: "#f9fafb", border: "1px solid #e5e7eb",
//                 padding: "3px 10px", borderRadius: 20,
//               }}>
//                 {memberCount} member{memberCount !== 1 ? "s" : ""}
//               </span>
//             </div>

//             {/* action buttons */}
//             <div className="card-actions" style={{
//               position: "absolute", top: 16, right: 16,
//               display: "flex", gap: 4, opacity: 0, transition: "opacity 0.15s",
//             }}>
//               <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={14} /></button>
//               <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={14} /></button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Table View ───────────────────────────────────────────────────────────────
// function TableView({ projects, users, currentUser, onEdit, onDelete, query }) {
//   const [sortKey, setSortKey] = useState("name");
//   const [sortDir, setSortDir] = useState("asc");

//   function toggleSort(key) {
//     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else { setSortKey(key); setSortDir("asc"); }
//   }

//   const sorted = [...projects].sort((a, b) => {
//     let av = sortKey === "members" ? (a.members || []).length : (a[sortKey] || "");
//     let bv = sortKey === "members" ? (b.members || []).length : (b[sortKey] || "");
//     if (typeof av === "string") av = av.toLowerCase();
//     if (typeof bv === "string") bv = bv.toLowerCase();
//     return av < bv ? (sortDir === "asc" ? -1 : 1) : av > bv ? (sortDir === "asc" ? 1 : -1) : 0;
//   });

//   function SortIcon({ col }) {
//     if (sortKey !== col) return <ChevronUp size={12} style={{ opacity: 0.2 }} />;
//     return sortDir === "asc"
//       ? <ChevronUp size={12} style={{ color: "#7c3aed" }} />
//       : <ChevronDown size={12} style={{ color: "#7c3aed" }} />;
//   }

//   const thStyle = {
//     padding: "13px 20px",           /* taller header cells */
//     fontSize: 12, fontWeight: 600,
//     letterSpacing: "0.05em", textTransform: "uppercase",
//     color: "#9ca3af", background: "#f9fafb",
//     borderBottom: "1px solid #e5e7eb",
//     cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
//   };
//   const tdStyle = {
//     padding: "18px 20px",           /* taller data rows */
//     fontSize: 14, color: "#111827", /* bigger font */
//     borderBottom: "1px solid #f3f4f6", verticalAlign: "middle",
//   };

//   if (!projects.length) return (
//     <div style={{ padding: "80px 32px", textAlign: "center", color: "#9ca3af" }}>
//       <FolderOpen size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
//       <p style={{ fontSize: 14 }}>No projects match your search.</p>
//     </div>
//   );

//   return (
//     <div style={{ overflowX: "auto" }}>
//       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
//         <thead>
//           <tr>
//             {[
//               { key: "name",        label: "Project"     },
//               { key: "description", label: "Description" },
//               { key: "ownerId",     label: "Manager"     },
//               { key: "members",     label: "Members"     },
//               { key: null,          label: "Actions"     },
//             ].map(({ key, label }) => (
//               <th key={label}
//                 style={{ ...thStyle, cursor: key ? "pointer" : "default" }}
//                 onClick={() => key && toggleSort(key)}
//               >
//                 <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                   {label}{key && <SortIcon col={key} />}
//                 </span>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sorted.map((p, i) => {
//             const pal = PALETTE[i % PALETTE.length];
//             const manager = p.ownerId === currentUser?._id
//               ? currentUser?.name
//               : users.find((u) => u._id === p.ownerId)?.name || "—";
//             const memberNames = (p.members || [])
//               .filter((m) => m !== p.ownerId)
//               .map((id) => users.find((u) => u._id === id)?.name || id);

//             return (
//               <tr key={p._id} className="table-row" style={{ transition: "background 0.1s" }}>
//                 {/* Project name */}
//                 <td style={tdStyle}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                     <div style={{
//                       width: 42, height: 42, borderRadius: 9, flexShrink: 0,  /* bigger icon */
//                       background: pal.bg, color: pal.text,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: 14, fontWeight: 700,
//                     }}>{initials(p.name)}</div>
//                     <span style={{ fontWeight: 600, fontSize: 15 }}>
//                       <Highlighted text={p.name} query={query} />
//                     </span>
//                   </div>
//                 </td>

//                 {/* Description */}
//                 <td style={{ ...tdStyle, color: "#6b7280", maxWidth: 260 }}>
//                   <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>
//                     <Highlighted text={p.description || "—"} query={query} />
//                   </div>
//                 </td>

//                 {/* Manager */}
//                 <td style={tdStyle}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <Avatar name={manager} size={32} />   {/* larger avatar */}
//                     <span style={{ fontSize: 14 }}>
//                       <Highlighted text={manager} query={query} />
//                     </span>
//                   </div>
//                 </td>

//                 {/* Members */}
//                 <td style={tdStyle}>
//                   {memberNames.length === 0 ? (
//                     <span style={{ color: "#d1d5db", fontSize: 13 }}>No members</span>
//                   ) : (
//                     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                       <div style={{ display: "flex" }}>
//                         {memberNames.slice(0, 4).map((name, idx) => (
//                           <Avatar key={idx} name={name} size={32}   /* larger stacked avatars */
//                             style={{ marginLeft: idx > 0 ? -10 : 0, border: "2px solid #fff", zIndex: 10 - idx }}
//                           />
//                         ))}
//                       </div>
//                       {memberNames.length > 4 && (
//                         <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 6 }}>+{memberNames.length - 4}</span>
//                       )}
//                       <span style={{ fontSize: 13, color: "#6b7280", marginLeft: 4 }}>
//                         {memberNames.length} member{memberNames.length !== 1 ? "s" : ""}
//                       </span>
//                     </div>
//                   )}
//                 </td>

//                 {/* Actions */}
//                 <td style={{ ...tdStyle, width: 96 }}>
//                   <div style={{ display: "flex", gap: 6 }}>
//                     <button className="icon-btn" onClick={() => onEdit(p)} title="Edit"><Pencil size={14} /></button>
//                     <button className="icon-btn danger" onClick={() => onDelete(p._id)} title="Delete"><Trash2 size={14} /></button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function Projects() {
//   const [projects,        setProjects]        = useState([]);
//   const [users,           setUsers]           = useState([]);
//   const [currentUser,     setCurrentUser]     = useState(null);
//   const [view,            setView]            = useState("card");
//   const [loading,         setLoading]         = useState(true);
//   const [createOpen,      setCreateOpen]      = useState(false);
//   const [editOpen,        setEditOpen]        = useState(false);
//   const [editingProject,  setEditingProject]  = useState(null);
//   const [name,            setName]            = useState("");
//   const [desc,            setDesc]            = useState("");
//   const [editMembers,     setEditMembers]     = useState([]);

//   const [searchQuery,  setSearchQuery]  = useState("");
//   const [sortOption,   setSortOption]   = useState("");
//   const [memberFilter, setMemberFilter] = useState("");

//   const token = localStorage.getItem("token");

//   const loadProjects = useCallback(async () => {
//     try {
//       const res  = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
//       const data = await res.json();
//       setProjects(Array.isArray(data) ? data : []);
//     } catch { toast.error("Failed to load projects"); }
//   }, [token]);

//   const getMe = useCallback(async () => {
//     try {
//       const res  = await fetch(`${BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
//       const data = await res.json();
//       setCurrentUser(data);
//     } catch { toast.error("Failed to load user"); }
//   }, [token]);

//   const fetchUsers = useCallback(async () => {
//     try {
//       const res  = await fetch(`${BASE}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
//       const data = await res.json();
//       setUsers(Array.isArray(data) ? data.filter((u) => u.role === "Member") : []);
//     } catch { toast.error("Failed to load users"); }
//   }, [token]);

//   useEffect(() => {
//     Promise.all([loadProjects(), getMe(), fetchUsers()]).finally(() => setLoading(false));
//   }, [loadProjects, getMe, fetchUsers]);

//   const filteredProjects = useMemo(() => {
//     let list = Array.isArray(projects) ? [...projects] : [];

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       list = list.filter((p) => {
//         const managerName = p.ownerId === currentUser?._id
//           ? currentUser?.name
//           : users.find((u) => u._id === p.ownerId)?.name || "";
//         return (
//           p.name.toLowerCase().includes(q) ||
//           (p.description || "").toLowerCase().includes(q) ||
//           managerName.toLowerCase().includes(q)
//         );
//       });
//     }

//     if (memberFilter === "solo")  list = list.filter((p) => (p.members || []).filter((m) => m !== p.ownerId).length === 0);
//     if (memberFilter === "small") list = list.filter((p) => { const c = (p.members || []).filter((m) => m !== p.ownerId).length; return c >= 1 && c <= 3; });
//     if (memberFilter === "large") list = list.filter((p) => (p.members || []).filter((m) => m !== p.ownerId).length >= 4);

//     if (sortOption === "name-asc")      list.sort((a, b) => a.name.localeCompare(b.name));
//     if (sortOption === "name-desc")     list.sort((a, b) => b.name.localeCompare(a.name));
//     if (sortOption === "members-desc")  list.sort((a, b) => (b.members || []).length - (a.members || []).length);
//     if (sortOption === "members-asc")   list.sort((a, b) => (a.members || []).length - (b.members || []).length);

//     return list;
//   }, [projects, searchQuery, memberFilter, sortOption, currentUser, users]);

//   const hasActiveFilters = searchQuery || memberFilter || sortOption;

//   function clearAllFilters() {
//     setSearchQuery("");
//     setMemberFilter("");
//     setSortOption("");
//   }

//   const createProject = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name, description: desc,
//           color: PALETTE[projects.length % PALETTE.length].accent,
//           ownerId: currentUser._id,
//           members: [currentUser._id],
//         }),
//       });
//       if (!res.ok) throw new Error();
//       const newProject = await res.json();
//       setProjects((prev) => [newProject, ...prev]);
//       setName(""); setDesc("");
//       setCreateOpen(false);
//       toast.success("Project created");
//     } catch { toast.error("Create failed"); }
//   };

//   const deleteProject = async (id) => {
//     try {
//       await fetch(`${API}/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects((prev) => prev.filter((p) => p._id !== id));
//       toast.success("Project deleted");
//     } catch { toast.error("Delete failed"); }
//   };

//   const openEdit = (project) => {
//     setEditingProject(project);
//     setEditMembers(project.members.filter((m) => m !== project.ownerId));
//     setEditOpen(true);
//   };

//   const updateProject = async () => {
//     try {
//       const res = await fetch(`${API}/${editingProject._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ members: [editingProject.ownerId, ...editMembers] }),
//       });
//       if (!res.ok) throw new Error();
//       toast.success("Project updated");
//       setEditOpen(false);
//       await loadProjects();
//     } catch { toast.error("Update failed"); }
//   };

//   const addEditMember    = (id) => { if (id && !editMembers.includes(id)) setEditMembers((p) => [...p, id]); };
//   const removeEditMember = (id) => setEditMembers((p) => p.filter((m) => m !== id));
//   const resolveName  = (id) => {
//     if (id === currentUser?._id) return currentUser.name;
//     return users.find((u) => u._id === id)?.name || id;
//   };

//   const inputStyle = {
//     width: "100%", border: "1px solid #e5e7eb", borderRadius: 7,
//     padding: "9px 12px", fontSize: 14, color: "#111827",
//     background: "#f9fafb", outline: "none", fontFamily: "inherit",
//     transition: "border-color 0.15s, box-shadow 0.15s",
//   };
//   const labelStyle = {
//     fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block",
//   };

//   const filterSelectStyle = (hasValue) => ({
//     padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 500,
//     border: `1px solid ${hasValue ? "#7c3aed" : "#e5e7eb"}`, borderRadius: 7,
//     background: hasValue
//       ? `#f9f7ff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237c3aed' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 9px center`
//       : `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 9px center`,
//     appearance: "none", color: hasValue ? "#7c3aed" : "#374151",
//     cursor: "pointer", outline: "none",
//     transition: "border-color 0.15s",
//   });

//   return (
//     <>
//       <style>{`
//         .projects-root * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-sizing: border-box; }

//         .view-btn {
//           background: transparent; border: 1px solid #e5e7eb; border-radius: 7px;
//           padding: 6px 9px; cursor: pointer; color: #9ca3af;
//           display: flex; align-items: center; transition: all 0.15s;
//         }
//         .view-btn:hover { border-color: #7c3aed; color: #7c3aed; }
//         .view-btn.active { background: #7c3aed; border-color: #7c3aed; color: #fff; }

//         .project-card:hover {
//           box-shadow: 0 6px 24px rgba(0,0,0,0.09);
//           border-color: #c4b5fd !important;
//         }
//         .project-card:hover .card-actions { opacity: 1 !important; }

//         .table-row:hover { background: #fafafa; }

//         .icon-btn {
//           width: 32px; height: 32px; border: 1px solid #e5e7eb; background: #fff;
//           border-radius: 7px; cursor: pointer; display: flex; align-items: center;
//           justify-content: center; color: #9ca3af; transition: all 0.15s;
//         }
//         .icon-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f3f0ff; }
//         .icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

//         .pm-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
//         .search-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); background: #fff !important; }
//         .filter-select:hover { border-color: #7c3aed !important; }
//         .filter-select:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); outline: none; }

//         .new-project-btn:hover { background: #6d28d9 !important; box-shadow: 0 4px 12px rgba(124,58,237,0.4) !important; }
//         .new-project-wrap:hover .new-project-label { opacity: 1 !important; transform: translateY(0) !important; }
//       `}</style>

//       <div className="projects-root" style={{ padding: "32px", maxWidth: 1400, margin: "0 auto" }}>

//         {/* ── Page Header ── */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, overflow: "visible" }}>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>
//               Workspace
//             </div>
//             <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
//               Projects
//             </h1>
//             <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
//               Organize work into projects and track progress.
//             </p>
//           </div>
//           <div className="new-project-wrap" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <button
//               className="new-project-btn"
//               onClick={() => setCreateOpen(true)}
//               style={{
//                 background: "#7c3aed", color: "#fff", border: "none",
//                 width: 42, height: 42, borderRadius: 10, cursor: "pointer",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 transition: "background 0.15s, box-shadow 0.15s",
//                 boxShadow: "0 1px 4px rgba(124,58,237,0.3)",
//               }}
//             >
//               <Plus size={20} strokeWidth={2.2} />
//             </button>
//             <span className="new-project-label" style={{
//               position: "absolute", top: "calc(100% + 6px)",
//               fontSize: 11, fontWeight: 600, color: "#7c3aed",
//               whiteSpace: "nowrap", letterSpacing: "0.03em",
//               opacity: 0, transform: "translateY(-4px)",
//               transition: "opacity 0.18s, transform 0.18s",
//               pointerEvents: "none",
//             }}>
//               New Project
//             </span>
//           </div>
//         </div>

//         {/* ── Toolbar ── */}
//         <div style={{
//           display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
//           borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb",
//           padding: "10px 0", marginBottom: 0, background: "#fff",
//         }}>
//           <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
//             <Search size={14} style={{
//               position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
//               color: "#9ca3af", pointerEvents: "none",
//             }} />
//             <input
//               className="search-input"
//               type="text"
//               placeholder="Search projects…"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 width: "100%", padding: "7px 32px 7px 30px",
//                 border: "1px solid #e5e7eb", borderRadius: 8,
//                 fontSize: 13, color: "#111827", background: "#f9fafb",
//                 outline: "none", fontFamily: "inherit",
//                 transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
//               }}
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 style={{
//                   position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
//                   background: "none", border: "none", cursor: "pointer",
//                   color: "#9ca3af", display: "flex", padding: 2, borderRadius: 4,
//                 }}
//                 title="Clear search"
//               >
//                 <X size={13} />
//               </button>
//             )}
//           </div>

//           <select
//             className="filter-select"
//             style={filterSelectStyle(!!sortOption)}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             title="Sort projects"
//           >
//             <option value="">Sort: Default</option>
//             <option value="name-asc">Name A → Z</option>
//             <option value="name-desc">Name Z → A</option>
//             <option value="members-desc">Most members</option>
//             <option value="members-asc">Fewest members</option>
//           </select>

//           <select
//             className="filter-select"
//             style={filterSelectStyle(!!memberFilter)}
//             value={memberFilter}
//             onChange={(e) => setMemberFilter(e.target.value)}
//             title="Filter by team size"
//           >
//             <option value="">All sizes</option>
//             <option value="solo">Solo (0 members)</option>
//             <option value="small">Small (1–3)</option>
//             <option value="large">Large (4+)</option>
//           </select>

//           <div style={{ width: 1, height: 24, background: "#e5e7eb", margin: "0 2px" }} />

//           <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
//             {loading ? "Loading…" : `${filteredProjects.length} of ${projects.length} project${projects.length !== 1 ? "s" : ""}`}
//           </span>

//           <div style={{ display: "flex", gap: 4 }}>
//             <button className={`view-btn${view === "card"  ? " active" : ""}`} onClick={() => setView("card")}  title="Card view"><LayoutGrid size={20} /></button>
//             <button className={`view-btn${view === "table" ? " active" : ""}`} onClick={() => setView("table")} title="Table view"><List size={20} /></button>
//           </div>
//         </div>

//         {/* ── Active filter pills ── */}
//         {hasActiveFilters && (
//           <div style={{
//             display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6,
//             padding: "8px 0 0", fontSize: 12, color: "#9ca3af",
//           }}>
//             <SlidersHorizontal size={12} style={{ color: "#9ca3af" }} />
//             <span>Filters:</span>
//             {searchQuery && (
//               <FilterPill label={`"${searchQuery}"`} onRemove={() => setSearchQuery("")} />
//             )}
//             {memberFilter && (
//               <FilterPill
//                 label={{ solo: "Solo", small: "Small (1–3)", large: "Large (4+)" }[memberFilter]}
//                 onRemove={() => setMemberFilter("")}
//               />
//             )}
//             {sortOption && (
//               <FilterPill
//                 label={{ "name-asc": "A→Z", "name-desc": "Z→A", "members-desc": "Most members", "members-asc": "Fewest members" }[sortOption]}
//                 onRemove={() => setSortOption("")}
//               />
//             )}
//             <button
//               onClick={clearAllFilters}
//               style={{
//                 marginLeft: "auto", background: "none", border: "none",
//                 fontSize: 11, color: "#7c3aed", cursor: "pointer", fontWeight: 500,
//                 fontFamily: "inherit",
//               }}
//             >
//               Clear all
//             </button>
//           </div>
//         )}

//         {/* ── Main Content ── */}
//         <div style={{
//           border: "1px solid #e5e7eb",
//           borderTop: hasActiveFilters ? "1px solid #e5e7eb" : "none",
//           borderRadius: "0 0 10px 10px",
//           overflow: "hidden", background: "#fff",
//           marginTop: hasActiveFilters ? 8 : 0,
//         }}>
//           {loading ? (
//             <div style={{ padding: 60, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>Loading projects…</div>
//           ) : view === "card" ? (
//             <CardView projects={filteredProjects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} query={searchQuery} />
//           ) : (
//             <TableView projects={filteredProjects} users={users} currentUser={currentUser} onEdit={openEdit} onDelete={deleteProject} query={searchQuery} />
//           )}
//         </div>

//         {/* ── Create Dialog ── */}
//         <Dialog open={createOpen} onOpenChange={setCreateOpen}>
//           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
//             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
//               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>New</div>
//               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>Create Project</DialogTitle>
//             </div>
//             <form onSubmit={createProject}>
//               <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
//                 <div>
//                   <label style={labelStyle}>Project name</label>
//                   <input className="pm-input" style={inputStyle} placeholder="e.g. Brand Refresh"
//                     value={name} onChange={(e) => setName(e.target.value)} required />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Description</label>
//                   <textarea className="pm-input" style={{ ...inputStyle, resize: "none", height: 76, lineHeight: 1.55 }}
//                     placeholder="Brief overview…" value={desc} onChange={(e) => setDesc(e.target.value)} />
//                 </div>
//                 <div>
//                   <label style={labelStyle}>Manager</label>
//                   <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
//                     value={currentUser?.name || "Loading…"} disabled />
//                 </div>
//               </div>
//               <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
//                 <button type="button" onClick={() => setCreateOpen(false)} style={{
//                   background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
//                   padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
//                 }}>Cancel</button>
//                 <button type="submit" style={{
//                   background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
//                   padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
//                 }}>Create</button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>

//         {/* ── Edit Dialog ── */}
//         <Dialog open={editOpen} onOpenChange={setEditOpen}>
//           <DialogContent style={{ fontFamily: "inherit", borderRadius: 12, padding: 0, overflow: "hidden", border: "1px solid #e5e7eb", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
//             <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
//               <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 4 }}>Edit</div>
//               <DialogTitle style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
//                 {editingProject?.name || "Edit Project"}
//               </DialogTitle>
//             </div>
//             <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
//               <div>
//                 <label style={labelStyle}>Manager</label>
//                 <input className="pm-input" style={{ ...inputStyle, color: "#9ca3af", cursor: "not-allowed" }}
//                   value={
//                     currentUser?._id === editingProject?.ownerId
//                       ? currentUser?.name
//                       : users.find((u) => u._id === editingProject?.ownerId)?.name || "—"
//                   } disabled />
//               </div>
//               <div>
//                 <label style={labelStyle}>Members</label>
//                 <select className="pm-input" style={{
//                   ...inputStyle, cursor: "pointer", appearance: "none",
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7280' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
//                   backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
//                 }}
//                   value="" onChange={(e) => { addEditMember(e.target.value); e.target.value = ""; }}
//                 >
//                   <option value="">Add a member…</option>
//                   {users.filter((u) => !editMembers.includes(u._id)).map((u) => (
//                     <option key={u._id} value={u._id}>{u.name}</option>
//                   ))}
//                 </select>
//                 <MemberTags
//                   members={editMembers.map(resolveName)}
//                   onRemove={(name) => { const u = users.find((u) => u.name === name); if (u) removeEditMember(u._id); }}
//                 />
//               </div>
//             </div>
//             <div style={{ padding: "14px 24px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "flex-end", gap: 10 }}>
//               <button onClick={() => setEditOpen(false)} style={{
//                 background: "transparent", border: "1px solid #e5e7eb", borderRadius: 7,
//                 padding: "8px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151",
//               }}>Cancel</button>
//               <button onClick={updateProject} style={{
//                 background: "#7c3aed", color: "#fff", border: "none", borderRadius: 7,
//                 padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
//               }}>Save changes</button>
//             </div>
//           </DialogContent>
//         </Dialog>

//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";

import {
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PageHeader } from "@/components/PageHeader";

import { toast } from "sonner";

const API =
  "http://localhost:5000/api/projects";

const USER_API =
  "http://localhost:5000/api/admin/users";

const PALETTE = [
  {
    accent: "#7c3aed",
  },

  {
    accent: "#2563eb",
  },

  {
    accent: "#059669",
  },

  {
    accent: "#db2777",
  },
];

export default function Projects() {
  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [
    createOpen,
    setCreateOpen,
  ] = useState(false);

  const [name, setName] =
    useState("");

  const [desc, setDesc] =
    useState("");

  const [
    selectedMembers,
    setSelectedMembers,
  ] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  // ================= LOAD PROJECTS =================
  const loadProjects =
    async () => {
      try {
        const res = await fetch(
          API,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setProjects(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.log(err);

        toast.error(
          "Failed to load projects"
        );
      }
    };

  // ================= LOAD USERS =================
  const loadUsers =
    async () => {
      try {
        const res = await fetch(
          USER_API,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setUsers(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    loadProjects();

    loadUsers();
  }, []);

  // ================= CREATE =================
  const createProject =
    async (e) => {
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
              name,

              description:
                desc,

              color:
                PALETTE[
                  projects.length %
                    PALETTE.length
                ].accent,

              ownerId:
                currentUser._id,

              // ✅ IMPORTANT
              members:
                selectedMembers,
            }),
          }
        );

        if (!res.ok) {
          throw new Error();
        }

        const newProject =
          await res.json();

        setProjects((prev) => [
          newProject,
          ...prev,
        ]);

        setName("");

        setDesc("");

        setSelectedMembers(
          []
        );

        setCreateOpen(false);

        toast.success(
          "Project created"
        );

      } catch {
        toast.error(
          "Create failed"
        );
      }
    };

  // ================= DELETE =================
  const deleteProject =
    async (id) => {
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

        setProjects((prev) =>
          prev.filter(
            (p) =>
              p._id !== id
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

  // ================= UI =================
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Projects"
        description="Organize work into projects and track progress."
        action={
          <Button
            onClick={() =>
              setCreateOpen(
                true
              )
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            New project
          </Button>
        }
      />

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(
          (project) => (
            <Card
              key={
                project._id
              }
              className="p-5"
            >
              <div
                className="h-10 w-10 rounded-xl mb-4"
                style={{
                  background:
                    project.color,
                }}
              />

              <h2 className="font-bold text-lg">
                {project.name}
              </h2>

              <p className="text-sm text-muted-foreground mt-1 mb-4">
                {
                  project.description
                }
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {
                    project
                      .members
                      ?.length
                  }{" "}
                  members
                </span>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    deleteProject(
                      project._id
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )
        )}
      </div>

      {/* CREATE DIALOG */}
      <Dialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Project
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={
              createProject
            }
            className="space-y-4"
          >
            {/* NAME */}
            <div>
              <label className="text-sm font-medium">
                Project Name
              </label>

              <input
                className="w-full border rounded-lg px-3 py-2 mt-1"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target
                      .value
                  )
                }
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium">
                Description
              </label>

              <textarea
                className="w-full border rounded-lg px-3 py-2 mt-1 h-24"
                value={desc}
                onChange={(e) =>
                  setDesc(
                    e.target
                      .value
                  )
                }
              />
            </div>

            {/* MANAGER */}
            <div>
              <label className="text-sm font-medium">
                Manager
              </label>

              <input
                className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                value={
                  currentUser?.name
                }
                disabled
              />
            </div>

            {/* MEMBERS */}
            <div>
              <label className="text-sm font-medium">
                Assign Members
              </label>

              <select
                multiple
                value={
                  selectedMembers
                }
                onChange={(e) => {
                  const values =
                    Array.from(
                      e.target
                        .selectedOptions,
                      (
                        option
                      ) =>
                        option.value
                    );

                  setSelectedMembers(
                    values
                  );
                }}
                className="w-full border rounded-lg px-3 py-2 mt-1 min-h-[120px]"
              >
                {users
                  .filter(
                    (u) =>
                      u.role ===
                      "Member"
                  )
                  .map((user) => (
                    <option
                      key={
                        user._id
                      }
                      value={
                        user._id
                      }
                    >
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full"
            >
              Create Project
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}