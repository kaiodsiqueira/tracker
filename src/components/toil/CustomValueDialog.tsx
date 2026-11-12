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
import { MaskMinutes, UnmaskMinutes } from "@/lib/masks";
import { minutesToDuration, type SS, sign, tw, whichSign } from "@/utility";

export const MONTHLY_WORKING_DAYS = 24; // Dias trabalhados por mês
export const DAILY_WORKING_HOURS_IN_MINUTES = 520; // 8h 40m

export default function CustomValueDialog({
	isOpen,
	setIsOpen,
	modalTitle,
	currentAmount,
	modifyPersistentAmount,
}: {
	isOpen: boolean;
	setIsOpen: SS<boolean>;
	//
	currentAmount: number;
	modalTitle: string;
	//
	modifyPersistentAmount: (a: number, reason: string) => void;
}) {
	const [customAmount, setCustomAmount] = useState("");
	const [reason, setReason] = useState("");

	const submit = () => {
		const amount = UnmaskMinutes(customAmount);

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
					<DialogTitle>{modalTitle}</DialogTitle>
					<DialogDescription className="mb-2 text-[10px] text-black/80">
						Utilize minutos positivo para somar ou negativo para subtrair do
						valor atual ({minutesToDuration(currentAmount)}).
					</DialogDescription>
				</DialogHeader>

				<Input
					type="text"
					placeholder="eg.: 120, -30, 1h30m, -2h"
					title={`Valor da alteração (${UnmaskMinutes(customAmount)})`}
					value={customAmount}
					className="w-full"
					onChange={(e) => setCustomAmount(MaskMinutes(e.target.value))}
				/>

				{/* DIV WITH COMMON PRESETS FOR MINUTES ADJUSTMENT */}
				<div className="grid grid-cols-5 gap-1">
					<MinutePresetButton
						name="Subtrair Diária"
						value={-DAILY_WORKING_HOURS_IN_MINUTES}
						setCustomAmount={setCustomAmount}
					/>
					<MinutePresetButton
						name="Subtrair Meia Diária"
						value={-DAILY_WORKING_HOURS_IN_MINUTES / 2}
						setCustomAmount={setCustomAmount}
					/>

					<MinutePresetButton
						name="Zerar"
						value={-currentAmount}
						setCustomAmount={setCustomAmount}
					/>

					<MinutePresetButton
						name="Adicionar Meia Diária"
						value={DAILY_WORKING_HOURS_IN_MINUTES / 2}
						setCustomAmount={setCustomAmount}
					/>
					<MinutePresetButton
						name="Adicionar Diária"
						value={DAILY_WORKING_HOURS_IN_MINUTES}
						setCustomAmount={setCustomAmount}
					/>
				</div>

				<Input
					title="Motivo da alteração"
					placeholder="ATRASO SÁB MANHÃ"
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

function MinutePresetButton(props: {
	name: string;
	value: number;
	setCustomAmount: SS<string>;
}) {
	const sign = whichSign(props.value);

	return (
		<button
			tabIndex={-1}
			type="button"
			onClick={() => props.setCustomAmount(props.value.toString())}
			className={tw(
				"flex flex-col hover:cursor-pointer rounded p-2",
				[
					"bg-red-50 text-red-800",
					"bg-gray-50 text-gray-800",
					"bg-green-50 text-green-800",
				][sign],
			)}
		>
			<span className="text-[8px]">{props.name}</span>
			<p className="mt-auto font-bold">{props.value}</p>
		</button>
	);
}
