# 我的生活宇宙 · 个人技术整合练习

## 项目简介

以「我的生活宇宙」为主题的个人综合主页，将任务管理、课程记录、留言反馈、个人简介、歌手数据看板、三维星球等模块整合在统一入口下。

## 页面结构

| 页面 | 文件 | 说明 |
| 首页 | index.html | 统一入口与导航，含断网提示 |
| 任务星球 | tasks.html + tasks.js | 任务增删/筛选/完成，ECharts 完成率饼图 |
| 课程星球 | courses.html + courses.js | 课程增删/筛选/搜索/双击改名 |
| 留言星球 | sub.html | 反馈表单，原生 CSS 校验 |
| 个人简介 | about.html | 照片、爱好、常用链接 |
| 歌手数据看板 | singer.html + singer.js | 歌曲播放/收藏数据，ECharts 柱状图+饼图+联动 |
| 生活宇宙（三维） | sun.html + sun.js | Three.js 三维星球场景 |
| 风景展示 | view.html | 校园风景图 |
| 社团风采 | bootstrap2.html | Bootstrap 卡片展示 |

## 运行说明

1. 双击 `index.html` 即可在浏览器中打开
2. 所有依赖库已放置在 `libs/` 目录，无需联网
3. 推荐使用 Chrome / Edge 最新版浏览器

## 资源来源说明

| 资源 | 来源 |
| Bootstrap 5 | 本地 libs/bootstrap.min.css（官方发行版） |
| jQuery 3.7.1 | 本地 libs/jquery-3.7.1.min.js |
| ECharts 5 | 本地 libs/echarts.min.js |
| Three.js + OrbitControls | 本地 libs/three.min.js、libs/OrbitControls.js |
| Chart.js | 本地 libs/chart.umd.js |
| 图片 | images/ 目录下均为网上查找不作商业用途；