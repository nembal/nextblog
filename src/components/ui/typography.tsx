import React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "list" | "muted"
  className?: string
  children: React.ReactNode
}

export function Typography({
  variant = "p",
  className,
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
          )}
          {...props}
        >
          {children}
        </h1>
      )
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
          )}
          {...props}
        >
          {children}
        </h2>
      )
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      )
    case "h4":
      return (
        <h4
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
          )}
          {...props}
        >
          {children}
        </h4>
      )
    case "blockquote":
      return (
        <blockquote
          className={cn("mt-6 border-l-2 pl-6 italic", className)}
          {...props}
        >
          {children}
        </blockquote>
      )
    case "list":
      return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
          {children}
        </ul>
      )
    case "muted":
      return (
        <p
          className={cn("text-sm text-muted-foreground", className)}
          {...props}
        >
          {children}
        </p>
      )
    default:
      return (
        <p
          className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
          {...props}
        >
          {children}
        </p>
      )
  }
} 