import clsx from "clsx";
import { atom, useAtom, useSetAtom } from "jotai";
import { PropsWithChildren, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { Button } from "./Button";

const modalOpenAtom = atom<boolean>(false);

const ModalClose = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const setOpenAtom = useSetAtom(modalOpenAtom);
  return (
    <Button onClick={() => setOpenAtom(false)} {...{ className }}>
      {children}
    </Button>
  );
};
const ModalTrigger = ({ children }: PropsWithChildren) => {
  const setOpenAtom = useSetAtom(modalOpenAtom);
  return <Button onClick={() => setOpenAtom(true)}>{children}</Button>;
};

const ModalTitle = ({ children }: PropsWithChildren) => {
  return <div className="w-full text-center text-xl">{children}</div>;
};

const ModalContent = ({
  children,
  className,
  ...props
}: PropsWithChildren<{ className?: string }>) => {
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);
  const modalCotent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (openAtom && !modalCotent.current?.contains(e.target as Node))
        setOpenAtom(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [openAtom]);

  return (
    <>
      {openAtom && (
        <div className="relative w-screen h-screen">
          <div className="fixed w-screen h-screen opacity-20 bg-gray-500" />
          <div
            {...props}
            className={clsx(
              "fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-modal",
              className
            )}
            ref={modalCotent}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const ModalFooter = ({
  cancelText = "취소",
  confirmText = "확인",
  onClickConfirm = () => {
    return;
  },
  onClickClose = () => {
    return;
  },
  ...props
}) => {
  return (
    <div {...props} className="flex gap-3">
      <ModalClose>
        <Button onClick={onClickClose}>{cancelText}</Button>
      </ModalClose>
      <Button onClick={onClickConfirm}>{confirmText}</Button>
    </div>
  );
};

interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  id?: string;
}
const Modal = ({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<ModalProps>) => {
  const el = document.getElementById("modal-root");
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);

  useEffect(() => {
    setOpenAtom(!!open);
  }, [open]);

  useEffect(() => {
    onOpenChange && onOpenChange(openAtom);
  }, [openAtom]);

  return <>{el && ReactDom.createPortal(children, el)}</>;
};

Modal.Close = ModalClose;
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
Modal.Trigger = ModalTrigger;
Modal.Footer = ModalFooter;
export default Modal;
