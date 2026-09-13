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

import type { ToilUser } from "@/Toil";
import type { SS } from "@/utility";

const AVAILABLE_AVATARS = [
	{ label: "Masculino", value: "./avatar-man.png" },
	{ label: "Feminino", value: "./avatar-woman.png" },
];

const DEFAULT_AVATAR = "./avatar-man.png";

export default function NewUserDialog({
	isOpen,
	setIsOpen,
	addToilUser,
}: {
	isOpen: boolean;
	setIsOpen: SS<boolean>;
	addToilUser: (u: ToilUser) => void;
}) {
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

	const submit = () => {
		if (!name.length) return;

		addToilUser({ name, avatar, amount: 0 });

		setName("");
		setAvatar(DEFAULT_AVATAR);
		setIsOpen(false);
	};

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: isOpen });

	return (
		<Dialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar ao banco de horas</DialogTitle>
					<DialogDescription>Personalize lorem ipsum.</DialogDescription>
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
						onClick={() => setIsOpen(false)}
						className="w-fit"
					>
						<Shortcut>{formatForDisplay("Escape")}</Shortcut> Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
