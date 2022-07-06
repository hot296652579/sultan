"use strict";
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