import type {CreateServerInfo, IHubServerAPI, ServerId, ServerInfo} from "../../hub/IHubServerAPI";

/**
 * Save in localstorage all information about servers
 */
export class HubServerLocalAPI implements IHubServerAPI {
    private localStorageKey = 'servers';

    private save(servers: ServerInfo[]) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(servers));
    }

    private load(): ServerInfo[] {
        const data = localStorage.getItem(this.localStorageKey);
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    }

    async add(data: CreateServerInfo): Promise<void> {
        const servers = this.load();
        servers.push({
            id: `waha_${Math.random().toString().slice(2)}`,
            ...data
        });
        this.save(servers);
        return

    }

    async edit(id: ServerId, data: ServerInfo): Promise<void> {
        const servers = this.load();
        const index = servers.findIndex(server => server.id === id);
        if (index === -1) {
            throw new Error(`Server '${id}' not found`);
        }
        servers[index] = data;
        this.save(servers);
        return
    }

    async get(id: ServerId): Promise<ServerInfo> {
        const servers = this.load();
        const server = servers.find(server => server.id === id);
        if (!server) {
            throw new Error(`Server ${id} not found`);
        }
        return server;
    }

    async list(): Promise<ServerInfo[]> {
        return this.load();
    }

    remove(id: ServerId): Promise<void> {
        const servers = this.load();
        const index = servers.findIndex(server => server.id === id);
        if (index === -1) {
            throw new Error(`Server '${id}' not found`);
        }
        servers.splice(index, 1);
        this.save(servers);
        return
    }
}
