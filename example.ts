import { AdPlatformManager } from './easysdk/AdPlatformManager';

onStageClicked() {
   
        // 展示广告
        AdPlatformManager.getInstance().showAd(() => {
            console.log('执行成功后的逻辑');
            // 成功的回调
            // this.loadNewLevel(); // 观看完广告后加载新关卡
        }, () => {
            console.log('执行失败或不执行广告的逻辑');
            // 失败的回调
        });
    } 
}