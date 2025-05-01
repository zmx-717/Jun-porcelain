<template>
  <div class="container">
    <!-- 左侧区域 -->
    <div class="left-section">
      <div class="buttons">
        <button @click="openVideo(1)">按钮1</button>
        <button @click="openVideo(2)">按钮2</button>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="right-section">
      <!-- 切换按钮 -->
      <button class="layer-toggle" @click="showLayer = !showLayer">
        {{ showLayer ? '显示轮播' : '显示卡片' }}
      </button>

      <!-- 第一层：轮播层 -->
      <div class="layer-carousel" :class="{ 'hide-layer': showLayer }">
        <!-- 上部自动轮播 -->
        <div class="top-carousel">
          <div 
            class="carousel-track"
            :style="{ transform: `translateX(-${activeTopIndex * 100}%)` }"
          >
            <div 
              v-for="(img, index) in topImages" 
              :key="'top'+index"
              class="carousel-item1"
            >
              <img :src="img" alt="轮播图">
            </div>
          </div>
          <div class="carousel-dots">
            <button
              v-for="n in 5"
              :key="'dot'+n"
              :class="{ active: activeTopIndex === n-1 }"
              @click="activeTopIndex = n-1"
            ></button>
          </div>
        </div>

        <!-- 下部手动轮播 -->
        <div class="bottom-carousel">
          <button class="arrow left" @click="prevBottom">‹</button>
          <div class="carousel-wrapper">
            <div 
              class="carousel-track"
              :style="{ transform: `translateX(-${activeBottomIndex * 100}%)` }"
            >
              <div 
                v-for="(img, index) in bottomImages" 
                :key="'bottom'+index"
                class="carousel-item2"
              >
                <img :src="img" alt="轮播图">
              </div>
            </div>
          </div>
          <button class="arrow right" @click="nextBottom">›</button>
        </div>
      </div>

      <!-- 第二层：卡片层 -->
      <div class="layer-cards" :class="{ 'show-layer': showLayer }">
  <div class="card-scroll" @wheel="onScroll">
    <div 
      v-for="n in 20" 
      :key="'card'+n"
      class="card-item"
    >
      <div class="card-content">
        卡片 {{ n }}
      </div>
    </div>
  </div>
</div>
    </div>

    <!-- 弹窗 -->
    <teleport to="body">
      <div v-if="isModalOpen" class="overlay">
        <div class="modal" :class="{ 'hide-border': isAnimationRunning }">
          <div class="modal-content">
            <button
              v-if="!isAnimationRunning"
              class="close-button"
              @click="closeModal"
            >
              ×
            </button>
            <video
              v-if="isVideoPlaying"
              ref="videoPlayer"
              :src="currentVideo"
              controls
              autoplay
              @ended="onVideoEnded"
            ></video>

            <div v-else class="card-container">
              <!-- 魔法阵 -->
              <div 
                class="magic-circle"
                :style="{
                  transform: `scale(${circleScale})`,
                  opacity: circleOpacity
                }"
              >
                <svg viewBox="0 0 100 100">
                  <path
                    class="circle-path"
                    d="M50 10a40 40 0 1 0 0 80 40 40 0 0 0 0-80zm0 10a30 30 0 1 1 0 60 30 30 0 0 1 0-60zm0 10a20 20 0 1 0 0 40 20 20 0 0 0 0-40z"
                  />
                </svg>
              </div>

              <div
                class="card"
                :class="{ flipped: isCardFlipped }"
                @transitionend="onAnimationEnd"
              >
                <div class="card-front">
                  <img :src="currentFrontImage" alt="正面" />
                </div>
                <div class="card-back">
                  <img src="/images/back1.jpg" alt="反面" />
                </div>
              </div>
              <button
                v-if="currentButton === 2 && currentCardIndex < cards.length && !isAnimationRunning"
                class="next-button"
                @click="nextCard"
              >
                下一个（{{ currentCardIndex }}/{{ cards.length }}）
              </button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

// 弹窗相关状态
const isModalOpen = ref(false);
const isVideoPlaying = ref(false);
const isCardFlipped = ref(false);
const isAnimationRunning = ref(false);
const currentVideo = ref('');
const currentButton = ref(0);
const currentCardIndex = ref(1);
const cards = ref([]);
const currentFrontImage = ref('');
const circleScale = ref(0);
const circleOpacity = ref(0);

