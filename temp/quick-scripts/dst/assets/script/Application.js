
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Application.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a02epv+edOjZ4yLa/NSdtl', 'Application');
// script/Application.js

"use strict";

var _Manager = require("./common/manager/Manager");

_Manager.Manager.init();

cc.Node.prototype.Run = function () {
  var actions = Array.prototype.slice.call(arguments);

  if (actions.length == 1) {
    this.runAction(actions[0]);
  } else if (actions.length >= 2) {
    this.runAction(cc.sequence(actions));
  } else {// do nothing
  }
};

cc.Node.prototype.LastChild = function () {
  return this.children[this.children.length - 1];
};

cc.Node.prototype.PathChild = function (path, componentName) {
  var names = path.split('/');
  var nd = null;

  for (var i = 0; i < names.length; i++) {
    if (nd) {
      nd = nd.getChildByName(names[i]);
    } else {
      nd = this.getChildByName(names[i]);
    }
  }

  if (componentName) {
    return nd.getComponent(componentName);
  } else {
    return nd;
  }
};

cc.Node.prototype.Component = function (name) {
  return this.getComponent(name);
};

cc.Node.prototype.EachChild = function (cb) {
  this.children.forEach(function (child) {
    cb(child);
  });
};

cc.Node.prototype.Play = function (idx) {
  var ani = this.getComponent(cc.Animation);
  var clips = ani.getClips();

  if (clips.length == 0) {
    cc.error("There's no clip in node", this.node);
  }

  ani.play(clips[idx].name);
};

cc.Node.prototype.GotoAnimateTime = function (aniName, time) {
  var ani = this.getComponent(cc.Animation);

  if (!aniName) {
    var clips = ani.getClips();

    if (clips.length == 0) {
      cc.error("There's no clip in node", this.node);
    }

    aniName = clips[0].name;
  }

  ani.play(aniName);
  ani.pause();

  if (time < 0) {
    time = ani.getAnimationState(aniName).duration;
  }

  ani.setCurrentTime(time);
};

