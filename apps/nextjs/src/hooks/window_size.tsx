import { useEffect, useState } from "react";

const useLayoutType = () => {
  const [layout, setLayout] = useState<"mobile" | "desktop">("desktop");

  const updateLayout = () => {
    if (window.innerWidth < 800) {
      setLayout("mobile");
    } else {
      setLayout("desktop");
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  return layout;
};

export default useLayoutType;
