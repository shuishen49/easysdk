
# EasySDK

EasySDK 是一个用于 Cocos Creator 3.x 的广告插件，支持多平台广告集成，包括抖音和微信平台。

## 功能

- 支持抖音广告集成
- 支持微信广告集成
- 简化广告展示流程
- 支持广告成功和失败回调

## 安装

1. 将 EasySDK 代码库下载或克隆到您的项目中。
2. 在 `config.ts` 文件中配置您的广告单元 ID。

```typescript
// config.ts
export const CONFIG = {
    byteDanceAdUnitId: "your-bytedance-ad-unit-id",
    weChatAdUnitId: "your-wechat-ad-unit-id",
    // 可以添加更多广告单元ID
};
```

## 使用方法

### 初始化广告管理器

在 Cocos Creator 脚本的 `onLoad` 方法中初始化广告管理器。

```typescript
import { _decorator, Component } from 'cc';
import { AdPlatformManager } from './easysdk/AdPlatformManager';
const { ccclass, property } = _decorator;

@ccclass('AdComponent')
export class AdComponent extends Component {

    onLoad() {
        // 初始化广告管理器
        AdPlatformManager.initVideoAd();
    }

    onStageClicked() {
        // 展示广告
        AdPlatformManager.getInstance().showAd(() => {
            console.log('执行成功后的逻辑');
            // 成功的回调
            this.loadNewLevel(); // 观看完广告后加载新关卡
        }, () => {
            console.log('执行失败或不执行广告的逻辑');
            // 失败的回调
            this.handleAdFailure(); // 处理广告失败的逻辑
        });
    }

    loadNewLevel() {
        // 加载新关卡的逻辑
        console.log('加载新关卡...');
        // 在这里添加加载新关卡的代码
    }

    handleAdFailure() {
        // 处理广告失败或用户未观看完整广告的逻辑
        console.log('广告展示失败或未观看完整广告');
        // 在这里添加处理失败的代码
    }
}
```

### 示例代码

以下是一个示例代码，用于展示广告并处理广告成功和失败的回调。

```typescript
import { AdPlatformManager } from './easysdk/AdPlatformManager';

onStageClicked() {
    // 展示广告
    AdPlatformManager.getInstance().showAd(() => {
        console.log('执行成功后的逻辑');
        // 成功的回调
        this.loadNewLevel(); // 观看完广告后加载新关卡
    }, () => {
        console.log('执行失败或不执行广告的逻辑');
        // 失败的回调
        this.handleAdFailure(); // 处理广告失败的逻辑
    });
}

loadNewLevel() {
    // 加载新关卡的逻辑
    console.log('加载新关卡...');
    // 在这里添加加载新关卡的代码
}

handleAdFailure() {
    // 处理广告失败或用户未观看完整广告的逻辑
    console.log('广告展示失败或未观看完整广告');
    // 在这里添加处理失败的代码
}
```

## 联系方式

如有任何问题或需求，请联系作者：93418328@qq.com
