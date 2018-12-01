
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name
         * @param val
         * @param trueVal String to set attribute if true.
         */
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n
         */
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        /**
         * Dispatch Custom Event
         * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
         * @param detail Information to be passed with the event
         * @param asIs If true, don't append event name with '-changed'
         */
        de(name, detail, asIs) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
class H2O_TF extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._getTarget = t => {
            let candidate = t.previousElementSibling;
            if (!candidate)
                candidate = t.parentElement;
            return candidate;
        };
    }
    static get is() {
        return 'h2o-tf';
    }
    static get observedAttributes() {
        return [disabled];
    }
    get transform() {
        return this._transform;
    }
    set transform(nv) {
        this._transform = nv;
        this.onPropsChange();
    }
    get getTarget() {
        return this._getTarget;
    }
    set getTarget(nv) {
        this._getTarget = nv;
    }
    connectedCallback() {
        this._upgradeProperties([disabled, 'transform', 'target']);
        this._c = true;
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !this._c || !this._transform)
            return;
        const target = this._getTarget(this);
        if (target === null) {
            setTimeout(() => {
                this.onPropsChange();
            }, 50);
            return;
        }
        this.value = {};
        const context = {
            obj: this.value,
            stack: [],
            leaf: this.value,
            processChildren: false,
            el: null,
        };
        this.process(target, context);
        this.de('value', {
            value: this.value
        });
    }
    process(target, context) {
        for (const selector in this._transform) {
            if (target.matches && target.matches(selector)) {
                const transformTemplate = this._transform[selector];
                context.processChildren = false;
                context.el = target;
                transformTemplate(context);
                if (context.processChildren && target.childNodes) {
                    target.childNodes.forEach(node => {
                        if (!node.matches)
                            return;
                        this.process(node, context);
                    });
                    const p = context.stack.pop();
                    context.leaf = p;
                }
            }
        }
    }
}
define(H2O_TF);
class H2OLilies extends H2O_TF {
    static get is() { return 'h2o-lilies'; }
    initTransform() {
        this.transform = {
            'ul': (context) => {
                const ul = context.el;
                const newLeaf = {
                    id: ul.id,
                    data: ul.dataset,
                    items: [],
                };
                if (context.stack.length === 0) {
                    context.leaf.root = newLeaf;
                }
                else {
                    context.leaf.sublist = newLeaf;
                }
                context.leaf = newLeaf;
                context.stack.push(newLeaf);
                context.processChildren = true;
            },
            'li': (context) => {
                const li = context.el;
                const newLeaf = {
                    text: li.firstChild !== null ? li.firstChild.nodeValue : null,
                    id: li.id,
                    data: li.dataset
                };
                context.leaf.items.push(newLeaf);
                context.leaf = newLeaf;
                context.processChildren = true;
            }
        };
    }
    connectedCallback() {
        this.initTransform();
        super.connectedCallback();
    }
}
define(H2OLilies);
    })();  
        