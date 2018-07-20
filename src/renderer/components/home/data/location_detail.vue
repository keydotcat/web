<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title" v-if='!editName'>{{ loc.name || 'Location name' }}
        <i class="fas fa-edit float-right" @click='editName=true'></i>
      </h5>
      <h5 class="card-title" v-if='editName'>
        <div class="input-group w-100">
          <input type="text" v-model="loc.name" class="form-control" placeholder="Location name" aria-label="name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="editName=false">Set name</button>
          </div>
        </div>
      </h5>
      <h6 class="card-subtitle m-2 text-muted" v-if="loc.id">{{loc.id}}</h6>
      <h6 class="card-subtitle m-2 text-muted">URLs </h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item url-group-item" v-for="(url,idurl) in loc.urls">
          <span v-if="!isUrlBeingEdited(idurl)">{{url}} <i class="fas fa-edit float-right" @click='editUrl(idurl)'></i></span>
          <div v-if="isUrlBeingEdited(idurl)" class="input-group w-100">
            <input type="text" v-model="urlsInEditMode[idurl]" class="form-control" placeholder="Url" aria-label="name">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="saveUrl(idurl)">Save</button>
            </div>
          </div>
        </li>
        <li class="list-group-item url-group-item" v-if="showNewUrlInput">
          <div class="input-group w-100">
            <input type="text" v-model="newUrl" class="form-control" placeholder="Url" aria-label="name">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addUrl">Add</button>
            </div>
          </div>
        </li>
        <li class="list-group-item url-group-item" @click="showNewUrl"><i class="fas fa-plus"></i> Add new url</li>
      </ul>
      <h6 class="card-subtitle m-2 text-muted">Credentials</h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item url-group-item" v-for="(cred,idcred) in loc.creds">
          <span v-if="!isCredBeingEdited(idcred)">to edit <i class="fas fa-edit float-right"></i></span>
          <location-credential-editor v-bind:cred="cred" v-on:change="cred=$event" v-if="isCredBeingEdited(idcred)" class="w-100"></location-credential-editor>
        </li>
        <li class="list-group-item url-group-item" @click="addNewCredential"><i class="fas fa-plus"></i> Add new credential</li>
      </ul>

      <a href="#" class="card-link">Cancel</a>
      <a href="#" class="card-link">Save</a>
    </div>
  </div>
</template>

<script>
  import LocationCredentialEditor from '@/components/home/data/location_credential_editor'

  export default {
    name: 'location-detail',
    components: {LocationCredentialEditor},
    props: {
      location: Object
    },
    data () {
      var loc = {}
      loc.name = this.location.name || ''
      loc.urls = this.location.urls || []
      loc.creds = this.location.credentials || []
      loc.id = this.location.id
      loc.labels = this.location.labels || []
      return {
        loc: loc,
        editName: false,
        newUrl: '',
        showNewUrlInput: false,
        urlsInEditMode: {},
        showNewCredentialInput: false,
        credsInEditMode: {}
      }
    },
    methods: {
      isCredBeingEdited(idc) {
        return idc in this.credsInEditMode
      },
      addNewCredential () {
        this.loc.creds.push({})
        var cid = this.loc.creds.length - 1
        this.$set(this.loc.creds[cid], 'type', 'login')
        this.$set(this.credsInEditMode, cid, true)
      },
      saveUrl(idurl) {
        this.loc.urls[idurl] = this.urlsInEditMode[idurl]
        this.$delete(this.urlsInEditMode, idurl)
      },
      isUrlBeingEdited(idurl) {
        return idurl in this.urlsInEditMode
      },
      editUrl (idurl) {
        this.$set(this.urlsInEditMode, idurl, this.loc.urls[idurl])
      },
      addUrl () {
        this.loc.urls.push( this.newUrl )
        this.showNewUrlInput = false
      },
      showNewUrl () {
        this.showNewUrlInput = true
        this.newUrl = ''
      },
      createLocation () {
        this.$router.push( `/home/data/new_location` )
      }
    }
  }
</script>

<style>
.url-group-item:first-child {
  border-top: 0px;
}

  .url-group-item:last-child {
    border-bottom: 0px;
  }
</style>
