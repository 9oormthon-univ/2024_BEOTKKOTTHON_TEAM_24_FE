import {
  deleteInsight,
  getFolderInsight,
  getFolderInsightByTag,
  getInsight,
  getRecommendedInsight,
  getSharedFolder,
  postImage,
  postInsight,
  postInsightOGImage,
  putInsight,
} from '@/api/insight';
import {
  InsightOGImagePostRequest,
  InsightPostRequest,
  InsightPostResponse,
  InsightPutRequest,
} from '@/types/insight';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useGetSharedFolder(folderId: number) {
  return useQuery({
    queryKey: ['shared-folder'],
    queryFn: () => getSharedFolder(folderId),
  });
}

export function useGetFolderInsight(folderId: number) {
  return useQuery({
    queryKey: ['folder-insight'],
    queryFn: () => getFolderInsight(folderId),
  });
}

export function usePostInsightImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postImage(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['insight-image'] }),
  });
}

export function usePostInsight() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: InsightPostRequest) => postInsight(data),
    onSuccess: (data: InsightPostResponse) => {
      queryClient.invalidateQueries({ queryKey: ['insight'] });
      router.replace({
        pathname: '/upload/saved',
        query: { insightId: data },
      });
    },
  });
}

export function useGetInsight(insightId: number) {
  return useQuery({
    queryKey: ['insight'],
    queryFn: () => getInsight(insightId),
  });
}

export function useGetFolderInsightByTag(folderId: number, tag: string) {
  return useQuery({
    queryKey: ['folder-insight-tag'],
    queryFn: () => getFolderInsightByTag(folderId, tag),
  });
}

export function usePostInsightOGImage() {
  return useMutation({
    mutationFn: (imageData: InsightOGImagePostRequest) =>
      postInsightOGImage(imageData),
  });
}

export function useGetRecommendedInsight() {
  return useQuery({
    queryKey: ['recommenede-insight'],
    queryFn: getRecommendedInsight,
  });
}

export function usePutInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (insightData: InsightPutRequest) => putInsight(insightData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['insight'] }),
  });
}

export function useDeleteInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (insightId: number) => deleteInsight(insightId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['insight'] }),
  });
}
