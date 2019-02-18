export default class CameraMoveScript extends Laya.Script{
    /**
     * 1.镜头跟随 target
     * 2.镜头角度调整
     * 3.镜头远近调整
     */
    constructor(){
        super();
    }

    onAwake(){

    }
    private rotainSpeed:number = 0.0006;//旋转速度
    private camera:Laya.Camera;
    private target:Laya.Sprite3D;//
    private isMouseDown:Boolean;
    private lastMouseX:number;
    private lastMouseY:number;
    private yawPitchRoll = new Laya.Vector3();
    private tempRotationZ = new Laya.Quaternion();
    private tempRotationX = new Laya.Quaternion();
    private tempRotationY = new Laya.Quaternion();
    onStart(){
        this.camera = this.owner as Laya.Camera;
        this.isMouseDown = false;
        // this.target = this.owner.t
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.onMouseOut);
        Laya.stage.on(Laya.Event.MOUSE_WHEEL,this,this.onMouseWheel);
    }

    private onMouseWheel(e:Laya.Event):void{
        // var postion = this.camera.transform.position;
        if(e.delta > 0){
            var a = new Laya.Vector3(0,0,0);
            var b = new Laya.Vector3(0,0,0);
            // postion += this.camera.transform.T
            this.camera.fieldOfView += 1;
        }else{
            this.camera.fieldOfView -= 1;
        }
    }

    public onMouseDown(e:Laya.Event):void{
        this.camera.transform.rotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;

    }

    public onMouseUp(e:Laya.Event):void{
        this.isMouseDown = false;
    }

    public onMouseOut(e:Laya.Event):void{
        this.isMouseDown = false;
    }

    onUpdate(){
        // laya.
        console.log("time - ");
        // state.
      //  this.updateCamera();
    }

    private updateCamera():void{
        if(!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)){
            Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.W) && this.camera.transform.rotate(new Laya.Vector3(0,1,0),true,false);
            Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.S) && this.camera.transform.rotate(new Laya.Vector3(0,1,0),true,false);
            Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A) && this.camera.transform.rotate(new Laya.Vector3(1,0,0),true,false);
            Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.D) && this.camera.transform.rotate(new Laya.Vector3(1,0,0),true,false);
            if(this.isMouseDown){
                var mouseX = Laya.stage.mouseX - this.lastMouseX;
                var mouseY = Laya.stage.mouseY - this.lastMouseY;
                var yprElem: Float32Array = this.yawPitchRoll.elements;
                yprElem[0] -= mouseX * this.rotainSpeed * 0.5;
                yprElem[1] -= mouseX * this.rotainSpeed * 0.5;
                this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    }

    private updateRotation():void{
        var yprElem:Float32Array = this.yawPitchRoll.elements;
        if(Math.abs(yprElem[1]) < 1.5){
            Laya.Quaternion.createFromYawPitchRoll(yprElem[0],yprElem[1],yprElem[2],this.tempRotationZ);
            this.camera.transform.localRotation = this.tempRotationZ;
        }  
    }

    onEnable(){

    }

    onDestroy(){

    }

    onDisable(){

    }
}