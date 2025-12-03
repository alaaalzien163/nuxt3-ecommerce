<template>
  <transition name="splash-fade" appear>
    <div v-if="visible" class="splash-overlay">
      <div class="splash-content">
        <div class="logo-wrap">
          <img :src="logo" alt="Developer Test" class="logo" />
        </div>
        <div class="brand">DEVELOPER TEST</div>
        <div class="bar">
          <span class="bar-fill" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>()
import logo from '~/assets/icons/DEVELOPER TEST - Logo.png'
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  background: #000;
  color: #fff;
  display: grid;
  place-items: center;
  z-index: 9999;
}
.splash-content { text-align: center; }
.logo-wrap { display:inline-block; animation: pop 900ms cubic-bezier(.2,.8,.2,1) forwards; }
.logo { width: 120px; height: auto; filter: drop-shadow(0 2px 0 rgba(255,255,255,.2)); }
.brand { margin-top: 10px; font-weight: 800; letter-spacing: 2px; font-size: 18px; opacity: 0; animation: fadeUp .8s .45s forwards; }
.bar { margin: 22px auto 0; width: 200px; height: 3px; background: rgba(255,255,255,.15); overflow: hidden; border-radius: 999px; }
.bar-fill { display:block; height: 100%; width: 40%; background: #fff; transform: translateX(-100%); animation: loading 1.6s .2s ease-in-out infinite; }

/* Enter/leave transition */
.splash-fade-enter-active,.splash-fade-leave-active { transition: opacity .5s ease; }
.splash-fade-enter-from,.splash-fade-leave-to { opacity: 0; }

@keyframes pop { from { transform: scale(.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }
@keyframes fadeUp { from { transform: translateY(6px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
@keyframes loading { 0%{ transform: translateX(-100%) } 50%{ transform: translateX(20%) } 100%{ transform: translateX(120%) } }
</style>
