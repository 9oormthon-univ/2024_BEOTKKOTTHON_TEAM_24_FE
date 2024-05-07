import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';

type aiInput = {
  link: string;
  folderList: string[];
};

export default function useLinkInput() {
  const [insightLink, setInsightLink] = useState<aiInput>({
    link: '',
    folderList: [],
  });

  const updateInsightLink = (query:ParsedUrlQuery) => {
    const newLink = String(query.link);
    setInsightLink({
      link: newLink,
      folderList: query.folderNameList
        ? Array.isArray(query.folderNameList)
          ? query.folderNameList
          : [query.folderNameList]
        : [],
    });
  }
  return { insightLink, updateInsightLink }
}