import styled from 'styled-components';
import SettingIcon from '@svg/setting-icon.svg';
import { useRouter } from 'next/navigation';

const TitleSettingsPanel = () => {
  const router = useRouter();

  function onClick() {
    router.push(`/setting`);
  }

  return (
    <Wrapper>
      <InfoBox>
        <strong className="title">오늘의 질문</strong>
        <span className="description">
          저장된 인사이트를 바탕으로 리마인드 질문을 드려요
        </span>
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
