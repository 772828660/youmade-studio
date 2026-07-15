# youmade.studio — 手机版开发记录

> 分支：`mobile` · 基于 `main` 稳定版开发 · 满意后 merge 回 main

## 四个设计决策（先按此实施，看效果再调整）

| # | 问题 | 决策 | 理由 |
|---|------|------|------|
| 1 | 导航形式 | **左滑抽屉菜单** | 5 个分类 + 子分类，抽屉比底部 Tab 更能承载；底部 Tab 适合 3–4 个主入口，这里会挤 |
| 2 | 分类页筛选 | **底部 Sheet** | 拇指友好、不挡商品列表；顶部折叠面板在小屏上仍占纵向空间 |
| 3 | 商品详情主图 | **缩略图切换 + 主图左右滑动** | 双保险：习惯点缩略图的用户和习惯滑动的用户都能用 |
| 4 | 390px 以下商品网格 | **保持 2 列小卡片** | 电商惯例，一屏多看几个商品；1 列适合高客单价大图，手工包 €20–40 更适合 2 列 |

## 断点

```
768px  — 手机 / 平板分界（Header 切换、Filter Sheet 启用）
560px  — 小屏微调（字号、间距）
```

## 实施阶段

- [x] Phase 0 — 分支 + 本文档
- [x] Phase 1 — Header、抽屉菜单、搜索 overlay
- [x] Phase 2 — 分类 Filter Sheet、PDP 重排 + 底部购买条
- [x] Phase 3 — 轮播触屏、首页/Footer 间距、hover 仅桌面

## 如何预览

```bash
npm run dev
# Chrome DevTools → Toggle device toolbar → iPhone 14 (390×844)
```

## 如何回退

```bash
git checkout main    # 回到桌面稳定版
git checkout mobile  # 继续手机版
```
