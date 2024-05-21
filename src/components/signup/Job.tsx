import BottomBtn from '@/components/common/BottomBtn';
import Header from '@/components/common/Header';
import { useSignupInputStore } from '@/store/signup';
import { Job } from '@/types/user';
import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import DesignerImage from '@svg/onboard/design-image.svg';
import PlannerImage from '@svg/onboard/planner-image.svg';
import DeveloperImage from '@svg/onboard/developer-image.svg';

interface Props {}

const Job: NextPage<Props> = ({}) => {
  const { signupInput, setSignupInput } = useSignupInputStore();
  const [selectedJob, setSelectedJob] = useState('');

  const handleJob = (job: Job) => {
    const newInput = { ...signupInput, job: job };
    setSignupInput(newInput);
    setSelectedJob(job);
  };
  return (
    <Wrapper>
      <Header rightText="2/3" />
      <Body>
        <div className="title">
          <p>{signupInput.userName}님의</p>
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
      {selectedJob ? (
        <BottomBtn text="다음" state="activated" nextUrl="/onboard/subject" />
      ) : (
        <BottomBtn text="다음" state="disabled" />
      )}
    </Wrapper>
  );
};

export default Job;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .title,
  p {
    width: 100%;
    color: var(--Neutral-500, #1f1f1f);
    /* Head-24-B */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 33.6px */
    margin-top: 20px;
  }

  p {
    margin-top: 0;
  }

  span {
    position: absolute;
    right: 20px;
    top: 12px;
    color: var(--Primary-500, #3184ff);
    /* Head-20-M */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
  }
  .subtitle {
    margin-top: 8px;
    color: var(--Neutral-300, #848484);
    /* Body-14-M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
  }

  > :nth-child(3) {
    margin-bottom: 36px;
  }
`;

const Body = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
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
    color: var(--System-Warning, #f1404b);
  }
  .job-card {
    position: relative;
    width: 167px;
    height: 167px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--Neutral-100, #f4f5f7);
    border: 2px solid #f4f5f7;
    padding: 18px 16px;
    box-sizing: border-box;
  }
  .selected {
    border: 2px solid #3184ff;
  }
  .icon {
    position: absolute;
    bottom: 25px;
    right: 20px;
  }
`;
