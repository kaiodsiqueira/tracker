import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BRL, clamp } from "@/utility";
import { Input } from "../Common";
import { Title } from "../StaticComponents";

export default function RentSection() {
	const [showDetails, setShowDetails] = useState(false);

	const [name, setName] = useState("iPhone 12 256GB");
	const [price, setPrice] = useState("2300");
	const [downPay, setDownPay] = useState("60");
	const [interest, setInterest] = useState("0,058"); // monthly
	const [fixedInterest, setFixedInterest] = useState("600");
	const [listPeriod, setListPeriod] = useState("5, 6, 8, 10");

	const nPreco = parseFloat(price);
	const nPorcentagemDaEntrada = parseFloat(downPay) / 100;
	const nJurosFixo = parseFloat(fixedInterest);
	const nTaxaDeJuros = parseFloat(interest);

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
					title="Nome aparelho"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

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
					type="number"
					title="Juros fixo (em R$)"
					value={fixedInterest}
					onChange={(e) => setFixedInterest(e.target.value)}
				/>

				<Input
					className="w-auto"
					type="number"
					title="Taxa de juros (ao mês)"
					value={interest}
					onChange={(e) => setInterest(e.target.value)}
				/>

				<Input
					className="w-auto"
					title="Períodos (6, 8, 10)"
					value={listPeriod}
					onChange={(e) => setListPeriod(e.target.value)}
				/>
			</div>

			<div className="mt-4">
				Simulando: <b>{name}</b>
				<br />
				Entrada: <b>{BRL(entrada)}</b>
			</div>

			<ul className="mt-4">
				{periodos.map((meses) => {
					const juros = nJurosFixo + simples(restante, nTaxaDeJuros, meses);
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
