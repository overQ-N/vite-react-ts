import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/hooks";
import { Button, Input } from "antd";
function getKey<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
  x = false;
  check(s: string) {
    return this[s] as boolean;
  }
}
const my = new MyClass();
console.log(my.check("x"));
const Hybird = observer(() => {
  const commonStore = useStores("commonStore");
  return (
    <div>
      <Button onClick={() => commonStore.increment()}>
        {commonStore.count}
      </Button>
    </div>
  );
});

export default Hybird;
