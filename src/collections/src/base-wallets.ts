import * as vscode from "vscode";
import { Collection } from "./collection";
import * as fs from "fs";
import * as path from "path";
import JRPCClient from "../../jrpc-client";
import { BaseWallet } from "../../processes/src/base-wallet";

export class BaseWallets extends Collection {
  constructor(jrpcClient: JRPCClient, httpURL: string) {
    super("Base Wallets", jrpcClient, httpURL, vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.base_wallets().then((base_wallets) => {
      for (let id in base_wallets) {
        this.addChild(new BaseWallet(jrpcClient, base_wallets[id].name, httpURL));
      }
    });
  }
  public async add() {
    let config = vscode.workspace.getConfiguration("tari");
    let resp = await this.jrpcClient.add_base_wallet();
    this.addChild(new BaseWallet(this.jrpcClient, resp.name, this.httpURL));
  }
}
