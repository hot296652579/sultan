import * as $protobuf from "protobufjs";
/** Namespace MST. */
export namespace MST {

    /** ErrorCodeGame enum. */
    enum ErrorCodeGame {
        ERR_SUCCESS = 0,
        ERR_LoginError = 300002,
        ERR_FunctionRepeatedCall = 300003,
        ERR_LoginLockError = 300004,
        ERR_TransferMapError = 300005,
        ERR_LoginUnitDBError = 300006,
        ERR_ChangeUnitNotFound = 300007,
        ERR_PlayerNotAuth = 300008,
        ERR_RoomLost = 300009,
        ERR_CannotBet = 300010,
        ERR_BetError = 300011,
        ERR_Subscription = 300012,
        ERR_CrashAutoBetLimit = 300013,
        ERR_BetCountLimit = 300014,
        ERR_AddAutoBetLimit = 300015,
        ERR_CrashAutoBetStopLose = 300016,
        ERR_CrashAutoBetStopProfit = 300017,
        ERR_CrashAutoBetFinish = 300018,
        ERR_CrashAutoBetNotExist = 300019,
        ERR_SubScriptionRepeated = 300020,
        ERR_GetHashRecordParam = 300021,
        ERR_GetHashRecordNotExit = 300022,
        ERR_InvalidToken = 300023,
        ERR_LogoutFailed = 300024,
        ERR_ChipsInsufficient = 300025,
        ERR_DepositFailed = 300026,
        ERR_WithdrawFailed = 300027,
        ERR_GetBankListFailed = 300028,
        ERR_SignInFailed = 300029,
        ERR_InvalidPhoneNoOrEmail = 300030,
        ERR_InvalidParam = 300031,
        ERR_InvalidCheckCode = 300032,
        ERR_PhoneNoExist = 300033,
        ERR_EmailExist = 300034,
        ERR_ImeiExist = 300035,
        ERR_RegisterFailed = 300036,
        ERR_ResetPasswordFailed = 300037,
        ERR_PlayTinyGameFailed = 300038,
        ERR_ClaimMissionFailed = 300039,
        ERR_ServerIsClosing = 300040
    }

    /** Properties of a HashInfoCell. */
    interface IHashInfoCell {

        /** HashInfoCell ServerSeed */
        ServerSeed?: (string|null);

        /** HashInfoCell ServerHashSeed */
        ServerHashSeed?: (string|null);

        /** HashInfoCell PublicSeed */
        PublicSeed?: (number|Long|null);

        /** HashInfoCell GameNo */
        GameNo?: (number|Long|null);

        /** HashInfoCell RoundHash */
        RoundHash?: (string|null);
    }

    /** Represents a HashInfoCell. */
    class HashInfoCell implements IHashInfoCell {

        /**
         * Constructs a new HashInfoCell.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IHashInfoCell);

        /** HashInfoCell ServerSeed. */
        public ServerSeed: string;

        /** HashInfoCell ServerHashSeed. */
        public ServerHashSeed: string;

        /** HashInfoCell PublicSeed. */
        public PublicSeed: (number|Long);

        /** HashInfoCell GameNo. */
        public GameNo: (number|Long);

        /** HashInfoCell RoundHash. */
        public RoundHash: string;

        /**
         * Creates a new HashInfoCell instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HashInfoCell instance
         */
        public static create(properties?: MST.IHashInfoCell): MST.HashInfoCell;

        /**
         * Encodes the specified HashInfoCell message. Does not implicitly {@link MST.HashInfoCell.verify|verify} messages.
         * @param m HashInfoCell message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IHashInfoCell, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HashInfoCell message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns HashInfoCell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.HashInfoCell;
    }

    /** Properties of a RankInfoCell. */
    interface IRankInfoCell {

        /** RankInfoCell AccountId */
        AccountId?: (number|Long|null);

        /** RankInfoCell Nick */
        Nick?: (string|null);

        /** RankInfoCell Score */
        Score?: (number|Long|null);

        /** RankInfoCell headUrl */
        headUrl?: (string|null);
    }

    /** Represents a RankInfoCell. */
    class RankInfoCell implements IRankInfoCell {

        /**
         * Constructs a new RankInfoCell.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IRankInfoCell);

        /** RankInfoCell AccountId. */
        public AccountId: (number|Long);

        /** RankInfoCell Nick. */
        public Nick: string;

        /** RankInfoCell Score. */
        public Score: (number|Long);

        /** RankInfoCell headUrl. */
        public headUrl: string;

        /**
         * Creates a new RankInfoCell instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankInfoCell instance
         */
        public static create(properties?: MST.IRankInfoCell): MST.RankInfoCell;

        /**
         * Encodes the specified RankInfoCell message. Does not implicitly {@link MST.RankInfoCell.verify|verify} messages.
         * @param m RankInfoCell message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IRankInfoCell, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankInfoCell message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RankInfoCell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.RankInfoCell;
    }

    /** Properties of a CrashBetInfo. */
    interface ICrashBetInfo {

        /** CrashBetInfo player */
        player?: (MST.IUnitInfo|null);

        /** CrashBetInfo BetGold */
        BetGold?: (number|Long|null);

        /** CrashBetInfo Multiple */
        Multiple?: (number|Long|null);
    }

    /** Represents a CrashBetInfo. */
    class CrashBetInfo implements ICrashBetInfo {

        /**
         * Constructs a new CrashBetInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashBetInfo);

        /** CrashBetInfo player. */
        public player?: (MST.IUnitInfo|null);

        /** CrashBetInfo BetGold. */
        public BetGold: (number|Long);

        /** CrashBetInfo Multiple. */
        public Multiple: (number|Long);

        /**
         * Creates a new CrashBetInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashBetInfo instance
         */
        public static create(properties?: MST.ICrashBetInfo): MST.CrashBetInfo;

        /**
         * Encodes the specified CrashBetInfo message. Does not implicitly {@link MST.CrashBetInfo.verify|verify} messages.
         * @param m CrashBetInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashBetInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashBetInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashBetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashBetInfo;
    }

    /** CrashStatus enum. */
    enum CrashStatus {
        StartBet = 0,
        StopBet = 1,
        GameBegin = 2,
        GameOver = 3
    }

    /** CrashMode enum. */
    enum CrashMode {
        Manual = 0,
        Auto = 1
    }

    /** Properties of a CrashAutoBetInfo. */
    interface ICrashAutoBetInfo {

        /** CrashAutoBetInfo BetGold */
        BetGold?: (number|Long|null);

        /** CrashAutoBetInfo BetMultiple */
        BetMultiple?: (number|Long|null);

        /** CrashAutoBetInfo AutoRound */
        AutoRound?: (number|null);

        /** CrashAutoBetInfo StopProfit */
        StopProfit?: (number|Long|null);

        /** CrashAutoBetInfo StopLoss */
        StopLoss?: (number|Long|null);
    }

    /** Represents a CrashAutoBetInfo. */
    class CrashAutoBetInfo implements ICrashAutoBetInfo {

        /**
         * Constructs a new CrashAutoBetInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashAutoBetInfo);

        /** CrashAutoBetInfo BetGold. */
        public BetGold: (number|Long);

        /** CrashAutoBetInfo BetMultiple. */
        public BetMultiple: (number|Long);

        /** CrashAutoBetInfo AutoRound. */
        public AutoRound: number;

        /** CrashAutoBetInfo StopProfit. */
        public StopProfit: (number|Long);

        /** CrashAutoBetInfo StopLoss. */
        public StopLoss: (number|Long);

        /**
         * Creates a new CrashAutoBetInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashAutoBetInfo instance
         */
        public static create(properties?: MST.ICrashAutoBetInfo): MST.CrashAutoBetInfo;

        /**
         * Encodes the specified CrashAutoBetInfo message. Does not implicitly {@link MST.CrashAutoBetInfo.verify|verify} messages.
         * @param m CrashAutoBetInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashAutoBetInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashAutoBetInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashAutoBetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashAutoBetInfo;
    }

    /** Properties of a CrashSeedInfo. */
    interface ICrashSeedInfo {

        /** CrashSeedInfo ServerSeed */
        ServerSeed?: (string|null);

        /** CrashSeedInfo ServerSeedHash */
        ServerSeedHash?: (string|null);

        /** CrashSeedInfo PublicSeed */
        PublicSeed?: (string|null);
    }

    /** Represents a CrashSeedInfo. */
    class CrashSeedInfo implements ICrashSeedInfo {

        /**
         * Constructs a new CrashSeedInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashSeedInfo);

        /** CrashSeedInfo ServerSeed. */
        public ServerSeed: string;

        /** CrashSeedInfo ServerSeedHash. */
        public ServerSeedHash: string;

        /** CrashSeedInfo PublicSeed. */
        public PublicSeed: string;

        /**
         * Creates a new CrashSeedInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashSeedInfo instance
         */
        public static create(properties?: MST.ICrashSeedInfo): MST.CrashSeedInfo;

        /**
         * Encodes the specified CrashSeedInfo message. Does not implicitly {@link MST.CrashSeedInfo.verify|verify} messages.
         * @param m CrashSeedInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashSeedInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashSeedInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashSeedInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashSeedInfo;
    }

    /** Properties of a CrashRecordInfo. */
    interface ICrashRecordInfo {

        /** CrashRecordInfo ID */
        ID?: (number|null);

        /** CrashRecordInfo GameNo */
        GameNo?: (number|null);

        /** CrashRecordInfo Timestamp */
        Timestamp?: (number|Long|null);

        /** CrashRecordInfo Multiple */
        Multiple?: (number|Long|null);

        /** CrashRecordInfo RoundHashCell */
        RoundHashCell?: (MST.ICrashRoudHashCell|null);
    }

    /** Represents a CrashRecordInfo. */
    class CrashRecordInfo implements ICrashRecordInfo {

        /**
         * Constructs a new CrashRecordInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashRecordInfo);

        /** CrashRecordInfo ID. */
        public ID: number;

        /** CrashRecordInfo GameNo. */
        public GameNo: number;

        /** CrashRecordInfo Timestamp. */
        public Timestamp: (number|Long);

        /** CrashRecordInfo Multiple. */
        public Multiple: (number|Long);

        /** CrashRecordInfo RoundHashCell. */
        public RoundHashCell?: (MST.ICrashRoudHashCell|null);

        /**
         * Creates a new CrashRecordInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashRecordInfo instance
         */
        public static create(properties?: MST.ICrashRecordInfo): MST.CrashRecordInfo;

        /**
         * Encodes the specified CrashRecordInfo message. Does not implicitly {@link MST.CrashRecordInfo.verify|verify} messages.
         * @param m CrashRecordInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashRecordInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashRecordInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashRecordInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashRecordInfo;
    }

    /** Properties of a MyRecordInfo. */
    interface IMyRecordInfo {

        /** MyRecordInfo id */
        id?: (number|null);

        /** MyRecordInfo gameNo */
        gameNo?: (number|null);

        /** MyRecordInfo betTimestamp */
        betTimestamp?: (number|Long|null);

        /** MyRecordInfo betMulti */
        betMulti?: (number|Long|null);

        /** MyRecordInfo betGold */
        betGold?: (number|Long|null);

        /** MyRecordInfo incomeGold */
        incomeGold?: (number|Long|null);
    }

    /** Represents a MyRecordInfo. */
    class MyRecordInfo implements IMyRecordInfo {

        /**
         * Constructs a new MyRecordInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IMyRecordInfo);

        /** MyRecordInfo id. */
        public id: number;

        /** MyRecordInfo gameNo. */
        public gameNo: number;

        /** MyRecordInfo betTimestamp. */
        public betTimestamp: (number|Long);

        /** MyRecordInfo betMulti. */
        public betMulti: (number|Long);

        /** MyRecordInfo betGold. */
        public betGold: (number|Long);

        /** MyRecordInfo incomeGold. */
        public incomeGold: (number|Long);

        /**
         * Creates a new MyRecordInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MyRecordInfo instance
         */
        public static create(properties?: MST.IMyRecordInfo): MST.MyRecordInfo;

        /**
         * Encodes the specified MyRecordInfo message. Does not implicitly {@link MST.MyRecordInfo.verify|verify} messages.
         * @param m MyRecordInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IMyRecordInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MyRecordInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MyRecordInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.MyRecordInfo;
    }

    /** Properties of a C2M_GetCrashInfo_Req. */
    interface IC2M_GetCrashInfo_Req {

        /** C2M_GetCrashInfo_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2M_GetCrashInfo_Req. */
    class C2M_GetCrashInfo_Req implements IC2M_GetCrashInfo_Req {

        /**
         * Constructs a new C2M_GetCrashInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_GetCrashInfo_Req);

        /** C2M_GetCrashInfo_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2M_GetCrashInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_GetCrashInfo_Req instance
         */
        public static create(properties?: MST.IC2M_GetCrashInfo_Req): MST.C2M_GetCrashInfo_Req;

        /**
         * Encodes the specified C2M_GetCrashInfo_Req message. Does not implicitly {@link MST.C2M_GetCrashInfo_Req.verify|verify} messages.
         * @param m C2M_GetCrashInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_GetCrashInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_GetCrashInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_GetCrashInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_GetCrashInfo_Req;
    }

    /** Properties of a M2C_GetCrashInfo_Res. */
    interface IM2C_GetCrashInfo_Res {

        /** M2C_GetCrashInfo_Res RpcId */
        RpcId?: (number|null);

        /** M2C_GetCrashInfo_Res Error */
        Error?: (number|null);

        /** M2C_GetCrashInfo_Res Message */
        Message?: (string|null);

        /** M2C_GetCrashInfo_Res Bets */
        Bets?: (MST.ICrashBetInfo[]|null);

        /** M2C_GetCrashInfo_Res Status */
        Status?: (number|null);

        /** M2C_GetCrashInfo_Res StartTimeStamp */
        StartTimeStamp?: (number|Long|null);

        /** M2C_GetCrashInfo_Res MultipleRecord */
        MultipleRecord?: ((number|Long)[]|null);

        /** M2C_GetCrashInfo_Res TotalGold */
        TotalGold?: (number|Long|null);

        /** M2C_GetCrashInfo_Res MyBet */
        MyBet?: (MST.ICrashBetInfo[]|null);

        /** M2C_GetCrashInfo_Res TotalPlayer */
        TotalPlayer?: (number|null);

        /** M2C_GetCrashInfo_Res AtuoBetInfo */
        AtuoBetInfo?: (MST.ICrashAutoBetInfo|null);

        /** M2C_GetCrashInfo_Res SeedInfo */
        SeedInfo?: (MST.ICrashSeedInfo|null);

        /** M2C_GetCrashInfo_Res GameNo */
        GameNo?: (number|null);

        /** M2C_GetCrashInfo_Res Multi */
        Multi?: (number|Long|null);
    }

    /** Represents a M2C_GetCrashInfo_Res. */
    class M2C_GetCrashInfo_Res implements IM2C_GetCrashInfo_Res {

        /**
         * Constructs a new M2C_GetCrashInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_GetCrashInfo_Res);

        /** M2C_GetCrashInfo_Res RpcId. */
        public RpcId: number;

        /** M2C_GetCrashInfo_Res Error. */
        public Error: number;

        /** M2C_GetCrashInfo_Res Message. */
        public Message: string;

        /** M2C_GetCrashInfo_Res Bets. */
        public Bets: MST.ICrashBetInfo[];

        /** M2C_GetCrashInfo_Res Status. */
        public Status: number;

        /** M2C_GetCrashInfo_Res StartTimeStamp. */
        public StartTimeStamp: (number|Long);

        /** M2C_GetCrashInfo_Res MultipleRecord. */
        public MultipleRecord: (number|Long)[];

        /** M2C_GetCrashInfo_Res TotalGold. */
        public TotalGold: (number|Long);

        /** M2C_GetCrashInfo_Res MyBet. */
        public MyBet: MST.ICrashBetInfo[];

        /** M2C_GetCrashInfo_Res TotalPlayer. */
        public TotalPlayer: number;

        /** M2C_GetCrashInfo_Res AtuoBetInfo. */
        public AtuoBetInfo?: (MST.ICrashAutoBetInfo|null);

        /** M2C_GetCrashInfo_Res SeedInfo. */
        public SeedInfo?: (MST.ICrashSeedInfo|null);

        /** M2C_GetCrashInfo_Res GameNo. */
        public GameNo: number;

        /** M2C_GetCrashInfo_Res Multi. */
        public Multi: (number|Long);

        /**
         * Creates a new M2C_GetCrashInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_GetCrashInfo_Res instance
         */
        public static create(properties?: MST.IM2C_GetCrashInfo_Res): MST.M2C_GetCrashInfo_Res;

        /**
         * Encodes the specified M2C_GetCrashInfo_Res message. Does not implicitly {@link MST.M2C_GetCrashInfo_Res.verify|verify} messages.
         * @param m M2C_GetCrashInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_GetCrashInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_GetCrashInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_GetCrashInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_GetCrashInfo_Res;
    }

    /** Properties of a M2C_CrashStart_mes. */
    interface IM2C_CrashStart_mes {

        /** M2C_CrashStart_mes StartTimeStamp */
        StartTimeStamp?: (number|Long|null);

        /** M2C_CrashStart_mes Multi */
        Multi?: (number|Long|null);
    }

    /** Represents a M2C_CrashStart_mes. */
    class M2C_CrashStart_mes implements IM2C_CrashStart_mes {

        /**
         * Constructs a new M2C_CrashStart_mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashStart_mes);

        /** M2C_CrashStart_mes StartTimeStamp. */
        public StartTimeStamp: (number|Long);

        /** M2C_CrashStart_mes Multi. */
        public Multi: (number|Long);

        /**
         * Creates a new M2C_CrashStart_mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashStart_mes instance
         */
        public static create(properties?: MST.IM2C_CrashStart_mes): MST.M2C_CrashStart_mes;

        /**
         * Encodes the specified M2C_CrashStart_mes message. Does not implicitly {@link MST.M2C_CrashStart_mes.verify|verify} messages.
         * @param m M2C_CrashStart_mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashStart_mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashStart_mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashStart_mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashStart_mes;
    }

    /** Properties of a C2M_MyCrashBet_Req. */
    interface IC2M_MyCrashBet_Req {

        /** C2M_MyCrashBet_Req RpcId */
        RpcId?: (number|null);

        /** C2M_MyCrashBet_Req BetMode */
        BetMode?: (number|null);

        /** C2M_MyCrashBet_Req BetGold */
        BetGold?: (number|Long|null);

        /** C2M_MyCrashBet_Req BetMultiple */
        BetMultiple?: (number|Long|null);

        /** C2M_MyCrashBet_Req AutoRound */
        AutoRound?: (number|null);

        /** C2M_MyCrashBet_Req StopProfit */
        StopProfit?: (number|Long|null);

        /** C2M_MyCrashBet_Req StopLoss */
        StopLoss?: (number|Long|null);
    }

    /** Represents a C2M_MyCrashBet_Req. */
    class C2M_MyCrashBet_Req implements IC2M_MyCrashBet_Req {

        /**
         * Constructs a new C2M_MyCrashBet_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_MyCrashBet_Req);

        /** C2M_MyCrashBet_Req RpcId. */
        public RpcId: number;

        /** C2M_MyCrashBet_Req BetMode. */
        public BetMode: number;

        /** C2M_MyCrashBet_Req BetGold. */
        public BetGold: (number|Long);

        /** C2M_MyCrashBet_Req BetMultiple. */
        public BetMultiple: (number|Long);

        /** C2M_MyCrashBet_Req AutoRound. */
        public AutoRound: number;

        /** C2M_MyCrashBet_Req StopProfit. */
        public StopProfit: (number|Long);

        /** C2M_MyCrashBet_Req StopLoss. */
        public StopLoss: (number|Long);

        /**
         * Creates a new C2M_MyCrashBet_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_MyCrashBet_Req instance
         */
        public static create(properties?: MST.IC2M_MyCrashBet_Req): MST.C2M_MyCrashBet_Req;

        /**
         * Encodes the specified C2M_MyCrashBet_Req message. Does not implicitly {@link MST.C2M_MyCrashBet_Req.verify|verify} messages.
         * @param m C2M_MyCrashBet_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_MyCrashBet_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_MyCrashBet_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_MyCrashBet_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_MyCrashBet_Req;
    }

    /** Properties of a M2C_MyCrashBet_Res. */
    interface IM2C_MyCrashBet_Res {

        /** M2C_MyCrashBet_Res RpcId */
        RpcId?: (number|null);

        /** M2C_MyCrashBet_Res Error */
        Error?: (number|null);

        /** M2C_MyCrashBet_Res Message */
        Message?: (string|null);

        /** M2C_MyCrashBet_Res Gold */
        Gold?: (number|Long|null);

        /** M2C_MyCrashBet_Res Multiple */
        Multiple?: (number|Long|null);

        /** M2C_MyCrashBet_Res BetMode */
        BetMode?: (number|null);
    }

    /** Represents a M2C_MyCrashBet_Res. */
    class M2C_MyCrashBet_Res implements IM2C_MyCrashBet_Res {

        /**
         * Constructs a new M2C_MyCrashBet_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_MyCrashBet_Res);

        /** M2C_MyCrashBet_Res RpcId. */
        public RpcId: number;

        /** M2C_MyCrashBet_Res Error. */
        public Error: number;

        /** M2C_MyCrashBet_Res Message. */
        public Message: string;

        /** M2C_MyCrashBet_Res Gold. */
        public Gold: (number|Long);

        /** M2C_MyCrashBet_Res Multiple. */
        public Multiple: (number|Long);

        /** M2C_MyCrashBet_Res BetMode. */
        public BetMode: number;

        /**
         * Creates a new M2C_MyCrashBet_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_MyCrashBet_Res instance
         */
        public static create(properties?: MST.IM2C_MyCrashBet_Res): MST.M2C_MyCrashBet_Res;

        /**
         * Encodes the specified M2C_MyCrashBet_Res message. Does not implicitly {@link MST.M2C_MyCrashBet_Res.verify|verify} messages.
         * @param m M2C_MyCrashBet_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_MyCrashBet_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_MyCrashBet_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_MyCrashBet_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_MyCrashBet_Res;
    }

    /** Properties of a M2C_CrashBet_Mes. */
    interface IM2C_CrashBet_Mes {

        /** M2C_CrashBet_Mes Bets */
        Bets?: (MST.ICrashBetInfo[]|null);

        /** M2C_CrashBet_Mes TotalGold */
        TotalGold?: (number|Long|null);

        /** M2C_CrashBet_Mes TotalPlayer */
        TotalPlayer?: (number|null);
    }

    /** Represents a M2C_CrashBet_Mes. */
    class M2C_CrashBet_Mes implements IM2C_CrashBet_Mes {

        /**
         * Constructs a new M2C_CrashBet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashBet_Mes);

        /** M2C_CrashBet_Mes Bets. */
        public Bets: MST.ICrashBetInfo[];

        /** M2C_CrashBet_Mes TotalGold. */
        public TotalGold: (number|Long);

        /** M2C_CrashBet_Mes TotalPlayer. */
        public TotalPlayer: number;

        /**
         * Creates a new M2C_CrashBet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashBet_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashBet_Mes): MST.M2C_CrashBet_Mes;

        /**
         * Encodes the specified M2C_CrashBet_Mes message. Does not implicitly {@link MST.M2C_CrashBet_Mes.verify|verify} messages.
         * @param m M2C_CrashBet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashBet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashBet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashBet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashBet_Mes;
    }

    /** Properties of a CrashEscape. */
    interface ICrashEscape {

        /** CrashEscape UnitId */
        UnitId?: (number|Long|null);

        /** CrashEscape Nick */
        Nick?: (string|null);

        /** CrashEscape Multiples */
        Multiples?: (number|Long|null);
    }

    /** Represents a CrashEscape. */
    class CrashEscape implements ICrashEscape {

        /**
         * Constructs a new CrashEscape.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashEscape);

        /** CrashEscape UnitId. */
        public UnitId: (number|Long);

        /** CrashEscape Nick. */
        public Nick: string;

        /** CrashEscape Multiples. */
        public Multiples: (number|Long);

        /**
         * Creates a new CrashEscape instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashEscape instance
         */
        public static create(properties?: MST.ICrashEscape): MST.CrashEscape;

        /**
         * Encodes the specified CrashEscape message. Does not implicitly {@link MST.CrashEscape.verify|verify} messages.
         * @param m CrashEscape message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashEscape, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashEscape message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashEscape
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashEscape;
    }

    /** Properties of a M2C_CrashStop_Mes. */
    interface IM2C_CrashStop_Mes {

        /** M2C_CrashStop_Mes Multiples */
        Multiples?: (number|Long|null);

        /** M2C_CrashStop_Mes ExplosionTimeStamp */
        ExplosionTimeStamp?: (number|Long|null);

        /** M2C_CrashStop_Mes HashResult */
        HashResult?: (string|null);

        /** M2C_CrashStop_Mes Acak */
        Acak?: (number|null);
    }

    /** Represents a M2C_CrashStop_Mes. */
    class M2C_CrashStop_Mes implements IM2C_CrashStop_Mes {

        /**
         * Constructs a new M2C_CrashStop_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashStop_Mes);

        /** M2C_CrashStop_Mes Multiples. */
        public Multiples: (number|Long);

        /** M2C_CrashStop_Mes ExplosionTimeStamp. */
        public ExplosionTimeStamp: (number|Long);

        /** M2C_CrashStop_Mes HashResult. */
        public HashResult: string;

        /** M2C_CrashStop_Mes Acak. */
        public Acak: number;

        /**
         * Creates a new M2C_CrashStop_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashStop_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashStop_Mes): MST.M2C_CrashStop_Mes;

        /**
         * Encodes the specified M2C_CrashStop_Mes message. Does not implicitly {@link MST.M2C_CrashStop_Mes.verify|verify} messages.
         * @param m M2C_CrashStop_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashStop_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashStop_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashStop_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashStop_Mes;
    }

    /** Properties of a M2C_CrashStartBet_Mes. */
    interface IM2C_CrashStartBet_Mes {

        /** M2C_CrashStartBet_Mes StopBetTimeStamp */
        StopBetTimeStamp?: (number|Long|null);

        /** M2C_CrashStartBet_Mes GameNo */
        GameNo?: (number|null);
    }

    /** Represents a M2C_CrashStartBet_Mes. */
    class M2C_CrashStartBet_Mes implements IM2C_CrashStartBet_Mes {

        /**
         * Constructs a new M2C_CrashStartBet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashStartBet_Mes);

        /** M2C_CrashStartBet_Mes StopBetTimeStamp. */
        public StopBetTimeStamp: (number|Long);

