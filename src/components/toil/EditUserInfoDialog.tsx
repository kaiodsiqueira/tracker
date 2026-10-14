import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { useState } from "react";

import Button from "@/components/Button";
import { Input, Select } from "@/components/Common";
import { Shortcut } from "@/components/StaticComponents";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
} from "@/components/ui/select";

import type { SS } from "@/utility";

const AVAILABLE_AVATARS = [
	{ label: "Iniciais", value: "initials" },
	{ label: "Masculino", value: "man" },
	{ label: "Feminino", value: "woman" },
];

export const AVATARS_URLS: {
	[key: string]: string | ((name: string) => string);
} = {
	initials: (name: string) =>
		`https://ui-avatars.com/api/?name=${name.split(" ").join("+")}&background=random`,

	man: "./avatares/avatar-man.png",
	woman: "./avatares/avatar-woman.png",
};

const DEFAULT_AVATAR = "initials";

export default function EditUserInfoDialog(props: {
	isOpen: boolean;
	setIsOpen: SS<boolean>;
	onSave: (infos: { name: string; avatar: string }) => void;

	defaultName?: string;
	defaultAvatar?: string;

	labelTitle: string;
	labelDescription: string;
}) {
	const [name, setName] = useState(props.defaultName || "");
	const [avatar, setAvatar] = useState(props.defaultAvatar || DEFAULT_AVATAR);

	const submit = () => {
		if (!name.length) return;

		// Report changes to upwards
		props.onSave({ name, avatar });

		// Close Dialog
		props.setIsOpen(false);
	};

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: props.isOpen });

	return (
		<Dialog open={props.isOpen} onOpenChange={(o) => props.setIsOpen(o)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.labelTitle}</DialogTitle>
					<DialogDescription>{props.labelDescription}</DialogDescription>
				</DialogHeader>

				<Input
					value={name}
					className="w-full"
					title="Nome do usuário"
					placeholder="Cleber Machado"
					onChange={(e) => setName(e.target.value)}
				/>

				<Select
					value={avatar}
					title="Avatar do usuário"
					onValueChange={(v) => setAvatar(v || DEFAULT_AVATAR)}
					items={AVAILABLE_AVATARS}
				>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Selecione um avatar</SelectLabel>
							{AVAILABLE_AVATARS.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<DialogFooter className="flex-row justify-center">
					<Button theme="success" onClick={submit} className="w-fit">
						<Shortcut>{formatForDisplay("Enter")}</Shortcut> Aplicar
					</Button>

					<Button
						theme="danger"
						onClick={() => props.setIsOpen(false)}
						className="w-fit"
					>
						<Shortcut>{formatForDisplay("Escape")}</Shortcut> Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
