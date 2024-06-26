export class EventEmitter {
    private listeners: { [event: string]: Array<(data?: any) => void> } = {};

    // 监听事件
    public on(event: string, callback: (data?: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    // 移除监听器
    public off(event: string, callback: (data?: any) => void) {
        if (!this.listeners[event]) {
            return;
        }
        const callbackIndex = this.listeners[event].indexOf(callback);
        if (callbackIndex !== -1) {
            this.listeners[event].splice(callbackIndex, 1);
        }
    }

    // 派发事件
    public emit(event: string, data?: any) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach((callback) => {
            callback(data);
        });
    }

    // 一次性监听事件
    public once(event: string, callback: (data?: any) => void) {
        const onceCallback = (data: any) => {
            this.off(event, onceCallback);
            callback(data);
        };
        this.on(event, onceCallback);
    }

}