        /** M2C_CrashStartBet_Mes GameNo. */
        public GameNo: number;

        /**
         * Creates a new M2C_CrashStartBet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashStartBet_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashStartBet_Mes): MST.M2C_CrashStartBet_Mes;

        /**
         * Encodes the specified M2C_CrashStartBet_Mes message. Does not implicitly {@link MST.M2C_CrashStartBet_Mes.verify|verify} messages.
         * @param m M2C_CrashStartBet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashStartBet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashStartBet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashStartBet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashStartBet_Mes;
    }

    /** Properties of a M2C_CrashEscape_Mes. */
    interface IM2C_CrashEscape_Mes {

        /** M2C_CrashEscape_Mes Players */
        Players?: (MST.ICrashEscape[]|null);
    }

    /** Represents a M2C_CrashEscape_Mes. */
    class M2C_CrashEscape_Mes implements IM2C_CrashEscape_Mes {

        /**
         * Constructs a new M2C_CrashEscape_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashEscape_Mes);

        /** M2C_CrashEscape_Mes Players. */
        public Players: MST.ICrashEscape[];

        /**
         * Creates a new M2C_CrashEscape_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashEscape_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashEscape_Mes): MST.M2C_CrashEscape_Mes;

        /**
         * Encodes the specified M2C_CrashEscape_Mes message. Does not implicitly {@link MST.M2C_CrashEscape_Mes.verify|verify} messages.
         * @param m M2C_CrashEscape_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashEscape_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashEscape_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashEscape_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashEscape_Mes;
    }

    /** Properties of a M2C_CrashStopBet_Mes. */
    interface IM2C_CrashStopBet_Mes {
    }

    /** Represents a M2C_CrashStopBet_Mes. */
    class M2C_CrashStopBet_Mes implements IM2C_CrashStopBet_Mes {

        /**
         * Constructs a new M2C_CrashStopBet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashStopBet_Mes);

        /**
         * Creates a new M2C_CrashStopBet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashStopBet_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashStopBet_Mes): MST.M2C_CrashStopBet_Mes;

        /**
         * Encodes the specified M2C_CrashStopBet_Mes message. Does not implicitly {@link MST.M2C_CrashStopBet_Mes.verify|verify} messages.
         * @param m M2C_CrashStopBet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashStopBet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashStopBet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashStopBet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashStopBet_Mes;
    }

    /** Properties of a C2M_CrashCancelAutoBet_Req. */
    interface IC2M_CrashCancelAutoBet_Req {

        /** C2M_CrashCancelAutoBet_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2M_CrashCancelAutoBet_Req. */
    class C2M_CrashCancelAutoBet_Req implements IC2M_CrashCancelAutoBet_Req {

        /**
         * Constructs a new C2M_CrashCancelAutoBet_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_CrashCancelAutoBet_Req);

        /** C2M_CrashCancelAutoBet_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2M_CrashCancelAutoBet_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_CrashCancelAutoBet_Req instance
         */
        public static create(properties?: MST.IC2M_CrashCancelAutoBet_Req): MST.C2M_CrashCancelAutoBet_Req;

        /**
         * Encodes the specified C2M_CrashCancelAutoBet_Req message. Does not implicitly {@link MST.C2M_CrashCancelAutoBet_Req.verify|verify} messages.
         * @param m C2M_CrashCancelAutoBet_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_CrashCancelAutoBet_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_CrashCancelAutoBet_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_CrashCancelAutoBet_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_CrashCancelAutoBet_Req;
    }

    /** Properties of a M2C_CrashCancelAutoBet_Res. */
    interface IM2C_CrashCancelAutoBet_Res {

        /** M2C_CrashCancelAutoBet_Res RpcId */
        RpcId?: (number|null);

        /** M2C_CrashCancelAutoBet_Res Error */
        Error?: (number|null);

        /** M2C_CrashCancelAutoBet_Res Message */
        Message?: (string|null);
    }

    /** Represents a M2C_CrashCancelAutoBet_Res. */
    class M2C_CrashCancelAutoBet_Res implements IM2C_CrashCancelAutoBet_Res {

        /**
         * Constructs a new M2C_CrashCancelAutoBet_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashCancelAutoBet_Res);

        /** M2C_CrashCancelAutoBet_Res RpcId. */
        public RpcId: number;

        /** M2C_CrashCancelAutoBet_Res Error. */
        public Error: number;

        /** M2C_CrashCancelAutoBet_Res Message. */
        public Message: string;

        /**
         * Creates a new M2C_CrashCancelAutoBet_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashCancelAutoBet_Res instance
         */
        public static create(properties?: MST.IM2C_CrashCancelAutoBet_Res): MST.M2C_CrashCancelAutoBet_Res;

        /**
         * Encodes the specified M2C_CrashCancelAutoBet_Res message. Does not implicitly {@link MST.M2C_CrashCancelAutoBet_Res.verify|verify} messages.
         * @param m M2C_CrashCancelAutoBet_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashCancelAutoBet_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashCancelAutoBet_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashCancelAutoBet_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashCancelAutoBet_Res;
    }

    /** Properties of a M2C_CrashCancelAutoBet_Mes. */
    interface IM2C_CrashCancelAutoBet_Mes {

        /** M2C_CrashCancelAutoBet_Mes Error */
        Error?: (number|null);
    }

    /** Represents a M2C_CrashCancelAutoBet_Mes. */
    class M2C_CrashCancelAutoBet_Mes implements IM2C_CrashCancelAutoBet_Mes {

        /**
         * Constructs a new M2C_CrashCancelAutoBet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashCancelAutoBet_Mes);

        /** M2C_CrashCancelAutoBet_Mes Error. */
        public Error: number;

        /**
         * Creates a new M2C_CrashCancelAutoBet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashCancelAutoBet_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashCancelAutoBet_Mes): MST.M2C_CrashCancelAutoBet_Mes;

        /**
         * Encodes the specified M2C_CrashCancelAutoBet_Mes message. Does not implicitly {@link MST.M2C_CrashCancelAutoBet_Mes.verify|verify} messages.
         * @param m M2C_CrashCancelAutoBet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashCancelAutoBet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashCancelAutoBet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashCancelAutoBet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashCancelAutoBet_Mes;
    }

    /** Properties of a M2C_CrashHash_Mes. */
    interface IM2C_CrashHash_Mes {

        /** M2C_CrashHash_Mes SeedInfo */
        SeedInfo?: (MST.ICrashSeedInfo|null);
    }

    /** Represents a M2C_CrashHash_Mes. */
    class M2C_CrashHash_Mes implements IM2C_CrashHash_Mes {

        /**
         * Constructs a new M2C_CrashHash_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashHash_Mes);

        /** M2C_CrashHash_Mes SeedInfo. */
        public SeedInfo?: (MST.ICrashSeedInfo|null);

        /**
         * Creates a new M2C_CrashHash_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashHash_Mes instance
         */
        public static create(properties?: MST.IM2C_CrashHash_Mes): MST.M2C_CrashHash_Mes;

        /**
         * Encodes the specified M2C_CrashHash_Mes message. Does not implicitly {@link MST.M2C_CrashHash_Mes.verify|verify} messages.
         * @param m M2C_CrashHash_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashHash_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashHash_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashHash_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashHash_Mes;
    }

    /** Properties of a CrashRoudHashCell. */
    interface ICrashRoudHashCell {

        /** CrashRoudHashCell RoundHash */
        RoundHash?: (string|null);

        /** CrashRoudHashCell Acak */
        Acak?: (number|null);
    }

    /** Represents a CrashRoudHashCell. */
    class CrashRoudHashCell implements ICrashRoudHashCell {

        /**
         * Constructs a new CrashRoudHashCell.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ICrashRoudHashCell);

        /** CrashRoudHashCell RoundHash. */
        public RoundHash: string;

        /** CrashRoudHashCell Acak. */
        public Acak: number;

        /**
         * Creates a new CrashRoudHashCell instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashRoudHashCell instance
         */
        public static create(properties?: MST.ICrashRoudHashCell): MST.CrashRoudHashCell;

        /**
         * Encodes the specified CrashRoudHashCell message. Does not implicitly {@link MST.CrashRoudHashCell.verify|verify} messages.
         * @param m CrashRoudHashCell message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ICrashRoudHashCell, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashRoudHashCell message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CrashRoudHashCell
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.CrashRoudHashCell;
    }

    /** Properties of a C2M_CrashHashRecord_Req. */
    interface IC2M_CrashHashRecord_Req {

        /** C2M_CrashHashRecord_Req RpcId */
        RpcId?: (number|null);

        /** C2M_CrashHashRecord_Req Date */
        Date?: (string|null);

        /** C2M_CrashHashRecord_Req ID */
        ID?: (number|null);

        /** C2M_CrashHashRecord_Req PageNumber */
        PageNumber?: (number|null);
    }

    /** Represents a C2M_CrashHashRecord_Req. */
    class C2M_CrashHashRecord_Req implements IC2M_CrashHashRecord_Req {

        /**
         * Constructs a new C2M_CrashHashRecord_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_CrashHashRecord_Req);

        /** C2M_CrashHashRecord_Req RpcId. */
        public RpcId: number;

        /** C2M_CrashHashRecord_Req Date. */
        public Date: string;

        /** C2M_CrashHashRecord_Req ID. */
        public ID: number;

        /** C2M_CrashHashRecord_Req PageNumber. */
        public PageNumber: number;

        /**
         * Creates a new C2M_CrashHashRecord_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_CrashHashRecord_Req instance
         */
        public static create(properties?: MST.IC2M_CrashHashRecord_Req): MST.C2M_CrashHashRecord_Req;

        /**
         * Encodes the specified C2M_CrashHashRecord_Req message. Does not implicitly {@link MST.C2M_CrashHashRecord_Req.verify|verify} messages.
         * @param m C2M_CrashHashRecord_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_CrashHashRecord_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_CrashHashRecord_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_CrashHashRecord_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_CrashHashRecord_Req;
    }

    /** Properties of a M2C_CrashHashRecord_Res. */
    interface IM2C_CrashHashRecord_Res {

        /** M2C_CrashHashRecord_Res RpcId */
        RpcId?: (number|null);

        /** M2C_CrashHashRecord_Res Error */
        Error?: (number|null);

        /** M2C_CrashHashRecord_Res Message */
        Message?: (string|null);

        /** M2C_CrashHashRecord_Res Date */
        Date?: (string|null);

        /** M2C_CrashHashRecord_Res ID */
        ID?: (number|null);

        /** M2C_CrashHashRecord_Res SeedInfo */
        SeedInfo?: (MST.ICrashSeedInfo|null);

        /** M2C_CrashHashRecord_Res RecordInfo */
        RecordInfo?: (MST.ICrashRecordInfo[]|null);
    }

    /** Represents a M2C_CrashHashRecord_Res. */
    class M2C_CrashHashRecord_Res implements IM2C_CrashHashRecord_Res {

        /**
         * Constructs a new M2C_CrashHashRecord_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CrashHashRecord_Res);

        /** M2C_CrashHashRecord_Res RpcId. */
        public RpcId: number;

        /** M2C_CrashHashRecord_Res Error. */
        public Error: number;

        /** M2C_CrashHashRecord_Res Message. */
        public Message: string;

        /** M2C_CrashHashRecord_Res Date. */
        public Date: string;

        /** M2C_CrashHashRecord_Res ID. */
        public ID: number;

        /** M2C_CrashHashRecord_Res SeedInfo. */
        public SeedInfo?: (MST.ICrashSeedInfo|null);

        /** M2C_CrashHashRecord_Res RecordInfo. */
        public RecordInfo: MST.ICrashRecordInfo[];

        /**
         * Creates a new M2C_CrashHashRecord_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CrashHashRecord_Res instance
         */
        public static create(properties?: MST.IM2C_CrashHashRecord_Res): MST.M2C_CrashHashRecord_Res;

        /**
         * Encodes the specified M2C_CrashHashRecord_Res message. Does not implicitly {@link MST.M2C_CrashHashRecord_Res.verify|verify} messages.
         * @param m M2C_CrashHashRecord_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CrashHashRecord_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CrashHashRecord_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CrashHashRecord_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CrashHashRecord_Res;
    }

    /** Properties of a C2S_CrashMyRecord. */
    interface IC2S_CrashMyRecord {

        /** C2S_CrashMyRecord serial */
        serial?: (number|null);

        /** C2S_CrashMyRecord id */
        id?: (number|null);

        /** C2S_CrashMyRecord count */
        count?: (number|null);
    }

    /** Represents a C2S_CrashMyRecord. */
    class C2S_CrashMyRecord implements IC2S_CrashMyRecord {

        /**
         * Constructs a new C2S_CrashMyRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_CrashMyRecord);

        /** C2S_CrashMyRecord serial. */
        public serial: number;

        /** C2S_CrashMyRecord id. */
        public id: number;

        /** C2S_CrashMyRecord count. */
        public count: number;

        /**
         * Creates a new C2S_CrashMyRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_CrashMyRecord instance
         */
        public static create(properties?: MST.IC2S_CrashMyRecord): MST.C2S_CrashMyRecord;

        /**
         * Encodes the specified C2S_CrashMyRecord message. Does not implicitly {@link MST.C2S_CrashMyRecord.verify|verify} messages.
         * @param m C2S_CrashMyRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_CrashMyRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_CrashMyRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_CrashMyRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_CrashMyRecord;
    }

    /** Properties of a S2C_CrashMyRecord. */
    interface IS2C_CrashMyRecord {

        /** S2C_CrashMyRecord serial */
        serial?: (number|null);

        /** S2C_CrashMyRecord code */
        code?: (number|null);

        /** S2C_CrashMyRecord id */
        id?: (number|null);

        /** S2C_CrashMyRecord myRecordInfo */
        myRecordInfo?: (MST.IMyRecordInfo[]|null);
    }

    /** Represents a S2C_CrashMyRecord. */
    class S2C_CrashMyRecord implements IS2C_CrashMyRecord {

        /**
         * Constructs a new S2C_CrashMyRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_CrashMyRecord);

        /** S2C_CrashMyRecord serial. */
        public serial: number;

        /** S2C_CrashMyRecord code. */
        public code: number;

        /** S2C_CrashMyRecord id. */
        public id: number;

        /** S2C_CrashMyRecord myRecordInfo. */
        public myRecordInfo: MST.IMyRecordInfo[];

        /**
         * Creates a new S2C_CrashMyRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_CrashMyRecord instance
         */
        public static create(properties?: MST.IS2C_CrashMyRecord): MST.S2C_CrashMyRecord;

        /**
         * Encodes the specified S2C_CrashMyRecord message. Does not implicitly {@link MST.S2C_CrashMyRecord.verify|verify} messages.
         * @param m S2C_CrashMyRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_CrashMyRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_CrashMyRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_CrashMyRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_CrashMyRecord;
    }

    /** Properties of a C2G_EnterMap_Req. */
    interface IC2G_EnterMap_Req {

        /** C2G_EnterMap_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2G_EnterMap_Req. */
    class C2G_EnterMap_Req implements IC2G_EnterMap_Req {

        /**
         * Constructs a new C2G_EnterMap_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2G_EnterMap_Req);

        /** C2G_EnterMap_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2G_EnterMap_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2G_EnterMap_Req instance
         */
        public static create(properties?: MST.IC2G_EnterMap_Req): MST.C2G_EnterMap_Req;

        /**
         * Encodes the specified C2G_EnterMap_Req message. Does not implicitly {@link MST.C2G_EnterMap_Req.verify|verify} messages.
         * @param m C2G_EnterMap_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2G_EnterMap_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2G_EnterMap_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2G_EnterMap_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2G_EnterMap_Req;
    }

    /** Properties of a G2C_EnterMap_Res. */
    interface IG2C_EnterMap_Res {

        /** G2C_EnterMap_Res RpcId */
        RpcId?: (number|null);

        /** G2C_EnterMap_Res Error */
        Error?: (number|null);

        /** G2C_EnterMap_Res Message */
        Message?: (string|null);

        /** G2C_EnterMap_Res MyId */
        MyId?: (number|Long|null);
    }

    /** Represents a G2C_EnterMap_Res. */
    class G2C_EnterMap_Res implements IG2C_EnterMap_Res {

        /**
         * Constructs a new G2C_EnterMap_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IG2C_EnterMap_Res);

        /** G2C_EnterMap_Res RpcId. */
        public RpcId: number;

        /** G2C_EnterMap_Res Error. */
        public Error: number;

        /** G2C_EnterMap_Res Message. */
        public Message: string;

        /** G2C_EnterMap_Res MyId. */
        public MyId: (number|Long);

        /**
         * Creates a new G2C_EnterMap_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G2C_EnterMap_Res instance
         */
        public static create(properties?: MST.IG2C_EnterMap_Res): MST.G2C_EnterMap_Res;

        /**
         * Encodes the specified G2C_EnterMap_Res message. Does not implicitly {@link MST.G2C_EnterMap_Res.verify|verify} messages.
         * @param m G2C_EnterMap_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IG2C_EnterMap_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G2C_EnterMap_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns G2C_EnterMap_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.G2C_EnterMap_Res;
    }

    /** Properties of an UnitInfo. */
    interface IUnitInfo {

        /** UnitInfo UnitId */
        UnitId?: (number|Long|null);

        /** UnitInfo Nick */
        Nick?: (string|null);

        /** UnitInfo Gold */
        Gold?: (number|Long|null);

        /** UnitInfo HeaderUrl */
        HeaderUrl?: (string|null);
    }

    /** Represents an UnitInfo. */
    class UnitInfo implements IUnitInfo {

        /**
         * Constructs a new UnitInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IUnitInfo);

        /** UnitInfo UnitId. */
        public UnitId: (number|Long);

        /** UnitInfo Nick. */
        public Nick: string;

        /** UnitInfo Gold. */
        public Gold: (number|Long);

        /** UnitInfo HeaderUrl. */
        public HeaderUrl: string;

        /**
         * Creates a new UnitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnitInfo instance
         */
        public static create(properties?: MST.IUnitInfo): MST.UnitInfo;

        /**
         * Encodes the specified UnitInfo message. Does not implicitly {@link MST.UnitInfo.verify|verify} messages.
         * @param m UnitInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IUnitInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnitInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns UnitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.UnitInfo;
    }

    /** Properties of a RoomInfo. */
    interface IRoomInfo {

        /** RoomInfo id */
        id?: (number|Long|null);

        /** RoomInfo Name */
        Name?: (string|null);
    }

    /** Represents a RoomInfo. */
    class RoomInfo implements IRoomInfo {

        /**
         * Constructs a new RoomInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IRoomInfo);

        /** RoomInfo id. */
        public id: (number|Long);

        /** RoomInfo Name. */
        public Name: string;

        /**
         * Creates a new RoomInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomInfo instance
         */
        public static create(properties?: MST.IRoomInfo): MST.RoomInfo;

        /**
         * Encodes the specified RoomInfo message. Does not implicitly {@link MST.RoomInfo.verify|verify} messages.
         * @param m RoomInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IRoomInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RoomInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.RoomInfo;
    }

    /** Properties of a C2G_Ping_Req. */
    interface IC2G_Ping_Req {

        /** C2G_Ping_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2G_Ping_Req. */
    class C2G_Ping_Req implements IC2G_Ping_Req {

        /**
         * Constructs a new C2G_Ping_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2G_Ping_Req);

        /** C2G_Ping_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2G_Ping_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2G_Ping_Req instance
         */
        public static create(properties?: MST.IC2G_Ping_Req): MST.C2G_Ping_Req;

        /**
         * Encodes the specified C2G_Ping_Req message. Does not implicitly {@link MST.C2G_Ping_Req.verify|verify} messages.
         * @param m C2G_Ping_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2G_Ping_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2G_Ping_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2G_Ping_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2G_Ping_Req;
    }

    /** Properties of a G2C_Ping_Res. */
    interface IG2C_Ping_Res {

        /** G2C_Ping_Res RpcId */
        RpcId?: (number|null);

        /** G2C_Ping_Res Error */
        Error?: (number|null);

        /** G2C_Ping_Res Message */
        Message?: (string|null);

        /** G2C_Ping_Res Time */
        Time?: (number|Long|null);
    }

    /** Represents a G2C_Ping_Res. */
    class G2C_Ping_Res implements IG2C_Ping_Res {

        /**
         * Constructs a new G2C_Ping_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IG2C_Ping_Res);

        /** G2C_Ping_Res RpcId. */
        public RpcId: number;

        /** G2C_Ping_Res Error. */
        public Error: number;

        /** G2C_Ping_Res Message. */
        public Message: string;

        /** G2C_Ping_Res Time. */
        public Time: (number|Long);

        /**
         * Creates a new G2C_Ping_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G2C_Ping_Res instance
         */
        public static create(properties?: MST.IG2C_Ping_Res): MST.G2C_Ping_Res;

        /**
         * Encodes the specified G2C_Ping_Res message. Does not implicitly {@link MST.G2C_Ping_Res.verify|verify} messages.
         * @param m G2C_Ping_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IG2C_Ping_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G2C_Ping_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns G2C_Ping_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.G2C_Ping_Res;
    }

    /** Properties of a C2G_LoginGate_Req. */
    interface IC2G_LoginGate_Req {

        /** C2G_LoginGate_Req RpcId */
        RpcId?: (number|null);

        /** C2G_LoginGate_Req MachineCode */
        MachineCode?: (string|null);

        /** C2G_LoginGate_Req OS */
        OS?: (number|null);

        /** C2G_LoginGate_Req Description */
        Description?: (string|null);
    }

    /** Represents a C2G_LoginGate_Req. */
    class C2G_LoginGate_Req implements IC2G_LoginGate_Req {

        /**
         * Constructs a new C2G_LoginGate_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2G_LoginGate_Req);

        /** C2G_LoginGate_Req RpcId. */
        public RpcId: number;

        /** C2G_LoginGate_Req MachineCode. */
        public MachineCode: string;

        /** C2G_LoginGate_Req OS. */
        public OS: number;

        /** C2G_LoginGate_Req Description. */
        public Description: string;

        /**
         * Creates a new C2G_LoginGate_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2G_LoginGate_Req instance
         */
        public static create(properties?: MST.IC2G_LoginGate_Req): MST.C2G_LoginGate_Req;

        /**
         * Encodes the specified C2G_LoginGate_Req message. Does not implicitly {@link MST.C2G_LoginGate_Req.verify|verify} messages.
         * @param m C2G_LoginGate_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2G_LoginGate_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2G_LoginGate_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2G_LoginGate_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2G_LoginGate_Req;
    }

    /** Properties of a G2C_LoginGate_Res. */
    interface IG2C_LoginGate_Res {

        /** G2C_LoginGate_Res RpcId */
        RpcId?: (number|null);

        /** G2C_LoginGate_Res Error */
        Error?: (number|null);

        /** G2C_LoginGate_Res Message */
        Message?: (string|null);

        /** G2C_LoginGate_Res Token */
        Token?: (string|null);

        /** G2C_LoginGate_Res Rooms */
        Rooms?: (MST.IRoomInfo[]|null);
    }

    /** Represents a G2C_LoginGate_Res. */
    class G2C_LoginGate_Res implements IG2C_LoginGate_Res {

        /**
         * Constructs a new G2C_LoginGate_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IG2C_LoginGate_Res);

        /** G2C_LoginGate_Res RpcId. */
        public RpcId: number;

        /** G2C_LoginGate_Res Error. */
        public Error: number;

        /** G2C_LoginGate_Res Message. */
        public Message: string;

        /** G2C_LoginGate_Res Token. */
        public Token: string;

        /** G2C_LoginGate_Res Rooms. */
        public Rooms: MST.IRoomInfo[];

        /**
         * Creates a new G2C_LoginGate_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G2C_LoginGate_Res instance
         */
        public static create(properties?: MST.IG2C_LoginGate_Res): MST.G2C_LoginGate_Res;

        /**
         * Encodes the specified G2C_LoginGate_Res message. Does not implicitly {@link MST.G2C_LoginGate_Res.verify|verify} messages.
         * @param m G2C_LoginGate_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IG2C_LoginGate_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G2C_LoginGate_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns G2C_LoginGate_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.G2C_LoginGate_Res;
    }

    /** Properties of a G2C_SystemError_Mes. */
    interface IG2C_SystemError_Mes {

        /** G2C_SystemError_Mes Error */
        Error?: (number|null);

        /** G2C_SystemError_Mes Message */
        Message?: (string|null);
    }

    /** Represents a G2C_SystemError_Mes. */
    class G2C_SystemError_Mes implements IG2C_SystemError_Mes {

        /**
         * Constructs a new G2C_SystemError_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IG2C_SystemError_Mes);

        /** G2C_SystemError_Mes Error. */
        public Error: number;

        /** G2C_SystemError_Mes Message. */
        public Message: string;

        /**
         * Creates a new G2C_SystemError_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G2C_SystemError_Mes instance
         */
        public static create(properties?: MST.IG2C_SystemError_Mes): MST.G2C_SystemError_Mes;

        /**
         * Encodes the specified G2C_SystemError_Mes message. Does not implicitly {@link MST.G2C_SystemError_Mes.verify|verify} messages.
         * @param m G2C_SystemError_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IG2C_SystemError_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a G2C_SystemError_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns G2C_SystemError_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.G2C_SystemError_Mes;
    }

    /** Properties of a C2L_BindMailBox_Req. */
    interface IC2L_BindMailBox_Req {

        /** C2L_BindMailBox_Req RpcId */
        RpcId?: (number|null);

        /** C2L_BindMailBox_Req MailAddress */
        MailAddress?: (string|null);
    }

    /** Represents a C2L_BindMailBox_Req. */
    class C2L_BindMailBox_Req implements IC2L_BindMailBox_Req {

        /**
         * Constructs a new C2L_BindMailBox_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_BindMailBox_Req);

        /** C2L_BindMailBox_Req RpcId. */
        public RpcId: number;

        /** C2L_BindMailBox_Req MailAddress. */
        public MailAddress: string;

        /**
         * Creates a new C2L_BindMailBox_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_BindMailBox_Req instance
         */
        public static create(properties?: MST.IC2L_BindMailBox_Req): MST.C2L_BindMailBox_Req;

        /**
         * Encodes the specified C2L_BindMailBox_Req message. Does not implicitly {@link MST.C2L_BindMailBox_Req.verify|verify} messages.
         * @param m C2L_BindMailBox_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_BindMailBox_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_BindMailBox_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_BindMailBox_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_BindMailBox_Req;
    }

    /** Properties of a L2C_BindMailBox_Res. */
    interface IL2C_BindMailBox_Res {

        /** L2C_BindMailBox_Res RpcId */
        RpcId?: (number|null);

