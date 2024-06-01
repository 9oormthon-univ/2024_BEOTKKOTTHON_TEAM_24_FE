import styled from 'styled-components';
import SettingIcon from '@svg/setting-icon.svg';
import { useRouter } from 'next/navigation';
import { QuestionGetResponse } from '@/types/reminder';

interface Props {
  questionData?: QuestionGetResponse;
}

const TitleSettingsPanel = ({ questionData }: Props) => {
  const router = useRouter();
  const reminderTitle = questionData?.todayClear
    ? 'OO님, 오늘 모든 질문에 답하셨어요!'
    : questionData?.reminderQuestionList.length === 0
      ? '인사이트를 저장하면 매일 리마인드 질문을 드려요!'
      : '다음 질문에 답하여 인사이트를 리마인드 해보세요!';

  function onClick() {
    router.push(`/setting`);
  }

  return (
    <Wrapper>
      <InfoBox>
        <strong className="title">오늘의 질문</strong>
        <span className="description">{reminderTitle}</span>
      </InfoBox>
      <SettingIcon onClick={onClick} />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  margin: 10px 20px 24px;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding: 4px 0;
    margin: 0 0 2px;
  }
  .description {
    font-size: 14px;
    font-weight: 500;
    padding: 2px 0;
    color: #565656;
  }
`;

export default TitleSettingsPanel;
