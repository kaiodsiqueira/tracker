import { useCallback, useEffect, useRef, useState } from "react";
import type { SS } from "./lib/types";
import { getPersistentStorage, setPersistentStorage } from "./lib/utility";

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

export function useValuesHistory(
	localStorageKey: string,
): [string[], SS<string[]>] {
	const [history, setHistory] = useState<string[]>(
		getPersistentStorage(localStorageKey) || [],
	);

	useEffect(() => {
		setPersistentStorage(localStorageKey, history);
	}, [localStorageKey, history]);

	return [history, setHistory];
}
