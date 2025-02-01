"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ModalContainer from "./modal-container";

const ModalRouter = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <ModalContainer
      onClose={onDismiss}
      ref={dialogRef}
      modalType="modal"
      title={title}
    >
      {children}
    </ModalContainer>
  );
};

export default ModalRouter;
