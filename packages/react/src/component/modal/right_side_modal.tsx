import Modal from './modal'
import { ModalStatic, ModalProps } from './types'
import classNames from 'classnames'
import { LayoutRoot } from '../layout_root'

const RightSideModal: Pick<ModalStatic, 'render' | 'hide'> = {
  render(props: ModalProps): void {
    Modal._render(
      {
        ...props,
        className: classNames('gm-modal-right-side', props.className),
        containerClassName: classNames('gm-modal-right-side-container'),
      },
      LayoutRoot.Type.RIGHT_SIDE_MODAL
    )
  },
  hide(): void {
    Modal._hide(LayoutRoot.Type.RIGHT_SIDE_MODAL)
  },
}

export default RightSideModal
