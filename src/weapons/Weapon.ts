import Player from "../Player";
import Bullet from "../bullet/Bullet";

export type WeaponType = "gun" | "cannon" | "bomb";

export abstract class Weapon {
  name: string;
  type: WeaponType;
  fireRate: number;
  abstract createBullet: (player: Player) => Bullet;
  abstract playBulletSound: () => void;
  abstract increaseFireRate: () => void;

  constructor(name: string, type: WeaponType, fireRate: number) {
    this.name = name;
    this.type = type;
    this.fireRate = fireRate;
  }
}
