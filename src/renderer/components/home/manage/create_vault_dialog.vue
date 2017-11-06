<template>
  <el-dialog :title="$t('create_vault_title')" :visible.sync="visible">
    <el-form>
      <el-form-item label="Vault name">
        <el-input v-model="vaultName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button type="primary" @click="submit">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'create-vault-dialog',
    props: {
      visible: Boolean
    },
    data () {
      return {
        vaultName: ''
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('teamCreateVault', this.vaultName)
        this.$emit('hide')
      },
      hideDialog() {
        this.vaultName = ''
        this.$emit('hide')
      }
    }
  }
</script>

<style>
  .dialog-footer {
    padding: 15px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;
  }
</style>
