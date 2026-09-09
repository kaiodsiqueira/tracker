export { twMerge as tw } from "tailwind-merge";
export { tv as variants } from "tailwind-variants";

import {
	formatDistanceToNow,
	formatDuration,
	intervalToDuration,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function getPersistentStorage(name: string) {
	try {
		const stringyfiedData = localStorage.getItem(name);
		if (!stringyfiedData) return null;
		return JSON.parse(stringyfiedData);
	} catch (_) {
		return null;
	}
}

export function setPersistentStorage(name: string, data: any) {
	try {
		const stringyfiedData = JSON.stringify(data);
		localStorage.setItem(name, stringyfiedData);
		return true;
	} catch (_) {
		return null;
	}
}

export function getRelativeTime(pastDate: Date): string {
	return formatDistanceToNow(pastDate, { locale: ptBR, addSuffix: true });
}

export function minutesToDuration(minutes: number) {
	const duration = intervalToDuration({
		start: 0,
		end: minutes * 60 * 1000,
	});

	return formatDuration(duration, { locale: ptBR });
}
