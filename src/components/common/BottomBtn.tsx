import styled from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  text?: string;
  nextUrl?: string;
  state: 'disabled' | 'activated' | 'borderline' | 'transparent';
  onClick?: () => void;
}

const BottomBtn = (props: Props) => {
  const router = useRouter();

  const onClick = () => {
    if (props.nextUrl) router.push(props.nextUrl);
  };

  const renderInnerBtn = () => {
    switch (props.state) {
      case 'disabled':
        return <Button className="disabled">{props.text}</Button>;
      case 'activated':
        return (
          <Button onClick={props.onClick ?? onClick} className="activated">
            {props.text}
          </Button>
        );
      case 'borderline':
        return (
          <Button onClick={props.onClick ?? onClick} className="borderline">
            {props.text}
          </Button>
        );
      case 'transparent':
        return (
          <Button onClick={props.onClick ?? onClick} className="transparent">
            {props.text}
          </Button>
        );
    }
  };

  return renderInnerBtn();
};

const Button = styled.button`
  width: calc(100% - 40px);
  min-height: 72px;
  margin: 0 20px;
  border-radius: 14px;
  ${({ theme }) => theme.typo.Head_20_B};
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    color: #ffffff;
    border: 0;
    background-color: ${(props) => props.theme.palette.neutral[300]};
  }

  &.activated {
    color: #ffffff;
    border: 0;
    background-color: ${(props) => props.theme.palette.primary[500]};
  }

  &.borderline {
    color: ${(props) => props.theme.palette.primary[500]};
    border: ${(props) => props.theme.palette.primary[500]} solid 2px;
    background-color: ${(props) => props.theme.palette.neutral[100]};
  }

  &.transparent {
    color: ${(props) => props.theme.palette.primary[500]};
    border: 0;
    background-color: #ffffff;
    ${({ theme }) => theme.typo.Body_16_SB};
  }
`;

export default BottomBtn;
