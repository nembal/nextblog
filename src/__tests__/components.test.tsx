import React from 'react';
import { NextBlog, NextBlogTag, NextBlogPost } from '../index';

// Mock the BlogIndex and BlogPost components
jest.mock('../components/BlogIndex', () => ({
  BlogIndex: ({ path, tag }: { path: string; tag?: string }) => (
    <div data-testid="blog-index" data-path={path} data-tag={tag}>
      Mocked BlogIndex
    </div>
  ),
}));

jest.mock('../components/BlogPost', () => ({
  BlogPost: ({ path, slug }: { path: string; slug: string }) => (
    <div data-testid="blog-post" data-path={path} data-slug={slug}>
      Mocked BlogPost
    </div>
  ),
}));

describe('NextBlog Components', () => {
  describe('NextBlog', () => {
    it('renders with default path', () => {
      const component = <NextBlog />;
      expect(component.props.children.type.name).toBe('BlogIndex');
      expect(component.props.children.props.path).toBe('/blog');
    });

    it('renders with custom path', () => {
      const component = <NextBlog path="/custom-blog" />;
      expect(component.props.children.type.name).toBe('BlogIndex');
      expect(component.props.children.props.path).toBe('/custom-blog');
    });
  });

  describe('NextBlogTag', () => {
    it('renders with tag and default path', () => {
      const component = <NextBlogTag tag="javascript" />;
      expect(component.props.children.type.name).toBe('BlogIndex');
      expect(component.props.children.props.path).toBe('/blog');
      expect(component.props.children.props.tag).toBe('javascript');
    });

    it('renders with tag and custom path', () => {
      const component = <NextBlogTag path="/custom-blog" tag="javascript" />;
      expect(component.props.children.type.name).toBe('BlogIndex');
      expect(component.props.children.props.path).toBe('/custom-blog');
      expect(component.props.children.props.tag).toBe('javascript');
    });
  });

  describe('NextBlogPost', () => {
    it('renders with slug and default path', () => {
      const component = <NextBlogPost slug="hello-world" />;
      expect(component.props.children.type.name).toBe('BlogPost');
      expect(component.props.children.props.path).toBe('/blog');
      expect(component.props.children.props.slug).toBe('hello-world');
    });

    it('renders with slug and custom path', () => {
      const component = <NextBlogPost path="/custom-blog" slug="hello-world" />;
      expect(component.props.children.type.name).toBe('BlogPost');
      expect(component.props.children.props.path).toBe('/custom-blog');
      expect(component.props.children.props.slug).toBe('hello-world');
    });
  });
}); 