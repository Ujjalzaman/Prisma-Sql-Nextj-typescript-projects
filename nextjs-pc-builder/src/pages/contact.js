import HomePageLayOut from "@/components/Layout/HomePageLayOut";

const contact = () => {
  return (
    <div>contact</div>
  )
}

export default contact;

contact.getLayout = function getLayout(page){
  return (
      <HomePageLayOut>
          {page}
      </HomePageLayOut>
  )
}