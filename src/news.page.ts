export const layout = "layouts/news_list.vto";

export const ja = {
  title: "News & Media",
  description:
    "社内ニュースページや外部ニュースへのリンクを含む、ジャパン・アクティベーション・キャピタル ニュース 一覧",
};

export const en = {
  title: "News & Media",
  description:
    "Japan Activation Capital News List with internal news pages and links to external news pages.",
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
      size: 5, // Default paginator size is 10
    });

    for (const page of result) {
      yield page;
    }
  }
}
