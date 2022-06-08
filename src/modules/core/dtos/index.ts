export interface StartFileRequest {
  params: {
    filePath: string;
    fileType: 'utf-8';
  };
}

export interface StartFileProps {
  filePath: string;
  fileType: 'utf-8';
}
