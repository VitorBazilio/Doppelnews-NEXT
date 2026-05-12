import type { ReactNode } from "react";

type TableProps = {
  label: string;
  children: ReactNode;
};

export default function Table({ label, children }: TableProps) {
  return (
    <div className="admin-table" role="table" aria-label={label}>
      {children}
    </div>
  );
}
