import dayjs from 'dayjs';
import styled from 'styled-components';
import RenderCalenderBoard from './RenderCalenderBoard';
import Left from '@svg/prev-icon.svg';
import Right from '@svg/next-icon.svg';
import Down from '@svg/down-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const variants = {
  enter: (direction: number) => {
    return {
      zIndex: 1,
      x: direction > 0 ? 1000 : -1000,
      // opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    // opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 2,
      x: direction < 0 ? 1000 : -1000,
      // opacity: 1,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Calender = ({ selectedDate, setSelectedDate }: Props) => {
  const today = dayjs().format('MM/DD/YY');
  const splited = selectedDate.split('/');

  const handleSelectDate = (v: string | null) => {
    v ? setSelectedDate(v) : setSelectedDate(today);
  };

  const handlePrevWeek = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'week').format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = dayjs(selectedDate).add(1, 'week').format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const board = RenderCalenderBoard(today, selectedDate, handleSelectDate);

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Wrapper>
      <Head>
        <p className="year-month">
          20{splited[2]}년 {splited[0]}월 <Down />
        </p>
        <div className="arrows">
          <Left
            onClick={() => {
              handlePrevWeek();
              paginate(-1);
            }}
          />
          <Right
            onClick={() => {
              handleNextWeek();
              paginate(1);
            }}
          />
        </div>
      </Head>
      <Board>
        <AnimatePresence initial={false} custom={direction}>
          <BoardContainer
            as={motion.div}
            custom={direction}
            key={page}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.25 },
              // opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {board}
          </BoardContainer>
        </AnimatePresence>
      </Board>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 14px;
  padding: 28px 20px 0;
  border-bottom: 3px solid #f4f5f7;

  .year-month {
    font-size: 16px;
    font-weight: 600;
  }

  .arrows {
    width: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const BoardContainer = styled(motion.div)`
  width: 50%;
  /* height: 100%; */
  display: inline-block;
  /* overflow: hidden; */
`;

const Board = styled.div`
  width: 200%;
`;

const Head = styled.div`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin: 0 14px 16px;

  p {
    line-height: 28px;
  }
`;

export default Calender;
