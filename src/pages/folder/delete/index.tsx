import { useDeleteFolder } from '@/hooks/api/useFolder';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const EditModal = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const { mutate, error } = useDeleteFolder();

  const handleDelete = (folderId: number) => {
    mutate(folderId);
    if (error) {
      alert('폴더 삭제에 실패했습니다. 다시 시도해주세요.');
    }
    router.push('/folder');
  };
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
            <ModalButton onClick={() => router.back()} className="cancel">
              취소
            </ModalButton>
            <ModalButton onClick={() => handleDelete(Number(folderId))}>
              삭제
            </ModalButton>
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
  z-index: 20;
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
    background-color: ${({ theme }) => theme.palette.neutral[100]};
    color: ${({ theme }) => theme.palette.neutral[400]};
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
  color: ${({ theme }) => theme.palette.neutral[500]};
  text-align: center;
  ${({ theme }) => theme.typo.Body_18_B};
  margin-top: 18px;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.palette.neutral[400]};
  text-align: center;
  ${({ theme }) => theme.typo.Body_16_SB};
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
  background: ${({ theme }) => theme.palette.primary[500]};
  color: #fff;
  ${({ theme }) => theme.typo.Body_16_SB};
`;
