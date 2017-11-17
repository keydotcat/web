<template>
  <div>
    <md-snackbar md-position="center" :md-duration="Infinity" :md-active="hasContents" md-persistent>
      <span>{{$t($store.state.msg.contents)}}</span>
      <md-button class="md-primary" @click="hide">Hide</md-button>
    </md-snackbar>
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
