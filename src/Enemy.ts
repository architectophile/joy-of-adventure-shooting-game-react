import { EnemyWeapon } from "./weapons/EnemyWeapon";

export default class Enemy {
  name: string;
  canvas: HTMLCanvasElement;
  private readonly weapons: Map<string, EnemyWeapon>;

  constructor(
    name: string,
    canvas: HTMLCanvasElement,
    weapons: Map<string, EnemyWeapon>
  ) {
    this.name = name;
    this.canvas = canvas;
    this.weapons = weapons;
  }

  setWeapon = (weapon: EnemyWeapon): void => {
    this.weapons.set(weapon.name, weapon);
  };

  getWeapons = (): Map<string, EnemyWeapon> => {
    return this.weapons;
  };
}
