import React from 'react'
import Dialog from './dialog'
import Alert from './alert'
import Confirm from './confirm'
import Prompt from './prompt'
import Delete from './delete'

export const ComDialog = () => {
  return (
    <button
      onClick={() => {
        Dialog.render({
          buttons: [
            {
              text: '关闭',
              onClick() {
                console.log('关闭')
                Dialog.hide()
              },
            },
          ],
          children: <div>对话框</div>,
        })
      }}
    >
      dialog
    </button>
  )
}

export const ComAlert = () => {
  return (
    <div>
      <button
        onClick={() => {
          Alert('这是alert').then(() => {
            console.log('ok')
            return null
          })
        }}
      >
        alert text
      </button>
      <button
        onClick={() => {
          Alert({
            children: '这是alert',
            okBtnText: '点我',
          }).then(() => {
            console.log('ok')
            return null
          })
        }}
      >
        alert okBtnText
      </button>
    </div>
  )
}

export const ComConfirm = () => {
  return (
    <div>
      <button
        onClick={() => {
          Confirm('这是Confirm').then(
            () => {
              return console.log('ok')
            },
            () => {
              console.log('cancel')
            }
          )
        }}
      >
        confirm
      </button>
      <button
        onClick={() => {
          Confirm({
            title: 'hello',
            children: '这是alert',
            okBtnText: '点我',
            cancelBtnText: '不点我',
          }).then(
            () => {
              return console.log('ok')
            },
            () => {
              console.log('cancel')
            }
          )
        }}
      >
        confirm okBtnText cancelBtnText
      </button>
    </div>
  )
}

export const ComDelete = () => {
  return (
    <div>
      <button
        onClick={() => {
          Delete('删除拉').then(
            () => {
              return console.log('delete')
            },
            () => {
              console.log('cancel')
            }
          )
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          Delete({ children: '删除拉', read: true }).then(
            () => {
              return console.log('delete')
            },
            () => {
              console.log('cancel')
            }
          )
        }}
      >
        delete read
      </button>
    </div>
  )
}

export const ComPrompt = () => {
  return (
    <div>
      <button
        onClick={() => {
          Prompt({
            size: 'sm',
            children: '请填写，< 5 不通过',
            // @ts-ignore
            onValidate(value) {
              if (parseInt(value, 10) < 5) {
                console.log(value, '<5')
                return false
              }
            },
          }).then(
            (value) => {
              console.log('ok', value)
              return false
            },
            () => {
              console.log('cancel')
            }
          )
        }}
      >
        prompt
      </button>
    </div>
  )
}

export default {
  title: '反馈/Dialog',
}
