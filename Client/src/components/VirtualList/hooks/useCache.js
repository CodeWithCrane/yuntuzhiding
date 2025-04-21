import { useRef } from "react";

export const useCache = () => {
	const cache = useRef(new Map());

	const get = (key) => {
		return cache.current.get(key);
	};

	const set = (key, value) => {
		cache.current.set(key, value);
	};

	const has = (key) => {
		return cache.current.has(key);
	};

	const del = (key) => {
		cache.current.delete(key);
	};

	const clear = () => {
		cache.current.clear();
	};

	const size = () => {
		return cache.current.size;
	};

	return { get, set, has, del, clear, size };
};