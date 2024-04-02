import { api } from '@/api/index';
import {
  FolderGetResponse,
  FolderPatchRequest,
  FolderPostRequest,
  FolderPostResponse,
  FolderUrlGetRequest,
  FolderUrlGetResponse,
} from '@/types/folder';
import {
  FolderSearchPostRequest,
  FolderSearchPostResponse,
} from '@/types/folder';

// 폴더
export async function getFolder(): Promise<FolderGetResponse> {
  const response = await api.get(`/folder`);
  return response.data;
}

// 폴더 생성
export async function postFolder(
  folderData: FolderPostRequest,
): Promise<FolderPostResponse> {
  const response = await api.post(`/folder`, folderData);
  return response.data;
}

// 폴더 수정
export async function patchFolder(folderData: FolderPatchRequest) {
  const response = await api.patch(`/folder`, folderData);
  return response.data;
}

// 폴더 삭제
export async function deleteFolder(folderId: number) {
  const response = await api.delete(`/folder/${folderId}`);
  return response.data;
}

// 인사이트 전체 검색
export async function searchFolder(
  searchData: FolderSearchPostRequest,
): Promise<FolderSearchPostResponse> {
  const response = await api.post(`/folder/search`, searchData);
  return response.data;
}

// 폴더 공유하기
export async function shareFolder(
  shareData: FolderUrlGetRequest,
): Promise<FolderUrlGetResponse> {
  const response = await api.get(`/folder/share`, { params: shareData });
  return response.data;
}

// 공유 폴더 복제하기
export async function copySharedFolder(folderId: number) {
  const response = await api.get(`/folder/share/copy/${folderId}`);
  return response.data;
}
