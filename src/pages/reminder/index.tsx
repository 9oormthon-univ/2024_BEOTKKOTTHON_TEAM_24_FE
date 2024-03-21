import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import SummaryInsightCard from '@/components/common/SummaryInsightCard';
import Pencil from '@svg/pencil-icon.svg';
import BottomBtn from '@/components/common/BottomBtn';
import { useState } from 'react';

const Reminder: NextPage = () => {
  const [wordCount, setWordCount] = useState<number>(0);

  return (
    <Wrapper>
      <Header title="리마인드" />
      <div className="question">
        Q. 해당 인사이트를 어떻게 활용할 수 있을까요?
      </div>
      <SummaryInsightCard
        coverImg="/image/디자인3.jpg"
        title="디자인시스템에 모션 가이드 추가하는 방법"
        summary="미드저니는 UX/UI디자인, 그래픽 디자인 등 다양한 분야에서 활용될 수
              있습니다. 미드저니를 활용해 UX/UI 디자인을 수행하는 경우, 시나리오와
              퍼소나를 아주 높은 퀄리티로 시각화 할 수 있습니다."
        tags={['UI/UX', '사용자 경험']}
      />
      <div className="answer-box">
        <Pencil className="pencil" />
        <textarea
          placeholder="답변을 입력해보세요."
          onChange={(e) => {
            setWordCount(e.target.value.length);
          }}
          maxLength={500}
        ></textarea>
        <p>{wordCount}/500자</p>
      </div>
      <BottomBtn
        text="완료"
        color={wordCount > 0 ? '#3184FF' : '#848484'}
        nextUrl={'/reminder/remind-saved'}
      />
    </Wrapper>
  );
};

export default Reminder;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #fbfbfb;

  .question {
    margin: 20px;
    color: #1f1f1f;
  }

  .answer-box {
    height: 242px;
    margin: 20px;
    border-radius: 13px;
    padding: 18px;
    box-shadow: 9px 9px 30px 0px #00000014;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    justify-content: space-between;

    textarea {
      min-height: 160px;
      padding: 40px 0;
      font-size: 14px;
      font-weight: 500;
      padding: 12px 0;
      border: 0;
      color: #1f1f1f;
      outline: none;
    }

    p {
      text-align: right;
      font-size: 12px;
      font-weight: 500;
      color: #989898;
    }
  }
`;
