import Phaser from 'phaser'

export default class Texts extends Phaser.GameObjects.Text {
    constructor({scene, x, y, text,style}) {
        super(scene, x, y, text,style)
        scene.add.existing(this);
    }
 
}