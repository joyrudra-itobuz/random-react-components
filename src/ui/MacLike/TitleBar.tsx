"use client";

import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

const BTN =
  "text-white rounded-full p-1 hover:brightness-95 transition duration-200 cursor-pointer";

interface TitleBarProps {
  onHandlePointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

export default function TitleBar({
  onHandlePointerDown,
  onMaximize,
  isMaximized,
}: TitleBarProps) {
  return (
    <div
      className="h-10 bg-gray-100 flex items-center justify-between px-2 cursor-move select-none"
      onPointerDown={onHandlePointerDown}
      style={{ touchAction: "none" }}
    >
      <div className="flex gap-1">
        {/* Prevent clicks on buttons from starting a drag */}
        <button
          className={`bg-red-500 ${BTN}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            /* close behavior is app-specific */
          }}
          aria-label="Close"
          title="Close"
        >
          <IoMdClose />
        </button>

        <button
          className={`bg-yellow-500 ${BTN}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            /* implement minimize if you want */
          }}
          aria-label="Minimize"
          title="Minimize"
        >
          <FiMinimize2 />
        </button>

        <button
          className={`bg-green-500 ${BTN}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onMaximize?.();
          }}
          aria-label={isMaximized ? "Restore" : "Maximize"}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          <FiMaximize2 />
        </button>
      </div>

      {/* Optional window title */}
      <div className="text-sm text-gray-600 pr-2 select-none">Untitled</div>
    </div>
  );
}
