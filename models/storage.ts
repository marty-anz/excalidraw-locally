import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
const appLocalStorageKey = 'https://github.com/marty-anz/excalidraw-locally';

export type ExcalidrawFile = {
  fileId: string;
  fileName: string;
  elements: readonly ExcalidrawElement[];
};

export type ExcalidrawLocally = {
  files: Record<string, ExcalidrawFile>;
};

export function getExcalidrawLocally(): ExcalidrawLocally {
  const data = localStorage.getItem(appLocalStorageKey);

  if (!data) {
    return {
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
