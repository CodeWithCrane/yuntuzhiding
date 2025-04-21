import React, { useEffect, useRef, useState } from "react";
import { useCache } from "./hooks/useCache";

import { debounce } from "./utils/debounce";
import { throttle } from "./utils/throttle";

function ListItem({
	key,
	index,
	width,
	height
}) {
	return (
		<div
			key={key}
			style={{
				width,
				height,
				boxSizing: "border-box",
				position: "absolute",
				top: index * height,
				backgroundColor: `${index % 2 ? "#fff" : "#bbb"}`
			}}
		>
			list item {index}
		</div>
	);
}

export default function VirtualList({
	style,
	data,
	width,
	height,
	count,
	overscan = 2,
	itemHeight,
	render
}) {
	console.log("hehhh", data);
	const scrollContainer = useRef(null);
	const [scrollTop, setScrollTop] = useState(0);
	const cachedItems = useCache();

	const contentHeight = itemHeight * count;
	const visibleCount = Math.floor(height / itemHeight);
	const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
	const end = Math.min(count - 1, start + visibleCount + overscan);

	const handleScroll = (e) => {
		setScrollTop(e.target.scrollTop);
	};

	const scroll = throttle(handleScroll, 50);

	const items = [];
	for (let i = start; i <= end; i++) {
		if (cachedItems.has(i)) {
			items.push(cachedItems.get(i));
		} else {
			const item = render(data[i]);
			console.log("data[i] ", data[i],)
			items.push(item);
			cachedItems.set(i, item);
		}
	}

	useEffect(() => {
		const container = scrollContainer.current;
		container.addEventListener("scroll", scroll, { passive: true });

		return () => {
			container.removeEventListener("scroll", scroll, { passive: true });
		}
	}, []);

	return (
		<div
			style={{
				width,
				height,
				boxSizing: "border-box",
				overflowY: "auto",
				position: "relative",
				border: "1px solid #333",
				...style
			}}
			ref={scrollContainer}
		>
			<div
				style={{
					width,
					height: contentHeight
				}}
			>
				{items}
			</div>
		</div>
	)
}