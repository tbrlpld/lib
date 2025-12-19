import dataclasses
from typing import Iterable

import django.core.paginator
import django.http
import laces.components

from ..url import update_query_string


@dataclasses.dataclass
class ElidedPagination(laces.components.Component):
    template_name = "components/pagination/pagination.html"

    previous: "PaginationPrevious"
    items: "Iterable[PaginationLink | PaginationEllipsis]"
    next_: "PaginationNext"

    @classmethod
    def from_page(
        cls, page: django.core.paginator.Page, request: django.http.HttpRequest
    ) -> "ElidedPagination":
        items = []
        # Changing the number of pages in each section needs to be checked against the design.
        # There is not that much room. If more pages should be displayed for selection, we need
        # to hide the items at larger container sizes.
        page_range = page.paginator.get_elided_page_range(
            page.number,
            on_each_side=2,
            on_ends=1,
        )
        for item in page_range:
            if item == page.paginator.ELLIPSIS:
                items.append(PaginationEllipsis())
            else:
                items.append(
                    PaginationLink.from_number_current_and_request(
                        number=item,
                        current=page,
                        request=request,
                    )
                )

        previous = PaginationPrevious.from_current_and_request(
            current=page, request=request
        )
        next_ = PaginationNext.from_current_and_request(current=page, request=request)

        return cls(
            previous=previous,
            items=items,
            next_=next_,
        )

    def get_context_data(
        self,
        parent_context: None = None,
    ) -> dict:
        return {
            "previous": self.previous,
            "items": self.items,
            "next": self.next_,
        }


@dataclasses.dataclass
class PaginationLink(laces.components.Component):
    template_name = "components/pagination/pagination_link.html"

    href: str
    text: str
    is_current: bool

    @classmethod
    def from_number_current_and_request(
        cls,
        number: int | str,
        current: django.core.paginator.Page,
        request: django.http.HttpRequest,
    ) -> "PaginationLink":
        page_url = update_query_string(
            url=request.get_full_path(),
            params={"page": number},
        )
        is_current = current.number == int(number)
        return cls(
            text=str(number),
            href=page_url,
            is_current=is_current,
        )

    def get_context_data(
        self,
        parent_context: None = None,
    ) -> dict:
        return {
            "href": self.href,
            "text": self.text,
            "is_current": self.is_current,
        }


@dataclasses.dataclass
class PaginationEllipsis(laces.components.Component):
    template_name = "components/pagination/pagination_ellipsis.html"


@dataclasses.dataclass
class _PaginationArrow(laces.components.Component):
    href: str

    def get_context_data(self, parent_context: None = None) -> dict:
        return {"href": self.href}


class PaginationPrevious(_PaginationArrow):
    template_name = "components/pagination/pagination_prev.html"

    @classmethod
    def from_current_and_request(
        cls,
        current: django.core.paginator.Page,
        request: django.http.HttpRequest,
    ) -> "PaginationPrevious":
        return cls(
            href=(
                update_query_string(
                    url=request.get_full_path(),
                    params={"page": current.previous_page_number()},
                )
                if current.has_previous()
                else ""
            ),
        )


class PaginationNext(_PaginationArrow):
    template_name = "components/pagination/pagination_next.html"

    @classmethod
    def from_current_and_request(
        cls,
        current: django.core.paginator.Page,
        request: django.http.HttpRequest,
    ) -> "PaginationNext":
        return cls(
            href=(
                update_query_string(
                    url=request.get_full_path(),
                    params={"page": current.next_page_number()},
                )
                if current.has_next()
                else ""
            ),
        )
