<template>
  <div class="manageUserContent">
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
  </div>
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
        var owner = this.$store.state.team.owner
        var me = this.$store.state.user.id
        return this.$store.state.team.users.map( (u) => {
          return {
            key: u.id,
            label: `${u.fullname} (${u.id})`,
            disabled: u.id === owner || u.id === me
          }
        })
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

