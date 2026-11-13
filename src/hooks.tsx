import { useCallback, useEffect, useRef, useState } from "react";
import { getPersistentStorage, type SS, setPersistentStorage } from "./utility";

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
