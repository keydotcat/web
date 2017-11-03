<template>
  <el-dialog :title="$t('create_new_team')" :visible.sync="visible">
    <el-form>
      <el-form-item label="Team name">
        <el-input v-model="team_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button type="primary" @click="submit">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'new_team_dialog',
    props: {
      visible: Boolean
    },
    data () {
      return {
        team_name: ''
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('userCreateTeam', this.team_name)
        this.$emit('hide')
      },
      hideDialog() {
        this.team_name = ''
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
