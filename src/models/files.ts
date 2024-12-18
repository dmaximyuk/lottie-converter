type ProcessingFileResponseItems<T> = {
  default: T;
  compressed: T;
};

export interface ProcessingFileResponse {
  data: ProcessingFileResponseItems<Uint8Array>;
  file: {
    name: string;
    size: ProcessingFileResponseItems<number>;
  };
}
