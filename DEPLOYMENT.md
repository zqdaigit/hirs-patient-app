# HIRS 患者端 App 部署指南

## 环境要求

- Node.js 18+
- npm 9+
- Expo CLI
- Android Studio (Android 构建)
- Xcode (iOS 构建，仅 macOS)

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
# 启动 Expo 开发服务器
npm start

# 运行 Android
npm run android

# 运行 iOS
npm run ios
```

## 构建生产版本

### 方式一：使用 EAS Build (推荐)

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo 账号
eas login

# 初始化项目
eas project:init

# 构建 Android 测试版
eas build -p android --profile preview

# 构建 iOS 测试版
eas build -p ios --profile preview

# 构建生产版
eas build -p android --profile production
eas build -p ios --profile production
```

### 方式二：本地构建

```bash
# Android
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease

# iOS (仅 macOS)
npx expo prebuild --platform ios
cd ios && xcodebuild -workspace Runner.xcworkspace -scheme Runner -configuration Release archive
```

## CI/CD 部署

项目已配置 GitHub Actions：

### CI (持续集成)
- 自动运行测试
- 自动运行 TypeScript 检查
- 自动运行代码规范检查

### CD (持续部署)
- 自动构建 Android APK
- 自动创建 GitHub Release
- 上传构建产物

触发条件：
- 推送到 main 分支
- 创建版本标签 (v*)

## 应用商店发布

### Google Play Store

1. 创建 Google Play Console 账号
2. 配置 `eas.json` 中的 `submit.production.android`
3. 运行：
   ```bash
   eas submit -p android
   ```

### Apple App Store

1. 创建 Apple Developer 账号
2. 配置 `eas.json` 中的 `submit.production.ios`
3. 运行：
   ```bash
   eas submit -p ios
   ```

## 配置说明

### 环境变量

创建 `.env` 文件：

```env
API_BASE_URL=https://api.hirs.com/api/v1
EXPO_TOKEN=your_expo_token
```

### 应用图标

替换 `assets/` 目录下的图标文件：
- `icon.png` - 应用图标
- `splash.png` - 启动屏
- `adaptive-icon.png` - Android 自适应图标
- `favicon.png` - Web 图标

## 故障排除

### 构建失败

```bash
# 检查 Expo doctor
npx expo doctor

# 清理缓存
npx expo start --clear
```

### Android 构建问题

```bash
# 清理 Android 构建
cd android && ./gradlew clean

# 重新 prebuild
npx expo prebuild --platform android --clean
```

## 版本管理

遵循语义化版本：
- 修复: patch (1.0.1)
- 新功能: minor (1.1.0)
- 破坏性变更: major (2.0.0)

发布新版本：
```bash
git tag v1.0.0
git push origin v1.0.0
```
