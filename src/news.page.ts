export const layout = "layouts/news_list.vto";

export const ja = {
  title: "News & Media",
  description:
    "当ページは社内ニュースページや外部ニュースへのリンクを含む、ジャパン・アクティベーション・キャピタル ニュース 一覧で、カテゴリに分かれており、クリックすると記事全文を表示したり、外部リンクに移動することができます。",
};

export const en = {
  title: "News & Media",
  description:
    "The news page shows a list of Japan Activation Capital news with internal news pages and links to external news pages, broken up into categories, which can be clicked on to view the full article or jump to an external link.",
};

export default function* ({ search, paginate }: Lume.Data) {
  for (const lang of ["ja", "en"]) {
    const news = search.pages(`type=news lang=${lang}`, "date=desc");
    const result = paginate(news, {
      url(n: number) {
        if (n === 1) {
          return lang === "ja" ? "/news/" : `/${lang}/news/`;
        }
        return lang === "ja" ? `/news/${n}/` : `/${lang}/news/${n}/`;
      },
      each(data, n: number) {
        data.id = `news_list_${n}`;
        data.lang = lang;
      },
      size: 10, // Default paginator size is 10
    });

    for (const page of result) {
      yield page;
    }
  }
}
