import styled from 'styled-components';
import Image from 'next/image';
import NoImage from '@svg/no-image-icon.svg';
import DeleteImageIcon from '@svg/DeleteImageIcon';
import AddImageIcon from '@svg/add-image-icon.svg';

interface Props {
  imageList: string[];
  setImageList: (imageList: string[]) => void;
}

const UploadImage = (props: Props) => {
  const handleClickDelete = (idx: number) => {
    const newList = props.imageList.filter(
      (img) => idx !== props.imageList.indexOf(img),
    );
    props.setImageList(newList);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files) return;
    // 이미지 화면에 띄우기
    const newImagesURL = Array.from(
      e?.target.files,
      (file: Blob | MediaSource) => URL.createObjectURL(file),
    );
    const newList = props.imageList.concat(newImagesURL);
    if (newList.length > 10) {
      alert('이미지는 10장 이상 추가할 수 없습니다.');
      return;
    }
    props.setImageList(newList);
  };

  return (
    <Wrapper>
      <Title>
        <p className="title">이미지</p>
        <p className="image-counter">{props.imageList.length}/10</p>
      </Title>
      {props.imageList.length < 1 ? ( // 이미지가 없는 초기 상태
        <>
          <label htmlFor="imgfile">
            <ImageWrapper>
              <NoImage />
            </ImageWrapper>
          </label>
          <FileInput
            type="file"
            onChange={handleImage}
            name="imgfile"
            id="imgfile"
            accept=".png, .jpeg, .jpg"
            multiple
          />
        </> // 이미지 추가 시
      ) : (
        <ImageListContainer className="no-scroll">
          {props.imageList.map((url, idx) => (
            <div key={idx} className="image-wrapper">
              <Image
                src={url}
                alt={'preview'}
                className="addedImg"
                key={idx}
                width={131}
                height={131}
              />
              <DeleteImageIcon idx={idx} onClick={handleClickDelete} />
            </div>
          ))}
          <AddBtnWrapper>
            <label htmlFor="imgfile">
              <AddImageIcon className="add-btn" />
            </label>
            <FileInput
              type="file"
              onChange={handleImage}
              name="imgfile"
              id="imgfile"
              accept=".png, .jpeg, .jpg,"
              multiple
            />
          </AddBtnWrapper>
        </ImageListContainer>
      )}
    </Wrapper>
  );
};

export default UploadImage;

const Wrapper = styled.div`
  width: 100%;
  margin: 24px 0;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;

  .title {
    font-size: 16px;
    font-weight: 600;
  }

  .image-counter {
    font-size: 14px;
    font-weight: 500;
    color: #565656;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 131px;
  height: 131px;
  flex-shrink: 0;
  border-radius: 8.24px;
  background: #f4f5f7;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 131px;
  overflow-x: scroll;

  .add-btn {
    margin-left: 23px;
    cursor: pointer;
  }
  .image-wrapper {
    position: relative;
    width: 131px;
    height: 131px;
    margin-right: 7px;
  }
  .addedImg {
    width: 131px;
    height: 131px;
    flex-shrink: 0;
    border-radius: 8.24px;
    background: #f4f5f7;
    object-fit: cover;
  }
`;

const AddBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 131px;
  padding-right: 30px;
`;
