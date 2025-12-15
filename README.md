# 行程網頁（Vue + GitHub Pages）

## 功能
- 行程時間軸（點選站點 → 右側地圖預覽會切換）
- 每站可一鍵打開 Google Maps 導航
- 特別站點：鹽埕小熊（標註最近下車站）

## 本機啟動
```bash
npm install
npm run dev
```

## 產出靜態檔
```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages（兩種方式）

### 方式 A：用 gh-pages 一鍵部署（推薦）
1. 到 GitHub 建立 repo（例如：`itinerary-vue-yancheng-bear`）
2. 確認 `vite.config.js` 的 `base` 有改成你的 repo 名稱（`/你的repo名/`）
3. 執行：
```bash
npm run deploy
```

### 方式 B：用 GitHub Actions（你想要我也可以幫你補）
把 `dist/` 當成 Pages artifact 部署即可。

## 重要
- GitHub Pages 專案頁通常網址為：`https://<username>.github.io/<repo>/`
- 所以 Vite 的 `base` 必須對應 `/<repo>/`，否則會白頁。
