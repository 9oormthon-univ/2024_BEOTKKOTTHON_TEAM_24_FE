import dayjs from 'dayjs';
import styled from 'styled-components';
import { useState } from 'react';
import RenderCalenderBoard from './renderCalenderBoard';
import Left from '@svg/prev-icon.svg';
import Right from '@svg/next-icon.svg';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('MM/DD/YY'));
  const splited = selectedDate.split('/');

  const handleSelectDate = (v: string) => {
    setSelectedDate(v);
  };

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate)
      .subtract(1, 'month')
      .endOf('month')
      .format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate)
      .add(1, 'month')
      .startOf('month')
      .format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const board = RenderCalenderBoard(selectedDate, handleSelectDate);

  return (
    <Wrapper>
      <Head>
        <p>
          20{splited[2]}년 {splited[0]}월
        </p>
        <div>
          <Left onClick={handlePrevMonth} />
          <Right onClick={handleNextMonth} />
        </div>
      </Head>
      <Days>
        {days.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </Days>
      <Board>{board}</Board>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
  transform: translate3d(-14px, 0, 0);
  width: calc(100% + 28px);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Head = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin: auto 14px;
  margin-bottom: 10px;

  p {
    line-height: 28px;
  }

  img {
    width: 26px;
    margin-left: 8px;
    cursor: pointer;
  }
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  & > div {
    margin: 4px auto;
    font-size: 10px;
  }
`;

export default Calender;
