import styled from 'styled-components';
import { useRouter } from 'next/router';
import BackIcon from '@svg/backspace-icon.svg';

interface Props {
  title?: string;
  rightText?: string;
  isGoingBack?: boolean;
  onClick?: () => void;
}

const Header = (props: Props) => {
  const router = useRouter();

  return (
    <Wrapper>
      <div>
        <BackIcon
          className={props.isGoingBack === false && 'invisible'}
          onClick={() => router.back()}
        />
      </div>
      <div className="title">{props.title}</div>
      <div className="right-text" onClick={props.onClick}>
        {props.rightText}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  width: 100%;
  padding: 18px 20px 16px;
  height: 52px;

  .title {
    ${({ theme }) => theme.typo.Head_20_B};
    color: ${({ theme }) => theme.palette.neutral[500]};
    text-align: center;
  }

  .right-text {
    ${({ theme }) => theme.typo.Head_20_M};
    color: ${({ theme }) => theme.palette.primary[500]};
    text-align: right;
    margin-bottom: 0 !important;
  }

  .invisible {
    display: none;
  }
`;

export default Header;
