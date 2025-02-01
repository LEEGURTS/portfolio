import { forwardRef, Ref } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalContainerProps {
  children: React.ReactNode;
  onClose: () => void;
  modalType: "dialog" | "modal";
  className?: string;
  title?: string;
}

const ModalContainer: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  ModalContainerProps
> = (
  {
    children,
    onClose,
    className = "",
    modalType,
    title = "",
  }: ModalContainerProps,
  ref: Ref<HTMLDialogElement>
) => {
  return (
    <dialog
      ref={ref}
      className={
        `bg-white p-8 lg:p-16 scrollbar-none rounded-lg ${
          modalType === "dialog" ? "relative" : ""
        } ` + className
      }
      onClose={onClose}
    >
      <button
        onClick={onClose}
        className="sticky left-[calc(100%+4rem)] top-0 rounded-full bg-opacity-60 bg-black size-10 flex items-center justify-center "
      >
        <IoIosClose size={"100%"} fill="white" />
      </button>
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </dialog>
  );
};

export default forwardRef(ModalContainer);
