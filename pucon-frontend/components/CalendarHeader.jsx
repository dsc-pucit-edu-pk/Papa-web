import Icon from "@mui/material/Icon";
import { styled, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import format from "date-fns/format";
import CalendarViewMonthOutlinedIcon from "@mui/icons-material/CalendarViewMonthOutlined";
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EventModal from "./EventModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import { useState } from "react";

const Root = styled("div")(({ theme }) => ({
  backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
  backgroundColor: "#FAFAFA",
  color: "#FFFFFF",
  backgroundSize: "cover",
  backgroundPosition: "0 50%",
  backgroundRepeat: "no-repeat",

  "&:before": {
    content: "''",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    background: "rgba(0, 0, 0, 0.45)",
  },
  "&.Jan": {
    backgroundImage: "url('/assets/images/calendar/winter.jpg')",
    backgroundPosition: "0 85%",
  },
  "&.Feb": {
    backgroundImage: "url('/assets/images/calendar/winter.jpg')",
    backgroundPosition: "0 85%",
  },
  "&.Mar": {
    backgroundImage: "url('/assets/images/calendar/spring.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.Apr": {
    backgroundImage: "url('/assets/images/calendar/spring.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.May": {
    backgroundImage: "url('/assets/images/calendar/spring.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.Jun": {
    backgroundImage: "url('/assets/images/calendar/summer.jpg')",
    backgroundPosition: "0 80%",
  },
  "&.Jul": {
    backgroundImage: "url('/assets/images/calendar/summer.jpg')",
    backgroundPosition: "0 80%",
  },
  "&.Aug": {
    backgroundImage: "url('/assets/images/calendar/summer.jpg')",
    backgroundPosition: "0 80%",
  },
  "&.Sep": {
    backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.Oct": {
    backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.Nov": {
    backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
    backgroundPosition: "0 40%",
  },
  "&.Dec": {
    backgroundImage: "url('/assets/images/calendar/winter.jpg')",
    backgroundPosition: "0 85%",
  },
}));

const viewNamesObj = {
  dayGridMonth: {
    title: "Month",
    icon: <CalendarViewMonthOutlinedIcon sx={{ color: "white" }} />,
  },
  timeGridWeek: {
    title: "Week",
    icon: <CalendarViewWeekOutlinedIcon sx={{ color: "white" }} />,
  },
  timeGridDay: {
    title: "Day",
    icon: <CalendarViewDayOutlinedIcon sx={{ color: "white" }} />,
  },
};

function CalendarHeader(props) {
  const { calendarRef, currentDate } = props;
  const { eventTags, setEventTags } = props;
  const [modalData, setModalData] = useState({
    open: false,
    event: null,
  });
  const mainThemeDark = {};
  const calendarApi = () => calendarRef.current?.getApi();

  const openAddEventModal = (event) => {
    setModalData({
      open: true,
      event: null,
    });
  };

  return (
    <>
      <ThemeProvider theme={mainThemeDark}>
        <Root
          className={clsx(
            "flex h-200 min-h-200 relative",
            format(new Date(currentDate?.start || null), "MMM")
          )}
        >
          <div className="flex flex-1 flex-col justify-between z-10 container">
            <div className="flex flex-col items-center justify-between sm:flex-row mb-16">
              <div className="flex items-center my-16 mt-6 sm:mb-0">
                <motion.span
                  initial={{ x: -20 }}
                  animate={{ x: 0, transition: { delay: 0.2 } }}
                  delay={300}
                  className="text-16 text-2xl md:text-24 mx-12 font-semibold"
                >
                  Calendar
                </motion.span>
              </div>
              <div className="flex items-center">
                <Tooltip title="Today">
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                      <IconButton
                        aria-label="today"
                        onClick={() => calendarApi().today()}
                        size="large"
                      >
                        <CalendarTodayOutlinedIcon sx={{ color: "white" }} />
                      </IconButton>
                    </motion.div>
                  </div>
                </Tooltip>
                {Object.entries(viewNamesObj).map(([name, view]) => (
                  <Tooltip title={view.title} key={name}>
                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { delay: 0.3 } }}
                      >
                        <IconButton
                          aria-label={name}
                          onClick={() => calendarApi().changeView(name)}
                          disabled={currentDate?.view.type === name}
                          size="large"
                        >
                          {view.icon}
                        </IconButton>
                      </motion.div>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>

            <motion.div
              className="flex items-center justify-between my-5 mx-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <div className="w-40">
                <select
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none"
                  value={eventTags}
                  onChange={(e) => setEventTags(e.target.value)}
                >
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="education">Education</option>
                  <option value="political">Political</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="flex">
                <Tooltip title="Previous">
                  <IconButton
                    aria-label="Previous"
                    onClick={() => calendarApi().prev()}
                    size="large"
                  >
                    <ArrowBackIosNewOutlinedIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  {currentDate?.view.title}
                </Typography>
                <Tooltip title="Next">
                  <IconButton
                    aria-label="Next"
                    onClick={() => calendarApi().next()}
                    size="large"
                  >
                    <ArrowForwardIosOutlinedIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </div>
              <Button variant="contained" onClick={openAddEventModal}>
                Add Event
              </Button>
            </motion.div>
          </div>
        </Root>
      </ThemeProvider>
      <EventModal
        openEventModal={modalData.open}
        setOpenEventModal={setModalData}
      />
    </>
  );
}

export default CalendarHeader;
