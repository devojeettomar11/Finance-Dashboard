// ─────────────────────────────────────────────────────────────
//  RoleContext.jsx  —  Simulates Role-Based Access Control
//
//  Roles:
//    "admin"  → can view + add + edit + delete transactions
//    "viewer" → read-only, all mutation buttons hidden
//
//  Role is persisted in localStorage so it survives page refresh.
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  // Persist role in localStorage
  const [role, setRole] = useState(
    () => localStorage.getItem("finflow_role") || "admin"
  );

  const handleSetRole = (r) => {
    localStorage.setItem("finflow_role", r);
    setRole(r);
  };

  const isAdmin = role === "admin";

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}
