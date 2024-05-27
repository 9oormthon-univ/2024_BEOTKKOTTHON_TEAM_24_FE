import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import Pencil from '@svg/pencil-icon.svg';
import BottomBtn from '@/components/common/BottomBtn';
import { useState } from 'react';
import { useRemind } from '@/store/remind';
import { useRouter } from 'next/router';
import { useGetInsight } from '@/hooks/api/useInsight';
import { usePostReminderAnswer } from '@/hooks/api/useReminder';

const ReminderAnswer: NextPage = () => {
  const [wordCount, setWordCount] = useState<number>(0);
  const { answer, setAnswer } = useRemind();
  const router = useRouter();
  const { insightId, reminderQuestionId, reminderQuestion } = router.query;
  const { data, isSuccess } = useGetInsight(Number(insightId));
  const { mutate } = usePostReminderAnswer();

  return (
    <Wrapper>
      <Header title="리마인드" />
      <div className="question">{reminderQuestion}</div>
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
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-bottom: 36px;

  .question {
    margin: 20px 20px 0;
    color: #1f1f1f;
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
      font-size: 14px;
      font-weight: 500;
      border: 0;
      color: #1f1f1f;
      outline: none;
      flex: 1;
      resize: none;
    }

    p {
      text-align: right;
      font-size: 12px;
      font-weight: 500;
      color: #989898;
    }
  }
`;
