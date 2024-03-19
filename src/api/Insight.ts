import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SummarizeInsightResponse {
  choices: { message: { content: string}} [];
}

const fetchSummary = async (link: string) => {
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
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are helpful assistant. Your job is Get title of article, and summarize the article accessible through the provided link in one sentence in Korean, and extract three keywords that can be used for classification purposes.' },
        { role: 'user', content: link },
      ],
      max_tokens: 5000,
    },
  };
  const response = await axios.request(config);

  return response.data as SummarizeInsightResponse;
};

export const useGetSummary = (link: string) => {
  const { isLoading, error, data } = useQuery({queryKey: ["get-summary"], queryFn: () => fetchSummary(link), enabled: !!link});
  const result = {
    title: data?.choices?.[0]?.message.content.split("요약:")[0].split("제목:")[1],
    summary: data?.choices?.[0]?.message.content.split("요약:")[1].split("키워드:")[0],
    keywords: data?.choices?.[0]?.message.content.split("키워드:")[1].split(",")
  }
  return { isLoading, error, result };
};