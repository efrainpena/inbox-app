import  { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import InboxPage from "../pages/InboxPage";
import ThreadDetailPage from "../pages/ThreadDetailPage";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ padding: "2rem" }}>Validando sesión...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <InboxPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/threads/:id"
          element={
            <PrivateRoute>
              <ThreadDetailPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/inbox" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

