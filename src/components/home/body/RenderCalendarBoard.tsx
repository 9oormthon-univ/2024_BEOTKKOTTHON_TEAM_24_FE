import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Stamp from '@svg/calendar-stamp.svg';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const RenderCalendarBoard = (
  today: string,
  selectedDay: string,
  handleSelectDate: (date: string | null) => void,
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
      $istoday={today === v}
      $isSelected={selectedDay === v}
      onClick={() => handleSelectDate(v)}
    >
      {v && <CalendarItem date={v} stamp={today === v} />}
    </Item>
  ));

  return <Board>{content}</Board>;
};

export default RenderCalendarBoard;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 65px;
`;

interface CalendarItemProps {
  date: string;
  stamp: boolean;
}

const CalendarItem = ({ date, stamp }: CalendarItemProps) => {
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
  $istoday: boolean;
  $isSelected: boolean;
}

const Item = styled.div<ItemProps>`
  width: 100%;
  padding: 14px auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: -3px;

  ${(props) =>
    props.$isSelected
      ? css`
          border-bottom: 3px solid ${props.theme.palette.primary[500]};
        `
      : css`
          border-bottom: 0;
        `}

  .day {
    ${({ theme }) => theme.typo.Body_14_M};
    margin: 0;
    color: ${(props) =>
      props.$istoday
        ? props.theme.palette.primary[500]
        : `rgba(31, 31, 31, 0.6)`};
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
    ${(props) =>
      props.$istoday
        ? props.theme.typo.Body_16_SB
        : props.theme.typo.Body_16_M};
  }
    color: ${(props) =>
      props.$istoday
        ? props.theme.palette.primary[500]
        : props.theme.palette.neutral[500]};
  }

  .stamp {
    position: absolute;
  }

  .no-stamp {
    position: absolute;
  }
`;
