import { Printer, ReceiptText } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { displayPrettyDate } from "@/utility";
import Button from "../Button";
import { LogoSimple, Whatsapp } from "../Icons";
import { Title } from "../StaticComponents";

export default function PrintableAnnotationsSection() {
	const [msg, setMsg] = useState("");
	const cupomRef = useRef(null);

	const imprimir = useReactToPrint({
		contentRef: cupomRef,
		documentTitle: "Cupom",
	});

	return (
		<section className="border bg-neutral-50 border-black/20 shadow-lg rounded">
			<header className="p-4 text-mauve-50 flex justify-between gap-2 bg-mauve-900">
				<div className="flex gap-2 items-center">
					<ReceiptText size={30} />
					<div>
						<Title>Criar recibo customizado</Title>
						<p className="text-xs">
							Ferramenta rápida para criar documentos, recibos e anotações.
						</p>
					</div>
				</div>
			</header>

			<div className="p-4 grid grid-cols-2">
				<div
					ref={cupomRef}
					className="w-[302.36px] flex items-center flex-col gap-1 text-center border p-4"
				>
					<hr className="my-2 mt-8" />
					<Header />
					<hr className="my-2" />
					<h1 className="bg-black w-full text-white text-xs">
						<b>(DAE) NOTA AUXILIAR OFICIAL</b>
					</h1>
					<hr className="my-2" />
					<p className="p-2 font-semibold rounded-md w-full bg-black/5 border whitespace-pre-wrap">
						{msg}
					</p>
					<hr className="my-2" />
					<h1 className="bg-black w-full text-white text-xs">
						<b>(DAE) NOTA AUXILIAR OFICIAL</b>
					</h1>
					<hr className="my-2" />
					<Footer />
				</div>

				<div>
					<span className="font-medium text-xs">Mensagem</span>
					<textarea
						placeholder="Digite aqui a mensagem que aparecerá escrita no meio da nota impressa!"
						rows={10}
						value={msg}
						className="border rounded-md w-full p-4"
						onChange={(e) => setMsg(e.target.value)}
					/>
					<Button onClick={imprimir}>
						<Printer /> Abrir menu de impressão
					</Button>
				</div>
			</div>
		</section>
	);
}

function Header() {
	return (
		<div className="flex flex-col items-center border-b border-black pb-2 w-full">
			<LogoSimple className="w-10" />
			<p className="text-[10px] mt-2">
				Sistemas Nildo Celulares, R. Primeiro de maio, N° 215
				<br />
				{displayPrettyDate()}
			</p>
		</div>
	);
}
function Footer() {
	return (
		<p className="flex border-t border-black pt-2 flex-col gap-2 items-center text-[10px]">
			Agradecemos a preferência por nossa loja! Para reclamações entre em
			contato conosco pelos nossos canais de comunicações abaixo:
			<div className="flex gap-1 font-bold">
				<Whatsapp className="w-3" /> (88) 9.9218-3444
			</div>
		</p>
	);
}
