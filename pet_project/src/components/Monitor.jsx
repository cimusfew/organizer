import React from 'react';
import styled from 'styled-components';

const MonitorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #272525;
  color: white;
  padding: 8px;
 
`;

const TextWrapper = styled.span`
  font-size: 32px;

`;
const MonthWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 2px;
  `;

const ButtonWrapper = styled.button`
  border: unset;
  background-color: #585656;
  height: 28px;
  margin-left: 2px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`;

const TodayButton = styled(ButtonWrapper)`
  padding-left: 16px;
  padding-right: 16px;
  font-weight: bold;
`;


const Monitor = ({today, previewHandler, todayHandler, nextHandler}) => {
  const localeRus = new Map([
    ["January", "Январь"],
    ["February", "Февраль"],
    ["March", "Март"],
    ["April", "Апрель"],
    ["May", "Май"],
    ["June", "Июнь"],
    ["July", "Июль"],
    ["August", "Август"],
    ["September", "Сентябрь"],
    ["October", "Октябрь"],
    ["November", "Ноябрь"],
    ["December", "Декабрь"]
  ]);
  return (
    <MonitorWrapper>
      <div>
        <MonthWrapper>{localeRus.get(today.format('MMMM'))}</MonthWrapper>
        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </div>
      <div>
        <ButtonWrapper style = {{width: '30px'}} onClick={previewHandler}> &lt; </ButtonWrapper>
        <TodayButton onClick={todayHandler}>Сегодня</TodayButton>
        <ButtonWrapper style = {{width: '30px'}} onClick={nextHandler}> &gt; </ButtonWrapper>
      </div>
    </MonitorWrapper>
  )
}

export default Monitor