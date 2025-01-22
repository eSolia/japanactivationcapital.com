import lume from "lume/mod.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import decapCMS from "lume/plugins/decap_cms.ts";
import date from "lume/plugins/date.ts";
import { enUS } from "npm:date-fns/locale/en-US";
import { ja } from "npm:date-fns/locale/ja";
import filterPages from "lume/plugins/filter_pages.ts";
import sass from "lume/plugins/sass.ts";
import purgecss from "lume/plugins/purgecss.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import transformImages from "lume/plugins/transform_images.ts";
import picture from "lume/plugins/picture.ts";
import pagefind from "lume/plugins/pagefind.ts";
import { getGitDate } from "lume/core/utils/date.ts";
import sourceMaps from "lume/plugins/source_maps.ts";
import svgo from "lume/plugins/svgo.ts";
import brotli from "lume/plugins/brotli.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import robots from "lume/plugins/robots.ts";
// import checkUrls from "lume/plugins/check_urls.ts";
// import sri from "lume/plugins/sri.ts";

// import cache_busting from "https://raw.githubusercontent.com/lumeland/experimental-plugins/c8778bfbf480f57a2357ab94bc22290b8bf11d12/cache_busting/mod.ts";

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

site.use(googleFonts({
  subsets: ["latin", "latin-ext","[2]","[3]","[4]","[5]","[6]","[7]","[8]","[9]","[10]","[11]","[12]","[13]","[14]","[15]","[16]","[17]","[18]","[19]","[20]","[21]","[22]","[23]","[24]","[25]","[26]","[27]","[28]","[29]","[30]","[31]","[32]","[33]","[34]","[35]","[36]","[37]","[38]","[39]","[40]","[41]","[42]","[43]","[44]","[45]","[46]","[47]","[48]","[49]","[50]","[51]","[52]","[53]","[54]","[55]","[56]","[57]","[58]","[59]","[60]","[61]","[62]","[63]","[64]","[65]","[66]","[67]","[68]","[69]","[70]","[71]","[72]","[73]","[74]","[75]","[76]","[77]","[78]","[79]","[80]","[81]","[82]","[83]","[84]","[85]","[86]","[87]","[88]","[89]","[90]","[91]","[92]","[93]","[94]","[95]","[96]","[97]","[98]","[99]","[100]","[101]","[102]","[103]","[104]","[105]","[106]","[107]","[108]","[109]","[110]","[111]","[112]","[113]","[114]","[115]","[116]","[117]","[118]","[119]"],
  cssFile: "css/styles.scss",
  placeholder: "/* lume-google-fonts-here */",
  fonts: {
    display:
      "https://fonts.google.com/share?selection.family=Josefin+Sans:ital,wght@0,100..700;1,100..700",
    text:
      "https://fonts.google.com/share?selection.family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap",
  },
}));

site.use(date({
  locales: { enUS, ja },
  formats: {
    "USDATE": "MM-dd-yyyy",
    "JPDATE": "yyyy-MM-dd",
  },
}));

site.use(multilanguage({
  languages: ["en", "ja"],
  defaultLanguage: "ja",
}));

site.use(picture());
site.use(transformImages({
  cache: true, // Toggle cache
}));
site.use(pagefind());

site.use(favicon());
site.use(sass());
site.use(purgecss());
site.use(lightningcss());
site.use(metas());
site.use(filterPages({
  fn: (page) => !page.data.external_link,
}));

// Use the source maps plugin to generate the .map files
site.use(sourceMaps());
// site.use(checkUrls({
//   external: true,
//   output: "jac_broken_links.json",
// }));
// site.use(cache_busting());

// site.use(sri());
site.use(svgo(/* Options */));
site.use(brotli());

site.use(minifyHTML({
  extensions: [".html"],
  options: {
    keep_spaces_between_attributes: true,
    do_not_minify_doctype: true,
    keep_closing_tags: true,
    keep_html_and_head_opening_tags: true,
  },
}));
// Give access only to Google and Bing
site.use(robots({
  allow: [
    "Googlebot",
    "Feedfetcher-Google",
    "Google Favicon",
    "Googlebot-Image",
    "Googlebot-Mobile",
    "Googlebot-News",
    "Googlebot-Video",
    "GoogleOther",
    "Bingbot",
    "msnbot",
    "msnbot-media",
    "Yandex",
    "YandexBot",
    "YandexImages",
    "DuckDuckBot",
    "DuckDuckGo-Favicons-Bot",
    "Yahoo! Slurp",
    "archive.org_bot",
    "heritrix",
    "Arquivo-web-crawler",
    "ia-archiver",
    "ia_archiver-web.archive.org",
    "Nicecrawler",
  ],
  disallow: [
    "CCBot",
    "ChatGPT-User",
    "GPTBot",
    "DuckAssistBot",
    "Google-Extended",
    "AdsBot-Google",
    "AdsBot-Google-Mobile",
    "anthropic-ai",
    "cohere-ai",
    "omgilibot",
    "omgili",
    "FacebookBot",
    "Meta-ExternalFetcher",
    "Meta-ExternalAgent",
    "AI2Bot",
    "Baiduspider",
    "Baiduspider-image",
    "Bytespider",
    "Diffbot",
    "Kangaroo Bot",
    "Timpibot",
    "Webzio-Extended",
    "Amazonbot",
    "Applebot",
    "OAI-SearchBot",
    "PerplexityBot",
    "YouBot",
    "008",
    "Dataprovider.com",
    "dcrawl",
    "HTTrack",
    "HTTrack 3.0",
    "MetaInspector",
    "newspaper",
    "Nutch",
    "Offline Explorer",
    "OpenindexSpider",
    "Scrapy",
    "SeznamBot",
    "Sogou web spider",
  ],
  rules: [
    {
      userAgent: "*",
      disallow: "/6e77746e/",
    },
    {
      userAgent: "*",
      disallow: "jac_index.html",
    },
    {
      userAgent: "*",
      disallow: "jac_tree.html",
    },
    {
      userAgent: "*",
      disallow: "jump2jac.html",
    },
    {
      userAgent: "*",
      disallow: "jac_site.zip",
    },
  ],
}));

site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const src = page.src.entry?.src;

    if (src) {
      page.data.lastmod = getGitDate("modified", src);
    }
  }
});

// site.process([".html"], (page) => {
//   page.content = page.content.replace('defer=""', 'defer');
// });

// site.process([".html"], (pages) => {
//   for (const page of pages) {
//     page.content = page.content.replaceAll(/[“”]/g, '"').replaceAll(/[‘’]/g, "'");
//   }
// });

// site.process([".html"], (pages) => pages.forEach((page) => {
//   page.content = page.content.replace('defer=""', 'defer');
// }));

// site.process(['.html'], (pages) => pages.forEach(page => {
//   if (page.data.doctype === false) {
//     page.content = page.content.replace('<!DOCTYPE html>\n', '')
//   }
// }))

site.use(sitemap({
  query: "external_link=undefined",
  lastmod: "lastmod",
  priority: "priority",
  filename: "sitemap.xml",
  sort: "lastmod=desc",
}));

site.loadPages([".tmpl.js"]);

site.use(decapCMS({
  identity: "netlify",
  path: "/6E77746E/",
}));

site.copy("assets/img");
site.loadAssets([".js"]);
//site.copy("media");
// site.copy([".pdf"], (file) => "pdf" + file);
site.copy([".pdf"]);
site.copy("humans.txt");
site.copy("3d5f05c39f2742c38468b4f72fb80879.txt");
site.copy("_redirects");
site.copy("favicon.svg");
site.copy("brb.html");

site.copyRemainingFiles();

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
