<template>
  <div :class="aClass" role="alert" :hidden="isEmpty">
    {{$t($store.state.msg.contents)}}
    <button type="button" class="close" aria-label="Close" @click="hide">
      <span aria-hidden="true">&times;</span>
    </button>
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
      isEmpty() {
        return this.$store.state.msg.contents.length === 0
      },
      aClass () {
        switch(this.$store.state.msg.type) {
          case 'info':
            return 'alert alert-success'
          case 'error':
            return 'alert alert-danger'
        }
        return 'alert alert-' + this.$store.state.msg.type
      }
    }
  }
</script>
