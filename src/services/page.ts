// src/services/page

import { contentfulClient } from '@/lib';
import { TypePageSkeleton, PageType } from '@/types';
import { parseContentfulPage } from '@/utils';

type FetchPageOptions = {
  slug: string;
  // preview: boolean;
};

export async function fetchPages(): Promise<PageType[]> {
  const contentful = contentfulClient();

  const pagesResult = await contentful.getEntries<TypePageSkeleton>({
    content_type: 'page',
    include: 2,
    order: ['fields.title'],
  });

  return pagesResult.items.map((pageEntry) => parseContentfulPage(pageEntry) as PageType);
}

export async function fetchPage({ slug }: FetchPageOptions): Promise<PageType | null> {
  const contentful = contentfulClient();

  const pagesResult = await contentful.getEntries<TypePageSkeleton>({
    content_type: 'page',
    'fields.slug': slug,
    include: 2,
  });

  return parseContentfulPage(pagesResult.items[0]);
}

export async function fetchPageById({ id }: { id: string }): Promise<PageType | null> {
  const contentful = contentfulClient();

  const pageResult = await contentful.getEntry<TypePageSkeleton>(id, {
    include: 2,
  });

  return parseContentfulPage(pageResult);
}
