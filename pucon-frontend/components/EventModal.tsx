import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { storage } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { CreateEvent } from "../ApiCalls/CreateEvent";
import { EditEVnt } from "../ApiCalls/EditEvent";
import { DeleteEventt } from "../ApiCalls/DeleteEvent";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  openEventModal?: boolean | undefined;
  setOpenEventModal?: React.Dispatch<React.SetStateAction<object>> | undefined;
  eventData?: any | undefined;
}

export default function EventModal({
  openEventModal,
  setOpenEventModal,
  eventData,
}: Props) {
  // we want title , description , image , duration , date , tags list, limit of participants, recurring or not
  const [eventImage, setEventImage] = useState("");
  const [eventImagePreview, setEventImagePreview] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTags, setEventTags] = useState("");
  const [eventLimit, setEventLimit] = useState("");
  const [eventRecurring, setEventRecurring] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  // recurring has options once, day, week , month

  if (eventData) {
    console.log(eventData);
  }
  // if event data is present then we are editing the event

  useEffect(() => {
    if (eventData) {
      console.log("eventData", eventData);
      setEventName(eventData.title);
      setEventDescription(eventData.description);
      setEventTags(eventData.tags);
      setEventLimit(eventData.limit);
      setEventRecurring(eventData.type);
      setEndAt("");
      setEventImagePreview(eventData.poster_url);
      setStartAt(new Date(eventData.startAt));
      setEndAt(new Date(eventData.endAt));
    }
  }, [eventData]);

  useEffect(() => {
    if (!openEventModal) {
      setEventImage("");
      setEventImagePreview("");
      setEventName("");
      setEventDescription("");
      setEventTags("");
      setEventLimit("");
      setEventRecurring("");
    }
  }, [openEventModal]);

  const createEvent = async () => {
    console.log("eventData", eventData);
    // upload image to firebase
    let fileUrl = eventData.poster_url ? eventData.poster_url : "";
    if (!eventData) {
      const storageRef = ref(storage, `event/${eventName}`);
      await uploadBytes(storageRef, eventImage);
      fileUrl = await getDownloadURL(storageRef);
      console.log(fileUrl);
    }
    // create event in db

    let eventDataa = {
      title: eventName,
      description: eventDescription,
      poster_url: fileUrl,
      duration: new Date(endAt).getTime() - new Date(startAt).getTime(),
      date: new Date(startAt).toISOString(),
      tags: [eventTags],
      limit: eventLimit,
      type: eventRecurring,
      _id: eventData ? eventData._id : "",
    };
    try {
      if (!eventData) await CreateEvent(eventDataa);
      else await EditEVnt(eventDataa);
      if (eventData) alert("Event Created Successfully");
      else alert("Event Edited Successfully");
      setOpenEventModal({
        open: false,
        event: null,
      });
    } catch (err) {
      console.log(err);
    }
    console.log(eventDataa);
  };
  const deleteEvent = async () => {
    try {
      await DeleteEventt(eventData);
      alert("Event Deleted Successfully");
      setOpenEventModal({
        open: false,
        event: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog
        open={openEventModal}
        fullWidth
        onClose={() =>
          setOpenEventModal({
            open: false,
            event: null,
          })
        }
      >
        <div className=" top-0 left-0 w-full h-full bg-white flex justify-center z-50 ">
          <div className="w-full relative z-50">
            {" "}
            <div className="overflow-scroll relative px-10 pb-5">
              <div className="flex flex-col justify-center gap-10 items-center w-full mx-auto overflow-scroll">
                <h1 className="conflux-text text-center text-3xl lg:text-5xl lg:mb-10 mt-16">
                  {eventData ? "Edit Event" : "Create Event"}
                </h1>
                {/* image preview */}
                <div className="w-full h-[150px] lg:h-[300px] bg-[#696969] rounded-lg flex justify-center items-center">
                  {eventImagePreview ? (
                    // remove previously uploaded img omn click
                    <img
                      src={eventImagePreview}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                      onClick={() => {
                        setEventImage("");
                        setEventImagePreview("");
                      }}
                    />
                  ) : (
                    // <p className="text-white text-2xl">Image Preview</p>
                    // upload image when clicked on image preview
                    <label
                      htmlFor="eventImage"
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      <p className="text-white text-2xl">Upload Image</p>
                    </label>
                  )}

                  {/* image upload */}
                  <label
                    htmlFor="eventImage"
                    className="w-full p-4 hidden rounded border border-[#696969] bg-transparent outline-none text-white text-center cursor-pointer"
                  >
                    Upload Image
                    <input
                      type="file"
                      id="eventImage"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEventImage(file);
                          setEventImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                {/* event name */}
                <input
                  type="text"
                  placeholder="Event Name"
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
                {/* event description */}
                <textarea
                  placeholder="Event Description"
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />

                {/* event start */}
                <div className="flex gap-5 w-full">
                  <input
                    placeholder="Event Start"
                    type="date"
                    className="w-full flex-1 p-4 rounded border border-[#696969] bg-transparent outline-none"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                  />
                  {/* event end */}
                  <input
                    placeholder="Event End"
                    type="date"
                    className="w-full flex-1 p-4 rounded border border-[#696969] bg-transparent outline-none"
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                  />
                </div>

                {/* event tags are sports, entertainment,education, political and others */}
                {/* show dropdown */}
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

                {/* event limit */}
                <input
                  placeholder="Event Limit"
                  type="text"
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none"
                  value={eventLimit}
                  onChange={(e) => setEventLimit(e.target.value)}
                />
                {/* event recurring */}
                <select
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none"
                  value={eventRecurring}
                  onChange={(e) => setEventRecurring(e.target.value)}
                >
                  {/* once, day, week, month */}
                  <option value="once">Once</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>

                {/* submit button */}
                <Button
                  variant="contained"
                  className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none text-white"
                  onClick={createEvent}
                >
                  Submit
                </Button>
                {/* if eventData exist, show delete button */}
                {eventData && (
                  <Button
                    variant="contained"
                    className="w-full p-4 rounded border border-[#696969] bg-transparent outline-none text-white"
                    onClick={deleteEvent}
                    color="error"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
