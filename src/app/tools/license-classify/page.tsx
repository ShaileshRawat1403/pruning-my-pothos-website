import { redirect } from "next/navigation";

// Retired: License Classifier overlapped too closely with GitHub's own
// licensee to earn its own card. Redirects rather than 404s in case anyone
// bookmarked it.
export default function LicenseClassifyPage() {
  redirect("/tools");
}
