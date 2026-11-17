import type { CheckboxRootProps, SelectRootProps } from "@base-ui/react";
import { type PropsWithChildren, useId, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";
import { Input as UIInput } from "@/components/ui/input";
import {
	SelectTrigger,
	SelectValue,
	Select as ShadSelect,
} from "@/components/ui/select";

import { tw } from "../lib/utility";

export function ColoredNumberAnwser(
	props: PropsWithChildren & { question?: string; sign: number },
) {
	return (
		<p
			className={tw(
				"flex items-center gap-1 text-[12px] leading-relaxed",
				["text-red-800", "text-black/25", "text-green-800"][props.sign],
			)}
		>
			{props.question}
			{props.children}
		</p>
	);
}

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
		<div className={tw("flex flex-col", containerClassName)}>
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

export function SimpleCheckbox(
	props: PropsWithChildren & CheckboxRootProps & { description?: string },
) {
	const id = useId();

	return (
		<FieldLabel>
			<Field orientation="horizontal">
				<Checkbox {...props} id={id} name={id} />
				<FieldContent>
					<FieldTitle>{props.children}</FieldTitle>
					{props.description && (
						<FieldDescription>{props.description}</FieldDescription>
					)}
				</FieldContent>
			</Field>
		</FieldLabel>
	);
}

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { SS } from "@/lib/types";

export function PasswordInput(
	props: PropsWithChildren & {
		description?: string;
		value: string;
		setValue: SS<string>;
	},
) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [show, setShow] = useState(false);

	return (
		<Field>
			<FieldLabel htmlFor="input-button-group">{props.children}</FieldLabel>
			{props.description && (
				<FieldDescription>{props.description}</FieldDescription>
			)}

			<ButtonGroup>
				<UIInput
					ref={inputRef}
					value={props.value}
					onChange={(e) => props.setValue(e.target.value)}
					type={show ? "text" : "password"}
					id="input-button-group"
					placeholder="Senha"
				/>
				<Button
					onClick={() => {
						// Toggle state
						setShow(!show);
						// Focus back on input
						inputRef.current?.focus();
					}}
					variant="outline"
				>
					<Eye />
				</Button>
			</ButtonGroup>
		</Field>
	);
}
