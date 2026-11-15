import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { useState } from "react";

import Button from "@/components/Button";
import { Input } from "@/components/Common";
import { Shortcut } from "@/components/StaticComponents";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function NewReminderDialog({
	isOpen,
	setIsOpen,
	onSave,
}: {
	isOpen: boolean;
	setIsOpen: (x: boolean) => void;
	onSave: (reminderName: string) => void;
}) {
	const [typedReminderName, setTypedReminderName] = useState("");

	const submit = () => {
		onSave(typedReminderName);

		setTypedReminderName("");
		setIsOpen(false);
	};

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: isOpen });

	return (
		<Dialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar novo lembrete</DialogTitle>
					<DialogDescription>
						Com poucas palavras crie uma mensagem para lembrar você.
					</DialogDescription>
				</DialogHeader>

				<Input
					type="text"
					title="Nomear lembrete"
					value={typedReminderName}
					className="w-full"
					onChange={(e) => setTypedReminderName(e.target.value)}
				/>

				<DialogFooter className="flex-row justify-center">
					<Button theme="success" onClick={submit} className="w-fit">
						<Shortcut>{formatForDisplay("Enter")}</Shortcut> Salvar
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
