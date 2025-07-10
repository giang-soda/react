import { EditorContent } from "~/components/common/ckeditor/EditorContent";
import type { PostData } from "~/models";

export function PostDetail({ post }: { post: PostData }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="w-full max-h-400 object-cover" />}
        <h1 className="text-2xl font-bold tracking-tight">{post.title}</h1>
      </div>

      <div className="flex flex-col gap-2">
        <EditorContent content={post.content} />
      </div>
    </div>
  );
}
