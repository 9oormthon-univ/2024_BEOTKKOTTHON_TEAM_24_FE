import BottomBtn from '@/components/common/BottomBtn';
import Header from '@/components/common/Header';
import { SUBJECTLIST } from '@/constants/subjectList';
import { useSignupInputStore } from '@/store/signup';
import { useEffect, useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import styled from 'styled-components';
import AddButton from '@svg/addBtn.svg';
import { useSignup } from '@/hooks/api/useAuth';

const SubjectSetup = () => {
  const { signupInput, setSignupInput } = useSignupInputStore();
  const [topicList, setTopicList] = useState<string[]>(
    SUBJECTLIST[signupInput.job].sort(),
  );
  const [isAdding, setIsAdding] = useState(false);
  const [addingTopic, setAddingTopic] = useState('');
  const { mutate } = useSignup();

  useEffect(() => {
    setSignupInput({ ...signupInput, topicList: [] });
  }, []);

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
    signupInput.topicList.includes(topic)
      ? setSignupInput({
          ...signupInput,
          topicList: signupInput.topicList.filter(
            (element) => element !== topic,
          ),
        })
      : setSignupInput({
          ...signupInput,
          topicList: [...signupInput.topicList, topic].sort(),
        });
  };

  return (
    <Wrapper>
      <Header rightText="3/3" />
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
              className={
                signupInput.topicList.includes(topic) ? 'selected' : ''
              }
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
      {signupInput.topicList.length > 2 ? (
        <BottomBtn
          text="완료"
          state="activated"
          onClick={() => mutate(signupInput)}
        />
      ) : (
        <BottomBtn text="완료" state="disabled" />
      )}
    </Wrapper>
  );
};

export default SubjectSetup;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;

  > :last-child {
    margin-bottom: 36px;
  }

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
    margin-top: 0px;
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

const TopicSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  margin-top: 56px;
  gap: 19px;
  .error {
    color: var(--System-Warning, #f1404b);
  }
  .selected {
    display: flex;
    padding: 7.27px 11.765px;
    justify-content: center;
    align-items: center;
    gap: 9.412px;
    border-radius: 8.985px;
    background: var(--Primary-500, #3184ff);
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
  background: var(--Neutral-100, #f4f5f7);
  color: var(--Neutral-400, #565656);
  text-align: center;
  /* Body-16-SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`;
