import styled from 'styled-components';

interface Props {
  top?: number;
  bottom?: number;
  biggerTypo: 'title' | 'input';
  title: string;
  value: string;
  onChnage: (value: string) => void;
  placeholder: string;
}

const InputWithTitle = (props: Props) => {
  console.log(props.bottom);
  return (
    <Wrapper top={props.top} bottom={props.bottom}>
      <Title
        className={props.biggerTypo === 'title' ? 'Body-16-SB' : 'Body-14-M'}
      >
        {props.title}
      </Title>
      <Input
        className={props.biggerTypo === 'input' ? 'Body-16-SB' : 'Body-14-M'}
        value={props.value}
        onChange={(e) => props.onChnage(e.target.value)}
        placeholder={props.placeholder}
      />
    </Wrapper>
  );
};

export default InputWithTitle;

type WrapperProps = {
  top?: number;
  bottom?: number;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => props.top || 0};
  margin-bottom: ${(props) => props.bottom || 0};
`;

const Title = styled.div`
  margin-bottom: 8px;

  &.Body-16-SB {
    font-size: 16px;
    font-weight: 600;
  }

  &.Body-14-M {
    font-size: 14px;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: #f4f5f7;
  color: black;
  padding: 14px 16px;
  border: none;
  outline: none;

  &.Body-16-SB {
    font-size: 16px;
    font-weight: 600;
  }

  &.Body-14-M {
    font-size: 14px;
    font-weight: 500;
  }
`;
