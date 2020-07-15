import TWEEN from "./build/tween.js-master/dist/tween.esm.js";

export function fall() {
  tweenStartFall = {
    y: yoshi.position.y,
  };
  tweenGoalFall = {
    y: -14.3,
  };
  tweenFall = new TWEEN.Tween(tweenStartFall)
    .to(tweenGoalFall, 400)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function () {
      yoshi.position.y = tweenStartFall.y;
    })
    .onComplete(function () {
      collidedTop = false; //?
      collidedLeft = false;
      collidedRight = false;
      //setIdlePosition();
    })
    .start();
}
