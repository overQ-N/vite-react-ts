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
const toLearn = ["react", "vue", "webpack", "nodejs"];

const TextComponent = (props: any) => (
  <div> hello , i am function component{props.children} </div>
);
class HybirdClass extends React.Component {
  status = false; /* 状态 */
  renderFoot = () => <div> i am foot</div>;
  /* 控制渲染 */
  controlRender = () => {
    const reactElement = (
      <div style={{ marginTop: "100px" }} className="container">
        {/* element 元素类型 */}
        <div>hello,world</div>
        {/* fragment 类型 */}
        <React.Fragment>
          <div> 👽👽 </div>
        </React.Fragment>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map((item) => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );
    console.log(reactElement);
    const { children } = reactElement.props;
    console.log(children);
    /* 第1步 ： 扁平化 children  */
    const flatChildren = React.Children.toArray(children);
    console.log(flatChildren);
    /* 第2步 ： 除去文本节点 */
    const newChildren: any = [];
    React.Children.forEach(flatChildren, (item) => {
      if (React.isValidElement(item)) {
        newChildren.push(item);
      } else {
        console.log(item, "item");
      }
    });
    /* 第3步，插入新的节点 */
    const lastChildren = React.createElement(
      `div`,
      { className: "last" },
      `say goodbye`
    );
    newChildren.push(lastChildren);

    /* 第4步：修改容器节点 */
    const newReactElement = React.cloneElement(
      reactElement,
      {},
      ...newChildren
    );
    const lastElement = React.cloneElement(<TextComponent />, {}, "ABC");
    console.log(`lastElement`, lastElement);
    return newReactElement;
  };
  render() {
    return this.controlRender();
  }
}
export default HybirdClass;
