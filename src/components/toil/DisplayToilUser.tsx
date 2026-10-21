import { Clock, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { minutesToDuration, tw, whichSign } from "@/utility";
import Button from "../Button";
import ConfirmDialog from "../ConfirmDialog";
import CustomValueDialog from "./CustomValueDialog";
import EditUserInfoDialog, { AVATARS_URLS } from "./EditUserInfoDialog";
import type { ToilUser, useToilReturn } from "./useToil";

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

	return (
		<div className="border border-black/20 rounded p-2">
			<div>
				<div className="flex justify-between items-center gap-2">
					<img
						src={avatarUrl}
						alt="the user's avatar"
						className="rounded-full w-fit h-10 object-cover aspect-square"
					/>

					<div>
						<p className="font-medium text-lg">{props.user.name}</p>
						<p className="text-sm">
							<span
								className={tw(
									"font-bold",
									["text-red-800", "", "text-green-800"][sign],
								)}
							>
								{["DEVE", "", "TEM"][sign]}
							</span>{" "}
							<span>{totalHours ? totalHours : "0h 0m"}</span>
						</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger render={<Button className="ml-auto" />}>
							<EllipsisVertical />
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
				</div>

				<ul className="flex flex-col px-2 py-1 bg-black/2 border rounded mt-2 text-xs">
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
			</div>

			<CustomValueDialog
				isOpen={isCustomValueDrawerOpen}
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
				defaultName={props.user.name}
				defaultAvatar={props.user.avatar}
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
