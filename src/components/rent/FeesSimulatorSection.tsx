import { CreditCard, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { useDebounce } from "@/hooks";
import { MaskBRL, UnmaskBRL } from "@/lib/masks";
import type { LiProps } from "@/types";
import {
	BRL,
	getPersistentStorage,
	type SS,
	setPersistentStorage,
} from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

const gateways = [
	{
		name: "Mastercard/Visa",
		fees: {
			debit: 0.0145,
			credit: [
				{ installments: 1, interest: 0.03061 },
				{ installments: 2, interest: 0.04778 },
				{ installments: 3, interest: 0.05552 },
				{ installments: 4, interest: 0.06338 },
				{ installments: 5, interest: 0.07113 },
				{ installments: 6, interest: 0.07911 },
				{ installments: 7, interest: 0.08755 },
				{ installments: 8, interest: 0.09554 },
				{ installments: 9, interest: 0.10351 },
				{ installments: 10, interest: 0.11161 },
				{ installments: 11, interest: 0.1197 },
				{ installments: 12, interest: 0.12791 },

				{ installments: 15, interest: 0.15248 },
				{ installments: 18, interest: 0.17759 },
			],
		},
	},
	{
		name: "Elo",
		fees: {
			debit: 0.0151,
			credit: [
				{ installments: 1, interest: 0.03413 },
				{ installments: 2, interest: 0.04943 },
				{ installments: 3, interest: 0.0572 },
				{ installments: 4, interest: 0.06508 },
				{ installments: 5, interest: 0.07285 },
				{ installments: 6, interest: 0.08085 },
				{ installments: 7, interest: 0.08992 },
				{ installments: 8, interest: 0.09794 },
				{ installments: 9, interest: 0.10596 },
				{ installments: 10, interest: 0.11409 },
				{ installments: 11, interest: 0.12221 },
				{ installments: 12, interest: 0.13046 },
				{ installments: 15, interest: 0.15513 },
				{ installments: 18, interest: 0.18037 },
			],
		},
	},
];

function useSimulatedHistory(): [string[], SS<string[]>] {
	const [simulatedValuesHistory, setSimulatedValuesHistory] = useState<
		string[]
	>(getPersistentStorage("history-card-simulated-values") || []);

	useEffect(() => {
		setPersistentStorage(
			"history-card-simulated-values",
			simulatedValuesHistory,
		);
	}, [simulatedValuesHistory]);

	return [simulatedValuesHistory, setSimulatedValuesHistory];
}

export default function FeesSimulatorSection() {
	const [showDetails, setShowDetails] = useState(false);
	const [gateway, setGateway] = useState("Mastercard/Visa");

	const [price, setPrice] = useState(MaskBRL(100000));
	const nPreco = UnmaskBRL(price);

	const [simulatedValuesHistory, setSimulatedValuesHistory] =
		useSimulatedHistory();

	const updateHistory = useDebounce((newPrice: string) => {
		setSimulatedValuesHistory(
			// add new into beggining, limit to 5
			[newPrice, ...simulatedValuesHistory].slice(0, 5),
		);
	}, 5000);

	const selectedGateway = gateways.find((x) => x.name === gateway);
	if (!selectedGateway) return "Gateway not found";

	const nJurosNoDebito = nPreco * selectedGateway.fees.debit;
	const nTotalNoDebito = nPreco + nJurosNoDebito;

	return (
		<section className="border bg-neutral-50 border-black/20 shadow-lg rounded">
			<header className="p-4 text-white flex justify-between gap-2 bg-emerald-900">
				<div className="flex gap-2 items-center">
					<CreditCard size={30} />
					<div>
						<Title>Simular Juros no Cartão</Title>
						<p className="text-xs">
							Ferramenta rápida para simular valores no cartão de crédito ou
							débito.
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => setShowDetails(!showDetails)}
					title="Mostrar mais detalhes sobre o cálculo dos valores"
					className="bg-emerald-800 select-none text-sm rounded px-3 flex gap-2 items-center"
				>
					<Checkbox checked={showDetails} />
					<span>Detalhes</span>
				</button>
			</header>

			<div className="mt-2 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* SIMULATION SECTION DIV */}
				<div className="col-span-2 p-4 rounded border bg-neutral-100">
					<div className="flex flex-wrap gap-4 items-center">
						<h1 className="px-2 py-1 text-sm font-medium w-fit rounded-md bg-emerald-900 text-neutral-100 flex items-center gap-1">
							<Info size={12} /> Simulação no cartão
						</h1>

						<div>
							Valor à vista: <b>{BRL(nPreco)}</b>
						</div>
					</div>

					<ul className="kerning-none bg-neutral-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px mt-4">
						<PriceTile>
							<b>Débito</b>

							{showDetails ? (
								<div>
									Valor (<b>{BRL(nPreco)}</b>) + Juros (
									<b>{BRL(nJurosNoDebito)}</b>) = Total (
									<b>{BRL(nTotalNoDebito)}</b>)
								</div>
							) : (
								<div>{BRL(nTotalNoDebito)}</div>
							)}
						</PriceTile>

						{selectedGateway.fees.credit.map((options) => {
							const juros = nPreco * options.interest;
							const total = nPreco + juros;

							const parcelas = total / options.installments;

							return (
								<PriceTile key={options.installments}>
									<p>
										<i>
											<b>{options.installments}x</b>
										</i>{" "}
										de <b>{BRL(parcelas)}</b>
									</p>

									{showDetails ? (
										<div>
											Valor (<b>{BRL(nPreco)}</b>) + Juros (<b>{BRL(juros)}</b>)
											= Total (<b>{BRL(total)}</b>)
										</div>
									) : (
										<div>{BRL(total)}</div>
									)}
								</PriceTile>
							);
						})}
					</ul>
				</div>

				{/* INPUTS SECTION DIV */}
				<div className="p-4 flex flex-col gap-2">
					<div>
						<h1 className="text-2xl font-bold leading-tight">Parâmetros</h1>
						<p className="text-sm">
							Ajuste os valores de acordo com a sua venda.
						</p>
					</div>

					<Input
						containerClassName="mt-2"
						className="w-auto"
						title="Valor (em R$)"
						value={price}
						onChange={(e) => {
							const masked = MaskBRL(e.target.value);
							// kind of treating the str
							updateHistory(masked);
							setPrice(masked);
						}}
					/>
					<div className="flex flex-wrap gap-x-1 gap-y-2">
						{simulatedValuesHistory.map((value) => (
							<button
								key={value}
								type="button"
								onClick={() => setPrice(value)}
								className="cursor-pointer px-2 py-1 text-[10px] border border-emerald-900 rounded-full bg-emerald-50 text-emerald-900"
							>
								{value}
							</button>
						))}
					</div>

					<div className="flex flex-col">
						<span className="font-medium text-xs">Bandeira</span>
						<Combobox
							value={gateway}
							items={gateways}
							onValueChange={(e) => setGateway(e || "Mastercard/Visa")}
						>
							<ComboboxInput placeholder="Selecione uma bandeira" />
							<ComboboxContent>
								<ComboboxEmpty>No items found.</ComboboxEmpty>
								<ComboboxList>
									{(item) => (
										<ComboboxItem key={item.name} value={item.name}>
											{item.name}
										</ComboboxItem>
									)}
								</ComboboxList>
							</ComboboxContent>
						</Combobox>
					</div>

					<h1 className="mt-4 text-2xl font-bold">Sobre</h1>
					<p>Nenhuma nota adicionada.</p>
				</div>
			</div>
		</section>
	);
}

function PriceTile(props: LiProps) {
	return (
		<li className="bg-neutral-100 px-4 py-2 flex flex-col">{props.children}</li>
	);
}
