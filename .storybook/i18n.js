import { setLocale } from '../packages/locales/src'

let lng = localStorage.getItem('_gm-pc_lng')
lng = JSON.parse(lng)
console.log('lng', lng)
setLocale(lng)
