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

export const ToArray = (input: string | string[] | undefined, type?: string) => {
  if (type === 'keyword')
    return input ? Array.isArray(input) ? input : input.split(', ') : []
  return input ? Array.isArray(input) ? input : [input] : []
}