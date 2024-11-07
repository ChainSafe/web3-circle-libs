import { SmartContractEventMonitorApi } from "../../src/api/SmartContractEventMonitorApi";
import { v4 } from "uuid";

const apikey = process.env.API_KEY as string;
const publicKey = process.env.PUBLIC_KEY as string;
const secret = process.env.SECRET as string;

const baseUrl = "https://api.circle.com/v1/w3s";

describe("SmartContractEventMonitorApi Tests", () => {
  const eventMonitorApi = new SmartContractEventMonitorApi(
    baseUrl,
    apikey,
    secret,
    publicKey,
  );

  it("Get Event Monitors", async () => {
    const params = {
      blockchain: "ETH",
    };
    const eventMonitors = await eventMonitorApi.getEventMonitors(params);
    expect(eventMonitors).toBeDefined();
    expect(eventMonitors.length).toBeGreaterThan(0);
    expect(eventMonitors[0].id).toBeDefined();
    expect(eventMonitors[0].blockchain).toBe("ETH");
  });

  it("Create Event Monitor", async () => {
    const params = {
      idempotencyKey: v4(),
      blockchain: "ETH",
      contractAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      eventSignature:
        "Transfer(address indexed from, address indexed to, uint256 value)",
    };
    const createdMonitors = await eventMonitorApi.createEventMonitor(params);
    expect(createdMonitors).toBeDefined();
    expect(createdMonitors.length).toBeGreaterThan(0);
    const monitor = createdMonitors[0];
    expect(monitor.id).toBeDefined();
    expect(monitor.blockchain).toBe("ETH");
    expect(monitor.contractAddress).toBe(params.contractAddress);
  });

  it("Update Event Monitor", async () => {
    const params = {
      id: "e3c998a5-bdf1-4f3e-812f-24da238c0fff",
      isEnabled: false,
    };
    const updatedMonitors = await eventMonitorApi.updateEventMonitor(params);
    expect(updatedMonitors).toBeDefined();
    expect(updatedMonitors.length).toBeGreaterThan(0);
    const monitor = updatedMonitors[0];
    expect(monitor.id).toBe(params.id);
    expect(monitor.isEnabled).toBe(false);
  });

  it("Delete Event Monitor", async () => {
    const params = {
      id: "e3c998a5-bdf1-4f3e-812f-24da238c0fff",
    };
    await expect(
      eventMonitorApi.deleteEventMonitor(params),
    ).resolves.toBeUndefined();
  });

  it("Get Event Logs", async () => {
    const params = {
      blockchain: "ETH",
      contractAddress: "0x6bc50ff08414717f000431558c0b585332c2a53d",
      from: "2023-01-01T12:00:00Z",
      to: "2023-12-31T12:00:00Z",
    };
    const eventLogs = await eventMonitorApi.getEventLogs(params);
    expect(eventLogs).toBeDefined();
    expect(eventLogs.length).toBeGreaterThan(0);
    const log = eventLogs[0];
    expect(log.blockchain).toBe(params.blockchain);
    expect(log.contractAddress).toBe(params.contractAddress);
    expect(log.eventSignature).toBeDefined();
  });
});
