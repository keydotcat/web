<template>
  <div>
    <div class="header px-3 py-3 pt-md-5 pb-md-4 d-flex justify-content-between">
      <h3 class="display-9">Vaults</h3>
      <div class="input-group w-50">
        <input type="text" v-model="vaultName" class="form-control" placeholder="vault name" aria-label="name">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="createVault">Create vault</button>
        </div>
      </div>
    </div>
    <vault-access v-for="vault in vaults" key="id" :vault="vault"></vault-access>
  </div>
</template>

<script>
  import CreateVaultDialog from '@/components/home/manage/create_vault_dialog'
  import VaultAccess from '@/components/home/manage/vault_access'

  export default {
    components: { CreateVaultDialog, VaultAccess },
    data () {
      return {
        vaultName: ''
      }
    },
    computed: {
      vaults () {
        console.log(this.$store.state.team.vaults[0])
        return this.$store.state.team.vaults
      }
    },
    methods: {
      createVault () {
        this.createVaultVisible = true
      }
    }
  }
</script>

<style>
  .manageVaultContent {
    margin-top: 50px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
  }
  .manageVaultHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-card {
    margin: 10px;
  }
  .el-collapse {
    min-width: 300px;
  }
</style>

