import { EntryFieldTypes, EntrySkeletonType, ChainModifiers, LocaleCode, Entry, Asset, AssetLink } from 'contentful';
import { Document } from '@contentful/rich-text-types';

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

type PageEntry = Entry<TypePageSkeleton, undefined, string>;
declare function parseContentfulContentImage(asset?: Asset<undefined, string> | {
    sys: AssetLink;
}): ImageType | null;
declare function parseContentfulPage(pageEntry?: PageEntry): PageType | null;

export { type CommonType, type ImageType, type PageType, type TypePage, type TypePageFields, type TypePageSkeleton, parseContentfulContentImage, parseContentfulPage };
