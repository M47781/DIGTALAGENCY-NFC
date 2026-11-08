/**
 * =========================================================================
 * GOOGLE APPS SCRIPT — LIER COMMANDES NFC VERS GOOGLE SHEETS & BOT TELEGRAM
 * =========================================================================
 * 
 * Ce script permet de :
 * 1. Enregistrer automatiquement chaque commande dans votre Google Sheet
 * 2. Envoyer une notification instantanée avec les détails sur votre Telegram
 * 
 * -------------------------------------------------------------------------
 * CONFIGURATION DU BOT TELEGRAM (2 variables à renseigner ci-dessous) :
 * -------------------------------------------------------------------------
 */

// 1. Token de votre bot Telegram (obtenu auprès de @BotFather)
var TELEGRAM_BOT_TOKEN = "9095183268:AAEyBlxi9ptyFRug5RfZWlTLSYmIPm8_O5Q";

// 2. Chat ID de votre compte ou de votre groupe Telegram (obtenu via @userinfobot)
var TELEGRAM_CHAT_ID = "6162329381";


/**
 * Test simple : Ouvrir l'URL dans le navigateur pour vérifier que le script fonctionne
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Google Apps Script Web App est opérationnel et prêt à recevoir les commandes !"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fonction appelée automatiquement par le site web lors d'une commande
 */
function doPost(e) {
  try {
    var data = null;

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (!data) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Aucune donnée reçue"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Sauvegarde dans Google Sheets
    saveToSheet(data);

    // 2. Envoi de l'alerte sur Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== "VOTRE_BOT_TOKEN_ICI" && TELEGRAM_CHAT_ID && TELEGRAM_CHAT_ID !== "VOTRE_CHAT_ID_ICI") {
      sendTelegramNotification(data);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      orderId: data.orderId || ""
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sauvegarder la commande dans la feuille Google Sheet active
 */
function saveToSheet(order) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Création des en-têtes si la feuille est vide
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Date & Heure",
      "Réf Commande",
      "Nom & Prénom",
      "Téléphone",
      "Wilaya",
      "Commune",
      "Modèle Carte",
      "Nom Gravé",
      "Poste / Société",
      "Quantité",
      "Mode Livraison",
      "Frais Livraison",
      "Total à Payer (DZD)"
    ];
    sheet.appendRow(headers);

    // Style moderne pour l'en-tête (Gras, fond noir, texte blanc)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#111111");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  // Formatage de la date locale algérienne (GMT+1)
  var dateStr = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss");

  // Ajout de la commande
  sheet.appendRow([
    dateStr,
    order.orderId || "",
    order.fullName || "",
    "'" + (order.phone || ""), // Apostrophe pour conserver le 0 initial du numéro de téléphone
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

  // Aligner les cellules
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, 13).setHorizontalAlignment("center");
}

/**
 * Envoyer un message Telegram compact et minimisé (Uniquement les informations principales)
 */
function sendTelegramNotification(order) {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

  var deliveryShort = (order.deliveryMode || "").indexOf("Domicile") !== -1 ? "À Domicile" : "Stop Desk";

  var lines = [
    "🔔 <b>Commande #" + (order.orderId || "N/A") + "</b>",
    "👤 <b>Client :</b> " + (order.fullName || "N/A"),
    "📞 <b>Tél :</b> <a href='tel:" + (order.phone || "") + "'>" + (order.phone || "") + "</a>",
    "📍 <b>Adresse :</b> " + (order.wilaya || "") + " (" + (order.commune || "") + ")",
    "🚚 <b>Mode :</b> " + deliveryShort,
    "📦 <b>Produit :</b> " + (order.productType || "") + " (x" + (order.quantity || 1) + ")",
    (order.customName ? "✨ <b>Gravure :</b> " + order.customName : ""),
    "💰 <b>Total :</b> <b>" + Number(order.total || 0).toLocaleString() + " DZD</b>"
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

/**
 * 🧪 FONCTION DE TEST (Exécutable directement dans Apps Script pour vérifier Telegram)
 * Cliquez sur "testNotification" dans la barre d'outils puis cliquez sur "Exécuter"
 */
function testNotification() {
  sendTelegramNotification({
    orderId: "TEST-001",
    productType: "Standard (2,800 DZD)",
    fullName: "Client Test",
    phone: "0555123456",
    wilaya: "Alger",
    commune: "Alger Centre",
    deliveryMode: "À Domicile (48h)",
    quantity: 1,
    total: 3250
  });
}
