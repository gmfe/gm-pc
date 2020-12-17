import { Base } from '../../base/index'
import { processor } from './config'

export default class Bar extends Base {
  name = 'bar'
  getProcessor() {
    return processor
  }
}
