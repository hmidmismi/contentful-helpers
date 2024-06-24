import { CommonType } from '@/types';

export type ImageType = Omit<CommonType, 'title' | 'slug'> & {
  src: string;
  alt: string;
  width: number;
  height: number;
};
