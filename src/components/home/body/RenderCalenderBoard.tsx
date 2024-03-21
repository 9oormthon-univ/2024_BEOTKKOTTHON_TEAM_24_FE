import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Stamp from '@svg/calender-stamp.svg';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const RenderCalenderBoard = (
  today: string,
  selectedDay: string,
  handleSelectDate: (v: string | null) => void,
) => {
  const initArr = (firstDay: number) => {
    return Array.from({ length: 7 }, (v, i) =>
      i < firstDay
        ? null
        : dayjs(selectedDay).startOf('week').add(i, 'day').format('MM/DD/YY'),
    );
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);

  useEffect(() => {
    const monday = dayjs(selectedDay).startOf('week');
    setArr(initArr(monday.day()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <Item
      key={v ? v.toString() : `${v}${i}`}
      isToday={today === v}
      isSelected={selectedDay === v}
      onClick={() => handleSelectDate(v)}
    >
      {v && <CalenderItem date={v} stamp={today === v} />}
    </Item>
  ));

  return content;
};

export default RenderCalenderBoard;

interface CalenderItemProps {
  date: string;
  stamp: boolean;
}

const CalenderItem = ({ date, stamp }: CalenderItemProps) => {
  return (
    <>
      <span className="day">{days[dayjs(date).day()]}</span>
      <div className="date-container">
        <span className="date">{dayjs(date).date()}</span>
        {stamp ? <Stamp /> : <div className="no-stamp"></div>}
      </div>
    </>
  );
};

interface ItemProps {
  isToday: boolean;
  isSelected: boolean;
}

const Item = styled.div<ItemProps>`
  width: 100%;
  padding: 14px auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: -3px;

  ${(props) =>
    props.isSelected
      ? css`
          border-bottom: 3px solid #3184ff;
        `
      : css`
          border-bottom: 0;
        `}

  .day {
    font-size: 12px;
    font-weight: 600;
    margin: 0;
    color: ${(props) => (props.isToday ? '#3184FF' : '#1F1F1F')};
    ${(props) =>
      props.isToday
        ? css`
            color: #3184ff;
            opacity: 1;
          `
        : css`
            color: #1f1f1f;
            opacity: 0.6;
          `}
  }

  .date-container {
    margin: 10px auto;
    width: 33px;
    height: 33px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .date {
    position: absolute;
    font-size: 17px;
    font-weight: 500;
    color: ${(props) => (props.isToday ? '#3184FF' : '#1F1F1F')};
    ${(props) =>
      props.isToday
        ? css`
            color: #3184ff;
            font-size: 17px;
          `
        : css`
            color: #1f1f1f;
            font-size: 17px;
          `}
  }

  .stamp {
    position: absolute;
  }

  .no-stamp {
    position: absolute;
  }
`;
