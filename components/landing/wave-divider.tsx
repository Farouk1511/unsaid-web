import { cn } from "@/lib/utils"

interface WaveDividerProps {
  className?: string
  flip?: boolean
}

export function WaveDivider({ className, flip }: WaveDividerProps) {
  return (
    <div className={cn(
      "absolute left-0 right-0 w-full overflow-hidden pointer-events-none",
      flip ? "top-0 rotate-180" : "bottom-0",
      className
    )}>
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80C240 140 480 20 720 80C960 140 1200 20 1440 80V200H0V80Z"
          className="fill-soft-lavender/50"
        />
        <path
          d="M0 120C300 60 600 160 900 100C1200 40 1350 140 1440 120V200H0V120Z"
          className="fill-soft-lavender/30"
        />
      </svg>
    </div>
  )
}
