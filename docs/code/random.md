```
/**
 * 获取一个[min, max]的随机数
 * @param {number} min
 * @param {number} max
 * @returns {number} 范围在[min, max]的随机数
 */
const getRandomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface RandomPayload {
    min: number;
    max: number;
    counter: number;
}

/**
 * 批量获取随机数
 * @param {number[]} arr
 * @param {RandomPayload} { min, max, counter}
 * @returns {number[]} 数量为counter,范围在[min, max]的随机数数组
 */
export const getBatchRandomNum = (arr: number[] = [], { min, max, counter }: RandomPayload): number[] => {
    const array = arr.slice();
    const createSingle = getRandomNum.bind(null, min, max);
    for (let i = 0; i < counter; i++) {
        array.push(createSingle());
    }
    return array;
};

/**
 * 数组去重
 * @param {number[]} arr
 * @returns {number[]}
 */
const unique = (arr: number[]): number[] => {
    return Array.from(new Set(arr));
};

/**
 * 数组去重并补充至原长度
 * @param {number[]} arr
 * @param {RandomPayload} { min, max, counter}
 * @returns {number[]}  数量为counter,范围在[min, max]的无重复项随机数数组
 */
export const uniqueAndReplenish = (arr: number[], { min, max, counter }: RandomPayload): number[] => {
    const array: number[] = unique(arr);
    const createSingle = getRandomNum.bind(null, min, max);
    while (array.length < counter) {
        const num = createSingle();
        if (array.indexOf(num) === -1) {
            array.push(num);
        }
    }
    return array;
};

export type Execute = <T>(d: T, ...args: any[]) => T;

interface DutyChainPayload {
    execute: Execute | null;
    next: DutyChain | null;
}
/**
 * @class 职责链模式与命令模式结合
 * @demo
 * const duty1 = new DutyChain({execute: callback1})
 * const duty2 = new DutyChain({execute: callback2, next: duty1})
 * duty2.delivery(...args)
 */
export class DutyChain {
    public execute: Execute | null;
    public next: DutyChain | null;
    public constructor({ execute = null, next = null }: DutyChainPayload) {
        this.execute = execute;
        this.next = next;
    }
    /**
     * 命令模式,调用next.execute(...args)
     * @param {T} d
     * @param {Array} args 传递的参数
     * @returns {T} 链式处理后的值
     */
    public delivery<T>(d: T, ...args: any[]): T {
        let value = d;
        if (typeof this.execute === 'function') {
            value = this.execute(value, ...args);
        }
        if (this.next instanceof DutyChain && typeof this.next.execute === 'function') {
            return this.next.execute(value, ...args);
        }
        return value;
    }
}

/**
 * demo
 */
const removeDuplicates = new DutyChain({ execute: uniqueAndReplenish, next: null });
const batch = new DutyChain({ execute: getBatchRandomNum, next: removeDuplicates });

batch.delivery([], {0, 100, 10})
```
