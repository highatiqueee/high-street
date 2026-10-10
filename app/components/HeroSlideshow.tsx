"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image: "/products/banners/campaign-1.png",
    eyebrow: "HIGH STREET — EST. 2026",
    title: "LIMITED DROPS,\nMAXIMUM IMPACT.",
    description:
      "We don't follow trends. We create our own.",
    button: "Shop the collection",
    number: "01",
  },
  {
    image: "/products/banners/campaign-2.png",
    eyebrow: "THE STREET EDIT / 002",
    title: "BUILT DIFFERENT.\nWORN DIFFERENT.",
    description:
      "Streetwear for those who refuse to blend in.",
    button: "Explore new arrivals",
    number: "02",
  },
  {
    image: "/products/banners/campaign-3.png",
    eyebrow: "THE BLACK COLLECTION",
    title: "DARK FITS.\nLOUD STATEMENT.",
    description:
      "Minimal colours. Maximum attitude.",
    button: "Discover the collection",
    number: "03",
  },
  {
    image: "/products/banners/campaign-4.png",
    eyebrow: "OWN YOUR STREET",
    title: "YOUR STYLE.\nYOUR RULES.",
    description:
      "Make your presence impossible to ignore.",
    button: "Shop now",
    number: "04",
  },
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const current = slides[activeSlide];

  function previousSlide() {
    setActiveSlide(
      (currentIndex) =>
        (currentIndex - 1 + slides.length) % slides.length
    );
  }

  function nextSlide() {
    setActiveSlide(
      (currentIndex) => (currentIndex + 1) % slides.length
    );
  }

  return (
    <section
      className="hs-slideshow"
      aria-label="HIGH STREET fashion campaign"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.number}
          className={`hs-slide-image ${
            index === activeSlide ? "active" : ""
          }`}
          style={{
            backgroundImage: `url("${slide.image}")`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="hs-slide-overlay" />

      <div className="hs-slide-content" key={current.number}>
        <p className="hs-slide-eyebrow">{current.eyebrow}</p>

        <h1>
          {current.title.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h1>

        <p className="hs-slide-description">
          {current.description}
        </p>

        <a href="#shop" className="hs-slide-button">
          <span className="hs-button-arrow">↗</span>
          {current.button}
        </a>
      </div>

      <p className="hs-slide-index">
        HS / {current.number}
      </p>

      <div className="hs-slide-controls">
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="hs-slide-arrow"
        >
          ←
        </button>

        <div className="hs-slide-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.number}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              className={
                index === activeSlide
                  ? "hs-indicator active"
                  : "hs-indicator"
              }
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="hs-slide-arrow"
        >
          →
        </button>
      </div>

      <div className="hs-slide-bottom">
        <span>01 &nbsp; Community-Driven Culture</span>
        <span>02 &nbsp; Future-Ready Fashion</span>
        <span>03 &nbsp; Art Meets Attitude</span>
        <span>04 &nbsp; Built for the Streets</span>
      </div>
    </section>
  );
}