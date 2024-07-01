export interface IVolumeInfo {
  id: number;
  title: string;
  authors?: string[];
  description?: string;
  imageLinks: {
    thumbnail: string;
  };
}

export interface IBook {
  id: string;
  volumeInfo: IVolumeInfo;
}

export interface BookState {
  books: IBook[];
  error: any;
  status: "idle" | "loading" | "succeed" | "failed";
}

