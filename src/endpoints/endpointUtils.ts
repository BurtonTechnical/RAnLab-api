import {RequestGenericInterface} from "fastify";

export interface AuthenticatedRequest extends RequestGenericInterface {
  Headers: {
    access_token: string
  }
}

export interface AuthenticatedRequestByRegionId extends AuthenticatedRequest {
  Params: {
    regionId: string
  },
  Headers: {
    access_token: string
  }
}
