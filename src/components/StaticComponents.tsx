import { CircleSlash } from "lucide-react";
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

export function EmptySection({ children }: PropsWithChildren) {
	return (
		<div className="pointer-events-none select-none flex gap-2 text-black/20 border-2 border-black/10 border-dashed w-full p-6">
			<CircleSlash /> {children}
		</div>
	);
}
