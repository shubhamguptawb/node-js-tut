const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;

  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElement = btn.closest("article");

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      console.log(result);
    })
    .then((data) => {
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};
