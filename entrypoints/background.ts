export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
      console.log("Tab updated", tabId, changeInfo, tab);
      sendMessage("test", undefined, tabId);
    }
  });
});
