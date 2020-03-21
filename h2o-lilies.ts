import {H2O_TF, IContext} from 'h2o-tf/h2o-tf.js';
import {define} from 'trans-render/define.js';

export class H2OLilies extends H2O_TF{
    static get is(){return 'h2o-lilies';}
    initTransform(){
        this.transform = {
            'ul': (context) =>{
                const ul = context.el! as HTMLUListElement;
                const newLeaf = this.makeLeaf(ul);
                (<any>newLeaf).items = [];
                if(context.stack.length === 0){
                    context.leaf.root = newLeaf;
                }else{
                    context.leaf.sublist = newLeaf;
                }
                this.addLeafToStack(context, newLeaf);
            }, 
            'li': (context) =>{
                const li = context.el! as HTMLLIElement;
                const newLeaf = this.makeLeaf(li);
                (<any>newLeaf).text =  li.firstChild!== null ? li.firstChild.nodeValue : null;
                context.leaf.items.push(newLeaf);
                this.addLeafToStack(context, newLeaf);
                
            },
            'a': (context) =>{
                const a = context.el! as HTMLAnchorElement;
                const newLeaf = this.makeLeaf(a);
                (<any>newLeaf).text =  a.firstChild!== null ? a.firstChild.nodeValue : null;
                context.leaf.link = newLeaf;
                this.addLeafToStack(context, newLeaf);
            }
        }
    }
    addLeafToStack(context: IContext, newLeaf: any){
        context.leaf = newLeaf
        context.stack.push(newLeaf);
        context.processChildren = true;
    }
    makeLeaf(el: HTMLElement){
        return {
            id: el.id,
            data: el.dataset,
            role: el.getAttribute('role'),
            tabIndex: el.tabIndex,
            type: el.localName,
            class: el.className
        }

    }
    connectedCallback(){
        this.initTransform();
        super.connectedCallback();
    }
}
define(H2OLilies);