import * as vscode from "vscode";
import * as os from "os";

export class Collection extends vscode.TreeItem {
  private _children: vscode.TreeItem[];

  constructor(public readonly label: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
    super(label, collapsibleState);
    console.log("Collection constructor", label);
    this.contextValue = "tari.collection";
    this._children = [];
  }

  public add(): void {}

  public getPath(): string {
    return os.homedir();
  }

  get children(): vscode.TreeItem[] {
    return this._children;
  }

  protected addChild(child: vscode.TreeItem): void {
    console.log("addChild");
    this._children.push(child);
  }
}
