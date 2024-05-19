import Header from '@/components/common/Header';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import { Folder, FolderPatchRequest } from '@/types/folder';
import EditModal from '@/components/folder/EditModal';
import SearchSection from '@/components/common/SearchSection';
import { useGetFolder, usePatchFolder } from '@/hooks/api/useFolder';
import RenderFolderList from '@/components/folder/edit/RenderFolderList';
import { useRouter } from 'next/router';

interface Props {}

const FolderEdit: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const { data } = useGetFolder();
  const { mutate, error } = usePatchFolder();

  const [newFolderList, setNewFolderList] = useState<Folder[]>(
    data ? data : [],
  );
  const [searchedFolderList, setSearchedFolderList] = useState<Folder[]>([]);
  const [targetFolder, setTargetFolder] = useState<Folder>(newFolderList[0]);
  const [editedFolderList, setEditedFolderList] = useState<
    FolderPatchRequest[]
  >([]);
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

  const handleSaveFolders = () => {
    const saveRequests = editedFolderList.map((folder) => mutate(folder));
    Promise.all(saveRequests).then(() => {
      alert('변경된 폴더 리스트가 저장되었습니다.');
      router.push('/folder');
    });
    if (error) {
      alert('폴더 저장에 실패하였습니다. 다시 시도해주세요');
      console.error(error);
    }
  };
  return (
    <>
      <Wrapper>
        <Header title="폴더 편집하기" />
        <span className="link save" onClick={() => handleSaveFolders()}>
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
            editedFolderList={editedFolderList}
            setEditedFolderList={setEditedFolderList}
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
