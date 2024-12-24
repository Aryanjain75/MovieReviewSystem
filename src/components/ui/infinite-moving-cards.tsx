/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    description: string;
    name: string;
    rating: number; // Fixed typo from 'ratting' to 'rating'
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    console.log("items", items);
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const durationMap = {
        fast: "15s",
        normal: "30s",
        slow: "45s",
      };
      containerRef.current.style.setProperty("--animation-duration", durationMap[speed]);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] m-auto",
        className
      )}
    >
      {items.length === 0 && (
        <p className="text-center text-gray-500">No items available to display.</p>
      )}
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.description}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    Rating: {"⭐".repeat(item.rating)}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      <p className="text-center text-gray-400 mt-4">
        {direction === "left"
          ? "Items will scroll from right to left."
          : "Items will scroll from left to right."}
      </p>
      <p className="text-center text-gray-400 mt-2">
        {speed === "fast"
          ? "Scrolling speed is set to fast."
          : speed === "normal"
          ? "Scrolling speed is set to normal."
          : "Scrolling speed is set to slow."}
      </p>
      <p className="text-center text-gray-400 mt-2">
        {pauseOnHover
          ? "Scrolling pauses when you hover over the items."
          : "Scrolling continues uninterrupted on hover."}
      </p>
    </div>
  );
};
