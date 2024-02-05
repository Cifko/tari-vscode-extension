import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { Indexer } from "../../processes/src/indexer";

export class Indexers extends Collection {
  constructor(jrpcClient: JRPCClient, httpURL: string) {
    super("Indexers", jrpcClient, httpURL, vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.indexers().then((indexers) => {
      for (let index in indexers) {
        this.addChild(new Indexer(jrpcClient, indexers[index].name, httpURL, indexers[index].is_running));
      }
    });
  }
  public async add() {
    let config = vscode.workspace.getConfiguration("tari");
    let resp = await this.jrpcClient.add_indexer();
    this.addChild(new Indexer(this.jrpcClient, resp.name, this.httpURL, true));
  }
}
