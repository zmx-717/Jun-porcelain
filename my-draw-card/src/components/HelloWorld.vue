<template>
  <div class="quantum-visual">
    <!-- 背景瀑布流 -->
    <div class="background-carousel">
      <div
        class="background-row"
        v-for="(row, rowIndex) in backgroundRows"
        :key="rowIndex"
        :style="getRowAnimationStyle(rowIndex)"
      >
        <div
          class="background-image"
          v-for="(image, index) in row"
          :key="index"
        >
          <img :src="image" alt="背景图片" />
        </div>
      </div>
    </div>

    <!-- 圆形旋转图片 -->
    <div class="rotating-circle" :class="{ 'circle-animation': isCircleAnimating }">
      <div
        class="circle-image"
        v-for="(image, index) in circleImages"
        :key="index"
        :style="getCircleImageStyle(index)"
      >
        <img :src="image" alt="旋转图片" />
      </div>
    </div>

 <!-- 动画字体 -->
 <div class="animated-text" v-if="!isCircleAnimating" @click="navigateToNext">
      <span>{{ displayedText }}</span>
    </div>

    <!-- 遮罩 -->
    <div class="overlay"></div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const circleImages = [
  '/first/1.jpg',
  '/first/2.jpg',
  '/first/3.jpg',
  '/first/4.jpg',
  '/first/5.jpg',
  '/first/6.jpg',
  '/first/7.jpg',
  '/first/8.jpg',
  '/first/9.jpg',
  '/first/10.jpg',
  '/first/11.jpg',
  '/first/12.jpg',
  '/first/13.jpg',
  '/first/14.jpg',
  '/first/15.jpg',
  '/first/16.jpg',
  '/first/17.jpg',
  '/first/18.jpg',
  '/first/19.jpg',
  '/first/20.jpg',
  '/first/21.jpg',
  '/first/22.jpg',
  '/first/23.jpg',
  '/first/24.jpg',
  '/first/25.jpg',
  '/first/26.jpg',
  '/first/27.jpg',
  '/first/28.jpg',
  '/first/29.jpg',
  '/first/30.jpg',
]

const backgroundImages = [
  '/first2/1.jpg',
  '/first2/2.jpg',
  '/first2/3.jpg',
  '/first2/4.jpg',
  '/first2/5.jpg',
  '/first2/6.jpg',
  

]

// 将背景图片分成多行
const backgroundRows = ref(
  Array.from({ length: 3 }, () => [...backgroundImages,...backgroundImages,...backgroundImages])
)



const rotationAngle = ref(0);
const circleRadius = ref(340); // 圆形半径，调整为更大的值
const isCircleAnimating = ref(true); // 是否处于动画状态
const typewriter = ref(null);

const fullText = '进入钧瓷世界'; // 完整的打字内容
const displayedText = ref(''); // 当前显示的文字
const typingSpeed = 100; // 打字速度（毫秒）

// 模拟打字动画
const typeText = (text, index = 0) => {
  if (index < text.length) {
    displayedText.value += text[index];
    setTimeout(() => typeText(text, index + 1), typingSpeed);
  }
};

onMounted(() => {
  setTimeout(() => {
    isCircleAnimating.value = false; // 动画结束后显示打字动画
    typeText(fullText); // 开始打字动画
  }, 3000); // 延迟 3 秒后开始打字动画
});


const getCircleImageStyle = (index) => {
  const angle = (index / circleImages.length) * 360 + rotationAngle.value
  const radius = circleRadius.value
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  const size = 80 // 固定图片大小
  return {
    transform: `translate(${x}px, ${y}px)`,
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
  }
}

const getRowAnimationStyle = (rowIndex) => {
  // 如果是第一行或第三行，设置相同的速度
  const speed = rowIndex === 0 || rowIndex === 2 ? 20 : 20 + rowIndex * 10;
  return {
    animation: `scroll-horizontal-${rowIndex} ${speed}s linear infinite`,
  };
};

// 鼠标滚轮控制圆圈转动
const handleWheel = (event) => {
  const delta = event.deltaY > 0 ? 10 : -10 // 滚轮向下增加角度，向上减少角度
  rotationAngle.value += delta
}
onMounted(() => {
  setTimeout(() => {
    isCircleAnimating.value = false;

    // 初始化打字动画
    new Typewriter(typewriter.value, {
      loop: false,
      delay: 75,
    })
      .typeString('进入钧瓷世界')
      .pauseFor(1000)
      .start();
  }, 3000);
});
// 跳转到下一个路由
const navigateToNext = () => {
  router.push('/first') // 替换为目标路由路径
}
</script>

<style>
.quantum-visual {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e, #16213e); /* 背景渐变 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 背景瀑布流 */
.background-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 每行之间的间隔 */
}

.background-row {
  display: flex;
  width: 300%; /* 增加宽度以实现无缝滚动 */
  height: 33.33vh;
}

.background-image {
  flex-shrink: 0;
  width: 20vw; /* 每张图片占据屏幕宽度的 20% */
  margin-right: 10px; /* 图片之间的间隔 */
}

.background-image img {
  width: 20vw;
  height: 30vh;
  object-fit: cover;
  filter: brightness(0.8); /* 调整亮度 */
  transition: transform 0.3s ease; /* 鼠标悬停效果 */
}

.background-image img:hover {
  transform: scale(1.1); /* 放大效果 */
}

/* 动态生成每行的滚动动画 */
@keyframes scroll-horizontal-0 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes scroll-horizontal-1 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes scroll-horizontal-2 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* 圆形旋转图片 */
.rotating-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 600px; /* 圆形的宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.rotating-circle.circle-animation {
  animation: deal-cards 3s ease-out forwards;
}

@keyframes deal-cards {
  from {
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) scale(1) rotate(360deg);
  }
}

.circle-image {
  margin: 30px 30px; /* 增加图片之间的间隔 */
  height: 2px; /* 增大图片高度 */
  width: 1px; /* 增大图片宽度 */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 鼠标悬停效果 */
}

.circle-image img {
  height: 50px; /* 图片高度 */
  width: 30px; /* 图片宽度 */
  object-fit: cover;
  transform: rotateX(15deg); /* 添加内倾斜角度 */
  transition: transform 0.3s ease; /* 鼠标悬停时的平滑过渡效果 */
}

.circle-image img:hover {
  transform: rotateX(0deg) scale(1.2); /* 鼠标悬停时恢复正角度并放大 */
}

/* 动画字体 */
.animated-text {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 36px;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  cursor: pointer;
  animation: fade-in 2s ease-in-out forwards;
}

.animated-text:hover {
  color: #eea764; /* 鼠标悬停时改变颜色 */
  transform: translateX(-50%) scale(1.1); /* 鼠标悬停时放大 */
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 遮罩 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)); /* 径向渐变遮罩 */
  pointer-events: none;
}
</style>