import BackupSection from "./components/BackupSection";
import RentSection from "./components/rent/RentSection";
import { Title } from "./components/StaticComponents";
import ToilSection from "./components/toil/ToilSection";

import {
	CreateDeliveryReminderButton,
	ListDeliveryReminders,
	useReminders,
} from "./Reminders";

function ReminderSection() {
	const { reminders, addReminder, removeReminder } = useReminders();

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Lembrete de eventos</Title>
					<p className="text-xs">
						Gerencie lembretes para não esquecer de tarefas importantes mais
						tarde.
					</p>
				</div>

				<CreateDeliveryReminderButton onSave={addReminder} />
			</div>

			<ListDeliveryReminders reminders={reminders} onRemove={removeReminder} />
		</div>
	);
}

function App() {
	return (
		<main className="flex flex-col gap-4 px-1 sm:px-10 py-5">
			<ReminderSection />
			<RentSection />
			<ToilSection />
			<BackupSection />

			<footer className="w-full border-t px-20 py-5 flex justify-center text-[8px]">
				<p className="opacity-50">
					Sistema feito por <b>@kaiodsiqueira</b> para <b>@nildo_celular_</b>
				</p>
			</footer>
		</main>
	);
}

export default App;
