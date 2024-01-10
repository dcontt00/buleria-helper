import { defineExtensionMessaging } from "@webext-core/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
interface ProtocolMap {
  getStringLength(data: string): number;
  getCitationInfo(): CitationInfo;
  pasteCitation(citation: string): boolean;
  pasteKeyword(keyword: string): boolean;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
