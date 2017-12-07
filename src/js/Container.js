export default class Container {
    constructor(PIXI) {
        var self = this;
        this.PIXI = PIXI;
        this.renderer = this.PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            transparent: true,
            resolution: 1
        });

        document.getElementById('display').appendChild(this.renderer.view);

        this.stage = new this.PIXI.Container();

        // this.PIXI.loader
        //     .add("vueLogo", "src/assets/logo.png").load(this.setup.bind(this));

        //Some Global Variables
        this.minScale = 0.5;
        this.maxScale = 1;
        this.reduced = false;
        this.animate = false;

        this.container1 = new this.PIXI.Container();
        this.graphics = new this.PIXI.Graphics();
        this.graphics.beginFill(0x2F7455); 
        this.graphics.drawRect(10, 10, 75, 50); 
        this.graphics.endFill();
        this.graphics.interactive = true;
        this.graphics.click = function (){
            self.graphics.clear();
            self.graphics.beginFill(0x2F7455); 
            self.graphics.drawRect(10, 10, window.innerWidth - 50, window.innerHeight); 
            self.graphics.endFill();
            console.log("I WAS CLICKED");
        }
        this.container1.backgroundColor = 0x2F7455;
        
        this.container2 = new this.PIXI.Container();
        this.graphics2= new this.PIXI.Graphics();
        this.graphics2.beginFill(0xCC6114); 
        this.graphics2.drawRect(30, 30, 75, 50); 
        this.graphics2.endFill();
        
        this.container2.addChild(this.graphics2);
        this.container1.addChild(this.graphics);

        this.stage.addChild(this.container1);
        this.stage.addChild(this.container2);

        this.animation();
    }

    setup() {
        this.stage.interactive = true;
        this.vueLogo = new PIXI.Sprite(
            this.PIXI.loader.resources["vueLogo"].texture
        );

        this.vueLogo.interactive = true;
        this.vueLogo.anchor.set(0.5, 0.5);

        var self = this;
        this.vueLogo.click = function() {
            console.log("CLICKED");
            self.animate = true;
            self.reduceSize();
        }

        this.stage.addChild(this.vueLogo);
        this.animation();
    }

    animation() {
        requestAnimationFrame(this.animation.bind(this));

        // this.vueLogo.x = this.renderer.width / 2;
        // this.vueLogo.y = this.renderer.height / 2;
        // this.vueLogo.rotation += 0.02;
        // this.vueLogo.pivot.set(200, 0);

        this.renderer.render(this.stage);
    }

    reduceSize() {
        if (!this.animate) {
            console.log("ANIMATION NOT TRUE");
            return;
        }

        requestAnimationFrame(this.reduceSize.bind(this));

        if (!this.reduced) {
            if (this.vueLogo.scale.x > this.minScale && this.vueLogo.scale.y > this.minScale){
                this.vueLogo.scale.x -= 0.1;
                this.vueLogo.scale.y -= 0.1;
            }
            if (this.vueLogo.scale.x < this.minScale && this.vueLogo.scale.y < this.minScale) {
                this.reduced = true;
                this.animate = false;
            }
        }
        else {
            if (this.vueLogo.scale.x < this.maxScale && this.vueLogo.scale.y < this.maxScale){
                this.vueLogo.scale.x += 0.1;
                this.vueLogo.scale.y += 0.1;
            }
            if (this.vueLogo.scale.x > this.maxScale && this.vueLogo.scale.y > this.maxScale){
                this.reduced = false;
                this.animate = false;
            }
        }
    }
}