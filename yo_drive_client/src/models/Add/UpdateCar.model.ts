export interface CarUpdated{
    carId: number,
    modelId: number,
    classId: number,
    filialId: number,
    year: number,
    gearBox: number,
    costDay: number,
    fileName?: string,
    file?: File
}