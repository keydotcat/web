<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title" @click="bEditingName=true" :class="{'text-danger':!isOkName}" v-if='!bEditingName'>{{ loc.name || 'Location name' }}
        <i class="fas fa-edit float-right" @click='bEditingName=true'></i>
      </h5>
      <h5 class="card-title" v-if='bEditingName'>
        <div class="input-group w-100">
          <input type="text" v-model="loc.name" class="form-control" placeholder="Location name" aria-label="name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="bEditingName=false">Set name</button>
          </div>
        </div>
      </h5>
      <h6 class="card-subtitle m-2 text-muted" v-if="id">{{id}}</h6>
      <h6 class="card-subtitle m-2 text-muted" v-if="bSelectingVault">
        <div class="form-group">
          <label>Choose which vault to store the secret </label>
          <select class="form-control form-control-sm" v-model="parentVault">
            <option :value="{tid: vt.tid, vid: vt.vid}" v-for="vt in allVaults">{{vt.teamName}} / {{vt.vid}}</option>
          </select>
        </div>
      </h6>
      <h6 class="card-subtitle m-2">URLs </h6>
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
      <h6 class="card-subtitle m-2" :class="{'text-danger':!isOkCreds}">Credentials</h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item url-group-item" v-for="(cred,idcred) in loc.creds">
          <span v-if="!isCredBeingEdited(idcred)">{{cred.type}}: {{cred.username}}<i @click="editCredential(idcred)" class="fas fa-edit float-right"></i></span>
          <location-credential-editor :idcred="idcred" :cred="cred" v-on:change="credChangedCb($event)"
            v-on:cancel="cancelCredChangeCb($event)" v-if="isCredBeingEdited(idcred)" class="w-100"></location-credential-editor>
        </li>
        <li class="list-group-item url-group-item" @click="addNewCredential"><i class="fas fa-plus"></i> Add new credential</li>
      </ul>
      <h6 class="card-subtitle m-2">Notes</h6>
      <div class="form-group pl-2">
        <textarea class="form-control" :rows="linesInNote" v-model="loc.note"></textarea>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <button type="button" :disabled="!isOk" class="btn btn-success" @click="saveChanges">Save</button>
      <button type="button" class="btn btn-danger ml-2" @click="cancelChanges">Cancel</button>
    </div>
  </div>
</template>

<script>
import LocationCredentialEditor from '@/components/home/data/location_credential_editor'

function isObjEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export default {
  name: 'location-detail',
  components: {LocationCredentialEditor},
  props: {
    id: String,
    location: Object,
    vault: Object
  },
  data () {
    var loc = {
      type: 'location',
      name: this.location.name || '',
      urls: this.location.urls || [],
      creds: this.location.creds || [],
      labels: this.location.labels || [],
      note: this.location.note || ''
    }
    var v = {
      tid: this.vault.tid || '',
      vid: this.vault.vid || ''
    }
    return {
      loc: loc,
      bEditingName: false,
      bSelectingVault: !this.id || this.id.length === 0,
      parentVault: v,
      newUrl: '',
      showNewUrlInput: false,
      urlsInEditMode: {},
      showNewCredentialInput: false,
      credsInEditMode: {}
    }
  },
  computed: {
    allVaults() {
      var vaults = []
      this.$store.getters['user/team_ids'].forEach((tid) => {
        this.$store.state[`team.${tid}`].vaults.forEach((vault) => {
          vaults.push({
            tid: tid,
            vid: vault.id,
            teamName: this.$store.state[`team.${tid}`].name
          })
        })
      })
      return vaults
    },
    linesInNote() {
      var nl = this.loc.note.split(/\r\n|\r|\n/).length
      return (nl < 10 ? nl : 10)
    },
    isOkName(){
      return this.loc.name.length > 0
    },
    isOkCreds(){
      return this.loc.creds.length > 0
    },
    isOk(){
      return this.isOkName && this.isOkCreds && isObjEmpty(this.credsInEditMode) && isObjEmpty(this.urlsInEditMode)
    }
  },
  methods: {
    saveChanges() {
      this.$store.dispatch( 'secrets/save', {
        teamId: this.parentVault.tid,
        vaultId: this.parentVault.vid,
        secretData: this.loc
      })
    },
    cancelChanges() {
      this.$router.push('/home/data/locations')
    },
    editCredential(idcred) {
      this.$set(this.credsInEditMode, idcred, false)
    },
    cancelCredChangeCb(idcred) {
      if( this.credsInEditMode[idcred] ) {
        //New credential so has to be deleted
        this.loc.creds.splice(idcred, 1)
      }
      this.$delete(this.credsInEditMode, idcred)
    },
    credChangedCb(ev) {
      for( var k in this.loc.creds[ev.idcred] ) {
        this.$delete(this.loc.creds[ev.idcred], k)
      }
      for( k in ev.cred ) {
        this.$set(this.loc.creds[ev.idcred], k, ev.cred[k])
      }
      this.$delete(this.credsInEditMode, ev.idcred)
    },
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
