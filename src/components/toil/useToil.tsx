import { useEffect, useState } from "react";
import { getPersistentStorage, StrSign } from "@/utility";

type ToilUserLog = {
	sign: ReturnType<typeof StrSign>;
	amount: number;
	reason: string;
};

export type ToilUser = {
	name: string;
	avatar: string;
	amount: number;
	salary?: number;
	logs?: (string | ToilUserLog)[];
	metrics?: { totalNegativeLogs: number; totalPositiveLogs: number };
};

export function useToil() {
	const [users, setUsers] = useState<ToilUser[]>(
		(getPersistentStorage("toil-users") as ToilUser[]) || [],
	);

	useEffect(() => {
		localStorage.setItem("toil-users", JSON.stringify(users));
	}, [users]);

	function addAmount(index: number, amount: number, reason: string) {
		// modify the amount
		users[index].amount += amount;
		users[index].logs = [
			// insert new log at the beginning
			{ sign: StrSign(amount), amount, reason },
			// keep only the last 5 logs
			...(users[index].logs ?? []).slice(0, 4),
		];

		// update related metrics

		if (!users[index].metrics) {
			// default metrics if not present
			users[index].metrics = { totalNegativeLogs: 0, totalPositiveLogs: 0 };
		}

		users[index].metrics[
			amount < 0 ? "totalNegativeLogs" : "totalPositiveLogs"
		]++;

		// update the state with a new copy of the users array to trigger a re-render
		setUsers([...users]);
	}

	return {
		users,
		addToilUser: (u: ToilUser) => setUsers([...users, u]),
		removeToilUser: (index: number) =>
			setUsers(users.filter((_, i) => i !== index)),
		addAmount,

		changeUser: (
			targetIndex: number,
			applyChange: (user: ToilUser) => ToilUser,
		) => {
			setUsers(
				users.map((user, i) => {
					return i === targetIndex ? applyChange(user) : user;
				}),
			);
		},
	};
}

export type useToilReturn = ReturnType<typeof useToil>;
