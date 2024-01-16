import { defineExtensionMessaging } from "@webext-core/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { Author } from "./types";
interface ProtocolMap {
  getStringLength(data: string): number;
  getCitationInfo(): CitationInfo | undefined;
  pasteCitation(citation: string): boolean;
  pasteKeyword(keyword: string): boolean;
  pasteAuthors(authors: Author[]): boolean;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
