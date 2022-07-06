"use strict";
cc._RF.push(module, '489e8whLTZAzL2PBH5SgugR', 'protoc');
// script/framework/external/protoc.js

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf; // Common aliases

var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util; // Exported root namespace

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MST = function () {
  /**
   * Namespace MST.
   * @exports MST
   * @namespace
   */
  var MST = {};
  /**
   * ErrorCodeGame enum.
   * @name MST.ErrorCodeGame
   * @enum {number}
   * @property {number} ERR_SUCCESS=0 ERR_SUCCESS value
   * @property {number} ERR_LoginError=300002 ERR_LoginError value
   * @property {number} ERR_FunctionRepeatedCall=300003 ERR_FunctionRepeatedCall value
   * @property {number} ERR_LoginLockError=300004 ERR_LoginLockError value
   * @property {number} ERR_TransferMapError=300005 ERR_TransferMapError value
   * @property {number} ERR_LoginUnitDBError=300006 ERR_LoginUnitDBError value
   * @property {number} ERR_ChangeUnitNotFound=300007 ERR_ChangeUnitNotFound value
   * @property {number} ERR_PlayerNotAuth=300008 ERR_PlayerNotAuth value
   * @property {number} ERR_RoomLost=300009 ERR_RoomLost value
   * @property {number} ERR_CannotBet=300010 ERR_CannotBet value
   * @property {number} ERR_BetError=300011 ERR_BetError value
   * @property {number} ERR_Subscription=300012 ERR_Subscription value
   * @property {number} ERR_CrashAutoBetLimit=300013 ERR_CrashAutoBetLimit value
   * @property {number} ERR_BetCountLimit=300014 ERR_BetCountLimit value
   * @property {number} ERR_AddAutoBetLimit=300015 ERR_AddAutoBetLimit value
   * @property {number} ERR_CrashAutoBetStopLose=300016 ERR_CrashAutoBetStopLose value
   * @property {number} ERR_CrashAutoBetStopProfit=300017 ERR_CrashAutoBetStopProfit value
   * @property {number} ERR_CrashAutoBetFinish=300018 ERR_CrashAutoBetFinish value
   * @property {number} ERR_CrashAutoBetNotExist=300019 ERR_CrashAutoBetNotExist value
   * @property {number} ERR_SubScriptionRepeated=300020 ERR_SubScriptionRepeated value
   * @property {number} ERR_GetHashRecordParam=300021 ERR_GetHashRecordParam value
   * @property {number} ERR_GetHashRecordNotExit=300022 ERR_GetHashRecordNotExit value
   * @property {number} ERR_InvalidToken=300023 ERR_InvalidToken value
   * @property {number} ERR_LogoutFailed=300024 ERR_LogoutFailed value
   * @property {number} ERR_ChipsInsufficient=300025 ERR_ChipsInsufficient value
   * @property {number} ERR_DepositFailed=300026 ERR_DepositFailed value
   * @property {number} ERR_WithdrawFailed=300027 ERR_WithdrawFailed value
   * @property {number} ERR_GetBankListFailed=300028 ERR_GetBankListFailed value
   * @property {number} ERR_SignInFailed=300029 ERR_SignInFailed value
   * @property {number} ERR_InvalidPhoneNoOrEmail=300030 ERR_InvalidPhoneNoOrEmail value
   * @property {number} ERR_InvalidParam=300031 ERR_InvalidParam value
   * @property {number} ERR_InvalidCheckCode=300032 ERR_InvalidCheckCode value
   * @property {number} ERR_PhoneNoExist=300033 ERR_PhoneNoExist value
   * @property {number} ERR_EmailExist=300034 ERR_EmailExist value
   * @property {number} ERR_ImeiExist=300035 ERR_ImeiExist value
   * @property {number} ERR_RegisterFailed=300036 ERR_RegisterFailed value
   * @property {number} ERR_ResetPasswordFailed=300037 ERR_ResetPasswordFailed value
   * @property {number} ERR_PlayTinyGameFailed=300038 ERR_PlayTinyGameFailed value
   * @property {number} ERR_ClaimMissionFailed=300039 ERR_ClaimMissionFailed value
   * @property {number} ERR_ServerIsClosing=300040 ERR_ServerIsClosing value
   */

  MST.ErrorCodeGame = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "ERR_SUCCESS"] = 0;
    values[valuesById[300002] = "ERR_LoginError"] = 300002;
    values[valuesById[300003] = "ERR_FunctionRepeatedCall"] = 300003;
    values[valuesById[300004] = "ERR_LoginLockError"] = 300004;
    values[valuesById[300005] = "ERR_TransferMapError"] = 300005;
    values[valuesById[300006] = "ERR_LoginUnitDBError"] = 300006;
    values[valuesById[300007] = "ERR_ChangeUnitNotFound"] = 300007;
    values[valuesById[300008] = "ERR_PlayerNotAuth"] = 300008;
    values[valuesById[300009] = "ERR_RoomLost"] = 300009;
    values[valuesById[300010] = "ERR_CannotBet"] = 300010;
    values[valuesById[300011] = "ERR_BetError"] = 300011;
    values[valuesById[300012] = "ERR_Subscription"] = 300012;
    values[valuesById[300013] = "ERR_CrashAutoBetLimit"] = 300013;
    values[valuesById[300014] = "ERR_BetCountLimit"] = 300014;
    values[valuesById[300015] = "ERR_AddAutoBetLimit"] = 300015;
    values[valuesById[300016] = "ERR_CrashAutoBetStopLose"] = 300016;
    values[valuesById[300017] = "ERR_CrashAutoBetStopProfit"] = 300017;
    values[valuesById[300018] = "ERR_CrashAutoBetFinish"] = 300018;
    values[valuesById[300019] = "ERR_CrashAutoBetNotExist"] = 300019;
    values[valuesById[300020] = "ERR_SubScriptionRepeated"] = 300020;
    values[valuesById[300021] = "ERR_GetHashRecordParam"] = 300021;
    values[valuesById[300022] = "ERR_GetHashRecordNotExit"] = 300022;
    values[valuesById[300023] = "ERR_InvalidToken"] = 300023;
    values[valuesById[300024] = "ERR_LogoutFailed"] = 300024;
    values[valuesById[300025] = "ERR_ChipsInsufficient"] = 300025;
    values[valuesById[300026] = "ERR_DepositFailed"] = 300026;
    values[valuesById[300027] = "ERR_WithdrawFailed"] = 300027;
    values[valuesById[300028] = "ERR_GetBankListFailed"] = 300028;
    values[valuesById[300029] = "ERR_SignInFailed"] = 300029;
    values[valuesById[300030] = "ERR_InvalidPhoneNoOrEmail"] = 300030;
    values[valuesById[300031] = "ERR_InvalidParam"] = 300031;
    values[valuesById[300032] = "ERR_InvalidCheckCode"] = 300032;
    values[valuesById[300033] = "ERR_PhoneNoExist"] = 300033;
    values[valuesById[300034] = "ERR_EmailExist"] = 300034;
    values[valuesById[300035] = "ERR_ImeiExist"] = 300035;
    values[valuesById[300036] = "ERR_RegisterFailed"] = 300036;
    values[valuesById[300037] = "ERR_ResetPasswordFailed"] = 300037;
    values[valuesById[300038] = "ERR_PlayTinyGameFailed"] = 300038;
    values[valuesById[300039] = "ERR_ClaimMissionFailed"] = 300039;
    values[valuesById[300040] = "ERR_ServerIsClosing"] = 300040;
    return values;
  }();

  MST.HashInfoCell = function () {
    /**
     * Properties of a HashInfoCell.
     * @memberof MST
     * @interface IHashInfoCell
     * @property {string|null} [ServerSeed] HashInfoCell ServerSeed
     * @property {string|null} [ServerHashSeed] HashInfoCell ServerHashSeed
     * @property {number|Long|null} [PublicSeed] HashInfoCell PublicSeed
     * @property {number|Long|null} [GameNo] HashInfoCell GameNo
     * @property {string|null} [RoundHash] HashInfoCell RoundHash
     */

    /**
     * Constructs a new HashInfoCell.
     * @memberof MST
     * @classdesc Represents a HashInfoCell.
     * @implements IHashInfoCell
     * @constructor
     * @param {MST.IHashInfoCell=} [p] Properties to set
     */
    function HashInfoCell(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * HashInfoCell ServerSeed.
     * @member {string} ServerSeed
     * @memberof MST.HashInfoCell
     * @instance
     */


    HashInfoCell.prototype.ServerSeed = "";
    /**
     * HashInfoCell ServerHashSeed.
     * @member {string} ServerHashSeed
     * @memberof MST.HashInfoCell
     * @instance
     */

    HashInfoCell.prototype.ServerHashSeed = "";
    /**
     * HashInfoCell PublicSeed.
     * @member {number|Long} PublicSeed
     * @memberof MST.HashInfoCell
     * @instance
     */

    HashInfoCell.prototype.PublicSeed = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * HashInfoCell GameNo.
     * @member {number|Long} GameNo
     * @memberof MST.HashInfoCell
     * @instance
     */

    HashInfoCell.prototype.GameNo = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * HashInfoCell RoundHash.
     * @member {string} RoundHash
     * @memberof MST.HashInfoCell
     * @instance
     */

    HashInfoCell.prototype.RoundHash = "";
    /**
     * Creates a new HashInfoCell instance using the specified properties.
     * @function create
     * @memberof MST.HashInfoCell
     * @static
     * @param {MST.IHashInfoCell=} [properties] Properties to set
     * @returns {MST.HashInfoCell} HashInfoCell instance
     */

    HashInfoCell.create = function create(properties) {
      return new HashInfoCell(properties);
    };
    /**
     * Encodes the specified HashInfoCell message. Does not implicitly {@link MST.HashInfoCell.verify|verify} messages.
     * @function encode
     * @memberof MST.HashInfoCell
     * @static
     * @param {MST.IHashInfoCell} m HashInfoCell message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    HashInfoCell.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.ServerSeed != null && Object.hasOwnProperty.call(m, "ServerSeed")) w.uint32(10).string(m.ServerSeed);
      if (m.ServerHashSeed != null && Object.hasOwnProperty.call(m, "ServerHashSeed")) w.uint32(18).string(m.ServerHashSeed);
      if (m.PublicSeed != null && Object.hasOwnProperty.call(m, "PublicSeed")) w.uint32(24).int64(m.PublicSeed);
      if (m.GameNo != null && Object.hasOwnProperty.call(m, "GameNo")) w.uint32(32).int64(m.GameNo);
      if (m.RoundHash != null && Object.hasOwnProperty.call(m, "RoundHash")) w.uint32(42).string(m.RoundHash);
      return w;
    };
    /**
     * Decodes a HashInfoCell message from the specified reader or buffer.
     * @function decode
     * @memberof MST.HashInfoCell
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.HashInfoCell} HashInfoCell
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    HashInfoCell.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.HashInfoCell();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.ServerSeed = r.string();
            break;

          case 2:
            m.ServerHashSeed = r.string();
            break;

          case 3:
            m.PublicSeed = r.int64();
            break;

          case 4:
            m.GameNo = r.int64();
            break;

          case 5:
            m.RoundHash = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return HashInfoCell;
  }();

  MST.RankInfoCell = function () {
    /**
     * Properties of a RankInfoCell.
     * @memberof MST
     * @interface IRankInfoCell
     * @property {number|Long|null} [AccountId] RankInfoCell AccountId
     * @property {string|null} [Nick] RankInfoCell Nick
     * @property {number|Long|null} [Score] RankInfoCell Score
     * @property {string|null} [headUrl] RankInfoCell headUrl
     */

    /**
     * Constructs a new RankInfoCell.
     * @memberof MST
     * @classdesc Represents a RankInfoCell.
     * @implements IRankInfoCell
     * @constructor
     * @param {MST.IRankInfoCell=} [p] Properties to set
     */
    function RankInfoCell(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * RankInfoCell AccountId.
     * @member {number|Long} AccountId
     * @memberof MST.RankInfoCell
     * @instance
     */


    RankInfoCell.prototype.AccountId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * RankInfoCell Nick.
     * @member {string} Nick
     * @memberof MST.RankInfoCell
     * @instance
     */

    RankInfoCell.prototype.Nick = "";
    /**
     * RankInfoCell Score.
     * @member {number|Long} Score
     * @memberof MST.RankInfoCell
     * @instance
     */

    RankInfoCell.prototype.Score = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * RankInfoCell headUrl.
     * @member {string} headUrl
     * @memberof MST.RankInfoCell
     * @instance
     */

    RankInfoCell.prototype.headUrl = "";
    /**
     * Creates a new RankInfoCell instance using the specified properties.
     * @function create
     * @memberof MST.RankInfoCell
     * @static
     * @param {MST.IRankInfoCell=} [properties] Properties to set
     * @returns {MST.RankInfoCell} RankInfoCell instance
     */

    RankInfoCell.create = function create(properties) {
      return new RankInfoCell(properties);
    };
    /**
     * Encodes the specified RankInfoCell message. Does not implicitly {@link MST.RankInfoCell.verify|verify} messages.
     * @function encode
     * @memberof MST.RankInfoCell
     * @static
     * @param {MST.IRankInfoCell} m RankInfoCell message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    RankInfoCell.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.AccountId != null && Object.hasOwnProperty.call(m, "AccountId")) w.uint32(8).int64(m.AccountId);
      if (m.Nick != null && Object.hasOwnProperty.call(m, "Nick")) w.uint32(18).string(m.Nick);
      if (m.Score != null && Object.hasOwnProperty.call(m, "Score")) w.uint32(24).int64(m.Score);
      if (m.headUrl != null && Object.hasOwnProperty.call(m, "headUrl")) w.uint32(34).string(m.headUrl);
      return w;
    };
    /**
     * Decodes a RankInfoCell message from the specified reader or buffer.
     * @function decode
     * @memberof MST.RankInfoCell
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.RankInfoCell} RankInfoCell
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    RankInfoCell.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.RankInfoCell();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.AccountId = r.int64();
            break;

          case 2:
            m.Nick = r.string();
            break;

          case 3:
            m.Score = r.int64();
            break;

          case 4:
            m.headUrl = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return RankInfoCell;
  }();

  MST.CrashBetInfo = function () {
    /**
     * Properties of a CrashBetInfo.
     * @memberof MST
     * @interface ICrashBetInfo
     * @property {MST.IUnitInfo|null} [player] CrashBetInfo player
     * @property {number|Long|null} [BetGold] CrashBetInfo BetGold
     * @property {number|Long|null} [Multiple] CrashBetInfo Multiple
     */

    /**
     * Constructs a new CrashBetInfo.
     * @memberof MST
     * @classdesc Represents a CrashBetInfo.
     * @implements ICrashBetInfo
     * @constructor
     * @param {MST.ICrashBetInfo=} [p] Properties to set
     */
    function CrashBetInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashBetInfo player.
     * @member {MST.IUnitInfo|null|undefined} player
     * @memberof MST.CrashBetInfo
     * @instance
     */


    CrashBetInfo.prototype.player = null;
    /**
     * CrashBetInfo BetGold.
     * @member {number|Long} BetGold
     * @memberof MST.CrashBetInfo
     * @instance
     */

    CrashBetInfo.prototype.BetGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashBetInfo Multiple.
     * @member {number|Long} Multiple
     * @memberof MST.CrashBetInfo
     * @instance
     */

    CrashBetInfo.prototype.Multiple = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new CrashBetInfo instance using the specified properties.
     * @function create
     * @memberof MST.CrashBetInfo
     * @static
     * @param {MST.ICrashBetInfo=} [properties] Properties to set
     * @returns {MST.CrashBetInfo} CrashBetInfo instance
     */

    CrashBetInfo.create = function create(properties) {
      return new CrashBetInfo(properties);
    };
    /**
     * Encodes the specified CrashBetInfo message. Does not implicitly {@link MST.CrashBetInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashBetInfo
     * @static
     * @param {MST.ICrashBetInfo} m CrashBetInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashBetInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.player != null && Object.hasOwnProperty.call(m, "player")) $root.MST.UnitInfo.encode(m.player, w.uint32(10).fork()).ldelim();
      if (m.BetGold != null && Object.hasOwnProperty.call(m, "BetGold")) w.uint32(16).int64(m.BetGold);
      if (m.Multiple != null && Object.hasOwnProperty.call(m, "Multiple")) w.uint32(24).int64(m.Multiple);
      return w;
    };
    /**
     * Decodes a CrashBetInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashBetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashBetInfo} CrashBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashBetInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashBetInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.player = $root.MST.UnitInfo.decode(r, r.uint32());
            break;

          case 2:
            m.BetGold = r.int64();
            break;

          case 3:
            m.Multiple = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashBetInfo;
  }();
  /**
   * CrashStatus enum.
   * @name MST.CrashStatus
   * @enum {number}
   * @property {number} StartBet=0 StartBet value
   * @property {number} StopBet=1 StopBet value
   * @property {number} GameBegin=2 GameBegin value
   * @property {number} GameOver=3 GameOver value
   */


  MST.CrashStatus = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "StartBet"] = 0;
    values[valuesById[1] = "StopBet"] = 1;
    values[valuesById[2] = "GameBegin"] = 2;
    values[valuesById[3] = "GameOver"] = 3;
    return values;
  }();
  /**
   * CrashMode enum.
   * @name MST.CrashMode
   * @enum {number}
   * @property {number} Manual=0 Manual value
   * @property {number} Auto=1 Auto value
   */


  MST.CrashMode = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Manual"] = 0;
    values[valuesById[1] = "Auto"] = 1;
    return values;
  }();

  MST.CrashAutoBetInfo = function () {
    /**
     * Properties of a CrashAutoBetInfo.
     * @memberof MST
     * @interface ICrashAutoBetInfo
     * @property {number|Long|null} [BetGold] CrashAutoBetInfo BetGold
     * @property {number|Long|null} [BetMultiple] CrashAutoBetInfo BetMultiple
     * @property {number|null} [AutoRound] CrashAutoBetInfo AutoRound
     * @property {number|Long|null} [StopProfit] CrashAutoBetInfo StopProfit
     * @property {number|Long|null} [StopLoss] CrashAutoBetInfo StopLoss
     */

    /**
     * Constructs a new CrashAutoBetInfo.
     * @memberof MST
     * @classdesc Represents a CrashAutoBetInfo.
     * @implements ICrashAutoBetInfo
     * @constructor
     * @param {MST.ICrashAutoBetInfo=} [p] Properties to set
     */
    function CrashAutoBetInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashAutoBetInfo BetGold.
     * @member {number|Long} BetGold
     * @memberof MST.CrashAutoBetInfo
     * @instance
     */


    CrashAutoBetInfo.prototype.BetGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashAutoBetInfo BetMultiple.
     * @member {number|Long} BetMultiple
     * @memberof MST.CrashAutoBetInfo
     * @instance
     */

    CrashAutoBetInfo.prototype.BetMultiple = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashAutoBetInfo AutoRound.
     * @member {number} AutoRound
     * @memberof MST.CrashAutoBetInfo
     * @instance
     */

    CrashAutoBetInfo.prototype.AutoRound = 0;
    /**
     * CrashAutoBetInfo StopProfit.
     * @member {number|Long} StopProfit
     * @memberof MST.CrashAutoBetInfo
     * @instance
     */

    CrashAutoBetInfo.prototype.StopProfit = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashAutoBetInfo StopLoss.
     * @member {number|Long} StopLoss
     * @memberof MST.CrashAutoBetInfo
     * @instance
     */

    CrashAutoBetInfo.prototype.StopLoss = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new CrashAutoBetInfo instance using the specified properties.
     * @function create
     * @memberof MST.CrashAutoBetInfo
     * @static
     * @param {MST.ICrashAutoBetInfo=} [properties] Properties to set
     * @returns {MST.CrashAutoBetInfo} CrashAutoBetInfo instance
     */

    CrashAutoBetInfo.create = function create(properties) {
      return new CrashAutoBetInfo(properties);
    };
    /**
     * Encodes the specified CrashAutoBetInfo message. Does not implicitly {@link MST.CrashAutoBetInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashAutoBetInfo
     * @static
     * @param {MST.ICrashAutoBetInfo} m CrashAutoBetInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashAutoBetInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.BetGold != null && Object.hasOwnProperty.call(m, "BetGold")) w.uint32(8).int64(m.BetGold);
      if (m.BetMultiple != null && Object.hasOwnProperty.call(m, "BetMultiple")) w.uint32(16).int64(m.BetMultiple);
      if (m.AutoRound != null && Object.hasOwnProperty.call(m, "AutoRound")) w.uint32(24).int32(m.AutoRound);
      if (m.StopProfit != null && Object.hasOwnProperty.call(m, "StopProfit")) w.uint32(32).int64(m.StopProfit);
      if (m.StopLoss != null && Object.hasOwnProperty.call(m, "StopLoss")) w.uint32(40).int64(m.StopLoss);
      return w;
    };
    /**
     * Decodes a CrashAutoBetInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashAutoBetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashAutoBetInfo} CrashAutoBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashAutoBetInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashAutoBetInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.BetGold = r.int64();
            break;

          case 2:
            m.BetMultiple = r.int64();
            break;

          case 3:
            m.AutoRound = r.int32();
            break;

          case 4:
            m.StopProfit = r.int64();
            break;

          case 5:
            m.StopLoss = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashAutoBetInfo;
  }();

  MST.CrashSeedInfo = function () {
    /**
     * Properties of a CrashSeedInfo.
     * @memberof MST
     * @interface ICrashSeedInfo
     * @property {string|null} [ServerSeed] CrashSeedInfo ServerSeed
     * @property {string|null} [ServerSeedHash] CrashSeedInfo ServerSeedHash
     * @property {string|null} [PublicSeed] CrashSeedInfo PublicSeed
     */

    /**
     * Constructs a new CrashSeedInfo.
     * @memberof MST
     * @classdesc Represents a CrashSeedInfo.
     * @implements ICrashSeedInfo
     * @constructor
     * @param {MST.ICrashSeedInfo=} [p] Properties to set
     */
    function CrashSeedInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashSeedInfo ServerSeed.
     * @member {string} ServerSeed
     * @memberof MST.CrashSeedInfo
     * @instance
     */


    CrashSeedInfo.prototype.ServerSeed = "";
    /**
     * CrashSeedInfo ServerSeedHash.
     * @member {string} ServerSeedHash
     * @memberof MST.CrashSeedInfo
     * @instance
     */

    CrashSeedInfo.prototype.ServerSeedHash = "";
    /**
     * CrashSeedInfo PublicSeed.
     * @member {string} PublicSeed
     * @memberof MST.CrashSeedInfo
     * @instance
     */

    CrashSeedInfo.prototype.PublicSeed = "";
    /**
     * Creates a new CrashSeedInfo instance using the specified properties.
     * @function create
     * @memberof MST.CrashSeedInfo
     * @static
     * @param {MST.ICrashSeedInfo=} [properties] Properties to set
     * @returns {MST.CrashSeedInfo} CrashSeedInfo instance
     */

    CrashSeedInfo.create = function create(properties) {
      return new CrashSeedInfo(properties);
    };
    /**
     * Encodes the specified CrashSeedInfo message. Does not implicitly {@link MST.CrashSeedInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashSeedInfo
     * @static
     * @param {MST.ICrashSeedInfo} m CrashSeedInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashSeedInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.ServerSeed != null && Object.hasOwnProperty.call(m, "ServerSeed")) w.uint32(10).string(m.ServerSeed);
      if (m.ServerSeedHash != null && Object.hasOwnProperty.call(m, "ServerSeedHash")) w.uint32(18).string(m.ServerSeedHash);
      if (m.PublicSeed != null && Object.hasOwnProperty.call(m, "PublicSeed")) w.uint32(82).string(m.PublicSeed);
      return w;
    };
    /**
     * Decodes a CrashSeedInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashSeedInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashSeedInfo} CrashSeedInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashSeedInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashSeedInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.ServerSeed = r.string();
            break;

          case 2:
            m.ServerSeedHash = r.string();
            break;

          case 10:
            m.PublicSeed = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashSeedInfo;
  }();

  MST.CrashRecordInfo = function () {
    /**
     * Properties of a CrashRecordInfo.
     * @memberof MST
     * @interface ICrashRecordInfo
     * @property {number|null} [ID] CrashRecordInfo ID
     * @property {number|null} [GameNo] CrashRecordInfo GameNo
     * @property {number|Long|null} [Timestamp] CrashRecordInfo Timestamp
     * @property {number|Long|null} [Multiple] CrashRecordInfo Multiple
     * @property {MST.ICrashRoudHashCell|null} [RoundHashCell] CrashRecordInfo RoundHashCell
     */

    /**
     * Constructs a new CrashRecordInfo.
     * @memberof MST
     * @classdesc Represents a CrashRecordInfo.
     * @implements ICrashRecordInfo
     * @constructor
     * @param {MST.ICrashRecordInfo=} [p] Properties to set
     */
    function CrashRecordInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashRecordInfo ID.
     * @member {number} ID
     * @memberof MST.CrashRecordInfo
     * @instance
     */


    CrashRecordInfo.prototype.ID = 0;
    /**
     * CrashRecordInfo GameNo.
     * @member {number} GameNo
     * @memberof MST.CrashRecordInfo
     * @instance
     */

    CrashRecordInfo.prototype.GameNo = 0;
    /**
     * CrashRecordInfo Timestamp.
     * @member {number|Long} Timestamp
     * @memberof MST.CrashRecordInfo
     * @instance
     */

    CrashRecordInfo.prototype.Timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashRecordInfo Multiple.
     * @member {number|Long} Multiple
     * @memberof MST.CrashRecordInfo
     * @instance
     */

    CrashRecordInfo.prototype.Multiple = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashRecordInfo RoundHashCell.
     * @member {MST.ICrashRoudHashCell|null|undefined} RoundHashCell
     * @memberof MST.CrashRecordInfo
     * @instance
     */

    CrashRecordInfo.prototype.RoundHashCell = null;
    /**
     * Creates a new CrashRecordInfo instance using the specified properties.
     * @function create
     * @memberof MST.CrashRecordInfo
     * @static
     * @param {MST.ICrashRecordInfo=} [properties] Properties to set
     * @returns {MST.CrashRecordInfo} CrashRecordInfo instance
     */

    CrashRecordInfo.create = function create(properties) {
      return new CrashRecordInfo(properties);
    };
    /**
     * Encodes the specified CrashRecordInfo message. Does not implicitly {@link MST.CrashRecordInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashRecordInfo
     * @static
     * @param {MST.ICrashRecordInfo} m CrashRecordInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashRecordInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.ID != null && Object.hasOwnProperty.call(m, "ID")) w.uint32(8).int32(m.ID);
      if (m.GameNo != null && Object.hasOwnProperty.call(m, "GameNo")) w.uint32(16).int32(m.GameNo);
      if (m.Timestamp != null && Object.hasOwnProperty.call(m, "Timestamp")) w.uint32(24).int64(m.Timestamp);
      if (m.Multiple != null && Object.hasOwnProperty.call(m, "Multiple")) w.uint32(32).int64(m.Multiple);
      if (m.RoundHashCell != null && Object.hasOwnProperty.call(m, "RoundHashCell")) $root.MST.CrashRoudHashCell.encode(m.RoundHashCell, w.uint32(42).fork()).ldelim();
      return w;
    };
    /**
     * Decodes a CrashRecordInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashRecordInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashRecordInfo} CrashRecordInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashRecordInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashRecordInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.ID = r.int32();
            break;

          case 2:
            m.GameNo = r.int32();
            break;

          case 3:
            m.Timestamp = r.int64();
            break;

          case 4:
            m.Multiple = r.int64();
            break;

          case 5:
            m.RoundHashCell = $root.MST.CrashRoudHashCell.decode(r, r.uint32());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashRecordInfo;
  }();

  MST.MyRecordInfo = function () {
    /**
     * Properties of a MyRecordInfo.
     * @memberof MST
     * @interface IMyRecordInfo
     * @property {number|null} [id] MyRecordInfo id
     * @property {number|null} [gameNo] MyRecordInfo gameNo
     * @property {number|Long|null} [betTimestamp] MyRecordInfo betTimestamp
     * @property {number|Long|null} [betMulti] MyRecordInfo betMulti
     * @property {number|Long|null} [betGold] MyRecordInfo betGold
     * @property {number|Long|null} [incomeGold] MyRecordInfo incomeGold
     */

    /**
     * Constructs a new MyRecordInfo.
     * @memberof MST
     * @classdesc Represents a MyRecordInfo.
     * @implements IMyRecordInfo
     * @constructor
     * @param {MST.IMyRecordInfo=} [p] Properties to set
     */
    function MyRecordInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * MyRecordInfo id.
     * @member {number} id
     * @memberof MST.MyRecordInfo
     * @instance
     */


    MyRecordInfo.prototype.id = 0;
    /**
     * MyRecordInfo gameNo.
     * @member {number} gameNo
     * @memberof MST.MyRecordInfo
     * @instance
     */

    MyRecordInfo.prototype.gameNo = 0;
    /**
     * MyRecordInfo betTimestamp.
     * @member {number|Long} betTimestamp
     * @memberof MST.MyRecordInfo
     * @instance
     */

    MyRecordInfo.prototype.betTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MyRecordInfo betMulti.
     * @member {number|Long} betMulti
     * @memberof MST.MyRecordInfo
     * @instance
     */

    MyRecordInfo.prototype.betMulti = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MyRecordInfo betGold.
     * @member {number|Long} betGold
     * @memberof MST.MyRecordInfo
     * @instance
     */

    MyRecordInfo.prototype.betGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MyRecordInfo incomeGold.
     * @member {number|Long} incomeGold
     * @memberof MST.MyRecordInfo
     * @instance
     */

    MyRecordInfo.prototype.incomeGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new MyRecordInfo instance using the specified properties.
     * @function create
     * @memberof MST.MyRecordInfo
     * @static
     * @param {MST.IMyRecordInfo=} [properties] Properties to set
     * @returns {MST.MyRecordInfo} MyRecordInfo instance
     */

    MyRecordInfo.create = function create(properties) {
      return new MyRecordInfo(properties);
    };
    /**
     * Encodes the specified MyRecordInfo message. Does not implicitly {@link MST.MyRecordInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.MyRecordInfo
     * @static
     * @param {MST.IMyRecordInfo} m MyRecordInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    MyRecordInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(8).int32(m.id);
      if (m.gameNo != null && Object.hasOwnProperty.call(m, "gameNo")) w.uint32(16).int32(m.gameNo);
      if (m.betTimestamp != null && Object.hasOwnProperty.call(m, "betTimestamp")) w.uint32(24).int64(m.betTimestamp);
      if (m.betMulti != null && Object.hasOwnProperty.call(m, "betMulti")) w.uint32(32).int64(m.betMulti);
      if (m.betGold != null && Object.hasOwnProperty.call(m, "betGold")) w.uint32(40).int64(m.betGold);
      if (m.incomeGold != null && Object.hasOwnProperty.call(m, "incomeGold")) w.uint32(48).int64(m.incomeGold);
      return w;
    };
    /**
     * Decodes a MyRecordInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.MyRecordInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.MyRecordInfo} MyRecordInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    MyRecordInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.MyRecordInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.id = r.int32();
            break;

          case 2:
            m.gameNo = r.int32();
            break;

          case 3:
            m.betTimestamp = r.int64();
            break;

          case 4:
            m.betMulti = r.int64();
            break;

          case 5:
            m.betGold = r.int64();
            break;

          case 6:
            m.incomeGold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return MyRecordInfo;
  }();

  MST.C2M_GetCrashInfo_Req = function () {
    /**
     * Properties of a C2M_GetCrashInfo_Req.
     * @memberof MST
     * @interface IC2M_GetCrashInfo_Req
     * @property {number|null} [RpcId] C2M_GetCrashInfo_Req RpcId
     */

    /**
     * Constructs a new C2M_GetCrashInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2M_GetCrashInfo_Req.
     * @implements IC2M_GetCrashInfo_Req
     * @constructor
     * @param {MST.IC2M_GetCrashInfo_Req=} [p] Properties to set
     */
    function C2M_GetCrashInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_GetCrashInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_GetCrashInfo_Req
     * @instance
     */


    C2M_GetCrashInfo_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2M_GetCrashInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_GetCrashInfo_Req
     * @static
     * @param {MST.IC2M_GetCrashInfo_Req=} [properties] Properties to set
     * @returns {MST.C2M_GetCrashInfo_Req} C2M_GetCrashInfo_Req instance
     */

    C2M_GetCrashInfo_Req.create = function create(properties) {
      return new C2M_GetCrashInfo_Req(properties);
    };
    /**
     * Encodes the specified C2M_GetCrashInfo_Req message. Does not implicitly {@link MST.C2M_GetCrashInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_GetCrashInfo_Req
     * @static
     * @param {MST.IC2M_GetCrashInfo_Req} m C2M_GetCrashInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_GetCrashInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_GetCrashInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_GetCrashInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_GetCrashInfo_Req} C2M_GetCrashInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_GetCrashInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_GetCrashInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_GetCrashInfo_Req;
  }();

  MST.M2C_GetCrashInfo_Res = function () {
    /**
     * Properties of a M2C_GetCrashInfo_Res.
     * @memberof MST
     * @interface IM2C_GetCrashInfo_Res
     * @property {number|null} [RpcId] M2C_GetCrashInfo_Res RpcId
     * @property {number|null} [Error] M2C_GetCrashInfo_Res Error
     * @property {string|null} [Message] M2C_GetCrashInfo_Res Message
     * @property {Array.<MST.ICrashBetInfo>|null} [Bets] M2C_GetCrashInfo_Res Bets
     * @property {number|null} [Status] M2C_GetCrashInfo_Res Status
     * @property {number|Long|null} [StartTimeStamp] M2C_GetCrashInfo_Res StartTimeStamp
     * @property {Array.<number|Long>|null} [MultipleRecord] M2C_GetCrashInfo_Res MultipleRecord
     * @property {number|Long|null} [TotalGold] M2C_GetCrashInfo_Res TotalGold
     * @property {Array.<MST.ICrashBetInfo>|null} [MyBet] M2C_GetCrashInfo_Res MyBet
     * @property {number|null} [TotalPlayer] M2C_GetCrashInfo_Res TotalPlayer
     * @property {MST.ICrashAutoBetInfo|null} [AtuoBetInfo] M2C_GetCrashInfo_Res AtuoBetInfo
     * @property {MST.ICrashSeedInfo|null} [SeedInfo] M2C_GetCrashInfo_Res SeedInfo
     * @property {number|null} [GameNo] M2C_GetCrashInfo_Res GameNo
     * @property {number|Long|null} [Multi] M2C_GetCrashInfo_Res Multi
     */

    /**
     * Constructs a new M2C_GetCrashInfo_Res.
     * @memberof MST
     * @classdesc Represents a M2C_GetCrashInfo_Res.
     * @implements IM2C_GetCrashInfo_Res
     * @constructor
     * @param {MST.IM2C_GetCrashInfo_Res=} [p] Properties to set
     */
    function M2C_GetCrashInfo_Res(p) {
      this.Bets = [];
      this.MultipleRecord = [];
      this.MyBet = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_GetCrashInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */


    M2C_GetCrashInfo_Res.prototype.RpcId = 0;
    /**
     * M2C_GetCrashInfo_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.Error = 0;
    /**
     * M2C_GetCrashInfo_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.Message = "";
    /**
     * M2C_GetCrashInfo_Res Bets.
     * @member {Array.<MST.ICrashBetInfo>} Bets
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.Bets = $util.emptyArray;
    /**
     * M2C_GetCrashInfo_Res Status.
     * @member {number} Status
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.Status = 0;
    /**
     * M2C_GetCrashInfo_Res StartTimeStamp.
     * @member {number|Long} StartTimeStamp
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.StartTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetCrashInfo_Res MultipleRecord.
     * @member {Array.<number|Long>} MultipleRecord
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.MultipleRecord = $util.emptyArray;
    /**
     * M2C_GetCrashInfo_Res TotalGold.
     * @member {number|Long} TotalGold
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.TotalGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetCrashInfo_Res MyBet.
     * @member {Array.<MST.ICrashBetInfo>} MyBet
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.MyBet = $util.emptyArray;
    /**
     * M2C_GetCrashInfo_Res TotalPlayer.
     * @member {number} TotalPlayer
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.TotalPlayer = 0;
    /**
     * M2C_GetCrashInfo_Res AtuoBetInfo.
     * @member {MST.ICrashAutoBetInfo|null|undefined} AtuoBetInfo
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.AtuoBetInfo = null;
    /**
     * M2C_GetCrashInfo_Res SeedInfo.
     * @member {MST.ICrashSeedInfo|null|undefined} SeedInfo
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.SeedInfo = null;
    /**
     * M2C_GetCrashInfo_Res GameNo.
     * @member {number} GameNo
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.GameNo = 0;
    /**
     * M2C_GetCrashInfo_Res Multi.
     * @member {number|Long} Multi
     * @memberof MST.M2C_GetCrashInfo_Res
     * @instance
     */

    M2C_GetCrashInfo_Res.prototype.Multi = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new M2C_GetCrashInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_GetCrashInfo_Res
     * @static
     * @param {MST.IM2C_GetCrashInfo_Res=} [properties] Properties to set
     * @returns {MST.M2C_GetCrashInfo_Res} M2C_GetCrashInfo_Res instance
     */

    M2C_GetCrashInfo_Res.create = function create(properties) {
      return new M2C_GetCrashInfo_Res(properties);
    };
    /**
     * Encodes the specified M2C_GetCrashInfo_Res message. Does not implicitly {@link MST.M2C_GetCrashInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_GetCrashInfo_Res
     * @static
     * @param {MST.IM2C_GetCrashInfo_Res} m M2C_GetCrashInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_GetCrashInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Bets != null && m.Bets.length) {
        for (var i = 0; i < m.Bets.length; ++i) {
          $root.MST.CrashBetInfo.encode(m.Bets[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.Status != null && Object.hasOwnProperty.call(m, "Status")) w.uint32(16).int32(m.Status);
      if (m.StartTimeStamp != null && Object.hasOwnProperty.call(m, "StartTimeStamp")) w.uint32(24).int64(m.StartTimeStamp);

      if (m.MultipleRecord != null && m.MultipleRecord.length) {
        w.uint32(34).fork();

        for (var i = 0; i < m.MultipleRecord.length; ++i) {
          w.int64(m.MultipleRecord[i]);
        }

        w.ldelim();
      }

      if (m.TotalGold != null && Object.hasOwnProperty.call(m, "TotalGold")) w.uint32(40).int64(m.TotalGold);

      if (m.MyBet != null && m.MyBet.length) {
        for (var i = 0; i < m.MyBet.length; ++i) {
          $root.MST.CrashBetInfo.encode(m.MyBet[i], w.uint32(50).fork()).ldelim();
        }
      }

      if (m.TotalPlayer != null && Object.hasOwnProperty.call(m, "TotalPlayer")) w.uint32(56).int32(m.TotalPlayer);
      if (m.AtuoBetInfo != null && Object.hasOwnProperty.call(m, "AtuoBetInfo")) $root.MST.CrashAutoBetInfo.encode(m.AtuoBetInfo, w.uint32(66).fork()).ldelim();
      if (m.SeedInfo != null && Object.hasOwnProperty.call(m, "SeedInfo")) $root.MST.CrashSeedInfo.encode(m.SeedInfo, w.uint32(74).fork()).ldelim();
      if (m.GameNo != null && Object.hasOwnProperty.call(m, "GameNo")) w.uint32(80).int32(m.GameNo);
      if (m.Multi != null && Object.hasOwnProperty.call(m, "Multi")) w.uint32(88).int64(m.Multi);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_GetCrashInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_GetCrashInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_GetCrashInfo_Res} M2C_GetCrashInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_GetCrashInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_GetCrashInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.Bets && m.Bets.length)) m.Bets = [];
            m.Bets.push($root.MST.CrashBetInfo.decode(r, r.uint32()));
            break;

          case 2:
            m.Status = r.int32();
            break;

          case 3:
            m.StartTimeStamp = r.int64();
            break;

          case 4:
            if (!(m.MultipleRecord && m.MultipleRecord.length)) m.MultipleRecord = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.MultipleRecord.push(r.int64());
              }
            } else m.MultipleRecord.push(r.int64());

            break;

          case 5:
            m.TotalGold = r.int64();
            break;

          case 6:
            if (!(m.MyBet && m.MyBet.length)) m.MyBet = [];
            m.MyBet.push($root.MST.CrashBetInfo.decode(r, r.uint32()));
            break;

          case 7:
            m.TotalPlayer = r.int32();
            break;

          case 8:
            m.AtuoBetInfo = $root.MST.CrashAutoBetInfo.decode(r, r.uint32());
            break;

          case 9:
            m.SeedInfo = $root.MST.CrashSeedInfo.decode(r, r.uint32());
            break;

          case 10:
            m.GameNo = r.int32();
            break;

          case 11:
            m.Multi = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_GetCrashInfo_Res;
  }();

  MST.M2C_CrashStart_mes = function () {
    /**
     * Properties of a M2C_CrashStart_mes.
     * @memberof MST
     * @interface IM2C_CrashStart_mes
     * @property {number|Long|null} [StartTimeStamp] M2C_CrashStart_mes StartTimeStamp
     * @property {number|Long|null} [Multi] M2C_CrashStart_mes Multi
     */

    /**
     * Constructs a new M2C_CrashStart_mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashStart_mes.
     * @implements IM2C_CrashStart_mes
     * @constructor
     * @param {MST.IM2C_CrashStart_mes=} [p] Properties to set
     */
    function M2C_CrashStart_mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashStart_mes StartTimeStamp.
     * @member {number|Long} StartTimeStamp
     * @memberof MST.M2C_CrashStart_mes
     * @instance
     */


    M2C_CrashStart_mes.prototype.StartTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_CrashStart_mes Multi.
     * @member {number|Long} Multi
     * @memberof MST.M2C_CrashStart_mes
     * @instance
     */

    M2C_CrashStart_mes.prototype.Multi = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new M2C_CrashStart_mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashStart_mes
     * @static
     * @param {MST.IM2C_CrashStart_mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashStart_mes} M2C_CrashStart_mes instance
     */

    M2C_CrashStart_mes.create = function create(properties) {
      return new M2C_CrashStart_mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashStart_mes message. Does not implicitly {@link MST.M2C_CrashStart_mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashStart_mes
     * @static
     * @param {MST.IM2C_CrashStart_mes} m M2C_CrashStart_mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashStart_mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.StartTimeStamp != null && Object.hasOwnProperty.call(m, "StartTimeStamp")) w.uint32(8).int64(m.StartTimeStamp);
      if (m.Multi != null && Object.hasOwnProperty.call(m, "Multi")) w.uint32(16).int64(m.Multi);
      return w;
    };
    /**
     * Decodes a M2C_CrashStart_mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashStart_mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashStart_mes} M2C_CrashStart_mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashStart_mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashStart_mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.StartTimeStamp = r.int64();
            break;

          case 2:
            m.Multi = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashStart_mes;
  }();

  MST.C2M_MyCrashBet_Req = function () {
    /**
     * Properties of a C2M_MyCrashBet_Req.
     * @memberof MST
     * @interface IC2M_MyCrashBet_Req
     * @property {number|null} [RpcId] C2M_MyCrashBet_Req RpcId
     * @property {number|null} [BetMode] C2M_MyCrashBet_Req BetMode
     * @property {number|Long|null} [BetGold] C2M_MyCrashBet_Req BetGold
     * @property {number|Long|null} [BetMultiple] C2M_MyCrashBet_Req BetMultiple
     * @property {number|null} [AutoRound] C2M_MyCrashBet_Req AutoRound
     * @property {number|Long|null} [StopProfit] C2M_MyCrashBet_Req StopProfit
     * @property {number|Long|null} [StopLoss] C2M_MyCrashBet_Req StopLoss
     */

    /**
     * Constructs a new C2M_MyCrashBet_Req.
     * @memberof MST
     * @classdesc Represents a C2M_MyCrashBet_Req.
     * @implements IC2M_MyCrashBet_Req
     * @constructor
     * @param {MST.IC2M_MyCrashBet_Req=} [p] Properties to set
     */
    function C2M_MyCrashBet_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_MyCrashBet_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */


    C2M_MyCrashBet_Req.prototype.RpcId = 0;
    /**
     * C2M_MyCrashBet_Req BetMode.
     * @member {number} BetMode
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.BetMode = 0;
    /**
     * C2M_MyCrashBet_Req BetGold.
     * @member {number|Long} BetGold
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.BetGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * C2M_MyCrashBet_Req BetMultiple.
     * @member {number|Long} BetMultiple
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.BetMultiple = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * C2M_MyCrashBet_Req AutoRound.
     * @member {number} AutoRound
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.AutoRound = 0;
    /**
     * C2M_MyCrashBet_Req StopProfit.
     * @member {number|Long} StopProfit
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.StopProfit = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * C2M_MyCrashBet_Req StopLoss.
     * @member {number|Long} StopLoss
     * @memberof MST.C2M_MyCrashBet_Req
     * @instance
     */

    C2M_MyCrashBet_Req.prototype.StopLoss = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new C2M_MyCrashBet_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_MyCrashBet_Req
     * @static
     * @param {MST.IC2M_MyCrashBet_Req=} [properties] Properties to set
     * @returns {MST.C2M_MyCrashBet_Req} C2M_MyCrashBet_Req instance
     */

    C2M_MyCrashBet_Req.create = function create(properties) {
      return new C2M_MyCrashBet_Req(properties);
    };
    /**
     * Encodes the specified C2M_MyCrashBet_Req message. Does not implicitly {@link MST.C2M_MyCrashBet_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_MyCrashBet_Req
     * @static
     * @param {MST.IC2M_MyCrashBet_Req} m C2M_MyCrashBet_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_MyCrashBet_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.BetMode != null && Object.hasOwnProperty.call(m, "BetMode")) w.uint32(8).int32(m.BetMode);
      if (m.BetGold != null && Object.hasOwnProperty.call(m, "BetGold")) w.uint32(16).int64(m.BetGold);
      if (m.BetMultiple != null && Object.hasOwnProperty.call(m, "BetMultiple")) w.uint32(24).int64(m.BetMultiple);
      if (m.AutoRound != null && Object.hasOwnProperty.call(m, "AutoRound")) w.uint32(32).int32(m.AutoRound);
      if (m.StopProfit != null && Object.hasOwnProperty.call(m, "StopProfit")) w.uint32(40).int64(m.StopProfit);
      if (m.StopLoss != null && Object.hasOwnProperty.call(m, "StopLoss")) w.uint32(48).int64(m.StopLoss);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_MyCrashBet_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_MyCrashBet_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_MyCrashBet_Req} C2M_MyCrashBet_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_MyCrashBet_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_MyCrashBet_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.BetMode = r.int32();
            break;

          case 2:
            m.BetGold = r.int64();
            break;

          case 3:
            m.BetMultiple = r.int64();
            break;

          case 4:
            m.AutoRound = r.int32();
            break;

          case 5:
            m.StopProfit = r.int64();
            break;

          case 6:
            m.StopLoss = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_MyCrashBet_Req;
  }();

  MST.M2C_MyCrashBet_Res = function () {
    /**
     * Properties of a M2C_MyCrashBet_Res.
     * @memberof MST
     * @interface IM2C_MyCrashBet_Res
     * @property {number|null} [RpcId] M2C_MyCrashBet_Res RpcId
     * @property {number|null} [Error] M2C_MyCrashBet_Res Error
     * @property {string|null} [Message] M2C_MyCrashBet_Res Message
     * @property {number|Long|null} [Gold] M2C_MyCrashBet_Res Gold
     * @property {number|Long|null} [Multiple] M2C_MyCrashBet_Res Multiple
     * @property {number|null} [BetMode] M2C_MyCrashBet_Res BetMode
     */

    /**
     * Constructs a new M2C_MyCrashBet_Res.
     * @memberof MST
     * @classdesc Represents a M2C_MyCrashBet_Res.
     * @implements IM2C_MyCrashBet_Res
     * @constructor
     * @param {MST.IM2C_MyCrashBet_Res=} [p] Properties to set
     */
    function M2C_MyCrashBet_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_MyCrashBet_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */


    M2C_MyCrashBet_Res.prototype.RpcId = 0;
    /**
     * M2C_MyCrashBet_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */

    M2C_MyCrashBet_Res.prototype.Error = 0;
    /**
     * M2C_MyCrashBet_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */

    M2C_MyCrashBet_Res.prototype.Message = "";
    /**
     * M2C_MyCrashBet_Res Gold.
     * @member {number|Long} Gold
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */

    M2C_MyCrashBet_Res.prototype.Gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_MyCrashBet_Res Multiple.
     * @member {number|Long} Multiple
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */

    M2C_MyCrashBet_Res.prototype.Multiple = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_MyCrashBet_Res BetMode.
     * @member {number} BetMode
     * @memberof MST.M2C_MyCrashBet_Res
     * @instance
     */

    M2C_MyCrashBet_Res.prototype.BetMode = 0;
    /**
     * Creates a new M2C_MyCrashBet_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_MyCrashBet_Res
     * @static
     * @param {MST.IM2C_MyCrashBet_Res=} [properties] Properties to set
     * @returns {MST.M2C_MyCrashBet_Res} M2C_MyCrashBet_Res instance
     */

    M2C_MyCrashBet_Res.create = function create(properties) {
      return new M2C_MyCrashBet_Res(properties);
    };
    /**
     * Encodes the specified M2C_MyCrashBet_Res message. Does not implicitly {@link MST.M2C_MyCrashBet_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_MyCrashBet_Res
     * @static
     * @param {MST.IM2C_MyCrashBet_Res} m M2C_MyCrashBet_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_MyCrashBet_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Gold != null && Object.hasOwnProperty.call(m, "Gold")) w.uint32(8).int64(m.Gold);
      if (m.Multiple != null && Object.hasOwnProperty.call(m, "Multiple")) w.uint32(16).int64(m.Multiple);
      if (m.BetMode != null && Object.hasOwnProperty.call(m, "BetMode")) w.uint32(24).int32(m.BetMode);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_MyCrashBet_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_MyCrashBet_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_MyCrashBet_Res} M2C_MyCrashBet_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_MyCrashBet_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_MyCrashBet_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Gold = r.int64();
            break;

          case 2:
            m.Multiple = r.int64();
            break;

          case 3:
            m.BetMode = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_MyCrashBet_Res;
  }();

  MST.M2C_CrashBet_Mes = function () {
    /**
     * Properties of a M2C_CrashBet_Mes.
     * @memberof MST
     * @interface IM2C_CrashBet_Mes
     * @property {Array.<MST.ICrashBetInfo>|null} [Bets] M2C_CrashBet_Mes Bets
     * @property {number|Long|null} [TotalGold] M2C_CrashBet_Mes TotalGold
     * @property {number|null} [TotalPlayer] M2C_CrashBet_Mes TotalPlayer
     */

    /**
     * Constructs a new M2C_CrashBet_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashBet_Mes.
     * @implements IM2C_CrashBet_Mes
     * @constructor
     * @param {MST.IM2C_CrashBet_Mes=} [p] Properties to set
     */
    function M2C_CrashBet_Mes(p) {
      this.Bets = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashBet_Mes Bets.
     * @member {Array.<MST.ICrashBetInfo>} Bets
     * @memberof MST.M2C_CrashBet_Mes
     * @instance
     */


    M2C_CrashBet_Mes.prototype.Bets = $util.emptyArray;
    /**
     * M2C_CrashBet_Mes TotalGold.
     * @member {number|Long} TotalGold
     * @memberof MST.M2C_CrashBet_Mes
     * @instance
     */

    M2C_CrashBet_Mes.prototype.TotalGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_CrashBet_Mes TotalPlayer.
     * @member {number} TotalPlayer
     * @memberof MST.M2C_CrashBet_Mes
     * @instance
     */

    M2C_CrashBet_Mes.prototype.TotalPlayer = 0;
    /**
     * Creates a new M2C_CrashBet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashBet_Mes
     * @static
     * @param {MST.IM2C_CrashBet_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashBet_Mes} M2C_CrashBet_Mes instance
     */

    M2C_CrashBet_Mes.create = function create(properties) {
      return new M2C_CrashBet_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashBet_Mes message. Does not implicitly {@link MST.M2C_CrashBet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashBet_Mes
     * @static
     * @param {MST.IM2C_CrashBet_Mes} m M2C_CrashBet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashBet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Bets != null && m.Bets.length) {
        for (var i = 0; i < m.Bets.length; ++i) {
          $root.MST.CrashBetInfo.encode(m.Bets[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.TotalGold != null && Object.hasOwnProperty.call(m, "TotalGold")) w.uint32(16).int64(m.TotalGold);
      if (m.TotalPlayer != null && Object.hasOwnProperty.call(m, "TotalPlayer")) w.uint32(24).int32(m.TotalPlayer);
      return w;
    };
    /**
     * Decodes a M2C_CrashBet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashBet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashBet_Mes} M2C_CrashBet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashBet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashBet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            if (!(m.Bets && m.Bets.length)) m.Bets = [];
            m.Bets.push($root.MST.CrashBetInfo.decode(r, r.uint32()));
            break;

          case 2:
            m.TotalGold = r.int64();
            break;

          case 3:
            m.TotalPlayer = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashBet_Mes;
  }();

  MST.CrashEscape = function () {
    /**
     * Properties of a CrashEscape.
     * @memberof MST
     * @interface ICrashEscape
     * @property {number|Long|null} [UnitId] CrashEscape UnitId
     * @property {string|null} [Nick] CrashEscape Nick
     * @property {number|Long|null} [Multiples] CrashEscape Multiples
     */

    /**
     * Constructs a new CrashEscape.
     * @memberof MST
     * @classdesc Represents a CrashEscape.
     * @implements ICrashEscape
     * @constructor
     * @param {MST.ICrashEscape=} [p] Properties to set
     */
    function CrashEscape(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashEscape UnitId.
     * @member {number|Long} UnitId
     * @memberof MST.CrashEscape
     * @instance
     */


    CrashEscape.prototype.UnitId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * CrashEscape Nick.
     * @member {string} Nick
     * @memberof MST.CrashEscape
     * @instance
     */

    CrashEscape.prototype.Nick = "";
    /**
     * CrashEscape Multiples.
     * @member {number|Long} Multiples
     * @memberof MST.CrashEscape
     * @instance
     */

    CrashEscape.prototype.Multiples = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new CrashEscape instance using the specified properties.
     * @function create
     * @memberof MST.CrashEscape
     * @static
     * @param {MST.ICrashEscape=} [properties] Properties to set
     * @returns {MST.CrashEscape} CrashEscape instance
     */

    CrashEscape.create = function create(properties) {
      return new CrashEscape(properties);
    };
    /**
     * Encodes the specified CrashEscape message. Does not implicitly {@link MST.CrashEscape.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashEscape
     * @static
     * @param {MST.ICrashEscape} m CrashEscape message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashEscape.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.UnitId != null && Object.hasOwnProperty.call(m, "UnitId")) w.uint32(8).int64(m.UnitId);
      if (m.Nick != null && Object.hasOwnProperty.call(m, "Nick")) w.uint32(18).string(m.Nick);
      if (m.Multiples != null && Object.hasOwnProperty.call(m, "Multiples")) w.uint32(24).int64(m.Multiples);
      return w;
    };
    /**
     * Decodes a CrashEscape message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashEscape
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashEscape} CrashEscape
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashEscape.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashEscape();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.UnitId = r.int64();
            break;

          case 2:
            m.Nick = r.string();
            break;

          case 3:
            m.Multiples = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashEscape;
  }();

  MST.M2C_CrashStop_Mes = function () {
    /**
     * Properties of a M2C_CrashStop_Mes.
     * @memberof MST
     * @interface IM2C_CrashStop_Mes
     * @property {number|Long|null} [Multiples] M2C_CrashStop_Mes Multiples
     * @property {number|Long|null} [ExplosionTimeStamp] M2C_CrashStop_Mes ExplosionTimeStamp
     * @property {string|null} [HashResult] M2C_CrashStop_Mes HashResult
     * @property {number|null} [Acak] M2C_CrashStop_Mes Acak
     */

    /**
     * Constructs a new M2C_CrashStop_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashStop_Mes.
     * @implements IM2C_CrashStop_Mes
     * @constructor
     * @param {MST.IM2C_CrashStop_Mes=} [p] Properties to set
     */
    function M2C_CrashStop_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashStop_Mes Multiples.
     * @member {number|Long} Multiples
     * @memberof MST.M2C_CrashStop_Mes
     * @instance
     */


    M2C_CrashStop_Mes.prototype.Multiples = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_CrashStop_Mes ExplosionTimeStamp.
     * @member {number|Long} ExplosionTimeStamp
     * @memberof MST.M2C_CrashStop_Mes
     * @instance
     */

    M2C_CrashStop_Mes.prototype.ExplosionTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_CrashStop_Mes HashResult.
     * @member {string} HashResult
     * @memberof MST.M2C_CrashStop_Mes
     * @instance
     */

    M2C_CrashStop_Mes.prototype.HashResult = "";
    /**
     * M2C_CrashStop_Mes Acak.
     * @member {number} Acak
     * @memberof MST.M2C_CrashStop_Mes
     * @instance
     */

    M2C_CrashStop_Mes.prototype.Acak = 0;
    /**
     * Creates a new M2C_CrashStop_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashStop_Mes
     * @static
     * @param {MST.IM2C_CrashStop_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashStop_Mes} M2C_CrashStop_Mes instance
     */

    M2C_CrashStop_Mes.create = function create(properties) {
      return new M2C_CrashStop_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashStop_Mes message. Does not implicitly {@link MST.M2C_CrashStop_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashStop_Mes
     * @static
     * @param {MST.IM2C_CrashStop_Mes} m M2C_CrashStop_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashStop_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Multiples != null && Object.hasOwnProperty.call(m, "Multiples")) w.uint32(8).int64(m.Multiples);
      if (m.ExplosionTimeStamp != null && Object.hasOwnProperty.call(m, "ExplosionTimeStamp")) w.uint32(16).int64(m.ExplosionTimeStamp);
      if (m.HashResult != null && Object.hasOwnProperty.call(m, "HashResult")) w.uint32(26).string(m.HashResult);
      if (m.Acak != null && Object.hasOwnProperty.call(m, "Acak")) w.uint32(33)["double"](m.Acak);
      return w;
    };
    /**
     * Decodes a M2C_CrashStop_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashStop_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashStop_Mes} M2C_CrashStop_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashStop_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashStop_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Multiples = r.int64();
            break;

          case 2:
            m.ExplosionTimeStamp = r.int64();
            break;

          case 3:
            m.HashResult = r.string();
            break;

          case 4:
            m.Acak = r["double"]();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashStop_Mes;
  }();

  MST.M2C_CrashStartBet_Mes = function () {
    /**
     * Properties of a M2C_CrashStartBet_Mes.
     * @memberof MST
     * @interface IM2C_CrashStartBet_Mes
     * @property {number|Long|null} [StopBetTimeStamp] M2C_CrashStartBet_Mes StopBetTimeStamp
     * @property {number|null} [GameNo] M2C_CrashStartBet_Mes GameNo
     */

    /**
     * Constructs a new M2C_CrashStartBet_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashStartBet_Mes.
     * @implements IM2C_CrashStartBet_Mes
     * @constructor
     * @param {MST.IM2C_CrashStartBet_Mes=} [p] Properties to set
     */
    function M2C_CrashStartBet_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashStartBet_Mes StopBetTimeStamp.
     * @member {number|Long} StopBetTimeStamp
     * @memberof MST.M2C_CrashStartBet_Mes
     * @instance
     */


    M2C_CrashStartBet_Mes.prototype.StopBetTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_CrashStartBet_Mes GameNo.
     * @member {number} GameNo
     * @memberof MST.M2C_CrashStartBet_Mes
     * @instance
     */

    M2C_CrashStartBet_Mes.prototype.GameNo = 0;
    /**
     * Creates a new M2C_CrashStartBet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashStartBet_Mes
     * @static
     * @param {MST.IM2C_CrashStartBet_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashStartBet_Mes} M2C_CrashStartBet_Mes instance
     */

    M2C_CrashStartBet_Mes.create = function create(properties) {
      return new M2C_CrashStartBet_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashStartBet_Mes message. Does not implicitly {@link MST.M2C_CrashStartBet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashStartBet_Mes
     * @static
     * @param {MST.IM2C_CrashStartBet_Mes} m M2C_CrashStartBet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashStartBet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.StopBetTimeStamp != null && Object.hasOwnProperty.call(m, "StopBetTimeStamp")) w.uint32(8).int64(m.StopBetTimeStamp);
      if (m.GameNo != null && Object.hasOwnProperty.call(m, "GameNo")) w.uint32(80).int32(m.GameNo);
      return w;
    };
    /**
     * Decodes a M2C_CrashStartBet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashStartBet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashStartBet_Mes} M2C_CrashStartBet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashStartBet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashStartBet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.StopBetTimeStamp = r.int64();
            break;

          case 10:
            m.GameNo = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashStartBet_Mes;
  }();

  MST.M2C_CrashEscape_Mes = function () {
    /**
     * Properties of a M2C_CrashEscape_Mes.
     * @memberof MST
     * @interface IM2C_CrashEscape_Mes
     * @property {Array.<MST.ICrashEscape>|null} [Players] M2C_CrashEscape_Mes Players
     */

    /**
     * Constructs a new M2C_CrashEscape_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashEscape_Mes.
     * @implements IM2C_CrashEscape_Mes
     * @constructor
     * @param {MST.IM2C_CrashEscape_Mes=} [p] Properties to set
     */
    function M2C_CrashEscape_Mes(p) {
      this.Players = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashEscape_Mes Players.
     * @member {Array.<MST.ICrashEscape>} Players
     * @memberof MST.M2C_CrashEscape_Mes
     * @instance
     */


    M2C_CrashEscape_Mes.prototype.Players = $util.emptyArray;
    /**
     * Creates a new M2C_CrashEscape_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashEscape_Mes
     * @static
     * @param {MST.IM2C_CrashEscape_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashEscape_Mes} M2C_CrashEscape_Mes instance
     */

    M2C_CrashEscape_Mes.create = function create(properties) {
      return new M2C_CrashEscape_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashEscape_Mes message. Does not implicitly {@link MST.M2C_CrashEscape_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashEscape_Mes
     * @static
     * @param {MST.IM2C_CrashEscape_Mes} m M2C_CrashEscape_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashEscape_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Players != null && m.Players.length) {
        for (var i = 0; i < m.Players.length; ++i) {
          $root.MST.CrashEscape.encode(m.Players[i], w.uint32(10).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a M2C_CrashEscape_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashEscape_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashEscape_Mes} M2C_CrashEscape_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashEscape_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashEscape_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            if (!(m.Players && m.Players.length)) m.Players = [];
            m.Players.push($root.MST.CrashEscape.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashEscape_Mes;
  }();

  MST.M2C_CrashStopBet_Mes = function () {
    /**
     * Properties of a M2C_CrashStopBet_Mes.
     * @memberof MST
     * @interface IM2C_CrashStopBet_Mes
     */

    /**
     * Constructs a new M2C_CrashStopBet_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashStopBet_Mes.
     * @implements IM2C_CrashStopBet_Mes
     * @constructor
     * @param {MST.IM2C_CrashStopBet_Mes=} [p] Properties to set
     */
    function M2C_CrashStopBet_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * Creates a new M2C_CrashStopBet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashStopBet_Mes
     * @static
     * @param {MST.IM2C_CrashStopBet_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashStopBet_Mes} M2C_CrashStopBet_Mes instance
     */


    M2C_CrashStopBet_Mes.create = function create(properties) {
      return new M2C_CrashStopBet_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashStopBet_Mes message. Does not implicitly {@link MST.M2C_CrashStopBet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashStopBet_Mes
     * @static
     * @param {MST.IM2C_CrashStopBet_Mes} m M2C_CrashStopBet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashStopBet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      return w;
    };
    /**
     * Decodes a M2C_CrashStopBet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashStopBet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashStopBet_Mes} M2C_CrashStopBet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashStopBet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashStopBet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashStopBet_Mes;
  }();

  MST.C2M_CrashCancelAutoBet_Req = function () {
    /**
     * Properties of a C2M_CrashCancelAutoBet_Req.
     * @memberof MST
     * @interface IC2M_CrashCancelAutoBet_Req
     * @property {number|null} [RpcId] C2M_CrashCancelAutoBet_Req RpcId
     */

    /**
     * Constructs a new C2M_CrashCancelAutoBet_Req.
     * @memberof MST
     * @classdesc Represents a C2M_CrashCancelAutoBet_Req.
     * @implements IC2M_CrashCancelAutoBet_Req
     * @constructor
     * @param {MST.IC2M_CrashCancelAutoBet_Req=} [p] Properties to set
     */
    function C2M_CrashCancelAutoBet_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_CrashCancelAutoBet_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_CrashCancelAutoBet_Req
     * @instance
     */


    C2M_CrashCancelAutoBet_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2M_CrashCancelAutoBet_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_CrashCancelAutoBet_Req
     * @static
     * @param {MST.IC2M_CrashCancelAutoBet_Req=} [properties] Properties to set
     * @returns {MST.C2M_CrashCancelAutoBet_Req} C2M_CrashCancelAutoBet_Req instance
     */

    C2M_CrashCancelAutoBet_Req.create = function create(properties) {
      return new C2M_CrashCancelAutoBet_Req(properties);
    };
    /**
     * Encodes the specified C2M_CrashCancelAutoBet_Req message. Does not implicitly {@link MST.C2M_CrashCancelAutoBet_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_CrashCancelAutoBet_Req
     * @static
     * @param {MST.IC2M_CrashCancelAutoBet_Req} m C2M_CrashCancelAutoBet_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_CrashCancelAutoBet_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_CrashCancelAutoBet_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_CrashCancelAutoBet_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_CrashCancelAutoBet_Req} C2M_CrashCancelAutoBet_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_CrashCancelAutoBet_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_CrashCancelAutoBet_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_CrashCancelAutoBet_Req;
  }();

  MST.M2C_CrashCancelAutoBet_Res = function () {
    /**
     * Properties of a M2C_CrashCancelAutoBet_Res.
     * @memberof MST
     * @interface IM2C_CrashCancelAutoBet_Res
     * @property {number|null} [RpcId] M2C_CrashCancelAutoBet_Res RpcId
     * @property {number|null} [Error] M2C_CrashCancelAutoBet_Res Error
     * @property {string|null} [Message] M2C_CrashCancelAutoBet_Res Message
     */

    /**
     * Constructs a new M2C_CrashCancelAutoBet_Res.
     * @memberof MST
     * @classdesc Represents a M2C_CrashCancelAutoBet_Res.
     * @implements IM2C_CrashCancelAutoBet_Res
     * @constructor
     * @param {MST.IM2C_CrashCancelAutoBet_Res=} [p] Properties to set
     */
    function M2C_CrashCancelAutoBet_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashCancelAutoBet_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @instance
     */


    M2C_CrashCancelAutoBet_Res.prototype.RpcId = 0;
    /**
     * M2C_CrashCancelAutoBet_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @instance
     */

    M2C_CrashCancelAutoBet_Res.prototype.Error = 0;
    /**
     * M2C_CrashCancelAutoBet_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @instance
     */

    M2C_CrashCancelAutoBet_Res.prototype.Message = "";
    /**
     * Creates a new M2C_CrashCancelAutoBet_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @static
     * @param {MST.IM2C_CrashCancelAutoBet_Res=} [properties] Properties to set
     * @returns {MST.M2C_CrashCancelAutoBet_Res} M2C_CrashCancelAutoBet_Res instance
     */

    M2C_CrashCancelAutoBet_Res.create = function create(properties) {
      return new M2C_CrashCancelAutoBet_Res(properties);
    };
    /**
     * Encodes the specified M2C_CrashCancelAutoBet_Res message. Does not implicitly {@link MST.M2C_CrashCancelAutoBet_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @static
     * @param {MST.IM2C_CrashCancelAutoBet_Res} m M2C_CrashCancelAutoBet_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashCancelAutoBet_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_CrashCancelAutoBet_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashCancelAutoBet_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashCancelAutoBet_Res} M2C_CrashCancelAutoBet_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashCancelAutoBet_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashCancelAutoBet_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashCancelAutoBet_Res;
  }();

  MST.M2C_CrashCancelAutoBet_Mes = function () {
    /**
     * Properties of a M2C_CrashCancelAutoBet_Mes.
     * @memberof MST
     * @interface IM2C_CrashCancelAutoBet_Mes
     * @property {number|null} [Error] M2C_CrashCancelAutoBet_Mes Error
     */

    /**
     * Constructs a new M2C_CrashCancelAutoBet_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashCancelAutoBet_Mes.
     * @implements IM2C_CrashCancelAutoBet_Mes
     * @constructor
     * @param {MST.IM2C_CrashCancelAutoBet_Mes=} [p] Properties to set
     */
    function M2C_CrashCancelAutoBet_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashCancelAutoBet_Mes Error.
     * @member {number} Error
     * @memberof MST.M2C_CrashCancelAutoBet_Mes
     * @instance
     */


    M2C_CrashCancelAutoBet_Mes.prototype.Error = 0;
    /**
     * Creates a new M2C_CrashCancelAutoBet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashCancelAutoBet_Mes
     * @static
     * @param {MST.IM2C_CrashCancelAutoBet_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashCancelAutoBet_Mes} M2C_CrashCancelAutoBet_Mes instance
     */

    M2C_CrashCancelAutoBet_Mes.create = function create(properties) {
      return new M2C_CrashCancelAutoBet_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashCancelAutoBet_Mes message. Does not implicitly {@link MST.M2C_CrashCancelAutoBet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashCancelAutoBet_Mes
     * @static
     * @param {MST.IM2C_CrashCancelAutoBet_Mes} m M2C_CrashCancelAutoBet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashCancelAutoBet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(8).int32(m.Error);
      return w;
    };
    /**
     * Decodes a M2C_CrashCancelAutoBet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashCancelAutoBet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashCancelAutoBet_Mes} M2C_CrashCancelAutoBet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashCancelAutoBet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashCancelAutoBet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Error = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashCancelAutoBet_Mes;
  }();

  MST.M2C_CrashHash_Mes = function () {
    /**
     * Properties of a M2C_CrashHash_Mes.
     * @memberof MST
     * @interface IM2C_CrashHash_Mes
     * @property {MST.ICrashSeedInfo|null} [SeedInfo] M2C_CrashHash_Mes SeedInfo
     */

    /**
     * Constructs a new M2C_CrashHash_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CrashHash_Mes.
     * @implements IM2C_CrashHash_Mes
     * @constructor
     * @param {MST.IM2C_CrashHash_Mes=} [p] Properties to set
     */
    function M2C_CrashHash_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashHash_Mes SeedInfo.
     * @member {MST.ICrashSeedInfo|null|undefined} SeedInfo
     * @memberof MST.M2C_CrashHash_Mes
     * @instance
     */


    M2C_CrashHash_Mes.prototype.SeedInfo = null;
    /**
     * Creates a new M2C_CrashHash_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashHash_Mes
     * @static
     * @param {MST.IM2C_CrashHash_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CrashHash_Mes} M2C_CrashHash_Mes instance
     */

    M2C_CrashHash_Mes.create = function create(properties) {
      return new M2C_CrashHash_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CrashHash_Mes message. Does not implicitly {@link MST.M2C_CrashHash_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashHash_Mes
     * @static
     * @param {MST.IM2C_CrashHash_Mes} m M2C_CrashHash_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashHash_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.SeedInfo != null && Object.hasOwnProperty.call(m, "SeedInfo")) $root.MST.CrashSeedInfo.encode(m.SeedInfo, w.uint32(10).fork()).ldelim();
      return w;
    };
    /**
     * Decodes a M2C_CrashHash_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashHash_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashHash_Mes} M2C_CrashHash_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashHash_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashHash_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.SeedInfo = $root.MST.CrashSeedInfo.decode(r, r.uint32());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashHash_Mes;
  }();

  MST.CrashRoudHashCell = function () {
    /**
     * Properties of a CrashRoudHashCell.
     * @memberof MST
     * @interface ICrashRoudHashCell
     * @property {string|null} [RoundHash] CrashRoudHashCell RoundHash
     * @property {number|null} [Acak] CrashRoudHashCell Acak
     */

    /**
     * Constructs a new CrashRoudHashCell.
     * @memberof MST
     * @classdesc Represents a CrashRoudHashCell.
     * @implements ICrashRoudHashCell
     * @constructor
     * @param {MST.ICrashRoudHashCell=} [p] Properties to set
     */
    function CrashRoudHashCell(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * CrashRoudHashCell RoundHash.
     * @member {string} RoundHash
     * @memberof MST.CrashRoudHashCell
     * @instance
     */


    CrashRoudHashCell.prototype.RoundHash = "";
    /**
     * CrashRoudHashCell Acak.
     * @member {number} Acak
     * @memberof MST.CrashRoudHashCell
     * @instance
     */

    CrashRoudHashCell.prototype.Acak = 0;
    /**
     * Creates a new CrashRoudHashCell instance using the specified properties.
     * @function create
     * @memberof MST.CrashRoudHashCell
     * @static
     * @param {MST.ICrashRoudHashCell=} [properties] Properties to set
     * @returns {MST.CrashRoudHashCell} CrashRoudHashCell instance
     */

    CrashRoudHashCell.create = function create(properties) {
      return new CrashRoudHashCell(properties);
    };
    /**
     * Encodes the specified CrashRoudHashCell message. Does not implicitly {@link MST.CrashRoudHashCell.verify|verify} messages.
     * @function encode
     * @memberof MST.CrashRoudHashCell
     * @static
     * @param {MST.ICrashRoudHashCell} m CrashRoudHashCell message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    CrashRoudHashCell.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RoundHash != null && Object.hasOwnProperty.call(m, "RoundHash")) w.uint32(10).string(m.RoundHash);
      if (m.Acak != null && Object.hasOwnProperty.call(m, "Acak")) w.uint32(17)["double"](m.Acak);
      return w;
    };
    /**
     * Decodes a CrashRoudHashCell message from the specified reader or buffer.
     * @function decode
     * @memberof MST.CrashRoudHashCell
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.CrashRoudHashCell} CrashRoudHashCell
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    CrashRoudHashCell.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.CrashRoudHashCell();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.RoundHash = r.string();
            break;

          case 2:
            m.Acak = r["double"]();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return CrashRoudHashCell;
  }();

  MST.C2M_CrashHashRecord_Req = function () {
    /**
     * Properties of a C2M_CrashHashRecord_Req.
     * @memberof MST
     * @interface IC2M_CrashHashRecord_Req
     * @property {number|null} [RpcId] C2M_CrashHashRecord_Req RpcId
     * @property {string|null} [Date] C2M_CrashHashRecord_Req Date
     * @property {number|null} [ID] C2M_CrashHashRecord_Req ID
     * @property {number|null} [PageNumber] C2M_CrashHashRecord_Req PageNumber
     */

    /**
     * Constructs a new C2M_CrashHashRecord_Req.
     * @memberof MST
     * @classdesc Represents a C2M_CrashHashRecord_Req.
     * @implements IC2M_CrashHashRecord_Req
     * @constructor
     * @param {MST.IC2M_CrashHashRecord_Req=} [p] Properties to set
     */
    function C2M_CrashHashRecord_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_CrashHashRecord_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_CrashHashRecord_Req
     * @instance
     */


    C2M_CrashHashRecord_Req.prototype.RpcId = 0;
    /**
     * C2M_CrashHashRecord_Req Date.
     * @member {string} Date
     * @memberof MST.C2M_CrashHashRecord_Req
     * @instance
     */

    C2M_CrashHashRecord_Req.prototype.Date = "";
    /**
     * C2M_CrashHashRecord_Req ID.
     * @member {number} ID
     * @memberof MST.C2M_CrashHashRecord_Req
     * @instance
     */

    C2M_CrashHashRecord_Req.prototype.ID = 0;
    /**
     * C2M_CrashHashRecord_Req PageNumber.
     * @member {number} PageNumber
     * @memberof MST.C2M_CrashHashRecord_Req
     * @instance
     */

    C2M_CrashHashRecord_Req.prototype.PageNumber = 0;
    /**
     * Creates a new C2M_CrashHashRecord_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_CrashHashRecord_Req
     * @static
     * @param {MST.IC2M_CrashHashRecord_Req=} [properties] Properties to set
     * @returns {MST.C2M_CrashHashRecord_Req} C2M_CrashHashRecord_Req instance
     */

    C2M_CrashHashRecord_Req.create = function create(properties) {
      return new C2M_CrashHashRecord_Req(properties);
    };
    /**
     * Encodes the specified C2M_CrashHashRecord_Req message. Does not implicitly {@link MST.C2M_CrashHashRecord_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_CrashHashRecord_Req
     * @static
     * @param {MST.IC2M_CrashHashRecord_Req} m C2M_CrashHashRecord_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_CrashHashRecord_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Date != null && Object.hasOwnProperty.call(m, "Date")) w.uint32(10).string(m.Date);
      if (m.ID != null && Object.hasOwnProperty.call(m, "ID")) w.uint32(16).int32(m.ID);
      if (m.PageNumber != null && Object.hasOwnProperty.call(m, "PageNumber")) w.uint32(24).int32(m.PageNumber);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_CrashHashRecord_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_CrashHashRecord_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_CrashHashRecord_Req} C2M_CrashHashRecord_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_CrashHashRecord_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_CrashHashRecord_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.Date = r.string();
            break;

          case 2:
            m.ID = r.int32();
            break;

          case 3:
            m.PageNumber = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_CrashHashRecord_Req;
  }();

  MST.M2C_CrashHashRecord_Res = function () {
    /**
     * Properties of a M2C_CrashHashRecord_Res.
     * @memberof MST
     * @interface IM2C_CrashHashRecord_Res
     * @property {number|null} [RpcId] M2C_CrashHashRecord_Res RpcId
     * @property {number|null} [Error] M2C_CrashHashRecord_Res Error
     * @property {string|null} [Message] M2C_CrashHashRecord_Res Message
     * @property {string|null} [Date] M2C_CrashHashRecord_Res Date
     * @property {number|null} [ID] M2C_CrashHashRecord_Res ID
     * @property {MST.ICrashSeedInfo|null} [SeedInfo] M2C_CrashHashRecord_Res SeedInfo
     * @property {Array.<MST.ICrashRecordInfo>|null} [RecordInfo] M2C_CrashHashRecord_Res RecordInfo
     */

    /**
     * Constructs a new M2C_CrashHashRecord_Res.
     * @memberof MST
     * @classdesc Represents a M2C_CrashHashRecord_Res.
     * @implements IM2C_CrashHashRecord_Res
     * @constructor
     * @param {MST.IM2C_CrashHashRecord_Res=} [p] Properties to set
     */
    function M2C_CrashHashRecord_Res(p) {
      this.RecordInfo = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CrashHashRecord_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */


    M2C_CrashHashRecord_Res.prototype.RpcId = 0;
    /**
     * M2C_CrashHashRecord_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.Error = 0;
    /**
     * M2C_CrashHashRecord_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.Message = "";
    /**
     * M2C_CrashHashRecord_Res Date.
     * @member {string} Date
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.Date = "";
    /**
     * M2C_CrashHashRecord_Res ID.
     * @member {number} ID
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.ID = 0;
    /**
     * M2C_CrashHashRecord_Res SeedInfo.
     * @member {MST.ICrashSeedInfo|null|undefined} SeedInfo
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.SeedInfo = null;
    /**
     * M2C_CrashHashRecord_Res RecordInfo.
     * @member {Array.<MST.ICrashRecordInfo>} RecordInfo
     * @memberof MST.M2C_CrashHashRecord_Res
     * @instance
     */

    M2C_CrashHashRecord_Res.prototype.RecordInfo = $util.emptyArray;
    /**
     * Creates a new M2C_CrashHashRecord_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CrashHashRecord_Res
     * @static
     * @param {MST.IM2C_CrashHashRecord_Res=} [properties] Properties to set
     * @returns {MST.M2C_CrashHashRecord_Res} M2C_CrashHashRecord_Res instance
     */

    M2C_CrashHashRecord_Res.create = function create(properties) {
      return new M2C_CrashHashRecord_Res(properties);
    };
    /**
     * Encodes the specified M2C_CrashHashRecord_Res message. Does not implicitly {@link MST.M2C_CrashHashRecord_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CrashHashRecord_Res
     * @static
     * @param {MST.IM2C_CrashHashRecord_Res} m M2C_CrashHashRecord_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CrashHashRecord_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Date != null && Object.hasOwnProperty.call(m, "Date")) w.uint32(10).string(m.Date);
      if (m.ID != null && Object.hasOwnProperty.call(m, "ID")) w.uint32(16).int32(m.ID);
      if (m.SeedInfo != null && Object.hasOwnProperty.call(m, "SeedInfo")) $root.MST.CrashSeedInfo.encode(m.SeedInfo, w.uint32(26).fork()).ldelim();

      if (m.RecordInfo != null && m.RecordInfo.length) {
        for (var i = 0; i < m.RecordInfo.length; ++i) {
          $root.MST.CrashRecordInfo.encode(m.RecordInfo[i], w.uint32(34).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_CrashHashRecord_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CrashHashRecord_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CrashHashRecord_Res} M2C_CrashHashRecord_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CrashHashRecord_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CrashHashRecord_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Date = r.string();
            break;

          case 2:
            m.ID = r.int32();
            break;

          case 3:
            m.SeedInfo = $root.MST.CrashSeedInfo.decode(r, r.uint32());
            break;

          case 4:
            if (!(m.RecordInfo && m.RecordInfo.length)) m.RecordInfo = [];
            m.RecordInfo.push($root.MST.CrashRecordInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CrashHashRecord_Res;
  }();

  MST.C2S_CrashMyRecord = function () {
    /**
     * Properties of a C2S_CrashMyRecord.
     * @memberof MST
     * @interface IC2S_CrashMyRecord
     * @property {number|null} [serial] C2S_CrashMyRecord serial
     * @property {number|null} [id] C2S_CrashMyRecord id
     * @property {number|null} [count] C2S_CrashMyRecord count
     */

    /**
     * Constructs a new C2S_CrashMyRecord.
     * @memberof MST
     * @classdesc Represents a C2S_CrashMyRecord.
     * @implements IC2S_CrashMyRecord
     * @constructor
     * @param {MST.IC2S_CrashMyRecord=} [p] Properties to set
     */
    function C2S_CrashMyRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_CrashMyRecord serial.
     * @member {number} serial
     * @memberof MST.C2S_CrashMyRecord
     * @instance
     */


    C2S_CrashMyRecord.prototype.serial = 0;
    /**
     * C2S_CrashMyRecord id.
     * @member {number} id
     * @memberof MST.C2S_CrashMyRecord
     * @instance
     */

    C2S_CrashMyRecord.prototype.id = 0;
    /**
     * C2S_CrashMyRecord count.
     * @member {number} count
     * @memberof MST.C2S_CrashMyRecord
     * @instance
     */

    C2S_CrashMyRecord.prototype.count = 0;
    /**
     * Creates a new C2S_CrashMyRecord instance using the specified properties.
     * @function create
     * @memberof MST.C2S_CrashMyRecord
     * @static
     * @param {MST.IC2S_CrashMyRecord=} [properties] Properties to set
     * @returns {MST.C2S_CrashMyRecord} C2S_CrashMyRecord instance
     */

    C2S_CrashMyRecord.create = function create(properties) {
      return new C2S_CrashMyRecord(properties);
    };
    /**
     * Encodes the specified C2S_CrashMyRecord message. Does not implicitly {@link MST.C2S_CrashMyRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_CrashMyRecord
     * @static
     * @param {MST.IC2S_CrashMyRecord} m C2S_CrashMyRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_CrashMyRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(16).int32(m.id);
      if (m.count != null && Object.hasOwnProperty.call(m, "count")) w.uint32(24).int32(m.count);
      return w;
    };
    /**
     * Decodes a C2S_CrashMyRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_CrashMyRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_CrashMyRecord} C2S_CrashMyRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_CrashMyRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_CrashMyRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.id = r.int32();
            break;

          case 3:
            m.count = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_CrashMyRecord;
  }();

  MST.S2C_CrashMyRecord = function () {
    /**
     * Properties of a S2C_CrashMyRecord.
     * @memberof MST
     * @interface IS2C_CrashMyRecord
     * @property {number|null} [serial] S2C_CrashMyRecord serial
     * @property {number|null} [code] S2C_CrashMyRecord code
     * @property {number|null} [id] S2C_CrashMyRecord id
     * @property {Array.<MST.IMyRecordInfo>|null} [myRecordInfo] S2C_CrashMyRecord myRecordInfo
     */

    /**
     * Constructs a new S2C_CrashMyRecord.
     * @memberof MST
     * @classdesc Represents a S2C_CrashMyRecord.
     * @implements IS2C_CrashMyRecord
     * @constructor
     * @param {MST.IS2C_CrashMyRecord=} [p] Properties to set
     */
    function S2C_CrashMyRecord(p) {
      this.myRecordInfo = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_CrashMyRecord serial.
     * @member {number} serial
     * @memberof MST.S2C_CrashMyRecord
     * @instance
     */


    S2C_CrashMyRecord.prototype.serial = 0;
    /**
     * S2C_CrashMyRecord code.
     * @member {number} code
     * @memberof MST.S2C_CrashMyRecord
     * @instance
     */

    S2C_CrashMyRecord.prototype.code = 0;
    /**
     * S2C_CrashMyRecord id.
     * @member {number} id
     * @memberof MST.S2C_CrashMyRecord
     * @instance
     */

    S2C_CrashMyRecord.prototype.id = 0;
    /**
     * S2C_CrashMyRecord myRecordInfo.
     * @member {Array.<MST.IMyRecordInfo>} myRecordInfo
     * @memberof MST.S2C_CrashMyRecord
     * @instance
     */

    S2C_CrashMyRecord.prototype.myRecordInfo = $util.emptyArray;
    /**
     * Creates a new S2C_CrashMyRecord instance using the specified properties.
     * @function create
     * @memberof MST.S2C_CrashMyRecord
     * @static
     * @param {MST.IS2C_CrashMyRecord=} [properties] Properties to set
     * @returns {MST.S2C_CrashMyRecord} S2C_CrashMyRecord instance
     */

    S2C_CrashMyRecord.create = function create(properties) {
      return new S2C_CrashMyRecord(properties);
    };
    /**
     * Encodes the specified S2C_CrashMyRecord message. Does not implicitly {@link MST.S2C_CrashMyRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_CrashMyRecord
     * @static
     * @param {MST.IS2C_CrashMyRecord} m S2C_CrashMyRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_CrashMyRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(24).int32(m.id);

      if (m.myRecordInfo != null && m.myRecordInfo.length) {
        for (var i = 0; i < m.myRecordInfo.length; ++i) {
          $root.MST.MyRecordInfo.encode(m.myRecordInfo[i], w.uint32(34).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a S2C_CrashMyRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_CrashMyRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_CrashMyRecord} S2C_CrashMyRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_CrashMyRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_CrashMyRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.id = r.int32();
            break;

          case 4:
            if (!(m.myRecordInfo && m.myRecordInfo.length)) m.myRecordInfo = [];
            m.myRecordInfo.push($root.MST.MyRecordInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_CrashMyRecord;
  }();

  MST.C2G_EnterMap_Req = function () {
    /**
     * Properties of a C2G_EnterMap_Req.
     * @memberof MST
     * @interface IC2G_EnterMap_Req
     * @property {number|null} [RpcId] C2G_EnterMap_Req RpcId
     */

    /**
     * Constructs a new C2G_EnterMap_Req.
     * @memberof MST
     * @classdesc Represents a C2G_EnterMap_Req.
     * @implements IC2G_EnterMap_Req
     * @constructor
     * @param {MST.IC2G_EnterMap_Req=} [p] Properties to set
     */
    function C2G_EnterMap_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2G_EnterMap_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2G_EnterMap_Req
     * @instance
     */


    C2G_EnterMap_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2G_EnterMap_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2G_EnterMap_Req
     * @static
     * @param {MST.IC2G_EnterMap_Req=} [properties] Properties to set
     * @returns {MST.C2G_EnterMap_Req} C2G_EnterMap_Req instance
     */

    C2G_EnterMap_Req.create = function create(properties) {
      return new C2G_EnterMap_Req(properties);
    };
    /**
     * Encodes the specified C2G_EnterMap_Req message. Does not implicitly {@link MST.C2G_EnterMap_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2G_EnterMap_Req
     * @static
     * @param {MST.IC2G_EnterMap_Req} m C2G_EnterMap_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2G_EnterMap_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2G_EnterMap_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2G_EnterMap_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2G_EnterMap_Req} C2G_EnterMap_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2G_EnterMap_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2G_EnterMap_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2G_EnterMap_Req;
  }();

  MST.G2C_EnterMap_Res = function () {
    /**
     * Properties of a G2C_EnterMap_Res.
     * @memberof MST
     * @interface IG2C_EnterMap_Res
     * @property {number|null} [RpcId] G2C_EnterMap_Res RpcId
     * @property {number|null} [Error] G2C_EnterMap_Res Error
     * @property {string|null} [Message] G2C_EnterMap_Res Message
     * @property {number|Long|null} [MyId] G2C_EnterMap_Res MyId
     */

    /**
     * Constructs a new G2C_EnterMap_Res.
     * @memberof MST
     * @classdesc Represents a G2C_EnterMap_Res.
     * @implements IG2C_EnterMap_Res
     * @constructor
     * @param {MST.IG2C_EnterMap_Res=} [p] Properties to set
     */
    function G2C_EnterMap_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * G2C_EnterMap_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.G2C_EnterMap_Res
     * @instance
     */


    G2C_EnterMap_Res.prototype.RpcId = 0;
    /**
     * G2C_EnterMap_Res Error.
     * @member {number} Error
     * @memberof MST.G2C_EnterMap_Res
     * @instance
     */

    G2C_EnterMap_Res.prototype.Error = 0;
    /**
     * G2C_EnterMap_Res Message.
     * @member {string} Message
     * @memberof MST.G2C_EnterMap_Res
     * @instance
     */

    G2C_EnterMap_Res.prototype.Message = "";
    /**
     * G2C_EnterMap_Res MyId.
     * @member {number|Long} MyId
     * @memberof MST.G2C_EnterMap_Res
     * @instance
     */

    G2C_EnterMap_Res.prototype.MyId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new G2C_EnterMap_Res instance using the specified properties.
     * @function create
     * @memberof MST.G2C_EnterMap_Res
     * @static
     * @param {MST.IG2C_EnterMap_Res=} [properties] Properties to set
     * @returns {MST.G2C_EnterMap_Res} G2C_EnterMap_Res instance
     */

    G2C_EnterMap_Res.create = function create(properties) {
      return new G2C_EnterMap_Res(properties);
    };
    /**
     * Encodes the specified G2C_EnterMap_Res message. Does not implicitly {@link MST.G2C_EnterMap_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.G2C_EnterMap_Res
     * @static
     * @param {MST.IG2C_EnterMap_Res} m G2C_EnterMap_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    G2C_EnterMap_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.MyId != null && Object.hasOwnProperty.call(m, "MyId")) w.uint32(32).int64(m.MyId);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a G2C_EnterMap_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.G2C_EnterMap_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.G2C_EnterMap_Res} G2C_EnterMap_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    G2C_EnterMap_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.G2C_EnterMap_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 4:
            m.MyId = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return G2C_EnterMap_Res;
  }();

  MST.UnitInfo = function () {
    /**
     * Properties of an UnitInfo.
     * @memberof MST
     * @interface IUnitInfo
     * @property {number|Long|null} [UnitId] UnitInfo UnitId
     * @property {string|null} [Nick] UnitInfo Nick
     * @property {number|Long|null} [Gold] UnitInfo Gold
     * @property {string|null} [HeaderUrl] UnitInfo HeaderUrl
     */

    /**
     * Constructs a new UnitInfo.
     * @memberof MST
     * @classdesc Represents an UnitInfo.
     * @implements IUnitInfo
     * @constructor
     * @param {MST.IUnitInfo=} [p] Properties to set
     */
    function UnitInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * UnitInfo UnitId.
     * @member {number|Long} UnitId
     * @memberof MST.UnitInfo
     * @instance
     */


    UnitInfo.prototype.UnitId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * UnitInfo Nick.
     * @member {string} Nick
     * @memberof MST.UnitInfo
     * @instance
     */

    UnitInfo.prototype.Nick = "";
    /**
     * UnitInfo Gold.
     * @member {number|Long} Gold
     * @memberof MST.UnitInfo
     * @instance
     */

    UnitInfo.prototype.Gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * UnitInfo HeaderUrl.
     * @member {string} HeaderUrl
     * @memberof MST.UnitInfo
     * @instance
     */

    UnitInfo.prototype.HeaderUrl = "";
    /**
     * Creates a new UnitInfo instance using the specified properties.
     * @function create
     * @memberof MST.UnitInfo
     * @static
     * @param {MST.IUnitInfo=} [properties] Properties to set
     * @returns {MST.UnitInfo} UnitInfo instance
     */

    UnitInfo.create = function create(properties) {
      return new UnitInfo(properties);
    };
    /**
     * Encodes the specified UnitInfo message. Does not implicitly {@link MST.UnitInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.UnitInfo
     * @static
     * @param {MST.IUnitInfo} m UnitInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    UnitInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.UnitId != null && Object.hasOwnProperty.call(m, "UnitId")) w.uint32(8).int64(m.UnitId);
      if (m.Nick != null && Object.hasOwnProperty.call(m, "Nick")) w.uint32(18).string(m.Nick);
      if (m.Gold != null && Object.hasOwnProperty.call(m, "Gold")) w.uint32(24).int64(m.Gold);
      if (m.HeaderUrl != null && Object.hasOwnProperty.call(m, "HeaderUrl")) w.uint32(34).string(m.HeaderUrl);
      return w;
    };
    /**
     * Decodes an UnitInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.UnitInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.UnitInfo} UnitInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    UnitInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.UnitInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.UnitId = r.int64();
            break;

          case 2:
            m.Nick = r.string();
            break;

          case 3:
            m.Gold = r.int64();
            break;

          case 4:
            m.HeaderUrl = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return UnitInfo;
  }();

  MST.RoomInfo = function () {
    /**
     * Properties of a RoomInfo.
     * @memberof MST
     * @interface IRoomInfo
     * @property {number|Long|null} [id] RoomInfo id
     * @property {string|null} [Name] RoomInfo Name
     */

    /**
     * Constructs a new RoomInfo.
     * @memberof MST
     * @classdesc Represents a RoomInfo.
     * @implements IRoomInfo
     * @constructor
     * @param {MST.IRoomInfo=} [p] Properties to set
     */
    function RoomInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * RoomInfo id.
     * @member {number|Long} id
     * @memberof MST.RoomInfo
     * @instance
     */


    RoomInfo.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * RoomInfo Name.
     * @member {string} Name
     * @memberof MST.RoomInfo
     * @instance
     */

    RoomInfo.prototype.Name = "";
    /**
     * Creates a new RoomInfo instance using the specified properties.
     * @function create
     * @memberof MST.RoomInfo
     * @static
     * @param {MST.IRoomInfo=} [properties] Properties to set
     * @returns {MST.RoomInfo} RoomInfo instance
     */

    RoomInfo.create = function create(properties) {
      return new RoomInfo(properties);
    };
    /**
     * Encodes the specified RoomInfo message. Does not implicitly {@link MST.RoomInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.RoomInfo
     * @static
     * @param {MST.IRoomInfo} m RoomInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    RoomInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(8).int64(m.id);
      if (m.Name != null && Object.hasOwnProperty.call(m, "Name")) w.uint32(18).string(m.Name);
      return w;
    };
    /**
     * Decodes a RoomInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.RoomInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.RoomInfo} RoomInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    RoomInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.RoomInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.id = r.int64();
            break;

          case 2:
            m.Name = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return RoomInfo;
  }();

  MST.C2G_Ping_Req = function () {
    /**
     * Properties of a C2G_Ping_Req.
     * @memberof MST
     * @interface IC2G_Ping_Req
     * @property {number|null} [RpcId] C2G_Ping_Req RpcId
     */

    /**
     * Constructs a new C2G_Ping_Req.
     * @memberof MST
     * @classdesc Represents a C2G_Ping_Req.
     * @implements IC2G_Ping_Req
     * @constructor
     * @param {MST.IC2G_Ping_Req=} [p] Properties to set
     */
    function C2G_Ping_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2G_Ping_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2G_Ping_Req
     * @instance
     */


    C2G_Ping_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2G_Ping_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2G_Ping_Req
     * @static
     * @param {MST.IC2G_Ping_Req=} [properties] Properties to set
     * @returns {MST.C2G_Ping_Req} C2G_Ping_Req instance
     */

    C2G_Ping_Req.create = function create(properties) {
      return new C2G_Ping_Req(properties);
    };
    /**
     * Encodes the specified C2G_Ping_Req message. Does not implicitly {@link MST.C2G_Ping_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2G_Ping_Req
     * @static
     * @param {MST.IC2G_Ping_Req} m C2G_Ping_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2G_Ping_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2G_Ping_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2G_Ping_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2G_Ping_Req} C2G_Ping_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2G_Ping_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2G_Ping_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2G_Ping_Req;
  }();

  MST.G2C_Ping_Res = function () {
    /**
     * Properties of a G2C_Ping_Res.
     * @memberof MST
     * @interface IG2C_Ping_Res
     * @property {number|null} [RpcId] G2C_Ping_Res RpcId
     * @property {number|null} [Error] G2C_Ping_Res Error
     * @property {string|null} [Message] G2C_Ping_Res Message
     * @property {number|Long|null} [Time] G2C_Ping_Res Time
     */

    /**
     * Constructs a new G2C_Ping_Res.
     * @memberof MST
     * @classdesc Represents a G2C_Ping_Res.
     * @implements IG2C_Ping_Res
     * @constructor
     * @param {MST.IG2C_Ping_Res=} [p] Properties to set
     */
    function G2C_Ping_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * G2C_Ping_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.G2C_Ping_Res
     * @instance
     */


    G2C_Ping_Res.prototype.RpcId = 0;
    /**
     * G2C_Ping_Res Error.
     * @member {number} Error
     * @memberof MST.G2C_Ping_Res
     * @instance
     */

    G2C_Ping_Res.prototype.Error = 0;
    /**
     * G2C_Ping_Res Message.
     * @member {string} Message
     * @memberof MST.G2C_Ping_Res
     * @instance
     */

    G2C_Ping_Res.prototype.Message = "";
    /**
     * G2C_Ping_Res Time.
     * @member {number|Long} Time
     * @memberof MST.G2C_Ping_Res
     * @instance
     */

    G2C_Ping_Res.prototype.Time = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new G2C_Ping_Res instance using the specified properties.
     * @function create
     * @memberof MST.G2C_Ping_Res
     * @static
     * @param {MST.IG2C_Ping_Res=} [properties] Properties to set
     * @returns {MST.G2C_Ping_Res} G2C_Ping_Res instance
     */

    G2C_Ping_Res.create = function create(properties) {
      return new G2C_Ping_Res(properties);
    };
    /**
     * Encodes the specified G2C_Ping_Res message. Does not implicitly {@link MST.G2C_Ping_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.G2C_Ping_Res
     * @static
     * @param {MST.IG2C_Ping_Res} m G2C_Ping_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    G2C_Ping_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Time != null && Object.hasOwnProperty.call(m, "Time")) w.uint32(8).int64(m.Time);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a G2C_Ping_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.G2C_Ping_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.G2C_Ping_Res} G2C_Ping_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    G2C_Ping_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.G2C_Ping_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Time = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return G2C_Ping_Res;
  }();

  MST.C2G_LoginGate_Req = function () {
    /**
     * Properties of a C2G_LoginGate_Req.
     * @memberof MST
     * @interface IC2G_LoginGate_Req
     * @property {number|null} [RpcId] C2G_LoginGate_Req RpcId
     * @property {string|null} [MachineCode] C2G_LoginGate_Req MachineCode
     * @property {number|null} [OS] C2G_LoginGate_Req OS
     * @property {string|null} [Description] C2G_LoginGate_Req Description
     */

    /**
     * Constructs a new C2G_LoginGate_Req.
     * @memberof MST
     * @classdesc Represents a C2G_LoginGate_Req.
     * @implements IC2G_LoginGate_Req
     * @constructor
     * @param {MST.IC2G_LoginGate_Req=} [p] Properties to set
     */
    function C2G_LoginGate_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2G_LoginGate_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2G_LoginGate_Req
     * @instance
     */


    C2G_LoginGate_Req.prototype.RpcId = 0;
    /**
     * C2G_LoginGate_Req MachineCode.
     * @member {string} MachineCode
     * @memberof MST.C2G_LoginGate_Req
     * @instance
     */

    C2G_LoginGate_Req.prototype.MachineCode = "";
    /**
     * C2G_LoginGate_Req OS.
     * @member {number} OS
     * @memberof MST.C2G_LoginGate_Req
     * @instance
     */

    C2G_LoginGate_Req.prototype.OS = 0;
    /**
     * C2G_LoginGate_Req Description.
     * @member {string} Description
     * @memberof MST.C2G_LoginGate_Req
     * @instance
     */

    C2G_LoginGate_Req.prototype.Description = "";
    /**
     * Creates a new C2G_LoginGate_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2G_LoginGate_Req
     * @static
     * @param {MST.IC2G_LoginGate_Req=} [properties] Properties to set
     * @returns {MST.C2G_LoginGate_Req} C2G_LoginGate_Req instance
     */

    C2G_LoginGate_Req.create = function create(properties) {
      return new C2G_LoginGate_Req(properties);
    };
    /**
     * Encodes the specified C2G_LoginGate_Req message. Does not implicitly {@link MST.C2G_LoginGate_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2G_LoginGate_Req
     * @static
     * @param {MST.IC2G_LoginGate_Req} m C2G_LoginGate_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2G_LoginGate_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.MachineCode != null && Object.hasOwnProperty.call(m, "MachineCode")) w.uint32(10).string(m.MachineCode);
      if (m.OS != null && Object.hasOwnProperty.call(m, "OS")) w.uint32(16).int32(m.OS);
      if (m.Description != null && Object.hasOwnProperty.call(m, "Description")) w.uint32(26).string(m.Description);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2G_LoginGate_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2G_LoginGate_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2G_LoginGate_Req} C2G_LoginGate_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2G_LoginGate_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2G_LoginGate_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.MachineCode = r.string();
            break;

          case 2:
            m.OS = r.int32();
            break;

          case 3:
            m.Description = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2G_LoginGate_Req;
  }();

  MST.G2C_LoginGate_Res = function () {
    /**
     * Properties of a G2C_LoginGate_Res.
     * @memberof MST
     * @interface IG2C_LoginGate_Res
     * @property {number|null} [RpcId] G2C_LoginGate_Res RpcId
     * @property {number|null} [Error] G2C_LoginGate_Res Error
     * @property {string|null} [Message] G2C_LoginGate_Res Message
     * @property {string|null} [Token] G2C_LoginGate_Res Token
     * @property {Array.<MST.IRoomInfo>|null} [Rooms] G2C_LoginGate_Res Rooms
     */

    /**
     * Constructs a new G2C_LoginGate_Res.
     * @memberof MST
     * @classdesc Represents a G2C_LoginGate_Res.
     * @implements IG2C_LoginGate_Res
     * @constructor
     * @param {MST.IG2C_LoginGate_Res=} [p] Properties to set
     */
    function G2C_LoginGate_Res(p) {
      this.Rooms = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * G2C_LoginGate_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.G2C_LoginGate_Res
     * @instance
     */


    G2C_LoginGate_Res.prototype.RpcId = 0;
    /**
     * G2C_LoginGate_Res Error.
     * @member {number} Error
     * @memberof MST.G2C_LoginGate_Res
     * @instance
     */

    G2C_LoginGate_Res.prototype.Error = 0;
    /**
     * G2C_LoginGate_Res Message.
     * @member {string} Message
     * @memberof MST.G2C_LoginGate_Res
     * @instance
     */

    G2C_LoginGate_Res.prototype.Message = "";
    /**
     * G2C_LoginGate_Res Token.
     * @member {string} Token
     * @memberof MST.G2C_LoginGate_Res
     * @instance
     */

    G2C_LoginGate_Res.prototype.Token = "";
    /**
     * G2C_LoginGate_Res Rooms.
     * @member {Array.<MST.IRoomInfo>} Rooms
     * @memberof MST.G2C_LoginGate_Res
     * @instance
     */

    G2C_LoginGate_Res.prototype.Rooms = $util.emptyArray;
    /**
     * Creates a new G2C_LoginGate_Res instance using the specified properties.
     * @function create
     * @memberof MST.G2C_LoginGate_Res
     * @static
     * @param {MST.IG2C_LoginGate_Res=} [properties] Properties to set
     * @returns {MST.G2C_LoginGate_Res} G2C_LoginGate_Res instance
     */

    G2C_LoginGate_Res.create = function create(properties) {
      return new G2C_LoginGate_Res(properties);
    };
    /**
     * Encodes the specified G2C_LoginGate_Res message. Does not implicitly {@link MST.G2C_LoginGate_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.G2C_LoginGate_Res
     * @static
     * @param {MST.IG2C_LoginGate_Res} m G2C_LoginGate_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    G2C_LoginGate_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Token != null && Object.hasOwnProperty.call(m, "Token")) w.uint32(10).string(m.Token);

      if (m.Rooms != null && m.Rooms.length) {
        for (var i = 0; i < m.Rooms.length; ++i) {
          $root.MST.RoomInfo.encode(m.Rooms[i], w.uint32(34).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a G2C_LoginGate_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.G2C_LoginGate_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.G2C_LoginGate_Res} G2C_LoginGate_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    G2C_LoginGate_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.G2C_LoginGate_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Token = r.string();
            break;

          case 4:
            if (!(m.Rooms && m.Rooms.length)) m.Rooms = [];
            m.Rooms.push($root.MST.RoomInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return G2C_LoginGate_Res;
  }();

  MST.G2C_SystemError_Mes = function () {
    /**
     * Properties of a G2C_SystemError_Mes.
     * @memberof MST
     * @interface IG2C_SystemError_Mes
     * @property {number|null} [Error] G2C_SystemError_Mes Error
     * @property {string|null} [Message] G2C_SystemError_Mes Message
     */

    /**
     * Constructs a new G2C_SystemError_Mes.
     * @memberof MST
     * @classdesc Represents a G2C_SystemError_Mes.
     * @implements IG2C_SystemError_Mes
     * @constructor
     * @param {MST.IG2C_SystemError_Mes=} [p] Properties to set
     */
    function G2C_SystemError_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * G2C_SystemError_Mes Error.
     * @member {number} Error
     * @memberof MST.G2C_SystemError_Mes
     * @instance
     */


    G2C_SystemError_Mes.prototype.Error = 0;
    /**
     * G2C_SystemError_Mes Message.
     * @member {string} Message
     * @memberof MST.G2C_SystemError_Mes
     * @instance
     */

    G2C_SystemError_Mes.prototype.Message = "";
    /**
     * Creates a new G2C_SystemError_Mes instance using the specified properties.
     * @function create
     * @memberof MST.G2C_SystemError_Mes
     * @static
     * @param {MST.IG2C_SystemError_Mes=} [properties] Properties to set
     * @returns {MST.G2C_SystemError_Mes} G2C_SystemError_Mes instance
     */

    G2C_SystemError_Mes.create = function create(properties) {
      return new G2C_SystemError_Mes(properties);
    };
    /**
     * Encodes the specified G2C_SystemError_Mes message. Does not implicitly {@link MST.G2C_SystemError_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.G2C_SystemError_Mes
     * @static
     * @param {MST.IG2C_SystemError_Mes} m G2C_SystemError_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    G2C_SystemError_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a G2C_SystemError_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.G2C_SystemError_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.G2C_SystemError_Mes} G2C_SystemError_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    G2C_SystemError_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.G2C_SystemError_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return G2C_SystemError_Mes;
  }();

  MST.C2L_BindMailBox_Req = function () {
    /**
     * Properties of a C2L_BindMailBox_Req.
     * @memberof MST
     * @interface IC2L_BindMailBox_Req
     * @property {number|null} [RpcId] C2L_BindMailBox_Req RpcId
     * @property {string|null} [MailAddress] C2L_BindMailBox_Req MailAddress
     */

    /**
     * Constructs a new C2L_BindMailBox_Req.
     * @memberof MST
     * @classdesc Represents a C2L_BindMailBox_Req.
     * @implements IC2L_BindMailBox_Req
     * @constructor
     * @param {MST.IC2L_BindMailBox_Req=} [p] Properties to set
     */
    function C2L_BindMailBox_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_BindMailBox_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_BindMailBox_Req
     * @instance
     */


    C2L_BindMailBox_Req.prototype.RpcId = 0;
    /**
     * C2L_BindMailBox_Req MailAddress.
     * @member {string} MailAddress
     * @memberof MST.C2L_BindMailBox_Req
     * @instance
     */

    C2L_BindMailBox_Req.prototype.MailAddress = "";
    /**
     * Creates a new C2L_BindMailBox_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_BindMailBox_Req
     * @static
     * @param {MST.IC2L_BindMailBox_Req=} [properties] Properties to set
     * @returns {MST.C2L_BindMailBox_Req} C2L_BindMailBox_Req instance
     */

    C2L_BindMailBox_Req.create = function create(properties) {
      return new C2L_BindMailBox_Req(properties);
    };
    /**
     * Encodes the specified C2L_BindMailBox_Req message. Does not implicitly {@link MST.C2L_BindMailBox_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_BindMailBox_Req
     * @static
     * @param {MST.IC2L_BindMailBox_Req} m C2L_BindMailBox_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_BindMailBox_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.MailAddress != null && Object.hasOwnProperty.call(m, "MailAddress")) w.uint32(18).string(m.MailAddress);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_BindMailBox_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_BindMailBox_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_BindMailBox_Req} C2L_BindMailBox_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_BindMailBox_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_BindMailBox_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 2:
            m.MailAddress = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_BindMailBox_Req;
  }();

  MST.L2C_BindMailBox_Res = function () {
    /**
     * Properties of a L2C_BindMailBox_Res.
     * @memberof MST
     * @interface IL2C_BindMailBox_Res
     * @property {number|null} [RpcId] L2C_BindMailBox_Res RpcId
     * @property {number|null} [Error] L2C_BindMailBox_Res Error
     * @property {string|null} [Message] L2C_BindMailBox_Res Message
     */

    /**
     * Constructs a new L2C_BindMailBox_Res.
     * @memberof MST
     * @classdesc Represents a L2C_BindMailBox_Res.
     * @implements IL2C_BindMailBox_Res
     * @constructor
     * @param {MST.IL2C_BindMailBox_Res=} [p] Properties to set
     */
    function L2C_BindMailBox_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_BindMailBox_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_BindMailBox_Res
     * @instance
     */


    L2C_BindMailBox_Res.prototype.RpcId = 0;
    /**
     * L2C_BindMailBox_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_BindMailBox_Res
     * @instance
     */

    L2C_BindMailBox_Res.prototype.Error = 0;
    /**
     * L2C_BindMailBox_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_BindMailBox_Res
     * @instance
     */

    L2C_BindMailBox_Res.prototype.Message = "";
    /**
     * Creates a new L2C_BindMailBox_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_BindMailBox_Res
     * @static
     * @param {MST.IL2C_BindMailBox_Res=} [properties] Properties to set
     * @returns {MST.L2C_BindMailBox_Res} L2C_BindMailBox_Res instance
     */

    L2C_BindMailBox_Res.create = function create(properties) {
      return new L2C_BindMailBox_Res(properties);
    };
    /**
     * Encodes the specified L2C_BindMailBox_Res message. Does not implicitly {@link MST.L2C_BindMailBox_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_BindMailBox_Res
     * @static
     * @param {MST.IL2C_BindMailBox_Res} m L2C_BindMailBox_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_BindMailBox_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_BindMailBox_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_BindMailBox_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_BindMailBox_Res} L2C_BindMailBox_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_BindMailBox_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_BindMailBox_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_BindMailBox_Res;
  }();

  MST.C2L_BindPhone_Req = function () {
    /**
     * Properties of a C2L_BindPhone_Req.
     * @memberof MST
     * @interface IC2L_BindPhone_Req
     * @property {number|null} [RpcId] C2L_BindPhone_Req RpcId
     * @property {string|null} [Phone] C2L_BindPhone_Req Phone
     * @property {string|null} [Code] C2L_BindPhone_Req Code
     */

    /**
     * Constructs a new C2L_BindPhone_Req.
     * @memberof MST
     * @classdesc Represents a C2L_BindPhone_Req.
     * @implements IC2L_BindPhone_Req
     * @constructor
     * @param {MST.IC2L_BindPhone_Req=} [p] Properties to set
     */
    function C2L_BindPhone_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_BindPhone_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_BindPhone_Req
     * @instance
     */


    C2L_BindPhone_Req.prototype.RpcId = 0;
    /**
     * C2L_BindPhone_Req Phone.
     * @member {string} Phone
     * @memberof MST.C2L_BindPhone_Req
     * @instance
     */

    C2L_BindPhone_Req.prototype.Phone = "";
    /**
     * C2L_BindPhone_Req Code.
     * @member {string} Code
     * @memberof MST.C2L_BindPhone_Req
     * @instance
     */

    C2L_BindPhone_Req.prototype.Code = "";
    /**
     * Creates a new C2L_BindPhone_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_BindPhone_Req
     * @static
     * @param {MST.IC2L_BindPhone_Req=} [properties] Properties to set
     * @returns {MST.C2L_BindPhone_Req} C2L_BindPhone_Req instance
     */

    C2L_BindPhone_Req.create = function create(properties) {
      return new C2L_BindPhone_Req(properties);
    };
    /**
     * Encodes the specified C2L_BindPhone_Req message. Does not implicitly {@link MST.C2L_BindPhone_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_BindPhone_Req
     * @static
     * @param {MST.IC2L_BindPhone_Req} m C2L_BindPhone_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_BindPhone_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Phone != null && Object.hasOwnProperty.call(m, "Phone")) w.uint32(18).string(m.Phone);
      if (m.Code != null && Object.hasOwnProperty.call(m, "Code")) w.uint32(26).string(m.Code);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_BindPhone_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_BindPhone_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_BindPhone_Req} C2L_BindPhone_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_BindPhone_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_BindPhone_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 2:
            m.Phone = r.string();
            break;

          case 3:
            m.Code = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_BindPhone_Req;
  }();

  MST.L2C_BindPhone_Res = function () {
    /**
     * Properties of a L2C_BindPhone_Res.
     * @memberof MST
     * @interface IL2C_BindPhone_Res
     * @property {number|null} [RpcId] L2C_BindPhone_Res RpcId
     * @property {number|null} [Error] L2C_BindPhone_Res Error
     * @property {string|null} [Message] L2C_BindPhone_Res Message
     */

    /**
     * Constructs a new L2C_BindPhone_Res.
     * @memberof MST
     * @classdesc Represents a L2C_BindPhone_Res.
     * @implements IL2C_BindPhone_Res
     * @constructor
     * @param {MST.IL2C_BindPhone_Res=} [p] Properties to set
     */
    function L2C_BindPhone_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_BindPhone_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_BindPhone_Res
     * @instance
     */


    L2C_BindPhone_Res.prototype.RpcId = 0;
    /**
     * L2C_BindPhone_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_BindPhone_Res
     * @instance
     */

    L2C_BindPhone_Res.prototype.Error = 0;
    /**
     * L2C_BindPhone_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_BindPhone_Res
     * @instance
     */

    L2C_BindPhone_Res.prototype.Message = "";
    /**
     * Creates a new L2C_BindPhone_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_BindPhone_Res
     * @static
     * @param {MST.IL2C_BindPhone_Res=} [properties] Properties to set
     * @returns {MST.L2C_BindPhone_Res} L2C_BindPhone_Res instance
     */

    L2C_BindPhone_Res.create = function create(properties) {
      return new L2C_BindPhone_Res(properties);
    };
    /**
     * Encodes the specified L2C_BindPhone_Res message. Does not implicitly {@link MST.L2C_BindPhone_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_BindPhone_Res
     * @static
     * @param {MST.IL2C_BindPhone_Res} m L2C_BindPhone_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_BindPhone_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_BindPhone_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_BindPhone_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_BindPhone_Res} L2C_BindPhone_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_BindPhone_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_BindPhone_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_BindPhone_Res;
  }();

  MST.UnitRankInfo = function () {
    /**
     * Properties of an UnitRankInfo.
     * @memberof MST
     * @interface IUnitRankInfo
     * @property {number|null} [AccountId] UnitRankInfo AccountId
     * @property {string|null} [NickName] UnitRankInfo NickName
     * @property {number|Long|null} [gold] UnitRankInfo gold
     */

    /**
     * Constructs a new UnitRankInfo.
     * @memberof MST
     * @classdesc Represents an UnitRankInfo.
     * @implements IUnitRankInfo
     * @constructor
     * @param {MST.IUnitRankInfo=} [p] Properties to set
     */
    function UnitRankInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * UnitRankInfo AccountId.
     * @member {number} AccountId
     * @memberof MST.UnitRankInfo
     * @instance
     */


    UnitRankInfo.prototype.AccountId = 0;
    /**
     * UnitRankInfo NickName.
     * @member {string} NickName
     * @memberof MST.UnitRankInfo
     * @instance
     */

    UnitRankInfo.prototype.NickName = "";
    /**
     * UnitRankInfo gold.
     * @member {number|Long} gold
     * @memberof MST.UnitRankInfo
     * @instance
     */

    UnitRankInfo.prototype.gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new UnitRankInfo instance using the specified properties.
     * @function create
     * @memberof MST.UnitRankInfo
     * @static
     * @param {MST.IUnitRankInfo=} [properties] Properties to set
     * @returns {MST.UnitRankInfo} UnitRankInfo instance
     */

    UnitRankInfo.create = function create(properties) {
      return new UnitRankInfo(properties);
    };
    /**
     * Encodes the specified UnitRankInfo message. Does not implicitly {@link MST.UnitRankInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.UnitRankInfo
     * @static
     * @param {MST.IUnitRankInfo} m UnitRankInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    UnitRankInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.AccountId != null && Object.hasOwnProperty.call(m, "AccountId")) w.uint32(8).int32(m.AccountId);
      if (m.NickName != null && Object.hasOwnProperty.call(m, "NickName")) w.uint32(18).string(m.NickName);
      if (m.gold != null && Object.hasOwnProperty.call(m, "gold")) w.uint32(24).int64(m.gold);
      return w;
    };
    /**
     * Decodes an UnitRankInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.UnitRankInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.UnitRankInfo} UnitRankInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    UnitRankInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.UnitRankInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.AccountId = r.int32();
            break;

          case 2:
            m.NickName = r.string();
            break;

          case 3:
            m.gold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return UnitRankInfo;
  }();

  MST.C2L_GoldRankDay_Req = function () {
    /**
     * Properties of a C2L_GoldRankDay_Req.
     * @memberof MST
     * @interface IC2L_GoldRankDay_Req
     * @property {number|null} [RpcId] C2L_GoldRankDay_Req RpcId
     */

    /**
     * Constructs a new C2L_GoldRankDay_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GoldRankDay_Req.
     * @implements IC2L_GoldRankDay_Req
     * @constructor
     * @param {MST.IC2L_GoldRankDay_Req=} [p] Properties to set
     */
    function C2L_GoldRankDay_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GoldRankDay_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GoldRankDay_Req
     * @instance
     */


    C2L_GoldRankDay_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GoldRankDay_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GoldRankDay_Req
     * @static
     * @param {MST.IC2L_GoldRankDay_Req=} [properties] Properties to set
     * @returns {MST.C2L_GoldRankDay_Req} C2L_GoldRankDay_Req instance
     */

    C2L_GoldRankDay_Req.create = function create(properties) {
      return new C2L_GoldRankDay_Req(properties);
    };
    /**
     * Encodes the specified C2L_GoldRankDay_Req message. Does not implicitly {@link MST.C2L_GoldRankDay_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GoldRankDay_Req
     * @static
     * @param {MST.IC2L_GoldRankDay_Req} m C2L_GoldRankDay_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GoldRankDay_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GoldRankDay_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GoldRankDay_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GoldRankDay_Req} C2L_GoldRankDay_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GoldRankDay_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GoldRankDay_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GoldRankDay_Req;
  }();

  MST.L2C_GoldRankDay_Res = function () {
    /**
     * Properties of a L2C_GoldRankDay_Res.
     * @memberof MST
     * @interface IL2C_GoldRankDay_Res
     * @property {number|null} [RpcId] L2C_GoldRankDay_Res RpcId
     * @property {number|null} [Error] L2C_GoldRankDay_Res Error
     * @property {string|null} [Message] L2C_GoldRankDay_Res Message
     * @property {Array.<MST.IUnitRankInfo>|null} [Units] L2C_GoldRankDay_Res Units
     */

    /**
     * Constructs a new L2C_GoldRankDay_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GoldRankDay_Res.
     * @implements IL2C_GoldRankDay_Res
     * @constructor
     * @param {MST.IL2C_GoldRankDay_Res=} [p] Properties to set
     */
    function L2C_GoldRankDay_Res(p) {
      this.Units = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GoldRankDay_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GoldRankDay_Res
     * @instance
     */


    L2C_GoldRankDay_Res.prototype.RpcId = 0;
    /**
     * L2C_GoldRankDay_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GoldRankDay_Res
     * @instance
     */

    L2C_GoldRankDay_Res.prototype.Error = 0;
    /**
     * L2C_GoldRankDay_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_GoldRankDay_Res
     * @instance
     */

    L2C_GoldRankDay_Res.prototype.Message = "";
    /**
     * L2C_GoldRankDay_Res Units.
     * @member {Array.<MST.IUnitRankInfo>} Units
     * @memberof MST.L2C_GoldRankDay_Res
     * @instance
     */

    L2C_GoldRankDay_Res.prototype.Units = $util.emptyArray;
    /**
     * Creates a new L2C_GoldRankDay_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GoldRankDay_Res
     * @static
     * @param {MST.IL2C_GoldRankDay_Res=} [properties] Properties to set
     * @returns {MST.L2C_GoldRankDay_Res} L2C_GoldRankDay_Res instance
     */

    L2C_GoldRankDay_Res.create = function create(properties) {
      return new L2C_GoldRankDay_Res(properties);
    };
    /**
     * Encodes the specified L2C_GoldRankDay_Res message. Does not implicitly {@link MST.L2C_GoldRankDay_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GoldRankDay_Res
     * @static
     * @param {MST.IL2C_GoldRankDay_Res} m L2C_GoldRankDay_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GoldRankDay_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Units != null && m.Units.length) {
        for (var i = 0; i < m.Units.length; ++i) {
          $root.MST.UnitRankInfo.encode(m.Units[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_GoldRankDay_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GoldRankDay_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GoldRankDay_Res} L2C_GoldRankDay_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GoldRankDay_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GoldRankDay_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.Units && m.Units.length)) m.Units = [];
            m.Units.push($root.MST.UnitRankInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GoldRankDay_Res;
  }();

  MST.BetInfo = function () {
    /**
     * Properties of a BetInfo.
     * @memberof MST
     * @interface IBetInfo
     * @property {number|Long|null} [AccountId] BetInfo AccountId
     * @property {string|null} [Nick] BetInfo Nick
     * @property {number|Long|null} [Score] BetInfo Score
     * @property {string|null} [headUrl] BetInfo headUrl
     * @property {string|null} [gameName] BetInfo gameName
     */

    /**
     * Constructs a new BetInfo.
     * @memberof MST
     * @classdesc Represents a BetInfo.
     * @implements IBetInfo
     * @constructor
     * @param {MST.IBetInfo=} [p] Properties to set
     */
    function BetInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * BetInfo AccountId.
     * @member {number|Long} AccountId
     * @memberof MST.BetInfo
     * @instance
     */


    BetInfo.prototype.AccountId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * BetInfo Nick.
     * @member {string} Nick
     * @memberof MST.BetInfo
     * @instance
     */

    BetInfo.prototype.Nick = "";
    /**
     * BetInfo Score.
     * @member {number|Long} Score
     * @memberof MST.BetInfo
     * @instance
     */

    BetInfo.prototype.Score = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * BetInfo headUrl.
     * @member {string} headUrl
     * @memberof MST.BetInfo
     * @instance
     */

    BetInfo.prototype.headUrl = "";
    /**
     * BetInfo gameName.
     * @member {string} gameName
     * @memberof MST.BetInfo
     * @instance
     */

    BetInfo.prototype.gameName = "";
    /**
     * Creates a new BetInfo instance using the specified properties.
     * @function create
     * @memberof MST.BetInfo
     * @static
     * @param {MST.IBetInfo=} [properties] Properties to set
     * @returns {MST.BetInfo} BetInfo instance
     */

    BetInfo.create = function create(properties) {
      return new BetInfo(properties);
    };
    /**
     * Encodes the specified BetInfo message. Does not implicitly {@link MST.BetInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.BetInfo
     * @static
     * @param {MST.IBetInfo} m BetInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    BetInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.AccountId != null && Object.hasOwnProperty.call(m, "AccountId")) w.uint32(8).int64(m.AccountId);
      if (m.Nick != null && Object.hasOwnProperty.call(m, "Nick")) w.uint32(18).string(m.Nick);
      if (m.Score != null && Object.hasOwnProperty.call(m, "Score")) w.uint32(24).int64(m.Score);
      if (m.headUrl != null && Object.hasOwnProperty.call(m, "headUrl")) w.uint32(34).string(m.headUrl);
      if (m.gameName != null && Object.hasOwnProperty.call(m, "gameName")) w.uint32(42).string(m.gameName);
      return w;
    };
    /**
     * Decodes a BetInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.BetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.BetInfo} BetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    BetInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.BetInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.AccountId = r.int64();
            break;

          case 2:
            m.Nick = r.string();
            break;

          case 3:
            m.Score = r.int64();
            break;

          case 4:
            m.headUrl = r.string();
            break;

          case 5:
            m.gameName = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return BetInfo;
  }();

  MST.C2L_BetRank_Req = function () {
    /**
     * Properties of a C2L_BetRank_Req.
     * @memberof MST
     * @interface IC2L_BetRank_Req
     * @property {number|null} [RpcId] C2L_BetRank_Req RpcId
     */

    /**
     * Constructs a new C2L_BetRank_Req.
     * @memberof MST
     * @classdesc Represents a C2L_BetRank_Req.
     * @implements IC2L_BetRank_Req
     * @constructor
     * @param {MST.IC2L_BetRank_Req=} [p] Properties to set
     */
    function C2L_BetRank_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_BetRank_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_BetRank_Req
     * @instance
     */


    C2L_BetRank_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_BetRank_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_BetRank_Req
     * @static
     * @param {MST.IC2L_BetRank_Req=} [properties] Properties to set
     * @returns {MST.C2L_BetRank_Req} C2L_BetRank_Req instance
     */

    C2L_BetRank_Req.create = function create(properties) {
      return new C2L_BetRank_Req(properties);
    };
    /**
     * Encodes the specified C2L_BetRank_Req message. Does not implicitly {@link MST.C2L_BetRank_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_BetRank_Req
     * @static
     * @param {MST.IC2L_BetRank_Req} m C2L_BetRank_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_BetRank_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_BetRank_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_BetRank_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_BetRank_Req} C2L_BetRank_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_BetRank_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_BetRank_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_BetRank_Req;
  }();

  MST.L2C_BetRank_Res = function () {
    /**
     * Properties of a L2C_BetRank_Res.
     * @memberof MST
     * @interface IL2C_BetRank_Res
     * @property {number|null} [RpcId] L2C_BetRank_Res RpcId
     * @property {number|null} [Error] L2C_BetRank_Res Error
     * @property {string|null} [Message] L2C_BetRank_Res Message
     * @property {Array.<MST.IBetInfo>|null} [infos] L2C_BetRank_Res infos
     */

    /**
     * Constructs a new L2C_BetRank_Res.
     * @memberof MST
     * @classdesc Represents a L2C_BetRank_Res.
     * @implements IL2C_BetRank_Res
     * @constructor
     * @param {MST.IL2C_BetRank_Res=} [p] Properties to set
     */
    function L2C_BetRank_Res(p) {
      this.infos = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_BetRank_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_BetRank_Res
     * @instance
     */


    L2C_BetRank_Res.prototype.RpcId = 0;
    /**
     * L2C_BetRank_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_BetRank_Res
     * @instance
     */

    L2C_BetRank_Res.prototype.Error = 0;
    /**
     * L2C_BetRank_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_BetRank_Res
     * @instance
     */

    L2C_BetRank_Res.prototype.Message = "";
    /**
     * L2C_BetRank_Res infos.
     * @member {Array.<MST.IBetInfo>} infos
     * @memberof MST.L2C_BetRank_Res
     * @instance
     */

    L2C_BetRank_Res.prototype.infos = $util.emptyArray;
    /**
     * Creates a new L2C_BetRank_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_BetRank_Res
     * @static
     * @param {MST.IL2C_BetRank_Res=} [properties] Properties to set
     * @returns {MST.L2C_BetRank_Res} L2C_BetRank_Res instance
     */

    L2C_BetRank_Res.create = function create(properties) {
      return new L2C_BetRank_Res(properties);
    };
    /**
     * Encodes the specified L2C_BetRank_Res message. Does not implicitly {@link MST.L2C_BetRank_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_BetRank_Res
     * @static
     * @param {MST.IL2C_BetRank_Res} m L2C_BetRank_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_BetRank_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.infos != null && m.infos.length) {
        for (var i = 0; i < m.infos.length; ++i) {
          $root.MST.BetInfo.encode(m.infos[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_BetRank_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_BetRank_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_BetRank_Res} L2C_BetRank_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_BetRank_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_BetRank_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.infos && m.infos.length)) m.infos = [];
            m.infos.push($root.MST.BetInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_BetRank_Res;
  }();

  MST.C2L_WinDayRank_Req = function () {
    /**
     * Properties of a C2L_WinDayRank_Req.
     * @memberof MST
     * @interface IC2L_WinDayRank_Req
     * @property {number|null} [RpcId] C2L_WinDayRank_Req RpcId
     */

    /**
     * Constructs a new C2L_WinDayRank_Req.
     * @memberof MST
     * @classdesc Represents a C2L_WinDayRank_Req.
     * @implements IC2L_WinDayRank_Req
     * @constructor
     * @param {MST.IC2L_WinDayRank_Req=} [p] Properties to set
     */
    function C2L_WinDayRank_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_WinDayRank_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_WinDayRank_Req
     * @instance
     */


    C2L_WinDayRank_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_WinDayRank_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_WinDayRank_Req
     * @static
     * @param {MST.IC2L_WinDayRank_Req=} [properties] Properties to set
     * @returns {MST.C2L_WinDayRank_Req} C2L_WinDayRank_Req instance
     */

    C2L_WinDayRank_Req.create = function create(properties) {
      return new C2L_WinDayRank_Req(properties);
    };
    /**
     * Encodes the specified C2L_WinDayRank_Req message. Does not implicitly {@link MST.C2L_WinDayRank_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_WinDayRank_Req
     * @static
     * @param {MST.IC2L_WinDayRank_Req} m C2L_WinDayRank_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_WinDayRank_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_WinDayRank_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_WinDayRank_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_WinDayRank_Req} C2L_WinDayRank_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_WinDayRank_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_WinDayRank_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_WinDayRank_Req;
  }();

  MST.L2C_WinDayRank_Res = function () {
    /**
     * Properties of a L2C_WinDayRank_Res.
     * @memberof MST
     * @interface IL2C_WinDayRank_Res
     * @property {number|null} [RpcId] L2C_WinDayRank_Res RpcId
     * @property {number|null} [Error] L2C_WinDayRank_Res Error
     * @property {string|null} [Message] L2C_WinDayRank_Res Message
     * @property {Array.<MST.IRankInfoCell>|null} [infos] L2C_WinDayRank_Res infos
     */

    /**
     * Constructs a new L2C_WinDayRank_Res.
     * @memberof MST
     * @classdesc Represents a L2C_WinDayRank_Res.
     * @implements IL2C_WinDayRank_Res
     * @constructor
     * @param {MST.IL2C_WinDayRank_Res=} [p] Properties to set
     */
    function L2C_WinDayRank_Res(p) {
      this.infos = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_WinDayRank_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_WinDayRank_Res
     * @instance
     */


    L2C_WinDayRank_Res.prototype.RpcId = 0;
    /**
     * L2C_WinDayRank_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_WinDayRank_Res
     * @instance
     */

    L2C_WinDayRank_Res.prototype.Error = 0;
    /**
     * L2C_WinDayRank_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_WinDayRank_Res
     * @instance
     */

    L2C_WinDayRank_Res.prototype.Message = "";
    /**
     * L2C_WinDayRank_Res infos.
     * @member {Array.<MST.IRankInfoCell>} infos
     * @memberof MST.L2C_WinDayRank_Res
     * @instance
     */

    L2C_WinDayRank_Res.prototype.infos = $util.emptyArray;
    /**
     * Creates a new L2C_WinDayRank_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_WinDayRank_Res
     * @static
     * @param {MST.IL2C_WinDayRank_Res=} [properties] Properties to set
     * @returns {MST.L2C_WinDayRank_Res} L2C_WinDayRank_Res instance
     */

    L2C_WinDayRank_Res.create = function create(properties) {
      return new L2C_WinDayRank_Res(properties);
    };
    /**
     * Encodes the specified L2C_WinDayRank_Res message. Does not implicitly {@link MST.L2C_WinDayRank_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_WinDayRank_Res
     * @static
     * @param {MST.IL2C_WinDayRank_Res} m L2C_WinDayRank_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_WinDayRank_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.infos != null && m.infos.length) {
        for (var i = 0; i < m.infos.length; ++i) {
          $root.MST.RankInfoCell.encode(m.infos[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_WinDayRank_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_WinDayRank_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_WinDayRank_Res} L2C_WinDayRank_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_WinDayRank_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_WinDayRank_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.infos && m.infos.length)) m.infos = [];
            m.infos.push($root.MST.RankInfoCell.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_WinDayRank_Res;
  }();

  MST.C2L_WinWeekRank_Req = function () {
    /**
     * Properties of a C2L_WinWeekRank_Req.
     * @memberof MST
     * @interface IC2L_WinWeekRank_Req
     * @property {number|null} [RpcId] C2L_WinWeekRank_Req RpcId
     */

    /**
     * Constructs a new C2L_WinWeekRank_Req.
     * @memberof MST
     * @classdesc Represents a C2L_WinWeekRank_Req.
     * @implements IC2L_WinWeekRank_Req
     * @constructor
     * @param {MST.IC2L_WinWeekRank_Req=} [p] Properties to set
     */
    function C2L_WinWeekRank_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_WinWeekRank_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_WinWeekRank_Req
     * @instance
     */


    C2L_WinWeekRank_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_WinWeekRank_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_WinWeekRank_Req
     * @static
     * @param {MST.IC2L_WinWeekRank_Req=} [properties] Properties to set
     * @returns {MST.C2L_WinWeekRank_Req} C2L_WinWeekRank_Req instance
     */

    C2L_WinWeekRank_Req.create = function create(properties) {
      return new C2L_WinWeekRank_Req(properties);
    };
    /**
     * Encodes the specified C2L_WinWeekRank_Req message. Does not implicitly {@link MST.C2L_WinWeekRank_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_WinWeekRank_Req
     * @static
     * @param {MST.IC2L_WinWeekRank_Req} m C2L_WinWeekRank_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_WinWeekRank_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_WinWeekRank_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_WinWeekRank_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_WinWeekRank_Req} C2L_WinWeekRank_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_WinWeekRank_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_WinWeekRank_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_WinWeekRank_Req;
  }();

  MST.L2C_WinWeekRank_Res = function () {
    /**
     * Properties of a L2C_WinWeekRank_Res.
     * @memberof MST
     * @interface IL2C_WinWeekRank_Res
     * @property {number|null} [RpcId] L2C_WinWeekRank_Res RpcId
     * @property {number|null} [Error] L2C_WinWeekRank_Res Error
     * @property {string|null} [Message] L2C_WinWeekRank_Res Message
     * @property {Array.<MST.IRankInfoCell>|null} [infos] L2C_WinWeekRank_Res infos
     */

    /**
     * Constructs a new L2C_WinWeekRank_Res.
     * @memberof MST
     * @classdesc Represents a L2C_WinWeekRank_Res.
     * @implements IL2C_WinWeekRank_Res
     * @constructor
     * @param {MST.IL2C_WinWeekRank_Res=} [p] Properties to set
     */
    function L2C_WinWeekRank_Res(p) {
      this.infos = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_WinWeekRank_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_WinWeekRank_Res
     * @instance
     */


    L2C_WinWeekRank_Res.prototype.RpcId = 0;
    /**
     * L2C_WinWeekRank_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_WinWeekRank_Res
     * @instance
     */

    L2C_WinWeekRank_Res.prototype.Error = 0;
    /**
     * L2C_WinWeekRank_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_WinWeekRank_Res
     * @instance
     */

    L2C_WinWeekRank_Res.prototype.Message = "";
    /**
     * L2C_WinWeekRank_Res infos.
     * @member {Array.<MST.IRankInfoCell>} infos
     * @memberof MST.L2C_WinWeekRank_Res
     * @instance
     */

    L2C_WinWeekRank_Res.prototype.infos = $util.emptyArray;
    /**
     * Creates a new L2C_WinWeekRank_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_WinWeekRank_Res
     * @static
     * @param {MST.IL2C_WinWeekRank_Res=} [properties] Properties to set
     * @returns {MST.L2C_WinWeekRank_Res} L2C_WinWeekRank_Res instance
     */

    L2C_WinWeekRank_Res.create = function create(properties) {
      return new L2C_WinWeekRank_Res(properties);
    };
    /**
     * Encodes the specified L2C_WinWeekRank_Res message. Does not implicitly {@link MST.L2C_WinWeekRank_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_WinWeekRank_Res
     * @static
     * @param {MST.IL2C_WinWeekRank_Res} m L2C_WinWeekRank_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_WinWeekRank_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.infos != null && m.infos.length) {
        for (var i = 0; i < m.infos.length; ++i) {
          $root.MST.RankInfoCell.encode(m.infos[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_WinWeekRank_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_WinWeekRank_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_WinWeekRank_Res} L2C_WinWeekRank_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_WinWeekRank_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_WinWeekRank_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.infos && m.infos.length)) m.infos = [];
            m.infos.push($root.MST.RankInfoCell.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_WinWeekRank_Res;
  }();

  MST.C2L_WinMonthRank_Req = function () {
    /**
     * Properties of a C2L_WinMonthRank_Req.
     * @memberof MST
     * @interface IC2L_WinMonthRank_Req
     * @property {number|null} [RpcId] C2L_WinMonthRank_Req RpcId
     */

    /**
     * Constructs a new C2L_WinMonthRank_Req.
     * @memberof MST
     * @classdesc Represents a C2L_WinMonthRank_Req.
     * @implements IC2L_WinMonthRank_Req
     * @constructor
     * @param {MST.IC2L_WinMonthRank_Req=} [p] Properties to set
     */
    function C2L_WinMonthRank_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_WinMonthRank_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_WinMonthRank_Req
     * @instance
     */


    C2L_WinMonthRank_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_WinMonthRank_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_WinMonthRank_Req
     * @static
     * @param {MST.IC2L_WinMonthRank_Req=} [properties] Properties to set
     * @returns {MST.C2L_WinMonthRank_Req} C2L_WinMonthRank_Req instance
     */

    C2L_WinMonthRank_Req.create = function create(properties) {
      return new C2L_WinMonthRank_Req(properties);
    };
    /**
     * Encodes the specified C2L_WinMonthRank_Req message. Does not implicitly {@link MST.C2L_WinMonthRank_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_WinMonthRank_Req
     * @static
     * @param {MST.IC2L_WinMonthRank_Req} m C2L_WinMonthRank_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_WinMonthRank_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_WinMonthRank_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_WinMonthRank_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_WinMonthRank_Req} C2L_WinMonthRank_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_WinMonthRank_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_WinMonthRank_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_WinMonthRank_Req;
  }();

  MST.L2C_WinMonthRank_Res = function () {
    /**
     * Properties of a L2C_WinMonthRank_Res.
     * @memberof MST
     * @interface IL2C_WinMonthRank_Res
     * @property {number|null} [RpcId] L2C_WinMonthRank_Res RpcId
     * @property {number|null} [Error] L2C_WinMonthRank_Res Error
     * @property {string|null} [Message] L2C_WinMonthRank_Res Message
     * @property {Array.<MST.IRankInfoCell>|null} [infos] L2C_WinMonthRank_Res infos
     */

    /**
     * Constructs a new L2C_WinMonthRank_Res.
     * @memberof MST
     * @classdesc Represents a L2C_WinMonthRank_Res.
     * @implements IL2C_WinMonthRank_Res
     * @constructor
     * @param {MST.IL2C_WinMonthRank_Res=} [p] Properties to set
     */
    function L2C_WinMonthRank_Res(p) {
      this.infos = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_WinMonthRank_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_WinMonthRank_Res
     * @instance
     */


    L2C_WinMonthRank_Res.prototype.RpcId = 0;
    /**
     * L2C_WinMonthRank_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_WinMonthRank_Res
     * @instance
     */

    L2C_WinMonthRank_Res.prototype.Error = 0;
    /**
     * L2C_WinMonthRank_Res Message.
     * @member {string} Message
     * @memberof MST.L2C_WinMonthRank_Res
     * @instance
     */

    L2C_WinMonthRank_Res.prototype.Message = "";
    /**
     * L2C_WinMonthRank_Res infos.
     * @member {Array.<MST.IRankInfoCell>} infos
     * @memberof MST.L2C_WinMonthRank_Res
     * @instance
     */

    L2C_WinMonthRank_Res.prototype.infos = $util.emptyArray;
    /**
     * Creates a new L2C_WinMonthRank_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_WinMonthRank_Res
     * @static
     * @param {MST.IL2C_WinMonthRank_Res=} [properties] Properties to set
     * @returns {MST.L2C_WinMonthRank_Res} L2C_WinMonthRank_Res instance
     */

    L2C_WinMonthRank_Res.create = function create(properties) {
      return new L2C_WinMonthRank_Res(properties);
    };
    /**
     * Encodes the specified L2C_WinMonthRank_Res message. Does not implicitly {@link MST.L2C_WinMonthRank_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_WinMonthRank_Res
     * @static
     * @param {MST.IL2C_WinMonthRank_Res} m L2C_WinMonthRank_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_WinMonthRank_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.infos != null && m.infos.length) {
        for (var i = 0; i < m.infos.length; ++i) {
          $root.MST.RankInfoCell.encode(m.infos[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a L2C_WinMonthRank_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_WinMonthRank_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_WinMonthRank_Res} L2C_WinMonthRank_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_WinMonthRank_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_WinMonthRank_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.infos && m.infos.length)) m.infos = [];
            m.infos.push($root.MST.RankInfoCell.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_WinMonthRank_Res;
  }();

  MST.C2L_GetGameList_Req = function () {
    /**
     * Properties of a C2L_GetGameList_Req.
     * @memberof MST
     * @interface IC2L_GetGameList_Req
     * @property {number|null} [RpcId] C2L_GetGameList_Req RpcId
     */

    /**
     * Constructs a new C2L_GetGameList_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetGameList_Req.
     * @implements IC2L_GetGameList_Req
     * @constructor
     * @param {MST.IC2L_GetGameList_Req=} [p] Properties to set
     */
    function C2L_GetGameList_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetGameList_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetGameList_Req
     * @instance
     */


    C2L_GetGameList_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GetGameList_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetGameList_Req
     * @static
     * @param {MST.IC2L_GetGameList_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetGameList_Req} C2L_GetGameList_Req instance
     */

    C2L_GetGameList_Req.create = function create(properties) {
      return new C2L_GetGameList_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetGameList_Req message. Does not implicitly {@link MST.C2L_GetGameList_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetGameList_Req
     * @static
     * @param {MST.IC2L_GetGameList_Req} m C2L_GetGameList_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetGameList_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetGameList_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetGameList_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetGameList_Req} C2L_GetGameList_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetGameList_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetGameList_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetGameList_Req;
  }();

  MST.L2C_GetGameList_Res = function () {
    /**
     * Properties of a L2C_GetGameList_Res.
     * @memberof MST
     * @interface IL2C_GetGameList_Res
     * @property {number|null} [RpcId] L2C_GetGameList_Res RpcId
     * @property {Array.<string>|null} [games] L2C_GetGameList_Res games
     */

    /**
     * Constructs a new L2C_GetGameList_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetGameList_Res.
     * @implements IL2C_GetGameList_Res
     * @constructor
     * @param {MST.IL2C_GetGameList_Res=} [p] Properties to set
     */
    function L2C_GetGameList_Res(p) {
      this.games = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetGameList_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetGameList_Res
     * @instance
     */


    L2C_GetGameList_Res.prototype.RpcId = 0;
    /**
     * L2C_GetGameList_Res games.
     * @member {Array.<string>} games
     * @memberof MST.L2C_GetGameList_Res
     * @instance
     */

    L2C_GetGameList_Res.prototype.games = $util.emptyArray;
    /**
     * Creates a new L2C_GetGameList_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetGameList_Res
     * @static
     * @param {MST.IL2C_GetGameList_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetGameList_Res} L2C_GetGameList_Res instance
     */

    L2C_GetGameList_Res.create = function create(properties) {
      return new L2C_GetGameList_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetGameList_Res message. Does not implicitly {@link MST.L2C_GetGameList_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetGameList_Res
     * @static
     * @param {MST.IL2C_GetGameList_Res} m L2C_GetGameList_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetGameList_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.games != null && m.games.length) {
        for (var i = 0; i < m.games.length; ++i) {
          w.uint32(10).string(m.games[i]);
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a L2C_GetGameList_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetGameList_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetGameList_Res} L2C_GetGameList_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetGameList_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetGameList_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            if (!(m.games && m.games.length)) m.games = [];
            m.games.push(r.string());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetGameList_Res;
  }();

  MST.L2C_ChipsChange_Mes = function () {
    /**
     * Properties of a L2C_ChipsChange_Mes.
     * @memberof MST
     * @interface IL2C_ChipsChange_Mes
     * @property {number|null} [sourceType] L2C_ChipsChange_Mes sourceType
     * @property {number|Long|null} [gold] L2C_ChipsChange_Mes gold
     */

    /**
     * Constructs a new L2C_ChipsChange_Mes.
     * @memberof MST
     * @classdesc Represents a L2C_ChipsChange_Mes.
     * @implements IL2C_ChipsChange_Mes
     * @constructor
     * @param {MST.IL2C_ChipsChange_Mes=} [p] Properties to set
     */
    function L2C_ChipsChange_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_ChipsChange_Mes sourceType.
     * @member {number} sourceType
     * @memberof MST.L2C_ChipsChange_Mes
     * @instance
     */


    L2C_ChipsChange_Mes.prototype.sourceType = 0;
    /**
     * L2C_ChipsChange_Mes gold.
     * @member {number|Long} gold
     * @memberof MST.L2C_ChipsChange_Mes
     * @instance
     */

    L2C_ChipsChange_Mes.prototype.gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new L2C_ChipsChange_Mes instance using the specified properties.
     * @function create
     * @memberof MST.L2C_ChipsChange_Mes
     * @static
     * @param {MST.IL2C_ChipsChange_Mes=} [properties] Properties to set
     * @returns {MST.L2C_ChipsChange_Mes} L2C_ChipsChange_Mes instance
     */

    L2C_ChipsChange_Mes.create = function create(properties) {
      return new L2C_ChipsChange_Mes(properties);
    };
    /**
     * Encodes the specified L2C_ChipsChange_Mes message. Does not implicitly {@link MST.L2C_ChipsChange_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_ChipsChange_Mes
     * @static
     * @param {MST.IL2C_ChipsChange_Mes} m L2C_ChipsChange_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_ChipsChange_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.sourceType != null && Object.hasOwnProperty.call(m, "sourceType")) w.uint32(8).int32(m.sourceType);
      if (m.gold != null && Object.hasOwnProperty.call(m, "gold")) w.uint32(16).int64(m.gold);
      return w;
    };
    /**
     * Decodes a L2C_ChipsChange_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_ChipsChange_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_ChipsChange_Mes} L2C_ChipsChange_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_ChipsChange_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_ChipsChange_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.sourceType = r.int32();
            break;

          case 2:
            m.gold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_ChipsChange_Mes;
  }();

  MST.C2L_Deposit_Req = function () {
    /**
     * Properties of a C2L_Deposit_Req.
     * @memberof MST
     * @interface IC2L_Deposit_Req
     * @property {number|null} [RpcId] C2L_Deposit_Req RpcId
     * @property {number|null} [platType] C2L_Deposit_Req platType
     * @property {number|null} [depositType] C2L_Deposit_Req depositType
     * @property {number|Long|null} [idOrMoney] C2L_Deposit_Req idOrMoney
     */

    /**
     * Constructs a new C2L_Deposit_Req.
     * @memberof MST
     * @classdesc Represents a C2L_Deposit_Req.
     * @implements IC2L_Deposit_Req
     * @constructor
     * @param {MST.IC2L_Deposit_Req=} [p] Properties to set
     */
    function C2L_Deposit_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_Deposit_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_Deposit_Req
     * @instance
     */


    C2L_Deposit_Req.prototype.RpcId = 0;
    /**
     * C2L_Deposit_Req platType.
     * @member {number} platType
     * @memberof MST.C2L_Deposit_Req
     * @instance
     */

    C2L_Deposit_Req.prototype.platType = 0;
    /**
     * C2L_Deposit_Req depositType.
     * @member {number} depositType
     * @memberof MST.C2L_Deposit_Req
     * @instance
     */

    C2L_Deposit_Req.prototype.depositType = 0;
    /**
     * C2L_Deposit_Req idOrMoney.
     * @member {number|Long} idOrMoney
     * @memberof MST.C2L_Deposit_Req
     * @instance
     */

    C2L_Deposit_Req.prototype.idOrMoney = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new C2L_Deposit_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_Deposit_Req
     * @static
     * @param {MST.IC2L_Deposit_Req=} [properties] Properties to set
     * @returns {MST.C2L_Deposit_Req} C2L_Deposit_Req instance
     */

    C2L_Deposit_Req.create = function create(properties) {
      return new C2L_Deposit_Req(properties);
    };
    /**
     * Encodes the specified C2L_Deposit_Req message. Does not implicitly {@link MST.C2L_Deposit_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_Deposit_Req
     * @static
     * @param {MST.IC2L_Deposit_Req} m C2L_Deposit_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_Deposit_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.platType != null && Object.hasOwnProperty.call(m, "platType")) w.uint32(8).int32(m.platType);
      if (m.depositType != null && Object.hasOwnProperty.call(m, "depositType")) w.uint32(16).int32(m.depositType);
      if (m.idOrMoney != null && Object.hasOwnProperty.call(m, "idOrMoney")) w.uint32(24).int64(m.idOrMoney);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_Deposit_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_Deposit_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_Deposit_Req} C2L_Deposit_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_Deposit_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_Deposit_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.platType = r.int32();
            break;

          case 2:
            m.depositType = r.int32();
            break;

          case 3:
            m.idOrMoney = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_Deposit_Req;
  }();

  MST.L2C_Deposit_Res = function () {
    /**
     * Properties of a L2C_Deposit_Res.
     * @memberof MST
     * @interface IL2C_Deposit_Res
     * @property {number|null} [RpcId] L2C_Deposit_Res RpcId
     * @property {number|null} [Error] L2C_Deposit_Res Error
     * @property {string|null} [paymentUrl] L2C_Deposit_Res paymentUrl
     */

    /**
     * Constructs a new L2C_Deposit_Res.
     * @memberof MST
     * @classdesc Represents a L2C_Deposit_Res.
     * @implements IL2C_Deposit_Res
     * @constructor
     * @param {MST.IL2C_Deposit_Res=} [p] Properties to set
     */
    function L2C_Deposit_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_Deposit_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_Deposit_Res
     * @instance
     */


    L2C_Deposit_Res.prototype.RpcId = 0;
    /**
     * L2C_Deposit_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_Deposit_Res
     * @instance
     */

    L2C_Deposit_Res.prototype.Error = 0;
    /**
     * L2C_Deposit_Res paymentUrl.
     * @member {string} paymentUrl
     * @memberof MST.L2C_Deposit_Res
     * @instance
     */

    L2C_Deposit_Res.prototype.paymentUrl = "";
    /**
     * Creates a new L2C_Deposit_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_Deposit_Res
     * @static
     * @param {MST.IL2C_Deposit_Res=} [properties] Properties to set
     * @returns {MST.L2C_Deposit_Res} L2C_Deposit_Res instance
     */

    L2C_Deposit_Res.create = function create(properties) {
      return new L2C_Deposit_Res(properties);
    };
    /**
     * Encodes the specified L2C_Deposit_Res message. Does not implicitly {@link MST.L2C_Deposit_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_Deposit_Res
     * @static
     * @param {MST.IL2C_Deposit_Res} m L2C_Deposit_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_Deposit_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.paymentUrl != null && Object.hasOwnProperty.call(m, "paymentUrl")) w.uint32(10).string(m.paymentUrl);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_Deposit_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_Deposit_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_Deposit_Res} L2C_Deposit_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_Deposit_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_Deposit_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            m.paymentUrl = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_Deposit_Res;
  }();

  MST.C2L_Withdraw_Req = function () {
    /**
     * Properties of a C2L_Withdraw_Req.
     * @memberof MST
     * @interface IC2L_Withdraw_Req
     * @property {number|null} [RpcId] C2L_Withdraw_Req RpcId
     * @property {number|Long|null} [chips] C2L_Withdraw_Req chips
     * @property {string|null} [bankNo] C2L_Withdraw_Req bankNo
     * @property {string|null} [bankCode] C2L_Withdraw_Req bankCode
     * @property {string|null} [name] C2L_Withdraw_Req name
     */

    /**
     * Constructs a new C2L_Withdraw_Req.
     * @memberof MST
     * @classdesc Represents a C2L_Withdraw_Req.
     * @implements IC2L_Withdraw_Req
     * @constructor
     * @param {MST.IC2L_Withdraw_Req=} [p] Properties to set
     */
    function C2L_Withdraw_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_Withdraw_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_Withdraw_Req
     * @instance
     */


    C2L_Withdraw_Req.prototype.RpcId = 0;
    /**
     * C2L_Withdraw_Req chips.
     * @member {number|Long} chips
     * @memberof MST.C2L_Withdraw_Req
     * @instance
     */

    C2L_Withdraw_Req.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * C2L_Withdraw_Req bankNo.
     * @member {string} bankNo
     * @memberof MST.C2L_Withdraw_Req
     * @instance
     */

    C2L_Withdraw_Req.prototype.bankNo = "";
    /**
     * C2L_Withdraw_Req bankCode.
     * @member {string} bankCode
     * @memberof MST.C2L_Withdraw_Req
     * @instance
     */

    C2L_Withdraw_Req.prototype.bankCode = "";
    /**
     * C2L_Withdraw_Req name.
     * @member {string} name
     * @memberof MST.C2L_Withdraw_Req
     * @instance
     */

    C2L_Withdraw_Req.prototype.name = "";
    /**
     * Creates a new C2L_Withdraw_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_Withdraw_Req
     * @static
     * @param {MST.IC2L_Withdraw_Req=} [properties] Properties to set
     * @returns {MST.C2L_Withdraw_Req} C2L_Withdraw_Req instance
     */

    C2L_Withdraw_Req.create = function create(properties) {
      return new C2L_Withdraw_Req(properties);
    };
    /**
     * Encodes the specified C2L_Withdraw_Req message. Does not implicitly {@link MST.C2L_Withdraw_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_Withdraw_Req
     * @static
     * @param {MST.IC2L_Withdraw_Req} m C2L_Withdraw_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_Withdraw_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(8).int64(m.chips);
      if (m.bankNo != null && Object.hasOwnProperty.call(m, "bankNo")) w.uint32(18).string(m.bankNo);
      if (m.bankCode != null && Object.hasOwnProperty.call(m, "bankCode")) w.uint32(26).string(m.bankCode);
      if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(34).string(m.name);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_Withdraw_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_Withdraw_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_Withdraw_Req} C2L_Withdraw_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_Withdraw_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_Withdraw_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.chips = r.int64();
            break;

          case 2:
            m.bankNo = r.string();
            break;

          case 3:
            m.bankCode = r.string();
            break;

          case 4:
            m.name = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_Withdraw_Req;
  }();

  MST.L2C_Withdraw_Res = function () {
    /**
     * Properties of a L2C_Withdraw_Res.
     * @memberof MST
     * @interface IL2C_Withdraw_Res
     * @property {number|null} [RpcId] L2C_Withdraw_Res RpcId
     * @property {number|null} [Error] L2C_Withdraw_Res Error
     */

    /**
     * Constructs a new L2C_Withdraw_Res.
     * @memberof MST
     * @classdesc Represents a L2C_Withdraw_Res.
     * @implements IL2C_Withdraw_Res
     * @constructor
     * @param {MST.IL2C_Withdraw_Res=} [p] Properties to set
     */
    function L2C_Withdraw_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_Withdraw_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_Withdraw_Res
     * @instance
     */


    L2C_Withdraw_Res.prototype.RpcId = 0;
    /**
     * L2C_Withdraw_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_Withdraw_Res
     * @instance
     */

    L2C_Withdraw_Res.prototype.Error = 0;
    /**
     * Creates a new L2C_Withdraw_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_Withdraw_Res
     * @static
     * @param {MST.IL2C_Withdraw_Res=} [properties] Properties to set
     * @returns {MST.L2C_Withdraw_Res} L2C_Withdraw_Res instance
     */

    L2C_Withdraw_Res.create = function create(properties) {
      return new L2C_Withdraw_Res(properties);
    };
    /**
     * Encodes the specified L2C_Withdraw_Res message. Does not implicitly {@link MST.L2C_Withdraw_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_Withdraw_Res
     * @static
     * @param {MST.IL2C_Withdraw_Res} m L2C_Withdraw_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_Withdraw_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_Withdraw_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_Withdraw_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_Withdraw_Res} L2C_Withdraw_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_Withdraw_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_Withdraw_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_Withdraw_Res;
  }();

  MST.C2L_GetWithdrawReocrds_Req = function () {
    /**
     * Properties of a C2L_GetWithdrawReocrds_Req.
     * @memberof MST
     * @interface IC2L_GetWithdrawReocrds_Req
     * @property {number|null} [RpcId] C2L_GetWithdrawReocrds_Req RpcId
     * @property {number|null} [index] C2L_GetWithdrawReocrds_Req index
     * @property {number|null} [limit] C2L_GetWithdrawReocrds_Req limit
     */

    /**
     * Constructs a new C2L_GetWithdrawReocrds_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetWithdrawReocrds_Req.
     * @implements IC2L_GetWithdrawReocrds_Req
     * @constructor
     * @param {MST.IC2L_GetWithdrawReocrds_Req=} [p] Properties to set
     */
    function C2L_GetWithdrawReocrds_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetWithdrawReocrds_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @instance
     */


    C2L_GetWithdrawReocrds_Req.prototype.RpcId = 0;
    /**
     * C2L_GetWithdrawReocrds_Req index.
     * @member {number} index
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @instance
     */

    C2L_GetWithdrawReocrds_Req.prototype.index = 0;
    /**
     * C2L_GetWithdrawReocrds_Req limit.
     * @member {number} limit
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @instance
     */

    C2L_GetWithdrawReocrds_Req.prototype.limit = 0;
    /**
     * Creates a new C2L_GetWithdrawReocrds_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @static
     * @param {MST.IC2L_GetWithdrawReocrds_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetWithdrawReocrds_Req} C2L_GetWithdrawReocrds_Req instance
     */

    C2L_GetWithdrawReocrds_Req.create = function create(properties) {
      return new C2L_GetWithdrawReocrds_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetWithdrawReocrds_Req message. Does not implicitly {@link MST.C2L_GetWithdrawReocrds_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @static
     * @param {MST.IC2L_GetWithdrawReocrds_Req} m C2L_GetWithdrawReocrds_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetWithdrawReocrds_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(8).int32(m.index);
      if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(16).int32(m.limit);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetWithdrawReocrds_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetWithdrawReocrds_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetWithdrawReocrds_Req} C2L_GetWithdrawReocrds_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetWithdrawReocrds_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetWithdrawReocrds_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.index = r.int32();
            break;

          case 2:
            m.limit = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetWithdrawReocrds_Req;
  }();

  MST.WithDrawRecord = function () {
    /**
     * Properties of a WithDrawRecord.
     * @memberof MST
     * @interface IWithDrawRecord
     * @property {string|null} [backNo] WithDrawRecord backNo
     * @property {number|Long|null} [amount] WithDrawRecord amount
     * @property {string|null} [orderMessage] WithDrawRecord orderMessage
     * @property {number|Long|null} [chips] WithDrawRecord chips
     * @property {string|null} [orderId] WithDrawRecord orderId
     * @property {number|Long|null} [fee] WithDrawRecord fee
     * @property {number|null} [auditStatus] WithDrawRecord auditStatus
     * @property {number|Long|null} [withdrawTime] WithDrawRecord withdrawTime
     * @property {string|null} [bankCode] WithDrawRecord bankCode
     */

    /**
     * Constructs a new WithDrawRecord.
     * @memberof MST
     * @classdesc Represents a WithDrawRecord.
     * @implements IWithDrawRecord
     * @constructor
     * @param {MST.IWithDrawRecord=} [p] Properties to set
     */
    function WithDrawRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * WithDrawRecord backNo.
     * @member {string} backNo
     * @memberof MST.WithDrawRecord
     * @instance
     */


    WithDrawRecord.prototype.backNo = "";
    /**
     * WithDrawRecord amount.
     * @member {number|Long} amount
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.amount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WithDrawRecord orderMessage.
     * @member {string} orderMessage
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.orderMessage = "";
    /**
     * WithDrawRecord chips.
     * @member {number|Long} chips
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WithDrawRecord orderId.
     * @member {string} orderId
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.orderId = "";
    /**
     * WithDrawRecord fee.
     * @member {number|Long} fee
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.fee = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WithDrawRecord auditStatus.
     * @member {number} auditStatus
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.auditStatus = 0;
    /**
     * WithDrawRecord withdrawTime.
     * @member {number|Long} withdrawTime
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.withdrawTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WithDrawRecord bankCode.
     * @member {string} bankCode
     * @memberof MST.WithDrawRecord
     * @instance
     */

    WithDrawRecord.prototype.bankCode = "";
    /**
     * Creates a new WithDrawRecord instance using the specified properties.
     * @function create
     * @memberof MST.WithDrawRecord
     * @static
     * @param {MST.IWithDrawRecord=} [properties] Properties to set
     * @returns {MST.WithDrawRecord} WithDrawRecord instance
     */

    WithDrawRecord.create = function create(properties) {
      return new WithDrawRecord(properties);
    };
    /**
     * Encodes the specified WithDrawRecord message. Does not implicitly {@link MST.WithDrawRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.WithDrawRecord
     * @static
     * @param {MST.IWithDrawRecord} m WithDrawRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    WithDrawRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.backNo != null && Object.hasOwnProperty.call(m, "backNo")) w.uint32(10).string(m.backNo);
      if (m.amount != null && Object.hasOwnProperty.call(m, "amount")) w.uint32(16).int64(m.amount);
      if (m.orderMessage != null && Object.hasOwnProperty.call(m, "orderMessage")) w.uint32(26).string(m.orderMessage);
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(32).int64(m.chips);
      if (m.orderId != null && Object.hasOwnProperty.call(m, "orderId")) w.uint32(42).string(m.orderId);
      if (m.fee != null && Object.hasOwnProperty.call(m, "fee")) w.uint32(48).int64(m.fee);
      if (m.auditStatus != null && Object.hasOwnProperty.call(m, "auditStatus")) w.uint32(56).int32(m.auditStatus);
      if (m.withdrawTime != null && Object.hasOwnProperty.call(m, "withdrawTime")) w.uint32(64).int64(m.withdrawTime);
      if (m.bankCode != null && Object.hasOwnProperty.call(m, "bankCode")) w.uint32(74).string(m.bankCode);
      return w;
    };
    /**
     * Decodes a WithDrawRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.WithDrawRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.WithDrawRecord} WithDrawRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    WithDrawRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.WithDrawRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.backNo = r.string();
            break;

          case 2:
            m.amount = r.int64();
            break;

          case 3:
            m.orderMessage = r.string();
            break;

          case 4:
            m.chips = r.int64();
            break;

          case 5:
            m.orderId = r.string();
            break;

          case 6:
            m.fee = r.int64();
            break;

          case 7:
            m.auditStatus = r.int32();
            break;

          case 8:
            m.withdrawTime = r.int64();
            break;

          case 9:
            m.bankCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return WithDrawRecord;
  }();

  MST.L2C_GetWithdrawRecords_Res = function () {
    /**
     * Properties of a L2C_GetWithdrawRecords_Res.
     * @memberof MST
     * @interface IL2C_GetWithdrawRecords_Res
     * @property {number|null} [RpcId] L2C_GetWithdrawRecords_Res RpcId
     * @property {number|null} [Error] L2C_GetWithdrawRecords_Res Error
     * @property {Array.<MST.IWithDrawRecord>|null} [records] L2C_GetWithdrawRecords_Res records
     * @property {number|null} [index] L2C_GetWithdrawRecords_Res index
     */

    /**
     * Constructs a new L2C_GetWithdrawRecords_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetWithdrawRecords_Res.
     * @implements IL2C_GetWithdrawRecords_Res
     * @constructor
     * @param {MST.IL2C_GetWithdrawRecords_Res=} [p] Properties to set
     */
    function L2C_GetWithdrawRecords_Res(p) {
      this.records = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetWithdrawRecords_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @instance
     */


    L2C_GetWithdrawRecords_Res.prototype.RpcId = 0;
    /**
     * L2C_GetWithdrawRecords_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @instance
     */

    L2C_GetWithdrawRecords_Res.prototype.Error = 0;
    /**
     * L2C_GetWithdrawRecords_Res records.
     * @member {Array.<MST.IWithDrawRecord>} records
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @instance
     */

    L2C_GetWithdrawRecords_Res.prototype.records = $util.emptyArray;
    /**
     * L2C_GetWithdrawRecords_Res index.
     * @member {number} index
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @instance
     */

    L2C_GetWithdrawRecords_Res.prototype.index = 0;
    /**
     * Creates a new L2C_GetWithdrawRecords_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @static
     * @param {MST.IL2C_GetWithdrawRecords_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetWithdrawRecords_Res} L2C_GetWithdrawRecords_Res instance
     */

    L2C_GetWithdrawRecords_Res.create = function create(properties) {
      return new L2C_GetWithdrawRecords_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetWithdrawRecords_Res message. Does not implicitly {@link MST.L2C_GetWithdrawRecords_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @static
     * @param {MST.IL2C_GetWithdrawRecords_Res} m L2C_GetWithdrawRecords_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetWithdrawRecords_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.records != null && m.records.length) {
        for (var i = 0; i < m.records.length; ++i) {
          $root.MST.WithDrawRecord.encode(m.records[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(16).int32(m.index);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetWithdrawRecords_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetWithdrawRecords_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetWithdrawRecords_Res} L2C_GetWithdrawRecords_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetWithdrawRecords_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetWithdrawRecords_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.records && m.records.length)) m.records = [];
            m.records.push($root.MST.WithDrawRecord.decode(r, r.uint32()));
            break;

          case 2:
            m.index = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetWithdrawRecords_Res;
  }();

  MST.C2L_GetDepositLimit_Req = function () {
    /**
     * Properties of a C2L_GetDepositLimit_Req.
     * @memberof MST
     * @interface IC2L_GetDepositLimit_Req
     * @property {number|null} [RpcId] C2L_GetDepositLimit_Req RpcId
     */

    /**
     * Constructs a new C2L_GetDepositLimit_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetDepositLimit_Req.
     * @implements IC2L_GetDepositLimit_Req
     * @constructor
     * @param {MST.IC2L_GetDepositLimit_Req=} [p] Properties to set
     */
    function C2L_GetDepositLimit_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetDepositLimit_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetDepositLimit_Req
     * @instance
     */


    C2L_GetDepositLimit_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GetDepositLimit_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetDepositLimit_Req
     * @static
     * @param {MST.IC2L_GetDepositLimit_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetDepositLimit_Req} C2L_GetDepositLimit_Req instance
     */

    C2L_GetDepositLimit_Req.create = function create(properties) {
      return new C2L_GetDepositLimit_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetDepositLimit_Req message. Does not implicitly {@link MST.C2L_GetDepositLimit_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetDepositLimit_Req
     * @static
     * @param {MST.IC2L_GetDepositLimit_Req} m C2L_GetDepositLimit_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetDepositLimit_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetDepositLimit_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetDepositLimit_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetDepositLimit_Req} C2L_GetDepositLimit_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetDepositLimit_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetDepositLimit_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetDepositLimit_Req;
  }();

  MST.L2C_GetDepositLimit_Res = function () {
    /**
     * Properties of a L2C_GetDepositLimit_Res.
     * @memberof MST
     * @interface IL2C_GetDepositLimit_Res
     * @property {number|null} [RpcId] L2C_GetDepositLimit_Res RpcId
     * @property {number|null} [Error] L2C_GetDepositLimit_Res Error
     * @property {number|Long|null} [minAmount] L2C_GetDepositLimit_Res minAmount
     * @property {number|Long|null} [maxAmount] L2C_GetDepositLimit_Res maxAmount
     */

    /**
     * Constructs a new L2C_GetDepositLimit_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetDepositLimit_Res.
     * @implements IL2C_GetDepositLimit_Res
     * @constructor
     * @param {MST.IL2C_GetDepositLimit_Res=} [p] Properties to set
     */
    function L2C_GetDepositLimit_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetDepositLimit_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetDepositLimit_Res
     * @instance
     */


    L2C_GetDepositLimit_Res.prototype.RpcId = 0;
    /**
     * L2C_GetDepositLimit_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetDepositLimit_Res
     * @instance
     */

    L2C_GetDepositLimit_Res.prototype.Error = 0;
    /**
     * L2C_GetDepositLimit_Res minAmount.
     * @member {number|Long} minAmount
     * @memberof MST.L2C_GetDepositLimit_Res
     * @instance
     */

    L2C_GetDepositLimit_Res.prototype.minAmount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * L2C_GetDepositLimit_Res maxAmount.
     * @member {number|Long} maxAmount
     * @memberof MST.L2C_GetDepositLimit_Res
     * @instance
     */

    L2C_GetDepositLimit_Res.prototype.maxAmount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new L2C_GetDepositLimit_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetDepositLimit_Res
     * @static
     * @param {MST.IL2C_GetDepositLimit_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetDepositLimit_Res} L2C_GetDepositLimit_Res instance
     */

    L2C_GetDepositLimit_Res.create = function create(properties) {
      return new L2C_GetDepositLimit_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetDepositLimit_Res message. Does not implicitly {@link MST.L2C_GetDepositLimit_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetDepositLimit_Res
     * @static
     * @param {MST.IL2C_GetDepositLimit_Res} m L2C_GetDepositLimit_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetDepositLimit_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.minAmount != null && Object.hasOwnProperty.call(m, "minAmount")) w.uint32(8).int64(m.minAmount);
      if (m.maxAmount != null && Object.hasOwnProperty.call(m, "maxAmount")) w.uint32(16).int64(m.maxAmount);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetDepositLimit_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetDepositLimit_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetDepositLimit_Res} L2C_GetDepositLimit_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetDepositLimit_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetDepositLimit_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            m.minAmount = r.int64();
            break;

          case 2:
            m.maxAmount = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetDepositLimit_Res;
  }();

  MST.C2L_GetWithdrawLimit_Req = function () {
    /**
     * Properties of a C2L_GetWithdrawLimit_Req.
     * @memberof MST
     * @interface IC2L_GetWithdrawLimit_Req
     * @property {number|null} [RpcId] C2L_GetWithdrawLimit_Req RpcId
     */

    /**
     * Constructs a new C2L_GetWithdrawLimit_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetWithdrawLimit_Req.
     * @implements IC2L_GetWithdrawLimit_Req
     * @constructor
     * @param {MST.IC2L_GetWithdrawLimit_Req=} [p] Properties to set
     */
    function C2L_GetWithdrawLimit_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetWithdrawLimit_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetWithdrawLimit_Req
     * @instance
     */


    C2L_GetWithdrawLimit_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GetWithdrawLimit_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetWithdrawLimit_Req
     * @static
     * @param {MST.IC2L_GetWithdrawLimit_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetWithdrawLimit_Req} C2L_GetWithdrawLimit_Req instance
     */

    C2L_GetWithdrawLimit_Req.create = function create(properties) {
      return new C2L_GetWithdrawLimit_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetWithdrawLimit_Req message. Does not implicitly {@link MST.C2L_GetWithdrawLimit_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetWithdrawLimit_Req
     * @static
     * @param {MST.IC2L_GetWithdrawLimit_Req} m C2L_GetWithdrawLimit_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetWithdrawLimit_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetWithdrawLimit_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetWithdrawLimit_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetWithdrawLimit_Req} C2L_GetWithdrawLimit_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetWithdrawLimit_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetWithdrawLimit_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetWithdrawLimit_Req;
  }();

  MST.L2C_GetWithdrawLimit_Res = function () {
    /**
     * Properties of a L2C_GetWithdrawLimit_Res.
     * @memberof MST
     * @interface IL2C_GetWithdrawLimit_Res
     * @property {number|null} [RpcId] L2C_GetWithdrawLimit_Res RpcId
     * @property {number|null} [Error] L2C_GetWithdrawLimit_Res Error
     * @property {number|Long|null} [minAmount] L2C_GetWithdrawLimit_Res minAmount
     * @property {number|Long|null} [maxAmount] L2C_GetWithdrawLimit_Res maxAmount
     */

    /**
     * Constructs a new L2C_GetWithdrawLimit_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetWithdrawLimit_Res.
     * @implements IL2C_GetWithdrawLimit_Res
     * @constructor
     * @param {MST.IL2C_GetWithdrawLimit_Res=} [p] Properties to set
     */
    function L2C_GetWithdrawLimit_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetWithdrawLimit_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @instance
     */


    L2C_GetWithdrawLimit_Res.prototype.RpcId = 0;
    /**
     * L2C_GetWithdrawLimit_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @instance
     */

    L2C_GetWithdrawLimit_Res.prototype.Error = 0;
    /**
     * L2C_GetWithdrawLimit_Res minAmount.
     * @member {number|Long} minAmount
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @instance
     */

    L2C_GetWithdrawLimit_Res.prototype.minAmount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * L2C_GetWithdrawLimit_Res maxAmount.
     * @member {number|Long} maxAmount
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @instance
     */

    L2C_GetWithdrawLimit_Res.prototype.maxAmount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new L2C_GetWithdrawLimit_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @static
     * @param {MST.IL2C_GetWithdrawLimit_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetWithdrawLimit_Res} L2C_GetWithdrawLimit_Res instance
     */

    L2C_GetWithdrawLimit_Res.create = function create(properties) {
      return new L2C_GetWithdrawLimit_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetWithdrawLimit_Res message. Does not implicitly {@link MST.L2C_GetWithdrawLimit_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @static
     * @param {MST.IL2C_GetWithdrawLimit_Res} m L2C_GetWithdrawLimit_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetWithdrawLimit_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.minAmount != null && Object.hasOwnProperty.call(m, "minAmount")) w.uint32(8).int64(m.minAmount);
      if (m.maxAmount != null && Object.hasOwnProperty.call(m, "maxAmount")) w.uint32(16).int64(m.maxAmount);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetWithdrawLimit_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetWithdrawLimit_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetWithdrawLimit_Res} L2C_GetWithdrawLimit_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetWithdrawLimit_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetWithdrawLimit_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            m.minAmount = r.int64();
            break;

          case 2:
            m.maxAmount = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetWithdrawLimit_Res;
  }();

  MST.C2L_GetStoreList_Req = function () {
    /**
     * Properties of a C2L_GetStoreList_Req.
     * @memberof MST
     * @interface IC2L_GetStoreList_Req
     * @property {number|null} [RpcId] C2L_GetStoreList_Req RpcId
     */

    /**
     * Constructs a new C2L_GetStoreList_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetStoreList_Req.
     * @implements IC2L_GetStoreList_Req
     * @constructor
     * @param {MST.IC2L_GetStoreList_Req=} [p] Properties to set
     */
    function C2L_GetStoreList_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetStoreList_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetStoreList_Req
     * @instance
     */


    C2L_GetStoreList_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GetStoreList_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetStoreList_Req
     * @static
     * @param {MST.IC2L_GetStoreList_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetStoreList_Req} C2L_GetStoreList_Req instance
     */

    C2L_GetStoreList_Req.create = function create(properties) {
      return new C2L_GetStoreList_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetStoreList_Req message. Does not implicitly {@link MST.C2L_GetStoreList_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetStoreList_Req
     * @static
     * @param {MST.IC2L_GetStoreList_Req} m C2L_GetStoreList_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetStoreList_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetStoreList_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetStoreList_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetStoreList_Req} C2L_GetStoreList_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetStoreList_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetStoreList_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetStoreList_Req;
  }();

  MST.StoreInfo = function () {
    /**
     * Properties of a StoreInfo.
     * @memberof MST
     * @interface IStoreInfo
     * @property {number|null} [id] StoreInfo id
     * @property {number|Long|null} [chips] StoreInfo chips
     * @property {number|Long|null} [price] StoreInfo price
     * @property {number|Long|null} [giftChips] StoreInfo giftChips
     */

    /**
     * Constructs a new StoreInfo.
     * @memberof MST
     * @classdesc Represents a StoreInfo.
     * @implements IStoreInfo
     * @constructor
     * @param {MST.IStoreInfo=} [p] Properties to set
     */
    function StoreInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * StoreInfo id.
     * @member {number} id
     * @memberof MST.StoreInfo
     * @instance
     */


    StoreInfo.prototype.id = 0;
    /**
     * StoreInfo chips.
     * @member {number|Long} chips
     * @memberof MST.StoreInfo
     * @instance
     */

    StoreInfo.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * StoreInfo price.
     * @member {number|Long} price
     * @memberof MST.StoreInfo
     * @instance
     */

    StoreInfo.prototype.price = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * StoreInfo giftChips.
     * @member {number|Long} giftChips
     * @memberof MST.StoreInfo
     * @instance
     */

    StoreInfo.prototype.giftChips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new StoreInfo instance using the specified properties.
     * @function create
     * @memberof MST.StoreInfo
     * @static
     * @param {MST.IStoreInfo=} [properties] Properties to set
     * @returns {MST.StoreInfo} StoreInfo instance
     */

    StoreInfo.create = function create(properties) {
      return new StoreInfo(properties);
    };
    /**
     * Encodes the specified StoreInfo message. Does not implicitly {@link MST.StoreInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.StoreInfo
     * @static
     * @param {MST.IStoreInfo} m StoreInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    StoreInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(8).int32(m.id);
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(16).int64(m.chips);
      if (m.price != null && Object.hasOwnProperty.call(m, "price")) w.uint32(24).int64(m.price);
      if (m.giftChips != null && Object.hasOwnProperty.call(m, "giftChips")) w.uint32(32).int64(m.giftChips);
      return w;
    };
    /**
     * Decodes a StoreInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.StoreInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.StoreInfo} StoreInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    StoreInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.StoreInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.id = r.int32();
            break;

          case 2:
            m.chips = r.int64();
            break;

          case 3:
            m.price = r.int64();
            break;

          case 4:
            m.giftChips = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return StoreInfo;
  }();

  MST.L2C_GetStoreList_Res = function () {
    /**
     * Properties of a L2C_GetStoreList_Res.
     * @memberof MST
     * @interface IL2C_GetStoreList_Res
     * @property {number|null} [RpcId] L2C_GetStoreList_Res RpcId
     * @property {number|null} [Error] L2C_GetStoreList_Res Error
     * @property {Array.<MST.IStoreInfo>|null} [info] L2C_GetStoreList_Res info
     */

    /**
     * Constructs a new L2C_GetStoreList_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetStoreList_Res.
     * @implements IL2C_GetStoreList_Res
     * @constructor
     * @param {MST.IL2C_GetStoreList_Res=} [p] Properties to set
     */
    function L2C_GetStoreList_Res(p) {
      this.info = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetStoreList_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetStoreList_Res
     * @instance
     */


    L2C_GetStoreList_Res.prototype.RpcId = 0;
    /**
     * L2C_GetStoreList_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetStoreList_Res
     * @instance
     */

    L2C_GetStoreList_Res.prototype.Error = 0;
    /**
     * L2C_GetStoreList_Res info.
     * @member {Array.<MST.IStoreInfo>} info
     * @memberof MST.L2C_GetStoreList_Res
     * @instance
     */

    L2C_GetStoreList_Res.prototype.info = $util.emptyArray;
    /**
     * Creates a new L2C_GetStoreList_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetStoreList_Res
     * @static
     * @param {MST.IL2C_GetStoreList_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetStoreList_Res} L2C_GetStoreList_Res instance
     */

    L2C_GetStoreList_Res.create = function create(properties) {
      return new L2C_GetStoreList_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetStoreList_Res message. Does not implicitly {@link MST.L2C_GetStoreList_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetStoreList_Res
     * @static
     * @param {MST.IL2C_GetStoreList_Res} m L2C_GetStoreList_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetStoreList_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.info != null && m.info.length) {
        for (var i = 0; i < m.info.length; ++i) {
          $root.MST.StoreInfo.encode(m.info[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetStoreList_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetStoreList_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetStoreList_Res} L2C_GetStoreList_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetStoreList_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetStoreList_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.info && m.info.length)) m.info = [];
            m.info.push($root.MST.StoreInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetStoreList_Res;
  }();

  MST.C2L_GetBankList_Req = function () {
    /**
     * Properties of a C2L_GetBankList_Req.
     * @memberof MST
     * @interface IC2L_GetBankList_Req
     * @property {number|null} [RpcId] C2L_GetBankList_Req RpcId
     * @property {number|null} [index] C2L_GetBankList_Req index
     * @property {number|null} [limit] C2L_GetBankList_Req limit
     */

    /**
     * Constructs a new C2L_GetBankList_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetBankList_Req.
     * @implements IC2L_GetBankList_Req
     * @constructor
     * @param {MST.IC2L_GetBankList_Req=} [p] Properties to set
     */
    function C2L_GetBankList_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetBankList_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetBankList_Req
     * @instance
     */


    C2L_GetBankList_Req.prototype.RpcId = 0;
    /**
     * C2L_GetBankList_Req index.
     * @member {number} index
     * @memberof MST.C2L_GetBankList_Req
     * @instance
     */

    C2L_GetBankList_Req.prototype.index = 0;
    /**
     * C2L_GetBankList_Req limit.
     * @member {number} limit
     * @memberof MST.C2L_GetBankList_Req
     * @instance
     */

    C2L_GetBankList_Req.prototype.limit = 0;
    /**
     * Creates a new C2L_GetBankList_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetBankList_Req
     * @static
     * @param {MST.IC2L_GetBankList_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetBankList_Req} C2L_GetBankList_Req instance
     */

    C2L_GetBankList_Req.create = function create(properties) {
      return new C2L_GetBankList_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetBankList_Req message. Does not implicitly {@link MST.C2L_GetBankList_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetBankList_Req
     * @static
     * @param {MST.IC2L_GetBankList_Req} m C2L_GetBankList_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetBankList_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(8).int32(m.index);
      if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(16).int32(m.limit);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetBankList_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetBankList_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetBankList_Req} C2L_GetBankList_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetBankList_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetBankList_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.index = r.int32();
            break;

          case 2:
            m.limit = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetBankList_Req;
  }();

  MST.BankInfo = function () {
    /**
     * Properties of a BankInfo.
     * @memberof MST
     * @interface IBankInfo
     * @property {string|null} [bankName] BankInfo bankName
     * @property {string|null} [bankCode] BankInfo bankCode
     */

    /**
     * Constructs a new BankInfo.
     * @memberof MST
     * @classdesc Represents a BankInfo.
     * @implements IBankInfo
     * @constructor
     * @param {MST.IBankInfo=} [p] Properties to set
     */
    function BankInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * BankInfo bankName.
     * @member {string} bankName
     * @memberof MST.BankInfo
     * @instance
     */


    BankInfo.prototype.bankName = "";
    /**
     * BankInfo bankCode.
     * @member {string} bankCode
     * @memberof MST.BankInfo
     * @instance
     */

    BankInfo.prototype.bankCode = "";
    /**
     * Creates a new BankInfo instance using the specified properties.
     * @function create
     * @memberof MST.BankInfo
     * @static
     * @param {MST.IBankInfo=} [properties] Properties to set
     * @returns {MST.BankInfo} BankInfo instance
     */

    BankInfo.create = function create(properties) {
      return new BankInfo(properties);
    };
    /**
     * Encodes the specified BankInfo message. Does not implicitly {@link MST.BankInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.BankInfo
     * @static
     * @param {MST.IBankInfo} m BankInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    BankInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.bankName != null && Object.hasOwnProperty.call(m, "bankName")) w.uint32(10).string(m.bankName);
      if (m.bankCode != null && Object.hasOwnProperty.call(m, "bankCode")) w.uint32(18).string(m.bankCode);
      return w;
    };
    /**
     * Decodes a BankInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.BankInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.BankInfo} BankInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    BankInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.BankInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.bankName = r.string();
            break;

          case 2:
            m.bankCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return BankInfo;
  }();

  MST.L2C_GetBankList_Res = function () {
    /**
     * Properties of a L2C_GetBankList_Res.
     * @memberof MST
     * @interface IL2C_GetBankList_Res
     * @property {number|null} [RpcId] L2C_GetBankList_Res RpcId
     * @property {number|null} [Error] L2C_GetBankList_Res Error
     * @property {Array.<MST.IBankInfo>|null} [info] L2C_GetBankList_Res info
     * @property {number|null} [index] L2C_GetBankList_Res index
     */

    /**
     * Constructs a new L2C_GetBankList_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetBankList_Res.
     * @implements IL2C_GetBankList_Res
     * @constructor
     * @param {MST.IL2C_GetBankList_Res=} [p] Properties to set
     */
    function L2C_GetBankList_Res(p) {
      this.info = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetBankList_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetBankList_Res
     * @instance
     */


    L2C_GetBankList_Res.prototype.RpcId = 0;
    /**
     * L2C_GetBankList_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetBankList_Res
     * @instance
     */

    L2C_GetBankList_Res.prototype.Error = 0;
    /**
     * L2C_GetBankList_Res info.
     * @member {Array.<MST.IBankInfo>} info
     * @memberof MST.L2C_GetBankList_Res
     * @instance
     */

    L2C_GetBankList_Res.prototype.info = $util.emptyArray;
    /**
     * L2C_GetBankList_Res index.
     * @member {number} index
     * @memberof MST.L2C_GetBankList_Res
     * @instance
     */

    L2C_GetBankList_Res.prototype.index = 0;
    /**
     * Creates a new L2C_GetBankList_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetBankList_Res
     * @static
     * @param {MST.IL2C_GetBankList_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetBankList_Res} L2C_GetBankList_Res instance
     */

    L2C_GetBankList_Res.create = function create(properties) {
      return new L2C_GetBankList_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetBankList_Res message. Does not implicitly {@link MST.L2C_GetBankList_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetBankList_Res
     * @static
     * @param {MST.IL2C_GetBankList_Res} m L2C_GetBankList_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetBankList_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.info != null && m.info.length) {
        for (var i = 0; i < m.info.length; ++i) {
          $root.MST.BankInfo.encode(m.info[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(16).int32(m.index);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetBankList_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetBankList_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetBankList_Res} L2C_GetBankList_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetBankList_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetBankList_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.info && m.info.length)) m.info = [];
            m.info.push($root.MST.BankInfo.decode(r, r.uint32()));
            break;

          case 2:
            m.index = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetBankList_Res;
  }();

  MST.C2L_BindBankCard_Req = function () {
    /**
     * Properties of a C2L_BindBankCard_Req.
     * @memberof MST
     * @interface IC2L_BindBankCard_Req
     * @property {number|null} [RpcId] C2L_BindBankCard_Req RpcId
     * @property {string|null} [bankCode] C2L_BindBankCard_Req bankCode
     * @property {string|null} [name] C2L_BindBankCard_Req name
     * @property {string|null} [bankNo] C2L_BindBankCard_Req bankNo
     */

    /**
     * Constructs a new C2L_BindBankCard_Req.
     * @memberof MST
     * @classdesc Represents a C2L_BindBankCard_Req.
     * @implements IC2L_BindBankCard_Req
     * @constructor
     * @param {MST.IC2L_BindBankCard_Req=} [p] Properties to set
     */
    function C2L_BindBankCard_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_BindBankCard_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_BindBankCard_Req
     * @instance
     */


    C2L_BindBankCard_Req.prototype.RpcId = 0;
    /**
     * C2L_BindBankCard_Req bankCode.
     * @member {string} bankCode
     * @memberof MST.C2L_BindBankCard_Req
     * @instance
     */

    C2L_BindBankCard_Req.prototype.bankCode = "";
    /**
     * C2L_BindBankCard_Req name.
     * @member {string} name
     * @memberof MST.C2L_BindBankCard_Req
     * @instance
     */

    C2L_BindBankCard_Req.prototype.name = "";
    /**
     * C2L_BindBankCard_Req bankNo.
     * @member {string} bankNo
     * @memberof MST.C2L_BindBankCard_Req
     * @instance
     */

    C2L_BindBankCard_Req.prototype.bankNo = "";
    /**
     * Creates a new C2L_BindBankCard_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_BindBankCard_Req
     * @static
     * @param {MST.IC2L_BindBankCard_Req=} [properties] Properties to set
     * @returns {MST.C2L_BindBankCard_Req} C2L_BindBankCard_Req instance
     */

    C2L_BindBankCard_Req.create = function create(properties) {
      return new C2L_BindBankCard_Req(properties);
    };
    /**
     * Encodes the specified C2L_BindBankCard_Req message. Does not implicitly {@link MST.C2L_BindBankCard_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_BindBankCard_Req
     * @static
     * @param {MST.IC2L_BindBankCard_Req} m C2L_BindBankCard_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_BindBankCard_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.bankCode != null && Object.hasOwnProperty.call(m, "bankCode")) w.uint32(10).string(m.bankCode);
      if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(18).string(m.name);
      if (m.bankNo != null && Object.hasOwnProperty.call(m, "bankNo")) w.uint32(26).string(m.bankNo);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_BindBankCard_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_BindBankCard_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_BindBankCard_Req} C2L_BindBankCard_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_BindBankCard_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_BindBankCard_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.bankCode = r.string();
            break;

          case 2:
            m.name = r.string();
            break;

          case 3:
            m.bankNo = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_BindBankCard_Req;
  }();

  MST.L2C_BindBankCard_Res = function () {
    /**
     * Properties of a L2C_BindBankCard_Res.
     * @memberof MST
     * @interface IL2C_BindBankCard_Res
     * @property {number|null} [RpcId] L2C_BindBankCard_Res RpcId
     * @property {number|null} [Error] L2C_BindBankCard_Res Error
     */

    /**
     * Constructs a new L2C_BindBankCard_Res.
     * @memberof MST
     * @classdesc Represents a L2C_BindBankCard_Res.
     * @implements IL2C_BindBankCard_Res
     * @constructor
     * @param {MST.IL2C_BindBankCard_Res=} [p] Properties to set
     */
    function L2C_BindBankCard_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_BindBankCard_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_BindBankCard_Res
     * @instance
     */


    L2C_BindBankCard_Res.prototype.RpcId = 0;
    /**
     * L2C_BindBankCard_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_BindBankCard_Res
     * @instance
     */

    L2C_BindBankCard_Res.prototype.Error = 0;
    /**
     * Creates a new L2C_BindBankCard_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_BindBankCard_Res
     * @static
     * @param {MST.IL2C_BindBankCard_Res=} [properties] Properties to set
     * @returns {MST.L2C_BindBankCard_Res} L2C_BindBankCard_Res instance
     */

    L2C_BindBankCard_Res.create = function create(properties) {
      return new L2C_BindBankCard_Res(properties);
    };
    /**
     * Encodes the specified L2C_BindBankCard_Res message. Does not implicitly {@link MST.L2C_BindBankCard_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_BindBankCard_Res
     * @static
     * @param {MST.IL2C_BindBankCard_Res} m L2C_BindBankCard_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_BindBankCard_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_BindBankCard_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_BindBankCard_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_BindBankCard_Res} L2C_BindBankCard_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_BindBankCard_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_BindBankCard_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_BindBankCard_Res;
  }();

  MST.C2L_GetBankCardInfo_Req = function () {
    /**
     * Properties of a C2L_GetBankCardInfo_Req.
     * @memberof MST
     * @interface IC2L_GetBankCardInfo_Req
     * @property {number|null} [RpcId] C2L_GetBankCardInfo_Req RpcId
     */

    /**
     * Constructs a new C2L_GetBankCardInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2L_GetBankCardInfo_Req.
     * @implements IC2L_GetBankCardInfo_Req
     * @constructor
     * @param {MST.IC2L_GetBankCardInfo_Req=} [p] Properties to set
     */
    function C2L_GetBankCardInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2L_GetBankCardInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2L_GetBankCardInfo_Req
     * @instance
     */


    C2L_GetBankCardInfo_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2L_GetBankCardInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2L_GetBankCardInfo_Req
     * @static
     * @param {MST.IC2L_GetBankCardInfo_Req=} [properties] Properties to set
     * @returns {MST.C2L_GetBankCardInfo_Req} C2L_GetBankCardInfo_Req instance
     */

    C2L_GetBankCardInfo_Req.create = function create(properties) {
      return new C2L_GetBankCardInfo_Req(properties);
    };
    /**
     * Encodes the specified C2L_GetBankCardInfo_Req message. Does not implicitly {@link MST.C2L_GetBankCardInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2L_GetBankCardInfo_Req
     * @static
     * @param {MST.IC2L_GetBankCardInfo_Req} m C2L_GetBankCardInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2L_GetBankCardInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2L_GetBankCardInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2L_GetBankCardInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2L_GetBankCardInfo_Req} C2L_GetBankCardInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2L_GetBankCardInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2L_GetBankCardInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2L_GetBankCardInfo_Req;
  }();

  MST.L2C_GetBankCardInfo_Res = function () {
    /**
     * Properties of a L2C_GetBankCardInfo_Res.
     * @memberof MST
     * @interface IL2C_GetBankCardInfo_Res
     * @property {number|null} [RpcId] L2C_GetBankCardInfo_Res RpcId
     * @property {number|null} [Error] L2C_GetBankCardInfo_Res Error
     * @property {string|null} [bankCode] L2C_GetBankCardInfo_Res bankCode
     * @property {string|null} [name] L2C_GetBankCardInfo_Res name
     * @property {string|null} [bankNo] L2C_GetBankCardInfo_Res bankNo
     */

    /**
     * Constructs a new L2C_GetBankCardInfo_Res.
     * @memberof MST
     * @classdesc Represents a L2C_GetBankCardInfo_Res.
     * @implements IL2C_GetBankCardInfo_Res
     * @constructor
     * @param {MST.IL2C_GetBankCardInfo_Res=} [p] Properties to set
     */
    function L2C_GetBankCardInfo_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * L2C_GetBankCardInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @instance
     */


    L2C_GetBankCardInfo_Res.prototype.RpcId = 0;
    /**
     * L2C_GetBankCardInfo_Res Error.
     * @member {number} Error
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @instance
     */

    L2C_GetBankCardInfo_Res.prototype.Error = 0;
    /**
     * L2C_GetBankCardInfo_Res bankCode.
     * @member {string} bankCode
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @instance
     */

    L2C_GetBankCardInfo_Res.prototype.bankCode = "";
    /**
     * L2C_GetBankCardInfo_Res name.
     * @member {string} name
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @instance
     */

    L2C_GetBankCardInfo_Res.prototype.name = "";
    /**
     * L2C_GetBankCardInfo_Res bankNo.
     * @member {string} bankNo
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @instance
     */

    L2C_GetBankCardInfo_Res.prototype.bankNo = "";
    /**
     * Creates a new L2C_GetBankCardInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @static
     * @param {MST.IL2C_GetBankCardInfo_Res=} [properties] Properties to set
     * @returns {MST.L2C_GetBankCardInfo_Res} L2C_GetBankCardInfo_Res instance
     */

    L2C_GetBankCardInfo_Res.create = function create(properties) {
      return new L2C_GetBankCardInfo_Res(properties);
    };
    /**
     * Encodes the specified L2C_GetBankCardInfo_Res message. Does not implicitly {@link MST.L2C_GetBankCardInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @static
     * @param {MST.IL2C_GetBankCardInfo_Res} m L2C_GetBankCardInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    L2C_GetBankCardInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.bankCode != null && Object.hasOwnProperty.call(m, "bankCode")) w.uint32(10).string(m.bankCode);
      if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(18).string(m.name);
      if (m.bankNo != null && Object.hasOwnProperty.call(m, "bankNo")) w.uint32(26).string(m.bankNo);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a L2C_GetBankCardInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.L2C_GetBankCardInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.L2C_GetBankCardInfo_Res} L2C_GetBankCardInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    L2C_GetBankCardInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.L2C_GetBankCardInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            m.bankCode = r.string();
            break;

          case 2:
            m.name = r.string();
            break;

          case 3:
            m.bankNo = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return L2C_GetBankCardInfo_Res;
  }();

  MST.C2S_MinigameInfo = function () {
    /**
     * Properties of a C2S_MinigameInfo.
     * @memberof MST
     * @interface IC2S_MinigameInfo
     * @property {number|null} [serial] C2S_MinigameInfo serial
     */

    /**
     * Constructs a new C2S_MinigameInfo.
     * @memberof MST
     * @classdesc Represents a C2S_MinigameInfo.
     * @implements IC2S_MinigameInfo
     * @constructor
     * @param {MST.IC2S_MinigameInfo=} [p] Properties to set
     */
    function C2S_MinigameInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_MinigameInfo serial.
     * @member {number} serial
     * @memberof MST.C2S_MinigameInfo
     * @instance
     */


    C2S_MinigameInfo.prototype.serial = 0;
    /**
     * Creates a new C2S_MinigameInfo instance using the specified properties.
     * @function create
     * @memberof MST.C2S_MinigameInfo
     * @static
     * @param {MST.IC2S_MinigameInfo=} [properties] Properties to set
     * @returns {MST.C2S_MinigameInfo} C2S_MinigameInfo instance
     */

    C2S_MinigameInfo.create = function create(properties) {
      return new C2S_MinigameInfo(properties);
    };
    /**
     * Encodes the specified C2S_MinigameInfo message. Does not implicitly {@link MST.C2S_MinigameInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_MinigameInfo
     * @static
     * @param {MST.IC2S_MinigameInfo} m C2S_MinigameInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_MinigameInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_MinigameInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_MinigameInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_MinigameInfo} C2S_MinigameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_MinigameInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_MinigameInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_MinigameInfo;
  }();

  MST.S2C_MinigameInfo = function () {
    /**
     * Properties of a S2C_MinigameInfo.
     * @memberof MST
     * @interface IS2C_MinigameInfo
     * @property {number|null} [serial] S2C_MinigameInfo serial
     * @property {number|null} [code] S2C_MinigameInfo code
     * @property {boolean|null} [isFinishGame] S2C_MinigameInfo isFinishGame
     * @property {number|Long|null} [todayBonus] S2C_MinigameInfo todayBonus
     * @property {boolean|null} [isReceiveBonus] S2C_MinigameInfo isReceiveBonus
     */

    /**
     * Constructs a new S2C_MinigameInfo.
     * @memberof MST
     * @classdesc Represents a S2C_MinigameInfo.
     * @implements IS2C_MinigameInfo
     * @constructor
     * @param {MST.IS2C_MinigameInfo=} [p] Properties to set
     */
    function S2C_MinigameInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_MinigameInfo serial.
     * @member {number} serial
     * @memberof MST.S2C_MinigameInfo
     * @instance
     */


    S2C_MinigameInfo.prototype.serial = 0;
    /**
     * S2C_MinigameInfo code.
     * @member {number} code
     * @memberof MST.S2C_MinigameInfo
     * @instance
     */

    S2C_MinigameInfo.prototype.code = 0;
    /**
     * S2C_MinigameInfo isFinishGame.
     * @member {boolean} isFinishGame
     * @memberof MST.S2C_MinigameInfo
     * @instance
     */

    S2C_MinigameInfo.prototype.isFinishGame = false;
    /**
     * S2C_MinigameInfo todayBonus.
     * @member {number|Long} todayBonus
     * @memberof MST.S2C_MinigameInfo
     * @instance
     */

    S2C_MinigameInfo.prototype.todayBonus = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_MinigameInfo isReceiveBonus.
     * @member {boolean} isReceiveBonus
     * @memberof MST.S2C_MinigameInfo
     * @instance
     */

    S2C_MinigameInfo.prototype.isReceiveBonus = false;
    /**
     * Creates a new S2C_MinigameInfo instance using the specified properties.
     * @function create
     * @memberof MST.S2C_MinigameInfo
     * @static
     * @param {MST.IS2C_MinigameInfo=} [properties] Properties to set
     * @returns {MST.S2C_MinigameInfo} S2C_MinigameInfo instance
     */

    S2C_MinigameInfo.create = function create(properties) {
      return new S2C_MinigameInfo(properties);
    };
    /**
     * Encodes the specified S2C_MinigameInfo message. Does not implicitly {@link MST.S2C_MinigameInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_MinigameInfo
     * @static
     * @param {MST.IS2C_MinigameInfo} m S2C_MinigameInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_MinigameInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.isFinishGame != null && Object.hasOwnProperty.call(m, "isFinishGame")) w.uint32(24).bool(m.isFinishGame);
      if (m.todayBonus != null && Object.hasOwnProperty.call(m, "todayBonus")) w.uint32(32).int64(m.todayBonus);
      if (m.isReceiveBonus != null && Object.hasOwnProperty.call(m, "isReceiveBonus")) w.uint32(40).bool(m.isReceiveBonus);
      return w;
    };
    /**
     * Decodes a S2C_MinigameInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_MinigameInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_MinigameInfo} S2C_MinigameInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_MinigameInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_MinigameInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.isFinishGame = r.bool();
            break;

          case 4:
            m.todayBonus = r.int64();
            break;

          case 5:
            m.isReceiveBonus = r.bool();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_MinigameInfo;
  }();

  MST.C2S_MinigameLottery = function () {
    /**
     * Properties of a C2S_MinigameLottery.
     * @memberof MST
     * @interface IC2S_MinigameLottery
     * @property {number|null} [serial] C2S_MinigameLottery serial
     * @property {number|null} [boxIndex] C2S_MinigameLottery boxIndex
     */

    /**
     * Constructs a new C2S_MinigameLottery.
     * @memberof MST
     * @classdesc Represents a C2S_MinigameLottery.
     * @implements IC2S_MinigameLottery
     * @constructor
     * @param {MST.IC2S_MinigameLottery=} [p] Properties to set
     */
    function C2S_MinigameLottery(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_MinigameLottery serial.
     * @member {number} serial
     * @memberof MST.C2S_MinigameLottery
     * @instance
     */


    C2S_MinigameLottery.prototype.serial = 0;
    /**
     * C2S_MinigameLottery boxIndex.
     * @member {number} boxIndex
     * @memberof MST.C2S_MinigameLottery
     * @instance
     */

    C2S_MinigameLottery.prototype.boxIndex = 0;
    /**
     * Creates a new C2S_MinigameLottery instance using the specified properties.
     * @function create
     * @memberof MST.C2S_MinigameLottery
     * @static
     * @param {MST.IC2S_MinigameLottery=} [properties] Properties to set
     * @returns {MST.C2S_MinigameLottery} C2S_MinigameLottery instance
     */

    C2S_MinigameLottery.create = function create(properties) {
      return new C2S_MinigameLottery(properties);
    };
    /**
     * Encodes the specified C2S_MinigameLottery message. Does not implicitly {@link MST.C2S_MinigameLottery.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_MinigameLottery
     * @static
     * @param {MST.IC2S_MinigameLottery} m C2S_MinigameLottery message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_MinigameLottery.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.boxIndex != null && Object.hasOwnProperty.call(m, "boxIndex")) w.uint32(16).int32(m.boxIndex);
      return w;
    };
    /**
     * Decodes a C2S_MinigameLottery message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_MinigameLottery
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_MinigameLottery} C2S_MinigameLottery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_MinigameLottery.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_MinigameLottery();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.boxIndex = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_MinigameLottery;
  }();

  MST.S2C_MinigameLottery = function () {
    /**
     * Properties of a S2C_MinigameLottery.
     * @memberof MST
     * @interface IS2C_MinigameLottery
     * @property {number|null} [serial] S2C_MinigameLottery serial
     * @property {number|null} [code] S2C_MinigameLottery code
     * @property {number|null} [boxIndex] S2C_MinigameLottery boxIndex
     * @property {number|Long|null} [award] S2C_MinigameLottery award
     */

    /**
     * Constructs a new S2C_MinigameLottery.
     * @memberof MST
     * @classdesc Represents a S2C_MinigameLottery.
     * @implements IS2C_MinigameLottery
     * @constructor
     * @param {MST.IS2C_MinigameLottery=} [p] Properties to set
     */
    function S2C_MinigameLottery(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_MinigameLottery serial.
     * @member {number} serial
     * @memberof MST.S2C_MinigameLottery
     * @instance
     */


    S2C_MinigameLottery.prototype.serial = 0;
    /**
     * S2C_MinigameLottery code.
     * @member {number} code
     * @memberof MST.S2C_MinigameLottery
     * @instance
     */

    S2C_MinigameLottery.prototype.code = 0;
    /**
     * S2C_MinigameLottery boxIndex.
     * @member {number} boxIndex
     * @memberof MST.S2C_MinigameLottery
     * @instance
     */

    S2C_MinigameLottery.prototype.boxIndex = 0;
    /**
     * S2C_MinigameLottery award.
     * @member {number|Long} award
     * @memberof MST.S2C_MinigameLottery
     * @instance
     */

    S2C_MinigameLottery.prototype.award = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new S2C_MinigameLottery instance using the specified properties.
     * @function create
     * @memberof MST.S2C_MinigameLottery
     * @static
     * @param {MST.IS2C_MinigameLottery=} [properties] Properties to set
     * @returns {MST.S2C_MinigameLottery} S2C_MinigameLottery instance
     */

    S2C_MinigameLottery.create = function create(properties) {
      return new S2C_MinigameLottery(properties);
    };
    /**
     * Encodes the specified S2C_MinigameLottery message. Does not implicitly {@link MST.S2C_MinigameLottery.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_MinigameLottery
     * @static
     * @param {MST.IS2C_MinigameLottery} m S2C_MinigameLottery message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_MinigameLottery.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.boxIndex != null && Object.hasOwnProperty.call(m, "boxIndex")) w.uint32(24).int32(m.boxIndex);
      if (m.award != null && Object.hasOwnProperty.call(m, "award")) w.uint32(32).int64(m.award);
      return w;
    };
    /**
     * Decodes a S2C_MinigameLottery message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_MinigameLottery
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_MinigameLottery} S2C_MinigameLottery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_MinigameLottery.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_MinigameLottery();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.boxIndex = r.int32();
            break;

          case 4:
            m.award = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_MinigameLottery;
  }();

  MST.C2S_GetSignedInfo = function () {
    /**
     * Properties of a C2S_GetSignedInfo.
     * @memberof MST
     * @interface IC2S_GetSignedInfo
     * @property {number|null} [serial] C2S_GetSignedInfo serial
     */

    /**
     * Constructs a new C2S_GetSignedInfo.
     * @memberof MST
     * @classdesc Represents a C2S_GetSignedInfo.
     * @implements IC2S_GetSignedInfo
     * @constructor
     * @param {MST.IC2S_GetSignedInfo=} [p] Properties to set
     */
    function C2S_GetSignedInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_GetSignedInfo serial.
     * @member {number} serial
     * @memberof MST.C2S_GetSignedInfo
     * @instance
     */


    C2S_GetSignedInfo.prototype.serial = 0;
    /**
     * Creates a new C2S_GetSignedInfo instance using the specified properties.
     * @function create
     * @memberof MST.C2S_GetSignedInfo
     * @static
     * @param {MST.IC2S_GetSignedInfo=} [properties] Properties to set
     * @returns {MST.C2S_GetSignedInfo} C2S_GetSignedInfo instance
     */

    C2S_GetSignedInfo.create = function create(properties) {
      return new C2S_GetSignedInfo(properties);
    };
    /**
     * Encodes the specified C2S_GetSignedInfo message. Does not implicitly {@link MST.C2S_GetSignedInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_GetSignedInfo
     * @static
     * @param {MST.IC2S_GetSignedInfo} m C2S_GetSignedInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_GetSignedInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_GetSignedInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_GetSignedInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_GetSignedInfo} C2S_GetSignedInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_GetSignedInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_GetSignedInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_GetSignedInfo;
  }();

  MST.S2C_GetSignedInfo = function () {
    /**
     * Properties of a S2C_GetSignedInfo.
     * @memberof MST
     * @interface IS2C_GetSignedInfo
     * @property {number|null} [serial] S2C_GetSignedInfo serial
     * @property {number|null} [code] S2C_GetSignedInfo code
     * @property {number|null} [signedType] S2C_GetSignedInfo signedType
     * @property {number|null} [signedDays] S2C_GetSignedInfo signedDays
     * @property {boolean|null} [isSigned] S2C_GetSignedInfo isSigned
     * @property {number|Long|null} [reward] S2C_GetSignedInfo reward
     * @property {number|Long|null} [deadLine] S2C_GetSignedInfo deadLine
     */

    /**
     * Constructs a new S2C_GetSignedInfo.
     * @memberof MST
     * @classdesc Represents a S2C_GetSignedInfo.
     * @implements IS2C_GetSignedInfo
     * @constructor
     * @param {MST.IS2C_GetSignedInfo=} [p] Properties to set
     */
    function S2C_GetSignedInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_GetSignedInfo serial.
     * @member {number} serial
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */


    S2C_GetSignedInfo.prototype.serial = 0;
    /**
     * S2C_GetSignedInfo code.
     * @member {number} code
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.code = 0;
    /**
     * S2C_GetSignedInfo signedType.
     * @member {number} signedType
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.signedType = 0;
    /**
     * S2C_GetSignedInfo signedDays.
     * @member {number} signedDays
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.signedDays = 0;
    /**
     * S2C_GetSignedInfo isSigned.
     * @member {boolean} isSigned
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.isSigned = false;
    /**
     * S2C_GetSignedInfo reward.
     * @member {number|Long} reward
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.reward = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_GetSignedInfo deadLine.
     * @member {number|Long} deadLine
     * @memberof MST.S2C_GetSignedInfo
     * @instance
     */

    S2C_GetSignedInfo.prototype.deadLine = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new S2C_GetSignedInfo instance using the specified properties.
     * @function create
     * @memberof MST.S2C_GetSignedInfo
     * @static
     * @param {MST.IS2C_GetSignedInfo=} [properties] Properties to set
     * @returns {MST.S2C_GetSignedInfo} S2C_GetSignedInfo instance
     */

    S2C_GetSignedInfo.create = function create(properties) {
      return new S2C_GetSignedInfo(properties);
    };
    /**
     * Encodes the specified S2C_GetSignedInfo message. Does not implicitly {@link MST.S2C_GetSignedInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_GetSignedInfo
     * @static
     * @param {MST.IS2C_GetSignedInfo} m S2C_GetSignedInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_GetSignedInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.signedType != null && Object.hasOwnProperty.call(m, "signedType")) w.uint32(24).int32(m.signedType);
      if (m.signedDays != null && Object.hasOwnProperty.call(m, "signedDays")) w.uint32(32).int32(m.signedDays);
      if (m.isSigned != null && Object.hasOwnProperty.call(m, "isSigned")) w.uint32(40).bool(m.isSigned);
      if (m.reward != null && Object.hasOwnProperty.call(m, "reward")) w.uint32(48).int64(m.reward);
      if (m.deadLine != null && Object.hasOwnProperty.call(m, "deadLine")) w.uint32(56).int64(m.deadLine);
      return w;
    };
    /**
     * Decodes a S2C_GetSignedInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_GetSignedInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_GetSignedInfo} S2C_GetSignedInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_GetSignedInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_GetSignedInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.signedType = r.int32();
            break;

          case 4:
            m.signedDays = r.int32();
            break;

          case 5:
            m.isSigned = r.bool();
            break;

          case 6:
            m.reward = r.int64();
            break;

          case 7:
            m.deadLine = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_GetSignedInfo;
  }();

  MST.C2S_Signed = function () {
    /**
     * Properties of a C2S_Signed.
     * @memberof MST
     * @interface IC2S_Signed
     * @property {number|null} [serial] C2S_Signed serial
     */

    /**
     * Constructs a new C2S_Signed.
     * @memberof MST
     * @classdesc Represents a C2S_Signed.
     * @implements IC2S_Signed
     * @constructor
     * @param {MST.IC2S_Signed=} [p] Properties to set
     */
    function C2S_Signed(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_Signed serial.
     * @member {number} serial
     * @memberof MST.C2S_Signed
     * @instance
     */


    C2S_Signed.prototype.serial = 0;
    /**
     * Creates a new C2S_Signed instance using the specified properties.
     * @function create
     * @memberof MST.C2S_Signed
     * @static
     * @param {MST.IC2S_Signed=} [properties] Properties to set
     * @returns {MST.C2S_Signed} C2S_Signed instance
     */

    C2S_Signed.create = function create(properties) {
      return new C2S_Signed(properties);
    };
    /**
     * Encodes the specified C2S_Signed message. Does not implicitly {@link MST.C2S_Signed.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_Signed
     * @static
     * @param {MST.IC2S_Signed} m C2S_Signed message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_Signed.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_Signed message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_Signed
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_Signed} C2S_Signed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_Signed.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_Signed();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_Signed;
  }();

  MST.S2C_Signed = function () {
    /**
     * Properties of a S2C_Signed.
     * @memberof MST
     * @interface IS2C_Signed
     * @property {number|null} [serial] S2C_Signed serial
     * @property {number|null} [code] S2C_Signed code
     * @property {number|Long|null} [reward] S2C_Signed reward
     * @property {number|null} [signedCount] S2C_Signed signedCount
     */

    /**
     * Constructs a new S2C_Signed.
     * @memberof MST
     * @classdesc Represents a S2C_Signed.
     * @implements IS2C_Signed
     * @constructor
     * @param {MST.IS2C_Signed=} [p] Properties to set
     */
    function S2C_Signed(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_Signed serial.
     * @member {number} serial
     * @memberof MST.S2C_Signed
     * @instance
     */


    S2C_Signed.prototype.serial = 0;
    /**
     * S2C_Signed code.
     * @member {number} code
     * @memberof MST.S2C_Signed
     * @instance
     */

    S2C_Signed.prototype.code = 0;
    /**
     * S2C_Signed reward.
     * @member {number|Long} reward
     * @memberof MST.S2C_Signed
     * @instance
     */

    S2C_Signed.prototype.reward = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_Signed signedCount.
     * @member {number} signedCount
     * @memberof MST.S2C_Signed
     * @instance
     */

    S2C_Signed.prototype.signedCount = 0;
    /**
     * Creates a new S2C_Signed instance using the specified properties.
     * @function create
     * @memberof MST.S2C_Signed
     * @static
     * @param {MST.IS2C_Signed=} [properties] Properties to set
     * @returns {MST.S2C_Signed} S2C_Signed instance
     */

    S2C_Signed.create = function create(properties) {
      return new S2C_Signed(properties);
    };
    /**
     * Encodes the specified S2C_Signed message. Does not implicitly {@link MST.S2C_Signed.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_Signed
     * @static
     * @param {MST.IS2C_Signed} m S2C_Signed message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_Signed.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.reward != null && Object.hasOwnProperty.call(m, "reward")) w.uint32(24).int64(m.reward);
      if (m.signedCount != null && Object.hasOwnProperty.call(m, "signedCount")) w.uint32(32).int32(m.signedCount);
      return w;
    };
    /**
     * Decodes a S2C_Signed message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_Signed
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_Signed} S2C_Signed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_Signed.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_Signed();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.reward = r.int64();
            break;

          case 4:
            m.signedCount = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_Signed;
  }();

  MST.C2S_Register = function () {
    /**
     * Properties of a C2S_Register.
     * @memberof MST
     * @interface IC2S_Register
     * @property {number|null} [serial] C2S_Register serial
     * @property {string|null} [username] C2S_Register username
     * @property {string|null} [password] C2S_Register password
     * @property {string|null} [imei] C2S_Register imei
     * @property {string|null} [checkCode] C2S_Register checkCode
     * @property {string|null} [extentCode] C2S_Register extentCode
     */

    /**
     * Constructs a new C2S_Register.
     * @memberof MST
     * @classdesc Represents a C2S_Register.
     * @implements IC2S_Register
     * @constructor
     * @param {MST.IC2S_Register=} [p] Properties to set
     */
    function C2S_Register(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_Register serial.
     * @member {number} serial
     * @memberof MST.C2S_Register
     * @instance
     */


    C2S_Register.prototype.serial = 0;
    /**
     * C2S_Register username.
     * @member {string} username
     * @memberof MST.C2S_Register
     * @instance
     */

    C2S_Register.prototype.username = "";
    /**
     * C2S_Register password.
     * @member {string} password
     * @memberof MST.C2S_Register
     * @instance
     */

    C2S_Register.prototype.password = "";
    /**
     * C2S_Register imei.
     * @member {string} imei
     * @memberof MST.C2S_Register
     * @instance
     */

    C2S_Register.prototype.imei = "";
    /**
     * C2S_Register checkCode.
     * @member {string} checkCode
     * @memberof MST.C2S_Register
     * @instance
     */

    C2S_Register.prototype.checkCode = "";
    /**
     * C2S_Register extentCode.
     * @member {string} extentCode
     * @memberof MST.C2S_Register
     * @instance
     */

    C2S_Register.prototype.extentCode = "";
    /**
     * Creates a new C2S_Register instance using the specified properties.
     * @function create
     * @memberof MST.C2S_Register
     * @static
     * @param {MST.IC2S_Register=} [properties] Properties to set
     * @returns {MST.C2S_Register} C2S_Register instance
     */

    C2S_Register.create = function create(properties) {
      return new C2S_Register(properties);
    };
    /**
     * Encodes the specified C2S_Register message. Does not implicitly {@link MST.C2S_Register.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_Register
     * @static
     * @param {MST.IC2S_Register} m C2S_Register message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_Register.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.username != null && Object.hasOwnProperty.call(m, "username")) w.uint32(18).string(m.username);
      if (m.password != null && Object.hasOwnProperty.call(m, "password")) w.uint32(26).string(m.password);
      if (m.imei != null && Object.hasOwnProperty.call(m, "imei")) w.uint32(34).string(m.imei);
      if (m.checkCode != null && Object.hasOwnProperty.call(m, "checkCode")) w.uint32(42).string(m.checkCode);
      if (m.extentCode != null && Object.hasOwnProperty.call(m, "extentCode")) w.uint32(50).string(m.extentCode);
      return w;
    };
    /**
     * Decodes a C2S_Register message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_Register
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_Register} C2S_Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_Register.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_Register();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.username = r.string();
            break;

          case 3:
            m.password = r.string();
            break;

          case 4:
            m.imei = r.string();
            break;

          case 5:
            m.checkCode = r.string();
            break;

          case 6:
            m.extentCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_Register;
  }();

  MST.S2C_Register = function () {
    /**
     * Properties of a S2C_Register.
     * @memberof MST
     * @interface IS2C_Register
     * @property {number|null} [serial] S2C_Register serial
     * @property {number|null} [code] S2C_Register code
     */

    /**
     * Constructs a new S2C_Register.
     * @memberof MST
     * @classdesc Represents a S2C_Register.
     * @implements IS2C_Register
     * @constructor
     * @param {MST.IS2C_Register=} [p] Properties to set
     */
    function S2C_Register(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_Register serial.
     * @member {number} serial
     * @memberof MST.S2C_Register
     * @instance
     */


    S2C_Register.prototype.serial = 0;
    /**
     * S2C_Register code.
     * @member {number} code
     * @memberof MST.S2C_Register
     * @instance
     */

    S2C_Register.prototype.code = 0;
    /**
     * Creates a new S2C_Register instance using the specified properties.
     * @function create
     * @memberof MST.S2C_Register
     * @static
     * @param {MST.IS2C_Register=} [properties] Properties to set
     * @returns {MST.S2C_Register} S2C_Register instance
     */

    S2C_Register.create = function create(properties) {
      return new S2C_Register(properties);
    };
    /**
     * Encodes the specified S2C_Register message. Does not implicitly {@link MST.S2C_Register.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_Register
     * @static
     * @param {MST.IS2C_Register} m S2C_Register message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_Register.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      return w;
    };
    /**
     * Decodes a S2C_Register message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_Register
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_Register} S2C_Register
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_Register.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_Register();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_Register;
  }();

  MST.C2S_ResetPassword = function () {
    /**
     * Properties of a C2S_ResetPassword.
     * @memberof MST
     * @interface IC2S_ResetPassword
     * @property {number|null} [serial] C2S_ResetPassword serial
     * @property {string|null} [username] C2S_ResetPassword username
     * @property {string|null} [password] C2S_ResetPassword password
     * @property {string|null} [checkCode] C2S_ResetPassword checkCode
     */

    /**
     * Constructs a new C2S_ResetPassword.
     * @memberof MST
     * @classdesc Represents a C2S_ResetPassword.
     * @implements IC2S_ResetPassword
     * @constructor
     * @param {MST.IC2S_ResetPassword=} [p] Properties to set
     */
    function C2S_ResetPassword(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_ResetPassword serial.
     * @member {number} serial
     * @memberof MST.C2S_ResetPassword
     * @instance
     */


    C2S_ResetPassword.prototype.serial = 0;
    /**
     * C2S_ResetPassword username.
     * @member {string} username
     * @memberof MST.C2S_ResetPassword
     * @instance
     */

    C2S_ResetPassword.prototype.username = "";
    /**
     * C2S_ResetPassword password.
     * @member {string} password
     * @memberof MST.C2S_ResetPassword
     * @instance
     */

    C2S_ResetPassword.prototype.password = "";
    /**
     * C2S_ResetPassword checkCode.
     * @member {string} checkCode
     * @memberof MST.C2S_ResetPassword
     * @instance
     */

    C2S_ResetPassword.prototype.checkCode = "";
    /**
     * Creates a new C2S_ResetPassword instance using the specified properties.
     * @function create
     * @memberof MST.C2S_ResetPassword
     * @static
     * @param {MST.IC2S_ResetPassword=} [properties] Properties to set
     * @returns {MST.C2S_ResetPassword} C2S_ResetPassword instance
     */

    C2S_ResetPassword.create = function create(properties) {
      return new C2S_ResetPassword(properties);
    };
    /**
     * Encodes the specified C2S_ResetPassword message. Does not implicitly {@link MST.C2S_ResetPassword.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_ResetPassword
     * @static
     * @param {MST.IC2S_ResetPassword} m C2S_ResetPassword message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_ResetPassword.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.username != null && Object.hasOwnProperty.call(m, "username")) w.uint32(18).string(m.username);
      if (m.password != null && Object.hasOwnProperty.call(m, "password")) w.uint32(26).string(m.password);
      if (m.checkCode != null && Object.hasOwnProperty.call(m, "checkCode")) w.uint32(34).string(m.checkCode);
      return w;
    };
    /**
     * Decodes a C2S_ResetPassword message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_ResetPassword
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_ResetPassword} C2S_ResetPassword
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_ResetPassword.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_ResetPassword();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.username = r.string();
            break;

          case 3:
            m.password = r.string();
            break;

          case 4:
            m.checkCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_ResetPassword;
  }();

  MST.S2C_ResetPassword = function () {
    /**
     * Properties of a S2C_ResetPassword.
     * @memberof MST
     * @interface IS2C_ResetPassword
     * @property {number|null} [serial] S2C_ResetPassword serial
     * @property {number|null} [code] S2C_ResetPassword code
     */

    /**
     * Constructs a new S2C_ResetPassword.
     * @memberof MST
     * @classdesc Represents a S2C_ResetPassword.
     * @implements IS2C_ResetPassword
     * @constructor
     * @param {MST.IS2C_ResetPassword=} [p] Properties to set
     */
    function S2C_ResetPassword(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_ResetPassword serial.
     * @member {number} serial
     * @memberof MST.S2C_ResetPassword
     * @instance
     */


    S2C_ResetPassword.prototype.serial = 0;
    /**
     * S2C_ResetPassword code.
     * @member {number} code
     * @memberof MST.S2C_ResetPassword
     * @instance
     */

    S2C_ResetPassword.prototype.code = 0;
    /**
     * Creates a new S2C_ResetPassword instance using the specified properties.
     * @function create
     * @memberof MST.S2C_ResetPassword
     * @static
     * @param {MST.IS2C_ResetPassword=} [properties] Properties to set
     * @returns {MST.S2C_ResetPassword} S2C_ResetPassword instance
     */

    S2C_ResetPassword.create = function create(properties) {
      return new S2C_ResetPassword(properties);
    };
    /**
     * Encodes the specified S2C_ResetPassword message. Does not implicitly {@link MST.S2C_ResetPassword.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_ResetPassword
     * @static
     * @param {MST.IS2C_ResetPassword} m S2C_ResetPassword message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_ResetPassword.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      return w;
    };
    /**
     * Decodes a S2C_ResetPassword message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_ResetPassword
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_ResetPassword} S2C_ResetPassword
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_ResetPassword.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_ResetPassword();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_ResetPassword;
  }();

  MST.C2S_GetCheckCode = function () {
    /**
     * Properties of a C2S_GetCheckCode.
     * @memberof MST
     * @interface IC2S_GetCheckCode
     * @property {number|null} [serial] C2S_GetCheckCode serial
     * @property {string|null} [username] C2S_GetCheckCode username
     */

    /**
     * Constructs a new C2S_GetCheckCode.
     * @memberof MST
     * @classdesc Represents a C2S_GetCheckCode.
     * @implements IC2S_GetCheckCode
     * @constructor
     * @param {MST.IC2S_GetCheckCode=} [p] Properties to set
     */
    function C2S_GetCheckCode(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_GetCheckCode serial.
     * @member {number} serial
     * @memberof MST.C2S_GetCheckCode
     * @instance
     */


    C2S_GetCheckCode.prototype.serial = 0;
    /**
     * C2S_GetCheckCode username.
     * @member {string} username
     * @memberof MST.C2S_GetCheckCode
     * @instance
     */

    C2S_GetCheckCode.prototype.username = "";
    /**
     * Creates a new C2S_GetCheckCode instance using the specified properties.
     * @function create
     * @memberof MST.C2S_GetCheckCode
     * @static
     * @param {MST.IC2S_GetCheckCode=} [properties] Properties to set
     * @returns {MST.C2S_GetCheckCode} C2S_GetCheckCode instance
     */

    C2S_GetCheckCode.create = function create(properties) {
      return new C2S_GetCheckCode(properties);
    };
    /**
     * Encodes the specified C2S_GetCheckCode message. Does not implicitly {@link MST.C2S_GetCheckCode.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_GetCheckCode
     * @static
     * @param {MST.IC2S_GetCheckCode} m C2S_GetCheckCode message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_GetCheckCode.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.username != null && Object.hasOwnProperty.call(m, "username")) w.uint32(18).string(m.username);
      return w;
    };
    /**
     * Decodes a C2S_GetCheckCode message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_GetCheckCode
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_GetCheckCode} C2S_GetCheckCode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_GetCheckCode.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_GetCheckCode();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.username = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_GetCheckCode;
  }();

  MST.S2C_GetCheckCode = function () {
    /**
     * Properties of a S2C_GetCheckCode.
     * @memberof MST
     * @interface IS2C_GetCheckCode
     * @property {number|null} [serial] S2C_GetCheckCode serial
     * @property {number|null} [code] S2C_GetCheckCode code
     */

    /**
     * Constructs a new S2C_GetCheckCode.
     * @memberof MST
     * @classdesc Represents a S2C_GetCheckCode.
     * @implements IS2C_GetCheckCode
     * @constructor
     * @param {MST.IS2C_GetCheckCode=} [p] Properties to set
     */
    function S2C_GetCheckCode(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_GetCheckCode serial.
     * @member {number} serial
     * @memberof MST.S2C_GetCheckCode
     * @instance
     */


    S2C_GetCheckCode.prototype.serial = 0;
    /**
     * S2C_GetCheckCode code.
     * @member {number} code
     * @memberof MST.S2C_GetCheckCode
     * @instance
     */

    S2C_GetCheckCode.prototype.code = 0;
    /**
     * Creates a new S2C_GetCheckCode instance using the specified properties.
     * @function create
     * @memberof MST.S2C_GetCheckCode
     * @static
     * @param {MST.IS2C_GetCheckCode=} [properties] Properties to set
     * @returns {MST.S2C_GetCheckCode} S2C_GetCheckCode instance
     */

    S2C_GetCheckCode.create = function create(properties) {
      return new S2C_GetCheckCode(properties);
    };
    /**
     * Encodes the specified S2C_GetCheckCode message. Does not implicitly {@link MST.S2C_GetCheckCode.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_GetCheckCode
     * @static
     * @param {MST.IS2C_GetCheckCode} m S2C_GetCheckCode message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_GetCheckCode.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      return w;
    };
    /**
     * Decodes a S2C_GetCheckCode message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_GetCheckCode
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_GetCheckCode} S2C_GetCheckCode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_GetCheckCode.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_GetCheckCode();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_GetCheckCode;
  }();

  MST.C2S_BindPhone = function () {
    /**
     * Properties of a C2S_BindPhone.
     * @memberof MST
     * @interface IC2S_BindPhone
     * @property {number|null} [serial] C2S_BindPhone serial
     * @property {string|null} [phoneNo] C2S_BindPhone phoneNo
     * @property {string|null} [checkCode] C2S_BindPhone checkCode
     */

    /**
     * Constructs a new C2S_BindPhone.
     * @memberof MST
     * @classdesc Represents a C2S_BindPhone.
     * @implements IC2S_BindPhone
     * @constructor
     * @param {MST.IC2S_BindPhone=} [p] Properties to set
     */
    function C2S_BindPhone(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_BindPhone serial.
     * @member {number} serial
     * @memberof MST.C2S_BindPhone
     * @instance
     */


    C2S_BindPhone.prototype.serial = 0;
    /**
     * C2S_BindPhone phoneNo.
     * @member {string} phoneNo
     * @memberof MST.C2S_BindPhone
     * @instance
     */

    C2S_BindPhone.prototype.phoneNo = "";
    /**
     * C2S_BindPhone checkCode.
     * @member {string} checkCode
     * @memberof MST.C2S_BindPhone
     * @instance
     */

    C2S_BindPhone.prototype.checkCode = "";
    /**
     * Creates a new C2S_BindPhone instance using the specified properties.
     * @function create
     * @memberof MST.C2S_BindPhone
     * @static
     * @param {MST.IC2S_BindPhone=} [properties] Properties to set
     * @returns {MST.C2S_BindPhone} C2S_BindPhone instance
     */

    C2S_BindPhone.create = function create(properties) {
      return new C2S_BindPhone(properties);
    };
    /**
     * Encodes the specified C2S_BindPhone message. Does not implicitly {@link MST.C2S_BindPhone.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_BindPhone
     * @static
     * @param {MST.IC2S_BindPhone} m C2S_BindPhone message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_BindPhone.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.phoneNo != null && Object.hasOwnProperty.call(m, "phoneNo")) w.uint32(18).string(m.phoneNo);
      if (m.checkCode != null && Object.hasOwnProperty.call(m, "checkCode")) w.uint32(34).string(m.checkCode);
      return w;
    };
    /**
     * Decodes a C2S_BindPhone message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_BindPhone
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_BindPhone} C2S_BindPhone
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_BindPhone.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_BindPhone();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.phoneNo = r.string();
            break;

          case 4:
            m.checkCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_BindPhone;
  }();

  MST.S2C_BindPhone = function () {
    /**
     * Properties of a S2C_BindPhone.
     * @memberof MST
     * @interface IS2C_BindPhone
     * @property {number|null} [serial] S2C_BindPhone serial
     * @property {number|null} [code] S2C_BindPhone code
     * @property {string|null} [phoneNo] S2C_BindPhone phoneNo
     */

    /**
     * Constructs a new S2C_BindPhone.
     * @memberof MST
     * @classdesc Represents a S2C_BindPhone.
     * @implements IS2C_BindPhone
     * @constructor
     * @param {MST.IS2C_BindPhone=} [p] Properties to set
     */
    function S2C_BindPhone(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_BindPhone serial.
     * @member {number} serial
     * @memberof MST.S2C_BindPhone
     * @instance
     */


    S2C_BindPhone.prototype.serial = 0;
    /**
     * S2C_BindPhone code.
     * @member {number} code
     * @memberof MST.S2C_BindPhone
     * @instance
     */

    S2C_BindPhone.prototype.code = 0;
    /**
     * S2C_BindPhone phoneNo.
     * @member {string} phoneNo
     * @memberof MST.S2C_BindPhone
     * @instance
     */

    S2C_BindPhone.prototype.phoneNo = "";
    /**
     * Creates a new S2C_BindPhone instance using the specified properties.
     * @function create
     * @memberof MST.S2C_BindPhone
     * @static
     * @param {MST.IS2C_BindPhone=} [properties] Properties to set
     * @returns {MST.S2C_BindPhone} S2C_BindPhone instance
     */

    S2C_BindPhone.create = function create(properties) {
      return new S2C_BindPhone(properties);
    };
    /**
     * Encodes the specified S2C_BindPhone message. Does not implicitly {@link MST.S2C_BindPhone.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_BindPhone
     * @static
     * @param {MST.IS2C_BindPhone} m S2C_BindPhone message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_BindPhone.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.phoneNo != null && Object.hasOwnProperty.call(m, "phoneNo")) w.uint32(26).string(m.phoneNo);
      return w;
    };
    /**
     * Decodes a S2C_BindPhone message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_BindPhone
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_BindPhone} S2C_BindPhone
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_BindPhone.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_BindPhone();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.phoneNo = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_BindPhone;
  }();

  MST.C2S_BindEmail = function () {
    /**
     * Properties of a C2S_BindEmail.
     * @memberof MST
     * @interface IC2S_BindEmail
     * @property {number|null} [serial] C2S_BindEmail serial
     * @property {string|null} [email] C2S_BindEmail email
     * @property {string|null} [checkCode] C2S_BindEmail checkCode
     */

    /**
     * Constructs a new C2S_BindEmail.
     * @memberof MST
     * @classdesc Represents a C2S_BindEmail.
     * @implements IC2S_BindEmail
     * @constructor
     * @param {MST.IC2S_BindEmail=} [p] Properties to set
     */
    function C2S_BindEmail(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_BindEmail serial.
     * @member {number} serial
     * @memberof MST.C2S_BindEmail
     * @instance
     */


    C2S_BindEmail.prototype.serial = 0;
    /**
     * C2S_BindEmail email.
     * @member {string} email
     * @memberof MST.C2S_BindEmail
     * @instance
     */

    C2S_BindEmail.prototype.email = "";
    /**
     * C2S_BindEmail checkCode.
     * @member {string} checkCode
     * @memberof MST.C2S_BindEmail
     * @instance
     */

    C2S_BindEmail.prototype.checkCode = "";
    /**
     * Creates a new C2S_BindEmail instance using the specified properties.
     * @function create
     * @memberof MST.C2S_BindEmail
     * @static
     * @param {MST.IC2S_BindEmail=} [properties] Properties to set
     * @returns {MST.C2S_BindEmail} C2S_BindEmail instance
     */

    C2S_BindEmail.create = function create(properties) {
      return new C2S_BindEmail(properties);
    };
    /**
     * Encodes the specified C2S_BindEmail message. Does not implicitly {@link MST.C2S_BindEmail.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_BindEmail
     * @static
     * @param {MST.IC2S_BindEmail} m C2S_BindEmail message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_BindEmail.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.email != null && Object.hasOwnProperty.call(m, "email")) w.uint32(18).string(m.email);
      if (m.checkCode != null && Object.hasOwnProperty.call(m, "checkCode")) w.uint32(26).string(m.checkCode);
      return w;
    };
    /**
     * Decodes a C2S_BindEmail message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_BindEmail
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_BindEmail} C2S_BindEmail
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_BindEmail.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_BindEmail();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.email = r.string();
            break;

          case 3:
            m.checkCode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_BindEmail;
  }();

  MST.S2C_BindEmail = function () {
    /**
     * Properties of a S2C_BindEmail.
     * @memberof MST
     * @interface IS2C_BindEmail
     * @property {number|null} [serial] S2C_BindEmail serial
     * @property {number|null} [code] S2C_BindEmail code
     * @property {string|null} [email] S2C_BindEmail email
     */

    /**
     * Constructs a new S2C_BindEmail.
     * @memberof MST
     * @classdesc Represents a S2C_BindEmail.
     * @implements IS2C_BindEmail
     * @constructor
     * @param {MST.IS2C_BindEmail=} [p] Properties to set
     */
    function S2C_BindEmail(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_BindEmail serial.
     * @member {number} serial
     * @memberof MST.S2C_BindEmail
     * @instance
     */


    S2C_BindEmail.prototype.serial = 0;
    /**
     * S2C_BindEmail code.
     * @member {number} code
     * @memberof MST.S2C_BindEmail
     * @instance
     */

    S2C_BindEmail.prototype.code = 0;
    /**
     * S2C_BindEmail email.
     * @member {string} email
     * @memberof MST.S2C_BindEmail
     * @instance
     */

    S2C_BindEmail.prototype.email = "";
    /**
     * Creates a new S2C_BindEmail instance using the specified properties.
     * @function create
     * @memberof MST.S2C_BindEmail
     * @static
     * @param {MST.IS2C_BindEmail=} [properties] Properties to set
     * @returns {MST.S2C_BindEmail} S2C_BindEmail instance
     */

    S2C_BindEmail.create = function create(properties) {
      return new S2C_BindEmail(properties);
    };
    /**
     * Encodes the specified S2C_BindEmail message. Does not implicitly {@link MST.S2C_BindEmail.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_BindEmail
     * @static
     * @param {MST.IS2C_BindEmail} m S2C_BindEmail message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_BindEmail.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.email != null && Object.hasOwnProperty.call(m, "email")) w.uint32(26).string(m.email);
      return w;
    };
    /**
     * Decodes a S2C_BindEmail message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_BindEmail
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_BindEmail} S2C_BindEmail
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_BindEmail.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_BindEmail();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.email = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_BindEmail;
  }();

  MST.C2S_GetRegisterRewardConfig = function () {
    /**
     * Properties of a C2S_GetRegisterRewardConfig.
     * @memberof MST
     * @interface IC2S_GetRegisterRewardConfig
     * @property {number|null} [serial] C2S_GetRegisterRewardConfig serial
     */

    /**
     * Constructs a new C2S_GetRegisterRewardConfig.
     * @memberof MST
     * @classdesc Represents a C2S_GetRegisterRewardConfig.
     * @implements IC2S_GetRegisterRewardConfig
     * @constructor
     * @param {MST.IC2S_GetRegisterRewardConfig=} [p] Properties to set
     */
    function C2S_GetRegisterRewardConfig(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_GetRegisterRewardConfig serial.
     * @member {number} serial
     * @memberof MST.C2S_GetRegisterRewardConfig
     * @instance
     */


    C2S_GetRegisterRewardConfig.prototype.serial = 0;
    /**
     * Creates a new C2S_GetRegisterRewardConfig instance using the specified properties.
     * @function create
     * @memberof MST.C2S_GetRegisterRewardConfig
     * @static
     * @param {MST.IC2S_GetRegisterRewardConfig=} [properties] Properties to set
     * @returns {MST.C2S_GetRegisterRewardConfig} C2S_GetRegisterRewardConfig instance
     */

    C2S_GetRegisterRewardConfig.create = function create(properties) {
      return new C2S_GetRegisterRewardConfig(properties);
    };
    /**
     * Encodes the specified C2S_GetRegisterRewardConfig message. Does not implicitly {@link MST.C2S_GetRegisterRewardConfig.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_GetRegisterRewardConfig
     * @static
     * @param {MST.IC2S_GetRegisterRewardConfig} m C2S_GetRegisterRewardConfig message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_GetRegisterRewardConfig.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_GetRegisterRewardConfig message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_GetRegisterRewardConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_GetRegisterRewardConfig} C2S_GetRegisterRewardConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_GetRegisterRewardConfig.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_GetRegisterRewardConfig();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_GetRegisterRewardConfig;
  }();

  MST.S2C_GetRegisterRewordConfig = function () {
    /**
     * Properties of a S2C_GetRegisterRewordConfig.
     * @memberof MST
     * @interface IS2C_GetRegisterRewordConfig
     * @property {number|null} [serial] S2C_GetRegisterRewordConfig serial
     * @property {number|null} [code] S2C_GetRegisterRewordConfig code
     * @property {number|null} [firstDepositReward] S2C_GetRegisterRewordConfig firstDepositReward
     * @property {number|Long|null} [chips] S2C_GetRegisterRewordConfig chips
     * @property {number|Long|null} [registerChips] S2C_GetRegisterRewordConfig registerChips
     * @property {boolean|null} [isGetFirstDepositReward] S2C_GetRegisterRewordConfig isGetFirstDepositReward
     */

    /**
     * Constructs a new S2C_GetRegisterRewordConfig.
     * @memberof MST
     * @classdesc Represents a S2C_GetRegisterRewordConfig.
     * @implements IS2C_GetRegisterRewordConfig
     * @constructor
     * @param {MST.IS2C_GetRegisterRewordConfig=} [p] Properties to set
     */
    function S2C_GetRegisterRewordConfig(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_GetRegisterRewordConfig serial.
     * @member {number} serial
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */


    S2C_GetRegisterRewordConfig.prototype.serial = 0;
    /**
     * S2C_GetRegisterRewordConfig code.
     * @member {number} code
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */

    S2C_GetRegisterRewordConfig.prototype.code = 0;
    /**
     * S2C_GetRegisterRewordConfig firstDepositReward.
     * @member {number} firstDepositReward
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */

    S2C_GetRegisterRewordConfig.prototype.firstDepositReward = 0;
    /**
     * S2C_GetRegisterRewordConfig chips.
     * @member {number|Long} chips
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */

    S2C_GetRegisterRewordConfig.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_GetRegisterRewordConfig registerChips.
     * @member {number|Long} registerChips
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */

    S2C_GetRegisterRewordConfig.prototype.registerChips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_GetRegisterRewordConfig isGetFirstDepositReward.
     * @member {boolean} isGetFirstDepositReward
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @instance
     */

    S2C_GetRegisterRewordConfig.prototype.isGetFirstDepositReward = false;
    /**
     * Creates a new S2C_GetRegisterRewordConfig instance using the specified properties.
     * @function create
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @static
     * @param {MST.IS2C_GetRegisterRewordConfig=} [properties] Properties to set
     * @returns {MST.S2C_GetRegisterRewordConfig} S2C_GetRegisterRewordConfig instance
     */

    S2C_GetRegisterRewordConfig.create = function create(properties) {
      return new S2C_GetRegisterRewordConfig(properties);
    };
    /**
     * Encodes the specified S2C_GetRegisterRewordConfig message. Does not implicitly {@link MST.S2C_GetRegisterRewordConfig.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @static
     * @param {MST.IS2C_GetRegisterRewordConfig} m S2C_GetRegisterRewordConfig message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_GetRegisterRewordConfig.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.firstDepositReward != null && Object.hasOwnProperty.call(m, "firstDepositReward")) w.uint32(24).int32(m.firstDepositReward);
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(32).int64(m.chips);
      if (m.registerChips != null && Object.hasOwnProperty.call(m, "registerChips")) w.uint32(40).int64(m.registerChips);
      if (m.isGetFirstDepositReward != null && Object.hasOwnProperty.call(m, "isGetFirstDepositReward")) w.uint32(48).bool(m.isGetFirstDepositReward);
      return w;
    };
    /**
     * Decodes a S2C_GetRegisterRewordConfig message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_GetRegisterRewordConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_GetRegisterRewordConfig} S2C_GetRegisterRewordConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_GetRegisterRewordConfig.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_GetRegisterRewordConfig();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.firstDepositReward = r.int32();
            break;

          case 4:
            m.chips = r.int64();
            break;

          case 5:
            m.registerChips = r.int64();
            break;

          case 6:
            m.isGetFirstDepositReward = r.bool();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_GetRegisterRewordConfig;
  }();

  MST.PromotionDataInfo = function () {
    /**
     * Properties of a PromotionDataInfo.
     * @memberof MST
     * @interface IPromotionDataInfo
     * @property {number|Long|null} [totalIncomeGold] PromotionDataInfo totalIncomeGold
     * @property {number|Long|null} [totalWithdrawGold] PromotionDataInfo totalWithdrawGold
     * @property {number|Long|null} [ayerIncomeGold] PromotionDataInfo ayerIncomeGold
     * @property {number|null} [ayerInvitationCount] PromotionDataInfo ayerInvitationCount
     * @property {number|null} [totalInvitationCount] PromotionDataInfo totalInvitationCount
     * @property {number|Long|null} [lastUpdateTime] PromotionDataInfo lastUpdateTime
     */

    /**
     * Constructs a new PromotionDataInfo.
     * @memberof MST
     * @classdesc Represents a PromotionDataInfo.
     * @implements IPromotionDataInfo
     * @constructor
     * @param {MST.IPromotionDataInfo=} [p] Properties to set
     */
    function PromotionDataInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * PromotionDataInfo totalIncomeGold.
     * @member {number|Long} totalIncomeGold
     * @memberof MST.PromotionDataInfo
     * @instance
     */


    PromotionDataInfo.prototype.totalIncomeGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * PromotionDataInfo totalWithdrawGold.
     * @member {number|Long} totalWithdrawGold
     * @memberof MST.PromotionDataInfo
     * @instance
     */

    PromotionDataInfo.prototype.totalWithdrawGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * PromotionDataInfo ayerIncomeGold.
     * @member {number|Long} ayerIncomeGold
     * @memberof MST.PromotionDataInfo
     * @instance
     */

    PromotionDataInfo.prototype.ayerIncomeGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * PromotionDataInfo ayerInvitationCount.
     * @member {number} ayerInvitationCount
     * @memberof MST.PromotionDataInfo
     * @instance
     */

    PromotionDataInfo.prototype.ayerInvitationCount = 0;
    /**
     * PromotionDataInfo totalInvitationCount.
     * @member {number} totalInvitationCount
     * @memberof MST.PromotionDataInfo
     * @instance
     */

    PromotionDataInfo.prototype.totalInvitationCount = 0;
    /**
     * PromotionDataInfo lastUpdateTime.
     * @member {number|Long} lastUpdateTime
     * @memberof MST.PromotionDataInfo
     * @instance
     */

    PromotionDataInfo.prototype.lastUpdateTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new PromotionDataInfo instance using the specified properties.
     * @function create
     * @memberof MST.PromotionDataInfo
     * @static
     * @param {MST.IPromotionDataInfo=} [properties] Properties to set
     * @returns {MST.PromotionDataInfo} PromotionDataInfo instance
     */

    PromotionDataInfo.create = function create(properties) {
      return new PromotionDataInfo(properties);
    };
    /**
     * Encodes the specified PromotionDataInfo message. Does not implicitly {@link MST.PromotionDataInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.PromotionDataInfo
     * @static
     * @param {MST.IPromotionDataInfo} m PromotionDataInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    PromotionDataInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.totalIncomeGold != null && Object.hasOwnProperty.call(m, "totalIncomeGold")) w.uint32(8).int64(m.totalIncomeGold);
      if (m.totalWithdrawGold != null && Object.hasOwnProperty.call(m, "totalWithdrawGold")) w.uint32(16).int64(m.totalWithdrawGold);
      if (m.ayerIncomeGold != null && Object.hasOwnProperty.call(m, "ayerIncomeGold")) w.uint32(24).int64(m.ayerIncomeGold);
      if (m.ayerInvitationCount != null && Object.hasOwnProperty.call(m, "ayerInvitationCount")) w.uint32(32).int32(m.ayerInvitationCount);
      if (m.totalInvitationCount != null && Object.hasOwnProperty.call(m, "totalInvitationCount")) w.uint32(40).int32(m.totalInvitationCount);
      if (m.lastUpdateTime != null && Object.hasOwnProperty.call(m, "lastUpdateTime")) w.uint32(48).int64(m.lastUpdateTime);
      return w;
    };
    /**
     * Decodes a PromotionDataInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.PromotionDataInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.PromotionDataInfo} PromotionDataInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    PromotionDataInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.PromotionDataInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.totalIncomeGold = r.int64();
            break;

          case 2:
            m.totalWithdrawGold = r.int64();
            break;

          case 3:
            m.ayerIncomeGold = r.int64();
            break;

          case 4:
            m.ayerInvitationCount = r.int32();
            break;

          case 5:
            m.totalInvitationCount = r.int32();
            break;

          case 6:
            m.lastUpdateTime = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return PromotionDataInfo;
  }();

  MST.PromotionRankInfo = function () {
    /**
     * Properties of a PromotionRankInfo.
     * @memberof MST
     * @interface IPromotionRankInfo
     * @property {MST.IUnitInfo|null} [userInfo] PromotionRankInfo userInfo
     * @property {number|Long|null} [incomeGold] PromotionRankInfo incomeGold
     */

    /**
     * Constructs a new PromotionRankInfo.
     * @memberof MST
     * @classdesc Represents a PromotionRankInfo.
     * @implements IPromotionRankInfo
     * @constructor
     * @param {MST.IPromotionRankInfo=} [p] Properties to set
     */
    function PromotionRankInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * PromotionRankInfo userInfo.
     * @member {MST.IUnitInfo|null|undefined} userInfo
     * @memberof MST.PromotionRankInfo
     * @instance
     */


    PromotionRankInfo.prototype.userInfo = null;
    /**
     * PromotionRankInfo incomeGold.
     * @member {number|Long} incomeGold
     * @memberof MST.PromotionRankInfo
     * @instance
     */

    PromotionRankInfo.prototype.incomeGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new PromotionRankInfo instance using the specified properties.
     * @function create
     * @memberof MST.PromotionRankInfo
     * @static
     * @param {MST.IPromotionRankInfo=} [properties] Properties to set
     * @returns {MST.PromotionRankInfo} PromotionRankInfo instance
     */

    PromotionRankInfo.create = function create(properties) {
      return new PromotionRankInfo(properties);
    };
    /**
     * Encodes the specified PromotionRankInfo message. Does not implicitly {@link MST.PromotionRankInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.PromotionRankInfo
     * @static
     * @param {MST.IPromotionRankInfo} m PromotionRankInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    PromotionRankInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.userInfo != null && Object.hasOwnProperty.call(m, "userInfo")) $root.MST.UnitInfo.encode(m.userInfo, w.uint32(10).fork()).ldelim();
      if (m.incomeGold != null && Object.hasOwnProperty.call(m, "incomeGold")) w.uint32(16).int64(m.incomeGold);
      return w;
    };
    /**
     * Decodes a PromotionRankInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.PromotionRankInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.PromotionRankInfo} PromotionRankInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    PromotionRankInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.PromotionRankInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.userInfo = $root.MST.UnitInfo.decode(r, r.uint32());
            break;

          case 2:
            m.incomeGold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return PromotionRankInfo;
  }();
  /**
   * PromotionLevel enum.
   * @name MST.PromotionLevel
   * @enum {number}
   * @property {number} Level0=0 Level0 value
   * @property {number} Level1=1 Level1 value
   * @property {number} Level2=2 Level2 value
   */


  MST.PromotionLevel = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Level0"] = 0;
    values[valuesById[1] = "Level1"] = 1;
    values[valuesById[2] = "Level2"] = 2;
    return values;
  }();

  MST.C2S_PromotionInfo = function () {
    /**
     * Properties of a C2S_PromotionInfo.
     * @memberof MST
     * @interface IC2S_PromotionInfo
     * @property {number|null} [serial] C2S_PromotionInfo serial
     */

    /**
     * Constructs a new C2S_PromotionInfo.
     * @memberof MST
     * @classdesc Represents a C2S_PromotionInfo.
     * @implements IC2S_PromotionInfo
     * @constructor
     * @param {MST.IC2S_PromotionInfo=} [p] Properties to set
     */
    function C2S_PromotionInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_PromotionInfo serial.
     * @member {number} serial
     * @memberof MST.C2S_PromotionInfo
     * @instance
     */


    C2S_PromotionInfo.prototype.serial = 0;
    /**
     * Creates a new C2S_PromotionInfo instance using the specified properties.
     * @function create
     * @memberof MST.C2S_PromotionInfo
     * @static
     * @param {MST.IC2S_PromotionInfo=} [properties] Properties to set
     * @returns {MST.C2S_PromotionInfo} C2S_PromotionInfo instance
     */

    C2S_PromotionInfo.create = function create(properties) {
      return new C2S_PromotionInfo(properties);
    };
    /**
     * Encodes the specified C2S_PromotionInfo message. Does not implicitly {@link MST.C2S_PromotionInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_PromotionInfo
     * @static
     * @param {MST.IC2S_PromotionInfo} m C2S_PromotionInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_PromotionInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_PromotionInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_PromotionInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_PromotionInfo} C2S_PromotionInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_PromotionInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_PromotionInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_PromotionInfo;
  }();

  MST.S2C_PromotionInfo = function () {
    /**
     * Properties of a S2C_PromotionInfo.
     * @memberof MST
     * @interface IS2C_PromotionInfo
     * @property {number|null} [serial] S2C_PromotionInfo serial
     * @property {number|null} [code] S2C_PromotionInfo code
     * @property {number|null} [level] S2C_PromotionInfo level
     * @property {number|null} [levelPercent] S2C_PromotionInfo levelPercent
     * @property {MST.IPromotionDataInfo|null} [promotionDataInfo] S2C_PromotionInfo promotionDataInfo
     * @property {Array.<number|Long>|null} [incomeList] S2C_PromotionInfo incomeList
     * @property {Array.<number>|null} [registerCountList] S2C_PromotionInfo registerCountList
     * @property {Array.<number>|null} [validCountList] S2C_PromotionInfo validCountList
     * @property {Array.<MST.IPromotionRankInfo>|null} [promotionRankInfo] S2C_PromotionInfo promotionRankInfo
     */

    /**
     * Constructs a new S2C_PromotionInfo.
     * @memberof MST
     * @classdesc Represents a S2C_PromotionInfo.
     * @implements IS2C_PromotionInfo
     * @constructor
     * @param {MST.IS2C_PromotionInfo=} [p] Properties to set
     */
    function S2C_PromotionInfo(p) {
      this.incomeList = [];
      this.registerCountList = [];
      this.validCountList = [];
      this.promotionRankInfo = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_PromotionInfo serial.
     * @member {number} serial
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */


    S2C_PromotionInfo.prototype.serial = 0;
    /**
     * S2C_PromotionInfo code.
     * @member {number} code
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.code = 0;
    /**
     * S2C_PromotionInfo level.
     * @member {number} level
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.level = 0;
    /**
     * S2C_PromotionInfo levelPercent.
     * @member {number} levelPercent
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.levelPercent = 0;
    /**
     * S2C_PromotionInfo promotionDataInfo.
     * @member {MST.IPromotionDataInfo|null|undefined} promotionDataInfo
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.promotionDataInfo = null;
    /**
     * S2C_PromotionInfo incomeList.
     * @member {Array.<number|Long>} incomeList
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.incomeList = $util.emptyArray;
    /**
     * S2C_PromotionInfo registerCountList.
     * @member {Array.<number>} registerCountList
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.registerCountList = $util.emptyArray;
    /**
     * S2C_PromotionInfo validCountList.
     * @member {Array.<number>} validCountList
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.validCountList = $util.emptyArray;
    /**
     * S2C_PromotionInfo promotionRankInfo.
     * @member {Array.<MST.IPromotionRankInfo>} promotionRankInfo
     * @memberof MST.S2C_PromotionInfo
     * @instance
     */

    S2C_PromotionInfo.prototype.promotionRankInfo = $util.emptyArray;
    /**
     * Creates a new S2C_PromotionInfo instance using the specified properties.
     * @function create
     * @memberof MST.S2C_PromotionInfo
     * @static
     * @param {MST.IS2C_PromotionInfo=} [properties] Properties to set
     * @returns {MST.S2C_PromotionInfo} S2C_PromotionInfo instance
     */

    S2C_PromotionInfo.create = function create(properties) {
      return new S2C_PromotionInfo(properties);
    };
    /**
     * Encodes the specified S2C_PromotionInfo message. Does not implicitly {@link MST.S2C_PromotionInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_PromotionInfo
     * @static
     * @param {MST.IS2C_PromotionInfo} m S2C_PromotionInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_PromotionInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.level != null && Object.hasOwnProperty.call(m, "level")) w.uint32(24).int32(m.level);
      if (m.levelPercent != null && Object.hasOwnProperty.call(m, "levelPercent")) w.uint32(32).int32(m.levelPercent);
      if (m.promotionDataInfo != null && Object.hasOwnProperty.call(m, "promotionDataInfo")) $root.MST.PromotionDataInfo.encode(m.promotionDataInfo, w.uint32(42).fork()).ldelim();

      if (m.incomeList != null && m.incomeList.length) {
        w.uint32(50).fork();

        for (var i = 0; i < m.incomeList.length; ++i) {
          w.int64(m.incomeList[i]);
        }

        w.ldelim();
      }

      if (m.registerCountList != null && m.registerCountList.length) {
        w.uint32(58).fork();

        for (var i = 0; i < m.registerCountList.length; ++i) {
          w.int32(m.registerCountList[i]);
        }

        w.ldelim();
      }

      if (m.validCountList != null && m.validCountList.length) {
        w.uint32(66).fork();

        for (var i = 0; i < m.validCountList.length; ++i) {
          w.int32(m.validCountList[i]);
        }

        w.ldelim();
      }

      if (m.promotionRankInfo != null && m.promotionRankInfo.length) {
        for (var i = 0; i < m.promotionRankInfo.length; ++i) {
          $root.MST.PromotionRankInfo.encode(m.promotionRankInfo[i], w.uint32(74).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a S2C_PromotionInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_PromotionInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_PromotionInfo} S2C_PromotionInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_PromotionInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_PromotionInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.level = r.int32();
            break;

          case 4:
            m.levelPercent = r.int32();
            break;

          case 5:
            m.promotionDataInfo = $root.MST.PromotionDataInfo.decode(r, r.uint32());
            break;

          case 6:
            if (!(m.incomeList && m.incomeList.length)) m.incomeList = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.incomeList.push(r.int64());
              }
            } else m.incomeList.push(r.int64());

            break;

          case 7:
            if (!(m.registerCountList && m.registerCountList.length)) m.registerCountList = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.registerCountList.push(r.int32());
              }
            } else m.registerCountList.push(r.int32());

            break;

          case 8:
            if (!(m.validCountList && m.validCountList.length)) m.validCountList = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.validCountList.push(r.int32());
              }
            } else m.validCountList.push(r.int32());

            break;

          case 9:
            if (!(m.promotionRankInfo && m.promotionRankInfo.length)) m.promotionRankInfo = [];
            m.promotionRankInfo.push($root.MST.PromotionRankInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_PromotionInfo;
  }();

  MST.C2S_ModifyAvartar = function () {
    /**
     * Properties of a C2S_ModifyAvartar.
     * @memberof MST
     * @interface IC2S_ModifyAvartar
     * @property {number|null} [serial] C2S_ModifyAvartar serial
     * @property {string|null} [avartar] C2S_ModifyAvartar avartar
     */

    /**
     * Constructs a new C2S_ModifyAvartar.
     * @memberof MST
     * @classdesc Represents a C2S_ModifyAvartar.
     * @implements IC2S_ModifyAvartar
     * @constructor
     * @param {MST.IC2S_ModifyAvartar=} [p] Properties to set
     */
    function C2S_ModifyAvartar(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_ModifyAvartar serial.
     * @member {number} serial
     * @memberof MST.C2S_ModifyAvartar
     * @instance
     */


    C2S_ModifyAvartar.prototype.serial = 0;
    /**
     * C2S_ModifyAvartar avartar.
     * @member {string} avartar
     * @memberof MST.C2S_ModifyAvartar
     * @instance
     */

    C2S_ModifyAvartar.prototype.avartar = "";
    /**
     * Creates a new C2S_ModifyAvartar instance using the specified properties.
     * @function create
     * @memberof MST.C2S_ModifyAvartar
     * @static
     * @param {MST.IC2S_ModifyAvartar=} [properties] Properties to set
     * @returns {MST.C2S_ModifyAvartar} C2S_ModifyAvartar instance
     */

    C2S_ModifyAvartar.create = function create(properties) {
      return new C2S_ModifyAvartar(properties);
    };
    /**
     * Encodes the specified C2S_ModifyAvartar message. Does not implicitly {@link MST.C2S_ModifyAvartar.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_ModifyAvartar
     * @static
     * @param {MST.IC2S_ModifyAvartar} m C2S_ModifyAvartar message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_ModifyAvartar.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.avartar != null && Object.hasOwnProperty.call(m, "avartar")) w.uint32(18).string(m.avartar);
      return w;
    };
    /**
     * Decodes a C2S_ModifyAvartar message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_ModifyAvartar
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_ModifyAvartar} C2S_ModifyAvartar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_ModifyAvartar.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_ModifyAvartar();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.avartar = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_ModifyAvartar;
  }();

  MST.S2C_ModifyAvartar = function () {
    /**
     * Properties of a S2C_ModifyAvartar.
     * @memberof MST
     * @interface IS2C_ModifyAvartar
     * @property {number|null} [serial] S2C_ModifyAvartar serial
     * @property {number|null} [code] S2C_ModifyAvartar code
     * @property {string|null} [avartar] S2C_ModifyAvartar avartar
     */

    /**
     * Constructs a new S2C_ModifyAvartar.
     * @memberof MST
     * @classdesc Represents a S2C_ModifyAvartar.
     * @implements IS2C_ModifyAvartar
     * @constructor
     * @param {MST.IS2C_ModifyAvartar=} [p] Properties to set
     */
    function S2C_ModifyAvartar(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_ModifyAvartar serial.
     * @member {number} serial
     * @memberof MST.S2C_ModifyAvartar
     * @instance
     */


    S2C_ModifyAvartar.prototype.serial = 0;
    /**
     * S2C_ModifyAvartar code.
     * @member {number} code
     * @memberof MST.S2C_ModifyAvartar
     * @instance
     */

    S2C_ModifyAvartar.prototype.code = 0;
    /**
     * S2C_ModifyAvartar avartar.
     * @member {string} avartar
     * @memberof MST.S2C_ModifyAvartar
     * @instance
     */

    S2C_ModifyAvartar.prototype.avartar = "";
    /**
     * Creates a new S2C_ModifyAvartar instance using the specified properties.
     * @function create
     * @memberof MST.S2C_ModifyAvartar
     * @static
     * @param {MST.IS2C_ModifyAvartar=} [properties] Properties to set
     * @returns {MST.S2C_ModifyAvartar} S2C_ModifyAvartar instance
     */

    S2C_ModifyAvartar.create = function create(properties) {
      return new S2C_ModifyAvartar(properties);
    };
    /**
     * Encodes the specified S2C_ModifyAvartar message. Does not implicitly {@link MST.S2C_ModifyAvartar.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_ModifyAvartar
     * @static
     * @param {MST.IS2C_ModifyAvartar} m S2C_ModifyAvartar message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_ModifyAvartar.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.avartar != null && Object.hasOwnProperty.call(m, "avartar")) w.uint32(26).string(m.avartar);
      return w;
    };
    /**
     * Decodes a S2C_ModifyAvartar message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_ModifyAvartar
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_ModifyAvartar} S2C_ModifyAvartar
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_ModifyAvartar.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_ModifyAvartar();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.avartar = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_ModifyAvartar;
  }();

  MST.C2S_GetDepositList = function () {
    /**
     * Properties of a C2S_GetDepositList.
     * @memberof MST
     * @interface IC2S_GetDepositList
     * @property {number|null} [serial] C2S_GetDepositList serial
     * @property {number|null} [index] C2S_GetDepositList index
     * @property {number|null} [limit] C2S_GetDepositList limit
     */

    /**
     * Constructs a new C2S_GetDepositList.
     * @memberof MST
     * @classdesc Represents a C2S_GetDepositList.
     * @implements IC2S_GetDepositList
     * @constructor
     * @param {MST.IC2S_GetDepositList=} [p] Properties to set
     */
    function C2S_GetDepositList(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_GetDepositList serial.
     * @member {number} serial
     * @memberof MST.C2S_GetDepositList
     * @instance
     */


    C2S_GetDepositList.prototype.serial = 0;
    /**
     * C2S_GetDepositList index.
     * @member {number} index
     * @memberof MST.C2S_GetDepositList
     * @instance
     */

    C2S_GetDepositList.prototype.index = 0;
    /**
     * C2S_GetDepositList limit.
     * @member {number} limit
     * @memberof MST.C2S_GetDepositList
     * @instance
     */

    C2S_GetDepositList.prototype.limit = 0;
    /**
     * Creates a new C2S_GetDepositList instance using the specified properties.
     * @function create
     * @memberof MST.C2S_GetDepositList
     * @static
     * @param {MST.IC2S_GetDepositList=} [properties] Properties to set
     * @returns {MST.C2S_GetDepositList} C2S_GetDepositList instance
     */

    C2S_GetDepositList.create = function create(properties) {
      return new C2S_GetDepositList(properties);
    };
    /**
     * Encodes the specified C2S_GetDepositList message. Does not implicitly {@link MST.C2S_GetDepositList.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_GetDepositList
     * @static
     * @param {MST.IC2S_GetDepositList} m C2S_GetDepositList message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_GetDepositList.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(16).int32(m.index);
      if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(24).int32(m.limit);
      return w;
    };
    /**
     * Decodes a C2S_GetDepositList message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_GetDepositList
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_GetDepositList} C2S_GetDepositList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_GetDepositList.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_GetDepositList();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.index = r.int32();
            break;

          case 3:
            m.limit = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_GetDepositList;
  }();

  MST.DepositRecord = function () {
    /**
     * Properties of a DepositRecord.
     * @memberof MST
     * @interface IDepositRecord
     * @property {string|null} [orderId] DepositRecord orderId
     * @property {number|Long|null} [amount] DepositRecord amount
     * @property {number|Long|null} [chips] DepositRecord chips
     * @property {number|Long|null} [fee] DepositRecord fee
     * @property {string|null} [status] DepositRecord status
     * @property {number|Long|null} [depositTime] DepositRecord depositTime
     */

    /**
     * Constructs a new DepositRecord.
     * @memberof MST
     * @classdesc Represents a DepositRecord.
     * @implements IDepositRecord
     * @constructor
     * @param {MST.IDepositRecord=} [p] Properties to set
     */
    function DepositRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * DepositRecord orderId.
     * @member {string} orderId
     * @memberof MST.DepositRecord
     * @instance
     */


    DepositRecord.prototype.orderId = "";
    /**
     * DepositRecord amount.
     * @member {number|Long} amount
     * @memberof MST.DepositRecord
     * @instance
     */

    DepositRecord.prototype.amount = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * DepositRecord chips.
     * @member {number|Long} chips
     * @memberof MST.DepositRecord
     * @instance
     */

    DepositRecord.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * DepositRecord fee.
     * @member {number|Long} fee
     * @memberof MST.DepositRecord
     * @instance
     */

    DepositRecord.prototype.fee = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * DepositRecord status.
     * @member {string} status
     * @memberof MST.DepositRecord
     * @instance
     */

    DepositRecord.prototype.status = "";
    /**
     * DepositRecord depositTime.
     * @member {number|Long} depositTime
     * @memberof MST.DepositRecord
     * @instance
     */

    DepositRecord.prototype.depositTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new DepositRecord instance using the specified properties.
     * @function create
     * @memberof MST.DepositRecord
     * @static
     * @param {MST.IDepositRecord=} [properties] Properties to set
     * @returns {MST.DepositRecord} DepositRecord instance
     */

    DepositRecord.create = function create(properties) {
      return new DepositRecord(properties);
    };
    /**
     * Encodes the specified DepositRecord message. Does not implicitly {@link MST.DepositRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.DepositRecord
     * @static
     * @param {MST.IDepositRecord} m DepositRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    DepositRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.orderId != null && Object.hasOwnProperty.call(m, "orderId")) w.uint32(10).string(m.orderId);
      if (m.amount != null && Object.hasOwnProperty.call(m, "amount")) w.uint32(16).int64(m.amount);
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(24).int64(m.chips);
      if (m.fee != null && Object.hasOwnProperty.call(m, "fee")) w.uint32(32).int64(m.fee);
      if (m.status != null && Object.hasOwnProperty.call(m, "status")) w.uint32(42).string(m.status);
      if (m.depositTime != null && Object.hasOwnProperty.call(m, "depositTime")) w.uint32(48).int64(m.depositTime);
      return w;
    };
    /**
     * Decodes a DepositRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.DepositRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.DepositRecord} DepositRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    DepositRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.DepositRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.orderId = r.string();
            break;

          case 2:
            m.amount = r.int64();
            break;

          case 3:
            m.chips = r.int64();
            break;

          case 4:
            m.fee = r.int64();
            break;

          case 5:
            m.status = r.string();
            break;

          case 6:
            m.depositTime = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return DepositRecord;
  }();

  MST.S2C_GetDepositList = function () {
    /**
     * Properties of a S2C_GetDepositList.
     * @memberof MST
     * @interface IS2C_GetDepositList
     * @property {number|null} [serial] S2C_GetDepositList serial
     * @property {number|null} [code] S2C_GetDepositList code
     * @property {Array.<MST.IDepositRecord>|null} [records] S2C_GetDepositList records
     * @property {number|null} [index] S2C_GetDepositList index
     */

    /**
     * Constructs a new S2C_GetDepositList.
     * @memberof MST
     * @classdesc Represents a S2C_GetDepositList.
     * @implements IS2C_GetDepositList
     * @constructor
     * @param {MST.IS2C_GetDepositList=} [p] Properties to set
     */
    function S2C_GetDepositList(p) {
      this.records = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_GetDepositList serial.
     * @member {number} serial
     * @memberof MST.S2C_GetDepositList
     * @instance
     */


    S2C_GetDepositList.prototype.serial = 0;
    /**
     * S2C_GetDepositList code.
     * @member {number} code
     * @memberof MST.S2C_GetDepositList
     * @instance
     */

    S2C_GetDepositList.prototype.code = 0;
    /**
     * S2C_GetDepositList records.
     * @member {Array.<MST.IDepositRecord>} records
     * @memberof MST.S2C_GetDepositList
     * @instance
     */

    S2C_GetDepositList.prototype.records = $util.emptyArray;
    /**
     * S2C_GetDepositList index.
     * @member {number} index
     * @memberof MST.S2C_GetDepositList
     * @instance
     */

    S2C_GetDepositList.prototype.index = 0;
    /**
     * Creates a new S2C_GetDepositList instance using the specified properties.
     * @function create
     * @memberof MST.S2C_GetDepositList
     * @static
     * @param {MST.IS2C_GetDepositList=} [properties] Properties to set
     * @returns {MST.S2C_GetDepositList} S2C_GetDepositList instance
     */

    S2C_GetDepositList.create = function create(properties) {
      return new S2C_GetDepositList(properties);
    };
    /**
     * Encodes the specified S2C_GetDepositList message. Does not implicitly {@link MST.S2C_GetDepositList.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_GetDepositList
     * @static
     * @param {MST.IS2C_GetDepositList} m S2C_GetDepositList message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_GetDepositList.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);

      if (m.records != null && m.records.length) {
        for (var i = 0; i < m.records.length; ++i) {
          $root.MST.DepositRecord.encode(m.records[i], w.uint32(26).fork()).ldelim();
        }
      }

      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(32).int32(m.index);
      return w;
    };
    /**
     * Decodes a S2C_GetDepositList message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_GetDepositList
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_GetDepositList} S2C_GetDepositList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_GetDepositList.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_GetDepositList();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            if (!(m.records && m.records.length)) m.records = [];
            m.records.push($root.MST.DepositRecord.decode(r, r.uint32()));
            break;

          case 4:
            m.index = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_GetDepositList;
  }();

  MST.C2S_GetMissionList = function () {
    /**
     * Properties of a C2S_GetMissionList.
     * @memberof MST
     * @interface IC2S_GetMissionList
     * @property {number|null} [serial] C2S_GetMissionList serial
     */

    /**
     * Constructs a new C2S_GetMissionList.
     * @memberof MST
     * @classdesc Represents a C2S_GetMissionList.
     * @implements IC2S_GetMissionList
     * @constructor
     * @param {MST.IC2S_GetMissionList=} [p] Properties to set
     */
    function C2S_GetMissionList(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_GetMissionList serial.
     * @member {number} serial
     * @memberof MST.C2S_GetMissionList
     * @instance
     */


    C2S_GetMissionList.prototype.serial = 0;
    /**
     * Creates a new C2S_GetMissionList instance using the specified properties.
     * @function create
     * @memberof MST.C2S_GetMissionList
     * @static
     * @param {MST.IC2S_GetMissionList=} [properties] Properties to set
     * @returns {MST.C2S_GetMissionList} C2S_GetMissionList instance
     */

    C2S_GetMissionList.create = function create(properties) {
      return new C2S_GetMissionList(properties);
    };
    /**
     * Encodes the specified C2S_GetMissionList message. Does not implicitly {@link MST.C2S_GetMissionList.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_GetMissionList
     * @static
     * @param {MST.IC2S_GetMissionList} m C2S_GetMissionList message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_GetMissionList.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      return w;
    };
    /**
     * Decodes a C2S_GetMissionList message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_GetMissionList
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_GetMissionList} C2S_GetMissionList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_GetMissionList.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_GetMissionList();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_GetMissionList;
  }();
  /**
   * MissionType enum.
   * @name MST.MissionType
   * @enum {number}
   * @property {number} MissionSevenSignInType=0 MissionSevenSignInType value
   * @property {number} MissionThirtySignInType=1 MissionThirtySignInType value
   * @property {number} MissionDepositType=2 MissionDepositType value
   * @property {number} MissionPromotionType=3 MissionPromotionType value
   * @property {number} MissionPromotionDepositType=4 MissionPromotionDepositType value
   */


  MST.MissionType = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "MissionSevenSignInType"] = 0;
    values[valuesById[1] = "MissionThirtySignInType"] = 1;
    values[valuesById[2] = "MissionDepositType"] = 2;
    values[valuesById[3] = "MissionPromotionType"] = 3;
    values[valuesById[4] = "MissionPromotionDepositType"] = 4;
    return values;
  }();

  MST.MissionInfo = function () {
    /**
     * Properties of a MissionInfo.
     * @memberof MST
     * @interface IMissionInfo
     * @property {number|null} [missionId] MissionInfo missionId
     * @property {number|Long|null} [endTime] MissionInfo endTime
     * @property {number|Long|null} [targetProgress] MissionInfo targetProgress
     * @property {number|Long|null} [curProgress] MissionInfo curProgress
     * @property {number|Long|null} [reward] MissionInfo reward
     * @property {string|null} [iconUrl] MissionInfo iconUrl
     * @property {number|Long|null} [beginTime] MissionInfo beginTime
     */

    /**
     * Constructs a new MissionInfo.
     * @memberof MST
     * @classdesc Represents a MissionInfo.
     * @implements IMissionInfo
     * @constructor
     * @param {MST.IMissionInfo=} [p] Properties to set
     */
    function MissionInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * MissionInfo missionId.
     * @member {number} missionId
     * @memberof MST.MissionInfo
     * @instance
     */


    MissionInfo.prototype.missionId = 0;
    /**
     * MissionInfo endTime.
     * @member {number|Long} endTime
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.endTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MissionInfo targetProgress.
     * @member {number|Long} targetProgress
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.targetProgress = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MissionInfo curProgress.
     * @member {number|Long} curProgress
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.curProgress = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MissionInfo reward.
     * @member {number|Long} reward
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.reward = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * MissionInfo iconUrl.
     * @member {string} iconUrl
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.iconUrl = "";
    /**
     * MissionInfo beginTime.
     * @member {number|Long} beginTime
     * @memberof MST.MissionInfo
     * @instance
     */

    MissionInfo.prototype.beginTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new MissionInfo instance using the specified properties.
     * @function create
     * @memberof MST.MissionInfo
     * @static
     * @param {MST.IMissionInfo=} [properties] Properties to set
     * @returns {MST.MissionInfo} MissionInfo instance
     */

    MissionInfo.create = function create(properties) {
      return new MissionInfo(properties);
    };
    /**
     * Encodes the specified MissionInfo message. Does not implicitly {@link MST.MissionInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.MissionInfo
     * @static
     * @param {MST.IMissionInfo} m MissionInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    MissionInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.missionId != null && Object.hasOwnProperty.call(m, "missionId")) w.uint32(8).int32(m.missionId);
      if (m.endTime != null && Object.hasOwnProperty.call(m, "endTime")) w.uint32(16).int64(m.endTime);
      if (m.targetProgress != null && Object.hasOwnProperty.call(m, "targetProgress")) w.uint32(24).int64(m.targetProgress);
      if (m.curProgress != null && Object.hasOwnProperty.call(m, "curProgress")) w.uint32(32).int64(m.curProgress);
      if (m.reward != null && Object.hasOwnProperty.call(m, "reward")) w.uint32(40).int64(m.reward);
      if (m.iconUrl != null && Object.hasOwnProperty.call(m, "iconUrl")) w.uint32(50).string(m.iconUrl);
      if (m.beginTime != null && Object.hasOwnProperty.call(m, "beginTime")) w.uint32(56).int64(m.beginTime);
      return w;
    };
    /**
     * Decodes a MissionInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.MissionInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.MissionInfo} MissionInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    MissionInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.MissionInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.missionId = r.int32();
            break;

          case 2:
            m.endTime = r.int64();
            break;

          case 3:
            m.targetProgress = r.int64();
            break;

          case 4:
            m.curProgress = r.int64();
            break;

          case 5:
            m.reward = r.int64();
            break;

          case 6:
            m.iconUrl = r.string();
            break;

          case 7:
            m.beginTime = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return MissionInfo;
  }();

  MST.S2C_GetMissionList = function () {
    /**
     * Properties of a S2C_GetMissionList.
     * @memberof MST
     * @interface IS2C_GetMissionList
     * @property {number|null} [serial] S2C_GetMissionList serial
     * @property {number|null} [code] S2C_GetMissionList code
     * @property {Array.<MST.IMissionInfo>|null} [info] S2C_GetMissionList info
     */

    /**
     * Constructs a new S2C_GetMissionList.
     * @memberof MST
     * @classdesc Represents a S2C_GetMissionList.
     * @implements IS2C_GetMissionList
     * @constructor
     * @param {MST.IS2C_GetMissionList=} [p] Properties to set
     */
    function S2C_GetMissionList(p) {
      this.info = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_GetMissionList serial.
     * @member {number} serial
     * @memberof MST.S2C_GetMissionList
     * @instance
     */


    S2C_GetMissionList.prototype.serial = 0;
    /**
     * S2C_GetMissionList code.
     * @member {number} code
     * @memberof MST.S2C_GetMissionList
     * @instance
     */

    S2C_GetMissionList.prototype.code = 0;
    /**
     * S2C_GetMissionList info.
     * @member {Array.<MST.IMissionInfo>} info
     * @memberof MST.S2C_GetMissionList
     * @instance
     */

    S2C_GetMissionList.prototype.info = $util.emptyArray;
    /**
     * Creates a new S2C_GetMissionList instance using the specified properties.
     * @function create
     * @memberof MST.S2C_GetMissionList
     * @static
     * @param {MST.IS2C_GetMissionList=} [properties] Properties to set
     * @returns {MST.S2C_GetMissionList} S2C_GetMissionList instance
     */

    S2C_GetMissionList.create = function create(properties) {
      return new S2C_GetMissionList(properties);
    };
    /**
     * Encodes the specified S2C_GetMissionList message. Does not implicitly {@link MST.S2C_GetMissionList.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_GetMissionList
     * @static
     * @param {MST.IS2C_GetMissionList} m S2C_GetMissionList message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_GetMissionList.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);

      if (m.info != null && m.info.length) {
        for (var i = 0; i < m.info.length; ++i) {
          $root.MST.MissionInfo.encode(m.info[i], w.uint32(26).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a S2C_GetMissionList message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_GetMissionList
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_GetMissionList} S2C_GetMissionList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_GetMissionList.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_GetMissionList();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            if (!(m.info && m.info.length)) m.info = [];
            m.info.push($root.MST.MissionInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_GetMissionList;
  }();

  MST.C2S_MissionClaim = function () {
    /**
     * Properties of a C2S_MissionClaim.
     * @memberof MST
     * @interface IC2S_MissionClaim
     * @property {number|null} [serial] C2S_MissionClaim serial
     * @property {number|null} [missionId] C2S_MissionClaim missionId
     */

    /**
     * Constructs a new C2S_MissionClaim.
     * @memberof MST
     * @classdesc Represents a C2S_MissionClaim.
     * @implements IC2S_MissionClaim
     * @constructor
     * @param {MST.IC2S_MissionClaim=} [p] Properties to set
     */
    function C2S_MissionClaim(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_MissionClaim serial.
     * @member {number} serial
     * @memberof MST.C2S_MissionClaim
     * @instance
     */


    C2S_MissionClaim.prototype.serial = 0;
    /**
     * C2S_MissionClaim missionId.
     * @member {number} missionId
     * @memberof MST.C2S_MissionClaim
     * @instance
     */

    C2S_MissionClaim.prototype.missionId = 0;
    /**
     * Creates a new C2S_MissionClaim instance using the specified properties.
     * @function create
     * @memberof MST.C2S_MissionClaim
     * @static
     * @param {MST.IC2S_MissionClaim=} [properties] Properties to set
     * @returns {MST.C2S_MissionClaim} C2S_MissionClaim instance
     */

    C2S_MissionClaim.create = function create(properties) {
      return new C2S_MissionClaim(properties);
    };
    /**
     * Encodes the specified C2S_MissionClaim message. Does not implicitly {@link MST.C2S_MissionClaim.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_MissionClaim
     * @static
     * @param {MST.IC2S_MissionClaim} m C2S_MissionClaim message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_MissionClaim.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.missionId != null && Object.hasOwnProperty.call(m, "missionId")) w.uint32(16).int32(m.missionId);
      return w;
    };
    /**
     * Decodes a C2S_MissionClaim message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_MissionClaim
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_MissionClaim} C2S_MissionClaim
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_MissionClaim.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_MissionClaim();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.missionId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_MissionClaim;
  }();

  MST.S2C_MissionClaim = function () {
    /**
     * Properties of a S2C_MissionClaim.
     * @memberof MST
     * @interface IS2C_MissionClaim
     * @property {number|null} [serial] S2C_MissionClaim serial
     * @property {number|null} [code] S2C_MissionClaim code
     * @property {number|Long|null} [reward] S2C_MissionClaim reward
     * @property {number|null} [missionId] S2C_MissionClaim missionId
     */

    /**
     * Constructs a new S2C_MissionClaim.
     * @memberof MST
     * @classdesc Represents a S2C_MissionClaim.
     * @implements IS2C_MissionClaim
     * @constructor
     * @param {MST.IS2C_MissionClaim=} [p] Properties to set
     */
    function S2C_MissionClaim(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_MissionClaim serial.
     * @member {number} serial
     * @memberof MST.S2C_MissionClaim
     * @instance
     */


    S2C_MissionClaim.prototype.serial = 0;
    /**
     * S2C_MissionClaim code.
     * @member {number} code
     * @memberof MST.S2C_MissionClaim
     * @instance
     */

    S2C_MissionClaim.prototype.code = 0;
    /**
     * S2C_MissionClaim reward.
     * @member {number|Long} reward
     * @memberof MST.S2C_MissionClaim
     * @instance
     */

    S2C_MissionClaim.prototype.reward = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * S2C_MissionClaim missionId.
     * @member {number} missionId
     * @memberof MST.S2C_MissionClaim
     * @instance
     */

    S2C_MissionClaim.prototype.missionId = 0;
    /**
     * Creates a new S2C_MissionClaim instance using the specified properties.
     * @function create
     * @memberof MST.S2C_MissionClaim
     * @static
     * @param {MST.IS2C_MissionClaim=} [properties] Properties to set
     * @returns {MST.S2C_MissionClaim} S2C_MissionClaim instance
     */

    S2C_MissionClaim.create = function create(properties) {
      return new S2C_MissionClaim(properties);
    };
    /**
     * Encodes the specified S2C_MissionClaim message. Does not implicitly {@link MST.S2C_MissionClaim.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_MissionClaim
     * @static
     * @param {MST.IS2C_MissionClaim} m S2C_MissionClaim message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_MissionClaim.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.reward != null && Object.hasOwnProperty.call(m, "reward")) w.uint32(24).int64(m.reward);
      if (m.missionId != null && Object.hasOwnProperty.call(m, "missionId")) w.uint32(32).int32(m.missionId);
      return w;
    };
    /**
     * Decodes a S2C_MissionClaim message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_MissionClaim
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_MissionClaim} S2C_MissionClaim
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_MissionClaim.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_MissionClaim();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.reward = r.int64();
            break;

          case 4:
            m.missionId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_MissionClaim;
  }();

  MST.S2C_MessageNotify = function () {
    /**
     * Properties of a S2C_MessageNotify.
     * @memberof MST
     * @interface IS2C_MessageNotify
     * @property {string|null} [message] S2C_MessageNotify message
     * @property {number|null} [type] S2C_MessageNotify type
     * @property {boolean|null} [isLoop] S2C_MessageNotify isLoop
     */

    /**
     * Constructs a new S2C_MessageNotify.
     * @memberof MST
     * @classdesc Represents a S2C_MessageNotify.
     * @implements IS2C_MessageNotify
     * @constructor
     * @param {MST.IS2C_MessageNotify=} [p] Properties to set
     */
    function S2C_MessageNotify(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_MessageNotify message.
     * @member {string} message
     * @memberof MST.S2C_MessageNotify
     * @instance
     */


    S2C_MessageNotify.prototype.message = "";
    /**
     * S2C_MessageNotify type.
     * @member {number} type
     * @memberof MST.S2C_MessageNotify
     * @instance
     */

    S2C_MessageNotify.prototype.type = 0;
    /**
     * S2C_MessageNotify isLoop.
     * @member {boolean} isLoop
     * @memberof MST.S2C_MessageNotify
     * @instance
     */

    S2C_MessageNotify.prototype.isLoop = false;
    /**
     * Creates a new S2C_MessageNotify instance using the specified properties.
     * @function create
     * @memberof MST.S2C_MessageNotify
     * @static
     * @param {MST.IS2C_MessageNotify=} [properties] Properties to set
     * @returns {MST.S2C_MessageNotify} S2C_MessageNotify instance
     */

    S2C_MessageNotify.create = function create(properties) {
      return new S2C_MessageNotify(properties);
    };
    /**
     * Encodes the specified S2C_MessageNotify message. Does not implicitly {@link MST.S2C_MessageNotify.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_MessageNotify
     * @static
     * @param {MST.IS2C_MessageNotify} m S2C_MessageNotify message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_MessageNotify.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.message != null && Object.hasOwnProperty.call(m, "message")) w.uint32(10).string(m.message);
      if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(16).int32(m.type);
      if (m.isLoop != null && Object.hasOwnProperty.call(m, "isLoop")) w.uint32(24).bool(m.isLoop);
      return w;
    };
    /**
     * Decodes a S2C_MessageNotify message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_MessageNotify
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_MessageNotify} S2C_MessageNotify
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_MessageNotify.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_MessageNotify();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.message = r.string();
            break;

          case 2:
            m.type = r.int32();
            break;

          case 3:
            m.isLoop = r.bool();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_MessageNotify;
  }();

  MST.M2C_CreateUnits_Mes = function () {
    /**
     * Properties of a M2C_CreateUnits_Mes.
     * @memberof MST
     * @interface IM2C_CreateUnits_Mes
     * @property {Array.<MST.IUnitInfo>|null} [Units] M2C_CreateUnits_Mes Units
     */

    /**
     * Constructs a new M2C_CreateUnits_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CreateUnits_Mes.
     * @implements IM2C_CreateUnits_Mes
     * @constructor
     * @param {MST.IM2C_CreateUnits_Mes=} [p] Properties to set
     */
    function M2C_CreateUnits_Mes(p) {
      this.Units = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CreateUnits_Mes Units.
     * @member {Array.<MST.IUnitInfo>} Units
     * @memberof MST.M2C_CreateUnits_Mes
     * @instance
     */


    M2C_CreateUnits_Mes.prototype.Units = $util.emptyArray;
    /**
     * Creates a new M2C_CreateUnits_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CreateUnits_Mes
     * @static
     * @param {MST.IM2C_CreateUnits_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CreateUnits_Mes} M2C_CreateUnits_Mes instance
     */

    M2C_CreateUnits_Mes.create = function create(properties) {
      return new M2C_CreateUnits_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CreateUnits_Mes message. Does not implicitly {@link MST.M2C_CreateUnits_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CreateUnits_Mes
     * @static
     * @param {MST.IM2C_CreateUnits_Mes} m M2C_CreateUnits_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CreateUnits_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Units != null && m.Units.length) {
        for (var i = 0; i < m.Units.length; ++i) {
          $root.MST.UnitInfo.encode(m.Units[i], w.uint32(18).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a M2C_CreateUnits_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CreateUnits_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CreateUnits_Mes} M2C_CreateUnits_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CreateUnits_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CreateUnits_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 2:
            if (!(m.Units && m.Units.length)) m.Units = [];
            m.Units.push($root.MST.UnitInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CreateUnits_Mes;
  }();

  MST.M2C_CreateMyUnit_Mes = function () {
    /**
     * Properties of a M2C_CreateMyUnit_Mes.
     * @memberof MST
     * @interface IM2C_CreateMyUnit_Mes
     * @property {MST.IUnitInfo|null} [Unit] M2C_CreateMyUnit_Mes Unit
     */

    /**
     * Constructs a new M2C_CreateMyUnit_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_CreateMyUnit_Mes.
     * @implements IM2C_CreateMyUnit_Mes
     * @constructor
     * @param {MST.IM2C_CreateMyUnit_Mes=} [p] Properties to set
     */
    function M2C_CreateMyUnit_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_CreateMyUnit_Mes Unit.
     * @member {MST.IUnitInfo|null|undefined} Unit
     * @memberof MST.M2C_CreateMyUnit_Mes
     * @instance
     */


    M2C_CreateMyUnit_Mes.prototype.Unit = null;
    /**
     * Creates a new M2C_CreateMyUnit_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_CreateMyUnit_Mes
     * @static
     * @param {MST.IM2C_CreateMyUnit_Mes=} [properties] Properties to set
     * @returns {MST.M2C_CreateMyUnit_Mes} M2C_CreateMyUnit_Mes instance
     */

    M2C_CreateMyUnit_Mes.create = function create(properties) {
      return new M2C_CreateMyUnit_Mes(properties);
    };
    /**
     * Encodes the specified M2C_CreateMyUnit_Mes message. Does not implicitly {@link MST.M2C_CreateMyUnit_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_CreateMyUnit_Mes
     * @static
     * @param {MST.IM2C_CreateMyUnit_Mes} m M2C_CreateMyUnit_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_CreateMyUnit_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Unit != null && Object.hasOwnProperty.call(m, "Unit")) $root.MST.UnitInfo.encode(m.Unit, w.uint32(10).fork()).ldelim();
      return w;
    };
    /**
     * Decodes a M2C_CreateMyUnit_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_CreateMyUnit_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_CreateMyUnit_Mes} M2C_CreateMyUnit_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_CreateMyUnit_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_CreateMyUnit_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Unit = $root.MST.UnitInfo.decode(r, r.uint32());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_CreateMyUnit_Mes;
  }();

  MST.M2C_StartSceneChange_Mes = function () {
    /**
     * Properties of a M2C_StartSceneChange_Mes.
     * @memberof MST
     * @interface IM2C_StartSceneChange_Mes
     * @property {MST.IRoomInfo|null} [RoomScene] M2C_StartSceneChange_Mes RoomScene
     */

    /**
     * Constructs a new M2C_StartSceneChange_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_StartSceneChange_Mes.
     * @implements IM2C_StartSceneChange_Mes
     * @constructor
     * @param {MST.IM2C_StartSceneChange_Mes=} [p] Properties to set
     */
    function M2C_StartSceneChange_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_StartSceneChange_Mes RoomScene.
     * @member {MST.IRoomInfo|null|undefined} RoomScene
     * @memberof MST.M2C_StartSceneChange_Mes
     * @instance
     */


    M2C_StartSceneChange_Mes.prototype.RoomScene = null;
    /**
     * Creates a new M2C_StartSceneChange_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_StartSceneChange_Mes
     * @static
     * @param {MST.IM2C_StartSceneChange_Mes=} [properties] Properties to set
     * @returns {MST.M2C_StartSceneChange_Mes} M2C_StartSceneChange_Mes instance
     */

    M2C_StartSceneChange_Mes.create = function create(properties) {
      return new M2C_StartSceneChange_Mes(properties);
    };
    /**
     * Encodes the specified M2C_StartSceneChange_Mes message. Does not implicitly {@link MST.M2C_StartSceneChange_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_StartSceneChange_Mes
     * @static
     * @param {MST.IM2C_StartSceneChange_Mes} m M2C_StartSceneChange_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_StartSceneChange_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RoomScene != null && Object.hasOwnProperty.call(m, "RoomScene")) $root.MST.RoomInfo.encode(m.RoomScene, w.uint32(10).fork()).ldelim();
      return w;
    };
    /**
     * Decodes a M2C_StartSceneChange_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_StartSceneChange_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_StartSceneChange_Mes} M2C_StartSceneChange_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_StartSceneChange_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_StartSceneChange_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.RoomScene = $root.MST.RoomInfo.decode(r, r.uint32());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_StartSceneChange_Mes;
  }();

  MST.M2C_RemoveUnits_Mes = function () {
    /**
     * Properties of a M2C_RemoveUnits_Mes.
     * @memberof MST
     * @interface IM2C_RemoveUnits_Mes
     * @property {Array.<number|Long>|null} [Units] M2C_RemoveUnits_Mes Units
     */

    /**
     * Constructs a new M2C_RemoveUnits_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_RemoveUnits_Mes.
     * @implements IM2C_RemoveUnits_Mes
     * @constructor
     * @param {MST.IM2C_RemoveUnits_Mes=} [p] Properties to set
     */
    function M2C_RemoveUnits_Mes(p) {
      this.Units = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_RemoveUnits_Mes Units.
     * @member {Array.<number|Long>} Units
     * @memberof MST.M2C_RemoveUnits_Mes
     * @instance
     */


    M2C_RemoveUnits_Mes.prototype.Units = $util.emptyArray;
    /**
     * Creates a new M2C_RemoveUnits_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_RemoveUnits_Mes
     * @static
     * @param {MST.IM2C_RemoveUnits_Mes=} [properties] Properties to set
     * @returns {MST.M2C_RemoveUnits_Mes} M2C_RemoveUnits_Mes instance
     */

    M2C_RemoveUnits_Mes.create = function create(properties) {
      return new M2C_RemoveUnits_Mes(properties);
    };
    /**
     * Encodes the specified M2C_RemoveUnits_Mes message. Does not implicitly {@link MST.M2C_RemoveUnits_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_RemoveUnits_Mes
     * @static
     * @param {MST.IM2C_RemoveUnits_Mes} m M2C_RemoveUnits_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_RemoveUnits_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Units != null && m.Units.length) {
        w.uint32(18).fork();

        for (var i = 0; i < m.Units.length; ++i) {
          w.int64(m.Units[i]);
        }

        w.ldelim();
      }

      return w;
    };
    /**
     * Decodes a M2C_RemoveUnits_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_RemoveUnits_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_RemoveUnits_Mes} M2C_RemoveUnits_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_RemoveUnits_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_RemoveUnits_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 2:
            if (!(m.Units && m.Units.length)) m.Units = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.Units.push(r.int64());
              }
            } else m.Units.push(r.int64());

            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_RemoveUnits_Mes;
  }();

  MST.C2M_TransferMap_Req = function () {
    /**
     * Properties of a C2M_TransferMap_Req.
     * @memberof MST
     * @interface IC2M_TransferMap_Req
     * @property {number|null} [RpcId] C2M_TransferMap_Req RpcId
     * @property {string|null} [RoomName] C2M_TransferMap_Req RoomName
     */

    /**
     * Constructs a new C2M_TransferMap_Req.
     * @memberof MST
     * @classdesc Represents a C2M_TransferMap_Req.
     * @implements IC2M_TransferMap_Req
     * @constructor
     * @param {MST.IC2M_TransferMap_Req=} [p] Properties to set
     */
    function C2M_TransferMap_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_TransferMap_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_TransferMap_Req
     * @instance
     */


    C2M_TransferMap_Req.prototype.RpcId = 0;
    /**
     * C2M_TransferMap_Req RoomName.
     * @member {string} RoomName
     * @memberof MST.C2M_TransferMap_Req
     * @instance
     */

    C2M_TransferMap_Req.prototype.RoomName = "";
    /**
     * Creates a new C2M_TransferMap_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_TransferMap_Req
     * @static
     * @param {MST.IC2M_TransferMap_Req=} [properties] Properties to set
     * @returns {MST.C2M_TransferMap_Req} C2M_TransferMap_Req instance
     */

    C2M_TransferMap_Req.create = function create(properties) {
      return new C2M_TransferMap_Req(properties);
    };
    /**
     * Encodes the specified C2M_TransferMap_Req message. Does not implicitly {@link MST.C2M_TransferMap_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_TransferMap_Req
     * @static
     * @param {MST.IC2M_TransferMap_Req} m C2M_TransferMap_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_TransferMap_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RoomName != null && Object.hasOwnProperty.call(m, "RoomName")) w.uint32(10).string(m.RoomName);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_TransferMap_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_TransferMap_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_TransferMap_Req} C2M_TransferMap_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_TransferMap_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_TransferMap_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.RoomName = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_TransferMap_Req;
  }();

  MST.M2C_TransferMap_Res = function () {
    /**
     * Properties of a M2C_TransferMap_Res.
     * @memberof MST
     * @interface IM2C_TransferMap_Res
     * @property {number|null} [RpcId] M2C_TransferMap_Res RpcId
     * @property {number|null} [Error] M2C_TransferMap_Res Error
     * @property {string|null} [Message] M2C_TransferMap_Res Message
     * @property {string|null} [RoomName] M2C_TransferMap_Res RoomName
     */

    /**
     * Constructs a new M2C_TransferMap_Res.
     * @memberof MST
     * @classdesc Represents a M2C_TransferMap_Res.
     * @implements IM2C_TransferMap_Res
     * @constructor
     * @param {MST.IM2C_TransferMap_Res=} [p] Properties to set
     */
    function M2C_TransferMap_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_TransferMap_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_TransferMap_Res
     * @instance
     */


    M2C_TransferMap_Res.prototype.RpcId = 0;
    /**
     * M2C_TransferMap_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_TransferMap_Res
     * @instance
     */

    M2C_TransferMap_Res.prototype.Error = 0;
    /**
     * M2C_TransferMap_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_TransferMap_Res
     * @instance
     */

    M2C_TransferMap_Res.prototype.Message = "";
    /**
     * M2C_TransferMap_Res RoomName.
     * @member {string} RoomName
     * @memberof MST.M2C_TransferMap_Res
     * @instance
     */

    M2C_TransferMap_Res.prototype.RoomName = "";
    /**
     * Creates a new M2C_TransferMap_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_TransferMap_Res
     * @static
     * @param {MST.IM2C_TransferMap_Res=} [properties] Properties to set
     * @returns {MST.M2C_TransferMap_Res} M2C_TransferMap_Res instance
     */

    M2C_TransferMap_Res.create = function create(properties) {
      return new M2C_TransferMap_Res(properties);
    };
    /**
     * Encodes the specified M2C_TransferMap_Res message. Does not implicitly {@link MST.M2C_TransferMap_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_TransferMap_Res
     * @static
     * @param {MST.IM2C_TransferMap_Res} m M2C_TransferMap_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_TransferMap_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RoomName != null && Object.hasOwnProperty.call(m, "RoomName")) w.uint32(10).string(m.RoomName);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_TransferMap_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_TransferMap_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_TransferMap_Res} M2C_TransferMap_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_TransferMap_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_TransferMap_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.RoomName = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_TransferMap_Res;
  }();
  /**
   * LoginType enum.
   * @name MST.LoginType
   * @enum {number}
   * @property {number} Anonymous=0 Anonymous value
   * @property {number} Telephone=1 Telephone value
   * @property {number} Goggle=2 Goggle value
   * @property {number} FaceBook=3 FaceBook value
   * @property {number} Twittwer=4 Twittwer value
   * @property {number} Telegram=5 Telegram value
   * @property {number} Fast=6 Fast value
   * @property {number} Token=7 Token value
   */


  MST.LoginType = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Anonymous"] = 0;
    values[valuesById[1] = "Telephone"] = 1;
    values[valuesById[2] = "Goggle"] = 2;
    values[valuesById[3] = "FaceBook"] = 3;
    values[valuesById[4] = "Twittwer"] = 4;
    values[valuesById[5] = "Telegram"] = 5;
    values[valuesById[6] = "Fast"] = 6;
    values[valuesById[7] = "Token"] = 7;
    return values;
  }();

  MST.C2M_Auth_Req = function () {
    /**
     * Properties of a C2M_Auth_Req.
     * @memberof MST
     * @interface IC2M_Auth_Req
     * @property {number|null} [RpcId] C2M_Auth_Req RpcId
     * @property {string|null} [AuthKey] C2M_Auth_Req AuthKey
     * @property {string|null} [Password] C2M_Auth_Req Password
     * @property {number|null} [AuthType] C2M_Auth_Req AuthType
     * @property {string|null} [ThirdId] C2M_Auth_Req ThirdId
     * @property {string|null} [imei] C2M_Auth_Req imei
     * @property {string|null} [invcode] C2M_Auth_Req invcode
     */

    /**
     * Constructs a new C2M_Auth_Req.
     * @memberof MST
     * @classdesc Represents a C2M_Auth_Req.
     * @implements IC2M_Auth_Req
     * @constructor
     * @param {MST.IC2M_Auth_Req=} [p] Properties to set
     */
    function C2M_Auth_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_Auth_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_Auth_Req
     * @instance
     */


    C2M_Auth_Req.prototype.RpcId = 0;
    /**
     * C2M_Auth_Req AuthKey.
     * @member {string} AuthKey
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.AuthKey = "";
    /**
     * C2M_Auth_Req Password.
     * @member {string} Password
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.Password = "";
    /**
     * C2M_Auth_Req AuthType.
     * @member {number} AuthType
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.AuthType = 0;
    /**
     * C2M_Auth_Req ThirdId.
     * @member {string} ThirdId
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.ThirdId = "";
    /**
     * C2M_Auth_Req imei.
     * @member {string} imei
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.imei = "";
    /**
     * C2M_Auth_Req invcode.
     * @member {string} invcode
     * @memberof MST.C2M_Auth_Req
     * @instance
     */

    C2M_Auth_Req.prototype.invcode = "";
    /**
     * Creates a new C2M_Auth_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_Auth_Req
     * @static
     * @param {MST.IC2M_Auth_Req=} [properties] Properties to set
     * @returns {MST.C2M_Auth_Req} C2M_Auth_Req instance
     */

    C2M_Auth_Req.create = function create(properties) {
      return new C2M_Auth_Req(properties);
    };
    /**
     * Encodes the specified C2M_Auth_Req message. Does not implicitly {@link MST.C2M_Auth_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_Auth_Req
     * @static
     * @param {MST.IC2M_Auth_Req} m C2M_Auth_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_Auth_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.AuthKey != null && Object.hasOwnProperty.call(m, "AuthKey")) w.uint32(18).string(m.AuthKey);
      if (m.Password != null && Object.hasOwnProperty.call(m, "Password")) w.uint32(26).string(m.Password);
      if (m.AuthType != null && Object.hasOwnProperty.call(m, "AuthType")) w.uint32(32).int32(m.AuthType);
      if (m.ThirdId != null && Object.hasOwnProperty.call(m, "ThirdId")) w.uint32(42).string(m.ThirdId);
      if (m.imei != null && Object.hasOwnProperty.call(m, "imei")) w.uint32(50).string(m.imei);
      if (m.invcode != null && Object.hasOwnProperty.call(m, "invcode")) w.uint32(58).string(m.invcode);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_Auth_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_Auth_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_Auth_Req} C2M_Auth_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_Auth_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_Auth_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 2:
            m.AuthKey = r.string();
            break;

          case 3:
            m.Password = r.string();
            break;

          case 4:
            m.AuthType = r.int32();
            break;

          case 5:
            m.ThirdId = r.string();
            break;

          case 6:
            m.imei = r.string();
            break;

          case 7:
            m.invcode = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_Auth_Req;
  }();

  MST.M2C_Auth_Res = function () {
    /**
     * Properties of a M2C_Auth_Res.
     * @memberof MST
     * @interface IM2C_Auth_Res
     * @property {number|null} [RpcId] M2C_Auth_Res RpcId
     * @property {number|null} [Error] M2C_Auth_Res Error
     * @property {string|null} [Message] M2C_Auth_Res Message
     * @property {string|null} [FastAuthToken] M2C_Auth_Res FastAuthToken
     * @property {number|Long|null} [AccountId] M2C_Auth_Res AccountId
     * @property {MST.IUnitInfo|null} [PlayerInfo] M2C_Auth_Res PlayerInfo
     * @property {string|null} [RoomName] M2C_Auth_Res RoomName
     * @property {string|null} [BindEmail] M2C_Auth_Res BindEmail
     * @property {string|null} [phonoNo] M2C_Auth_Res phonoNo
     * @property {string|null} [extendCode] M2C_Auth_Res extendCode
     * @property {number|null} [loginType] M2C_Auth_Res loginType
     */

    /**
     * Constructs a new M2C_Auth_Res.
     * @memberof MST
     * @classdesc Represents a M2C_Auth_Res.
     * @implements IM2C_Auth_Res
     * @constructor
     * @param {MST.IM2C_Auth_Res=} [p] Properties to set
     */
    function M2C_Auth_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_Auth_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_Auth_Res
     * @instance
     */


    M2C_Auth_Res.prototype.RpcId = 0;
    /**
     * M2C_Auth_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.Error = 0;
    /**
     * M2C_Auth_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.Message = "";
    /**
     * M2C_Auth_Res FastAuthToken.
     * @member {string} FastAuthToken
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.FastAuthToken = "";
    /**
     * M2C_Auth_Res AccountId.
     * @member {number|Long} AccountId
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.AccountId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_Auth_Res PlayerInfo.
     * @member {MST.IUnitInfo|null|undefined} PlayerInfo
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.PlayerInfo = null;
    /**
     * M2C_Auth_Res RoomName.
     * @member {string} RoomName
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.RoomName = "";
    /**
     * M2C_Auth_Res BindEmail.
     * @member {string} BindEmail
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.BindEmail = "";
    /**
     * M2C_Auth_Res phonoNo.
     * @member {string} phonoNo
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.phonoNo = "";
    /**
     * M2C_Auth_Res extendCode.
     * @member {string} extendCode
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.extendCode = "";
    /**
     * M2C_Auth_Res loginType.
     * @member {number} loginType
     * @memberof MST.M2C_Auth_Res
     * @instance
     */

    M2C_Auth_Res.prototype.loginType = 0;
    /**
     * Creates a new M2C_Auth_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_Auth_Res
     * @static
     * @param {MST.IM2C_Auth_Res=} [properties] Properties to set
     * @returns {MST.M2C_Auth_Res} M2C_Auth_Res instance
     */

    M2C_Auth_Res.create = function create(properties) {
      return new M2C_Auth_Res(properties);
    };
    /**
     * Encodes the specified M2C_Auth_Res message. Does not implicitly {@link MST.M2C_Auth_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_Auth_Res
     * @static
     * @param {MST.IM2C_Auth_Res} m M2C_Auth_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_Auth_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.FastAuthToken != null && Object.hasOwnProperty.call(m, "FastAuthToken")) w.uint32(10).string(m.FastAuthToken);
      if (m.AccountId != null && Object.hasOwnProperty.call(m, "AccountId")) w.uint32(16).int64(m.AccountId);
      if (m.PlayerInfo != null && Object.hasOwnProperty.call(m, "PlayerInfo")) $root.MST.UnitInfo.encode(m.PlayerInfo, w.uint32(26).fork()).ldelim();
      if (m.RoomName != null && Object.hasOwnProperty.call(m, "RoomName")) w.uint32(34).string(m.RoomName);
      if (m.BindEmail != null && Object.hasOwnProperty.call(m, "BindEmail")) w.uint32(42).string(m.BindEmail);
      if (m.phonoNo != null && Object.hasOwnProperty.call(m, "phonoNo")) w.uint32(50).string(m.phonoNo);
      if (m.extendCode != null && Object.hasOwnProperty.call(m, "extendCode")) w.uint32(58).string(m.extendCode);
      if (m.loginType != null && Object.hasOwnProperty.call(m, "loginType")) w.uint32(64).int32(m.loginType);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_Auth_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_Auth_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_Auth_Res} M2C_Auth_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_Auth_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_Auth_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.FastAuthToken = r.string();
            break;

          case 2:
            m.AccountId = r.int64();
            break;

          case 3:
            m.PlayerInfo = $root.MST.UnitInfo.decode(r, r.uint32());
            break;

          case 4:
            m.RoomName = r.string();
            break;

          case 5:
            m.BindEmail = r.string();
            break;

          case 6:
            m.phonoNo = r.string();
            break;

          case 7:
            m.extendCode = r.string();
            break;

          case 8:
            m.loginType = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_Auth_Res;
  }();

  MST.C2M_AuthOut_Req = function () {
    /**
     * Properties of a C2M_AuthOut_Req.
     * @memberof MST
     * @interface IC2M_AuthOut_Req
     * @property {number|null} [RpcId] C2M_AuthOut_Req RpcId
     */

    /**
     * Constructs a new C2M_AuthOut_Req.
     * @memberof MST
     * @classdesc Represents a C2M_AuthOut_Req.
     * @implements IC2M_AuthOut_Req
     * @constructor
     * @param {MST.IC2M_AuthOut_Req=} [p] Properties to set
     */
    function C2M_AuthOut_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_AuthOut_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_AuthOut_Req
     * @instance
     */


    C2M_AuthOut_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2M_AuthOut_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_AuthOut_Req
     * @static
     * @param {MST.IC2M_AuthOut_Req=} [properties] Properties to set
     * @returns {MST.C2M_AuthOut_Req} C2M_AuthOut_Req instance
     */

    C2M_AuthOut_Req.create = function create(properties) {
      return new C2M_AuthOut_Req(properties);
    };
    /**
     * Encodes the specified C2M_AuthOut_Req message. Does not implicitly {@link MST.C2M_AuthOut_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_AuthOut_Req
     * @static
     * @param {MST.IC2M_AuthOut_Req} m C2M_AuthOut_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_AuthOut_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_AuthOut_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_AuthOut_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_AuthOut_Req} C2M_AuthOut_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_AuthOut_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_AuthOut_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_AuthOut_Req;
  }();

  MST.M2C_AuthOut_Res = function () {
    /**
     * Properties of a M2C_AuthOut_Res.
     * @memberof MST
     * @interface IM2C_AuthOut_Res
     * @property {number|null} [RpcId] M2C_AuthOut_Res RpcId
     * @property {number|null} [Error] M2C_AuthOut_Res Error
     * @property {string|null} [Message] M2C_AuthOut_Res Message
     */

    /**
     * Constructs a new M2C_AuthOut_Res.
     * @memberof MST
     * @classdesc Represents a M2C_AuthOut_Res.
     * @implements IM2C_AuthOut_Res
     * @constructor
     * @param {MST.IM2C_AuthOut_Res=} [p] Properties to set
     */
    function M2C_AuthOut_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_AuthOut_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_AuthOut_Res
     * @instance
     */


    M2C_AuthOut_Res.prototype.RpcId = 0;
    /**
     * M2C_AuthOut_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_AuthOut_Res
     * @instance
     */

    M2C_AuthOut_Res.prototype.Error = 0;
    /**
     * M2C_AuthOut_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_AuthOut_Res
     * @instance
     */

    M2C_AuthOut_Res.prototype.Message = "";
    /**
     * Creates a new M2C_AuthOut_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_AuthOut_Res
     * @static
     * @param {MST.IM2C_AuthOut_Res=} [properties] Properties to set
     * @returns {MST.M2C_AuthOut_Res} M2C_AuthOut_Res instance
     */

    M2C_AuthOut_Res.create = function create(properties) {
      return new M2C_AuthOut_Res(properties);
    };
    /**
     * Encodes the specified M2C_AuthOut_Res message. Does not implicitly {@link MST.M2C_AuthOut_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_AuthOut_Res
     * @static
     * @param {MST.IM2C_AuthOut_Res} m M2C_AuthOut_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_AuthOut_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_AuthOut_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_AuthOut_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_AuthOut_Res} M2C_AuthOut_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_AuthOut_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_AuthOut_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_AuthOut_Res;
  }();

  MST.M2C_KickOut_Mes = function () {
    /**
     * Properties of a M2C_KickOut_Mes.
     * @memberof MST
     * @interface IM2C_KickOut_Mes
     */

    /**
     * Constructs a new M2C_KickOut_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_KickOut_Mes.
     * @implements IM2C_KickOut_Mes
     * @constructor
     * @param {MST.IM2C_KickOut_Mes=} [p] Properties to set
     */
    function M2C_KickOut_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * Creates a new M2C_KickOut_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_KickOut_Mes
     * @static
     * @param {MST.IM2C_KickOut_Mes=} [properties] Properties to set
     * @returns {MST.M2C_KickOut_Mes} M2C_KickOut_Mes instance
     */


    M2C_KickOut_Mes.create = function create(properties) {
      return new M2C_KickOut_Mes(properties);
    };
    /**
     * Encodes the specified M2C_KickOut_Mes message. Does not implicitly {@link MST.M2C_KickOut_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_KickOut_Mes
     * @static
     * @param {MST.IM2C_KickOut_Mes} m M2C_KickOut_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_KickOut_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      return w;
    };
    /**
     * Decodes a M2C_KickOut_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_KickOut_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_KickOut_Mes} M2C_KickOut_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_KickOut_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_KickOut_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_KickOut_Mes;
  }();

  MST.M2C_GoldChange_Mes = function () {
    /**
     * Properties of a M2C_GoldChange_Mes.
     * @memberof MST
     * @interface IM2C_GoldChange_Mes
     * @property {number|Long|null} [Gold] M2C_GoldChange_Mes Gold
     */

    /**
     * Constructs a new M2C_GoldChange_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_GoldChange_Mes.
     * @implements IM2C_GoldChange_Mes
     * @constructor
     * @param {MST.IM2C_GoldChange_Mes=} [p] Properties to set
     */
    function M2C_GoldChange_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_GoldChange_Mes Gold.
     * @member {number|Long} Gold
     * @memberof MST.M2C_GoldChange_Mes
     * @instance
     */


    M2C_GoldChange_Mes.prototype.Gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new M2C_GoldChange_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_GoldChange_Mes
     * @static
     * @param {MST.IM2C_GoldChange_Mes=} [properties] Properties to set
     * @returns {MST.M2C_GoldChange_Mes} M2C_GoldChange_Mes instance
     */

    M2C_GoldChange_Mes.create = function create(properties) {
      return new M2C_GoldChange_Mes(properties);
    };
    /**
     * Encodes the specified M2C_GoldChange_Mes message. Does not implicitly {@link MST.M2C_GoldChange_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_GoldChange_Mes
     * @static
     * @param {MST.IM2C_GoldChange_Mes} m M2C_GoldChange_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_GoldChange_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Gold != null && Object.hasOwnProperty.call(m, "Gold")) w.uint32(8).int64(m.Gold);
      return w;
    };
    /**
     * Decodes a M2C_GoldChange_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_GoldChange_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_GoldChange_Mes} M2C_GoldChange_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_GoldChange_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_GoldChange_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Gold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_GoldChange_Mes;
  }();

  MST.RouletteBetInfo = function () {
    /**
     * Properties of a RouletteBetInfo.
     * @memberof MST
     * @interface IRouletteBetInfo
     * @property {MST.IUnitInfo|null} [player] RouletteBetInfo player
     * @property {number|Long|null} [BetGold] RouletteBetInfo BetGold
     * @property {number|null} [Color] RouletteBetInfo Color
     */

    /**
     * Constructs a new RouletteBetInfo.
     * @memberof MST
     * @classdesc Represents a RouletteBetInfo.
     * @implements IRouletteBetInfo
     * @constructor
     * @param {MST.IRouletteBetInfo=} [p] Properties to set
     */
    function RouletteBetInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * RouletteBetInfo player.
     * @member {MST.IUnitInfo|null|undefined} player
     * @memberof MST.RouletteBetInfo
     * @instance
     */


    RouletteBetInfo.prototype.player = null;
    /**
     * RouletteBetInfo BetGold.
     * @member {number|Long} BetGold
     * @memberof MST.RouletteBetInfo
     * @instance
     */

    RouletteBetInfo.prototype.BetGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * RouletteBetInfo Color.
     * @member {number} Color
     * @memberof MST.RouletteBetInfo
     * @instance
     */

    RouletteBetInfo.prototype.Color = 0;
    /**
     * Creates a new RouletteBetInfo instance using the specified properties.
     * @function create
     * @memberof MST.RouletteBetInfo
     * @static
     * @param {MST.IRouletteBetInfo=} [properties] Properties to set
     * @returns {MST.RouletteBetInfo} RouletteBetInfo instance
     */

    RouletteBetInfo.create = function create(properties) {
      return new RouletteBetInfo(properties);
    };
    /**
     * Encodes the specified RouletteBetInfo message. Does not implicitly {@link MST.RouletteBetInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.RouletteBetInfo
     * @static
     * @param {MST.IRouletteBetInfo} m RouletteBetInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    RouletteBetInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.player != null && Object.hasOwnProperty.call(m, "player")) $root.MST.UnitInfo.encode(m.player, w.uint32(10).fork()).ldelim();
      if (m.BetGold != null && Object.hasOwnProperty.call(m, "BetGold")) w.uint32(16).int64(m.BetGold);
      if (m.Color != null && Object.hasOwnProperty.call(m, "Color")) w.uint32(24).int32(m.Color);
      return w;
    };
    /**
     * Decodes a RouletteBetInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.RouletteBetInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.RouletteBetInfo} RouletteBetInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    RouletteBetInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.RouletteBetInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.player = $root.MST.UnitInfo.decode(r, r.uint32());
            break;

          case 2:
            m.BetGold = r.int64();
            break;

          case 3:
            m.Color = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return RouletteBetInfo;
  }();
  /**
   * RouletteColor enum.
   * @name MST.RouletteColor
   * @enum {number}
   * @property {number} RoulettePurple=0 RoulettePurple value
   * @property {number} RouletteRed=1 RouletteRed value
   * @property {number} RouletteGreen=2 RouletteGreen value
   */


  MST.RouletteColor = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "RoulettePurple"] = 0;
    values[valuesById[1] = "RouletteRed"] = 1;
    values[valuesById[2] = "RouletteGreen"] = 2;
    return values;
  }();
  /**
   * RouletteStatus enum.
   * @name MST.RouletteStatus
   * @enum {number}
   * @property {number} BetPhase=0 BetPhase value
   * @property {number} AnimationPhase=1 AnimationPhase value
   * @property {number} PaybackPhase=2 PaybackPhase value
   */


  MST.RouletteStatus = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "BetPhase"] = 0;
    values[valuesById[1] = "AnimationPhase"] = 1;
    values[valuesById[2] = "PaybackPhase"] = 2;
    return values;
  }();

  MST.TotalBetRecord = function () {
    /**
     * Properties of a TotalBetRecord.
     * @memberof MST
     * @interface ITotalBetRecord
     * @property {number|null} [color] TotalBetRecord color
     * @property {number|Long|null} [chips] TotalBetRecord chips
     */

    /**
     * Constructs a new TotalBetRecord.
     * @memberof MST
     * @classdesc Represents a TotalBetRecord.
     * @implements ITotalBetRecord
     * @constructor
     * @param {MST.ITotalBetRecord=} [p] Properties to set
     */
    function TotalBetRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * TotalBetRecord color.
     * @member {number} color
     * @memberof MST.TotalBetRecord
     * @instance
     */


    TotalBetRecord.prototype.color = 0;
    /**
     * TotalBetRecord chips.
     * @member {number|Long} chips
     * @memberof MST.TotalBetRecord
     * @instance
     */

    TotalBetRecord.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new TotalBetRecord instance using the specified properties.
     * @function create
     * @memberof MST.TotalBetRecord
     * @static
     * @param {MST.ITotalBetRecord=} [properties] Properties to set
     * @returns {MST.TotalBetRecord} TotalBetRecord instance
     */

    TotalBetRecord.create = function create(properties) {
      return new TotalBetRecord(properties);
    };
    /**
     * Encodes the specified TotalBetRecord message. Does not implicitly {@link MST.TotalBetRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.TotalBetRecord
     * @static
     * @param {MST.ITotalBetRecord} m TotalBetRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    TotalBetRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.color != null && Object.hasOwnProperty.call(m, "color")) w.uint32(8).int32(m.color);
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(16).int64(m.chips);
      return w;
    };
    /**
     * Decodes a TotalBetRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.TotalBetRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.TotalBetRecord} TotalBetRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    TotalBetRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.TotalBetRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.color = r.int32();
            break;

          case 2:
            m.chips = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return TotalBetRecord;
  }();

  MST.C2M_GetRouletteInfo_Req = function () {
    /**
     * Properties of a C2M_GetRouletteInfo_Req.
     * @memberof MST
     * @interface IC2M_GetRouletteInfo_Req
     * @property {number|null} [RpcId] C2M_GetRouletteInfo_Req RpcId
     */

    /**
     * Constructs a new C2M_GetRouletteInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2M_GetRouletteInfo_Req.
     * @implements IC2M_GetRouletteInfo_Req
     * @constructor
     * @param {MST.IC2M_GetRouletteInfo_Req=} [p] Properties to set
     */
    function C2M_GetRouletteInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_GetRouletteInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_GetRouletteInfo_Req
     * @instance
     */


    C2M_GetRouletteInfo_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2M_GetRouletteInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_GetRouletteInfo_Req
     * @static
     * @param {MST.IC2M_GetRouletteInfo_Req=} [properties] Properties to set
     * @returns {MST.C2M_GetRouletteInfo_Req} C2M_GetRouletteInfo_Req instance
     */

    C2M_GetRouletteInfo_Req.create = function create(properties) {
      return new C2M_GetRouletteInfo_Req(properties);
    };
    /**
     * Encodes the specified C2M_GetRouletteInfo_Req message. Does not implicitly {@link MST.C2M_GetRouletteInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_GetRouletteInfo_Req
     * @static
     * @param {MST.IC2M_GetRouletteInfo_Req} m C2M_GetRouletteInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_GetRouletteInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_GetRouletteInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_GetRouletteInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_GetRouletteInfo_Req} C2M_GetRouletteInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_GetRouletteInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_GetRouletteInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_GetRouletteInfo_Req;
  }();

  MST.M2C_GetRouletteInfo_Res = function () {
    /**
     * Properties of a M2C_GetRouletteInfo_Res.
     * @memberof MST
     * @interface IM2C_GetRouletteInfo_Res
     * @property {number|null} [RpcId] M2C_GetRouletteInfo_Res RpcId
     * @property {number|null} [Error] M2C_GetRouletteInfo_Res Error
     * @property {string|null} [Message] M2C_GetRouletteInfo_Res Message
     * @property {Array.<MST.IRouletteBetInfo>|null} [Bets] M2C_GetRouletteInfo_Res Bets
     * @property {number|null} [Status] M2C_GetRouletteInfo_Res Status
     * @property {number|Long|null} [EndTimeStamp] M2C_GetRouletteInfo_Res EndTimeStamp
     * @property {Array.<number|Long>|null} [MultipleRecord] M2C_GetRouletteInfo_Res MultipleRecord
     * @property {Array.<MST.ITotalBetRecord>|null} [betRecord] M2C_GetRouletteInfo_Res betRecord
     * @property {string|null} [roundHash] M2C_GetRouletteInfo_Res roundHash
     * @property {string|null} [hashSalt] M2C_GetRouletteInfo_Res hashSalt
     * @property {number|null} [randomNo] M2C_GetRouletteInfo_Res randomNo
     * @property {number|null} [color] M2C_GetRouletteInfo_Res color
     * @property {number|null} [round] M2C_GetRouletteInfo_Res round
     */

    /**
     * Constructs a new M2C_GetRouletteInfo_Res.
     * @memberof MST
     * @classdesc Represents a M2C_GetRouletteInfo_Res.
     * @implements IM2C_GetRouletteInfo_Res
     * @constructor
     * @param {MST.IM2C_GetRouletteInfo_Res=} [p] Properties to set
     */
    function M2C_GetRouletteInfo_Res(p) {
      this.Bets = [];
      this.MultipleRecord = [];
      this.betRecord = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_GetRouletteInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */


    M2C_GetRouletteInfo_Res.prototype.RpcId = 0;
    /**
     * M2C_GetRouletteInfo_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.Error = 0;
    /**
     * M2C_GetRouletteInfo_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.Message = "";
    /**
     * M2C_GetRouletteInfo_Res Bets.
     * @member {Array.<MST.IRouletteBetInfo>} Bets
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.Bets = $util.emptyArray;
    /**
     * M2C_GetRouletteInfo_Res Status.
     * @member {number} Status
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.Status = 0;
    /**
     * M2C_GetRouletteInfo_Res EndTimeStamp.
     * @member {number|Long} EndTimeStamp
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.EndTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetRouletteInfo_Res MultipleRecord.
     * @member {Array.<number|Long>} MultipleRecord
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.MultipleRecord = $util.emptyArray;
    /**
     * M2C_GetRouletteInfo_Res betRecord.
     * @member {Array.<MST.ITotalBetRecord>} betRecord
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.betRecord = $util.emptyArray;
    /**
     * M2C_GetRouletteInfo_Res roundHash.
     * @member {string} roundHash
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.roundHash = "";
    /**
     * M2C_GetRouletteInfo_Res hashSalt.
     * @member {string} hashSalt
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.hashSalt = "";
    /**
     * M2C_GetRouletteInfo_Res randomNo.
     * @member {number} randomNo
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.randomNo = 0;
    /**
     * M2C_GetRouletteInfo_Res color.
     * @member {number} color
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.color = 0;
    /**
     * M2C_GetRouletteInfo_Res round.
     * @member {number} round
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @instance
     */

    M2C_GetRouletteInfo_Res.prototype.round = 0;
    /**
     * Creates a new M2C_GetRouletteInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @static
     * @param {MST.IM2C_GetRouletteInfo_Res=} [properties] Properties to set
     * @returns {MST.M2C_GetRouletteInfo_Res} M2C_GetRouletteInfo_Res instance
     */

    M2C_GetRouletteInfo_Res.create = function create(properties) {
      return new M2C_GetRouletteInfo_Res(properties);
    };
    /**
     * Encodes the specified M2C_GetRouletteInfo_Res message. Does not implicitly {@link MST.M2C_GetRouletteInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @static
     * @param {MST.IM2C_GetRouletteInfo_Res} m M2C_GetRouletteInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_GetRouletteInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.Bets != null && m.Bets.length) {
        for (var i = 0; i < m.Bets.length; ++i) {
          $root.MST.RouletteBetInfo.encode(m.Bets[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.Status != null && Object.hasOwnProperty.call(m, "Status")) w.uint32(16).int32(m.Status);
      if (m.EndTimeStamp != null && Object.hasOwnProperty.call(m, "EndTimeStamp")) w.uint32(24).int64(m.EndTimeStamp);

      if (m.MultipleRecord != null && m.MultipleRecord.length) {
        w.uint32(34).fork();

        for (var i = 0; i < m.MultipleRecord.length; ++i) {
          w.int64(m.MultipleRecord[i]);
        }

        w.ldelim();
      }

      if (m.betRecord != null && m.betRecord.length) {
        for (var i = 0; i < m.betRecord.length; ++i) {
          $root.MST.TotalBetRecord.encode(m.betRecord[i], w.uint32(42).fork()).ldelim();
        }
      }

      if (m.roundHash != null && Object.hasOwnProperty.call(m, "roundHash")) w.uint32(50).string(m.roundHash);
      if (m.hashSalt != null && Object.hasOwnProperty.call(m, "hashSalt")) w.uint32(58).string(m.hashSalt);
      if (m.randomNo != null && Object.hasOwnProperty.call(m, "randomNo")) w.uint32(64).int32(m.randomNo);
      if (m.color != null && Object.hasOwnProperty.call(m, "color")) w.uint32(72).int32(m.color);
      if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(80).int32(m.round);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_GetRouletteInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_GetRouletteInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_GetRouletteInfo_Res} M2C_GetRouletteInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_GetRouletteInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_GetRouletteInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            if (!(m.Bets && m.Bets.length)) m.Bets = [];
            m.Bets.push($root.MST.RouletteBetInfo.decode(r, r.uint32()));
            break;

          case 2:
            m.Status = r.int32();
            break;

          case 3:
            m.EndTimeStamp = r.int64();
            break;

          case 4:
            if (!(m.MultipleRecord && m.MultipleRecord.length)) m.MultipleRecord = [];

            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;

              while (r.pos < c2) {
                m.MultipleRecord.push(r.int64());
              }
            } else m.MultipleRecord.push(r.int64());

            break;

          case 5:
            if (!(m.betRecord && m.betRecord.length)) m.betRecord = [];
            m.betRecord.push($root.MST.TotalBetRecord.decode(r, r.uint32()));
            break;

          case 6:
            m.roundHash = r.string();
            break;

          case 7:
            m.hashSalt = r.string();
            break;

          case 8:
            m.randomNo = r.int32();
            break;

          case 9:
            m.color = r.int32();
            break;

          case 10:
            m.round = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_GetRouletteInfo_Res;
  }();

  MST.M2C_RouletteStartBet_Mes = function () {
    /**
     * Properties of a M2C_RouletteStartBet_Mes.
     * @memberof MST
     * @interface IM2C_RouletteStartBet_Mes
     * @property {number|Long|null} [StopBetTimeStamp] M2C_RouletteStartBet_Mes StopBetTimeStamp
     * @property {string|null} [randHash] M2C_RouletteStartBet_Mes randHash
     */

    /**
     * Constructs a new M2C_RouletteStartBet_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_RouletteStartBet_Mes.
     * @implements IM2C_RouletteStartBet_Mes
     * @constructor
     * @param {MST.IM2C_RouletteStartBet_Mes=} [p] Properties to set
     */
    function M2C_RouletteStartBet_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_RouletteStartBet_Mes StopBetTimeStamp.
     * @member {number|Long} StopBetTimeStamp
     * @memberof MST.M2C_RouletteStartBet_Mes
     * @instance
     */


    M2C_RouletteStartBet_Mes.prototype.StopBetTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_RouletteStartBet_Mes randHash.
     * @member {string} randHash
     * @memberof MST.M2C_RouletteStartBet_Mes
     * @instance
     */

    M2C_RouletteStartBet_Mes.prototype.randHash = "";
    /**
     * Creates a new M2C_RouletteStartBet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_RouletteStartBet_Mes
     * @static
     * @param {MST.IM2C_RouletteStartBet_Mes=} [properties] Properties to set
     * @returns {MST.M2C_RouletteStartBet_Mes} M2C_RouletteStartBet_Mes instance
     */

    M2C_RouletteStartBet_Mes.create = function create(properties) {
      return new M2C_RouletteStartBet_Mes(properties);
    };
    /**
     * Encodes the specified M2C_RouletteStartBet_Mes message. Does not implicitly {@link MST.M2C_RouletteStartBet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_RouletteStartBet_Mes
     * @static
     * @param {MST.IM2C_RouletteStartBet_Mes} m M2C_RouletteStartBet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_RouletteStartBet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.StopBetTimeStamp != null && Object.hasOwnProperty.call(m, "StopBetTimeStamp")) w.uint32(8).int64(m.StopBetTimeStamp);
      if (m.randHash != null && Object.hasOwnProperty.call(m, "randHash")) w.uint32(18).string(m.randHash);
      return w;
    };
    /**
     * Decodes a M2C_RouletteStartBet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_RouletteStartBet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_RouletteStartBet_Mes} M2C_RouletteStartBet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_RouletteStartBet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_RouletteStartBet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.StopBetTimeStamp = r.int64();
            break;

          case 2:
            m.randHash = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_RouletteStartBet_Mes;
  }();

  MST.M2C_RouletteStart_mes = function () {
    /**
     * Properties of a M2C_RouletteStart_mes.
     * @memberof MST
     * @interface IM2C_RouletteStart_mes
     * @property {number|Long|null} [StartTimeStamp] M2C_RouletteStart_mes StartTimeStamp
     * @property {number|Long|null} [StopTimeStamp] M2C_RouletteStart_mes StopTimeStamp
     * @property {number|null} [endIndex] M2C_RouletteStart_mes endIndex
     */

    /**
     * Constructs a new M2C_RouletteStart_mes.
     * @memberof MST
     * @classdesc Represents a M2C_RouletteStart_mes.
     * @implements IM2C_RouletteStart_mes
     * @constructor
     * @param {MST.IM2C_RouletteStart_mes=} [p] Properties to set
     */
    function M2C_RouletteStart_mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_RouletteStart_mes StartTimeStamp.
     * @member {number|Long} StartTimeStamp
     * @memberof MST.M2C_RouletteStart_mes
     * @instance
     */


    M2C_RouletteStart_mes.prototype.StartTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_RouletteStart_mes StopTimeStamp.
     * @member {number|Long} StopTimeStamp
     * @memberof MST.M2C_RouletteStart_mes
     * @instance
     */

    M2C_RouletteStart_mes.prototype.StopTimeStamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_RouletteStart_mes endIndex.
     * @member {number} endIndex
     * @memberof MST.M2C_RouletteStart_mes
     * @instance
     */

    M2C_RouletteStart_mes.prototype.endIndex = 0;
    /**
     * Creates a new M2C_RouletteStart_mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_RouletteStart_mes
     * @static
     * @param {MST.IM2C_RouletteStart_mes=} [properties] Properties to set
     * @returns {MST.M2C_RouletteStart_mes} M2C_RouletteStart_mes instance
     */

    M2C_RouletteStart_mes.create = function create(properties) {
      return new M2C_RouletteStart_mes(properties);
    };
    /**
     * Encodes the specified M2C_RouletteStart_mes message. Does not implicitly {@link MST.M2C_RouletteStart_mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_RouletteStart_mes
     * @static
     * @param {MST.IM2C_RouletteStart_mes} m M2C_RouletteStart_mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_RouletteStart_mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.StartTimeStamp != null && Object.hasOwnProperty.call(m, "StartTimeStamp")) w.uint32(8).int64(m.StartTimeStamp);
      if (m.StopTimeStamp != null && Object.hasOwnProperty.call(m, "StopTimeStamp")) w.uint32(16).int64(m.StopTimeStamp);
      if (m.endIndex != null && Object.hasOwnProperty.call(m, "endIndex")) w.uint32(24).int32(m.endIndex);
      return w;
    };
    /**
     * Decodes a M2C_RouletteStart_mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_RouletteStart_mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_RouletteStart_mes} M2C_RouletteStart_mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_RouletteStart_mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_RouletteStart_mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.StartTimeStamp = r.int64();
            break;

          case 2:
            m.StopTimeStamp = r.int64();
            break;

          case 3:
            m.endIndex = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_RouletteStart_mes;
  }();

  MST.C2M_MyRouletteBet_Req = function () {
    /**
     * Properties of a C2M_MyRouletteBet_Req.
     * @memberof MST
     * @interface IC2M_MyRouletteBet_Req
     * @property {number|null} [RpcId] C2M_MyRouletteBet_Req RpcId
     * @property {number|Long|null} [BetGold] C2M_MyRouletteBet_Req BetGold
     * @property {number|null} [BetIndex] C2M_MyRouletteBet_Req BetIndex
     */

    /**
     * Constructs a new C2M_MyRouletteBet_Req.
     * @memberof MST
     * @classdesc Represents a C2M_MyRouletteBet_Req.
     * @implements IC2M_MyRouletteBet_Req
     * @constructor
     * @param {MST.IC2M_MyRouletteBet_Req=} [p] Properties to set
     */
    function C2M_MyRouletteBet_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_MyRouletteBet_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_MyRouletteBet_Req
     * @instance
     */


    C2M_MyRouletteBet_Req.prototype.RpcId = 0;
    /**
     * C2M_MyRouletteBet_Req BetGold.
     * @member {number|Long} BetGold
     * @memberof MST.C2M_MyRouletteBet_Req
     * @instance
     */

    C2M_MyRouletteBet_Req.prototype.BetGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * C2M_MyRouletteBet_Req BetIndex.
     * @member {number} BetIndex
     * @memberof MST.C2M_MyRouletteBet_Req
     * @instance
     */

    C2M_MyRouletteBet_Req.prototype.BetIndex = 0;
    /**
     * Creates a new C2M_MyRouletteBet_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_MyRouletteBet_Req
     * @static
     * @param {MST.IC2M_MyRouletteBet_Req=} [properties] Properties to set
     * @returns {MST.C2M_MyRouletteBet_Req} C2M_MyRouletteBet_Req instance
     */

    C2M_MyRouletteBet_Req.create = function create(properties) {
      return new C2M_MyRouletteBet_Req(properties);
    };
    /**
     * Encodes the specified C2M_MyRouletteBet_Req message. Does not implicitly {@link MST.C2M_MyRouletteBet_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_MyRouletteBet_Req
     * @static
     * @param {MST.IC2M_MyRouletteBet_Req} m C2M_MyRouletteBet_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_MyRouletteBet_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.BetIndex != null && Object.hasOwnProperty.call(m, "BetIndex")) w.uint32(8).int32(m.BetIndex);
      if (m.BetGold != null && Object.hasOwnProperty.call(m, "BetGold")) w.uint32(16).int64(m.BetGold);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_MyRouletteBet_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_MyRouletteBet_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_MyRouletteBet_Req} C2M_MyRouletteBet_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_MyRouletteBet_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_MyRouletteBet_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 2:
            m.BetGold = r.int64();
            break;

          case 1:
            m.BetIndex = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_MyRouletteBet_Req;
  }();

  MST.M2C_MyRouletteBet_Res = function () {
    /**
     * Properties of a M2C_MyRouletteBet_Res.
     * @memberof MST
     * @interface IM2C_MyRouletteBet_Res
     * @property {number|null} [RpcId] M2C_MyRouletteBet_Res RpcId
     * @property {number|null} [Error] M2C_MyRouletteBet_Res Error
     * @property {string|null} [Message] M2C_MyRouletteBet_Res Message
     * @property {number|Long|null} [Gold] M2C_MyRouletteBet_Res Gold
     */

    /**
     * Constructs a new M2C_MyRouletteBet_Res.
     * @memberof MST
     * @classdesc Represents a M2C_MyRouletteBet_Res.
     * @implements IM2C_MyRouletteBet_Res
     * @constructor
     * @param {MST.IM2C_MyRouletteBet_Res=} [p] Properties to set
     */
    function M2C_MyRouletteBet_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_MyRouletteBet_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_MyRouletteBet_Res
     * @instance
     */


    M2C_MyRouletteBet_Res.prototype.RpcId = 0;
    /**
     * M2C_MyRouletteBet_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_MyRouletteBet_Res
     * @instance
     */

    M2C_MyRouletteBet_Res.prototype.Error = 0;
    /**
     * M2C_MyRouletteBet_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_MyRouletteBet_Res
     * @instance
     */

    M2C_MyRouletteBet_Res.prototype.Message = "";
    /**
     * M2C_MyRouletteBet_Res Gold.
     * @member {number|Long} Gold
     * @memberof MST.M2C_MyRouletteBet_Res
     * @instance
     */

    M2C_MyRouletteBet_Res.prototype.Gold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new M2C_MyRouletteBet_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_MyRouletteBet_Res
     * @static
     * @param {MST.IM2C_MyRouletteBet_Res=} [properties] Properties to set
     * @returns {MST.M2C_MyRouletteBet_Res} M2C_MyRouletteBet_Res instance
     */

    M2C_MyRouletteBet_Res.create = function create(properties) {
      return new M2C_MyRouletteBet_Res(properties);
    };
    /**
     * Encodes the specified M2C_MyRouletteBet_Res message. Does not implicitly {@link MST.M2C_MyRouletteBet_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_MyRouletteBet_Res
     * @static
     * @param {MST.IM2C_MyRouletteBet_Res} m M2C_MyRouletteBet_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_MyRouletteBet_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Gold != null && Object.hasOwnProperty.call(m, "Gold")) w.uint32(8).int64(m.Gold);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_MyRouletteBet_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_MyRouletteBet_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_MyRouletteBet_Res} M2C_MyRouletteBet_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_MyRouletteBet_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_MyRouletteBet_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Gold = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_MyRouletteBet_Res;
  }();

  MST.C2R_GetBetRankInfo_Req = function () {
    /**
     * Properties of a C2R_GetBetRankInfo_Req.
     * @memberof MST
     * @interface IC2R_GetBetRankInfo_Req
     * @property {number|null} [RpcId] C2R_GetBetRankInfo_Req RpcId
     */

    /**
     * Constructs a new C2R_GetBetRankInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2R_GetBetRankInfo_Req.
     * @implements IC2R_GetBetRankInfo_Req
     * @constructor
     * @param {MST.IC2R_GetBetRankInfo_Req=} [p] Properties to set
     */
    function C2R_GetBetRankInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2R_GetBetRankInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2R_GetBetRankInfo_Req
     * @instance
     */


    C2R_GetBetRankInfo_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2R_GetBetRankInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2R_GetBetRankInfo_Req
     * @static
     * @param {MST.IC2R_GetBetRankInfo_Req=} [properties] Properties to set
     * @returns {MST.C2R_GetBetRankInfo_Req} C2R_GetBetRankInfo_Req instance
     */

    C2R_GetBetRankInfo_Req.create = function create(properties) {
      return new C2R_GetBetRankInfo_Req(properties);
    };
    /**
     * Encodes the specified C2R_GetBetRankInfo_Req message. Does not implicitly {@link MST.C2R_GetBetRankInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2R_GetBetRankInfo_Req
     * @static
     * @param {MST.IC2R_GetBetRankInfo_Req} m C2R_GetBetRankInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2R_GetBetRankInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2R_GetBetRankInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2R_GetBetRankInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2R_GetBetRankInfo_Req} C2R_GetBetRankInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2R_GetBetRankInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2R_GetBetRankInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2R_GetBetRankInfo_Req;
  }();

  MST.R2C_GetBetRandInfo_Res = function () {
    /**
     * Properties of a R2C_GetBetRandInfo_Res.
     * @memberof MST
     * @interface IR2C_GetBetRandInfo_Res
     * @property {number|null} [RpcId] R2C_GetBetRandInfo_Res RpcId
     * @property {number|null} [Error] R2C_GetBetRandInfo_Res Error
     * @property {Array.<MST.IRouletteBetInfo>|null} [records] R2C_GetBetRandInfo_Res records
     */

    /**
     * Constructs a new R2C_GetBetRandInfo_Res.
     * @memberof MST
     * @classdesc Represents a R2C_GetBetRandInfo_Res.
     * @implements IR2C_GetBetRandInfo_Res
     * @constructor
     * @param {MST.IR2C_GetBetRandInfo_Res=} [p] Properties to set
     */
    function R2C_GetBetRandInfo_Res(p) {
      this.records = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_GetBetRandInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @instance
     */


    R2C_GetBetRandInfo_Res.prototype.RpcId = 0;
    /**
     * R2C_GetBetRandInfo_Res Error.
     * @member {number} Error
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @instance
     */

    R2C_GetBetRandInfo_Res.prototype.Error = 0;
    /**
     * R2C_GetBetRandInfo_Res records.
     * @member {Array.<MST.IRouletteBetInfo>} records
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @instance
     */

    R2C_GetBetRandInfo_Res.prototype.records = $util.emptyArray;
    /**
     * Creates a new R2C_GetBetRandInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @static
     * @param {MST.IR2C_GetBetRandInfo_Res=} [properties] Properties to set
     * @returns {MST.R2C_GetBetRandInfo_Res} R2C_GetBetRandInfo_Res instance
     */

    R2C_GetBetRandInfo_Res.create = function create(properties) {
      return new R2C_GetBetRandInfo_Res(properties);
    };
    /**
     * Encodes the specified R2C_GetBetRandInfo_Res message. Does not implicitly {@link MST.R2C_GetBetRandInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @static
     * @param {MST.IR2C_GetBetRandInfo_Res} m R2C_GetBetRandInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_GetBetRandInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.records != null && m.records.length) {
        for (var i = 0; i < m.records.length; ++i) {
          $root.MST.RouletteBetInfo.encode(m.records[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a R2C_GetBetRandInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_GetBetRandInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_GetBetRandInfo_Res} R2C_GetBetRandInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_GetBetRandInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_GetBetRandInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.records && m.records.length)) m.records = [];
            m.records.push($root.MST.RouletteBetInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_GetBetRandInfo_Res;
  }();

  MST.C2R_GetGameRecords_Req = function () {
    /**
     * Properties of a C2R_GetGameRecords_Req.
     * @memberof MST
     * @interface IC2R_GetGameRecords_Req
     * @property {number|null} [RpcId] C2R_GetGameRecords_Req RpcId
     * @property {number|null} [limit] C2R_GetGameRecords_Req limit
     * @property {number|null} [round] C2R_GetGameRecords_Req round
     */

    /**
     * Constructs a new C2R_GetGameRecords_Req.
     * @memberof MST
     * @classdesc Represents a C2R_GetGameRecords_Req.
     * @implements IC2R_GetGameRecords_Req
     * @constructor
     * @param {MST.IC2R_GetGameRecords_Req=} [p] Properties to set
     */
    function C2R_GetGameRecords_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2R_GetGameRecords_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2R_GetGameRecords_Req
     * @instance
     */


    C2R_GetGameRecords_Req.prototype.RpcId = 0;
    /**
     * C2R_GetGameRecords_Req limit.
     * @member {number} limit
     * @memberof MST.C2R_GetGameRecords_Req
     * @instance
     */

    C2R_GetGameRecords_Req.prototype.limit = 0;
    /**
     * C2R_GetGameRecords_Req round.
     * @member {number} round
     * @memberof MST.C2R_GetGameRecords_Req
     * @instance
     */

    C2R_GetGameRecords_Req.prototype.round = 0;
    /**
     * Creates a new C2R_GetGameRecords_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2R_GetGameRecords_Req
     * @static
     * @param {MST.IC2R_GetGameRecords_Req=} [properties] Properties to set
     * @returns {MST.C2R_GetGameRecords_Req} C2R_GetGameRecords_Req instance
     */

    C2R_GetGameRecords_Req.create = function create(properties) {
      return new C2R_GetGameRecords_Req(properties);
    };
    /**
     * Encodes the specified C2R_GetGameRecords_Req message. Does not implicitly {@link MST.C2R_GetGameRecords_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2R_GetGameRecords_Req
     * @static
     * @param {MST.IC2R_GetGameRecords_Req} m C2R_GetGameRecords_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2R_GetGameRecords_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(8).int32(m.limit);
      if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(16).int32(m.round);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2R_GetGameRecords_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2R_GetGameRecords_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2R_GetGameRecords_Req} C2R_GetGameRecords_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2R_GetGameRecords_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2R_GetGameRecords_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.limit = r.int32();
            break;

          case 2:
            m.round = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2R_GetGameRecords_Req;
  }();

  MST.RouletteGameRecord = function () {
    /**
     * Properties of a RouletteGameRecord.
     * @memberof MST
     * @interface IRouletteGameRecord
     * @property {number|null} [round] RouletteGameRecord round
     * @property {number|null} [color] RouletteGameRecord color
     * @property {number|null} [calcTime] RouletteGameRecord calcTime
     * @property {string|null} [roundHash] RouletteGameRecord roundHash
     * @property {string|null} [hashSalt] RouletteGameRecord hashSalt
     * @property {number|null} [randomNo] RouletteGameRecord randomNo
     */

    /**
     * Constructs a new RouletteGameRecord.
     * @memberof MST
     * @classdesc Represents a RouletteGameRecord.
     * @implements IRouletteGameRecord
     * @constructor
     * @param {MST.IRouletteGameRecord=} [p] Properties to set
     */
    function RouletteGameRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * RouletteGameRecord round.
     * @member {number} round
     * @memberof MST.RouletteGameRecord
     * @instance
     */


    RouletteGameRecord.prototype.round = 0;
    /**
     * RouletteGameRecord color.
     * @member {number} color
     * @memberof MST.RouletteGameRecord
     * @instance
     */

    RouletteGameRecord.prototype.color = 0;
    /**
     * RouletteGameRecord calcTime.
     * @member {number} calcTime
     * @memberof MST.RouletteGameRecord
     * @instance
     */

    RouletteGameRecord.prototype.calcTime = 0;
    /**
     * RouletteGameRecord roundHash.
     * @member {string} roundHash
     * @memberof MST.RouletteGameRecord
     * @instance
     */

    RouletteGameRecord.prototype.roundHash = "";
    /**
     * RouletteGameRecord hashSalt.
     * @member {string} hashSalt
     * @memberof MST.RouletteGameRecord
     * @instance
     */

    RouletteGameRecord.prototype.hashSalt = "";
    /**
     * RouletteGameRecord randomNo.
     * @member {number} randomNo
     * @memberof MST.RouletteGameRecord
     * @instance
     */

    RouletteGameRecord.prototype.randomNo = 0;
    /**
     * Creates a new RouletteGameRecord instance using the specified properties.
     * @function create
     * @memberof MST.RouletteGameRecord
     * @static
     * @param {MST.IRouletteGameRecord=} [properties] Properties to set
     * @returns {MST.RouletteGameRecord} RouletteGameRecord instance
     */

    RouletteGameRecord.create = function create(properties) {
      return new RouletteGameRecord(properties);
    };
    /**
     * Encodes the specified RouletteGameRecord message. Does not implicitly {@link MST.RouletteGameRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.RouletteGameRecord
     * @static
     * @param {MST.IRouletteGameRecord} m RouletteGameRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    RouletteGameRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(8).int32(m.round);
      if (m.color != null && Object.hasOwnProperty.call(m, "color")) w.uint32(16).int32(m.color);
      if (m.calcTime != null && Object.hasOwnProperty.call(m, "calcTime")) w.uint32(24).int32(m.calcTime);
      if (m.roundHash != null && Object.hasOwnProperty.call(m, "roundHash")) w.uint32(34).string(m.roundHash);
      if (m.hashSalt != null && Object.hasOwnProperty.call(m, "hashSalt")) w.uint32(42).string(m.hashSalt);
      if (m.randomNo != null && Object.hasOwnProperty.call(m, "randomNo")) w.uint32(48).int32(m.randomNo);
      return w;
    };
    /**
     * Decodes a RouletteGameRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.RouletteGameRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.RouletteGameRecord} RouletteGameRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    RouletteGameRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.RouletteGameRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.round = r.int32();
            break;

          case 2:
            m.color = r.int32();
            break;

          case 3:
            m.calcTime = r.int32();
            break;

          case 4:
            m.roundHash = r.string();
            break;

          case 5:
            m.hashSalt = r.string();
            break;

          case 6:
            m.randomNo = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return RouletteGameRecord;
  }();

  MST.R2C_GetGameRecords_Res = function () {
    /**
     * Properties of a R2C_GetGameRecords_Res.
     * @memberof MST
     * @interface IR2C_GetGameRecords_Res
     * @property {number|null} [RpcId] R2C_GetGameRecords_Res RpcId
     * @property {number|null} [Error] R2C_GetGameRecords_Res Error
     * @property {Array.<MST.IRouletteGameRecord>|null} [records] R2C_GetGameRecords_Res records
     * @property {number|null} [round] R2C_GetGameRecords_Res round
     */

    /**
     * Constructs a new R2C_GetGameRecords_Res.
     * @memberof MST
     * @classdesc Represents a R2C_GetGameRecords_Res.
     * @implements IR2C_GetGameRecords_Res
     * @constructor
     * @param {MST.IR2C_GetGameRecords_Res=} [p] Properties to set
     */
    function R2C_GetGameRecords_Res(p) {
      this.records = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_GetGameRecords_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.R2C_GetGameRecords_Res
     * @instance
     */


    R2C_GetGameRecords_Res.prototype.RpcId = 0;
    /**
     * R2C_GetGameRecords_Res Error.
     * @member {number} Error
     * @memberof MST.R2C_GetGameRecords_Res
     * @instance
     */

    R2C_GetGameRecords_Res.prototype.Error = 0;
    /**
     * R2C_GetGameRecords_Res records.
     * @member {Array.<MST.IRouletteGameRecord>} records
     * @memberof MST.R2C_GetGameRecords_Res
     * @instance
     */

    R2C_GetGameRecords_Res.prototype.records = $util.emptyArray;
    /**
     * R2C_GetGameRecords_Res round.
     * @member {number} round
     * @memberof MST.R2C_GetGameRecords_Res
     * @instance
     */

    R2C_GetGameRecords_Res.prototype.round = 0;
    /**
     * Creates a new R2C_GetGameRecords_Res instance using the specified properties.
     * @function create
     * @memberof MST.R2C_GetGameRecords_Res
     * @static
     * @param {MST.IR2C_GetGameRecords_Res=} [properties] Properties to set
     * @returns {MST.R2C_GetGameRecords_Res} R2C_GetGameRecords_Res instance
     */

    R2C_GetGameRecords_Res.create = function create(properties) {
      return new R2C_GetGameRecords_Res(properties);
    };
    /**
     * Encodes the specified R2C_GetGameRecords_Res message. Does not implicitly {@link MST.R2C_GetGameRecords_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_GetGameRecords_Res
     * @static
     * @param {MST.IR2C_GetGameRecords_Res} m R2C_GetGameRecords_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_GetGameRecords_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.records != null && m.records.length) {
        for (var i = 0; i < m.records.length; ++i) {
          $root.MST.RouletteGameRecord.encode(m.records[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(16).int32(m.round);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a R2C_GetGameRecords_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_GetGameRecords_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_GetGameRecords_Res} R2C_GetGameRecords_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_GetGameRecords_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_GetGameRecords_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.records && m.records.length)) m.records = [];
            m.records.push($root.MST.RouletteGameRecord.decode(r, r.uint32()));
            break;

          case 2:
            m.round = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_GetGameRecords_Res;
  }();

  MST.C2R_GetBetInfo_Req = function () {
    /**
     * Properties of a C2R_GetBetInfo_Req.
     * @memberof MST
     * @interface IC2R_GetBetInfo_Req
     * @property {number|null} [RpcId] C2R_GetBetInfo_Req RpcId
     * @property {number|null} [index] C2R_GetBetInfo_Req index
     * @property {number|null} [limit] C2R_GetBetInfo_Req limit
     */

    /**
     * Constructs a new C2R_GetBetInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2R_GetBetInfo_Req.
     * @implements IC2R_GetBetInfo_Req
     * @constructor
     * @param {MST.IC2R_GetBetInfo_Req=} [p] Properties to set
     */
    function C2R_GetBetInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2R_GetBetInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2R_GetBetInfo_Req
     * @instance
     */


    C2R_GetBetInfo_Req.prototype.RpcId = 0;
    /**
     * C2R_GetBetInfo_Req index.
     * @member {number} index
     * @memberof MST.C2R_GetBetInfo_Req
     * @instance
     */

    C2R_GetBetInfo_Req.prototype.index = 0;
    /**
     * C2R_GetBetInfo_Req limit.
     * @member {number} limit
     * @memberof MST.C2R_GetBetInfo_Req
     * @instance
     */

    C2R_GetBetInfo_Req.prototype.limit = 0;
    /**
     * Creates a new C2R_GetBetInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2R_GetBetInfo_Req
     * @static
     * @param {MST.IC2R_GetBetInfo_Req=} [properties] Properties to set
     * @returns {MST.C2R_GetBetInfo_Req} C2R_GetBetInfo_Req instance
     */

    C2R_GetBetInfo_Req.create = function create(properties) {
      return new C2R_GetBetInfo_Req(properties);
    };
    /**
     * Encodes the specified C2R_GetBetInfo_Req message. Does not implicitly {@link MST.C2R_GetBetInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2R_GetBetInfo_Req
     * @static
     * @param {MST.IC2R_GetBetInfo_Req} m C2R_GetBetInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2R_GetBetInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(8).int32(m.index);
      if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(16).int32(m.limit);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2R_GetBetInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2R_GetBetInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2R_GetBetInfo_Req} C2R_GetBetInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2R_GetBetInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2R_GetBetInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.index = r.int32();
            break;

          case 2:
            m.limit = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2R_GetBetInfo_Req;
  }();

  MST.RouletteBetDetail = function () {
    /**
     * Properties of a RouletteBetDetail.
     * @memberof MST
     * @interface IRouletteBetDetail
     * @property {number|null} [round] RouletteBetDetail round
     * @property {number|Long|null} [betChips] RouletteBetDetail betChips
     * @property {number|null} [color] RouletteBetDetail color
     * @property {number|Long|null} [winChips] RouletteBetDetail winChips
     */

    /**
     * Constructs a new RouletteBetDetail.
     * @memberof MST
     * @classdesc Represents a RouletteBetDetail.
     * @implements IRouletteBetDetail
     * @constructor
     * @param {MST.IRouletteBetDetail=} [p] Properties to set
     */
    function RouletteBetDetail(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * RouletteBetDetail round.
     * @member {number} round
     * @memberof MST.RouletteBetDetail
     * @instance
     */


    RouletteBetDetail.prototype.round = 0;
    /**
     * RouletteBetDetail betChips.
     * @member {number|Long} betChips
     * @memberof MST.RouletteBetDetail
     * @instance
     */

    RouletteBetDetail.prototype.betChips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * RouletteBetDetail color.
     * @member {number} color
     * @memberof MST.RouletteBetDetail
     * @instance
     */

    RouletteBetDetail.prototype.color = 0;
    /**
     * RouletteBetDetail winChips.
     * @member {number|Long} winChips
     * @memberof MST.RouletteBetDetail
     * @instance
     */

    RouletteBetDetail.prototype.winChips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new RouletteBetDetail instance using the specified properties.
     * @function create
     * @memberof MST.RouletteBetDetail
     * @static
     * @param {MST.IRouletteBetDetail=} [properties] Properties to set
     * @returns {MST.RouletteBetDetail} RouletteBetDetail instance
     */

    RouletteBetDetail.create = function create(properties) {
      return new RouletteBetDetail(properties);
    };
    /**
     * Encodes the specified RouletteBetDetail message. Does not implicitly {@link MST.RouletteBetDetail.verify|verify} messages.
     * @function encode
     * @memberof MST.RouletteBetDetail
     * @static
     * @param {MST.IRouletteBetDetail} m RouletteBetDetail message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    RouletteBetDetail.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(8).int32(m.round);
      if (m.betChips != null && Object.hasOwnProperty.call(m, "betChips")) w.uint32(16).int64(m.betChips);
      if (m.color != null && Object.hasOwnProperty.call(m, "color")) w.uint32(24).int32(m.color);
      if (m.winChips != null && Object.hasOwnProperty.call(m, "winChips")) w.uint32(32).int64(m.winChips);
      return w;
    };
    /**
     * Decodes a RouletteBetDetail message from the specified reader or buffer.
     * @function decode
     * @memberof MST.RouletteBetDetail
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.RouletteBetDetail} RouletteBetDetail
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    RouletteBetDetail.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.RouletteBetDetail();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.round = r.int32();
            break;

          case 2:
            m.betChips = r.int64();
            break;

          case 3:
            m.color = r.int32();
            break;

          case 4:
            m.winChips = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return RouletteBetDetail;
  }();

  MST.R2C_GetBetInfo_Res = function () {
    /**
     * Properties of a R2C_GetBetInfo_Res.
     * @memberof MST
     * @interface IR2C_GetBetInfo_Res
     * @property {number|null} [RpcId] R2C_GetBetInfo_Res RpcId
     * @property {number|null} [Error] R2C_GetBetInfo_Res Error
     * @property {Array.<MST.IRouletteBetDetail>|null} [records] R2C_GetBetInfo_Res records
     * @property {number|null} [index] R2C_GetBetInfo_Res index
     */

    /**
     * Constructs a new R2C_GetBetInfo_Res.
     * @memberof MST
     * @classdesc Represents a R2C_GetBetInfo_Res.
     * @implements IR2C_GetBetInfo_Res
     * @constructor
     * @param {MST.IR2C_GetBetInfo_Res=} [p] Properties to set
     */
    function R2C_GetBetInfo_Res(p) {
      this.records = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_GetBetInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.R2C_GetBetInfo_Res
     * @instance
     */


    R2C_GetBetInfo_Res.prototype.RpcId = 0;
    /**
     * R2C_GetBetInfo_Res Error.
     * @member {number} Error
     * @memberof MST.R2C_GetBetInfo_Res
     * @instance
     */

    R2C_GetBetInfo_Res.prototype.Error = 0;
    /**
     * R2C_GetBetInfo_Res records.
     * @member {Array.<MST.IRouletteBetDetail>} records
     * @memberof MST.R2C_GetBetInfo_Res
     * @instance
     */

    R2C_GetBetInfo_Res.prototype.records = $util.emptyArray;
    /**
     * R2C_GetBetInfo_Res index.
     * @member {number} index
     * @memberof MST.R2C_GetBetInfo_Res
     * @instance
     */

    R2C_GetBetInfo_Res.prototype.index = 0;
    /**
     * Creates a new R2C_GetBetInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.R2C_GetBetInfo_Res
     * @static
     * @param {MST.IR2C_GetBetInfo_Res=} [properties] Properties to set
     * @returns {MST.R2C_GetBetInfo_Res} R2C_GetBetInfo_Res instance
     */

    R2C_GetBetInfo_Res.create = function create(properties) {
      return new R2C_GetBetInfo_Res(properties);
    };
    /**
     * Encodes the specified R2C_GetBetInfo_Res message. Does not implicitly {@link MST.R2C_GetBetInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_GetBetInfo_Res
     * @static
     * @param {MST.IR2C_GetBetInfo_Res} m R2C_GetBetInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_GetBetInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();

      if (m.records != null && m.records.length) {
        for (var i = 0; i < m.records.length; ++i) {
          $root.MST.RouletteBetDetail.encode(m.records[i], w.uint32(10).fork()).ldelim();
        }
      }

      if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(16).int32(m.index);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      return w;
    };
    /**
     * Decodes a R2C_GetBetInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_GetBetInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_GetBetInfo_Res} R2C_GetBetInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_GetBetInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_GetBetInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 1:
            if (!(m.records && m.records.length)) m.records = [];
            m.records.push($root.MST.RouletteBetDetail.decode(r, r.uint32()));
            break;

          case 2:
            m.index = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_GetBetInfo_Res;
  }();

  MST.R2C_Calc_Mes = function () {
    /**
     * Properties of a R2C_Calc_Mes.
     * @memberof MST
     * @interface IR2C_Calc_Mes
     * @property {number|Long|null} [chips] R2C_Calc_Mes chips
     */

    /**
     * Constructs a new R2C_Calc_Mes.
     * @memberof MST
     * @classdesc Represents a R2C_Calc_Mes.
     * @implements IR2C_Calc_Mes
     * @constructor
     * @param {MST.IR2C_Calc_Mes=} [p] Properties to set
     */
    function R2C_Calc_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_Calc_Mes chips.
     * @member {number|Long} chips
     * @memberof MST.R2C_Calc_Mes
     * @instance
     */


    R2C_Calc_Mes.prototype.chips = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new R2C_Calc_Mes instance using the specified properties.
     * @function create
     * @memberof MST.R2C_Calc_Mes
     * @static
     * @param {MST.IR2C_Calc_Mes=} [properties] Properties to set
     * @returns {MST.R2C_Calc_Mes} R2C_Calc_Mes instance
     */

    R2C_Calc_Mes.create = function create(properties) {
      return new R2C_Calc_Mes(properties);
    };
    /**
     * Encodes the specified R2C_Calc_Mes message. Does not implicitly {@link MST.R2C_Calc_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_Calc_Mes
     * @static
     * @param {MST.IR2C_Calc_Mes} m R2C_Calc_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_Calc_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.chips != null && Object.hasOwnProperty.call(m, "chips")) w.uint32(8).int64(m.chips);
      return w;
    };
    /**
     * Decodes a R2C_Calc_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_Calc_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_Calc_Mes} R2C_Calc_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_Calc_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_Calc_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.chips = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_Calc_Mes;
  }();

  MST.R2C_Bet_Mes = function () {
    /**
     * Properties of a R2C_Bet_Mes.
     * @memberof MST
     * @interface IR2C_Bet_Mes
     * @property {MST.IRouletteBetInfo|null} [info] R2C_Bet_Mes info
     */

    /**
     * Constructs a new R2C_Bet_Mes.
     * @memberof MST
     * @classdesc Represents a R2C_Bet_Mes.
     * @implements IR2C_Bet_Mes
     * @constructor
     * @param {MST.IR2C_Bet_Mes=} [p] Properties to set
     */
    function R2C_Bet_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_Bet_Mes info.
     * @member {MST.IRouletteBetInfo|null|undefined} info
     * @memberof MST.R2C_Bet_Mes
     * @instance
     */


    R2C_Bet_Mes.prototype.info = null;
    /**
     * Creates a new R2C_Bet_Mes instance using the specified properties.
     * @function create
     * @memberof MST.R2C_Bet_Mes
     * @static
     * @param {MST.IR2C_Bet_Mes=} [properties] Properties to set
     * @returns {MST.R2C_Bet_Mes} R2C_Bet_Mes instance
     */

    R2C_Bet_Mes.create = function create(properties) {
      return new R2C_Bet_Mes(properties);
    };
    /**
     * Encodes the specified R2C_Bet_Mes message. Does not implicitly {@link MST.R2C_Bet_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_Bet_Mes
     * @static
     * @param {MST.IR2C_Bet_Mes} m R2C_Bet_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_Bet_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.info != null && Object.hasOwnProperty.call(m, "info")) $root.MST.RouletteBetInfo.encode(m.info, w.uint32(10).fork()).ldelim();
      return w;
    };
    /**
     * Decodes a R2C_Bet_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_Bet_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_Bet_Mes} R2C_Bet_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_Bet_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_Bet_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.info = $root.MST.RouletteBetInfo.decode(r, r.uint32());
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_Bet_Mes;
  }();

  MST.R2C_PaybackPhase_Mes = function () {
    /**
     * Properties of a R2C_PaybackPhase_Mes.
     * @memberof MST
     * @interface IR2C_PaybackPhase_Mes
     * @property {number|null} [nextRound] R2C_PaybackPhase_Mes nextRound
     * @property {string|null} [hashSalt] R2C_PaybackPhase_Mes hashSalt
     * @property {number|null} [randomNum] R2C_PaybackPhase_Mes randomNum
     * @property {number|null} [color] R2C_PaybackPhase_Mes color
     */

    /**
     * Constructs a new R2C_PaybackPhase_Mes.
     * @memberof MST
     * @classdesc Represents a R2C_PaybackPhase_Mes.
     * @implements IR2C_PaybackPhase_Mes
     * @constructor
     * @param {MST.IR2C_PaybackPhase_Mes=} [p] Properties to set
     */
    function R2C_PaybackPhase_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * R2C_PaybackPhase_Mes nextRound.
     * @member {number} nextRound
     * @memberof MST.R2C_PaybackPhase_Mes
     * @instance
     */


    R2C_PaybackPhase_Mes.prototype.nextRound = 0;
    /**
     * R2C_PaybackPhase_Mes hashSalt.
     * @member {string} hashSalt
     * @memberof MST.R2C_PaybackPhase_Mes
     * @instance
     */

    R2C_PaybackPhase_Mes.prototype.hashSalt = "";
    /**
     * R2C_PaybackPhase_Mes randomNum.
     * @member {number} randomNum
     * @memberof MST.R2C_PaybackPhase_Mes
     * @instance
     */

    R2C_PaybackPhase_Mes.prototype.randomNum = 0;
    /**
     * R2C_PaybackPhase_Mes color.
     * @member {number} color
     * @memberof MST.R2C_PaybackPhase_Mes
     * @instance
     */

    R2C_PaybackPhase_Mes.prototype.color = 0;
    /**
     * Creates a new R2C_PaybackPhase_Mes instance using the specified properties.
     * @function create
     * @memberof MST.R2C_PaybackPhase_Mes
     * @static
     * @param {MST.IR2C_PaybackPhase_Mes=} [properties] Properties to set
     * @returns {MST.R2C_PaybackPhase_Mes} R2C_PaybackPhase_Mes instance
     */

    R2C_PaybackPhase_Mes.create = function create(properties) {
      return new R2C_PaybackPhase_Mes(properties);
    };
    /**
     * Encodes the specified R2C_PaybackPhase_Mes message. Does not implicitly {@link MST.R2C_PaybackPhase_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.R2C_PaybackPhase_Mes
     * @static
     * @param {MST.IR2C_PaybackPhase_Mes} m R2C_PaybackPhase_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    R2C_PaybackPhase_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.nextRound != null && Object.hasOwnProperty.call(m, "nextRound")) w.uint32(8).int32(m.nextRound);
      if (m.hashSalt != null && Object.hasOwnProperty.call(m, "hashSalt")) w.uint32(18).string(m.hashSalt);
      if (m.randomNum != null && Object.hasOwnProperty.call(m, "randomNum")) w.uint32(24).int32(m.randomNum);
      if (m.color != null && Object.hasOwnProperty.call(m, "color")) w.uint32(32).int32(m.color);
      return w;
    };
    /**
     * Decodes a R2C_PaybackPhase_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.R2C_PaybackPhase_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.R2C_PaybackPhase_Mes} R2C_PaybackPhase_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    R2C_PaybackPhase_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.R2C_PaybackPhase_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.nextRound = r.int32();
            break;

          case 2:
            m.hashSalt = r.string();
            break;

          case 3:
            m.randomNum = r.int32();
            break;

          case 4:
            m.color = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return R2C_PaybackPhase_Mes;
  }();
  /**
   * WingoMode enum.
   * @name MST.WingoMode
   * @enum {number}
   * @property {number} CepatPlus=0 CepatPlus value
   * @property {number} Cepat=1 Cepat value
   * @property {number} Standar=2 Standar value
   */


  MST.WingoMode = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "CepatPlus"] = 0;
    values[valuesById[1] = "Cepat"] = 1;
    values[valuesById[2] = "Standar"] = 2;
    return values;
  }();
  /**
   * WingoColor enum.
   * @name MST.WingoColor
   * @enum {number}
   * @property {number} Green=0 Green value
   * @property {number} Purple=1 Purple value
   * @property {number} Red=2 Red value
   * @property {number} Azure=3 Azure value
   * @property {number} Yellow=4 Yellow value
   * @property {number} Blue=5 Blue value
   * @property {number} AR=6 AR value
   * @property {number} AG=7 AG value
   * @property {number} BR=8 BR value
   * @property {number} BG=9 BG value
   */


  MST.WingoColor = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Green"] = 0;
    values[valuesById[1] = "Purple"] = 1;
    values[valuesById[2] = "Red"] = 2;
    values[valuesById[3] = "Azure"] = 3;
    values[valuesById[4] = "Yellow"] = 4;
    values[valuesById[5] = "Blue"] = 5;
    values[valuesById[6] = "AR"] = 6;
    values[valuesById[7] = "AG"] = 7;
    values[valuesById[8] = "BR"] = 8;
    values[valuesById[9] = "BG"] = 9;
    return values;
  }();
  /**
   * WingoBetGoldType enum.
   * @name MST.WingoBetGoldType
   * @enum {number}
   * @property {number} Gold2000=0 Gold2000 value
   * @property {number} Gold20000=1 Gold20000 value
   * @property {number} Half=2 Half value
   * @property {number} AllIn=3 AllIn value
   */


  MST.WingoBetGoldType = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Gold2000"] = 0;
    values[valuesById[1] = "Gold20000"] = 1;
    values[valuesById[2] = "Half"] = 2;
    values[valuesById[3] = "AllIn"] = 3;
    return values;
  }();
  /**
   * WingoBetType enum.
   * @name MST.WingoBetType
   * @enum {number}
   * @property {number} Num=0 Num value
   * @property {number} Color=1 Color value
   */


  MST.WingoBetType = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "Num"] = 0;
    values[valuesById[1] = "Color"] = 1;
    return values;
  }();

  MST.WingoHistoryInfo = function () {
    /**
     * Properties of a WingoHistoryInfo.
     * @memberof MST
     * @interface IWingoHistoryInfo
     * @property {number|Long|null} [Issue] WingoHistoryInfo Issue
     * @property {number|null} [Num] WingoHistoryInfo Num
     * @property {number|null} [Harga] WingoHistoryInfo Harga
     */

    /**
     * Constructs a new WingoHistoryInfo.
     * @memberof MST
     * @classdesc Represents a WingoHistoryInfo.
     * @implements IWingoHistoryInfo
     * @constructor
     * @param {MST.IWingoHistoryInfo=} [p] Properties to set
     */
    function WingoHistoryInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * WingoHistoryInfo Issue.
     * @member {number|Long} Issue
     * @memberof MST.WingoHistoryInfo
     * @instance
     */


    WingoHistoryInfo.prototype.Issue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WingoHistoryInfo Num.
     * @member {number} Num
     * @memberof MST.WingoHistoryInfo
     * @instance
     */

    WingoHistoryInfo.prototype.Num = 0;
    /**
     * WingoHistoryInfo Harga.
     * @member {number} Harga
     * @memberof MST.WingoHistoryInfo
     * @instance
     */

    WingoHistoryInfo.prototype.Harga = 0;
    /**
     * Creates a new WingoHistoryInfo instance using the specified properties.
     * @function create
     * @memberof MST.WingoHistoryInfo
     * @static
     * @param {MST.IWingoHistoryInfo=} [properties] Properties to set
     * @returns {MST.WingoHistoryInfo} WingoHistoryInfo instance
     */

    WingoHistoryInfo.create = function create(properties) {
      return new WingoHistoryInfo(properties);
    };
    /**
     * Encodes the specified WingoHistoryInfo message. Does not implicitly {@link MST.WingoHistoryInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.WingoHistoryInfo
     * @static
     * @param {MST.IWingoHistoryInfo} m WingoHistoryInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    WingoHistoryInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Issue != null && Object.hasOwnProperty.call(m, "Issue")) w.uint32(8).int64(m.Issue);
      if (m.Num != null && Object.hasOwnProperty.call(m, "Num")) w.uint32(16).int32(m.Num);
      if (m.Harga != null && Object.hasOwnProperty.call(m, "Harga")) w.uint32(24).int32(m.Harga);
      return w;
    };
    /**
     * Decodes a WingoHistoryInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.WingoHistoryInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.WingoHistoryInfo} WingoHistoryInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    WingoHistoryInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.WingoHistoryInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Issue = r.int64();
            break;

          case 2:
            m.Num = r.int32();
            break;

          case 3:
            m.Harga = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return WingoHistoryInfo;
  }();

  MST.C2M_GetWingoInfo_Req = function () {
    /**
     * Properties of a C2M_GetWingoInfo_Req.
     * @memberof MST
     * @interface IC2M_GetWingoInfo_Req
     * @property {number|null} [RpcId] C2M_GetWingoInfo_Req RpcId
     */

    /**
     * Constructs a new C2M_GetWingoInfo_Req.
     * @memberof MST
     * @classdesc Represents a C2M_GetWingoInfo_Req.
     * @implements IC2M_GetWingoInfo_Req
     * @constructor
     * @param {MST.IC2M_GetWingoInfo_Req=} [p] Properties to set
     */
    function C2M_GetWingoInfo_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_GetWingoInfo_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_GetWingoInfo_Req
     * @instance
     */


    C2M_GetWingoInfo_Req.prototype.RpcId = 0;
    /**
     * Creates a new C2M_GetWingoInfo_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_GetWingoInfo_Req
     * @static
     * @param {MST.IC2M_GetWingoInfo_Req=} [properties] Properties to set
     * @returns {MST.C2M_GetWingoInfo_Req} C2M_GetWingoInfo_Req instance
     */

    C2M_GetWingoInfo_Req.create = function create(properties) {
      return new C2M_GetWingoInfo_Req(properties);
    };
    /**
     * Encodes the specified C2M_GetWingoInfo_Req message. Does not implicitly {@link MST.C2M_GetWingoInfo_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_GetWingoInfo_Req
     * @static
     * @param {MST.IC2M_GetWingoInfo_Req} m C2M_GetWingoInfo_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_GetWingoInfo_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_GetWingoInfo_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_GetWingoInfo_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_GetWingoInfo_Req} C2M_GetWingoInfo_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_GetWingoInfo_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_GetWingoInfo_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_GetWingoInfo_Req;
  }();

  MST.M2C_GetWingoInfo_Res = function () {
    /**
     * Properties of a M2C_GetWingoInfo_Res.
     * @memberof MST
     * @interface IM2C_GetWingoInfo_Res
     * @property {number|null} [RpcId] M2C_GetWingoInfo_Res RpcId
     * @property {number|null} [Error] M2C_GetWingoInfo_Res Error
     * @property {string|null} [Message] M2C_GetWingoInfo_Res Message
     * @property {number|Long|null} [CepatPlusTimestamp] M2C_GetWingoInfo_Res CepatPlusTimestamp
     * @property {number|Long|null} [CepatTimestamp] M2C_GetWingoInfo_Res CepatTimestamp
     * @property {number|Long|null} [StandarTimestamp] M2C_GetWingoInfo_Res StandarTimestamp
     * @property {number|null} [Cost] M2C_GetWingoInfo_Res Cost
     */

    /**
     * Constructs a new M2C_GetWingoInfo_Res.
     * @memberof MST
     * @classdesc Represents a M2C_GetWingoInfo_Res.
     * @implements IM2C_GetWingoInfo_Res
     * @constructor
     * @param {MST.IM2C_GetWingoInfo_Res=} [p] Properties to set
     */
    function M2C_GetWingoInfo_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_GetWingoInfo_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */


    M2C_GetWingoInfo_Res.prototype.RpcId = 0;
    /**
     * M2C_GetWingoInfo_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.Error = 0;
    /**
     * M2C_GetWingoInfo_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.Message = "";
    /**
     * M2C_GetWingoInfo_Res CepatPlusTimestamp.
     * @member {number|Long} CepatPlusTimestamp
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.CepatPlusTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetWingoInfo_Res CepatTimestamp.
     * @member {number|Long} CepatTimestamp
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.CepatTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetWingoInfo_Res StandarTimestamp.
     * @member {number|Long} StandarTimestamp
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.StandarTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetWingoInfo_Res Cost.
     * @member {number} Cost
     * @memberof MST.M2C_GetWingoInfo_Res
     * @instance
     */

    M2C_GetWingoInfo_Res.prototype.Cost = 0;
    /**
     * Creates a new M2C_GetWingoInfo_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_GetWingoInfo_Res
     * @static
     * @param {MST.IM2C_GetWingoInfo_Res=} [properties] Properties to set
     * @returns {MST.M2C_GetWingoInfo_Res} M2C_GetWingoInfo_Res instance
     */

    M2C_GetWingoInfo_Res.create = function create(properties) {
      return new M2C_GetWingoInfo_Res(properties);
    };
    /**
     * Encodes the specified M2C_GetWingoInfo_Res message. Does not implicitly {@link MST.M2C_GetWingoInfo_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_GetWingoInfo_Res
     * @static
     * @param {MST.IM2C_GetWingoInfo_Res} m M2C_GetWingoInfo_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_GetWingoInfo_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.CepatPlusTimestamp != null && Object.hasOwnProperty.call(m, "CepatPlusTimestamp")) w.uint32(8).int64(m.CepatPlusTimestamp);
      if (m.CepatTimestamp != null && Object.hasOwnProperty.call(m, "CepatTimestamp")) w.uint32(16).int64(m.CepatTimestamp);
      if (m.StandarTimestamp != null && Object.hasOwnProperty.call(m, "StandarTimestamp")) w.uint32(24).int64(m.StandarTimestamp);
      if (m.Cost != null && Object.hasOwnProperty.call(m, "Cost")) w.uint32(32).int32(m.Cost);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_GetWingoInfo_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_GetWingoInfo_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_GetWingoInfo_Res} M2C_GetWingoInfo_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_GetWingoInfo_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_GetWingoInfo_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.CepatPlusTimestamp = r.int64();
            break;

          case 2:
            m.CepatTimestamp = r.int64();
            break;

          case 3:
            m.StandarTimestamp = r.int64();
            break;

          case 4:
            m.Cost = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_GetWingoInfo_Res;
  }();

  MST.C2M_GetWingoHistory_Req = function () {
    /**
     * Properties of a C2M_GetWingoHistory_Req.
     * @memberof MST
     * @interface IC2M_GetWingoHistory_Req
     * @property {number|null} [RpcId] C2M_GetWingoHistory_Req RpcId
     * @property {number|null} [Mode] C2M_GetWingoHistory_Req Mode
     */

    /**
     * Constructs a new C2M_GetWingoHistory_Req.
     * @memberof MST
     * @classdesc Represents a C2M_GetWingoHistory_Req.
     * @implements IC2M_GetWingoHistory_Req
     * @constructor
     * @param {MST.IC2M_GetWingoHistory_Req=} [p] Properties to set
     */
    function C2M_GetWingoHistory_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_GetWingoHistory_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_GetWingoHistory_Req
     * @instance
     */


    C2M_GetWingoHistory_Req.prototype.RpcId = 0;
    /**
     * C2M_GetWingoHistory_Req Mode.
     * @member {number} Mode
     * @memberof MST.C2M_GetWingoHistory_Req
     * @instance
     */

    C2M_GetWingoHistory_Req.prototype.Mode = 0;
    /**
     * Creates a new C2M_GetWingoHistory_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_GetWingoHistory_Req
     * @static
     * @param {MST.IC2M_GetWingoHistory_Req=} [properties] Properties to set
     * @returns {MST.C2M_GetWingoHistory_Req} C2M_GetWingoHistory_Req instance
     */

    C2M_GetWingoHistory_Req.create = function create(properties) {
      return new C2M_GetWingoHistory_Req(properties);
    };
    /**
     * Encodes the specified C2M_GetWingoHistory_Req message. Does not implicitly {@link MST.C2M_GetWingoHistory_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_GetWingoHistory_Req
     * @static
     * @param {MST.IC2M_GetWingoHistory_Req} m C2M_GetWingoHistory_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_GetWingoHistory_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Mode != null && Object.hasOwnProperty.call(m, "Mode")) w.uint32(8).int32(m.Mode);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_GetWingoHistory_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_GetWingoHistory_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_GetWingoHistory_Req} C2M_GetWingoHistory_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_GetWingoHistory_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_GetWingoHistory_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.Mode = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_GetWingoHistory_Req;
  }();

  MST.M2C_GetWingoHistory_Res = function () {
    /**
     * Properties of a M2C_GetWingoHistory_Res.
     * @memberof MST
     * @interface IM2C_GetWingoHistory_Res
     * @property {number|null} [RpcId] M2C_GetWingoHistory_Res RpcId
     * @property {number|null} [Error] M2C_GetWingoHistory_Res Error
     * @property {string|null} [Message] M2C_GetWingoHistory_Res Message
     * @property {number|null} [Mode] M2C_GetWingoHistory_Res Mode
     * @property {number|Long|null} [CurrIssue] M2C_GetWingoHistory_Res CurrIssue
     * @property {Array.<MST.IWingoHistoryInfo>|null} [HistoryInfo] M2C_GetWingoHistory_Res HistoryInfo
     */

    /**
     * Constructs a new M2C_GetWingoHistory_Res.
     * @memberof MST
     * @classdesc Represents a M2C_GetWingoHistory_Res.
     * @implements IM2C_GetWingoHistory_Res
     * @constructor
     * @param {MST.IM2C_GetWingoHistory_Res=} [p] Properties to set
     */
    function M2C_GetWingoHistory_Res(p) {
      this.HistoryInfo = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_GetWingoHistory_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */


    M2C_GetWingoHistory_Res.prototype.RpcId = 0;
    /**
     * M2C_GetWingoHistory_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */

    M2C_GetWingoHistory_Res.prototype.Error = 0;
    /**
     * M2C_GetWingoHistory_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */

    M2C_GetWingoHistory_Res.prototype.Message = "";
    /**
     * M2C_GetWingoHistory_Res Mode.
     * @member {number} Mode
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */

    M2C_GetWingoHistory_Res.prototype.Mode = 0;
    /**
     * M2C_GetWingoHistory_Res CurrIssue.
     * @member {number|Long} CurrIssue
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */

    M2C_GetWingoHistory_Res.prototype.CurrIssue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_GetWingoHistory_Res HistoryInfo.
     * @member {Array.<MST.IWingoHistoryInfo>} HistoryInfo
     * @memberof MST.M2C_GetWingoHistory_Res
     * @instance
     */

    M2C_GetWingoHistory_Res.prototype.HistoryInfo = $util.emptyArray;
    /**
     * Creates a new M2C_GetWingoHistory_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_GetWingoHistory_Res
     * @static
     * @param {MST.IM2C_GetWingoHistory_Res=} [properties] Properties to set
     * @returns {MST.M2C_GetWingoHistory_Res} M2C_GetWingoHistory_Res instance
     */

    M2C_GetWingoHistory_Res.create = function create(properties) {
      return new M2C_GetWingoHistory_Res(properties);
    };
    /**
     * Encodes the specified M2C_GetWingoHistory_Res message. Does not implicitly {@link MST.M2C_GetWingoHistory_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_GetWingoHistory_Res
     * @static
     * @param {MST.IM2C_GetWingoHistory_Res} m M2C_GetWingoHistory_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_GetWingoHistory_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Mode != null && Object.hasOwnProperty.call(m, "Mode")) w.uint32(8).int32(m.Mode);
      if (m.CurrIssue != null && Object.hasOwnProperty.call(m, "CurrIssue")) w.uint32(16).int64(m.CurrIssue);

      if (m.HistoryInfo != null && m.HistoryInfo.length) {
        for (var i = 0; i < m.HistoryInfo.length; ++i) {
          $root.MST.WingoHistoryInfo.encode(m.HistoryInfo[i], w.uint32(26).fork()).ldelim();
        }
      }

      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_GetWingoHistory_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_GetWingoHistory_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_GetWingoHistory_Res} M2C_GetWingoHistory_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_GetWingoHistory_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_GetWingoHistory_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          case 1:
            m.Mode = r.int32();
            break;

          case 2:
            m.CurrIssue = r.int64();
            break;

          case 3:
            if (!(m.HistoryInfo && m.HistoryInfo.length)) m.HistoryInfo = [];
            m.HistoryInfo.push($root.MST.WingoHistoryInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_GetWingoHistory_Res;
  }();

  MST.M2C_WingoLottery_Mes = function () {
    /**
     * Properties of a M2C_WingoLottery_Mes.
     * @memberof MST
     * @interface IM2C_WingoLottery_Mes
     * @property {number|null} [Mode] M2C_WingoLottery_Mes Mode
     * @property {MST.IWingoHistoryInfo|null} [LotteryInfo] M2C_WingoLottery_Mes LotteryInfo
     * @property {number|Long|null} [NextTimestamp] M2C_WingoLottery_Mes NextTimestamp
     * @property {number|Long|null} [NextIssue] M2C_WingoLottery_Mes NextIssue
     */

    /**
     * Constructs a new M2C_WingoLottery_Mes.
     * @memberof MST
     * @classdesc Represents a M2C_WingoLottery_Mes.
     * @implements IM2C_WingoLottery_Mes
     * @constructor
     * @param {MST.IM2C_WingoLottery_Mes=} [p] Properties to set
     */
    function M2C_WingoLottery_Mes(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_WingoLottery_Mes Mode.
     * @member {number} Mode
     * @memberof MST.M2C_WingoLottery_Mes
     * @instance
     */


    M2C_WingoLottery_Mes.prototype.Mode = 0;
    /**
     * M2C_WingoLottery_Mes LotteryInfo.
     * @member {MST.IWingoHistoryInfo|null|undefined} LotteryInfo
     * @memberof MST.M2C_WingoLottery_Mes
     * @instance
     */

    M2C_WingoLottery_Mes.prototype.LotteryInfo = null;
    /**
     * M2C_WingoLottery_Mes NextTimestamp.
     * @member {number|Long} NextTimestamp
     * @memberof MST.M2C_WingoLottery_Mes
     * @instance
     */

    M2C_WingoLottery_Mes.prototype.NextTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * M2C_WingoLottery_Mes NextIssue.
     * @member {number|Long} NextIssue
     * @memberof MST.M2C_WingoLottery_Mes
     * @instance
     */

    M2C_WingoLottery_Mes.prototype.NextIssue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * Creates a new M2C_WingoLottery_Mes instance using the specified properties.
     * @function create
     * @memberof MST.M2C_WingoLottery_Mes
     * @static
     * @param {MST.IM2C_WingoLottery_Mes=} [properties] Properties to set
     * @returns {MST.M2C_WingoLottery_Mes} M2C_WingoLottery_Mes instance
     */

    M2C_WingoLottery_Mes.create = function create(properties) {
      return new M2C_WingoLottery_Mes(properties);
    };
    /**
     * Encodes the specified M2C_WingoLottery_Mes message. Does not implicitly {@link MST.M2C_WingoLottery_Mes.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_WingoLottery_Mes
     * @static
     * @param {MST.IM2C_WingoLottery_Mes} m M2C_WingoLottery_Mes message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_WingoLottery_Mes.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Mode != null && Object.hasOwnProperty.call(m, "Mode")) w.uint32(8).int32(m.Mode);
      if (m.LotteryInfo != null && Object.hasOwnProperty.call(m, "LotteryInfo")) $root.MST.WingoHistoryInfo.encode(m.LotteryInfo, w.uint32(18).fork()).ldelim();
      if (m.NextTimestamp != null && Object.hasOwnProperty.call(m, "NextTimestamp")) w.uint32(24).int64(m.NextTimestamp);
      if (m.NextIssue != null && Object.hasOwnProperty.call(m, "NextIssue")) w.uint32(32).int64(m.NextIssue);
      return w;
    };
    /**
     * Decodes a M2C_WingoLottery_Mes message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_WingoLottery_Mes
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_WingoLottery_Mes} M2C_WingoLottery_Mes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_WingoLottery_Mes.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_WingoLottery_Mes();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.Mode = r.int32();
            break;

          case 2:
            m.LotteryInfo = $root.MST.WingoHistoryInfo.decode(r, r.uint32());
            break;

          case 3:
            m.NextTimestamp = r.int64();
            break;

          case 4:
            m.NextIssue = r.int64();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_WingoLottery_Mes;
  }();

  MST.C2M_WingoBet_Req = function () {
    /**
     * Properties of a C2M_WingoBet_Req.
     * @memberof MST
     * @interface IC2M_WingoBet_Req
     * @property {number|null} [RpcId] C2M_WingoBet_Req RpcId
     * @property {number|null} [Mode] C2M_WingoBet_Req Mode
     * @property {number|null} [BetType] C2M_WingoBet_Req BetType
     * @property {number|null} [BetValue] C2M_WingoBet_Req BetValue
     * @property {number|null} [Multi] C2M_WingoBet_Req Multi
     * @property {number|null} [GoldType] C2M_WingoBet_Req GoldType
     */

    /**
     * Constructs a new C2M_WingoBet_Req.
     * @memberof MST
     * @classdesc Represents a C2M_WingoBet_Req.
     * @implements IC2M_WingoBet_Req
     * @constructor
     * @param {MST.IC2M_WingoBet_Req=} [p] Properties to set
     */
    function C2M_WingoBet_Req(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2M_WingoBet_Req RpcId.
     * @member {number} RpcId
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */


    C2M_WingoBet_Req.prototype.RpcId = 0;
    /**
     * C2M_WingoBet_Req Mode.
     * @member {number} Mode
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */

    C2M_WingoBet_Req.prototype.Mode = 0;
    /**
     * C2M_WingoBet_Req BetType.
     * @member {number} BetType
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */

    C2M_WingoBet_Req.prototype.BetType = 0;
    /**
     * C2M_WingoBet_Req BetValue.
     * @member {number} BetValue
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */

    C2M_WingoBet_Req.prototype.BetValue = 0;
    /**
     * C2M_WingoBet_Req Multi.
     * @member {number} Multi
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */

    C2M_WingoBet_Req.prototype.Multi = 0;
    /**
     * C2M_WingoBet_Req GoldType.
     * @member {number} GoldType
     * @memberof MST.C2M_WingoBet_Req
     * @instance
     */

    C2M_WingoBet_Req.prototype.GoldType = 0;
    /**
     * Creates a new C2M_WingoBet_Req instance using the specified properties.
     * @function create
     * @memberof MST.C2M_WingoBet_Req
     * @static
     * @param {MST.IC2M_WingoBet_Req=} [properties] Properties to set
     * @returns {MST.C2M_WingoBet_Req} C2M_WingoBet_Req instance
     */

    C2M_WingoBet_Req.create = function create(properties) {
      return new C2M_WingoBet_Req(properties);
    };
    /**
     * Encodes the specified C2M_WingoBet_Req message. Does not implicitly {@link MST.C2M_WingoBet_Req.verify|verify} messages.
     * @function encode
     * @memberof MST.C2M_WingoBet_Req
     * @static
     * @param {MST.IC2M_WingoBet_Req} m C2M_WingoBet_Req message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2M_WingoBet_Req.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.Mode != null && Object.hasOwnProperty.call(m, "Mode")) w.uint32(8).int32(m.Mode);
      if (m.BetType != null && Object.hasOwnProperty.call(m, "BetType")) w.uint32(16).int32(m.BetType);
      if (m.BetValue != null && Object.hasOwnProperty.call(m, "BetValue")) w.uint32(24).int32(m.BetValue);
      if (m.Multi != null && Object.hasOwnProperty.call(m, "Multi")) w.uint32(32).int32(m.Multi);
      if (m.GoldType != null && Object.hasOwnProperty.call(m, "GoldType")) w.uint32(40).int32(m.GoldType);
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      return w;
    };
    /**
     * Decodes a C2M_WingoBet_Req message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2M_WingoBet_Req
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2M_WingoBet_Req} C2M_WingoBet_Req
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2M_WingoBet_Req.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2M_WingoBet_Req();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 1:
            m.Mode = r.int32();
            break;

          case 2:
            m.BetType = r.int32();
            break;

          case 3:
            m.BetValue = r.int32();
            break;

          case 4:
            m.Multi = r.int32();
            break;

          case 5:
            m.GoldType = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2M_WingoBet_Req;
  }();

  MST.M2C_WingoBet_Res = function () {
    /**
     * Properties of a M2C_WingoBet_Res.
     * @memberof MST
     * @interface IM2C_WingoBet_Res
     * @property {number|null} [RpcId] M2C_WingoBet_Res RpcId
     * @property {number|null} [Error] M2C_WingoBet_Res Error
     * @property {string|null} [Message] M2C_WingoBet_Res Message
     */

    /**
     * Constructs a new M2C_WingoBet_Res.
     * @memberof MST
     * @classdesc Represents a M2C_WingoBet_Res.
     * @implements IM2C_WingoBet_Res
     * @constructor
     * @param {MST.IM2C_WingoBet_Res=} [p] Properties to set
     */
    function M2C_WingoBet_Res(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * M2C_WingoBet_Res RpcId.
     * @member {number} RpcId
     * @memberof MST.M2C_WingoBet_Res
     * @instance
     */


    M2C_WingoBet_Res.prototype.RpcId = 0;
    /**
     * M2C_WingoBet_Res Error.
     * @member {number} Error
     * @memberof MST.M2C_WingoBet_Res
     * @instance
     */

    M2C_WingoBet_Res.prototype.Error = 0;
    /**
     * M2C_WingoBet_Res Message.
     * @member {string} Message
     * @memberof MST.M2C_WingoBet_Res
     * @instance
     */

    M2C_WingoBet_Res.prototype.Message = "";
    /**
     * Creates a new M2C_WingoBet_Res instance using the specified properties.
     * @function create
     * @memberof MST.M2C_WingoBet_Res
     * @static
     * @param {MST.IM2C_WingoBet_Res=} [properties] Properties to set
     * @returns {MST.M2C_WingoBet_Res} M2C_WingoBet_Res instance
     */

    M2C_WingoBet_Res.create = function create(properties) {
      return new M2C_WingoBet_Res(properties);
    };
    /**
     * Encodes the specified M2C_WingoBet_Res message. Does not implicitly {@link MST.M2C_WingoBet_Res.verify|verify} messages.
     * @function encode
     * @memberof MST.M2C_WingoBet_Res
     * @static
     * @param {MST.IM2C_WingoBet_Res} m M2C_WingoBet_Res message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    M2C_WingoBet_Res.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.RpcId != null && Object.hasOwnProperty.call(m, "RpcId")) w.uint32(720).int32(m.RpcId);
      if (m.Error != null && Object.hasOwnProperty.call(m, "Error")) w.uint32(728).int32(m.Error);
      if (m.Message != null && Object.hasOwnProperty.call(m, "Message")) w.uint32(738).string(m.Message);
      return w;
    };
    /**
     * Decodes a M2C_WingoBet_Res message from the specified reader or buffer.
     * @function decode
     * @memberof MST.M2C_WingoBet_Res
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.M2C_WingoBet_Res} M2C_WingoBet_Res
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    M2C_WingoBet_Res.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.M2C_WingoBet_Res();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 90:
            m.RpcId = r.int32();
            break;

          case 91:
            m.Error = r.int32();
            break;

          case 92:
            m.Message = r.string();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return M2C_WingoBet_Res;
  }();

  MST.WingoMyRecordInfo = function () {
    /**
     * Properties of a WingoMyRecordInfo.
     * @memberof MST
     * @interface IWingoMyRecordInfo
     * @property {number|null} [id] WingoMyRecordInfo id
     * @property {number|null} [gameNo] WingoMyRecordInfo gameNo
     * @property {number|Long|null} [betTimestamp] WingoMyRecordInfo betTimestamp
     * @property {number|Long|null} [incomeGold] WingoMyRecordInfo incomeGold
     * @property {number|Long|null} [betActualGold] WingoMyRecordInfo betActualGold
     * @property {number|Long|null} [costGold] WingoMyRecordInfo costGold
     * @property {number|null} [betType] WingoMyRecordInfo betType
     * @property {number|null} [betValue] WingoMyRecordInfo betValue
     * @property {number|null} [harga] WingoMyRecordInfo harga
     * @property {boolean|null} [isFinish] WingoMyRecordInfo isFinish
     * @property {number|null} [num] WingoMyRecordInfo num
     */

    /**
     * Constructs a new WingoMyRecordInfo.
     * @memberof MST
     * @classdesc Represents a WingoMyRecordInfo.
     * @implements IWingoMyRecordInfo
     * @constructor
     * @param {MST.IWingoMyRecordInfo=} [p] Properties to set
     */
    function WingoMyRecordInfo(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * WingoMyRecordInfo id.
     * @member {number} id
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */


    WingoMyRecordInfo.prototype.id = 0;
    /**
     * WingoMyRecordInfo gameNo.
     * @member {number} gameNo
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.gameNo = 0;
    /**
     * WingoMyRecordInfo betTimestamp.
     * @member {number|Long} betTimestamp
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.betTimestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WingoMyRecordInfo incomeGold.
     * @member {number|Long} incomeGold
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.incomeGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WingoMyRecordInfo betActualGold.
     * @member {number|Long} betActualGold
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.betActualGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WingoMyRecordInfo costGold.
     * @member {number|Long} costGold
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.costGold = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    /**
     * WingoMyRecordInfo betType.
     * @member {number} betType
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.betType = 0;
    /**
     * WingoMyRecordInfo betValue.
     * @member {number} betValue
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.betValue = 0;
    /**
     * WingoMyRecordInfo harga.
     * @member {number} harga
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.harga = 0;
    /**
     * WingoMyRecordInfo isFinish.
     * @member {boolean} isFinish
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.isFinish = false;
    /**
     * WingoMyRecordInfo num.
     * @member {number} num
     * @memberof MST.WingoMyRecordInfo
     * @instance
     */

    WingoMyRecordInfo.prototype.num = 0;
    /**
     * Creates a new WingoMyRecordInfo instance using the specified properties.
     * @function create
     * @memberof MST.WingoMyRecordInfo
     * @static
     * @param {MST.IWingoMyRecordInfo=} [properties] Properties to set
     * @returns {MST.WingoMyRecordInfo} WingoMyRecordInfo instance
     */

    WingoMyRecordInfo.create = function create(properties) {
      return new WingoMyRecordInfo(properties);
    };
    /**
     * Encodes the specified WingoMyRecordInfo message. Does not implicitly {@link MST.WingoMyRecordInfo.verify|verify} messages.
     * @function encode
     * @memberof MST.WingoMyRecordInfo
     * @static
     * @param {MST.IWingoMyRecordInfo} m WingoMyRecordInfo message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    WingoMyRecordInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(8).int32(m.id);
      if (m.gameNo != null && Object.hasOwnProperty.call(m, "gameNo")) w.uint32(16).int32(m.gameNo);
      if (m.betTimestamp != null && Object.hasOwnProperty.call(m, "betTimestamp")) w.uint32(24).int64(m.betTimestamp);
      if (m.incomeGold != null && Object.hasOwnProperty.call(m, "incomeGold")) w.uint32(32).int64(m.incomeGold);
      if (m.betActualGold != null && Object.hasOwnProperty.call(m, "betActualGold")) w.uint32(40).int64(m.betActualGold);
      if (m.costGold != null && Object.hasOwnProperty.call(m, "costGold")) w.uint32(48).int64(m.costGold);
      if (m.betType != null && Object.hasOwnProperty.call(m, "betType")) w.uint32(56).int32(m.betType);
      if (m.betValue != null && Object.hasOwnProperty.call(m, "betValue")) w.uint32(64).int32(m.betValue);
      if (m.harga != null && Object.hasOwnProperty.call(m, "harga")) w.uint32(72).int32(m.harga);
      if (m.isFinish != null && Object.hasOwnProperty.call(m, "isFinish")) w.uint32(80).bool(m.isFinish);
      if (m.num != null && Object.hasOwnProperty.call(m, "num")) w.uint32(88).int32(m.num);
      return w;
    };
    /**
     * Decodes a WingoMyRecordInfo message from the specified reader or buffer.
     * @function decode
     * @memberof MST.WingoMyRecordInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.WingoMyRecordInfo} WingoMyRecordInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    WingoMyRecordInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.WingoMyRecordInfo();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.id = r.int32();
            break;

          case 2:
            m.gameNo = r.int32();
            break;

          case 3:
            m.betTimestamp = r.int64();
            break;

          case 4:
            m.incomeGold = r.int64();
            break;

          case 5:
            m.betActualGold = r.int64();
            break;

          case 6:
            m.costGold = r.int64();
            break;

          case 7:
            m.betType = r.int32();
            break;

          case 8:
            m.betValue = r.int32();
            break;

          case 9:
            m.harga = r.int32();
            break;

          case 10:
            m.isFinish = r.bool();
            break;

          case 11:
            m.num = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return WingoMyRecordInfo;
  }();

  MST.C2S_WingoMyRecord = function () {
    /**
     * Properties of a C2S_WingoMyRecord.
     * @memberof MST
     * @interface IC2S_WingoMyRecord
     * @property {number|null} [serial] C2S_WingoMyRecord serial
     * @property {number|null} [mode] C2S_WingoMyRecord mode
     * @property {number|null} [id] C2S_WingoMyRecord id
     * @property {number|null} [count] C2S_WingoMyRecord count
     */

    /**
     * Constructs a new C2S_WingoMyRecord.
     * @memberof MST
     * @classdesc Represents a C2S_WingoMyRecord.
     * @implements IC2S_WingoMyRecord
     * @constructor
     * @param {MST.IC2S_WingoMyRecord=} [p] Properties to set
     */
    function C2S_WingoMyRecord(p) {
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * C2S_WingoMyRecord serial.
     * @member {number} serial
     * @memberof MST.C2S_WingoMyRecord
     * @instance
     */


    C2S_WingoMyRecord.prototype.serial = 0;
    /**
     * C2S_WingoMyRecord mode.
     * @member {number} mode
     * @memberof MST.C2S_WingoMyRecord
     * @instance
     */

    C2S_WingoMyRecord.prototype.mode = 0;
    /**
     * C2S_WingoMyRecord id.
     * @member {number} id
     * @memberof MST.C2S_WingoMyRecord
     * @instance
     */

    C2S_WingoMyRecord.prototype.id = 0;
    /**
     * C2S_WingoMyRecord count.
     * @member {number} count
     * @memberof MST.C2S_WingoMyRecord
     * @instance
     */

    C2S_WingoMyRecord.prototype.count = 0;
    /**
     * Creates a new C2S_WingoMyRecord instance using the specified properties.
     * @function create
     * @memberof MST.C2S_WingoMyRecord
     * @static
     * @param {MST.IC2S_WingoMyRecord=} [properties] Properties to set
     * @returns {MST.C2S_WingoMyRecord} C2S_WingoMyRecord instance
     */

    C2S_WingoMyRecord.create = function create(properties) {
      return new C2S_WingoMyRecord(properties);
    };
    /**
     * Encodes the specified C2S_WingoMyRecord message. Does not implicitly {@link MST.C2S_WingoMyRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.C2S_WingoMyRecord
     * @static
     * @param {MST.IC2S_WingoMyRecord} m C2S_WingoMyRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    C2S_WingoMyRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.mode != null && Object.hasOwnProperty.call(m, "mode")) w.uint32(16).int32(m.mode);
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(24).int32(m.id);
      if (m.count != null && Object.hasOwnProperty.call(m, "count")) w.uint32(32).int32(m.count);
      return w;
    };
    /**
     * Decodes a C2S_WingoMyRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.C2S_WingoMyRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.C2S_WingoMyRecord} C2S_WingoMyRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    C2S_WingoMyRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.C2S_WingoMyRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.mode = r.int32();
            break;

          case 3:
            m.id = r.int32();
            break;

          case 4:
            m.count = r.int32();
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return C2S_WingoMyRecord;
  }();

  MST.S2C_WingoMyRecord = function () {
    /**
     * Properties of a S2C_WingoMyRecord.
     * @memberof MST
     * @interface IS2C_WingoMyRecord
     * @property {number|null} [serial] S2C_WingoMyRecord serial
     * @property {number|null} [code] S2C_WingoMyRecord code
     * @property {number|null} [id] S2C_WingoMyRecord id
     * @property {Array.<MST.IWingoMyRecordInfo>|null} [myRecordInfo] S2C_WingoMyRecord myRecordInfo
     */

    /**
     * Constructs a new S2C_WingoMyRecord.
     * @memberof MST
     * @classdesc Represents a S2C_WingoMyRecord.
     * @implements IS2C_WingoMyRecord
     * @constructor
     * @param {MST.IS2C_WingoMyRecord=} [p] Properties to set
     */
    function S2C_WingoMyRecord(p) {
      this.myRecordInfo = [];
      if (p) for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) {
        if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
    }
    /**
     * S2C_WingoMyRecord serial.
     * @member {number} serial
     * @memberof MST.S2C_WingoMyRecord
     * @instance
     */


    S2C_WingoMyRecord.prototype.serial = 0;
    /**
     * S2C_WingoMyRecord code.
     * @member {number} code
     * @memberof MST.S2C_WingoMyRecord
     * @instance
     */

    S2C_WingoMyRecord.prototype.code = 0;
    /**
     * S2C_WingoMyRecord id.
     * @member {number} id
     * @memberof MST.S2C_WingoMyRecord
     * @instance
     */

    S2C_WingoMyRecord.prototype.id = 0;
    /**
     * S2C_WingoMyRecord myRecordInfo.
     * @member {Array.<MST.IWingoMyRecordInfo>} myRecordInfo
     * @memberof MST.S2C_WingoMyRecord
     * @instance
     */

    S2C_WingoMyRecord.prototype.myRecordInfo = $util.emptyArray;
    /**
     * Creates a new S2C_WingoMyRecord instance using the specified properties.
     * @function create
     * @memberof MST.S2C_WingoMyRecord
     * @static
     * @param {MST.IS2C_WingoMyRecord=} [properties] Properties to set
     * @returns {MST.S2C_WingoMyRecord} S2C_WingoMyRecord instance
     */

    S2C_WingoMyRecord.create = function create(properties) {
      return new S2C_WingoMyRecord(properties);
    };
    /**
     * Encodes the specified S2C_WingoMyRecord message. Does not implicitly {@link MST.S2C_WingoMyRecord.verify|verify} messages.
     * @function encode
     * @memberof MST.S2C_WingoMyRecord
     * @static
     * @param {MST.IS2C_WingoMyRecord} m S2C_WingoMyRecord message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */


    S2C_WingoMyRecord.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.serial != null && Object.hasOwnProperty.call(m, "serial")) w.uint32(8).int32(m.serial);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(16).int32(m.code);
      if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(24).int32(m.id);

      if (m.myRecordInfo != null && m.myRecordInfo.length) {
        for (var i = 0; i < m.myRecordInfo.length; ++i) {
          $root.MST.WingoMyRecordInfo.encode(m.myRecordInfo[i], w.uint32(34).fork()).ldelim();
        }
      }

      return w;
    };
    /**
     * Decodes a S2C_WingoMyRecord message from the specified reader or buffer.
     * @function decode
     * @memberof MST.S2C_WingoMyRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {MST.S2C_WingoMyRecord} S2C_WingoMyRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */


    S2C_WingoMyRecord.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
          m = new $root.MST.S2C_WingoMyRecord();

      while (r.pos < c) {
        var t = r.uint32();

        switch (t >>> 3) {
          case 1:
            m.serial = r.int32();
            break;

          case 2:
            m.code = r.int32();
            break;

          case 3:
            m.id = r.int32();
            break;

          case 4:
            if (!(m.myRecordInfo && m.myRecordInfo.length)) m.myRecordInfo = [];
            m.myRecordInfo.push($root.MST.WingoMyRecordInfo.decode(r, r.uint32()));
            break;

          default:
            r.skipType(t & 7);
            break;
        }
      }

      return m;
    };

    return S2C_WingoMyRecord;
  }();
  /**
   * OuterOpcode_CrashGame enum.
   * @name MST.OuterOpcode_CrashGame
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} C2M_GetCrashInfo_Req=10402 C2M_GetCrashInfo_Req value
   * @property {number} M2C_GetCrashInfo_Res=10403 M2C_GetCrashInfo_Res value
   * @property {number} M2C_CrashStart_mes=10404 M2C_CrashStart_mes value
   * @property {number} C2M_MyCrashBet_Req=10405 C2M_MyCrashBet_Req value
   * @property {number} M2C_MyCrashBet_Res=10406 M2C_MyCrashBet_Res value
   * @property {number} M2C_CrashBet_Mes=10407 M2C_CrashBet_Mes value
   * @property {number} M2C_CrashStop_Mes=10408 M2C_CrashStop_Mes value
   * @property {number} M2C_CrashStartBet_Mes=10409 M2C_CrashStartBet_Mes value
   * @property {number} M2C_CrashEscape_Mes=10410 M2C_CrashEscape_Mes value
   * @property {number} M2C_CrashStopBet_Mes=10411 M2C_CrashStopBet_Mes value
   * @property {number} C2M_CrashCancelAutoBet_Req=10412 C2M_CrashCancelAutoBet_Req value
   * @property {number} M2C_CrashCancelAutoBet_Res=10413 M2C_CrashCancelAutoBet_Res value
   * @property {number} M2C_CrashCancelAutoBet_Mes=10414 M2C_CrashCancelAutoBet_Mes value
   * @property {number} M2C_CrashHash_Mes=10415 M2C_CrashHash_Mes value
   * @property {number} C2M_CrashHashRecord_Req=10416 C2M_CrashHashRecord_Req value
   * @property {number} M2C_CrashHashRecord_Res=10417 M2C_CrashHashRecord_Res value
   * @property {number} C2S_CrashMyRecord=10418 C2S_CrashMyRecord value
   * @property {number} S2C_CrashMyRecord=10419 S2C_CrashMyRecord value
   */


  MST.OuterOpcode_CrashGame = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10402] = "C2M_GetCrashInfo_Req"] = 10402;
    values[valuesById[10403] = "M2C_GetCrashInfo_Res"] = 10403;
    values[valuesById[10404] = "M2C_CrashStart_mes"] = 10404;
    values[valuesById[10405] = "C2M_MyCrashBet_Req"] = 10405;
    values[valuesById[10406] = "M2C_MyCrashBet_Res"] = 10406;
    values[valuesById[10407] = "M2C_CrashBet_Mes"] = 10407;
    values[valuesById[10408] = "M2C_CrashStop_Mes"] = 10408;
    values[valuesById[10409] = "M2C_CrashStartBet_Mes"] = 10409;
    values[valuesById[10410] = "M2C_CrashEscape_Mes"] = 10410;
    values[valuesById[10411] = "M2C_CrashStopBet_Mes"] = 10411;
    values[valuesById[10412] = "C2M_CrashCancelAutoBet_Req"] = 10412;
    values[valuesById[10413] = "M2C_CrashCancelAutoBet_Res"] = 10413;
    values[valuesById[10414] = "M2C_CrashCancelAutoBet_Mes"] = 10414;
    values[valuesById[10415] = "M2C_CrashHash_Mes"] = 10415;
    values[valuesById[10416] = "C2M_CrashHashRecord_Req"] = 10416;
    values[valuesById[10417] = "M2C_CrashHashRecord_Res"] = 10417;
    values[valuesById[10418] = "C2S_CrashMyRecord"] = 10418;
    values[valuesById[10419] = "S2C_CrashMyRecord"] = 10419;
    return values;
  }();
  /**
   * OuterOpcode_Gate enum.
   * @name MST.OuterOpcode_Gate
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} C2G_EnterMap_Req=10102 C2G_EnterMap_Req value
   * @property {number} G2C_EnterMap_Res=10103 G2C_EnterMap_Res value
   * @property {number} C2G_Ping_Req=10104 C2G_Ping_Req value
   * @property {number} G2C_Ping_Res=10105 G2C_Ping_Res value
   * @property {number} C2G_LoginGate_Req=10106 C2G_LoginGate_Req value
   * @property {number} G2C_LoginGate_Res=10107 G2C_LoginGate_Res value
   * @property {number} G2C_SystemError_Mes=10110 G2C_SystemError_Mes value
   */


  MST.OuterOpcode_Gate = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10102] = "C2G_EnterMap_Req"] = 10102;
    values[valuesById[10103] = "G2C_EnterMap_Res"] = 10103;
    values[valuesById[10104] = "C2G_Ping_Req"] = 10104;
    values[valuesById[10105] = "G2C_Ping_Res"] = 10105;
    values[valuesById[10106] = "C2G_LoginGate_Req"] = 10106;
    values[valuesById[10107] = "G2C_LoginGate_Res"] = 10107;
    values[valuesById[10110] = "G2C_SystemError_Mes"] = 10110;
    return values;
  }();
  /**
   * OuterOpcode_Lobby enum.
   * @name MST.OuterOpcode_Lobby
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} C2L_BindMailBox_Req=10302 C2L_BindMailBox_Req value
   * @property {number} L2C_BindMailBox_Res=10303 L2C_BindMailBox_Res value
   * @property {number} C2L_BindPhone_Req=10304 C2L_BindPhone_Req value
   * @property {number} L2C_BindPhone_Res=10305 L2C_BindPhone_Res value
   * @property {number} C2L_GoldRankDay_Req=10306 C2L_GoldRankDay_Req value
   * @property {number} L2C_GoldRankDay_Res=10307 L2C_GoldRankDay_Res value
   * @property {number} C2L_BetRank_Req=10308 C2L_BetRank_Req value
   * @property {number} L2C_BetRank_Res=10309 L2C_BetRank_Res value
   * @property {number} C2L_WinDayRank_Req=10310 C2L_WinDayRank_Req value
   * @property {number} L2C_WinDayRank_Res=10311 L2C_WinDayRank_Res value
   * @property {number} C2L_WinWeekRank_Req=10312 C2L_WinWeekRank_Req value
   * @property {number} L2C_WinWeekRank_Res=10313 L2C_WinWeekRank_Res value
   * @property {number} C2L_WinMonthRank_Req=10314 C2L_WinMonthRank_Req value
   * @property {number} L2C_WinMonthRank_Res=10315 L2C_WinMonthRank_Res value
   * @property {number} C2L_GetGameList_Req=10316 C2L_GetGameList_Req value
   * @property {number} L2C_GetGameList_Res=10317 L2C_GetGameList_Res value
   * @property {number} L2C_ChipsChange_Mes=10318 L2C_ChipsChange_Mes value
   * @property {number} C2L_Deposit_Req=10319 C2L_Deposit_Req value
   * @property {number} L2C_Deposit_Res=10320 L2C_Deposit_Res value
   * @property {number} C2L_Withdraw_Req=10321 C2L_Withdraw_Req value
   * @property {number} L2C_Withdraw_Res=10322 L2C_Withdraw_Res value
   * @property {number} C2L_GetWithdrawReocrds_Req=10323 C2L_GetWithdrawReocrds_Req value
   * @property {number} L2C_GetWithdrawRecords_Res=10324 L2C_GetWithdrawRecords_Res value
   * @property {number} C2L_GetDepositLimit_Req=10325 C2L_GetDepositLimit_Req value
   * @property {number} L2C_GetDepositLimit_Res=10326 L2C_GetDepositLimit_Res value
   * @property {number} C2L_GetWithdrawLimit_Req=10327 C2L_GetWithdrawLimit_Req value
   * @property {number} L2C_GetWithdrawLimit_Res=10328 L2C_GetWithdrawLimit_Res value
   * @property {number} C2L_GetStoreList_Req=10329 C2L_GetStoreList_Req value
   * @property {number} L2C_GetStoreList_Res=10330 L2C_GetStoreList_Res value
   * @property {number} C2L_GetBankList_Req=10331 C2L_GetBankList_Req value
   * @property {number} L2C_GetBankList_Res=10332 L2C_GetBankList_Res value
   * @property {number} C2L_BindBankCard_Req=10333 C2L_BindBankCard_Req value
   * @property {number} L2C_BindBankCard_Res=10334 L2C_BindBankCard_Res value
   * @property {number} C2L_GetBankCardInfo_Req=10335 C2L_GetBankCardInfo_Req value
   * @property {number} L2C_GetBankCardInfo_Res=10336 L2C_GetBankCardInfo_Res value
   * @property {number} C2S_MinigameInfo=10337 C2S_MinigameInfo value
   * @property {number} S2C_MinigameInfo=10338 S2C_MinigameInfo value
   * @property {number} C2S_MinigameLottery=10339 C2S_MinigameLottery value
   * @property {number} S2C_MinigameLottery=10340 S2C_MinigameLottery value
   * @property {number} C2S_GetSignedInfo=10341 C2S_GetSignedInfo value
   * @property {number} S2C_GetSignedInfo=10342 S2C_GetSignedInfo value
   * @property {number} C2S_Signed=10343 C2S_Signed value
   * @property {number} S2C_Signed=10344 S2C_Signed value
   * @property {number} C2S_Register=10345 C2S_Register value
   * @property {number} S2C_Register=10346 S2C_Register value
   * @property {number} C2S_ResetPassword=10347 C2S_ResetPassword value
   * @property {number} S2C_ResetPassword=10348 S2C_ResetPassword value
   * @property {number} C2S_GetCheckCode=10349 C2S_GetCheckCode value
   * @property {number} S2C_GetCheckCode=10350 S2C_GetCheckCode value
   * @property {number} C2S_BindPhone=10351 C2S_BindPhone value
   * @property {number} S2C_BindPhone=10352 S2C_BindPhone value
   * @property {number} C2S_BindEmail=10353 C2S_BindEmail value
   * @property {number} S2C_BindEmail=10354 S2C_BindEmail value
   * @property {number} C2S_GetRegisterRewardConfig=10355 C2S_GetRegisterRewardConfig value
   * @property {number} S2C_GetRegisterRewordConfig=10356 S2C_GetRegisterRewordConfig value
   * @property {number} C2S_PromotionInfo=10357 C2S_PromotionInfo value
   * @property {number} S2C_PromotionInfo=10358 S2C_PromotionInfo value
   * @property {number} C2S_ModifyAvartar=10359 C2S_ModifyAvartar value
   * @property {number} S2C_ModifyAvartar=10360 S2C_ModifyAvartar value
   * @property {number} C2S_GetDepositList=10361 C2S_GetDepositList value
   * @property {number} S2C_GetDepositList=10362 S2C_GetDepositList value
   * @property {number} C2S_GetMissionList=10363 C2S_GetMissionList value
   * @property {number} S2C_GetMissionList=10364 S2C_GetMissionList value
   * @property {number} C2S_MissionClaim=10365 C2S_MissionClaim value
   * @property {number} S2C_MissionClaim=10366 S2C_MissionClaim value
   * @property {number} S2C_MessageNotify=10367 S2C_MessageNotify value
   */


  MST.OuterOpcode_Lobby = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10302] = "C2L_BindMailBox_Req"] = 10302;
    values[valuesById[10303] = "L2C_BindMailBox_Res"] = 10303;
    values[valuesById[10304] = "C2L_BindPhone_Req"] = 10304;
    values[valuesById[10305] = "L2C_BindPhone_Res"] = 10305;
    values[valuesById[10306] = "C2L_GoldRankDay_Req"] = 10306;
    values[valuesById[10307] = "L2C_GoldRankDay_Res"] = 10307;
    values[valuesById[10308] = "C2L_BetRank_Req"] = 10308;
    values[valuesById[10309] = "L2C_BetRank_Res"] = 10309;
    values[valuesById[10310] = "C2L_WinDayRank_Req"] = 10310;
    values[valuesById[10311] = "L2C_WinDayRank_Res"] = 10311;
    values[valuesById[10312] = "C2L_WinWeekRank_Req"] = 10312;
    values[valuesById[10313] = "L2C_WinWeekRank_Res"] = 10313;
    values[valuesById[10314] = "C2L_WinMonthRank_Req"] = 10314;
    values[valuesById[10315] = "L2C_WinMonthRank_Res"] = 10315;
    values[valuesById[10316] = "C2L_GetGameList_Req"] = 10316;
    values[valuesById[10317] = "L2C_GetGameList_Res"] = 10317;
    values[valuesById[10318] = "L2C_ChipsChange_Mes"] = 10318;
    values[valuesById[10319] = "C2L_Deposit_Req"] = 10319;
    values[valuesById[10320] = "L2C_Deposit_Res"] = 10320;
    values[valuesById[10321] = "C2L_Withdraw_Req"] = 10321;
    values[valuesById[10322] = "L2C_Withdraw_Res"] = 10322;
    values[valuesById[10323] = "C2L_GetWithdrawReocrds_Req"] = 10323;
    values[valuesById[10324] = "L2C_GetWithdrawRecords_Res"] = 10324;
    values[valuesById[10325] = "C2L_GetDepositLimit_Req"] = 10325;
    values[valuesById[10326] = "L2C_GetDepositLimit_Res"] = 10326;
    values[valuesById[10327] = "C2L_GetWithdrawLimit_Req"] = 10327;
    values[valuesById[10328] = "L2C_GetWithdrawLimit_Res"] = 10328;
    values[valuesById[10329] = "C2L_GetStoreList_Req"] = 10329;
    values[valuesById[10330] = "L2C_GetStoreList_Res"] = 10330;
    values[valuesById[10331] = "C2L_GetBankList_Req"] = 10331;
    values[valuesById[10332] = "L2C_GetBankList_Res"] = 10332;
    values[valuesById[10333] = "C2L_BindBankCard_Req"] = 10333;
    values[valuesById[10334] = "L2C_BindBankCard_Res"] = 10334;
    values[valuesById[10335] = "C2L_GetBankCardInfo_Req"] = 10335;
    values[valuesById[10336] = "L2C_GetBankCardInfo_Res"] = 10336;
    values[valuesById[10337] = "C2S_MinigameInfo"] = 10337;
    values[valuesById[10338] = "S2C_MinigameInfo"] = 10338;
    values[valuesById[10339] = "C2S_MinigameLottery"] = 10339;
    values[valuesById[10340] = "S2C_MinigameLottery"] = 10340;
    values[valuesById[10341] = "C2S_GetSignedInfo"] = 10341;
    values[valuesById[10342] = "S2C_GetSignedInfo"] = 10342;
    values[valuesById[10343] = "C2S_Signed"] = 10343;
    values[valuesById[10344] = "S2C_Signed"] = 10344;
    values[valuesById[10345] = "C2S_Register"] = 10345;
    values[valuesById[10346] = "S2C_Register"] = 10346;
    values[valuesById[10347] = "C2S_ResetPassword"] = 10347;
    values[valuesById[10348] = "S2C_ResetPassword"] = 10348;
    values[valuesById[10349] = "C2S_GetCheckCode"] = 10349;
    values[valuesById[10350] = "S2C_GetCheckCode"] = 10350;
    values[valuesById[10351] = "C2S_BindPhone"] = 10351;
    values[valuesById[10352] = "S2C_BindPhone"] = 10352;
    values[valuesById[10353] = "C2S_BindEmail"] = 10353;
    values[valuesById[10354] = "S2C_BindEmail"] = 10354;
    values[valuesById[10355] = "C2S_GetRegisterRewardConfig"] = 10355;
    values[valuesById[10356] = "S2C_GetRegisterRewordConfig"] = 10356;
    values[valuesById[10357] = "C2S_PromotionInfo"] = 10357;
    values[valuesById[10358] = "S2C_PromotionInfo"] = 10358;
    values[valuesById[10359] = "C2S_ModifyAvartar"] = 10359;
    values[valuesById[10360] = "S2C_ModifyAvartar"] = 10360;
    values[valuesById[10361] = "C2S_GetDepositList"] = 10361;
    values[valuesById[10362] = "S2C_GetDepositList"] = 10362;
    values[valuesById[10363] = "C2S_GetMissionList"] = 10363;
    values[valuesById[10364] = "S2C_GetMissionList"] = 10364;
    values[valuesById[10365] = "C2S_MissionClaim"] = 10365;
    values[valuesById[10366] = "S2C_MissionClaim"] = 10366;
    values[valuesById[10367] = "S2C_MessageNotify"] = 10367;
    return values;
  }();
  /**
   * OuterOpcode_Map enum.
   * @name MST.OuterOpcode_Map
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} M2C_CreateUnits_Mes=10202 M2C_CreateUnits_Mes value
   * @property {number} M2C_CreateMyUnit_Mes=10203 M2C_CreateMyUnit_Mes value
   * @property {number} M2C_StartSceneChange_Mes=10204 M2C_StartSceneChange_Mes value
   * @property {number} M2C_RemoveUnits_Mes=10205 M2C_RemoveUnits_Mes value
   * @property {number} C2M_TransferMap_Req=10206 C2M_TransferMap_Req value
   * @property {number} M2C_TransferMap_Res=10207 M2C_TransferMap_Res value
   * @property {number} C2M_Auth_Req=10208 C2M_Auth_Req value
   * @property {number} M2C_Auth_Res=10209 M2C_Auth_Res value
   * @property {number} C2M_AuthOut_Req=10210 C2M_AuthOut_Req value
   * @property {number} M2C_AuthOut_Res=10211 M2C_AuthOut_Res value
   * @property {number} M2C_KickOut_Mes=10212 M2C_KickOut_Mes value
   * @property {number} M2C_GoldChange_Mes=10213 M2C_GoldChange_Mes value
   */


  MST.OuterOpcode_Map = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10202] = "M2C_CreateUnits_Mes"] = 10202;
    values[valuesById[10203] = "M2C_CreateMyUnit_Mes"] = 10203;
    values[valuesById[10204] = "M2C_StartSceneChange_Mes"] = 10204;
    values[valuesById[10205] = "M2C_RemoveUnits_Mes"] = 10205;
    values[valuesById[10206] = "C2M_TransferMap_Req"] = 10206;
    values[valuesById[10207] = "M2C_TransferMap_Res"] = 10207;
    values[valuesById[10208] = "C2M_Auth_Req"] = 10208;
    values[valuesById[10209] = "M2C_Auth_Res"] = 10209;
    values[valuesById[10210] = "C2M_AuthOut_Req"] = 10210;
    values[valuesById[10211] = "M2C_AuthOut_Res"] = 10211;
    values[valuesById[10212] = "M2C_KickOut_Mes"] = 10212;
    values[valuesById[10213] = "M2C_GoldChange_Mes"] = 10213;
    return values;
  }();
  /**
   * OuterOpcode_Roulette enum.
   * @name MST.OuterOpcode_Roulette
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} C2M_GetRouletteInfo_Req=10802 C2M_GetRouletteInfo_Req value
   * @property {number} M2C_GetRouletteInfo_Res=10803 M2C_GetRouletteInfo_Res value
   * @property {number} M2C_RouletteStart_mes=10804 M2C_RouletteStart_mes value
   * @property {number} C2M_MyRouletteBet_Req=10805 C2M_MyRouletteBet_Req value
   * @property {number} M2C_MyRouletteBet_Res=10806 M2C_MyRouletteBet_Res value
   * @property {number} C2R_GetBetRankInfo_Req=10807 C2R_GetBetRankInfo_Req value
   * @property {number} R2C_GetBetRandInfo_Res=10808 R2C_GetBetRandInfo_Res value
   * @property {number} M2C_RouletteStartBet_Mes=10809 M2C_RouletteStartBet_Mes value
   * @property {number} C2R_GetGameRecords_Req=10810 C2R_GetGameRecords_Req value
   * @property {number} R2C_GetGameRecords_Res=10811 R2C_GetGameRecords_Res value
   * @property {number} C2R_GetBetInfo_Req=10812 C2R_GetBetInfo_Req value
   * @property {number} R2C_GetBetInfo_Res=10813 R2C_GetBetInfo_Res value
   * @property {number} R2C_Calc_Mes=10814 R2C_Calc_Mes value
   * @property {number} R2C_Bet_Mes=10815 R2C_Bet_Mes value
   * @property {number} R2C_PaybackPhase_Mes=10816 R2C_PaybackPhase_Mes value
   */


  MST.OuterOpcode_Roulette = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10802] = "C2M_GetRouletteInfo_Req"] = 10802;
    values[valuesById[10803] = "M2C_GetRouletteInfo_Res"] = 10803;
    values[valuesById[10804] = "M2C_RouletteStart_mes"] = 10804;
    values[valuesById[10805] = "C2M_MyRouletteBet_Req"] = 10805;
    values[valuesById[10806] = "M2C_MyRouletteBet_Res"] = 10806;
    values[valuesById[10807] = "C2R_GetBetRankInfo_Req"] = 10807;
    values[valuesById[10808] = "R2C_GetBetRandInfo_Res"] = 10808;
    values[valuesById[10809] = "M2C_RouletteStartBet_Mes"] = 10809;
    values[valuesById[10810] = "C2R_GetGameRecords_Req"] = 10810;
    values[valuesById[10811] = "R2C_GetGameRecords_Res"] = 10811;
    values[valuesById[10812] = "C2R_GetBetInfo_Req"] = 10812;
    values[valuesById[10813] = "R2C_GetBetInfo_Res"] = 10813;
    values[valuesById[10814] = "R2C_Calc_Mes"] = 10814;
    values[valuesById[10815] = "R2C_Bet_Mes"] = 10815;
    values[valuesById[10816] = "R2C_PaybackPhase_Mes"] = 10816;
    return values;
  }();
  /**
   * OuterOpcode_WingoGame enum.
   * @name MST.OuterOpcode_WingoGame
   * @enum {number}
   * @property {number} None=0 None value
   * @property {number} C2M_GetWingoInfo_Req=10702 C2M_GetWingoInfo_Req value
   * @property {number} M2C_GetWingoInfo_Res=10703 M2C_GetWingoInfo_Res value
   * @property {number} C2M_GetWingoHistory_Req=10704 C2M_GetWingoHistory_Req value
   * @property {number} M2C_GetWingoHistory_Res=10705 M2C_GetWingoHistory_Res value
   * @property {number} M2C_WingoLottery_Mes=10706 M2C_WingoLottery_Mes value
   * @property {number} C2M_WingoBet_Req=10707 C2M_WingoBet_Req value
   * @property {number} M2C_WingoBet_Res=10708 M2C_WingoBet_Res value
   * @property {number} C2S_WingoMyRecord=10709 C2S_WingoMyRecord value
   * @property {number} S2C_WingoMyRecord=10710 S2C_WingoMyRecord value
   */


  MST.OuterOpcode_WingoGame = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "None"] = 0;
    values[valuesById[10702] = "C2M_GetWingoInfo_Req"] = 10702;
    values[valuesById[10703] = "M2C_GetWingoInfo_Res"] = 10703;
    values[valuesById[10704] = "C2M_GetWingoHistory_Req"] = 10704;
    values[valuesById[10705] = "M2C_GetWingoHistory_Res"] = 10705;
    values[valuesById[10706] = "M2C_WingoLottery_Mes"] = 10706;
    values[valuesById[10707] = "C2M_WingoBet_Req"] = 10707;
    values[valuesById[10708] = "M2C_WingoBet_Res"] = 10708;
    values[valuesById[10709] = "C2S_WingoMyRecord"] = 10709;
    values[valuesById[10710] = "S2C_WingoMyRecord"] = 10710;
    return values;
  }();

  return MST;
}();

module.exports = $root;

cc._RF.pop();