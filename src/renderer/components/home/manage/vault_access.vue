<template>
  <div class="card">
    <div class="card-header">
      Vault {{vault.id}}
    </div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
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
