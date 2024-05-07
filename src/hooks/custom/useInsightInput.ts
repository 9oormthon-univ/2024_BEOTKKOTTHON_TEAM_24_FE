import { InsightPostRequest } from '@/types/insight';
import { ToArray, useCheckMainImage } from '@/utils/upload';
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
    insightImageList: ToArray(query?.insightImageList),
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
        insightTagList: ToArray(result.keywords, 'keyword'),
        folderName: String(result.folderName),
      });
    }
  };
  return { insightInput, setInsightInput, updateInsightInput };
}
