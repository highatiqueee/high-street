"use client";

import { useEffect, useState } from "react";

type Screen = "signin" | "signup" | "otp";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [screen, setScreen] = useState<Screen>("signin");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [seconds, setSeconds] = useState(30);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen || screen !== "otp" || seconds <= 0) return;

    const timer = window.setTimeout(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isOpen, screen, seconds]);

  

  function openPopup() {
    setIsOpen(true);
    setScreen("signin");
    setMessage("");
  }

  function closePopup() {
    setIsOpen(false);
    setOtp("");
    setMessage("");
  }

  function continueToOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (screen === "signup" && !name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    // UI DEMO ONLY:
    // No SMS is sent until an OTP provider is integrated.
    setScreen("otp");
    setSeconds(30);
    setOtp("");
    setMessage(
      "Demo mode: SMS verification is not connected yet."
    );
  }

  function verifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter the complete 6-digit OTP.");
      return;
    }

    // Do not sign in users until a real provider verifies the OTP.
    setMessage(
      "OTP verification is not connected yet. Your account has not been signed in."
    );
  }

  function resendOtp() {
    // Replace with a real provider request when integrated.
    setSeconds(30);
    setMessage("Demo mode: no new SMS has been sent.");
  }

  function changeScreen(nextScreen: Screen) {
    setScreen(nextScreen);
    setMessage("");
    setOtp("");
  }

  return (
    <>
      <button
        type="button"
        className="auth-trigger"
        aria-label="Sign in or create account"
        onClick={openPopup}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="auth-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <section
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <button
              type="button"
              className="auth-close"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>

            <div className="auth-brand">HIGH STREET<span>®</span></div>

            <div className="auth-divider" />

            {screen !== "otp" ? (
              <>
                <div className="auth-banner">
                  <img
                    src="/oversized-black-tee.jpeg"
                    alt="HIGH STREET streetwear collection"
                  />
                </div>

                <p className="auth-eyebrow">
                  {screen === "signin" ? "WELCOME BACK" : "NEW HERE?"}
                </p>

                <h2 id="auth-title">
                  {screen === "signin" ? (
                    <>
                      SIGN IN
                      <br />
                      <span>TO THE STREETS.</span>
                    </>
                  ) : (
                    <>
                      CREATE
                      <br />
                      <span>YOUR ACCOUNT.</span>
                    </>
                  )}
                </h2>

                <p className="auth-description">
                  {screen === "signin"
                    ? "Enter your mobile number to continue shopping and stay updated with the latest drops."
                    : "Join the community for early access, exclusive drops and a better shopping experience."}
                </p>

                <form onSubmit={continueToOtp}>
                  {screen === "signup" && (
                    <>
                      <label className="auth-label" htmlFor="auth-name">
                        FULL NAME
                      </label>

                      <input
                        id="auth-name"
                        className="auth-text-input"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </>
                  )}

                  <label className="auth-label" htmlFor="auth-phone">
                    MOBILE NUMBER
                  </label>

                  <div className="auth-phone-input">
                    <span className="auth-country-code">
                      🇮🇳 &nbsp; +91
                    </span>

                    <input
                      id="auth-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="Enter mobile number"
                      value={phone}
                      maxLength={10}
                      onChange={(event) => {
                        setPhone(
                          event.target.value.replace(/\D/g, "").slice(0, 10)
                        );
                        setMessage("");
                      }}
                      required
                    />
                  </div>

                  <button className="auth-submit" type="submit">
                    {screen === "signin" ? "CONTINUE" : "GET OTP"}
                    <span>→</span>
                  </button>
                </form>

                <div className="auth-or">
                  <span />
                  OR
                  <span />
                </div>

                <p className="auth-switch">
                  {screen === "signin" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => changeScreen("signup")}
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => changeScreen("signin")}
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>

                <p className="auth-terms">
                  By continuing, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="auth-back"
                  onClick={() => changeScreen("signin")}
                >
                  ←
                </button>

                <p className="auth-eyebrow">ALMOST THERE</p>

                <h2 id="auth-title">
                  VERIFY
                  <br />
                  <span>YOUR NUMBER.</span>
                </h2>

                <p className="auth-description">
                  Enter the 6-digit code sent to
                  <br />
                  <strong>+91 {phone}</strong>
                </p>

                <form onSubmit={verifyOtp}>
                  <label className="auth-label" htmlFor="auth-otp">
                    VERIFICATION CODE
                  </label>

                  <input
                    id="auth-otp"
                    className="auth-otp-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="• • • • • •"
                    value={otp}
                    maxLength={6}
                    onChange={(event) => {
                      setOtp(
                        event.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setMessage("");
                    }}
                    required
                  />

                  <button className="auth-submit" type="submit">
                    VERIFY <span>→</span>
                  </button>
                </form>

                <div className="auth-resend">
                  {seconds > 0 ? (
                    <span>
                      Resend code in 00:{String(seconds).padStart(2, "0")}
                    </span>
                  ) : (
                    <button type="button" onClick={resendOtp}>
                      RESEND CODE
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="auth-back"
                  onClick={() => changeScreen("signin")}
                >
                  CHANGE MOBILE NUMBER
                </button>
              </>
            )}

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <div className="auth-footer">
              OWN YOUR STREET. OWN YOUR STORY.
            </div>
          </section>
        </div>
      )}
    </>
  );
}