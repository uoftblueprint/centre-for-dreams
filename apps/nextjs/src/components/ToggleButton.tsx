import React from "react";

interface ToggleButtonProps {
  word: string;
  isToggled: boolean;
  setAll: () => void;
  setMy: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  word,
  isToggled,
  setAll,
  setMy,
}) => {
  return (
    <div className="m-2 w-max self-center rounded-3xl border border-[#2E4D90]">
      {isToggled ? (
        <>
          <button className="rounded-3xl px-10 py-2" onClick={setAll}>
            All {word}
          </button>
          <button
            className="rounded-3xl bg-[#2E4D90] px-10 py-2 text-white"
            onClick={setMy}
          >
            My {word}
          </button>
        </>
      ) : (
        <>
          <button
            className="rounded-3xl bg-[#2E4D90] px-10 py-2 text-white"
            onClick={setAll}
          >
            All {word}
          </button>
          <button className="rounded-3xl px-10 py-2" onClick={setMy}>
            My {word}
          </button>
        </>
      )}
    </div>
  );
};

export default ToggleButton;
