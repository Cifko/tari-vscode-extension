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
        return Promise.resolve(element.children);
        5;
      }
      if (element instanceof Process) {
        return Promise.resolve(element.children);
      }
      return Promise.resolve([]);
    }

    refresh(item: vscode.TreeItem): void {
      this._onDidChangeTreeData.fire(item);
    }
    add(item: Collection): void {
      item.add();
      this.refresh(item);
    }
    show(item: Info): void {
      item.show();
    }
    start(item: Process): void {
      item.start();
    }
    stop(item: Process): void {
      item.stop();
    }
  })();

  vscode.window.createTreeView("tari", { treeDataProvider });
  vscode.commands.registerCommand("tari.refreshEntry", (item) => treeDataProvider.refresh(item));
  vscode.commands.registerCommand("tari.show", (item) => treeDataProvider.show(item));
  vscode.commands.registerCommand("tari.add", (item) => treeDataProvider.add(item));
  vscode.commands.registerCommand("tari.start", (item) => treeDataProvider.start(item));
  vscode.commands.registerCommand("tari.stop", (item) => treeDataProvider.stop(item));
}

// This method is called when your extension is deactivated
export function deactivate() {}
