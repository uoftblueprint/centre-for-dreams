import React from "react";

import EventsCalendar from "~/components/eventscalendar";
import NavBar from "~/components/navbar";

export default function Activities() {
  return (
    <div className="absolute bottom-0 top-0 flex w-full">
      <NavBar />
      <div className="flex w-full flex-col justify-start">
        <EventsCalendar />
      </div>
    </div>
  );
}
