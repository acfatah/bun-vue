import { h, render, Teleport } from 'vue'
import { toast } from 'vue-sonner'

import 'vue-sonner/style.css'
import Sonner from './Sonner.vue'

function createSonnerContainerOnce() {
  let toastContainer = document.getElementById('sonner-container')

  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'sonner-container'
    document.body.appendChild(toastContainer)

    render(
      h(Teleport, { to: 'body' }, [h(Sonner)]),
      toastContainer,
    )
  }
}

function useSonner() {
  createSonnerContainerOnce()

  return { toast }
}

export { toast, useSonner }
