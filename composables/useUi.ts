import { ref } from 'vue'

const _showCart3D = ref(false)

export function useUi() {
  function showCart3D() { _showCart3D.value = true }
  function hideCart3D() { _showCart3D.value = false }
  return {
    showCart3D: _showCart3D,
    showCart3DOverlay: showCart3D,
    hideCart3D,
    toggleCart3D: () => (_showCart3D.value = !_showCart3D.value),
  }
}
