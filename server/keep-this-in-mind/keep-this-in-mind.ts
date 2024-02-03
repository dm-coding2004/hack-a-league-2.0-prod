type Describable = {
  description: string;
};
declare function some(): any;
declare function some1(): Describable;

const a: Describable = some();
const b: any = some1();

a.description;
// 'any type' can be converted to 'any' type, and 'any' type can be convert to 'any type'.