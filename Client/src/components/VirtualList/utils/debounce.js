export function debounce(fn, wait) {
	let timer = null;

	return (...args) => {
		const context = this;
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn.apply(context, args);
		}, wait);
	}
}