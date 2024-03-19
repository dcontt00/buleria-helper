import waitForTabComplete from "@/utils/tabUtils";

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
      await waitForTabComplete(tabId);
      await sendMessage("addCitationButtonToPage", undefined, tabId);
      await sendMessage("addTitleButtonToPage", undefined, tabId);
      await sendMessage("addSherpaRomeoButtonToPage", undefined, tabId);
      await sendMessage("addSearchDoiButtonToPage", undefined, tabId);
    }
  });
});
