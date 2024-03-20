import Carousel from '@/components/landing/Carousel';
import MoveToNextBtn from '@/components/upload/MoveToNextBtn';
import { CarouselSlides } from '@/constants/landing';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {}

const Landing: NextPage<Props> = ({}) => {
  const router = useRouter();
  return (
    <>
      <Wrapper>
        <Carousel Slides={CarouselSlides} indicatorMargin={60}/>
        <MoveToNextBtn
          title="로그인"
          onClick={() => router.push('/signin')}
          width="353px"
          height="72px"
          background="#3184FF"
          fontSize="20px"
          isDisabled={false}
        />
        <SignUpBtn onClick={() => router.push('/signup')}>회원가입</SignUpBtn>
      </Wrapper>
    </>
  );
};

export default Landing;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  width: 100%;
  height: 892px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: auto;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

const SignUpBtn = styled.div`
  display: flex;
  width: 353px;
  padding: 22px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: 2px solid var(--Primary-500, #3184ff);
  background: var(--Neutral-100, #f4f5f7);
  color: var(--Primary-500, #3184ff);
  text-align: center;
  /* Head-20-B */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 28px */
`;
