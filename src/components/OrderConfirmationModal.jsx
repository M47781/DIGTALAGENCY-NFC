import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { PriceTag } from "./PriceTag";

const WHATSAPP_PHONE = "213772136223";

export function OrderConfirmationModal({ order, onClose, isAr }) {
  if (!order) return null;

  const handleWhatsAppForward = () => {
    const lines = [
      `👋 *CONFIRMATION DE COMMANDE — Carte DIGITAL AGENCY NFC*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🆔 *Réf Commande :* #${order.orderId}`,
      `📦 *Produit :* ${order.productType}`,
      ...(order.customName ? [`✨ *Nom à graver :* ${order.customName}`] : []),
      ...(order.customTitle ? [`💼 *Titre/Entreprise :* ${order.customTitle}`] : []),
      `🔢 *Quantité :* ${order.quantity}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client :* ${order.fullName}`,
      `📞 *Téléphone :* ${order.phone}`,
      `📍 *Wilaya :* ${order.wilaya}`,
      `🏠 *Commune :* ${order.commune}`,
      `🚚 *Mode :* ${order.deliveryMode}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 *Total à régler :* ${order.total.toLocaleString()} ${order.currency || "DZD"}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Merci de m'informer de l'expédition de mon colis !`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Top Brand Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#16C9E0] via-[#8B55E8] to-[#FF08D9]"></div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-5 ${isAr ? "left-5" : "right-5"} w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success Check Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase">
              {isAr ? "تم تسجيل طلبك بنجاح" : "Commande Enregistrée"}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-gray-950 mt-1">
              {isAr ? "شكراً لثقتكم بنا !" : "Merci pour votre confiance !"}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm">
              {isAr
                ? "سيتصل بك فريقنا هاتفياً لتأكيد عنوان التسليم وشحن طلبيتك فوراً."
                : "Notre service client vous contactera par téléphone pour confirmer l'expédition de votre colis."}
            </p>
          </div>

          {/* Order Details Receipt Box */}
          <div className="my-5 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 flex flex-col gap-2 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 font-sans">
              <span className="font-bold text-gray-900">
                {isAr ? "رقم الطلب :" : "Référence :"}
              </span>
              <span className="font-mono font-extrabold text-black" dir="ltr">
                #{order.orderId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>{isAr ? "المنتج :" : "Produit :"}</span>
              <span className="font-bold text-gray-900 font-sans">{order.productType}</span>
            </div>

            {order.customName && (
              <div className="flex items-center justify-between">
                <span>{isAr ? "الاسم المطبوع :" : "Gravure :"}</span>
                <span className="font-bold text-black font-sans">{order.customName}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>{isAr ? "الكمية :" : "Quantité :"}</span>
              <span className="font-bold text-gray-900 tabular-nums" dir="ltr">{order.quantity}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>{isAr ? "رقم الهاتف :" : "Téléphone :"}</span>
              <span className="font-medium text-gray-800 font-mono" dir="ltr">{order.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>{isAr ? "الوجهة :" : "Livraison :"}</span>
              <span className="font-medium text-gray-800 font-sans">{order.wilaya} ({order.commune})</span>
            </div>

            <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-sans">
              <span className="font-bold text-gray-900">{isAr ? "المبلغ الإجمالي :" : "Total à payer :"}</span>
              <PriceTag
                amount={order.total}
                isAr={isAr}
                numClassName="text-base font-black text-gray-950 font-mono"
                curClassName="text-xs font-bold text-gray-500 font-arabic"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleWhatsAppForward}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
            >
              <img
                src="/whatsapp.png"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/whatsapp-icon.png";
                }}
                alt="WhatsApp"
                className="w-4 h-4 object-contain"
              />
              <span>
                {isAr
                  ? "تأكيد الطلب الآن عبر واتساب (تسريع الشحن)"
                  : "Accélérer l'expédition via WhatsApp"}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
            >
              {isAr ? "إغلاق" : "Fermer"}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
