import { BLOCKCHAIN, SmartContractEventMonitorApi } from '../../src';

import { ETH_SEPOLIA_USDC_CONTRACT_ADDRESS } from './fixtures';

const apikey = process.env.API_KEY as string;

// @todo: all event monitors requires webhook to be set up. All requests return forbidden
describe.skip('SmartContractEventMonitorApi Tests', () => {
  const eventMonitorApi = new SmartContractEventMonitorApi(apikey);

  it('Get Event Monitors', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
    };
    const eventMonitors = await eventMonitorApi.getEventMonitors(params);
    expect(eventMonitors).toBeDefined();
    expect(eventMonitors.length).toBeGreaterThan(0);
    expect(eventMonitors[0].id).toBeDefined();
    expect(eventMonitors[0].blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
  });

  it.only('Create Event Monitor', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      contractAddress: '0x85f783c4b8eba3fc920576080f809fd038b8227d',
      eventSignature: 'Transfer(address indexed from, address indexed to, uint256 value)',
    };
    const createdMonitors = await eventMonitorApi.createEventMonitor(params);
    expect(createdMonitors).toBeDefined();
    expect(createdMonitors.length).toBeGreaterThan(0);
    const monitor = createdMonitors[0];
    expect(monitor.id).toBeDefined();
    expect(monitor.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(monitor.contractAddress).toBe(params.contractAddress);
  });

  it('Update Event Monitor', async () => {
    const params = {
      id: 'e3c998a5-bdf1-4f3e-812f-24da238c0fff',
      isEnabled: false,
    };
    const updatedMonitors = await eventMonitorApi.updateEventMonitor(params);
    expect(updatedMonitors).toBeDefined();
    expect(updatedMonitors.length).toBeGreaterThan(0);
    const monitor = updatedMonitors[0];
    expect(monitor.id).toBe(params.id);
    expect(monitor.isEnabled).toBe(false);
  });

  it('Delete Event Monitor', async () => {
    const params = {
      id: 'e3c998a5-bdf1-4f3e-812f-24da238c0fff',
    };
    await expect(eventMonitorApi.deleteEventMonitor(params)).resolves.toBeUndefined();
  });

  it('Get Event Logs', async () => {
    const params = {
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      contractAddress: ETH_SEPOLIA_USDC_CONTRACT_ADDRESS,
      from: '2024-01-01T12:00:00Z',
      to: '2024-12-31T12:00:00Z',
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