// 右侧区域相关状态
const showLayer = ref(false);
const activeTopIndex = ref(0);
const activeBottomIndex = ref(0);
const autoPlayTimer = ref(null);

const frontImages = [
  '/images/front1.jpg',
  '/images/front2.jpg',
  '/images/front3.jpg',
  '/images/front4.jpg',
  '/images/front5.jpg',
];

const topImages = ref([
  '/images/front1.jpg',
  '/images/front2.jpg',
  '/images/front3.jpg',
  '/images/front4.jpg',
  '/images/front5.jpg',
]);

const bottomImages = ref([
  '/images/front1.jpg',
  '/images/front2.jpg',
  '/images/front3.jpg',
  '/images/front4.jpg',
  '/images/front5.jpg',
  '/images/front6.jpg',
  '/images/front7.jpg',
  '/images/front8.jpg',
  '/images/front9.jpg',
  '/images/front10.jpg',
]);

// 通用方法
const selectRandomFrontImage = () => {
  currentFrontImage.value = frontImages[Math.floor(Math.random() * frontImages.length)];
};

// 弹窗相关方法
const openVideo = (button) => {
  currentButton.value = button;
  currentVideo.value = button === 1 ? '/videos/your-video.mp4' : '/videos/your-video2.mp4';
  isModalOpen.value = true;
  isVideoPlaying.value = true;

  cards.value = button === 1 ? [1] : [1, 2, 3, 4, 5];
  currentCardIndex.value = 1;
  isCardFlipped.value = false;
  circleScale.value = 0;
  circleOpacity.value = 0;
  selectRandomFrontImage();
};

const closeModal = () => {
  isModalOpen.value = false;
  isVideoPlaying.value = false;
  isCardFlipped.value = false;
  currentCardIndex.value = 1;
  circleScale.value = 0;
  circleOpacity.value = 0;
};

const onVideoEnded = () => {
  isVideoPlaying.value = false;
  setTimeout(() => {
    isCardFlipped.value = true;
    isAnimationRunning.value = true;
    circleOpacity.value = 1;
    circleScale.value = 1;
  }, 500);
};

const nextCard = async () => {
  if (currentCardIndex.value >= cards.value.length) return;

  isAnimationRunning.value = true;
  isCardFlipped.value = false;
  circleScale.value = 0;
  circleOpacity.value = 0;

  await new Promise((resolve) => setTimeout(resolve, 600));
  selectRandomFrontImage();

  await nextTick();
  isCardFlipped.value = true;
  circleOpacity.value = 1;
  circleScale.value = 1;

  currentCardIndex.value++;

  setTimeout(() => {
    isAnimationRunning.value = false;
  }, 600);
};

const onAnimationEnd = () => {
  isAnimationRunning.value = false;
};

// 右侧区域方法
const prevBottom = () => {
  if (activeBottomIndex.value > 0) {
    activeBottomIndex.value--;
  }
};

const nextBottom = () => {
  const maxIndex = Math.ceil(bottomImages.value.length / 8) - 1; // 计算最大索引
  if (activeBottomIndex.value < maxIndex) {
    activeBottomIndex.value++;
  }
};

const startAutoPlay = () => {
  autoPlayTimer.value = setInterval(() => {
    activeTopIndex.value++;

    // 如果到达最后一张的复制图，快速跳转到实际的第一张
    if (activeTopIndex.value === topImages.value.length - 1) {
      setTimeout(() => {
        activeTopIndex.value = 1; // 跳转到实际的第一张
      }, 500); // 等待过渡动画完成
    }
  }, 5000); // 每 5 秒切换一次
};


const onScroll = (event) => {
  const scrollContainer = event.currentTarget;

  // 阻止默认滚动行为和事件冒泡
  event.preventDefault();
  event.stopPropagation();

  // 检查是否可以继续滚动
  const isAtTop = scrollContainer.scrollTop === 0 && event.deltaY < 0;
  const isAtBottom =
    scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
    event.deltaY > 0;

  // 如果未到顶部或底部，允许滚动
  if (!isAtTop && !isAtBottom) {
    smoothScroll(scrollContainer, event.deltaY);
  }
};

