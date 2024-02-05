import * as vscode from "vscode";
import { Collection } from "./collection";
import { BaseNode } from "../../processes/src/base-node";
import JRPCClient from "../../jrpc-client";

export class BaseNodes extends Collection {
  constructor(jrpcClient: JRPCClient, httpURL: string) {
    super("Base Nodes", jrpcClient, httpURL, vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.base_nodes().then((base_nodes) => {
      for (let id in base_nodes) {
        this.addChild(new BaseNode(jrpcClient, base_nodes[id].name, httpURL, base_nodes[id].is_running));
      }
    });
  }
  public async add() {
    let config = vscode.workspace.getConfiguration("tari");
    let resp = await this.jrpcClient.add_base_node();
    this.addChild(new BaseNode(this.jrpcClient, resp.name, this.httpURL, true));
  }
}
