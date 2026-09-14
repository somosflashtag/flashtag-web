import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** Ritmo vertical único: 56 / 80 / 128px. Un token, sin excepciones. */
export function Section({
  children,
  className,
  dark = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-14 md:py-20 lg:py-32",
        dark && "bg-ink text-paper",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
