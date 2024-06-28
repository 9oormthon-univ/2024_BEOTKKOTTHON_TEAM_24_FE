import styled from 'styled-components';
import LinkIcon from '@svg/link-icon.svg';

interface Props {
  top?: number;
  bottom?: number;
  errorText?: string;
  linkIcon?: boolean;
  biggerTypo?: 'title' | 'input';
  title?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClick?: () => void;
}

const InputWithTitle = (props: Props) => {
  const typo = props.biggerTypo || 'title';

  return (
    <Wrapper top={props.top} bottom={props.bottom} onClick={props.onClick}>
      <div className="header">
        {props.title && (
          <Title className={typo === 'title' ? 'Body-16-SB' : 'Body-14-M'}>
            {props.title}
          </Title>
        )}
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
    ${({ theme }) => theme.typo.Body_16_SB};
  }

  &.Body-14-M {
    ${({ theme }) => theme.typo.Body_14_M};
  }
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.palette.system.warning};
  ${({ theme }) => theme.typo.Body_14_M};
`;

type InputProps = {
  linkIcon: boolean;
};

const Input = styled.input<InputProps>`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.neutral[100]};
  color: black;
  padding: 14px 16px 14px ${(props) => (props.linkIcon ? '53px' : '16px')};
  border: none;
  outline: none;

  &.Body-16-SB {
    ${({ theme }) => theme.typo.Body_16_SB};
  }

  &.Body-14-M {
    ${({ theme }) => theme.typo.Body_14_M};
  }
`;
