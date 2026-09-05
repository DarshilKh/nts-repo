/**
 * Renders a JSON-LD <script> tag from a plain object. Centralized so every
 * structured-data block on the site is serialized the same safe way
 * (JSON.stringify handles escaping; no risk of breaking out of the script
 * tag since none of our data contains user input).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
