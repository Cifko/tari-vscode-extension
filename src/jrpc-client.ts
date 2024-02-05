import axios, { AxiosError } from "axios";

class JRPCClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
    console.log("JRPC url", url);
    this.vns()
      .then((result) => {
        console.log("JRPC ping result", result);
      })
      .catch((error) => {
        console.log("JRPC ping error", error);
      });
  }

  private async call(method: string, params: any): Promise<any> {
    try {
      const response = await axios.post(this.url, {
        jsonrpc: "2.0",
        method,
        params,
        id: 1,
      });
      console.log("Method", method, "Params", params, "Response", response.data.result);
      console.log("JRPC response", response.data.result);
      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code outside of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      } else {
        // Unknown error occurred
        console.error(error);
      }
    }
  }

  public ping = async (): Promise<string> => await this.call("ping", {});
  public base_nodes = async (): Promise<{ name: string; grpc: string }[]> => await this.call("base_nodes", {});
  public base_wallets = async (): Promise<{ name: string; grpc: string }[]> => await this.call("base_wallets", {});
  public vns = async (): Promise<{ name: string; http: string; jrpc: string }[]> => await this.call("vns", {});
  public dan_wallets = async (): Promise<{ name: string; http: string; jrpc: string }[]> =>
    await this.call("dan_wallets", {});
  public indexers = async (): Promise<{ name: string; http: string; jrpc: string }[]> =>
    await this.call("indexers", {});
  public add_base_node = async (): Promise<{ name: string }> => await this.call("add_base_node", {});
  public add_base_wallet = async (): Promise<{ name: string }> => await this.call("add_base_wallet", {});
  public add_asset_wallet = async (): Promise<{ name: string }> => await this.call("add_asset_wallet", {});
  public add_indexer = async (): Promise<{ name: string }> => await this.call("add_indexer", {});
  public add_validator_node = async (): Promise<{ name: string }> => await this.call("add_validator_node", {});
  public start = async (what: string): Promise<{ success: boolean }> => await this.call("start", [what]);
  public stop = async (what: string): Promise<{ success: boolean }> => await this.call("stop", [what]);
  public get_logs = async (name: string): Promise<any> => await this.call("get_logs", [name]);
  public mine = async (blocks: number): Promise<{}> => await this.call("mine", { blocks });
}

export default JRPCClient;