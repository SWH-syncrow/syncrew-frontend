import clsx from "clsx";

const LoadingUI = ({ className }: { className?: string }) => {
  return (
    <img
      src="/assets/loading.png"
      className={clsx("animate-spin ", className)}
    />
  );
};

export default LoadingUI;
