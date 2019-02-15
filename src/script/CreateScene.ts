export default class CreateScene extends Laya.Script {
    private scene: Laya.Scene3D;
    constructor() {
        super();
    }

    onAwake() {
        this.scene = this.owner as Laya.Scene3D;
    }

    onStart() {
        var camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(1, 6, 10));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;
        var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.diffuseColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
        //添加自定义模型
        var sphere: Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1, 100, 100))) as Laya.MeshSprite3D;
        sphere.transform.rotate(new Laya.Vector3(0, 90, 0), false, false);
        sphere.transform.translate(new Laya.Vector3(0, 3, 0));
        sphere.meshRenderer.material = new Laya.BlinnPhongMaterial;
        var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D): void {
            material.albedoTexture = tex;
        }));
        sphere.meshRenderer.material = material;
        //添加物理组件
        sphere.addComponent(Laya.PhysicsCollider);
        //给球添加刚体
        var rigid: Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
        //有刚体的shape要加在刚体上
        rigid.colliderShape = new Laya.SphereColliderShape(1);
        //添加一个地板
        var floor: Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10))) as Laya.MeshSprite3D;
        //给地板添加物理组件
        var floorCollicar: Laya.PhysicsCollider = floor.addComponent(Laya.PhysicsCollider);
        // 添加collidershape
        floorCollicar.colliderShape = new Laya.BoxColliderShape(10, 0, 10);
        //克隆一个球                
        Laya.timer.loop(1000, this, function (): void {
            //一秒之后复制一个球
            var cloneSphere: Laya.MeshSprite3D = Laya.Sprite3D.instantiate(sphere) as Laya.MeshSprite3D;
            //设置位置偏移
            cloneSphere.transform.translate(new Laya.Vector3(1, 4, 0));
            //添加到场景
            this.scene.addChild(cloneSphere);
        });
    }

    onUpdate() {

    }

    onDestroy() {

    }
}