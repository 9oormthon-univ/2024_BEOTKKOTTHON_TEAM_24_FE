import { useRouter } from 'next/router';
import styled from 'styled-components';


const EditModal = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const handleDelete = (folderId: number) => { // 서버 연결시 수정 필요
    return folderId;
  }
  return (
    <Wrapper>
      <ModalBg />
      <Modal>
        <ModalBody>
          <ModalTitle>
            <Title>정말 삭제하시겠어요?</Title>
            <SubTitle>
              저장한 인사이트가 모두 삭제되며, 다시 복구할 수 없습니다.
            </SubTitle>
          </ModalTitle>
          <div className="button-row">
            <ModalButton onClick={()=>router.back()} className="cancel">취소</ModalButton>
            <ModalButton onClick={()=>handleDelete(Number(folderId))}>삭제</ModalButton>
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
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  display: flex;
  width: 356px;
  padding: 54px 20px 24px 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 18px;
  background: #fff;
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
  background: rgba(0, 0, 0, 0.51);
  backdrop-filter: blur(1.5px);
  z-index: 1;
`;

const ModalBody = styled.div`
  width: 100%;
  background: white;
  display: flex;
  align-item: center;
  justify-content: center;
  flex-direction: column;
  gap: 44px;
  .button-row {
    display: flex;
    gap: 10px;
  }
  .cancel {
    border-radius: 8px;
    background: var(--Neutral-100, #f4f5f7);
    color: #565656;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  width: 210px;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
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

const SubTitle = styled.div`
  color: var(--Neutral-400, #565656);
  text-align: center;
  /* Body-16-SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
  word-break: keep-all;
`;

const ModalButton = styled.button`
  display: flex;
  padding: 12px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  border: none;
  background: var(--Primary-500, #3184ff);
  color: #fff;

  /* Body-16-SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 22.4px */
`;
