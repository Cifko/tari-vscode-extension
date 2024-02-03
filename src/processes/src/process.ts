import * as vscode from "vscode";
import type { Info } from "../../info";

export class Process extends vscode.TreeItem {
  public children: Info[] = [];
  constructor(public readonly label: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
    super(label, collapsibleState);
    this.contextValue = "tari.process";
    this.children = [];
    // this.command = { title: "X",  command: "tari.addBaseNode", arguments: [this] };
  }

  public showLogs(): void {
    console.log("showLogs");
  }
}
