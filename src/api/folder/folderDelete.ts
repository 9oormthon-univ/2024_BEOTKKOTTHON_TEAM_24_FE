import { api } from '@/api/index';

export async function deleteFolder(folderId: number) {
  const response = await api.get(`/folder/${folderId}`);
  return response;
}
