<template>
  <div>
    <!--div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-left">
      <h3 class="display-9">Users</h3>
    </div-->

    <div class="container my-3">
      <div class="card-deck mb-3 text-left">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Administrators</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="user in admins" :key="user.id">
                <i class="fas fa-angle-double-right" v-if="user.canBeDemoted" @click="startDemote(user)"></i>
                <i class="fas fa-user" v-if="!user.canBeDemoted"></i>
                {{ user.label }}
              </li>
            </ul>
          </div>
          <div class="card-footer" v-if="showConfirmDemote">
            <div class="confirm">Demote {{ userToDemote.label }}?</div>
            <button type="button" @click="cancelDemote" class="btn btn-secondary btn-danger">No</button>
            <button type="button" @click="confirmDemote" class="btn btn-secondary btn-success float-right">Yes</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Users</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="user in users" :key="user.id" v-if="!user.admin">
                <i class="fas fa-angle-double-left" v-if="user.canBePromoted" @click="startPromote(user)"></i>
                <i class="fas fa-user" v-if="!user.canBePromoted"></i>
                {{ user.label }}
              </li>
            </ul>
          </div>
          <div class="card-footer" v-if="showConfirmPromote">
            <div class="confirm">Promote {{ userToPromote.label }}?</div>
            <button type="button" @click="cancelPromote" class="btn btn-secondary btn-danger">No</button>
            <button type="button" @click="confirmPromote" class="btn btn-secondary btn-success float-right">Yes</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Invites</h4>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="invite in invites" :key="invite.email"><i class="fas fa-times" @click="uninvite(invite.email)"></i> {{ invite.email }}</li>
            </ul>
          </div>
          <div class="card-footer" v-if="!showConfirmInvite">
            <div class="input-group">
              <input type="text" v-model="invite" class="form-control" placeholder="email" aria-label="email" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="startInvite">Invite</button>
              </div>
            </div>
          </div>
          <div class="card-footer" v-if="showConfirmInvite">
            <div class="confirm">Invite {{ invite }}?</div>
            <button type="button" @click="cancelInvite" class="btn btn-secondary btn-danger">No</button>
            <button type="button" @click="confirmInvite" class="btn btn-secondary btn-success float-right">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mid: '',
      invite: '',
      showConfirmInvite: false,
      showConfirmDemote: false,
      showConfirmPromote: false,
      userToDemote: {},
      userToPromote: {}
    }
  },
  watch: {
    $route(to, from) {
      this.mid = `team.${this.$route.params.tid}`
    }
  },
  beforeMount() {
    this.mid = `team.${this.$route.params.tid}`
  },
  computed: {
    invites() {
      return this.$store.state[this.mid].invites
    },
    admins() {
      return this.$store.getters[`${this.mid}/admins`]
    },
    users() {
      return this.$store.getters[`${this.mid}/users`]
    }
  },
  methods: {
    startDemote(user) {
      this.showConfirmDemote = true
      this.userToDemote = user
    },
    startPromote(user) {
      this.showConfirmPromote = true
      this.userToPromote = user
    },
    cancelPromote() {
      this.showConfirmPromote = false
      this.userToPromote = {}
    },
    cancelDemote() {
      this.showConfirmDemote = false
      this.userToDemote = {}
    },
    confirmPromote() {
      this.$store.dispatch(`${this.mid}/promoteUsers`, [this.userToPromote.data])
      this.showConfirmPromote = false
      this.userToPromote = {}
    },
    confirmDemote() {
      this.$store.dispatch(`${this.mid}/demoteUsers`, [this.userToDemote.data])
      this.showConfirmDemote = false
      this.userToDemote = {}
    },
    uninvite(email) {
      console.log(email, 'TODO')
    },
    startInvite() {
      if (this.invite.length > 0) {
        this.showConfirmInvite = true
      }
    },
    cancelInvite() {
      this.invite = ''
      this.showConfirmInvite = false
    },
    confirmInvite() {
      this.$store.dispatch(`${this.mid}/invite`, this.invite)
      this.invite = ''
      this.showConfirmInvite = false
    }
  }
}
</script>

<style>
.confirm {
  margin-bottom: 20px;
}
.fas {
  margin-right: 10px;
}
</style>
