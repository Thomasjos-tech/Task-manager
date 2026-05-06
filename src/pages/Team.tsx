// // // // // // import { useState } from "react";
// // // // // // import { useStore, Role } from "@/lib/store";
// // // // // // import { Card } from "@/components/ui/card";
// // // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // // import { Badge } from "@/components/ui/badge";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Label } from "@/components/ui/label";
// // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
// // // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // // import { UserPlus, Trash2 } from "lucide-react";
// // // // // // import { toast } from "sonner";

// // // // // // const Team = () => {
// // // // // //   const { users, tasks, currentUser, inviteUser, changeUserRole, removeUser } = useStore();
// // // // // //   const isAdmin = currentUser?.role === "Admin";
// // // // // //   const [open, setOpen] = useState(false);
// // // // // //   const [form, setForm] = useState({ name: "", email: "", password: "", role: "Member" as Role });

// // // // // //   const submit = (e: React.FormEvent) => {
// // // // // //     e.preventDefault();
// // // // // //     if (form.password.length < 6) return toast.error("Password must be 6+ characters");
// // // // // //     const r = inviteUser(form.name, form.email, form.password, form.role);
// // // // // //     if (!r.ok) return toast.error(r.error!);
// // // // // //     toast.success("Member invited");
// // // // // //     setForm({ name: "", email: "", password: "", role: "Member" });
// // // // // //     setOpen(false);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // // //       <PageHeader
// // // // // //         title="Team"
// // // // // //         description="People collaborating on your projects."
// // // // // //         action={
// // // // // //           isAdmin && (
// // // // // //             <Dialog open={open} onOpenChange={setOpen}>
// // // // // //               <DialogTrigger asChild>
// // // // // //                 <Button className="bg-gradient-primary border-0 shadow-elegant"><UserPlus className="h-4 w-4 mr-2" />Invite member</Button>
// // // // // //               </DialogTrigger>
// // // // // //               <DialogContent>
// // // // // //                 <DialogHeader><DialogTitle>Invite member</DialogTitle></DialogHeader>
// // // // // //                 <form onSubmit={submit} className="space-y-4">
// // // // // //                   <div className="space-y-2"><Label>Full name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
// // // // // //                   <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
// // // // // //                   <div className="space-y-2"><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
// // // // // //                   <div className="space-y-2">
// // // // // //                     <Label>Role</Label>
// // // // // //                     <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
// // // // // //                       <SelectTrigger><SelectValue /></SelectTrigger>
// // // // // //                       <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Member">Member</SelectItem></SelectContent>
// // // // // //                     </Select>
// // // // // //                   </div>
// // // // // //                   <DialogFooter><Button type="submit" className="bg-gradient-primary border-0">Invite</Button></DialogFooter>
// // // // // //                 </form>
// // // // // //               </DialogContent>
// // // // // //             </Dialog>
// // // // // //           )
// // // // // //         }
// // // // // //       />
// // // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // // //         {users.map((u) => {
// // // // // //           const count = tasks.filter((t) => t.assigneeId === u.id).length;
// // // // // //           const isSelf = u.id === currentUser?.id;
// // // // // //           return (
// // // // // //             <Card key={u.id} className="p-5 shadow-card border-0">
// // // // // //               <div className="flex items-center gap-4">
// // // // // //                 <Avatar className="h-12 w-12">
// // // // // //                   <AvatarFallback className="bg-gradient-primary text-primary-foreground">
// // // // // //                     {u.name.split(" ").map((n) => n[0]).join("")}
// // // // // //                   </AvatarFallback>
// // // // // //                 </Avatar>
// // // // // //                 <div className="flex-1 min-w-0">
// // // // // //                   <p className="font-semibold truncate">{u.name}{isSelf && <span className="text-xs text-muted-foreground ml-1">(you)</span>}</p>
// // // // // //                   <p className="text-xs text-muted-foreground truncate">{u.email}</p>
// // // // // //                   <div className="flex items-center gap-2 mt-1.5">
// // // // // //                     <Badge variant="secondary" className="text-[10px]">{u.role}</Badge>
// // // // // //                     <span className="text-xs text-muted-foreground">{count} tasks</span>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               {isAdmin && !isSelf && (
// // // // // //                 <div className="flex gap-2 mt-4 pt-4 border-t">
// // // // // //                   <Select value={u.role} onValueChange={(v) => { changeUserRole(u.id, v as Role); toast.success("Role updated"); }}>
// // // // // //                     <SelectTrigger className="h-8 text-xs flex-1"><SelectValue /></SelectTrigger>
// // // // // //                     <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Member">Member</SelectItem></SelectContent>
// // // // // //                   </Select>
// // // // // //                   <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => { removeUser(u.id); toast.success("Member removed"); }}>
// // // // // //                     <Trash2 className="h-4 w-4" />
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </Card>
// // // // // //           );
// // // // // //         })}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Team;
// // // // // import { useEffect, useState } from "react";

// // // // // import { Card } from "@/components/ui/card";
// // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // // import { Badge } from "@/components/ui/badge";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Label } from "@/components/ui/label";
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
// // // // // import { PageHeader } from "@/components/PageHeader";
// // // // // import { UserPlus, Trash2 } from "lucide-react";
// // // // // import { toast } from "sonner";

// // // // // type Role = "Admin" | "Member";

// // // // // const BASE_URL = "http://localhost:5000/api";

// // // // // const Team = () => {
// // // // //   const [users, setUsers] = useState<any[]>([]);
// // // // //   const [currentUser, setCurrentUser] = useState<any>(null);

// // // // //   const [open, setOpen] = useState(false);
// // // // //   const [form, setForm] = useState({
// // // // //     name: "",
// // // // //     email: "",
// // // // //     password: "",
// // // // //     role: "Member" as Role,
// // // // //   });

// // // // //   const token = localStorage.getItem("token");
// // // // //   const isAdmin = currentUser?.role === "Admin";

// // // // //   // 🔹 Get current user
// // // // //   const getMe = async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE_URL}/auth/me`, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       setCurrentUser(data);
// // // // //     } catch {
// // // // //       toast.error("Failed to load user");
// // // // //     }
// // // // //   };

// // // // //   // 🔹 Fetch users
// // // // //   const fetchUsers = async () => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       setUsers(data);
// // // // //     } catch {
// // // // //       toast.error("Error fetching users");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     getMe();
// // // // //     fetchUsers();
// // // // //   }, []);

// // // // //   // 🔹 Invite user
// // // // //   const submit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();

// // // // //     if (form.password.length < 6) {
// // // // //       return toast.error("Password must be 6+ characters");
// // // // //     }

// // // // //     try {
// // // // //       const res = await fetch(`${BASE_URL}/admin/invite`, {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //         body: JSON.stringify(form),
// // // // //       });

// // // // //       const data = await res.json();

// // // // //       if (!res.ok) return toast.error(data.message);

// // // // //       toast.success("Member invited");
// // // // //       setForm({ name: "", email: "", password: "", role: "Member" });
// // // // //       setOpen(false);
// // // // //       fetchUsers();
// // // // //     } catch {
// // // // //       toast.error("Error inviting user");
// // // // //     }
// // // // //   };

// // // // //   // 🔹 Change role
// // // // //   const changeRole = async (id: string, role: Role) => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
// // // // //         method: "PUT",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //         body: JSON.stringify({ role }),
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       if (!res.ok) return toast.error(data.message);

// // // // //       toast.success("Role updated");
// // // // //       fetchUsers();
// // // // //     } catch {
// // // // //       toast.error("Error updating role");
// // // // //     }
// // // // //   };

// // // // //   // 🔹 Delete user
// // // // //   const deleteUser = async (id: string) => {
// // // // //     try {
// // // // //       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
// // // // //         method: "DELETE",
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //         },
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       if (!res.ok) return toast.error(data.message);

// // // // //       toast.success("User removed");
// // // // //       fetchUsers();
// // // // //     } catch {
// // // // //       toast.error("Error deleting user");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-8 max-w-7xl mx-auto">
// // // // //       <PageHeader
// // // // //         title="Team"
// // // // //         description="People collaborating on your projects."
// // // // //         action={
// // // // //           isAdmin && (
// // // // //             <Dialog open={open} onOpenChange={setOpen}>
// // // // //               <DialogTrigger asChild>
// // // // //                 <Button>
// // // // //                   <UserPlus className="h-4 w-4 mr-2" />
// // // // //                   Invite member
// // // // //                 </Button>
// // // // //               </DialogTrigger>

// // // // //               <DialogContent>
// // // // //                 <DialogHeader>
// // // // //                   <DialogTitle>Invite member</DialogTitle>
// // // // //                 </DialogHeader>

// // // // //                 <form onSubmit={submit} className="space-y-4">
// // // // //                   <Input
// // // // //                     placeholder="Name"
// // // // //                     value={form.name}
// // // // //                     onChange={(e) =>
// // // // //                       setForm({ ...form, name: e.target.value })
// // // // //                     }
// // // // //                   />

// // // // //                   <Input
// // // // //                     placeholder="Email"
// // // // //                     value={form.email}
// // // // //                     onChange={(e) =>
// // // // //                       setForm({ ...form, email: e.target.value })
// // // // //                     }
// // // // //                   />

// // // // //                   <Input
// // // // //                     type="password"
// // // // //                     placeholder="Password"
// // // // //                     value={form.password}
// // // // //                     onChange={(e) =>
// // // // //                       setForm({ ...form, password: e.target.value })
// // // // //                     }
// // // // //                   />

// // // // //                   <Select
// // // // //                     value={form.role}
// // // // //                     onValueChange={(v) =>
// // // // //                       setForm({ ...form, role: v as Role })
// // // // //                     }
// // // // //                   >
// // // // //                     <SelectTrigger>
// // // // //                       <SelectValue />
// // // // //                     </SelectTrigger>
// // // // //                     <SelectContent>
// // // // //                       <SelectItem value="Admin">Admin</SelectItem>
// // // // //                       <SelectItem value="Member">Member</SelectItem>
// // // // //                     </SelectContent>
// // // // //                   </Select>

// // // // //                   <Button type="submit">Invite</Button>
// // // // //                 </form>
// // // // //               </DialogContent>
// // // // //             </Dialog>
// // // // //           )
// // // // //         }
// // // // //       />

// // // // //       <div className="grid grid-cols-3 gap-4">
// // // // //         {users.map((u) => {
// // // // //           const isSelf = u._id === currentUser?._id;

