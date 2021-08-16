import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/hooks";
import { Button, Input } from "antd";
import { count } from "console";
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
class HybirdClass extends React.Component {
  state = {
    count: 1,
  };
  getSnapshotBeforeUpdate() {
    console.log(789);
    return { a: 1 };
  }
  componentDidUpdate() {
    console.log(`123`, 123);
    console.log(`object`, this.getSnapshotBeforeUpdate());
  }
  render() {
    return (
      <Button onClick={() => this.setState((prev) => prev.count++)}>
        确定{this.state.count}
      </Button>
    );
  }
}
export default HybirdClass;
