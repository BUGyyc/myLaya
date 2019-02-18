import CameraMoveScript from "./CameraMoveScript";
export default class CreateScene3 extends Laya.Script{
    /**
     * 基础碰撞器
     */
    private scene:Laya.Scene3D;
    private camera:Laya.Camera;
    constructor(){super();}
    onAwake(){
        this.scene = this.owner as Laya.Scene3D;
    }

    onStart(){
        // this.camera.o
        this.camera = this.scene.addChild(new Laya.Camera(0,0.1,100)) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(0,6,9.5));
        this.camera.transform.rotate(new Laya.Vector3(-15,0,0),true,false);
        this.camera.clearColor = new Laya.Vector4(0.5,0.5,0.5,1);
        this.camera.addComponent(CameraMoveScript);

        var directionLight:Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(1,1,1);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(-1,-1,-1));

        var plane:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10,10,10,10))) as Laya.MeshSprite3D;
        var planeMaterial:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.loader.load("res/Layabox.png",Laya.Handler.create(null,function(tx:Laya.Texture2D){
            planeMaterial.albedoTexture = tx;
        }));
        plane.meshRenderer.material = planeMaterial;
        plane.meshRenderer.castShadow = true;

        var rigidBody:Laya.PhysicsCollider = plane.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        var box:Laya.BoxColliderShape = new Laya.BoxColliderShape(10,0,10);
        rigidBody.colliderShape = box;
       
        Laya.timer.loop(2000,this,this.randomAddPhysicsSprite);
    }

    private randomAddPhysicsSprite():void{
        var n:number = Math.floor(Math.random()*3)%3;
        switch(n){
            case 0:
                this.addBox();
            break;
            case 1:
                this.addSphere();
            break;
            case 2:
                this.addCapsule();
            break;
        }
    }

    private addBox():void{
        var mat1:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/Layabox.png",Laya.Handler.create(this,function(tex:Laya.Texture2D){
            mat1.albedoTexture = tex;
        }));
        var sX:number = Math.random()*0.75+0.25;
        var sY:number = Math.random()*0.75+0.25;
        var sZ:number = Math.random()*0.75+0.25;
        var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX,sY,sZ))) as Laya.MeshSprite3D;
        box.meshRenderer.material = mat1;
        box.transform.position = new Laya.Vector3(Math.random()*4-2,10,Math.random()*4-2);
        box.transform.rotationEuler = new Laya.Vector3(Math.random()*360,Math.random()*360,Math.random()*360);
        var rigidBody3D:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        var boxShp:Laya.BoxColliderShape = new Laya.BoxColliderShape(sX,sY,sZ) as Laya.BoxColliderShape;
        rigidBody3D.colliderShape = boxShp;
        rigidBody3D.mass = 10;
    }

    private addSphere():void{
        var mat2:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        //
        Laya.Texture2D.load("res/Layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
            mat2.albedoTexture = tex;
        }));
        var radius:number = Math.random() * 0.2 + 0.2;
        var sphere: Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(radius))) as Laya.MeshSprite3D;
        sphere.meshRenderer.material = mat2;
        sphere.transform.position = new Laya.Vector3(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
        
        var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
        var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(radius);
        rigidBody.colliderShape = sphereShape;
        rigidBody.mass = 10;
    }

    private addCapsule():void{
        var mat3:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/Layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
            mat3.albedoTexture = tex;
        }));
        
        var raidius:number = Math.random() * 0.2 + 0.2;
        var height:number = Math.random() * 0.5 + 0.8;
        var capsule:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(raidius, height))) as Laya.MeshSprite3D;
        capsule.meshRenderer.material = mat3;
        capsule.transform.position = new Laya.Vector3(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
        capsule.transform.rotationEuler = new Laya.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360);
        
        var rigidBody:Laya.Rigidbody3D = capsule.addComponent(Laya.Rigidbody3D);
        var sphereShape:Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(raidius, height);
        rigidBody.colliderShape = sphereShape;
        rigidBody.mass = 10;
    }
}