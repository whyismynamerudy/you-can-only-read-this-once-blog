import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        You Can Only Read This Once.
      </h1>
      <p className="mb-4 text-justify">
        {`Welcome to a unique blogging experience where every read is a singular journey.
        My philosophy is simple: each post is meant to be absorbed fully in one sitting. 
        I hope that by limiting access to a single read, you'll approach each article with heightened focus, 
        taking the most value from its content. This approach challenges the norm of 
        endless scrolling and rereading, instead promoting a more mindful and impactful 
        reading experience. I kindly ask my readers to respect this concept by refraining 
        from taking screenshots or copying text, and preserving the intended experience for 
        all. Dive in, absorb, and carry forward what resonates with you – because here, 
        every read is truly once-in-a-lifetime.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
