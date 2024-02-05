import * as vscode from "vscode";
import { Log, type Info } from "../../info";
import type JRPCClient from "../../jrpc-client";

export class Process extends vscode.TreeItem {
  public children: Info[] = [];
  constructor(
    public readonly jrpcClient: JRPCClient,
    public readonly label: string,
    public readonly httpURL: string,
    is_running: boolean,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed
  ) {
    super(label, collapsibleState);
    this.contextValue = is_running ? "tari.process" : "tari.processStopped";
    this.children = [];
    jrpcClient.get_logs(label).then((logs) => {
      logs.forEach((log: [string, string, string]) => {
        this.children.push(new Log(log[2], this.httpURL, log[0]));
      });
    });
  }

  public async stop() {
    await this.jrpcClient.stop(this.label);
    this.contextValue = "tari.processStopped";
  }
  public async start() {
    await this.jrpcClient.start(this.label);
    this.contextValue = "tari.process";
  }
  public async is_running() {
    await this.jrpcClient.is_running(this.label);
  }
}
