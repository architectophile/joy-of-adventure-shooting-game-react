interface MovingObject {
  width: number;
  height: number;
  xPos: number;
  yPos: number;
}

export const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const isTwoObjectsHit = (
  object1: MovingObject,
  object2: MovingObject
): boolean => {
  return (
    Math.abs(object1.xPos - object2.xPos) <
      object1.width / 2 + object2.width / 2 &&
    Math.abs(object1.yPos - object2.yPos) <
      object1.height / 2 + object2.height / 2
  );
};
