import { GearBoxEnum } from "./../CarModel";
export interface Filter{
    dateStart?: Date;
    dateEnd?: Date;
    minCostDay?: number
    maxCostDay?: number;
    filialId?: number;
    classId?: number;
    carBrandId?: number;
    modelId?: number;
    gearBox?: GearBoxEnum;
    }