export default class Test{
    private events:any = [];
    constructor(){
    }
    on(event,callback){
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;
        return this;
    }

    off(event,callback){
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }

    emit(...agrs){
        const event = agrs[0];
        const params = [].splice.call(agrs,1);
        const callbacks = this.events[event];
        callbacks.forEach(fn => fn.apply(params));
        return this;
    }

    once(event,callback){
        let tempFunc = (...agrs) =>{
            callback.apply(agrs);
            this.off(event,tempFunc);
        }
        this.on(event,tempFunc);
        return this;
    }

}