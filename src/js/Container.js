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
        this.stage.interactive = true;
        // this.PIXI.loader
        //     .add("vueLogo", "src/assets/logo.png").load(this.setup.bind(this));

        //Some Global Variables
        this.minScale = 0.5;
        this.maxScale = 1;
        this.animate = false;
        this.requestId = undefined;
        this.globalMousePosition;
        this.localMousePosition;

        this.graphics = new this.PIXI.Graphics();
        this.graphics.beginFill(0x2F7455);
        this.graphics.drawRect(100, 100, 75, 50);
        this.graphics.endFill();
        this.graphics.interactive = true;
        this.graphics.click = function (){
          self.grow(this);
        }

        this.graphics2= new this.PIXI.Graphics();
        this.graphics2.beginFill(0xCC6114);
        this.graphics2.drawRect(this.renderer.width - 200, this.renderer.height - 500, 75, 50);
        this.graphics2.endFill();
        this.graphics2.interactive = true;
        this.graphics2.click = function (){
          self.grow(this);
        }

        this.stage.addChild(this.graphics);
        this.stage.addChild(this.graphics2);

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
        this.renderer.render(this.stage);
    }

    intialization() {
      var self = this;
      this.stage.mousemove = this.stage.touchmove = function(event) {
        self.globalMousePosition = event.data.getLocalPosition(self.stage);
      }
    }

    grow(myGraphic) {
      var self = this;
      this.requestId = requestAnimationFrame(function() {
        self.grow(myGraphic);
      });

      //lets take original graphics size
      var oldSize = myGraphic.getLocalBounds();
      var scaleGoalX = this.renderer.screen.width / oldSize.width;
      var scaleGoalY = this.renderer.screen.width / oldSize.height;
      var pivotGoalX = oldSize.x;
      var pivotGoalY = oldSize.y;

      /*
      Transform your screen to four quadrants
      Each quadrant will tell you how to set your pivotGoal  
      */

      var percentageX = (5 / 100) * pivotGoalX;
      var percentageY = (5 / 100) * pivotGoalY;
      var perX = (5 / 100) * scaleGoalX;
      var perY = (5 / 100) * scaleGoalY;

      console.log(percentageX + " " + percentageY);
      console.log(perX + " " + perY);
      //adjust lets see
      if (this.stage.scale.x < scaleGoalX) {
          this.stage.scale.x += perX;
      }
      if (this.stage.scale.y < scaleGoalY) {
          this.stage.scale.y += perY;
      }

      if (this.stage.pivot.x < pivotGoalX) {
          this.stage.pivot.x += percentageX;
      }
      if (this.stage.pivot.y < pivotGoalY) {
          this.stage.pivot.y += percentageY;
      }

      if ((this.stage.pivot.x >= pivotGoalX && this.stage.pivot.y >= pivotGoalY)
        && (this.stage.scale.x >= scaleGoalX && this.stage.scale.y >= scaleGoalY)){
          cancelAnimationFrame(this.requestId);
      }

      // console.log("++++++++++++++AFTER CLICK+++++++++++++++++")
      // console.log("STAGE PIVOT " + this.stage.pivot.x + " " + this.stage.pivot.y);
      // console.log("STAGE POSITION " + this.stage.position.x + " " + this.stage.position.y);
      // console.log("STAGE SCALE " + this.stage.scale.x + " " + this.stage.scale.y);
      // console.log("OLD SIZE XY " + oldSize.x + " " + oldSize.y);
      // console.log("GRAPHICS POSITION " + this.graphics.position.x + " " + this.graphics.position.y);
    }
}
