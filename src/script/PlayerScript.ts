export default class PlayerScript extends Laya.Script{
    constructor(){super();}
    onAwake(){

    }
    private player:Laya.Sprite3D;
    onStart(){
        this.player = this.owner as Laya.Sprite3D;
    }

    onUpdate(){
        // Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.A) && 
    }

    private onPlayerMove(n:number){
       
    }
}