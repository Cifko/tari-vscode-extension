import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { ValidatorNode } from "../../processes/src/validator-node";

export class ValidatorNodes extends Collection {
  constructor(jrpcClient: JRPCClient, httpURL: string) {
    super("Validator Nodes", jrpcClient, httpURL, vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.vns().then((vns) => {
      for (let index in vns) {
        this.addChild(new ValidatorNode(jrpcClient, vns[index].name, this.httpURL, vns[index].is_running));
      }
    });
  }

  public async add() {
    let config = vscode.workspace.getConfiguration("tari");
    let resp = await this.jrpcClient.add_validator_node();
    this.addChild(new ValidatorNode(this.jrpcClient, resp.name, this.httpURL, true));
  }
}
