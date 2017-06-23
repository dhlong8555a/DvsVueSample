<template>
<el-dialog size="small" :title="title" :visible.sync="isShow" :show-close="false">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="Active">
        <el-checkbox 
          v-model="prjInfo.active">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="Name">
        <el-input 
          v-model="prjInfo.name"
          placeholder="Please input">
        </el-input>
      </el-form-item>
      <el-form-item label="Discription">
        <el-input 
          v-model="prjInfo.desc"
          type="textarea"
          style="font-size:14px"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Please input">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
    <el-button @click="editCancel">Cancel</el-button>
    <el-button type="primary" @click="editOK">OK</el-button>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'dvs-prj-editer',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    oprtType: {
      type: String,
      required: false,
      default: 'Add'
    },
    prjInfo: {
      type: Object,
      required: false,
      default: {
        active: true,
        name: '',
        desc: ''
      }
    }
  },
  computed: {
    title () {
      let title = ''
      if (this.oprtType === 'Edit') title = 'Edit Project'
      else title = 'Add Project'
      return title
    }
  },
  methods: {
    editOK () {
      this.$emit('editOk')
    },
    editCancel () {
      this.$emit('editCancel')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
