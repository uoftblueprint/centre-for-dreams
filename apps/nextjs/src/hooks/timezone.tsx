import { useEffect, useState } from "react";

const useTimezone = () => {
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  return timezone;
};

export default useTimezone;
