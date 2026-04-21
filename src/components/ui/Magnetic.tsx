"use client";

import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useMagnetic();

  return React.cloneElement(children, {
    ref,
    style: { ...(children.props as any).style, position: "relative" },
  } as any);
}
