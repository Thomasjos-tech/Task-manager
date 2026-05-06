import { Navigate } from "react-router-dom";
import { useStore } from "@/lib/store";

const Index = () => {
  const currentUser = useStore((s) => s.currentUser);
  return <Navigate to={currentUser ? "/dashboard" : "/login"} replace />;
};

export default Index;