        /** L2C_BindMailBox_Res Error */
        Error?: (number|null);

        /** L2C_BindMailBox_Res Message */
        Message?: (string|null);
    }

    /** Represents a L2C_BindMailBox_Res. */
    class L2C_BindMailBox_Res implements IL2C_BindMailBox_Res {

        /**
         * Constructs a new L2C_BindMailBox_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_BindMailBox_Res);

        /** L2C_BindMailBox_Res RpcId. */
        public RpcId: number;

        /** L2C_BindMailBox_Res Error. */
        public Error: number;

        /** L2C_BindMailBox_Res Message. */
        public Message: string;

        /**
         * Creates a new L2C_BindMailBox_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_BindMailBox_Res instance
         */
        public static create(properties?: MST.IL2C_BindMailBox_Res): MST.L2C_BindMailBox_Res;

        /**
         * Encodes the specified L2C_BindMailBox_Res message. Does not implicitly {@link MST.L2C_BindMailBox_Res.verify|verify} messages.
         * @param m L2C_BindMailBox_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_BindMailBox_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_BindMailBox_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_BindMailBox_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_BindMailBox_Res;
    }

    /** Properties of a C2L_BindPhone_Req. */
    interface IC2L_BindPhone_Req {

        /** C2L_BindPhone_Req RpcId */
        RpcId?: (number|null);

        /** C2L_BindPhone_Req Phone */
        Phone?: (string|null);

        /** C2L_BindPhone_Req Code */
        Code?: (string|null);
    }

    /** Represents a C2L_BindPhone_Req. */
    class C2L_BindPhone_Req implements IC2L_BindPhone_Req {

        /**
         * Constructs a new C2L_BindPhone_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_BindPhone_Req);

        /** C2L_BindPhone_Req RpcId. */
        public RpcId: number;

        /** C2L_BindPhone_Req Phone. */
        public Phone: string;

        /** C2L_BindPhone_Req Code. */
        public Code: string;

        /**
         * Creates a new C2L_BindPhone_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_BindPhone_Req instance
         */
        public static create(properties?: MST.IC2L_BindPhone_Req): MST.C2L_BindPhone_Req;

        /**
         * Encodes the specified C2L_BindPhone_Req message. Does not implicitly {@link MST.C2L_BindPhone_Req.verify|verify} messages.
         * @param m C2L_BindPhone_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_BindPhone_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_BindPhone_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_BindPhone_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_BindPhone_Req;
    }

    /** Properties of a L2C_BindPhone_Res. */
    interface IL2C_BindPhone_Res {

        /** L2C_BindPhone_Res RpcId */
        RpcId?: (number|null);

        /** L2C_BindPhone_Res Error */
        Error?: (number|null);

        /** L2C_BindPhone_Res Message */
        Message?: (string|null);
    }

    /** Represents a L2C_BindPhone_Res. */
    class L2C_BindPhone_Res implements IL2C_BindPhone_Res {

        /**
         * Constructs a new L2C_BindPhone_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_BindPhone_Res);

        /** L2C_BindPhone_Res RpcId. */
        public RpcId: number;

        /** L2C_BindPhone_Res Error. */
        public Error: number;

        /** L2C_BindPhone_Res Message. */
        public Message: string;

        /**
         * Creates a new L2C_BindPhone_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_BindPhone_Res instance
         */
        public static create(properties?: MST.IL2C_BindPhone_Res): MST.L2C_BindPhone_Res;

        /**
         * Encodes the specified L2C_BindPhone_Res message. Does not implicitly {@link MST.L2C_BindPhone_Res.verify|verify} messages.
         * @param m L2C_BindPhone_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_BindPhone_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_BindPhone_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_BindPhone_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_BindPhone_Res;
    }

    /** Properties of an UnitRankInfo. */
    interface IUnitRankInfo {

        /** UnitRankInfo AccountId */
        AccountId?: (number|null);

        /** UnitRankInfo NickName */
        NickName?: (string|null);

        /** UnitRankInfo gold */
        gold?: (number|Long|null);
    }

    /** Represents an UnitRankInfo. */
    class UnitRankInfo implements IUnitRankInfo {

        /**
         * Constructs a new UnitRankInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IUnitRankInfo);

        /** UnitRankInfo AccountId. */
        public AccountId: number;

        /** UnitRankInfo NickName. */
        public NickName: string;

        /** UnitRankInfo gold. */
        public gold: (number|Long);

        /**
         * Creates a new UnitRankInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnitRankInfo instance
         */
        public static create(properties?: MST.IUnitRankInfo): MST.UnitRankInfo;

        /**
         * Encodes the specified UnitRankInfo message. Does not implicitly {@link MST.UnitRankInfo.verify|verify} messages.
         * @param m UnitRankInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IUnitRankInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnitRankInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns UnitRankInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.UnitRankInfo;
    }

    /** Properties of a C2L_GoldRankDay_Req. */
    interface IC2L_GoldRankDay_Req {

        /** C2L_GoldRankDay_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GoldRankDay_Req. */
    class C2L_GoldRankDay_Req implements IC2L_GoldRankDay_Req {

        /**
         * Constructs a new C2L_GoldRankDay_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GoldRankDay_Req);

        /** C2L_GoldRankDay_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GoldRankDay_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GoldRankDay_Req instance
         */
        public static create(properties?: MST.IC2L_GoldRankDay_Req): MST.C2L_GoldRankDay_Req;

        /**
         * Encodes the specified C2L_GoldRankDay_Req message. Does not implicitly {@link MST.C2L_GoldRankDay_Req.verify|verify} messages.
         * @param m C2L_GoldRankDay_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GoldRankDay_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GoldRankDay_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GoldRankDay_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GoldRankDay_Req;
    }

    /** Properties of a L2C_GoldRankDay_Res. */
    interface IL2C_GoldRankDay_Res {

        /** L2C_GoldRankDay_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GoldRankDay_Res Error */
        Error?: (number|null);

        /** L2C_GoldRankDay_Res Message */
        Message?: (string|null);

        /** L2C_GoldRankDay_Res Units */
        Units?: (MST.IUnitRankInfo[]|null);
    }

    /** Represents a L2C_GoldRankDay_Res. */
    class L2C_GoldRankDay_Res implements IL2C_GoldRankDay_Res {

        /**
         * Constructs a new L2C_GoldRankDay_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GoldRankDay_Res);

        /** L2C_GoldRankDay_Res RpcId. */
        public RpcId: number;

        /** L2C_GoldRankDay_Res Error. */
        public Error: number;

        /** L2C_GoldRankDay_Res Message. */
        public Message: string;

        /** L2C_GoldRankDay_Res Units. */
        public Units: MST.IUnitRankInfo[];

        /**
         * Creates a new L2C_GoldRankDay_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GoldRankDay_Res instance
         */
        public static create(properties?: MST.IL2C_GoldRankDay_Res): MST.L2C_GoldRankDay_Res;

        /**
         * Encodes the specified L2C_GoldRankDay_Res message. Does not implicitly {@link MST.L2C_GoldRankDay_Res.verify|verify} messages.
         * @param m L2C_GoldRankDay_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GoldRankDay_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GoldRankDay_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GoldRankDay_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GoldRankDay_Res;
    }

    /** Properties of a BetInfo. */
    interface IBetInfo {

        /** BetInfo AccountId */
        AccountId?: (number|Long|null);

        /** BetInfo Nick */
        Nick?: (string|null);

        /** BetInfo Score */
        Score?: (number|Long|null);

        /** BetInfo headUrl */
        headUrl?: (string|null);

        /** BetInfo gameName */
        gameName?: (string|null);
    }

    /** Represents a BetInfo. */
    class BetInfo implements IBetInfo {

        /**
         * Constructs a new BetInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IBetInfo);

        /** BetInfo AccountId. */
        public AccountId: (number|Long);

        /** BetInfo Nick. */
        public Nick: string;

        /** BetInfo Score. */
        public Score: (number|Long);

        /** BetInfo headUrl. */
        public headUrl: string;

        /** BetInfo gameName. */
        public gameName: string;

        /**
         * Creates a new BetInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BetInfo instance
         */
        public static create(properties?: MST.IBetInfo): MST.BetInfo;

        /**
         * Encodes the specified BetInfo message. Does not implicitly {@link MST.BetInfo.verify|verify} messages.
         * @param m BetInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IBetInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BetInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns BetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.BetInfo;
    }

    /** Properties of a C2L_BetRank_Req. */
    interface IC2L_BetRank_Req {

        /** C2L_BetRank_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_BetRank_Req. */
    class C2L_BetRank_Req implements IC2L_BetRank_Req {

        /**
         * Constructs a new C2L_BetRank_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_BetRank_Req);

        /** C2L_BetRank_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_BetRank_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_BetRank_Req instance
         */
        public static create(properties?: MST.IC2L_BetRank_Req): MST.C2L_BetRank_Req;

        /**
         * Encodes the specified C2L_BetRank_Req message. Does not implicitly {@link MST.C2L_BetRank_Req.verify|verify} messages.
         * @param m C2L_BetRank_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_BetRank_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_BetRank_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_BetRank_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_BetRank_Req;
    }

    /** Properties of a L2C_BetRank_Res. */
    interface IL2C_BetRank_Res {

        /** L2C_BetRank_Res RpcId */
        RpcId?: (number|null);

        /** L2C_BetRank_Res Error */
        Error?: (number|null);

        /** L2C_BetRank_Res Message */
        Message?: (string|null);

        /** L2C_BetRank_Res infos */
        infos?: (MST.IBetInfo[]|null);
    }

    /** Represents a L2C_BetRank_Res. */
    class L2C_BetRank_Res implements IL2C_BetRank_Res {

        /**
         * Constructs a new L2C_BetRank_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_BetRank_Res);

        /** L2C_BetRank_Res RpcId. */
        public RpcId: number;

        /** L2C_BetRank_Res Error. */
        public Error: number;

        /** L2C_BetRank_Res Message. */
        public Message: string;

        /** L2C_BetRank_Res infos. */
        public infos: MST.IBetInfo[];

        /**
         * Creates a new L2C_BetRank_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_BetRank_Res instance
         */
        public static create(properties?: MST.IL2C_BetRank_Res): MST.L2C_BetRank_Res;

        /**
         * Encodes the specified L2C_BetRank_Res message. Does not implicitly {@link MST.L2C_BetRank_Res.verify|verify} messages.
         * @param m L2C_BetRank_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_BetRank_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_BetRank_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_BetRank_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_BetRank_Res;
    }

    /** Properties of a C2L_WinDayRank_Req. */
    interface IC2L_WinDayRank_Req {

        /** C2L_WinDayRank_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_WinDayRank_Req. */
    class C2L_WinDayRank_Req implements IC2L_WinDayRank_Req {

        /**
         * Constructs a new C2L_WinDayRank_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_WinDayRank_Req);

        /** C2L_WinDayRank_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_WinDayRank_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_WinDayRank_Req instance
         */
        public static create(properties?: MST.IC2L_WinDayRank_Req): MST.C2L_WinDayRank_Req;

        /**
         * Encodes the specified C2L_WinDayRank_Req message. Does not implicitly {@link MST.C2L_WinDayRank_Req.verify|verify} messages.
         * @param m C2L_WinDayRank_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_WinDayRank_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_WinDayRank_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_WinDayRank_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_WinDayRank_Req;
    }

    /** Properties of a L2C_WinDayRank_Res. */
    interface IL2C_WinDayRank_Res {

        /** L2C_WinDayRank_Res RpcId */
        RpcId?: (number|null);

        /** L2C_WinDayRank_Res Error */
        Error?: (number|null);

        /** L2C_WinDayRank_Res Message */
        Message?: (string|null);

        /** L2C_WinDayRank_Res infos */
        infos?: (MST.IRankInfoCell[]|null);
    }

    /** Represents a L2C_WinDayRank_Res. */
    class L2C_WinDayRank_Res implements IL2C_WinDayRank_Res {

        /**
         * Constructs a new L2C_WinDayRank_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_WinDayRank_Res);

        /** L2C_WinDayRank_Res RpcId. */
        public RpcId: number;

        /** L2C_WinDayRank_Res Error. */
        public Error: number;

        /** L2C_WinDayRank_Res Message. */
        public Message: string;

        /** L2C_WinDayRank_Res infos. */
        public infos: MST.IRankInfoCell[];

        /**
         * Creates a new L2C_WinDayRank_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_WinDayRank_Res instance
         */
        public static create(properties?: MST.IL2C_WinDayRank_Res): MST.L2C_WinDayRank_Res;

        /**
         * Encodes the specified L2C_WinDayRank_Res message. Does not implicitly {@link MST.L2C_WinDayRank_Res.verify|verify} messages.
         * @param m L2C_WinDayRank_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_WinDayRank_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_WinDayRank_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_WinDayRank_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_WinDayRank_Res;
    }

    /** Properties of a C2L_WinWeekRank_Req. */
    interface IC2L_WinWeekRank_Req {

        /** C2L_WinWeekRank_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_WinWeekRank_Req. */
    class C2L_WinWeekRank_Req implements IC2L_WinWeekRank_Req {

        /**
         * Constructs a new C2L_WinWeekRank_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_WinWeekRank_Req);

        /** C2L_WinWeekRank_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_WinWeekRank_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_WinWeekRank_Req instance
         */
        public static create(properties?: MST.IC2L_WinWeekRank_Req): MST.C2L_WinWeekRank_Req;

        /**
         * Encodes the specified C2L_WinWeekRank_Req message. Does not implicitly {@link MST.C2L_WinWeekRank_Req.verify|verify} messages.
         * @param m C2L_WinWeekRank_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_WinWeekRank_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_WinWeekRank_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_WinWeekRank_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_WinWeekRank_Req;
    }

    /** Properties of a L2C_WinWeekRank_Res. */
    interface IL2C_WinWeekRank_Res {

        /** L2C_WinWeekRank_Res RpcId */
        RpcId?: (number|null);

        /** L2C_WinWeekRank_Res Error */
        Error?: (number|null);

        /** L2C_WinWeekRank_Res Message */
        Message?: (string|null);

        /** L2C_WinWeekRank_Res infos */
        infos?: (MST.IRankInfoCell[]|null);
    }

    /** Represents a L2C_WinWeekRank_Res. */
    class L2C_WinWeekRank_Res implements IL2C_WinWeekRank_Res {

        /**
         * Constructs a new L2C_WinWeekRank_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_WinWeekRank_Res);

        /** L2C_WinWeekRank_Res RpcId. */
        public RpcId: number;

        /** L2C_WinWeekRank_Res Error. */
        public Error: number;

        /** L2C_WinWeekRank_Res Message. */
        public Message: string;

        /** L2C_WinWeekRank_Res infos. */
        public infos: MST.IRankInfoCell[];

        /**
         * Creates a new L2C_WinWeekRank_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_WinWeekRank_Res instance
         */
        public static create(properties?: MST.IL2C_WinWeekRank_Res): MST.L2C_WinWeekRank_Res;

        /**
         * Encodes the specified L2C_WinWeekRank_Res message. Does not implicitly {@link MST.L2C_WinWeekRank_Res.verify|verify} messages.
         * @param m L2C_WinWeekRank_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_WinWeekRank_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_WinWeekRank_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_WinWeekRank_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_WinWeekRank_Res;
    }

    /** Properties of a C2L_WinMonthRank_Req. */
    interface IC2L_WinMonthRank_Req {

        /** C2L_WinMonthRank_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_WinMonthRank_Req. */
    class C2L_WinMonthRank_Req implements IC2L_WinMonthRank_Req {

        /**
         * Constructs a new C2L_WinMonthRank_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_WinMonthRank_Req);

        /** C2L_WinMonthRank_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_WinMonthRank_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_WinMonthRank_Req instance
         */
        public static create(properties?: MST.IC2L_WinMonthRank_Req): MST.C2L_WinMonthRank_Req;

        /**
         * Encodes the specified C2L_WinMonthRank_Req message. Does not implicitly {@link MST.C2L_WinMonthRank_Req.verify|verify} messages.
         * @param m C2L_WinMonthRank_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_WinMonthRank_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_WinMonthRank_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_WinMonthRank_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_WinMonthRank_Req;
    }

    /** Properties of a L2C_WinMonthRank_Res. */
    interface IL2C_WinMonthRank_Res {

        /** L2C_WinMonthRank_Res RpcId */
        RpcId?: (number|null);

        /** L2C_WinMonthRank_Res Error */
        Error?: (number|null);

        /** L2C_WinMonthRank_Res Message */
        Message?: (string|null);

        /** L2C_WinMonthRank_Res infos */
        infos?: (MST.IRankInfoCell[]|null);
    }

    /** Represents a L2C_WinMonthRank_Res. */
    class L2C_WinMonthRank_Res implements IL2C_WinMonthRank_Res {

        /**
         * Constructs a new L2C_WinMonthRank_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_WinMonthRank_Res);

        /** L2C_WinMonthRank_Res RpcId. */
        public RpcId: number;

        /** L2C_WinMonthRank_Res Error. */
        public Error: number;

        /** L2C_WinMonthRank_Res Message. */
        public Message: string;

        /** L2C_WinMonthRank_Res infos. */
        public infos: MST.IRankInfoCell[];

        /**
         * Creates a new L2C_WinMonthRank_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_WinMonthRank_Res instance
         */
        public static create(properties?: MST.IL2C_WinMonthRank_Res): MST.L2C_WinMonthRank_Res;

        /**
         * Encodes the specified L2C_WinMonthRank_Res message. Does not implicitly {@link MST.L2C_WinMonthRank_Res.verify|verify} messages.
         * @param m L2C_WinMonthRank_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_WinMonthRank_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_WinMonthRank_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_WinMonthRank_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_WinMonthRank_Res;
    }

    /** Properties of a C2L_GetGameList_Req. */
    interface IC2L_GetGameList_Req {

        /** C2L_GetGameList_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GetGameList_Req. */
    class C2L_GetGameList_Req implements IC2L_GetGameList_Req {

        /**
         * Constructs a new C2L_GetGameList_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetGameList_Req);

        /** C2L_GetGameList_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GetGameList_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetGameList_Req instance
         */
        public static create(properties?: MST.IC2L_GetGameList_Req): MST.C2L_GetGameList_Req;

        /**
         * Encodes the specified C2L_GetGameList_Req message. Does not implicitly {@link MST.C2L_GetGameList_Req.verify|verify} messages.
         * @param m C2L_GetGameList_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetGameList_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetGameList_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetGameList_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetGameList_Req;
    }

    /** Properties of a L2C_GetGameList_Res. */
    interface IL2C_GetGameList_Res {

        /** L2C_GetGameList_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetGameList_Res games */
        games?: (string[]|null);
    }

    /** Represents a L2C_GetGameList_Res. */
    class L2C_GetGameList_Res implements IL2C_GetGameList_Res {

        /**
         * Constructs a new L2C_GetGameList_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetGameList_Res);

        /** L2C_GetGameList_Res RpcId. */
        public RpcId: number;

        /** L2C_GetGameList_Res games. */
        public games: string[];

        /**
         * Creates a new L2C_GetGameList_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetGameList_Res instance
         */
        public static create(properties?: MST.IL2C_GetGameList_Res): MST.L2C_GetGameList_Res;

        /**
         * Encodes the specified L2C_GetGameList_Res message. Does not implicitly {@link MST.L2C_GetGameList_Res.verify|verify} messages.
         * @param m L2C_GetGameList_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetGameList_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetGameList_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetGameList_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetGameList_Res;
    }

    /** Properties of a L2C_ChipsChange_Mes. */
    interface IL2C_ChipsChange_Mes {

        /** L2C_ChipsChange_Mes sourceType */
        sourceType?: (number|null);

        /** L2C_ChipsChange_Mes gold */
        gold?: (number|Long|null);
    }

    /** Represents a L2C_ChipsChange_Mes. */
    class L2C_ChipsChange_Mes implements IL2C_ChipsChange_Mes {

        /**
         * Constructs a new L2C_ChipsChange_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_ChipsChange_Mes);

        /** L2C_ChipsChange_Mes sourceType. */
        public sourceType: number;

        /** L2C_ChipsChange_Mes gold. */
        public gold: (number|Long);

        /**
         * Creates a new L2C_ChipsChange_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_ChipsChange_Mes instance
         */
        public static create(properties?: MST.IL2C_ChipsChange_Mes): MST.L2C_ChipsChange_Mes;

        /**
         * Encodes the specified L2C_ChipsChange_Mes message. Does not implicitly {@link MST.L2C_ChipsChange_Mes.verify|verify} messages.
         * @param m L2C_ChipsChange_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_ChipsChange_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_ChipsChange_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_ChipsChange_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_ChipsChange_Mes;
    }

    /** Properties of a C2L_Deposit_Req. */
    interface IC2L_Deposit_Req {

        /** C2L_Deposit_Req RpcId */
        RpcId?: (number|null);

        /** C2L_Deposit_Req platType */
        platType?: (number|null);

        /** C2L_Deposit_Req depositType */
        depositType?: (number|null);

        /** C2L_Deposit_Req idOrMoney */
        idOrMoney?: (number|Long|null);
    }

    /** Represents a C2L_Deposit_Req. */
    class C2L_Deposit_Req implements IC2L_Deposit_Req {

        /**
         * Constructs a new C2L_Deposit_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_Deposit_Req);

        /** C2L_Deposit_Req RpcId. */
        public RpcId: number;

        /** C2L_Deposit_Req platType. */
        public platType: number;

        /** C2L_Deposit_Req depositType. */
        public depositType: number;

        /** C2L_Deposit_Req idOrMoney. */
        public idOrMoney: (number|Long);

        /**
         * Creates a new C2L_Deposit_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_Deposit_Req instance
         */
        public static create(properties?: MST.IC2L_Deposit_Req): MST.C2L_Deposit_Req;

        /**
         * Encodes the specified C2L_Deposit_Req message. Does not implicitly {@link MST.C2L_Deposit_Req.verify|verify} messages.
         * @param m C2L_Deposit_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_Deposit_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_Deposit_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_Deposit_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_Deposit_Req;
    }

    /** Properties of a L2C_Deposit_Res. */
    interface IL2C_Deposit_Res {

        /** L2C_Deposit_Res RpcId */
        RpcId?: (number|null);

        /** L2C_Deposit_Res Error */
        Error?: (number|null);

        /** L2C_Deposit_Res paymentUrl */
        paymentUrl?: (string|null);
    }

    /** Represents a L2C_Deposit_Res. */
    class L2C_Deposit_Res implements IL2C_Deposit_Res {

        /**
         * Constructs a new L2C_Deposit_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_Deposit_Res);

        /** L2C_Deposit_Res RpcId. */
        public RpcId: number;

        /** L2C_Deposit_Res Error. */
        public Error: number;

        /** L2C_Deposit_Res paymentUrl. */
        public paymentUrl: string;

        /**
         * Creates a new L2C_Deposit_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_Deposit_Res instance
         */
        public static create(properties?: MST.IL2C_Deposit_Res): MST.L2C_Deposit_Res;

        /**
         * Encodes the specified L2C_Deposit_Res message. Does not implicitly {@link MST.L2C_Deposit_Res.verify|verify} messages.
         * @param m L2C_Deposit_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_Deposit_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_Deposit_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_Deposit_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_Deposit_Res;
    }

    /** Properties of a C2L_Withdraw_Req. */
    interface IC2L_Withdraw_Req {

        /** C2L_Withdraw_Req RpcId */
        RpcId?: (number|null);

        /** C2L_Withdraw_Req chips */
        chips?: (number|Long|null);

        /** C2L_Withdraw_Req bankNo */
        bankNo?: (string|null);

        /** C2L_Withdraw_Req bankCode */
        bankCode?: (string|null);

        /** C2L_Withdraw_Req name */
        name?: (string|null);
    }

    /** Represents a C2L_Withdraw_Req. */
    class C2L_Withdraw_Req implements IC2L_Withdraw_Req {

        /**
         * Constructs a new C2L_Withdraw_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_Withdraw_Req);

        /** C2L_Withdraw_Req RpcId. */
        public RpcId: number;

        /** C2L_Withdraw_Req chips. */
        public chips: (number|Long);

        /** C2L_Withdraw_Req bankNo. */
        public bankNo: string;

        /** C2L_Withdraw_Req bankCode. */
        public bankCode: string;

        /** C2L_Withdraw_Req name. */
        public name: string;

        /**
         * Creates a new C2L_Withdraw_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_Withdraw_Req instance
         */
        public static create(properties?: MST.IC2L_Withdraw_Req): MST.C2L_Withdraw_Req;

        /**
         * Encodes the specified C2L_Withdraw_Req message. Does not implicitly {@link MST.C2L_Withdraw_Req.verify|verify} messages.
         * @param m C2L_Withdraw_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_Withdraw_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_Withdraw_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_Withdraw_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_Withdraw_Req;
    }

    /** Properties of a L2C_Withdraw_Res. */
    interface IL2C_Withdraw_Res {

        /** L2C_Withdraw_Res RpcId */
        RpcId?: (number|null);

        /** L2C_Withdraw_Res Error */
        Error?: (number|null);
    }

    /** Represents a L2C_Withdraw_Res. */
    class L2C_Withdraw_Res implements IL2C_Withdraw_Res {

        /**
         * Constructs a new L2C_Withdraw_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_Withdraw_Res);

        /** L2C_Withdraw_Res RpcId. */
        public RpcId: number;

        /** L2C_Withdraw_Res Error. */
        public Error: number;

        /**
         * Creates a new L2C_Withdraw_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_Withdraw_Res instance
         */
        public static create(properties?: MST.IL2C_Withdraw_Res): MST.L2C_Withdraw_Res;

        /**
         * Encodes the specified L2C_Withdraw_Res message. Does not implicitly {@link MST.L2C_Withdraw_Res.verify|verify} messages.
         * @param m L2C_Withdraw_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_Withdraw_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_Withdraw_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_Withdraw_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_Withdraw_Res;
    }

    /** Properties of a C2L_GetWithdrawReocrds_Req. */
    interface IC2L_GetWithdrawReocrds_Req {

        /** C2L_GetWithdrawReocrds_Req RpcId */
        RpcId?: (number|null);

        /** C2L_GetWithdrawReocrds_Req index */
        index?: (number|null);

        /** C2L_GetWithdrawReocrds_Req limit */
        limit?: (number|null);
    }

    /** Represents a C2L_GetWithdrawReocrds_Req. */
    class C2L_GetWithdrawReocrds_Req implements IC2L_GetWithdrawReocrds_Req {

        /**
         * Constructs a new C2L_GetWithdrawReocrds_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetWithdrawReocrds_Req);

        /** C2L_GetWithdrawReocrds_Req RpcId. */
        public RpcId: number;

        /** C2L_GetWithdrawReocrds_Req index. */
        public index: number;

        /** C2L_GetWithdrawReocrds_Req limit. */
        public limit: number;

