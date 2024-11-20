import {
  GetEventMonitorsParameters,
  CreateEventMonitorParameters,
  UpdateEventMonitorParameters,
  DeleteEventMonitorParameters,
  GetEventLogsParameters,
  EventMonitor,
  EventLog,
} from "./types";
import { BaseApi } from "./BaseApi";

export class SmartContractEventMonitorApi extends BaseApi {
  /**
   * Fetch a list of event monitors, optionally filtered by blockchain, contract address, and event signature.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors
   * @param params parameters for the get event monitors request
   * @returns the event monitors related to the specified filters
   */
  async getEventMonitors(
    params?: GetEventMonitorsParameters,
  ): Promise<EventMonitor[]> {
    return this.getRequest<EventMonitor[]>(
      "/contracts/monitors",
      params,
      "eventMonitors",
    );
  }

  /**
   * Create a new event monitor based on the provided blockchain, contract address, and event signature.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor
   * @param params parameters for the create event monitor request
   * @returns the new event monitor
   */
  async createEventMonitor(
    params: CreateEventMonitorParameters,
  ): Promise<EventMonitor[]> {
    return this.postRequest<EventMonitor[]>(
      "/contracts/monitors",
      params,
      "eventMonitors",
    );
  }

  /**
   * Update an existing event monitor given its ID.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor
   * @param params parameters for the update event monitor request
   * @returns the updated event monitor
   */
  async updateEventMonitor(
    params: UpdateEventMonitorParameters,
  ): Promise<EventMonitor[]> {
    return this.putRequest<EventMonitor[]>(
      "/contracts/monitors/",
      params,
      "eventMonitors",
    );
  }

  /**
   * Delete an existing event monitor given its ID.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/delete-event-monitor
   * @param params parameters for the delete event monitor request
   * @returns an empty Promise
   */
  async deleteEventMonitor(
    params: DeleteEventMonitorParameters,
  ): Promise<void> {
    return this.deleteRequest<void>(`/contracts/monitors`, params);
  }

  /**
   * Fetch all event logs, optionally filtered by blockchain and contract address.
   * https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs
   * @param params parameters for the get event logs request
   * @returns the list of event logs
   */
  async getEventLogs(params?: GetEventLogsParameters): Promise<EventLog[]> {
    return this.getRequest<EventLog[]>(
      "/contracts/events",
      params,
      "eventLogs",
    );
  }
}
