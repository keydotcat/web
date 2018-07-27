<template>
  <div class="w-100 p-2">
    <div class="w-100 d-flex align-items-center">
      <span class="h5 m-0 ml-1">{{secret.data.name}}</span>
      <span class="badge badge-dark ml-1" v-for="label in secret.data.labels">{{label}}</span>
      <small class="text-muted ml-auto">{{$store.getters[`team.${secret.teamId}/name`]}}/{{secret.vaultId}}</small>
      <div class="dropdown ml-1">
        <i class="text-muted ml-1 fas fa-bars" data-toggle="dropdown" id="dropdownMenuIcon"></i>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuIcon">
          <a class="dropdown-item" @click="editSecret" href="#">Edit</a>
        </div>
      </div>
    </div>
    <div class="w-100 m-1 pl-5 d-flex align-items-center flex-wrap justify-content-start">
      <div class="card" v-for="cred in secret.data.creds">
        <div class="card-body p-2">
          <span class="h6 mr-2"> {{cred.username}}</span>
          <i class="fas fa-user mr-2" @click="copy(cred.username)"></i>
          <i class="fas fa-key mr-2" @click="copy(cred.password)"></i>
          <input type="text" hidden ref="copyHelper" id="copyHelper"></input>
        </div>
      </div>
    </div>
    <!--ul class="list-group mt-2 mb-2 pl-5 pr-2">
      <li class="list-group-item p-1 pl-3" v-for="cred in secret.data.creds"><i class="fas fa-user"></i> {{cred.username}}</li>
      </ul-->
  </div>
</template>

<script>
  export default {
    name: 'location',
    props: {
      secret: Object
    },
    methods: {
      editSecret() {
        this.$router.push( `/home/data/location/${this.secret.fullId}` )
      },
      copy(text) {
        var ref = this.$refs.copyHelper[0]
        ref.value = text
        ref.select()
        document.execCommand('copy')
        ref.value = ''
      }
    }
  }
</script>