// // // // //           return (
// // // // //             <Card key={u._id} className="p-4">
// // // // //               <p>{u.name}</p>
// // // // //               <p>{u.email}</p>
// // // // //               <Badge>{u.role}</Badge>

// // // // //               {isAdmin && !isSelf && (
// // // // //                 <div className="flex gap-2 mt-2">
// // // // //                   <Select
// // // // //                     value={u.role}
// // // // //                     onValueChange={(v) =>
// // // // //                       changeRole(u._id, v as Role)
// // // // //                     }
// // // // //                   >
// // // // //                     <SelectTrigger>
// // // // //                       <SelectValue />
// // // // //                     </SelectTrigger>
// // // // //                     <SelectContent>
// // // // //                       <SelectItem value="Admin">Admin</SelectItem>
// // // // //                       <SelectItem value="Member">Member</SelectItem>
// // // // //                     </SelectContent>
// // // // //                   </Select>

// // // // //                   <Button
// // // // //                     variant="destructive"
// // // // //                     onClick={() => deleteUser(u._id)}
// // // // //                   >
// // // // //                     <Trash2 />
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               )}
// // // // //             </Card>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Team;
// // // // import { useEffect, useState } from "react";

// // // // import { Card } from "@/components/ui/card";
// // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";
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
// // // // import { UserPlus, Trash2 } from "lucide-react";
// // // // import { toast } from "sonner";

// // // // type Role = "Admin" | "Member";

// // // // const BASE_URL = "http://localhost:5000/api";

// // // // const Team = () => {
// // // //   const [users, setUsers] = useState<any[]>([]);
// // // //   const [currentUser, setCurrentUser] = useState<any>(null);

// // // //   const [open, setOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     password: "",
// // // //     role: "Member" as Role,
// // // //   });

// // // //   const token = localStorage.getItem("token");

// // // //   const isAdmin = currentUser?.role === "Admin";

// // // //   // 🔹 Fetch current user
// // // //   const getMe = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/me`, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });

// // // //       if (!res.ok) throw new Error();

// // // //       const data = await res.json();
// // // //       setCurrentUser(data);
// // // //     } catch {
// // // //       toast.error("Login expired. Please login again.");
// // // //     }
// // // //   };

// // // //   // 🔹 Fetch users
// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) return toast.error(data.message);

// // // //       setUsers(data);
// // // //     } catch {
// // // //       toast.error("Failed to load users");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!token) {
// // // //       toast.error("Please login first");
// // // //       return;
// // // //     }

// // // //     getMe();
// // // //     fetchUsers();
// // // //   }, []);

// // // //   // 🔹 Invite user
// // // //   const submit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();

// // // //     if (form.password.length < 6) {
// // // //       return toast.error("Password must be 6+ characters");
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/invite`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify(form),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("User invited");

// // // //       setForm({
// // // //         name: "",
// // // //         email: "",
// // // //         password: "",
// // // //         role: "Member",
// // // //       });

// // // //       setOpen(false);
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Error inviting user");
// // // //     }
// // // //   };

// // // //   // 🔹 Change role
// // // //   const changeRole = async (id: string, role: Role) => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify({ role }),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("Role updated");
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Error updating role");
// // // //     }
// // // //   };

// // // //   // 🔹 Delete user
// // // //   const deleteUser = async (id: string) => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
// // // //         method: "DELETE",
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("User deleted");
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Error deleting user");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-8 max-w-7xl mx-auto">
// // // //       <PageHeader
// // // //         title="Team"
// // // //         description="Manage your team members"
// // // //         action={
// // // //           isAdmin && (
// // // //             <Dialog open={open} onOpenChange={setOpen}>
// // // //               <DialogTrigger asChild>
// // // //                 <Button>
// // // //                   <UserPlus className="h-4 w-4 mr-2" />
// // // //                   Invite Member
// // // //                 </Button>
// // // //               </DialogTrigger>

// // // //               <DialogContent>
// // // //                 <DialogHeader>
// // // //                   <DialogTitle>Invite Member</DialogTitle>
// // // //                 </DialogHeader>

// // // //                 <form onSubmit={submit} className="space-y-4">
// // // //                   <Input
// // // //                     placeholder="Name"
// // // //                     value={form.name}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, name: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   <Input
// // // //                     placeholder="Email"
// // // //                     value={form.email}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, email: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   <Input
// // // //                     type="password"
// // // //                     placeholder="Password"
// // // //                     value={form.password}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, password: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   <Select
// // // //                     value={form.role}
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, role: v as Role })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger>
// // // //                       <SelectValue />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="Admin">Admin</SelectItem>
// // // //                       <SelectItem value="Member">Member</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   <DialogFooter>
// // // //                     <Button type="submit">Invite</Button>
// // // //                   </DialogFooter>
// // // //                 </form>
// // // //               </DialogContent>
// // // //             </Dialog>
// // // //           )
// // // //         }
// // // //       />

// // // //       {/* USERS LIST */}
// // // //       {loading ? (
// // // //         <p>Loading...</p>
// // // //       ) : (
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //           {users.map((u) => {
// // // //             const isSelf = u._id === currentUser?._id;

// // // //             return (
// // // //               <Card key={u._id} className="p-4">
// // // //                 <div className="flex gap-3">
// // // //                   <Avatar>
// // // //                     <AvatarFallback>
// // // //                       {u.name
// // // //                         .split(" ")
// // // //                         .map((n: string) => n[0])
// // // //                         .join("")}
// // // //                     </AvatarFallback>
// // // //                   </Avatar>

// // // //                   <div>
// // // //                     <p className="font-semibold">
// // // //                       {u.name} {isSelf && "(You)"}
// // // //                     </p>
// // // //                     <p className="text-sm text-gray-500">{u.email}</p>
// // // //                     <Badge>{u.role}</Badge>
// // // //                   </div>
// // // //                 </div>

// // // //                 {isAdmin && !isSelf && (
// // // //                   <div className="flex gap-2 mt-4">
// // // //                     <Select
// // // //                       value={u.role}
// // // //                       onValueChange={(v) =>
// // // //                         changeRole(u._id, v as Role)
// // // //                       }
// // // //                     >
// // // //                       <SelectTrigger className="h-8 text-xs flex-1">
// // // //                         <SelectValue />
// // // //                       </SelectTrigger>
// // // //                       <SelectContent>
// // // //                         <SelectItem value="Admin">Admin</SelectItem>
// // // //                         <SelectItem value="Member">Member</SelectItem>
// // // //                       </SelectContent>
// // // //                     </Select>

// // // //                     <Button
// // // //                       size="icon"
// // // //                       variant="destructive"
// // // //                       onClick={() => deleteUser(u._id)}
// // // //                     >
// // // //                       <Trash2 className="h-4 w-4" />
// // // //                     </Button>
// // // //                   </div>
// // // //                 )}
// // // //               </Card>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Team;
// // // // import { useEffect, useState } from "react";

// // // // import { Card } from "@/components/ui/card";
// // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Label } from "@/components/ui/label";

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
// // // // import { UserPlus, Trash2 } from "lucide-react";
// // // // import { toast } from "sonner";

// // // // const BASE_URL = "http://localhost:5000/api";

// // // // export default function Team() {
// // // //   const [users, setUsers] = useState([]);
// // // //   const [projects, setProjects] = useState([]);
// // // //   const [currentUser, setCurrentUser] = useState(null);

// // // //   const [open, setOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const [form, setForm] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     password: "",
// // // //     role: "Member",
// // // //     projects: [],
// // // //   });

// // // //   const token = localStorage.getItem("token");

// // // //   const isAdmin = currentUser?.role === "Admin";

// // // //   // ================= CURRENT USER =================
// // // //   const getMe = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/auth/me`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) throw new Error();

// // // //       setCurrentUser(data);
// // // //     } catch {
// // // //       toast.error("Session expired");
// // // //     }
// // // //   };

// // // //   // ================= USERS =================
// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) return toast.error(data.message);

// // // //       setUsers(data);
// // // //     } catch {
// // // //       toast.error("Failed to load users");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ================= PROJECTS =================
// // // //   const fetchProjects = async () => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/projects`);
// // // //       const data = await res.json();
// // // //       setProjects(data);
// // // //     } catch {
// // // //       toast.error("Failed to load projects");
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (!token) return;

// // // //     getMe();
// // // //     fetchUsers();
// // // //     fetchProjects();
// // // //   }, []);

// // // //   // ================= INVITE =================
// // // //   const submit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (form.password.length < 6) {
// // // //       return toast.error("Password must be 6+ characters");
// // // //     }

// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/invite`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify(form),
// // // //       });

// // // //       const data = await res.json();

// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("User invited");

// // // //       setForm({
// // // //         name: "",
// // // //         email: "",
// // // //         password: "",
// // // //         role: "Member",
// // // //         projects: [],
// // // //       });

// // // //       setOpen(false);
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Invite failed");
// // // //     }
// // // //   };

// // // //   // ================= ROLE =================
// // // //   const changeRole = async (id, role) => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer ${token}`,
// // // //         },
// // // //         body: JSON.stringify({ role }),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("Role updated");
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Update failed");
// // // //     }
// // // //   };

// // // //   // ================= PROJECT UPDATE =================
// // // //   const updateUserProject = async (id, projectId) => {
// // // //     try {
// // // //       const res = await fetch(
// // // //         `${BASE_URL}/admin/projects/${id}`,
// // // //         {
// // // //           method: "PUT",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //           body: JSON.stringify({
// // // //             projects: [projectId],
// // // //           }),
// // // //         }
// // // //       );

// // // //       const data = await res.json();

// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("Project updated");
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Project update failed");
// // // //     }
// // // //   };

// // // //   // ================= DELETE =================
// // // //   const deleteUser = async (id) => {
// // // //     try {
// // // //       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
// // // //         method: "DELETE",
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) return toast.error(data.message);

// // // //       toast.success("User deleted");
// // // //       fetchUsers();
// // // //     } catch {
// // // //       toast.error("Delete failed");
// // // //     }
// // // //   };

// // // //   // ================= UI =================
// // // //   return (
// // // //     <div className="p-8 max-w-7xl mx-auto">
// // // //       <PageHeader
// // // //         title="Team"
// // // //         description="Manage your team members"
// // // //         action={
// // // //           isAdmin && (
// // // //             <Dialog open={open} onOpenChange={setOpen}>
// // // //               <DialogTrigger asChild>
// // // //                 <Button>
// // // //                   <UserPlus className="h-4 w-4 mr-2" />
// // // //                   Invite Member
// // // //                 </Button>
// // // //               </DialogTrigger>

