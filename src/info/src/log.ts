import * as vscode from "vscode";
import { Info } from "./info";

export class Log extends Info {
  constructor(public readonly label: string, public readonly httpURL: string, public readonly logPath: string) {
    super(label);
    this.logPath = httpURL + "/log/" + btoa(logPath) + "/normal";
  }

  public show(): void {
    vscode.env.openExternal(vscode.Uri.parse(this.logPath));
  }
}
