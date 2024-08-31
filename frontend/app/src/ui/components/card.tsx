import * as React from 'react'
import { cn } from './utils'

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 p-4 rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
        // 'outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ',
        'dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'
