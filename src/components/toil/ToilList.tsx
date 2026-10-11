import { EmptySection } from "../StaticComponents";
import User from "./User";
import type { useToilReturn } from "./useToil";

export default function ToilList(props: { superToil: useToilReturn }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 mt-4">
			{props.superToil.users.length ? (
				props.superToil.users.map((user, i) => (
					<User
						index={i}
						key={user.name}
						superToil={props.superToil}
						user={user}
					/>
				))
			) : (
				<EmptySection>Nenhum registro</EmptySection>
			)}
		</div>
	);
}
