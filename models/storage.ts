import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { v4 as uuidv4 } from 'uuid';

const appLocalStorageKey = 'https://github.com/marty-anz/excalidraw-locally';

export type ExcalidrawFile = {
  fileId: string;
  fileName: string;
  elements: readonly ExcalidrawElement[];
};

export type ExcalidrawLocally = {
  currentFileId?: string;
  files: Record<string, ExcalidrawFile>;
};

export function getExcalidrawLocally(): ExcalidrawLocally {
  const data = localStorage.getItem(appLocalStorageKey);

  if (!data) {
    return {
      currentFileId: 'untitled',
      files: {
        untitled: {
          fileId: 'untitled',
          fileName: 'untitled',
          elements: [],
        },
      },
    };
  }

  return JSON.parse(data);
}

export function saveExcalidrawLocally(data: ExcalidrawLocally) {
  localStorage.setItem(appLocalStorageKey, JSON.stringify(data));
}

export function getCurrentFile(data: ExcalidrawLocally): ExcalidrawFile {
  const currentFile = data.files[data.currentFileId || 'untitled'];

    if (!currentFile) {
      data.currentFileId = 'untitled';
      data.files.untitled = {
        fileId: 'untitled',
        fileName: 'untitled',
        elements: [],
      };

      return data.files.untitled;
    }

    return currentFile;
}

export function newFile(data: ExcalidrawLocally): ExcalidrawFile {
  const fileId = uuidv4();

  data.files[fileId] = {
    fileId,
    fileName: 'untitled',
    elements: [],
  };

  if (data.files.untitled) {
    const untitledFileId = uuidv4();

    data.files[untitledFileId] = data.files.untitled;
    data.files[untitledFileId].fileId = untitledFileId;

    delete data.files.untitled;
  }

  data.currentFileId = fileId;

  saveExcalidrawLocally(data);

  return data.files[fileId];
}
