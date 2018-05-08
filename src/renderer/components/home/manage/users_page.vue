<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-left">
      <h3 class="display-9">Users</h3>
    </div>

    <div class="container">
      <div class="card-deck mb-3 text-left">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Administrators</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="user in admins">{{user.label}}</li>
            </ul>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-block btn-primary">Get started</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Users</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="user in users" v-if="!user.admin">{{user.label}}</li>
            </ul>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-block btn-primary">Get started</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Invites</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="invite in invites" :key="invite.email">
                <button type="button" class="close" aria-label="close" @click="uninvite(invite.email)"><span aria-hidden="true">&times;</span></button>
                {{invite.email}}
              </li>
            </ul>
          </div>
          <div class="card-footer" v-if="!showConfirmInvite">
            <div class="input-group">
              <input type="text" v-model="invite" class="form-control" placeholder="email" aria-label="email">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="startInvite">Invite</button>
              </div>
            </div>
          </div>
          <div class="card-footer" v-if="showConfirmInvite">
            Invite {{invite}}?
            <div class="btn-group float-right" role="group" aria-label="Basic example">
              <button type="button" @click="cancelInvite" class="btn btn-secondary btn-danger">No</button>
              <button type="button" @click="confirmInvite" class="btn btn-secondary btn-success">Yes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckInviteDialog from '@/components/home/manage/check_invite_dialog'

  export default {
    components: { CheckInviteDialog },
    data () {
      return {
        invite: '',
        showConfirmInvite: false
      }
    },
    computed: {
      invites () {
        return this.$store.state.team.invites
      },
      admins() {
        return this.$store.getters.teamAdmins
      },
      users () {
        return this.$store.getters.teamUsers
      }
    },
    methods: {
      uninvite(email){
        console.log(email, 'TODO')
      },
      startInvite() {
        if(this.invite.length > 0){
          this.showConfirmInvite = true
        }
      },
      cancelInvite() {
        this.invite = ''
        this.showConfirmInvite = false
      },
      confirmInvite() {
        this.$store.dispatch('teamInvite', this.invite)
        this.invite = ''
        this.showConfirmInvite = false
      }
    }
  }
</script>

<style>
  .manageUserContent {
    margin-top: 50px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
  }
  .inviteInput {
    margin-left: 50px;
    width: 300px;
  }
  .el-transfer-panel__footer{
    display: flex;
    justify-content: center;
  }
  .transfer-footer {
    display: flex;
    align-self: center;
  }
  .item {
    margin-bottom: 18px;
  }
  .el-card {
    margin: 10px;
  }
</style>

