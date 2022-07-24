import { CompletingTransformer, compose, transduce as _transduce, Transducer } from 'transducist'
import { Hex } from '../hex'

export function transduce<T extends Hex, R extends Iterable<T>>(
  hexes: Iterable<T>,
  transducers: Transducer<T, T> | Transducer<T, T>[],
  reducer: CompletingTransformer<R, R, T>,
): R {
  const transform = Array.isArray(transducers) ? transducers : [transducers]
  return _transduce(hexes, compose(...(transform as [Transducer<T, T>])), reducer)
}