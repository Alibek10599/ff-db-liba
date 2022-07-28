export interface Record<T> {
    id: string;
    data: T;
    toString(): string;
    toJSON(): T;
}
