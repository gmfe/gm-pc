import Modal from './modal'
import { ModalStatic, ModalProps } from './types'
import classNames from 'classnames'

const RightSideModal: ModalStatic = {
  render(props: ModalProps): void {
    Modal.render({
      ...props,
      className: classNames('gm-modal-right-side', props.className),
    })
  },
  hide(): void {
    Modal.hide()
  },
}

export default RightSideModal
