<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title" v-if='!editName'>{{ location.name || 'Location name' }}
        <i class="fas fa-edit float-right" @click='editName=true'></i>
      </h5>
      <h5 class="card-title" v-if='editName'>
        <div class="input-group w-100">
          <input type="text" v-model="location.name" class="form-control" placeholder="Location name" aria-label="name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="editName=false">Set name</button>
          </div>
        </div>
      </h5>
      <h6 class="card-subtitle m-2 text-muted" v-if="location.id">{{location.id}}</h6>
      <h6 class="card-subtitle m-2 text-muted">URLs </h6>
      <ul class="list-group list-group-flush">
        <li class="list-group-item url-group-item" v-for="(url,idurl) in location.urls">
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
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'location-detail',
    props: {
      location: Object
    },
    data () {
      return {
        editName: false,
        newUrl: '',
        showNewUrlInput: false,
        urlsInEditMode: {}
      }
    },
    methods: {
      saveUrl(idurl) {
        this.location.urls[idurl] = this.urlsInEditMode[idurl]
        this.$delete(this.urlsInEditMode, idurl)
      },
      isUrlBeingEdited(idurl) {
        return idurl in this.urlsInEditMode
      },
      editUrl (idurl) {
        this.$set(this.urlsInEditMode, idurl, this.location.urls[idurl])
      },
      addUrl () {
        if( !('urls' in this.location) ) {
          this.location.urls = []
        }
        this.location.urls.push( this.newUrl )
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
