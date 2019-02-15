export default class EveEmitter{
    private events:any;
    constructor(){
        this.events = {};
    }

    on(event,callback){
        let callbacks = this.events[event] || [];//看下之前有没有监听，有监听的话就把之前的回调也
        callbacks.push(callback);//添加这次监听的回调
        this.events[event] = callbacks;
        return this;
    }

    off(event,callback){
        let callbacks = this.events[event];//拿所有对应event的回调
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);//把callback去除
        //filter过滤，不是对应callback的回调会继续保留，相等的会删除
        return this;
    }

    emit(...args){
        const event = args[0];
        const params = [].slice.call(args,1);//其他的全部保存到一个数组里面
        const callbacks = this.events[event];//拿到对应事件的回调
        callbacks.forEach(fn => fn.apply(params));//把所有的都触发
        //apply、call、bind
        return this;
    }

    once(event,callback){
        let warpFanc = (...args) =>{
            callback.apply(args);
            this.off(event,warpFanc);//执行后立即注销
        }
        this.on(event,warpFanc);//绑定监听
        return this;
    }
}