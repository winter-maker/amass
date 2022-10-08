import observe from "./observe";
export default function defineReactive(data, key, val){
    if(arguments.length == 2){
        val = data[key];
    }
    let childOb = observe(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get(){
            console.log('你试图访问obj的'+ key + '属性')
            return val;
        },
        set(newValue){
            console.log('你试图改变obj的'+ key + '属性', newValue);
            if(val === newValue){
                return;
            }
            val = newValue;
            childOb = observe(newValue);
        }
    })
}