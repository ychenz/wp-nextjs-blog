import React, { PureComponent, ReactElement } from "react";
import { formatDate, getWPCategoryColor } from "services/string";
import Link from "next/link";
import "./styles.scss";

const CLASS_NAME = "PostCardView";

interface WPMedia {
  source_url: string;
}

interface WPCategory {
  id: number;
  name: string;
  slug: string; // category used in url
}

interface WPPost {
  title: {
    rendered: string;
  },
  modified_gmt: string; // e.g: "2019-11-20T18:24:13"
  date_gmt: string; // date created
  slug: string; // post name in link
  _embedded: {
    "wp:featuredmedia": WPMedia[];
    "wp:term": WPCategory[];
  },
  content: {
    rendered: HTMLElement;
  }
}

interface PostCardViewProps {
  post: WPPost;
}

class PostCardView extends PureComponent<PostCardViewProps> {
  static getFeaturedImage(post: Partial<WPPost>): string | null {
    return (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0] &&
      post._embedded["wp:featuredmedia"][0].source_url
    ) ? post._embedded["wp:featuredmedia"][0].source_url : null;
  }

  static getCategory(post: Partial<WPPost>): Partial<WPCategory> {
    return (
      post._embedded &&
      post._embedded["wp:term"] &&
      post._embedded["wp:term"][0] &&
      post._embedded["wp:term"][0][0]
    ) ? post._embedded["wp:term"][0][0] : null;
  }

  render(): ReactElement {
    const { post } = this.props;
    const category = PostCardView.getCategory(post);
    console.log(category);

    return (
      <div className={CLASS_NAME}>
        <Link
          as={`/post/${post.slug}`}
          href={`/post?slug=${post.slug}&apiRoute=post`}
        >
          <a className={`${CLASS_NAME}__link`} />
        </Link>

        <div className={`${CLASS_NAME}__image-container`}>
          <img
            className={`${CLASS_NAME}__image`}
            alt={post.title.rendered}
            src={PostCardView.getFeaturedImage(post)}
          />
        </div>
        <div className={`${CLASS_NAME}__text-container`}>
          <div className={`${CLASS_NAME}__category`} style={{ color: getWPCategoryColor(category.id) }}>
            {category.name}
          </div>
          <div className={`${CLASS_NAME}__title`}>{post.title.rendered}</div>
          <div className={`${CLASS_NAME}__date`}>{formatDate(post.modified_gmt)}</div>
        </div>
      </div>
    );
  }
}

export default PostCardView;