export const except = <T>(
  array1: Array<T>,
  array2: Array<T>,
  compare?: (value1: T, value2: T) => boolean
) => {
  compare ??= (v1, v2) => v1 === v2
  return array1.filter((x) => !array2.some((y) => compare!(x, y)))
}

export const combination = <T>(array: Array<T>) => {
  return array.flatMap((x, i) =>
    array.filter((_, j) => j <= i).map((y) => [x, y])
  )
}
