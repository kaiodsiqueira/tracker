import { CreditCard, Info } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MaskBRL, UnmaskBRL } from "@/lib/masks";
import { BRL } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

const INSTALLMENTS = [
	{ installments: 1, interest: 0.03061 },
	{ installments: 2, interest: 0.04778 },
	{ installments: 3, interest: 0.05552 },
	{ installments: 4, interest: 0.06338 },
	{ installments: 5, interest: 0.07113 },
	{ installments: 6, interest: 0.07911 },
	{ installments: 7, interest: 0.0 },
	{ installments: 8, interest: 0.09554 },
	{ installments: 9, interest: 0.10351 },
	{ installments: 10, interest: 0.11161 },
	{ installments: 11, interest: 0.1197 },
	{ installments: 12, interest: 0.12791 },
];

export default function FeesSimulatorSection() {
	const [showDetails, setShowDetails] = useState(false);

	const [price, setPrice] = useState(MaskBRL(235000));
	const nPreco = UnmaskBRL(price);

	return (
		<section className="border bg-neutral-50 border-black/20 shadow-lg rounded">
			<header className="p-4 text-white flex justify-between gap-2 bg-emerald-900">
				<div className="flex gap-2 items-center">
					<CreditCard size={30} />
					<div>
						<Title>Simular Juros no Cartão de crédito</Title>
						<p className="text-xs">
							Ferramenta rápida para simular valores no cartão de crédito.
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
					<div className="flex gap-4 items-center">
						<h1 className="px-2 py-1 text-sm font-medium w-fit rounded-md bg-emerald-900 text-neutral-100 flex items-center gap-1">
							<Info size={12} /> Simulação no cartão de crédito
						</h1>

						<div>
							Valor à vista: <b>{BRL(nPreco)}</b>
						</div>
					</div>

					<ul className="bg-neutral-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px mt-4">
						{INSTALLMENTS.map((options) => {
							const juros = nPreco * options.interest;
							const total = nPreco + juros;

							const parcelas = total / options.installments;

							return (
								<li
									key={options.installments}
									className="bg-neutral-100 px-4 py-2 flex flex-col"
								>
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
						title="Valor (em R$)"
						value={price}
						onChange={(e) => setPrice(MaskBRL(e.target.value))}
					/>

					<h1 className="mt-4 text-2xl font-bold">Sobre</h1>
					<p>
						¹ Ainda não disponível simular a taxa no débito. ² Apenas as taxas
						da bandeira Mastercard e Visa está disponível no momento.
					</p>
				</div>
			</div>
		</section>
	);
}
