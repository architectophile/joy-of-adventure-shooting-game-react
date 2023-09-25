import { HeavenGate } from "./gates/HeavenGate";

export default class God {
  name: string;
  canvas: HTMLCanvasElement;
  private readonly gates: Map<string, HeavenGate>;

  constructor(
    name: string,
    canvas: HTMLCanvasElement,
    gates: Map<string, HeavenGate>
  ) {
    this.name = name;
    this.canvas = canvas;
    this.gates = gates;
  }

  setGate = (gate: HeavenGate): void => {
    this.gates.set(gate.name, gate);
  };

  getGates = (): Map<string, HeavenGate> => {
    return this.gates;
  };
}
