import BottomBtn from '@/components/common/BottomBtn';
import { Job } from '@/types/user';
import { useState } from 'react';
import styled from 'styled-components';
import DesignerImage from '@svg/onboard/design-image.svg';
import PlannerImage from '@svg/onboard/planner-image.svg';
import DeveloperImage from '@svg/onboard/developer-image.svg';
import { SignupFunnel } from '@/types/Funnel';

const JobSetup = (props: SignupFunnel) => {
  const { signupInfo, setSignupInfo, toNextStep } = props;
  const [selectedJob, setSelectedJob] = useState(signupInfo.job);

  const handleJob = (job: Job) => {
    const newInput = { ...signupInfo, job: job };
    setSignupInfo(newInput);
    setSelectedJob(job);
  };

  return (
    <Wrapper>
      <Body>
        <div className="title">
          <p>{signupInfo.userName}님의</p>
          직무를 알려주세요!
        </div>
        <div className="subtitle">
          인사이트를 효율적으로 관리할 수 있도록 도와드릴게요!
        </div>
        <JobSection>
          <Grid>
            <div
              onClick={() => handleJob('PLANNER')}
              className={
                selectedJob === 'PLANNER' ? 'selected job-card' : 'job-card'
              }
            >
              기획
              <PlannerImage className="icon" />
            </div>
            <div
              onClick={() => handleJob('DESIGNER')}
              className={
                selectedJob === 'DESIGNER' ? 'selected job-card' : 'job-card'
              }
            >
              디자인
              <DesignerImage className="icon" />
            </div>
            <div
              onClick={() => handleJob('DEVELOPER')}
              className={
                selectedJob === 'DEVELOPER' ? 'selected job-card' : 'job-card'
              }
            >
              개발자
              <DeveloperImage className="icon" />
            </div>
            <div
              onClick={() => handleJob('ETC')}
              className={
                selectedJob === 'ETC' ? 'selected job-card' : 'job-card'
              }
            >
              기타
            </div>
          </Grid>
        </JobSection>
      </Body>
      <BottomBtn
        text="다음"
        state={selectedJob ? 'activated' : 'disabled'}
        onClick={toNextStep}
      />
    </Wrapper>
  );
};

export default JobSetup;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .title,
  p {
    width: 100%;
    color: ${({ theme }) => theme.palette.neutral[500]};
    ${({ theme }) => theme.typo.Head_24_B};
    margin-top: 20px;
  }

  p {
    margin-top: 0;
  }

  span {
    position: absolute;
    right: 20px;
    top: 12px;
    color: ${({ theme }) => theme.palette.primary[500]};
    ${({ theme }) => theme.typo.Head_20_M};
  }
  .subtitle {
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.neutral[300]};
    ${({ theme }) => theme.typo.Body_14_M};
  }

  > :nth-child(2) {
    margin-bottom: 36px;
  }
`;

const Body = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const JobSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 56px;
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 16px 16px;

  .error {
    color: ${({ theme }) => theme.palette.system.warning};
  }
  .job-card {
    position: relative;
    width: 167px;
    height: 167px;
    flex-shrink: 0;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.neutral[100]};
    border: 2px solid ${({ theme }) => theme.palette.neutral[100]};
    padding: 18px 16px;
    box-sizing: border-box;
  }
  .selected {
    border: 2px solid ${({ theme }) => theme.palette.primary[500]};
  }
  .icon {
    position: absolute;
    bottom: 25px;
    right: 20px;
  }
`;
