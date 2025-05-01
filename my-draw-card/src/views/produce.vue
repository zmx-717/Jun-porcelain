<template>
  <div class="carousel-container" @click.self="clearActiveBox">
    <!-- 左侧视频 -->
    <div class="video-container">
      <video
        src="/videos/your-video.mp4"
        muted
        loop
        class="video"
        @mouseenter="playVideo"
        @mouseleave="pauseVideo"
        ref="videoRef"
      ></video>
    </div>

    <!-- 右侧方框 -->
    <div class="box-container">
      <div
        v-for="(box, index) in boxes"
        :key="index"
        class="box"
        :class="{ active: activeIndex === index }"
        @click.stop="setActiveBox(index)"
      >
        {{ box }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const videoRef = ref(null); // 视频引用
const boxes = ['Box 1', 'Box 2', 'Box 3', 'Box 4']; // 方框内容
const activeIndex = ref(null); // 当前激活的方框索引

// 鼠标移到视频上时播放
const playVideo = () => {
  videoRef.value.play();
};

// 鼠标移出视频时暂停
const pauseVideo = () => {
  videoRef.value.pause();
};

// 设置激活的方框
const setActiveBox = (index) => {
  activeIndex.value = index;
};

// 清除激活的方框
const clearActiveBox = () => {
  activeIndex.value = null;
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin-top: 8vh;
  height: 92vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.video-container {
  flex: 1; /* 左侧占 60% */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.video {
  width: 100%;
  height: auto;
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.video:hover {
  transform: scale(1.05); /* 鼠标移到视频上时放大 */
}

.box-container {
  flex: 1; /* 右侧占 40% */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  height: 100%;
  padding: 20px;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-image: url('/textures/stars_background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.4; /* 默认透明度更高 */
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
}

.box.active {
  opacity: 0.7; 
  background-color: #007bff; /* 激活时背景颜色 */
  color: #fff; /* 激活时文字颜色 */
  animation: bounce 0.3s ease; /* 添加弹动效果 */
}

.box:hover {
  opacity: 0.6; 
  transform: scale(1.1); /* 鼠标移到方框上时放大 */
}

/* 弹动效果 */
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9); /* 缩小 */
  }
  100% {
    transform: scale(1); /* 回到原来大小 */
  }
}
</style>