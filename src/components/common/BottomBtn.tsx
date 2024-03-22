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
        return (
          <Button className="disabled">
            {props.text}
          </Button>
        );
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
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    color: #ffffff;
    border: 0;
    background-color: #848484;
  }

  &.activated {
    color: #ffffff;
    border: 0;
    background-color: #3184ff;
  }

  &.borderline {
    color: #3184ff;
    border: #3184ff solid 2px;
    background-color: #f4f5f7;
  }

  &.transparent {
    color: #3184ff;
    border: 0;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
`;

export default BottomBtn;
