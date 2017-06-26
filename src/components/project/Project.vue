<template>
<div class="prj_container" ref="prj_container">
  <el-row class="prj_toolbar" type="flex" align="bottom">
    <el-col :span="8" class="toolbar_oprt">
      <el-button size="small" @click="prjAdd"><i class="el-icon-plus"></i> Add</el-button>
      <el-button size="small" @click="test">Test</el-button>
    </el-col>
  </el-row>
  <el-table class="prj_content_table" ref="prjContentTable"
    tooltip-effect="dark"
    stripe
    height = "300"
    :data="projectTable"
    :default-sort = "{prop: 'lastUpdated', order: 'descending'}">
    <el-table-column
      :render-header="activeRender"
      min-width="40">
      <template scope="scope">
        <el-checkbox :value="scope.row.active" @input="prjCheckChange($event, scope.row)"></el-checkbox>
      </template>
    </el-table-column> 
    <el-table-column
      prop="name"
      label="Name"
      sortable
      min-width="80">
    </el-table-column> 
    <el-table-column
      prop="pipelineNum"
      label="PipelineNum"
      min-width="80">
    </el-table-column> 
    <el-table-column
      prop="desc"
      label="Description"
      min-width="160"
      show-overflow-tooltip>
    </el-table-column> 
    <el-table-column
      prop="lastUpdated"
      label="LastUpdated"
      sortable
      min-width="120">
    </el-table-column> 
    <el-table-column
      label="Operate"
      min-width="60">
      <template scope="scope">
        <el-button @click="prjEdit(scope.row)" type="text" size="small" class="el-icon-edit"></el-button>
        <el-button @click="prjDelete(scope.row, scope.$index)" type="text" size="small" class="el-icon-minus"></el-button>
      </template>
    </el-table-column> 
  </el-table>
  <el-pagination class="prj_pages"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="papeSize"
    layout="total, prev, pager, next"
    :total="prjTotalSize">
  </el-pagination>
  <dvs-prj-editer 
    :isShow="editPrjDlgShow" 
    oprtType="Add" 
    :prjInfo="editPrjInfo"
    @editOk="prjEditOk"
    @editCancel="prjEditCancel">
  </dvs-prj-editer>
</div>
</template>

<script>
import dvsPrjEditer from './PrjEditer.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'dvs-project',
  components: {dvsPrjEditer},
  data () {
    return {
      curPrjIndex: 0,
      projectTable: [],
      currentPage: 0,
      papeSize: 15,
      editPrjDlgShow: false,
      editPrjOprt: '',
      editPrjInfo: {
        active: false,
        name: '',
        desc: ''
      },
      editPrj: null
    }
  },
  mounted () {
    if (this.prjTotalSize > 0) {
      this.currentPage = 1
    }
  },
  computed: {
    prjTotalSize () {
      return this.allPrjs.length
    },
    allChecked () {
      let allCh = true
      if (this.projectTable.length > 0) {
        for (let prj of this.projectTable) {
          if (prj.active === false) {
            allCh = false
            break
          }
        }
      } else allCh = false
      console.log('aaa' + allCh)
      return allCh
    },
    ...mapGetters({
      allPrjs: 'allPrjs'
    })
  },
  methods: {
    prjAdd () {
      this.editPrjOprt = 'Add'
      this.editPrjDlgShow = true
    },
    prjEdit (itemData) {
      this.editPrj = itemData
      this.editPrjInfo.active = itemData.active
      this.editPrjInfo.name = itemData.name
      this.editPrjInfo.desc = itemData.desc
      this.editPrjOprt = 'Edit'
      this.editPrjDlgShow = true
    },
    prjEditOk () {
      this.editPrjDlgShow = false
      let curDate = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      if (this.editPrjInfo.name.length !== 0) {
        let neweditPrj = {
          active: this.editPrjInfo.active,
          name: this.editPrjInfo.name,
          desc: this.editPrjInfo.desc.length > 0 ? this.editPrjInfo.desc : 'N/A',
          lastUpdated: curDate,
          pipelineNum: 0,
          index: 0
        }
        if (this.editPrjOprt === 'Add') {
          neweditPrj.index = this.curPrjIndex++
          this.addPrj(neweditPrj)
        } else if (this.editPrj) {
          neweditPrj.index = this.editPrj.index
          neweditPrj.pipelineNum = this.editPrj.pipelineNum
          this.updatePrj(neweditPrj)
          this.editPrj = null
        }
        this.handleCurrentChange(this.currentPage)
        this.$refs.prjContentTable.toggleRowSelection(neweditPrj, neweditPrj.active)
      }
      this.editPrjInfo.name = ''
      this.editPrjInfo.desc = ''
      this.editPrjInfo.active = false
    },
    prjEditCancel () {
      this.editPrjInfo.name = ''
      this.editPrjInfo.desc = ''
      this.editPrjInfo.active = false
      this.editPrjDlgShow = false
    },
    prjDelete (itemData, index) {
      this.deletePrj(itemData)
      if (index === 0) this.currentPage = this.currentPage - 1
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange (val) {
      let startIndex = this.papeSize * (val - 1)
      let endIndex = startIndex + this.papeSize
      this.projectTable = this.allPrjs.slice(startIndex, endIndex)
    },
    prjCheckChange (val, prj) {
      console.log(val + prj)
      let chgPrj = {
        active: val,
        name: prj.name,
        desc: prj.desc,
        lastUpdated: prj.lastUpdated,
        pipelineNum: prj.pipelineNum,
        index: prj.index
      }
      this.updatePrj(chgPrj)
    },
    allCheckedToggle (val) {
      console.log('bbb' + val)
      for (let prj of this.projectTable) {
        if (prj.active !== val) {
          let chgPrj = {
            active: val,
            name: prj.name,
            desc: prj.desc,
            lastUpdated: prj.lastUpdated,
            pipelineNum: prj.pipelineNum,
            index: prj.index
          }
          this.updatePrj(chgPrj)
        }
      }
    },
    ...mapActions({
      addPrj: 'addPrj',
      updatePrj: 'updatePrj',
      deletePrj: 'deletePrj'
    }),
    activeRender (h, {column, index}) {
      return h(
        'el-checkbox',
        {
          attrs: {
            value: this.allChecked
          },
          on: {
            input: this.allCheckedToggle
          }
        }
      )
    },
    test () {
      let vals = this.projectTable
      let table = this.$refs.prjContentTable
      for (let prj of vals) {
        console.log(prj.active + prj.name)
        table.toggleRowSelection(prj, prj.active)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../style/iconfont.scss";

.prj_container {
  $toolbarH:45px;
  $pagesH:40px;
  padding: 0px 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .prj_toolbar{
    flex-shrink: 0;
    background-color: #eef1f6;
    height: $toolbarH;
    margin-top: 5px;
    color: #48576a;
    .toolbar_oprt{
      height: 100%;
      padding-left: 20px;
      padding-top: 4px;
      font-size: 1.4em;
    }
  }

  .prj_content_table{
    flex-grow: 1;
    margin-top: 5px;
    width: 100%;
  }

  .prj_pages{
    flex-shrink: 0;
    height: $pagesH;
    text-align: center;
    margin-top: 10px;
  }
}

</style>
