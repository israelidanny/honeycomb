import { Hex, HexCoordinates } from '../hex'

export type Traverser<T extends Hex, R extends Iterable<T> = T[]> = (
  createHex: (coordinates?: HexCoordinates) => T,
  cursor?: HexCoordinates,
) => R

export enum Rotation {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}

export type RotationLike = Rotation | 'CLOCKWISE' | 'clockwise' | 'COUNTERCLOCKWISE' | 'counterclockwise'

// borrowed from https://github.com/Microsoft/TypeScript/issues/14094#issuecomment-373782604
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends Record<string, unknown> ? (Without<T, U> & U) | (Without<U, T> & T) : T | U