        /**
         * Creates a new C2L_GetWithdrawReocrds_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetWithdrawReocrds_Req instance
         */
        public static create(properties?: MST.IC2L_GetWithdrawReocrds_Req): MST.C2L_GetWithdrawReocrds_Req;

        /**
         * Encodes the specified C2L_GetWithdrawReocrds_Req message. Does not implicitly {@link MST.C2L_GetWithdrawReocrds_Req.verify|verify} messages.
         * @param m C2L_GetWithdrawReocrds_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetWithdrawReocrds_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetWithdrawReocrds_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetWithdrawReocrds_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetWithdrawReocrds_Req;
    }

    /** Properties of a WithDrawRecord. */
    interface IWithDrawRecord {

        /** WithDrawRecord backNo */
        backNo?: (string|null);

        /** WithDrawRecord amount */
        amount?: (number|Long|null);

        /** WithDrawRecord orderMessage */
        orderMessage?: (string|null);

        /** WithDrawRecord chips */
        chips?: (number|Long|null);

        /** WithDrawRecord orderId */
        orderId?: (string|null);

        /** WithDrawRecord fee */
        fee?: (number|Long|null);

        /** WithDrawRecord auditStatus */
        auditStatus?: (number|null);

        /** WithDrawRecord withdrawTime */
        withdrawTime?: (number|Long|null);

        /** WithDrawRecord bankCode */
        bankCode?: (string|null);
    }

    /** Represents a WithDrawRecord. */
    class WithDrawRecord implements IWithDrawRecord {

        /**
         * Constructs a new WithDrawRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IWithDrawRecord);

        /** WithDrawRecord backNo. */
        public backNo: string;

        /** WithDrawRecord amount. */
        public amount: (number|Long);

        /** WithDrawRecord orderMessage. */
        public orderMessage: string;

        /** WithDrawRecord chips. */
        public chips: (number|Long);

        /** WithDrawRecord orderId. */
        public orderId: string;

        /** WithDrawRecord fee. */
        public fee: (number|Long);

        /** WithDrawRecord auditStatus. */
        public auditStatus: number;

        /** WithDrawRecord withdrawTime. */
        public withdrawTime: (number|Long);

        /** WithDrawRecord bankCode. */
        public bankCode: string;

        /**
         * Creates a new WithDrawRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WithDrawRecord instance
         */
        public static create(properties?: MST.IWithDrawRecord): MST.WithDrawRecord;

        /**
         * Encodes the specified WithDrawRecord message. Does not implicitly {@link MST.WithDrawRecord.verify|verify} messages.
         * @param m WithDrawRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IWithDrawRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WithDrawRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns WithDrawRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.WithDrawRecord;
    }

    /** Properties of a L2C_GetWithdrawRecords_Res. */
    interface IL2C_GetWithdrawRecords_Res {

        /** L2C_GetWithdrawRecords_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetWithdrawRecords_Res Error */
        Error?: (number|null);

        /** L2C_GetWithdrawRecords_Res records */
        records?: (MST.IWithDrawRecord[]|null);

        /** L2C_GetWithdrawRecords_Res index */
        index?: (number|null);
    }

    /** Represents a L2C_GetWithdrawRecords_Res. */
    class L2C_GetWithdrawRecords_Res implements IL2C_GetWithdrawRecords_Res {

        /**
         * Constructs a new L2C_GetWithdrawRecords_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetWithdrawRecords_Res);

        /** L2C_GetWithdrawRecords_Res RpcId. */
        public RpcId: number;

        /** L2C_GetWithdrawRecords_Res Error. */
        public Error: number;

        /** L2C_GetWithdrawRecords_Res records. */
        public records: MST.IWithDrawRecord[];

        /** L2C_GetWithdrawRecords_Res index. */
        public index: number;

        /**
         * Creates a new L2C_GetWithdrawRecords_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetWithdrawRecords_Res instance
         */
        public static create(properties?: MST.IL2C_GetWithdrawRecords_Res): MST.L2C_GetWithdrawRecords_Res;

        /**
         * Encodes the specified L2C_GetWithdrawRecords_Res message. Does not implicitly {@link MST.L2C_GetWithdrawRecords_Res.verify|verify} messages.
         * @param m L2C_GetWithdrawRecords_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetWithdrawRecords_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetWithdrawRecords_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetWithdrawRecords_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetWithdrawRecords_Res;
    }

    /** Properties of a C2L_GetDepositLimit_Req. */
    interface IC2L_GetDepositLimit_Req {

        /** C2L_GetDepositLimit_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GetDepositLimit_Req. */
    class C2L_GetDepositLimit_Req implements IC2L_GetDepositLimit_Req {

        /**
         * Constructs a new C2L_GetDepositLimit_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetDepositLimit_Req);

        /** C2L_GetDepositLimit_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GetDepositLimit_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetDepositLimit_Req instance
         */
        public static create(properties?: MST.IC2L_GetDepositLimit_Req): MST.C2L_GetDepositLimit_Req;

        /**
         * Encodes the specified C2L_GetDepositLimit_Req message. Does not implicitly {@link MST.C2L_GetDepositLimit_Req.verify|verify} messages.
         * @param m C2L_GetDepositLimit_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetDepositLimit_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetDepositLimit_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetDepositLimit_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetDepositLimit_Req;
    }

    /** Properties of a L2C_GetDepositLimit_Res. */
    interface IL2C_GetDepositLimit_Res {

        /** L2C_GetDepositLimit_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetDepositLimit_Res Error */
        Error?: (number|null);

        /** L2C_GetDepositLimit_Res minAmount */
        minAmount?: (number|Long|null);

        /** L2C_GetDepositLimit_Res maxAmount */
        maxAmount?: (number|Long|null);
    }

    /** Represents a L2C_GetDepositLimit_Res. */
    class L2C_GetDepositLimit_Res implements IL2C_GetDepositLimit_Res {

        /**
         * Constructs a new L2C_GetDepositLimit_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetDepositLimit_Res);

        /** L2C_GetDepositLimit_Res RpcId. */
        public RpcId: number;

        /** L2C_GetDepositLimit_Res Error. */
        public Error: number;

        /** L2C_GetDepositLimit_Res minAmount. */
        public minAmount: (number|Long);

        /** L2C_GetDepositLimit_Res maxAmount. */
        public maxAmount: (number|Long);

        /**
         * Creates a new L2C_GetDepositLimit_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetDepositLimit_Res instance
         */
        public static create(properties?: MST.IL2C_GetDepositLimit_Res): MST.L2C_GetDepositLimit_Res;

        /**
         * Encodes the specified L2C_GetDepositLimit_Res message. Does not implicitly {@link MST.L2C_GetDepositLimit_Res.verify|verify} messages.
         * @param m L2C_GetDepositLimit_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetDepositLimit_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetDepositLimit_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetDepositLimit_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetDepositLimit_Res;
    }

    /** Properties of a C2L_GetWithdrawLimit_Req. */
    interface IC2L_GetWithdrawLimit_Req {

        /** C2L_GetWithdrawLimit_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GetWithdrawLimit_Req. */
    class C2L_GetWithdrawLimit_Req implements IC2L_GetWithdrawLimit_Req {

        /**
         * Constructs a new C2L_GetWithdrawLimit_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetWithdrawLimit_Req);

        /** C2L_GetWithdrawLimit_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GetWithdrawLimit_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetWithdrawLimit_Req instance
         */
        public static create(properties?: MST.IC2L_GetWithdrawLimit_Req): MST.C2L_GetWithdrawLimit_Req;

        /**
         * Encodes the specified C2L_GetWithdrawLimit_Req message. Does not implicitly {@link MST.C2L_GetWithdrawLimit_Req.verify|verify} messages.
         * @param m C2L_GetWithdrawLimit_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetWithdrawLimit_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetWithdrawLimit_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetWithdrawLimit_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetWithdrawLimit_Req;
    }

    /** Properties of a L2C_GetWithdrawLimit_Res. */
    interface IL2C_GetWithdrawLimit_Res {

        /** L2C_GetWithdrawLimit_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetWithdrawLimit_Res Error */
        Error?: (number|null);

        /** L2C_GetWithdrawLimit_Res minAmount */
        minAmount?: (number|Long|null);

        /** L2C_GetWithdrawLimit_Res maxAmount */
        maxAmount?: (number|Long|null);
    }

    /** Represents a L2C_GetWithdrawLimit_Res. */
    class L2C_GetWithdrawLimit_Res implements IL2C_GetWithdrawLimit_Res {

        /**
         * Constructs a new L2C_GetWithdrawLimit_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetWithdrawLimit_Res);

        /** L2C_GetWithdrawLimit_Res RpcId. */
        public RpcId: number;

        /** L2C_GetWithdrawLimit_Res Error. */
        public Error: number;

        /** L2C_GetWithdrawLimit_Res minAmount. */
        public minAmount: (number|Long);

        /** L2C_GetWithdrawLimit_Res maxAmount. */
        public maxAmount: (number|Long);

        /**
         * Creates a new L2C_GetWithdrawLimit_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetWithdrawLimit_Res instance
         */
        public static create(properties?: MST.IL2C_GetWithdrawLimit_Res): MST.L2C_GetWithdrawLimit_Res;

        /**
         * Encodes the specified L2C_GetWithdrawLimit_Res message. Does not implicitly {@link MST.L2C_GetWithdrawLimit_Res.verify|verify} messages.
         * @param m L2C_GetWithdrawLimit_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetWithdrawLimit_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetWithdrawLimit_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetWithdrawLimit_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetWithdrawLimit_Res;
    }

    /** Properties of a C2L_GetStoreList_Req. */
    interface IC2L_GetStoreList_Req {

        /** C2L_GetStoreList_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GetStoreList_Req. */
    class C2L_GetStoreList_Req implements IC2L_GetStoreList_Req {

        /**
         * Constructs a new C2L_GetStoreList_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetStoreList_Req);

        /** C2L_GetStoreList_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GetStoreList_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetStoreList_Req instance
         */
        public static create(properties?: MST.IC2L_GetStoreList_Req): MST.C2L_GetStoreList_Req;

        /**
         * Encodes the specified C2L_GetStoreList_Req message. Does not implicitly {@link MST.C2L_GetStoreList_Req.verify|verify} messages.
         * @param m C2L_GetStoreList_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetStoreList_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetStoreList_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetStoreList_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetStoreList_Req;
    }

    /** Properties of a StoreInfo. */
    interface IStoreInfo {

        /** StoreInfo id */
        id?: (number|null);

        /** StoreInfo chips */
        chips?: (number|Long|null);

        /** StoreInfo price */
        price?: (number|Long|null);

        /** StoreInfo giftChips */
        giftChips?: (number|Long|null);
    }

    /** Represents a StoreInfo. */
    class StoreInfo implements IStoreInfo {

        /**
         * Constructs a new StoreInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IStoreInfo);

        /** StoreInfo id. */
        public id: number;

        /** StoreInfo chips. */
        public chips: (number|Long);

        /** StoreInfo price. */
        public price: (number|Long);

        /** StoreInfo giftChips. */
        public giftChips: (number|Long);

        /**
         * Creates a new StoreInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StoreInfo instance
         */
        public static create(properties?: MST.IStoreInfo): MST.StoreInfo;

        /**
         * Encodes the specified StoreInfo message. Does not implicitly {@link MST.StoreInfo.verify|verify} messages.
         * @param m StoreInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IStoreInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StoreInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns StoreInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.StoreInfo;
    }

    /** Properties of a L2C_GetStoreList_Res. */
    interface IL2C_GetStoreList_Res {

        /** L2C_GetStoreList_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetStoreList_Res Error */
        Error?: (number|null);

        /** L2C_GetStoreList_Res info */
        info?: (MST.IStoreInfo[]|null);
    }

    /** Represents a L2C_GetStoreList_Res. */
    class L2C_GetStoreList_Res implements IL2C_GetStoreList_Res {

        /**
         * Constructs a new L2C_GetStoreList_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetStoreList_Res);

        /** L2C_GetStoreList_Res RpcId. */
        public RpcId: number;

        /** L2C_GetStoreList_Res Error. */
        public Error: number;

        /** L2C_GetStoreList_Res info. */
        public info: MST.IStoreInfo[];

        /**
         * Creates a new L2C_GetStoreList_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetStoreList_Res instance
         */
        public static create(properties?: MST.IL2C_GetStoreList_Res): MST.L2C_GetStoreList_Res;

        /**
         * Encodes the specified L2C_GetStoreList_Res message. Does not implicitly {@link MST.L2C_GetStoreList_Res.verify|verify} messages.
         * @param m L2C_GetStoreList_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetStoreList_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetStoreList_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetStoreList_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetStoreList_Res;
    }

    /** Properties of a C2L_GetBankList_Req. */
    interface IC2L_GetBankList_Req {

        /** C2L_GetBankList_Req RpcId */
        RpcId?: (number|null);

        /** C2L_GetBankList_Req index */
        index?: (number|null);

        /** C2L_GetBankList_Req limit */
        limit?: (number|null);
    }

    /** Represents a C2L_GetBankList_Req. */
    class C2L_GetBankList_Req implements IC2L_GetBankList_Req {

        /**
         * Constructs a new C2L_GetBankList_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetBankList_Req);

        /** C2L_GetBankList_Req RpcId. */
        public RpcId: number;

        /** C2L_GetBankList_Req index. */
        public index: number;

        /** C2L_GetBankList_Req limit. */
        public limit: number;

        /**
         * Creates a new C2L_GetBankList_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetBankList_Req instance
         */
        public static create(properties?: MST.IC2L_GetBankList_Req): MST.C2L_GetBankList_Req;

        /**
         * Encodes the specified C2L_GetBankList_Req message. Does not implicitly {@link MST.C2L_GetBankList_Req.verify|verify} messages.
         * @param m C2L_GetBankList_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetBankList_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetBankList_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetBankList_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetBankList_Req;
    }

    /** Properties of a BankInfo. */
    interface IBankInfo {

        /** BankInfo bankName */
        bankName?: (string|null);

        /** BankInfo bankCode */
        bankCode?: (string|null);
    }

    /** Represents a BankInfo. */
    class BankInfo implements IBankInfo {

        /**
         * Constructs a new BankInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IBankInfo);

        /** BankInfo bankName. */
        public bankName: string;

        /** BankInfo bankCode. */
        public bankCode: string;

        /**
         * Creates a new BankInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BankInfo instance
         */
        public static create(properties?: MST.IBankInfo): MST.BankInfo;

        /**
         * Encodes the specified BankInfo message. Does not implicitly {@link MST.BankInfo.verify|verify} messages.
         * @param m BankInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IBankInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BankInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns BankInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.BankInfo;
    }

    /** Properties of a L2C_GetBankList_Res. */
    interface IL2C_GetBankList_Res {

        /** L2C_GetBankList_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetBankList_Res Error */
        Error?: (number|null);

        /** L2C_GetBankList_Res info */
        info?: (MST.IBankInfo[]|null);

        /** L2C_GetBankList_Res index */
        index?: (number|null);
    }

    /** Represents a L2C_GetBankList_Res. */
    class L2C_GetBankList_Res implements IL2C_GetBankList_Res {

        /**
         * Constructs a new L2C_GetBankList_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetBankList_Res);

        /** L2C_GetBankList_Res RpcId. */
        public RpcId: number;

        /** L2C_GetBankList_Res Error. */
        public Error: number;

        /** L2C_GetBankList_Res info. */
        public info: MST.IBankInfo[];

        /** L2C_GetBankList_Res index. */
        public index: number;

        /**
         * Creates a new L2C_GetBankList_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetBankList_Res instance
         */
        public static create(properties?: MST.IL2C_GetBankList_Res): MST.L2C_GetBankList_Res;

        /**
         * Encodes the specified L2C_GetBankList_Res message. Does not implicitly {@link MST.L2C_GetBankList_Res.verify|verify} messages.
         * @param m L2C_GetBankList_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetBankList_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetBankList_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetBankList_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetBankList_Res;
    }

    /** Properties of a C2L_BindBankCard_Req. */
    interface IC2L_BindBankCard_Req {

        /** C2L_BindBankCard_Req RpcId */
        RpcId?: (number|null);

        /** C2L_BindBankCard_Req bankCode */
        bankCode?: (string|null);

        /** C2L_BindBankCard_Req name */
        name?: (string|null);

        /** C2L_BindBankCard_Req bankNo */
        bankNo?: (string|null);
    }

    /** Represents a C2L_BindBankCard_Req. */
    class C2L_BindBankCard_Req implements IC2L_BindBankCard_Req {

        /**
         * Constructs a new C2L_BindBankCard_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_BindBankCard_Req);

        /** C2L_BindBankCard_Req RpcId. */
        public RpcId: number;

        /** C2L_BindBankCard_Req bankCode. */
        public bankCode: string;

        /** C2L_BindBankCard_Req name. */
        public name: string;

        /** C2L_BindBankCard_Req bankNo. */
        public bankNo: string;

        /**
         * Creates a new C2L_BindBankCard_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_BindBankCard_Req instance
         */
        public static create(properties?: MST.IC2L_BindBankCard_Req): MST.C2L_BindBankCard_Req;

        /**
         * Encodes the specified C2L_BindBankCard_Req message. Does not implicitly {@link MST.C2L_BindBankCard_Req.verify|verify} messages.
         * @param m C2L_BindBankCard_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_BindBankCard_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_BindBankCard_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_BindBankCard_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_BindBankCard_Req;
    }

    /** Properties of a L2C_BindBankCard_Res. */
    interface IL2C_BindBankCard_Res {

        /** L2C_BindBankCard_Res RpcId */
        RpcId?: (number|null);

        /** L2C_BindBankCard_Res Error */
        Error?: (number|null);
    }

    /** Represents a L2C_BindBankCard_Res. */
    class L2C_BindBankCard_Res implements IL2C_BindBankCard_Res {

        /**
         * Constructs a new L2C_BindBankCard_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_BindBankCard_Res);

        /** L2C_BindBankCard_Res RpcId. */
        public RpcId: number;

        /** L2C_BindBankCard_Res Error. */
        public Error: number;

        /**
         * Creates a new L2C_BindBankCard_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_BindBankCard_Res instance
         */
        public static create(properties?: MST.IL2C_BindBankCard_Res): MST.L2C_BindBankCard_Res;

        /**
         * Encodes the specified L2C_BindBankCard_Res message. Does not implicitly {@link MST.L2C_BindBankCard_Res.verify|verify} messages.
         * @param m L2C_BindBankCard_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_BindBankCard_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_BindBankCard_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_BindBankCard_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_BindBankCard_Res;
    }

    /** Properties of a C2L_GetBankCardInfo_Req. */
    interface IC2L_GetBankCardInfo_Req {

        /** C2L_GetBankCardInfo_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2L_GetBankCardInfo_Req. */
    class C2L_GetBankCardInfo_Req implements IC2L_GetBankCardInfo_Req {

        /**
         * Constructs a new C2L_GetBankCardInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2L_GetBankCardInfo_Req);

        /** C2L_GetBankCardInfo_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2L_GetBankCardInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_GetBankCardInfo_Req instance
         */
        public static create(properties?: MST.IC2L_GetBankCardInfo_Req): MST.C2L_GetBankCardInfo_Req;

        /**
         * Encodes the specified C2L_GetBankCardInfo_Req message. Does not implicitly {@link MST.C2L_GetBankCardInfo_Req.verify|verify} messages.
         * @param m C2L_GetBankCardInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2L_GetBankCardInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2L_GetBankCardInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2L_GetBankCardInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2L_GetBankCardInfo_Req;
    }

    /** Properties of a L2C_GetBankCardInfo_Res. */
    interface IL2C_GetBankCardInfo_Res {

        /** L2C_GetBankCardInfo_Res RpcId */
        RpcId?: (number|null);

        /** L2C_GetBankCardInfo_Res Error */
        Error?: (number|null);

        /** L2C_GetBankCardInfo_Res bankCode */
        bankCode?: (string|null);

        /** L2C_GetBankCardInfo_Res name */
        name?: (string|null);

        /** L2C_GetBankCardInfo_Res bankNo */
        bankNo?: (string|null);
    }

    /** Represents a L2C_GetBankCardInfo_Res. */
    class L2C_GetBankCardInfo_Res implements IL2C_GetBankCardInfo_Res {

        /**
         * Constructs a new L2C_GetBankCardInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IL2C_GetBankCardInfo_Res);

        /** L2C_GetBankCardInfo_Res RpcId. */
        public RpcId: number;

        /** L2C_GetBankCardInfo_Res Error. */
        public Error: number;

        /** L2C_GetBankCardInfo_Res bankCode. */
        public bankCode: string;

        /** L2C_GetBankCardInfo_Res name. */
        public name: string;

        /** L2C_GetBankCardInfo_Res bankNo. */
        public bankNo: string;

        /**
         * Creates a new L2C_GetBankCardInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_GetBankCardInfo_Res instance
         */
        public static create(properties?: MST.IL2C_GetBankCardInfo_Res): MST.L2C_GetBankCardInfo_Res;

        /**
         * Encodes the specified L2C_GetBankCardInfo_Res message. Does not implicitly {@link MST.L2C_GetBankCardInfo_Res.verify|verify} messages.
         * @param m L2C_GetBankCardInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IL2C_GetBankCardInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a L2C_GetBankCardInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns L2C_GetBankCardInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.L2C_GetBankCardInfo_Res;
    }

    /** Properties of a C2S_MinigameInfo. */
    interface IC2S_MinigameInfo {

        /** C2S_MinigameInfo serial */
        serial?: (number|null);
    }

    /** Represents a C2S_MinigameInfo. */
    class C2S_MinigameInfo implements IC2S_MinigameInfo {

        /**
         * Constructs a new C2S_MinigameInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_MinigameInfo);

        /** C2S_MinigameInfo serial. */
        public serial: number;

        /**
         * Creates a new C2S_MinigameInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_MinigameInfo instance
         */
        public static create(properties?: MST.IC2S_MinigameInfo): MST.C2S_MinigameInfo;

        /**
         * Encodes the specified C2S_MinigameInfo message. Does not implicitly {@link MST.C2S_MinigameInfo.verify|verify} messages.
         * @param m C2S_MinigameInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_MinigameInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_MinigameInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_MinigameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_MinigameInfo;
    }

    /** Properties of a S2C_MinigameInfo. */
    interface IS2C_MinigameInfo {

        /** S2C_MinigameInfo serial */
        serial?: (number|null);

        /** S2C_MinigameInfo code */
        code?: (number|null);

        /** S2C_MinigameInfo isFinishGame */
        isFinishGame?: (boolean|null);

        /** S2C_MinigameInfo todayBonus */
        todayBonus?: (number|Long|null);

        /** S2C_MinigameInfo isReceiveBonus */
        isReceiveBonus?: (boolean|null);
    }

    /** Represents a S2C_MinigameInfo. */
    class S2C_MinigameInfo implements IS2C_MinigameInfo {

        /**
         * Constructs a new S2C_MinigameInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_MinigameInfo);

        /** S2C_MinigameInfo serial. */
        public serial: number;

        /** S2C_MinigameInfo code. */
        public code: number;

        /** S2C_MinigameInfo isFinishGame. */
        public isFinishGame: boolean;

        /** S2C_MinigameInfo todayBonus. */
        public todayBonus: (number|Long);

        /** S2C_MinigameInfo isReceiveBonus. */
        public isReceiveBonus: boolean;

        /**
         * Creates a new S2C_MinigameInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_MinigameInfo instance
         */
        public static create(properties?: MST.IS2C_MinigameInfo): MST.S2C_MinigameInfo;

        /**
         * Encodes the specified S2C_MinigameInfo message. Does not implicitly {@link MST.S2C_MinigameInfo.verify|verify} messages.
         * @param m S2C_MinigameInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_MinigameInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_MinigameInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_MinigameInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_MinigameInfo;
    }

    /** Properties of a C2S_MinigameLottery. */
    interface IC2S_MinigameLottery {

        /** C2S_MinigameLottery serial */
        serial?: (number|null);

        /** C2S_MinigameLottery boxIndex */
        boxIndex?: (number|null);
    }

    /** Represents a C2S_MinigameLottery. */
    class C2S_MinigameLottery implements IC2S_MinigameLottery {

        /**
         * Constructs a new C2S_MinigameLottery.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_MinigameLottery);

        /** C2S_MinigameLottery serial. */
        public serial: number;

        /** C2S_MinigameLottery boxIndex. */
        public boxIndex: number;

        /**
         * Creates a new C2S_MinigameLottery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_MinigameLottery instance
         */
        public static create(properties?: MST.IC2S_MinigameLottery): MST.C2S_MinigameLottery;

        /**
         * Encodes the specified C2S_MinigameLottery message. Does not implicitly {@link MST.C2S_MinigameLottery.verify|verify} messages.
         * @param m C2S_MinigameLottery message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_MinigameLottery, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_MinigameLottery message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_MinigameLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_MinigameLottery;
    }

    /** Properties of a S2C_MinigameLottery. */
    interface IS2C_MinigameLottery {

        /** S2C_MinigameLottery serial */
        serial?: (number|null);

        /** S2C_MinigameLottery code */
        code?: (number|null);

        /** S2C_MinigameLottery boxIndex */
        boxIndex?: (number|null);

        /** S2C_MinigameLottery award */
        award?: (number|Long|null);
    }

    /** Represents a S2C_MinigameLottery. */
    class S2C_MinigameLottery implements IS2C_MinigameLottery {

        /**
         * Constructs a new S2C_MinigameLottery.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_MinigameLottery);

        /** S2C_MinigameLottery serial. */
        public serial: number;

        /** S2C_MinigameLottery code. */
        public code: number;

        /** S2C_MinigameLottery boxIndex. */
        public boxIndex: number;

        /** S2C_MinigameLottery award. */
        public award: (number|Long);

        /**
         * Creates a new S2C_MinigameLottery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_MinigameLottery instance
         */
        public static create(properties?: MST.IS2C_MinigameLottery): MST.S2C_MinigameLottery;

        /**
         * Encodes the specified S2C_MinigameLottery message. Does not implicitly {@link MST.S2C_MinigameLottery.verify|verify} messages.
         * @param m S2C_MinigameLottery message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_MinigameLottery, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_MinigameLottery message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_MinigameLottery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_MinigameLottery;
    }

    /** Properties of a C2S_GetSignedInfo. */
    interface IC2S_GetSignedInfo {

        /** C2S_GetSignedInfo serial */
        serial?: (number|null);
    }

    /** Represents a C2S_GetSignedInfo. */
    class C2S_GetSignedInfo implements IC2S_GetSignedInfo {

        /**
         * Constructs a new C2S_GetSignedInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_GetSignedInfo);

        /** C2S_GetSignedInfo serial. */
        public serial: number;

