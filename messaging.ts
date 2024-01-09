import { defineExtensionMessaging } from "@webext-core/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
interface ProtocolMap {
  getStringLength(data: string): number;
  getCitationInfo(): CitationInfo;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
