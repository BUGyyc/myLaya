import { ui } from "./../ui/layaMaxUI";

export default class Part2 extends ui.test.PartScene2UI{
    constructor(){
        super();
       this.init();
    }

    private init():void{
        Laya.Scene3D.load("E:/LayaProject/Laya3D/myLaya/laya/assets/threeDimen/scene/LayaScene_dudeScene/Conventional/dudeScene.ls", Laya.Handler.create(null, function(scene:Laya.Scene3D):void {
            Laya.stage.addChild(scene) as Laya.Scene3D;
            var camera:Laya.Camera = scene.getChildByName("Camera") as Laya.Camera;
            // camera.addComponent(CameraMoveScript);
        }))
        // Laya.Scene3D.load("../../res/threeDimen/scene/LayaScene_dudeScene/Conventional/dudeScene.ls",Laya.Handler.create(this,function(s:Laya.Scene3D){
        //     var scene:Laya.Scene3D = s;
        //     Laya.stage.addChild(scene);
        //     var camera:Laya.Camera = new Laya.Camera(0,0.1,1000);
        //     scene.addChild(camera);
        //     camera.transform.position = new Laya.Vector3(0,5,23);
        //     camera.transform.rotate(new Laya.Vector3(-17,0,0),true,false);
        //     camera.fieldOfView = 35;
        //     camera.clearColor = new Laya.Vector4(0,0,0.6,1);
        //     // camera.addComponent(CameraM)
        //     var light:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //     light.transform.translate(new Laya.Vector3(0,2,5));
        //     light.transform.worldMatrix.setForward(new Laya.Vector3(0,-0.5,0));
        //     light.color = new Laya.Vector3(1,1,1);
        // }));
    }
}