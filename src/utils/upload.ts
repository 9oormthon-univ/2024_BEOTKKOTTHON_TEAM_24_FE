import { useGetInsightOGImage } from '@/hooks/api/useInsight';
import { InsightOGImageGetRequest } from '@/types/insight';
// import defaultImage from '@image/defaultImage.jpeg';

export const useCheckMainImage = (
  imageList: string[] | string | undefined,
  link: InsightOGImageGetRequest,
) => {
  const { data, isSuccess } = useGetInsightOGImage(link);
  if (Array.isArray(imageList) && imageList.length > 0) return imageList[0];
  if (typeof imageList === 'string') return imageList;
  if (isSuccess) return data;
  //   return defaultImage;
};
