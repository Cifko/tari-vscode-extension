import * as vscode from "vscode";
import { Log, type Info } from "../../info";
import type JRPCClient from "../../jrpc-client";
import { TAG, TariTreeItem } from "../../tari-tree-item";

export class Process extends TariTreeItem {
  public children: Info[] = [];

  constructor(
    public readonly jrpcClient: JRPCClient,
    public readonly label: string,
    public readonly httpURL: string,
    is_running: boolean,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    super(label, collapsibleState, TAG.process);
    if (is_running) {
      this.addTag(TAG.is_running);
    }
    // this.children = [];
    // jrpcClient.get_logs(label).then((logs) => {
    //   logs.forEach((log: [string, string, string]) => {
    //     this.children.push(new Log(log[2], this.httpURL, log[0]));
    //   });
    // });
  }

  public async stop() {
    await this.jrpcClient.stop(this.label);
    this.removeTag(TAG.is_running);
  }
  public async start() {
    await this.jrpcClient.start(this.label);
    this.addTag(TAG.is_running);
  }
  public async is_running() {
    await this.jrpcClient.is_running(this.label);
  }
  public async webui() {}
}
