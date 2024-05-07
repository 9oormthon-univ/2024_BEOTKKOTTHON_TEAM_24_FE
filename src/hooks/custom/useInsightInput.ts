import { InsightPostRequest } from '@/types/insight';
import { useCheckMainImage } from '@/utils/upload';
import { useState } from 'react';
import defaultImage from '@image/defaultImage.jpeg';
import { ParsedUrlQuery } from 'querystring';

interface InsightSummary {
  title: string | undefined;
  summary: string | undefined;
  keywords: string | undefined;
  folderName: string[] | undefined;
}

export default function useInsightInput(query: ParsedUrlQuery) {
  const image = useCheckMainImage(query?.imageList, String(query?.link));

  const [insightInput, setInsightInput] = useState<InsightPostRequest>({
    insightUrl: '',
    insightTitle: '',
    insightSummary: '',
    insightMainImage: image ?? defaultImage.src,
    insightSource: String(query?.source),
    viewCount: 0,
    insightTagList: [''],
    insightMemo: String(query?.memo),
    insightImageList: query?.insightImageList
      ? Array.isArray(query.insightImageList)
        ? query.insightImageList
        : [query.insightImageList]
      : [],
    folderName: '폴더',
    enable: false,
    remindType: 'DEFAULT',
    remindDays: [1],
  });

  const updateInsightInput = (result: InsightSummary) => {
    if (result.title) {
      setInsightInput({
        ...insightInput,
        insightTitle: result.title,
        insightSummary: String(result.summary),
        insightMainImage: image ? String(image) : defaultImage.src,
        insightTagList: result.keywords
          ? Array.isArray(result.keywords)
            ? result.keywords
            : result.keywords.split(', ')
          : [],
        folderName: String(result.folderName),
      });
    }
  };
  return { insightInput, setInsightInput, updateInsightInput };
}
