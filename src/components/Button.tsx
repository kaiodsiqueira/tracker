import type { VariantProps } from "tailwind-variants";
import { tw, variants } from "../utility";

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

const buttonStyles = variants({
	base: "px-4 py-2 rounded shadow mt-3 hover:cursor-pointer",
	variants: {
		theme: {
			neutral: "border bg-black/20 hover:bg-black/10 shadow-none",
			success: "bg-emerald-600 text-white hover:bg-emerald-700",
			danger: "bg-red-800 text-white hover:bg-red-900",
		},
	},
	defaultVariants: {
		theme: "neutral",
	},
});

export default function Button({
	className,
	theme,
	children,
	...props
}: ButtonProps & VariantProps<typeof buttonStyles>) {
	return (
		<button className={tw("", buttonStyles({ theme }), className)} {...props}>
			{children}
		</button>
	);
}
