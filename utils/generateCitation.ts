import CitationInfo from "@/interfaces/CitationInfo";

/**
 * Generates an APA citation based on the information provided by the user.
 */
export default function generateCitation(citationInfo: CitationInfo): string {
  var citation = `${citationInfo.authors} (${citationInfo.date}). ${citationInfo.title}. ${citationInfo.journal}`;
  if (citationInfo.volume) {
    citation += `, ${citationInfo.volume}`;
  }
  if (citationInfo.startPage && citationInfo.endPage) {
    citation += `, ${citationInfo.startPage}-${citationInfo.endPage}`;
  }
  if (citationInfo.doi) {
    citation += `, ${citationInfo.doi}`;
  }

  return citation;
}
