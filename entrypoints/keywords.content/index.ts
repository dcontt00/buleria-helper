import { defineContentScript } from "wxt/sandbox";
import { onMessage } from "@/utils/messaging";
import { getKeywords, pasteKeyword } from "./common";
export default defineContentScript({
  matches: ["https://buleria.unileon.es/*"],
  runAt: "document_end",
  main: () => {
    onMessage("pasteKeyword", (keyword) => {
      return pasteKeyword(keyword.data);
    });
    onMessage("getKeywords", (message) => {
      return getKeywords();
    });
  },
});
