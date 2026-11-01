import { Calculator } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MaskBRL, UnmaskBRL } from "@/lib/masks";
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

	/* const [test, setTest] = useState(MaskBRL("0")); */
	const [price, setPrice] = useState(MaskBRL(235000));
	const [tradein, setTradein] = useState(MaskBRL(0));

	const nPreco = UnmaskBRL(price);
	const nCreditoDeTroca = UnmaskBRL(tradein);

	const nEntradaPorcentagem = DOWN_PAYMENT_PERCENT / 100;
	const nEntradaRelativa = nPreco * nEntradaPorcentagem;
	const nEntradaTotal = nEntradaRelativa + FIXED_DOWN_PAYMENT;
	const nEntradaEfetiva =
		nEntradaTotal - Math.min(nCreditoDeTroca, nEntradaTotal);

	const nRestante = nPreco - nEntradaTotal;

	return (
		<div className="border border-black/20 shadow-lg rounded">
			<div className="p-4 text-white flex justify-between gap-2 bg-slate-800">
				<div className="flex gap-2 items-center">
					<Calculator size={30} />
					<div>
						<Title>Simular Aluguéis de iPhones</Title>
						<p className="text-xs">
							Ferramenta rápida para orçamento dos aluguéis
						</p>
					</div>
				</div>

				<div
					title="Mostrar mais detalhes sobre o cálculo dos valores"
					className="bg-slate-700 text-sm rounded px-3 flex gap-2 items-center"
				>
					<Checkbox checked={showDetails} onCheckedChange={setShowDetails} />
					<span>Detalhes</span>
				</div>
			</div>

			<div className="mt-2 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
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
					<div>
						<h1 className="text-2xl font-bold leading-tight">Parâmetros</h1>
						<p className="text-sm">
							Ajuste os valores de acordo com a sua venda.
						</p>
					</div>

					<Input
						containerClassName="mt-2"
						className="w-auto"
						title="Valor do aparelho (à vista)"
						value={price}
						onChange={(e) => setPrice(MaskBRL(e.target.value))}
					/>

					<Input
						className="w-auto"
						title="Crédito de troca (em R$)"
						value={tradein}
						onChange={(e) => setTradein(MaskBRL(e.target.value))}
					/>
					<p className="text-xs font-medium text-black/75">
						Usado quando um aparelho está sendo entregue como parte da entrada,
						este valor será abatido da entrada e irá gerar um valor de torna se
						necessário.
					</p>

					{/* <Input
            value={test}
            onChange={e=>setTest(MaskBRL(e.target.value))}
						className="w-auto"
						title="Crédito de troca (em R$)"
					/>
					<p className="text-xs font-medium text-black/75">
					  {UnmaskBRL(test)}
					</p> */}

					<h1 className="mt-4 text-2xl font-bold">Sobre</h1>
					<p>
						A simulação mostra as parcelas mensais, porém, parcelamento
						quinzenal ou semanal também estão disponíveis via divisão dos mesmos
						valores.
					</p>
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