cc.Node.prototype.setString = function (str, isLen) {
  var lb = this.getComponent(cc.Label);

  if (isLen) {
    if (str.length > 7) {
      var nameLabel = str.substring(0, 7);
      str = nameLabel + "...";
    } else {
      str = str;
    }
  }

  lb.string = str;
};

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }

  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);

  if (index > -1) {
    this.splice(index, 1);
  }
};

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiTWFuYWdlciIsImluaXQiLCJjYyIsIk5vZGUiLCJwcm90b3R5cGUiLCJSdW4iLCJhY3Rpb25zIiwiQXJyYXkiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIkxhc3RDaGlsZCIsImNoaWxkcmVuIiwiUGF0aENoaWxkIiwicGF0aCIsImNvbXBvbmVudE5hbWUiLCJuYW1lcyIsInNwbGl0IiwibmQiLCJpIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJDb21wb25lbnQiLCJuYW1lIiwiRWFjaENoaWxkIiwiY2IiLCJmb3JFYWNoIiwiY2hpbGQiLCJQbGF5IiwiaWR4IiwiYW5pIiwiQW5pbWF0aW9uIiwiY2xpcHMiLCJnZXRDbGlwcyIsImVycm9yIiwibm9kZSIsInBsYXkiLCJHb3RvQW5pbWF0ZVRpbWUiLCJhbmlOYW1lIiwidGltZSIsInBhdXNlIiwiZ2V0QW5pbWF0aW9uU3RhdGUiLCJkdXJhdGlvbiIsInNldEN1cnJlbnRUaW1lIiwic2V0U3RyaW5nIiwic3RyIiwiaXNMZW4iLCJsYiIsIkxhYmVsIiwibmFtZUxhYmVsIiwic3Vic3RyaW5nIiwic3RyaW5nIiwiaW5kZXhPZiIsInZhbCIsInJlbW92ZSIsImluZGV4Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBQSxpQkFBUUMsSUFBUjs7QUFHQUMsRUFBRSxDQUFDQyxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLEdBQWxCLEdBQXdCLFlBQVk7QUFDbkMsTUFBSUMsT0FBTyxHQUFHQyxLQUFLLENBQUNILFNBQU4sQ0FBZ0JJLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsQ0FBZDs7QUFDQSxNQUFJSixPQUFPLENBQUNLLE1BQVIsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDeEIsU0FBS0MsU0FBTCxDQUFlTixP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QWxDLEVBQXNDO0FBQ2xDLFFBQUksS0FBS0EsQ0FBTCxLQUFXa0MsR0FBZixFQUFvQixPQUFPbEMsQ0FBUDtBQUN2Qjs7QUFDRCxTQUFPLENBQUMsQ0FBUjtBQUNILENBTEQ7O0FBT0FmLEtBQUssQ0FBQ0gsU0FBTixDQUFnQnFELE1BQWhCLEdBQXlCLFVBQVVELEdBQVYsRUFBZTtBQUNwQyxNQUFJRSxLQUFLLEdBQUcsS0FBS0gsT0FBTCxDQUFhQyxHQUFiLENBQVo7O0FBQ0EsTUFBSUUsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtBQUNaLFNBQUtDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQixDQUFuQjtBQUNIO0FBQ0osQ0FMRCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIlxuXG5NYW5hZ2VyLmluaXQoKTtcblxuXG5jYy5Ob2RlLnByb3RvdHlwZS5SdW4gPSBmdW5jdGlvbiAoKSB7XG5cdGxldCBhY3Rpb25zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXHRpZiAoYWN0aW9ucy5sZW5ndGggPT0gMSkge1xuXHRcdHRoaXMucnVuQWN0aW9uKGFjdGlvbnNbMF0pXG5cdH0gZWxzZSBpZiAoYWN0aW9ucy5sZW5ndGggPj0gMikge1xuXHRcdHRoaXMucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGFjdGlvbnMpKVxuXHR9IGVsc2Uge1xuXHRcdC8vIGRvIG5vdGhpbmdcblx0fVxufVxuXG5jYy5Ob2RlLnByb3RvdHlwZS5MYXN0Q2hpbGQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMV1cbn1cblxuY2MuTm9kZS5wcm90b3R5cGUuUGF0aENoaWxkID0gZnVuY3Rpb24gKHBhdGgsIGNvbXBvbmVudE5hbWUpIHtcblx0bGV0IG5hbWVzID0gcGF0aC5zcGxpdCgnLycpXG5cdGxldCBuZCA9IG51bGxcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChuZCkge1xuXHRcdFx0bmQgPSBuZC5nZXRDaGlsZEJ5TmFtZShuYW1lc1tpXSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmQgPSB0aGlzLmdldENoaWxkQnlOYW1lKG5hbWVzW2ldKVxuXHRcdH1cblx0fVxuXG5cdGlmIChjb21wb25lbnROYW1lKSB7XG5cdFx0cmV0dXJuIG5kLmdldENvbXBvbmVudChjb21wb25lbnROYW1lKVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBuZFxuXHR9XG59XG5cbmNjLk5vZGUucHJvdG90eXBlLkNvbXBvbmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdHJldHVybiB0aGlzLmdldENvbXBvbmVudChuYW1lKVxufVxuXG5jYy5Ob2RlLnByb3RvdHlwZS5FYWNoQ2hpbGQgPSBmdW5jdGlvbiAoY2IpIHtcblx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuXHRcdGNiKGNoaWxkKVxuXHR9KVxufVxuXG5jYy5Ob2RlLnByb3RvdHlwZS5QbGF5ID0gZnVuY3Rpb24gKGlkeCkge1xuXHRsZXQgYW5pID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKVxuXHRsZXQgY2xpcHMgPSBhbmkuZ2V0Q2xpcHMoKVxuXHRpZiAoY2xpcHMubGVuZ3RoID09IDApIHtcblx0XHRjYy5lcnJvcihcIlRoZXJlJ3Mgbm8gY2xpcCBpbiBub2RlXCIsIHRoaXMubm9kZSlcblx0fVxuXHRhbmkucGxheShjbGlwc1tpZHhdLm5hbWUpXG59XG5cbmNjLk5vZGUucHJvdG90eXBlLkdvdG9BbmltYXRlVGltZSA9IGZ1bmN0aW9uIChhbmlOYW1lLCB0aW1lKSB7XG5cdGxldCBhbmkgPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pXG5cblx0aWYgKCFhbmlOYW1lKSB7XG5cdFx0bGV0IGNsaXBzID0gYW5pLmdldENsaXBzKClcblx0XHRpZiAoY2xpcHMubGVuZ3RoID09IDApIHtcblx0XHRcdGNjLmVycm9yKFwiVGhlcmUncyBubyBjbGlwIGluIG5vZGVcIiwgdGhpcy5ub2RlKVxuXHRcdH1cblx0XHRhbmlOYW1lID0gY2xpcHNbMF0ubmFtZVxuXHR9XG5cdGFuaS5wbGF5KGFuaU5hbWUpXG5cdGFuaS5wYXVzZSgpXG5cblx0aWYgKHRpbWUgPCAwKSB7XG5cdFx0dGltZSA9IGFuaS5nZXRBbmltYXRpb25TdGF0ZShhbmlOYW1lKS5kdXJhdGlvblxuXHR9XG5cblx0YW5pLnNldEN1cnJlbnRUaW1lKHRpbWUpXG59XG5jYy5Ob2RlLnByb3RvdHlwZS5zZXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RyICwgaXNMZW4pIHtcblx0bGV0IGxiID0gdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG5cdGlmIChpc0xlbil7XG5cdFx0aWYgKHN0ci5sZW5ndGggPiA3KSB7XG5cdFx0XHRsZXQgbmFtZUxhYmVsID0gc3RyLnN1YnN0cmluZygwLCA3KTtcblx0XHRcdHN0ciA9IG5hbWVMYWJlbCArIFwiLi4uXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0ciA9IHN0cjtcblx0XHR9XG5cdH1cblx0bGIuc3RyaW5nID0gc3RyO1xufVxuXG5BcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXNbaV0gPT0gdmFsKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuQXJyYXkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YodmFsKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTsiXX0=