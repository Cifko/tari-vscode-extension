import * as vscode from "vscode";
import { Log, type Info } from "../../info";
import type JRPCClient from "../../jrpc-client";

export class Process extends vscode.TreeItem {
  public children: Info[] = [];
  constructor(
    public readonly jrpcClient: JRPCClient,
    public readonly label: string,
    public readonly httpURL: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed
  ) {
    super(label, collapsibleState);
    this.contextValue = "tari.process";
    this.children = [];
    jrpcClient.get_logs(label).then((logs) => {
      logs.forEach((log: [string, string, string]) => {
        this.children.push(new Log(log[2], this.httpURL, log[0]));
      });
    });
  }

  public stop() {
    this.jrpcClient.stop(this.label);
    this.contextValue = "tari.processStopped";
  }
  public start() {
    this.jrpcClient.start(this.label);
    this.contextValue = "tari.process";
  }
}
