<template>
  <div class="speeddial-container">
    <!-- 主按鈕(點選可展開扇形按紐) -->
      <button class="speeddial-button" @click.prevent="toggleDial">
        <i class="pi pi-plus" :class="{ rotate: isRotate }"></i>
      </button>
  
    <transition-group name="fan">
      <template v-if="isRotate">
        <div v-for="(item, index) in selectedIcons" 
             :key="item.name"
            class="speeddial-item"
             :style="getItemStyle(index)"
             @click="handleItemClick(index)">
          <i class="pi round" :class="item.name"></i>
          </div>
        </template>
    </transition-group>

    <!-- 按鈕選擇面板 -->
    <div class="icon-selector" v-if="showIconSelector">
      <div class="icon-grid">
        <div v-for="(icon, index) in tempSelectedIcons" 
             :key="index"
             class="icon-option"
             :class="{ 
               'selected': icon.selected, 
               'disabled': icon.name === 'pi-cog',
               'unavailable': selectedCount === 5 && !icon.selected,  // 達到5個時其餘按紐顯示不可選
               'unselected': !icon.selected && selectedCount < 5     // 未達5個時顯示可選
             }"
             @click="toggleIconSelection(icon)">
          <i class="pi" :class="icon.name"></i>
        </div>
      </div>
      <div class="selector-controls">
        <span class="selection-count">已選擇: {{ selectedCount }}/5</span>
        <button class="confirm-button" 
                @click="confirmSelection"
                :disabled="selectedCount < 3">
          確認選擇
        </button>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
/**
 * 扇形導航鈕
 * 提供可自定義的扇形按鈕陣列，支援展開/收起動畫效果
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'

const router = useRouter()

// 控制按鈕展開狀態
  const isRotate = ref(false)

// 控制圖示選擇面板顯示狀態
const showIconSelector = ref(false)

// 臨時選擇按鈕的陣列，用於圖示選擇面板
const tempSelectedIcons = ref([])

// 可選擇的按鈕icon列表
const availableIcons = ref([
  { name: 'pi-external-link', selected: true, route: '/CreatePrd', routeName: '建立產品' },
  { name: 'pi-heart', selected: true, route: '/PrdManage', routeName: '產品管理' },
  { name: 'pi-trash', selected: true, route: '/StoreSite', routeName: '商店設定' },
  { name: 'pi-pencil', selected: true, route: '/OtherPage1', routeName: '其他頁面1' },
  { name: 'pi-cog', selected: true, disabled: true, route: null },  // 設定按鈕不需要路由
  { name: 'pi-user', selected: false, route: '/UserPage', routeName: '用戶頁面' },
  { name: 'pi-calendar', selected: false, route: '/Calendar', routeName: '日曆頁面' },
  { name: 'pi-refresh', selected: false },
  { name: 'pi-bell', selected: false },
  { name: 'pi-bookmark', selected: false },
  { name: 'pi-camera', selected: false },
  { name: 'pi-chart-bar', selected: false },
  { name: 'pi-cloud', selected: false },
  { name: 'pi-database', selected: false },
  { name: 'pi-envelope', selected: false },
  { name: 'pi-flag', selected: false },
  { name: 'pi-globe', selected: false },
  { name: 'pi-home', selected: false },
  { name: 'pi-image', selected: false },
  { name: 'pi-key', selected: false }
])

/**
 * 計算已選擇的圖示數量
 * 根據當前面板狀態返回臨時或實際選擇數量
 */
const selectedCount = computed(() => {
  return showIconSelector.value 
    ? tempSelectedIcons.value.filter(icon => icon.selected).length
    : availableIcons.value.filter(icon => icon.selected).length
})

/**
 * 計算最終顯示的圖示列表
 * 確保設定圖示（pi-cog）始終在最後位置
 */
const selectedIcons = computed(() => {
  // 獲取所有選中的一般圖示（除了設定圖示）
  const normalIcons = availableIcons.value
    .filter(icon => icon.selected && icon.name !== 'pi-cog')
  
  // 獲取 pi-cog 圖示
  const cogIcon = availableIcons.value.find(icon => icon.name === 'pi-cog')
  
  // 將 pi-cog 添加到陣列最後面
  return [...normalIcons, cogIcon]
})

/**
 * 切換按鈕展開狀態
 */
  function toggleDial() {
  console.log('toggleDial clicked', isRotate.value)
  isRotate.value = !isRotate.value
  if (!isRotate.value) {
    showIconSelector.value = false
  }
}

/**
 * 處理圖示選擇
 * @param {Object} icon - 被點擊的圖示物件
 */
function handleItemClick(index) {
  const clickedIcon = selectedIcons.value[index]
  if (clickedIcon.name === 'pi-cog') {
    // 重置臨時選擇狀態為當前的實際狀態
    tempSelectedIcons.value = availableIcons.value.map(icon => ({
      ...icon
    }))
    showIconSelector.value = true
    isRotate.value = false
  } else {
    // 如果有定義路由，則進行跳轉
    if (clickedIcon.route) {
      router.push(clickedIcon.route)
    }
  }
}

/**
 * 處理圖示選擇
 * @param {Object} icon - 被點擊的圖示物件
 */
function toggleIconSelection(icon) {
  // 如果是 pi-cog，不允許修改
  if (icon.name === 'pi-cog') return
  
  // 在臨時陣列中找到對應的圖示
  const tempIcon = tempSelectedIcons.value.find(i => i.name === icon.name)
  if (tempIcon.selected) {
    tempIcon.selected = false
  } else {
    // 計算當前選中的非 pi-cog 圖標數量
    const currentSelectedCount = tempSelectedIcons.value
      .filter(i => i.selected && i.name !== 'pi-cog')
      .length
      
    // 如果未達到最大限制（4個普通圖標 + 1個 pi-cog）
    if (currentSelectedCount < 4) {
      tempIcon.selected = true
    }
  }
}