// // // //               <DialogContent>
// // // //                 <DialogHeader>
// // // //                   <DialogTitle>Invite Member</DialogTitle>
// // // //                 </DialogHeader>

// // // //                 <form onSubmit={submit} className="space-y-4">
// // // //                   <Input
// // // //                     placeholder="Name"
// // // //                     value={form.name}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, name: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   <Input
// // // //                     placeholder="Email"
// // // //                     value={form.email}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, email: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   <Input
// // // //                     type="password"
// // // //                     placeholder="Password"
// // // //                     value={form.password}
// // // //                     onChange={(e) =>
// // // //                       setForm({ ...form, password: e.target.value })
// // // //                     }
// // // //                   />

// // // //                   {/* ROLE */}
// // // //                   <Select
// // // //                     value={form.role}
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, role: v })
// // // //                     }
// // // //                   >
// // // //                     <SelectTrigger>
// // // //                       <SelectValue />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="Admin">Admin</SelectItem>
// // // //                       <SelectItem value="Member">Member</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>

// // // //                   {/* PROJECT DROPDOWN */}
// // // //                   <Select
// // // //                     onValueChange={(v) =>
// // // //                       setForm({ ...form, projects: [v] })
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

// // // //                   <DialogFooter>
// // // //                     <Button type="submit">Invite</Button>
// // // //                   </DialogFooter>
// // // //                 </form>
// // // //               </DialogContent>
// // // //             </Dialog>
// // // //           )
// // // //         }
// // // //       />

// // // //       {/* USERS */}
// // // //       {loading ? (
// // // //         <p>Loading...</p>
// // // //       ) : (
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //           {users.map((u) => {
// // // //             const isSelf = u._id === currentUser?._id;

// // // //             return (
// // // //               <Card key={u._id} className="p-4">
// // // //                 <div className="flex gap-3">
// // // //                   <Avatar>
// // // //                     <AvatarFallback>
// // // //                       {u.name
// // // //                         .split(" ")
// // // //                         .map((n) => n[0])
// // // //                         .join("")}
// // // //                     </AvatarFallback>
// // // //                   </Avatar>

// // // //                   <div>
// // // //                     <p className="font-semibold">
// // // //                       {u.name} {isSelf && "(You)"}
// // // //                     </p>
// // // //                     <p className="text-sm text-gray-500">
// // // //                       {u.email}
// // // //                     </p>
// // // //                     <Badge>{u.role}</Badge>
// // // //                   </div>
// // // //                 </div>

// // // //                 {isAdmin && !isSelf && (
// // // //                   <div className="flex gap-2 mt-4 flex-col">
// // // //                     {/* ROLE */}
// // // //                     <Select
// // // //                       value={u.role}
// // // //                       onValueChange={(v) =>
// // // //                         changeRole(u._id, v)
// // // //                       }
// // // //                     >
// // // //                       <SelectTrigger className="h-8 text-xs">
// // // //                         <SelectValue />
// // // //                       </SelectTrigger>
// // // //                       <SelectContent>
// // // //                         <SelectItem value="Admin">
// // // //                           Admin
// // // //                         </SelectItem>
// // // //                         <SelectItem value="Member">
// // // //                           Member
// // // //                         </SelectItem>
// // // //                       </SelectContent>
// // // //                     </Select>

// // // //                     {/* PROJECT */}
// // // //                     <Select
// // // //                       value={u.projects?.[0] || ""}
// // // //                       onValueChange={(v) =>
// // // //                         updateUserProject(u._id, v)
// // // //                       }
// // // //                     >
// // // //                       <SelectTrigger className="h-8 text-xs">
// // // //                         <SelectValue placeholder="Assign project" />
// // // //                       </SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {projects.map((p) => (
// // // //                           <SelectItem
// // // //                             key={p._id}
// // // //                             value={p._id}
// // // //                           >
// // // //                             {p.name}
// // // //                           </SelectItem>
// // // //                         ))}
// // // //                       </SelectContent>
// // // //                     </Select>

// // // //                     <Button
// // // //                       size="icon"
// // // //                       variant="destructive"
// // // //                       onClick={() => deleteUser(u._id)}
// // // //                     >
// // // //                       <Trash2 className="h-4 w-4" />
// // // //                     </Button>
// // // //                   </div>
// // // //                 )}
// // // //               </Card>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState, useRef } from "react";

// // // import { Card } from "@/components/ui/card";
// // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";

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

// // // import { PageHeader } from "@/components/PageHeader";
// // // import {
// // //   UserPlus,
// // //   Trash2,
// // //   Search,
// // //   LayoutGrid,
// // //   LayoutList,
// // //   Shield,
// // //   Users,
// // //   Wifi,
// // //   Pencil,
// // //   Mail,
// // //   FolderOpen,
// // // } from "lucide-react";
// // // import { toast } from "sonner";

// // // const BASE_URL = "http://localhost:5000/api";

// // // // ─── Role badge styling ───────────────────────────────────────────────────────
// // // const ROLE_STYLES = {
// // //   Admin: {
// // //     badge: "bg-[#EEEDFE] text-[#3C3489] border-0",
// // //     avatar: "bg-[#EEEDFE] text-[#3C3489]",
// // //   },
// // //   Member: {
// // //     badge: "bg-[#E1F5EE] text-[#085041] border-0",
// // //     avatar: "bg-[#E1F5EE] text-[#085041]",
// // //   },
// // //   PM: {
// // //     badge: "bg-[#FBEAF0] text-[#72243E] border-0",
// // //     avatar: "bg-[#FBEAF0] text-[#72243E]",
// // //   },
// // // };

// // // function getInitials(name = "") {
// // //   return name
// // //     .split(" ")
// // //     .map((n) => n[0])
// // //     .join("")
// // //     .toUpperCase()
// // //     .slice(0, 2);
// // // }

// // // // ─── Tooltip wrapper for icon-only button ────────────────────────────────────
// // // function TooltipButton({ label, children, onClick, className = "" }) {
// // //   return (
// // //     <div className="relative group inline-flex">
// // //       <button
// // //         onClick={onClick}
// // //         aria-label={label}
// // //         className={`flex items-center justify-center rounded-md transition-opacity hover:opacity-80 ${className}`}
// // //       >
// // //         {children}
// // //       </button>
// // //       <span
// // //         className="
// // //           pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
// // //           whitespace-nowrap rounded-md bg-foreground text-background text-[11px] px-2.5 py-1
// // //           opacity-0 group-hover:opacity-100 transition-opacity duration-150
// // //           after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
// // //           after:border-4 after:border-transparent after:border-t-foreground
// // //         "
// // //       >
// // //         {label}
// // //       </span>
// // //     </div>
// // //   );
// // // }

// // // // ─── Stat pill ────────────────────────────────────────────────────────────────
// // // function StatPill({ icon: Icon, value, label }) {
// // //   return (
// // //     <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/60 px-3 py-1 text-[13px] text-muted-foreground">
// // //       <Icon className="h-3.5 w-3.5" />
// // //       <strong className="font-medium text-foreground">{value}</strong>
// // //       {label}
// // //     </div>
// // //   );
// // // }

// // // // ─── Member Card ─────────────────────────────────────────────────────────────
// // // function MemberCard({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
// // //   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

// // //   return (
// // //     <Card className="p-4 flex flex-col gap-3 border-border/50 hover:border-border transition-colors">
// // //       {/* Top row */}
// // //       <div className="flex items-center gap-3">
// // //         <Avatar className={`h-10 w-10 ${style.avatar}`}>
// // //           <AvatarFallback className={`text-[13px] font-medium ${style.avatar}`}>
// // //             {getInitials(user.name)}
// // //           </AvatarFallback>
// // //         </Avatar>
// // //         <div className="flex-1 min-w-0">
// // //           <p className="text-[14px] font-medium truncate">
// // //             {user.name}{" "}
// // //             {isSelf && <span className="text-[11px] font-normal text-muted-foreground">(you)</span>}
// // //           </p>
// // //           <p className="text-[12px] text-muted-foreground truncate">{user.email}</p>
// // //         </div>
// // //         <Badge className={`text-[11px] shrink-0 ${style.badge}`}>{user.role}</Badge>
// // //       </div>

// // //       {/* Project tag */}
// // //       {user.projects?.[0] && (
// // //         <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
// // //           <FolderOpen className="h-3.5 w-3.5" />
// // //           <span>{projects.find((p) => p._id === user.projects[0])?.name || "—"}</span>
// // //         </div>
// // //       )}

// // //       {/* Admin controls */}
// // //       {isAdmin && !isSelf && (
// // //         <div className="flex flex-col gap-2 pt-3 border-t border-border/40">
// // //           <div className="flex gap-2">
// // //             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
// // //               <SelectTrigger className="h-7 text-xs flex-1">
// // //                 <SelectValue />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="Admin">Admin</SelectItem>
// // //                 <SelectItem value="Member">Member</SelectItem>
// // //                 <SelectItem value="PM">PM</SelectItem>
// // //               </SelectContent>
// // //             </Select>

// // //             <Select
// // //               value={user.projects?.[0] || ""}
// // //               onValueChange={(v) => onUpdateProject(user._id, v)}
// // //             >
// // //               <SelectTrigger className="h-7 text-xs flex-1">
// // //                 <SelectValue placeholder="Assign project" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 {projects.map((p) => (
// // //                   <SelectItem key={p._id} value={p._id}>
// // //                     {p.name}
// // //                   </SelectItem>
// // //                 ))}
// // //               </SelectContent>
// // //             </Select>
// // //           </div>

// // //           <div className="flex justify-end">
// // //             <TooltipButton
// // //               label="Remove member"
// // //               onClick={() => onDelete(user._id)}
// // //               className="h-7 w-7 rounded-md border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
// // //             >
// // //               <Trash2 className="h-3.5 w-3.5" />
// // //             </TooltipButton>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </Card>
// // //   );
// // // }

// // // // ─── Member Table Row ─────────────────────────────────────────────────────────
// // // function MemberTableRow({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
// // //   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

