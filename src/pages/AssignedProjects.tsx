// import { useEffect, useState, useMemo } from "react";

// import {
//   Bell,
//   FolderOpen,
//   Users,
// } from "lucide-react";

// const API = "http://localhost:5000/api";

// const PALETTE = [
//   {
//     accent: "#7c3aed",
//     bg: "#f3f0ff",
//     text: "#5b21b6",
//   },

//   {
//     accent: "#2563eb",
//     bg: "#eff6ff",
//     text: "#1d4ed8",
//   },

//   {
//     accent: "#059669",
//     bg: "#ecfdf5",
//     text: "#047857",
//   },

//   {
//     accent: "#db2777",
//     bg: "#fdf2f8",
//     text: "#be185d",
//   },
// ];

// function initials(name = "") {
//   return name
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
// }

// export default function AssignedProjects() {
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   const token = localStorage.getItem("token");

//   // ================= LOAD =================
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [projectRes, userRes, meRes] =
//         await Promise.all([
//           fetch(`${API}/projects`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),

//           fetch(`${API}/admin/users`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),

//           fetch(`${API}/auth/me`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),
//         ]);

//       const projectsData =
//         await projectRes.json();

//       const usersData =
//         await userRes.json();

//       const meData =
//         await meRes.json();

//       setProjects(projectsData);
//       setUsers(usersData);
//       setCurrentUser(meData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FILTER ASSIGNED =================
//   const assignedProjects = useMemo(() => {
//     if (!currentUser) return [];

//     return projects.filter((project) =>
//       project.members?.includes(currentUser._id)
//     );
//   }, [projects, currentUser]);

//   // ================= GET NAME =================
//   const getUserName = (id) => {
//     const user = users.find(
//       (u) => u._id === id
//     );

//     return user?.name || "Unknown";
//   };

//   return (
//     <div
//       style={{
//         padding: 32,
//         maxWidth: 1400,
//         margin: "0 auto",
//       }}
//     >
//       {/* HEADER */}
//       <div
//         style={{
//           marginBottom: 30,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             marginBottom: 8,
//           }}
//         >
//           <Bell
//             size={20}
//             color="#7c3aed"
//           />

//           <span
//             style={{
//               color: "#7c3aed",
//               fontWeight: 600,
//               fontSize: 14,
//             }}
//           >
//             Assigned Projects
//           </span>
//         </div>

//         <h1
//           style={{
//             fontSize: 32,
//             fontWeight: 700,
//             color: "#111827",
//             marginBottom: 6,
//           }}
//         >
//           Your Projects
//         </h1>

//         <p
//           style={{
//             color: "#6b7280",
//             fontSize: 14,
//           }}
//         >
//           Projects assigned by admin
//         </p>
//       </div>

//       {/* EMPTY */}
//       {assignedProjects.length === 0 && (
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #e5e7eb",
//             borderRadius: 16,
//             padding: 80,
//             textAlign: "center",
//           }}
//         >
//           <FolderOpen
//             size={50}
//             color="#c4b5fd"
//             style={{
//               marginBottom: 14,
//             }}
//           />

//           <h2
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#111827",
//               marginBottom: 8,
//             }}
//           >
//             No assigned projects
//           </h2>

//           <p
//             style={{
//               color: "#9ca3af",
//             }}
//           >
//             Admin has not assigned any projects yet.
//           </p>
//         </div>
//       )}

//       {/* PROJECT GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns:
//             "repeat(auto-fill,minmax(340px,1fr))",
//           gap: 22,
//         }}
//       >
//         {assignedProjects.map(
//           (project, index) => {
//             const pal =
//               PALETTE[
//                 index % PALETTE.length
//               ];

//             const manager =
//               getUserName(
//                 project.ownerId
//               );

//             const members =
//               project.members?.filter(
//                 (m) =>
//                   m !==
//                   project.ownerId
//               ) || [];

//             return (
//               <div
//                 key={project._id}
//                 style={{
//                   background: "#fff",
//                   border:
//                     "1px solid #e5e7eb",
//                   borderRadius: 18,
//                   padding: 24,
//                   position: "relative",
//                   overflow: "hidden",
//                   transition:
//                     "0.2s",
//                 }}
//               >
//                 {/* TOP BAR */}
//                 <div
//                   style={{
//                     position:
//                       "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: 4,
//                     background:
//                       pal.accent,
//                   }}
//                 />

