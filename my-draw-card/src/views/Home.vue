<template>
  <div class="carousel-container">
    <!-- 轮播图内容 -->
    <div class="carousel">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :style="getItemStyle(index)"
        @mouseenter="stopAutoPlay" 
        @mouseleave="startAutoPlay"
        @click="toggleFlip(index)" 
        :class="{ flipped: flippedItems[index] }" 
      >
        <div class="carousel-item-inner">
          <!-- 正面 -->
          <div class="carousel-item-front">
            <img :src="item.frontImage" alt="正面图片" class="carousel-image" />
          </div>
          <!-- 反面 -->
          <div class="carousel-item-back">
            <img :src="item.backImage" alt="反面图片" class="carousel-image" />
            <p class="carousel-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧按钮 -->
    <button @click="prev" class="arrow-button left">‹</button>

    <!-- 右侧按钮 -->
    <button @click="next" class="arrow-button right">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 轮播图内容：每个项目包含正面图片、反面图片和文字描述
const items = [
  {
    frontImage: 'https://via.placeholder.com/300x400?text=正面1',
    backImage: 'https://via.placeholder.com/300x400?text=反面1',
    description: '这是第一个项目的介绍',
  },
  {
    frontImage: 'https://via.placeholder.com/300x400?text=正面2',
    backImage: 'https://via.placeholder.com/300x400?text=反面2',
    description: '这是第二个项目的介绍',
  },
  {
    frontImage: 'https://via.placeholder.com/300x400?text=正面3',
    backImage: 'https://via.placeholder.com/300x400?text=反面3',
    description: '这是第三个项目的介绍',
  },
];

const currentIndex = ref(0); // 当前显示的索引
const flippedItems = ref(items.map(() => false)); // 每个项目的翻转状态
let intervalId = null; // 自动播放的定时器 ID

// 获取每个项目的样式
const getItemStyle = (index) => {
  const offset = (index - currentIndex.value + items.length) % items.length; // 计算偏移量
  const position = offset === 0 ? 0 : offset === 1 ? 1 : -1; // 确定位置：中间、右边、左边
  const scale = position === 0 ? 1 : 0.8; // 中间的项目更大
  const opacity = position === 0 ? 1 : 0.5; // 中间的项目更亮
  const zIndex = position === 0 ? 2 : 1; // 中间的项目在最前面
  const translateX = position * 100; // 水平偏移

  return {
    transform: `translateX(${translateX}%) scale(${scale})`,
    opacity,
    zIndex,
  };
};

// 显示下一个项目
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % items.length;
};

// 显示上一个项目
const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + items.length) % items.length;
};

// 自动播放
const startAutoPlay = () => {
  stopAutoPlay(); // 确保之前的定时器被清除
  intervalId = setInterval(next, 3000); // 每 3 秒切换一次
};

// 停止自动播放
const stopAutoPlay = () => {
  clearInterval(intervalId);
};

// 切换翻转状态
const toggleFlip = (index) => {
  flippedItems.value[index] = !flippedItems.value[index];
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin-top: 8vh;
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-color:#cae0e2;
    opacity: 0.8; 
    backdrop-filter: blur(100px); /* 磨砂效果 */
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  width: 33%;
  height: 90%;
  perspective: 1000px; /* 添加透视效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: transform 0.5s ease, opacity 0.5s ease, z-index 0.5s ease;
}

.carousel-item-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* 保持 3D 效果 */
  transition: transform 0.6s;
}

.carousel-item.flipped .carousel-item-inner {
  transform: rotateY(180deg); /* 翻转效果 */
}

.carousel-item-front,
.carousel-item-back {
  position: absolute;
  width: 100%;
  height: 95%;
  backface-visibility: hidden; /* 隐藏背面 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.carousel-item-front {
  background-color: #ccc;
}

.carousel-item-back {
  background-color: #999;
  transform: rotateY(180deg); /* 背面旋转 */
  text-align: center;
  padding: 10px;
}

.carousel-image {
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
}

.carousel-description {
  margin-top: 10px;
  font-size: 16px;
  color: #fff;
}

.arrow-button {
  position: absolute;
  top: 50%; /* 上下居中 */
  transform: translateY(-50%); /* 修正垂直居中偏移 */
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2); /* 磨砂效果 */
  color: white;
  border: none;
  border-radius: 50%; /* 圆形按钮 */
  font-size: 24px;
  cursor: pointer;
  backdrop-filter: blur(10px); /* 磨砂效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-button.left {
  left: 20px; /* 左侧按钮距离左边 20px */
}

.arrow-button.right {
  right: 20px; /* 右侧按钮距离右边 20px */
}

.arrow-button:hover {
  background-color: rgba(255, 255, 255, 0.4); /* 鼠标悬停时背景颜色变亮 */
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

.arrow-button:active {
  transform: scale(0.9); /* 点击时缩小，弹动效果 */
}
</style>