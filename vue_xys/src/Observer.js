import { def } from './utils.js';
import defineReactive from './defineReactive.js'
import { arrayMethods } from './array.js';
import observe from './observe.js';
import Dep from './Dep.js';
export default class Observer{
    constructor(value){
        //每一个Observer的实例身上，都有一个dep
        this.dep = new Dep();
        //给实例(this,一定要注意，构造函数this不是表示类本身，而是表示实例)
        def(value, '__ob__', this, false);
        // oberser的目的是将一个正常的object转换为每个层级都可转换。
        //检查它是数组还是对象
        if(Array.isArray(value)){
            //如果是数组，将数组的原型指向arrayMethods
            Object.isPropertyOf(value, arrayMethods);
            //让这个数组变为observe
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }
    //遍历
    walk(value){
        for(let k in value){
            defineReactive(value, k);
        }
    }
    //数组的特殊遍历
    observeArray(arr){
        for(let i=0; i<arr.length; i++){
            //逐项进行observe
            observe( arr[i] )
        }
    }
}