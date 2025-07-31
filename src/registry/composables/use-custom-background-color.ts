/**
 * Change the background color of the body to a custom color
 *
 * Replace the class `bg-background` with provided bgClass. Defaults to `bg-muted`.
 * Don't forget to handle dark variant.
 */
import { onMounted, onUnmounted } from 'vue'

export function useCustomBackgroundColor(bgClass = 'bg-muted') {
  onMounted(() => {
    document.body.classList.replace('bg-background', bgClass)
  })

  onUnmounted(() => {
    document.body.classList.replace(bgClass, 'bg-background')
  })
}
