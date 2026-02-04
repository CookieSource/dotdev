let intersectionObserver;
let resizeObserver;

const tags = ["h2", "h3", "h4", "h5"];
const tagClasses = tags.map((tag) => `sl-heading-wrapper level-${tag}`);

function findPreviousSibling(el) {
  const result = [];
  let current = el;

  while (current) {
    const tagName = current.tagName?.toLowerCase();
    if (tagName && tags.includes(tagName)) result.push(current);
    if (tagClasses.includes(current.className)) result.push(current.firstChild);
    if (current.previousElementSibling == null) break;
    current = current.previousElementSibling;
    const currentTag = current.tagName?.toLowerCase();
    if (
      result.length > 0 &&
      !(
        (currentTag && tags.includes(currentTag)) ||
        tagClasses.includes(current.className)
      )
    ) {
      break;
    }
  }

  return result;
}

function setupToc() {
  if (intersectionObserver) intersectionObserver.disconnect();
  if (resizeObserver) resizeObserver.disconnect();

  const nav = document.querySelector("nav.toc-new");
  if (!nav) return;

  const linkStarts = new WeakMap();
  const linkEnds = new WeakMap();
  const sectionsMap = new Map();

  function drawPath() {
    const path = nav.querySelector("path.toc-marker");
    const links = Array.from(nav.querySelectorAll("a"));
    if (!links.length || !path) return;

    let pathData = [];
    let left = 0;

    links.forEach((link, index) => {
      const x = link.offsetLeft;
      const y = link.offsetTop;
      const height = link.offsetHeight;

      if (index === 0) {
        linkStarts.set(link, 0);
        pathData.push("M", x, y, "L", x, y + height);
      } else {
        if (left !== x) pathData.push("L", left, y);
        pathData.push("L", x, y);
        path.setAttribute("d", pathData.join(" "));
        linkStarts.set(link, path.getTotalLength());
        pathData.push("L", x, y + height);
      }

      left = x;
      path.setAttribute("d", pathData.join(" "));
      linkEnds.set(link, path.getTotalLength());
    });
  }

  function updatePath() {
    const path = nav.querySelector("path.toc-marker");
    if (!path) return;

    const pathLength = path.getTotalLength();
    const activeLinks = nav.querySelectorAll("a.active");
    if (!activeLinks.length) {
      path.style.display = "none";
      return;
    }

    let linkStart = pathLength;
    let linkEnd = 0;

    activeLinks.forEach((link) => {
      linkStart = Math.min(linkStart, linkStarts.get(link));
      linkEnd = Math.max(linkEnd, linkEnds.get(link));
    });

    path.style.display = "inline";
    path.setAttribute(
      "stroke-dasharray",
      `1 ${linkStart} ${linkEnd - linkStart} ${pathLength}`
    );
  }

  intersectionObserver = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      const ids =
        sectionsMap.get(section.target)?.ids ||
        findPreviousSibling(section.target).map((h) => h.getAttribute("id"));
      sectionsMap.set(section.target, {
        ids,
        intersectionRatio: section.intersectionRatio,
      });
    });

    const idMap = {};
    [...sectionsMap.values()].forEach(({ ids, intersectionRatio }) => {
      ids.forEach((id) => {
        if (!id) return;
        idMap[id] = (idMap[id] || 0) + intersectionRatio;
      });
    });

    Object.entries(idMap).forEach(([id, intersectionRatio]) => {
      const link = nav.querySelector(`li a[href="#${id}"]`);
      if (!link) return;
      const isActive = intersectionRatio > 0;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    updatePath();
  });

  document
    .querySelectorAll(".sl-markdown-content > :not(h2, h3, h4, h5)")
    .forEach((section) => {
      intersectionObserver.observe(section);
    });

  resizeObserver = new ResizeObserver(() => {
    drawPath();
    updatePath();
  });
  resizeObserver.observe(nav);

  drawPath();
  updatePath();
}

document.addEventListener("DOMContentLoaded", setupToc);
document.addEventListener("astro:page-load", setupToc);
