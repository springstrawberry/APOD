export interface APODData {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

export interface APODError {
  code: number;
  msg: string;
  service_version: string;
}

