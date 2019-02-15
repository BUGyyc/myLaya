// import CreateScene from "./CreateScene";

export default class CreateScene2 extends Laya.Script{
    private scene:Laya.Scene3D;
    private camera:Laya.Camera;
    constructor(){super();}
    onAwake(){
        this.scene = this.owner as Laya.Scene3D;
    }

    onStart(){
        this.camera = this.scene.addChild(new Laya.Camera(0,0.1,100)) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(4.5,6,4.5));
        this.camera.transform.rotate(new Laya.Vector3(-30,45,0),true,false);
        this.camera.clearColor = new Laya.Vector4(0.5,0.5,0.5,1);

        var directionLight:Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(1,1,1);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(-1,-1,-1));

        var plane:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(13,13,10,10))) as Laya.MeshSprite3D;
        var planeMaterial:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.loader.load("res/Layabox.png",Laya.Handler.create(null,function(tx:Laya.Texture2D){
            planeMaterial.albedoTexture = tx;
        }));
        plane.meshRenderer.material = planeMaterial;
        plane.meshRenderer.castShadow = true;

        var rigidBody:Laya.PhysicsCollider = plane.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        var box:Laya.BoxColliderShape = new Laya.BoxColliderShape(13,0,13);
        rigidBody.colliderShape = box;

        this.createBox();
    }

    private createBox():void{
        for (var i:number = 0; i < 8; i++) {
            this.addVerticalBox(-0.65, 0.165 + i * 0.33 * 2, 0);
            this.addVerticalBox(0, 0.165 + i * 0.33 * 2, 0);
            this.addVerticalBox(0.65, 0.165 + i * 0.33 * 2, 0);
            this.addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, -0.65);
            this.addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, 0);
            this.addHorizontalBox(0, 0.165 + 0.33 + i * 0.33 * 2, 0.65);
        }
    }

    public addVerticalBox(x:number, y:number, z:number):void
    {
        var mat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("../../res/threeDimen/Physics/plywood.jpg", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
            mat.albedoTexture = tex;
        }));
        
        var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.33, 2))) as Laya.MeshSprite3D;
        box.meshRenderer.material = mat;
        box.meshRenderer.castShadow = true;
        box.meshRenderer.receiveShadow = true;
        box.transform.position = new Laya.Vector3(x, y, z);
        
        var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        rigidBody.mass = 10;
        rigidBody.friction = 0.4;
        rigidBody.restitution = 0.2;
        var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(0.5, 0.33, 2);
        rigidBody.colliderShape = boxShape;
    }
    public addHorizontalBox(x:number, y:number, z:number):void
    {
            var mat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
			Laya.Texture2D.load("../../res/threeDimen/Physics/plywood.jpg", Laya.Handler.create(null, function(tex:Laya.Texture2D):void {
				mat.albedoTexture = tex;
			}));
			
			var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(2, 0.33, 0.5))) as Laya.MeshSprite3D;
			box.meshRenderer.material = mat;
			box.meshRenderer.castShadow = true;
			box.meshRenderer.receiveShadow = true;
			box.transform.position = new Laya.Vector3(x, y, z);
			
			var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
			rigidBody.mass = 10;
			rigidBody.friction = 1.0;
			rigidBody.restitution = 0.2;
			var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(2, 0.33, 0.5);
			rigidBody.colliderShape = boxShape;
    }


}