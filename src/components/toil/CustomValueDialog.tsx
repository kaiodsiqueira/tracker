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
import { minutesToDuration, type SS, sign } from "@/utility";

export const FULL_PERIOD = 520; // 8h 40m

export default function CustomValueDialog({
	isOpen,
	setIsOpen,
	modifyPersistentAmount,
}: {
	isOpen: boolean;
	setIsOpen: SS<boolean>;
	modifyPersistentAmount: (a: number, reason: string) => void;
}) {
	const [customAmount, setCustomAmount] = useState("");
	const [reason, setReason] = useState("");

	const submit = () => {
		const amount = parseInt(customAmount, 10) || 0;

		if (amount === 0) return;
		if (reason.trim().length === 0) return;

		modifyPersistentAmount(
			amount,
			`${sign(amount)} ${minutesToDuration(Math.abs(amount))}: ${reason}`,
		);

		setCustomAmount("");
		setReason("");
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
					title="Valor (ex. -25, 20) [em minutos]"
					value={customAmount}
					className="w-full"
					onChange={(e) => setCustomAmount(e.target.value)}
				/>

				<div className="flex gap-1">
					<button
						type="button"
						onClick={() => setCustomAmount((-FULL_PERIOD).toString())}
						className="hover:cursor-pointer rounded-full p-2 border bg-red-100 border-red-400 text-red-600 font-medium"
					>
						-8h 40m
					</button>
					<button
						type="button"
						onClick={() => setCustomAmount((-FULL_PERIOD / 2).toString())}
						className="hover:cursor-pointer rounded-full p-2 border bg-red-100 border-red-400 text-red-600 font-medium"
					>
						-4h 20m
					</button>
					<button
						type="button"
						onClick={() => setCustomAmount((FULL_PERIOD / 2).toString())}
						className="hover:cursor-pointer rounded-full p-2 border bg-green-100 border-green-400 text-green-600 font-medium"
					>
						+4h 20m
					</button>
					<button
						type="button"
						onClick={() => setCustomAmount(FULL_PERIOD.toString())}
						className="hover:cursor-pointer rounded-full p-2 border bg-green-100 border-green-400 text-green-600 font-medium"
					>
						+8h 40m
					</button>
				</div>

				<Input
					title="Motivo (ex. Esteve presente durante o feriado)"
					type="text"
					value={reason}
					className="w-full"
					onChange={(e) => setReason(e.target.value)}
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
