import styled from 'styled-components';
// import Left from '@svg/next-icon.svg';
// import Right from '@svg/prev-icon.svg';
import FullCalendar from './full-calendar/FullCalendar';

interface Props {
  // onClickModal: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onClickModal: () => void;
}

const CalendarModal = ({
  selectedDate,
  setSelectedDate,
  onClickModal,
}: Props) => {
  return (
    <>
      <Wrapper>
        <ModalHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="5"
            viewBox="0 0 36 5"
            fill="none"
          >
            <path
              d="M0 2.5C0 1.11929 1.11929 0 2.5 0H33.5C34.8807 0 36 1.11929 36 2.5C36 3.88071 34.8807 5 33.5 5H2.5C1.11929 5 0 3.88071 0 2.5Z"
              fill="#3C3C43"
              fillOpacity="0.3"
            />
          </svg>
        </ModalHeader>
        <ModalBody>
          <FullCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onClickModal={onClickModal}
          />
        </ModalBody>
      </Wrapper>
      <ModalBg />
    </>
  );
};

export default CalendarModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: 480px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 480px;
  height: 100%;
  flex-shrink: 0;
  z-index: 20;
`;

const ModalHeader = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  height: 38px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.neutral[150]};
  border-radius: 8px 8px 0px 0px;
  background: white;
`;

const ModalBody = styled.div`
  width: 100%;
  max-width: 480px;
  height: 450px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  gap: 34px;
`;
