import SettingsSection from "./components/backup-and-settings/Section";
import CardSimulatorSection from "./components/card-simulator/Section";
import PrintableAnnotationsSection from "./components/printable-annotations/Section";
import RentSection from "./components/rent/RentSection";
import RemindersSection from "./components/section-reminders/Section";
import ToilSection from "./components/toil/ToilSection";

function App() {
	return (
		<main className="bg-neutral-100 flex flex-col gap-4 px-1 sm:px-10 py-5">
			<RemindersSection />
			<RentSection />
			<CardSimulatorSection />
			<PrintableAnnotationsSection />
			<ToilSection />
			<SettingsSection />

			<footer className="w-full border-t px-20 py-5 flex justify-center text-[5px]">
				<p className="opacity-50">
					Sistema feito por <b>@kaiodsiqueira</b> para <b>@nildo_celular_</b>
				</p>
			</footer>
		</main>
	);
}

export default App;
