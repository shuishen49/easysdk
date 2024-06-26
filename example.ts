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
