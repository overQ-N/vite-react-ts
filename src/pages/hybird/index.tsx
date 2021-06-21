import React, { useEffect } from "react";
import {
  makeAutoObservable,
  makeObservable,
  computed,
  observable,
  action,
  flow,
} from "mobx";
import { observer } from "mobx-react";
import { Button } from "antd";
class Timer {
  count = 0;
  constructor() {
    makeObservable(this, {
      increment: action,
      reduce: action,
      count: observable,
    });
  }
  increment() {
    this.count++;
  }
  reduce() {
    this.count--;
  }
}
const timer = new Timer();
const Btn = observer(({ timer }) => {
  return <Button>123456{timer.count}</Button>;
});
const Hybird = () => {
  return (
    <div>
      Hybird
      <button onClick={() => timer.increment()}>+1</button>
      <Btn timer={timer}></Btn>
    </div>
  );
};

export default Hybird;
