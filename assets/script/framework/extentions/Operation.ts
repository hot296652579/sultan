export default class Operation {

    public static add(arg1, arg2) {
        let digits1, digits2, maxDigits;
        try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
        try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }
        maxDigits = Math.pow(10, Math.max(digits1, digits2))
        return (Math.ceil(arg1 * maxDigits) + Math.ceil(arg2 * maxDigits)) / maxDigits
    }

    public static sub(arg1, arg2) {
        let digits1, digits2, maxDigits;
        try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
        try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }
        maxDigits = Math.pow(10, Math.max(digits1, digits2));
        return (Math.ceil(arg1 * maxDigits) - Math.ceil(arg2 * maxDigits)) / maxDigits;
    }

    public static mul(arg1, arg2) {
        let digits = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { digits += s1.split(".")[1].length } catch (e) { }
        try { digits += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, digits);
    }

    public static div(arg1, arg2) {
        let int1 = 0, int2 = 0, digits1, digits2;
        try { digits1 = arg1.toString().split(".")[1].length } catch (e) { digits1 = 0 }
        try { digits2 = arg2.toString().split(".")[1].length } catch (e) { digits2 = 0 }

        int1 = Number(arg1.toString().replace(".", ""))
        int2 = Number(arg2.toString().replace(".", ""))
        return (int1 / int2) * Math.pow(10, digits2 - digits1);
    }
}