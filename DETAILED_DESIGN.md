# HIRS 患者端 App 详细设计文档

**版本**: v1.0  
**日期**: 2026-04-02  
**项目**: HIRS 患者端移动应用

---

## 1. UI/UX 详细设计

### 1.1 页面布局规范

#### 1.1.1 通用布局

```
┌─────────────────────────────────────┐
│           SafeAreaView              │
├─────────────────────────────────────┤
│  Header (60px)                      │
│  ┌─────────────────────────────────┐│
│  │  ← 返回    标题        ⚙️ 分享  ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│           ScrollView                │
│           (内容区域)                │
├─────────────────────────────────────┤
│  Bottom Tab Bar (60px + SafeArea)  │
│   🏠    📋    📊    📚    👤       │
└─────────────────────────────────────┘
```

#### 1.1.2 间距规范

| 元素 | 间距 |
|------|------|
| 屏幕边距 | 16px |
| 卡片内边距 | 16px |
| 组件间距 | 12px |
| 列表项间距 | 8px |
| 文字行间距 | 1.5 |

#### 1.1.3 颜色规范

```
主色调：
- Primary: #4A90E2 (蓝色)
- PrimaryDark: #357ABD
- PrimaryLight: #E8F4FD

辅助色：
- Success: #52C41A (绿色)
- Warning: #FAAD14 (黄色)
- Error: #FF4D4F (红色)
- Info: #1890FF

中性色：
- Background: #F5F5F5
- Surface: #FFFFFF
- TextPrimary: #333333
- TextSecondary: #666666
- Border: #E5E5E5
```

---

### 1.2 交互流程图

#### 1.2.1 注册流程

```
引导页 → 输入邀请码 → 验证 → 填写信息 → 注册成功
```

#### 1.2.2 训练流程

```
开始训练 → 动作演示 → 计时执行 → 反馈记录 → 训练完成
```

---

### 1.3 核心页面设计

#### 1.3.1 登录页面

```
┌─────────────────────────────────────┐
│              Logo                   │
│            HIRS 标志               │
│        脊柱侧弯康复专家             │
├─────────────────────────────────────┤
│  手机号                             │
│  ┌─────────────────────────────────┐│
│  │ +86 | 请输入手机号              ││
│  └─────────────────────────────────┘│
│  密码                               │
│  ┌─────────────────────────────────┐│
│  │ ••••••••                        ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │         登录                    ││
│  └─────────────────────────────────┘│
│   忘记密码？          注册账号      │
└─────────────────────────────────────┘
```

#### 1.3.2 首页

```
┌─────────────────────────────────────┐
│  2026年4月2日  星期三              │
│  👋 早上好，张小明                  │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │    🎯 今日训练                  ││
│  │    3 个动作  ·  约 25 分钟     ││
│  │    未开始                       ││
│  │    [开始训练]                   ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  本周统计                           │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ 3 次   │ │ 75%    │ │ 5 天   │  │
│  │ 训练   │ │ 完成率 │ │ 连续   │  │
│  └────────┘ └────────┘ └────────┘  │
├─────────────────────────────────────┤
│  快捷入口：知识库 | 复诊 | 帮助     │
└─────────────────────────────────────┘
```

#### 1.3.3 训练执行页面

```
┌─────────────────────────────────────┐
│  ← 返回      训练中      ⏸ 暂停    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │                                 ││
│  │      动作演示视频 (16:9)        ││
│  │                                 ││
│  │        猫式伸展                 ││
│  │        第 1 组，共 3 组        ││
│  │                                 ││
│  │         00:25                  ││
│  │                                 ││
│  │  [完成]  [注意]  [疼痛]        ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  动作 1/5                    20%   │
└─────────────────────────────────────┘
```

---

## 2. API 接口详细设计

### 2.1 认证接口

#### 2.1.1 邀请码注册

```
POST /api/v1/auth/register

请求参数：
{
  inviteCode: string,      // 邀请码，6位，必填
  phone: string,           // 手机号，11位，必填
  password: string,        // 密码，6-20位，必填
  name?: string,           // 姓名，可选
  verifyCode: string       // 短信验证码，6位，必填
}

成功响应 (200):
{
  success: true,
  data: {
    token: string,
    refreshToken: string,
    user: { id, phone, name, role: "patient" }
  },
  message: "注册成功"
}
```

#### 2.1.2 手机号登录

```
POST /api/v1/auth/login

请求参数：{ phone, password }

成功响应 (200):
{
  success: true,
  data: {
    token, refreshToken,
    user: { id, phone, name, avatar, role }
  }
}
```

