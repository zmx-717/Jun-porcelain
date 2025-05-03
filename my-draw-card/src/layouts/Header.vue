<template>
  <header class="navbar">
    <nav class="nav-container">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/first">
            <img src="/first/111.png" alt="介绍" class="icon" />
            <span class="text">介绍</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/product">
            <img src="/first/222.png" alt="产品" class="icon" />
            <span class="text">产品</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/town">
            <img src="/first/444.png" alt="更多" class="icon" />
            <span class="text">古镇</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px); /* 背景模糊效果 */
}

/* 导航容器 */
.nav-container {
  width: 90%;
  max-width: 1200px;
}

/* 导航列表 */
.nav-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 导航项 */
.nav-item a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  position: relative;
  height: 60px;
  width: 60px;
}

.nav-item a:hover {
  color: #f1ac6a; /* 悬停时改变颜色 */
}

/* 图标样式 */
.icon {
  width: 40px;
  height: 40px;
  transition: opacity 0.3s ease; /* 平滑过渡 */
}

/* 文字样式 */
.text {
  font-size: 14px;
  opacity: 0; /* 默认隐藏文字 */
  position: absolute;
  transition: opacity 0.3s ease; /* 平滑过渡 */
}

/* 悬浮时显示文字并隐藏图片 */
.nav-item a:hover .text {
  opacity: 1; /* 显示文字 */
}

.nav-item a:hover .icon {
  opacity: 0; /* 隐藏图片 */
}
</style>