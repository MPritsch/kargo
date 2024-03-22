// This file was autogenerated by go-to-protobuf. Do not edit it manually!

// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file k8s.io/apimachinery/pkg/runtime/generated.proto (package k8s.io.apimachinery.pkg.runtime, syntax proto2)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * RawExtension is used to hold extensions in external versions.
 *
 * To use this, make a field which has RawExtension as its type in your external, versioned
 * struct, and Object in your internal struct. You also need to register your
 * various plugin types.
 *
 * // Internal package:
 *
 * 	type MyAPIObject struct {
 * 		runtime.TypeMeta `json:",inline"`
 * 		MyPlugin runtime.Object `json:"myPlugin"`
 * 	}
 *
 * 	type PluginA struct {
 * 		AOption string `json:"aOption"`
 * 	}
 *
 * // External package:
 *
 * 	type MyAPIObject struct {
 * 		runtime.TypeMeta `json:",inline"`
 * 		MyPlugin runtime.RawExtension `json:"myPlugin"`
 * 	}
 *
 * 	type PluginA struct {
 * 		AOption string `json:"aOption"`
 * 	}
 *
 * // On the wire, the JSON will look something like this:
 *
 * 	{
 * 		"kind":"MyAPIObject",
 * 		"apiVersion":"v1",
 * 		"myPlugin": {
 * 			"kind":"PluginA",
 * 			"aOption":"foo",
 * 		},
 * 	}
 *
 * So what happens? Decode first uses json or yaml to unmarshal the serialized data into
 * your external MyAPIObject. That causes the raw JSON to be stored, but not unpacked.
 * The next step is to copy (using pkg/conversion) into the internal struct. The runtime
 * package's DefaultScheme has conversion functions installed which will unpack the
 * JSON stored in RawExtension, turning it into the correct object type, and storing it
 * in the Object. (TODO: In the case where the object is of an unknown type, a
 * runtime.Unknown object will be created and stored.)
 *
 * +k8s:deepcopy-gen=true
 * +protobuf=true
 * +k8s:openapi-gen=true
 *
 * @generated from message k8s.io.apimachinery.pkg.runtime.RawExtension
 */
export class RawExtension extends Message<RawExtension> {
  /**
   * Raw is the underlying serialization of this object.
   *
   * TODO: Determine how to detect ContentType and ContentEncoding of 'Raw' data.
   *
   * @generated from field: optional bytes raw = 1;
   */
  raw?: Uint8Array;

  constructor(data?: PartialMessage<RawExtension>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "k8s.io.apimachinery.pkg.runtime.RawExtension";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "raw", kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RawExtension {
    return new RawExtension().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RawExtension {
    return new RawExtension().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RawExtension {
    return new RawExtension().fromJsonString(jsonString, options);
  }

  static equals(a: RawExtension | PlainMessage<RawExtension> | undefined, b: RawExtension | PlainMessage<RawExtension> | undefined): boolean {
    return proto2.util.equals(RawExtension, a, b);
  }
}

/**
 * TypeMeta is shared by all top level objects. The proper way to use it is to inline it in your type,
 * like this:
 *
 * 	type MyAwesomeAPIObject struct {
 * 	     runtime.TypeMeta    `json:",inline"`
 * 	     ... // other fields
 * 	}
 *
 * func (obj *MyAwesomeAPIObject) SetGroupVersionKind(gvk *metav1.GroupVersionKind) { metav1.UpdateTypeMeta(obj,gvk) }; GroupVersionKind() *GroupVersionKind
 *
 * TypeMeta is provided here for convenience. You may use it directly from this package or define
 * your own with the same fields.
 *
 * +k8s:deepcopy-gen=false
 * +protobuf=true
 * +k8s:openapi-gen=true
 *
 * @generated from message k8s.io.apimachinery.pkg.runtime.TypeMeta
 */
export class TypeMeta extends Message<TypeMeta> {
  /**
   * +optional
   *
   * @generated from field: optional string apiVersion = 1;
   */
  apiVersion?: string;

  /**
   * +optional
   *
   * @generated from field: optional string kind = 2;
   */
  kind?: string;

  constructor(data?: PartialMessage<TypeMeta>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "k8s.io.apimachinery.pkg.runtime.TypeMeta";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "apiVersion", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "kind", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TypeMeta {
    return new TypeMeta().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TypeMeta {
    return new TypeMeta().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TypeMeta {
    return new TypeMeta().fromJsonString(jsonString, options);
  }

  static equals(a: TypeMeta | PlainMessage<TypeMeta> | undefined, b: TypeMeta | PlainMessage<TypeMeta> | undefined): boolean {
    return proto2.util.equals(TypeMeta, a, b);
  }
}

/**
 * Unknown allows api objects with unknown types to be passed-through. This can be used
 * to deal with the API objects from a plug-in. Unknown objects still have functioning
 * TypeMeta features-- kind, version, etc.
 * TODO: Make this object have easy access to field based accessors and settors for
 * metadata and field mutatation.
 *
 * +k8s:deepcopy-gen=true
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 * +protobuf=true
 * +k8s:openapi-gen=true
 *
 * @generated from message k8s.io.apimachinery.pkg.runtime.Unknown
 */
export class Unknown extends Message<Unknown> {
  /**
   * @generated from field: optional k8s.io.apimachinery.pkg.runtime.TypeMeta typeMeta = 1;
   */
  typeMeta?: TypeMeta;

  /**
   * Raw will hold the complete serialized object which couldn't be matched
   * with a registered type. Most likely, nothing should be done with this
   * except for passing it through the system.
   *
   * @generated from field: optional bytes raw = 2;
   */
  raw?: Uint8Array;

  /**
   * ContentEncoding is encoding used to encode 'Raw' data.
   * Unspecified means no encoding.
   *
   * @generated from field: optional string contentEncoding = 3;
   */
  contentEncoding?: string;

  /**
   * ContentType  is serialization method used to serialize 'Raw'.
   * Unspecified means ContentTypeJSON.
   *
   * @generated from field: optional string contentType = 4;
   */
  contentType?: string;

  constructor(data?: PartialMessage<Unknown>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "k8s.io.apimachinery.pkg.runtime.Unknown";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "typeMeta", kind: "message", T: TypeMeta, opt: true },
    { no: 2, name: "raw", kind: "scalar", T: 12 /* ScalarType.BYTES */, opt: true },
    { no: 3, name: "contentEncoding", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "contentType", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Unknown {
    return new Unknown().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Unknown {
    return new Unknown().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Unknown {
    return new Unknown().fromJsonString(jsonString, options);
  }

  static equals(a: Unknown | PlainMessage<Unknown> | undefined, b: Unknown | PlainMessage<Unknown> | undefined): boolean {
    return proto2.util.equals(Unknown, a, b);
  }
}

