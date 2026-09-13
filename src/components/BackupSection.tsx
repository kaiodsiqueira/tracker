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

function createAndDownloadBackup() {
	var data: any = {};
	for (const scope of scopes) {
		data[scope] = getPersistentStorage(scope);
	}
	const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `backup-${getNowDateOrderedDashedString()}.wtb`;
	a.click();
	URL.revokeObjectURL(url);
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
