# 问题

## 1. 如何添加路由动画

1. Switch 组件用于迭代所有 Route 子元素,渲染与当前位置匹配的第一个子元素.
2. react-motion 的 Motion 组件可用于制作单组件动画效果.

&emsp;&emsp;可用 react-motion 制作入场动画.那么如何制作出场动画呢?出场动画必然涉及到 dom 操作,需要显示声明组件的销毁,那么必然涉及到 Switch 组件对 Route 组件的某些操作,如何用 hooks 实现呢?可以用`react-transition-group`库实现.

3. 组件切换动画可以使用 TransitionMotion 组件.

## 2. markdown 代码高亮，并且记忆当前阅读位置

### 2.1 markdown 代码高亮

&emsp;&emsp;使用 highlight.js 库实现代码高亮，highlightBlock 接口可以使传入的 DOM 节点代码高亮。即在 DOM 渲染后调用 highlightBlock 函数。因此可以在 componentDidMount 钩子中调用。

### 2.2 记忆当前阅读位置

&emsp;&emsp; 通过 localStorage 保存阅读文章的`window.scrollY`

### 问题描述

&emsp;&emsp;antd Tabs 组件多个文章组件销毁时触发多次 setState，导致数据被合并的问题。

### 解决方法

&emsp;&emsp;通过 ref 获取文章的 dom 节点，通过 getBoundingClientRect 计算 dom 节点的高度，绑定 scroll 事件，更新数据。

## 3. useState 异步更新问题

因此 useState 是基于 setState 实现的，因此也存在异步更新问题。

### 3.1 setState 是如何解决的

> 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数。

```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 3.2 useState 可以怎么做？

我们可以通过闭包的方式不直接修改 state，而是修改闭包中的变量。相当于增加一个代理，用于修改 state。例如：

```
const [counter, setCounter] = useState(0);
const addCounter = (function() {
    let cacheCounter = counter
    return () => {
        cacheCounter = cacheCounter + 1;
        setCounter(cacheCounter);
    }
}())
```

事实上，这种依赖于前一个数据的 state 依靠 useReducer 来实现更为妥当。
