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
import {useStores} from '@/hooks'
import { Button } from "antd";

const Hybird = observer(() => {
  const commonStore = useStores('commonStore')
  return (
    <div>
      <Button onClick={()=>commonStore.increment()}>{ commonStore.count}</Button>
    </div>
  );
});

export default Hybird;
