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
