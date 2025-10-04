interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveGrid({
  children,
  className = "",
}: ResponsiveGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}
