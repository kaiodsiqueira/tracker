import type { PropsWithChildren } from "react";
import { tw, variants, type vp } from "@/utility";

const badgeStyle = variants({
	base: "inline-flex items-center gap-1 rounded-full bg-black/10 px-2 py-1 text-xs font-bold text-black/80 border-[1.5px]",
	variants: {
		color: {
			default: "bg-black/10 text-black/80",
			primary: "bg-blue-500 text-white",
			secondary: "bg-gray-100 text-gray-900 border-gray-900",
			success: "bg-green-100 text-green-900 border-green-900",
			warning: "bg-yellow-500 text-white",
			error: "bg-red-50 text-red-900 border-red-900",
		},
		size: {
			small: "px-2 py-[.8px] mr-1 text-xs",
			medium: "px-3 py-1.5 text-sm",
			large: "px-4 py-2 text-base",
		},
	},
	defaultVariants: {
		color: "default",
		size: "small",
	},
});

export default function Badge({
	className,
	children,
	color,
	size,
}: PropsWithChildren & vp<typeof badgeStyle> & { className?: string }) {
	return (
		<span className={tw(badgeStyle({ color, size }), className)}>
			{children}
		</span>
	);
}