        /**
         * Creates a new C2S_GetSignedInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_GetSignedInfo instance
         */
        public static create(properties?: MST.IC2S_GetSignedInfo): MST.C2S_GetSignedInfo;

        /**
         * Encodes the specified C2S_GetSignedInfo message. Does not implicitly {@link MST.C2S_GetSignedInfo.verify|verify} messages.
         * @param m C2S_GetSignedInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_GetSignedInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_GetSignedInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_GetSignedInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_GetSignedInfo;
    }

    /** Properties of a S2C_GetSignedInfo. */
    interface IS2C_GetSignedInfo {

        /** S2C_GetSignedInfo serial */
        serial?: (number|null);

        /** S2C_GetSignedInfo code */
        code?: (number|null);

        /** S2C_GetSignedInfo signedType */
        signedType?: (number|null);

        /** S2C_GetSignedInfo signedDays */
        signedDays?: (number|null);

        /** S2C_GetSignedInfo isSigned */
        isSigned?: (boolean|null);

        /** S2C_GetSignedInfo reward */
        reward?: (number|Long|null);

        /** S2C_GetSignedInfo deadLine */
        deadLine?: (number|Long|null);
    }

    /** Represents a S2C_GetSignedInfo. */
    class S2C_GetSignedInfo implements IS2C_GetSignedInfo {

        /**
         * Constructs a new S2C_GetSignedInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_GetSignedInfo);

        /** S2C_GetSignedInfo serial. */
        public serial: number;

        /** S2C_GetSignedInfo code. */
        public code: number;

        /** S2C_GetSignedInfo signedType. */
        public signedType: number;

        /** S2C_GetSignedInfo signedDays. */
        public signedDays: number;

        /** S2C_GetSignedInfo isSigned. */
        public isSigned: boolean;

        /** S2C_GetSignedInfo reward. */
        public reward: (number|Long);

        /** S2C_GetSignedInfo deadLine. */
        public deadLine: (number|Long);

        /**
         * Creates a new S2C_GetSignedInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_GetSignedInfo instance
         */
        public static create(properties?: MST.IS2C_GetSignedInfo): MST.S2C_GetSignedInfo;

        /**
         * Encodes the specified S2C_GetSignedInfo message. Does not implicitly {@link MST.S2C_GetSignedInfo.verify|verify} messages.
         * @param m S2C_GetSignedInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_GetSignedInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_GetSignedInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_GetSignedInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_GetSignedInfo;
    }

    /** Properties of a C2S_Signed. */
    interface IC2S_Signed {

        /** C2S_Signed serial */
        serial?: (number|null);
    }

    /** Represents a C2S_Signed. */
    class C2S_Signed implements IC2S_Signed {

        /**
         * Constructs a new C2S_Signed.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_Signed);

        /** C2S_Signed serial. */
        public serial: number;

        /**
         * Creates a new C2S_Signed instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_Signed instance
         */
        public static create(properties?: MST.IC2S_Signed): MST.C2S_Signed;

        /**
         * Encodes the specified C2S_Signed message. Does not implicitly {@link MST.C2S_Signed.verify|verify} messages.
         * @param m C2S_Signed message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_Signed, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_Signed message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_Signed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_Signed;
    }

    /** Properties of a S2C_Signed. */
    interface IS2C_Signed {

        /** S2C_Signed serial */
        serial?: (number|null);

        /** S2C_Signed code */
        code?: (number|null);

        /** S2C_Signed reward */
        reward?: (number|Long|null);

        /** S2C_Signed signedCount */
        signedCount?: (number|null);
    }

    /** Represents a S2C_Signed. */
    class S2C_Signed implements IS2C_Signed {

        /**
         * Constructs a new S2C_Signed.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_Signed);

        /** S2C_Signed serial. */
        public serial: number;

        /** S2C_Signed code. */
        public code: number;

        /** S2C_Signed reward. */
        public reward: (number|Long);

        /** S2C_Signed signedCount. */
        public signedCount: number;

        /**
         * Creates a new S2C_Signed instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_Signed instance
         */
        public static create(properties?: MST.IS2C_Signed): MST.S2C_Signed;

        /**
         * Encodes the specified S2C_Signed message. Does not implicitly {@link MST.S2C_Signed.verify|verify} messages.
         * @param m S2C_Signed message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_Signed, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_Signed message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_Signed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_Signed;
    }

    /** Properties of a C2S_Register. */
    interface IC2S_Register {

        /** C2S_Register serial */
        serial?: (number|null);

        /** C2S_Register username */
        username?: (string|null);

        /** C2S_Register password */
        password?: (string|null);

        /** C2S_Register imei */
        imei?: (string|null);

        /** C2S_Register checkCode */
        checkCode?: (string|null);

        /** C2S_Register extentCode */
        extentCode?: (string|null);
    }

    /** Represents a C2S_Register. */
    class C2S_Register implements IC2S_Register {

        /**
         * Constructs a new C2S_Register.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_Register);

        /** C2S_Register serial. */
        public serial: number;

        /** C2S_Register username. */
        public username: string;

        /** C2S_Register password. */
        public password: string;

        /** C2S_Register imei. */
        public imei: string;

        /** C2S_Register checkCode. */
        public checkCode: string;

        /** C2S_Register extentCode. */
        public extentCode: string;

        /**
         * Creates a new C2S_Register instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_Register instance
         */
        public static create(properties?: MST.IC2S_Register): MST.C2S_Register;

        /**
         * Encodes the specified C2S_Register message. Does not implicitly {@link MST.C2S_Register.verify|verify} messages.
         * @param m C2S_Register message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_Register, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_Register message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_Register;
    }

    /** Properties of a S2C_Register. */
    interface IS2C_Register {

        /** S2C_Register serial */
        serial?: (number|null);

        /** S2C_Register code */
        code?: (number|null);
    }

    /** Represents a S2C_Register. */
    class S2C_Register implements IS2C_Register {

        /**
         * Constructs a new S2C_Register.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_Register);

        /** S2C_Register serial. */
        public serial: number;

        /** S2C_Register code. */
        public code: number;

        /**
         * Creates a new S2C_Register instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_Register instance
         */
        public static create(properties?: MST.IS2C_Register): MST.S2C_Register;

        /**
         * Encodes the specified S2C_Register message. Does not implicitly {@link MST.S2C_Register.verify|verify} messages.
         * @param m S2C_Register message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_Register, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_Register message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_Register
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_Register;
    }

    /** Properties of a C2S_ResetPassword. */
    interface IC2S_ResetPassword {

        /** C2S_ResetPassword serial */
        serial?: (number|null);

        /** C2S_ResetPassword username */
        username?: (string|null);

        /** C2S_ResetPassword password */
        password?: (string|null);

        /** C2S_ResetPassword checkCode */
        checkCode?: (string|null);
    }

    /** Represents a C2S_ResetPassword. */
    class C2S_ResetPassword implements IC2S_ResetPassword {

        /**
         * Constructs a new C2S_ResetPassword.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_ResetPassword);

        /** C2S_ResetPassword serial. */
        public serial: number;

        /** C2S_ResetPassword username. */
        public username: string;

        /** C2S_ResetPassword password. */
        public password: string;

        /** C2S_ResetPassword checkCode. */
        public checkCode: string;

        /**
         * Creates a new C2S_ResetPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_ResetPassword instance
         */
        public static create(properties?: MST.IC2S_ResetPassword): MST.C2S_ResetPassword;

        /**
         * Encodes the specified C2S_ResetPassword message. Does not implicitly {@link MST.C2S_ResetPassword.verify|verify} messages.
         * @param m C2S_ResetPassword message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_ResetPassword, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_ResetPassword message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_ResetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_ResetPassword;
    }

    /** Properties of a S2C_ResetPassword. */
    interface IS2C_ResetPassword {

        /** S2C_ResetPassword serial */
        serial?: (number|null);

        /** S2C_ResetPassword code */
        code?: (number|null);
    }

    /** Represents a S2C_ResetPassword. */
    class S2C_ResetPassword implements IS2C_ResetPassword {

        /**
         * Constructs a new S2C_ResetPassword.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_ResetPassword);

        /** S2C_ResetPassword serial. */
        public serial: number;

        /** S2C_ResetPassword code. */
        public code: number;

        /**
         * Creates a new S2C_ResetPassword instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_ResetPassword instance
         */
        public static create(properties?: MST.IS2C_ResetPassword): MST.S2C_ResetPassword;

        /**
         * Encodes the specified S2C_ResetPassword message. Does not implicitly {@link MST.S2C_ResetPassword.verify|verify} messages.
         * @param m S2C_ResetPassword message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_ResetPassword, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_ResetPassword message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_ResetPassword
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_ResetPassword;
    }

    /** Properties of a C2S_GetCheckCode. */
    interface IC2S_GetCheckCode {

        /** C2S_GetCheckCode serial */
        serial?: (number|null);

        /** C2S_GetCheckCode username */
        username?: (string|null);
    }

    /** Represents a C2S_GetCheckCode. */
    class C2S_GetCheckCode implements IC2S_GetCheckCode {

        /**
         * Constructs a new C2S_GetCheckCode.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_GetCheckCode);

        /** C2S_GetCheckCode serial. */
        public serial: number;

        /** C2S_GetCheckCode username. */
        public username: string;

        /**
         * Creates a new C2S_GetCheckCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_GetCheckCode instance
         */
        public static create(properties?: MST.IC2S_GetCheckCode): MST.C2S_GetCheckCode;

        /**
         * Encodes the specified C2S_GetCheckCode message. Does not implicitly {@link MST.C2S_GetCheckCode.verify|verify} messages.
         * @param m C2S_GetCheckCode message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_GetCheckCode, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_GetCheckCode message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_GetCheckCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_GetCheckCode;
    }

    /** Properties of a S2C_GetCheckCode. */
    interface IS2C_GetCheckCode {

        /** S2C_GetCheckCode serial */
        serial?: (number|null);

        /** S2C_GetCheckCode code */
        code?: (number|null);
    }

    /** Represents a S2C_GetCheckCode. */
    class S2C_GetCheckCode implements IS2C_GetCheckCode {

        /**
         * Constructs a new S2C_GetCheckCode.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_GetCheckCode);

        /** S2C_GetCheckCode serial. */
        public serial: number;

        /** S2C_GetCheckCode code. */
        public code: number;

        /**
         * Creates a new S2C_GetCheckCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_GetCheckCode instance
         */
        public static create(properties?: MST.IS2C_GetCheckCode): MST.S2C_GetCheckCode;

        /**
         * Encodes the specified S2C_GetCheckCode message. Does not implicitly {@link MST.S2C_GetCheckCode.verify|verify} messages.
         * @param m S2C_GetCheckCode message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_GetCheckCode, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_GetCheckCode message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_GetCheckCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_GetCheckCode;
    }

    /** Properties of a C2S_BindPhone. */
    interface IC2S_BindPhone {

        /** C2S_BindPhone serial */
        serial?: (number|null);

        /** C2S_BindPhone phoneNo */
        phoneNo?: (string|null);

        /** C2S_BindPhone checkCode */
        checkCode?: (string|null);
    }

    /** Represents a C2S_BindPhone. */
    class C2S_BindPhone implements IC2S_BindPhone {

        /**
         * Constructs a new C2S_BindPhone.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_BindPhone);

        /** C2S_BindPhone serial. */
        public serial: number;

        /** C2S_BindPhone phoneNo. */
        public phoneNo: string;

        /** C2S_BindPhone checkCode. */
        public checkCode: string;

        /**
         * Creates a new C2S_BindPhone instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_BindPhone instance
         */
        public static create(properties?: MST.IC2S_BindPhone): MST.C2S_BindPhone;

        /**
         * Encodes the specified C2S_BindPhone message. Does not implicitly {@link MST.C2S_BindPhone.verify|verify} messages.
         * @param m C2S_BindPhone message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_BindPhone, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_BindPhone message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_BindPhone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_BindPhone;
    }

    /** Properties of a S2C_BindPhone. */
    interface IS2C_BindPhone {

        /** S2C_BindPhone serial */
        serial?: (number|null);

        /** S2C_BindPhone code */
        code?: (number|null);

        /** S2C_BindPhone phoneNo */
        phoneNo?: (string|null);
    }

    /** Represents a S2C_BindPhone. */
    class S2C_BindPhone implements IS2C_BindPhone {

        /**
         * Constructs a new S2C_BindPhone.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_BindPhone);

        /** S2C_BindPhone serial. */
        public serial: number;

        /** S2C_BindPhone code. */
        public code: number;

        /** S2C_BindPhone phoneNo. */
        public phoneNo: string;

        /**
         * Creates a new S2C_BindPhone instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_BindPhone instance
         */
        public static create(properties?: MST.IS2C_BindPhone): MST.S2C_BindPhone;

        /**
         * Encodes the specified S2C_BindPhone message. Does not implicitly {@link MST.S2C_BindPhone.verify|verify} messages.
         * @param m S2C_BindPhone message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_BindPhone, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_BindPhone message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_BindPhone
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_BindPhone;
    }

    /** Properties of a C2S_BindEmail. */
    interface IC2S_BindEmail {

        /** C2S_BindEmail serial */
        serial?: (number|null);

        /** C2S_BindEmail email */
        email?: (string|null);

        /** C2S_BindEmail checkCode */
        checkCode?: (string|null);
    }

    /** Represents a C2S_BindEmail. */
    class C2S_BindEmail implements IC2S_BindEmail {

        /**
         * Constructs a new C2S_BindEmail.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_BindEmail);

        /** C2S_BindEmail serial. */
        public serial: number;

        /** C2S_BindEmail email. */
        public email: string;

        /** C2S_BindEmail checkCode. */
        public checkCode: string;

        /**
         * Creates a new C2S_BindEmail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_BindEmail instance
         */
        public static create(properties?: MST.IC2S_BindEmail): MST.C2S_BindEmail;

        /**
         * Encodes the specified C2S_BindEmail message. Does not implicitly {@link MST.C2S_BindEmail.verify|verify} messages.
         * @param m C2S_BindEmail message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_BindEmail, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_BindEmail message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_BindEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_BindEmail;
    }

    /** Properties of a S2C_BindEmail. */
    interface IS2C_BindEmail {

        /** S2C_BindEmail serial */
        serial?: (number|null);

        /** S2C_BindEmail code */
        code?: (number|null);

        /** S2C_BindEmail email */
        email?: (string|null);
    }

    /** Represents a S2C_BindEmail. */
    class S2C_BindEmail implements IS2C_BindEmail {

        /**
         * Constructs a new S2C_BindEmail.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_BindEmail);

        /** S2C_BindEmail serial. */
        public serial: number;

        /** S2C_BindEmail code. */
        public code: number;

        /** S2C_BindEmail email. */
        public email: string;

        /**
         * Creates a new S2C_BindEmail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_BindEmail instance
         */
        public static create(properties?: MST.IS2C_BindEmail): MST.S2C_BindEmail;

        /**
         * Encodes the specified S2C_BindEmail message. Does not implicitly {@link MST.S2C_BindEmail.verify|verify} messages.
         * @param m S2C_BindEmail message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_BindEmail, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_BindEmail message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_BindEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_BindEmail;
    }

    /** Properties of a C2S_GetRegisterRewardConfig. */
    interface IC2S_GetRegisterRewardConfig {

        /** C2S_GetRegisterRewardConfig serial */
        serial?: (number|null);
    }

    /** Represents a C2S_GetRegisterRewardConfig. */
    class C2S_GetRegisterRewardConfig implements IC2S_GetRegisterRewardConfig {

        /**
         * Constructs a new C2S_GetRegisterRewardConfig.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_GetRegisterRewardConfig);

        /** C2S_GetRegisterRewardConfig serial. */
        public serial: number;

        /**
         * Creates a new C2S_GetRegisterRewardConfig instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_GetRegisterRewardConfig instance
         */
        public static create(properties?: MST.IC2S_GetRegisterRewardConfig): MST.C2S_GetRegisterRewardConfig;

        /**
         * Encodes the specified C2S_GetRegisterRewardConfig message. Does not implicitly {@link MST.C2S_GetRegisterRewardConfig.verify|verify} messages.
         * @param m C2S_GetRegisterRewardConfig message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_GetRegisterRewardConfig, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_GetRegisterRewardConfig message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_GetRegisterRewardConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_GetRegisterRewardConfig;
    }

    /** Properties of a S2C_GetRegisterRewordConfig. */
    interface IS2C_GetRegisterRewordConfig {

        /** S2C_GetRegisterRewordConfig serial */
        serial?: (number|null);

        /** S2C_GetRegisterRewordConfig code */
        code?: (number|null);

        /** S2C_GetRegisterRewordConfig firstDepositReward */
        firstDepositReward?: (number|null);

        /** S2C_GetRegisterRewordConfig chips */
        chips?: (number|Long|null);

        /** S2C_GetRegisterRewordConfig registerChips */
        registerChips?: (number|Long|null);

        /** S2C_GetRegisterRewordConfig isGetFirstDepositReward */
        isGetFirstDepositReward?: (boolean|null);
    }

    /** Represents a S2C_GetRegisterRewordConfig. */
    class S2C_GetRegisterRewordConfig implements IS2C_GetRegisterRewordConfig {

        /**
         * Constructs a new S2C_GetRegisterRewordConfig.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_GetRegisterRewordConfig);

        /** S2C_GetRegisterRewordConfig serial. */
        public serial: number;

        /** S2C_GetRegisterRewordConfig code. */
        public code: number;

        /** S2C_GetRegisterRewordConfig firstDepositReward. */
        public firstDepositReward: number;

        /** S2C_GetRegisterRewordConfig chips. */
        public chips: (number|Long);

        /** S2C_GetRegisterRewordConfig registerChips. */
        public registerChips: (number|Long);

        /** S2C_GetRegisterRewordConfig isGetFirstDepositReward. */
        public isGetFirstDepositReward: boolean;

        /**
         * Creates a new S2C_GetRegisterRewordConfig instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_GetRegisterRewordConfig instance
         */
        public static create(properties?: MST.IS2C_GetRegisterRewordConfig): MST.S2C_GetRegisterRewordConfig;

        /**
         * Encodes the specified S2C_GetRegisterRewordConfig message. Does not implicitly {@link MST.S2C_GetRegisterRewordConfig.verify|verify} messages.
         * @param m S2C_GetRegisterRewordConfig message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_GetRegisterRewordConfig, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_GetRegisterRewordConfig message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_GetRegisterRewordConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_GetRegisterRewordConfig;
    }

    /** Properties of a PromotionDataInfo. */
    interface IPromotionDataInfo {

        /** PromotionDataInfo totalIncomeGold */
        totalIncomeGold?: (number|Long|null);

        /** PromotionDataInfo totalWithdrawGold */
        totalWithdrawGold?: (number|Long|null);

        /** PromotionDataInfo ayerIncomeGold */
        ayerIncomeGold?: (number|Long|null);

        /** PromotionDataInfo ayerInvitationCount */
        ayerInvitationCount?: (number|null);

        /** PromotionDataInfo totalInvitationCount */
        totalInvitationCount?: (number|null);

        /** PromotionDataInfo lastUpdateTime */
        lastUpdateTime?: (number|Long|null);
    }

    /** Represents a PromotionDataInfo. */
    class PromotionDataInfo implements IPromotionDataInfo {

        /**
         * Constructs a new PromotionDataInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IPromotionDataInfo);

        /** PromotionDataInfo totalIncomeGold. */
        public totalIncomeGold: (number|Long);

        /** PromotionDataInfo totalWithdrawGold. */
        public totalWithdrawGold: (number|Long);

        /** PromotionDataInfo ayerIncomeGold. */
        public ayerIncomeGold: (number|Long);

        /** PromotionDataInfo ayerInvitationCount. */
        public ayerInvitationCount: number;

        /** PromotionDataInfo totalInvitationCount. */
        public totalInvitationCount: number;

        /** PromotionDataInfo lastUpdateTime. */
        public lastUpdateTime: (number|Long);

        /**
         * Creates a new PromotionDataInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PromotionDataInfo instance
         */
        public static create(properties?: MST.IPromotionDataInfo): MST.PromotionDataInfo;

        /**
         * Encodes the specified PromotionDataInfo message. Does not implicitly {@link MST.PromotionDataInfo.verify|verify} messages.
         * @param m PromotionDataInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IPromotionDataInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PromotionDataInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns PromotionDataInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.PromotionDataInfo;
    }

    /** Properties of a PromotionRankInfo. */
    interface IPromotionRankInfo {

        /** PromotionRankInfo userInfo */
        userInfo?: (MST.IUnitInfo|null);

        /** PromotionRankInfo incomeGold */
        incomeGold?: (number|Long|null);
    }

    /** Represents a PromotionRankInfo. */
    class PromotionRankInfo implements IPromotionRankInfo {

        /**
         * Constructs a new PromotionRankInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IPromotionRankInfo);

        /** PromotionRankInfo userInfo. */
        public userInfo?: (MST.IUnitInfo|null);

        /** PromotionRankInfo incomeGold. */
        public incomeGold: (number|Long);

        /**
         * Creates a new PromotionRankInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PromotionRankInfo instance
         */
        public static create(properties?: MST.IPromotionRankInfo): MST.PromotionRankInfo;

        /**
         * Encodes the specified PromotionRankInfo message. Does not implicitly {@link MST.PromotionRankInfo.verify|verify} messages.
         * @param m PromotionRankInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IPromotionRankInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PromotionRankInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns PromotionRankInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.PromotionRankInfo;
    }

    /** PromotionLevel enum. */
    enum PromotionLevel {
        Level0 = 0,
        Level1 = 1,
        Level2 = 2
    }

    /** Properties of a C2S_PromotionInfo. */
    interface IC2S_PromotionInfo {

        /** C2S_PromotionInfo serial */
        serial?: (number|null);
    }

    /** Represents a C2S_PromotionInfo. */
    class C2S_PromotionInfo implements IC2S_PromotionInfo {

        /**
         * Constructs a new C2S_PromotionInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_PromotionInfo);

        /** C2S_PromotionInfo serial. */
        public serial: number;

        /**
         * Creates a new C2S_PromotionInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_PromotionInfo instance
         */
        public static create(properties?: MST.IC2S_PromotionInfo): MST.C2S_PromotionInfo;

        /**
         * Encodes the specified C2S_PromotionInfo message. Does not implicitly {@link MST.C2S_PromotionInfo.verify|verify} messages.
         * @param m C2S_PromotionInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_PromotionInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_PromotionInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_PromotionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_PromotionInfo;
    }

    /** Properties of a S2C_PromotionInfo. */
    interface IS2C_PromotionInfo {

        /** S2C_PromotionInfo serial */
        serial?: (number|null);

        /** S2C_PromotionInfo code */
        code?: (number|null);

        /** S2C_PromotionInfo level */
        level?: (number|null);

        /** S2C_PromotionInfo levelPercent */
        levelPercent?: (number|null);

        /** S2C_PromotionInfo promotionDataInfo */
        promotionDataInfo?: (MST.IPromotionDataInfo|null);

        /** S2C_PromotionInfo incomeList */
        incomeList?: ((number|Long)[]|null);

        /** S2C_PromotionInfo registerCountList */
        registerCountList?: (number[]|null);

        /** S2C_PromotionInfo validCountList */
        validCountList?: (number[]|null);

        /** S2C_PromotionInfo promotionRankInfo */
        promotionRankInfo?: (MST.IPromotionRankInfo[]|null);
    }

    /** Represents a S2C_PromotionInfo. */
    class S2C_PromotionInfo implements IS2C_PromotionInfo {

        /**
         * Constructs a new S2C_PromotionInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_PromotionInfo);

        /** S2C_PromotionInfo serial. */
        public serial: number;

        /** S2C_PromotionInfo code. */
        public code: number;

        /** S2C_PromotionInfo level. */
        public level: number;

        /** S2C_PromotionInfo levelPercent. */
        public levelPercent: number;

        /** S2C_PromotionInfo promotionDataInfo. */
        public promotionDataInfo?: (MST.IPromotionDataInfo|null);

        /** S2C_PromotionInfo incomeList. */
        public incomeList: (number|Long)[];

        /** S2C_PromotionInfo registerCountList. */
        public registerCountList: number[];

        /** S2C_PromotionInfo validCountList. */
        public validCountList: number[];

        /** S2C_PromotionInfo promotionRankInfo. */
        public promotionRankInfo: MST.IPromotionRankInfo[];

        /**
         * Creates a new S2C_PromotionInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_PromotionInfo instance
         */
        public static create(properties?: MST.IS2C_PromotionInfo): MST.S2C_PromotionInfo;

        /**
         * Encodes the specified S2C_PromotionInfo message. Does not implicitly {@link MST.S2C_PromotionInfo.verify|verify} messages.
         * @param m S2C_PromotionInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_PromotionInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_PromotionInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_PromotionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_PromotionInfo;
    }

    /** Properties of a C2S_ModifyAvartar. */
    interface IC2S_ModifyAvartar {

        /** C2S_ModifyAvartar serial */
        serial?: (number|null);

        /** C2S_ModifyAvartar avartar */
        avartar?: (string|null);
    }

    /** Represents a C2S_ModifyAvartar. */
    class C2S_ModifyAvartar implements IC2S_ModifyAvartar {

        /**
         * Constructs a new C2S_ModifyAvartar.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_ModifyAvartar);

        /** C2S_ModifyAvartar serial. */
        public serial: number;

        /** C2S_ModifyAvartar avartar. */
        public avartar: string;

        /**
         * Creates a new C2S_ModifyAvartar instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_ModifyAvartar instance
         */
        public static create(properties?: MST.IC2S_ModifyAvartar): MST.C2S_ModifyAvartar;

        /**
         * Encodes the specified C2S_ModifyAvartar message. Does not implicitly {@link MST.C2S_ModifyAvartar.verify|verify} messages.
         * @param m C2S_ModifyAvartar message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_ModifyAvartar, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_ModifyAvartar message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_ModifyAvartar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_ModifyAvartar;
    }

    /** Properties of a S2C_ModifyAvartar. */
    interface IS2C_ModifyAvartar {

        /** S2C_ModifyAvartar serial */
        serial?: (number|null);

        /** S2C_ModifyAvartar code */
        code?: (number|null);

        /** S2C_ModifyAvartar avartar */
        avartar?: (string|null);
    }

    /** Represents a S2C_ModifyAvartar. */
    class S2C_ModifyAvartar implements IS2C_ModifyAvartar {

        /**
         * Constructs a new S2C_ModifyAvartar.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_ModifyAvartar);

        /** S2C_ModifyAvartar serial. */
        public serial: number;

        /** S2C_ModifyAvartar code. */
        public code: number;

        /** S2C_ModifyAvartar avartar. */
        public avartar: string;

