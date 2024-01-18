import { defineExtensionMessaging } from "@webext-core/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { Author } from "../types";
interface ProtocolMap {
  getStringLength(data: string): number;
  getCitationInfo(): CitationInfo | undefined;
  pasteCitation(citation: string): boolean;
  getKeywords(): string | null | undefined;
  pasteKeyword(keyword: string): boolean;
  pasteAuthor(author: Author): boolean;
  test(): boolean;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
