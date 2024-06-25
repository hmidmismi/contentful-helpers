import { ParsedUrlQuery } from 'querystring';

export interface PageSlugContextParams extends ParsedUrlQuery {
  slug: string | string[];
  // preview: boolean;
}
