import bs4
import django.http
import django.test

class BaseTestCase(django.test.TestCase):
    def make_soup(self, response: django.http.HttpResponse) -> bs4.BeautifulSoup:
        return bs4.BeautifulSoup(response.content, "html.parser")

    def assertFoundInHTML(
        self,
        response: django.http.HttpResponse,
        name: str | None = None,
        attrs: dict[str, str] | None = None,
        text: str | None = None,
        count: int = 1,
    ) -> None:
        soup = self.make_soup(response=response)
        result = soup.find_all(name=name, attrs=attrs, text=text)
        found_count = len(result)
        if found_count == 0 and count != 0:
            self.fail(f"Element not found in HTML. {name=}, {attrs=}, {text=}")
        if found_count != count:
            self.fail(
                f"Wrong number of elements found. Expected {count}, found {found_count}. "
                f"{name=}, {attrs=}, {text=}",
            )

    def assertTextOnPage(
        self,
        response: django.http.HttpResponse,
        text: str,
    ) -> None:
        """
        Checks if the given text is contained on the page.

        Only considers the displayed text. It ignores all markup and line breaks.
        """
        soup = self.make_soup(response=response)
        page_text = soup.get_text(" ", strip=True)
        self.assertIn(member=text, container=page_text)
