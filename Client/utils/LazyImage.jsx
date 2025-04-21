import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";

export default function LazyImage({
  src,
  alt,
  width,
  height,
  style,
  rootMargin = "200px",
  threshold = 0.1
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataSrc, setDataSrc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          setDataSrc(src);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin,
      threshold,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, src, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      style={{ width, height }}
    >
      {
        isLoaded ? (
          <img
            src={dataSrc}
            alt={alt}
            width="100%"
            height="100%"
            style={style}
          />
        ) : (
          <Spinner
            width={width}
            height={height}
          />
        )
      }
    </div>
  );
}