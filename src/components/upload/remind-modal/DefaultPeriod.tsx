import styled from 'styled-components';
import ForgettingCurve from '@svg/upload/forgetting-curve.svg';

const DefaultPeriod = () => {
  return (
    <RecommendBg>
      <RecommendText>
        <span className="colored">망각곡선 주기</span>에 맞추어 리마인드 알림을
        제공해요!
      </RecommendText>
      <ForgettingCurve />
      <SubText>
        *망각 곡선(forgetting curve)은 시간이 지날수록 학습한 내용을 얼마나
        잊는지에 대한 그래프
      </SubText>
    </RecommendBg>
  );
};

export default DefaultPeriod;

const RecommendBg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 40px 16px 29px;
  align-items: center;
  border-radius: 8.235px;
  background: #f4f5f7;
  gap: 19px;
`;

const RecommendText = styled.p`
  color: #1f1f1f;
  width: 170px;
  word-break: keep-all;
  text-align: left;
  margin-right: 114px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  .colored {
    color: #3184ff;
  }
`;

const SubText = styled(RecommendText)`
  color: #000;
  width: 284px;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 9.723px;
  letter-spacing: -0.148px;
  margin: 0;
`;