// // //   return (
// // //     <tr className="border-b border-border/30 hover:bg-muted/30 transition-colors">
// // //       <td className="py-3 px-4">
// // //         <div className="flex items-center gap-3">
// // //           <Avatar className={`h-8 w-8 ${style.avatar}`}>
// // //             <AvatarFallback className={`text-[11px] font-medium ${style.avatar}`}>
// // //               {getInitials(user.name)}
// // //             </AvatarFallback>
// // //           </Avatar>
// // //           <div>
// // //             <p className="text-[14px] font-medium leading-tight">
// // //               {user.name}{" "}
// // //               {isSelf && <span className="text-[11px] font-normal text-muted-foreground">(you)</span>}
// // //             </p>
// // //             <p className="text-[12px] text-muted-foreground">{user.email}</p>
// // //           </div>
// // //         </div>
// // //       </td>
// // //       <td className="py-3 px-4">
// // //         <Badge className={`text-[11px] ${style.badge}`}>{user.role}</Badge>
// // //       </td>
// // //       <td className="py-3 px-4 text-[13px] text-muted-foreground">
// // //         {projects.find((p) => p._id === user.projects?.[0])?.name || "—"}
// // //       </td>
// // //       <td className="py-3 px-4">
// // //         {isAdmin && !isSelf && (
// // //           <div className="flex items-center gap-2">
// // //             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
// // //               <SelectTrigger className="h-7 text-xs w-24">
// // //                 <SelectValue />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="Admin">Admin</SelectItem>
// // //                 <SelectItem value="Member">Member</SelectItem>
// // //                 <SelectItem value="PM">PM</SelectItem>
// // //               </SelectContent>
// // //             </Select>

// // //             <Select
// // //               value={user.projects?.[0] || ""}
// // //               onValueChange={(v) => onUpdateProject(user._id, v)}
// // //             >
// // //               <SelectTrigger className="h-7 text-xs w-32">
// // //                 <SelectValue placeholder="Project" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 {projects.map((p) => (
// // //                   <SelectItem key={p._id} value={p._id}>
// // //                     {p.name}
// // //                   </SelectItem>
// // //                 ))}
// // //               </SelectContent>
// // //             </Select>

// // //             <TooltipButton
// // //               label="Remove member"
// // //               onClick={() => onDelete(user._id)}
// // //               className="h-7 w-7 border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
// // //             >
// // //               <Trash2 className="h-3.5 w-3.5" />
// // //             </TooltipButton>
// // //           </div>
// // //         )}
// // //       </td>
// // //     </tr>
// // //   );
// // // }

// // // // ─── Invite Dialog ────────────────────────────────────────────────────────────
// // // function InviteDialog({ open, onOpenChange, projects, onInvited }) {
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     email: "",
// // //     password: "",
// // //     role: "Member",
// // //     projects: [],
// // //   });
// // //   const token = localStorage.getItem("token");

// // //   const submit = async (e) => {
// // //     e.preventDefault();
// // //     if (form.password.length < 6) return toast.error("Password must be 6+ characters");
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/admin/invite`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify(form),
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) return toast.error(data.message);
// // //       toast.success("Invitation sent");
// // //       setForm({ name: "", email: "", password: "", role: "Member", projects: [] });
// // //       onOpenChange(false);
// // //       onInvited();
// // //     } catch {
// // //       toast.error("Invite failed");
// // //     }
// // //   };

// // //   return (
// // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // //       <DialogContent className="sm:max-w-[420px]">
// // //         <DialogHeader>
// // //           <DialogTitle className="text-base font-medium">Invite team member</DialogTitle>
// // //         </DialogHeader>

// // //         <form onSubmit={submit} className="space-y-3 pt-1">
// // //           <div className="space-y-1.5">
// // //             <Label className="text-xs text-muted-foreground font-medium">Full name</Label>
// // //             <Input
// // //               placeholder="Alex Johnson"
// // //               value={form.name}
// // //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// // //             />
// // //           </div>

// // //           <div className="space-y-1.5">
// // //             <Label className="text-xs text-muted-foreground font-medium">Email address</Label>
// // //             <Input
// // //               placeholder="alex@company.com"
// // //               type="email"
// // //               value={form.email}
// // //               onChange={(e) => setForm({ ...form, email: e.target.value })}
// // //             />
// // //           </div>

// // //           <div className="space-y-1.5">
// // //             <Label className="text-xs text-muted-foreground font-medium">Password</Label>
// // //             <Input
// // //               type="password"
// // //               placeholder="Min. 6 characters"
// // //               value={form.password}
// // //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// // //             />
// // //           </div>

// // //           <div className="grid grid-cols-2 gap-3">
// // //             <div className="space-y-1.5">
// // //               <Label className="text-xs text-muted-foreground font-medium">Role</Label>
// // //               <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
// // //                 <SelectTrigger>
// // //                   <SelectValue />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   <SelectItem value="Admin">Admin</SelectItem>
// // //                   <SelectItem value="Member">Member</SelectItem>
// // //                   <SelectItem value="PM">PM</SelectItem>
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>

// // //             <div className="space-y-1.5">
// // //               <Label className="text-xs text-muted-foreground font-medium">Project</Label>
// // //               <Select onValueChange={(v) => setForm({ ...form, projects: [v] })}>
// // //                 <SelectTrigger>
// // //                   <SelectValue placeholder="Select…" />
// // //                 </SelectTrigger>
// // //                 <SelectContent>
// // //                   {projects.map((p) => (
// // //                     <SelectItem key={p._id} value={p._id}>
// // //                       {p.name}
// // //                     </SelectItem>
// // //                   ))}
// // //                 </SelectContent>
// // //               </Select>
// // //             </div>
// // //           </div>

// // //           <DialogFooter className="pt-2">
// // //             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
// // //               Cancel
// // //             </Button>
// // //             <Button type="submit">Send invite</Button>
// // //           </DialogFooter>
// // //         </form>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }

// // // // ─── Main Page ────────────────────────────────────────────────────────────────
// // // export default function Team() {
// // //   const [users, setUsers] = useState([]);
// // //   const [projects, setProjects] = useState([]);
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [open, setOpen] = useState(false);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState("");
// // //   const [roleFilter, setRoleFilter] = useState("all");
// // //   const [view, setView] = useState("card"); // "card" | "table"

// // //   const token = localStorage.getItem("token");
// // //   const isAdmin = currentUser?.role === "Admin";

// // //   // ── Fetch helpers ──────────────────────────────────────────────────────────
// // //   const getMe = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/auth/me`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error();
// // //       setCurrentUser(data);
// // //     } catch {
// // //       toast.error("Session expired");
// // //     }
// // //   };

// // //   const fetchUsers = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/admin/users`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) return toast.error(data.message);
// // //       setUsers(data);
// // //     } catch {
// // //       toast.error("Failed to load users");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchProjects = async () => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/projects`);
// // //       const data = await res.json();
// // //       setProjects(data);
// // //     } catch {
// // //       toast.error("Failed to load projects");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (!token) return;
// // //     getMe();
// // //     fetchUsers();
// // //     fetchProjects();
// // //   }, []);

// // //   // ── Actions ────────────────────────────────────────────────────────────────
// // //   const changeRole = async (id, role) => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// // //         body: JSON.stringify({ role }),
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) return toast.error(data.message);
// // //       toast.success("Role updated");
// // //       fetchUsers();
// // //     } catch {
// // //       toast.error("Update failed");
// // //     }
// // //   };

// // //   const updateUserProject = async (id, projectId) => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/admin/projects/${id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// // //         body: JSON.stringify({ projects: [projectId] }),
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) return toast.error(data.message);
// // //       toast.success("Project updated");
// // //       fetchUsers();
// // //     } catch {
// // //       toast.error("Project update failed");
// // //     }
// // //   };

// // //   const deleteUser = async (id) => {
// // //     try {
// // //       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
// // //         method: "DELETE",
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) return toast.error(data.message);
// // //       toast.success("User removed");
// // //       fetchUsers();
// // //     } catch {
// // //       toast.error("Delete failed");
// // //     }
// // //   };

// // //   // ── Filtered list ──────────────────────────────────────────────────────────
// // //   const filtered = users.filter((u) => {
// // //     const matchRole = roleFilter === "all" || u.role === roleFilter;
// // //     const matchSearch =
// // //       u.name.toLowerCase().includes(search.toLowerCase()) ||
// // //       u.email.toLowerCase().includes(search.toLowerCase());
// // //     return matchRole && matchSearch;
// // //   });

// // //   const adminCount = users.filter((u) => u.role === "Admin").length;

// // //   // ── Filter tabs ────────────────────────────────────────────────────────────
// // //   const FILTERS = ["all", "Admin", "Member", "PM"];

// // //   return (
// // //     <div className="p-8 max-w-7xl mx-auto">
// // //       {/* Header */}
// // //       <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-xl font-medium">Team</h1>
// // //           <p className="text-sm text-muted-foreground mt-0.5">
// // //             Manage your team members and their access
// // //           </p>
// // //         </div>

// // //         {/* Stat pills */}
// // //         <div className="flex flex-wrap gap-2">
// // //           <StatPill icon={Users} value={users.length} label={`member${users.length !== 1 ? "s" : ""}`} />
// // //           <StatPill icon={Shield} value={adminCount} label={`admin${adminCount !== 1 ? "s" : ""}`} />
// // //         </div>
// // //       </div>

// // //       {/* Controls bar */}
// // //       <div className="flex flex-wrap items-center gap-2.5 mb-5">
// // //         {/* Search */}
// // //         <div className="relative flex-1 min-w-[180px]">
// // //           <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
// // //           <Input
// // //             className="pl-8 h-9 text-sm"
// // //             placeholder="Search members…"
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //           />
// // //         </div>

// // //         {/* Role filter */}
// // //         <div className="flex items-center gap-1 bg-muted/60 border border-border/40 rounded-md p-1">
// // //           {FILTERS.map((f) => (
// // //             <button
// // //               key={f}
// // //               onClick={() => setRoleFilter(f)}
// // //               className={`px-3 py-1 rounded text-[13px] transition-all ${
// // //                 roleFilter === f
// // //                   ? "bg-background text-foreground font-medium shadow-sm border border-border/40"
// // //                   : "text-muted-foreground hover:text-foreground"
// // //               }`}
// // //             >
// // //               {f === "all" ? "All" : f}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* View toggle */}
// // //         <div className="flex border border-border/50 rounded-md overflow-hidden">
// // //           <TooltipButton
// // //             label="Card view"
// // //             onClick={() => setView("card")}
// // //             className={`h-9 w-9 transition-colors ${
// // //               view === "card" ? "bg-muted text-foreground" : "text-muted-foreground"
// // //             }`}
// // //           >
// // //             <LayoutGrid className="h-4 w-4" />
// // //           </TooltipButton>
// // //           <div className="w-px bg-border/50" />
// // //           <TooltipButton
// // //             label="Table view"
// // //             onClick={() => setView("table")}
// // //             className={`h-9 w-9 transition-colors ${
// // //               view === "table" ? "bg-muted text-foreground" : "text-muted-foreground"
// // //             }`}
// // //           >
// // //             <LayoutList className="h-4 w-4" />
// // //           </TooltipButton>
// // //         </div>

