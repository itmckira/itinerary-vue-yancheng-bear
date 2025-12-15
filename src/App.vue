<template>
  <div class="container">
    <div class="header">
      <div>
        <div class="title">行程｜屏東海生館 → 高雄駁二 → 台南入住</div>
        <div class="subtitle">點選站點可切換右側地圖預覽；每站都可一鍵打開 Google Maps。</div>
      </div>
      <div class="pill">🚋 13:00 駁二散步｜🧸 鹽埕小熊（輕軌真愛碼頭站）｜🕒 15:30 離開駁二｜🏨 台南 暖時嚼旅</div>
    </div>

    <div class="grid">
      <!-- Left: Timeline -->
      <section class="card">
        <div class="card-hd">
          <h2>時間軸</h2>
          <span class="small">（可自行改時間/備註）</span>
        </div>
        <div class="card-bd">
          <div class="timeline">
            <template v-for="(s, idx) in stops" :key="s.id">
              <div
                class="item"
                :class="{ active: idx === activeIndex }"
                @click="activeIndex = idx"
              >
                <div>
                  <div class="time">{{ s.time }}</div>
                  <div class="badge">{{ s.tag }}</div>
                </div>

                <div>
                  <p class="name">{{ s.title }}</p>
                  <p class="note">{{ s.note }}</p>

                  <div v-if="s.nearestStop" class="badge" style="margin-bottom:10px;">
                    🚉 最近下車：{{ s.nearestStop }}
                  </div>

                  <div class="actions">
                    <a class="btn primary" :href="s.mapLink" target="_blank" rel="noreferrer">
                      🗺️ 開啟 Google 地圖
                    </a>
                    <a v-if="s.altLink" class="btn" :href="s.altLink" target="_blank" rel="noreferrer">
                      ⭐ 備用連結
                    </a>
                  </div>
                </div>
              </div>

              <div v-if="s.duration && idx < stops.length - 1" class="duration-gap">
                <div class="duration-line"></div>
                <div class="duration-text">⏱️ {{ s.duration }}</div>
                <div class="duration-line"></div>
              </div>
            </template>
          </div>

          <div style="margin-top:14px" class="small">
            小提示：如果你想把「停車點 / 渡輪碼頭」改成更精準的位置，直接把站點 title 改成完整地址或地標名稱即可。
          </div>
        </div>
      </section>

      <!-- Right: Map Preview -->
      <section class="card mapWrap">
        <div class="card-hd">
          <h2>地圖預覽</h2>
          <span class="small">{{ activeStop.title }}</span>
        </div>

        <iframe class="mapFrame" :src="activeStop.embedLink" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <div class="mapInfo">
          <div><b>目前站點：</b>{{ activeStop.title }}</div>
          <div v-if="activeStop.nearestStop"><b>最近下車：</b>{{ activeStop.nearestStop }}</div>
          <div>備註：{{ activeStop.note }}</div>
          <div style="margin-top:8px;">
            <a class="btn primary" :href="activeStop.mapLink" target="_blank" rel="noreferrer">🧭 用 Google Maps 導航</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

/**
 * 站點資料：只要改這裡就能改整頁
 * mapLink 用 Google Maps Search API（免 key）
 * embedLink 用 Google Maps Embed（用 query 搜尋字串）
 */
const stops = ref([
  {
    id: "kenting-aquarium",
    time: "離開",
    tag: "屏東",
    title: "屏東海生館（國立海洋生物博物館）離開",
    note: "出發前可簡單補水/上洗手間，確保路上舒適。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=國立海洋生物博物館",
    embedLink: "https://www.google.com/maps?q=國立海洋生物博物館&output=embed",
    duration: "約 1.5 小時車程"
  },
  {
    id: "pier2-parking",
    time: "抵達",
    tag: "高雄",
    title: "駁二哈瑪星｜停車",
    note: "建議停車後步行銜接：走去渡輪。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=哈瑪星 駁二 停車",
    embedLink: "https://www.google.com/maps?q=哈瑪星%20駁二%20停車&output=embed",
    altLink: "https://www.google.com/maps/search/?api=1&query=哈瑪星",
    duration: "步行 8-10 分鐘"
  },
  {
    id: "walk-to-ferry",
    time: "步行",
    tag: "交通",
    title: "走去渡輪（前往旗津）",
    note: "從哈瑪星/駁二步行到渡輪站，沿途可順拍港邊風景。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=鼓山輪渡站",
    embedLink: "https://www.google.com/maps?q=鼓山輪渡站&output=embed",
    duration: "渡輪 5 分鐘"
  },
  {
    id: "cijin-old-street",
    time: "逛街",
    tag: "旗津",
    title: "旗津老街",
    note: "小吃/散步/海景，逛完回到駁二一帶。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=旗津老街",
    embedLink: "https://www.google.com/maps?q=旗津老街&output=embed",
    duration: "渡輪返回 + 步行共 20 分鐘"
  },
  {
    id: "pier2-walk",
    time: "13:00",
    tag: "駁二",
    title: "回到駁二散步",
    note: "建議用走的慢逛，找咖啡店補能量；也可拍裝置藝術。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=駁二藝術特區",
    embedLink: "https://www.google.com/maps?q=駁二藝術特區&output=embed",
    duration: "步行約 6 分鐘"
  },
  {
    id: "yancheng-bear",
    time: "建議",
    tag: "輕軌/鹽埕",
    title: "鹽埕小熊（小熊奶茶）",
    note: "從駁二延伸走訪鹽埕：喝完再回駁二或接續北上台南。",
    nearestStop: "輕軌｜真愛碼頭站（步行約 6 分鐘）；備選：捷運橘線｜鹽埕埔站（約 10 分鐘內）",
    mapLink: "https://www.google.com/maps/search/?api=1&query=鹽埕小熊 奶茶 高雄",
    embedLink: "https://www.google.com/maps?q=鹽埕小熊%20奶茶%20高雄&output=embed",
    duration: "步行返回 + 取車約 15 分鐘"
  },
  {
    id: "leave-pier2",
    time: "15:30",
    tag: "出發",
    title: "離開駁二",
    note: "準備前往台南入住；若遇塞車可提早 10–20 分鐘出發。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=駁二藝術特區",
    embedLink: "https://www.google.com/maps?q=駁二藝術特區&output=embed",
    duration: "約 40-50 分鐘車程"
  },
  {
    id: "tainan-hotel",
    time: "晚上",
    tag: "台南",
    title: "入住｜暖時嚼旅",
    note: "抵達後先放行李、再安排晚餐/夜散步。",
    mapLink: "https://www.google.com/maps/search/?api=1&query=暖時嚼旅 台南",
    embedLink: "https://www.google.com/maps?q=暖時嚼旅%20台南&output=embed"
  }
]);

const activeIndex = ref(0);
const activeStop = computed(() => stops.value[activeIndex.value]);
</script>
