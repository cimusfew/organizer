import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainPage from "./pages/MainPage";
import Account from "./pages/Account";
import Calendar from "./pages/Calendar";
import ToDoList from "./pages/ToDoList";
import moment from "moment/moment";
import styled from "styled-components";

const FormPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  border-top: 1px solid #737373;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  width: 320px;
  background-color: #1e1f21;
  color: #dddddd;
  box-sizing: border-box;
`;

const EventTitle = styled.input`
  padding: 8px 14px;
  font-size: 0.85rem;
  border: unset;
  width: 100%;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled.textarea`
  padding: 8px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

const ButtonsWrapper = styled.div`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const url = "http://localhost:5000";
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};

function App() {
  //const today = moment();
  //npx json-server -p 5000 --watch db.json
  const [today, setToday] = useState(moment());
  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState(null);

  const [method, setMethod] = useState(null);

  const [isShowForm, setShowForm] = useState(false);

  const startDay = today.clone().startOf("month").startOf("week");

  const previewHandler = () => {
    setToday((prev) => prev.clone().subtract(1, "month"));
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, "month"));
  };

  const startDateQuery = startDay.clone().format("X");
  const endDateQuery = startDay.clone().add(43, "days").format("X"); //43, не 42, т.к. не попадает правая граница

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEvents(res);
      });
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true);
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
    setMethod(methodName);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };
  
  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = "DELETE";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },     
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
        cancelButtonHandler();
      });
  };

  const eventFetchHAndler = () => {
    const fetchUrl =
      method === "Изменить" ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === "Изменить" ? "PATCH" : "POST";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (method === "Изменить") {
          setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
            
        } else{
          setEvents((prevState) => [...prevState, res]);
        }

        cancelButtonHandler();
      });
  };

  return (
    <div>
      {isShowForm ? (
        <FormPositionWrapper onClick={cancelButtonHandler}>
          <FormWrapper onClick={(e) => e.stopPropagation()}>
            <EventTitle
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder = "Заголовок"
            />
            <EventBody
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder = "Описание"
            />
            <ButtonsWrapper>
              <button onClick={eventFetchHAndler}>{method}</button>
              <button onClick={cancelButtonHandler}>Закрыть</button>
              {
                method === 'Изменить'  ? 
                (<button onClick={removeEventHandler}>Удалить</button>) : null
              }
            </ButtonsWrapper>
          </FormWrapper>
        </FormPositionWrapper>
      ) : null}
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/calendar"
              element={
                <Calendar
                  startDay={startDay}
                  today={today}
                  previewHandler={previewHandler}
                  todayHandler={todayHandler}
                  nextHandler={nextHandler}
                  events={events}
                  openFormHandler={openFormHandler}
                />
              }
            />
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
