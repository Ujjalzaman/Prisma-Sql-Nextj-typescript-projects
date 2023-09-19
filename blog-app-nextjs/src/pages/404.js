import { useRouter } from "next/router";

const CustomNotFoundPage = () => {
  const router = useRouter();

  setTimeout(() => {
    router.push('/')
  }, 500);
  return (
    <div>
        <img src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="404"/>
    </div>
  )
}
export default CustomNotFoundPage;