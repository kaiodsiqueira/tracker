import { Calculator, Info } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MaskBRL, UnmaskBRL } from "@/lib/masks";
import { BRL } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

// Valores fixos para o cálculo de entrada e parcelas
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
		<section className="border bg-neutral-50 border-black/20 shadow-lg rounded">
			<header className="p-4 text-white flex justify-between gap-2 bg-slate-800">
				<div className="flex gap-2 items-center">
					<Calculator size={30} />
					<div>
						<Title>Simular Aluguéis de iPhones</Title>
						<p className="text-xs">
							Ferramenta rápida para orçamento dos aluguéis
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => setShowDetails(!showDetails)}
					title="Mostrar mais detalhes sobre o cálculo dos valores"
					className="bg-slate-700 select-none text-sm rounded px-3 flex gap-2 items-center"
				>
					<Checkbox checked={showDetails} />
					<span>Detalhes</span>
				</button>
			</header>

			<div className="mt-2 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* SIMULATION SECTION DIV */}
				<div className="p-4 rounded border bg-neutral-100">
					<h1 className="mb-4 px-2 py-1 text-sm font-medium w-fit rounded-md bg-slate-800 text-neutral-100 flex items-center gap-1">
						<Info size={12} /> Simulação na modalidade de aluguel
					</h1>

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

					<ul className="kerning-none bg-neutral-200 grid grid-cols-1 sm:grid-cols-2 justify-between gap-px mt-4">
						{INSTALLMENTS.map((options) => {
							const juros = nRestante * options.interestMultiplier;

							const restanteComJuros = nRestante + juros;
							const parcelas = restanteComJuros / options.installments;

							const total = nEntradaTotal + restanteComJuros;

							return (
								<li
									key={options.installments}
									className="bg-neutral-100 px-4 py-2 flex flex-col"
								>
									<p>
										<b>
											<i>{options.installments}x</i>
										</b>{" "}
										de <b>{BRL(parcelas)}</b>
									</p>

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

					<h1 className="mt-4 text-2xl font-bold">Sobre</h1>
					<p>
						¹ Pagamento quinzenal também disponível. ² A entrada também pode ser
						parcelada no cartão de crédito.
					</p>
				</div>
			</div>
		</section>
	);
}
