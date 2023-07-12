import React from "react";
import styled from "styled-components";
import Monitor from "../components/Monitor";
import moment from "moment/moment";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ?  "#272525" : "#525252"};
  ${props => props.isHeader && 'border-bottom: 1px solid #525252'}
`;

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${props => props.isHeader ? 24 : 106}px;
  background-color: ${(props) => (props.isWeekend ? "#363434" : "#272525")};
  color:${props => props.isSelectedMonth ?  "#ffffff" : "#8d8c8c"};
`;

const RowInCell = styled.div`
  display: flex;
  flex-direction: ${props => props.isHeader ? '' : 'column'};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

const DayWrapper = styled.div`
  display: flex;
  height: 33px;
  width: 33px;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #da0038;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled.ul`
    margin: unset;
    list-style-position: inside;
    padding-left: 4px;
`;

const EventItemWrapper = styled.button`
   position: relative;
   left: -14px;
   text-overflow: ellipsis;
   overflow: hidden;
   white-space: nowrap;
   width: 114px;
   border: unset;
   background: unset;
   color: #DDDDDD;
   cursor: pointer;
   margin: 0;
   padding: 0;
   text-align: left;

`;

const Calendar = ({ 
  startDay, 
  today,
  previewHandler,
  todayHandler, 
  nextHandler, 
  events, 
  openFormHandler
}) => {

  //const allCellsDays = 42;
  const localeRusWeek = new Map([
    ['Mon', 'Пн'],
    ['Tue', 'Вт'],
    ['Wed', 'Ср'],
    ['Thu', 'Чт'],
    ['Fri', 'Пт'],
    ['Sat', 'Сб'],
    ['Sun', 'Вс']
  ]);
  const tempDay = startDay.clone();
  const daysArray = [...Array(42)].map(() => tempDay.add(1, "day").clone());

  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelectedMonth = (day) => today.isSame(day, "month");

  return (
    <div>
      <Monitor 
        today={today} 
        previewHandler = {previewHandler}
        todayHandler = {todayHandler}
        nextHandler = {nextHandler}
      />
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isHeader >
            <RowInCell isHeader style = {{marginRight: '8px', color: '#dddbdb'}} justifyContent={"flex-end"}>
              {localeRusWeek.get(moment().day(i+1).format('ddd'))}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.format("DDMMYYYY")}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            isSelectedMonth = {isSelectedMonth(dayItem)}
          >
            <RowInCell justifyContent={"flex-end"}>
              <ShowDayWrapper>
                <DayWrapper onDoubleClick={()=>openFormHandler('Создать', null, dayItem)}>
                  {
                    isCurrentDay(dayItem) ? 
                    (<CurrentDay>{dayItem.format("D")}</CurrentDay>) : (dayItem.format("D"))
                  }
                  
                </DayWrapper>
              </ShowDayWrapper>
              <EventListWrapper>
                {
                  events
                  .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                  .map(event => (
                    <li key = {event.id}>
                      <EventItemWrapper onDoubleClick={() => openFormHandler('Изменить', event)}>
                        {event.title}
                      </EventItemWrapper>
                    </li>
                  ))
                }             
              </EventListWrapper>
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </div>
  );
};

export default Calendar;
