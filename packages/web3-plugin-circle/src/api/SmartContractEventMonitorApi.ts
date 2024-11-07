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
  async getEventMonitors(
    params?: GetEventMonitorsParameters,
  ): Promise<EventMonitor[]> {
    return this.getRequest<EventMonitor[]>(
      "/contracts/monitors",
      params,
      "eventMonitors",
    );
  }

  async createEventMonitor(
    params: CreateEventMonitorParameters,
  ): Promise<EventMonitor[]> {
    return this.postRequest<EventMonitor[]>(
      "/contracts/monitors",
      params,
      "eventMonitors",
    );
  }

  async updateEventMonitor(
    params: UpdateEventMonitorParameters,
  ): Promise<EventMonitor[]> {
    return this.putRequest<EventMonitor[]>(
      "/contracts/monitors/",
      params,
      "eventMonitors",
    );
  }

  async deleteEventMonitor(
    params: DeleteEventMonitorParameters,
  ): Promise<void> {
    return this.deleteRequest<void>(`/contracts/monitors`, params);
  }

  async getEventLogs(params?: GetEventLogsParameters): Promise<EventLog[]> {
    return this.getRequest<EventLog[]>(
      "/contracts/events",
      params,
      "eventLogs",
    );
  }
}
