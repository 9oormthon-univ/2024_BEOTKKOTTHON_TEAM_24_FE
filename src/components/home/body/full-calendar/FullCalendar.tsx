import dayjs from 'dayjs';
import styled from 'styled-components';
import RenderFullCalendarBoard from './RenderFullCalendarBoard';
import Right from '@svg/next-icon.svg';
import Left from '@svg/prev-icon.svg';
// import { useRecoilState, useRecoilValue } from 'recoil';s

const days = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  //   onClickModal: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onClickModal: () => void;
}

const FullCalendar = ({
  selectedDate,
  setSelectedDate,
  onClickModal,
}: Props) => {
  //   const [selectedDate, setSelectedDate] = useState(selectedDateState);
  //   const selectedProfile = useRecoilValue(selectedProfileState);
  const splited = selectedDate.split('/');

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
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

  const board = RenderFullCalendarBoard(
    selectedDate,
    // selectedProfile,
    handleSelectDate,
  );

  return (
    <Wrapper>
      <Head>
        <Left onClick={handlePrevMonth} />
        <div className="title-button">
          <p className="title">
            20{splited[2]}년 {splited[0]}월
          </p>
          <button className="button" onClick={onClickModal}>
            확인
          </button>
        </div>
        <Right onClick={handleNextMonth} />
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

export default FullCalendar;

const Wrapper = styled.div`
  margin-top: 20px;
  transform: translate3d(-14px, 0, 0);
  width: calc(100% + 28px);
  height: 330px;

  .title-button {
    width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    background-color: #ffffff;
    color: ${({ theme }) => theme.palette.neutral[300]};
    border: ${({ theme }) => theme.palette.neutral[300]} solid 1px;
    height: 25px;
    width: 40px;
    border-radius: 4px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Head = styled.div`
  ${({ theme }) => theme.typo.Body_14_B};
  display: flex;
  justify-content: space-between;
  margin: auto 14px;
  margin-bottom: 10px;
  align-items: center;

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
    ${({ theme }) => theme.typo.Body_14_M};
    color: ${({ theme }) => theme.palette.neutral[400]};
  }
`;
