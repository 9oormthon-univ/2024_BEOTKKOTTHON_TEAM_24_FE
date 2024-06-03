import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import Pencil from '@svg/pencil-icon.svg';
import BottomBtn from '@/components/common/BottomBtn';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetInsight } from '@/hooks/api/useInsight';
import { usePostReminderAnswer } from '@/hooks/api/useReminder';

const ReminderAnswer: NextPage = () => {
  const [wordCount, setWordCount] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const router = useRouter();
  const { insightId, reminderQuestionId, reminderQuestion } = router.query;
  const { data, isSuccess } = useGetInsight(Number(insightId));
  const { mutate } = usePostReminderAnswer();

  return (
    <Wrapper>
      <Header title="리마인드" />
      <div className="question">Q. {reminderQuestion}</div>
      {isSuccess && (
        <SummaryInsightCard
          favicon="/svg/insight-favicon.svg"
          insightData={{
            insightId: data.insightId,
            insightMainImage: data.insightMainImage,
            insightTitle: data.insightTitle,
            insightSummary: data.insightSummary,
            insightTagList: data.insightTagList,
            todayRead: false,
          }}
        />
      )}
      <div className="answer-box">
        <Pencil className="pencil" />
        <textarea
          placeholder="답변을 입력해보세요."
          maxLength={500}
          onChange={(e) => {
            setWordCount(e.target.value.length);
            setAnswer(e.target.value);
          }}
        ></textarea>
        <p>{wordCount}/500자</p>
      </div>
      <BottomBtn
        text="완료"
        state={wordCount > 0 ? 'activated' : 'disabled'}
        onClick={() => {
          mutate({
            reminderQuestionId: Number(reminderQuestionId),
            reminderQuestion: String(reminderQuestion),
            reminderAnswer: answer,
          });
          router.replace(`/insight/${router.query.insightId}`);
        }}
      />
    </Wrapper>
  );
};

export default ReminderAnswer;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.system.background};
  display: flex;
  flex-direction: column;
  padding-bottom: 36px;

  .question {
    margin: 20px 20px 0;
    color: ${({ theme }) => theme.palette.neutral[500]};
    word-break: keep-all;
    ${({ theme }) => theme.typo.Body_16_SB};
  }

  .answer-box {
    margin: 20px;
    border-radius: 13px;
    padding: 18px;
    box-shadow: 9px 9px 30px 0px #00000014;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    flex: 1;

    textarea {
      padding: 12px 0;
      border: 0;
      outline: none;
      flex: 1;
      resize: none;
      color: ${({ theme }) => theme.palette.neutral[500]};
      ${({ theme }) => theme.typo.Body_14_M};
      line-height: 19.6px;
    }

    p {
      text-align: right;
      ${({ theme }) => theme.typo.Caption_12_M};
      color: ${(props) => props.theme.palette.neutral[200]};
    }
  }
`;
