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

  public async ping(): Promise<string> {
    return this.call("ping", {});
  }
  public async base_nodes(): Promise<{ name: string; grpc: string }[]> {
    return this.call("base_nodes", {});
  }
  public async base_wallets(): Promise<{ name: string; grpc: string }[]> {
    return this.call("base_wallets", {});
  }
  public async vns(): Promise<{ name: string; http: string; jrpc: string }[]> {
    return this.call("vns", {});
  }
  public async dan_wallets(): Promise<{ name: string; http: string; jrpc: string }[]> {
    return this.call("dan_wallets", {});
  }
  public async indexers(): Promise<{ name: string; http: string; jrpc: string }[]> {
    return this.call("indexers", {});
  }
  public async get_logs(name: string): Promise<any> {
    return this.call("get_logs", [name]);
  }
  // public async http_vn(id: number): Promise<string | null> {
  //   return this.call("http_vn", { id });
  // }
  // public async http_dan(id: number): Promise<string | null> {
  //   return this.call("http_vn", { id });
  // }
  // public async http_indexer(id: number): Promise<string | null> {
  //   return this.call("http_indexer", { id });
  // }
  // public async http_connector(): Promise<string | null> {
  //   return this.call("http_connector", {});
  // }
  public async mine(blocks: number): Promise<{}> {
    return this.call("mine", { blocks });
  }
}

export default JRPCClient;
