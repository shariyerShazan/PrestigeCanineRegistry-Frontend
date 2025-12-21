import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  indicatorClassName?: string
}

export function Progress({
  className,
  indicatorClassName,
  value,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          indicatorClassName
        )}
        style={{
          transform: `translateX(-${100 - (value ?? 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}
