import styled from 'styled-components';
import { useRouter } from 'next/router';

interface Props {
  text?: string;
  color?: string;
  nextUrl?: string;
}

const BottomBtn = (props: Props) => {
  const router = useRouter();

  const onClick = () => {
    if (props.nextUrl) router.push(props.nextUrl);
  };

  return (
    <Button color={props.color} onClick={onClick}>
      {props.text}
    </Button>
  );
};

const Button = styled.button<Props>`
  width: calc(100% - 40px);
  height: 72px;
  margin: 0 20px;
  border-radius: 14px;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  position: absolute;
  bottom: 36px;
  border: 0;
`;

export default BottomBtn;
