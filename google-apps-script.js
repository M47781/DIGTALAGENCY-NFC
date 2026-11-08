/**
 * =========================================================================
 * GOOGLE APPS SCRIPT — LIER COMMANDES NFC VERS GOOGLE SHEETS & BOT TELEGRAM
 * =========================================================================
 * 
 * INSTRUCTIONS D'INSTALLATION EN 3 ÉTAPES FACILES :
 * 
 * 1. Créez un nouveau Google Sheet (Feuille de calcul) sur Google Drive.
 * 2. Dans le menu du haut, cliquez sur "Extensions" > "Apps Script".
 * 3. Supprimez tout le code existant dans l'éditeur et collez l'intégralité de ce fichier.
 * 4. Remplissez vos variables TELEGRAM ci-dessous (si vous utilisez le bot Telegram).
 * 5. Cliquez sur le bouton bleu "Déployer" (en haut à droite) > "Nouveau déploiement".
 *    - Type : "Application Web"
 *    - Exécuter en tant que : "Moi"
 *    - Qui a accès : "Tout le monde" (Important pour que le site puisse envoyer les commandes !)
 * 6. Cliquez sur "Déployer", accordez les autorisations Google, puis copiez l'URL de l'application Web.
 * 7. Collez cette URL dans votre fichier .env : VITE_GOOGLE_SHEET_WEBHOOK_URL="VOTRE_URL_ICI"
 * =========================================================================
 */

// ⚙️ CONFIGURATION TELEGRAM (Optionnel mais recommandé)
var TELEGRAM_BOT_TOKEN = "VOTRE_BOT_TOKEN_ICI"; // Ex: 123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
var TELEGRAM_CHAT_ID = "VOTRE_CHAT_ID_ICI";     // Ex: 987654321 ou -100xxxxxxxxxx pour un groupe

/**
 * Fonction appelée automatiquement lors d'une nouvelle commande (POST)
 */
function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // 1. Enregistrement dans le Google Sheet
    saveToSheet(data);

    // 2. Envoi de la notification au Bot Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "VOTRE_BOT_TOKEN_ICI" && TELEGRAM_CHAT_ID) {
      sendTelegramNotification(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sauvegarder la commande dans la feuille active
 */
function saveToSheet(order) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Création des en-têtes si la feuille est vide
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Date & Heure",
      "Réf Commande",
      "Nom & Prénom",
      "Téléphone",
      "Wilaya",
      "Commune",
      "Type de Carte",
      "Nom à Graver",
      "Poste / Entreprise",
      "Quantité",
      "Mode de Livraison",
      "Frais Livraison",
      "Total à Payer (DZD)"
    ]);

    // Formatage de la ligne d'en-tête (Gras, fond sombre, texte blanc)
    var headerRange = sheet.getRange(1, 1, 1, 13);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#111111");
    headerRange.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }

  // Ajout de la nouvelle commande
  sheet.appendRow([
    new Date(),
    order.orderId || "",
    order.fullName || "",
    order.phone || "",
    order.wilaya || "",
    order.commune || "",
    order.productType || "",
    order.customName || "",
    order.customTitle || "",
    order.quantity || 1,
    order.deliveryMode || "",
    order.deliveryFee || 0,
    order.total || 0
  ]);
}

/**
 * Envoyer un message formaté sur Telegram
 */
function sendTelegramNotification(order) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

  var lines = [
    "🔔 <b>NOUVELLE COMMANDE NFC !</b>",
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    "🆔 <b>Réf :</b> <code>#" + (order.orderId || "") + "</code>",
    "📦 <b>Produit :</b> " + (order.productType || ""),
    (order.customName ? "✨ <b>Nom gravé :</b> <b>" + order.customName + "</b>" : ""),
    (order.customTitle ? "💼 <b>Poste :</b> " + order.customTitle : ""),
    "🔢 <b>Quantité :</b> <b>" + (order.quantity || 1) + "</b>",
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    "👤 <b>Client :</b> " + (order.fullName || ""),
    "📞 <b>Téléphone :</b> <a href='tel:" + (order.phone || "") + "'>" + (order.phone || "") + "</a>",
    "📍 <b>Wilaya :</b> " + (order.wilaya || ""),
    "🏠 <b>Commune :</b> " + (order.commune || ""),
    "🚚 <b>Mode :</b> " + (order.deliveryMode || ""),
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    "💰 <b>TOTAL À RÉGLER :</b> <b>" + Number(order.total || 0).toLocaleString() + " DZD</b>",
    "━━━━━━━━━━━━━━━━━━━━━━━━━"
  ].filter(function(line) { return line !== ""; }).join("\n");

  var payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: lines,
    parse_mode: "HTML",
    disable_web_page_preview: true
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(url, options);
}