// // //         {/* Invite — icon only with tooltip */}
// // //         {isAdmin && (
// // //           <TooltipButton
// // //             label="Invite member"
// // //             onClick={() => setOpen(true)}
// // //             className="h-9 w-9 bg-foreground text-background rounded-md"
// // //           >
// // //             <UserPlus className="h-4 w-4" />
// // //           </TooltipButton>
// // //         )}
// // //       </div>

// // //       {/* Invite dialog */}
// // //       <InviteDialog
// // //         open={open}
// // //         onOpenChange={setOpen}
// // //         projects={projects}
// // //         onInvited={fetchUsers}
// // //       />

// // //       {/* Content */}
// // //       {loading ? (
// // //         <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
// // //           Loading…
// // //         </div>
// // //       ) : filtered.length === 0 ? (
// // //         <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted-foreground">
// // //           <Users className="h-8 w-8 opacity-30" />
// // //           <p className="text-sm">No members match your filter</p>
// // //         </div>
// // //       ) : view === "card" ? (
// // //         /* ── Card Grid ── */
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
// // //           {filtered.map((u) => (
// // //             <MemberCard
// // //               key={u._id}
// // //               user={u}
// // //               isSelf={u._id === currentUser?._id}
// // //               isAdmin={isAdmin}
// // //               projects={projects}
// // //               onChangeRole={changeRole}
// // //               onUpdateProject={updateUserProject}
// // //               onDelete={deleteUser}
// // //             />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         /* ── Table ── */
// // //         <div className="rounded-lg border border-border/50 overflow-hidden">
// // //           <table className="w-full text-sm">
// // //             <thead>
// // //               <tr className="border-b border-border/40 bg-muted/40">
// // //                 <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">
// // //                   Member
// // //                 </th>
// // //                 <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">
// // //                   Role
// // //                 </th>
// // //                 <th className="text-left px-4 py-2.5 text-[12px] font-medium text-muted-foreground">
// // //                   Project
// // //                 </th>
// // //                 <th className="px-4 py-2.5" />
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {filtered.map((u) => (
// // //                 <MemberTableRow
// // //                   key={u._id}
// // //                   user={u}
// // //                   isSelf={u._id === currentUser?._id}
// // //                   isAdmin={isAdmin}
// // //                   projects={projects}
// // //                   onChangeRole={changeRole}
// // //                   onUpdateProject={updateUserProject}
// // //                   onDelete={deleteUser}
// // //                 />
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";

// // import { Card } from "@/components/ui/card";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";

// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";

// // import { PageHeader } from "@/components/PageHeader";
// // import {
// //   UserPlus,
// //   Trash2,
// //   Search,
// //   LayoutGrid,
// //   LayoutList,
// //   Shield,
// //   Users,
// //   FolderOpen,
// // } from "lucide-react";
// // import { toast } from "sonner";

// // const BASE_URL = "http://localhost:5000/api";

// // // ─── Role styles (Admin & Member only) ───────────────────────────────────────
// // const ROLE_STYLES = {
// //   Admin: {
// //     badge: "bg-[#EEEDFE] text-[#3C3489] border-0",
// //     avatar: "bg-[#EEEDFE] text-[#3C3489]",
// //   },
// //   Member: {
// //     badge: "bg-[#E1F5EE] text-[#085041] border-0",
// //     avatar: "bg-[#E1F5EE] text-[#085041]",
// //   },
// // };

// // function getInitials(name = "") {
// //   return name
// //     .split(" ")
// //     .map((n) => n[0])
// //     .join("")
// //     .toUpperCase()
// //     .slice(0, 2);
// // }

// // // ─── Tooltip icon button ──────────────────────────────────────────────────────
// // function TooltipButton({ label, children, onClick, className = "" }) {
// //   return (
// //     <div className="relative group inline-flex">
// //       <button
// //         onClick={onClick}
// //         aria-label={label}
// //         className={`flex items-center justify-center rounded-md transition-opacity hover:opacity-80 ${className}`}
// //       >
// //         {children}
// //       </button>
// //       <span
// //         className="
// //           pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
// //           whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2.5 py-1
// //           opacity-0 group-hover:opacity-100 transition-opacity duration-150
// //           after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
// //           after:border-4 after:border-transparent after:border-t-foreground
// //         "
// //       >
// //         {label}
// //       </span>
// //     </div>
// //   );
// // }

// // // ─── Stat pill ────────────────────────────────────────────────────────────────
// // function StatPill({ icon: Icon, value, label }) {
// //   return (
// //     <div className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground">
// //       <Icon className="h-4 w-4" />
// //       <strong className="font-medium text-foreground">{value}</strong>
// //       {label}
// //     </div>
// //   );
// // }

// // // ─── Member Card ──────────────────────────────────────────────────────────────
// // function MemberCard({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
// //   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

// //   return (
// //     <Card className="p-6 flex flex-col gap-4 border-border/50 hover:border-border transition-colors">
// //       {/* Top row */}
// //       <div className="flex items-center gap-4">
// //         <Avatar className={`h-12 w-12 ${style.avatar}`}>
// //           <AvatarFallback className={`text-sm font-medium ${style.avatar}`}>
// //             {getInitials(user.name)}
// //           </AvatarFallback>
// //         </Avatar>
// //         <div className="flex-1 min-w-0">
// //           <p className="text-base font-medium truncate">
// //             {user.name}{" "}
// //             {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
// //           </p>
// //           <p className="text-sm text-muted-foreground truncate">{user.email}</p>
// //         </div>
// //         <Badge className={`text-xs shrink-0 ${style.badge}`}>{user.role}</Badge>
// //       </div>

// //       {/* Project tag */}
// //       {user.projects?.[0] && (
// //         <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //           <FolderOpen className="h-4 w-4" />
// //           <span>{projects.find((p) => p._id === user.projects[0])?.name || "—"}</span>
// //         </div>
// //       )}

// //       {/* Admin controls */}
// //       {isAdmin && !isSelf && (
// //         <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
// //           <div className="flex gap-3">
// //             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
// //               <SelectTrigger className="h-9 text-sm flex-1">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="Admin">Admin</SelectItem>
// //                 <SelectItem value="Member">Member</SelectItem>
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={user.projects?.[0] || ""}
// //               onValueChange={(v) => onUpdateProject(user._id, v)}
// //             >
// //               <SelectTrigger className="h-9 text-sm flex-1">
// //                 <SelectValue placeholder="Assign project" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {projects.map((p) => (
// //                   <SelectItem key={p._id} value={p._id}>
// //                     {p.name}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="flex justify-end">
// //             <TooltipButton
// //               label="Remove member"
// //               onClick={() => onDelete(user._id)}
// //               className="h-9 w-9 rounded-md border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
// //             >
// //               <Trash2 className="h-4 w-4" />
// //             </TooltipButton>
// //           </div>
// //         </div>
// //       )}
// //     </Card>
// //   );
// // }

// // // ─── Member Table Row ─────────────────────────────────────────────────────────
// // function MemberTableRow({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
// //   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

// //   return (
// //     <tr className="border-b border-border/30 hover:bg-muted/30 transition-colors">
// //       <td className="py-4 px-6">
// //         <div className="flex items-center gap-4">
// //           <Avatar className={`h-10 w-10 ${style.avatar}`}>
// //             <AvatarFallback className={`text-sm font-medium ${style.avatar}`}>
// //               {getInitials(user.name)}
// //             </AvatarFallback>
// //           </Avatar>
// //           <div>
// //             <p className="text-sm font-medium leading-tight">
// //               {user.name}{" "}
// //               {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
// //             </p>
// //             <p className="text-sm text-muted-foreground">{user.email}</p>
// //           </div>
// //         </div>
// //       </td>
// //       <td className="py-4 px-6">
// //         <Badge className={`text-xs ${style.badge}`}>{user.role}</Badge>
// //       </td>
// //       <td className="py-4 px-6 text-sm text-muted-foreground">
// //         {projects.find((p) => p._id === user.projects?.[0])?.name || "—"}
// //       </td>
// //       <td className="py-4 px-6">
// //         {isAdmin && !isSelf && (
// //           <div className="flex items-center gap-3">
// //             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
// //               <SelectTrigger className="h-9 text-sm w-28">
// //                 <SelectValue />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="Admin">Admin</SelectItem>
// //                 <SelectItem value="Member">Member</SelectItem>
// //               </SelectContent>
// //             </Select>

// //             <Select
// //               value={user.projects?.[0] || ""}
// //               onValueChange={(v) => onUpdateProject(user._id, v)}
// //             >
// //               <SelectTrigger className="h-9 text-sm w-36">
// //                 <SelectValue placeholder="Project" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {projects.map((p) => (
// //                   <SelectItem key={p._id} value={p._id}>
// //                     {p.name}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>

// //             <TooltipButton
// //               label="Remove member"
// //               onClick={() => onDelete(user._id)}
// //               className="h-9 w-9 border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
// //             >
// //               <Trash2 className="h-4 w-4" />
// //             </TooltipButton>
// //           </div>
// //         )}
// //       </td>
// //     </tr>
// //   );
// // }

// // // ─── Invite Dialog ────────────────────────────────────────────────────────────
// // function InviteDialog({ open, onOpenChange, projects, onInvited }) {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     role: "Member",
// //     projects: [],
// //   });
// //   const token = localStorage.getItem("token");

// //   const submit = async (e) => {
// //     e.preventDefault();
// //     if (form.password.length < 6) return toast.error("Password must be 6+ characters");
// //     try {
// //       const res = await fetch(`${BASE_URL}/admin/invite`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(form),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) return toast.error(data.message);
// //       toast.success("Invitation sent");
// //       setForm({ name: "", email: "", password: "", role: "Member", projects: [] });
// //       onOpenChange(false);
// //       onInvited();
// //     } catch {
// //       toast.error("Invite failed");
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-[420px]">
// //         <DialogHeader>
// //           <DialogTitle className="text-base font-medium">Invite team member</DialogTitle>
// //         </DialogHeader>

// //         <form onSubmit={submit} className="space-y-4 pt-1">
// //           <div className="space-y-1.5">
// //             <Label className="text-sm text-muted-foreground font-medium">Full name</Label>
// //             <Input
// //               placeholder="Alex Johnson"
// //               value={form.name}
// //               onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             />
// //           </div>

// //           <div className="space-y-1.5">
// //             <Label className="text-sm text-muted-foreground font-medium">Email address</Label>
// //             <Input
// //               placeholder="alex@company.com"
// //               type="email"
// //               value={form.email}
// //               onChange={(e) => setForm({ ...form, email: e.target.value })}
// //             />
// //           </div>

// //           <div className="space-y-1.5">
// //             <Label className="text-sm text-muted-foreground font-medium">Password</Label>
// //             <Input
// //               type="password"
// //               placeholder="Min. 6 characters"
// //               value={form.password}
// //               onChange={(e) => setForm({ ...form, password: e.target.value })}
// //             />
// //           </div>

// //           <div className="grid grid-cols-2 gap-3">
// //             <div className="space-y-1.5">
// //               <Label className="text-sm text-muted-foreground font-medium">Role</Label>
// //               <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
// //                 <SelectTrigger>
// //                   <SelectValue />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="Admin">Admin</SelectItem>
// //                   <SelectItem value="Member">Member</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="space-y-1.5">
// //               <Label className="text-sm text-muted-foreground font-medium">Project</Label>
// //               <Select onValueChange={(v) => setForm({ ...form, projects: [v] })}>
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select…" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {projects.map((p) => (
// //                     <SelectItem key={p._id} value={p._id}>
// //                       {p.name}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>

// //           <DialogFooter className="pt-2">
// //             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
// //               Cancel
// //             </Button>
// //             <Button type="submit">Send invite</Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// // // ─── Main Page ────────────────────────────────────────────────────────────────
// // export default function Team() {
// //   const [users, setUsers] = useState([]);
// //   const [projects, setProjects] = useState([]);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [roleFilter, setRoleFilter] = useState("all");
// //   const [view, setView] = useState("card");

// //   const token = localStorage.getItem("token");
// //   const isAdmin = currentUser?.role === "Admin";

// //   // ── Fetch helpers ──────────────────────────────────────────────────────────
// //   const getMe = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/auth/me`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error();
// //       setCurrentUser(data);
// //     } catch {
// //       toast.error("Session expired");
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/admin/users`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (!res.ok) return toast.error(data.message);
// //       setUsers(data);
// //     } catch {
// //       toast.error("Failed to load users");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchProjects = async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/projects`);
// //       const data = await res.json();
// //       setProjects(data);
// //     } catch {
// //       toast.error("Failed to load projects");
// //     }
// //   };

// //   useEffect(() => {
// //     if (!token) return;
// //     getMe();
// //     fetchUsers();
// //     fetchProjects();
// //   }, []);

// //   // ── Actions ────────────────────────────────────────────────────────────────
// //   const changeRole = async (id, role) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //         body: JSON.stringify({ role }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) return toast.error(data.message);
// //       toast.success("Role updated");
// //       fetchUsers();
// //     } catch {
// //       toast.error("Update failed");
// //     }
// //   };

// //   const updateUserProject = async (id, projectId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/admin/projects/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //         body: JSON.stringify({ projects: [projectId] }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) return toast.error(data.message);
// //       toast.success("Project updated");
// //       fetchUsers();
// //     } catch {
// //       toast.error("Project update failed");
// //     }
// //   };

// //   const deleteUser = async (id) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (!res.ok) return toast.error(data.message);
// //       toast.success("User removed");
// //       fetchUsers();
// //     } catch {
// //       toast.error("Delete failed");
// //     }
// //   };

// //   // ── Filtered list ──────────────────────────────────────────────────────────
// //   const filtered = users.filter((u) => {
// //     const matchRole = roleFilter === "all" || u.role === roleFilter;
// //     const matchSearch =
// //       u.name.toLowerCase().includes(search.toLowerCase()) ||
// //       u.email.toLowerCase().includes(search.toLowerCase());
// //     return matchRole && matchSearch;
// //   });

// //   const adminCount = users.filter((u) => u.role === "Admin").length;

// //   // ── Filter tabs (Admin & Member only) ─────────────────────────────────────
// //   const FILTERS = ["all", "Admin", "Member"];

// //   return (
// //     <div className="p-8 max-w-7xl mx-auto">
// //       {/* Header */}
// //       <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
// //         <div>
// //           <h1 className="text-2xl font-medium">Team</h1>
// //           <p className="text-sm text-muted-foreground mt-1">
// //             Manage your team members and their access
// //           </p>
// //         </div>

// //         {/* Stat pills */}
// //         <div className="flex flex-wrap gap-2">
// //           <StatPill icon={Users} value={users.length} label={`member${users.length !== 1 ? "s" : ""}`} />
// //           <StatPill icon={Shield} value={adminCount} label={`admin${adminCount !== 1 ? "s" : ""}`} />
// //         </div>
// //       </div>

// //       {/* Controls bar */}
// //       <div className="flex flex-wrap items-center gap-3 mb-6">
// //         {/* Search */}
// //         <div className="relative flex-1 min-w-[220px]">
// //           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
// //           <Input
// //             className="pl-10 h-11 text-sm"
// //             placeholder="Search members…"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* Role filter */}
// //         <div className="flex items-center gap-1 bg-muted/60 border border-border/40 rounded-lg p-1">
// //           {FILTERS.map((f) => (
// //             <button
// //               key={f}
// //               onClick={() => setRoleFilter(f)}
// //               className={`px-4 py-2 rounded-md text-sm transition-all ${
// //                 roleFilter === f
// //                   ? "bg-background text-foreground font-medium shadow-sm border border-border/40"
// //                   : "text-muted-foreground hover:text-foreground"
// //               }`}
// //             >
// //               {f === "all" ? "All" : f}
// //             </button>
// //           ))}
// //         </div>

// //         {/* View toggle */}
// //         <div className="flex border border-border/50 rounded-lg overflow-hidden">
// //           <TooltipButton
// //             label="Card view"
// //             onClick={() => setView("card")}
// //             className={`h-11 w-11 transition-colors ${
// //               view === "card" ? "bg-muted text-foreground" : "text-muted-foreground"
// //             }`}
// //           >
// //             <LayoutGrid className="h-5 w-5" />
// //           </TooltipButton>
// //           <div className="w-px bg-border/50" />
// //           <TooltipButton
// //             label="Table view"
// //             onClick={() => setView("table")}
// //             className={`h-11 w-11 transition-colors ${
// //               view === "table" ? "bg-muted text-foreground" : "text-muted-foreground"
// //             }`}
// //           >
// //             <LayoutList className="h-5 w-5" />
// //           </TooltipButton>
// //         </div>

// //         {/* Invite — icon only with tooltip */}
// //         {isAdmin && (
// //           <TooltipButton
// //             label="Invite member"
// //             onClick={() => setOpen(true)}
// //             className="h-11 w-11 bg-foreground text-background rounded-lg"
// //           >
// //             <UserPlus className="h-5 w-5" />
// //           </TooltipButton>
// //         )}
// //       </div>

// //       {/* Invite dialog */}
// //       <InviteDialog
// //         open={open}
// //         onOpenChange={setOpen}
// //         projects={projects}
// //         onInvited={fetchUsers}
// //       />

// //       {/* Content */}
// //       {loading ? (
// //         <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
// //           Loading…
// //         </div>
// //       ) : filtered.length === 0 ? (
// //         <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
// //           <Users className="h-10 w-10 opacity-30" />
// //           <p className="text-sm">No members match your filter</p>
// //         </div>
// //       ) : view === "card" ? (
// //         /* ── Card Grid ── */
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {filtered.map((u) => (
// //             <MemberCard
// //               key={u._id}
// //               user={u}
// //               isSelf={u._id === currentUser?._id}
// //               isAdmin={isAdmin}
// //               projects={projects}
// //               onChangeRole={changeRole}
// //               onUpdateProject={updateUserProject}
// //               onDelete={deleteUser}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         /* ── Table ── */
// //         <div className="rounded-xl border border-border/50 overflow-hidden">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="border-b border-border/40 bg-muted/40">
// //                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
// //                   Member
// //                 </th>
// //                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
// //                   Role
// //                 </th>
// //                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
// //                   Project
// //                 </th>
// //                 <th className="px-6 py-4" />
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filtered.map((u) => (
// //                 <MemberTableRow
// //                   key={u._id}
// //                   user={u}
// //                   isSelf={u._id === currentUser?._id}
// //                   isAdmin={isAdmin}
// //                   projects={projects}
// //                   onChangeRole={changeRole}
// //                   onUpdateProject={updateUserProject}
// //                   onDelete={deleteUser}
// //                 />
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";

// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// import { PageHeader } from "@/components/PageHeader";
// import {
//   UserPlus,
//   Trash2,
//   Search,
//   LayoutGrid,
//   LayoutList,
//   Shield,
//   Users,
//   FolderOpen,
// } from "lucide-react";
// import { toast } from "sonner";

// const BASE_URL = "http://localhost:5000/api";

// // ─── Role styles (Admin & Member only) ───────────────────────────────────────
// const ROLE_STYLES = {
//   Admin: {
//     badge: "bg-[#EEEDFE] text-[#3C3489] border-0",
//     avatar: "bg-[#EEEDFE] text-[#3C3489]",
//   },
//   Member: {
//     badge: "bg-[#E1F5EE] text-[#085041] border-0",
//     avatar: "bg-[#E1F5EE] text-[#085041]",
//   },
// };

// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
// }

// // ─── Tooltip icon button ──────────────────────────────────────────────────────
// function TooltipButton({ label, children, onClick, className = "" }) {
//   return (
//     <div className="relative group inline-flex">
//       <button
//         onClick={onClick}
//         aria-label={label}
//         className={`flex items-center justify-center rounded-md transition-opacity hover:opacity-80 ${className}`}
//       >
//         {children}
//       </button>
//       <span
//         className="
//           pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
//           whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2.5 py-1
//           opacity-0 group-hover:opacity-100 transition-opacity duration-150
//           after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
//           after:border-4 after:border-transparent after:border-t-foreground
//         "
//       >
//         {label}
//       </span>
//     </div>
//   );
// }

// // ─── Stat pill ────────────────────────────────────────────────────────────────
// function StatPill({ icon: Icon, value, label }) {
//   return (
//     <div className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground">
//       <Icon className="h-4 w-4" />
//       <strong className="font-medium text-foreground">{value}</strong>
//       {label}
//     </div>
//   );
// }

// // ─── Member Card ──────────────────────────────────────────────────────────────
// function MemberCard({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
//   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

//   return (
//     <Card className="p-6 flex flex-col gap-4 border-border/50 hover:border-border hover:ring-2 hover:ring-border/30 hover:shadow-md transition-all duration-200 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-ring">
//       {/* Top row */}
//       <div className="flex items-center gap-4">
//         <Avatar className={`h-12 w-12 ${style.avatar}`}>
//           <AvatarFallback className={`text-sm font-medium ${style.avatar}`}>
//             {getInitials(user.name)}
//           </AvatarFallback>
//         </Avatar>
//         <div className="flex-1 min-w-0">
//           <p className="text-base font-medium truncate">
//             {user.name}{" "}
//             {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
//           </p>
//           <p className="text-sm text-muted-foreground truncate">{user.email}</p>
//         </div>
//         <Badge className={`text-xs shrink-0 ${style.badge}`}>{user.role}</Badge>
//       </div>

//       {/* Project tag */}
//       {user.projects?.[0] && (
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <FolderOpen className="h-4 w-4" />
//           <span>{projects.find((p) => p._id === user.projects[0])?.name || "—"}</span>
//         </div>
//       )}

//       {/* Admin controls */}
//       {isAdmin && !isSelf && (
//         <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
//           <div className="flex gap-3">
//             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
//               <SelectTrigger className="h-9 text-sm flex-1">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Admin">Admin</SelectItem>
//                 <SelectItem value="Member">Member</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               value={user.projects?.[0] || ""}
//               onValueChange={(v) => onUpdateProject(user._id, v)}
//             >
//               <SelectTrigger className="h-9 text-sm flex-1">
//                 <SelectValue placeholder="Assign project" />
//               </SelectTrigger>
//               <SelectContent>
//                 {projects.map((p) => (
//                   <SelectItem key={p._id} value={p._id}>
//                     {p.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex justify-end">
//             <TooltipButton
//               label="Remove member"
//               onClick={() => onDelete(user._id)}
//               className="h-9 w-9 rounded-md border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
//             >
//               <Trash2 className="h-4 w-4" />
//             </TooltipButton>
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }

// // ─── Member Table Row ─────────────────────────────────────────────────────────
// function MemberTableRow({ user, isSelf, isAdmin, projects, onChangeRole, onUpdateProject, onDelete }) {
//   const style = ROLE_STYLES[user.role] || ROLE_STYLES.Member;

//   return (
//     <tr className="border-b border-border/30 hover:bg-muted/40 hover:shadow-[inset_3px_0_0_0_hsl(var(--border))] transition-all duration-150 cursor-default">
//       <td className="py-4 px-6">
//         <div className="flex items-center gap-4">
//           <Avatar className={`h-10 w-10 ${style.avatar}`}>
//             <AvatarFallback className={`text-sm font-medium ${style.avatar}`}>
//               {getInitials(user.name)}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="text-sm font-medium leading-tight">
//               {user.name}{" "}
//               {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
//             </p>
//             <p className="text-sm text-muted-foreground">{user.email}</p>
//           </div>
//         </div>
//       </td>
//       <td className="py-4 px-6">
//         <Badge className={`text-xs ${style.badge}`}>{user.role}</Badge>
//       </td>
//       <td className="py-4 px-6 text-sm text-muted-foreground">
//         {projects.find((p) => p._id === user.projects?.[0])?.name || "—"}
//       </td>
//       <td className="py-4 px-6">
//         {isAdmin && !isSelf && (
//           <div className="flex items-center gap-3">
//             <Select value={user.role} onValueChange={(v) => onChangeRole(user._id, v)}>
//               <SelectTrigger className="h-9 text-sm w-28">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Admin">Admin</SelectItem>
//                 <SelectItem value="Member">Member</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               value={user.projects?.[0] || ""}
//               onValueChange={(v) => onUpdateProject(user._id, v)}
//             >
//               <SelectTrigger className="h-9 text-sm w-36">
//                 <SelectValue placeholder="Project" />
//               </SelectTrigger>
//               <SelectContent>
//                 {projects.map((p) => (
//                   <SelectItem key={p._id} value={p._id}>
//                     {p.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <TooltipButton
//               label="Remove member"
//               onClick={() => onDelete(user._id)}
//               className="h-9 w-9 border border-border/50 text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200"
//             >
//               <Trash2 className="h-4 w-4" />
//             </TooltipButton>
//           </div>
//         )}
//       </td>
//     </tr>
//   );
// }

// // ─── Invite Dialog ────────────────────────────────────────────────────────────
// function InviteDialog({ open, onOpenChange, projects, onInvited }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Member",
//     projects: [],
//   });
//   const token = localStorage.getItem("token");

//   const submit = async (e) => {
//     e.preventDefault();
//     if (form.password.length < 6) return toast.error("Password must be 6+ characters");
//     try {
//       const res = await fetch(`${BASE_URL}/admin/invite`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);
//       toast.success("Invitation sent");
//       setForm({ name: "", email: "", password: "", role: "Member", projects: [] });
//       onOpenChange(false);
//       onInvited();
//     } catch {
//       toast.error("Invite failed");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[420px]">
//         <DialogHeader>
//           <DialogTitle className="text-base font-medium">Invite team member</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={submit} className="space-y-4 pt-1">
//           <div className="space-y-1.5">
//             <Label className="text-sm text-muted-foreground font-medium">Full name</Label>
//             <Input
//               placeholder="Alex Johnson"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>

//           <div className="space-y-1.5">
//             <Label className="text-sm text-muted-foreground font-medium">Email address</Label>
//             <Input
//               placeholder="alex@company.com"
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>

//           <div className="space-y-1.5">
//             <Label className="text-sm text-muted-foreground font-medium">Password</Label>
//             <Input
//               type="password"
//               placeholder="Min. 6 characters"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div className="space-y-1.5">
//               <Label className="text-sm text-muted-foreground font-medium">Role</Label>
//               <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Admin">Admin</SelectItem>
//                   <SelectItem value="Member">Member</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-1.5">
//               <Label className="text-sm text-muted-foreground font-medium">Project</Label>
//               <Select onValueChange={(v) => setForm({ ...form, projects: [v] })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select…" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {projects.map((p) => (
//                     <SelectItem key={p._id} value={p._id}>
//                       {p.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <DialogFooter className="pt-2">
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">Send invite</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function Team() {
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [view, setView] = useState("card");

//   const token = localStorage.getItem("token");
//   const isAdmin = currentUser?.role === "Admin";

//   // ── Fetch helpers ──────────────────────────────────────────────────────────
//   const getMe = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error();
//       setCurrentUser(data);
//     } catch {
//       toast.error("Session expired");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/admin/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);
//       setUsers(data);
//     } catch {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/projects`);
//       const data = await res.json();
//       setProjects(data);
//     } catch {
//       toast.error("Failed to load projects");
//     }
//   };

//   useEffect(() => {
//     if (!token) return;
//     getMe();
//     fetchUsers();
//     fetchProjects();
//   }, []);

//   // ── Actions ────────────────────────────────────────────────────────────────
//   const changeRole = async (id, role) => {
//     try {
//       const res = await fetch(`${BASE_URL}/admin/role/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ role }),
//       });
//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);
//       toast.success("Role updated");
//       fetchUsers();
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   const updateUserProject = async (id, projectId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/admin/projects/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ projects: [projectId] }),
//       });
//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);
//       toast.success("Project updated");
//       fetchUsers();
//     } catch {
//       toast.error("Project update failed");
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       const res = await fetch(`${BASE_URL}/admin/user/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);
//       toast.success("User removed");
//       fetchUsers();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   // ── Filtered list ──────────────────────────────────────────────────────────
//   const filtered = users.filter((u) => {
//     const matchRole = roleFilter === "all" || u.role === roleFilter;
//     const matchSearch =
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.email.toLowerCase().includes(search.toLowerCase());
//     return matchRole && matchSearch;
//   });

//   const adminCount = users.filter((u) => u.role === "Admin").length;

//   // ── Filter tabs (Admin & Member only) ─────────────────────────────────────
//   const FILTERS = ["all", "Admin", "Member"];

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-medium">Team</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Manage your team members and their access
//           </p>
//         </div>

//         {/* Stat pills */}
//         <div className="flex flex-wrap gap-2">
//           <StatPill icon={Users} value={users.length} label={`member${users.length !== 1 ? "s" : ""}`} />
//           <StatPill icon={Shield} value={adminCount} label={`admin${adminCount !== 1 ? "s" : ""}`} />
//         </div>
//       </div>

//       {/* Controls bar */}
//       <div className="flex flex-wrap items-center gap-3 mb-6">
//         {/* Search */}
//         <div className="relative flex-1 min-w-[220px]">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
//           <Input
//             className="pl-10 h-11 text-sm"
//             placeholder="Search members…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Role filter */}
//         <div className="flex items-center gap-1 bg-muted/60 border border-border/40 rounded-lg p-1">
//           {FILTERS.map((f) => (
//             <button
//               key={f}
//               onClick={() => setRoleFilter(f)}
//               className={`px-4 py-2 rounded-md text-sm transition-all ${
//                 roleFilter === f
//                   ? "bg-background text-foreground font-medium shadow-sm border border-border/40"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {f === "all" ? "All" : f}
//             </button>
//           ))}
//         </div>

//         {/* View toggle */}
//         <div className="flex border border-border/50 rounded-lg overflow-hidden">
//           <TooltipButton
//             label="Card view"
//             onClick={() => setView("card")}
//             className={`h-11 w-11 transition-colors ${
//               view === "card" ? "bg-muted text-foreground" : "text-muted-foreground"
//             }`}
//           >
//             <LayoutGrid className="h-5 w-5" />
//           </TooltipButton>
//           <div className="w-px bg-border/50" />
//           <TooltipButton
//             label="Table view"
//             onClick={() => setView("table")}
//             className={`h-11 w-11 transition-colors ${
//               view === "table" ? "bg-muted text-foreground" : "text-muted-foreground"
//             }`}
//           >
//             <LayoutList className="h-5 w-5" />
//           </TooltipButton>
//         </div>

//         {/* Invite — icon only with tooltip */}
//         {isAdmin && (
//           <TooltipButton
//             label="Invite member"
//             onClick={() => setOpen(true)}
//             className="h-11 w-11 bg-foreground text-background rounded-lg"
//           >
//             <UserPlus className="h-5 w-5" />
//           </TooltipButton>
//         )}
//       </div>

//       {/* Invite dialog */}
//       <InviteDialog
//         open={open}
//         onOpenChange={setOpen}
//         projects={projects}
//         onInvited={fetchUsers}
//       />

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
//           Loading…
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-48 gap-3 text-muted-foreground">
//           <Users className="h-10 w-10 opacity-30" />
//           <p className="text-sm">No members match your filter</p>
//         </div>
//       ) : view === "card" ? (
//         /* ── Card Grid ── */
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filtered.map((u) => (
//             <MemberCard
//               key={u._id}
//               user={u}
//               isSelf={u._id === currentUser?._id}
//               isAdmin={isAdmin}
//               projects={projects}
//               onChangeRole={changeRole}
//               onUpdateProject={updateUserProject}
//               onDelete={deleteUser}
//             />
//           ))}
//         </div>
//       ) : (
//         /* ── Table ── */
//         <div className="rounded-xl border border-border/50 overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-border/40 bg-muted/40">
//                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
//                   Member
//                 </th>
//                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
//                   Role
//                 </th>
//                 <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
//                   Project
//                 </th>
//                 <th className="px-6 py-4" />
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((u) => (
//                 <MemberTableRow
//                   key={u._id}
//                   user={u}
//                   isSelf={u._id === currentUser?._id}
//                   isAdmin={isAdmin}
//                   projects={projects}
//                   onChangeRole={changeRole}
//                   onUpdateProject={updateUserProject}
//                   onDelete={deleteUser}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  UserPlus,
  Trash2,
  Search,
  LayoutGrid,
  LayoutList,
  Shield,
  Users,
  FolderOpen,
} from "lucide-react";

import { toast } from "sonner";

const BASE_URL = "http://localhost:5000/api";

// ─────────────────────────────────────────────
const ROLE_STYLES = {
  Admin: {
    badge: "bg-[#EEEDFE] text-[#3C3489] border-0",
    avatar: "bg-[#EEEDFE] text-[#3C3489]",
  },

  Member: {
    badge: "bg-[#E1F5EE] text-[#085041] border-0",
    avatar: "bg-[#E1F5EE] text-[#085041]",
  },
};

// ─────────────────────────────────────────────
function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─────────────────────────────────────────────
function TooltipButton({
  label,
  children,
  onClick,
  className = "",
}) {
  return (
    <div className="relative group inline-flex">
      <button
        onClick={onClick}
        className={`flex items-center justify-center rounded-md transition-opacity hover:opacity-80 ${className}`}
      >
        {children}
      </button>

      <span
        className="
          pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
          whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2.5 py-1
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
        "
      >
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
function StatPill({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/40 bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />

      <strong className="font-medium text-foreground">
        {value}
      </strong>

      {label}
    </div>
  );
}

// ─────────────────────────────────────────────
function MemberCard({
  user,
  isSelf,
  isAdmin,
  projects,
  onChangeRole,
  onUpdateProject,
  onDelete,
}) {
  const style =
    ROLE_STYLES[user.role] ||
    ROLE_STYLES.Member;

  return (
    <Card className="p-6 flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center gap-4">
        <Avatar
          className={`h-12 w-12 ${style.avatar}`}
        >
          <AvatarFallback
            className={`text-sm font-medium ${style.avatar}`}
          >
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className="font-medium">
            {user.name}
          </p>

          <p className="text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>

        <Badge className={style.badge}>
          {user.role}
        </Badge>
      </div>

      {/* PROJECT */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FolderOpen className="h-4 w-4" />

        <span>
          {projects.find(
            (p) =>
              p._id ===
              user.projects?.[0]
          )?.name || "—"}
        </span>
      </div>

      {/* CONTROLS */}
      {isAdmin && !isSelf && (
        <div className="flex flex-col gap-3 pt-4 border-t">
          <div className="flex gap-3">
            {/* ROLE */}
            <Select
              value={user.role}
              onValueChange={(v) =>
                onChangeRole(user._id, v)
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Admin">
                  Admin
                </SelectItem>

                <SelectItem value="Member">
                  Member
                </SelectItem>
              </SelectContent>
            </Select>

            {/* PROJECT */}
            <Select
              value={
                user.projects?.[0] || ""
              }
              onValueChange={(v) =>
                onUpdateProject(
                  user._id,
                  v
                )
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Project" />
              </SelectTrigger>

              <SelectContent>
                {projects.map((p) => (
                  <SelectItem
                    key={p._id}
                    value={p._id}
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DELETE */}
          <div className="flex justify-end">
            <TooltipButton
              label="Remove member"
              onClick={() =>
                onDelete(user._id)
              }
              className="h-9 w-9 border border-border/50 text-muted-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </TooltipButton>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─────────────────────────────────────────────
function InviteDialog({
  open,
  onOpenChange,
  projects,
  onInvited,
}) {
  const token =
    localStorage.getItem("token");

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
    projects: [],
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${BASE_URL}/admin/invite`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,

            workspaceId:
              currentUser.workspaceId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(
          data.message
        );
      }

      toast.success("Invited");

      onOpenChange(false);

      onInvited();

    } catch {
      toast.error("Invite failed");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite member
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
          <div>
            <Label>Name</Label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Email</Label>

            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Password</Label>

            <Input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Role</Label>

            <Select
              value={form.role}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  role: v,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Admin">
                  Admin
                </SelectItem>

                <SelectItem value="Member">
                  Member
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Project</Label>

            <Select
              onValueChange={(v) =>
                setForm({
                  ...form,
                  projects: [v],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>

              <SelectContent>
                {projects.map((p) => (
                  <SelectItem
                    key={p._id}
                    value={p._id}
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
            >
              Cancel
            </Button>

            <Button type="submit">
              Invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────
export default function Team() {
  const [users, setUsers] = useState(
    []
  );

  const [projects, setProjects] =
    useState([]);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [view, setView] =
    useState("card");

  const token =
    localStorage.getItem("token");

  // ─────────────────────────────────────────
  const getMe = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setCurrentUser(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

    } catch {
      toast.error("Session expired");
    }
  };

  // ─────────────────────────────────────────
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }

    } catch {
      toast.error(
        "Failed to load users"
      );

      setUsers([]);

    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────
  const fetchProjects =
    async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
        }

      } catch {
        toast.error(
          "Failed to load projects"
        );

        setProjects([]);
      }
    };

  // ─────────────────────────────────────────
  useEffect(() => {
    if (!token) return;

    getMe();

    fetchUsers();

    fetchProjects();

  }, []);

  // ─────────────────────────────────────────
  const changeRole = async (
    id,
    role
  ) => {
    try {
      await fetch(
        `${BASE_URL}/admin/role/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role,
          }),
        }
      );

      toast.success(
        "Role updated"
      );

      fetchUsers();

    } catch {
      toast.error(
        "Update failed"
      );
    }
  };

  // ─────────────────────────────────────────
  // const updateUserProject =
  //   async (id, projectId) => {
  //     try {
  //       await fetch(
  //         `${BASE_URL}/admin/projects/${id}`,
  //         {
  //           method: "PUT",

  //           headers: {
  //             "Content-Type":
  //               "application/json",

  //             Authorization: `Bearer ${token}`,
  //           },

  //           body: JSON.stringify({
  //             projects: [projectId],
  //           }),
  //         }
  //       );

  //       toast.success(
  //         "Project updated"
  //       );

  //       fetchUsers();

  //     } catch {
  //       toast.error(
  //         "Project update failed"
  //       );
  //     }
  //   };
const updateUserProject = async (
  userId,
  projectId
) => {
  try {
    // =========================
    // UPDATE USER PROJECT
    // =========================

    const res = await fetch(
      `${BASE_URL}/admin/projects/${userId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          projects: [projectId],
        }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    // =========================
    // ADD MEMBER TO PROJECT
    // =========================

    await fetch(
      `${BASE_URL}/projects/${projectId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          addMember: userId,
        }),
      }
    );

    toast.success(
      "Project assigned"
    );

    fetchUsers();

    fetchProjects();

  } catch {
    toast.error(
      "Assignment failed"
    );
  }
};
  // ─────────────────────────────────────────
  const deleteUser = async (id) => {
    try {
      await fetch(
        `${BASE_URL}/admin/user/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "User removed"
      );

      fetchUsers();

    } catch {
      toast.error(
        "Delete failed"
      );
    }
  };

  // ─────────────────────────────────────────
  const filtered = users.filter(
    (u) => {
      const matchRole =
        roleFilter === "all" ||
        u.role === roleFilter;

      const matchSearch =
        u.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        u.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchRole &&
        matchSearch
      );
    }
  );

  const adminCount = users.filter(
    (u) => u.role === "Admin"
  ).length;

  const isAdmin =
    currentUser?.role === "Admin";

  // ─────────────────────────────────────────
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">
            Team
          </h1>

          <p className="text-muted-foreground text-sm mt-1">
            Manage your team members
          </p>
        </div>

        <div className="flex gap-2">
          <StatPill
            icon={Users}
            value={users.length}
            label="members"
          />

          <StatPill
            icon={Shield}
            value={adminCount}
            label="admins"
          />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-10"
            placeholder="Search members"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>

        {isAdmin && (
          <TooltipButton
            label="Invite"
            onClick={() =>
              setOpen(true)
            }
            className="h-11 w-11 bg-black text-white rounded-lg"
          >
            <UserPlus className="h-5 w-5" />
          </TooltipButton>
        )}
      </div>

      {/* INVITE */}
      <InviteDialog
        open={open}
        onOpenChange={setOpen}
        projects={projects}
        onInvited={fetchUsers}
      />

      {/* CONTENT */}
      {loading ? (
        <div className="h-40 flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <MemberCard
              key={u._id}
              user={u}
              isSelf={
                u._id ===
                currentUser?._id
              }
              isAdmin={isAdmin}
              projects={projects}
              onChangeRole={
                changeRole
              }
              onUpdateProject={
                updateUserProject
              }
              onDelete={deleteUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}