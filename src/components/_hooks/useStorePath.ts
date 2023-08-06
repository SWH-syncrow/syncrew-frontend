import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useStorePath = () => {
  const pathname = usePathname();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath") || "";
    storage.setItem("prevPath", prevPath);
    storage.setItem("currentPath", globalThis.location.pathname);
  };

  useEffect(() => storePathValues, [pathname]);

  return;
};

export default useStorePath;
