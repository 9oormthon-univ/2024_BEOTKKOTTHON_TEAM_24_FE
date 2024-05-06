import { api } from '@/api';
import {
  FolderInsightGetResponse,
  FolderSearchTagGetResponse,
  FolderShareGetResponse,
  InsightGetResponse,
  InsightOGImageGetRequest,
  InsightOGImageGetResponse,
  InsightPostRequest,
  InsightPostResponse,
  InsightPutRequest,
  RecommendGetResponse,
} from '@/types/insight';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SummarizeInsightResponse {
  choices: { message: { content: string } }[];
}

const fetchSummary = async (link: string, folderList: string[]) => {
  const apiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'system',
          content:
            'You are helpful assistant. Your job is Get title of article, summarize the article accessible through the provided link in one sentence in Korean, extract three keywords that can be used for classification purposes, and pick one name from the list of folder names I gave you that is the most appropriate for the article. Your response form is as follows: 제목:  , 요약: , 키워드: , 폴더명: ',
        },
        { role: 'user', content: `link: ${link}, list: ${folderList}` },
      ],
      max_tokens: 4000,
    },
  };
  const response = await axios.request(config);

  return response.data as SummarizeInsightResponse;
};

export const useGetSummary = (link: string, folderList: string[]) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['get-summary'],
    queryFn: () => fetchSummary(link, folderList),
    enabled: !!link,
  });
  // console.log(data?.choices);
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
  // console.log(result.folderName);
  return { isLoading, error, result };
};

// 공유 폴더 url 보기
export async function getSharedFolder(
  folderId: number,
): Promise<FolderShareGetResponse> {
  const response = await api.get(`/insight/share/${folderId}`);
  return response.data;
}

// 폴더 내 인사이트 리스트 가져오기
export async function getFolderInsight(
  folderId: number,
): Promise<FolderInsightGetResponse> {
  const response = await api.get(`/insight/folder/${folderId}`);
  return response.data;
}

export async function postImage(image: FormData) {
  const response = await api.post(`/insight/image`, image);
  return response.data;
}

// 인사이트 저장
export async function postInsight(
  insightData: InsightPostRequest,
): Promise<InsightPostResponse> {
  const response = await api.post(`/insight`, insightData);
  return response.data;
}

// 인사이트 상세보기
export async function getInsight(
  insightId: number,
): Promise<InsightGetResponse> {
  const response = await api.get(`/insight/${insightId}`);
  return response.data;
}

// 폴더에서 인사이트 태그 검색
export async function getFolderInsightByTag(
  folderId: number,
  tag: string,
): Promise<FolderSearchTagGetResponse> {
  const response = await api.get(`/insight/search/${folderId}/${tag}`);
  return response.data;
}

// 인사이트 링크 대표 이미지 제공
export async function getInsightOGImage(
  url: InsightOGImageGetRequest,
): Promise<InsightOGImageGetResponse> {
  const response = await api.get(`/insight/ogimage?url=${url}`);
  return response.data;
}

// 인사이트 추천
export async function getRecommendedInsight(): Promise<RecommendGetResponse> {
  const response = await api.get(`/insight/recommend`);
  return response.data;
}

// 인사이트 수정
export async function putInsight(insightData: InsightPutRequest) {
  const response = await api.put(`/insight`, insightData);
  return response.data;
}

// 인사이트 삭제
export async function deleteInsight(insightId: number) {
  const response = await api.delete(`/insight/${insightId}`);
  return response.data;
}
