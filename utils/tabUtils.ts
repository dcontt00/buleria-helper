export default async function waitForTabComplete(tabId: number) {
  return new Promise((resolve) => {
    const checkTabStatus = async () => {
      const tab = await browser.tabs.get(tabId);
      if (tab.status === "complete") {
        resolve(true);
        console.log("done");
      } else {
        console.log("waiting");
        setTimeout(checkTabStatus, 100); // Check every 100ms
      }
    };
    checkTabStatus();
  });
}
