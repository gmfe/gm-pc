import { Base } from '../../base/index'
import { processor } from './config'

export default class Pie extends Base {
  name = 'pie'
  getProcessor() {
    return processor
  }
}
