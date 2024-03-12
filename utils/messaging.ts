import { defineExtensionMessaging } from "@webext-core/messaging";
import { Author, DocumentType } from "../types";
interface ProtocolMap {
  getStringLength(data: string): number;
  getCitation(documentType: DocumentType): string;
  pasteCitation(citation: string): boolean;
  getKeywords(): string | null | undefined;
  pasteKeyword(keyword: string): boolean;
  pasteAuthor(author: Author): boolean;
  addCitationButtonToPage(): boolean;
  addTitleButtonToPage(): boolean;
  addSherpaRomeoButtonToPage(): boolean;
  removeAuthors(): boolean;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
