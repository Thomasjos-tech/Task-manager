// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Sparkles } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Card } from "@/components/ui/card";
// // import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { toast } from "sonner";

// // const BASE_URL = "http://localhost:5000/api/auth";

// // const Login = () => {
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [name, setName] = useState("");
// //   const [role, setRole] = useState("MEMBER");

// //   // ✅ LOGIN
// //   const onLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       const res = await fetch(`${BASE_URL}/login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         return toast.error(data.message || "Login failed");
// //       }

// //       // store token
// //       localStorage.setItem("token", data.token);

// //       toast.success("Welcome back");
// //       navigate("/dashboard");

// //     } catch (error) {
// //       toast.error("Server error");
// //     }
// //   };

// //   // ✅ SIGNUP
// //   const onSignup = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (password.length < 6) {
// //       return toast.error("Password must be at least 6 characters");
// //     }

// //     try {
// //       const res = await fetch(`${BASE_URL}/signup`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ name, email, password, role }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         return toast.error(data.message || "Signup failed");
// //       }

// //       toast.success("Account created");
// //       navigate("/");

// //     } catch (error) {
// //       toast.error("Server error");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
// //       <div className="w-full max-w-md">

// //         {/* HEADER */}
// //         <div className="text-center mb-8">
// //           <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant mx-auto mb-4">
// //             <Sparkles className="h-7 w-7 text-primary-foreground" />
// //           </div>
// //           <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
// //           <p className="text-muted-foreground mt-2">
// //             Manage projects and ship work as a team
// //           </p>
// //         </div>

// //         {/* CARD */}
// //         <Card className="p-6 shadow-card">
// //           <Tabs defaultValue="login">

// //             <TabsList className="grid w-full grid-cols-2 mb-6">
// //               <TabsTrigger value="login">Log in</TabsTrigger>
// //               <TabsTrigger value="signup">Sign up</TabsTrigger>
// //             </TabsList>

// //             {/* LOGIN */}
// //             <TabsContent value="login">
// //               <form onSubmit={onLogin} className="space-y-4">

// //                 <div className="space-y-2">
// //                   <Label>Email</Label>
// //                   <Input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Password</Label>
// //                   <Input
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <Button type="submit" className="w-full bg-gradient-primary">
// //                   Log in
// //                 </Button>

// //               </form>
// //             </TabsContent>

// //             {/* SIGNUP */}
// //             <TabsContent value="signup">
// //               <form onSubmit={onSignup} className="space-y-4">

// //                 <div className="space-y-2">
// //                   <Label>Full Name</Label>
// //                   <Input
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Email</Label>
// //                   <Input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Password</Label>
// //                   <Input
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label>Role</Label>
// //                   <RadioGroup
// //                     value={role}
// //                     onValueChange={(v) => setRole(v)}
// //                     className="grid grid-cols-2 gap-2"
// //                   >
// //                     {["ADMIN", "MEMBER"].map((r) => (
// //                       <Label
// //                         key={r}
// //                         className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer"
// //                       >
// //                         <RadioGroupItem value={r} />
// //                         <span>{r}</span>
// //                       </Label>
// //                     ))}
// //                   </RadioGroup>
// //                 </div>

// //                 <Button type="submit" className="w-full bg-gradient-primary">
// //                   Create account
// //                 </Button>

// //               </form>
// //             </TabsContent>

// //           </Tabs>
// //         </Card>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "sonner";
// import { useStore } from "@/lib/store";
// import type { Role, User } from "@/lib/store";

// const BASE_URL = "http://localhost:5000/api/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setCurrentUser } = useStore();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState<Role>("Member");

//   // ✅ LOGIN
//   const onLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return toast.error(data.message || "Login failed");
//       }

//       // ✅ Store JWT token
//       localStorage.setItem("token", data.token);

//       // ✅ Build a User object from the API response and sync into Zustand
//       // Adjust field names below to match what your backend actually returns
//       const user: User = {
//         id: data.user?.id ?? data.id ?? `u${Date.now()}`,
//         name: data.user?.name ?? data.name ?? email.split("@")[0],
//         email: data.user?.email ?? data.email ?? email,
//         role: (data.user?.role ?? data.role ?? "Member") as Role,
//       };

