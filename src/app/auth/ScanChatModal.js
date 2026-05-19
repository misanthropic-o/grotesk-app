"use client";

import { useState } from "react";
import { scanChatId, completeRegistration, sendTelegramMessage } from "./authService";

export default function ScanChatModal({ telegram, password, onComplete, onCancel }) {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleCheck() {
    setScanning(true);
    setMessage(null);

    const result = await scanChatId(telegram);

    if (!result.success) {
      setMessage({ type: "error", text: result.error });
      setScanning(false);
      return;
    }

    const save = completeRegistration(telegram, password, result.chatId);

    if (!save.success) {
      setMessage({ type: "error", text: save.error });
      setScanning(false);
      return;
    }

    sendTelegramMessage(result.chatId,
      `Welcome to Grotesk! Your account has been created successfully.\n\nYou can now log in and start shopping.`
    );

    onComplete();
  }

  return (
    <div className="forgot-overlay" onClick={onCancel}>
      <div className="forgot-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="forgot-title">Verify Telegram</h2>

        <p className="forgot-desc">
          Message <strong>@groteskapp_bot</strong> on Telegram with <strong>/start</strong>,
          then click the button below to verify.
        </p>

        {message && (
          <p className={`auth-message auth-message--${message.type}`}>
            {message.text}
          </p>
        )}

        <button
          type="button"
          className="auth-submit-btn"
          onClick={handleCheck}
          disabled={scanning}
        >
          {scanning ? "Checking..." : "Check"}
        </button>

        <button
          type="button"
          className="forgot-cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
