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
        { role: 'system', content: 'You are helpful assistant. Your job is summarize the article accessible through the provided link in one sentence in Korean, and extract three keywords that can be used for classification purposes.' },
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
  const summary = data?.choices?.[0]?.message.content;

  return { isLoading, error, summary };
};