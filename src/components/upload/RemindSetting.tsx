import styled from 'styled-components';
import ToggleSlider from '@/components/upload/ToggleSlider';
import { InsightPostRequest } from '@/types/insight';

interface Props {
  insightInput: InsightPostRequest;
  remindTerm: string;
  setIsModal: (value: string) => void;
  setInsightInput: (value: InsightPostRequest) => void;
}

const RemindSetting = (props: Props) => {
  const { insightInput, remindTerm, setIsModal, setInsightInput } = props;

  const handleRemindToggle = () => {
    insightInput.enable === true &&
      setInsightInput({
        ...insightInput,
        enable: false,
        remindType: 'DEFAULT',
      });
    if (insightInput.enable === false) {
      setIsModal('remind');
      setInsightInput({
        ...insightInput,
        enable: true,
        remindType: 'DEFAULT',
      });
    }
  };

  return (
    <Wrapper>
      <p>리마인드 설정</p>
      <RemindSetter>
        <span>인사이트 다시 읽기</span>
        <RemindIndicator>
          {insightInput.enable === true && remindTerm}
          <ToggleSlider
            $isSelected={insightInput.enable}
            onClick={handleRemindToggle}
          />
        </RemindIndicator>
      </RemindSetter>
    </Wrapper>
  );
};

export default RemindSetting;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  p {
    margin-bottom: 8px;
    ${({ theme }) => theme.typo.Body_14_M};
  }
  span {
    line-height: 160%;
  }
`;

const RemindIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  max-width: 200px;
  color: ${({ theme }) => theme.palette.primary[500]};
  text-align: right;
  ${({ theme }) => theme.typo.Body_14_M};
  gap: 14px;
`;

const RemindSetter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  align-items: flex-end;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.neutral[100]};
`;
