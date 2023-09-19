import { useRouter } from "next/router";

const MyProduct = () => {
    const router = useRouter();
  return (
    <div>MyProduct {router.query.productId}</div>
  )
}

export default MyProduct;