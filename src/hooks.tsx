import { useCallback, useRef } from "react";

export function useDebounce(fn: any, delay = 400) {
	const timerRef = useRef<number>(null);

	return useCallback(
		(...args: any[]) => {
			if (timerRef.current) window.clearTimeout(timerRef.current);
			// 'fn' e 'timerRef' ficam acessíveis aqui graças à closure
			timerRef.current = window.setTimeout(() => {
				fn(...args);
			}, delay);
		},
		[fn, delay],
	);
}
