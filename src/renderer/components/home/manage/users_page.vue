<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-left">
      <h3 class="display-9">Users</h3>
    </div>

    <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Administrators</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$0 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Users</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$15 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary">Get started</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Invites</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$29 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary">Contact us</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--div class="manageUserContent">
    <check-invite-dialog :visible='checkInviteVisible' v-on:hide='checkInviteVisible=false' :invite='invite'></check-invite-dialog>
        <el-card>
          <div slot="header" class="clearfix">
            <span>Administrators and users</span>
          </div>
          <div>
            <el-transfer filterable :titles="['Administrators', 'Users']"  :button-texts="['Promote', 'Demote']" @change='handleChange'
              :data="userData" v-model='userState'>
              <el-button class="transfer-footer" slot="left-footer" size="small">Remove from team</el-button>
              <el-button class="transfer-footer" slot="right-footer" size="small">Remove from team</el-button>
            </el-transfer>
          </div>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>Invite users to this team</span>
            <el-input size='small' placeholder="email" v-model='invite' class='inviteInput' style='float:right; padding: 3px, 0'>
              <el-button slot="append" icon="el-icon-search" @click='doInvite'></el-button>
            </el-input>
          </div>
          <div v-for="i in invites" :key="i.email" class="text item">
            {{i.email}}
          </div>
        </el-card>
  </div-->
</template>

<script>
  import CheckInviteDialog from '@/components/home/manage/check_invite_dialog'

  export default {
    components: { CheckInviteDialog },
    data () {
      return {
        checkInviteVisible: false,
        invite: ''
      }
    },
    computed: {
      invites () {
        return this.$store.state.team.invites
      },
      userData () {
        return this.$store.getters.allUsersForTransfer
      },
      userState: {
        get () {
          return this.$store.state.team.users.filter( (u) => {
            return !u.admin
          }).map( (u) => {
            return u.id
          })
        },
        set (val) {
          // do nothing. Just to prevent complaints from element-ui
        }
      }
    },
    methods: {
      doInvite () {
        this.checkInviteVisible = true
      },
      handleChange(value, direction, movedKeys) {
        var teamUsers = this.$store.state.team.users
        var users = movedKeys.map( (uid) => {
          for (var i = 0; i < teamUsers.length; i++ ) {
            if (teamUsers[i].id === uid) {
              return teamUsers[i]
            }
          }
        }).filter((u) => { return u })
        if (direction === 'left' ) {
          this.$store.dispatch( 'teamPromoteUsers', users )
        } else {
          this.$store.dispatch( 'teamDemoteUsers', users )
        }
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

