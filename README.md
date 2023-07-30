<div align="center">

# DTO mapper

![](https://img.shields.io/npm/v/@twistezo/ts-dto-mapper?style=flat-square&color=9cf)
![](https://img.shields.io/npm/dt/@twistezo/ts-dto-mapper?style=flat-square&color=9cf)
![](https://img.shields.io/npm/l/@twistezo/ts-dto-mapper?style=flat-square&color=yellow)

</div>

## Description

Utility for easy mapping between DTO and OM objects based on their types.

## Dictionary

### DTO - Data Transfer Object

- ex. object shape from API
- https://en.wikipedia.org/wiki/Data_transfer_object

### OM - Object Model

- various shape of object, ex. business object
- https://en.wikipedia.org/wiki/Object_model

## Setup

```
npm install @twistezo/ts-dto-mapper
```

## Tips

Always populate generic types `<From>`, and `<To>` in `mapDTO` function. This helps with debugging and provides IntelliSense.

## Usage

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
  const { firstName, id, lastName } = foo

  return {
    uuid: Number(id),
    fullName: `${firstName} ${lastName}`,
    unnecessary: {},
  }
})
```
