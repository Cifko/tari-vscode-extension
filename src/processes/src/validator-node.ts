import * as vscode from "vscode";
import { Process } from "./process";
import type JRPCClient from "../../jrpc-client";
import { Log } from "../../info";

export class ValidatorNode extends Process {
  constructor(
    public jrpcClient: JRPCClient,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed
  ) {
    super(label, collapsibleState);
    jrpcClient.get_logs(label).then((logs) => {
      logs.forEach((log: [string, string, string]) => {
        this.children.push(new Log(log[2]));
      });
    });
    // this.command = { title: "X",  command: "tari.addBaseNode", arguments: [this] };
  }
}
