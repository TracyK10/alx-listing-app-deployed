import * as React from "react"
import Image from 'next/image';
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean
  }
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLDivElement,
  {
    src: string;
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
  }
>((props) => {
    const { src, alt, className, width = 40, height = 40 } = props;
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className={cn("aspect-square h-full w-full", className)}
      />
    );
  })
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean
  }
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
