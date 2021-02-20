import {DataLayer, Filters, IdObject, Region} from "../../src/database/productionDataLayer";
import {Business} from "../../src/endpoints/businesses";
import { AddRequest, UpdateRequest, DeleteRequest } from "../../src/endpoints/editRequests";

export class DummyDatalayer implements DataLayer {
  createAddRequest(_: AddRequest): Promise<AddRequest> {
      throw new Error("Method not implemented.");
  }
  createUpdateRequest(_: UpdateRequest): Promise<UpdateRequest> {
      throw new Error("Method not implemented.");
  }
  createDeleteRequests(_: DeleteRequest): Promise<DeleteRequest> {
      throw new Error("Method not implemented.");
  }
  businesses: Business[] = [];
  regions: Region[] = [];

  getBusinessesByRegion(_:string): Promise<Business[]> {
    return Promise.resolve(this.businesses);
  }

  async setBusiness(business:Business): Promise<IdObject> {
    this.businesses.push(business);
    let regionIndex = this.regions.findIndex((r) => r.name == business.regionId);
    let bizRegion = this.regions[regionIndex]
    if(!bizRegion.filters) {
      bizRegion.filters = {};
    }
    if(!bizRegion.filters.industries) {
      bizRegion.filters.industries = [];
    }
    let industryIndex = bizRegion.filters.industries.findIndex((i) => i.industry === business.industry);
    if(industryIndex < 0) {
      bizRegion.filters.industries.push({industry: business.industry, count: 1});
    } else {
      bizRegion.filters.industries[industryIndex].count++;
    }
    return {id:"1"};
  }

  async getFilters(regionId: string): Promise<Filters> {
    return {
      years: this.businesses.filter(b => b.regionId=== regionId).map((b) => b.year_added),
      industries: this.businesses.filter(b => b.regionId=== regionId).map((b) => b.industry)
    };
  }

  async setRegion(region: Region): Promise<IdObject> {
    this.regions.push(region);
    return {id: region.name};
  }

  async getAllRegions() : Promise<Region[]> {
    return this.regions;
  }

  async getRegionsManagedBy(managerId: string ): Promise<Region[]> {
    return this.regions.filter((r) => managerId === r.manager);
  }

  async deleteRegion(regionId: string): Promise<void> {
    this.regions = this.regions.filter((r) => r.name !== regionId);
  }

  clearRegions() {
    this.regions = [];
  }
}
