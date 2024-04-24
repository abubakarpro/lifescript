'use client'
import { Box } from "@mui/material";
import styles from "../../../../__webComponents/ComponentsStyles.module.css"
import PrimaryHeading from "../../../../__webComponents/headings/PrimaryHeading";
import GiftPricingCard from "./GiftPricingCard";

const GiftTabPanel = ({onClick,selectedTab}) => {
  const pricingCard = [
    {
      id: "basic",
      category: "Basic",
      price: "$139",
      card: "1"
    },
    {
      id: "standard",
      category: "Standard",
      price: "$179",
      card: "2"
    },
    {
      id: "primium",
      category: "Premium",
      price: "$239",
      card: "3"
    },
  ]
  function handleHover(id) {

  }

  return (
    <Box sx={{
    //   margin: { lg: '170px 95px  130px', sm: "150px 30px", xs: "80px 20px 100px" },
    }}>
  <Box>
          <PrimaryHeading heading="Choose a Subscription Plan" showStyle={undefined} color={undefined} lineHeight={undefined} lineWidth={undefined} marked={undefined} />

          <Box
            sx={{
              marginTop: { xs: "15px" },
              fontSize: { sm: "15px", xs: "16px" },
              width: { sm: "60%", xs: "90%" },
              fontFamily: "Avenir",
              marginLeft: "150px",
            }}
          >
            Each package comes with a one-year LifeScript subscription, a
            premium full-color hardcover book, and free shipping.
          </Box>
        </Box>
      <Box sx={{ display: "flex", flexDirection: { md: "row", sm: "column", xs: "column" }, alignItems: "center", columnGap: "17px", rowGap: "50px", justifyContent: "center" }} className={styles.cardsMain} 
      onClick={() => onClick(selectedTab + 1 )}
      >
        {pricingCard.map((item) => <GiftPricingCard
          key={item.id}
          category={item.category}
          price={item.price}
          card={item.card}
          id={item.id}
          handleHover={handleHover}
        />)}
      </Box>
    </Box >
  )
}

export default GiftTabPanel;