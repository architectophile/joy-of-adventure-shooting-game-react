import Player from "../Player";
import Bullet, { BulletFactory } from "../bullet/Bullet";
import { Weapon, WeaponType } from "./Weapon";

export class Gun extends Weapon {
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

  getBullet = (player: Player): Bullet => {
    return this.bulletFactory.getBullet(
      player,
      player.xPos,
      player.yPos - player.height / 2
    );
  };
}
