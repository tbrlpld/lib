import factory
from factory.base import T
from wagtail.models import Page


class PageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Page

    title = factory.Faker("words", nb=3)

    @classmethod
    def create(cls, **kwargs) -> T:
        try:
            parent = kwargs.pop("parent")
        except KeyError as error:
            raise AttributeError("`parent` argument needs to be defined for page factory.") from error

        if not isinstance(parent, Page):
            raise TypeError("`parent` needs to be a Page.")

        instance = super().build(**kwargs)

        parent.add_child(instance=instance)

        return instance
