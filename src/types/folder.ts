import { Insight } from './insight';

export type Folder = {
  folderId: number;
  folderName: string;
  folderColor: string;
  insightCount: number;
};

// GET /folder
export type FolderGetResponse = Folder[];

// POST /folder
export type FolderPostRequest = {
  folderName: string;
  folderColor: string;
};

export type FolderPostResponse = Folder[];

// PATCH /folder
export type FolderPatchRequest = {
  folderId: number;
  folderColor?: string;
  folderName?: string;
};

// POST /folder/search
export type FolderSearchPostRequest = {
  search: string;
};

export type FolderSearchPostResponse = Insight[];

// GET /folder/share
export type FolderUrlGetRequest = {
  folderId: number;
  copyable: boolean;
};

export type FolderUrlGetResponse = {
  url: string;
};

// GET /folder/copy/{folderId}

// POST /share
export type SaveFolderPostRequest = {
  folderId: number;
};
