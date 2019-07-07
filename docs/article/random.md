# 随机数生成

本文从 Math.random()出发,逐步分析如何生成一个随机非负整数 y, y∈[min, max],以及如何批量生成随机数并对它们作出某些限制.

## 1. 生成随机数 y, y∈[min, max]

### 1.1 生成随机数 x

通过`const x = Math.random()`获得 x,x∈[0, 1);

### 1.2 分析步骤

通过观察可知,从 x 变化到 y 大概需要如下几个步骤：

1. 最终结果: [0, 1) => [min, max]
2. 放大倍数(max - min) / 1 - 0: [0, 1) => [0, max -min)
3. +min: [0, max - min] => [min, max)
4. 小数转整数, Math.ceil(): [min, max) => [min, max] //很难得到 min

### 1.3 代码

```
const createNonnegativeInteger = (min, max) => {
    return Math.ceil(Math.random * (max - min) + min)
}
```

### 1.4 问题

这样做在有一定的问题,即 min 只有在 x=0 时才取到,为了使 y 在[min, max]的概率均匀分布,需要进行一些处理.需要通过 Math.floor()向下取整.对[min, max+1)向下取整可以得到均匀分布的[min, max].

1. (max - min + 1) / 1 - 0: [0, 1) = [0, max - min + 1)
2. +min: => [min, max + 1)
3. Math.floor: => [min, max]

### 1.5 最终代码

```
const createNonnegativeInteger = (min, max) => {
    return Math.floor(Math.random * (max - min + 1) + min)
}
```

## 2. 批量生成随机数

### 2.1 只是批量生成

```
const batchGenerator = (arr = [], {min, max, counter}) = {
    const createSingle = createNonnegativeInteger.bind(null, min, max)
    for (let i = 0; i < counter; i++) {
        arr.push(createSingle())
    }
    return arr
}
```

### 2.2 对数组的操作

如果想对批量生成的数组做点什么呢?比如去重、删除出现次数最多的数字?停一下,事实上,我们做的是将批量生成的数组交给下一个函数进行操作.即`nextFn()`,或许我们可以通过职责链模式来进行处理.

```
class DutyChain {
    constructor({execute = null, next = null}) {
        this.execute = execute
        this.next = next
    }
    // 对数据进行处理,并将处理后的结果交给下一位
    delivery(data, ...args) {
        let value = data
        if (typeof this.execute === 'function) {
            value = this.execute(value, ...args) // 处理数据
        }
        if (this.next instanceof DutyChain && typeof this.next.execute === 'function') {
            return this.next.execute(value, ...args)  // 将数据交给下一位
        }
        return value
    }
}
```

### 2.3 数组去重

```
const unique = (arr) => {
    return Array.from(new Set(arr))
}

const uniqueAndReplenish = (arr, {min, max, counter}) {
    let array = unique(arr)
    const createSingle = getRandomNum.bind(null, min, max)
    while (array.length < counter) {
        const num = createSingle()
        // 判断数组中是否存在该数字
        if (array.indexOf(num) === -1) {
            array.push(num)
        }
    }
    return array
}
```

### 2.4 连接函数

```
const removeDuplicates = new DutyChain({ execute: uniqueAndReplenish, next: null });
const batch = new DutyChain({ execute: getBatchRandomNum, next: removeDuplicates });
batch.delivery([], { min, max, counter }) // 批量生成不重复的随机数
```
