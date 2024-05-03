import {
  deleteInsight,
  fetchSummary,
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

export function usePostImageLink(image: FormData) {
  return useQuery({
    queryKey: ['image-link'],
    queryFn: () => postImage(image),
  });
}

export const useGetSummary = (link: string, folderList: string[]) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['get-summary'],
    queryFn: () => fetchSummary(link, folderList),
    enabled: !!link,
  });
  const result = {
    title: data?.choices?.[0]?.message.content
      .split('요약:')[0]
      .split('제목:')[1],
    summary: data?.choices?.[0]?.message.content
      .split('요약:')[1]
      .split('키워드:')[0],
    keywords: data?.choices?.[0]?.message.content
      .split('키워드:')[1]
      .split('폴더명:')[0],
    folderName: data?.choices?.[0]?.message.content
      .split('폴더명: ')[1]
      .split(','),
  };
  return { isLoading, error, result };
};

export function usePostInsight() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: InsightPostRequest) => postInsight(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insight'] });
      router.replace('/upload/saved');
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
