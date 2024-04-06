import {
  copySharedFolder,
  deleteFolder,
  getFolder,
  patchFolder,
  postFolder,
  searchFolder,
  shareFolder,
} from '@/api/folder';
import {
  FolderPatchRequest,
  FolderPostRequest,
  FolderUrlGetRequest,
} from '@/types/folder';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/*
사용하고자 하는 컴포넌트에서 import해 아래와 같이 사용

useQuery:
const { data, isLoading(선택), error(선택) } = useGet~~()

useMutation:
const { mutate } = usePost~~() 
mutate(data)

한 곳에서 여러 mutate 사용할 경우 alias 지정:
const { mutate: postSomething } = usePost~~()
const { mutate: deleteSomething } = useDelete~~()
postSomething(data)
deleteSomething(id)
*/

export function useGetFolder() {
  return useQuery({ queryKey: ['folder'], queryFn: getFolder });
}

export function usePostFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData: FolderPostRequest) => postFolder(folderData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folder'] }),
  });
}

export function usePatchFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderData: FolderPatchRequest) => patchFolder(folderData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folder'] }),
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folder'] }),
  });
}

export function useSearchFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (searchData: string) =>
      searchFolder({
        search: searchData,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['search-folder'] }),
  });
}

export function useShareFolder(shareData: FolderUrlGetRequest) {
  return useQuery({
    queryKey: ['share-folder'],
    queryFn: () => shareFolder(shareData),
  });
}

export function useCopySharedFolder(folderId: number) {
  return useQuery({
    queryKey: ['copy-shared-folder'],
    queryFn: () => copySharedFolder(folderId),
  });
}
