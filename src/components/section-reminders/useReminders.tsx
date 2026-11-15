import { useEffect, useState } from "react";
import { getPersistentStorage } from "@/lib/utility";

export type Reminder = { name: string; createdAt: Date };

export default function useReminders() {
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
