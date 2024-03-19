import dayjs from 'dayjs';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const RenderCalenderBoard = (
  today: string,
  selectedDay: string,
  handleSelectDate: (v: string) => void,
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
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <Item key={v ? v.toString() : `${v}${i}`} isToday={today === v}>
      {v && <CalenderItem date={v} onClick={() => handleSelectDate(v)} />}
    </Item>
  ));

  return content;
};

export default RenderCalenderBoard;

interface CalenderItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  date: string;
}

const CalenderItem = ({ date }: CalenderItemProps) => {
  return (
    <>
      <span className="day">{days[dayjs(date).day()]}</span>
      <span className="date">{dayjs(date).date()}</span>
    </>
  );
};

const Item = styled.div<{ isToday: boolean }>`
  width: 100%;
  padding: 14px auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  & > button {
    height: 21px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4px;

    .count {
      position: absolute;
      padding-top: 3px;
      font-size: 13px;
      text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      font-weight: 700;
    }
  }

  .day {
    font-size: 12px;
    font-weight: 600;
    margin: 0 0 14px 0;
    color: ${({ isToday }) => (isToday ? '#3184FF' : '#1F1F1F')};
    ${({ isToday }) =>
      isToday
        ? css`
            color: #3184ff;
            opacity: 1;
          `
        : css`
            color: #1f1f1f;
            opacity: 0.6;
          `}
  }

  .date {
    font-size: 17px;
    font-weight: 500;
    padding: 0 0 5px 0;
    margin: 0 0 14px 0;
    color: ${({ isToday }) => (isToday ? '#3184FF' : '#1F1F1F')};
    ${({ isToday }) =>
      isToday
        ? css`
            color: #3184ff;
            font-size: 17px;
          `
        : css`
            color: #1f1f1f;
            font-size: 17px;
          `}
  }
`;