//                 {/* ICON */}
//                 <div
//                   style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 14,
//                     background: pal.bg,
//                     color: pal.text,
//                     display: "flex",
//                     alignItems:
//                       "center",
//                     justifyContent:
//                       "center",
//                     fontSize: 18,
//                     fontWeight: 700,
//                     marginBottom: 18,
//                   }}
//                 >
//                   {initials(
//                     project.name
//                   )}
//                 </div>

//                 {/* TITLE */}
//                 <h2
//                   style={{
//                     fontSize: 22,
//                     fontWeight: 700,
//                     color: "#111827",
//                     marginBottom: 8,
//                   }}
//                 >
//                   {project.name}
//                 </h2>

//                 {/* DESC */}
//                 <p
//                   style={{
//                     color: "#6b7280",
//                     fontSize: 14,
//                     lineHeight: 1.6,
//                     minHeight: 50,
//                   }}
//                 >
//                   {project.description}
//                 </p>

//                 {/* MANAGER */}
//                 <div
//                   style={{
//                     marginTop: 18,
//                     paddingTop: 18,
//                     borderTop:
//                       "1px solid #f3f4f6",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: 12,
//                       color: "#9ca3af",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Project Manager
//                   </div>

//                   <div
//                     style={{
//                       fontWeight: 600,
//                       color: "#111827",
//                     }}
//                   >
//                     {manager}
//                   </div>
//                 </div>

//                 {/* MEMBERS */}
//                 <div
//                   style={{
//                     marginTop: 18,
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems:
//                         "center",
//                       gap: 8,
//                       marginBottom: 10,
//                     }}
//                   >
//                     <Users
//                       size={15}
//                       color="#6b7280"
//                     />

//                     <span
//                       style={{
//                         fontSize: 13,
//                         color: "#6b7280",
//                       }}
//                     >
//                       Assigned Members
//                     </span>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       gap: 8,
//                     }}
//                   >
//                     {members.map(
//                       (memberId) => (
//                         <span
//                           key={
//                             memberId
//                           }
//                           style={{
//                             background:
//                               "#f3f0ff",
//                             color:
//                               "#5b21b6",
//                             padding:
//                               "6px 12px",
//                             borderRadius: 20,
//                             fontSize: 12,
//                             fontWeight: 500,
//                           }}
//                         >
//                           {getUserName(
//                             memberId
//                           )}
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </div>

//                 {/* NOTIFICATION */}
//                 <div
//                   style={{
//                     position:
//                       "absolute",
//                     top: 18,
//                     right: 18,
//                     background:
//                       "#f3f0ff",
//                     color:
//                       "#7c3aed",
//                     padding:
//                       "6px 10px",
//                     borderRadius: 20,
//                     fontSize: 12,
//                     fontWeight: 600,
//                     display: "flex",
//                     alignItems:
//                       "center",
//                     gap: 5,
//                   }}
//                 >
//                   <Bell size={13} />
//                   Assigned
//                 </div>
//               </div>
//             );
//           }
//         )}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useMemo, useState } from "react";

// import {
//   Bell,
//   FolderOpen,
//   Users,
// } from "lucide-react";

// const API = "http://localhost:5000/api";

// const PALETTE = [
//   {
//     accent: "#7c3aed",
//     bg: "#f3f0ff",
//     text: "#5b21b6",
//   },

//   {
//     accent: "#2563eb",
//     bg: "#eff6ff",
//     text: "#1d4ed8",
//   },

//   {
//     accent: "#059669",
//     bg: "#ecfdf5",
//     text: "#047857",
//   },

//   {
//     accent: "#db2777",
//     bg: "#fdf2f8",
//     text: "#be185d",
//   },
// ];

// // ================= INITIALS =================
// function initials(name = "") {
//   return name
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
// }

// export default function AssignedProjects() {
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] =
//     useState(null);

//   const token = localStorage.getItem("token");

