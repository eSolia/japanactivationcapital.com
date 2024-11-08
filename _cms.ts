import lumeCMS from "lume/cms/mod.ts";

const username = Deno.env.get("USERNAME1")!;
const password = Deno.env.get("PASSWORD1")!;

const cms = lumeCMS({
  site: {
    name: "JAC Website CMS",
    description: "Edit the content of the JAC site.",
    url: "https://japanactivationcapital.com",
    body: `
    <p>This is the CMS for a the JAC site, including sections for uploading media, editing news and team bio pages.</p>
    `,
  },
  auth: {
    method: "basic",
    users: {
      // foo: "bar",
      [username]: password,
    },
  },
  log: {
    filename: "cms_errors.log",
  },
});

// Storage is local, so no need to specify?

// Configure an upload folder
cms.upload("media", "media");

// News pages collection
cms.collection(
  "news",
  "news/*.md",
  [
    {
      name: "title",
      type: "text",
      label: "News Item Title",
      description: "As the news page’s metadata title, enter the title of the news item, in the same language as the content. Careful, this becomes the URL slug and filename, so get it right the first time, and it’s recommended to keep the length under 70 Japanese characters.",
      attributes: {
        required: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "News Item Description",
      description: "As the news page’s metadata description, enter a short description for the news post in the same language as the content, to be used by search engines and social media.",
      attributes: {
        required: true,
      },
    },
    {
      name: "lang",
      type: "select",
      label: "Language",
      description: "Language of the news item.",
      options: [
        {
          label: "日本語",
          value: "ja",
        },
        {
          label: "English",
          value: "en",
        },
      ],
      attributes: {
        required: true,
      },
    },
    {
      name: "id",
      type: "text",
      label: "ID to group Language Pairs",
      description: "This links the languages of a news item, so use e.g. 20231215A for both Japanese and English, then 20231215B, ...C, etc, for subsequent news items on that day.",
    },
    {
      name: "tags",
      type: "list",
      label: "Tags",
      description: "Enter the tag for the news item (News or Media).",
      init(field) {
        field.options = ["News", "Media"];
      },
    },
    "draft: checkbox",
    {
      name: "date",
      type: "date",
      label: "Date",
      description: "Date of the news item.",
      attributes: {
        required: true,
      },
    },
    {
      name: "img",
      type: "file",
      label: "Featured Image",
      description: "Upload the featured image for the news post (defaults to the logo). You can also opt to remove the image.",
      attributes: {
        accept: "image/*",
        required: false,
        default: "media/logo.png",
      },
    },
    "content: markdown",
  ],
);

cms.document({
  name: "Top Page",
  description: "Edit the content of the top Japanese page",
  store: "index.vto",
  fields: [
    "title: text",
    "description: text",
    {
      name: "priority",
      type: "number",
      label: "Priority for sitemap",
      description: "1 is highest priority, 0 is lowest priority, and you can set decimal numbers in between like 0.9.",
      attributes: {
        required: false,
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    "content: markdown",
  ]
});

cms.document({
  name: "About Page",
  description: "Edit the content of the top English page",
  store: "en/index.vto",
  fields: [
    "title: text",
    "description: text",
    {
      name: "priority",
      type: "number",
      label: "Priority for sitemap",
      description: "1 is highest priority, 0 is lowest priority, and you can set decimal numbers in between like 0.9.",
      attributes: {
        required: false,
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
    "content: markdown",
  ]
});

cms.document({
  name: "ld-person",
  description: "Edit the content of the ld-person script for the person, which will appear in the head of the about page",
  store: "_includes/templates/ld-person.vto",
  fields: [
    "content: markdown",
  ]
})

export default cms;