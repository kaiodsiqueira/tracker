import { useEffect, useState } from "react";
import { getPersistentStorage } from "@/utility";

export type ToilUser = {
	name: string;
	avatar: string;
	amount: number;
	logs: string[];
};

export function useToil() {
	const [users, setUsers] = useState<ToilUser[]>(
		(getPersistentStorage("toil-users") as ToilUser[]) || [],
	);

	useEffect(() => {
		localStorage.setItem("toil-users", JSON.stringify(users));
	}, [users]);

	function addAmount(index: number, amount: number, reason: string) {
		setUsers(
			users.map((u, i) =>
				i === index
					? {
							...u,
							amount: u.amount + amount,
							logs: [reason, ...(u.logs ?? []).slice(0, 4)],
						}
					: u,
			),
		);
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
