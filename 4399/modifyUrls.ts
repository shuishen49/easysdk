// assets/scripts/modifyUrls.ts
import { game, assetManager, sys } from "cc";

let is4399 = true;

(function () {
    if (!is4399) return;
    //@ts-ignore
    let selfPip = function (task: any, done: any): any {
        const input = task.output = task.input;
        for (let i = 0; i < input.length; i++) {
            let item = input[i];
            if (!item.url) continue;
            let arr = item.url.split(".");
            if (arr.length >= 2 && arr[arr.length - 1] == "cconb") {
                item.url = "";
                for (let index = 0; index < arr.length - 1; index++) {
                    const element = arr[index];
                    item.url += (element + ".");
                }
                item.url += "_cconb.dbbin";
            }
        }
        return null;
    }

    //@ts-ignore
    // if (!CC_BUILD) return;
    assetManager.transformPipeline.append(selfPip);

    //@ts-ignore
    let dw = assetManager.downloader._downloaders;
    let dbbin = dw[".dbbin"];
    assetManager.downloader.register("dbbin", (url: string, options: any, onComplete: any) => {
        if (url.includes("_cconb")) {
            dw[".cconb"]()
        } else {
            dbbin();
        }
    });
})();
