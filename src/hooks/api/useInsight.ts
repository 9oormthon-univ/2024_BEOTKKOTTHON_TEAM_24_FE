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
  getInsightOGImage,
  putInsight,
} from '@/api/insight';
import {
  InsightOGImageGetRequest,
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

export function usePostInsight(insightInput: InsightPostRequest) {
  const { insightTitle, insightMainImage, insightSummary, insightTagList } =
    insightInput;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: InsightPostRequest) => postInsight(data),
    onSuccess: (data: InsightPostResponse) => {
      queryClient.invalidateQueries({ queryKey: ['insight'] });
      router.replace({
        pathname: '/upload/saved',
        query: {
          insightId: data,
          insightTitle,
          insightMainImage,
          insightSummary,
          insightTagList,
        },
      });
    },
  });
}

export function useGetInsight(insightId: number) {
  return useQuery({
    queryKey: ['insight', insightId],
    queryFn: () => getInsight(insightId),
  });
}

export function useGetFolderInsightByTag(folderId: number, tag: string) {
  return useQuery({
    queryKey: ['folder-insight-tag'],
    queryFn: () => getFolderInsightByTag(folderId, tag),
  });
}

export function useGetInsightOGImage(url: InsightOGImageGetRequest) {
  return useQuery({
    queryKey: ['ogimage'],
    queryFn: () => getInsightOGImage(url),
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
