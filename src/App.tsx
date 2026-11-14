import { useRef, useState } from "react";
import BackupSection from "./components/BackupSection";
import CardSimulatorSection from "./components/card-simulator/Section";
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
		<div className="p-4 bg-neutral-50 border border-black/20 shadow-lg rounded">
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
		<main className="bg-neutral-100 flex flex-col gap-4 px-1 sm:px-10 py-5">
			<ReminderSection />
			<RentSection />
			<CardSimulatorSection />
			<ToilSection />
			<BackupSection />

			<footer className="w-full border-t px-20 py-5 flex justify-center text-[5px]">
				<p className="opacity-50">
					Sistema feito por <b>@kaiodsiqueira</b> para <b>@nildo_celular_</b>
				</p>
			</footer>

			<Teste />
		</main>
	);
}

import { useReactToPrint } from "react-to-print";
import { Input } from "./components/ui/input";

function Teste() {
	const [msg, setMsg] = useState("");
	const cupomRef = useRef(null);

	const imprimir = useReactToPrint({
		contentRef: cupomRef,
		documentTitle: "Cupom",
	});

	return (
		<div>
			<Input value={msg} onChange={(e) => setMsg(e.target.value)} />
			<button type="button" onClick={imprimir}>
				Imprimir cupom
			</button>

			<div ref={cupomRef} className="w-[302.36px] border p-4">
				<center>
					<hr className="my-2 mt-8" />
					<h1 className="text-xs">
						<b>SISTEMAS NILDO CELULARES</b>
					</h1>
					<hr className="my-2" />
					<h1 className="text-xs">
						<b>(DAE) DOCUMENTO AUXILIAR DE ENTREGAS</b>
					</h1>
					<hr className="my-2" />
					<p>{msg}</p>
					<hr className="my-2" />
					<h1 className="text-xs">
						<b>(DAE) DOCUMENTO AUXILIAR DE ENTREGAS</b>
					</h1>
					<hr className="my-2" />
					<p className="text-xs">
						Agradecemos a preferência por nossa loja! Para reclamações entre em
						contato conosco pelo nosso Whatsapp: (88) 9.9218-3444
					</p>
				</center>
			</div>
		</div>
	);
}

/* function _fill(msg: string, targetLength: number = 256) {
	const a = targetLength - msg.length;
	const padLeft = "-".repeat(a / 2 - 1);
	const padRight = "-".repeat(a / 2 - 1);
	return `${padLeft} ${msg} ${padRight}`;
} */

export default App;
