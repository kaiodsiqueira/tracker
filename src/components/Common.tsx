import type { SelectRootProps } from "@base-ui/react";

import {
	SelectTrigger,
	SelectValue,
	Select as ShadSelect,
} from "@/components/ui/select";

import { tw } from "../utility";

export type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export function Input({
	title,
	className,
	containerClassName,
	...props
}: InputProps & { containerClassName?: string }) {
	return (
		<div className={tw("", containerClassName)}>
			{title && <span className="font-medium text-xs">{title}</span>}
			<input
				className={tw(
					"px-4 py-2 w-full border border-black/20 shadow rounded outline-none",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export function Select({
	title,
	children,
	className,
	containerClassName,
	...props
}: SelectRootProps<string, false> & {
	title?: string;
	className?: string;
	containerClassName?: string;
}) {
	return (
		<div className={tw("", containerClassName)}>
			{title && <span className="font-medium text-xs">{title}</span>}
			<ShadSelect {...props}>
				<SelectTrigger
					className={tw(
						"px-4 py-2 w-full border border-black/20 shadow rounded outline-none",
						className,
					)}
				>
					<SelectValue />
				</SelectTrigger>
				{children}
			</ShadSelect>
		</div>
	);
}
