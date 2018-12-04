import { H2O_TF } from 'h2o-tf/h2o-tf.js';
import { define } from 'xtal-latx/define.js';
export class H2OLilies extends H2O_TF {
    static get is() { return 'h2o-lilies'; }
    initTransform() {
        this.transform = {
            'ul': (context) => {
                const ul = context.el;
                const newLeaf = this.makeLeaf(ul);
                newLeaf.items = [];
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
                const newLeaf = this.makeLeaf(li);
                newLeaf.text = li.firstChild !== null ? li.firstChild.nodeValue : null;
                context.leaf.items.push(newLeaf);
                context.leaf = newLeaf;
                context.stack.push(newLeaf);
                context.processChildren = true;
            },
            'a': (context) => {
                const a = context.el;
                const newLeaf = this.makeLeaf(a);
                newLeaf.text = a.firstChild !== null ? a.firstChild.nodeValue : null;
                context.leaf.link = newLeaf;
                context.leaf = newLeaf;
                context.stack.push(newLeaf);
                context.processChildren = true;
            }
        };
    }
    makeLeaf(el) {
        return {
            id: el.id,
            data: el.dataset,
            role: el.getAttribute('role'),
            tabIndex: el.tabIndex,
            type: el.localName,
            class: el.className
        };
    }
    connectedCallback() {
        this.initTransform();
        super.connectedCallback();
    }
}
define(H2OLilies);
//# sourceMappingURL=h2o-lilies.js.map