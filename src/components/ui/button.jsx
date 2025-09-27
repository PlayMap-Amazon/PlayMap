import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-neutral-100 shadow-xs hover:bg-neutral-200 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-neutral-100 text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  unroundOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        unroundOnHover && "hover:rounded-none",
        "rounded-md",
        className
      )}
      {...props}
    />
  );
}

function ArrowedButton({
  link,
  children,
  className,
  variant,
  size,
  ...props
}) {
  const textRef = React.useRef(null);
  const arrowRef = React.useRef(null);
  const [baseLeft, setBaseLeft] = React.useState(0);
  const [currentLeft, setCurrentLeft] = React.useState("0%");

  React.useEffect(() => {
    if (textRef.current && arrowRef.current) {
      const textRect = textRef.current.getBoundingClientRect();
      const buttonRect = textRef.current.parentElement.getBoundingClientRect();
      const arrowWidth = arrowRef.current.offsetWidth;
      const gap = 6;

      const textLeftRelative = textRect.left - buttonRect.left;
      const calculatedBaseLeft = textLeftRelative - arrowWidth - gap;

      setBaseLeft(calculatedBaseLeft);
      setCurrentLeft(calculatedBaseLeft + "px");
    }
  }, [children]);

  const hoverShift = 8;

  const handleMouseEnter = () => {
    setCurrentLeft(baseLeft + hoverShift + "px");
  };

  const handleMouseLeave = () => {
    setCurrentLeft(baseLeft + "px");
  };

  return (
    <Link to={link}>
      <Button
        variant={variant}
        size={size}
        className={cn(
          "group relative overflow-hidden cursor-pointer px-6 py-2 flex items-center justify-center",
          className
        )}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          ref={arrowRef}
          className="absolute opacity-0 group-hover:opacity-100"
          style={{
            top: '50%',
            transform: 'translateY(-55%)',
            left: currentLeft,
            transition: "left 0.2s ease-in-out, opacity 0.2s ease-in-out",
          }}
          aria-hidden="true"
        >
          →
        </span>
        <span
          ref={textRef}
          className="transition-transform duration-200 group-hover:translate-x-2"
        >
          {children}
        </span>
      </Button>
    </Link>
  );
}

export { Button, ArrowedButton, buttonVariants };
