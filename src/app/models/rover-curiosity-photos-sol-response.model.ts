// To parse this data:
//
//   import { Convert, RoverCuriosityPhotosSolResponse } from "./file";
//
//   const roverCuriosityPhotosSolResponse = Convert.toRoverCuriosityPhotosSolResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface RoverCuriosityPhotosSolResponse {
  photos: Photo[];
}

export interface Photo {
  id: number;
  sol: number;
  camera: PhotoCamera;
  img_src: string;
  earth_date: Date;
  rover: Rover;
}

export interface PhotoCamera {
  id: number;
  name: CameraName;
  rover_id: number;
  full_name: FullName;
}

export enum FullName {
  ChemistryAndCameraComplex = 'Chemistry and Camera Complex',
  FrontHazardAvoidanceCamera = 'Front Hazard Avoidance Camera',
  MarsDescentImager = 'Mars Descent Imager',
  MarsHandLensImager = 'Mars Hand Lens Imager',
  MastCamera = 'Mast Camera',
  NavigationCamera = 'Navigation Camera',
  RearHazardAvoidanceCamera = 'Rear Hazard Avoidance Camera'
}

export enum CameraName {
  Chemcam = 'CHEMCAM',
  Fhaz = 'FHAZ',
  Mahli = 'MAHLI',
  Mardi = 'MARDI',
  Mast = 'MAST',
  Navcam = 'NAVCAM',
  Rhaz = 'RHAZ'
}

export interface Rover {
  id: number;
  name: RoverName;
  landing_date: Date;
  launch_date: Date;
  status: Status;
  max_sol: number;
  max_date: Date;
  total_photos: number;
  cameras: CameraElement[];
}

export interface CameraElement {
  name: CameraName;
  full_name: FullName;
}

export enum RoverName {
  Curiosity = 'Curiosity'
}

export enum Status {
  Active = 'active'
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toRoverCuriosityPhotosSolResponse(
    json: string
  ): RoverCuriosityPhotosSolResponse {
    return cast(JSON.parse(json), r('RoverCuriosityPhotosSolResponse'));
  }

  public static roverCuriosityPhotosSolResponseToJson(
    value: RoverCuriosityPhotosSolResponse
  ): string {
    return JSON.stringify(
      uncast(value, r('RoverCuriosityPhotosSolResponse')),
      null,
      2
    );
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    var l = typs.length;
    for (var i = 0; i < l; i++) {
      var typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(typ: any, val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    var result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(typ, val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  RoverCuriosityPhotosSolResponse: o(
    [{ json: 'photos', js: 'photos', typ: a(r('Photo')) }],
    false
  ),
  Photo: o(
    [
      { json: 'id', js: 'id', typ: 0 },
      { json: 'sol', js: 'sol', typ: 0 },
      { json: 'camera', js: 'camera', typ: r('PhotoCamera') },
      { json: 'img_src', js: 'img_src', typ: '' },
      { json: 'earth_date', js: 'earth_date', typ: Date },
      { json: 'rover', js: 'rover', typ: r('Rover') }
    ],
    false
  ),
  PhotoCamera: o(
    [
      { json: 'id', js: 'id', typ: 0 },
      { json: 'name', js: 'name', typ: r('CameraName') },
      { json: 'rover_id', js: 'rover_id', typ: 0 },
      { json: 'full_name', js: 'full_name', typ: r('FullName') }
    ],
    false
  ),
  Rover: o(
    [
      { json: 'id', js: 'id', typ: 0 },
      { json: 'name', js: 'name', typ: r('RoverName') },
      { json: 'landing_date', js: 'landing_date', typ: Date },
      { json: 'launch_date', js: 'launch_date', typ: Date },
      { json: 'status', js: 'status', typ: r('Status') },
      { json: 'max_sol', js: 'max_sol', typ: 0 },
      { json: 'max_date', js: 'max_date', typ: Date },
      { json: 'total_photos', js: 'total_photos', typ: 0 },
      { json: 'cameras', js: 'cameras', typ: a(r('CameraElement')) }
    ],
    false
  ),
  CameraElement: o(
    [
      { json: 'name', js: 'name', typ: r('CameraName') },
      { json: 'full_name', js: 'full_name', typ: r('FullName') }
    ],
    false
  ),
  FullName: [
    'Chemistry and Camera Complex',
    'Front Hazard Avoidance Camera',
    'Mars Descent Imager',
    'Mars Hand Lens Imager',
    'Mast Camera',
    'Navigation Camera',
    'Rear Hazard Avoidance Camera'
  ],
  CameraName: ['CHEMCAM', 'FHAZ', 'MAHLI', 'MARDI', 'MAST', 'NAVCAM', 'RHAZ'],
  RoverName: ['Curiosity'],
  Status: ['active']
};
