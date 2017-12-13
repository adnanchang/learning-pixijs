//http://www.kaleadis.de/lab/04-pixi-cam/
//http://plnkr.co/edit/II6lgj511fsQ7l0QCoRi?p=preview
export default class Container {
    constructor(PIXI) {
        var self = this;
        this.PIXI = PIXI;

        this.renderer = this.PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            transparent: true,
            anitalias: true
        });

        document.getElementById('display').appendChild(this.renderer.view);
        this.renderer.view.style.border = "1px dashed black";

        this.stage = new this.PIXI.Container();

        // this.PIXI.loader
        //     .add("vueLogo", "src/assets/logo.png").load(this.setup.bind(this));

        //Some Global Variables
        this.minScale = 0.5;
        this.maxScale = 1;
        this.reduced = false;
        this.animate = false;
        this.globalMousePosition;
        this.localMousePosition;
        this.zoomOnPrevFrame = false;
        this.zoomSpeed = 0.3;

        this.container1 = new this.PIXI.Container();
        this.width = 75;
        this.height = 50;
        this.graphics = new this.PIXI.Graphics();
        this.graphics.beginFill(0x2F7455);
        this.graphics.drawRect(100, 100, 75, 50);
        this.graphics.endFill();
        this.graphics.interactive = true;
        this.container1.interactive = true;
        this.stage.interactive = true;
        this.graphics.click = function (){
            self.animate = true;
            var mouseX = self.globalMousePosition.x;
            var mouseY = self.globalMousePosition.y;
            self.grow();
            console.log("I WAS CLICKED");
        }
        this.container1.backgroundColor = 0x2F7455;

        this.container2 = new this.PIXI.Container();
        this.graphics2= new this.PIXI.Graphics();
        this.graphics2.beginFill(0xCC6114);
        this.graphics2.drawRect(this.renderer.width - 200, this.renderer.height - 500, 75, 50);
        this.graphics2.endFill();

        // this.container2.addChild(this.graphics2);
        // this.container1.addChild(this.graphics);

        this.stage.addChild(this.graphics);
        // this.stage.addChild(this.container2);

        this.animation();
        this.intialization();
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

    intialization() {
      var self = this;
      this.stage.mousemove = this.stage.touchmove = function(event) {
        self.globalMousePosition = event.data.getLocalPosition(self.stage);
      }
    }

    grow() {
        // requestAnimationFrame(this.grow.bind(this));

        /*
        NEXT PLAN OF ACTION
        Change the size of the graphics according to the stage. MAKE IT RELATIVE
        For example, take 20% size of the stage and use that as the size of the graphics
        Then when you change the scale of the container you can zoom in 220% so that the 20% size of
        The graphics fits in within the main container i.e. stage
        */
        // var self = this;
        // var s = 2;
        // var newSize = this.graphics.getBounds();
        // var x = newSize.width/2;
        // var y = newSize.height/2;
        // console.log(this.stage.x);
        // var worldPos = {
        //     x: (x - this.stage.x) / this.stage.scale.x,
        //     y: (y - this.stage.y) / this.stage.scale.y
        // };
        // console.log("WORLD POS: " + worldPos.x + ' ' + worldPos.y);
        // var newScale = {
        //     x: this.stage.scale.x * s,
        //     y: this.stage.scale.y * s
        // };
        // console.log("NEW SCALE: " + newScale.x + ' ' + newScale.y);
        // var newScreenPos = {
        //     x: (worldPos.x ) * newScale.x + this.stage.x,
        //     y: (worldPos.y) * newScale.y + this.stage.y
        // };
        // // var newScreenPos = {
        // //     x: x + this.stage.x,
        // //     y: y + this.stage.y
        // // };
        // console.log("NEW SCREEN POS: " + newScreenPos.x + ' ' + newScreenPos.y);

        // // this.stage.x = (newScreenPos.x - x);
        // // this.stage.y = (newScreenPos.y - y);
        // this.stage.x -= (newScreenPos.x-x);
        // this.stage.y -= (newScreenPos.y-y);
        // this.graphics.x -= (newScreenPos.x-x);
        // this.graphics.y -= (newScreenPos.y-y);
        // console.log("NEW GRAPHIC POS: " + this.graphics.x + ' ' + this.graphics.y);
        // console.log("NEW STAGE POS: " + this.stage.x + ' ' + this.stage.y);

        console.log("++++++++++++++BEFORE CLICK+++++++++++++++++")
        console.log("STAGE PIVOT " + this.stage.pivot.x + " " + this.stage.pivot.y);
        console.log("STAGE POSITION " + this.stage.position.x + " " + this.stage.position.y);
        console.log("GRAPHICS XY " + this.graphics.x + " " + this.graphics.y);
        console.log("GRAPHICS POSITION " + this.graphics.position.x + " " + this.graphics.position.y);
        this.stage.scale.x += 1;
        this.stage.scale.y += 1;
        var newSize = this.graphics.getBounds();
        var x = newSize.width/2;
        var y = newSize.height/2;
        this.graphics.x = newSize.x;
        this.graphics.y = newSize.y;
        this.stage.position.x = newSize.x;
        this.stage.position.y = newSize.y;
        this.stage.pivot.set(newSize.x + x, newSize.y + y);
        console.log("++++++++++++++AFTER CLICK+++++++++++++++++")
        console.log("STAGE PIVOT " + this.stage.pivot.x + " " + this.stage.pivot.y);
        console.log("STAGE POSITION " + this.stage.position.x + " " + this.stage.position.y);
        console.log("GRAPHICS XY " + newSize.x + " " + newSize.y);
        console.log("GRAPHICS POSITION " + newSize.x + " " + newSize.y);
        //MOVE THE DAMN RECTANGLE!
    }
}
