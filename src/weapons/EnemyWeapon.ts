import Enemy from "../Enemy";
import Meteor from "../meteors/Meteor";

export type WeaponType = "meteor";

export abstract class EnemyWeapon {
  name: string;
  type: WeaponType;
  fireRate: number;
  abstract createMeteor: (enemy: Enemy) => Meteor;
  abstract playMeteorSound: () => void;

  constructor(name: string, type: WeaponType, fireRate: number) {
    this.name = name;
    this.type = type;
    this.fireRate = fireRate;
  }
}
