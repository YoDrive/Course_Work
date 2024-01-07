import { GearBoxEnum } from "./../CarModel";
export interface Filter{
    startDate?: Date;
    endDate?: Date;
    minCostDay?: number
    maxCostDay?: number;
    filialId?: number[];
    classId?: number[];
    carBrandId?: number[];
    modelId?: number[];
    gearBox?: GearBoxEnum;
    }