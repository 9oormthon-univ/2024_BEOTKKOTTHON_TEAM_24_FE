import Header from '@/components/common/Header';
import { colorList } from '@/constants/colors';
import { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import ColorSelect from '@/components/folder/ColorSelect';
import BottomBtn from '@/components/common/BottomBtn';

interface Props {}

const FolderMake: NextPage<Props> = ({}) => {
  const [newFolder, setNewFolder] = useState({
    folderId: 0,
    folderName: '',
    folderColor: 'BLUE',
    insightCount: 0,
  });
  const [isValidName, setIsValidName] = useState(true);
  const handleInput = (value: string) => {
    const regex = /^[가-힣a-zA-Z]{2,15}$/;
    setNewFolder({ ...newFolder, folderName: value });
    setIsValidName(regex.test(value));
  };
  return (
    <>
      <Wrapper>
        <Header title="폴더 생성하기" />
        <PageInner>
          <TitleSection>
            <SubTitle>폴더명</SubTitle>
            <Input
              type="text"
              value={newFolder.folderName}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="폴더명을 입력해 주세요."
            />
            <ValidateText className={isValidName ? '' : 'error'}>
              {newFolder.folderName.length > 15
                ? '15자 이내로 작성해주세요.'
                : '*2글자 이상의 한글 혹은 영문으로 작성해주세요.'}
            </ValidateText>
          </TitleSection>
          <ColorSection>
            <SubTitle>폴더 색상</SubTitle>
            <div className="list">
              {colorList.map((color: { color: string; code: string }) => (
                <ColorSelect
                  key={color.color}
                  color={color.color}
                  code={color.code}
                  newFolder={newFolder}
                  onClick={() =>
                    setNewFolder({ ...newFolder, folderColor: color.color })
                  }
                />
              ))}
            </div>
          </ColorSection>
        </PageInner>

        {newFolder.folderName !== '' && isValidName ? (
          <BottomBtn text="완료" state="activated" nextUrl="/folder" />
        ) : (
          <BottomBtn text="완료" state="disabled" />
        )}
      </Wrapper>
    </>
  );
};

export default FolderMake;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fbfbfb;
  position: relative;
  justify-content: center;
  :last-child {
    margin-bottom: 36px;
  }
`;

const PageInner = styled.div`
  flex: 1;
`;

const TitleSection = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 20px auto;
  flex-direction: column;
  gap: 10px;
  .error {
    color: var(--System-Warning, #f1404b);
  }
  input::placeholder {
    color: var(--Neutral-200, #989898);
  }
`;

const SubTitle = styled.div`
  margin-bottom: 8px;
  color: var(--Neutral-500, #1f1f1f);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const Input = styled.input`
  width: 100%
  margin: auto;
  height: 51px;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 8.235px;
  background: #f4f5f7;
  color: black;
`;

const ValidateText = styled.div`
  margin-top: 14px;
  color: var(--Neutral-200, #989898);
  /* Body-14-M */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
`;

const ColorSection = styled.div`
  width: calc(100% - 40px);
  margin: 36px auto;
  display: flex;
  flex-direction: column;
  .list {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    margin-top: 36px;
    gap: 29px;
  }
`;
