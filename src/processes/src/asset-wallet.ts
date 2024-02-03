import * as vscode from "vscode";
import { Process } from "./process";

export class AssetWallet extends Process {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    super(label, collapsibleState);
    // this.command = { title: "X",  command: "tari.addBaseNode", arguments: [this] };
  }
}
