import { defineContentScript } from "wxt/sandbox";
export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*"],
  runAt: undefined,

  main: () => {
    console.log("main");
    browser.runtime.onMessage.addListener((message) => {
      console.log("message", message);
      if (message.command === "apa") {
        var citation;
        let title = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_title"
        ) as HTMLInputElement;

        let alttitle = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_title_alternative"
        ) as HTMLInputElement;

        alttitle && (alttitle.value = title.value);

        var authors: string[] = [];
        let authorsCheckboxes = document.querySelectorAll(
          "[name='dc_contributor_author_selected']"
        );

        authorsCheckboxes.forEach((checkbox) => {
          var parent = checkbox.parentElement;
          var author: HTMLCollectionOf<HTMLSpanElement> | undefined =
            parent?.getElementsByTagName("span");
          author && authors.push(author[0].innerText);
        });

        alert("title: " + title.value + "\nauthors: " + authors.join("; "));
      }
    });
  },
});
