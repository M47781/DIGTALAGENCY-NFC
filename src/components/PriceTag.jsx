import React from "react";

export function PriceTag({
  amount,
  isAr = true,
  className = "",
  numClassName = "",
  curClassName = "",
}) {
  const formattedNum =
    typeof amount === "number" ? amount.toLocaleString() : amount;
  const currencyText = isAr ? "دج" : "DZD";

  return (
    <span
      dir="ltr"
      className={`inline-flex items-baseline gap-1 select-none ${className}`}
    >
      {isAr ? (
        <>
          <span className={`font-semibold ${curClassName}`}>{currencyText}</span>
          <span className={`tabular-nums ${numClassName}`}>{formattedNum}</span>
        </>
      ) : (
        <>
          <span className={`tabular-nums ${numClassName}`}>{formattedNum}</span>
          <span className={`font-semibold ${curClassName}`}>{currencyText}</span>
        </>
      )}
    </span>
  );
}
