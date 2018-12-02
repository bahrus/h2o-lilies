import { H2O_TF } from 'h2o-tf/h2o-tf.js';
import { define } from 'xtal-latx/define.js';
export class H2OLilies extends H2O_TF {
    static get is() { return 'h2o-lilies'; }
    initTransform() {
        this.transform = {
            'ul': (context) => {
                const ul = context.el;
                const newLeaf = {
                    type: 'list',
                    id: ul.id,
                    data: ul.dataset,
                    role: ul.getAttribute('role'),
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
                    type: 'item',
                    text: li.firstChild !== null ? li.firstChild.nodeValue : null,
                    id: li.id,
                    data: li.dataset,
                    role: li.getAttribute('role'),
                };
                context.leaf.items.push(newLeaf);
                context.leaf = newLeaf;
                context.processChildren = true;
            },
            'a': (context) => {
                const a = context.el;
                const newLeaf = {
                    type: 'link',
                    text: a.firstChild !== null ? a.firstChild.nodeValue : null,
                    id: a.id,
                    data: a.dataset,
                    role: a.getAttribute('role'),
                    tabIndex: a.tabIndex,
                };
                context.leaf.link = newLeaf;
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
//# sourceMappingURL=h2o-lilies.js.map