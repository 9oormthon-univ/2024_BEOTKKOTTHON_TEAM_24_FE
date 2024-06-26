import BottomBtn from '@/components/common/BottomBtn';
import Header from '@/components/common/Header';
import ColorSelect from '@/components/folder/ColorSelect';
import { COLORLIST } from '@/constants/colors';
import { usePatchFolder } from '@/hooks/api/useFolder';
import { FolderPatchRequest } from '@/types/folder';
import { colorDecoder } from '@/utils/folder';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {}

const EditColor: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { folderId, folderColor, folderName } = router.query;
  const [newFolder, setNewFolder] = useState<FolderPatchRequest>({
    folderId: Number(folderId),
    folderColor: String(folderColor),
    folderName: String(folderName),
  });
  const { mutate, error } = usePatchFolder();
  const handleChangeColor = () => {
    mutate(newFolder);
    if (error) {
      alert('폴더 수정에 실패했어요. 다시 시도해주세요.');
    }
    router.push('/folder');
  };

  return (
    <>
      <Wrapper>
        <Header title="폴더 색상 수정" />
        <PageInner>
          <div className="icon">
            {colorDecoder(String(newFolder.folderColor), 'large')}
          </div>
          <div className="list">
            {COLORLIST.map((color: { color: string; code: string }) => (
              <ColorSelect
                key={color.color}
                color={color.color}
                code={color.code}
                currentColor={String(newFolder.folderColor)}
                onClick={() =>
                  setNewFolder({ ...newFolder, folderColor: color.color })
                }
              />
            ))}
          </div>
        </PageInner>
        <div onClick={() => handleChangeColor()}>
          <BottomBtn text="수정 완료" state="activated" />
        </div>
      </Wrapper>
    </>
  );
};

export default EditColor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.system.background};
  position: relative;
  justify-content: space-evenly;
  > :last-child {
    margin-bottom: 36px;
  }
`;

const PageInner = styled.div`
  flex: 1;
  width: calc(100% - 40px);
  margin: 36px auto 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .icon {
    width: 100%;
    display: flex;
    align-item: center;
    justify-content: center;
  }
  .list {
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 29px;
    margin-top: 75px;
  }
`;
