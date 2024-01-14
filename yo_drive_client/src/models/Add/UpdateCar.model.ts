export interface CarUpdated{
    CarId: number,
    ModelId: number,
    ClassId: number,
    FilialId: number,
    Year: number,
    GearBox: number,
    CostDay: number,
    CarImage: File | undefined
}