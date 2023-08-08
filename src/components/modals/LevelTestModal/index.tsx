import clsx from "clsx";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import Prev from "public/assets/icons/left.svg";
import { useMemo } from "react";
import Modal from "@components/modals";
import { DEVICE_ITEMS, LEVEL, SW_ITEMS } from "./constants";
import Image from "next/image";
import Button from "@components/Button";

interface Items {
  [key: string]: { value: string; isSelected: boolean };
}
const modalOpenAtom = atom<boolean>(false);
modalOpenAtom.debugLabel = "levelTestModalAtom";
const levelAtom = atomWithReset<number>(0);
levelAtom.debugLabel = "levelAtom";
const deviceItemsAtom = atomWithReset<Items>(DEVICE_ITEMS);
deviceItemsAtom.debugLabel = "deviceItemsAtom";
const swItemsAtom = atomWithReset<Items>(SW_ITEMS);
swItemsAtom.debugLabel = "swItemsAtom";

const LevelTestModal = () => {
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);
  const level = useAtomValue(levelAtom);
  const resetLevel = useResetAtom(levelAtom);
  const resetDevice = useResetAtom(deviceItemsAtom);
  const resetSw = useResetAtom(swItemsAtom);

  return (
    <Modal
      open={openAtom}
      onOpenChange={(open) => {
        setOpenAtom(open);
        if (!open) {
          resetLevel();
          resetDevice();
          resetSw();
        }
      }}
    >
      {level === 0 ? (
        <LevelTestModal.TestCotent />
      ) : (
        <LevelTestModal.ResultCotent />
      )}
    </Modal>
  );
};

const LevelTestContent = () => {
  const [deviceItems, setDeivceItems] = useAtom(deviceItemsAtom);
  const [swItems, setSwItems] = useAtom(swItemsAtom);
  const setLevel = useSetAtom(levelAtom);

  const seletedCount = useMemo(() => {
    return (
      Object.values(deviceItems).filter((item) => item.isSelected).length +
      Object.values(swItems).filter((item) => item.isSelected).length
    );
  }, [deviceItems, swItems]);

  return (
    <Modal.Content className="w-[550px] h-[75%] flex flex-col py-10 px-8 max-h-[581px]">
      <Modal.Close className="absolute z-10 cursor-pointer">
        <Prev />
      </Modal.Close>
      <Modal.Title>
        <div className="text-center">
          싱크루 테스트로 서비스의
          <br /> 첫 걸음을 내딛어보세요!
        </div>
      </Modal.Title>
      <div className="flex flex-col mt-[60px] flex-1 px-3 overflow-auto">
        <div className="flex flex-col mb-3 flex-1">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-lg font-medium">
                다음 중 어떤 디지털 기기를 주로
                <br /> 사용하시나요? (여러개 선택 가능해요)
              </span>
              <div className="flex gap-3">
                {Object.keys(deviceItems).map((key) => (
                  <Button
                    key={key}
                    onClick={() =>
                      setDeivceItems((p) => ({
                        ...p,
                        [key]: {
                          ...deviceItems[key],
                          isSelected: !deviceItems[key].isSelected,
                        },
                      }))
                    }
                    className={clsx(
                      "h-[33px] w-[116px] !py-0 rounded-full",
                      deviceItems[key].isSelected
                        ? "btn-orange-border"
                        : "btn-grey-border "
                    )}
                  >
                    {deviceItems[key].value}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-lg font-medium">
                다음 중 가장 익숙한 소프트웨어나
                <br /> 앱은 무엇인가요? (여러개 선택 가능해요)
              </span>
              <div className="flex gap-3">
                {Object.keys(swItems).map((key) => (
                  <Button
                    key={key}
                    onClick={() =>
                      setSwItems((p) => ({
                        ...p,
                        [key]: {
                          ...swItems[key],
                          isSelected: !swItems[key].isSelected,
                        },
                      }))
                    }
                    className={clsx(
                      "h-[33px] w-[116px] !py-0 rounded-full",
                      swItems[key].isSelected
                        ? "btn-orange-border"
                        : "btn-grey-border "
                    )}
                  >
                    {swItems[key].value}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button
          className="btn-orange"
          disabled={seletedCount === 0}
          onClick={() => setLevel(Math.floor((seletedCount + 1) / 2))}
        >
          테스트 결과 보기
        </Button>
      </div>
    </Modal.Content>
  );
};
LevelTestModal.TestCotent = LevelTestContent;

const LevelResultContent = () => {
  const [level, setLevel] = useAtom(levelAtom);

  return (
    <Modal.Content className="w-[550px] h-[75%] flex flex-col py-10 px-8">
      <Button
        className="absolute z-10 cursor-pointer !p-0"
        onClick={() => setLevel(0)}
      >
        <Prev />
      </Button>
      <Modal.Title>
        <div className="text-center">싱크루 테스트 결과</div>
      </Modal.Title>
      <div className="flex flex-col mt-[60px] flex-1 px-3 overflow-auto">
        <div className="flex flex-col items-center gap-6 flex-1">
          <span className="text-xl font-medium text-center">
            싱크루 테스트 결과는
            <br />
            <span className="text-orange">{LEVEL[level - 1].value}</span>이에요
          </span>
          <Image
            src={`/assets/illusts/level_${level}.svg`}
            alt="레벨 일러스트"
            loading="eager"
            width={300}
            height={300}
          />
          <span className="text-lg font-medium text-center">
            테스트 결과,
            <br />
            {LEVEL[level - 1].text}
          </span>
        </div>
        <Modal.Close className="btn-orange">
          <Button className="btn-orange">확인</Button>
        </Modal.Close>
      </div>
    </Modal.Content>
  );
};
LevelTestModal.ResultCotent = LevelResultContent;

const LevelTestModalTrigger = ({ className }: { className?: string }) => {
  const setOpenAtom = useSetAtom(modalOpenAtom);
  return (
    <Button
      onClick={() => setOpenAtom(true)}
      className={clsx("btn-blue font-medium", className)}
    >
      신청 전 테스트 시작
    </Button>
  );
};
LevelTestModal.Trigger = LevelTestModalTrigger;
export default LevelTestModal;
