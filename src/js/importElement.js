import {
    Button,
    Row,
    Col,
    Menu,
    MenuItem
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

function importElement (Vue) {
  locale.use(lang)

  Vue.use(Button)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Menu)
  Vue.use(MenuItem)
}

export default importElement
