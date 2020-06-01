import React, { PureComponent, ReactElement } from "react";
import { formatDate, getWPCategoryColor } from "services/string";
import Link from "next/link";
import { WPPost, getCategories, getFeaturedImageUrl } from "services/dataModels";
import "./styles.scss";

const CLASS_NAME = "PostCardView";

interface PostCardViewProps {
  post: WPPost;
}

class PostCardView extends PureComponent<PostCardViewProps> {
  render(): ReactElement {
    const { post } = this.props;
    const category = getCategories(post);

    return (
      <div className={CLASS_NAME}>
        <Link
          as={`/post/${post.slug}`}
          href={`/post?slug=${post.slug}&apiRoute=post`}
        >
          <a className={`${CLASS_NAME}__link`} />
        </Link>

        {getFeaturedImageUrl(post) && (
          <div className={`${CLASS_NAME}__image-container`}>
            <img
              className={`${CLASS_NAME}__image`}
              alt={post.title.rendered}
              src={getFeaturedImageUrl(post)}
            />
          </div>
        )}
        <div className={`${CLASS_NAME}__text-container`}>
          <div className={`${CLASS_NAME}__category`} style={{ color: getWPCategoryColor(category[0].id) }}>
            {category[0].name}
          </div>
          <div className={`${CLASS_NAME}__title`}>{post.title.rendered}</div>
          <div className={`${CLASS_NAME}__date`}>{formatDate(post.date_gmt)}</div>
        </div>
      </div>
    );
  }
}

export default PostCardView;