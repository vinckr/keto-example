
import Prism from 'prismjs'

import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  runExampleClient()
  console.log("client running")
})

const runExampleClient = () => {
  const resetFields = () => {
    Array.from(document.querySelectorAll('#example-client-form input')).forEach(
      (element) => {
        ;(element as HTMLInputElement).value = ''
      }
    )
  }
  const renderRequest = (request: string) => {
    ;(
      document.querySelector('#example-client-request code') as HTMLElement
    ).textContent = request
  }
  const renderResult = (result: string) => {
    ;(
      document.querySelector('#example-client-result code') as HTMLElement
    ).textContent = result
    resetFields()
  }

  document.getElementById('example-client-get').onclick = () => {
    const username = (
      document.getElementById('example-client-username') as HTMLInputElement
    ).value
    const filename = (
      document.getElementById('example-client-filename') as HTMLInputElement
    ).value

    renderRequest(`fetch('http://localhost:7000/${filename}', {
      method: 'GET',
      headers: {
        authorization: '${username}'
      }
    })`)

    Prism.highlightAll()

    fetch(`http://localhost:7000/${filename}`, {
      method: 'GET',
      headers: {
        authorization: username
      }
    })
      .then((resp) => resp.text())
      .then(renderResult)
  }
  document.getElementById('example-client-post').onclick = () => {
    const username = (
      document.getElementById('example-client-username') as HTMLInputElement
    ).value
    const filename = (
      document.getElementById('example-client-filename') as HTMLInputElement
    ).value
    const content = (
      document.getElementById('example-client-content') as HTMLInputElement
    ).value

    renderRequest(`fetch('http://localhost:7000/${filename}', {
      method: 'POST',
      headers: {
        authorization: '${username}'
      },
      body: content
    })`)

    Prism.highlightAll()

    fetch(`http://localhost:7000/${filename}`, {
      method: 'POST',
      headers: {
        authorization: username
      },
      body: content
    })
      .then((resp) => resp.text())
      .then(renderResult)
  }
}
