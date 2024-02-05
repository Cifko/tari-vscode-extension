import * as vscode from "vscode";
import * as os from "os";
import type JRPCClient from "../../jrpc-client";

export abstract class Collection extends vscode.TreeItem {
  protected _children: vscode.TreeItem[];

  constructor(
    public readonly label: string,
    public readonly jrpcClient: JRPCClient,
    public readonly httpURL: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.contextValue = "tari.collection";
    this._children = [];
  }

  public async add() {}

  public abstract getChildren(): Promise<vscode.TreeItem[]>;

  public getPath(): string {
    return os.homedir();
  }

  protected addChild(child: vscode.TreeItem): void {
    this._children.push(child);
  }

  protected hasChild(name: string): boolean {
    for (let child of this._children) {
      if (child.label === name) {
        return true;
      }
    }
    return false;
  }
}
