import url from 'url'

export const app_with_urls = () => {
    const raw_url = 'https://www.test.com/stuff/index.html?year=2020&month=march';

    const u = url.parse(raw_url, true)

    console.log(u, u.query, u.query.year)
}