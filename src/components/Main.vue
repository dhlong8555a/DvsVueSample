<template>
  <div class="wrapper">
     <header>
       <el-row class="header" type="flex" align="bottom">
         <el-col :span="3" class="logo">
            <span><i class="iconfont icon-devops"></i> DevOps</span>
         </el-col>
         <el-col :span="18" class="workspace">
            <span>{{curWsp.name}}  </span>
            <el-dropdown class="dropdown" @command="handlePrjCmd">
              <span class="el-dropdown-link">{{curPrjName}}</span>
              <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <el-dropdown-item class="dropdown-item" command="0">{{defPrjName}}</el-dropdown-item>
                <el-dropdown-item 
                  class="dropdown-item" v-for="item in activePrjs" 
                  :key="item"
                  :command="item.id.toString()"
                  divided>
                    {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
         </el-col>
         <el-col :span="3" class="user">
           <el-dropdown class="dropdown" @command="handleUserCmd">
              <span class="el-dropdown-link">
                <i class= "iconfont icon-user"></i> 
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
      <el-col :span="3" class="menu">
        <el-menu :router='true' :default-active="curPage">
          <el-menu-item index="project"><i class="iconfont icon-project"></i> Project</el-menu-item>
          <el-menu-item index="pipeline"><i class="iconfont icon-pipeline"></i> Pipeline</el-menu-item>
          <el-menu-item index="report"><i class="iconfont icon-report"></i> Report</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import RepeatRunner from 'repeat-runner'
import { Message } from 'element-ui'

export default {
  name: 'dvs-main',
  data () {
    return {
      defPrjName: 'All',
      refreshRunner: null,
      refreshInterval: 2000
    }
  },
  created () {
    this.refreshRunner = new RepeatRunner(this.refreshFun, this.refreshInterval)
  },
  mounted () {
    if (!this.refreshRunner.isRunning) this.refreshRunner.start()
  },
  beforeDestroy () {
    this.refreshRunner.stop()
  },
  watch: {
    curMessage () {
      if (this.curMessage.message.length > 0) {
        console.log(this.curMessage.message.length)
        let msg = {
          message: this.curMessage.message,
          type: this.curMessage.type
        }
        Message(msg)
      }
    }
  },
  computed: {
    ...mapState([
      'curWsp',
      'activePrjs',
      'curMessage'
    ]),
    ...mapGetters([
      'curActivePrj',
      'curPage'
    ]),
    curPrjName () {
      if (this.curActivePrj == null) {
        this.setCurActivePrj(0)
        return this.defPrjName
      } else return this.curActivePrj.name
    }
  },
  methods: {
    ...mapMutations([
      'setCurActivePrj'
    ]),
    ...mapActions([
      'updateActivePrjs'
    ]),
    handlePrjCmd (command) {
      let id = command
      this.setCurActivePrj(id)
    },
    handleUserCmd (command) {

    },
    refreshFun () {
      this.updateActivePrjs()
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
      .dropdown-menu-div{
        height: 100px;
        overflow-x: hidden;
        overflow-y: auto;
      }
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
