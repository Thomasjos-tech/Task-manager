import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStore, Role } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Shield, UserCog } from "lucide-react";

const Settings = () => {
  const { currentUser, users, inviteUser, changeUserRole } = useStore();
  if (currentUser?.role !== "Admin") return <Navigate to="/dashboard" replace />;

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Member" as Role });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be 6+ characters");
    const r = inviteUser(form.name, form.email, form.password, form.role);
    if (!r.ok) return toast.error(r.error!);
    toast.success(`${form.role} added`);
    setForm({ name: "", email: "", password: "", role: "Member" });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <PageHeader title="Settings" description="Manage admins and team members." />

      <Card className="p-6 shadow-card border-0 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCog className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Add user (Admin or Member)</h2>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2"><Label>Full name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Member">Member</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="bg-gradient-primary border-0 shadow-elegant w-full md:w-auto">Add user</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 shadow-card border-0">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Roles & access</h2>
        </div>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{u.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {u.id === currentUser?.id ? (
                  <Badge variant="secondary">{u.role}</Badge>
                ) : (
                  <Select value={u.role} onValueChange={(v) => { changeUserRole(u.id, v as Role); toast.success("Role updated"); }}>
                    <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Member">Member</SelectItem></SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
