"use client";

import { Button } from "@components/Button";
import Modal from "@components/Modal";
import { useAtom, useAtomValue } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import React, { useMemo } from "react";

interface GlobalModalState {
  contents: React.ReactNode;
  button?: React.ReactNode;
}

const ModalAtom = atomWithReset<GlobalModalState>({
  contents: null,
});

export function useGlobalModal() {
  const [modalState, setModalState] = useAtom(ModalAtom);
  const resetState = useResetAtom(ModalAtom);
  return useMemo(
    () => ({ modalState, setModalState, resetState }),
    [modalState, setModalState, resetState]
  );
}

export default function GlobalModal() {
  const modalData = useAtomValue(ModalAtom);
  const modalReset = useResetAtom(ModalAtom);
  return (
    <Modal open={!!modalData.contents} onOpenChange={modalReset}>
      <Modal.Content className="w-80 z-50 !p-0 ">
        <div className="py-10 text-center text-xl leading-[26px] text-grey-700 border-b border-grey-50">
          {modalData.contents}
        </div>
        <div className="flex justify-between [&>*]:flex-1  [&>*]:h-[63px]">
          <Modal.Close>
            <Button className="btn-grey-border border-none rounded-none rounded-bl-xl">
              확인
            </Button>
          </Modal.Close>
          {modalData.button}
        </div>
      </Modal.Content>
    </Modal>
  );
}