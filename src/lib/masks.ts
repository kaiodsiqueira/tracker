import { BRL, MathSign } from "@/utility";

export const MaskBRL = (value: string | number): string => {
	if (!value) return "R$ 0,00";
	const clean = value.toString().replace(/\D/g, ""); // Isolate digits
	return BRL(parseInt(clean, 10) / 100);
};

export const UnmaskBRL = (value: string): number => {
	if (value.trim() === "") return 0;
	const clean = value.replace(/\D/g, "");
	return parseInt(clean, 10) / 100;
};

export const MaskMinutes = (value: string | number): any => {
	// Only allow digits, h, m and the negative sign
	return value.toString().replace(/[^\dhm-]/g, "");
};

export const UnmaskMinutes = (value: string | number): any => {
	// Only allow digits, h, m and the negative sign
	const clean = value.toString().replace(/[^\dhm-]/g, "");
	//console.log("clean:", clean);

	// Split at transformers character
	const splitted = clean.split(/([hm])/g);
	//console.log("splitted:", splitted);

	// Clear empty strings
	const filtered = splitted.filter((s) => s.length);
	//console.log("filtered:", filtered);

	// Parse numbers and keep transformers as strings
	const transformed = filtered.map((v) => {
		if (v === "h" || v === "m") return v;
		return parseInt(v, 10) || 0;
	});
	//console.log("transformed:", transformed);

	let lastSawNumber = 0;
	var sum = 0;

	transformed.forEach((v) => {
		if (typeof v === "number") {
			lastSawNumber = v;
			return;
		}

		// Multiply by 60 if it's hours, otherwise keep it as minutes
		const amp = v === "h" ? 60 : 1;

		// Add previous number we saw, multiplied by the transformer
		// While keeping the sign of previous operations
		sum += lastSawNumber * amp * MathSign(sum);
		// Reset for next iteration
		lastSawNumber = 0;
	});

	// Deal with the last number if it was not followed by a transformer
	if (lastSawNumber !== 0) {
		sum += lastSawNumber * MathSign(sum);
	}

	return sum;
};
