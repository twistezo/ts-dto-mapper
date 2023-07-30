import { describe, expect, test } from 'vitest'

import { mapDTO } from '.'

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

describe('mapDTO', () => {
  test('From DTO to Object Model', () => {
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

    expect(fooFromFooDTO).toEqual(foo)
  })

  test('From Object Model to DTO', () => {
    const fooDTOfromFoo: FooDTO = mapDTO<Foo, FooDTO>({ from: foo }).transform(foo => {
      const { firstName, id, lastName } = foo

      return {
        uuid: Number(id),
        fullName: `${firstName} ${lastName}`,
        unnecessary: {},
      }
    })

    expect(fooDTOfromFoo).toEqual(fooDTO)
  })
})
