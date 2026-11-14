import { useRef } from "react";
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

function Teste() {
	const cupomRef = useRef(null);

	const imprimir = useReactToPrint({
		contentRef: cupomRef,
		documentTitle: "Cupom",
	});

	return (
		<div>
			<button type="button" onClick={imprimir}>
				Imprimir cupom
			</button>

			<div ref={cupomRef} className="bg-red-50 p-8">
				<center>
					<h1>
						<b>DOCUMENTO AUXILIAR DE ENTREGA</b>
					</h1>
					<hr className="my-2" />
					<h1>
						<b>{fill("ENDEREÇO DE ENTREGA", 50)}</b>
					</h1>
					<hr className="my-2" />
					<p>
						PARA JOAQUIM, R. AVENIDA BRASIL DOS ALFRENEIROS, N 512, EM FRENTE AO
						JOANES DA CARNE, DO LADO DO POSTE BRANCO, CASA DO CHICO ALVES
					</p>
					<hr className="my-2" />
					<h1>
						<b>{fill("PAGAMENTO", 50)}</b>
					</h1>
					<hr className="my-2" />
					<p>
						Agradecemos a preferência por nossa loja! Para reclamações entre em
						contato conosco pelo nosso Whatsapp: (88) 9.9218-3444
					</p>
				</center>
			</div>
		</div>
	);
}

function fill(msg: string, targetLength: number = 256) {
	const a = targetLength - msg.length;
	const padLeft = "-".repeat(a / 2 - 1);
	const padRight = "-".repeat(a / 2 - 1);
	return `${padLeft} ${msg} ${padRight}`;
}

export default App;