/**
 * 確認圖示選擇
 * 將臨時選擇狀態應用到實際狀態
 */
function confirmSelection() {
  if (selectedCount.value >= 3) {
    // 將臨時選擇應用到實際的 availableIcons
    availableIcons.value = tempSelectedIcons.value.map(icon => ({
      ...icon
    }))
    showIconSelector.value = false
    isRotate.value = true
  }
  }
  
  function getItemStyle(idx) {
  const total = selectedIcons.value.length
  const startAngle = -90
  const endAngle = 0
  const angle = startAngle + (idx * (endAngle - startAngle)) / (total - 1)
    const rad = (Math.PI / 180) * angle
    const radius = 135
    const x = radius * Math.cos(rad)
    const y = radius * Math.sin(rad)
  
  return {
    '--x': `${x}px`,
    '--y': `${y}px`,
    transform: `translate(${x}px, ${y}px)`
  }
}

/**
 * 處理點擊外部事件
 * @param {Event} event - 點擊事件物件
 */
const handleClickOutside = (event) => {
  // 檢查是否點擊在確認按鈕上
  if (event.target.closest('.confirm-button')) {
    return
  }

  if (showIconSelector.value) {
    // 如果選擇面板開啟，檢查點擊是否在容器外
    const container = document.querySelector('.speeddial-container')
    if (!container.contains(event.target)) {
      isRotate.value = false
      setTimeout(() => {
        showIconSelector.value = false
      }, 300)
    }
  } else {
    // 檢查點擊是否在按鈕區域外
    const speedDialElements = document.querySelectorAll('.speeddial-item, .speeddial-button')
    const clickedOnSpeedDial = Array.from(speedDialElements).some(el => el.contains(event.target))
    
    if (!clickedOnSpeedDial) {
      isRotate.value = false
    }
  }
}

// 元件render時添加點擊監聽
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 元件消失時移除點擊監聽
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
  </script>
  
  <style scoped>
  /* 整個容器，固定在畫面左下角 */
  .speeddial-container {
    position: fixed;
    bottom: 50px;
  left: 50px;
  width: 300px;   
  height: 300px;
    z-index: 999;
  }

  /* 主按鈕（中心） */
  .speeddial-button {
    position: absolute;
  bottom: 0;
  left: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #1c1c1c;
    color: #fff;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
  z-index: 1000;
  }
  
  /* 中心圖示旋轉效果 */
  .pi-plus {
    transition: transform 0.3s ease;
  }
  .pi-plus.rotate {
  transform: rotate(45deg);
  }
  
  /* 子按鈕基礎樣式 */
  .speeddial-item {
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    bottom: 7.5px;
    left: 7.5px;
    /* 只保留位置和透明度的過渡效果 */
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* hover 效果 - 無過渡 */
  .speeddial-item:hover {
    background: #ddd;
  }

  /* 扇形展開動畫 */
  .fan-enter-active,
  .fan-leave-active {
    transition: all 0.3s ease;
  }

  .fan-enter-from,
  .fan-leave-to {
    opacity: 0;
    transform: scale(0.1) translate(0, 0) !important;
  }

  .fan-enter-to,
  .fan-leave-from {
    opacity: 1;
    transform: scale(1) translate(var(--x), var(--y)) !important;
  }

  /* 為每個按鈕添加不同的延遲 */
  .speeddial-item:nth-child(1) { transition-delay: 0.1s; }
  .speeddial-item:nth-child(2) { transition-delay: 0.2s; }
  .speeddial-item:nth-child(3) { transition-delay: 0.3s; }
  .speeddial-item:nth-child(4) { transition-delay: 0.4s; }
  .speeddial-item:nth-child(5) { transition-delay: 0.5s; }
  
  .speeddial-item:active {
    transform: scale(1.1);
  }
  
  /* 圓形按鈕樣式 */
  .round {
    font-size: 1.2rem;
  }
  
  /* 控制面板樣式 */
  .icon-selector {
    position: absolute;
    bottom: 70px;
    left: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    width: 300px;
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }

  .icon-option {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  /* 扇形按鈕的hover效果 */
  .icon-option:hover {
    background: #e0e0e0;
  }

  /* 可選擇但未選的按鈕樣式 */
  .icon-option.unselected {
    background: #f4f4f4;
    cursor: pointer;
  }

  /* 未選中的按鈕HOVER效果 */
  .icon-option.unselected:hover {
    background: #e0e0e0;
  }

  /* 已選中的按鈕樣式 */
  .icon-option.selected {
    background: #4CAF50;
    color: white;
    opacity: 1;
  }

  /* 已達最大選中icon數5個, 其他按鈕顯示樣式 */
  .icon-option.unavailable {
    opacity: 0.5;
    background: rgba(76, 175, 80, 0.2);
    cursor: not-allowed;
  }

  /* Setting的按鈕樣式 */
  .icon-option.disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #4CAF50 !important;
    color: white !important;
  }

  .selector-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }

  .selection-count {
    font-size: 14px;
    color: #666;
  }

  .confirm-button {
    padding: 8px 16px;
    background: #1c1c1c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .confirm-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .confirm-button:hover:not(:disabled) {
    background: #333;
  }
  </style>