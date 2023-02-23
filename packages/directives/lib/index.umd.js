(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.directives = factory());
})(this, (function () { 'use strict';

    const hasOwnProperty = (targetObj, key) => {
        return Object.prototype.hasOwnProperty.call(targetObj, key);
    };
    const getVueVersion = (Vue) => {
        const version = Vue.version || '2';
        return version;
    };
    const filterDirective = (targetObj, fields) => {
        const result = {};
        for (const [directiveKey, directivesValue] of Object.entries(targetObj)) {
            const _directive = {};
            for (const [key, value] of Object.entries(directivesValue)) {
                if (fields.includes(key)) {
                    _directive[key] = value;
                }
            }
            result[directiveKey] = _directive;
        }
        return result;
    };
    /**
     * 批量获取元素的最终样式
     * @param el 元素
     * @param fields 字段数组
     * @returns Array<field, style>
     */
    const getComputedStyles = (el, fields) => {
        const result = {};
        if (el) {
            const style = window.getComputedStyle(el, null);
            fields.forEach((field) => {
                const value = style.getPropertyValue(field);
                result[field] = value;
            });
        }
        return result;
    };
    /**
     * 处理copy的事件
     * @param text 文本
     */
    const handleCopyClick = (text) => {
        // 创建元素
        if (!document.getElementById('copyTarget')) {
            const copyTarget = document.createElement('input');
            copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;');
            copyTarget.setAttribute('id', 'copyTarget');
            document.body.appendChild(copyTarget);
        }
        // 复制内容
        const input = document.getElementById('copyTarget');
        if (input) {
            input.value = text;
            input.select();
            document.execCommand('copy');
        }
    };
    const getType = (value) => {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    };
    const isObject = (value) => {
        return getType(value) === 'string';
    };
    const isFunction = (value) => {
        return getType(value) === 'function';
    };

    // 给元素添加蒙层
    const mask = {
        inserted(el, binding) {
            let backColor = "rgba(0, 0, 0, 0.05)", z_index = "1";
            if (isObject(binding.value)) {
                const { color = "rgba(0, 0, 0, 0.05)", zIndex = "1" } = binding.value || {};
                backColor = color;
                z_index = zIndex;
            }
            else {
                backColor = binding.value;
            }
            const { position, borderRadius } = getComputedStyles(el, [
                "position",
                "borderRadius",
            ]);
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.borderRadius = borderRadius;
            div.style.left = "0px";
            div.style.top = "0px";
            div.style.bottom = "0px";
            div.style.right = "0px";
            div.style.backgroundColor = backColor;
            div.style.zIndex = String(z_index);
            //
            if (!position) {
                el.style.position = "relative";
            }
            el.appendChild(div);
        },
    };

    // 聚焦
    const focus = {
        inserted() { },
        unbind() { }
    };

    // 复制
    const copy = {
        bind(el, binding) {
            // 双击触发复制
            if (binding.modifiers.dblclick) {
                el.addEventListener("dblclick", () => handleCopyClick(el.innerText));
                el.style.cursor = "copy";
            }
            else {
                // 单击触发复制
                el.addEventListener("click", () => handleCopyClick(el.innerText));
                el.style.cursor = "copy";
            }
        },
    };

    // 失去焦点（所有input元素）
    const blur = {
        inserted() { },
        unbind() { }
    };

    // 权限
    const permission = {
        inserted(el, binding) {
        },
    };

    const symbolClickKey = Symbol('handleBackTopClick');
    const symbolScrollKey = Symbol('handleBackTopScroll');
    const backTop = {
        bind(el, binding) {
            // if(isObject(binding.value)) {
            //   const {} = binding.value || {}
            // }
            const callback = el[symbolClickKey] = () => {
                const target = binding.arg
                    ? document.getElementById(binding.arg)
                    : window;
                target &&
                    target.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
            };
            el.addEventListener("click", callback);
        },
        update(el, binding) {
            // 滚动到达参数值才出现绑定指令的元素
            const target = binding.arg ? document.getElementById(binding.arg) : window;
            if (target) {
                if (binding.value) {
                    const callback = el[symbolScrollKey] = ((e) => {
                        const scrollTop = e.scrollTop || e.scrollY;
                        if (scrollTop > binding.value) {
                            el.style.visibility = "unset";
                        }
                        else {
                            el.style.visibility = "hidden";
                        }
                    });
                    target.addEventListener("scroll", callback);
                }
                // 判断初始化状态
                if ((target.scrollTop || target.scrollY) < binding.value) {
                    el.style.visibility = "hidden";
                }
            }
        },
        unbind(el, binding) {
            const target = binding.arg ? document.getElementById(binding.arg) : window;
            if (target) {
                if (el[symbolScrollKey])
                    target.removeEventListener("scroll", el[symbolScrollKey]);
                if (el[symbolClickKey])
                    el.removeEventListener("click", el[symbolClickKey]);
            }
        },
    };

    const symbolKey$1 = Symbol("symbolKey");
    const symbolTimer = Symbol('symbolTimer');
    const symbolEventListener = Symbol("symbolEventListener");
    const debounce = {
        bind: function (el, binding, vnode) {
            // 添加点击事件
            // vue2 vnode.data.on.click
            // vue3 vnode.props.onClick
            console.log(vnode.props);
            let cbFun = (vnode.props && vnode.props.onClick) || vnode.data && vnode.data.on && vnode.data.on.click;
            if (!cbFun)
                return;
            el[symbolEventListener] = cbFun;
            const debounceTime = binding.value || 250;
            let timer = el[symbolTimer] = null;
            const eventListener = (el[symbolKey$1] = (event) => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (isFunction(cbFun))
                        cbFun.call(vnode);
                    timer = null;
                }, debounceTime);
                event && event.stopImmediatePropagation();
            });
            el.addEventListener("click", eventListener, true);
        },
        unbind: function (el) {
            const eventListener = el[symbolEventListener];
            if (eventListener) {
                el.removeEventListener("click", eventListener);
                el[symbolEventListener] = undefined;
            }
            if (el[symbolTimer]) {
                el[symbolTimer] = null;
            }
        },
    };

    const symbolKey = Symbol("throttleClick");
    const throttle = {
        inserted: function (el, binding) {
            let throttleTime = binding.value; // 防抖时间
            if (!throttleTime) {
                // 用户若不设置防抖时间，则默认0.25s
                throttleTime = 250;
            }
            let cbFun;
            const callback = (el[symbolKey] = (event) => {
                if (!cbFun) {
                    // 第一次执行
                    cbFun = setTimeout(() => {
                        cbFun = null;
                    }, throttleTime);
                }
                else {
                    // event && event.stopImmediatePropagation();
                    if (event) {
                        event.stopImmediatePropagation();
                    }
                }
            });
            el.addEventListener("click", callback, true);
        },
        unbind: function (el) {
            const callback = el[symbolKey];
            if (callback) {
                el.removeEventListener("click", callback);
                el[symbolKey] = undefined;
            }
        },
    };

    var directives = {
        mask,
        focus,
        copy,
        blur,
        permission,
        backTop,
        debounce,
        throttle
    };

    let isVue2 = true;
    let isVue3 = false;
    const compatibleToVue3 = (_directives, Vue) => {
        // vue2 to vue3
        // 默认是 vue2指令
        // bind -> beforeMount
        // inserted -> mounted
        // componentUpdated -> updated
        // unbind -> unmounted
        const vue2LegalKeys = ['bind', 'inserted', 'update', 'componentUpdated', 'unbind'];
        const vue3LegalKeys = ['created', 'beforeMount', 'mounted', 'beforeUpdate', 'update', 'updated', 'beforeUnmount', 'unmounted'];
        const hasChangeMap = {
            bind: 'beforeMount',
            inserted: 'mounted',
            componentUpdated: 'updated',
            unbind: 'unmounted'
        };
        const version = getVueVersion(Vue);
        if (version.startsWith('2')) ;
        else if (version.startsWith('3')) {
            // vue3
            isVue2 = false;
            isVue3 = true;
            for (const [directiveKey, directivesValue] of Object.entries(_directives)) {
                for (const [oldKey, newKey] of Object.entries(hasChangeMap)) {
                    if (hasOwnProperty(directivesValue, oldKey) && !hasOwnProperty(directivesValue, newKey)) {
                        directivesValue[newKey] = directivesValue[oldKey];
                    }
                }
            }
        }
        let result = {};
        if (isVue2) {
            return filterDirective(_directives, vue2LegalKeys);
        }
        else if (isVue3) {
            return filterDirective(_directives, vue3LegalKeys);
        }
        return result;
    };
    const useDirectives = (App) => {
        const _directives = compatibleToVue3(directives, App);
        for (const [key, value] of Object.entries(_directives)) {
            App.directive(key, value);
        }
    };

    return useDirectives;

}));
