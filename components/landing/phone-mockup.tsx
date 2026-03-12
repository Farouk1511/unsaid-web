import { cn } from "@/lib/utils"
import Image from "next/image"

interface PhoneMockupProps {
  children?: React.ReactNode
  className?: string
  imageSrc?: string
  imageAlt?: string
}

export function PhoneMockup({ children, className, imageSrc, imageAlt }: PhoneMockupProps) {
  if (imageSrc) {
    return (
      <div className={cn(
        "w-[260px] sm:w-[280px] overflow-hidden rounded-[2.5rem] shadow-xl shadow-primary/10",
        className
      )}>
        <Image
          src={imageSrc}
          alt={imageAlt || "App screenshot"}
          width={560}
          height={1218}
          className="block h-auto w-full scale-[1.08]"
        />
      </div>
    )
  }

  return (
    <div className={cn(
      "w-[260px] sm:w-[280px] bg-white rounded-[44px] p-3 shadow-xl shadow-primary/10 border border-border/50",
      className
    )}>
      <div className="bg-background rounded-[36px] overflow-hidden">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-3">
          <span className="text-[11px] text-muted-foreground font-medium">9:41</span>
          <div className="w-20 h-6 bg-foreground rounded-full" />
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="px-4 pb-6 pt-2">
          {children}
        </div>
      </div>
    </div>
  )
}
