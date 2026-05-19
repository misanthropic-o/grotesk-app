import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

function normalizeTelegram(username) {
  return username.replace(/^@/, "").toLowerCase().trim();
}

export async function POST(request) {
  try {
    const { telegram } = await request.json();
    const tg = normalizeTelegram(telegram);

    if (!tg) {
      return NextResponse.json({ success: false, error: "Telegram username is required" }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      return NextResponse.json({ success: false, error: "Bot token not configured. Set TELEGRAM_BOT_TOKEN in your environment." }, { status: 500 });
    }

    const resp = await fetch(`${API_BASE}/getUpdates`, { cache: "no-store" });
    if (!resp.ok) {
      return NextResponse.json({ success: false, error: "Failed to contact Telegram API." }, { status: 502 });
    }

    const data = await resp.json();
    if (!data.ok || !data.result) {
      return NextResponse.json({ success: false, error: "Invalid response from Telegram API." }, { status: 502 });
    }

    for (const update of data.result) {
      const chat = update.message?.chat || update.my_chat_member?.chat || update.channel_post?.chat;
      if (!chat) continue;

      if (chat.username && chat.username.toLowerCase() === tg) {
        return NextResponse.json({ success: true, chatId: chat.id });
      }
    }

    return NextResponse.json({
      success: false,
      error: `Could not find a chat with @${tg}. Make sure you message @groteskapp_bot on Telegram first, then try again.`,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Something went wrong. Try again later." }, { status: 500 });
  }
}
