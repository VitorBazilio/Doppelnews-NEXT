const BLOCKED_HTML_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "svg",
  "math",
] as const;

const ALLOWED_HTML_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "em",
  "h2",
  "h3",
  "i",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "strong",
  "u",
  "ul",
]);

const SAFE_URL_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];
const HTML_PLACEHOLDER = "\uE000";

type TextOptions = {
  maxLength?: number;
};

export function sanitizePlainText(value: string, options: TextOptions = {}) {
  const normalized = value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!options.maxLength) {
    return normalized;
  }

  return normalized.slice(0, options.maxLength).trim();
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isSafeHref(value: string) {
  try {
    const url = new URL(value, "https://doppelnews.local");
    return SAFE_URL_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

function sanitizeAnchorAttributes(attributes: string) {
  const hrefMatch = attributes.match(/\shref\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const href = hrefMatch?.[2] ?? hrefMatch?.[3] ?? hrefMatch?.[4] ?? "";

  if (!href || !isSafeHref(href)) {
    return "";
  }

  const safeHref = href.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return ` href="${safeHref}" rel="noopener noreferrer"`;
}

export function sanitizeHtmlContent(value: string) {
  const safeTags: string[] = [];
  const withoutBlockedTags = BLOCKED_HTML_TAGS.reduce((content, tag) => {
    return content.replace(
      new RegExp(`<\\s*${tag}[^>]*>[\\s\\S]*?<\\s*\\/\\s*${tag}\\s*>`, "gi"),
      "",
    );
  }, value);

  return withoutBlockedTags
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?([a-z][a-z0-9]*)([^>]*)>/gi, (tag, rawName, attributes) => {
      const name = String(rawName).toLowerCase();
      const isClosingTag = tag.startsWith("</");

      if (!ALLOWED_HTML_TAGS.has(name)) {
        return "";
      }

      if (isClosingTag) {
        if (name === "br") {
          return "";
        }

        safeTags.push(`</${name}>`);
        return `${HTML_PLACEHOLDER}${safeTags.length - 1}${HTML_PLACEHOLDER}`;
      }

      if (name === "a") {
        safeTags.push(`<a${sanitizeAnchorAttributes(String(attributes))}>`);
        return `${HTML_PLACEHOLDER}${safeTags.length - 1}${HTML_PLACEHOLDER}`;
      }

      safeTags.push(name === "br" ? "<br>" : `<${name}>`);
      return `${HTML_PLACEHOLDER}${safeTags.length - 1}${HTML_PLACEHOLDER}`;
    })
    .replace(/\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]*)/gi, "")
    .replace(/\sjavascript\s*:/gi, "")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      new RegExp(`${HTML_PLACEHOLDER}(\\d+)${HTML_PLACEHOLDER}`, "g"),
      (_match, index) => safeTags[Number(index)] ?? "",
    );
}