//       setCurrentUser(user);

//       toast.success("Welcome back");
//       navigate("/dashboard");

//     } catch (error) {
//       toast.error("Server error");
//     }
//   };

//   // ✅ SIGNUP
//   const onSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters");
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return toast.error(data.message || "Signup failed");
//       }

//       // ✅ If your signup endpoint returns a token + user, log them in immediately
//       if (data.token) {
//         localStorage.setItem("token", data.token);

//         const user: User = {
//           id: data.user?.id ?? data.id ?? `u${Date.now()}`,
//           name: data.user?.name ?? data.name ?? name,
//           email: data.user?.email ?? data.email ?? email,
//           role: (data.user?.role ?? data.role ?? role) as Role,
//         };

//         setCurrentUser(user);
//         toast.success("Account created");
//         navigate("/dashboard");
//       } else {
//         // Signup-only endpoint — redirect to login tab
//         toast.success("Account created — please log in");
//         navigate("/");
//       }

//     } catch (error) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
//       <div className="w-full max-w-md">

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant mx-auto mb-4">
//             <Sparkles className="h-7 w-7 text-primary-foreground" />
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
//           <p className="text-muted-foreground mt-2">
//             Manage projects and ship work as a team
//           </p>
//         </div>

//         {/* CARD */}
//         <Card className="p-6 shadow-card">
//           <Tabs defaultValue="login">

//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="login">Log in</TabsTrigger>
//               <TabsTrigger value="signup">Sign up</TabsTrigger>
//             </TabsList>

//             {/* LOGIN */}
//             <TabsContent value="login">
//               <form onSubmit={onLogin} className="space-y-4">

//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <Button type="submit" className="w-full bg-gradient-primary">
//                   Log in
//                 </Button>

//               </form>
//             </TabsContent>

//             {/* SIGNUP */}
//             <TabsContent value="signup">
//               <form onSubmit={onSignup} className="space-y-4">

//                 <div className="space-y-2">
//                   <Label>Full Name</Label>
//                   <Input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Role</Label>
//                   <RadioGroup
//                     value={role}
//                     onValueChange={(v) => setRole(v as Role)}
//                     className="grid grid-cols-2 gap-2"
//                   >
//                     {(["Admin", "Member"] as Role[]).map((r) => (
//                       <Label
//                         key={r}
//                         className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer"
//                       >
//                         <RadioGroupItem value={r} />
//                         <span>{r}</span>
//                       </Label>
//                     ))}
//                   </RadioGroup>
//                 </div>

//                 <Button type="submit" className="w-full bg-gradient-primary">
//                   Create account
//                 </Button>

//               </form>
//             </TabsContent>

//           </Tabs>
//         </Card>

//       </div>
//     </div>
//   );
// };

// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "sonner";
// import { useStore } from "@/lib/store";
// import type { Role, User } from "@/lib/store";

// const BASE_URL = "http://localhost:5000/api/auth";

// // ✅ Backend uses "ADMIN"/"MEMBER", store uses "Admin"/"Member"
// const toStoreRole = (backendRole: string): Role => {
//   if (backendRole?.toUpperCase() === "ADMIN") return "Admin";
//   return "Member";
// };

// const toBackendRole = (storeRole: Role): string => {
//   return storeRole.toUpperCase(); // "Admin" → "ADMIN"
// };

// const Login = () => {
//   const navigate = useNavigate();
//   const { setCurrentUser } = useStore();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState<Role>("Member");

//   // ✅ LOGIN
//   const onLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return toast.error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);

//       const user: User = {
//         id: data.user?.id ?? data.id ?? `u${Date.now()}`,
//         name: data.user?.name ?? data.name ?? email.split("@")[0],
//         email: data.user?.email ?? data.email ?? email,
//         // ✅ Convert "ADMIN"/"MEMBER" → "Admin"/"Member"
//         role: toStoreRole(data.user?.role ?? data.role),
//       };

