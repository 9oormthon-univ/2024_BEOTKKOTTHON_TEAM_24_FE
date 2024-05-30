import styled from 'styled-components';
import dayjs from 'dayjs';

interface Props {
  reminderQuestion: string;
  reminderAnswer: string;
  answeredAt: string;
}

const Answer = (props: Props) => {
  const { reminderQuestion, reminderAnswer, answeredAt } = props;
  return (
    <Wrapper>
      <span className="date">{dayjs(answeredAt).format('YY/MM/DD')}</span>
      <span className="title">Q. {reminderQuestion}</span>
      <p className="answer">{reminderAnswer}</p>
    </Wrapper>
  );
};

export default Answer;

const Wrapper = styled.div`
  width: 100%;
  display: inline-block;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.folder.pink};
  margin-bottom: 36px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .date {
    color: ${({ theme }) => theme.palette.neutral[300]};
    ${({ theme }) => theme.typo.Caption_12_M};
    margin-bottom: 12px;
  }

  .title {
    color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Body_14_B};
    margin-bottom: 12px;
  }

  .answer {
    color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Body_14_M};
  }
`;
