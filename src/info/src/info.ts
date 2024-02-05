import * as vscode from "vscode";

export class Info extends vscode.TreeItem {
  constructor(public readonly label: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.contextValue = "tari.info";
  }

  public show(): void {
    console.log("show");
  }
}
