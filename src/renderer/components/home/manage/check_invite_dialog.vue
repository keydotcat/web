<template>
  <el-dialog :title="$t('check_invite')" :visible.sync="visible">
    <span>{{$t('check_invite_contents')}}</span>
    <span style='font-weight:bold'>{{invite}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button type="primary" @click="submit">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'check-invite-dialog',
    props: {
      visible: Boolean,
      invite: String
    },
    methods: {
      submit () {
        this.$store.dispatch('teamInvite', this.invite)
        this.$emit('hide')
      },
      hideDialog() {
        this.invite = ''
        this.$emit('hide')
      }
    }
  }
</script>

<style>
  .dialog-footer {
    padding: 15px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;
  }
</style>
