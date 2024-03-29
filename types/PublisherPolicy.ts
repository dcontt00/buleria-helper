type PublisherPolicy = {
  id: number;
  publisherName: string;
  articleVersion: string;
  conditions: string[];
  license: string;
  embargo: string | undefined;
  locations: string[];
  copyrightOwner: string | undefined;
  publisherDeposit: { url: string; name: string } | undefined;
  oafee: boolean;
  url: string;
};

export default PublisherPolicy;
