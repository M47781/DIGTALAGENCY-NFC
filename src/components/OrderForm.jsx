import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Truck,
  Building2,
  Check,
  Package,
  Globe,
  CreditCard,
  ChevronsUpDown,
  AlertCircle,
} from "lucide-react";
import { WILAYAS } from "../data/wilayas";
import { PriceTag } from "./PriceTag";
import { sendOrderNotification } from "../services/orderService";

const WHATSAPP_PHONE = "213772136223";

export function OrderForm({
  selectedType,
  customName,
  customTitle,
  onOrderSuccess,
  isAr,
}) {
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWilayaCode, setSelectedWilayaCode] = useState("16"); // Default: Alger
  const [commune, setCommune] = useState("");
  const [customCommuneInput, setCustomCommuneInput] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("home"); // "home" | "desk"
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculations
  const unitPrice = selectedType === "standard" ? 2800 : 4000;
  const subtotal = unitPrice * quantity;

  // Selected wilaya
  const currentWilaya =
    WILAYAS.find((w) => w.code === selectedWilayaCode) || WILAYAS[15];

  // Reset or initialize commune when wilaya changes
  useEffect(() => {
    if (currentWilaya.communes && currentWilaya.communes.length > 0) {
      setCommune(currentWilaya.communes[0]);
    } else {
      setCommune("");
    }
    setCustomCommuneInput("");
  }, [selectedWilayaCode]);

  // Delivery fee: FREE only for customers ordering 5+ cards!
  const isFreeDelivery = quantity >= 5;
  const rawDeliveryFee =
    deliveryMode === "home" ? currentWilaya.homeFee : currentWilaya.deskFee;
  const deliveryFee = isFreeDelivery ? 0 : rawDeliveryFee;

  const total = subtotal + deliveryFee;

  // Quantity handlers
  const decQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incQty = () => setQuantity((q) => q + 1);

  // Phone number input
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    if (raw.length <= 10) {
      setPhone(raw);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg(isAr ? "يرجى كتابة الاسم واللقب" : "Veuillez renseigner votre Nom & Prénom");
      return;
    }

    if (!phone || phone.length < 9) {
      setErrorMsg(
        isAr
          ? "يرجى كتابة رقم هاتف صحيح (05/06/07...)"
          : "Veuillez renseigner un numéro de téléphone valide (05/06/07...)"
      );
      return;
    }

    const finalCommune = commune === "AUTRE" ? customCommuneInput.trim() : commune.trim();
    if (!finalCommune) {
      setErrorMsg(
        isAr
          ? "يرجى كتابة أو تحديد البلدية"
          : "Veuillez renseigner votre commune de livraison"
      );
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      orderId: `DA-${Date.now().toString().slice(-6)}`,
      productType: selectedType === "standard"
        ? isAr ? "Standard (دج 2,800)" : "Standard (2,800 DZD)"
        : isAr ? "مخصصة (دج 4,000)" : "Personnalisée (4,000 DZD)",
      customName: customName || fullName,
      customTitle: customTitle || "",
      quantity,
      fullName: fullName.trim(),
      phone,
      wilaya: isAr ? currentWilaya.nameAr : currentWilaya.name,
      commune: finalCommune,
      deliveryMode: deliveryMode === "home" ? "À Domicile (48h-72h)" : "Bureau Stop Desk",
      subtotal,
      deliveryFee,
      total,
      currency: isAr ? "دج" : "DZD",
      date: new Date().toLocaleDateString(isAr ? "ar-DZ" : "fr-DZ"),
    };

    try {
      await sendOrderNotification(orderData);
    } catch (err) {
      console.warn("Notification error:", err);
    } finally {
      setIsSubmitting(false);
      onOrderSuccess(orderData);
    }
  };

  // WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    const productLabel =
      selectedType === "standard" ? "Standard NFC (2,800 DZD)" : "Personnalisée NFC (4,000 DZD)";
    const deliveryLabel = deliveryMode === "home" ? "À Domicile (48h)" : "Bureau Stop Desk";
    const finalCommune = commune === "AUTRE" ? customCommuneInput.trim() : commune.trim();

    const lines = [
      `👋 *NOUVELLE COMMANDE Carte DIGITAL AGENCY NFC — DIGITAL AGENCY*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 *Produit :* ${productLabel}`,
      ...(selectedType === "personalized" && customName ? [`✨ *Nom à graver :* ${customName}`] : []),
      ...(selectedType === "personalized" && customTitle ? [`💼 *Titre/Entreprise :* ${customTitle}`] : []),
      `🔢 *Quantité :* ${quantity}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client :* ${fullName || "À préciser"}`,
      `📞 *Téléphone :* ${phone || "À préciser"}`,
      `📍 *Wilaya :* ${currentWilaya.name}`,
      `🏠 *Commune :* ${finalCommune || "À préciser"}`,
      `🚚 *Mode :* ${deliveryLabel}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 *Total à la livraison :* ${total.toLocaleString()} DZD`,
      ...(isFreeDelivery ? [`🎁 *LIVRAISON OFFERTE (Offre spéciale 5+ cartes)*`] : []),
    ];

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
  };

  return (
    <div
      id="commander"
      className="w-full bg-white rounded-3xl border-2 border-black p-4 sm:p-5.5 shadow-sm flex flex-col gap-3.5 sm:gap-4"
    >
      {/* Header Row: Title & Quantity Stepper */}
      <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-950 tracking-tight">
            {isAr ? "الطلب" : "Commander"}
          </h3>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {isAr ? "جميع الحقول مطلوبة." : "Tous les champs sont obligatoires."}
          </p>
        </div>

        {/* Quantity Stepper (Explicit LTR to keep Minus on left and Plus on right) */}
        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-2xs" dir="ltr">
          <button
            type="button"
            onClick={decQty}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-semibold transition-colors active:bg-gray-200"
            aria-label="Diminuer la quantité"
          >
            –
          </button>
          <span className="w-9 sm:w-10 text-center font-bold text-sm text-gray-900 select-none tabular-nums font-mono">
            {quantity}
          </span>
          <button
            type="button"
            onClick={incQty}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-semibold transition-colors active:bg-gray-200"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      {/* Remarque Livraison Gratuite (Seulement plus de 5 cartes) */}
      <div
        className={`flex items-start gap-2.5 p-3 rounded-2xl text-xs font-semibold transition-all shadow-2xs ${
          isFreeDelivery
            ? "bg-emerald-50 border border-emerald-300 text-emerald-950"
            : "bg-amber-50/90 border border-amber-200 text-amber-950"
        }`}
      >
        {isFreeDelivery ? (
          <>
            <span className="relative flex h-3 w-3 mt-0.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-extrabold text-[13px] text-emerald-800">
                {isAr ? "🎉 ملاحظة: التوصيل مجاني لطلبك!" : "🎉 Remarque : Livraison 100% offerte !"}
              </span>
              <span className="text-[11px] text-emerald-700 font-normal">
                {isAr
                  ? "مبروك! استفدت من الشحن المجاني لأنك طلبت أكثر من 5 بطاقات."
                  : "Félicitations ! Vous profitez de la livraison gratuite (commande de plus de 5 cartes)."}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-extrabold text-[13px] text-amber-950">
                {isAr ? "📌 ملاحظة:" : "📌 Remarque :"}
              </span>
              <span className="text-[11px] text-amber-900 font-medium leading-relaxed">
                {isAr
                  ? `التوصيل مجاني فقط عند طلب أكثر من 5 بطاقات (متبقي لك ${5 - quantity} ${5 - quantity === 1 ? "بطاقة" : "بطاقات"} للاستفادة من التوصيل المجاني).`
                  : `La livraison est gratuite uniquement pour les commandes de plus de 5 cartes (${5 - quantity} restante${5 - quantity > 1 ? "s" : ""} pour en bénéficier).`}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* Nom & Prénom */}
        <div>
          <label htmlFor="order-fullName" className="block text-xs font-bold text-gray-800 mb-1">
            {isAr ? "الاسم واللقب" : "Nom & Prénom"}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isAr ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <User className="w-4 h-4" />
            </div>
            <input
              id="order-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isAr ? "الاسم الكامل الخاص بك" : "Votre nom complet"}
              className={`w-full ${isAr ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all bg-white`}
            />
          </div>
        </div>

        {/* Numéro de téléphone (Clean LTR isolated input) */}
        <div>
          <label htmlFor="order-phone" className="block text-xs font-bold text-gray-800 mb-1">
            {isAr ? "رقم الهاتف" : "Numéro de téléphone"}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isAr ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="order-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              dir="ltr"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="05XXXXXXXX"
              className={`w-full ${isAr ? "pr-10 pl-3.5 text-right" : "pl-10 pr-3.5 text-left"} py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all bg-white font-mono tracking-wider`}
            />
          </div>
        </div>

        {/* Wilaya Selector */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1">
            {isAr ? "الولاية" : "Wilaya"}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isAr ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedWilayaCode}
              onChange={(e) => setSelectedWilayaCode(e.target.value)}
              className={`w-full ${isAr ? "pr-10 pl-10" : "pl-10 pr-10"} py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all bg-white appearance-none cursor-pointer`}
            >
              {WILAYAS.map((w) => (
                <option key={w.code} value={w.code}>
                  {isAr ? w.nameAr : w.name}
                </option>
              ))}
            </select>
            <div className={`absolute inset-y-0 ${isAr ? "left-0 pl-3.5" : "right-0 pr-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <ChevronsUpDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Mode de livraison (1 Ligne avec 2 Colonnes) */}
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-1.5">
            {isAr ? "طريقة التوصيل" : "Mode de livraison"}
          </label>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* Option 1: À Domicile */}
            <div
              onClick={() => setDeliveryMode("home")}
              className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 select-none ${deliveryMode === "home"
                ? "border-[#FF08D9] bg-[#FF08D9]/5 shadow-2xs"
                : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${deliveryMode === "home" ? "bg-[#FF08D9] text-white" : "bg-gray-100 text-gray-500"}`}>
                  <Truck className="w-4 h-4" />
                </div>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${deliveryMode === "home" ? "bg-[#FF08D9] border-[#FF08D9] text-white" : "border-gray-300 bg-white"}`}>
                  {deliveryMode === "home" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-950 leading-tight">
                  {isAr ? "لباب المنزل" : "À Domicile"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                  {isAr ? "توصيل للعنوان (48h-72h)" : "Livraison 48h-72h"}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between" dir="ltr">
                <span className="text-xs font-bold text-gray-900">
                  {isFreeDelivery ? (
                    <span className="text-emerald-600 font-extrabold">{isAr ? "مجاني" : "Offert"}</span>
                  ) : (
                    <PriceTag
                      amount={currentWilaya.homeFee}
                      isAr={isAr}
                      numClassName="font-mono text-xs sm:text-sm font-bold"
                      curClassName="font-arabic text-[11px]"
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Option 2: Bureau (Stop Desk) */}
            <div
              onClick={() => setDeliveryMode("desk")}
              className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 select-none ${deliveryMode === "desk"
                ? "border-[#FF08D9] bg-[#FF08D9]/5 shadow-2xs"
                : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${deliveryMode === "desk" ? "bg-[#FF08D9] text-white" : "bg-gray-100 text-gray-500"}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${deliveryMode === "desk" ? "bg-[#FF08D9] border-[#FF08D9] text-white" : "border-gray-300 bg-white"}`}>
                  {deliveryMode === "desk" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-950 leading-tight">
                  {isAr ? "مكتب التوصيل" : "Stop Desk"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                  {isAr ? "الاستلام من المكتب" : "Au bureau proche"}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between" dir="ltr">
                <span className="text-xs font-bold text-gray-900">
                  {isFreeDelivery ? (
                    <span className="text-emerald-600 font-extrabold">{isAr ? "مجاني" : "Offert"}</span>
                  ) : (
                    <PriceTag
                      amount={currentWilaya.deskFee}
                      isAr={isAr}
                      numClassName="font-mono text-xs sm:text-sm font-bold"
                      curClassName="font-arabic text-[11px]"
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Commune Selector */}
        <div>
          <label htmlFor="order-commune" className="block text-xs font-bold text-gray-800 mb-1.5">
            {isAr
              ? deliveryMode === "home"
                ? "البلدية (عنوان التوصيل)"
                : "البلدية (مكتب الاستلام)"
              : deliveryMode === "home"
                ? "Commune (Adresse de livraison)"
                : "Commune (Bureau de retrait)"}
          </label>
          <div className="relative">
            <div className={`absolute inset-y-0 ${isAr ? "right-0 pr-3.5" : "left-0 pl-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <MapPin className="w-4 h-4" />
            </div>

            {currentWilaya.communes && currentWilaya.communes.length > 0 ? (
              <select
                id="order-commune"
                name="commune"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className={`w-full ${isAr ? "pr-10 pl-10" : "pl-10 pr-10"} py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all bg-white appearance-none cursor-pointer`}
              >
                {currentWilaya.communes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="AUTRE">
                  {isAr ? "— بلدية أخرى (كتابة يدوية) —" : "— Autre commune (saisie libre) —"}
                </option>
              </select>
            ) : (
              <input
                type="text"
                required
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                placeholder={isAr ? "اكتب اسم بلديتك" : "Sélectionner la commune"}
                className={`w-full ${isAr ? "pr-10 pl-10" : "pl-10 pr-10"} py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all bg-white`}
              />
            )}

            <div className={`absolute inset-y-0 ${isAr ? "left-0 pl-3.5" : "right-0 pr-3.5"} flex items-center pointer-events-none text-gray-400`}>
              <ChevronsUpDown className="w-4 h-4" />
            </div>
          </div>

          {/* Saisie libre si "AUTRE" est sélectionné */}
          {commune === "AUTRE" && (
            <input
              type="text"
              required
              value={customCommuneInput}
              onChange={(e) => setCustomCommuneInput(e.target.value)}
              placeholder={isAr ? "أدخل اسم بلديتك بالتحديد" : "Précisez votre commune de résidence"}
              className="mt-2 w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] bg-white"
            />
          )}
        </div>

        {/* Pricing Summary Box (Proper Currency Formatting) */}
        <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/80 flex flex-col gap-2.5 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-700">
              <Truck className="w-3.5 h-3.5 text-gray-400" />
              <span>{isAr ? "رسوم التوصيل" : "Livraison"}</span>
            </span>
            <span className="font-semibold text-gray-900">
              {isFreeDelivery ? (
                <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                  <span>{isAr ? "مجانية" : "Offerte"}</span>
                  <span>(</span>
                  <PriceTag amount={0} isAr={isAr} numClassName="font-mono" curClassName="font-arabic" />
                  <span>)</span>
                </span>
              ) : (
                <PriceTag
                  amount={deliveryFee}
                  isAr={isAr}
                  numClassName="font-mono"
                  curClassName="font-arabic"
                />
              )}
            </span>
          </div>

          {/* Note de livraison dans le résumé */}
          <div className={`py-1.5 px-2.5 rounded-xl border text-[11px] flex items-center gap-1.5 ${
            isFreeDelivery
              ? "bg-emerald-50/80 border-emerald-200 text-emerald-800 font-semibold"
              : "bg-gray-100/70 border-gray-200 text-gray-600"
          }`}>
            <span className="font-extrabold text-gray-900">
              {isAr ? "ملاحظة :" : "Remarque :"}
            </span>
            <span>
              {isFreeDelivery
                ? (isAr ? "تم تفعيل التوصيل المجاني لطلبك (أكثر من 5 بطاقات) 🎉" : "Livraison offerte activée pour votre commande (5+ cartes) 🎉")
                : (isAr ? `التوصيل مجاني فقط عند طلب أكثر من 5 بطاقات (متبقي ${5 - quantity})` : `Livraison gratuite uniquement à partir de 5 cartes (${5 - quantity} restante${5 - quantity > 1 ? "s" : ""})`)}
            </span>
          </div>

          <div className="pt-2.5 border-t border-gray-200/80 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-extrabold text-gray-950">{isAr ? "المجموع الكلي" : "Total"}</span>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {isAr ? "شامل مصاريف الشحن" : "Hors frais de livraison"}
              </p>
            </div>
            <div>
              <PriceTag
                amount={total}
                isAr={isAr}
                numClassName="text-2xl font-black text-gray-950 font-mono"
                curClassName="text-xs font-bold text-gray-500 font-arabic"
              />
            </div>
          </div>
        </div>

        {/* Big Brand CTA Button: Confirmer la commande */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#FF08D9] hover:bg-[#e007bf] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF08D9]/25 active:scale-[0.99] transition-all disabled:opacity-70"
        >
          <Package className="w-5 h-5 text-white/90" />
          <span>
            {isSubmitting
              ? isAr
                ? "جاري تأكيد الطلب..."
                : "Confirmation en cours..."
              : isAr
                ? "تأكيد الطلب الآن"
                : "Confirmer la commande"}
          </span>
        </button>

        {/* WhatsApp Direct Order Button */}
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
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
              ? "أو اطلب فوراً عبر واتساب (WhatsApp)"
              : "Commander directement via WhatsApp"}
          </span>
        </button>

      </form>

      {/* 3 Value Trust Cards (Matching Reference Layout) */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
        {/* Service Local */}
        <div className="p-3 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col items-center justify-center">
          <Globe className="w-4 h-4 text-gray-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 leading-tight">
            {isAr ? "خدمة محلية" : "Service Local"}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5">
            {isAr ? "100% جزائري" : "100% Algérien"}
          </span>
        </div>

        {/* Livraison 48h */}
        <div className="p-3 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col items-center justify-center">
          <Truck className="w-4 h-4 text-gray-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 leading-tight">
            {isAr ? "توصيل 48h" : "Livraison 48h"}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5">
            {isAr ? "شحن سريع" : "Expédition rapide"}
          </span>
        </div>

        {/* Paiement */}
        <div className="p-3 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col items-center justify-center">
          <CreditCard className="w-4 h-4 text-gray-700 mb-1" />
          <span className="text-xs font-bold text-gray-900 leading-tight">
            {isAr ? "الدفع" : "Paiement"}
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5">
            {isAr ? "عند الاستلام" : "À la livraison"}
          </span>
        </div>
      </div>

    </div>
  );
}
