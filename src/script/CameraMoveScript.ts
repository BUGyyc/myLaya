export default class CameraMoveScript extends Laya.Script{
    constructor(){
        super();
    }

    onAwake(){

    }
    private camera:Laya.Camera;
    onStart(){
        this.camera = this.owner as Laya.Camera;
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
    }

    public onMouseDown():void{

    }

    onUpdate(){
        // laya.
        
    }

    onEnable(){

    }

    onDestroy(){

    }

    onDisable(){

    }
}