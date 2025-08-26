"use client";

import {
  motion,
  useDragControls,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "motion/react";
import TitleBar from "../../ui/MacLike/TitleBar";
import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface MacLikeProps {
  children: ReactNode;
}

const DEFAULT_W = 720;
const DEFAULT_H = 460;
const DEFAULT_X = 80;
const DEFAULT_Y = 80;
const INSET = 16; // macOS-like margin when maximized; set 0 for true fullscreen

export default function MacLike({ children }: MacLikeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragControls = useDragControls();

  // geometry as motion values
  const x = useMotionValue(DEFAULT_X);
  const y = useMotionValue(DEFAULT_Y);
  const w = useMotionValue(DEFAULT_W);
  const h = useMotionValue(DEFAULT_H);

  // mirror width/height into state for constraints math
  const [winSize, setWinSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });

  useMotionValueEvent(w, "change", (val) =>
    setWinSize((s) => (val === s.w ? s : { ...s, w: val }))
  );
  useMotionValueEvent(h, "change", (val) =>
    setWinSize((s) => (val === s.h ? s : { ...s, h: val }))
  );

  // container size via ResizeObserver
  const [containerSize, setContainerSize] = useState({ cw: 0, ch: 0 });
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setContainerSize({ cw: rect.width, ch: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // constraints object (recomputed when container or window size changes)
  const constraints = useMemo(() => {
    const { cw, ch } = containerSize;
    const { w: ww, h: hh } = winSize;

    // If container size is unknown yet, allow some movement
    if (cw === 0 || ch === 0)
      return {
        left: -Infinity,
        right: Infinity,
        top: -Infinity,
        bottom: Infinity,
      };

    return {
      left: INSET,
      top: INSET,
      right: Math.max(INSET, cw - INSET - ww),
      bottom: Math.max(INSET, ch - INSET - hh),
    };
  }, [containerSize, winSize]);

  // clamp helper
  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  // ensure x/y always stay inside new constraints whenever constraints change
  useEffect(() => {
    const { left, right, top, bottom } = constraints;
    x.set(clamp(x.get(), left, right));
    y.set(clamp(y.get(), top, bottom));
  }, [constraints, x, y]);

  const [isMaximized, setIsMaximized] = useState(false);
  const prevRectRef = useRef({
    x: DEFAULT_X,
    y: DEFAULT_Y,
    w: DEFAULT_W,
    h: DEFAULT_H,
  });

  useLayoutEffect(() => {
    // initial clamp when everything mounts
    const { left, right, top, bottom } = constraints;
    x.set(clamp(x.get(), left, right));
    y.set(clamp(y.get(), top, bottom));
  }, []); // eslint-disable-line

  const spring = { type: "spring", bounce: 0.18, duration: 0.5 };

  const toggleMaximize = () => {
    if (!containerRef.current) return;
    const { cw, ch } = containerSize;

    if (!isMaximized) {
      // save current rect before zooming
      prevRectRef.current = { x: x.get(), y: y.get(), w: w.get(), h: h.get() };

      // animate to maximized (respect inset)
      animate(x, INSET, spring);
      animate(y, INSET, spring);
      animate(w, Math.max(0, cw - INSET * 2), spring);
      animate(h, Math.max(0, ch - INSET * 2), spring);

      setIsMaximized(true);
    } else {
      const { x: px, y: py, w: pw, h: ph } = prevRectRef.current;

      // animate back to previous rect
      animate(x, px, spring);
      animate(y, py, spring);
      animate(w, pw, spring);
      animate(h, ph, spring);

      setIsMaximized(false);
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen w-screen bg-gray-50">
      <motion.div
        // we use object constraints that update dynamically
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraints}
        dragElastic={0.1}
        dragMomentum={false}
        // turn off drag when maximized
        style={{ x, y, width: w, height: h }}
        className="absolute overflow-hidden rounded-2xl border bg-white shadow-lg will-change-transform"
      >
        <TitleBar
          onHandlePointerDown={(e) => !isMaximized && dragControls.start(e)}
          onMaximize={toggleMaximize}
          isMaximized={isMaximized}
        />
        <div className="h-[calc(100%-2.5rem)]">{children}</div>
      </motion.div>
    </div>
  );
}
