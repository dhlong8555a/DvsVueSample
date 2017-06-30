import RepeatRunner from 'repeat-runner'
import { mapGetters } from 'vuex'

var refresh = {
  data () {
    return {
      refreshRunner: null
    }
  },
  created () {
    this.refreshRunner = new RepeatRunner(this.refreshFun, this.refreshInterval)
  },
  mounted () {
    if (!this.refreshRunner.isRunning && (this.curPage === this.pageName)) {
      this.refreshRunner.start()
    }
  },
  beforeDestroy () {
    this.refreshRunner.stop()
  },
  computed: {
    ...mapGetters({
      curPage: 'curPage'
    })
  },
  watch: {
    curPage (val) {
      console.log('curPage:' + val + this.pageName)
      if (val !== this.pageName) {
        console.log('stop')
        this.refreshRunner.stop()
      } else {
        console.log('start')
        this.refreshRunner.start()
      }
    }
  }
}

export default refresh