//   // ================= LOAD =================
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [
//         projectRes,
//         userRes,
//         meRes,
//       ] = await Promise.all([
//         fetch(`${API}/projects`),

//         fetch(`${API}/admin/users`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),

//         fetch(`${API}/auth/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);

//       const projectsData =
//         await projectRes.json();

//       const usersData =
//         await userRes.json();

//       const meData =
//         await meRes.json();

//       // ✅ FIXED ARRAY ISSUE
//       setProjects(
//         Array.isArray(projectsData)
//           ? projectsData
//           : projectsData.projects || []
//       );

//       setUsers(
//         Array.isArray(usersData)
//           ? usersData
//           : usersData.users || []
//       );

//       setCurrentUser(meData);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FILTER ASSIGNED =================
//   const assignedProjects = useMemo(() => {
//     if (!currentUser) return [];

//     return projects.filter((project) =>
//       project.members?.includes(
//         currentUser._id
//       )
//     );
//   }, [projects, currentUser]);

//   // ================= GET USER NAME =================
//   const getUserName = (id) => {
//     const user = users.find(
//       (u) => u._id === id
//     );

//     return user?.name || "Unknown";
//   };

//   return (
//     <div
//       style={{
//         padding: 32,
//         maxWidth: 1400,
//         margin: "0 auto",
//       }}
//     >
//       {/* HEADER */}
//       <div
//         style={{
//           marginBottom: 30,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             marginBottom: 8,
//           }}
//         >
//           <Bell
//             size={20}
//             color="#7c3aed"
//           />

//           <span
//             style={{
//               color: "#7c3aed",
//               fontWeight: 600,
//               fontSize: 14,
//             }}
//           >
//             Assigned Projects
//           </span>
//         </div>

//         <h1
//           style={{
//             fontSize: 32,
//             fontWeight: 700,
//             color: "#111827",
//             marginBottom: 6,
//           }}
//         >
//           Your Projects
//         </h1>

//         <p
//           style={{
//             color: "#6b7280",
//             fontSize: 14,
//           }}
//         >
//           Projects assigned by admin
//         </p>
//       </div>

//       {/* EMPTY */}
//       {assignedProjects.length === 0 && (
//         <div
//           style={{
//             background: "#fff",
//             border:
//               "1px solid #e5e7eb",
//             borderRadius: 16,
//             padding: 80,
//             textAlign: "center",
//           }}
//         >
//           <FolderOpen
//             size={50}
//             color="#c4b5fd"
//             style={{
//               marginBottom: 14,
//             }}
//           />

//           <h2
//             style={{
//               fontSize: 20,
//               fontWeight: 600,
//               color: "#111827",
//               marginBottom: 8,
//             }}
//           >
//             No assigned projects
//           </h2>

//           <p
//             style={{
//               color: "#9ca3af",
//             }}
//           >
//             Admin has not assigned any
//             projects yet.
//           </p>
//         </div>
//       )}

//       {/* GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns:
//             "repeat(auto-fill,minmax(340px,1fr))",
//           gap: 22,
//         }}
//       >
//         {assignedProjects.map(
//           (project, index) => {
//             const pal =
//               PALETTE[
//                 index %
//                   PALETTE.length
//               ];

//             const manager =
//               getUserName(
//                 project.ownerId
//               );

//             // only members
//             const members =
//               project.members?.filter(
//                 (m) =>
//                   m !==
//                   project.ownerId
//               ) || [];

//             return (
//               <div
//                 key={project._id}
//                 style={{
//                   background: "#fff",
//                   border:
//                     "1px solid #e5e7eb",
//                   borderRadius: 18,
//                   padding: 24,
//                   position:
//                     "relative",
//                   overflow: "hidden",
//                   transition:
//                     "0.2s",
//                 }}
//               >
//                 {/* TOP BAR */}
//                 <div
//                   style={{
//                     position:
//                       "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: 4,
//                     background:
//                       pal.accent,
//                   }}
//                 />

//                 {/* ICON */}
//                 <div
//                   style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 14,
//                     background: pal.bg,
//                     color: pal.text,
//                     display: "flex",
//                     alignItems:
//                       "center",
//                     justifyContent:
//                       "center",
//                     fontSize: 18,
//                     fontWeight: 700,
//                     marginBottom: 18,
//                   }}
//                 >
//                   {initials(
//                     project.name
//                   )}
//                 </div>

//                 {/* TITLE */}
//                 <h2
//                   style={{
//                     fontSize: 22,
//                     fontWeight: 700,
//                     color: "#111827",
//                     marginBottom: 8,
//                   }}
//                 >
//                   {project.name}
//                 </h2>

//                 {/* DESCRIPTION */}
//                 <p
//                   style={{
//                     color: "#6b7280",
//                     fontSize: 14,
//                     lineHeight: 1.6,
//                     minHeight: 50,
//                   }}
//                 >
//                   {project.description}
//                 </p>

//                 {/* MANAGER */}
//                 <div
//                   style={{
//                     marginTop: 18,
//                     paddingTop: 18,
//                     borderTop:
//                       "1px solid #f3f4f6",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: 12,
//                       color: "#9ca3af",
//                       marginBottom: 6,
//                     }}
//                   >
//                     Project Manager
//                   </div>

//                   <div
//                     style={{
//                       fontWeight: 600,
//                       color: "#111827",
//                     }}
//                   >
//                     {manager}
//                   </div>
//                 </div>

//                 {/* MEMBERS */}
//                 <div
//                   style={{
//                     marginTop: 18,
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems:
//                         "center",
//                       gap: 8,
//                       marginBottom: 10,
//                     }}
//                   >
//                     <Users
//                       size={15}
//                       color="#6b7280"
//                     />

//                     <span
//                       style={{
//                         fontSize: 13,
//                         color: "#6b7280",
//                       }}
//                     >
//                       Assigned Members
//                     </span>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       gap: 8,
//                     }}
//                   >
//                     {members.map(
//                       (memberId) => (
//                         <span
//                           key={
//                             memberId
//                           }
//                           style={{
//                             background:
//                               "#f3f0ff",
//                             color:
//                               "#5b21b6",
//                             padding:
//                               "6px 12px",
//                             borderRadius: 20,
//                             fontSize: 12,
//                             fontWeight: 500,
//                           }}
//                         >
//                           {getUserName(
//                             memberId
//                           )}
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </div>

//                 {/* NOTIFICATION */}
//                 <div
//                   style={{
//                     position:
//                       "absolute",
//                     top: 18,
//                     right: 18,
//                     background:
//                       "#f3f0ff",
//                     color:
//                       "#7c3aed",
//                     padding:
//                       "6px 10px",
//                     borderRadius: 20,
//                     fontSize: 12,
//                     fontWeight: 600,
//                     display: "flex",
//                     alignItems:
//                       "center",
//                     gap: 5,
//                   }}
//                 >
//                   <Bell size={13} />
//                   Assigned
//                 </div>
//               </div>
//             );
//           }
//         )}
//       </div>
//     </div>
//   );
// }
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Bell,
  FolderOpen,
  Users,
} from "lucide-react";

