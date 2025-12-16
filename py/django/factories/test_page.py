from unittest.mock import patch
from django.test import TestCase
from wagtail.models import Page

from .page import PageFactory



class TestPageFactory(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.root = Page.get_first_root_node()

    def test_build(self):
        page = PageFactory.build()

        self.assertIsNone(page.pk)
        self.assertTrue(page.title)

    def test_create_wo_parent(self):
        with self.assertRaises(AttributeError):
            PageFactory.create()

    def test_create_with_parent(self):
        page = PageFactory.create(parent=self.root)

        self.assertIsNotNone(page.pk)
        self.assertTrue(page.title)
        self.assertEqual(page.get_parent(), self.root)
        self.assertIn( page, self.root.get_children())

    def test_call(self):
        with patch('django_website.lib.factories.PageFactory.create') as mock_create:
            PageFactory(parent=self.root)

            mock_create.assert_called_once_with(parent=self.root)

