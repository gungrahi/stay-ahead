export abstract class Equatable {
  constructor() {}
  equals(that: Object) {
    // since Equatable is used only for Entities, which don't have methods
    // creating deep copy using JSON.stringify is safe & cheap
    return deepCompare(this, that);
    // return deepEqual(this, that);  // avoid as it is expensive in general
  }
}

// works well for objects that do not contain functions
function deepCompare(obj1: any, obj2:any): boolean {
  const obj1Json = JSON.stringify(obj1);
  const obj2Json = JSON.stringify(obj2);
  return obj1Json === obj2Json;
}

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
