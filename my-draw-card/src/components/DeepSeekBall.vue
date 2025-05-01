<template>
    <div>
      <!-- 悬浮球 -->
      <div
        class="floating-ball"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        @mousedown="startDrag"
        @mouseup="handleClick"
      >
        DeepSeek
      </div>
  
      <!-- 聊天窗口 -->
      <div v-if="showChat" class="chat-box">
        <div class="chat-header">
          <span>深度探索聊天</span>
          <button @click="toggleChat" class="close-btn">×</button>
        </div>
  
        <div class="chat-content">
          <div v-for="(message, index) in messages" :key="index" class="message">
            <div class="message-header">
              <span class="role">{{ message.role === 'assistant' ? '助手' : '你' }}</span>
              <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
            </div>
            <div class="content" v-html="renderMarkdown(message.content)"></div>
          </div>
        </div>
  
        <div class="chat-input">
          <input
            v-model="userInput"
            type="text"
            placeholder="请输入您的问题..."
            @keydown.enter.exact.prevent="sendMessage"
          />
          <button @click="sendMessage" :disabled="isSending">
            {{ isSending ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  import { marked } from 'marked';
  // 状态管理
  const position = ref({ x: 50, y: 50 });
  const showChat = ref(false);
  const messages = ref([
    {
      role: 'system',
      content: '你是一个乐于助人的智能助手，使用中文与用户交流',
      timestamp: Date.now(),
    },
  ]);
  const userInput = ref('');
  const isDragging = ref(false);
  const isSending = ref(false);
  const isClick = ref(false); // 用于判断是否是点击
  let offsetX = 0;
  let offsetY = 0;
  
  // 拖拽逻辑
  const startDrag = (e) => {
    isDragging.value = true;
    isClick.value = true; // 假设是点击，后续判断是否为拖拽
    offsetX = e.clientX - position.value.x;
    offsetY = e.clientY - position.value.y;
  
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  };
  
  const onDrag = (e) => {
    if (!isDragging.value) return;
    isClick.value = false; // 如果发生移动，则不是点击
    position.value.x = e.clientX - offsetX;
    position.value.y = e.clientY - offsetY;
  };
  
  const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  };
  
  // 点击逻辑
  const handleClick = () => {
    if (isClick.value) {
      toggleChat();
    }
  };
  
  // 切换聊天窗口显示
  const toggleChat = () => {
    showChat.value = !showChat.value;
  };
  
  // 消息处理
  const sendMessage = async () => {
    if (!userInput.value.trim() || isSending.value) return;
  
    const newMessage = {
      role: 'user',
      content: userInput.value,
      timestamp: Date.now(),
    };
  
    messages.value.push(newMessage);
    userInput.value = '';
    isSending.value = true;
  
    try {
      const response = await fetchWithRetry();
      const data = await response.json();
      messages.value.push({
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now(),
      });
    } catch (error) {
      messages.value.push({
        role: 'assistant',
        content: `发生错误: ${error.message}`,
        timestamp: Date.now(),
      });
      console.error('请求详情:', error);
    } finally {
      isSending.value = false;
    }
  };
  
  // API请求相关
  const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
  const API_URL = 'https://api.deepseek.com/v1/chat/completions';
  
  const fetchWithRetry = async () => {
    const maxRetries = 3;
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: messages.value,
            stream: false,
            temperature: 0.7,
          }),
        });
  
        if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
        return response;
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetries) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
      }
    }
  };
  
  // 工具函数
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  //markdown渲染
  const renderMarkdown = (markdown) => {
  return marked(markdown);
};
  
  // 拖拽事件绑定
  onMounted(() => {
    document.addEventListener('mouseup', stopDrag);
  });
  
  onUnmounted(() => {
    document.removeEventListener('mouseup', stopDrag);
  });
  </script>
  
  
  <style scoped>
  /* 全局字体设置 */
  :root {
    --font-primary: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont,
      "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
  }
  
  /* 悬浮球样式 */
  .floating-ball {
  position: fixed;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #fff, #ccc); /* 黑白渐变 */
  color: black; /* 黑色字体 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  z-index: 1000;
  user-select: none;
  box-shadow: 
    inset 0 -4px 8px rgba(255, 255, 255, 0.3), /* 内部阴影 */
    0 8px 15px rgba(255, 255, 255, 0.2); /* 外部阴影 */
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 14px;
}

.floating-ball:hover {
  background: radial-gradient(circle at 30% 30%, #dce3ea, #c6cace); /* 悬停时更深的渐变蓝色 */
  box-shadow: 
    inset 0 -6px 12px rgba(0, 0, 0, 0.4), /* 加强内部阴影 */
    0 10px 20px rgba(0, 0, 0, 0.3); /* 加强外部阴影 */
  transform: scale(1.05); /* 悬停时轻微放大 */
}

.floating-ball:active {
  cursor: grabbing;
  transform: scale(0.95); /* 点击时缩小 */
  box-shadow: 
    inset 0 -3px 6px rgba(0, 0, 0, 0.5), /* 点击时内部阴影更集中 */
    0 6px 12px rgba(0, 0, 0, 0.25); /* 点击时外部阴影更集中 */
}

.floating-ball::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%); /* 高光效果 */
  opacity: 0.8;
  pointer-events: none; /* 防止影响交互 */
}

.floating-ball::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 
  0 0 15px rgba(255, 255, 255, 0.5), /* 外发光效果 */
  0 0 30px rgba(255, 255, 255, 0.3); /* 外发光效果 */
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.floating-ball:hover::after {
  opacity: 1; /* 悬停时增强外发光效果 */
}
  
  /* 聊天窗口 */
  .chat-box {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 360px;
    max-width: calc(100vw - 40px);
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    font-family: var(--font-primary);
    font-size: 14px;
    line-height: 1.5;
  }
  
  .chat-header {
    padding: 14px 16px;
    background: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0 8px;
  }
  
  /* 消息区域 */
  .chat-content {
    padding: 16px;
    flex: 1;
    overflow-y: auto;
    max-height: 400px;
  }
  
  .message {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 12px;
    color: #666;
  }
  
  .role {
    font-weight: 600;
    color: #333;
  }
  
  .timestamp {
    opacity: 0.8;
  }
  
  .content {
    padding: 10px 14px;
    background: #f8f9fa;
    border-radius: 8px;
    word-break: break-word;
    line-height: 1.6;
  }
  
  /* 输入区域 */
  .chat-input {
    display: flex;
    padding: 14px;
    border-top: 1px solid #eee;
    background: #fafafa;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    font-family: var(--font-primary);
    font-size: 14px;
  }
  
  .chat-input button {
    margin-left: 10px;
    padding: 0 24px;
    background: #090a0b;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: var(--font-primary);
  }
  
  .chat-input button:hover:not(:disabled) {
    opacity: 0.9;
    background: #02080f;
  }
  
  .chat-input button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* 自定义滚动条 */
  .chat-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .chat-content::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .chat-content::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  
  .chat-content::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }





  /* Markdown 内容样式 */
.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  font-weight: bold;
  margin: 10px 0;
}

.content p {
  margin: 10px 0;
  line-height: 1.6;
}

.content a {
  color: #222;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

.content ul,
.content ol {
  margin: 10px 0;
  padding-left: 20px;
}

.content li {
  margin-bottom: 5px;
}

.content code {
  background: #f8f9fa;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

.content pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
}
  </style>