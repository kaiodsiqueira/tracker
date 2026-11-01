import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BRL, clamp } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

const DOWN_PAYMENT_PERCENT = 50;
const FIXED_DOWN_PAYMENT = 150;

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
	const [tradein, setTradein] = useState("0");

	const nPreco = parseFloat(price) || 0;
	const nCreditoDeTroca = parseFloat(tradein) || 0;
	const nPorcentagemDaEntrada = DOWN_PAYMENT_PERCENT / 100;

	const nEntradaRelativa = nPreco * nPorcentagemDaEntrada;
	const nEntradaTotal = nEntradaRelativa + FIXED_DOWN_PAYMENT;
	const nEntradaEfetiva =
		nEntradaTotal - Math.min(nCreditoDeTroca, nEntradaTotal);

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

			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* SIMULATION SECTION DIV */}
				<div className="p-4 rounded border bg-black/1">
					<div>
						Valor à vista: <b>{BRL(nPreco)}</b>
						<br />
						{showDetails ? (
							<div>
								Entrada: {DOWN_PAYMENT_PERCENT}% (<b>{BRL(nEntradaRelativa)}</b>
								) + Fixo (<b>{BRL(FIXED_DOWN_PAYMENT)}</b>) - Troca (
								<b>{BRL(nCreditoDeTroca)}</b>) = Soma (
								<b>{BRL(nEntradaEfetiva)}</b>)
							</div>
						) : (
							<div>
								Entrada: <b>{BRL(nEntradaEfetiva)}</b>
							</div>
						)}
					</div>

					<ul className="bg-black/10 flex flex-col justify-between gap-px mt-4">
						{INSTALLMENTS.map((options) => {
							const juros = nRestante * options.interestMultiplier;

							const restanteComJuros = nRestante + juros;
							const parcelas = restanteComJuros / options.installments;

							const total = nEntradaTotal + restanteComJuros;

							return (
								<li
									key={options.installments}
									className="bg-white py-2 flex flex-col"
								>
									<div>
										<i>{options.installments}x</i> de <b>{BRL(parcelas)}</b>
									</div>

									{showDetails ? (
										<div>
											Entrada (<b>{BRL(nEntradaTotal)}</b>) + Restante (
											<b>{BRL(nRestante)}</b>) + Juros (<b>{BRL(juros)}</b>) =
											Total (<b>{BRL(total)}</b>)
										</div>
									) : (
										<div>{BRL(restanteComJuros)}</div>
									)}
								</li>
							);
						})}
					</ul>
				</div>

				{/* INPUTS SECTION DIV */}
				<div className="p-4 flex flex-col gap-2">
					<h1 className="text-2xl font-bold">Parâmetros</h1>

					<Input
						containerClassName="mt-2"
						className="w-auto"
						type="number"
						title="Valor do aparelho (à vista)"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<Input
						className="w-auto"
						title="Crédito de troca (em R$)"
						value={tradein}
						onChange={(e) => setTradein(e.target.value)}
					/>
					<p className="text-xs font-medium text-black/75">
						Usado quando um aparelho está sendo entregue como parte da entrada,
						este valor será abatido da entrada e irá gerar um valor de torna se
						necessário.
					</p>

					<h1 className="mt-4 text-2xl font-bold">Como é feito</h1>
					<p>A entrada é equivalente a</p>
				</div>
			</div>
		</div>
	);
}

/*
function simples(c: number, i: number, t: number) {
  return c * i * t;
}
 */
