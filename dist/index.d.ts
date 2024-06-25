import { Document } from '@contentful/rich-text-types';
import { EntryFieldTypes, EntrySkeletonType, ChainModifiers, LocaleCode, Entry, Asset, AssetLink } from 'contentful';
import { ParsedUrlQuery } from 'querystring';

interface TypePageFields {
    title: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}
type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>;
type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

type ContentfulSymbolToString<T> = T extends EntryFieldTypes.Symbol ? string : T;
interface CommonType {
    id: string;
    title: ContentfulSymbolToString<EntryFieldTypes.Symbol>;
    slug?: ContentfulSymbolToString<EntryFieldTypes.Symbol>;
}

type ImageType = Omit<CommonType, 'title' | 'slug'> & {
    src: string;
    alt: string;
    width: number;
    height: number;
};

interface PageType extends CommonType {
    body?: Document | null;
    images: ImageType[];
}

interface PageSlugContextParams extends ParsedUrlQuery {
    slug: string | string[];
}

type PageEntry = Entry<TypePageSkeleton, undefined, string>;
declare function parseContentfulContentImage(asset?: Asset<undefined, string> | {
    sys: AssetLink;
}): ImageType | null;
declare function parseContentfulPage(pageEntry?: PageEntry): PageType | null;

type FetchPageOptions = {
    slug: string;
};
declare function fetchPages(): Promise<PageType[]>;
declare function fetchPage({ slug }: FetchPageOptions): Promise<PageType | null>;
declare function fetchPageById({ id }: {
    id: string;
}): Promise<PageType | null>;

export { type CommonType, type ImageType, type PageSlugContextParams, type PageType, type TypePage, type TypePageFields, type TypePageSkeleton, fetchPage, fetchPageById, fetchPages, parseContentfulContentImage, parseContentfulPage };
