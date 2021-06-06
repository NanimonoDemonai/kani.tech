import {
  allowAttributesList,
  allowProtocol,
  checkProtocolAttributeList,
} from "../../../constants/allowTagList";
import { AttributeValue } from "../types";

/**
 * 属性の型が実行可能か検証する
 * @return falseならば実行可能ではない
 */
export const isAttributeValueInvalid = (
  attributeValue: AttributeValue
): boolean => {
  return !!(
    attributeValue &&
    typeof attributeValue !== "string" &&
    attributeValue.type === "mdxJsxAttributeValueExpression"
  );
};

/**
 * ノードに付与されている属性が許可されている属性か検証する
 */
export const isAttributeNameInvalid = (props: {
  attributeName: string;
  nodeName: string;
}): boolean => {
  const { nodeName, attributeName } = props;
  const currentAllowAttributes = allowAttributesList[nodeName] || [];
  const allowAttributes = [
    ...allowAttributesList["*"],
    ...currentAllowAttributes,
  ];
  return !allowAttributes.includes(attributeName);
};

/**
 * ノードに付与されている属性のプロトコルが許可されているか検証する
 */
export const isAttributeProtocolInvalid = (props: {
  attributeValue: string | unknown;
  attributeName: string;
}): boolean => {
  const { attributeName, attributeValue } = props;
  const mustProtocolCheck = checkProtocolAttributeList.includes(attributeName);
  if (mustProtocolCheck) {
    try {
      if (typeof attributeValue !== "string") return true;
      const url = new URL(attributeValue);
      if (!allowProtocol.includes(url.protocol)) return true;
    } catch (e) {
      return true;
    }
  }
  return false;
};
