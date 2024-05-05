import dayjs from 'dayjs';
import styled from 'styled-components';
import RenderCalenderBoard from './RenderCalenderBoard';
import Left from '@svg/prev-icon.svg';
import Right from '@svg/next-icon.svg';
import Down from '@svg/down-icon.svg';

interface Props {
  onClickModal: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const Calender = ({ onClickModal, selectedDate, setSelectedDate }: Props) => {
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

  return (
    <Wrapper>
      <Head>
        <p className="year-month" onClick={onClickModal}>
          20{splited[2]}년 {splited[0]}월 <Down />
        </p>
        <div className="arrows">
          <Left
            onClick={() => {
              handlePrevWeek();
            }}
          />
          <Right
            onClick={() => {
              handleNextWeek();
            }}
          />
        </div>
      </Head>
      <Board>{board}</Board>
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

const Board = styled.div`
  width: 100%;
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
