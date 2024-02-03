import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { ValidatorNode } from "../../processes/src/validator-node";

export class ValidatorNodes extends Collection {
  constructor(jrpcClient: JRPCClient) {
    super("Validator Nodes", vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.vns().then((vns) => {
      for (let index in vns) {
        this.addChild(new ValidatorNode(jrpcClient, vns[index].name));
      }
    });
  }

  public add(): void {
    console.log("add validator node");
  }
}
