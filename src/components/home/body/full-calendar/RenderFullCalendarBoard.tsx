import dayjs from 'dayjs';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const RenderFullCalendarBoard = (
  selectedDay: string,
  //   selectedProfile: string,
  handleSelectDate: (date: string) => void,
) => {
  const initArr = (firstDay: number, daysInMonth: number) => {
    return Array.from({ length: firstDay + daysInMonth }, (v, i) =>
      i < firstDay
        ? null
        : dayjs(selectedDay)
            .startOf('month')
            .set('date', i - firstDay + 1)
            .format('MM/DD/YY'),
    );
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);
  const [selectedFullDate, setSelectedFullDate] = useState(
    dayjs(selectedDay).format('MM/DD/YY') ?? dayjs().format('MM/DD/YY'),
  );

  const handleFullSelectDate = (v: string | null) => {
    v
      ? setSelectedFullDate(v)
      : setSelectedFullDate(dayjs().format('MM/DD/YY'));
  };

  useEffect(() => {
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [selectedDay]);

  const content = arr.map((value, i) => (
    <Item
      key={value ? value.toString() : `${value}${i}`}
      isSelected={selectedFullDate === value}
      onClick={() => {
        handleFullSelectDate(value);
        if (value) handleSelectDate(value);
      }}
    >
      {value && (
        <CalendarItem
          date={value}
          isSelected={selectedFullDate === value}
          onClick={() => {
            console.log(value);
            handleSelectDate(value);
          }}
        />
      )}
    </Item>
  ));

  return content;
};

export default RenderFullCalendarBoard;

interface CalendarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  date: string;
  isSelected: boolean;
}

const CalendarItem = ({ date }: CalendarItemProps) => {
  return <span className="date">{dayjs(date).date()}</span>;
};

const Item = styled.div<{ isSelected: boolean }>`
  width: 21px;
  height: 35px;
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

    .check {
      position: absolute;
    }
  }

  .date {
    font-weight: 700;
    color: ${({ isSelected }) => (isSelected ? '#3184FF' : '#b6b6b6')};
    ${({ isSelected }) =>
      isSelected
        ? css`
            color: '#3184FF';
            font-size: 16px;
            /* text-decoration: underline; */
          `
        : css`
            color: #b6b6b6;
            font-size: 16px;
          `}
  }
`;
