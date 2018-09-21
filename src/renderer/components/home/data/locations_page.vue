<template>
  <div>
    <div class="header px-3 py-3 pt-md-5 pb-md-4 d-flex justify-content-between">
      <h3 class="display-9">Locations</h3>
      <div class="input-group w-25 text-right d-flex flex-row-reverse">
        <button class="btn btn-primary" type="button" @click="createLocation">New location</button>
      </div>
    </div>
    <div class="rounded border w-90 mb-2">
      <div class="rounded bg-light border-bottom w-100 d-flex align-items-center justify-content-end p-1">
        <input type="text" v-model="filter.search" class="form-control mr-5" placeholder="Search">
        <i v-if="$store.state.secrets.loading > 0" class="fas fa-spinner spinner"></i>
        <div class="dropdown mr-2 d-flex align-items-center">
          <button class="btn btn-sm dropdown-toggle" :class="{'bg-success':filter.teams.length>0,'bg-transparent':filter.teams.length===0}" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Teams 
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" :class="{active: filter.teams.indexOf(team.id) > -1}" v-for="team in $store.getters['user/teams']" href="#" @click="toggleActiveTeam(team.id)">{{team.name}}</a>
          </div>
        </div>
        <div class="dropdown mr-2 d-flex align-items-center">
          <button class="btn btn-sm dropdown-toggle" :class="{'bg-success':filter.vaults.length>0,'bg-transparent':filter.vaults.length===0}" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Vaults 
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <div v-for="team in $store.getters['user/teams']">
              <a class="dropdown-item" :class="{active: isActiveVault(team.id,vault.id)}" v-for="vault in $store.getters[`team.${team.id}/vaults`]" href="#" @click="toggleActiveVault(team.id, vault.id)">{{team.name}}/{{vault.id}}</a>
            </div>
          </div>
        </div>

        <div class="dropdown mr-2 d-flex align-items-center">
          <button class="btn btn-sm dropdown-toggle" :class="{'bg-success':filter.labels.length>0,'bg-transparent':filter.labels.length===0}" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Labels
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-for="label in $store.getters['secrets/allLabels']" @click="toggleLabel(label)" :class="{active:isActiveLabel(label)}" href="#">{{label}}</a>
          </div>
        </div>
      </div>
      <location class="border-bottom" v-for="secret in pageLocations" :key="secret.fullId" :secret="secret" v-on:delete="requestDelete"></location>
      <div class="rounded bg-light border-bottom w-100 d-flex align-items-cender justify-content-end p-1">
        <nav aria-label="Page navigation">
          <ul class="pagination m-0">
            <li class="page-item" :class="{disabled:pageIdx==0}"><a class="page-link" @click="pageIdx-=1" href="#">Previous</a></li>
            <li class="page-item" v-for="pid in pagesToFastJump" :class="{active:pageIdx==pid}"><a class="page-link" @click="pageIdx=pid" href="#">{{pid}}</a></li>
            <li class="page-item" :class="{disabled:pageIdx==numPages-1}"><a class="page-link" @click="pageIdx+=1" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="modal fade" id="deleteLocationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete location {{secretToDel.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete {{secretToDel.name}} location?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No, keep it</button>
            <button type="button" class="btn btn-primary" @click="deleteSecret">Yes, delete it</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //Indent fix
  import Location from '@/components/home/data/location'
  import $ from 'jquery'

  export default {
    name: 'locations-page',
    components: {Location},
    data () {
      return {
        filter: {
          search: '',
          labels: [],
          teams: [],
          vaults: []
        },
        secretToDel: {
          name: '',
          tid: '',
          vid: '',
          sid: ''
        },
        pageIdx: 0,
        numLocs: 50
      }
    },
    computed: {
      allLocations() {
        return this.$store.getters['secrets/filteredSecrets'](this.filter)
      },
      pageLocations() {
        return this.allLocations.slice(this.pageIdx, this.pageIdx + this.numLocs)
      },
      numPages() {
        return Math.ceil( this.allLocations.length / this.numLocs )
      },
      pagesToFastJump() {
        var pages = []
        var jumps = [-10, -5, -2, -1, 0, 1, 2, 5, 10]
        jumps.forEach((jump) => {
          var t = this.pageIdx + jump
          if( t >= 0 && t < this.numPages ) {
            pages.push(t)
          }
        })
        return pages
      }
    },
    methods: {
      requestDelete(secret) {
        this.secretToDel.name = secret.data.name
        this.secretToDel.tid = secret.teamId
        this.secretToDel.vid = secret.vaultId
        this.secretToDel.sid = secret.secretId
        $('#deleteLocationModal').modal('show')
      },
      deleteSecret() {
        this.$store.dispatch('secrets/delete', {
          teamId: this.secretToDel.tid,
          vaultId: this.secretToDel.vid,
          secretId: this.secretToDel.sid
        })
        $('#deleteLocationModal').modal('hide')
      },
      isActiveLabel(label) {
        return this.filter.labels.indexOf(label) > -1
      },
      toggleLabel(label) {
        var it = this.filter.labels.indexOf(label)
        if( it > -1 ) {
          this.filter.labels.splice(it, 1)
        } else {
          this.filter.labels.push(label)
        }
      },
      isActiveVault(tid, vid) {
        var k = `${tid}/${vid}`
        return this.filter.teams.indexOf(tid) > -1 || this.filter.vaults.indexOf(k) > -1
      },
      toggleActiveVault(tid, vid){
        var k = `${tid}/${vid}`
        var it = this.filter.vaults.indexOf(k)
        if( it > -1 ) {
          this.filter.vaults.splice(it, 1)
        } else {
          this.filter.vaults.push(k)
        }
      },
      toggleActiveTeam(tid){
        var it = this.filter.teams.indexOf(tid)
        if( it > -1 ) {
          this.filter.teams.splice(it, 1)
        } else {
          this.filter.teams.push(tid)
        }
      },
      createLocation () {
        this.$router.push( `/home/data/new_location` )
      }
    }
  }
</script>

<style>
.spinner {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
