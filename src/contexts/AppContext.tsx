import React, { createContext, useContext, useState, ReactNode } from "react";
import { USERS, DOCUMENTS, ROLE_PERMISSIONS, type User, type UserRole, type Document } from "@/data/mockData";

interface AppState {
  currentUser: User;
  users: User[];
  documents: Document[];
  rolePermissions: Record<UserRole, string[]>;
  isLoggedIn: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  updateUserRole: (userId: number, newRole: UserRole) => void;
  updateUserAvatar: (userId: number, avatar: string) => void;
  togglePermission: (role: UserRole, permission: string) => void;
  addAuditNote: (docId: number, note: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);
  const [users, setUsers] = useState<User[]>(USERS);
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS);
  const [rolePermissions, setRolePermissions] = useState(ROLE_PERMISSIONS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  const updateUserRole = (userId: number, newRole: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser.id === userId) setCurrentUser((p) => ({ ...p, role: newRole }));
  };

  const updateUserAvatar = (userId: number, avatar: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, avatar } : u)));
    if (currentUser.id === userId) setCurrentUser((p) => ({ ...p, avatar }));
  };

  const togglePermission = (role: UserRole, permission: string) => {
    setRolePermissions((prev) => {
      const current = prev[role];
      const next = current.includes(permission) ? current.filter((p) => p !== permission) : [...current, permission];
      return { ...prev, [role]: next };
    });
  };

  const addAuditNote = (docId: number, note: string) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id !== docId) return d;
        const lastEntry = d.auditTrail[d.auditTrail.length - 1];
        const newTrail = [...d.auditTrail];
        // Add note to last entry or create admin note entry
        newTrail.push({
          time: new Date().toISOString(),
          user: { nama: currentUser.nama, avatar: currentUser.avatar, role: currentUser.role },
          action: `Catatan Admin: ${note}`,
        });
        return { ...d, auditTrail: newTrail };
      })
    );
  };

  return (
    <AppContext.Provider value={{ currentUser, users, documents, rolePermissions, isLoggedIn, login, logout, updateUserRole, updateUserAvatar, togglePermission, addAuditNote }}>
      {children}
    </AppContext.Provider>
  );
};
