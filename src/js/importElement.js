import {
    Button,
    Row,
    Col,
    Menu,
    MenuItem,
    Select,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Form,
    FormItem,
    Input
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
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
}

export default importElement
