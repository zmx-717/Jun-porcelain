<template>
  <div class="container">
    <div class="first">
      <!-- Three.js 瓷器模型 -->
      <div class="three-container" ref="threeContainer"></div>

      <!-- 打字动画 -->
      <div class="text-container">
        <span ref="typewriter1" class="head"></span>
        <span ref="typewriter2" class="subhead"></span>
      </div>
    </div>

    <div class="center">
      <div class="conter-item">
        <img src="/first3/1.jpg" alt="文创IP人物钧小宝">
        <div class="text">
          <p>在材质选择方面，经大量市场调研与样品测试，最终选定三种优质材料。300g 进口艺术卡纸凭借出色的吸墨性，可使印刷图案色彩饱满、层次分明，且质地坚实，不易变形；丝绸质感特种纸表面光滑，能赋予印刷图案丝绸般的光泽，提升产品质感；环保再生竹纤维纸带有天然竹纹肌理，与钧瓷古朴风格相契合，同时符合绿色环保理念。
            印刷工艺上，采用专业印刷设备与钧瓷釉变色彩匹配油墨，通过多次打样调试，确保图案色彩与钧瓷实物高度相似。为提升产品品质，艺术卡纸书签运用烫金工艺勾勒图案轮廓，增强立体感；丝绸质感特种纸书签采用局部 UV 工艺对图案高光部分处理，模拟钧瓷釉面光泽；竹纤维纸书签则以压凹工艺呈现浮雕效果，带来独特触觉体验。此外，所有书签均进行圆角处理与防水加工，增强耐用性与安全性。</p>
        </div>
      </div>

      <div class="conter-item">
        <img src="/first3/2.jpg" alt="文创IP人物钧小宝">
        <div class="text">
          <p>明信片制作同样注重品质与创意。联系厂商拍摄大师作品以及独特艺术造型的作品，从多元视角展现钧瓷魅力。在图像设计时，将钧瓷花纹与水墨画、几何图形等元素融合，形成主题系列。选用进口哑粉纸印刷，保证色彩清晰、无反光，背面经防渗透涂层处理，书写流畅，并印制钧瓷文化介绍与二维码，扫描可观看钧瓷制作工艺视频，实现文化传播与互动。</p>
        </div>
      </div>

      <div class="conter-item">
        <img src="/first3/3.jpg" alt="文创IP人物钧小宝">
        <div class="text">
          <p>钧瓷笔筒的造型设计是传统与现代融合的关键。我们深入研究了宋代钧瓷经典器型，如出戟尊、渣斗等，分析其造型特点和美学规律。同时，通过市场调研，了解现代办公场景下用户对笔筒的功能需求和审美偏好。在此基础上，运用 3D 建模软件，对传统器型进行创新设计。</p>
        </div>
      </div>

      <div class="conter-item">
        <img src="/first3/4.jpg" alt="文创IP人物钧小宝">
        <div class="text">
          <p>钧瓷香薰的造型设计灵感来源于钧瓷的经典造型。我们对莲花尊、梅瓶等经典器型进行深入研究，提取其最具代表性的元素，如莲花尊的莲花瓣造型、梅瓶的优美曲线等，通过简化和变形的方式，设计出小巧精致的香薰容器。在设计过程中，充分考虑香薰的使用功能和空间摆放效果，确保香薰容器既美观又实用。</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Typewriter from 'typewriter-effect/dist/core';

const threeContainer = ref(null);
const typewriter1 = ref(null);
const typewriter2 = ref(null);

onMounted(() => {
  // 初始化 Three.js 场景
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.4 / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth * 0.4, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // 加载瓷器模型
  const loader = new GLTFLoader();
  loader.load('/models/logo.glb', (gltf) => {
    const ceramic = gltf.scene;
    ceramic.scale.set(2, 2, 2);
    ceramic.position.set(0, -1, 0);
    scene.add(ceramic);

    // 自动旋转逻辑
    let isUserInteracting = false;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    controls.addEventListener('start', () => {
      isUserInteracting = true;
    });

    controls.addEventListener('end', () => {
      isUserInteracting = false;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (!isUserInteracting) {
        ceramic.rotation.y += 0.01;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  });

  // 设置相机位置
  camera.position.z = 3;

  // 初始化主标题打字动画
  new Typewriter(typewriter1.value, {
    loop: false,
    delay: 75,
  })
    .typeString('文创IP人物钧小宝')
    .pauseFor(1000)
    .start();

  // 初始化子标题打字动画
  new Typewriter(typewriter2.value, {
    loop: true,
    delay: 75,
  })
    .typeString('瓷器文创，赋予新生')
    .pauseFor(2000)
    .deleteAll()
    .start();

    const items = document.querySelectorAll('.conter-item');
const handleScroll = () => {
  const scrollY = window.scrollY;

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const offsetY = rect.top + rect.height / 2 - window.innerHeight / 2;

    // 减小 X 和 Y 轴旋转角度的比例
    const rotateX = (offsetY / window.innerHeight) * 10; // 原来是 20，减小为 10
    const rotateY = (scrollY / window.innerHeight) * 5;  // 原来是 10，减小为 5

    // 减小 Z 轴倾斜角度
    const rotateZ = index % 2 === 0 ? -5 : 5; // 原来是 -10 和 10，减小为 -5 和 5

    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  });
};


  window.addEventListener('scroll', handleScroll);

  // 监听窗口大小变化
  const onWindowResize = () => {
    camera.aspect = window.innerWidth * 0.4 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.4, window.innerHeight);
  };

  window.addEventListener('resize', onWindowResize);

  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: flex-start; /* 子元素从顶部开始排列 */
  overflow: hidden;
  box-sizing: border-box;
  background-image: url("/first/back2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.first {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  height: 92vh;
  overflow: hidden;
  opacity: 0.9;
}

.three-container {
  flex: 2;
  background-color: transparent;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 垂直方向从顶部开始对齐 */
  position: relative; /* 确保可以使用绝对定位 */
  margin-top: -150px;
}

.text-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 50px;
  font-family: 'Arial', sans-serif;
  color: rgb(243, 235, 235);
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-sizing: border-box;
}

.head {
  font-size: 60px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
}

.subhead {
  font-size: 24px;
  margin-left: 150px;
  transition: color 0.3s ease;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
}

.center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.conter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw; /* 宽度占满视口 */
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.conter-item img {
  width: 40%; /* 图片占一半宽度 */
  height: 100%;
  object-fit: cover;
}

.conter-item .text {
  width: 50%; /* 文字占一半宽度 */
  padding: 20px;
  color: white; /* 文字颜色为白色 */
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  text-align: left;
}

.conter-item:hover {
  transform: scale(1.05); /* 悬浮时放大 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>