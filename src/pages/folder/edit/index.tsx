import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import { Folder } from '@/types/folder';
import EditModal from '@/components/folder/EditModal';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolder } from '@/hooks/api/useFolder';
import RenderFolderList from '@/components/folder/RenderFolderList';

interface Props {}

const FolderEdit: NextPage<Props> = ({}) => {
  const [searchInput, setSearchInput] = useState('');
  const { data } = useGetFolder();
  const [newFolderList, setNewFolderList] = useState<Folder[]>(data ? data : []);
  const [searchedFolderList, setSearchedFolderList] = useState<Folder[]>([]);
  const [targetFolder, setTargetFolder] = useState<Folder>(newFolderList[0]);
  const [isModalOn, setIsModalOn] = useState(false);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setSearchedFolderList(
      newFolderList.filter((folder) => folder.folderName.includes(value)),
    );
  };

  const handleModalOn = (folder: Folder) => {
    setTargetFolder(folder);
    setIsModalOn(true);
  };

  const saveFolder = () => {};
  return (
    <>
      <Wrapper>
        <Header title="폴더 편집하기" />
        <span className="link save" onClick={() => saveFolder()}>
          저장
        </span>
        <SearchSection
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="폴더 검색"
          top={20}
          bottom={20}
        />
        <FolderSection>
          <RenderFolderList
            folderList={searchInput === '' ? newFolderList : searchedFolderList}
            handleModalOn={handleModalOn}
            newFolderList={newFolderList}
            setNewFolderList={setNewFolderList}
          />
        </FolderSection>
        {isModalOn && (
          <EditModal
            type="edit"
            targetFolder={targetFolder}
            onClose={() => setIsModalOn(false)}
          />
        )}
      </Wrapper>
    </>
  );
};

export default FolderEdit;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  justify-content: center;
  .title {
    color: #1f1f1f;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 27.146px; /* 135.732% */
    height: 28px;
  }
  .link {
    color: var(--Primary-500, #3184ff);
    text-align: right;
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  }
  .save {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const FolderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

