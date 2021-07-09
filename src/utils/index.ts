// 展开多维数组
type Flatten<Type> = Type extends Array<infer Item> ? Item[] : Type[];
export const deepFlatten = <T = any>(arr: Array<T>): Flatten<T> =>
  [].concat(
    ...(arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)) as Array<any>)
  );
