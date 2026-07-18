import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface DefaultLayoutProps extends React.ComponentPropsWithoutRef<"section"> {
  className?: string;
  children: ReactNode;
}

const DefaultLayout = ({
  className,
  children,
  ...props
}: DefaultLayoutProps) => {
  return (
    <section
      className={cn(
        `font-Poppins relative mx-auto flex w-full flex-col items-center gap-4 px-4 py-10 sm:px-8 xl:px-30 xl:py-20 2xl:px-60`,
        className,
      )}
      {...props}
    >
      <div className="relative w-full max-w-1440px">{children}</div>
    </section>
  );
};

export default DefaultLayout;