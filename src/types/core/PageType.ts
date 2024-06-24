import { Document as RichTextDocument } from '@contentful/rich-text-types';

import { CommonType, ImageType } from '@/types/core';

export interface PageType extends CommonType {
  body?: RichTextDocument | null;
  images: ImageType[];
}
