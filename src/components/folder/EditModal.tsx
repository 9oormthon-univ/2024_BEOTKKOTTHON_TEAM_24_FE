import styled from 'styled-components';
import EditPencilIcon from '@svg/folder/edit-pencil-icon.svg';
import TrashIcon from '@svg/folder/trash-icon.svg';

interface Props {
  onClose: () => void;
  onColor: () => void;
  onDelete: () => void;
}

const EditModal = (props: Props) => {
  return (
    <Wrapper>
      <ModalBg onClick={() => props.onClose()} />
      <Modal>
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
            <Title>편집하기</Title>
          </ModalTitle>
          <div
            className="modal-btn edit-btn"
            onClick={() => props.onColor()}
          >
            폴더 색상 수정
            <EditPencilIcon />
          </div>
          <div
            className="modal-btn delete-btn"
            onClick={() => props.onDelete()}
          >
            삭제하기
            <TrashIcon />
          </div>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

export default EditModal;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  max-width: 480px;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  flex-shrink: 0;
  z-index: 2;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  max-width: 480px;
  height: 100%;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.63);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Neutral-150, #e1e1e1);
  border-radius: 8px 8px 0px 0px;
  background: white;
`;

const ModalBody = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 18px;
  padding-bottom: 51px;
  .modal-btn {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 18px 16px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background: var(--Neutral-100, #f4f5f7);

    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px; /* 131.25% */
    letter-spacing: -0.32px;
  }
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
