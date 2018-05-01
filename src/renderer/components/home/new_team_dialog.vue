<template>
  <div class="modal fade" id="modalNewTeam" tabindex="-1" aria-labelledby="modalNewTeamTitle" role="dialog" aria-hidden="true" :data-show='visible'>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalNewTeamTitle">{{$t('create_new_team')}}</h5>
          <button type="button" class="close" @click="hideDialog" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideDialog">Close</button>
          <button type="button" class="btn btn-primary" @click="submit">Confirm</button>
        </div>
      </div>
    </div>
  </div>
  <!--el-dialog :title="$t('create_new_team')" :visible.sync="visible">
    <el-form>
      <el-form-item label="Team name">
        <el-input v-model="team_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button type="primary" @click="submit">Confirm</el-button>
    </span>
  </el-dialog-->
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
        //this.$emit('hide')
        this.$refs.modalNewTeam.modal({show: false})
      },
      hideDialog() {
        this.team_name = ''
        this.$refs.modalNewTeam.modal({show: false})
        //this.$emit('hide')
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
