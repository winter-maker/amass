import {def} from './utils.js'
//得到Array.prototype
const arrayPrototype = Array.prototype;

//以Array.prototype为原型创建arrayMethods对象 并暴露
export const arrayMethods = Object.create(arrayPrototype);

//要被改写的7个数组方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
methodsNeedChange.forEach(methodName=>{
    //备份原来的方法
    const original = arrayMethods[methodName]
    //定义新的方法
    def(arrayMethods, methodName, function(){
        console.log('啦啦啦')
    }, false)
})