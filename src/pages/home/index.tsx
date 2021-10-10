import React, { useEffect } from "react";
import { Button } from "antd";
import { useStores } from "@/hooks";
import { withRouter, RouteComponentProps } from "react-router-dom";

type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type Eg = Parameters<(arg1: string, arg2: number) => any>;

type FlattenArray<T extends Array<any>> = T extends Array<infer P> ? P : never;
type Eg1 = FlattenArray<[string, number]>;
type Eg2 = FlattenArray<[1, "asd"]>;

type ReturnType<T extends (...arg: any) => any> = T extends (
  ...arg: any
) => infer P
  ? P
  : any;
type Eg3 = ReturnType<(arg: string) => number>;
type ConstructorParameters<T extends abstract new (...arg: any) => any> =
  T extends abstract new (...arg: infer P) => any ? P : never;
interface ErrorConstructor {
  new (message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}
type MultableKeys<T extends object> = {
  [P in keyof T]-?: IsEqual<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }>;
}[keyof T];
type IsEqual<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;
type Eg4 = MultableKeys<{
  a: string;
  readonly b: number;
}>;

type OptionKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}[keyof T];

type Eg5 = OptionKeys<{
  a: string;
  b?: number;
}>;
type TypeKeys<T> = T[keyof T];
type PickByValue<T, V> = Pick<
  T,
  TypeKeys<{
    [K in keyof T]: T[K] extends V ? K : never;
  }>
>;
type Eg6 = TypeKeys<{
  a: string;
  b: never;
}>;
type Eg7 = PickByValue<
  {
    key1: number;
    key2: number;
    key3: string;
  },
  number
>;
interface A {
  a: string;
  b: number;
}
interface B {
  a: string;
}
type C = Extract<keyof A, keyof B>;
type Intersection<T, U> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
type Eg8 = Intersection<{ key1: string }, { key1: string; key2: number }>;
type Eg9 = string & (string | number);
interface Props extends RouteComponentProps {}
const Home: React.FC<Props> = (props) => {
  const commonStore = useStores("commonStore");

  function goToMulPage() {
    commonStore.getApps();
  }
  return (
    <div>
      <Button type="primary" onClick={goToMulPage}>
        Home
      </Button>
    </div>
  );
};

export default withRouter(Home);
