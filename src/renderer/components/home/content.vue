<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-sm-3 col-lg-1 d-none d-md-block sidebar">
        <div class="sidebar-sticky">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Keys</span>
          </h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: activePage == 'dashboard' }" href="#" @click="goto('dashboard')">Dashboard</a>
            </li>
          </ul>
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Manage</span>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: activePage == 'users' }" href="#" @click="goto('users')">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: activePage == 'vaults' }" href="#" @click="goto('vaults')">Vaults</a>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" class="col-sm-9 col-lg-11 ml-sm-auto px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-content',
  data() {
    return {}
  },
  computed: {
    activePage() {
      var sp = this.$route.path.split('/').filter(x => x.length > 0)
      return sp.length > 3 ? sp[3] : ''
    }
  },
  methods: {
    goto(where) {
      this.$router.push(`/home/team/${this.$store.getters.activeTeam.id}/${where}`)
    }
  }
}
</script>

<style>
/*
 * Sidebar
 */

.sidebar {
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
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
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
