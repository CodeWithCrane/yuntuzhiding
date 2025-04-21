export function throttle(fn, wait) {
	let lastTime = null, timer = null;

	return (...args) => {
		const context = this;
		const now = Date.now();

		if (now - lastTime >= wait) {
			if (timer) {
				clearTimeout(timer);
			}
			fn.apply(context, args);
			lastTime = Date.now();
		} else {
			if (!timer) {
				timer = setTimeout(() => {
					fn.apply(context, args);
					timer = null;
					lastTime = Date.now();
				}, wait - (now - lastTime));
			}
		}
	}
}