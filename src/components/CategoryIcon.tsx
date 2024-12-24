import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryIconProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

export function CategoryIcon({ icon, label, to }: CategoryIconProps) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 p-4 hover:text-blue-600 transition-colors"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  );
}
