import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { AssetWallet } from "../../processes/src/asset-wallet";

export class AssetWallets extends Collection {
  constructor(jrpcClient: JRPCClient) {
    super("Asset Wallets", vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.dan_wallets().then((wallets) => {
      for (let id in wallets) {
        this.addChild(new AssetWallet(wallets[id].name));
      }
    });
  }
  public add(): void {
    console.log("add Asset Wallet");
  }
}
