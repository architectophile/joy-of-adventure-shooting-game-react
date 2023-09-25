import God from "../God";
import Angel, { AngelFactory } from "../angels/Angel";
import { GateType, HeavenGate } from "./HeavenGate";

export class KimchiGate extends HeavenGate {
  angelFactory: AngelFactory;

  constructor(
    name: string,
    type: GateType,
    fireRate: number,
    angelFactory: AngelFactory
  ) {
    super(name, type, fireRate);
    this.angelFactory = angelFactory;
  }

  createAngel = (god: God): Angel => {
    return this.angelFactory.createAngel(god.canvas);
  };

  playAngelSound = (): void => {
    this.angelFactory.playAngelSound();
    return;
  };
}
