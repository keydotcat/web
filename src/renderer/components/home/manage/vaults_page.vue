<template>
  <div class="manageVaultContent">
    <create-vault-dialog :visible='createVaultVisible' v-on:hide='createVaultVisible=false'></create-vault-dialog>
    <el-card>
      <div slot="header" class="manageVaultHeader">
        <span>Vaults</span>
        <el-button style="float: right" type="primary" @click='createVault'>Operation button</el-button>
      </div>
      <div>
        <el-collapse>
          <el-collapse-item v-for="vault in vaults" key="id" :title="vault.id" :name="vault.id">
            <vault-access :vauit="vault"></vault-access>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CreateVaultDialog from '@/components/home/manage/create_vault_dialog'
  import VaultAccess from '@/components/home/manage/vault_access'

  export default {
    components: { CreateVaultDialog, VaultAccess },
    data () {
      return {
        createVaultVisible: false
      }
    },
    computed: {
      vaults () {
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
</style>

