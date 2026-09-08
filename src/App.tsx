import ListDeliveryReminders, {
	CreateDeliveryReminderButton,
	useDeliveryReminders,
} from "./Reminders";

import { Title } from "./StaticComponents";

function ReminderSection() {
	const { reminders, addReminder, removeReminder } = useDeliveryReminders();

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Lembrete de eventos</Title>
					<p className="text-xs">
						Gerencie lembretes para não esquecer de receber dinheiro de
						entregadores.
					</p>
				</div>

				<CreateDeliveryReminderButton onSave={addReminder} />
			</div>

			<ListDeliveryReminders reminders={reminders} onRemove={removeReminder} />
		</div>
	);
}

function ToilSection() {
	const { reminders, addReminder, removeReminder } = useDeliveryReminders();

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Banco de horas</Title>
					<p className="text-xs">
						Gerenciamento de horas extras, feriados e faltas.
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
		<main className="flex flex-col gap-4 px-10 py-5">
			<ReminderSection />
			<ToilSection />
		</main>
	);
}

export default App;
