import dayjs from 'dayjs';
import styled from 'styled-components';
import RenderCalendarBoard from './RenderCalendarBoard';
import Left from '@svg/prev-icon.svg';
import Right from '@svg/next-icon.svg';
import Down from '@svg/down-icon.svg';
import { useState } from 'react';

interface Props {
  onClickModal: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const Calendar2 = ({ onClickModal, selectedDate, setSelectedDate }: Props) => {
  const today = dayjs().format('MM/DD/YY');
  const splited = selectedDate.split('/');
  const [direction, setDirection] = useState<string>('');

  const handleSelectDate = (date: string | null) => {
    date ? setSelectedDate(date) : setSelectedDate(today);
  };

  const handlePrevWeek = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'week').format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = dayjs(selectedDate).add(1, 'week').format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const board = RenderCalendarBoard(today, selectedDate, handleSelectDate);

  return (
    <Wrapper>
      <Head>
        <p className="year-month" onClick={onClickModal}>
          20{splited[2]}년 {splited[0]}월 <Down />
        </p>
        <div className="arrows">
          <Left
            onClick={() => {
              setDirection('left');
              document
                .startViewTransition(() => {
                  handlePrevWeek();
                })
                .finished.finally(() => {
                  setDirection('');
                });
            }}
          />
          <Right
            onClick={() => {
              setDirection('right');
              document
                .startViewTransition(() => {
                  handleNextWeek();
                })
                .finished.finally(() => {
                  setDirection('');
                });
            }}
          />
        </div>
      </Head>
      <div className={direction}>{board}</div>
      <style jsx>{`
        .left {
          view-transition-name: left-board;
        }
        .right {
          view-transition-name: right-board;
        }
      `}</style>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 14px;
  padding: 28px 20px 0;
  border-bottom: 3px solid ${({ theme }) => theme.palette.neutral[100]};

  .year-month {
    ${({ theme }) => theme.typo.Body_16_SB};
  }

  .arrows {
    width: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Head = styled.div`
  ${({ theme }) => theme.typo.Body_14_B};
  display: flex;
  justify-content: space-between;
  margin: 0 14px 16px;

  p {
    line-height: 28px;
  }
`;

export default Calendar2;
