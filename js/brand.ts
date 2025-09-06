// Create "branded" type based on some existing type.
// This is done by adding a unique property to the type.
// This differentiates the branded type from the base type.
// Use like so:
// type NewType = Branded<string, "NewType">
// This can be used with other base types than string.

declare const __brand: unique symbol
type Brand<B> = { [__brand]: B }

export type Branded<T, B> = T & Brand<B>
