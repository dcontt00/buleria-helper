type PublisherPolicy = {
  id: number;
  articleVersion: string;
  conditions: string[];
  license: string;
  embargo: string | undefined;
  locations: string[];
  copyrightOwner: string | undefined;
  publisherDeposit: { url: string; name: string } | undefined;
};

export default PublisherPolicy;
