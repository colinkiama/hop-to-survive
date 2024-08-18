import { Scene } from 'phaser';

export class Game extends Scene
{
    /**
     * @type {Phaser.Physics.Arcade.Sprite}
     */
    player;
    angle;
    graphics;
    line;
    hideAim;
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const playerTexture = this.textures.addDynamicTexture('player', 60, 60);
        playerTexture.fill(0x0000ff);
        
        this.player = this.physics.add.sprite(320, 180, 'player');
        this.player.setCollideWorldBounds(true, undefined, undefined, true);
        this.graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
        this.line = new Phaser.Geom.Line();
        this.angle = 0;
        this.hideAim = false;

        this.input.on('pointermove', this.setAim.bind(this));
        this.input.on('pointerdown', this.setAim.bind(this));

        this.input.on('pointerup', () => {
            if (this.hideAim) {
                return;
            }
            
            this.physics.velocityFromRotation(this.angle, 600, this.player.body.velocity);
            this.hideAim = true;
            this.graphics.clear()
        });

        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            const { gameObject } = body;
            if (gameObject !== this.player) {
                return;
            }

            if (down) {
                gameObject.setVelocity(0);
                this.hideAim = false;
            }
        });
    }

    setAim (pointer) {
        if (this.hideAim) {
            return;
        }

        this.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        Phaser.Geom.Line.SetToAngle(this.line, this.player.x, this.player.y - 60, this.angle, 128);
        this.graphics.clear().strokeLineShape(this.line);
    }

    update ()
    {
    }
}
