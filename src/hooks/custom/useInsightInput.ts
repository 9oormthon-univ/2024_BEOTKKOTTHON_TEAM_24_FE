import { InsightPostRequest } from '@/types/insight';
import { toArray, useCheckMainImage } from '@/utils/upload';
import { useState } from 'react';
import defaultImage from '@image/defaultImage.jpeg';
import { ParsedUrlQuery } from 'querystring';

interface InsightSummary {
  title?: string;
  summary?: string;
  keywords?: string;
  folderName?: string[];
}

interface InsightInputQuery extends ParsedUrlQuery {
  source: string;
  memo: string;
  imageList: string | string[];
  link: string;
}

export default function useInsightInput(query: ParsedUrlQuery) {
  const {
    source: insightSource,
    memo: insightMemo,
    imgURLs,
    link: insightUrl,
  }: InsightInputQuery = query as InsightInputQuery;

  const image = useCheckMainImage(imgURLs, insightUrl);

  const [insightInput, setInsightInput] = useState<InsightPostRequest>({
    insightUrl: insightUrl,
    insightTitle: '',
    insightSummary: '',
    insightMainImage: image ?? defaultImage.src,
    insightSource: insightSource,
    viewCount: 0,
    insightTagList: [''],
    insightMemo: insightMemo,
    insightImageList: toArray(imgURLs),
    folderName: '폴더',
    enable: false,
    remindType: 'DEFAULT',
    remindDays: [1],
  });

  const updateInsightInput = (result: InsightSummary) => {
    setInsightInput({
      ...insightInput,
      insightTitle: String(result.title),
      insightSummary: String(result.summary),
      insightTagList: result.keywords ? result.keywords.split(', ') : [],
      folderName: String(result.folderName),
    });
  };
  return { insightInput, setInsightInput, updateInsightInput };
}
