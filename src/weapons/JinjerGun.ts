import Player from "../Player";
import Bullet, { BulletFactory } from "../bullet/Bullet";
import { Weapon, WeaponType } from "./Weapon";

const GUN_MAX_FIRE_RATE = 900;

export class JinjerGun extends Weapon {
  bulletFactory: BulletFactory;

  constructor(
    name: string,
    type: WeaponType,
    fireRate: number,
    bulletFactory: BulletFactory
  ) {
    super(name, type, fireRate);
    this.bulletFactory = bulletFactory;
  }

  createBullet = (player: Player): Bullet => {
    return this.bulletFactory.createBullet(
      player,
      player.xPos,
      player.yPos - player.height / 2
    );
  };

  playBulletSound = (): void => {
    this.bulletFactory.playBulletSound();
    return;
  };

  upgrade = (): void => {
    const newFireRate = this.fireRate - 15;
    if (newFireRate > GUN_MAX_FIRE_RATE) {
      this.fireRate = newFireRate;
    } else {
      this.fireRate = GUN_MAX_FIRE_RATE;
    }
  };
}
