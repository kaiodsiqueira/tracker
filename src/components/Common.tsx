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

type SelectProps = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;

export function Select({
	title,
	children,
	className,
	containerClassName,
	...props
}: SelectProps & { containerClassName?: string }) {
	return (
		<div className={tw("", containerClassName)}>
			{title && <span className="font-medium text-xs">{title}</span>}
			<select
				className={tw(
					"px-4 py-2 w-full border border-black/20 shadow rounded outline-none",
					className,
				)}
				{...props}
			>
				{children}
			</select>
		</div>
	);
}
