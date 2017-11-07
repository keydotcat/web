<template>
  <el-transfer filterable :titles="['Allowed users', 'Unauthorized users']"  :button-texts="['Allow', 'Deny']" @change='handleChange' :data="userData" v-model='userState'>
  </el-transfer>
</template>

<script>
  export default {
    name: 'vault-access',
    props: {
      vault: Object
    },
    computed: {
      userData () {
        return this.$store.getters.usersForTransfer
      },
      userState: {
        get () {
          var vaultUsers = this.vault.users
          return this.$store.state.team.users.filter((u) => {
            for(var i = 0; i < vaultUsers.length; i++){
              if (vaultUsers[i] === u.id) {
                return false
              }
            }
            return true
          }).map((u) => { return u.id })
        },
        set () {
          // do nothing
        }
      }
    },
    methods: {
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
          this.$store.dispatch( 'teamAddUsersToVault', { vaultId: this.vault.id, users: users } )
        } else {
          this.$store.dispatch( 'teamRemoveUsersFromVault', { vaultId: this.vault.id, users: users } )
        }
      }
    }
  }
</script>
