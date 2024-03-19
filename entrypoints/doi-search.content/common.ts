import DoiInfo from "@/classes/DoiInfo";
import { Author } from "@/types";
import axios, { AxiosError } from "axios";
export default async function getDoiInfo(
  doi: string
): Promise<DoiInfo | undefined> {
  var result = await axios
    .get(`http://dx.doi.org/${doi}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      const data = response.data;
      var date = `${data["issued"]["date-parts"][0][0]}`;
      if (data["issued"]["date-parts"][0][1] != undefined) {
        date += `-${data["issued"]["date-parts"][0][1]}`;
      }
      if (data["issued"]["date-parts"][0][2] != undefined) {
        date += `-${data["issued"]["date-parts"][0][2]}`;
      }

      var authors: Author[] = data.author.map((author: any) => {
        return { name: author.given, surname: author.family };
      });

      var documentt = new DoiInfo(
        data.title,
        data.type,
        data["container-title"],
        authors,
        data.ISSN,
        data.DOI,
        date,
        data.volume,
        data.number,
        data.publisher
      );
      return documentt;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return undefined;
    });
  return result;
}
