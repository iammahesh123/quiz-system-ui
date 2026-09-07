import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
    <div className="h-12 w-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
      <Icon className="h-6 w-6 text-slate-500" />
    </div>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
    {actionLabel && onAction && (
      <div className="mt-6">
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      </div>
    )}
  </div>
);
