import * as vscode from "vscode";
import * as os from "os";
import type JRPCClient from "../../jrpc-client";

export class Collection extends vscode.TreeItem {
  private _children: vscode.TreeItem[];

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
