<template>
  <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>User</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" :class="{'active': activePage == 'user/info'}" href="#" @click="goto('user/info')">Information</a>
                <a class="nav-link" :class="{'active': activePage == 'user/import'}" href="#" @click="goto('user/import')">Import</a>
                <a class="nav-link" :class="{'active': activePage == 'user/export'}" href="#" @click="goto('user/export')">Export</a>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Teams</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nas-item" v-for="tid in $store.getters['user/team_ids']" v-if="isAdmin(tid)">
                <a class="nav-link" href="#" @click="setTeam(tid)" :class="{'active': activePage == 'team/'+tid}">
                {{$store.getters[`team.${tid}/name`]}}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="goto('new_team')"><i class="fas fa-plus-square"></i> Create team</a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'manage-content',
    data () {
      return {}
    },
    beforeMount() {
      this.defaultPage()
    },
    updated() {
      this.$nextTick(() => {
        this.defaultPage()
      })
    },
    computed: {
      activePage () {
        var sp = this.$route.path.split('/').filter( x => x.length > 0 )
        return sp.slice(2, 4).join('/')
      }
    },
    methods: {
      defaultPage() {
        if( this.activePage.length === 0 ) {
          this.goto('user/info')
        }
      },
      isAdmin(tid) {
        var uid = this.$store.state.user.id
        return this.$store.getters[`team.${tid}/admins`].filter((admin) => admin.id === uid).length > 0
      },
      setTeam (tid) {
        if('tid' in this.$route.params){
          this.$router.push({params: {tid: tid}})
        } else {
          this.goto( 'team/' + tid )
        }
      },
      goto (where) {
        this.$router.push( `/home/manage/${where}` )
      }
    }
  }
</script>

<style>
  /*
 * Sidebar
 */

.sidebar {
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 56px);
  /*padding-top: .5rem;*/
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

</style>
