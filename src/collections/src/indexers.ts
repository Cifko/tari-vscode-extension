import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { Indexer } from "../../processes/src/indexer";

export class Indexers extends Collection {
  constructor(jrpcClient: JRPCClient) {
    super("Indexers", vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.indexers().then((indexers) => {
      for (let index in indexers) {
        this.addChild(new Indexer(indexers[index].name));
      }
    });
  }
  public add(): void {
    console.log("add indexer");
  }
}
