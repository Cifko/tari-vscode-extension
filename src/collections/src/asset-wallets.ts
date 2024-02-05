import * as vscode from "vscode";
import { Collection } from "./collection";
import JRPCClient from "../../jrpc-client";
import { AssetWallet } from "../../processes/src/asset-wallet";

export class AssetWallets extends Collection {
  constructor(jrpcClient: JRPCClient, httpURL: string) {
    super("Asset Wallets", jrpcClient, httpURL, vscode.TreeItemCollapsibleState.Expanded);
    jrpcClient.dan_wallets().then((wallets) => {
      for (let id in wallets) {
        this.addChild(new AssetWallet(jrpcClient, wallets[id].name, httpURL));
      }
    });
  }
  public async add() {
    let config = vscode.workspace.getConfiguration("tari");
    let resp = await this.jrpcClient.add_asset_wallet();
    this.addChild(new AssetWallet(this.jrpcClient, resp.name, this.httpURL));
  }
}
