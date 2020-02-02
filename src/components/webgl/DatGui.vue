<template>
  <div ref="panel" class="panel"></div>
</template>

<script>
import { GUI } from 'dat.gui'

export default {
  name: 'dat-gui',
  props: {
    model: { type: Object, required: true },
    setup: { type: Function, required: true }
  },

  data () {
    let gui = new GUI({ autoPlace: false })
    this.setup(gui, this.model)
    return { gui }
  },

  mounted () {
    this.$refs.panel.appendChild(this.gui.domElement)
  },
  beforeDestroy () {
    this.$refs.panel.removeChild(this.gui.domElement)
  }
}
</script>

<style lang="scss">
  @import "~@/assets/dat.gui.scss";

  .dg.main {
    .title {
      font-size: 12px;
      margin: 0;
    }
    .dg .cr {
      display: block;
      border-radius: 0;
      width: 100%;
    }
    .dg .property-name {
      font-size: 1rem;
    }
    user-select: none;

  }
</style>

<style scoped>
.panel { position: absolute; right: 0 }
</style>
