import { formatForDisplay } from "@tanstack/react-hotkeys";
import { EllipsisVertical, Minus, Plus, Trash, User } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, Select } from "./Common";
import Button from "./components/Button";
import { EmptySection, Shortcut, Title } from "./components/StaticComponents";
import { getPersistentStorage, minutesToDuration, tw } from "./utility";

type ToilUser = {
	name: string;
	avatar: string;
	amount: number;
	// logs: string[];
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
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("./avatar-man.png");

	function onSubmit() {
		if (!name.length) return;

		addToilUser({ name, avatar, amount: 0 });
		setIsModalOpen(false);
	}

	return (
		<>
			<Button
				type="button"
				theme="success"
				title="Adicionar novo usuário"
				onClick={() => setIsModalOpen(true)}
				className="flex items-center"
			>
				<Plus className="text-white w-4 h-4" />
				<User className="text-white w-4 h-4" />
			</Button>

			<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
				<Title>Criar novo usuário no banco de horas</Title>

				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					title="Nome do usuário"
					containerClassName="mt-2"
					placeholder="Cleber Machado"
				/>

				<Select
					value={avatar}
					onChange={(e) => setAvatar(e.target.value)}
					title="Avatar do usuário"
				>
					<option value="./avatar-man.png">Homem</option>
					<option value="./avatar-woman.png">Mulher</option>
				</Select>

				<div className="flex gap-2">
					<Button type="submit" onClick={onSubmit} theme="success">
						<Shortcut>{formatForDisplay("Enter")}</Shortcut> Salvar
					</Button>

					<Button
						type="reset"
						theme="danger"
						onClick={() => setIsModalOpen(false)}
					>
						<Shortcut>{formatForDisplay("Escape")}</Shortcut> Cancelar
					</Button>
				</div>
			</Modal>
		</>
	);
}

function ToilUser({
	name,
	avatar,
	amount,
	// logs,
	removeToilUser,
	addAmount,
	i,
}: ToilUser & {
	i: number;
	removeToilUser: (i: number) => void;
	addAmount: (i: number, amount: number) => void;
}) {
	const totalHours = minutesToDuration(Math.abs(amount));

	return (
		<div className="border border-black/10 shadow rounded p-2" key={name}>
			<div className="flex items-center gap-2">
				<img
					className="rounded-full w-fit h-10 object-cover aspect-square"
					src={avatar}
					alt="the user's avatar"
				/>

				<div>
					<p className="font-medium text-lg">{name}</p>
					<p className="text-sm">
						<span
							className={tw(
								"font-bold",
								amount < 0
									? "text-red-800"
									: amount > 0
										? "text-green-800"
										: "",
							)}
						>
							{amount < 0 ? "DEVE" : amount > 0 ? "TEM" : ""}
						</span>{" "}
						<span>{totalHours ? totalHours : "0h 0m"}</span>
					</p>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger render={<Button />}>
						<EllipsisVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-fit max-w-50">
						<DropdownMenuGroup className="gap-2">
							<DropdownMenuLabel>Horas dentro</DropdownMenuLabel>
							<DropdownMenuItem
								render={
									<Button
										onClick={() => addAmount(i, 260)} // 4h20m in minutes
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
								render={
									<Button
										onClick={() => addAmount(i, 260 * 2)} // 8h40m in minutes
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
								render={
									<Button
										onClick={() => addAmount(i, -260)} // 4h20m in minutes
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
								render={
									<Button
										onClick={() => addAmount(i, -(260 * 2))} // 8h40m in minutes
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
							render={
								<Button
									onClick={() => removeToilUser(i)}
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

			{/* <ul className="mt-2 p-2 rounded bg-black/10">
        {logs.map((log, _) => (
          <li className="text-xs opacity-75" key={log}>
            {log}
          </li>
        ))}
      </ul> */}
		</div>
	);
}

export function ToilList({
	data,
	removeToilUser,
	addAmount,
}: {
	data: ToilUser[];
	removeToilUser: (i: number) => void;
	addAmount: (i: number, amount: number) => void;
}) {
	return (
		<div className="flex flex-wrap gap-2 mt-4">
			{data.length ? (
				data.map((u, i) => (
					<ToilUser
						key={u.name}
						i={i}
						removeToilUser={removeToilUser}
						addAmount={addAmount}
						{...u}
					/>
				))
			) : (
				<EmptySection>Nenhum registro</EmptySection>
			)}
		</div>
	);
}
