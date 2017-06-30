<template>
<div class="prj_container" ref="prj_container">
  <el-row class="prj_toolbar" type="flex" align="bottom">
    <el-col :span="8" class="toolbar_oprt">
      <el-button size="small" @click="prjAdd"><i class="el-icon-plus"></i> Add</el-button>
    </el-col>
  </el-row>
  <el-table class="prj_content_table" ref="prjContentTable"
    tooltip-effect="dark"
    stripe
    height = "300"
    :data="curPrjs">
    <el-table-column
      :render-header="activeRender"
      min-width="20">
      <template scope="scope">
        <el-checkbox :value="scope.row.active" @input="prjCheckChange($event, scope.row)"></el-checkbox>
      </template>
    </el-table-column> 
    <el-table-column
      prop="name"
      label="Name"
      sortable
      min-width="60"
      show-overflow-tooltip>
    </el-table-column> 
    <el-table-column
      prop="pipelineNum"
      label="PipelineNum"
      :formatter="pipelineNumFormat"
      min-width="80">
    </el-table-column> 
    <el-table-column
      prop="description"
      label="Description"
      min-width="160"
      :formatter="descriptionFormat"
      show-overflow-tooltip>
    </el-table-column> 
    <el-table-column
      prop="updateTs"
      label="LastUpdated"
      sortable
      :formatter="updateTSFormat"
      min-width="80">
    </el-table-column> 
    <el-table-column
      label="Operate"
      align="center"
      min-width="40">
      <template scope="scope">
        <el-button @click="prjEdit(scope.row)" type="text" size="small" class="el-icon-edit"></el-button>
        <el-button v-if = "false" @click="prjDelete(scope.row, scope.$index)" type="text" size="small" class="el-icon-minus"></el-button>
      </template>
    </el-table-column> 
  </el-table>
  <el-pagination class="prj_pages"
    @current-change="handleCurPageChange"
    :current-page.sync="curPageNum"
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import { prjAPI } from '../../api/restfulAPI'
import refreshMixin from '../../js/mixin/refresh'

export default {
  name: 'dvs-project',
  components: {dvsPrjEditer},
  mixins: [refreshMixin],
  data () {
    return {
      pageName: 'project',
      refreshInterval: 2000,
      curPageNum: 1,
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
  computed: {
    ...mapState([
      'curWsp'
    ]),
    ...mapState('project', [
      'curPrjs',
      'prjTotalSize'
    ]),
    ...mapGetters('project', [
      'allPrjActive'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurMsg'
    ]),
    ...mapActions('project', [
      'getPrjs'
    ]),
    prjAdd () {
      this.editPrjOprt = 'Add'
      this.editPrjDlgShow = true
    },
    prjEdit (itemData) {
      this.editPrj = itemData
      this.editPrjInfo.active = itemData.active
      this.editPrjInfo.name = itemData.name
      this.editPrjInfo.desc = itemData.description
      this.editPrjOprt = 'Edit'
      this.editPrjDlgShow = true
    },
    prjEditOk () {
      this.editPrjDlgShow = false
      if (this.editPrjInfo.name.length !== 0) {
        if (this.editPrjOprt === 'Add') {
          this.postPrj(this.editPrjInfo.name,
            this.editPrjInfo.desc,
            this.editPrjInfo.active)
        } else if (this.editPrj) {
          this.putPrj(this.editPrj.id,
            this.editPrjInfo.name,
            this.editPrjInfo.desc,
            this.editPrjInfo.active)
          this.editPrj = null
        }
        this.handleCurPageChange(this.curPageNum)
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
      if (index === 0) this.curPageNum = this.curPageNum - 1
      this.handleCurPageChange(this.curPageNum)
    },
    handleCurPageChange (val) {
      if (val > 0) {
        let startIndex = this.papeSize * (val - 1)
        let count = this.papeSize
        this.getPrjs({startIndex, count})
      }
    },
    prjCheckChange (val, prj) {
      this.putPrj(prj.id, prj.name, prj.desc, val)
    },
    postPrj (name, desc, active) {
      prjAPI.addPrj(this.curWsp.id, {name, desc, active}).then(data => {
        let msg = {
          message: `Add ${name} project success`,
          type: 'success'
        }
        this.setCurMsg(msg)
      }).catch(error => {
        if (error.response.data.errorMsg != null && error.response.data.errorMsg.length > 0) {
          let msg = {
            message: `Add ${name} project failed, cause: ${error.response.data.errorMsg}`,
            type: 'error'
          }
          this.setCurMsg(msg)
        }
        console.log(error.response.data)
      })
    },
    putPrj (id, name, desc, active) {
      prjAPI.updatePrj(this.curWsp.id, {id, name, desc, active}).then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    },
    curPjrsActiveToggle (active) {
      for (let prj of this.curPrjs) {
        if (prj.active !== active) {
          prjAPI.updatePrj(this.curWsp.id, {id: prj.id, name: prj.name, desc: prj.description, active})
        }
      }
    },
    updateTSFormat (row, column) {
      let updateTs = this.$moment(row.updateTs).format('YYYY-MM-DD HH:mm:ss')
      return updateTs
    },
    descriptionFormat (row, column) {
      return row.description !== null && row.description.length > 0 ? row.description : 'N/A'
    },
    pipelineNumFormat (row, colunm) {
      return 0
    },
    refreshFun () {
      this.handleCurPageChange(this.curPageNum)
    },
    activeRender (h, {column, index}) {
      return h(
        'el-checkbox',
        {
          attrs: {
            value: this.allPrjActive
          },
          on: {
            input: this.curPjrsActiveToggle
          }
        }
      )
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
