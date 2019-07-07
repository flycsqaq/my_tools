enum State {
    NOTLOAD = 'notload',
    WILLLOAD = 'willload'
}

let count = 1;

export const loadImage = () => {
    let counter = count++; // 记录

    // 代理抽象类，通过扩展notic函数制造你想要的代理
    class AbstractImageProxy {
        public els: Element[];
        public constructor() {
            this.els = [];
        }
        public addEls(els: Element[]) {
            this.els = Array.from(new Set(this.els.concat(els)));
        }
        public removeEls(els: Element[]) {
            const iterator = els.values();
            for (const el of iterator) {
                const index = this.els.indexOf(el);
                if (index > -1) {
                    this.els.splice(index, 1);
                }
            }
        }
        public clearEls() {
            this.els = [];
        }
        /**
         * 观察者调用的函数，另类的订阅者
         * @method
         */
        public notice() {
            throw new Error('please extends AbstractImageProxy');
        }
        public relay() {
            loadImages(this.els as HTMLImageElement[]);
            this.clearEls();
        }
    }
    // 内置的普通懒加载
    class ImageProxy extends AbstractImageProxy {
        /**
         * 只是转发加载图片的请求
         * @method
         */
        public notice() {
            this.relay();
        }
    }

    /**
     * 内置的节流懒加载
     * @param {number} interval 加载的间隔时间
     */
    class ThrottlingProxy extends AbstractImageProxy {
        public state: State;
        public interval: number;
        public constructor(interval: number = 300) {
            super();
            this.state = State.NOTLOAD;
            this.interval = interval;
        }
        /**
         * 通过状态判断是否转发请求
         * @method
         */
        public notice() {
            if (this.state === State.WILLLOAD) return;
            this.state = State.WILLLOAD;
            const load = () => {
                this.relay();
                this.state = State.NOTLOAD;
            };
            // 直接传递this.replay,无法获取上下文
            setTimeout(load, this.interval);
        }
    }
    // 内置的防抖懒加载
    class DebounceProxy extends AbstractImageProxy {
        public timer: number; // 记录上次调用的时间戳
        public timeId: any; // 记录setTimeout的id
        public interval: number;
        public constructor() {
            super();
            this.timer = Date.now();
            this.timeId = -1;
            this.interval = 1000;
        }
        /**
         * 通过时间间隔判断是否转发请求
         * @member
         */
        public notice() {
            const now = Date.now();
            if (now - this.timer > this.interval) {
                this.relay();
                if (this.timeId > -1) {
                    clearTimeout(this.timeId);
                    this.timeId = -1;
                }
            } else {
                if (this.timeId > -1) {
                    clearTimeout(this.timeId);
                }
                // 直接传递this.replay,无法获取上下文
                this.timeId = setTimeout(() => this.relay(), this.interval);
            }
            this.timer = now;
        }
    }
    const attr = 'data-img';
    let els: Element[] = [];
    let proxy: AbstractImageProxy = new ImageProxy();

    /**
     * 改变代理者，自定义图片加载的节奏
     * @param {AbstractImageProxy} inputProxy
     */
    const changeProxy = (inputProxy: AbstractImageProxy) => {
        if (inputProxy instanceof AbstractImageProxy) {
            proxy = inputProxy;
        } else {
            throw new Error('please change a proxy extends AbstractImageProxy');
        }
    };

    // 搜集元素
    const popularEls = () => {
        els = Array.from(document.querySelectorAll(`[${attr}]`));
    };

    // 监听图片是否出现在可视区域
    const intersection = new IntersectionObserver(obs => {
        proxy.addEls(obs.filter(ob => ob.isIntersecting).map(ob => ob.target));
        proxy.removeEls(obs.filter(ob => !ob.isIntersecting).map(ob => ob.target));
        proxy.notice();
    });

    /**
     * 加载图片，移除data-img属性
     * @param {HTMLImageElement[]} els
     */
    const loadImages = (els: HTMLImageElement[]) => {
        els.forEach(el => {
            loadImg(el);
        });
    };

    const loadImg = (el: HTMLImageElement) => {
        const at = attr;
        const url = el.getAttribute(at);
        if (url) {
            el.src = url;
            el.removeAttribute(at);
            unobserve(el);
        }
    };

    // 取消监听某个元素
    const unobserve = (el: HTMLImageElement) => {
        intersection.unobserve(el);
    };

    // 开始监听
    const observes = () => {
        els.forEach(el => {
            intersection.observe(el);
        });
    };
    // 取消所有元素的监听
    const disconnect = () => {
        intersection.disconnect();
    };
    return {
        els,
        observes,
        unobserve,
        popularEls,
        ImageProxy,
        ThrottlingProxy,
        DebounceProxy,
        AbstractImageProxy,
        changeProxy,
        disconnect,
        counter
    };
};
