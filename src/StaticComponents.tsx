import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return <h1 className="text-lg font-bold">{children}</h1>;
}

export function Shortcut({ children }: PropsWithChildren) {
  return (
    <kbd className="font-sans bg-white/20 text-sm px-2 py-1 rounded">
      {children}
    </kbd>
  );
}
