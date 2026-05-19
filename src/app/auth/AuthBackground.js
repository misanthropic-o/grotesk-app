"use client";

import { useEffect, useRef, useReducer } from "react";
import Image from "next/image";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const initialState = { images: [], currentIndex: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, images: shuffle(action.payload) };
    case "next":
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.images.length,
      };
    default:
      return state;
  }
}

export default function AuthBackground({ images = [] }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    images,
  });
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (images.length > 0 && isFirstRender.current) {
      isFirstRender.current = false;
      dispatch({ type: "init", payload: images });
    }
  }, [images]);

  useEffect(() => {
    if (state.images.length === 0) return;
    const interval = setInterval(() => {
      dispatch({ type: "next" });
    }, 3000);
    return () => clearInterval(interval);
  }, [state.images.length]);

  return (
    <div className="auth-background">
      <div className="auth-background-slides">
        {state.images.map((src, index) => (
          <div
            key={`auth-bg-${index}`}
            className={`auth-slide ${index === state.currentIndex ? "active" : ""}`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="auth-bg-image"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="auth-background-overlay" />
    </div>
  );
}
