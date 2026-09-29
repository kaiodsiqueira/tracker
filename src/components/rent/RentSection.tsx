import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BRL } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

export default function RentSection() {
	const [showDetails, setShowDetails] = useState(false);

	const [price, setPrice] = useState("2300");
	const [downPay, setDownPay] = useState("60");
	const [inflation, setInflation] = useState("0.42"); // yearly
	const [interest, setInterest] = useState("0.12"); // monthly

	const nPreco = parseFloat(price);
	const nPorcentagemDaEntrada = parseFloat(downPay) / 100;
	const nInflacao = parseFloat(inflation);
	const nJuros = parseFloat(interest);

	const entrada = nPreco * nPorcentagemDaEntrada;
	const restante = nPreco - entrada;

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Simular aluguel de iPhones</Title>
					<p className="text-xs">
						As simulações usam a formula de juros simples
					</p>
				</div>

				<div className="bg-black/5 rounded px-3 flex gap-2 items-center">
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
					onChange={(e) => setDownPay(e.target.value)}
				/>

				<Input
					className="w-auto"
					type="number"
					title="Inflação (ao ano)"
					value={inflation}
					onChange={(e) => setInflation(e.target.value)}
				/>

				<Input
					className="w-auto"
					type="number"
					title="Taxa de juros (ao mês)"
					value={interest}
					onChange={(e) => setInterest(e.target.value)}
				/>
			</div>

			<div className="mt-4">
				<span>
					Entrada: <b>{BRL(entrada)}</b>
				</span>
			</div>

			<ul className="mt-4">
				{[6, 7, 8, 9, 10].map((meses) => {
					const jur = juros(restante, nJuros, meses);
					const restanteComJuros = restante + jur;
					const parcelas = restanteComJuros / meses;
					const total = entrada + restanteComJuros;

					return (
						<li key={meses} className="flex flex-col border-b-2 mt-2">
							<div>
								<i>{meses}x</i> de <b>{BRL(parcelas)}</b>
							</div>
							{showDetails ? (
								<div>
									Entrada (<b>{BRL(entrada)}</b>) + Restante (
									<b>{BRL(restante)}</b>) + Juros (<b>{BRL(jur)}</b>) = Total (
									<b>{BRL(total)}</b>)
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

function juros(c: number, i: number, t: number) {
	return c * i * t;
}