// 平滑滚动函数
const smoothScroll = (element, deltaY) => {
  const start = element.scrollTop;
  const end = start + deltaY;
  const duration = 300; // 滚动持续时间（毫秒）
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 进度值（0 到 1）
    const ease = easeInOutCubic(progress); // 使用缓动函数

    element.scrollTop = start + (end - start) * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// 缓动函数（easeInOutCubic）
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  clearInterval(autoPlayTimer.value);
});
</script>
<style scoped>
/* 基础样式 */
.container {
  display: flex;
  height: 92vh;
  margin-top: 8vh;
 
}

.left-section {
  flex: 1;
  background-image: url('/textures/2.jpg');
  background-size: cover;
  position: relative;
}

.buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

button {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

/* 右侧区域样式 */
.right-section {
  flex: 3;
 margin-top: 2vh;
  position: relative;
  border-left: 2px solid #ccc;
  overflow: hidden;
}

.layer-toggle {
  position: absolute;
  top: 10%;
  right: 10px;
  z-index: 10;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 轮播层样式 */
.layer-carousel {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s ease;
}

.layer-carousel.hide-layer {
  opacity: 0;
  pointer-events: none;
}

.top-carousel {
  flex: 3;
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-item1 {
  flex: 0 0 100%; /* 每个轮播项占据 100% 宽度 */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  height: 400px; /* 设置容器高度 */
}

.carousel-item1 img {
  max-height: 100%; /* 确保图片不会超出容器宽度 */
  width: auto; /* 保持图片比例 */
  display: block; /* 确保图片是块级元素 */
}

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.carousel-dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-dots button.active {
  background: #fff;
  transform: scale(1.2);
}

/* 下部手动轮播图样式 */
.bottom-carousel {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
}

.carousel-wrapper {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item2 {
  flex: 0 0 calc(100% / 8); /* 每个卡片占 1/8 宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100px; /* 设置容器高度 */
}

.carousel-item2 img {
  max-height: 100%;
  width: auto;
  display: block;
}

.arrow {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
}

.arrow:hover {
  background: #fff;
  transform: scale(1.1);
}

/* 卡片层样式 */
.layer-cards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 5;
}

.layer-cards.show-layer {
  transform: translateY(0);
}

.card-scroll {
  height: calc(100% - 40px);
  padding: 20px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.card-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  min-height: 150px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 弹窗样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  min-width: 400px;
  transition: all 0.3s;
}

.hide-border {
  background: transparent;
  box-shadow: none;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  padding: 0 8px;
}

/* 卡片翻转样式 */
.card-container {
  perspective: 1000px;
  position: relative;
}

.card {
  width: 300px;
  height: 450px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 20px auto;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-front {
  transform: rotateY(180deg);
  background: #fff;
}

.card-back {
  transform: rotateY(0deg);
  background: #f0f0f0;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.next-button {
  margin-top: 30px;
  padding: 12px 25px;
  margin-left: 30%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #fff;
  font-size: 16px;
}

/* 魔法阵样式 */
.magic-circle {
  position: absolute;
  width: 120%;
  height: 120%;
  margin-left: -10%;
  margin-bottom: -70%;
  pointer-events: none;
  transition: 
    transform 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28),
    opacity 0.6s ease;
  z-index: -1;
}

.magic-circle svg {
  width: 100%;
  height: 100%;
}

.circle-path {
  fill: none;
  stroke: #7b68ee;
  stroke-width: 1.2;
  stroke-linejoin: round;
  filter: 
    drop-shadow(0 0 8px rgba(123, 104, 238, 0.6))
    drop-shadow(0 0 15px rgba(147, 112, 219, 0.4));
  animation: circle-glow 2s ease-in-out infinite;
}

@keyframes circle-glow {
  0%, 100% {
    stroke-opacity: 0.8;
    filter: 
      drop-shadow(0 0 8px rgba(123, 104, 238, 0.6))
      drop-shadow(0 0 15px rgba(147, 112, 219, 0.4));
  }
  50% {
    stroke-opacity: 1;
    filter: 
      drop-shadow(0 0 12px rgba(123, 104, 238, 0.8))
      drop-shadow(0 0 20px rgba(147, 112, 219, 0.6));
  }
}
</style>