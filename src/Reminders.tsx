import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import NewReminderDialog from "@/components/reminders/NewReminderDialog";
import { EmptySection, Shortcut } from "./components/StaticComponents";
import { getPersistentStorage, getRelativeTime } from "./utility";

type Reminder = { name: string; createdAt: Date };

export function useReminders() {
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

export function CreateDeliveryReminderButton({
	onSave,
}: {
	onSave: (reminder: Reminder) => void;
}) {
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
					onSave({ name: typedReminderName, createdAt: new Date() })
				}
			/>
		</>
	);
}

export function ListDeliveryReminders({
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
