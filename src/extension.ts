// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { BaseNodes, Collection, AssetWallets, Indexers, ValidatorNodes, BaseWallets } from "./collections";
import { Process } from "./processes";
import JRPCClient from "./jrpc-client";
import type { Info } from "./info";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let config = vscode.workspace.getConfiguration("tari");
  let jrpcURL = config.get<string>("jrpcURL");
  let httpURL = config.get<string>("httpURL");
  if (jrpcURL === undefined || httpURL === undefined) {
    throw new Error("jrpcURL or httpURL is undefined");
  }

  let jrpcClient = new JRPCClient(jrpcURL);

  let collections = [
    new ValidatorNodes(jrpcClient, httpURL),
    new AssetWallets(jrpcClient, httpURL),
    new Indexers(jrpcClient, httpURL),
    new BaseNodes(jrpcClient, httpURL),
    new BaseWallets(jrpcClient, httpURL),
  ];
  const treeDataProvider = new (class implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<
      vscode.TreeItem | undefined
    >();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
      return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
      if (!element) {
        return Promise.resolve(collections);
      }
      if (element instanceof Collection) {
        return element.getChildren();
      }
      if (element instanceof Process) {
        return Promise.resolve(element.children);
      }
      return Promise.resolve([]);
    }

    refresh(item: vscode.TreeItem): void {
      this._onDidChangeTreeData.fire(item);
    }
    async add(item: Collection) {
      await item.add();
      this.refresh(item);
    }
    show(item: Info) {
      item.show();
      this.refresh(item);
    }
    async start(item: Process) {
      await item.start();
      this.refresh(item);
    }
    async stop(item: Process) {
      await item.stop();
      this.refresh(item);
    }
    async webui(item: Process) {
      console.log("webui");
      await item.webui();
    }
    async logs(item: Process) {}
  })();

  vscode.window.createTreeView("tari", { treeDataProvider });
  vscode.commands.registerCommand("tari.refreshEntry", (item) => treeDataProvider.refresh(item));
  vscode.commands.registerCommand("tari.show", (item) => treeDataProvider.show(item));
  vscode.commands.registerCommand("tari.add", async (item) => await treeDataProvider.add(item));
  vscode.commands.registerCommand("tari.start", async (item) => await treeDataProvider.start(item));
  vscode.commands.registerCommand("tari.stop", async (item) => await treeDataProvider.stop(item));
  vscode.commands.registerCommand("tari.logs", async (item) => await treeDataProvider.logs(item));
  vscode.commands.registerCommand("tari.webUI", async (item) => await treeDataProvider.webui(item));
}

// This method is called when your extension is deactivated
export function deactivate() {}