        /**
         * Creates a new S2C_ModifyAvartar instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_ModifyAvartar instance
         */
        public static create(properties?: MST.IS2C_ModifyAvartar): MST.S2C_ModifyAvartar;

        /**
         * Encodes the specified S2C_ModifyAvartar message. Does not implicitly {@link MST.S2C_ModifyAvartar.verify|verify} messages.
         * @param m S2C_ModifyAvartar message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_ModifyAvartar, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_ModifyAvartar message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_ModifyAvartar
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_ModifyAvartar;
    }

    /** Properties of a C2S_GetDepositList. */
    interface IC2S_GetDepositList {

        /** C2S_GetDepositList serial */
        serial?: (number|null);

        /** C2S_GetDepositList index */
        index?: (number|null);

        /** C2S_GetDepositList limit */
        limit?: (number|null);
    }

    /** Represents a C2S_GetDepositList. */
    class C2S_GetDepositList implements IC2S_GetDepositList {

        /**
         * Constructs a new C2S_GetDepositList.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_GetDepositList);

        /** C2S_GetDepositList serial. */
        public serial: number;

        /** C2S_GetDepositList index. */
        public index: number;

        /** C2S_GetDepositList limit. */
        public limit: number;

        /**
         * Creates a new C2S_GetDepositList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_GetDepositList instance
         */
        public static create(properties?: MST.IC2S_GetDepositList): MST.C2S_GetDepositList;

        /**
         * Encodes the specified C2S_GetDepositList message. Does not implicitly {@link MST.C2S_GetDepositList.verify|verify} messages.
         * @param m C2S_GetDepositList message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_GetDepositList, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_GetDepositList message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_GetDepositList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_GetDepositList;
    }

    /** Properties of a DepositRecord. */
    interface IDepositRecord {

        /** DepositRecord orderId */
        orderId?: (string|null);

        /** DepositRecord amount */
        amount?: (number|Long|null);

        /** DepositRecord chips */
        chips?: (number|Long|null);

        /** DepositRecord fee */
        fee?: (number|Long|null);

        /** DepositRecord status */
        status?: (string|null);

        /** DepositRecord depositTime */
        depositTime?: (number|Long|null);
    }

    /** Represents a DepositRecord. */
    class DepositRecord implements IDepositRecord {

        /**
         * Constructs a new DepositRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IDepositRecord);

        /** DepositRecord orderId. */
        public orderId: string;

        /** DepositRecord amount. */
        public amount: (number|Long);

        /** DepositRecord chips. */
        public chips: (number|Long);

        /** DepositRecord fee. */
        public fee: (number|Long);

        /** DepositRecord status. */
        public status: string;

        /** DepositRecord depositTime. */
        public depositTime: (number|Long);

        /**
         * Creates a new DepositRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DepositRecord instance
         */
        public static create(properties?: MST.IDepositRecord): MST.DepositRecord;

        /**
         * Encodes the specified DepositRecord message. Does not implicitly {@link MST.DepositRecord.verify|verify} messages.
         * @param m DepositRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IDepositRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DepositRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns DepositRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.DepositRecord;
    }

    /** Properties of a S2C_GetDepositList. */
    interface IS2C_GetDepositList {

        /** S2C_GetDepositList serial */
        serial?: (number|null);

        /** S2C_GetDepositList code */
        code?: (number|null);

        /** S2C_GetDepositList records */
        records?: (MST.IDepositRecord[]|null);

        /** S2C_GetDepositList index */
        index?: (number|null);
    }

    /** Represents a S2C_GetDepositList. */
    class S2C_GetDepositList implements IS2C_GetDepositList {

        /**
         * Constructs a new S2C_GetDepositList.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_GetDepositList);

        /** S2C_GetDepositList serial. */
        public serial: number;

        /** S2C_GetDepositList code. */
        public code: number;

        /** S2C_GetDepositList records. */
        public records: MST.IDepositRecord[];

        /** S2C_GetDepositList index. */
        public index: number;

        /**
         * Creates a new S2C_GetDepositList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_GetDepositList instance
         */
        public static create(properties?: MST.IS2C_GetDepositList): MST.S2C_GetDepositList;

        /**
         * Encodes the specified S2C_GetDepositList message. Does not implicitly {@link MST.S2C_GetDepositList.verify|verify} messages.
         * @param m S2C_GetDepositList message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_GetDepositList, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_GetDepositList message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_GetDepositList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_GetDepositList;
    }

    /** Properties of a C2S_GetMissionList. */
    interface IC2S_GetMissionList {

        /** C2S_GetMissionList serial */
        serial?: (number|null);
    }

    /** Represents a C2S_GetMissionList. */
    class C2S_GetMissionList implements IC2S_GetMissionList {

        /**
         * Constructs a new C2S_GetMissionList.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_GetMissionList);

        /** C2S_GetMissionList serial. */
        public serial: number;

        /**
         * Creates a new C2S_GetMissionList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_GetMissionList instance
         */
        public static create(properties?: MST.IC2S_GetMissionList): MST.C2S_GetMissionList;

        /**
         * Encodes the specified C2S_GetMissionList message. Does not implicitly {@link MST.C2S_GetMissionList.verify|verify} messages.
         * @param m C2S_GetMissionList message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_GetMissionList, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_GetMissionList message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_GetMissionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_GetMissionList;
    }

    /** MissionType enum. */
    enum MissionType {
        MissionSevenSignInType = 0,
        MissionThirtySignInType = 1,
        MissionDepositType = 2,
        MissionPromotionType = 3,
        MissionPromotionDepositType = 4
    }

    /** Properties of a MissionInfo. */
    interface IMissionInfo {

        /** MissionInfo missionId */
        missionId?: (number|null);

        /** MissionInfo endTime */
        endTime?: (number|Long|null);

        /** MissionInfo targetProgress */
        targetProgress?: (number|Long|null);

        /** MissionInfo curProgress */
        curProgress?: (number|Long|null);

        /** MissionInfo reward */
        reward?: (number|Long|null);

        /** MissionInfo iconUrl */
        iconUrl?: (string|null);

        /** MissionInfo beginTime */
        beginTime?: (number|Long|null);
    }

    /** Represents a MissionInfo. */
    class MissionInfo implements IMissionInfo {

        /**
         * Constructs a new MissionInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IMissionInfo);

        /** MissionInfo missionId. */
        public missionId: number;

        /** MissionInfo endTime. */
        public endTime: (number|Long);

        /** MissionInfo targetProgress. */
        public targetProgress: (number|Long);

        /** MissionInfo curProgress. */
        public curProgress: (number|Long);

        /** MissionInfo reward. */
        public reward: (number|Long);

        /** MissionInfo iconUrl. */
        public iconUrl: string;

        /** MissionInfo beginTime. */
        public beginTime: (number|Long);

        /**
         * Creates a new MissionInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MissionInfo instance
         */
        public static create(properties?: MST.IMissionInfo): MST.MissionInfo;

        /**
         * Encodes the specified MissionInfo message. Does not implicitly {@link MST.MissionInfo.verify|verify} messages.
         * @param m MissionInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IMissionInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MissionInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MissionInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.MissionInfo;
    }

    /** Properties of a S2C_GetMissionList. */
    interface IS2C_GetMissionList {

        /** S2C_GetMissionList serial */
        serial?: (number|null);

        /** S2C_GetMissionList code */
        code?: (number|null);

        /** S2C_GetMissionList info */
        info?: (MST.IMissionInfo[]|null);
    }

    /** Represents a S2C_GetMissionList. */
    class S2C_GetMissionList implements IS2C_GetMissionList {

        /**
         * Constructs a new S2C_GetMissionList.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_GetMissionList);

        /** S2C_GetMissionList serial. */
        public serial: number;

        /** S2C_GetMissionList code. */
        public code: number;

        /** S2C_GetMissionList info. */
        public info: MST.IMissionInfo[];

        /**
         * Creates a new S2C_GetMissionList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_GetMissionList instance
         */
        public static create(properties?: MST.IS2C_GetMissionList): MST.S2C_GetMissionList;

        /**
         * Encodes the specified S2C_GetMissionList message. Does not implicitly {@link MST.S2C_GetMissionList.verify|verify} messages.
         * @param m S2C_GetMissionList message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_GetMissionList, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_GetMissionList message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_GetMissionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_GetMissionList;
    }

    /** Properties of a C2S_MissionClaim. */
    interface IC2S_MissionClaim {

        /** C2S_MissionClaim serial */
        serial?: (number|null);

        /** C2S_MissionClaim missionId */
        missionId?: (number|null);
    }

    /** Represents a C2S_MissionClaim. */
    class C2S_MissionClaim implements IC2S_MissionClaim {

        /**
         * Constructs a new C2S_MissionClaim.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_MissionClaim);

        /** C2S_MissionClaim serial. */
        public serial: number;

        /** C2S_MissionClaim missionId. */
        public missionId: number;

        /**
         * Creates a new C2S_MissionClaim instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_MissionClaim instance
         */
        public static create(properties?: MST.IC2S_MissionClaim): MST.C2S_MissionClaim;

        /**
         * Encodes the specified C2S_MissionClaim message. Does not implicitly {@link MST.C2S_MissionClaim.verify|verify} messages.
         * @param m C2S_MissionClaim message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_MissionClaim, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_MissionClaim message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_MissionClaim
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_MissionClaim;
    }

    /** Properties of a S2C_MissionClaim. */
    interface IS2C_MissionClaim {

        /** S2C_MissionClaim serial */
        serial?: (number|null);

        /** S2C_MissionClaim code */
        code?: (number|null);

        /** S2C_MissionClaim reward */
        reward?: (number|Long|null);

        /** S2C_MissionClaim missionId */
        missionId?: (number|null);
    }

    /** Represents a S2C_MissionClaim. */
    class S2C_MissionClaim implements IS2C_MissionClaim {

        /**
         * Constructs a new S2C_MissionClaim.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_MissionClaim);

        /** S2C_MissionClaim serial. */
        public serial: number;

        /** S2C_MissionClaim code. */
        public code: number;

        /** S2C_MissionClaim reward. */
        public reward: (number|Long);

        /** S2C_MissionClaim missionId. */
        public missionId: number;

        /**
         * Creates a new S2C_MissionClaim instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_MissionClaim instance
         */
        public static create(properties?: MST.IS2C_MissionClaim): MST.S2C_MissionClaim;

        /**
         * Encodes the specified S2C_MissionClaim message. Does not implicitly {@link MST.S2C_MissionClaim.verify|verify} messages.
         * @param m S2C_MissionClaim message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_MissionClaim, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_MissionClaim message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_MissionClaim
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_MissionClaim;
    }

    /** Properties of a S2C_MessageNotify. */
    interface IS2C_MessageNotify {

        /** S2C_MessageNotify message */
        message?: (string|null);

        /** S2C_MessageNotify type */
        type?: (number|null);

        /** S2C_MessageNotify isLoop */
        isLoop?: (boolean|null);
    }

    /** Represents a S2C_MessageNotify. */
    class S2C_MessageNotify implements IS2C_MessageNotify {

        /**
         * Constructs a new S2C_MessageNotify.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_MessageNotify);

        /** S2C_MessageNotify message. */
        public message: string;

        /** S2C_MessageNotify type. */
        public type: number;

        /** S2C_MessageNotify isLoop. */
        public isLoop: boolean;

        /**
         * Creates a new S2C_MessageNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_MessageNotify instance
         */
        public static create(properties?: MST.IS2C_MessageNotify): MST.S2C_MessageNotify;

        /**
         * Encodes the specified S2C_MessageNotify message. Does not implicitly {@link MST.S2C_MessageNotify.verify|verify} messages.
         * @param m S2C_MessageNotify message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_MessageNotify, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_MessageNotify message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_MessageNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_MessageNotify;
    }

    /** Properties of a M2C_CreateUnits_Mes. */
    interface IM2C_CreateUnits_Mes {

        /** M2C_CreateUnits_Mes Units */
        Units?: (MST.IUnitInfo[]|null);
    }

    /** Represents a M2C_CreateUnits_Mes. */
    class M2C_CreateUnits_Mes implements IM2C_CreateUnits_Mes {

        /**
         * Constructs a new M2C_CreateUnits_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CreateUnits_Mes);

        /** M2C_CreateUnits_Mes Units. */
        public Units: MST.IUnitInfo[];

        /**
         * Creates a new M2C_CreateUnits_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CreateUnits_Mes instance
         */
        public static create(properties?: MST.IM2C_CreateUnits_Mes): MST.M2C_CreateUnits_Mes;

        /**
         * Encodes the specified M2C_CreateUnits_Mes message. Does not implicitly {@link MST.M2C_CreateUnits_Mes.verify|verify} messages.
         * @param m M2C_CreateUnits_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CreateUnits_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CreateUnits_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CreateUnits_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CreateUnits_Mes;
    }

    /** Properties of a M2C_CreateMyUnit_Mes. */
    interface IM2C_CreateMyUnit_Mes {

        /** M2C_CreateMyUnit_Mes Unit */
        Unit?: (MST.IUnitInfo|null);
    }

    /** Represents a M2C_CreateMyUnit_Mes. */
    class M2C_CreateMyUnit_Mes implements IM2C_CreateMyUnit_Mes {

        /**
         * Constructs a new M2C_CreateMyUnit_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_CreateMyUnit_Mes);

        /** M2C_CreateMyUnit_Mes Unit. */
        public Unit?: (MST.IUnitInfo|null);

        /**
         * Creates a new M2C_CreateMyUnit_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_CreateMyUnit_Mes instance
         */
        public static create(properties?: MST.IM2C_CreateMyUnit_Mes): MST.M2C_CreateMyUnit_Mes;

        /**
         * Encodes the specified M2C_CreateMyUnit_Mes message. Does not implicitly {@link MST.M2C_CreateMyUnit_Mes.verify|verify} messages.
         * @param m M2C_CreateMyUnit_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_CreateMyUnit_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_CreateMyUnit_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_CreateMyUnit_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_CreateMyUnit_Mes;
    }

    /** Properties of a M2C_StartSceneChange_Mes. */
    interface IM2C_StartSceneChange_Mes {

        /** M2C_StartSceneChange_Mes RoomScene */
        RoomScene?: (MST.IRoomInfo|null);
    }

    /** Represents a M2C_StartSceneChange_Mes. */
    class M2C_StartSceneChange_Mes implements IM2C_StartSceneChange_Mes {

        /**
         * Constructs a new M2C_StartSceneChange_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_StartSceneChange_Mes);

        /** M2C_StartSceneChange_Mes RoomScene. */
        public RoomScene?: (MST.IRoomInfo|null);

        /**
         * Creates a new M2C_StartSceneChange_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_StartSceneChange_Mes instance
         */
        public static create(properties?: MST.IM2C_StartSceneChange_Mes): MST.M2C_StartSceneChange_Mes;

        /**
         * Encodes the specified M2C_StartSceneChange_Mes message. Does not implicitly {@link MST.M2C_StartSceneChange_Mes.verify|verify} messages.
         * @param m M2C_StartSceneChange_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_StartSceneChange_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_StartSceneChange_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_StartSceneChange_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_StartSceneChange_Mes;
    }

    /** Properties of a M2C_RemoveUnits_Mes. */
    interface IM2C_RemoveUnits_Mes {

        /** M2C_RemoveUnits_Mes Units */
        Units?: ((number|Long)[]|null);
    }

    /** Represents a M2C_RemoveUnits_Mes. */
    class M2C_RemoveUnits_Mes implements IM2C_RemoveUnits_Mes {

        /**
         * Constructs a new M2C_RemoveUnits_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_RemoveUnits_Mes);

        /** M2C_RemoveUnits_Mes Units. */
        public Units: (number|Long)[];

        /**
         * Creates a new M2C_RemoveUnits_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_RemoveUnits_Mes instance
         */
        public static create(properties?: MST.IM2C_RemoveUnits_Mes): MST.M2C_RemoveUnits_Mes;

        /**
         * Encodes the specified M2C_RemoveUnits_Mes message. Does not implicitly {@link MST.M2C_RemoveUnits_Mes.verify|verify} messages.
         * @param m M2C_RemoveUnits_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_RemoveUnits_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_RemoveUnits_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_RemoveUnits_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_RemoveUnits_Mes;
    }

    /** Properties of a C2M_TransferMap_Req. */
    interface IC2M_TransferMap_Req {

        /** C2M_TransferMap_Req RpcId */
        RpcId?: (number|null);

        /** C2M_TransferMap_Req RoomName */
        RoomName?: (string|null);
    }

    /** Represents a C2M_TransferMap_Req. */
    class C2M_TransferMap_Req implements IC2M_TransferMap_Req {

        /**
         * Constructs a new C2M_TransferMap_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_TransferMap_Req);

        /** C2M_TransferMap_Req RpcId. */
        public RpcId: number;

        /** C2M_TransferMap_Req RoomName. */
        public RoomName: string;

        /**
         * Creates a new C2M_TransferMap_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_TransferMap_Req instance
         */
        public static create(properties?: MST.IC2M_TransferMap_Req): MST.C2M_TransferMap_Req;

        /**
         * Encodes the specified C2M_TransferMap_Req message. Does not implicitly {@link MST.C2M_TransferMap_Req.verify|verify} messages.
         * @param m C2M_TransferMap_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_TransferMap_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_TransferMap_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_TransferMap_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_TransferMap_Req;
    }

    /** Properties of a M2C_TransferMap_Res. */
    interface IM2C_TransferMap_Res {

        /** M2C_TransferMap_Res RpcId */
        RpcId?: (number|null);

        /** M2C_TransferMap_Res Error */
        Error?: (number|null);

        /** M2C_TransferMap_Res Message */
        Message?: (string|null);

        /** M2C_TransferMap_Res RoomName */
        RoomName?: (string|null);
    }

    /** Represents a M2C_TransferMap_Res. */
    class M2C_TransferMap_Res implements IM2C_TransferMap_Res {

        /**
         * Constructs a new M2C_TransferMap_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_TransferMap_Res);

        /** M2C_TransferMap_Res RpcId. */
        public RpcId: number;

        /** M2C_TransferMap_Res Error. */
        public Error: number;

        /** M2C_TransferMap_Res Message. */
        public Message: string;

        /** M2C_TransferMap_Res RoomName. */
        public RoomName: string;

        /**
         * Creates a new M2C_TransferMap_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_TransferMap_Res instance
         */
        public static create(properties?: MST.IM2C_TransferMap_Res): MST.M2C_TransferMap_Res;

        /**
         * Encodes the specified M2C_TransferMap_Res message. Does not implicitly {@link MST.M2C_TransferMap_Res.verify|verify} messages.
         * @param m M2C_TransferMap_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_TransferMap_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_TransferMap_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_TransferMap_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_TransferMap_Res;
    }

    /** LoginType enum. */
    enum LoginType {
        Anonymous = 0,
        Telephone = 1,
        Goggle = 2,
        FaceBook = 3,
        Twittwer = 4,
        Telegram = 5,
        Fast = 6,
        Token = 7
    }

    /** Properties of a C2M_Auth_Req. */
    interface IC2M_Auth_Req {

        /** C2M_Auth_Req RpcId */
        RpcId?: (number|null);

        /** C2M_Auth_Req AuthKey */
        AuthKey?: (string|null);

        /** C2M_Auth_Req Password */
        Password?: (string|null);

        /** C2M_Auth_Req AuthType */
        AuthType?: (number|null);

        /** C2M_Auth_Req ThirdId */
        ThirdId?: (string|null);

        /** C2M_Auth_Req imei */
        imei?: (string|null);

        /** C2M_Auth_Req invcode */
        invcode?: (string|null);
    }

    /** Represents a C2M_Auth_Req. */
    class C2M_Auth_Req implements IC2M_Auth_Req {

        /**
         * Constructs a new C2M_Auth_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_Auth_Req);

        /** C2M_Auth_Req RpcId. */
        public RpcId: number;

        /** C2M_Auth_Req AuthKey. */
        public AuthKey: string;

        /** C2M_Auth_Req Password. */
        public Password: string;

        /** C2M_Auth_Req AuthType. */
        public AuthType: number;

        /** C2M_Auth_Req ThirdId. */
        public ThirdId: string;

        /** C2M_Auth_Req imei. */
        public imei: string;

        /** C2M_Auth_Req invcode. */
        public invcode: string;

        /**
         * Creates a new C2M_Auth_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_Auth_Req instance
         */
        public static create(properties?: MST.IC2M_Auth_Req): MST.C2M_Auth_Req;

        /**
         * Encodes the specified C2M_Auth_Req message. Does not implicitly {@link MST.C2M_Auth_Req.verify|verify} messages.
         * @param m C2M_Auth_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_Auth_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_Auth_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_Auth_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_Auth_Req;
    }

    /** Properties of a M2C_Auth_Res. */
    interface IM2C_Auth_Res {

        /** M2C_Auth_Res RpcId */
        RpcId?: (number|null);

        /** M2C_Auth_Res Error */
        Error?: (number|null);

        /** M2C_Auth_Res Message */
        Message?: (string|null);

        /** M2C_Auth_Res FastAuthToken */
        FastAuthToken?: (string|null);

        /** M2C_Auth_Res AccountId */
        AccountId?: (number|Long|null);

        /** M2C_Auth_Res PlayerInfo */
        PlayerInfo?: (MST.IUnitInfo|null);

        /** M2C_Auth_Res RoomName */
        RoomName?: (string|null);

        /** M2C_Auth_Res BindEmail */
        BindEmail?: (string|null);

        /** M2C_Auth_Res phonoNo */
        phonoNo?: (string|null);

        /** M2C_Auth_Res extendCode */
        extendCode?: (string|null);

        /** M2C_Auth_Res loginType */
        loginType?: (number|null);
    }

    /** Represents a M2C_Auth_Res. */
    class M2C_Auth_Res implements IM2C_Auth_Res {

        /**
         * Constructs a new M2C_Auth_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_Auth_Res);

        /** M2C_Auth_Res RpcId. */
        public RpcId: number;

        /** M2C_Auth_Res Error. */
        public Error: number;

        /** M2C_Auth_Res Message. */
        public Message: string;

        /** M2C_Auth_Res FastAuthToken. */
        public FastAuthToken: string;

        /** M2C_Auth_Res AccountId. */
        public AccountId: (number|Long);

        /** M2C_Auth_Res PlayerInfo. */
        public PlayerInfo?: (MST.IUnitInfo|null);

        /** M2C_Auth_Res RoomName. */
        public RoomName: string;

        /** M2C_Auth_Res BindEmail. */
        public BindEmail: string;

        /** M2C_Auth_Res phonoNo. */
        public phonoNo: string;

        /** M2C_Auth_Res extendCode. */
        public extendCode: string;

        /** M2C_Auth_Res loginType. */
        public loginType: number;

        /**
         * Creates a new M2C_Auth_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_Auth_Res instance
         */
        public static create(properties?: MST.IM2C_Auth_Res): MST.M2C_Auth_Res;

        /**
         * Encodes the specified M2C_Auth_Res message. Does not implicitly {@link MST.M2C_Auth_Res.verify|verify} messages.
         * @param m M2C_Auth_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_Auth_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_Auth_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_Auth_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_Auth_Res;
    }

    /** Properties of a C2M_AuthOut_Req. */
    interface IC2M_AuthOut_Req {

        /** C2M_AuthOut_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2M_AuthOut_Req. */
    class C2M_AuthOut_Req implements IC2M_AuthOut_Req {

        /**
         * Constructs a new C2M_AuthOut_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_AuthOut_Req);

        /** C2M_AuthOut_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2M_AuthOut_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_AuthOut_Req instance
         */
        public static create(properties?: MST.IC2M_AuthOut_Req): MST.C2M_AuthOut_Req;

        /**
         * Encodes the specified C2M_AuthOut_Req message. Does not implicitly {@link MST.C2M_AuthOut_Req.verify|verify} messages.
         * @param m C2M_AuthOut_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_AuthOut_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_AuthOut_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_AuthOut_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_AuthOut_Req;
    }

    /** Properties of a M2C_AuthOut_Res. */
    interface IM2C_AuthOut_Res {

        /** M2C_AuthOut_Res RpcId */
        RpcId?: (number|null);

        /** M2C_AuthOut_Res Error */
        Error?: (number|null);

        /** M2C_AuthOut_Res Message */
        Message?: (string|null);
    }

    /** Represents a M2C_AuthOut_Res. */
    class M2C_AuthOut_Res implements IM2C_AuthOut_Res {

        /**
         * Constructs a new M2C_AuthOut_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_AuthOut_Res);

        /** M2C_AuthOut_Res RpcId. */
        public RpcId: number;

        /** M2C_AuthOut_Res Error. */
        public Error: number;

        /** M2C_AuthOut_Res Message. */
        public Message: string;

        /**
         * Creates a new M2C_AuthOut_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_AuthOut_Res instance
         */
        public static create(properties?: MST.IM2C_AuthOut_Res): MST.M2C_AuthOut_Res;

        /**
         * Encodes the specified M2C_AuthOut_Res message. Does not implicitly {@link MST.M2C_AuthOut_Res.verify|verify} messages.
         * @param m M2C_AuthOut_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_AuthOut_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_AuthOut_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_AuthOut_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_AuthOut_Res;
    }

    /** Properties of a M2C_KickOut_Mes. */
    interface IM2C_KickOut_Mes {
    }

    /** Represents a M2C_KickOut_Mes. */
    class M2C_KickOut_Mes implements IM2C_KickOut_Mes {

        /**
         * Constructs a new M2C_KickOut_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_KickOut_Mes);

        /**
         * Creates a new M2C_KickOut_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_KickOut_Mes instance
         */
        public static create(properties?: MST.IM2C_KickOut_Mes): MST.M2C_KickOut_Mes;

        /**
         * Encodes the specified M2C_KickOut_Mes message. Does not implicitly {@link MST.M2C_KickOut_Mes.verify|verify} messages.
         * @param m M2C_KickOut_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_KickOut_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_KickOut_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_KickOut_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_KickOut_Mes;
    }

    /** Properties of a M2C_GoldChange_Mes. */
    interface IM2C_GoldChange_Mes {

        /** M2C_GoldChange_Mes Gold */
        Gold?: (number|Long|null);
    }

    /** Represents a M2C_GoldChange_Mes. */
    class M2C_GoldChange_Mes implements IM2C_GoldChange_Mes {

        /**
         * Constructs a new M2C_GoldChange_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_GoldChange_Mes);

        /** M2C_GoldChange_Mes Gold. */
        public Gold: (number|Long);

        /**
         * Creates a new M2C_GoldChange_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_GoldChange_Mes instance
         */
        public static create(properties?: MST.IM2C_GoldChange_Mes): MST.M2C_GoldChange_Mes;

