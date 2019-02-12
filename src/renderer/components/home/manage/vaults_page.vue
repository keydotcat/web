<template>
  <div>
    <div class="header px-3 py-3 pt-md-5 pb-md-4 d-flex justify-content-between">
      <h3 class="display-9">Vaults</h3>
      <div class="input-group w-50">
        <input type="text" v-model="vaultName" class="form-control" placeholder="vault name" aria-label="name" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="createVault">Create vault</button>
        </div>
      </div>
    </div>
    <vault-access class="mb-3" v-for="vault in vaults" :key="vault.id" :vault="vault" :tid="$route.params.tid"></vault-access>
  </div>
</template>

<script>
import VaultAccess from '@/components/home/manage/vault_access'

export default {
  components: { VaultAccess },
  data() {
    return {
      vaultName: ''
    }
  },
  computed: {
    vaults() {
      return this.$store.state['team.' + this.$route.params.tid].vaults
    }
  },
  methods: {
    createVault() {
      this.$store.dispatch(`team.${this.$route.params.tid}/createVault`, this.vaultName)
      this.vaultName = ''
    }
  }
}
</script>

<style></style>
