<template>
  <div>
    <el-alert :title='$t($store.state.msg.contents)' v-if='hasContents' :type="type" center show-icon :close='hide'></el-alert>
  </div>
</template>

<script>
  import * as mt from '@/store/mutation-types'

  export default {
    name: 'msg-display',
    methods: {
      hide() {
        this.$store.commit( mt.MSG_CLEAR )
      }
    },
    computed: {
      hasContents() {
        return this.$store.state.msg.contents.length > 0
      },
      type () {
        switch(this.$store.state.msg.type) {
          case 'info':
            return 'success'
        }
        return this.$store.state.msg.type
      }
    }
  }
</script>

<style>
  .el-menu > .goright {
    float: right !important;
  }
</style>
