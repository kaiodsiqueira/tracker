import { Trash } from "lucide-react";
import { getRelativeTime } from "../../lib/utility";
import { EmptySection } from "../StaticComponents";
import type { Reminder } from "./useReminders";

export default function ListReminders(props: {
	reminders: Reminder[];
	onRemove: (index: number) => void;
}) {
	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{props.reminders.length > 0 ? (
				props.reminders.map((reminder, index) => (
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
							onClick={() => props.onRemove(index)}
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
