import { DatabaseArrowDown } from "lucide-react";
import { Title } from "@/components/StaticComponents";
import {
	getNowDateOrderedDashedString,
	getPersistentStorage,
	setPersistentStorage,
} from "../utility";
import Button from "./Button";
import { Input } from "./Common";

// Keys used in local storage to be backed up
const scopes = ["reminders", "toil-users"];

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

export default function BackupSection() {
	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Backup dos dados</Title>
					<p className="text-xs">
						Crie ou restaure um backup dos dados deste sistema.
					</p>
				</div>

				<Button onClick={createAndDownloadBackup} theme="neutral">
					<DatabaseArrowDown /> Criar backup
				</Button>
			</div>

			<Input
				type="file"
				accept=".wtb"
				containerClassName="mt-4"
				title="Restaurar um backup"
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
		</div>
	);
}
