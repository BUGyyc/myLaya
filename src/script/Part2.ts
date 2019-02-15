import { ui } from "./../ui/layaMaxUI";
import EventEmitter from "./EventEmitter";
import EveEmitter from "./EveEmitter";
export default class Part2 extends ui.test.PartScene2UI{
    constructor(){
        super();
       this.init();
       var em = new EveEmitter();
       em.on("hello",this.sayHello);
       em.on("sss",this.sayHello);
       em.on("world",this.sayWorld);
       em.on("any",this.sayAny);
       em.emit("hello");
       em.emit("world");
       em.emit("sss");
       em.emit("any");
       em.off("any",this.sayAny);
       em.emit("any");

       //
       this.stage.on("stage",this,function(){
        console.log("stage----->");
       });

    //    this.stage.de
       
    }

    private sayHello():void{
        console.log("hello");
    }

    private sayWorld():void{
        console.log("world");
    }

    private sayAny():void{
        console.log("any");
    }

    private init():void{
        //create去预加载3D资源
        Laya.loader.create("res/threeDimen/scene/LayaScene_dudeScene/Conventional/dudeScene.ls",Laya.Handler.create(this,function(){
            Laya.Scene3D.load("threeDimen/scene/LayaScene_dudeScene/Conventional/dudeScene.ls", Laya.Handler.create(null, function(scene:Laya.Scene3D):void {
                Laya.stage.addChild(scene) as Laya.Scene3D;
                var camera:Laya.Camera = scene.getChildByName("Camera") as Laya.Camera;
            }));
        }));
    }
}