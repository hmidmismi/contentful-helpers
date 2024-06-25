import type { EntryFieldTypes } from 'contentful';

// ContentfulSymbolToString<T>: This defines a new type alias named ContentfulSymbolToString that depends on a generic type T.

// T extends EntryFieldTypes.Symbol: This is the condition being checked. It tests whether the type T is assignable to EntryFieldTypes.Symbol. The EntryFieldTypes.Symbol would typically be defined in the Contentful types, potentially as a specific kind of data structure or type format.

// : T: If the condition is false (meaning T is not assignable to EntryFieldTypes.Symbol), then ContentfulSymbolToString<T> remains whatever type T was originally. This part ensures that the type only changes if it matches EntryFieldTypes.Symbol, and remains unchanged for all other types.

type ContentfulSymbolToString<T> = T extends EntryFieldTypes.Symbol ? string : T;

export interface CommonType {
  id?: string;
  title: ContentfulSymbolToString<EntryFieldTypes.Symbol>;
  slug?: ContentfulSymbolToString<EntryFieldTypes.Symbol>;
}
