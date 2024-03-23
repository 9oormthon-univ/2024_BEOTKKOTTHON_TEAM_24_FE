import { api } from '@/api/index';

export async function deleteFolder(folderId: number) {
  const response = await api.delete(`/folder/${folderId}`);
  return response;
}
