import { getCollection } from "astro:content";
import { OGImageRoute, type RGBColor } from "astro-og-canvas";

const entries = await getCollection("docs");
const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

const DEFAULT_GRADIENT: RGBColor[] = [
  [30, 25, 44],
  [112, 64, 173],
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function hslToRgb(h: number, s: number, l: number): RGBColor {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) =>
    light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function colorFromTag(tag: string, hueOffset = 0): RGBColor {
  const hash = hashString(tag);
  const hue = (hash + hueOffset) % 360;
  return hslToRgb(hue, 62, 45);
}

function gradientFromTags(tags: string[]): RGBColor[] {
  if (!tags.length) return DEFAULT_GRADIENT;
  const sorted = tags
    .map((tag) => tag.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  if (!sorted.length) return DEFAULT_GRADIENT;

  const primary = colorFromTag(sorted[0]);
  const secondary = sorted[1]
    ? colorFromTag(sorted[1])
    : colorFromTag(sorted[0], 140);

  return [primary, secondary];
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: "slug",
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    const tags = Array.isArray(page.data.tags) ? page.data.tags : [];
    const description = [
      page.data.description,
      tags.length ? tags.map((tag) => `#${tag}`).join(" · ") : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    return {
      title: page.data.title,
      description,
      bgGradient: gradientFromTags(tags),
      logo: {
        path: "./src/images/logo.png",
        size: [120],
      },
      padding: 110,
    };
  },
});
