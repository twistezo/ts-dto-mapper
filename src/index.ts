/**
 * Utility function for mapping between DTO (Data Transform Object) and Object Model
 *
 * @see {@link https://github.com/twistezo/ts-dto-mapper} for further information
 *
 * @example
 * // from DTO:
 * const foo: Foo = mapDTO<FooDTO, Foo>({ from: fooDTO })
 *   .transform((fooDTO: FooDTO): Foo => ({
 *     // access to `fooDTO` object
 *   }))
 *
 * @example
 * // to DTO:
 * const fooDTO: FooDTO = mapDTO<Foo, FooDTO>({ from: foo })
 *   .transform((foo: Foo): FooDTO => ({
 *     // access to `foo` object
 *   }))
 */
export const mapDTO = <From = unknown, To = unknown>({
  from,
}: {
  from: From
}): {
  transform: (callback: (from: From) => To) => To
} => ({
  transform: callback => callback(from),
})
