import { insightInput } from '@/pages/upload/input-text';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  onClose: () => void;
  onSelect: React.Dispatch<React.SetStateAction<insightInput>>;
  insightInput: insightInput;
};

type Folder = {
  name: string;
  mainColor: string;
  subColor: string;
};

const SelectFolderModal = (props: Props) => {
  const [isMakingFolder, setIsMakingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({
    name: '',
    mainColor: '',
    subColor: '',
  });
  const [folderList, setFolderList] = useState([
    {
      name: 'UX/UI',
      mainColor: '#FEACBB',
      subColor: '#FFD8DF',
    },
    {
      name: '미드저니',
      mainColor: '#A1D0FF',
      subColor: '#D7EBFF',
    },
    {
      name: '책 요약',
      mainColor: '#BFA9FF',
      subColor: '#E2D8FF',
    },
    {
      name: '미드저니',
      mainColor: '#FFC19E',
      subColor: '#FFE5D7',
    },
  ]);

  const handleBlur = () => {
    setIsMakingFolder(false);
    setNewFolderName('');
  };

  const checkEnter = (key: string) => {
    if (key === 'Enter') {
      setNewFolderName('');
      setIsMakingFolder(false);
    }
  };

  const handleFolder = (folder: Folder) => {
    props.onSelect({ ...props.insightInput, folder: folder });
    setFolderList(folderList);
    props.onClose();
  };

  return (
    <>
      <Wrapper>
        <ModalHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="5"
            viewBox="0 0 36 5"
            fill="none"
          >
            <path
              d="M0 2.5C0 1.11929 1.11929 0 2.5 0H33.5C34.8807 0 36 1.11929 36 2.5C36 3.88071 34.8807 5 33.5 5H2.5C1.11929 5 0 3.88071 0 2.5Z"
              fill="#3C3C43"
              fill-opacity="0.3"
            />
          </svg>
        </ModalHeader>
        <ModalBody>
          <ModalTitle>
            <Title>폴더 설정</Title>
            <CompleteBtn onClick={() => handleFolder(selectedFolder)}>저장</CompleteBtn>
          </ModalTitle>
          <SearchSection>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.44121 12.0055C7.80132 12.2323 7.12169 12.3275 6.44356 12.2849C6.22073 12.271 5.99806 12.2421 5.77701 12.1982C4.79676 12.0033 3.90049 11.522 3.19882 10.8207C3.19845 10.8203 3.19807 10.8199 3.19769 10.8195C3.08184 10.7036 2.9713 10.5818 2.86657 10.4542C2.5497 10.0682 2.2944 9.64019 2.1061 9.18537C2.09111 9.14918 2.07655 9.11282 2.06242 9.0763C1.83984 8.50108 1.72317 7.88562 1.72308 7.25974C1.72307 7.25918 1.72307 7.25863 1.72307 7.25807C1.72101 6.59662 1.85021 5.94132 2.1032 5.33014C2.10313 5.3303 2.10327 5.32998 2.1032 5.33014C2.3561 4.71937 2.7278 4.16433 3.1964 3.69807C3.19668 3.69779 3.19696 3.69752 3.19724 3.69724C3.19706 3.69741 3.19742 3.69706 3.19724 3.69724C3.19734 3.69714 3.19798 3.69651 3.19808 3.69641V3.69807C3.1979 3.69825 3.19825 3.6979 3.19808 3.69807C3.19818 3.69797 3.19881 3.69734 3.19891 3.69724C3.19919 3.69696 3.19946 3.69668 3.19974 3.69641C3.19961 3.69654 3.19987 3.69628 3.19974 3.69641C4.00736 2.88974 5.06497 2.38145 6.19808 2.25448C6.22044 2.25197 6.24284 2.24961 6.26526 2.2474C6.37793 2.23631 6.49064 2.22904 6.6032 2.22555C7.64891 2.19318 8.68197 2.48743 9.55655 3.07176C9.7439 3.19694 9.92174 3.33393 10.0892 3.48156C10.7875 4.0972 11.305 4.89769 11.5778 5.79692C11.6761 6.12071 11.7408 6.45148 11.7723 6.78423C11.8411 7.51111 11.7513 8.24746 11.5055 8.94117C11.4764 9.02333 11.445 9.1049 11.4115 9.18579C11.2382 9.60441 11.0105 9.99462 10.7364 10.3475C10.4787 10.6794 10.1801 10.9782 9.84725 11.2367C9.62395 11.41 9.38526 11.5652 9.13318 11.7C8.90936 11.8196 8.67801 11.9216 8.44121 12.0055ZM12.7737 10.2094C12.5732 10.6168 12.3303 11.0056 12.0472 11.3689L16.4789 15.8006C16.6307 15.9577 16.7147 16.1682 16.7128 16.3867C16.7109 16.6052 16.6233 16.8142 16.4688 16.9688C16.3143 17.1233 16.1052 17.2109 15.8867 17.2128C15.6682 17.2147 15.4577 17.1307 15.3006 16.9789L10.8689 12.5472C10.5681 12.7818 10.2496 12.9887 9.91741 13.1669C9.84867 13.2037 9.77933 13.2394 9.70944 13.2737C8.67124 13.7846 7.51075 14.0211 6.34032 13.9485C6.04044 13.9299 5.74371 13.8912 5.45194 13.8333C4.15788 13.5765 2.96138 12.941 2.01974 11.9981C1.86452 11.8429 1.7173 11.6805 1.57851 11.5116C1.27969 11.1477 1.01998 10.7534 0.803745 10.3349C0.717536 10.1681 0.638237 9.99751 0.566124 9.82348C0.40631 9.43779 0.283275 9.03896 0.198077 8.63231C0.10412 8.18385 0.0561782 7.72587 0.0556682 7.2655C0.0556661 7.26366 0.0556649 7.26183 0.0556643 7.25999C0.0556642 7.25935 0.0556641 7.25871 0.0556641 7.25807C0.0556641 6.7952 0.103615 6.33471 0.198077 5.88384C0.283199 5.47755 0.406089 5.07907 0.565693 4.69371C0.565837 4.69336 0.565981 4.69301 0.566124 4.69267C0.709528 4.34659 0.881349 4.01397 1.07941 3.69807C1.07976 3.69752 1.08011 3.69696 1.08046 3.69641C1.34743 3.27089 1.66202 2.87574 2.01892 2.51889C2.0192 2.51862 2.01947 2.51835 2.01974 2.51807C2.02091 2.5169 2.02208 2.51573 2.02326 2.51456C3.12162 1.41555 4.56422 0.735766 6.10136 0.583449C6.13356 0.580259 6.1658 0.5773 6.19808 0.574573C6.315 0.564696 6.43245 0.557868 6.55029 0.554138C7.95491 0.509679 9.32991 0.907974 10.4859 1.68079C10.7332 1.84615 10.9705 2.02865 11.196 2.22763C12.1363 3.0576 12.8178 4.12829 13.1757 5.31213C13.3046 5.73858 13.3915 6.1797 13.4334 6.62955C13.5355 7.72641 13.365 8.82176 12.949 9.82252C12.8947 9.95314 12.8363 10.0822 12.7737 10.2094Z"
                fill="#858585"
              />
            </svg>
            <SearchInput placeholder="폴더 검색" />
          </SearchSection>
          <FolderSection>
            <AddFolder onClick={() => setIsMakingFolder(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="75"
                viewBox="0 0 100 75"
                fill="none"
              >
                <rect width="100" height="75" rx="5" fill="#B6B5B5" />
                <path
                  d="M50.875 30V45.75"
                  stroke="white"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
                <path
                  d="M58.75 37.875L43 37.875"
                  stroke="white"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
              </svg>
              {isMakingFolder ? (
                <FolderInput
                  value={newFolderName}
                  placeholder="폴더 이름 입력"
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDownCapture={(e) => checkEnter(e.key)}
                />
              ) : (
                <FolderTitle>새 폴더 만들기</FolderTitle>
              )}
            </AddFolder>
            <FolderList>
              {folderList.map((folder, idx) => (
                <Folder key={idx} onClick={() => setSelectedFolder(folder)} className={selectedFolder.mainColor === folder.mainColor ? "selected" : ""}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="104"
                    height="78"
                    viewBox="0 0 104 78"
                    fill="none"
                  >
                    <path
                      d="M93.6874 8.3619H53.0199L46.7327 3.61569C44.9869 1.90515 42.6096 0.939453 40.1237 0.939453H6.7892C4.6975 0.939453 3 2.58504 3 4.6117V67.6072C3 72.6133 7.18743 76.6753 12.3483 76.6753H93.6874C98.8523 76.6753 103.036 72.6176 103.036 67.6072V17.4299C103.036 12.4239 98.8483 8.3619 93.6874 8.3619Z"
                      fill={folder.subColor}
                    />
                    <g filter="url(#filter0_d_329_7776)">
                      <path
                        d="M40.8081 12.8783L10.3837 19.3103C8.51546 19.7052 7.29838 21.6558 7.66525 23.6671L15.2528 65.2637C15.6197 67.2749 17.4315 68.5852 19.2998 68.1902L49.7242 61.7583C51.5924 61.3633 52.8094 59.4127 52.4426 57.4015L44.855 15.8048C44.4882 13.7936 42.6763 12.4833 40.8081 12.8783Z"
                        fill="white"
                      />
                    </g>
                    <g filter="url(#filter1_d_329_7776)">
                      <path
                        d="M68.0114 19.8672H37.0059C35.102 19.8672 33.5586 21.5288 33.5586 23.5784V65.9695C33.5586 68.0192 35.102 69.6807 37.0059 69.6807H68.0114C69.9153 69.6807 71.4587 68.0192 71.4587 65.9695V23.5784C71.4587 21.5288 69.9153 19.8672 68.0114 19.8672Z"
                        fill="white"
                      />
                    </g>
                    <g filter="url(#filter2_d_329_7776)">
                      <path
                        d="M92.6774 14.1484H61.6719C59.768 14.1484 58.2246 15.81 58.2246 17.8597V60.2508C58.2246 62.3004 59.768 63.962 61.6719 63.962H92.6774C94.5813 63.962 96.1247 62.3004 96.1247 60.2508V17.8597C96.1247 15.81 94.5813 14.1484 92.6774 14.1484Z"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M3 38.8047H103.04V70.7074C103.04 74.6957 100.031 77.9393 96.3222 77.9393H9.71759C6.01286 77.9393 3 74.7001 3 70.7074V38.8047Z"
                      fill={folder.mainColor}
                    />
                    <defs>
                      <filter
                        id="filter0_d_329_7776"
                        x="0.599609"
                        y="5.80859"
                        width="52.9082"
                        height="63.4512"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-3" dy="-3" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_329_7776"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_329_7776"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_329_7776"
                        x="26.5586"
                        y="12.8672"
                        width="45.9004"
                        height="57.8145"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-3" dy="-3" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_329_7776"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_329_7776"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter2_d_329_7776"
                        x="51.2246"
                        y="7.14844"
                        width="45.9004"
                        height="57.8145"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-3" dy="-3" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_329_7776"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_329_7776"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                  {folder.name}
                </Folder>
              ))}
            </FolderList>
          </FolderSection>
        </ModalBody>
      </Wrapper>
      <ModalBg onClick={() => props.onClose()} />
    </>
  );
};

export default SelectFolderModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 393px;
  height: 856px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 393px;
  height: 856px;
  flex-shrink: 0;
  z-index: 2;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 393px;
  height: 38px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Neutral-150, #e1e1e1);
  border-radius: 8px 8px 0px 0px;
  background: white;
`;

const ModalBody = styled.div`
  width: 393px;
  height: 608px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 0px;
  gap: 34px;
`;

const ModalTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  text-align: center;
  /* Body-18-B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  margin-top: 18px;
`;

const CompleteBtn = styled.div`
  position: absolute;
  top: 18px;
  right: 0px;
  color: var(--Primary-500, #3184ff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  cursor: pointer;
`;

const SearchSection = styled.div`
  display: flex;
  width: 353px;
  padding: 10px 16px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #f4f5f7;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
  letter-spacing: -0.32px;
  background: #f4f5f7;
`;

const FolderSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddFolder = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  cursor: pointer;
  padding: 0px 21px;
`;

const FolderTitle = styled.div`
  color: var(--Neutral-500, #1f1f1f);
  /* Body-18-B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
`;

const FolderInput = styled.input`
  outline: none;
  border: none;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.32px;
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  .selected {
    background: var(--Neutral-100, #F4F5F7);
    border-radius: 8px;
  }
`;

const Folder = styled(AddFolder)`
  display: flex;
  width: 393px;
  height: 96px;
  padding: 0px 20px;
`;
