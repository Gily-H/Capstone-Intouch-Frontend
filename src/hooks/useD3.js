import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function useD3(graphDrawFunction, dependencies) {
  const ref = useRef();

  useEffect(() => {
    graphDrawFunction(d3.select(ref.current));
    return () => {}; // empty cleanup
  }, dependencies);

  return ref;
}