        /**
         * Encodes the specified M2C_GoldChange_Mes message. Does not implicitly {@link MST.M2C_GoldChange_Mes.verify|verify} messages.
         * @param m M2C_GoldChange_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_GoldChange_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_GoldChange_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_GoldChange_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_GoldChange_Mes;
    }

    /** Properties of a RouletteBetInfo. */
    interface IRouletteBetInfo {

        /** RouletteBetInfo player */
        player?: (MST.IUnitInfo|null);

        /** RouletteBetInfo BetGold */
        BetGold?: (number|Long|null);

        /** RouletteBetInfo Color */
        Color?: (number|null);
    }

    /** Represents a RouletteBetInfo. */
    class RouletteBetInfo implements IRouletteBetInfo {

        /**
         * Constructs a new RouletteBetInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IRouletteBetInfo);

        /** RouletteBetInfo player. */
        public player?: (MST.IUnitInfo|null);

        /** RouletteBetInfo BetGold. */
        public BetGold: (number|Long);

        /** RouletteBetInfo Color. */
        public Color: number;

        /**
         * Creates a new RouletteBetInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RouletteBetInfo instance
         */
        public static create(properties?: MST.IRouletteBetInfo): MST.RouletteBetInfo;

        /**
         * Encodes the specified RouletteBetInfo message. Does not implicitly {@link MST.RouletteBetInfo.verify|verify} messages.
         * @param m RouletteBetInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IRouletteBetInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RouletteBetInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RouletteBetInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.RouletteBetInfo;
    }

    /** RouletteColor enum. */
    enum RouletteColor {
        RoulettePurple = 0,
        RouletteRed = 1,
        RouletteGreen = 2
    }

    /** RouletteStatus enum. */
    enum RouletteStatus {
        BetPhase = 0,
        AnimationPhase = 1,
        PaybackPhase = 2
    }

    /** Properties of a TotalBetRecord. */
    interface ITotalBetRecord {

        /** TotalBetRecord color */
        color?: (number|null);

        /** TotalBetRecord chips */
        chips?: (number|Long|null);
    }

    /** Represents a TotalBetRecord. */
    class TotalBetRecord implements ITotalBetRecord {

        /**
         * Constructs a new TotalBetRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.ITotalBetRecord);

        /** TotalBetRecord color. */
        public color: number;

        /** TotalBetRecord chips. */
        public chips: (number|Long);

        /**
         * Creates a new TotalBetRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TotalBetRecord instance
         */
        public static create(properties?: MST.ITotalBetRecord): MST.TotalBetRecord;

        /**
         * Encodes the specified TotalBetRecord message. Does not implicitly {@link MST.TotalBetRecord.verify|verify} messages.
         * @param m TotalBetRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.ITotalBetRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TotalBetRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns TotalBetRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.TotalBetRecord;
    }

    /** Properties of a C2M_GetRouletteInfo_Req. */
    interface IC2M_GetRouletteInfo_Req {

        /** C2M_GetRouletteInfo_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2M_GetRouletteInfo_Req. */
    class C2M_GetRouletteInfo_Req implements IC2M_GetRouletteInfo_Req {

        /**
         * Constructs a new C2M_GetRouletteInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_GetRouletteInfo_Req);

        /** C2M_GetRouletteInfo_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2M_GetRouletteInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_GetRouletteInfo_Req instance
         */
        public static create(properties?: MST.IC2M_GetRouletteInfo_Req): MST.C2M_GetRouletteInfo_Req;

        /**
         * Encodes the specified C2M_GetRouletteInfo_Req message. Does not implicitly {@link MST.C2M_GetRouletteInfo_Req.verify|verify} messages.
         * @param m C2M_GetRouletteInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_GetRouletteInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_GetRouletteInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_GetRouletteInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_GetRouletteInfo_Req;
    }

    /** Properties of a M2C_GetRouletteInfo_Res. */
    interface IM2C_GetRouletteInfo_Res {

        /** M2C_GetRouletteInfo_Res RpcId */
        RpcId?: (number|null);

        /** M2C_GetRouletteInfo_Res Error */
        Error?: (number|null);

        /** M2C_GetRouletteInfo_Res Message */
        Message?: (string|null);

        /** M2C_GetRouletteInfo_Res Bets */
        Bets?: (MST.IRouletteBetInfo[]|null);

        /** M2C_GetRouletteInfo_Res Status */
        Status?: (number|null);

        /** M2C_GetRouletteInfo_Res EndTimeStamp */
        EndTimeStamp?: (number|Long|null);

        /** M2C_GetRouletteInfo_Res MultipleRecord */
        MultipleRecord?: ((number|Long)[]|null);

        /** M2C_GetRouletteInfo_Res betRecord */
        betRecord?: (MST.ITotalBetRecord[]|null);

        /** M2C_GetRouletteInfo_Res roundHash */
        roundHash?: (string|null);

        /** M2C_GetRouletteInfo_Res hashSalt */
        hashSalt?: (string|null);

        /** M2C_GetRouletteInfo_Res randomNo */
        randomNo?: (number|null);

        /** M2C_GetRouletteInfo_Res color */
        color?: (number|null);

        /** M2C_GetRouletteInfo_Res round */
        round?: (number|null);
    }

    /** Represents a M2C_GetRouletteInfo_Res. */
    class M2C_GetRouletteInfo_Res implements IM2C_GetRouletteInfo_Res {

        /**
         * Constructs a new M2C_GetRouletteInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_GetRouletteInfo_Res);

        /** M2C_GetRouletteInfo_Res RpcId. */
        public RpcId: number;

        /** M2C_GetRouletteInfo_Res Error. */
        public Error: number;

        /** M2C_GetRouletteInfo_Res Message. */
        public Message: string;

        /** M2C_GetRouletteInfo_Res Bets. */
        public Bets: MST.IRouletteBetInfo[];

        /** M2C_GetRouletteInfo_Res Status. */
        public Status: number;

        /** M2C_GetRouletteInfo_Res EndTimeStamp. */
        public EndTimeStamp: (number|Long);

        /** M2C_GetRouletteInfo_Res MultipleRecord. */
        public MultipleRecord: (number|Long)[];

        /** M2C_GetRouletteInfo_Res betRecord. */
        public betRecord: MST.ITotalBetRecord[];

        /** M2C_GetRouletteInfo_Res roundHash. */
        public roundHash: string;

        /** M2C_GetRouletteInfo_Res hashSalt. */
        public hashSalt: string;

        /** M2C_GetRouletteInfo_Res randomNo. */
        public randomNo: number;

        /** M2C_GetRouletteInfo_Res color. */
        public color: number;

        /** M2C_GetRouletteInfo_Res round. */
        public round: number;

        /**
         * Creates a new M2C_GetRouletteInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_GetRouletteInfo_Res instance
         */
        public static create(properties?: MST.IM2C_GetRouletteInfo_Res): MST.M2C_GetRouletteInfo_Res;

        /**
         * Encodes the specified M2C_GetRouletteInfo_Res message. Does not implicitly {@link MST.M2C_GetRouletteInfo_Res.verify|verify} messages.
         * @param m M2C_GetRouletteInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_GetRouletteInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_GetRouletteInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_GetRouletteInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_GetRouletteInfo_Res;
    }

    /** Properties of a M2C_RouletteStartBet_Mes. */
    interface IM2C_RouletteStartBet_Mes {

        /** M2C_RouletteStartBet_Mes StopBetTimeStamp */
        StopBetTimeStamp?: (number|Long|null);

        /** M2C_RouletteStartBet_Mes randHash */
        randHash?: (string|null);
    }

    /** Represents a M2C_RouletteStartBet_Mes. */
    class M2C_RouletteStartBet_Mes implements IM2C_RouletteStartBet_Mes {

        /**
         * Constructs a new M2C_RouletteStartBet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_RouletteStartBet_Mes);

        /** M2C_RouletteStartBet_Mes StopBetTimeStamp. */
        public StopBetTimeStamp: (number|Long);

        /** M2C_RouletteStartBet_Mes randHash. */
        public randHash: string;

        /**
         * Creates a new M2C_RouletteStartBet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_RouletteStartBet_Mes instance
         */
        public static create(properties?: MST.IM2C_RouletteStartBet_Mes): MST.M2C_RouletteStartBet_Mes;

        /**
         * Encodes the specified M2C_RouletteStartBet_Mes message. Does not implicitly {@link MST.M2C_RouletteStartBet_Mes.verify|verify} messages.
         * @param m M2C_RouletteStartBet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_RouletteStartBet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_RouletteStartBet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_RouletteStartBet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_RouletteStartBet_Mes;
    }

    /** Properties of a M2C_RouletteStart_mes. */
    interface IM2C_RouletteStart_mes {

        /** M2C_RouletteStart_mes StartTimeStamp */
        StartTimeStamp?: (number|Long|null);

        /** M2C_RouletteStart_mes StopTimeStamp */
        StopTimeStamp?: (number|Long|null);

        /** M2C_RouletteStart_mes endIndex */
        endIndex?: (number|null);
    }

    /** Represents a M2C_RouletteStart_mes. */
    class M2C_RouletteStart_mes implements IM2C_RouletteStart_mes {

        /**
         * Constructs a new M2C_RouletteStart_mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_RouletteStart_mes);

        /** M2C_RouletteStart_mes StartTimeStamp. */
        public StartTimeStamp: (number|Long);

        /** M2C_RouletteStart_mes StopTimeStamp. */
        public StopTimeStamp: (number|Long);

        /** M2C_RouletteStart_mes endIndex. */
        public endIndex: number;

        /**
         * Creates a new M2C_RouletteStart_mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_RouletteStart_mes instance
         */
        public static create(properties?: MST.IM2C_RouletteStart_mes): MST.M2C_RouletteStart_mes;

        /**
         * Encodes the specified M2C_RouletteStart_mes message. Does not implicitly {@link MST.M2C_RouletteStart_mes.verify|verify} messages.
         * @param m M2C_RouletteStart_mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_RouletteStart_mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_RouletteStart_mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_RouletteStart_mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_RouletteStart_mes;
    }

    /** Properties of a C2M_MyRouletteBet_Req. */
    interface IC2M_MyRouletteBet_Req {

        /** C2M_MyRouletteBet_Req RpcId */
        RpcId?: (number|null);

        /** C2M_MyRouletteBet_Req BetGold */
        BetGold?: (number|Long|null);

        /** C2M_MyRouletteBet_Req BetIndex */
        BetIndex?: (number|null);
    }

    /** Represents a C2M_MyRouletteBet_Req. */
    class C2M_MyRouletteBet_Req implements IC2M_MyRouletteBet_Req {

        /**
         * Constructs a new C2M_MyRouletteBet_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_MyRouletteBet_Req);

        /** C2M_MyRouletteBet_Req RpcId. */
        public RpcId: number;

        /** C2M_MyRouletteBet_Req BetGold. */
        public BetGold: (number|Long);

        /** C2M_MyRouletteBet_Req BetIndex. */
        public BetIndex: number;

        /**
         * Creates a new C2M_MyRouletteBet_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_MyRouletteBet_Req instance
         */
        public static create(properties?: MST.IC2M_MyRouletteBet_Req): MST.C2M_MyRouletteBet_Req;

        /**
         * Encodes the specified C2M_MyRouletteBet_Req message. Does not implicitly {@link MST.C2M_MyRouletteBet_Req.verify|verify} messages.
         * @param m C2M_MyRouletteBet_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_MyRouletteBet_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_MyRouletteBet_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_MyRouletteBet_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_MyRouletteBet_Req;
    }

    /** Properties of a M2C_MyRouletteBet_Res. */
    interface IM2C_MyRouletteBet_Res {

        /** M2C_MyRouletteBet_Res RpcId */
        RpcId?: (number|null);

        /** M2C_MyRouletteBet_Res Error */
        Error?: (number|null);

        /** M2C_MyRouletteBet_Res Message */
        Message?: (string|null);

        /** M2C_MyRouletteBet_Res Gold */
        Gold?: (number|Long|null);
    }

    /** Represents a M2C_MyRouletteBet_Res. */
    class M2C_MyRouletteBet_Res implements IM2C_MyRouletteBet_Res {

        /**
         * Constructs a new M2C_MyRouletteBet_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_MyRouletteBet_Res);

        /** M2C_MyRouletteBet_Res RpcId. */
        public RpcId: number;

        /** M2C_MyRouletteBet_Res Error. */
        public Error: number;

        /** M2C_MyRouletteBet_Res Message. */
        public Message: string;

        /** M2C_MyRouletteBet_Res Gold. */
        public Gold: (number|Long);

        /**
         * Creates a new M2C_MyRouletteBet_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_MyRouletteBet_Res instance
         */
        public static create(properties?: MST.IM2C_MyRouletteBet_Res): MST.M2C_MyRouletteBet_Res;

        /**
         * Encodes the specified M2C_MyRouletteBet_Res message. Does not implicitly {@link MST.M2C_MyRouletteBet_Res.verify|verify} messages.
         * @param m M2C_MyRouletteBet_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_MyRouletteBet_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_MyRouletteBet_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_MyRouletteBet_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_MyRouletteBet_Res;
    }

    /** Properties of a C2R_GetBetRankInfo_Req. */
    interface IC2R_GetBetRankInfo_Req {

        /** C2R_GetBetRankInfo_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2R_GetBetRankInfo_Req. */
    class C2R_GetBetRankInfo_Req implements IC2R_GetBetRankInfo_Req {

        /**
         * Constructs a new C2R_GetBetRankInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2R_GetBetRankInfo_Req);

        /** C2R_GetBetRankInfo_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2R_GetBetRankInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2R_GetBetRankInfo_Req instance
         */
        public static create(properties?: MST.IC2R_GetBetRankInfo_Req): MST.C2R_GetBetRankInfo_Req;

        /**
         * Encodes the specified C2R_GetBetRankInfo_Req message. Does not implicitly {@link MST.C2R_GetBetRankInfo_Req.verify|verify} messages.
         * @param m C2R_GetBetRankInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2R_GetBetRankInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2R_GetBetRankInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2R_GetBetRankInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2R_GetBetRankInfo_Req;
    }

    /** Properties of a R2C_GetBetRandInfo_Res. */
    interface IR2C_GetBetRandInfo_Res {

        /** R2C_GetBetRandInfo_Res RpcId */
        RpcId?: (number|null);

        /** R2C_GetBetRandInfo_Res Error */
        Error?: (number|null);

        /** R2C_GetBetRandInfo_Res records */
        records?: (MST.IRouletteBetInfo[]|null);
    }

    /** Represents a R2C_GetBetRandInfo_Res. */
    class R2C_GetBetRandInfo_Res implements IR2C_GetBetRandInfo_Res {

        /**
         * Constructs a new R2C_GetBetRandInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_GetBetRandInfo_Res);

        /** R2C_GetBetRandInfo_Res RpcId. */
        public RpcId: number;

        /** R2C_GetBetRandInfo_Res Error. */
        public Error: number;

        /** R2C_GetBetRandInfo_Res records. */
        public records: MST.IRouletteBetInfo[];

        /**
         * Creates a new R2C_GetBetRandInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_GetBetRandInfo_Res instance
         */
        public static create(properties?: MST.IR2C_GetBetRandInfo_Res): MST.R2C_GetBetRandInfo_Res;

        /**
         * Encodes the specified R2C_GetBetRandInfo_Res message. Does not implicitly {@link MST.R2C_GetBetRandInfo_Res.verify|verify} messages.
         * @param m R2C_GetBetRandInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_GetBetRandInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_GetBetRandInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_GetBetRandInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_GetBetRandInfo_Res;
    }

    /** Properties of a C2R_GetGameRecords_Req. */
    interface IC2R_GetGameRecords_Req {

        /** C2R_GetGameRecords_Req RpcId */
        RpcId?: (number|null);

        /** C2R_GetGameRecords_Req limit */
        limit?: (number|null);

        /** C2R_GetGameRecords_Req round */
        round?: (number|null);
    }

    /** Represents a C2R_GetGameRecords_Req. */
    class C2R_GetGameRecords_Req implements IC2R_GetGameRecords_Req {

        /**
         * Constructs a new C2R_GetGameRecords_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2R_GetGameRecords_Req);

        /** C2R_GetGameRecords_Req RpcId. */
        public RpcId: number;

        /** C2R_GetGameRecords_Req limit. */
        public limit: number;

        /** C2R_GetGameRecords_Req round. */
        public round: number;

        /**
         * Creates a new C2R_GetGameRecords_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2R_GetGameRecords_Req instance
         */
        public static create(properties?: MST.IC2R_GetGameRecords_Req): MST.C2R_GetGameRecords_Req;

        /**
         * Encodes the specified C2R_GetGameRecords_Req message. Does not implicitly {@link MST.C2R_GetGameRecords_Req.verify|verify} messages.
         * @param m C2R_GetGameRecords_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2R_GetGameRecords_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2R_GetGameRecords_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2R_GetGameRecords_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2R_GetGameRecords_Req;
    }

    /** Properties of a RouletteGameRecord. */
    interface IRouletteGameRecord {

        /** RouletteGameRecord round */
        round?: (number|null);

        /** RouletteGameRecord color */
        color?: (number|null);

        /** RouletteGameRecord calcTime */
        calcTime?: (number|null);

        /** RouletteGameRecord roundHash */
        roundHash?: (string|null);

        /** RouletteGameRecord hashSalt */
        hashSalt?: (string|null);

        /** RouletteGameRecord randomNo */
        randomNo?: (number|null);
    }

    /** Represents a RouletteGameRecord. */
    class RouletteGameRecord implements IRouletteGameRecord {

        /**
         * Constructs a new RouletteGameRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IRouletteGameRecord);

        /** RouletteGameRecord round. */
        public round: number;

        /** RouletteGameRecord color. */
        public color: number;

        /** RouletteGameRecord calcTime. */
        public calcTime: number;

        /** RouletteGameRecord roundHash. */
        public roundHash: string;

        /** RouletteGameRecord hashSalt. */
        public hashSalt: string;

        /** RouletteGameRecord randomNo. */
        public randomNo: number;

        /**
         * Creates a new RouletteGameRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RouletteGameRecord instance
         */
        public static create(properties?: MST.IRouletteGameRecord): MST.RouletteGameRecord;

        /**
         * Encodes the specified RouletteGameRecord message. Does not implicitly {@link MST.RouletteGameRecord.verify|verify} messages.
         * @param m RouletteGameRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IRouletteGameRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RouletteGameRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RouletteGameRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.RouletteGameRecord;
    }

    /** Properties of a R2C_GetGameRecords_Res. */
    interface IR2C_GetGameRecords_Res {

        /** R2C_GetGameRecords_Res RpcId */
        RpcId?: (number|null);

        /** R2C_GetGameRecords_Res Error */
        Error?: (number|null);

        /** R2C_GetGameRecords_Res records */
        records?: (MST.IRouletteGameRecord[]|null);

        /** R2C_GetGameRecords_Res round */
        round?: (number|null);
    }

    /** Represents a R2C_GetGameRecords_Res. */
    class R2C_GetGameRecords_Res implements IR2C_GetGameRecords_Res {

        /**
         * Constructs a new R2C_GetGameRecords_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_GetGameRecords_Res);

        /** R2C_GetGameRecords_Res RpcId. */
        public RpcId: number;

        /** R2C_GetGameRecords_Res Error. */
        public Error: number;

        /** R2C_GetGameRecords_Res records. */
        public records: MST.IRouletteGameRecord[];

        /** R2C_GetGameRecords_Res round. */
        public round: number;

        /**
         * Creates a new R2C_GetGameRecords_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_GetGameRecords_Res instance
         */
        public static create(properties?: MST.IR2C_GetGameRecords_Res): MST.R2C_GetGameRecords_Res;

        /**
         * Encodes the specified R2C_GetGameRecords_Res message. Does not implicitly {@link MST.R2C_GetGameRecords_Res.verify|verify} messages.
         * @param m R2C_GetGameRecords_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_GetGameRecords_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_GetGameRecords_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_GetGameRecords_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_GetGameRecords_Res;
    }

    /** Properties of a C2R_GetBetInfo_Req. */
    interface IC2R_GetBetInfo_Req {

        /** C2R_GetBetInfo_Req RpcId */
        RpcId?: (number|null);

        /** C2R_GetBetInfo_Req index */
        index?: (number|null);

        /** C2R_GetBetInfo_Req limit */
        limit?: (number|null);
    }

    /** Represents a C2R_GetBetInfo_Req. */
    class C2R_GetBetInfo_Req implements IC2R_GetBetInfo_Req {

        /**
         * Constructs a new C2R_GetBetInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2R_GetBetInfo_Req);

        /** C2R_GetBetInfo_Req RpcId. */
        public RpcId: number;

        /** C2R_GetBetInfo_Req index. */
        public index: number;

        /** C2R_GetBetInfo_Req limit. */
        public limit: number;

        /**
         * Creates a new C2R_GetBetInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2R_GetBetInfo_Req instance
         */
        public static create(properties?: MST.IC2R_GetBetInfo_Req): MST.C2R_GetBetInfo_Req;

        /**
         * Encodes the specified C2R_GetBetInfo_Req message. Does not implicitly {@link MST.C2R_GetBetInfo_Req.verify|verify} messages.
         * @param m C2R_GetBetInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2R_GetBetInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2R_GetBetInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2R_GetBetInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2R_GetBetInfo_Req;
    }

    /** Properties of a RouletteBetDetail. */
    interface IRouletteBetDetail {

        /** RouletteBetDetail round */
        round?: (number|null);

        /** RouletteBetDetail betChips */
        betChips?: (number|Long|null);

        /** RouletteBetDetail color */
        color?: (number|null);

        /** RouletteBetDetail winChips */
        winChips?: (number|Long|null);
    }

    /** Represents a RouletteBetDetail. */
    class RouletteBetDetail implements IRouletteBetDetail {

        /**
         * Constructs a new RouletteBetDetail.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IRouletteBetDetail);

        /** RouletteBetDetail round. */
        public round: number;

        /** RouletteBetDetail betChips. */
        public betChips: (number|Long);

        /** RouletteBetDetail color. */
        public color: number;

        /** RouletteBetDetail winChips. */
        public winChips: (number|Long);

        /**
         * Creates a new RouletteBetDetail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RouletteBetDetail instance
         */
        public static create(properties?: MST.IRouletteBetDetail): MST.RouletteBetDetail;

        /**
         * Encodes the specified RouletteBetDetail message. Does not implicitly {@link MST.RouletteBetDetail.verify|verify} messages.
         * @param m RouletteBetDetail message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IRouletteBetDetail, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RouletteBetDetail message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RouletteBetDetail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.RouletteBetDetail;
    }

    /** Properties of a R2C_GetBetInfo_Res. */
    interface IR2C_GetBetInfo_Res {

        /** R2C_GetBetInfo_Res RpcId */
        RpcId?: (number|null);

        /** R2C_GetBetInfo_Res Error */
        Error?: (number|null);

        /** R2C_GetBetInfo_Res records */
        records?: (MST.IRouletteBetDetail[]|null);

        /** R2C_GetBetInfo_Res index */
        index?: (number|null);
    }

    /** Represents a R2C_GetBetInfo_Res. */
    class R2C_GetBetInfo_Res implements IR2C_GetBetInfo_Res {

        /**
         * Constructs a new R2C_GetBetInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_GetBetInfo_Res);

        /** R2C_GetBetInfo_Res RpcId. */
        public RpcId: number;

        /** R2C_GetBetInfo_Res Error. */
        public Error: number;

        /** R2C_GetBetInfo_Res records. */
        public records: MST.IRouletteBetDetail[];

        /** R2C_GetBetInfo_Res index. */
        public index: number;

        /**
         * Creates a new R2C_GetBetInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_GetBetInfo_Res instance
         */
        public static create(properties?: MST.IR2C_GetBetInfo_Res): MST.R2C_GetBetInfo_Res;

        /**
         * Encodes the specified R2C_GetBetInfo_Res message. Does not implicitly {@link MST.R2C_GetBetInfo_Res.verify|verify} messages.
         * @param m R2C_GetBetInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_GetBetInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_GetBetInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_GetBetInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_GetBetInfo_Res;
    }

    /** Properties of a R2C_Calc_Mes. */
    interface IR2C_Calc_Mes {

        /** R2C_Calc_Mes chips */
        chips?: (number|Long|null);
    }

    /** Represents a R2C_Calc_Mes. */
    class R2C_Calc_Mes implements IR2C_Calc_Mes {

        /**
         * Constructs a new R2C_Calc_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_Calc_Mes);

        /** R2C_Calc_Mes chips. */
        public chips: (number|Long);

        /**
         * Creates a new R2C_Calc_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_Calc_Mes instance
         */
        public static create(properties?: MST.IR2C_Calc_Mes): MST.R2C_Calc_Mes;

        /**
         * Encodes the specified R2C_Calc_Mes message. Does not implicitly {@link MST.R2C_Calc_Mes.verify|verify} messages.
         * @param m R2C_Calc_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_Calc_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_Calc_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_Calc_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_Calc_Mes;
    }

    /** Properties of a R2C_Bet_Mes. */
    interface IR2C_Bet_Mes {

        /** R2C_Bet_Mes info */
        info?: (MST.IRouletteBetInfo|null);
    }

    /** Represents a R2C_Bet_Mes. */
    class R2C_Bet_Mes implements IR2C_Bet_Mes {

        /**
         * Constructs a new R2C_Bet_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_Bet_Mes);

        /** R2C_Bet_Mes info. */
        public info?: (MST.IRouletteBetInfo|null);

        /**
         * Creates a new R2C_Bet_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_Bet_Mes instance
         */
        public static create(properties?: MST.IR2C_Bet_Mes): MST.R2C_Bet_Mes;

        /**
         * Encodes the specified R2C_Bet_Mes message. Does not implicitly {@link MST.R2C_Bet_Mes.verify|verify} messages.
         * @param m R2C_Bet_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_Bet_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_Bet_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_Bet_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_Bet_Mes;
    }

    /** Properties of a R2C_PaybackPhase_Mes. */
    interface IR2C_PaybackPhase_Mes {

        /** R2C_PaybackPhase_Mes nextRound */
        nextRound?: (number|null);

        /** R2C_PaybackPhase_Mes hashSalt */
        hashSalt?: (string|null);

        /** R2C_PaybackPhase_Mes randomNum */
        randomNum?: (number|null);

        /** R2C_PaybackPhase_Mes color */
        color?: (number|null);
    }

    /** Represents a R2C_PaybackPhase_Mes. */
    class R2C_PaybackPhase_Mes implements IR2C_PaybackPhase_Mes {

        /**
         * Constructs a new R2C_PaybackPhase_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IR2C_PaybackPhase_Mes);

        /** R2C_PaybackPhase_Mes nextRound. */
        public nextRound: number;

