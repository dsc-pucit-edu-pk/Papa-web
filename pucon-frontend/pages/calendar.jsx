import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useContext, useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarHeader from "@/components/CalendarHeader";
import Layout from "@/components/Layout";
import EventModal from "@/components/EventModal";
import { globalContext } from "@/store/GlobalContext";
import { GetEvents } from "../ApiCalls/GetEvents";

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
  const {
    globalData: { loggedIn },
  } = useContext(globalContext);
  if (!loggedIn) {
    router.push("/login");
    return null;
  }
  const [currentDate, setCurrentDate] = useState();
  const [events, setEvents] = useState([]);
  const [eventsToShow, setEventsToShow] = useState([]);
  const [eventTags, setEventTags] = useState("");

  const [modalData, setModalData] = useState({
    open: false,
    event: null,
  });

  useEffect(() => {
    GetEvents().then((data) => {
      console.log(data);
      let formattedData = data.map((item) => {
        return {
          ...item,
          start: new Date(item.date),
          // end is start plus duration in milliseconds
          end: new Date(new Date(item.date).getTime() + item.duration),
        };
      });
      {
        /* event types are sports, entertainment,education, political and others */
      }
      let dataWithColors = formattedData.map((item) => {
        let color = "";
        switch (item.tags[0]) {
          case "sports":
            color = "#FF9800";
            break;
          case "entertainment":
            color = "#2196F3";
            break;
          case "education":
            color = "#4CAF50";
            break;
          case "political":
            color = "#F44336";
            break;
          default:
            color = "#9C27B0";
        }
        return {
          ...item,
          color,
        };
      });
      formattedData = dataWithColors;

      console.log("formattedData", formattedData);
      setEvents(formattedData);
      setEventsToShow(formattedData);
    });
  }, []);

  // const events = [
  //   {
  //     id: 1,
  //     title: "All Day Event",
  //     start: new Date(2023, 3, 0),
  //     end: new Date(2023, 4, 11),
  //   },
  // ];

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
    console.log("extendedProps", extendedProps);
    setModalData({
      open: true,
      event: {
        ...extendedProps,
        startAt: start,
        endAt: end,
        title: title,
      },
    });
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

  //  if event tag exist, filter data of only that tag

  useEffect(() => {
    if (eventTags) {
      let filteredEvents = events.filter((item) => {
        return item.tags.includes(eventTags);
      });
      console.log("filteredEvents", filteredEvents);
      setEventsToShow(filteredEvents);
    }
  }, [eventTags]);

  return (
    <>
      <Layout>
        <Root className="flex flex-col  relative flex-1">
          <CalendarHeader
            calendarRef={calendarRef}
            currentDate={currentDate}
            eventTags={eventTags}
            setEventTags={setEventTags}
          />

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
                events={eventsToShow}
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
        eventData={modalData.event}
        setOpenEventModal={setModalData}
      />
    </>
  );
}

function renderEventContent(eventInfo) {
  //  get data of event
  // console.log("eventInfooooo", eventInfo);

  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: eventInfo.event.color,
      }}
    >
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
