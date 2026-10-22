import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BRL, clamp } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

const INSTALLMENTS = [
	{ installments: 2, interestMultiplier: 1 },
	{ installments: 4, interestMultiplier: 1 },
	{ installments: 5, interestMultiplier: 1 },
	{ installments: 6, interestMultiplier: 1.2 },
	{ installments: 8, interestMultiplier: 1.2 },
	{ installments: 10, interestMultiplier: 1.2 },
];

export default function RentSection() {
	const [showDetails, setShowDetails] = useState(false);

	const [price, setPrice] = useState("2300");
	const [downPay, setDownPay] = useState("50");
	const [fixedDownPay, setFixedDownPay] = useState("150");

	const nPreco = parseFloat(price) || 0;
	const nPorcentagemDaEntrada = parseFloat(downPay) / 100;
	const nEntradaFixa = parseFloat(fixedDownPay);

	const nEntradaRelativa = nPreco * nPorcentagemDaEntrada;
	const nEntradaTotal = nEntradaRelativa + nEntradaFixa;

	const nRestante = nPreco - nEntradaTotal;

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
					title="Porcentagem da entrada (em %)"
					value={downPay}
					onChange={(e) =>
						setDownPay(clamp(Number(e.target.value), 0, 100).toString())
					}
				/>

				<Input
					className="w-auto"
					title="Entrada fixa (em R$)"
					value={fixedDownPay}
					onChange={(e) => setFixedDownPay(e.target.value)}
				/>
			</div>

			<div className="mt-4">
				Valor à vista: <b>{BRL(nPreco)}</b>
				<br />
				{showDetails ? (
					<div>
						Entrada: {downPay}% (<b>{BRL(nEntradaRelativa)}</b>) + Fixo (
						<b>{BRL(nEntradaFixa)}</b>) = Soma (<b>{BRL(nEntradaTotal)}</b>)
					</div>
				) : (
					<div>
						Entrada: <b>{BRL(nEntradaTotal)}</b>
					</div>
				)}
			</div>

			<ul className="mt-4">
				{INSTALLMENTS.map((options) => {
					const juros = nRestante * options.interestMultiplier;

					const restanteComJuros = nRestante + juros;
					const parcelas = restanteComJuros / options.installments;

					const total = nEntradaTotal + restanteComJuros;

					return (
						<li
							key={options.installments}
							className="pb-3 flex flex-col border-b-2 mt-2"
						>
							<div>
								<i>{options.installments}x</i> de <b>{BRL(parcelas)}</b>
							</div>

							{showDetails ? (
								<div>
									Entrada (<b>{BRL(nEntradaTotal)}</b>) + Restante (
									<b>{BRL(nRestante)}</b>) + Juros (<b>{BRL(juros)}</b>) = Total
									(<b>{BRL(total)}</b>)
								</div>
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

/*
function simples(c: number, i: number, t: number) {
  return c * i * t;
}
 */
