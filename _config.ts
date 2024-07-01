import lume from "lume/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import decapCMS from "lume/plugins/decap_cms.ts";
import date from "lume/plugins/date.ts";
import { enUS } from "npm:date-fns/locale/en-US";
import { ja } from "npm:date-fns/locale/ja";
import filterPages from "lume/plugins/filter_pages.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import transformImages from "lume/plugins/transform_images.ts";
import picture from "lume/plugins/picture.ts";
import pagefind from "lume/plugins/pagefind.ts";
import { getGitDate } from "lume/core/utils/date.ts";
import sourceMaps from "lume/plugins/source_maps.ts";

import cache_busting from "https://raw.githubusercontent.com/lumeland/experimental-plugins/c8778bfbf480f57a2357ab94bc22290b8bf11d12/cache_busting/mod.ts";

// import en from "npm:date-fns@2.30.0/locale/en-US/index.js";
// import ja from "npm:date-fns@2.30.0/locale/ja/index.js";
// import en from "npm:date-fns@3.2.0/locale/en-US/index.js";
// import ja from "npm:date-fns@3.2.0/locale/ja/index.js";

// Change markdown-it configuration
// const markdown = {
//   options: {
//     breaks: false,
//     xhtmlOut: true,
//   },
// };

const site = lume(
  {
    src: "src",
    location: new URL("https://japanactivationcapital.com"),
  },
);

site.use(date({
  locales: { enUS, ja },
}));

site.use(multilanguage({
  languages: ["en", "ja"],
  defaultLanguage: "ja",
}));

site.use(picture());
site.use(transformImages({
  cache: true, // Toggle cache
  matches: /\.(jpg|jpeg|png|webp)$/i  // This regex matches only image files
}));
site.use(pagefind());

site.use(favicon());

site.use(lightningcss());
site.use(metas());
site.use(filterPages({
  fn: (page) => !page.data.external_link,
}));

// Use the source maps plugin to generate the .map files
site.use(sourceMaps());

site.use(cache_busting());

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const src = page.src.entry?.src;

    if (src) {
      page.data.lastmod = getGitDate("modified", src);
    }
  }
});

site.use(sitemap({
  query: "external_link=undefined",
  lastmod: "lastmod",
  priority: "priority",
  filename: "sitemap.xml",
  sort: "lastmod=desc",
}));

// site.loadPages([".tmpl.js"]);

site.use(decapCMS({
  identity: "netlify",
  path: "/6E77746E/",
}));

site.copy("assets");
// site.copy([".pdf"], (file) => "pdf" + file);
site.copy([".pdf"]);
site.copy("humans.txt");
site.copy("robots.txt");
site.copy("3d5f05c39f2742c38468b4f72fb80879.txt");
site.copy("_redirects");
site.copy("favicon.svg");
site.copy("brb.html");

// Create zip and tree scripts
site.script("zipsite", "zip -r _site/jac_site.zip _site");
site.script(
  "maketree",
  "cd _site && tree -H . -L 5 --charset utf-8 -C -h -o jac_tree.html",
);
// Execute scripts after build
site.addEventListener("afterBuild", "zipsite");
site.addEventListener("afterBuild", "maketree");

export default site;
