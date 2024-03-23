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
  InsightPutRequest,
} from '@/types/insight';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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

export function usePostImageLink(image: FormData, token: string) {
  return useQuery({
    queryKey: ['image-link'],
    queryFn: () => postImage(image, token),
  })
}

export function usePostInsight(insightData: InsightPostRequest, token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postInsight(insightData, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['insight'] }),
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