        /** R2C_PaybackPhase_Mes hashSalt. */
        public hashSalt: string;

        /** R2C_PaybackPhase_Mes randomNum. */
        public randomNum: number;

        /** R2C_PaybackPhase_Mes color. */
        public color: number;

        /**
         * Creates a new R2C_PaybackPhase_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns R2C_PaybackPhase_Mes instance
         */
        public static create(properties?: MST.IR2C_PaybackPhase_Mes): MST.R2C_PaybackPhase_Mes;

        /**
         * Encodes the specified R2C_PaybackPhase_Mes message. Does not implicitly {@link MST.R2C_PaybackPhase_Mes.verify|verify} messages.
         * @param m R2C_PaybackPhase_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IR2C_PaybackPhase_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a R2C_PaybackPhase_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns R2C_PaybackPhase_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.R2C_PaybackPhase_Mes;
    }

    /** WingoMode enum. */
    enum WingoMode {
        CepatPlus = 0,
        Cepat = 1,
        Standar = 2
    }

    /** WingoColor enum. */
    enum WingoColor {
        Green = 0,
        Purple = 1,
        Red = 2,
        Azure = 3,
        Yellow = 4,
        Blue = 5,
        AR = 6,
        AG = 7,
        BR = 8,
        BG = 9
    }

    /** WingoBetGoldType enum. */
    enum WingoBetGoldType {
        Gold2000 = 0,
        Gold20000 = 1,
        Half = 2,
        AllIn = 3
    }

    /** WingoBetType enum. */
    enum WingoBetType {
        Num = 0,
        Color = 1
    }

    /** Properties of a WingoHistoryInfo. */
    interface IWingoHistoryInfo {

        /** WingoHistoryInfo Issue */
        Issue?: (number|Long|null);

        /** WingoHistoryInfo Num */
        Num?: (number|null);

        /** WingoHistoryInfo Harga */
        Harga?: (number|null);
    }

    /** Represents a WingoHistoryInfo. */
    class WingoHistoryInfo implements IWingoHistoryInfo {

        /**
         * Constructs a new WingoHistoryInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IWingoHistoryInfo);

        /** WingoHistoryInfo Issue. */
        public Issue: (number|Long);

        /** WingoHistoryInfo Num. */
        public Num: number;

        /** WingoHistoryInfo Harga. */
        public Harga: number;

        /**
         * Creates a new WingoHistoryInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WingoHistoryInfo instance
         */
        public static create(properties?: MST.IWingoHistoryInfo): MST.WingoHistoryInfo;

        /**
         * Encodes the specified WingoHistoryInfo message. Does not implicitly {@link MST.WingoHistoryInfo.verify|verify} messages.
         * @param m WingoHistoryInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IWingoHistoryInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WingoHistoryInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns WingoHistoryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.WingoHistoryInfo;
    }

    /** Properties of a C2M_GetWingoInfo_Req. */
    interface IC2M_GetWingoInfo_Req {

        /** C2M_GetWingoInfo_Req RpcId */
        RpcId?: (number|null);
    }

    /** Represents a C2M_GetWingoInfo_Req. */
    class C2M_GetWingoInfo_Req implements IC2M_GetWingoInfo_Req {

        /**
         * Constructs a new C2M_GetWingoInfo_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_GetWingoInfo_Req);

        /** C2M_GetWingoInfo_Req RpcId. */
        public RpcId: number;

        /**
         * Creates a new C2M_GetWingoInfo_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_GetWingoInfo_Req instance
         */
        public static create(properties?: MST.IC2M_GetWingoInfo_Req): MST.C2M_GetWingoInfo_Req;

        /**
         * Encodes the specified C2M_GetWingoInfo_Req message. Does not implicitly {@link MST.C2M_GetWingoInfo_Req.verify|verify} messages.
         * @param m C2M_GetWingoInfo_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_GetWingoInfo_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_GetWingoInfo_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_GetWingoInfo_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_GetWingoInfo_Req;
    }

    /** Properties of a M2C_GetWingoInfo_Res. */
    interface IM2C_GetWingoInfo_Res {

        /** M2C_GetWingoInfo_Res RpcId */
        RpcId?: (number|null);

        /** M2C_GetWingoInfo_Res Error */
        Error?: (number|null);

        /** M2C_GetWingoInfo_Res Message */
        Message?: (string|null);

        /** M2C_GetWingoInfo_Res CepatPlusTimestamp */
        CepatPlusTimestamp?: (number|Long|null);

        /** M2C_GetWingoInfo_Res CepatTimestamp */
        CepatTimestamp?: (number|Long|null);

        /** M2C_GetWingoInfo_Res StandarTimestamp */
        StandarTimestamp?: (number|Long|null);

        /** M2C_GetWingoInfo_Res Cost */
        Cost?: (number|null);
    }

    /** Represents a M2C_GetWingoInfo_Res. */
    class M2C_GetWingoInfo_Res implements IM2C_GetWingoInfo_Res {

        /**
         * Constructs a new M2C_GetWingoInfo_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_GetWingoInfo_Res);

        /** M2C_GetWingoInfo_Res RpcId. */
        public RpcId: number;

        /** M2C_GetWingoInfo_Res Error. */
        public Error: number;

        /** M2C_GetWingoInfo_Res Message. */
        public Message: string;

        /** M2C_GetWingoInfo_Res CepatPlusTimestamp. */
        public CepatPlusTimestamp: (number|Long);

        /** M2C_GetWingoInfo_Res CepatTimestamp. */
        public CepatTimestamp: (number|Long);

        /** M2C_GetWingoInfo_Res StandarTimestamp. */
        public StandarTimestamp: (number|Long);

        /** M2C_GetWingoInfo_Res Cost. */
        public Cost: number;

        /**
         * Creates a new M2C_GetWingoInfo_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_GetWingoInfo_Res instance
         */
        public static create(properties?: MST.IM2C_GetWingoInfo_Res): MST.M2C_GetWingoInfo_Res;

        /**
         * Encodes the specified M2C_GetWingoInfo_Res message. Does not implicitly {@link MST.M2C_GetWingoInfo_Res.verify|verify} messages.
         * @param m M2C_GetWingoInfo_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_GetWingoInfo_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_GetWingoInfo_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_GetWingoInfo_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_GetWingoInfo_Res;
    }

    /** Properties of a C2M_GetWingoHistory_Req. */
    interface IC2M_GetWingoHistory_Req {

        /** C2M_GetWingoHistory_Req RpcId */
        RpcId?: (number|null);

        /** C2M_GetWingoHistory_Req Mode */
        Mode?: (number|null);
    }

    /** Represents a C2M_GetWingoHistory_Req. */
    class C2M_GetWingoHistory_Req implements IC2M_GetWingoHistory_Req {

        /**
         * Constructs a new C2M_GetWingoHistory_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_GetWingoHistory_Req);

        /** C2M_GetWingoHistory_Req RpcId. */
        public RpcId: number;

        /** C2M_GetWingoHistory_Req Mode. */
        public Mode: number;

        /**
         * Creates a new C2M_GetWingoHistory_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_GetWingoHistory_Req instance
         */
        public static create(properties?: MST.IC2M_GetWingoHistory_Req): MST.C2M_GetWingoHistory_Req;

        /**
         * Encodes the specified C2M_GetWingoHistory_Req message. Does not implicitly {@link MST.C2M_GetWingoHistory_Req.verify|verify} messages.
         * @param m C2M_GetWingoHistory_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_GetWingoHistory_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_GetWingoHistory_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_GetWingoHistory_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_GetWingoHistory_Req;
    }

    /** Properties of a M2C_GetWingoHistory_Res. */
    interface IM2C_GetWingoHistory_Res {

        /** M2C_GetWingoHistory_Res RpcId */
        RpcId?: (number|null);

        /** M2C_GetWingoHistory_Res Error */
        Error?: (number|null);

        /** M2C_GetWingoHistory_Res Message */
        Message?: (string|null);

        /** M2C_GetWingoHistory_Res Mode */
        Mode?: (number|null);

        /** M2C_GetWingoHistory_Res CurrIssue */
        CurrIssue?: (number|Long|null);

        /** M2C_GetWingoHistory_Res HistoryInfo */
        HistoryInfo?: (MST.IWingoHistoryInfo[]|null);
    }

    /** Represents a M2C_GetWingoHistory_Res. */
    class M2C_GetWingoHistory_Res implements IM2C_GetWingoHistory_Res {

        /**
         * Constructs a new M2C_GetWingoHistory_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_GetWingoHistory_Res);

        /** M2C_GetWingoHistory_Res RpcId. */
        public RpcId: number;

        /** M2C_GetWingoHistory_Res Error. */
        public Error: number;

        /** M2C_GetWingoHistory_Res Message. */
        public Message: string;

        /** M2C_GetWingoHistory_Res Mode. */
        public Mode: number;

        /** M2C_GetWingoHistory_Res CurrIssue. */
        public CurrIssue: (number|Long);

        /** M2C_GetWingoHistory_Res HistoryInfo. */
        public HistoryInfo: MST.IWingoHistoryInfo[];

        /**
         * Creates a new M2C_GetWingoHistory_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_GetWingoHistory_Res instance
         */
        public static create(properties?: MST.IM2C_GetWingoHistory_Res): MST.M2C_GetWingoHistory_Res;

        /**
         * Encodes the specified M2C_GetWingoHistory_Res message. Does not implicitly {@link MST.M2C_GetWingoHistory_Res.verify|verify} messages.
         * @param m M2C_GetWingoHistory_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_GetWingoHistory_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_GetWingoHistory_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_GetWingoHistory_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_GetWingoHistory_Res;
    }

    /** Properties of a M2C_WingoLottery_Mes. */
    interface IM2C_WingoLottery_Mes {

        /** M2C_WingoLottery_Mes Mode */
        Mode?: (number|null);

        /** M2C_WingoLottery_Mes LotteryInfo */
        LotteryInfo?: (MST.IWingoHistoryInfo|null);

        /** M2C_WingoLottery_Mes NextTimestamp */
        NextTimestamp?: (number|Long|null);

        /** M2C_WingoLottery_Mes NextIssue */
        NextIssue?: (number|Long|null);
    }

    /** Represents a M2C_WingoLottery_Mes. */
    class M2C_WingoLottery_Mes implements IM2C_WingoLottery_Mes {

        /**
         * Constructs a new M2C_WingoLottery_Mes.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_WingoLottery_Mes);

        /** M2C_WingoLottery_Mes Mode. */
        public Mode: number;

        /** M2C_WingoLottery_Mes LotteryInfo. */
        public LotteryInfo?: (MST.IWingoHistoryInfo|null);

        /** M2C_WingoLottery_Mes NextTimestamp. */
        public NextTimestamp: (number|Long);

        /** M2C_WingoLottery_Mes NextIssue. */
        public NextIssue: (number|Long);

        /**
         * Creates a new M2C_WingoLottery_Mes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_WingoLottery_Mes instance
         */
        public static create(properties?: MST.IM2C_WingoLottery_Mes): MST.M2C_WingoLottery_Mes;

        /**
         * Encodes the specified M2C_WingoLottery_Mes message. Does not implicitly {@link MST.M2C_WingoLottery_Mes.verify|verify} messages.
         * @param m M2C_WingoLottery_Mes message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_WingoLottery_Mes, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_WingoLottery_Mes message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_WingoLottery_Mes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_WingoLottery_Mes;
    }

    /** Properties of a C2M_WingoBet_Req. */
    interface IC2M_WingoBet_Req {

        /** C2M_WingoBet_Req RpcId */
        RpcId?: (number|null);

        /** C2M_WingoBet_Req Mode */
        Mode?: (number|null);

        /** C2M_WingoBet_Req BetType */
        BetType?: (number|null);

        /** C2M_WingoBet_Req BetValue */
        BetValue?: (number|null);

        /** C2M_WingoBet_Req Multi */
        Multi?: (number|null);

        /** C2M_WingoBet_Req GoldType */
        GoldType?: (number|null);
    }

    /** Represents a C2M_WingoBet_Req. */
    class C2M_WingoBet_Req implements IC2M_WingoBet_Req {

        /**
         * Constructs a new C2M_WingoBet_Req.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2M_WingoBet_Req);

        /** C2M_WingoBet_Req RpcId. */
        public RpcId: number;

        /** C2M_WingoBet_Req Mode. */
        public Mode: number;

        /** C2M_WingoBet_Req BetType. */
        public BetType: number;

        /** C2M_WingoBet_Req BetValue. */
        public BetValue: number;

        /** C2M_WingoBet_Req Multi. */
        public Multi: number;

        /** C2M_WingoBet_Req GoldType. */
        public GoldType: number;

        /**
         * Creates a new C2M_WingoBet_Req instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2M_WingoBet_Req instance
         */
        public static create(properties?: MST.IC2M_WingoBet_Req): MST.C2M_WingoBet_Req;

        /**
         * Encodes the specified C2M_WingoBet_Req message. Does not implicitly {@link MST.C2M_WingoBet_Req.verify|verify} messages.
         * @param m C2M_WingoBet_Req message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2M_WingoBet_Req, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2M_WingoBet_Req message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2M_WingoBet_Req
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2M_WingoBet_Req;
    }

    /** Properties of a M2C_WingoBet_Res. */
    interface IM2C_WingoBet_Res {

        /** M2C_WingoBet_Res RpcId */
        RpcId?: (number|null);

        /** M2C_WingoBet_Res Error */
        Error?: (number|null);

        /** M2C_WingoBet_Res Message */
        Message?: (string|null);
    }

    /** Represents a M2C_WingoBet_Res. */
    class M2C_WingoBet_Res implements IM2C_WingoBet_Res {

        /**
         * Constructs a new M2C_WingoBet_Res.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IM2C_WingoBet_Res);

        /** M2C_WingoBet_Res RpcId. */
        public RpcId: number;

        /** M2C_WingoBet_Res Error. */
        public Error: number;

        /** M2C_WingoBet_Res Message. */
        public Message: string;

        /**
         * Creates a new M2C_WingoBet_Res instance using the specified properties.
         * @param [properties] Properties to set
         * @returns M2C_WingoBet_Res instance
         */
        public static create(properties?: MST.IM2C_WingoBet_Res): MST.M2C_WingoBet_Res;

        /**
         * Encodes the specified M2C_WingoBet_Res message. Does not implicitly {@link MST.M2C_WingoBet_Res.verify|verify} messages.
         * @param m M2C_WingoBet_Res message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IM2C_WingoBet_Res, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a M2C_WingoBet_Res message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns M2C_WingoBet_Res
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.M2C_WingoBet_Res;
    }

    /** Properties of a WingoMyRecordInfo. */
    interface IWingoMyRecordInfo {

        /** WingoMyRecordInfo id */
        id?: (number|null);

        /** WingoMyRecordInfo gameNo */
        gameNo?: (number|null);

        /** WingoMyRecordInfo betTimestamp */
        betTimestamp?: (number|Long|null);

        /** WingoMyRecordInfo incomeGold */
        incomeGold?: (number|Long|null);

        /** WingoMyRecordInfo betActualGold */
        betActualGold?: (number|Long|null);

        /** WingoMyRecordInfo costGold */
        costGold?: (number|Long|null);

        /** WingoMyRecordInfo betType */
        betType?: (number|null);

        /** WingoMyRecordInfo betValue */
        betValue?: (number|null);

        /** WingoMyRecordInfo harga */
        harga?: (number|null);

        /** WingoMyRecordInfo isFinish */
        isFinish?: (boolean|null);

        /** WingoMyRecordInfo num */
        num?: (number|null);
    }

    /** Represents a WingoMyRecordInfo. */
    class WingoMyRecordInfo implements IWingoMyRecordInfo {

        /**
         * Constructs a new WingoMyRecordInfo.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IWingoMyRecordInfo);

        /** WingoMyRecordInfo id. */
        public id: number;

        /** WingoMyRecordInfo gameNo. */
        public gameNo: number;

        /** WingoMyRecordInfo betTimestamp. */
        public betTimestamp: (number|Long);

        /** WingoMyRecordInfo incomeGold. */
        public incomeGold: (number|Long);

        /** WingoMyRecordInfo betActualGold. */
        public betActualGold: (number|Long);

        /** WingoMyRecordInfo costGold. */
        public costGold: (number|Long);

        /** WingoMyRecordInfo betType. */
        public betType: number;

        /** WingoMyRecordInfo betValue. */
        public betValue: number;

        /** WingoMyRecordInfo harga. */
        public harga: number;

        /** WingoMyRecordInfo isFinish. */
        public isFinish: boolean;

        /** WingoMyRecordInfo num. */
        public num: number;

        /**
         * Creates a new WingoMyRecordInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WingoMyRecordInfo instance
         */
        public static create(properties?: MST.IWingoMyRecordInfo): MST.WingoMyRecordInfo;

        /**
         * Encodes the specified WingoMyRecordInfo message. Does not implicitly {@link MST.WingoMyRecordInfo.verify|verify} messages.
         * @param m WingoMyRecordInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IWingoMyRecordInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WingoMyRecordInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns WingoMyRecordInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.WingoMyRecordInfo;
    }

    /** Properties of a C2S_WingoMyRecord. */
    interface IC2S_WingoMyRecord {

        /** C2S_WingoMyRecord serial */
        serial?: (number|null);

        /** C2S_WingoMyRecord mode */
        mode?: (number|null);

        /** C2S_WingoMyRecord id */
        id?: (number|null);

        /** C2S_WingoMyRecord count */
        count?: (number|null);
    }

    /** Represents a C2S_WingoMyRecord. */
    class C2S_WingoMyRecord implements IC2S_WingoMyRecord {

        /**
         * Constructs a new C2S_WingoMyRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IC2S_WingoMyRecord);

        /** C2S_WingoMyRecord serial. */
        public serial: number;

        /** C2S_WingoMyRecord mode. */
        public mode: number;

        /** C2S_WingoMyRecord id. */
        public id: number;

        /** C2S_WingoMyRecord count. */
        public count: number;

        /**
         * Creates a new C2S_WingoMyRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_WingoMyRecord instance
         */
        public static create(properties?: MST.IC2S_WingoMyRecord): MST.C2S_WingoMyRecord;

        /**
         * Encodes the specified C2S_WingoMyRecord message. Does not implicitly {@link MST.C2S_WingoMyRecord.verify|verify} messages.
         * @param m C2S_WingoMyRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IC2S_WingoMyRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_WingoMyRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns C2S_WingoMyRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.C2S_WingoMyRecord;
    }

    /** Properties of a S2C_WingoMyRecord. */
    interface IS2C_WingoMyRecord {

        /** S2C_WingoMyRecord serial */
        serial?: (number|null);

        /** S2C_WingoMyRecord code */
        code?: (number|null);

        /** S2C_WingoMyRecord id */
        id?: (number|null);

        /** S2C_WingoMyRecord myRecordInfo */
        myRecordInfo?: (MST.IWingoMyRecordInfo[]|null);
    }

    /** Represents a S2C_WingoMyRecord. */
    class S2C_WingoMyRecord implements IS2C_WingoMyRecord {

        /**
         * Constructs a new S2C_WingoMyRecord.
         * @param [p] Properties to set
         */
        constructor(p?: MST.IS2C_WingoMyRecord);

        /** S2C_WingoMyRecord serial. */
        public serial: number;

        /** S2C_WingoMyRecord code. */
        public code: number;

        /** S2C_WingoMyRecord id. */
        public id: number;

        /** S2C_WingoMyRecord myRecordInfo. */
        public myRecordInfo: MST.IWingoMyRecordInfo[];

        /**
         * Creates a new S2C_WingoMyRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_WingoMyRecord instance
         */
        public static create(properties?: MST.IS2C_WingoMyRecord): MST.S2C_WingoMyRecord;

        /**
         * Encodes the specified S2C_WingoMyRecord message. Does not implicitly {@link MST.S2C_WingoMyRecord.verify|verify} messages.
         * @param m S2C_WingoMyRecord message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: MST.IS2C_WingoMyRecord, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_WingoMyRecord message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns S2C_WingoMyRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): MST.S2C_WingoMyRecord;
    }

    /** OuterOpcode_CrashGame enum. */
    enum OuterOpcode_CrashGame {
        None = 0,
        C2M_GetCrashInfo_Req = 10402,
        M2C_GetCrashInfo_Res = 10403,
        M2C_CrashStart_mes = 10404,
        C2M_MyCrashBet_Req = 10405,
        M2C_MyCrashBet_Res = 10406,
        M2C_CrashBet_Mes = 10407,
        M2C_CrashStop_Mes = 10408,
        M2C_CrashStartBet_Mes = 10409,
        M2C_CrashEscape_Mes = 10410,
        M2C_CrashStopBet_Mes = 10411,
        C2M_CrashCancelAutoBet_Req = 10412,
        M2C_CrashCancelAutoBet_Res = 10413,
        M2C_CrashCancelAutoBet_Mes = 10414,
        M2C_CrashHash_Mes = 10415,
        C2M_CrashHashRecord_Req = 10416,
        M2C_CrashHashRecord_Res = 10417,
        C2S_CrashMyRecord = 10418,
        S2C_CrashMyRecord = 10419
    }

    /** OuterOpcode_Gate enum. */
    enum OuterOpcode_Gate {
        None = 0,
        C2G_EnterMap_Req = 10102,
        G2C_EnterMap_Res = 10103,
        C2G_Ping_Req = 10104,
        G2C_Ping_Res = 10105,
        C2G_LoginGate_Req = 10106,
        G2C_LoginGate_Res = 10107,
        G2C_SystemError_Mes = 10110
    }

    /** OuterOpcode_Lobby enum. */
    enum OuterOpcode_Lobby {
        None = 0,
        C2L_BindMailBox_Req = 10302,
        L2C_BindMailBox_Res = 10303,
        C2L_BindPhone_Req = 10304,
        L2C_BindPhone_Res = 10305,
        C2L_GoldRankDay_Req = 10306,
        L2C_GoldRankDay_Res = 10307,
        C2L_BetRank_Req = 10308,
        L2C_BetRank_Res = 10309,
        C2L_WinDayRank_Req = 10310,
        L2C_WinDayRank_Res = 10311,
        C2L_WinWeekRank_Req = 10312,
        L2C_WinWeekRank_Res = 10313,
        C2L_WinMonthRank_Req = 10314,
        L2C_WinMonthRank_Res = 10315,
        C2L_GetGameList_Req = 10316,
        L2C_GetGameList_Res = 10317,
        L2C_ChipsChange_Mes = 10318,
        C2L_Deposit_Req = 10319,
        L2C_Deposit_Res = 10320,
        C2L_Withdraw_Req = 10321,
        L2C_Withdraw_Res = 10322,
        C2L_GetWithdrawReocrds_Req = 10323,
        L2C_GetWithdrawRecords_Res = 10324,
        C2L_GetDepositLimit_Req = 10325,
        L2C_GetDepositLimit_Res = 10326,
        C2L_GetWithdrawLimit_Req = 10327,
        L2C_GetWithdrawLimit_Res = 10328,
        C2L_GetStoreList_Req = 10329,
        L2C_GetStoreList_Res = 10330,
        C2L_GetBankList_Req = 10331,
        L2C_GetBankList_Res = 10332,
        C2L_BindBankCard_Req = 10333,
        L2C_BindBankCard_Res = 10334,
        C2L_GetBankCardInfo_Req = 10335,
        L2C_GetBankCardInfo_Res = 10336,
        C2S_MinigameInfo = 10337,
        S2C_MinigameInfo = 10338,
        C2S_MinigameLottery = 10339,
        S2C_MinigameLottery = 10340,
        C2S_GetSignedInfo = 10341,
        S2C_GetSignedInfo = 10342,
        C2S_Signed = 10343,
        S2C_Signed = 10344,
        C2S_Register = 10345,
        S2C_Register = 10346,
        C2S_ResetPassword = 10347,
        S2C_ResetPassword = 10348,
        C2S_GetCheckCode = 10349,
        S2C_GetCheckCode = 10350,
        C2S_BindPhone = 10351,
        S2C_BindPhone = 10352,
        C2S_BindEmail = 10353,
        S2C_BindEmail = 10354,
        C2S_GetRegisterRewardConfig = 10355,
        S2C_GetRegisterRewordConfig = 10356,
        C2S_PromotionInfo = 10357,
        S2C_PromotionInfo = 10358,
        C2S_ModifyAvartar = 10359,
        S2C_ModifyAvartar = 10360,
        C2S_GetDepositList = 10361,
        S2C_GetDepositList = 10362,
        C2S_GetMissionList = 10363,
        S2C_GetMissionList = 10364,
        C2S_MissionClaim = 10365,
        S2C_MissionClaim = 10366,
        S2C_MessageNotify = 10367
    }

    /** OuterOpcode_Map enum. */
    enum OuterOpcode_Map {
        None = 0,
        M2C_CreateUnits_Mes = 10202,
        M2C_CreateMyUnit_Mes = 10203,
        M2C_StartSceneChange_Mes = 10204,
        M2C_RemoveUnits_Mes = 10205,
        C2M_TransferMap_Req = 10206,
        M2C_TransferMap_Res = 10207,
        C2M_Auth_Req = 10208,
        M2C_Auth_Res = 10209,
        C2M_AuthOut_Req = 10210,
        M2C_AuthOut_Res = 10211,
        M2C_KickOut_Mes = 10212,
        M2C_GoldChange_Mes = 10213
    }

    /** OuterOpcode_Roulette enum. */
    enum OuterOpcode_Roulette {
        None = 0,
        C2M_GetRouletteInfo_Req = 10802,
        M2C_GetRouletteInfo_Res = 10803,
        M2C_RouletteStart_mes = 10804,
        C2M_MyRouletteBet_Req = 10805,
        M2C_MyRouletteBet_Res = 10806,
        C2R_GetBetRankInfo_Req = 10807,
        R2C_GetBetRandInfo_Res = 10808,
        M2C_RouletteStartBet_Mes = 10809,
        C2R_GetGameRecords_Req = 10810,
        R2C_GetGameRecords_Res = 10811,
        C2R_GetBetInfo_Req = 10812,
        R2C_GetBetInfo_Res = 10813,
        R2C_Calc_Mes = 10814,
        R2C_Bet_Mes = 10815,
        R2C_PaybackPhase_Mes = 10816
    }

    /** OuterOpcode_WingoGame enum. */
    enum OuterOpcode_WingoGame {
        None = 0,
        C2M_GetWingoInfo_Req = 10702,
        M2C_GetWingoInfo_Res = 10703,
        C2M_GetWingoHistory_Req = 10704,
        M2C_GetWingoHistory_Res = 10705,
        M2C_WingoLottery_Mes = 10706,
        C2M_WingoBet_Req = 10707,
        M2C_WingoBet_Res = 10708,
        C2S_WingoMyRecord = 10709,
        S2C_WingoMyRecord = 10710
    }
}
