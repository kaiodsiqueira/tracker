import { Printer, ReceiptText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { createToken } from "@/lib/crypto";
import { displayPrettyDate, getPersistentStorage } from "@/lib/utility";
import Button from "../Button";
import { SimpleCheckbox } from "../Common";
import { LogoSimple, Whatsapp } from "../Icons";
import { Title } from "../StaticComponents";

export default function PrintableAnnotationsSection() {
	const [message, setMessage] = useState("");

	const [token, setToken] = useState("");
	const [showToken, setShowToken] = useState(false);

	const receiptRef = useRef(null);

	useEffect(() => {
		if (!showToken) return;
		createToken(message, getPersistentStorage("crypto-password")).then(
			setToken,
		);
	}, [message, showToken]);

	const openBrowserPrintMenu = useReactToPrint({
		contentRef: receiptRef,
		documentTitle: "NOTA AUXILIAR OFICIAL",
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

			<div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div
					ref={receiptRef}
					className="w-[302.36px] flex items-center flex-col gap-1 text-center border p-4"
				>
					<hr className="my-2 mt-8" />
					<Header />
					<hr className="my-1" />
					<h1 className="text-xs border-b border-black w-full pb-2">
						<b>NOTA AUXILIAR OFICIAL</b>
					</h1>
					<hr className="my-1" />
					<p className="mb-2 p-2 font-semibold rounded-md w-full bg-black/5 border whitespace-pre-wrap">
						{message}
					</p>
					{showToken && (
						<>
							<span className="text-[10px] font-medium">
								TOKEN DE AUTENTICIDADE:
							</span>
							<p className="text-[10px] p-2 rounded border bg-black/5 font-medium wrap-anywhere">
								{token}
							</p>
						</>
					)}
					<Footer />
				</div>

				<div className="flex flex-col gap-4">
					<div>
						<span className="font-medium text-xs">Mensagem</span>
						<textarea
							placeholder="Digite aqui a mensagem que aparecerá escrita no meio da nota impressa!"
							rows={10}
							value={message}
							className="border border-black/20 rounded-md w-full p-4"
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>

					<SimpleCheckbox
						checked={showToken}
						onCheckedChange={setShowToken}
						description="Este token poderá ser usado futuramente para conferir se a mensagem emitida é realmente legítima e foi originada deste sistema."
					>
						Incluir token de autenticidade
					</SimpleCheckbox>

					<Button onClick={openBrowserPrintMenu}>
						<Printer /> Abrir menu de impressão
					</Button>
				</div>
			</div>
		</section>
	);
}

function Header() {
	return (
		<div className="flex flex-col items-center w-full">
			<LogoSimple className="w-10" />
			<p className="text-[10px] mt-2">
				Sistemas Nildo Celulares, R. Primeiro de Maio, N° 215, Forquilha-CE,{" "}
				{displayPrettyDate()}
			</p>
		</div>
	);
}

function Footer() {
	return (
		<p className="mt-2 flex border-t border-black pt-2 flex-col gap-2 items-center leading-tight text-[10px]">
			Agradecemos a preferência por nossa loja! Para dúvidas ou reclamações
			entre em contato conosco pelos nossos canais de comunicações abaixo:
			<div className="flex gap-1 font-bold">
				<Whatsapp className="w-3" /> (88) 9.9218-3444
			</div>
		</p>
	);
}
