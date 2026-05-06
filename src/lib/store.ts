// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Role = "Admin" | "Member";
// export type Status = "Todo" | "In Progress" | "Done";
// export type Priority = "High" | "Medium" | "Low";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   password?: string;
//   role: Role;
//   avatar?: string;
// }

// export interface Project {
//   id: string;
//   name: string;
//   description: string;
//   color: string;
//   ownerId: string;
//   createdAt: string;
//   members: string[];
// }

// export interface Task {
//   id: string;
//   projectId: string;
//   title: string;
//   description?: string;
//   status: Status;
//   priority: Priority;
//   assigneeId?: string;
//   dueDate?: string;
//   createdAt: string;
// }

// interface AppState {
//   currentUser: User | null;
//   users: User[];
//   projects: Project[];
//   tasks: Task[];
//   login: (email: string, password: string) => { ok: boolean; error?: string };
//   signup: (name: string, email: string, password: string, role: Role) => { ok: boolean; error?: string };
//   logout: () => void;
//   addProject: (p: Omit<Project, "id" | "createdAt">) => void;
//   updateProject: (id: string, p: Partial<Project>) => void;
//   deleteProject: (id: string) => void;
//   addProjectMember: (projectId: string, userId: string) => void;
//   removeProjectMember: (projectId: string, userId: string) => void;
//   addTask: (t: Omit<Task, "id" | "createdAt">) => void;
//   updateTask: (id: string, t: Partial<Task>) => void;
//   deleteTask: (id: string) => void;
//   inviteUser: (name: string, email: string, password: string, role: Role) => { ok: boolean; error?: string };
//   changeUserRole: (userId: string, role: Role) => void;
//   removeUser: (userId: string) => void;
// }

// const seedUsers: User[] = [
//   { id: "u1", name: "Alex Morgan", email: "alex@team.com", password: "admin123", role: "Admin" },
//   { id: "u2", name: "Sam Patel", email: "sam@team.com", password: "member123", role: "Member" },
//   { id: "u3", name: "Jordan Lee", email: "jordan@team.com", password: "member123", role: "Member" },
//   { id: "u4", name: "Taylor Kim", email: "taylor@team.com", password: "member123", role: "Member" },
// ];

// const seedProjects: Project[] = [
//   { id: "p1", name: "Website Redesign", description: "Refresh the marketing site with new branding", color: "248 80% 60%", ownerId: "u1", createdAt: new Date().toISOString(), members: ["u1", "u2", "u3"] },
//   { id: "p2", name: "Mobile App Launch", description: "Ship v1 of the iOS and Android apps", color: "152 70% 42%", ownerId: "u1", createdAt: new Date().toISOString(), members: ["u1", "u4"] },
// ];

// const today = new Date();
// const addDays = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return d.toISOString(); };

// const seedTasks: Task[] = [
//   { id: "t1", projectId: "p1", title: "Design new hero section", status: "In Progress", priority: "High", assigneeId: "u2", dueDate: addDays(3), createdAt: new Date().toISOString() },
//   { id: "t2", projectId: "p1", title: "Write homepage copy", status: "Todo", priority: "Medium", assigneeId: "u3", dueDate: addDays(-2), createdAt: new Date().toISOString() },
//   { id: "t3", projectId: "p1", title: "Set up analytics", status: "Done", priority: "Low", assigneeId: "u1", dueDate: addDays(-5), createdAt: new Date().toISOString() },
//   { id: "t4", projectId: "p2", title: "Implement push notifications", status: "Todo", priority: "High", assigneeId: "u4", dueDate: addDays(7), createdAt: new Date().toISOString() },
//   { id: "t5", projectId: "p2", title: "App Store screenshots", status: "In Progress", priority: "Medium", assigneeId: "u1", dueDate: addDays(-1), createdAt: new Date().toISOString() },
// ];

