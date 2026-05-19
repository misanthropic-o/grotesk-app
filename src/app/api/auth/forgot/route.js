import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function POST(request) {
  try {
    const { chatId, text } = await request.json();

    if (!chatId) {
      return NextResponse.json({ success: false, error: "Chat ID is required" }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ success: false, error: "Message text is required" }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      return NextResponse.json({
        success: true,
        message: `Bot not configured. Would send: ${text.substring(0, 60)}...`,
      });
    }

    const sendResp = await fetch(`${API_BASE}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const sendData = await sendResp.json();

    if (!sendData.ok) {
      return NextResponse.json({
        success: false,
        error: "Failed to send Telegram message. Make sure the bot is configured correctly.",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Message sent via Telegram.`,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }
}
