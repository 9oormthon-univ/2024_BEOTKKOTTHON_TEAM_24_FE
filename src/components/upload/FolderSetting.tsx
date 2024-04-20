import styled from 'styled-components';
import RightIcon from '@svg/upload/right-arrow-icon.svg';

interface Props {
  folderName: string;
  setIsModal: (value: string) => void;
}

const FolderSetting = (props: Props) => {
  return (
    <Wrapper>
      <p>폴더 설정</p>
      <FolderIndicator>
        {props.folderName}
        <ChangeFolderBtn onClick={() => props.setIsModal('folder')}>
          <span>폴더 설정</span>
          <RightIcon />
        </ChangeFolderBtn>
      </FolderIndicator>
    </Wrapper>
  );
};

export default FolderSetting;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
  width: 100%;

  p {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const FolderIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  align-items: flex-end;
  border: none;
  border-radius: 8px;
  background: #f4f5f7;
`;

const ChangeFolderBtn = styled.div`
  display: flex;
  align-items: center;
  color: #7f7f7f;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.32px;
  cursor: pointer;

  span {
    margin-right: 8px;
  }
`;
