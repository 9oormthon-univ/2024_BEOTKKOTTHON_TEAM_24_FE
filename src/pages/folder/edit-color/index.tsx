import BottomBtn from '@/components/common/BottomBtn';
import Header from '@/components/common/Header';
import ColorSelect from '@/components/folder/ColorSelect';
import { COLORLIST } from '@/constants/colors';
import { Folder } from '@/types/folder';
import { colorDecoder } from '@/utils/folder';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

interface Props {}

const EditColor: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { folderId, folderColor, folderName, insightCount } = router.query;
  const [newFolder, setNewFolder] = useState<Folder>({
    folderId: Number(folderId),
    folderColor: String(folderColor),
    folderName: String(folderName),
    insightCount: Number(insightCount),
  });

  return (
    <>
      <Wrapper>
        <Header title="폴더 색상 수정" />
        <PageInner>
          <div className="icon">
            {colorDecoder(newFolder.folderColor, 'large')}
          </div>
          <div className="list">
            {COLORLIST.map((color: { color: string; code: string }) => (
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
        </PageInner>
        <BottomBtn text="수정 완료" state="activated" />
      </Wrapper>
    </>
  );
};

export default EditColor;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fbfbfb;
  position: relative;
  justify-content: space-evenly;
  :last-child {
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
    max-width: 390px;
    display: flex;
    flex-flow: wrap;
    gap: 29px;
    margin-top: 75px;
    justify-content: space-evenly;
  }
`;
