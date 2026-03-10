const VARIANT_STYLES = {
  default: "border-primary/10 hover:border-primary/30",
  warning: "border-sakura-warning/20 hover:border-sakura-warning/40",
  success: "border-sakura-success/20 hover:border-sakura-success/40",
  muted: "border-border hover:border-primary/20",
};

const ICON_STYLES = {
  default: "bg-secondary text-primary",
  warning: "bg-sakura-warning/10 text-sakura-warning",
  success: "bg-sakura-success/10 text-sakura-success",
  muted: "bg-muted text-muted-foreground",
};

export default function DashboardCard({ title, value, icon: Icon, onClick, variant = "default" }) {
  return (
    <button onClick={onClick} aria-label={title} className={`bg-card rounded-xl border-2 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${VARIANT_STYLES[variant]}`}>
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${ICON_STYLES[variant]}`}><Icon size={22} /></div>
        <span className="text-3xl font-extrabold text-foreground">{value}</span>
      </div>
      <div className="mt-3 text-sm font-medium text-muted-foreground">{title}</div>
    </button>
  );
}
