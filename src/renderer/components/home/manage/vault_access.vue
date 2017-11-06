<template>
  <el-transfer filterable :titles="['Allowed users', 'Unauthorized users']"  :button-texts="['Allow', 'Deny']" @change='handleChange' :data="userData" v-model='userState'>
    <el-button class="transfer-footer" slot="left-footer" size="small">Remove from team</el-button>
    <el-button class="transfer-footer" slot="right-footer" size="small">Remove from team</el-button>
  </el-transfer>
</template

<script>
  export default {
    name: 'vault-access',
    properties: {
      vault: Object
    },
    data () {
      return {
        userData: [],
        userState: []
      }
    },
    methods: {
      handleChange(a, direction, keysMoved) {
        console.log(a, direction, keysMoved)
      }
    }
  }
</script>
