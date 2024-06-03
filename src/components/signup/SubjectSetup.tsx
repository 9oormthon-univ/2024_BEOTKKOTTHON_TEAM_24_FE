import BottomBtn from '@/components/common/BottomBtn';
import { SUBJECTLIST } from '@/constants/subjectList';
import { useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import styled from 'styled-components';
import AddButton from '@svg/addBtn.svg';
import { useSignup } from '@/hooks/api/useAuth';
import { SignupFunnel } from '@/types/Funnel';

const SubjectSetup = (props: SignupFunnel) => {
  const { signupInfo, setSignupInfo, toNextStep } = props;
  const [topicList, setTopicList] = useState<string[]>(
    SUBJECTLIST[signupInfo.job].sort(),
  );
  const [isAdding, setIsAdding] = useState(false);
  const [addingTopic, setAddingTopic] = useState('');
  const { mutate } = useSignup();

  const handleBlur = () => {
    setAddingTopic('');
    setIsAdding(false);
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      const newTopic = new Set([...topicList, addingTopic]);
      const uniqueArr = Array.from(newTopic);
      setTopicList(uniqueArr);
      selectTopic(addingTopic);
      setAddingTopic('');
      setIsAdding(false);
    }
  };

  const selectTopic = (topic: string) => {
    setSignupInfo({
      ...signupInfo,
      topicList: signupInfo.topicList.includes(topic)
        ? signupInfo.topicList.filter((element) => element !== topic)
        : [...signupInfo.topicList, topic].sort(),
    });
  };

  return (
    <Wrapper>
      <Body>
        <div className="title">
          <p>주로 저장하는 인사이트의</p>
          주제는 무엇인가요?
        </div>
        <div className="subtitle">
          선택한 주제로 폴더의 이름을 지정해드려요.
        </div>
        <TopicSection>
          {topicList.map((topic, idx) => (
            <Topic
              key={idx}
              className={`${signupInfo.topicList.includes(topic) && 'selected'}`}
              onClick={() => selectTopic(topic)}
            >
              {topic}
            </Topic>
          ))}
          {isAdding ? (
            <AutosizeInput
              value={addingTopic}
              onKeyDownCapture={(e) => checkEnter(e.key)}
              onChange={(e) => {
                console.log('hi');
                setAddingTopic(e.target.value);
              }}
              onBlur={() => handleBlur()}
              inputStyle={{
                display: 'flex',
                padding: '7.27px 11.765px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8.985px',
                background: 'var(--Neutral-100, #f4f5f7)',
                color: 'var(--Neutral-400, #565656)',
                textAlign: 'center',
                /* Body-16-SB */
                fontFamily: 'Pretendard',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: '140%' /* 22.4px */,
                outline: 'none',
                border: 'none',
              }}
            />
          ) : (
            <Topic onClick={() => setIsAdding(true)}>
              직접 입력
              <AddButton />
            </Topic>
          )}
        </TopicSection>
      </Body>
      <BottomBtn
        text="완료"
        state={signupInfo.topicList.length > 2 ? 'activated' : 'disabled'}
        onClick={() => {
          mutate(signupInfo);
          toNextStep();
        }}
      />
    </Wrapper>
  );
};

export default SubjectSetup;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;

  > :last-child {
    margin-bottom: 36px;
  }

  .title,
  p {
    width: 100%;
    color: ${(props) => props.theme.palette.neutral[500]}
      ${({ theme }) => theme.typo.Head_24_B};
    margin-top: 20px;
  }

  p {
    margin-top: 0px;
  }

  span {
    position: absolute;
    right: 20px;
    top: 12px;
    color: ${(props) => props.theme.palette.primary[500]}
      ${({ theme }) => theme.typo.Head_20_M};
  }
  .subtitle {
    margin-top: 8px;
    color: ${(props) => props.theme.palette.neutral[300]}
      ${({ theme }) => theme.typo.Body_14_M};
  }
`;

const Body = styled.div`
  position: relative;
  padding: 0px 20px;
  flex: 1;
`;

const TopicSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  margin-top: 56px;
  gap: 19px;
  .error {
    color: ${(props) => props.theme.palette.system.warning}
  }
  .selected {
    display: flex;
    padding: 7.27px 11.765px;
    justify-content: center;
    align-items: center;
    gap: 9.412px;
    border-radius: 8.985px;
    background: ${(props) => props.theme.palette.primary[500]}
    color: #fff;
  }
`;

const Topic = styled.div`
  display: flex;
  padding: 7.27px 11.765px;
  justify-content: center;
  align-items: center;
  gap: 9.412px;
  border-radius: 8.985px;
  background: ${(props) => props.theme.palette.neutral[100]}
  color: ${(props) => props.theme.palette.neutral[400]}
  text-align: center;
  ${({ theme }) => theme.typo.Body_16_SB};
`;
