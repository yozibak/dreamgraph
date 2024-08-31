import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './utils'

// TODO: dark mode
// dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300 

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    'border border-zinc-300 bg-white shadow-md hover:bg-zinc-50 hover:text-zinc-950',
  {
    variants: {
      variant: {
        left: 'rounded-tl-xl rounded-bl-xl mr-3px pl-1',
        center: 'mx-2px',
        right:
          'rounded-tr-xl rounded-br-xl ml-3px pr-1',
      },
      size: {
        default: 'h-8 w-12',
      },
    },
    defaultVariants: {
      variant: 'left',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Tool = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Tool.displayName = 'Button'

export { Tool, buttonVariants }
