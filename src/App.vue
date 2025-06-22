<template>
  <div id="app-wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { watch, onMounted, onUnmounted, nextTick } from 'vue'

const route = useRoute()
let resizeObserver
let parentOrigin = null

// Универсальная обёртка — до handshake targetOrigin='*', после конкретный origin
function postToParent(type, payload = {}) {
  const target = parentOrigin || '*'
  window.parent.postMessage({ type, ...payload }, target)
}

// Отправляем высоту iframe
function sendHeight() {
  if (import.meta.env.SSR) return
  const wrapper = document.getElementById('app-wrapper')
  if (!wrapper) return
  const height = Math.ceil(wrapper.getBoundingClientRect().height)
  postToParent('setHeight', { height })
}

// Запускаем handshake
function startHandshake() {
  postToParent('handshake-request')
}

// Обрабатываем ответы от родителя
function handleMessage(event) {
  const { data, origin } = event

  // Фаза handshake: ждем ACK
  if (!parentOrigin) {
    if (data?.type === 'handshake-ack') {
      parentOrigin = origin
      // после получения origin сразу отправим высоту
      nextTick(sendHeight)
    }
    return
  }

  // Основной поток: только от проверенного origin
  if (origin !== parentOrigin) return

  switch (data.type) {
    case 'parent-data':
      console.log('Parent data:', data.payload)
      break
    case 'setHeightAck':
      // при необходимости логировать
      break
  }
}

// Слежка за изменением маршрута: высота, route-change и scrollToTop
watch(
  () => route.fullPath,
  (newPath) => {
    if (import.meta.env.SSR) return

    sendHeight()
    postToParent('route-change', { path: newPath })

    if (route.hash) {
      postToParent('scrollToTopDefault')
      // const isWide = window.innerWidth >= 751 
      // if (isWide) {
      //   postToParent('scrollToTopSmooth')
      // } else {
      //   postToParent('scrollToTopDefault')
      // }
    }
  }
)

onMounted(() => {
  window.addEventListener('message', handleMessage)
  window.addEventListener('resize', sendHeight)

  startHandshake()

  nextTick(() => {
    sendHeight()
    const wrapper = document.getElementById('app-wrapper')
    if (wrapper) {
      resizeObserver = new ResizeObserver(sendHeight)
      resizeObserver.observe(wrapper)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('resize', sendHeight)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>
