import { Base } from '../../base/index'
import { processor } from './config'

export default class Line extends Base {
  name = 'line'
  getProcessor() {
    return processor
  }
}
