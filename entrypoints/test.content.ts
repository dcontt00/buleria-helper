import { defineContentScript } from "wxt/sandbox";
export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*"],
  runAt: "document_start",

  main: () => {
    let buttons = document.getElementsByClassName("list-group-item ds-option");
    let button = Array.from(buttons).find((button) =>
      button.getAttribute("href")?.includes("/community-list")
    ) as HTMLAnchorElement;

    if (button) {
      button.click();
    }
    console.log("test");
  },
});
