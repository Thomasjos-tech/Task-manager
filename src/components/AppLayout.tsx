// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderKanban,
//   CheckSquare,
//   Users,
//   LogOut,
//   Sparkles,
//   Settings as SettingsIcon,
// } from "lucide-react";
// import { useStore } from "@/lib/store";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export const AppLayout = () => {
//   const { currentUser, logout } = useStore();
//   const navigate = useNavigate();

//   // 🔐 Redirect if not logged in
//   if (!currentUser) {
//     navigate("/login");
//     return null;
//   }

//   // 👑 Admin Sidebar
//   const adminNav = [
//     { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { to: "/projects", label: "Projects", icon: FolderKanban },
//     { to: "/tasks", label: "Tasks", icon: CheckSquare },
//     { to: "/team", label: "Team", icon: Users },
//     { to: "/settings", label: "Settings", icon: SettingsIcon },
//   ];

//   // 👤 Member Sidebar
//   const memberNav = [
//     { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { to: "/projects", label: "Projects", icon: FolderKanban },
//     { to: "/tasks", label: "Tasks", icon: CheckSquare },
//     { to: "/team", label: "Team", icon: Users },
//   ];

//   // 🎯 Role-based selection
//   const nav = currentUser.role === "Admin" ? adminNav : memberNav;

//   // 👤 Avatar initials
//   const initials = currentUser.name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex">
      
//       {/* 🔹 Sidebar */}
//       <aside className="w-64 border-r bg-card flex flex-col">
        
//         {/* 🔹 Logo */}
//         <div className="p-6 border-b">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
//               <Sparkles className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="font-bold text-lg leading-none">TaskFlow</h1>
//               <p className="text-xs text-muted-foreground mt-0.5">
//                 Project hub
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 🔹 Navigation */}
//         <nav className="flex-1 p-3 space-y-1">
//           {nav.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
//                   isActive
//                     ? "bg-accent text-accent-foreground shadow-card"
//                     : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
//                 )
//               }
//             >
//               <item.icon className="h-4 w-4" />
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* 🔹 User Info */}
//         <div className="p-3 border-t">
//           <div className="flex items-center gap-3 p-2 rounded-lg">
//             <Avatar className="h-9 w-9">
//               <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
//                 {initials}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">
//                 {currentUser.name}
//               </p>
//               <Badge
//                 variant="secondary"
//                 className="h-4 text-[10px] px-1.5 mt-0.5"
//               >
//                 {currentUser.role}
//               </Badge>
//             </div>

//             {/* 🔓 Logout */}
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               aria-label="Log out"
//             >
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* 🔹 Main Content */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderKanban,
//   CheckSquare,
//   Users,
//   LogOut,
//   Sparkles,
//   Settings as SettingsIcon,
// } from "lucide-react";
// import { useStore } from "@/lib/store";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export const AppLayout = () => {
//   const { currentUser, logout } = useStore();
//   const navigate = useNavigate();

//   if (!currentUser) {
//     navigate("/login");
//     return null;
//   }

//   const adminNav = [
//     { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { to: "/projects",  label: "Projects",  icon: FolderKanban  },
//     { to: "/tasks",     label: "Tasks",     icon: CheckSquare   },
//     { to: "/team",      label: "Team",      icon: Users         },
//     { to: "/settings",  label: "Settings",  icon: SettingsIcon  },
//   ];

//   const memberNav = [
//     { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { to: "/projects",  label: "Projects",  icon: FolderKanban  },
//     { to: "/tasks",     label: "Tasks",     icon: CheckSquare   },
//     { to: "/team",      label: "Team",      icon: Users         },
//   ];

//   const nav = currentUser.role === "Admin" ? adminNav : memberNav;

//   const initials = currentUser.name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     /*
//      * KEY FIXES:
//      * 1. Root: h-screen + overflow-hidden — locks total height to viewport, no full-page scroll
//      * 2. Sidebar: h-screen + overflow-y-auto — sidebar gets its own scrollbar if needed
//      * 3. User footer: mt-auto — always pushed to bottom of sidebar
//      * 4. Main: flex-1 + overflow-y-auto — only the content area scrolls
//      */
//     <div className="h-screen overflow-hidden bg-gradient-subtle flex">

//       {/* ─── Sidebar ─── */}
//       <aside className="w-64 border-r bg-card flex flex-col h-screen overflow-y-auto">

//         {/* Logo */}
//         <div className="p-6 border-b shrink-0">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
//               <Sparkles className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="font-bold text-lg leading-none">TaskFlow</h1>
//               <p className="text-xs text-muted-foreground mt-0.5">Project hub</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation — flex-1 so it fills space, pushing footer down */}
//         <nav className="flex-1 p-3 space-y-1">
//           {nav.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 cn(
//                   "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
//                   isActive
//                     ? "bg-accent text-accent-foreground shadow-card"
//                     : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
//                 )
//               }
//             >
//               <item.icon className="h-4 w-4" />
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* User Info + Logout — mt-auto pins to bottom always */}
//         <div className="mt-auto p-3 border-t shrink-0">
//           <div className="flex items-center gap-3 p-2 rounded-lg">
//             <Avatar className="h-9 w-9">
//               <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
//                 {initials}
//               </AvatarFallback>
//             </Avatar>

//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">{currentUser.name}</p>
//               <Badge variant="secondary" className="h-4 text-[10px] px-1.5 mt-0.5">
//                 {currentUser.role}
//               </Badge>
//             </div>

//             {/* Logout */}
//             <Button
//               size="icon"
//               variant="ghost"
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               aria-label="Log out"
//             >
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* ─── Main Content — independent scroll ─── */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  LogOut,
  Sparkles,
  Settings as SettingsIcon,
} from "lucide-react";

import { useStore } from "@/lib/store";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { currentUser, logout } = useStore();

  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  // ================= ADMIN NAV =================
  const adminNav = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      to: "/projects",
      label: "Projects",
      icon: FolderKanban,
    },

    {
      to: "/tasks",
      label: "Tasks",
      icon: CheckSquare,
    },

    {
      to: "/team",
      label: "Team",
      icon: Users,
    },

    {
      to: "/settings",
      label: "Settings",
      icon: SettingsIcon,
    },
  ];

  // ================= MEMBER NAV =================
  const memberNav = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      to: "/assigned-projects",
      label: "Assigned Projects",
      icon: FolderKanban,
    },

    {
      to: "/assigned-tasks",
      label: "Assigned Tasks",
      icon: CheckSquare,
    },
  ];

  // ================= SELECT NAV =================
  const nav =
    currentUser.role === "Admin"
      ? adminNav
      : memberNav;

  // ================= INITIALS =================
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="h-screen overflow-hidden bg-gradient-subtle flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-card flex flex-col h-screen overflow-y-auto">

        {/* LOGO */}
        <div className="p-6 border-b shrink-0">
          <div className="flex items-center gap-2">

            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <h1 className="font-bold text-lg leading-none">
                TaskFlow
              </h1>

              <p className="text-xs text-muted-foreground mt-0.5">
                Project hub
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",

                  isActive
                    ? "bg-accent text-accent-foreground shadow-card"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />

              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* USER FOOTER */}
        <div className="mt-auto p-3 border-t shrink-0">

          <div className="flex items-center gap-3 p-2 rounded-lg">

            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-medium truncate">
                {currentUser.name}
              </p>

              <Badge
                variant="secondary"
                className="h-4 text-[10px] px-1.5 mt-0.5"
              >
                {currentUser.role}
              </Badge>
            </div>

            {/* LOGOUT */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};