export default class ClassDecorator {

    /**
     * 类名装饰器
     */
    public static get classname(): Function {
        return function (target: any) {
            let frameInfo = cc['_RF'].peek();
            let script = frameInfo.script;
            cc.js.setClassName(script, target);
        }
    }

}