<template>
  <div class="wrapper">
     <header>
       <el-row class="header" type="flex" align="bottom">
         <el-col :span="4" class="logo">
            <span><i class="iconfont icon-devops"></i> DevOps</span>
         </el-col>
         <el-col :span="16" class="workspace">
            <span>{{curWorkspace}}  </span>
            <el-dropdown class="dropdown" @command="handlePrjCmd">
              <span class="el-dropdown-link">{{curProject}}</span>
              <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <el-dropdown-item class="dropdown-item" command="All">All</el-dropdown-item>
                <el-dropdown-item 
                  class="dropdown-item" v-for="item in projectItems" 
                  :key="item.name"
                  :command="item.name"
                  divided>
                    {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
         </el-col>
         <el-col :span="4" class="user">
           <el-dropdown class="dropdown" @command="handleUserCmd">
              <i class= "iconfont icon-user"></i> 
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <el-dropdown-item class="dropdown-item" command="Your Profile">
                  <i class="iconfont icon-profile"></i>
                  Your Profile
                </el-dropdown-item>
                <el-dropdown-item class="dropdown-item" command="Logout" divided>
                  <i class="iconfont icon-logout"></i>
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
         </el-col>
       </el-row>
    </header>
    <el-row class="container">
      <el-col :span="4" class="menu">
        <el-menu :router='true' default-active="project">
          <el-menu-item index="project"><i class="iconfont icon-project"></i> Project</el-menu-item>
          <el-menu-item index="pipeline"><i class="iconfont icon-pipeline"></i> Pipeline</el-menu-item>
          <el-menu-item index="report"><i class="iconfont icon-report"></i> Report</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dvs-main',
  data () {
    return {
      curWorkspace: 'EI-Workspace',
      curProject: 'All',
      projectItems: [
        { name: 'RMM' },
        { name: 'OTA' }
      ]
    }
  },
  methods: {
    handlePrjCmd (command) {
      console.log(command)
      this.curProject = command
    },
    handleUserCmd (command) {

    }
  }
}
</script>

<style lang="scss" scoped>

@import "../style/iconfont.scss";

.wrapper {
  $vp-hight:100vh;
  $wrapper-hight:$vp-hight;
  $header-hight:$wrapper-hight*0.1;
  $container-hight:$wrapper-hight*0.9;
  display:flex;
  flex-direction: column;
  height: $vp-hight;
  min-width: 1000px;
  min-height: 400px;

  header {
    flex:0,0,$header-hight;
    height: $header-hight;
    padding: 20px 0;
    background-color: rgb(32, 160, 255);
    color: white;
    .header{
      .logo{
        padding-left: 20px;
        font-size: 25px;
        i{
           font-size: 25px;
        }
      }

      .user{
        padding-right: 30px;
        text-align: right;
      }
    }  
    .dropdown{
      color: white;
    }
  }

  .container{
    flex: 1,0,auto;
    height: $container-hight;
    .menu {
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }   
    .content{
      height: 100%;
    }
  }
}

.dropdown-menu{
  font-size: 14px;
  border-radius: 4px;
  .dropdown-item{
    margin: 0;
    line-height:28px;
  }
}
</style>
