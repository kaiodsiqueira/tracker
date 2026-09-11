import { Title } from "./components/StaticComponents";
import {
	CreateDeliveryReminderButton,
	ListDeliveryReminders,
	useReminders,
} from "./Reminders";
import { NewToilUserButton, ToilList, useToil } from "./Toil";

function ReminderSection() {
	const { reminders, addReminder, removeReminder } = useReminders();

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
	const { toilUsers, addToilUser, removeToilUser, addAmount } = useToil();

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Banco de horas</Title>
					<p className="text-xs">
						Gerenciamento de horas extras, feriados e faltas.
					</p>
				</div>

				<NewToilUserButton addToilUser={addToilUser} />
			</div>

			<ToilList
				data={toilUsers}
				removeToilUser={removeToilUser}
				addAmount={addAmount}
			/>
		</div>
	);
}

function App() {
	return (
		<main className="flex flex-col gap-4 px-10 py-5">
			<ReminderSection />
			<ToilSection />

			<footer className="w-full border-t px-20 py-5 flex justify-center text-[8px]">
				<p className="opacity-50">
					Sistema feito por <b>@kaiodsiqueira</b> para <b>@nildo_celular_</b>
				</p>
			</footer>
		</main>
	);
}

export default App;