const API =
  "http://localhost:5000/api";

const PALETTE = [
  {
    accent: "#7c3aed",
    bg: "#f3f0ff",
    text: "#5b21b6",
  },

  {
    accent: "#2563eb",
    bg: "#eff6ff",
    text: "#1d4ed8",
  },

  {
    accent: "#059669",
    bg: "#ecfdf5",
    text: "#047857",
  },

  {
    accent: "#db2777",
    bg: "#fdf2f8",
    text: "#be185d",
  },
];

// ================= INITIALS =================
function initials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AssignedProjects() {
  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [
    currentUser,
    setCurrentUser,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // ================= LOAD =================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        projectRes,
        userRes,
        meRes,
      ] = await Promise.all([
        fetch(`${API}/projects`, {
          headers,
        }),

        fetch(
          `${API}/admin/users`,
          {
            headers,
          }
        ),

        fetch(`${API}/auth/me`, {
          headers,
        }),
      ]);

      const projectsData =
        await projectRes.json();

      const usersData =
        await userRes.json();

      const meData =
        await meRes.json();

      // ✅ FIX ARRAY ISSUE
      setProjects(
        Array.isArray(
          projectsData
        )
          ? projectsData
          : []
      );

      setUsers(
        Array.isArray(usersData)
          ? usersData
          : []
      );

      setCurrentUser(meData);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= ASSIGNED PROJECTS =================
  const assignedProjects =
    useMemo(() => {
      if (!currentUser)
        return [];

      return projects.filter(
        (project) =>
         project.members?.includes(
  String(currentUser._id)
)
      );
    }, [
      projects,
      currentUser,
    ]);

  // ================= GET USER NAME =================
  const getUserName = (id) => {
    const user = users.find(
      (u) => u._id === id
    );

    return (
      user?.name || "Unknown"
    );
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        Loading projects...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <Bell
            size={20}
            color="#7c3aed"
          />

          <span
            style={{
              color: "#7c3aed",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Assigned Projects
          </span>
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 6,
          }}
        >
          Your Projects
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          Projects assigned by
          admin
        </p>
      </div>

      {/* EMPTY STATE */}
      {assignedProjects.length ===
        0 && (
        <div
          style={{
            background: "#fff",
            border:
              "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 80,
            textAlign: "center",
          }}
        >
          <FolderOpen
            size={50}
            color="#c4b5fd"
            style={{
              marginBottom: 14,
            }}
          />

          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            No assigned projects
          </h2>

          <p
            style={{
              color: "#9ca3af",
            }}
          >
            Admin has not assigned
            any projects yet.
          </p>
        </div>
      )}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(340px,1fr))",
          gap: 22,
        }}
      >
        {assignedProjects.map(
          (project, index) => {
            const pal =
              PALETTE[
                index %
                  PALETTE.length
              ];

            const manager =
              getUserName(
                project.ownerId
              );

            // ONLY MEMBERS
            const members =
              project.members?.filter(
                (m) =>
                  m !==
                  project.ownerId
              ) || [];

            return (
              <div
                key={project._id}
                style={{
                  background:
                    "#fff",

                  border:
                    "1px solid #e5e7eb",

                  borderRadius: 18,

                  padding: 24,

                  position:
                    "relative",

                  overflow:
                    "hidden",

                  transition:
                    "0.2s",
                }}
              >
                {/* TOP BAR */}
                <div
                  style={{
                    position:
                      "absolute",

                    top: 0,

                    left: 0,

                    right: 0,

                    height: 4,

                    background:
                      pal.accent,
                  }}
                />

                {/* ICON */}
                <div
                  style={{
                    width: 52,

                    height: 52,

                    borderRadius: 14,

                    background:
                      pal.bg,

                    color:
                      pal.text,

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    fontSize: 18,

                    fontWeight: 700,

                    marginBottom: 18,
                  }}
                >
                  {initials(
                    project.name
                  )}
                </div>

                {/* TITLE */}
                <h2
                  style={{
                    fontSize: 22,

                    fontWeight: 700,

                    color:
                      "#111827",

                    marginBottom: 8,
                  }}
                >
                  {project.name}
                </h2>

                {/* DESCRIPTION */}
                <p
                  style={{
                    color:
                      "#6b7280",

                    fontSize: 14,

                    lineHeight: 1.6,

                    minHeight: 50,
                  }}
                >
                  {
                    project.description
                  }
                </p>

                {/* MANAGER */}
                <div
                  style={{
                    marginTop: 18,

                    paddingTop: 18,

                    borderTop:
                      "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,

                      color:
                        "#9ca3af",

                      marginBottom: 6,
                    }}
                  >
                    Project Manager
                  </div>

                  <div
                    style={{
                      fontWeight: 600,

                      color:
                        "#111827",
                    }}
                  >
                    {manager}
                  </div>
                </div>

                {/* MEMBERS */}
                <div
                  style={{
                    marginTop: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",

                      alignItems:
                        "center",

                      gap: 8,

                      marginBottom: 10,
                    }}
                  >
                    <Users
                      size={15}
                      color="#6b7280"
                    />

                    <span
                      style={{
                        fontSize: 13,

                        color:
                          "#6b7280",
                      }}
                    >
                      Assigned
                      Members
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",

                      flexWrap:
                        "wrap",

                      gap: 8,
                    }}
                  >
                    {members.length ===
                    0 ? (
                      <span
                        style={{
                          fontSize: 12,

                          color:
                            "#9ca3af",
                        }}
                      >
                        No members
                      </span>
                    ) : (
                      members.map(
                        (
                          memberId
                        ) => (
                          <span
                            key={
                              memberId
                            }
                            style={{
                              background:
                                "#f3f0ff",

                              color:
                                "#5b21b6",

                              padding:
                                "6px 12px",

                              borderRadius: 20,

                              fontSize: 12,

                              fontWeight: 500,
                            }}
                          >
                            {getUserName(
                              memberId
                            )}
                          </span>
                        )
                      )
                    )}
                  </div>
                </div>

                {/* STATUS */}
                <div
                  style={{
                    position:
                      "absolute",

                    top: 18,

                    right: 18,

                    background:
                      "#f3f0ff",

                    color:
                      "#7c3aed",

                    padding:
                      "6px 10px",

                    borderRadius: 20,

                    fontSize: 12,

                    fontWeight: 600,

                    display: "flex",

                    alignItems:
                      "center",

                    gap: 5,
                  }}
                >
                  <Bell size={13} />
                  Assigned
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}