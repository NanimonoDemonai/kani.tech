import { Attribute } from "../types";
import {
  isAttributeNameInvalid,
  isAttributeProtocolInvalid,
  isAttributeValueInvalid,
} from "./validators";

/**
 * ノードに付与されている属性が妥当か検証する
 * @param nodeName ノード名 i.e. div p
 */
export const isAttributeInvalid: (
  nodeName: string
) => (attribute: Attribute) => boolean = (nodeName) => (attribute) => {
  const attributeValue = attribute.value;
  const attributeName = attribute.name;

  if (attributeValue && isAttributeValueInvalid(attributeValue)) return true;

  if (typeof attributeName === "string") {
    if (
      isAttributeNameInvalid({ attributeName, nodeName }) ||
      isAttributeProtocolInvalid({ attributeName, attributeValue })
    )
      return true;
  }
  return false;
};
