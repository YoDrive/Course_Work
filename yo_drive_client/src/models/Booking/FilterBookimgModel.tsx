enum GearBoxEnum{
    automat="Автоматическая",
    mechanic="Механическая"
}
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