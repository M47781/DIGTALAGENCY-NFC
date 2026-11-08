/**
 * Order Integration Service
 * Connects the checkout form to Google Sheets and Telegram Bot
 */

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || "";
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "";

/**
 * Format order details into HTML message for Telegram
 */
function formatTelegramMessage(order) {
  return [
    `🔔 <b>NOUVELLE COMMANDE REÇUE !</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>Réf Commande :</b> <code>#${order.orderId}</code>`,
    `📦 <b>Produit :</b> ${order.productType}`,
    ...(order.customName ? [`✨ <b>Nom à graver :</b> <b>${order.customName}</b>`] : []),
    ...(order.customTitle ? [`💼 <b>Poste / Entreprise :</b> ${order.customTitle}`] : []),
    `🔢 <b>Quantité :</b> <b>${order.quantity}</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Client :</b> ${order.fullName}`,
    `📞 <b>Téléphone :</b> <a href="tel:${order.phone}">${order.phone}</a>`,
    `📍 <b>Wilaya :</b> ${order.wilaya}`,
    `🏠 <b>Commune :</b> ${order.commune}`,
    `🚚 <b>Mode :</b> ${order.deliveryMode}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `💰 <b>TOTAL À RÉGLER :</b> <b>${order.total.toLocaleString()} ${order.currency || "DZD"}</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📅 <i>Reçu le ${order.date || new Date().toLocaleString("fr-DZ")}</i>`,
  ].join("\n");
}

/**
 * Send order to Telegram directly from frontend
 */
async function sendToTelegramDirect(order) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const text = formatTelegramMessage(order);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return await res.json();
  } catch (err) {
    console.warn("Direct Telegram send failed:", err);
  }
}

/**
 * Send order to Google Apps Script Webhook (Google Sheets + Telegram)
 */
async function sendToGoogleSheet(order) {
  if (!GOOGLE_SHEET_URL) return;

  try {
    // Mode no-cors avoids Google Apps Script 302 redirect CORS issues in browsers
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  } catch (err) {
    console.warn("Google Sheet submission failed:", err);
  }
}

/**
 * Main function: dispatch order to all configured channels
 */
export async function sendOrderNotification(order) {
  const promises = [];

  if (GOOGLE_SHEET_URL) {
    promises.push(sendToGoogleSheet(order));
  }

  // If direct Telegram is configured (standalone or as extra fallback)
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    promises.push(sendToTelegramDirect(order));
  }

  if (promises.length > 0) {
    await Promise.allSettled(promises);
  }
}

