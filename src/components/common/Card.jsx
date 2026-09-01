import React from 'react';
import { cn } from '../../utils/cn';

export default function Card({
  children,
  className,
  title,
  subtitle,
  icon: Icon,
  action,
  headerClassName,
  bodyClassName,
  ...props
}) {
  return (
    <div
      className={cn(
        'bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl shadow-black/20 overflow-hidden transition-all duration-200 hover:border-slate-700/80',
        className
      )}
      {...props}
    >
      {(title || Icon || action) && (
        <div
          className={cn(
            'px-5 py-4 border-b border-slate-800/80 flex items-center justify-between gap-3',
            headerClassName
          )}
        >
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div>
              {title && <h3 className="font-semibold text-slate-100 text-sm tracking-wide">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </div>
  );
}
