import Modal from './modal'
import { ModalStatic, ModalProps } from './types'
import classNames from 'classnames'

const CleanModal: ModalStatic = {
  render(props: ModalProps): void {
    Modal.render({ ...props, className: classNames('gm-modal-clean', props.className) })
  },
  hide(): void {
    Modal.hide()
  },
}

export default CleanModal
