import { DatabaseArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Title } from "@/components/StaticComponents";
import {
	getNowDateOrderedDashedString,
	getPersistentStorage,
	setPersistentStorage,
} from "../../lib/utility";
import Button from "../Button";
import { Input, PasswordInput } from "../Common";

// Keys used in local storage to be backed up
const scopes = [
	"reminders",
	"toil-users",
	"history-card-simulated-values",
	"history-rent-simulated-values",
];

function isDirPickSupported() {
	return "showDirectoryPicker" in window;
}

async function createAndDownloadBackup() {
	// Merge scopes data in single object
	var data: any = {};
	for (const scope of scopes) {
		data[scope] = getPersistentStorage(scope);
	}

	// Download Logic
	const filename = `backup-${getNowDateOrderedDashedString()}.wtb`;
	const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

	if (isDirPickSupported()) {
		// biome-ignore lint/suspicious/noTsIgnore: need it like this
		// @ts-ignore
		const directory = await window.showDirectoryPicker();

		const file = await directory.getFileHandle(filename, {
			create: true,
		});

		const writable = await file.createWritable();
		await writable.write(blob);
		await writable.close();
	} else {
		// Fallback to download as a file
		const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	}
}

export default function SettingsSection() {
	const [cryptoPassword, setCryptoPassword] = useState(
		getPersistentStorage("crypto-password") || "admin",
	);

	useEffect(() => {
		setPersistentStorage("crypto-password", cryptoPassword);
	}, [cryptoPassword]);

	return (
		<div className="p-4 bg-neutral-50 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Configurações</Title>
					<p className="text-xs">
						Altere ajustes, crie ou restore um backup de segurança.
					</p>
				</div>
			</div>

			<div className="grid gap-8 grid-cols-2">
				<div className="flex flex-col gap-2">
					<Input
						type="file"
						accept=".wtb"
						className="p-8"
						containerClassName="mt-4"
						title="Restaurar um backup (arraste o arquivo)"
						onChange={async (e) => {
							const file = e.target.files?.[0];
							if (!file) return;

							if (!file.name.toLowerCase().endsWith(".wtb")) {
								alert("Para evitar conflitos somente aceitamos arquivos .wtb");
								e.target.value = "";
								return;
							}

							const content = await file.text();
							const data = JSON.parse(content);

							// todo: add an integrity check

							for (const scope of scopes) {
								setPersistentStorage(scope, data[scope]);
							}

							location.reload();
						}}
					/>

					<Button onClick={createAndDownloadBackup} theme="neutral">
						<DatabaseArrowDown /> Criar backup
					</Button>
				</div>

				<PasswordInput
					description="Usada para assinar as anotações customizadas"
					value={cryptoPassword}
					setValue={setCryptoPassword}
				>
					Senha de criptografia
				</PasswordInput>
			</div>
		</div>
	);
}
