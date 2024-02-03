// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { BaseNodes, Collection, AssetWallets, Indexers, ValidatorNodes, BaseWallets } from "./collections";
import { Process } from "./processes";
import JRPCClient from "./jrpc-client";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let config = vscode.workspace.getConfiguration("tari");
  let jrpcURL = config.get<string>("jrpcURL");
  if (jrpcURL === undefined) {
    throw new Error("jrpcURL is undefined");
  }

  let jrpcClient = new JRPCClient(jrpcURL);

  let collections = [
    new ValidatorNodes(jrpcClient),
    new AssetWallets(jrpcClient),
    new Indexers(jrpcClient),
    new BaseNodes(jrpcClient),
    new BaseWallets(jrpcClient),
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
      console.log("getChildren", element);
      if (!element) {
        return Promise.resolve(collections);
      }
      if (element instanceof Collection) {
        return Promise.resolve(element.children);
      }
      if (element instanceof Process) {
        return Promise.resolve(element.children);
      }
      return Promise.resolve([]);
    }

    refresh(item: vscode.TreeItem): void {
      this._onDidChangeTreeData.fire(item);
    }
    addProcess(item: Collection): void {
      item.add();
      this.refresh(item);
    }
    showLogs(item: Process): void {
      item.showLogs();
    }
  })();

  vscode.window.createTreeView("tari", { treeDataProvider });
  vscode.commands.registerCommand("tari.refreshEntry", (item) => treeDataProvider.refresh(item));
  vscode.commands.registerCommand("tari.showLogs", (item) => treeDataProvider.showLogs(item));
  vscode.commands.registerCommand("tari.addProcess", (item) => treeDataProvider.addProcess(item));
}

// This method is called when your extension is deactivated
export function deactivate() {}
