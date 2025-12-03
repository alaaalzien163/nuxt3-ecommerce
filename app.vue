<template>
  <div>
    <LayoutHeader />
    <main>
      <NuxtPage />
    </main>
    <LayoutFooter />
    <LayoutSplash :visible="splashVisible" />
    <Cart3D :open="ui.showCart3D" @close="ui.hideCart3D" />
  </div>
</template>

<script setup>
// لا حاجة لاستيراد المكونات يدوياً في Nuxt 3
const splashVisible = ref(true)
const ui = useUi()
onMounted(() => {
  setTimeout(() => (splashVisible.value = false), 5000)
})
</script>

<style>
/* أنماط عامة */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

main {
  min-height: calc(100vh - 300px);
  padding-bottom: 2rem;
}
</style>