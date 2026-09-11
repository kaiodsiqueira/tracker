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

export default function CustomValueDialog({
	isOpen,
	setIsOpen,
	modifyPersistentAmount,
}: {
	isOpen: boolean;
	setIsOpen: (x: boolean) => void;
	modifyPersistentAmount: (a: number) => void;
}) {
	const [customAmount, setCustomAmount] = useState("");

	const submit = () => {
		modifyPersistentAmount(parseInt(customAmount, 10) || 0);
		setCustomAmount("");
		setIsOpen(false);
	};

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: isOpen });

	return (
		<Dialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Digite um valor personalizado</DialogTitle>
					<DialogDescription>
						Em minutos, use números negativos para subtrair e positivo para
						somar.
					</DialogDescription>
				</DialogHeader>

				<Input
					type="text"
					value={customAmount}
					className="w-full"
					onChange={(e) => setCustomAmount(e.target.value)}
				/>

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
