import { PublisherPolicy } from "@/types";
import axios from "axios";

export default async function getPublisherPolicies(
  issn: string
): Promise<PublisherPolicy[]> {
  var result = await axios
    .get("https://v2.sherpa.ac.uk/cgi/retrieve", {
      params: {
        "item-type": "publication",

        format: "Json",
        limit: 10,
        offset: 0,
        order: "-id",
        filter: JSON.stringify([["issn", "equals", issn]]),
        "api-key": import.meta.env.VITE_SHERPA_ROMEO_API_KEY,
      },
      headers: {
        Accept: "*",
      },
    })
    .then((response) => {
      var publisherPolicies: PublisherPolicy[] = [];
      var publisherName =
        response.data.items[0].publishers[0].publisher.name[0].name;
      const url = response.data.items[0].system_metadata.uri;
      for (const PublisherPolicy of response.data.items[0].publisher_policy) {
        for (const PermittedOA of PublisherPolicy.permitted_oa) {
          try {
            var license = undefined;
            var embargo = undefined;
            var oaFee = false;

            if (PermittedOA.additional_oa_fee == "yes") {
              oaFee = true;
            }

            var id = PermittedOA.id;
            if (PermittedOA.article_version_phrases == undefined) {
              continue;
            }
            var articleVersion = PermittedOA.article_version_phrases[0].phrase;
            var conditions = PermittedOA.conditions;
            if (PermittedOA.license) {
              license = PermittedOA.license[0].license_phrases[0].phrase;
            }

            if (PermittedOA.embargo) {
              embargo =
                PermittedOA.embargo.amount + " " + PermittedOA.embargo.units;
            } else {
              embargo = "No embargo";
            }

            var locations: string[] = [];
            for (const Location of PermittedOA.location.location_phrases) {
              var phrase: string = Location.phrase;
              locations.push(phrase);
            }

            var copyrightOwner;
            if (PermittedOA.copyright_owner_phrases) {
              copyrightOwner = PermittedOA.copyright_owner_phrases[0].phrase;
            }

            var publiserDeposit = undefined;
            var publisherDepositURL, publisherDepositName;
            if (PermittedOA.publisher_deposit) {
              publisherDepositURL =
                PermittedOA.publisher_deposit[0].repository_metadata.url;
              publisherDepositName =
                PermittedOA.publisher_deposit[0].repository_metadata.name[0]
                  .name;
              publiserDeposit = {
                url: publisherDepositURL,
                name: publisherDepositName,
              };
            }

            var publisherPolicy: PublisherPolicy = {
              id: id,
              publisherName: publisherName,
              oafee: oaFee,
              articleVersion: articleVersion,
              conditions: conditions,
              license: license,
              embargo: embargo,
              locations: locations,
              copyrightOwner: copyrightOwner,
              publisherDeposit: publiserDeposit,
              url: url,
            };

            publisherPolicies.push(publisherPolicy);
          } catch (error) {
            console.log(error);
          }
        }
      }
      return publisherPolicies;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  return result;
}
