import Enemy from "../Enemy";
import Meteor, { MeteorFactory } from "../meteors/Meteor";
import { EnemyWeapon, WeaponType } from "./EnemyWeapon";

export class MeteorGun extends EnemyWeapon {
  meteorFactory: MeteorFactory;

  constructor(
    name: string,
    type: WeaponType,
    fireRate: number,
    meteorFactory: MeteorFactory
  ) {
    super(name, type, fireRate);
    this.meteorFactory = meteorFactory;
  }

  createMeteor = (enemy: Enemy): Meteor => {
    return this.meteorFactory.createMeteor(enemy.canvas);
  };

  playMeteorSound = (): void => {
    this.meteorFactory.playMeteorSound();
    return;
  };
}
