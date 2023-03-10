import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Navbar } from '../../components';
import WaveBackground from "../../public/img/wave-lg.png";


import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components/BlogComponents';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (

    <div className='relative'>
      <Image
          src={WaveBackground}
          width='1000'
          height='1000'
          className='fixed z-0 w-[100vw] h-[100vh]'
          quality={100}
      />

      <div className="container relative mx-auto px-10 mb-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
        <Navbar/>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}