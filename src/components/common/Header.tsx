import styled from 'styled-components';
import { useRouter } from 'next/router';
import BackIcon from '@svg/backspace-icon.svg';

interface Props {
  title?: string;
  rightText?: string;
  rightUrl?: string;
}

const Header = (props: Props) => {
  const router = useRouter();

  const onClickRight = () => {
    if (props.rightUrl) router.push(props.rightUrl);
  };

  return (
    <Wrapper>
      <BackIcon onClick={() => router.back()} />
      <div className='title'>{props.title}</div>
      <div onClick={onClickRight}>{props.rightText}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 20px 16px;

  .title {
    font-size: 20px;
    font-weight: 700;
    color: #1f1f1f;
  }
`;

export default Header;
