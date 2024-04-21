import styled from 'styled-components';
import LinkIcon from '@svg/link-icon.svg';

interface Props {
  top?: number;
  bottom?: number;
  errorText?: string;
  linkIcon?: boolean;
  biggerTypo?: 'title' | 'input';
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputWithTitle = (props: Props) => {
  const typo = props.biggerTypo || 'title';

  return (
    <Wrapper top={props.top} bottom={props.bottom}>
      <div className="header">
        <Title className={typo === 'title' ? 'Body-16-SB' : 'Body-14-M'}>
          {props.title}
        </Title>
        <ErrorText>{props.errorText}</ErrorText>
      </div>
      <div className="input">
        <Input
          className={typo === 'input' ? 'Body-16-SB' : 'Body-14-M'}
          linkIcon={props.linkIcon || false}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
        {props.linkIcon && <LinkIcon className="link-icon" />}
      </div>
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
  margin-top: ${(props) => props.top || 0}px;
  margin-bottom: ${(props) => props.bottom || 0}px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .input {
    position: relative;
  }

  .link-icon {
    position: absolute;
    left: 16px;
    top: 12px;
    pointer-events: none;
  }
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

const ErrorText = styled.div`
  color: #f1404b;
  font-size: 14px;
  font-weight: 500;
`;

type InputProps = {
  linkIcon: boolean;
};

const Input = styled.input<InputProps>`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: #f4f5f7;
  color: black;
  padding: 14px 16px 14px ${(props) => (props.linkIcon ? '53px' : '16px')};
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
