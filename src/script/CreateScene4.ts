import CameraMoveScript from "./CameraMoveScript";
export default class CreateScene4 extends Laya.Script {
    /**
     * 基础碰撞器
     */
    private scene: Laya.Scene3D;
    private camera: Laya.Camera;
    private ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
    private point: Laya.Vector2 = new Laya.Vector2();
    private _outHitResult: Laya.HitResult = new Laya.HitResult();
    private hasSelectedSprite: Laya.Sprite3D;
    private hasSelectedRigidBody: Laya.Rigidbody3D;
    private posX: number;
    private posY: number;
    private delX: number;
    private delY: number;
    constructor() { super(); }
    onAwake() {
        this.scene = this.owner as Laya.Scene3D;
    }

    onStart() {
        Laya.Stat.show();
        // this.camera.o
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(0, 6, 9.5));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        this.camera.clearColor = new Laya.Vector4(0.5, 0.5, 0.5, 1);
        this.camera.addComponent(CameraMoveScript);

        var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(-1, -1, -1));

        var plane: Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 10, 10))) as Laya.MeshSprite3D;
        var planeMaterial: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        Laya.loader.load("res/Layabox.png", Laya.Handler.create(null, function (tx: Laya.Texture2D) {
            planeMaterial.albedoTexture = tx;
        }));
        plane.meshRenderer.material = planeMaterial;
        plane.meshRenderer.castShadow = true;

        var rigidBody: Laya.PhysicsCollider = plane.addComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;
        var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(10, 0, 10);
        rigidBody.colliderShape = box;


    }

    private addEvent(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
    }

    private onMouseDownEvent(): void {
        this.posX = this.point.elements[0] = Laya.MouseManager.instance.mouseX;
        this.posY = this.point.elements[1] = Laya.MouseManager.instance.mouseY;
        this.camera.viewportPointToRay(this.point, this.ray);
        var hitRes: Laya.HitResult = new Laya.HitResult();
        this.scene.physicsSimulation.rayCast(this.ray, hitRes);
        if (hitRes.succeeded) {
            var collider: Laya.Rigidbody3D = hitRes.collider as Laya.Rigidbody3D;
            this.hasSelectedSprite = collider.owner as Laya.Sprite3D;
            this.hasSelectedRigidBody = collider;
            collider.angularFactor = Laya.Vector3.ZERO;
            collider.angularVelocity = Laya.Vector3.ZERO;
            collider.linearFactor = Laya.Vector3.ZERO;
            collider.linearVelocity = Laya.Vector3.ZERO;
        }
    }

    private onMouseMoveEvent(): void {
        this.delX = Laya.MouseManager.instance.mouseX - this.posX;
        this.delY = Laya.MouseManager.instance.mouseY - this.posY;
        if (this.hasSelectedSprite) {
            this.hasSelectedRigidBody.linearVelocity = new Laya.Vector3(this.delX / 4, 0, this.delY / 4);
        }
        this.posX = Laya.MouseManager.instance.mouseX;
        this.posY = Laya.MouseManager.instance.mouseY;
    }
}