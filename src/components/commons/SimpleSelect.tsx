import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import type { SS } from "@/utility";

export default function SimpleSelect(props: {
	value: string;
	items: string[];
	setValue: SS<string>;

	defaultValue: string;
	placeholder?: string;
}) {
	return (
		<Combobox
			value={props.value}
			items={props.items}
			onValueChange={(newValue) =>
				props.setValue(newValue || props.defaultValue)
			}
		>
			<ComboboxInput placeholder={props.placeholder} />
			<ComboboxContent>
				<ComboboxEmpty>Nada encontrado.</ComboboxEmpty>
				<ComboboxList>
					{(value) => (
						<ComboboxItem key={value} value={value}>
							{value}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
