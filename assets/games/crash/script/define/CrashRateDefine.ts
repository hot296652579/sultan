import { CrashInterface } from "../interface/CrashInterface"

export namespace CrashRateDefine {

    export const RateInterval: CrashInterface.RateInterval[] = [
        {
            rate: 1.00,
            move: 0.05,
            append: 0.01,
            startTime: 0,
        },
        {
            rate: 1.21,
            move: 0.06,
            append: 0.01,
            startTime: 3,
        },
        {
            rate: 1.45,
            move: 0.1,
            append: 0,
            startTime: 6,
        },
        {
            rate: 1.75,
            move: 0.12,
            append: 0,
            startTime: 9,
        },
        {
            rate: 2.11,
            move: 0.14,
            append: 0,
            startTime: 12,
        },
        {
            rate: 2.39,
            move: 0.14,
            append: 0.02,
            startTime: 14,
        },
        {
            rate: 2.73,
            move: 0.13,
            append: 0.03,
            startTime: 16,
        },
        {
            rate: 3.08,
            move: 0.21,
            append: 0,
            startTime: 18,
        },
        {
            rate: 3.71,
            move: 0.22,
            append: 0.02,
            startTime: 21,
        },
        {
            rate: 4.49,
            move: 0.27,
            append: 0.02,
            startTime: 24,
        },
        {
            rate: 5.09,
            move: 0.32,
            append: 0,
            startTime: 26,
        },
        {
            rate: 5.73,
            move: 0.36,
            append: 0.02,
            startTime: 28,
        },
        {
            rate: 7.37,
            move: 0.44,
            append: 0.03,
            startTime: 32,
        },
        {
            rate: 9.43,
            move: 0.56,
            append: 0.04,
            startTime: 36,
        },
        {
            rate: 12.07,
            move: 0.72,
            append: 0.05,
            startTime: 40,
        },
        {
            rate: 17.44,
            move: 1.02,
            append: 0.1,
            startTime: 46,
        },
        {
            rate: 22.52,
            move: 1.42,
            append: 0.12,
            startTime: 50,
        },
        {
            rate: 31.42,
            move: 2.02,
            append: 0.15,
            startTime: 55,
        },
    ];

    export enum ColorRate {
        RED = 100,
        GREEN = 120,
        BLUE = 200,
        YEELOW = 2000,
    }
}