import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client"; // apna correct path use karo

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const { data: { session } } = await supabase.auth.getSession();
  //     setIsAuthenticated(!!session);
  //     setIsLoading(false);
  //   };
  //   checkAuth();
  // }, []);


    useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      // Check: session + email confirmation
      if (
        session &&
        session.user &&
        (
          session.user.email_confirmed_at // confirmed
          || session.user.confirmed_at    // some supabase versions use this key
        )
      ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) return null; // optional: spinner or skeleton

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;