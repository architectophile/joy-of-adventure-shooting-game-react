import God from "../God";
import Angel from "../angels/Angel";

export type GateType = "angel-tunnel";

export abstract class HeavenGate {
  name: string;
  type: GateType;
  fireRate: number;
  abstract createAngel: (god: God) => Angel;
  abstract playAngelSound: () => void;

  constructor(name: string, type: GateType, fireRate: number) {
    this.name = name;
    this.type = type;
    this.fireRate = fireRate;
  }
}
