# 🌀 Mystery Debug Room

**Escape the infinite loop... one bug at a time.**  
一個結合前端知識與解謎機制的互動網頁遊戲，每一個房間都是一道程式錯誤的挑戰。  
透過修復錯誤，你將從無限迴圈、null 洞穴、NaN 墓地等地逃脫而出！

---

## 🌟 Features

- 🧩 **9 個互動式解謎關卡：**
  - Infinite Loop Prison
  - Null Cave
  - Closure Maze
  - NaN Graveyard
  - Callback Dungeon
  - Regex Curse Room
  - Console Mirror
  - Shadow Variable Lab
  - Type Coercion Tunnel

- 🎮 以程式錯誤為主題的關卡設計，具備回饋與提示機制
- 💻 使用 Next.js App Router 架構，動態路由切換順暢
- 🎨 Tailwind CSS 3.4 + 完整 RWD，手機與桌機皆適配
- 🌌 首頁有 tsParticles 黑洞背景動畫（粒子吸引中心）
- ✅ 所有答案皆有即時判斷與結果顯示

---

## 🛠 技術棧

| 分類 | 技術 |
|------|------|
| 前端框架 | Next.js 14 (App Router) |
| 樣式系統 | Tailwind CSS 3.4 |
| 程式語言 | TypeScript |
| 動畫效果 | tsParticles、Framer Motion |
| 狀態處理 | useState, useEffect (React Hooks) |

---

## 🚀 快速開始

### 1️⃣ 安裝專案

```bash
git clone https://github.com/your-username/mystery-debug-room.git
cd mystery-debug-room
npm install
```

### 2️⃣ 本地啟動

```bash
npm run dev
```

前往瀏覽器打開 [http://localhost:3000](http://localhost:3000)

---

## 📁 專案結構

```bash
app/
  room/
    loop-prison/
    null-cave/
    ...
  layout.tsx          # 全域 layout
components/
  RoomLayout.tsx      # 每個房間的包裝佈局
  HomeParticles.tsx   # 首頁黑洞動畫
  LoadingOverlay.tsx  # 載入中畫面
public/
  favicon.ico
tailwind.config.js
tsconfig.json
README.md
```

---

## 🧪 開發者筆記

- 每一關的題目與判斷邏輯獨立於該房間的 `page.tsx` 中
- 共用元件如按鈕、題目選項建議抽出至 `components/`
- `HomeParticles` 只在 `/` 頁面中渲染，避免效能浪費
- Loading 建議採用「靜態切換」方式，不使用淡入淡出動畫，提升穩定性

---

## 🧑‍💻 貢獻方式

歡迎 fork、改寫、創建 PR，或發 Issue 提出你想增加的新關卡（例如：Hoisting Hell、Promise Panic Room...）

---


## 📄 授權 License

MIT License 