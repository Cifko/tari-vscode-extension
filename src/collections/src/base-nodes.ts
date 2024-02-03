import * as vscode from "vscode";
import { Collection } from "./collection";
import { BaseNode } from "../../processes/src/base-node";
import JRPCClient from "../../jrpc-client";

export class BaseNodes extends Collection {
  constructor(jrpcClient: JRPCClient) {
    super("Base Nodes", vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.base_nodes().then((base_nodes) => {
      for (let id in base_nodes) {
        this.addChild(new BaseNode(base_nodes[id].name));
      }
    });
  }
  public add(): void {
    let config = vscode.workspace.getConfiguration("tari");
    let baseLayerPath = config.get<string>("baseLayerPath", "");
    this.addChild(new BaseNode("BaseNode"));
    console.log("add base node");
  }
}
