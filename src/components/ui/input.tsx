import * as React from "react"

import { cn } from "@/lib/utils/tailwind-merge"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full border border-gray-200 px-3 py-2 text-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 font-(family-name:--font-geist-mono) font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
