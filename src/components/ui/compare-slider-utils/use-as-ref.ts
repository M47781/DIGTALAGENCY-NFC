import * as React from "react";

export function useAsRef<T>(data: T) {
  const ref = React.useRef(data);
  ref.current = data;
  return ref;
}
