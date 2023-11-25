import { useState } from "react";

interface UseGitHubLinkValidation {
  repo: string;
  validLink: boolean;
  handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useGitHubLinkValidation = (
  initialRepo: string
): UseGitHubLinkValidation => {
  const [repo, setRepo] = useState(initialRepo);
  const [validLink, setValidLink] = useState(true);

  const validateGitHubLink = (text: string): boolean => {
    const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
    return regex.test(text);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setRepo(newLink);
    setValidLink(validateGitHubLink(newLink));
  };

  return { repo, validLink, handleLinkChange };
};