// export const useStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentUser: null,
//       users: seedUsers,
//       projects: seedProjects,
//       tasks: seedTasks,
//       login: (email, password) => {
//         const u = get().users.find((x) => x.email.toLowerCase() === email.toLowerCase());
//         if (!u) return { ok: false, error: "No account with that email" };
//         if (u.password !== password) return { ok: false, error: "Incorrect password" };
//         set({ currentUser: u });
//         return { ok: true };
//       },
//       signup: (name, email, password, role) => {
//         if (get().users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
//           return { ok: false, error: "Email already in use" };
//         const newUser: User = { id: `u${Date.now()}`, name, email, password, role };
//         set((s) => ({ currentUser: newUser, users: [...s.users, newUser] }));
//         return { ok: true };
//       },
//       logout: () => set({ currentUser: null }),
//       addProject: (p) => set((s) => ({ projects: [...s.projects, { ...p, id: `p${Date.now()}`, createdAt: new Date().toISOString() }] })),
//       updateProject: (id, p) => set((s) => ({ projects: s.projects.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
//       deleteProject: (id) => set((s) => ({ projects: s.projects.filter((x) => x.id !== id), tasks: s.tasks.filter((t) => t.projectId !== id) })),
//       addProjectMember: (projectId, userId) => set((s) => ({
//         projects: s.projects.map((p) => p.id === projectId && !p.members.includes(userId) ? { ...p, members: [...p.members, userId] } : p),
//       })),
//       removeProjectMember: (projectId, userId) => set((s) => ({
//         projects: s.projects.map((p) => p.id === projectId ? { ...p, members: p.members.filter((m) => m !== userId) } : p),
//       })),
//       addTask: (t) => set((s) => ({ tasks: [...s.tasks, { ...t, id: `t${Date.now()}`, createdAt: new Date().toISOString() }] })),
//       updateTask: (id, t) => set((s) => ({ tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...t } : x)) })),
//       deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((x) => x.id !== id) })),
//       inviteUser: (name, email, password, role) => {
//         if (get().users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
//           return { ok: false, error: "Email already in use" };
//         const newUser: User = { id: `u${Date.now()}`, name, email, password, role };
//         set((s) => ({ users: [...s.users, newUser] }));
//         return { ok: true };
//       },
//       changeUserRole: (userId, role) => set((s) => ({
//         users: s.users.map((u) => (u.id === userId ? { ...u, role } : u)),
//         currentUser: s.currentUser?.id === userId ? { ...s.currentUser, role } : s.currentUser,
//       })),
//       removeUser: (userId) => set((s) => ({
//         users: s.users.filter((u) => u.id !== userId),
//         projects: s.projects.map((p) => ({ ...p, members: p.members.filter((m) => m !== userId) })),
//         tasks: s.tasks.map((t) => (t.assigneeId === userId ? { ...t, assigneeId: undefined } : t)),
//       })),
//     }),
//     { name: "taskflow-store" }
//   )
// );

// export const isOverdue = (task: Task) => {
//   if (!task.dueDate || task.status === "Done") return false;
//   return new Date(task.dueDate) < new Date(new Date().toDateString());
// };
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "Admin" | "Member";
export type Status = "Todo" | "In Progress" | "Done";
export type Priority = "High" | "Medium" | "Low";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  ownerId: string;
  createdAt: string;
  members: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
}

interface AppState {
  currentUser: User | null;
  users: User[];
  projects: Project[];
  tasks: Task[];
  setCurrentUser: (user: User) => void;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string, role: Role) => { ok: boolean; error?: string };
  logout: () => void;
  addProject: (p: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, p: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addProjectMember: (projectId: string, userId: string) => void;
  removeProjectMember: (projectId: string, userId: string) => void;
  addTask: (t: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, t: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  inviteUser: (name: string, email: string, password: string, role: Role) => { ok: boolean; error?: string };
  changeUserRole: (userId: string, role: Role) => void;
  removeUser: (userId: string) => void;
}

const seedUsers: User[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@team.com", password: "admin123", role: "Admin" },
  { id: "u2", name: "Sam Patel", email: "sam@team.com", password: "member123", role: "Member" },
  { id: "u3", name: "Jordan Lee", email: "jordan@team.com", password: "member123", role: "Member" },
  { id: "u4", name: "Taylor Kim", email: "taylor@team.com", password: "member123", role: "Member" },
];

const seedProjects: Project[] = [
  { id: "p1", name: "Website Redesign", description: "Refresh the marketing site with new branding", color: "248 80% 60%", ownerId: "u1", createdAt: new Date().toISOString(), members: ["u1", "u2", "u3"] },
  { id: "p2", name: "Mobile App Launch", description: "Ship v1 of the iOS and Android apps", color: "152 70% 42%", ownerId: "u1", createdAt: new Date().toISOString(), members: ["u1", "u4"] },
];

const today = new Date();
const addDays = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return d.toISOString(); };

