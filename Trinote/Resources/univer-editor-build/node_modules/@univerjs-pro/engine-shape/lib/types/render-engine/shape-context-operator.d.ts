export declare class ShapeContextStaticOperator {
    static val(value: number): number;
    static pin(value: number, min: number, max: number): number;
    static addSub(a: number, b: number, c: number): number;
    static mulDiv(a: number, b: number, c: number): number;
    static addDiv(a: number, b: number, c: number): number;
    static abs(value: number): number;
    static max(a: number, b: number): number;
    static min(a: number, b: number): number;
    static ifelse(condition: boolean, trueValue: number, falseValue: number): number;
    static sin(yr: number, ang: number): number;
    static cos(xr: number, ang: number): number;
    static tan(xr: number, ang: number): number;
    static mod(a: number, b: number, c: number): number;
    static sqrt(value: number): number;
    static atan2(x: number, y: number): number;
    static cat2(x: number, y: number, z: number): number;
    static sat2(x: number, y: number, z: number): number;
}
