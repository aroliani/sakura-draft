import { Bell } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import UserProfileModal from "@/components/modals/UserProfileModal";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: Props) {
  const { currentUser } = useApp();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-card">
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <button onClick={() => setShowProfile(true)} className="flex items-center gap-3 hover:bg-muted rounded-lg px-3 py-1.5 transition-colors">
            <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">{currentUser.nama}</div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">{currentUser.role}</span>
            </div>
          </button>
        </div>
      </header>
      {showProfile && <UserProfileModal user={currentUser} onClose={() => setShowProfile(false)} />}
    </>
  );
}
