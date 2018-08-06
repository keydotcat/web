<template>
  <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>
                <a :class="{'active': activePage == 'locations'}" href="#" @click="goto('locations')">Locations</a>
              </span>
            </h6>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <msg-display></msg-display>
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>

<script>
  import MsgDisplay from '@/components/msg_display'
  export default {
    name: 'data-content',
    components: { MsgDisplay },
    data () {
      return {}
    },
    beforeMount() {
      if( this.activePage.length === 0 ) {
        this.goto('locations')
      }
    },
    computed: {
      activePage () {
        var sp = this.$route.path.split('/').filter( x => x.length > 0 )
        return sp.length > 2 ? sp[2] : ''
      }
    },
    methods: {
      goto (where) {
        this.$router.push( `/home/data/${where}` )
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
