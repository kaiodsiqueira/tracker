import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BRL, clamp } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

const FALLBACK_INTEREST = 0.12; // Use this interest rate if it cannot match any

export default function RentSection() {
	const [showDetails, setShowDetails] = useState(false);

	const [price, setPrice] = useState("2300");
	const [downPay, setDownPay] = useState("60");

	// Interest are applied using indexing, so installment at(0) uses tax at(0)
	const [listInterest, setListInterest] = useState("0.1666666, 0.12");
	const [listPeriod, setListPeriod] = useState("6, 10");

	const nPreco = parseFloat(price) || 0;
	const nPorcentagemDaEntrada = parseFloat(downPay) / 100;

	const taxas = listInterest
		.split(",") // Split in commas
		.map((p) => parseFloat(p.trim())) // Parse as integer
		.filter((p) => !Number.isNaN(p)); // Filter out NaN values

	const periodos = listPeriod
		.split(",") // Split in commas
		.map((p) => parseInt(p.trim(), 10)) // Parse as integer
		.filter((p) => !Number.isNaN(p)); // Filter out NaN values

	const entrada = nPreco * nPorcentagemDaEntrada;
	const restante = nPreco - entrada;

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Simulação de aluguel de iPhones</Title>
					<p className="text-xs">
						As simulações usam a fórmula de juros simples
					</p>
				</div>

				<div
					title="Mostrar mais detalhes sobre o cálculo dos valores"
					className="bg-black/5 rounded px-3 flex gap-2 items-center"
				>
					<Checkbox checked={showDetails} onCheckedChange={setShowDetails} />
					<span>Detalhes</span>
				</div>
			</div>

			<div className="mt-4 flex flex-wrap md:grid grid-cols-3 gap-2">
				<Input
					className="w-auto"
					type="number"
					title="Valor do aparelho (à vista)"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<Input
					className="w-auto"
					type="number"
					title="Porcentagem da entrada"
					value={downPay}
					onChange={(e) =>
						setDownPay(clamp(Number(e.target.value), 0, 100).toString())
					}
				/>

				<Input
					className="w-auto"
					title="Lista de taxa de juros (ao mês) [eg. 0.10, 0.12]"
					value={listInterest}
					onChange={(e) => setListInterest(e.target.value)}
				/>

				<Input
					className="w-auto"
					title="Períodos (6, 8, 10)"
					value={listPeriod}
					onChange={(e) => setListPeriod(e.target.value)}
				/>
			</div>

			<div className="mt-4">
				Valor à vista: <b>{BRL(nPreco)}</b>
				<br />
				Entrada: <b>{BRL(entrada)}</b>
			</div>

			<ul className="mt-4">
				{periodos.map((meses, i) => {
					const juros = simples(
						restante,
						taxas[i] || taxas.at(-1) || FALLBACK_INTEREST,
						meses,
					);
					const restanteComJuros = restante + juros;
					const parcelas = restanteComJuros / meses;
					const total = entrada + restanteComJuros;

					return (
						<li key={meses} className="pb-3 flex flex-col border-b-2 mt-2">
							<div>
								<i>{meses}x</i> de <b>{BRL(parcelas)}</b>
							</div>
							{showDetails ? (
								<>
									<div>
										Entrada (<b>{BRL(entrada)}</b>) + Restante (
										<b>{BRL(restante)}</b>) + Juros (<b>{BRL(juros)}</b>) =
										Total (<b>{BRL(total)}</b>)
									</div>

									<div></div>
								</>
							) : (
								<div>{BRL(restanteComJuros)}</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function simples(c: number, i: number, t: number) {
	return c * i * t;
}
