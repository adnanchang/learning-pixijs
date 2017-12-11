<template>
  <div class="hello">
    <div id="display">
    </div>
  </div>
</template>

<script>
import Container from "./../js/Container"
export default {

  name: 'HelloWorld',
  // Needs to be done to handle the scope
  created: function() {
    this.container = null;
  },
  //Letting the external
  mounted: function(){
    this.container = new Container(PIXI);
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js/PIXI App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#canvas {
  border: 1px dashed black;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
