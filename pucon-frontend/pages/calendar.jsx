import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarHeader from "@/components/CalendarHeader";
import Layout from "@/components/Layout";
import EventModal from "@/components/EventModal";

const Root = styled("div")(({ theme }) => ({
  flex: 1,
  "& a": {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: "none!important",
  },
  "&  .fc-media-screen": {
    minHeight: "100%",
  },
  "& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th": {
    borderColor: `${theme.palette.divider}!important`,
  },
  "&  .fc-scrollgrid-section > td": {
    border: 0,
  },
  "& .fc-daygrid-day": {
    "&:last-child": {
      borderRight: 0,
    },
  },
  "& .fc-col-header-cell": {
    borderWidth: "0 0 1px 0",
    padding: "16px 0",
    "& .fc-col-header-cell-cushion": {
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  },
  "& .fc-view ": {
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    "& > .fc-scrollgrid": {
      border: 0,
    },
  },
  "& .fc-daygrid-day-number": {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  "& .fc-event": {
    backgroundColor: `${theme.palette.primary.dark}!important`,
    color: `${theme.palette.primary.contrastText}!important`,
    border: 0,
    padding: "0 6px",
    borderRadius: "16px!important",
  },
}));

const StyledAddButton = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 12,
  top: 172,
  zIndex: 99,
}));
function CalendarApp(props) {
  const [currentDate, setCurrentDate] = useState();
  const [modalData, setModalData] = useState({
    open: false,
    event: null,
  });

  const events = [];
  const user = {};

  const calendarRef = useRef();

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    console.log(start, end);
  };

  const handleEventDrop = (eventDropInfo) => {
    const { id, title, allDay, start, end, extendedProps } =
      eventDropInfo.event;
    const updatedEventData = {
      id,
      title,
      allDay,
      start,
      end,
      extendedProps,
    };
    console.log(updatedEventData);
  };
  const handleEventClick = (clickInfo) => {
    const { id, title, allDay, start, end, extendedProps } = clickInfo.event;
    console.log(id, title, allDay, start, end, extendedProps);
  };

  const handleDates = (rangeInfo) => {
    console.log(rangeInfo);
    setCurrentDate(rangeInfo);
  };

  const handleEventAdd = (addInfo) => {
    console.log(addInfo);
  };

  const handleEventChange = (changeInfo) => {
    console.log(changeInfo);
  };

  const handleEventRemove = (removeInfo) => {
    console.log(removeInfo);
  };

  return (
    <>
      <Layout>
        <Root className="flex flex-col  relative flex-1">
          <CalendarHeader calendarRef={calendarRef} currentDate={currentDate} />

          <div className="flex flex-1 container">
            <motion.div
              className="w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={false}
                initialView="dayGridMonth"
                editable
                selectable
                selectMirror
                dayMaxEvents
                weekends
                datesSet={handleDates}
                select={handleDateSelect}
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                eventAdd={handleEventAdd}
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
                eventDrop={handleEventDrop}
                initialDate={new Date()}
                ref={calendarRef}
              />
            </motion.div>
          </div>
        </Root>
      </Layout>
      <EventModal
        openEventModal={modalData.open}
        setOpenEventModal={setModalData}
      />
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div className="flex items-center">
      <Typography className="text-12 font-semibold">
        {eventInfo.timeText}
      </Typography>
      <Typography className="text-12 px-4 truncate">
        {eventInfo.event.title}
      </Typography>
    </div>
  );
}

export default CalendarApp;
