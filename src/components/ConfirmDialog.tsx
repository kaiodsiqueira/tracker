import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { type PropsWithChildren, useState } from "react";

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

export default function ConfirmDialog({
	isOpen,
	setIsOpen,
	confirmationPassword,
	afterConfirmation,
	children,
}: {
	isOpen: boolean;
	setIsOpen: (x: boolean) => void;
	confirmationPassword: string;
	afterConfirmation: () => void;
} & PropsWithChildren) {
	const [userTypedPassword, setUserTypedPassword] = useState("");

	const submit = () => {
		afterConfirmation();

		setUserTypedPassword("");
		setIsOpen(false);
	};

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: isOpen });

	return (
		<Dialog open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{children}</DialogTitle>
					<DialogDescription>
						Esta ação não pode ser desfeita.
					</DialogDescription>
				</DialogHeader>

				<Input
					type="text"
					placeholder={`Digite "${confirmationPassword}" para confirmar`}
					value={userTypedPassword}
					className="w-full"
					onChange={(e) => setUserTypedPassword(e.target.value)}
				/>

				<DialogFooter className="flex-row justify-center">
					<Button
						// button doesnt work if confirmation password is typed incorrectly
						disabled={userTypedPassword !== confirmationPassword}
						theme="danger"
						onClick={submit}
						className="w-fit"
					>
						<Shortcut>{formatForDisplay("Enter")}</Shortcut> Confirmar
					</Button>

					<Button
						theme="neutral"
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
