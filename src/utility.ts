export function getPersistentStorage(name: string) {
	try {
		const stringyfiedData = localStorage.getItem(name);
		if (!stringyfiedData) return null;
		return JSON.parse(stringyfiedData);
	} catch (e) {
		return null;
	}
}

export function setPersistentStorage(name: string, data: any) {
	try {
		const stringyfiedData = JSON.stringify(data);
		localStorage.setItem(name, stringyfiedData);
		return true;
	} catch (e) {
		return null;
	}
}

export function getRelativeTime(pastDate: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((pastDate.valueOf() - now.valueOf()) / 1000);

	// Configura a internacionalização para o Português do Brasil
	const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

	const units: {
		max: number;
		value: number;
		unit: Intl.RelativeTimeFormatUnit;
	}[] = [
		{ max: 60, value: diffInSeconds, unit: "second" },
		{ max: 60, value: Math.floor(diffInSeconds / 60), unit: "minute" },
		{ max: 24, value: Math.floor(diffInSeconds / 3600), unit: "hour" },
		{ max: 7, value: Math.floor(diffInSeconds / 86400), unit: "day" },
		{ max: 4.3, value: Math.floor(diffInSeconds / 604800), unit: "week" },
		{ max: 12, value: Math.floor(diffInSeconds / 2629800), unit: "month" },
		{
			max: Infinity,
			value: Math.floor(diffInSeconds / 31557600),
			unit: "year",
		},
	];

	for (const { max, value, unit } of units) {
		if (Math.abs(value) < max) {
			return rtf.format(value, unit);
		}
	}

	return "";
}
