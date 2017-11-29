<template>
  <div>
    <md-drawer md-permanent="clipped">
      <md-list>
        <md-list-item :to="'/home/'+$store.getters.activeTeam.id+'/manage/users'">
          <md-icon>person_pin</md-icon>
          <span class="md-list-item-text">{{$t('users')}}</span>
        </md-list-item>
        <md-list-item :to="'/home/'+$store.getters.activeTeam.id+'/manage/vaults'">
          <md-icon>folder</md-icon>
          <span class="md-list-item-text">{{$t('vaults')}}</span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <md-content>
      Content here
    </md-content>
    <!--el-row class="expandHeight">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" class="expandHeight">
      <el-menu :router="true" mode="vertical" class="expandHeight">
        <el-menu-item :index="'/home/'+$store.state.team.id+'/manage/users'">
          <i class="el-icon-view"></i><span>{{$t('users')}}</span>
        </el-menu-item>
        <el-menu-item :index="'/home/'+$store.state.team.id+'/manage/vaults'">
          <i class="el-icon-menu"></i><span>{{$t('vaults')}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs="16" :sm="18" :md="20" :lg="21" :xl="22" class="expandHeight">
      <router-view></router-view>
    </el-col>
    </el-row-->
  </div>
</template>

<script>
  export default {
    name: 'manage-page'
  }
</script>

<style>
  .centerFlex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
