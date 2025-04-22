<template>
    <div class="chat-container">
        <h1>測試文字 - 客服系統</h1>
        <div class="chat-box">
            <div class="chat-header">
                <h3>線上客服</h3>
                <span class="status" :class="{ online: isConnected }">
                    {{ isConnected ? '客服在線' : '連線中...' }}
                </span>
            </div>
            
            <div class="messages" ref="messageContainer">
                <div v-for="(msg, index) in messages" 
                     :key="index" 
                     :class="['message', msg.type]">
                    <div class="message-content">
                        <div class="message-sender">{{ msg.sender }}</div>
                        <div class="message-text">{{ msg.text }}</div>
                        <div class="message-time">{{ formatTime(msg.time) }}</div>
                    </div>
                </div>
            </div>

            <div class="chat-input">
                <input 
                    v-model="newMessage" 
                    @keyup.enter="sendMessage"
                    placeholder="請輸入訊息..."
                    :disabled="!isConnected"
                />
                <button 
                    @click="sendMessage" 
                    :disabled="!isConnected || !newMessage.trim()">
                    發送
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export default {
    name: 'CustomerService',
    setup() {
        const ws = ref(null)
        const isConnected = ref(false)
        const messages = ref([])
        const newMessage = ref('')
        const messageContainer = ref(null)

        const connectWebSocket = () => {
            // 改用本地 WebSocket 服務器
            ws.value = new WebSocket('ws://localhost:3000')
            
            ws.value.onopen = () => {
                isConnected.value = true
                addMessage({
                    type: 'system',
                    sender: 'System',
                    text: '已連接到客服系統',
                    time: new Date()
                })
            }

            ws.value.onmessage = (event) => {
                console.log('收到訊息:', event.data); // 日誌接收到的原始訊息
                // 接收到的消息可能是字符串，需要處理一下
                let messageData;
                try {
                    messageData = JSON.parse(event.data);
                } catch (e) {
                    messageData = { text: event.data };
                }

                addMessage({
                    type: 'received',
                    sender: '客服人員',
                    text: messageData.text,
                    time: new Date()
                })
            }

            ws.value.onclose = () => {
                isConnected.value = false
                addMessage({
                    type: 'system',
                    sender: 'System',
                    text: '連線已斷開，正在嘗試重新連線...',
                    time: new Date()
                })
                setTimeout(connectWebSocket, 3000)
            }
        }

        const sendMessage = () => {
            if (!newMessage.value.trim() || !isConnected.value) return

            const message = {
                type: 'sent',
                sender: '您',
                text: newMessage.value,
                time: new Date()
            }

            addMessage(message)
            ws.value.send(JSON.stringify({ text: newMessage.value }))
            newMessage.value = ''
        }

        const addMessage = (message) => {
            messages.value.push(message)
            nextTick(() => {
                scrollToBottom()
            })
        }

        const scrollToBottom = () => {
            if (messageContainer.value) {
                messageContainer.value.scrollTop = messageContainer.value.scrollHeight
            }
        }

        const formatTime = (date) => {
            return new Date(date).toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        onMounted(() => {
            connectWebSocket()
        })

        onUnmounted(() => {
            if (ws.value) {
                ws.value.close()
            }
        })

        return {
            isConnected,
            messages,
            newMessage,
            messageContainer,
            sendMessage,
            formatTime
        }
    }
}
</script>

<style scoped>
.chat-container {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.chat-box {
    width: 400px;
    height: 600px;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.chat-header {
    padding: 15px;
    background: #4a90e2;
    color: white;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status {
    font-size: 0.8em;
    padding: 4px 8px;
    border-radius: 12px;
    background: #ff4444;
}

.status.online {
    background: #2ecc71;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    max-width: 80%;
    margin: 4px 0;
}

.message.sent {
    align-self: flex-end;
}

.message.received {
    align-self: flex-start;
}

.message.system {
    align-self: center;
    color: #666;
    font-size: 0.9em;
}

.message-content {
    padding: 8px 12px;
    border-radius: 12px;
    background: #f1f1f1;
}

.message.sent .message-content {
    background: #4a90e2;
    color: white;
}

.message-sender {
    font-size: 0.8em;
    margin-bottom: 4px;
    color: #666;
}

.message.sent .message-sender {
    color: #e3f2fd;
}

.message-time {
    font-size: 0.7em;
    margin-top: 4px;
    color: #999;
}

.message.sent .message-time {
    color: #e3f2fd;
}

.chat-input {
    padding: 15px;
    display: flex;
    gap: 10px;
    border-top: 1px solid #ddd;
}

.chat-input input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
}

.chat-input button {
    padding: 8px 20px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.3s;
}

.chat-input button:hover {
    background: #357abd;
}

.chat-input button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style> 