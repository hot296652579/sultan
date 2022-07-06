export default class LocalizationUtils {

    public static get(content: string, ...format: string[] | number[]): string {
        let value: string = content;

        if(value && value.length > 0) {
            if (format.length > 0) {
                value = value.replace(/{(\d+)}/g, (_: string, matchIndex: string) => {
                    let index: number = Number(matchIndex);
                    let content: string | number | undefined = format[index];
                    let result: string = "";
                    if (content === undefined) {
                        result = "?"
                    } else {
                        if (typeof (content) === "number") {
                            result = content.toString();
                        } else {
                            result = content;
                        }
                    }
                    return result;
                });
            }
        }
        
        return value;
    }
    
}