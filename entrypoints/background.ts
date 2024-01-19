import waitForTabComplete from "@/utils/tabUtils";

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
      console.log("Tab updated", tabId, changeInfo, tab);
      await waitForTabComplete(tabId);
      var res = await sendMessage("addCitationButtonToPage", undefined, tabId);
      await sendMessage("addTitleButtonToPage", undefined, tabId);
      console.log("addCitationButtonToPage result", res);
    }
  });
});