const seedTasks: Task[] = [
  { id: "t1", projectId: "p1", title: "Design new hero section", status: "In Progress", priority: "High", assigneeId: "u2", dueDate: addDays(3), createdAt: new Date().toISOString() },
  { id: "t2", projectId: "p1", title: "Write homepage copy", status: "Todo", priority: "Medium", assigneeId: "u3", dueDate: addDays(-2), createdAt: new Date().toISOString() },
  { id: "t3", projectId: "p1", title: "Set up analytics", status: "Done", priority: "Low", assigneeId: "u1", dueDate: addDays(-5), createdAt: new Date().toISOString() },
  { id: "t4", projectId: "p2", title: "Implement push notifications", status: "Todo", priority: "High", assigneeId: "u4", dueDate: addDays(7), createdAt: new Date().toISOString() },
  { id: "t5", projectId: "p2", title: "App Store screenshots", status: "In Progress", priority: "Medium", assigneeId: "u1", dueDate: addDays(-1), createdAt: new Date().toISOString() },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: seedUsers,
      projects: seedProjects,
      tasks: seedTasks,

      // ✅ NEW: directly set currentUser from API response
      setCurrentUser: (user) => set({ currentUser: user }),

      login: (email, password) => {
        const u = get().users.find((x) => x.email.toLowerCase() === email.toLowerCase());
        if (!u) return { ok: false, error: "No account with that email" };
        if (u.password !== password) return { ok: false, error: "Incorrect password" };
        set({ currentUser: u });
        return { ok: true };
      },
      signup: (name, email, password, role) => {
        if (get().users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
          return { ok: false, error: "Email already in use" };
        const newUser: User = { id: `u${Date.now()}`, name, email, password, role };
        set((s) => ({ currentUser: newUser, users: [...s.users, newUser] }));
        return { ok: true };
      },
      logout: () => set({ currentUser: null }),
      addProject: (p) => set((s) => ({ projects: [...s.projects, { ...p, id: `p${Date.now()}`, createdAt: new Date().toISOString() }] })),
      updateProject: (id, p) => set((s) => ({ projects: s.projects.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
      deleteProject: (id) => set((s) => ({ projects: s.projects.filter((x) => x.id !== id), tasks: s.tasks.filter((t) => t.projectId !== id) })),
      addProjectMember: (projectId, userId) => set((s) => ({
        projects: s.projects.map((p) => p.id === projectId && !p.members.includes(userId) ? { ...p, members: [...p.members, userId] } : p),
      })),
      removeProjectMember: (projectId, userId) => set((s) => ({
        projects: s.projects.map((p) => p.id === projectId ? { ...p, members: p.members.filter((m) => m !== userId) } : p),
      })),
      addTask: (t) => set((s) => ({ tasks: [...s.tasks, { ...t, id: `t${Date.now()}`, createdAt: new Date().toISOString() }] })),
      updateTask: (id, t) => set((s) => ({ tasks: s.tasks.map((x) => (x.id === id ? { ...x, ...t } : x)) })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((x) => x.id !== id) })),
      inviteUser: (name, email, password, role) => {
        if (get().users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
          return { ok: false, error: "Email already in use" };
        const newUser: User = { id: `u${Date.now()}`, name, email, password, role };
        set((s) => ({ users: [...s.users, newUser] }));
        return { ok: true };
      },
      changeUserRole: (userId, role) => set((s) => ({
        users: s.users.map((u) => (u.id === userId ? { ...u, role } : u)),
        currentUser: s.currentUser?.id === userId ? { ...s.currentUser, role } : s.currentUser,
      })),
      removeUser: (userId) => set((s) => ({
        users: s.users.filter((u) => u.id !== userId),
        projects: s.projects.map((p) => ({ ...p, members: p.members.filter((m) => m !== userId) })),
        tasks: s.tasks.map((t) => (t.assigneeId === userId ? { ...t, assigneeId: undefined } : t)),
      })),
    }),
    { name: "taskflow-store" }
  )
);

export const isOverdue = (task: Task) => {
  if (!task.dueDate || task.status === "Done") return false;
  return new Date(task.dueDate) < new Date(new Date().toDateString());
};