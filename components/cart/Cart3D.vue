<template>
  <transition name="cart3d-fade" appear>
    <div v-if="open" class="cart3d-overlay" @click.self="close">
      <div class="stage">
        <div class="phone">
          <div class="screen">
            <div class="cart-icon" />
            <div class="cards">
              <div class="card" v-for="i in 3" :key="i" :style="{ '--d': i }">
                <div class="thumb" />
                <div class="lines">
                  <span class="line" />
                  <span class="line short" />
                </div>
              </div>
            </div>
            <div class="cta">Checkout</div>
          </div>
        </div>
      </div>
      <button class="close" @click="close" aria-label="Close">×</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()
function close(){ emit('close') }
</script>

<style scoped>
.cart3d-overlay{ position: fixed; inset:0; background: rgba(0,0,0,.6); display:grid; place-items:center; z-index: 10000; }
.stage{ perspective: 1000px; }
.phone{ width: 280px; height: 520px; background: #111; border-radius: 32px; border: 2px solid #222; box-shadow: 0 30px 60px rgba(0,0,0,.6); transform: rotateX(12deg) rotateY(-18deg); transform-style: preserve-3d; animation: float 5s ease-in-out infinite; }
.screen{ position: relative; margin: 20px; border-radius: 24px; background: linear-gradient(160deg,#161616,#1e1e1e); height: calc(100% - 40px); overflow: hidden; box-shadow: inset 0 0 0 2px #2a2a2a; }
.cart-icon{ position:absolute; top: 24px; right: 24px; width: 22px; height: 22px; background: url('~/assets/icons/Cart.png') center/contain no-repeat; opacity: .8 }
.cards{ position:absolute; inset: 90px 16px auto 16px; display: grid; gap: 12px; }
.card{ display:flex; gap: 12px; align-items: center; padding: 12px; background: #1f1f1f; border-radius: 12px; border: 1px solid #2f2f2f; transform: translateZ(calc(var(--d) * 12px)); animation: slideIn .6s calc(var(--d) * .1s) both ease-out; }
.thumb{ width: 46px; height: 46px; border-radius: 10px; background: linear-gradient(135deg,#ffd86f,#fc6262); box-shadow: 0 8px 18px rgba(252,98,98,.35); }
.lines{ flex:1 }
.line{ display:block; height: 8px; background: #2d2d2d; border-radius: 6px; margin-bottom: 6px; }
.line.short{ width: 60%; }
.cta{ position:absolute; left:16px; right:16px; bottom: 16px; padding: 12px; text-align:center; border-radius: 12px; background:#ffde59; color:#000; font-weight: 800; letter-spacing: .5px; box-shadow: 0 8px 20px rgba(255,222,89,.5); transform: translateZ(40px); }

.close{ position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; background: #fff; border: none; font-size: 24px; line-height: 1; cursor: pointer; }

.cart3d-fade-enter-active,.cart3d-fade-leave-active{ transition: opacity .3s ease }
.cart3d-fade-enter-from,.cart3d-fade-leave-to{ opacity: 0 }

@keyframes float{ 0%{ transform: rotateX(12deg) rotateY(-18deg) translateY(0) } 50%{ transform: rotateX(12deg) rotateY(-18deg) translateY(-6px) } 100%{ transform: rotateX(12deg) rotateY(-18deg) translateY(0) } }
@keyframes slideIn{ from { transform: translate3d(-6px, 10px, 0); opacity: 0 } to { transform: translate3d(0,0,0); opacity: 1 } }
</style>
