import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FolderList } from '@/constants/FolderList';
import { colorDecoder } from '@/utils/folder';
import NavigationLayout from '@/components/common/NavigationLayout';
import SearchSection from '@/components/common/SearchSection';

interface Props {}

const Folder: NextPage<Props> = ({}) => {
  const router = useRouter();
  return (
    <>
      <NavigationLayout>
        <Wrapper>
          <div className="title">폴더</div>
          <span
            className="link edit"
            onClick={() => router.push('/folder/edit')}
          >
            편집
          </span>
          <SearchSection
            onClick={() => router.push('/folder/search')}
            placeholder="인사이트 검색"
            top={20}
            bottom={20}
          />
          <FolderSection>
            <div className="header">
              <div>
                <span className="title-m">전체 폴더</span>
                <span>{FolderList.length}</span>
              </div>
              <span
                className="link"
                onClick={() => router.push('/folder/make')}
              >
                폴더 생성
              </span>
            </div>
            <div className="list-container">
              {FolderList.map((folder) => (
                <>
                  <IconContainer
                    onClick={() => router.push(`/folder/${folder.folderId}`)}
                  >
                    {colorDecoder(folder.folderColor, 'big')}
                    <span className="name">{folder.folderName}</span>
                    <span className="count">{folder.insightCount}</span>
                  </IconContainer>
                </>
              ))}
            </div>
          </FolderSection>
        </Wrapper>
      </NavigationLayout>
    </>
  );
};

export default Folder;

const Wrapper = styled.div`
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
    padding: 18px 20px 16px;
    height: 52px;
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
  .edit {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const FolderSection = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 240px);
  margin: auto;
  padding-top: 3px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-m {
    color: #1f1f1f;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 27.146px; /* 135.732% */
    height: 28px;
    padding-right: 6px;
  }
  .list-container {
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    gap: 52px 23px;
    flex-flow: wrap;
  }
`;

const IconContainer = styled.div`
  position: relative;
  .name {
    position: absolute;
    left: 15px;
    bottom: 31px;
    color: var(--Neutral-500, #1f1f1f);
    /* Body-16-SB */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
  }
  .count {
    left: 15px;
    bottom: 11px;
    position: absolute;
    color: var(--Neutral-400, #565656);
    /* Caption-12-M */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 16.8px */
  }
`;
