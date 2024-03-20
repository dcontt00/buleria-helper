import waitForTabComplete from "@/utils/tabUtils";

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
      await waitForTabComplete(tabId);
      try {
        await sendMessage("searchIssnPortal", undefined, tabId);
      } catch (error) {
        console.error(error);
      }
      try {
        await sendMessage("addCitationButtonToPage", undefined, tabId);
      } catch (error) {
        console.error(error);
      }
      try {
        await sendMessage("addTitleButtonToPage", undefined, tabId);
      } catch (error) {
        console.error(error);
      }
      try {
        await sendMessage("addSherpaRomeoButtonToBuleria", undefined, tabId);
      } catch (error) {
        console.error(error);
      }
      try {
        await sendMessage("addSearchDoiButtonToPage", undefined, tabId);
      } catch (error) {
        console.error(error);
      }
    }
  });
});
