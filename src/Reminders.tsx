import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Input } from "./Common";
import Button from "./components/Button";
import { EmptySection, Shortcut, Title } from "./components/StaticComponents";
import { getPersistentStorage, getRelativeTime } from "./utility";

type Reminder = { name: string; createdAt: Date };

export function useDeliveryReminders() {
	// Load reminders from persistent storage on component mount or initialize as empty array
	const [reminders, setReminders] = useState<Reminder[]>(
		(getPersistentStorage("reminders") as Reminder[]) || [],
	);

	// Save reminders to persistent storage whenever they change
	useEffect(() => {
		localStorage.setItem("reminders", JSON.stringify(reminders));
	}, [reminders]);

	return {
		addReminder: (reminder: Reminder) => setReminders([...reminders, reminder]),
		removeReminder: (index: number) =>
			setReminders(reminders.filter((_, i) => i !== index)),
		reminders,
	};
}

function NewReminderModal({
	isOpen,
	setIsOpen,
	onSubmit,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (reminder: Reminder) => void;
}) {
	const [name, setName] = useState("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: need it this way
	useEffect(() => {
		setName("");
	}, [isOpen]);

	function submit() {
		if (name.trim() === "") return setIsOpen(false);
		onSubmit({ name, createdAt: new Date() });
		setIsOpen(false);
	}

	useHotkey("Enter", submit, { ignoreInputs: false, enabled: isOpen });
	// useHotkey("Escape", () => setIsOpen(false), { enabled: isOpen });

	return (
		<Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
			<Title>Criar novo lembrete</Title>

			<Input
				autoFocus
				type="text"
				value={name}
				title="Nome"
				containerClassName="mt-2"
				placeholder="Nomear lembrete"
				onChange={(e) => setName(e.target.value)}
			/>

			<div className="flex gap-2">
				<Button type="submit" onClick={submit} theme="success">
					<Shortcut>{formatForDisplay("Enter")}</Shortcut> Salvar
				</Button>

				<Button type="reset" theme="danger" onClick={() => setIsOpen(false)}>
					<Shortcut>{formatForDisplay("Escape")}</Shortcut> Cancelar
				</Button>
			</div>
		</Modal>
	);
}

export function CreateDeliveryReminderButton({
	onSave,
}: {
	onSave: (reminder: Reminder) => void;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleCreateReminderModal = () => setIsOpen(!isOpen);

	useHotkey("Mod+L", toggleCreateReminderModal);

	return (
		<>
			<button
				type="button"
				onClick={toggleCreateReminderModal}
				className="px-4 py-2 bg-emerald-600 text-white rounded shadow mt-3 hover:cursor-pointer hover:bg-emerald-700"
			>
				<Shortcut>{formatForDisplay("Mod+L")}</Shortcut> Criar lembrete
			</button>

			<NewReminderModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				onSubmit={onSave}
			/>
		</>
	);
}

export default function ListDeliveryReminders({
	reminders,
	onRemove,
}: {
	reminders: Reminder[];
	onRemove: (index: number) => void;
}) {
	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{reminders.length > 0 ? (
				reminders.map((reminder, index) => (
					<div
						key={reminder.name}
						className="border shadow flex items-center gap-2 rounded px-4 py-2 border-black/20"
					>
						<div>
							<p className="font-medium">{reminder.name}</p>
							<p className="text-xs opacity-50">
								{reminder.createdAt &&
									getRelativeTime(
										typeof reminder.createdAt === "string"
											? new Date(reminder.createdAt)
											: reminder.createdAt,
									)}
							</p>
						</div>

						<button
							type="button"
							onClick={() => onRemove(index)}
							className="ml-2 px-2 py-1 bg-red-700 text-white rounded shadow hover:cursor-pointer hover:bg-red-800"
						>
							<Trash size={15} />
						</button>
					</div>
				))
			) : (
				<EmptySection>Nenhum lembrete</EmptySection>
			)}
		</div>
	);
}
