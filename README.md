<div align="center">

# DTO mapper based on TS types

![](https://img.shields.io/npm/v/@twistezo/ts-dto-mapper?style=flat-square&color=9cf)
![](https://img.shields.io/npm/dt/@twistezo/ts-dto-mapper?style=flat-square&color=9cf)
![](https://img.shields.io/npm/l/@twistezo/ts-dto-mapper?style=flat-square&color=yellow)

</div>

## Description

Utility for easy mapping between DTO and OM objects based on their data types.

Benefits:

- no object-oriented approach based on classes
- no cluttering the code with decorators
- no need to install a large library for a simple operation
- only function based on objects types with access to the context inside

## Knowledge

DTO - Data Transfer Object

- ex. object shape from API
- https://en.wikipedia.org/wiki/Data_transfer_object

OM - Object Model

- various shape of object, ex. business object
- https://en.wikipedia.org/wiki/Object_model

## Setup

```
npm install @twistezo/ts-dto-mapper
```

## Tips

- Always populate generic types `<From>`, and `<To>` in `mapDTO` function. This helps you with debugging and provides IDE IntelliSense.

- `.transform` accepts callback with source context so you can put there reusable data transformation and have reusable mapper.

## Usage

### tldr;

From DTO:

```ts
const foo = mapDTO<FooDTO, Foo>({ from: fooDTO }).transform(fooDTO => ({
  // map with access to source context
}))
```

To DTO:

```ts
const fooDTO = mapDTO<Foo, FooDTO>({ from: foo }).transform(foo => ({
  // map with access to source context
}))
```

### Full example

Import:

```ts
import { mapDTO } from '@twistezo/ts-dto-mapper'
```

Prepare OM and DTO shapes:

```ts
type Foo = {
  id: string
  firstName: string
  lastName: string
}

type FooDTO = {
  uuid: number
  fullName: string
  unnecessary: object
}
```

Prepare objects:

```ts
const foo: Foo = {
  id: '1001',
  firstName: 'John',
  lastName: 'Smith',
}

const fooDTO: FooDTO = {
  uuid: 1001,
  fullName: 'John Smith',
  unnecessary: {},
}
```

Map from DTO to OM:

```ts
const fooFromFooDTO: Foo = mapDTO<FooDTO, Foo>({ from: fooDTO }).transform(
  (fooDTO: FooDTO): Foo => {
    // map with access to source context

    const { fullName, uuid } = fooDTO
    const [firstName, lastName] = fullName.split(' ')

    return {
      id: uuid.toString(),
      firstName,
      lastName,
    }
  },
)
```

Map from OM to DTO:

```ts
const fooDTOfromFoo: FooDTO = mapDTO<Foo, FooDTO>({ from: foo }).transform(foo => {
  // map with access to source context

  const { firstName, id, lastName } = foo

  return {
    uuid: Number(id),
    fullName: `${firstName} ${lastName}`,
    unnecessary: {},
  }
})
```
