# HIRS 患者端 App 系统设计文档

**版本**: v1.0  
**日期**: 2026-04-02  
**项目**: HIRS 患者端移动应用  
**仓库**: https://github.com/zqdaigit/hirs-patient-app

---

## 文档目录

1. [系统架构设计](#1-系统架构设计)
2. [数据库设计](#2-数据库设计)
3. [模块划分](#3-模块划分)
4. [目录结构设计](#4-目录结构设计)
5. [第三方服务集成](#5-第三方服务集成)

---

## 1. 系统架构设计

### 1.1 整体架构

HIRS 患者端 App 采用分层架构设计，分为表现层、业务层、数据层：

```
┌─────────────────────────────────────────────────────────────────┐
│                        表现层 (UI Layer)                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │   Screens   │ │ Components  │ │  Navigation │ │   Hooks   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                      业务层 (Business Layer)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │   Services  │ │   Store     │ │  Validators │ │  Utils    │ │
│  │   (API)     │ │   (Redux)   │ │  (表单验证)  │ │  (工具)   │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                       数据层 (Data Layer)                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │  AsyncStorage│ │   Cache    │ │   Images   │ │  Videos   │ │
│  │  (本地存储)  │ │  (缓存管理) │ │ (本地图片)  │ │(本地视频)  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 技术选型

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | React Native | 0.76.x | 跨平台移动开发 |
| 构建工具 | Expo | SDK 52 | 简化开发、构建、部署 |
| 语言 | TypeScript | 5.x | 类型安全 |
| 状态管理 | Redux Toolkit | 2.x | 全局状态管理 |
| 本地状态 | React Context | - | 轻量级状态 |
| 导航 | React Navigation | 6.x | 路由和导航 |
| 网络请求 | Axios | 1.x | HTTP 客户端 |
| 表单 | React Hook Form | 7.x | 表单管理 |
| UI 组件 | React Native Paper | 5.x | Material Design 3 |
| 图表 | Victory Native | - | 数据可视化 |
| 视频播放 | Expo AV | - | 音视频播放 |
| 动画 | Lottie | - | 动画效果 |
| 本地存储 | AsyncStorage | - | 键值存储 |
| 推送 | Expo Notifications | - | 推送通知 |

### 1.3 架构模式

采用 **Clean Architecture** 理念：

```
src/
├── domain/           # 领域层 - 业务实体和接口
│   ├── entities/     # 实体定义
│   └── interfaces/   # 接口定义
├── data/             # 数据层 - 数据处理
│   ├── repositories/ # 数据仓库实现
│   ├── datasources/  # 数据源（API/本地）
│   └── models/       # 数据模型
├── application/      # 应用层 - 用例和业务逻辑
│   ├── services/     # 业务服务
│   ├── hooks/        # 自定义 Hooks
│   └── store/        # Redux Store
└── presentation/     # 表现层 - UI
    ├── screens/      # 页面组件
    ├── components/   # 通用组件
    └── navigation/   # 导航配置
```

### 1.4 网络架构

```
┌──────────────┐      HTTPS       ┌──────────────┐
│   患者端 App  │ <──────────────> │   后端 API    │
│              │                   │  (Node.js)   │
│  - JWT Token │                   └──────┬───────┘
│  - HTTPS     │                          │
└──────────────┘                    ┌──────┴───────┐
                                    │   PostgreSQL  │
                                    │     Redis     │
                                    │     MinIO     │
                                    └───────────────┘
```

---

## 2. 数据库设计

### 2.1 数据模型

#### 2.1.1 用户表 (users)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(11) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'patient',
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone);
```

#### 2.1.2 患者表 (patients)

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  therapist_id UUID NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(11),
  gender VARCHAR(10),
  birth_date DATE,
  diagnosis JSONB DEFAULT '{}',
  tags TEXT[],
  invited_code VARCHAR(10) UNIQUE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_therapist_id ON patients(therapist_id);
CREATE INDEX idx_patients_invited_code ON patients(invited_code);
```

#### 2.1.3 训练动作表 (actions)

```sql
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  name_en VARCHAR(100),
  description TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20) DEFAULT 'medium',
  duration INTEGER DEFAULT 30,
  default_sets INTEGER DEFAULT 3,
  default_rest INTEGER DEFAULT 15,
  target_muscles TEXT[],
  tips TEXT[],
  video_url VARCHAR(500),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_actions_category ON actions(category);
```

#### 2.1.4 训练计划表 (training_programs)

```sql
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  therapist_id UUID NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  schedule JSONB NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_programs_patient_id ON training_programs(patient_id);
CREATE INDEX idx_programs_status ON training_programs(status);
```

#### 2.1.5 计划动作表 (program_actions)

```sql
CREATE TABLE program_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES training_programs(id) ON DELETE CASCADE,
  action_id UUID REFERENCES actions(id),
  order_num INTEGER NOT NULL,
  duration INTEGER,
  sets INTEGER,
  rest_between_sets INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_program_actions_program_id ON program_actions(program_id);
```

#### 2.1.6 训练记录表 (training_records)

```sql
CREATE TABLE training_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  program_id UUID REFERENCES training_programs(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  completed BOOLEAN DEFAULT false,
  total_duration INTEGER,
  pain_level INTEGER,
  mood VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_records_patient_id ON training_records(patient_id);
CREATE INDEX idx_records_start_time ON training_records(start_time);
```

#### 2.1.7 训练动作记录表 (record_actions)

```sql
CREATE TABLE record_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID REFERENCES training_records(id) ON DELETE CASCADE,
  action_id UUID NOT NULL,
  order_num INTEGER NOT NULL,
  actual_duration INTEGER,
  feedback TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_record_actions_record_id ON record_actions(record_id);
```

#### 2.1.8 知识文章表 (articles)

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(100),
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(published);
```

#### 2.1.9 通知表 (notifications)

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
```

### 2.2 数据关系图

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    users    │────<│  patients   │────<│training_prog│
└─────────────┘     └─────────────┘     └──────┬──────┘
      │                    │                    │
      │                    │                    │
      ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│notifications│     │     actions │     │program_actns│
└─────────────┘     └─────────────┘     └──────┬──────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │training_recs│
                                         └──────┬──────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │record_actions
                                         └─────────────┘
```

---

## 3. 模块划分

### 3.1 模块结构

```
App Modules
├── AuthModule          # 认证模块
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── ForgotPasswordScreen
│   └── AuthService
├── HomeModule          # 首页模块
│   ├── HomeScreen
│   ├── TodayTrainingCard
│   └── WeekStatsCard
├── TrainingModule      # 训练模块
│   ├── TrainingPlanScreen
│   ├── TrainingDetailScreen
│   ├── ActionLibraryScreen
│   ├── TrainingSessionScreen
│   └── TrainingService
├── ProgressModule      # 进度模块
│   ├── ProgressScreen
│   ├── StatsOverview
│   ├── TrendChart
│   └── RecordListScreen
├── KnowledgeModule     # 知识库模块
│   ├── KnowledgeScreen
│   ├── ArticleListScreen
│   ├── ArticleDetailScreen
│   └── KnowledgeService
├── ProfileModule       # 个人中心模块
│   ├── ProfileScreen
│   ├── EditProfileScreen
│   ├── DiagnosisInfoScreen
│   ├── TherapistInfoScreen
│   └── SettingsScreen
└── CommonModule        # 通用模块
    ├── Components
    ├── Hooks
    ├── Utils
    └── Constants
```

### 3.2 核心模块设计

#### 3.2.1 认证模块 (AuthModule)

**职责**：处理用户登录、注册、密码重置

```
AuthModule
├── LoginScreen
│   ├── 手机号输入 (TextInput)
│   ├── 密码输入 (TextInput)
│   ├── 登录按钮 (Button)
│   └── 忘记密码链接 (TouchableOpacity)
├── RegisterScreen
│   ├── 邀请码输入 (TextInput)
│   ├── 手机号输入 (TextInput)
│   ├── 密码输入 (TextInput)
│   ├── 确认密码输入 (TextInput)
│   ├── 注册按钮 (Button)
│   └── 表单验证 (Yup)
├── ForgotPasswordScreen
│   ├── 手机号输入 (TextInput)
│   ├── 验证码输入 (TextInput)
│   ├── 新密码输入 (TextInput)
│   ├── 获取验证码按钮 (Button)
│   └── 重置按钮 (Button)
└── AuthService
    ├── login(phone, password)
    ├── register(inviteCode, phone, password)
    ├── forgotPassword(phone, verifyCode, newPassword)
    ├── refreshToken(refreshToken)
    └── logout()
```

#### 3.2.2 训练模块 (TrainingModule)

**职责**：训练计划查看、训练执行、动作演示

```
TrainingModule
├── TrainingPlanScreen
│   ├── 当前计划卡片 (Card)
│   ├── 动作列表 (FlatList)
│   ├── 日历视图 (Calendar)
│   └── 开始训练按钮 (Button)
├── TrainingDetailScreen
│   ├── 计划信息头部 (Header)
│   ├── 动作列表 (FlatList)
│   └── 联系康复师按钮 (Button)
├── ActionLibraryScreen
│   ├── 分类筛选 (Chip/Filter)
│   ├── 动作列表 (FlatList)
│   └── 动作搜索 (SearchBar)
├── TrainingSessionScreen
│   ├── 动作演示区 (VideoPlayer/Lottie)
│   ├── 计时器 (CountdownTimer)
│   ├── 进度条 (ProgressBar)
│   ├── 反馈按钮组 (ButtonGroup)
│   ├── 训练控制栏 (ControlBar)
│   └── 疼痛记录弹窗 (Modal)
└── TrainingService
    ├── getActiveProgram()
    ├── getProgramDetail(programId)
    ├── getActions()
    ├── startTraining(programId)
    ├── submitTraining(record)
    └── saveTrainingProgress()
```

#### 3.2.3 进度模块 (ProgressModule)

**职责**：训练数据统计、趋势分析、记录查看

```
ProgressModule
├── ProgressScreen
│   ├── 统计概览卡片 (StatsCard)
│   ├── 趋势图表 (TrendChart)
│   └── 训练记录列表 (FlatList)
├── StatsOverview
│   ├── 总训练次数 (NumberCard)
│   ├── 连续天数 (NumberCard)
│   ├── 本月完成率 (ProgressRing)
│   └── 训练时长 (NumberCard)
├── TrendChart
│   ├── 周趋势柱状图 (BarChart)
│   ├── 月趋势折线图 (LineChart)
│   └── 时间范围切换 (SegmentedControl)
├── RecordListScreen
│   ├── 记录列表 (FlatList)
│   ├── 筛选器 (Filter)
│   └── 日期分组 (SectionList)
├── RecordDetailScreen
│   ├── 训练摘要 (Summary)
│   ├── 动作详情 (ActionList)
│   ├── 反馈统计 (FeedbackStats)
│   └── 疼痛记录 (PainRecord)
└── ProgressService
    ├── getStatsOverview()
    ├── getTrendData(range)
    ├── getRecords(params)
    └── exportReport(format)
```

---

## 4. 目录结构设计

### 4.1 项目根目录

```
hirs-patient-app/
├── .expo/                  # Expo 配置
├── .github/                # GitHub Actions
├── assets/                 # 静态资源
│   ├── fonts/             # 字体文件
│   ├── icons/             # 图标
│   ├── images/            # 图片
│   └── animations/        # Lottie 动画 JSON
├── src/                    # 源代码
│   ├── app/               # 应用入口
│   ├── components/        # 通用组件
│   ├── constants/         # 常量定义
│   ├── contexts/          # React Context
│   ├── hooks/             # 自定义 Hooks
│   ├── navigation/        # 导航配置
│   ├── screens/           # 页面组件
│   ├── services/          # API 服务
│   ├── store/             # Redux Store
│   ├── theme/             # 主题配置
│   ├── types/             # TypeScript 类型
│   └── utils/             # 工具函数
├── App.tsx                # 应用入口
├── app.json               # Expo 配置
├── babel.config.js        # Babel 配置
├── package.json           # 依赖管理
└── tsconfig.json          # TypeScript 配置
```

### 4.2 详细目录结构

```
src/
├── app/
│   └── App.tsx            # 根组件
│
├── components/
│   ├── common/            # 通用组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   ├── Empty.tsx
│   │   └── Error.tsx
│   ├── auth/              # 认证相关
│   │   ├── PhoneInput.tsx
│   │   ├── PasswordInput.tsx
│   │   └── VerifyCodeInput.tsx
│   ├── training/          # 训练相关
│   │   ├── TrainingCard.tsx
│   │   ├── ActionCard.tsx
│   │   ├── Timer.tsx
│   │   ├── FeedbackButtons.tsx
│   │   └── ProgressBar.tsx
│   ├── progress/          # 进度相关
│   │   ├── StatsCard.tsx
│   │   ├── TrendChart.tsx
│   │   └── RecordItem.tsx
│   └── index.ts           # 导出入口
│
├── constants/
│   ├── colors.ts          # 颜色常量
│   ├── typography.ts      # 字体常量
│   ├── spacing.ts         # 间距常量
│   ├── config.ts          # 应用配置
│   └── endpoints.ts       # API 端点
│
├── contexts/
│   ├── AuthContext.tsx    # 认证上下文
│   ├── ThemeContext.tsx   # 主题上下文
│   └── TrainingContext.tsx # 训练上下文
│
├── hooks/
│   ├── useAuth.ts         # 认证 Hook
│   ├── useTraining.ts     # 训练 Hook
│   ├── useStorage.ts      # 本地存储 Hook
│   └── useNotification.ts # 通知 Hook
│
├── navigation/
│   ├── RootNavigator.tsx  # 根导航
│   ├── AuthNavigator.tsx  # 认证导航
│   ├── MainNavigator.tsx  # 主导航
│   ├── TabNavigator.tsx   # Tab 导航
│   └── types.ts           # 导航类型
│
├── screens/
│   ├── auth/              # 认证页面
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── home/              # 首页
│   │   └── HomeScreen.tsx
│   ├── training/          # 训练页面
│   │   ├── TrainingPlanScreen.tsx
│   │   ├── TrainingDetailScreen.tsx
│   │   ├── ActionLibraryScreen.tsx
│   │   └── TrainingSessionScreen.tsx
│   ├── progress/          # 进度页面
│   │   ├── ProgressScreen.tsx
│   │   ├── RecordListScreen.tsx
│   │   └── RecordDetailScreen.tsx
│   ├── knowledge/         # 知识库页面
│   │   ├── KnowledgeScreen.tsx
│   │   └── ArticleDetailScreen.tsx
│   ├── profile/           # 个人中心页面
│   │   ├── ProfileScreen.tsx
│   │   ├── EditProfileScreen.tsx
│   │   ├── DiagnosisInfoScreen.tsx
│   │   └── SettingsScreen.tsx
│   └── index.ts           # 导出入口
│
├── services/
│   ├── api.ts             # Axios 实例
│   ├── auth.service.ts    # 认证 API
│   ├── patient.service.ts # 患者 API
│   ├── training.service.ts # 训练 API
│   ├── progress.service.ts # 进度 API
│   ├── knowledge.service.ts # 知识库 API
│   └── notification.service.ts # 通知 API
│
├── store/
│   ├── index.ts           # Store 入口
│   ├── slices/
│   │   ├── authSlice.ts   # 认证状态
│   │   ├── userSlice.ts   # 用户状态
│   │   ├── trainingSlice.ts # 训练状态
│   │   └── notificationSlice.ts # 通知状态
│   └── hooks.ts           # Redux Hooks
│
├── theme/
│   ├── index.ts           # 主题入口
│   ├── colors.ts          # 颜色主题
│   ├── spacing.ts         # 间距主题
│   └── typography.ts      # 字体主题
│
├── types/
│   ├── user.ts            # 用户类型
│   ├── patient.ts         # 患者类型
│   ├── training.ts        # 训练类型
│   ├── progress.ts        # 进度类型
│   ├── article.ts         # 文章类型
│   └── index.ts           # 类型导出
│
└── utils/
    ├── storage.ts         # 本地存储工具
    ├── validation.ts      # 验证工具
    ├── date.ts            # 日期工具
    ├── format.ts          # 格式化工具
    └── permission.ts      # 权限工具
```

### 4.3 组件层级

```
┌─────────────────────────────────────────────────────────────┐
│                        Screens (页面)                        │
│  ├── LoginScreen                                             │
│  ├── HomeScreen                                              │
│  ├── TrainingPlanScreen                                      │
│  ├── TrainingSessionScreen                                   │
│  └── ...                                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Components (组件)                        │
│  ├── common/                                                 │
│  │   ├── Button, Card, Input, Modal, Loading...             │
│  ├── training/                                               │
│  │   ├── TrainingCard, Timer, FeedbackButtons...            │
│  └── progress/                                               │
│      ├── StatsCard, TrendChart, RecordItem...               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Services (服务层)                         │
│  ├── auth.service.ts    →  API 调用                         │
│  ├── training.service.ts                                     │
│  └── progress.service.ts                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Store (状态管理)                        │
│  ├── authSlice        →  用户认证状态                        │
│  ├── trainingSlice    →  训练状态                            │
│  └── progressSlice    →  进度数据状态                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. 第三方服务集成

### 5.1 推送通知 (Expo Notifications)

**用途**：训练提醒、复诊提醒、系统通知

```typescript
// 服务配置
const PUSH_NOTIFICATION_CONFIG = {
  androidChannelId: 'hirs-training',
  androidChannelName: '训练提醒',
  androidChannelDescription: '训练计划和复诊提醒',
  iosChannelId: 'hirs-notifications',
  iosChannelName: 'HIRS 通知',
};

// 权限请求
async function requestNotificationPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
}

// 订阅通知
async function subscribeToNotifications() {
  await requestNotificationPermission();
  
  // 订阅训练提醒
  await Notifications.addNotificationReceivedListener(notification => {
    const { type, data } = notification.request.content;
    handleNotification(type, data);
  });
}
```

### 5.2 短信服务 (SMS)

**用途**：验证码发送、登录验证

```typescript
// 短信服务集成（后端 API 调用）
const SMS_SERVICE_CONFIG = {
  provider: 'aliyun', // 或 twilio, qiniu
  templateCodes: {
    login: 'SMS_xxxxx',
    register: 'SMS_xxxxx',
    resetPassword: 'SMS_xxxxx',
  },
};

// API 调用
async function sendVerifyCode(phone: string, type: string) {
  return api.post('/sms/send', {
    phone,
    templateCode: SMS_SERVICE_CONFIG.templateCodes[type],
  });
}

async function verifyCode(phone: string, code: string) {
  return api.post('/sms/verify', {
    phone,
    code,
  });
}
```

### 5.3 存储服务 (文件/图片)

**用途**：用户头像、训练照片/视频存储

```typescript
// 使用 Expo FileSystem + 后端 API
const STORAGE_SERVICE = {
  // 上传图片
  async uploadImage(uri: string, type: 'avatar' | 'training') {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: `${type}_${Date.now()}.jpg`,
    } as any);
    
    return api.upload('/storage/upload', formData);
  },
  
  // 上传视频
  async uploadVideo(uri: string) {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'video/mp4',
      name: `training_${Date.now()}.mp4`,
    } as any);
    
    return api.upload('/storage/upload', formData);
  },
  
  // 获取文件 URL
  getFileUrl(fileId: string) {
    return `${API_BASE_URL}/storage/files/${fileId}`;
  },
};
```

### 5.4 地图服务 (可选)

**用途**：显示康复机构位置

```typescript
// 使用 Expo Location
const LOCATION_SERVICE = {
  // 获取当前位置
  async getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }
    
    return Location.getCurrentPositionAsync({});
  },
  
  // 获取康复师位置（显示距离）
  async getTherapistLocation(therapistId: string) {
    return api.get(`/therapists/${therapistId}/location`);
  },
};
```

### 5.5 第三方登录 (可选)

```typescript
// OAuth 登录配置
const OAUTH_CONFIG = {
  apple: {
    clientId: 'com.hirs.patient',
  },
  google: {
    clientId: 'xxxxx.apps.googleusercontent.com',
  },
};

