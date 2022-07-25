import { Hex } from '../types'
import { createHex } from './createHex'
import { createHexPrototype } from './createHexPrototype'

test('returns a new hex when passed a hex prototype', () => {
  const hexPrototype = createHexPrototype()
  const result = createHex(hexPrototype)

  expect(result).toMatchObject({ q: 0, r: 0 })
  expect(Object.getPrototypeOf(result)).toBe(hexPrototype)
})

test('returns a new hex with the passed properties on the instance', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const result = createHex(hexPrototype, { q: 1, r: 2, customProp: 'A' })

  expect(result).toMatchObject({ q: 1, r: 2, customProp: 'A' })
  expect(Object.getPrototypeOf(result)).not.toHaveProperty('custom')
})

test('returns a new hex with custom methods bound to it', () => {
  const hexPrototype = createHexPrototype<CustomHex>({
    customMethod() {
      return this
    },
  })
  const hex = createHex(hexPrototype, { q: 1, r: 2 })
  const result = hex.customMethod()

  expect(result).toBe(hex)
})

test('returns a new hex with custom getters bound to it', () => {
  const hexPrototype = createHexPrototype<CustomHex>({
    get customGetter() {
      return this
    },
  })
  const hex = createHex(hexPrototype, { q: 1, r: 2 })
  const result = hex.customGetter

  expect(result).toEqual(hex)
})

test('returns a new hex from the passed properties containing offset coordinates', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const result = createHex(hexPrototype, { col: 1, row: 2, customProp: 'B' })

  expect(result).toMatchObject({ q: 0, r: 2, customProp: 'B' })
})

test('returns a new hex from the passed tuple coordinates', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const result = createHex(hexPrototype, [1, 2])

  expect(result).toMatchObject({ q: 1, r: 2 })
})

test('returns a clone when a hex (instance) is passed', () => {
  const hexPrototype = createHexPrototype<CustomHex>()
  const hex = createHex(hexPrototype)
  const result = createHex(hex, { q: 1, r: 2, customProp: 'A' })

  expect(result).toMatchObject({ q: 1, r: 2, customProp: 'A' })
  expect(result).not.toBe(hex)
})

interface CustomHex extends Hex {
  customProp: string
  customMethod(this: this): this
  get customGetter(): this
}
