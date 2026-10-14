import { Plus, User } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
import { Title } from "../StaticComponents";
import EditUserInfoDialog from "./EditUserInfoDialog";
import ToilList from "./ToilList";
import { type ToilUser, useToil } from "./useToil";

function NewToilUserButton(props: { addToilUser: (u: ToilUser) => void }) {
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

			<EditUserInfoDialog
				isOpen={isDialogOpen}
				setIsOpen={setIsDialogOpen}
				onSave={(infos) =>
					props.addToilUser({
						...infos,
						amount: 0,
						logs: [],
					})
				}
				labelTitle="Adicionar ao banco de horas"
				labelDescription="Criando novo usuário para gerenciar."
			/>
		</>
	);
}

export default function ToilSection() {
	const superToil = useToil();

	return (
		<div className="p-4 border border-black/20 shadow-lg rounded">
			<div className="flex justify-between gap-2">
				<div>
					<Title>Banco de horas</Title>
					<p className="text-xs">
						Gerenciamento de horas extras e débitos de jornada, como feriados e
						faltas
					</p>
				</div>

				<NewToilUserButton addToilUser={superToil.addToilUser} />
			</div>

			<ToilList superToil={superToil} />
		</div>
	);
}
