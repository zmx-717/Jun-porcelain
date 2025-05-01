<template>
    <div class="horizontal-scroll-container">
      <div class="horizontal-scroll-content">
        <div class="horizontal-item">
          <h3>钧瓷的创新</h3>
          <p>钧瓷在现代设计中焕发新生...</p>
        </div>
        <div class="horizontal-item">
          <h3>数字化钧瓷</h3>
          <p>通过数字技术复原钧瓷的烧制过程...</p>
        </div>
        <div class="horizontal-item">
          <h3>钧瓷的未来</h3>
          <p>钧瓷在国际舞台上的影响力...</p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const container = document.querySelector('.horizontal-scroll-container');
  const content = document.querySelector('.horizontal-scroll-content');

  // 设置水平滚动动画
  gsap.to(content, {
    x: () => -(content.scrollWidth - container.offsetWidth), // 内容向左滚动的距离
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${content.scrollWidth}`, // 滚动距离等于内容宽度
      scrub: true, // 平滑滚动
      pin: true, // 固定容器
    },
  });
});
</script>

<style scoped>
.horizontal-scroll-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
  position: relative;
  background: #f5f5f5;
}

.horizontal-scroll-content {
  display: flex;
  width: max-content; /* 根据内容自动扩展宽度 */
  height: 100%;
  transform: translateX(0);
  overflow:  hidden !important;
}

.horizontal-item {
  flex: none;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
</style>