#### 2.1.3 发送验证码

```
POST /api/v1/auth/sms/send

请求参数：{ phone, type }  // type: login | register | resetPassword
```

#### 2.1.4 忘记密码

```
POST /api/v1/auth/forgot-password
请求参数：{ phone, verifyCode, newPassword }
```

---

### 2.2 患者接口

#### 2.2.1 获取当前患者信息

```
GET /api/v1/patients/me
Header: Authorization: Bearer {token}
```

#### 2.2.2 更新患者信息

```
PUT /api/v1/patients/me
请求参数：{ name?, gender?, birthDate?, avatar? }
```

#### 2.2.3 获取我的康复师

```
GET /api/v1/patients/me/therapist
```

---

### 2.3 训练接口

#### 2.3.1 获取当前训练计划

```
GET /api/v1/programs/active

返回：
{
  id, name, description,
  actions: [{ id, actionId, name, category, duration, sets, restBetweenSets, order, videoUrl, tips }],
  schedule: { days: number[], reminderTime },
  startDate, status
}
```

#### 2.3.2 获取动作库

```
GET /api/v1/actions?category=&difficulty=&page=&pageSize=

返回：{ list: [{ id, name, description, category, difficulty, duration, ... }], total, page }
```

#### 2.3.3 创建训练记录

```
POST /api/v1/records
请求参数：
{
  programId, startTime, endTime, completed, totalDuration,
  painLevel, photos, notes,
  actions: [{ actionId, order, actualDuration, feedback, notes }]
}
```

---

### 2.4 统计接口

#### 2.4.1 统计概览

```
GET /api/v1/stats/overview

返回：{ totalTrainingCount, consecutiveDays, monthCompletionRate, monthTrainingDuration, weekTrainingCount, weekCompletionRate }
```

#### 2.4.2 训练趋势

```
GET /api/v1/stats/trend?range=week|month

返回：{ labels: string[], trainingCounts: number[], completionRates: number[] }
```

---

### 2.5 知识库接口

#### 2.5.1 文章列表

```
GET /api/v1/articles?category=&page=&pageSize=
```

#### 2.5.2 文章详情

```
GET /api/v1/articles/:id
```

---

## 3. 组件设计

### 3.1 公共组件库

| 组件名 | 用途 | 关键 Props |
|--------|------|------------|
| Button | 按钮 | title, onPress, variant, disabled, loading |
| Text | 文本 | children, style, numberOfLines |
| Input | 输入框 | value, onChangeText, placeholder, error |
| Card | 卡片 | children, style, elevation |
| Avatar | 头像 | source, size, onPress |
| Loading | 加载动画 | size, color |
| Empty | 空状态 | image, title, description |
| Error | 错误状态 | message, onRetry |

### 3.2 业务组件

| 组件名 | 模块 | 说明 |
|--------|------|------|
| TrainingCard | training | 训练计划卡片 |
| ActionCard | training | 动作项卡片 |
| Timer | training | 倒计时器 |
| FeedbackButtons | training | 反馈按钮组 |
| ProgressBar | training | 训练进度条 |
| StatsCard | progress | 统计卡片 |
| TrendChart | progress | 趋势图表 |
| RecordItem | progress | 训练记录项 |
| ArticleItem | knowledge | 文章列表项 |
| TherapistCard | profile | 康复师信息卡 |

### 3.3 组件接口示例

```typescript
// Button 组件接口
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Card 组件接口
interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: number;
  onPress?: () => void;
}

// Timer 组件接口
interface TimerProps {
  duration: number;        // 倒计时秒数
  onComplete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  isRunning: boolean;
}
```

---

## 附录

### A.1 屏幕尺寸适配

| 设备 | 宽度 | 高度 |
|------|------|------|
| iPhone SE | 320 | 568 |
| iPhone 14 | 390 | 844 |
| iPhone 14 Pro Max | 430 | 932 |
| Android 主流 | 360 | 800 |

### A.2 图标清单

| 图标 | 用途 |
|------|------|
| 🏠 | 首页 |
| 📋 | 训练计划 |
| 📊 | 进度统计 |
| 📚 | 知识库 |
| 👤 | 我的 |
| ← | 返回 |
| ⚙️ | 设置 |
| ✅ | 完成 |
| ⚠️ | 注意 |
| 🔴 | 疼痛 |

---

**文档编制**: mobile-dev  
**最后更新**: 2026-04-02
