"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
  selector: string;
}

const ModalPortal = ({ children, selector }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (selector && children) {
      setMounted(true);
    }
    return () => setMounted(false);
  }, [selector]);
  return mounted
    ? createPortal(
        children,
        document.getElementById(selector) as HTMLDivElement
      )
    : null;
};

export default ModalPortal;
