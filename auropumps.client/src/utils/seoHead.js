const upsertHeadTag = (selector, tagName, attrs) => {
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement(tagName);
        document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
};

export const applySeo = ({ title, description, keywords, canonical }) => {
    if (title) {
        document.title = title;
        upsertHeadTag('meta[property="og:title"]', "meta", { property: "og:title", content: title });
        upsertHeadTag('meta[name="twitter:title"]', "meta", { name: "twitter:title", content: title });
    }
    if (description) {
        upsertHeadTag('meta[name="description"]', "meta", { name: "description", content: description });
        upsertHeadTag('meta[property="og:description"]', "meta", { property: "og:description", content: description });
        upsertHeadTag('meta[name="twitter:description"]', "meta", { name: "twitter:description", content: description });
    }
    if (keywords) {
        upsertHeadTag('meta[name="keywords"]', "meta", { name: "keywords", content: keywords });
    }
    if (canonical) {
        upsertHeadTag('link[rel="canonical"]', "link", { rel: "canonical", href: canonical });
        upsertHeadTag('meta[property="og:url"]', "meta", { property: "og:url", content: canonical });
    }
};