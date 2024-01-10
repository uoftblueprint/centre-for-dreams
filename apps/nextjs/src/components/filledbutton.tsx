import React from "react";

interface FilledButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const FilledButton: React.FC<FilledButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  if (disabled) {
    return (
      <button>
        <div className="inline-flex h-10 w-auto flex-col items-center justify-center gap-2 rounded-full bg-zinc-900 bg-opacity-10">
          <div className="inline-flex shrink grow basis-0 items-center justify-center gap-2 self-stretch px-[24px] py-[10px]">
            <div className="font-poppins text-center text-base font-medium tracking-normal text-zinc-900 opacity-40">
              {label}
            </div>
          </div>
        </div>
      </button>
    );
  } else {
    return (
      <button onClick={onClick}>
        <div className="inline-flex h-10 w-auto flex-col items-center justify-center gap-2 rounded-full bg-blue-900">
          <div className="inline-flex shrink grow basis-0 items-center justify-center gap-2 self-stretch px-[24px] py-[10px]">
            <div className="font-poppins text-center text-base font-medium tracking-normal text-white">
              {label}
            </div>
          </div>
        </div>
      </button>
    );
  }
};

export default FilledButton;
