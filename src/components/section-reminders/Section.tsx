import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { useState } from "react";
import { Shortcut, Title } from "../StaticComponents";
import ListReminders from "./ListReminders";
import NewReminderDialog from "./NewReminderDialog";
import useReminders, { type Reminder } from "./useReminders";

function NewReminderButton(props: { onSave: (reminder: Reminder) => void }) {
	const [isNewReminderDialogOpen, setIsNewReminderDialogOpen] = useState(false);
	useHotkey("Mod+L", () => setIsNewReminderDialogOpen(true));

	return (
		<>
			<button
				type="button"
				onClick={() => setIsNewReminderDialogOpen(true)}
				className="px-4 py-2 bg-emerald-600 text-white rounded shadow mt-3 hover:cursor-pointer hover:bg-emerald-700"
			>
				<Shortcut>{formatForDisplay("Mod+L")}</Shortcut> Criar lembrete
			</button>

			<NewReminderDialog
				isOpen={isNewReminderDialogOpen}
				setIsOpen={setIsNewReminderDialogOpen}
				onSave={(typedReminderName) =>
					props.onSave({ name: typedReminderName, createdAt: new Date() })
				}
			/>
		</>
	);
}

export default function RemindersSection() {
	const { reminders, addReminder, removeReminder } = useReminders();

	return (
		<div className="p-4 bg-neutral-50 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Lembrete de eventos</Title>
					<p className="text-xs">
						Gerencie lembretes para não esquecer de tarefas importantes mais
						tarde.
					</p>
				</div>

				<NewReminderButton onSave={addReminder} />
			</div>

			<ListReminders reminders={reminders} onRemove={removeReminder} />
		</div>
	);
}
