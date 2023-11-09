const useHandleDeletePost = async (e) => {
  try {
    e.preventDefault();
    if (!window.confirm("Are you sure to delete this post?")) return;

    const res = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.error) {
      showToast("Error", data.error, "error");
      return;
    }
    showToast("Success", "Post.deleted", "success");
  } catch (error) {
    showToast("Error", error.message, "error");
  }
};

export default useHandleDeletePost;
