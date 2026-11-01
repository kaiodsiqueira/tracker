import { BRL } from "@/utility";

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
