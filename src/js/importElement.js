import {
    Button,
    Row,
    Col,
    Menu,
    MenuItem,
    Select,
    Dropdown,
    DropdownMenu,
    DropdownItem
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
  Vue.use(Select)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
}

export default importElement
