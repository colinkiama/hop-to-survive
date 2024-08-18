import { Scene } from 'phaser';

export class Game extends Scene
{
    player;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const playerTexture = this.textures.addDynamicTexture('player', 60, 60);
        playerTexture.fill(0x0000ff);
        
        this.player = this.physics.add.sprite(320, 180, 'player');
        this.player.setCollideWorldBounds(true);

    }

    update ()
    {
    }
}
