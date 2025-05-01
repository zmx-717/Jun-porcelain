<template>
    <footer class="footer">
      <div class="footer-container">
        <!-- 左侧部分：联系方式和地址 -->
        <div class="footer-left">
          <h3>联系我们</h3>
          <p>地址：北京市朝阳区某某路123号</p>
          <p>电话：+86 123 4567 890</p>
          <p>邮箱：contact@example.com</p>
        </div>
  
        <!-- 右侧部分：社交媒体图标 -->
        <div class="footer-right">
          <div class="social-icon" @mouseenter="showQRCode('wechat')" @mouseleave="hideQRCode">
            <img src="https://via.placeholder.com/40" alt="微信" />
            <div class="qrcode" v-if="activeQRCode === 'wechat'">
              <img src="https://via.placeholder.com/100" alt="微信二维码" />
            </div>
          </div>
          <div class="social-icon" @mouseenter="showQRCode('douyin')" @mouseleave="hideQRCode">
            <img src="https://via.placeholder.com/40" alt="抖音" />
            <div class="qrcode" v-if="activeQRCode === 'douyin'">
              <img src="https://via.placeholder.com/100" alt="抖音二维码" />
            </div>
          </div>
          <div class="social-icon" @mouseenter="showQRCode('weibo')" @mouseleave="hideQRCode">
            <img src="https://via.placeholder.com/40" alt="微博" />
            <div class="qrcode" v-if="activeQRCode === 'weibo'">
              <img src="https://via.placeholder.com/100" alt="微博二维码" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 当前显示二维码的图标
  const activeQRCode = ref(null);
  
  // 显示二维码
  const showQRCode = (platform) => {
    activeQRCode.value = platform;
  };
  
  // 隐藏二维码
  const hideQRCode = () => {
    activeQRCode.value = null;
  };
  </script>
  
  <style scoped>
  .footer {
    width: 100%;
    height: 100vh;
    margin-top: 200px;
    background-color: #333;
    color: white;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .footer-container {
    width: 90%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .footer-left {
    flex: 1;
  }
  
  .footer-left h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .footer-left p {
    margin: 5px 0;
    font-size: 14px;
  }
  
  .footer-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }
  
  .social-icon {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  
  .social-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .social-icon:hover img {
    transform: scale(1.1);
  }
  
  .qrcode {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
  }
  
  .qrcode img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  </style>