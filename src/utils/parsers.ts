import { Entry, Asset, AssetLink } from 'contentful';

import { TypePageSkeleton, ImageType, PageType } from '@/types';

type PageEntry = Entry<TypePageSkeleton, undefined, string>;

export function parseContentfulContentImage(asset?: Asset<undefined, string> | { sys: AssetLink }): ImageType | null {
  if (!asset) {
    return null;
  }

  if (!('fields' in asset)) {
    return null;
  }

  return {
    id: asset.sys.id,
    src: asset.fields.file?.url || '',
    alt: asset.fields.description || '',
    width: asset.fields.file?.details.image?.width || 0,
    height: asset.fields.file?.details.image?.height || 0,
  };
}

export function parseContentfulPage(pageEntry?: PageEntry): PageType | null {
  if (!pageEntry) {
    return null;
  }

  // Guarantee "images" is an array, though possibly an empty array
  const images =
    pageEntry.fields.images?.map(parseContentfulContentImage).filter((img): img is ImageType => img !== null) || [];

  return {
    id: pageEntry.sys.id,
    title: pageEntry.fields.title || '',
    slug: pageEntry.fields.slug || '',
    body: pageEntry.fields.body || null,
    images,
  };
}
