import { formatForDisplay } from "@tanstack/react-hotkeys";
import {
	EllipsisVertical,
	Minus,
	Plus,
	TextCursor,
	Trash,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "./components/Button";
import { Input, Select } from "./components/Common";
import ConfirmDialog from "./components/ConfirmDialog";
import { EmptySection, Shortcut, Title } from "./components/StaticComponents";
import CustomValueDialog from "./components/toil/CustomValueDialog";
import NewUserDialog from "./components/toil/NewUserDialog";
import { getPersistentStorage, minutesToDuration, tw } from "./utility";

export type ToilUser = {
	name: string;
	avatar: string;
	amount: number;
};

export function useToil() {
	const [toilUsers, setToilUsers] = useState<ToilUser[]>(
		(getPersistentStorage("toil-users") as ToilUser[]) || [],
	);

	useEffect(() => {
		localStorage.setItem("toil-users", JSON.stringify(toilUsers));
	}, [toilUsers]);

	return {
		toilUsers,
		addToilUser: (u: ToilUser) => setToilUsers([...toilUsers, u]),
		removeToilUser: (index: number) =>
			setToilUsers(toilUsers.filter((_, i) => i !== index)),
		addAmount: (index: number, amount: number) =>
			setToilUsers(
				toilUsers.map((u, i) =>
					i === index ? { ...u, amount: u.amount + amount } : u,
				),
			),
	};
}

export function NewToilUserButton({
	addToilUser,
}: {
	addToilUser: (u: ToilUser) => void;
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button
				type="button"
				theme="success"
				title="Adicionar novo usuário"
				onClick={() => setIsDialogOpen(true)}
				className="flex items-center"
			>
				<Plus className="text-white w-4 h-4" />
				<User className="text-white w-4 h-4" />
			</Button>

			<NewUserDialog
				isOpen={isDialogOpen}
				setIsOpen={setIsDialogOpen}
				addToilUser={addToilUser}
			/>
		</>
	);
}

function ToilUser(
	props: ToilUser & {
		i: number;
		removeToilUser: (i: number) => void;
		addAmount: (i: number, amount: number) => void;
	},
) {
	const [isCustomValueDrawerOpen, setIsCustomValueDrawerOpen] = useState(false);
	const [isDeleteUserConfirmDialogOpen, setIsDeleteUserConfirmDialogOpen] =
		useState(false);

	const totalHours = minutesToDuration(Math.abs(props.amount));

	return (
		<div className="border border-black/10 shadow rounded p-2" key={props.name}>
			<div className="flex items-center gap-2">
				<img
					className="rounded-full w-fit h-10 object-cover aspect-square"
					src={props.avatar}
					alt="the user's avatar"
				/>

				<div>
					<p className="font-medium text-lg">{props.name}</p>
					<p className="text-sm">
						<span
							className={tw(
								"font-bold",
								props.amount < 0
									? "text-red-800"
									: props.amount > 0
										? "text-green-800"
										: "",
							)}
						>
							{props.amount < 0 ? "DEVE" : props.amount > 0 ? "TEM" : ""}
						</span>{" "}
						<span>{totalHours ? totalHours : "0h 0m"}</span>
					</p>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger render={<Button className="ml-2" />}>
						<EllipsisVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-fit max-w-50">
						<DropdownMenuGroup className="gap-2">
							<DropdownMenuLabel>Horas dentro</DropdownMenuLabel>
							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => props.addAmount(props.i, 260)} // 4h20m in minutes
										className="mt-1 w-full"
										theme="success"
									/>
								}
							>
								<Plus />
								<div className="flex flex-col items-start">
									<p className="text-xs">Adicionar Meio Período</p>
									<p className="text-xs opacity-50">+ 4h 20m</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => props.addAmount(props.i, 260 * 2)} // 8h40m in minutes
										className="mt-1 w-full"
										theme="success"
									/>
								}
							>
								<Plus />
								<div className="flex flex-col items-start">
									<p className="text-xs">Adicionar Full Período</p>
									<p className="text-xs opacity-50">+ 8h 40m</p>
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuLabel>Horas em débito</DropdownMenuLabel>
							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => props.addAmount(props.i, -260)} // 4h20m in minutes
										className="mt-1 w-full"
										theme="danger"
									/>
								}
							>
								<Minus />
								<div className="flex flex-col items-start">
									<p className="text-xs">Remover Meio Período</p>
									<p className="text-xs opacity-50">- 4h 20m</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem
								nativeButton={true}
								render={
									<Button
										onClick={() => props.addAmount(props.i, -(260 * 2))} // 8h40m in minutes
										className="mt-1 w-full"
										theme="danger"
									/>
								}
							>
								<Minus />
								<div className="flex flex-col items-start">
									<p className="text-xs">Remover Full Período</p>
									<p className="text-xs opacity-50">- 8h 40m</p>
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

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
							<TextCursor /> Personalizado
						</DropdownMenuItem>

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

			<CustomValueDialog
				isOpen={isCustomValueDrawerOpen}
				setIsOpen={setIsCustomValueDrawerOpen}
				modifyPersistentAmount={props.addAmount.bind(null, props.i)}
			/>

			<ConfirmDialog
				confirmationPassword={props.name}
				isOpen={isDeleteUserConfirmDialogOpen}
				setIsOpen={setIsDeleteUserConfirmDialogOpen}
				afterConfirmation={() => props.removeToilUser(props.i)}
			>
				<p>
					Deletar <b>{props.name}</b> do banco de horas?
				</p>
			</ConfirmDialog>
		</div>
	);
}

export function ToilList({
	data,
	addAmount,
	removeToilUser,
}: {
	data: ToilUser[];
	removeToilUser: (i: number) => void;
	addAmount: (i: number, amount: number) => void;
}) {
	return (
		<div className="flex flex-wrap gap-2 mt-4">
			{data.length ? (
				data.map((user, i) => (
					<ToilUser
						i={i}
						key={user.name}
						addAmount={addAmount}
						removeToilUser={removeToilUser}
						{...user}
					/>
				))
			) : (
				<EmptySection>Nenhum registro</EmptySection>
			)}
		</div>
	);
}