//       setCurrentUser(user);
//       toast.success("Welcome back");
//       navigate("/dashboard");

//     } catch (error) {
//       toast.error("Server error");
//     }
//   };

//   // ✅ SIGNUP
//   const onSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters");
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           // ✅ Convert "Admin"/"Member" → "ADMIN"/"MEMBER" for backend
//           role: toBackendRole(role),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return toast.error(data.message || "Signup failed");
//       }

//       if (data.token) {
//         localStorage.setItem("token", data.token);

//         const user: User = {
//           id: data.user?.id ?? data.id ?? `u${Date.now()}`,
//           name: data.user?.name ?? data.name ?? name,
//           email: data.user?.email ?? data.email ?? email,
//           // ✅ Convert back from backend format
//           role: toStoreRole(data.user?.role ?? data.role ?? toBackendRole(role)),
//         };

//         setCurrentUser(user);
//         toast.success("Account created");
//         navigate("/dashboard");
//       } else {
//         toast.success("Account created — please log in");
//         navigate("/");
//       }

//     } catch (error) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
//       <div className="w-full max-w-md">

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant mx-auto mb-4">
//             <Sparkles className="h-7 w-7 text-primary-foreground" />
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
//           <p className="text-muted-foreground mt-2">
//             Manage projects and ship work as a team
//           </p>
//         </div>

//         {/* CARD */}
//         <Card className="p-6 shadow-card">
//           <Tabs defaultValue="login">

//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="login">Log in</TabsTrigger>
//               <TabsTrigger value="signup">Sign up</TabsTrigger>
//             </TabsList>

//             {/* LOGIN */}
//             <TabsContent value="login">
//               <form onSubmit={onLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full bg-gradient-primary">
//                   Log in
//                 </Button>
//               </form>
//             </TabsContent>

//             {/* SIGNUP */}
//             <TabsContent value="signup">
//               <form onSubmit={onSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Full Name</Label>
//                   <Input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <Input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Role</Label>
//                   <RadioGroup
//                     value={role}
//                     onValueChange={(v) => setRole(v as Role)}
//                     className="grid grid-cols-2 gap-2"
//                   >
//                     {(["Admin", "Member"] as Role[]).map((r) => (
//                       <Label
//                         key={r}
//                         className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer"
//                       >
//                         <RadioGroupItem value={r} />
//                         <span>{r}</span>
//                       </Label>
//                     ))}
//                   </RadioGroup>
//                 </div>
//                 <Button type="submit" className="w-full bg-gradient-primary">
//                   Create account
//                 </Button>
//               </form>
//             </TabsContent>

//           </Tabs>
//         </Card>

//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import type { Role, User } from "@/lib/store";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

// ✅ Convert backend → frontend (safe)
const toStoreRole = (backendRole: string): Role => {
  if (backendRole === "Admin") return "Admin";
  return "Member";
};

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("Member");

  // ✅ LOGIN
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      const user: User = {
        id: data.user?._id,
        name: data.user?.name,
        email: data.user?.email,
        role: toStoreRole(data.user?.role),
      };

      setCurrentUser(user);
      toast.success("Welcome back");
      navigate("/dashboard");

    } catch (error) {
      toast.error("Server error");
    }
  };

  // ✅ SIGNUP
  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role, // ✅ FIXED (no uppercase conversion)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Signup failed");
      }

      toast.success("Account created — please log in");
      navigate("/");

    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
          <p className="text-muted-foreground mt-2">
            Manage projects and ship work as a team
          </p>
        </div>

        {/* CARD */}
        <Card className="p-6 shadow-card">
          <Tabs defaultValue="login">

            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  Log in
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <form onSubmit={onSignup} className="space-y-4">

                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Role</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(v) => setRole(v as Role)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <Label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
                      <RadioGroupItem value="Admin" />
                      Admin
                    </Label>

                    <Label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
                      <RadioGroupItem value="Member" />
                      Member
                    </Label>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  Create account
                </Button>

              </form>
            </TabsContent>

          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;