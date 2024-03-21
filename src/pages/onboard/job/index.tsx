import BottomBtn from '@/components/common/BottomBtn';
import Header from '@/components/common/Header';
import { useSignupInputStore } from '@/store/signup';
import { Job } from '@/types/user';
import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {}

const OnboardJob: NextPage<Props> = ({}) => {
  const { signupInput, setSignupInput } = useSignupInputStore();
  const [selectedJob, setSelectedJob] = useState('');

  const handleJob = (job: Job) => {
    const newInput = { ...signupInput, job: job };
    setSignupInput(newInput);
    setSelectedJob(job);
  };
  return (
    <div>
      <Wrapper>
        <Header />
        <span className="page-indicator">2/3</span>
        <Body>
          <div className="title">
            <p>{signupInput.userName}님의</p>
            직무를 알려주세요!
          </div>
          <div className="subtitle">
            인사이트를 효율적으로 관리할 수 있도록 도와드릴게요!
          </div>
          <JobSection>
            <div
              onClick={() => handleJob('PLANNER')}
              className={
                selectedJob === 'PLANNER' ? 'selected job-card' : 'job-card'
              }
            >
              기획
            </div>
            <div
              onClick={() => handleJob('DESIGNER')}
              className={
                selectedJob === 'DESIGNER' ? 'selected job-card' : 'job-card'
              }
            >
              디자인
            </div>
            <div
              onClick={() => handleJob('DEVELOPER')}
              className={
                selectedJob === 'DEVELOPER' ? 'selected job-card' : 'job-card'
              }
            >
              개발자
            </div>
            <div
              onClick={() => handleJob('ETC')}
              className={
                selectedJob === 'ETC' ? 'selected job-card' : 'job-card'
              }
            >
              기타
            </div>
          </JobSection>
        </Body>
      </Wrapper>
      {selectedJob ? (
        <BottomBtn text="다음" color="#3184FF" nextUrl="/onboard/subject" />
      ) : (
        <BottomBtn text="다음" color="#848484" />
      )}
    </div>
  );
};

export default OnboardJob;

const Wrapper = styled.div`
  max-height: 100vh;
  position: relative;
  justify-content: center;
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
    margin-top: 36px;
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
`;

const Body = styled.div`
  position: relative;
  padding: 0px 20px;
  height: 100vh;
`;

const JobSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: 56px;
  gap: 19px;
  .error {
    color: var(--System-Warning, #f1404b);
  }
  .job-card {
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
`;