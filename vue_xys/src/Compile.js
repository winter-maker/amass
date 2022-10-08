import Watcher from './Watcher.js'
export default class Compile{
    constructor(el, vue){
        //vue 实例
        this.$vue = vue;
        //挂载点
        this.$el = document.querySelector(el);
        //如果用户传入了挂载点
        if(this.$el){
            //调用函数，让节点变为frament,类似于mustache中的tokens，实际上用的是ast
            let $frament = this.node2Fragment(this.$el);
            //编译
            this.compile($frament);
            //替换好的内容上树
            this.$el.appendChild($frament);
        }
    }
    node2Fragment(el){
        var fragment = document.createDocumentFragment();
        var child;
        //让所有dom节点，都进入fragment
        while(child = el.firstChild){
            fragment.appendChild(child)
        }
        return fragment;
    }
    compile(el){
        //得到子元素
        var childNodes = el.childNodes;
        var self = this;

        var reg = /\{\{(.*)\}\}/;
        childNodes.forEach(node=>{
            var text = node.textContent;
            if(node.nodeType == 1){
                self.compileElement(node)
            } else if(node.nodeType == 3 && reg.test(text)){
                let name = text.match(reg)[1];
                self.compileText(node, name);
            }
        })

    }
    compileElement(node){
        // 这里的方便之处在于不是将HTML结构看做字符串，而是真正的属性列表
        var nodeAttrs = node.nodeAttrs;
        [].slice.call(nodeAttrs).forEach(attr=>{
            //这里是分析指令
            var attrName = attr.name;
            var value = attr.value;
            //指令都是v-开头
            var dir = attrName.substring(2);

            // 看看是不是指令
            if(attrName.indexOf('v-') == 0){
                if(dir == 'model'){
                    new Watcher(self.$vue, value, value=>{
                        node.value = value;
                    })
                    var v = self.getVueVal(self.$vue, value)
                    node.value = v;
                    node.addEventListener('input', e=>{
                        var newVal = e.target.value;
                        self.setVueVal(self.$vue, value, newVal);
                        v = newVal;
                    })
                } else if(dir == 'if'){

                }
            }
        })
    }
    compileText(node, name) {
        node.textContent = this.getVueVal(this.$vue, name);
        new Watcher(this.$vue, name, value=>{
            node.textContent = value
        });
    }
    getVueVal(vue, exp){
        var val = vue;
        exp = exp.split('.');
        exp.forEach(k => {
            val = val[k]
        });
        return val;
    }
    setVueVal(vue, exp, value){
        var val = vue;
        exp = exp.split('.');
        exp.forEach((k, i)=>{
            if(i< exp.length-1){
                val = val[k]
            } else {
                val[k] = value;
            }
        })
    }
}