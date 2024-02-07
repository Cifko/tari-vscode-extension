import * as vscode from "vscode";
import { Process } from "./process";
import type JRPCClient from "../../jrpc-client";
import { TAG } from "../../tari-tree-item";

export class AssetWallet extends Process {
  constructor(
    public jrpcClient: JRPCClient,
    public readonly label: string,
    public readonly httpURL: string,
    is_running: boolean
  ) {
    super(jrpcClient, label, httpURL, is_running);
    this.addTag(TAG.webui);
  }
}
