import { useState } from "react";

type ToilUser = {
	name: string;
	avatar: string;
	amount: number;
	logs: string[];
};

export function useToil() {
	const [data, setData] = useState<ToilUser[]>([
		{
			name: "Kaio",
			avatar: "/avatar-man.png",
			amount: 0,
			logs: [
				"+ 4h20m devido ao extra no feriado",
				"- 8h40m devido a falta por doença 09/01",
			],
		},
	]);

	return { data, setData };
}

export function ToilList({ data }: { data: ToilUser[] }) {
	return (
		<div className="flex gap-2 mt-4">
			{data.map((item) => (
				<div
					className="border border-black/10 shadow rounded p-2"
					key={item.name}
				>
					<div className="flex gap-2">
						<img
							className="rounded-full w-fit h-12 object-cover aspect-square"
							src={item.avatar}
							alt="woman avatar"
						/>
						<div>
							<p className="font-medium text-lg">{item.name}</p>
							<p>Saldo de horas: {item.amount}</p>
						</div>
					</div>
					<ul className="mt-2 p-2 rounded bg-black/10">
						{item.logs.map((log, _) => (
							<li className="text-xs opacity-75" key={log}>
								{log}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