// Apple 登录
async function signInWithApple() {
  const appleId = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.Scope.FULL_NAME,
      AppleAuthentication.Scope.EMAIL,
    ],
  });
  
  return api.post('/auth/oauth/apple', {
    identityToken: appleId.identityToken,
  });
}
```

### 5.6 服务集成总览

| 服务 | 用途 | 实现方式 |
|------|------|----------|
| 推送通知 | 训练提醒、复诊提醒 | Expo Notifications |
| 短信验证码 | 登录、注册、密码重置 | 后端 API（阿里云/腾讯云） |
| 文件存储 | 头像、照片、视频 | 后端 API + MinIO |
| 定位服务 | 康复机构位置 | Expo Location |
| Apple 登录 | iOS 快速登录 | expo-apple-authentication |
| 视频播放 | 动作演示 | expo-av |

---

## 附录

### A.1 环境配置

```typescript
// development / staging / production
const ENV = {
  development: {
    API_BASE_URL: 'http://localhost:3000/api/v1',
    SOCKET_URL: 'http://localhost:3000',
  },
  staging: {
    API_BASE_URL: 'https://staging-api.hirs.com/api/v1',
    SOCKET_URL: 'https://staging-api.hirs.com',
  },
  production: {
    API_BASE_URL: 'https://api.hirs.com/api/v1',
    SOCKET_URL: 'https://api.hirs.com',
  },
};
```

### A.2 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-04-02 | 初始版本 |

---

**文档编制**: HIRS 开发团队  
**最后更新**: 2026-04-02