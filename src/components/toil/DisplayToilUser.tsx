import { Clock, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BRL, minutesToDuration, whichSign } from "@/utility";
import Badge from "../Badge";
import Button from "../Button";
import { ColoredNumberAnwser } from "../Common";
import ConfirmDialog from "../ConfirmDialog";
import { SimpleWarnMessage } from "../StaticComponents";
import CustomValueDialog, {
	DAILY_WORKING_HOURS_IN_MINUTES,
	MONTHLY_WORKING_DAYS,
} from "./CustomValueDialog";
import EditUserInfoDialog, { AVATARS_URLS } from "./EditUserInfoDialog";
import type { ToilUser, useToilReturn } from "./useToil";

// 0 for negative, 1 for 0, 2 for positive
function getEquivalentHoursValueMessageFor(user: ToilUser) {
	if (!user.salary)
		return (
			<SimpleWarnMessage className="mt-2">
				Defina o salário do usuário para calcular o valor equivalente!
			</SimpleWarnMessage>
		);

	const wagePerDay = user.salary / MONTHLY_WORKING_DAYS;
	const wagePerMinute = wagePerDay / DAILY_WORKING_HOURS_IN_MINUTES;

	return (
		<ColoredNumberAnwser question="Equivale a: " sign={whichSign(user.amount)}>
			{BRL(wagePerMinute * user.amount)}
		</ColoredNumberAnwser>
	);
}

export default function DisplayToilUser(props: {
	index: number;
	superToil: useToilReturn;
	user: ToilUser;
}) {
	const [isCustomValueDrawerOpen, setIsCustomValueDrawerOpen] = useState(false);
	const [isDeleteUserConfirmDialogOpen, setIsDeleteUserConfirmDialogOpen] =
		useState(false);

	// Wheter the user editing is opened or not
	const [isEditingUserDialogOpen, setIsEditingUserDialogOpen] = useState(false);

	// Amount of hours this user has prettified for display
	const totalHours = minutesToDuration(Math.abs(props.user.amount));

	// Get avatar url by name or run special function to get url
	let avatarUrl = AVATARS_URLS[props.user.avatar];
	avatarUrl =
		typeof avatarUrl === "function" ? avatarUrl(props.user.name) : avatarUrl;

	// 0 for negative, 1 for 0, 2 for positive
	const sign = whichSign(props.user.amount);

	const hoursEquivalent = getEquivalentHoursValueMessageFor(props.user);

	return (
		<div className="border border-slate-800/20 rounded-lg p-3">
			<div>
				<header className="flex justify-between items-start gap-3">
					<img
						src={avatarUrl}
						alt="the user's avatar"
						className="rounded-full mt-1 w-fit h-8 object-cover aspect-square"
					/>

					<div>
						<p className="font-medium text-md">{props.user.name}</p>
						<p className="text-sm">
							<GetBadgeForSign sign={sign} />
							<span>{totalHours ? totalHours : "0h 0m"}</span>
						</p>

						{hoursEquivalent}
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button className="py-4 hover:bg-black/5 bg-transparent border-none ml-auto" />
							}
						>
							<EllipsisVertical size={20} />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-fit max-w-50">
							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => setIsCustomValueDrawerOpen(true)}
										className="w-full"
										theme="neutral"
									/>
								}
							>
								<Clock /> Editar Horas
							</DropdownMenuItem>

							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => setIsEditingUserDialogOpen(true)}
										className="mt-1 w-full"
										theme="neutral"
									/>
								}
							>
								<Pencil /> Editar Usuário
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => setIsDeleteUserConfirmDialogOpen(true)}
										className="mt-1 w-full"
										theme="danger"
									/>
								}
							>
								<Trash />
								<p className="text-xs">Deletar usuário</p>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>

				<ul className="flex flex-col px-2 py-1 bg-black/2 border rounded mt-4 text-xs">
					{props.user.logs?.length ? (
						props.user.logs.map((l) => (
							<li
								key={l}
								className={
									l.startsWith("+") ? "text-green-800" : "text-red-800"
								}
							>
								{l}
							</li>
						))
					) : (
						<span className="opacity-40">Nenhum registro ainda</span>
					)}
				</ul>

				{props.user.salary && (
					<p className="text-[8px] opacity-25 mt-2">
						Sálario de {BRL(props.user.salary)}
					</p>
				)}
			</div>

			<CustomValueDialog
				isOpen={isCustomValueDrawerOpen}
				currentAmount={props.user.amount}
				setIsOpen={setIsCustomValueDrawerOpen}
				modifyPersistentAmount={props.superToil.addAmount.bind(
					null,
					props.index,
				)}
			/>

			<ConfirmDialog
				confirmationPassword={props.user.name}
				isOpen={isDeleteUserConfirmDialogOpen}
				setIsOpen={setIsDeleteUserConfirmDialogOpen}
				afterConfirmation={() => props.superToil.removeToilUser(props.index)}
			>
				<p>
					Deletar <b>{props.user.name}</b> do banco de horas?
				</p>
			</ConfirmDialog>

			<EditUserInfoDialog
				isOpen={isEditingUserDialogOpen}
				setIsOpen={setIsEditingUserDialogOpen}
				//
				defaultName={props.user.name}
				defaultAvatar={props.user.avatar}
				defaultSalary={props.user.salary || 1000}
				//
				onSave={(infos) =>
					props.superToil.changeUser(props.index, (u) => ({
						...u, // Write original user first
						// Write changes later
						...infos,
					}))
				}
				labelTitle={`Editando ${props.user.name}`}
				labelDescription="Você está editando um usuário existente."
			/>
		</div>
	);
}

function GetBadgeForSign({ sign }: { sign: number }) {
	if (sign === 0) {
		return <Badge color="error">DEVE</Badge>;
	} else if (sign === 1) {
		return <Badge color="secondary">NEUTRO</Badge>;
	} else {
		return <Badge color="success">TEM</Badge>;
	}
}
