"use client";

import { useState } from "react";
import { requestResetCode, verifyResetCode, resetPassword, sendTelegramMessage } from "./authService";

export default function ForgotModal({ telegram: initialTelegram, onClose, onReset }) {
  const [step, setStep] = useState("telegram");
  const [tgInput, setTgInput] = useState(initialTelegram || "");
  const [storedCode, setStoredCode] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleTelegramSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const result = requestResetCode(tgInput);
    if (!result.success) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    setStoredCode(result.code);

    const sendResult = await sendTelegramMessage(result.chatId,
      `Your Grotesk password reset code:\n\n${result.code}\n\nThis code expires in 15 minutes.`
    );

    if (!sendResult.success) {
      setMessage({ type: "error", text: sendResult.error + " But the code was generated — you can still proceed if you received it." });
    }

    setStep("verify");
  }

  function handleVerify(e) {
    e.preventDefault();
    setMessage(null);

    const result = verifyResetCode(tgInput, code);
    if (!result.success) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    setStep("reset");
    setMessage(null);
  }

  function handleReset(e) {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    const result = resetPassword(tgInput, storedCode, newPassword);
    if (!result.success) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    onReset();
    onClose();
  }

  return (
    <div className="forgot-overlay" onClick={onClose}>
      <div className="forgot-card" onClick={(e) => e.stopPropagation()}>
        {step === "telegram" && (
          <form onSubmit={handleTelegramSubmit}>
            <h2 className="forgot-title">Reset Password</h2>
            <p className="forgot-desc">
              Enter your Telegram username to receive a reset code.
            </p>

            <label className="auth-input-group">
              <span className="auth-input-label">Telegram *</span>
              <input
                type="text"
                className="auth-input"
                placeholder="@username"
                value={tgInput}
                onChange={(e) => setTgInput(e.target.value)}
              />
            </label>

            {message && (
              <p className={`auth-message auth-message--${message.type}`}>
                {message.text}
              </p>
            )}

            <button type="submit" className="auth-submit-btn">Send Code</button>

            <button
              type="button"
              className="forgot-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerify}>
            <h2 className="forgot-title">Reset Password</h2>
            <p className="forgot-desc">
              A verification code was sent to @{tgInput.replace(/^@/, "")}. Enter it below.
            </p>

            <label className="auth-input-group">
              <span className="auth-input-label">Verification Code *</span>
              <input
                type="text"
                className="auth-input"
                placeholder="Enter the 32-character code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>

            {message && (
              <p className={`auth-message auth-message--${message.type}`}>
                {message.text}
              </p>
            )}

            <button type="submit" className="auth-submit-btn">Verify</button>

            <button
              type="button"
              className="forgot-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleReset}>
            <h2 className="forgot-title">New Password</h2>
            <p className="forgot-desc">Choose a new password for your account.</p>

            <label className="auth-input-group">
              <span className="auth-input-label">New Password *</span>
              <div className="auth-password-wrapper">
                <input
                  type={showNewPw ? "text" : "password"}
                  className="auth-input"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowNewPw(!showNewPw)}
                  aria-label={showNewPw ? "Hide password" : "Show password"}
                >
                  {showNewPw ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            <label className="auth-input-group">
              <span className="auth-input-label">Confirm New Password *</span>
              <div className="auth-password-wrapper">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  className="auth-input"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConfirmPw(!showConfirmPw)}
                  aria-label={showConfirmPw ? "Hide password" : "Show password"}
                >
                  {showConfirmPw ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {message && (
              <p className={`auth-message auth-message--${message.type}`}>
                {message.text}
              </p>
            )}

            <button type="submit" className="auth-submit-btn">Reset Password</button>

            <button
              type="button"
              className="forgot-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
