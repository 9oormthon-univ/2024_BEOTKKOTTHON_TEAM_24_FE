import { useGetInsightOGImage } from '@/hooks/api/useInsight';
import { InsightOGImageGetRequest } from '@/types/insight';

export const useCheckMainImage = (
  imageList: string[] | string | undefined,
  link: InsightOGImageGetRequest,
) => {
  const { data, isSuccess } = useGetInsightOGImage(link);
  if (Array.isArray(imageList) && imageList.length > 0) return imageList[0];
  if (typeof imageList === 'string') return imageList;
  if (isSuccess && data !== 'notExist') return data;
};

export const toArray = (input: string | string[] | undefined) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return [input];
}