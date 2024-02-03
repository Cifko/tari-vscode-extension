import * as vscode from "vscode";
import { Collection } from "./collection";
import * as fs from "fs";
import * as path from "path";
import JRPCClient from "../../jrpc-client";
import { BaseWallet } from "../../processes/src/base-wallet";

export class BaseWallets extends Collection {
  constructor(jrpcClient: JRPCClient) {
    super("Base Wallets", vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.base_wallets().then((base_wallets) => {
      for (let id in base_wallets) {
        this.addChild(new BaseWallet(base_wallets[id].name));
      }
    });
  }
  public add(): void {
    console.log("add wallet");
  }
}
