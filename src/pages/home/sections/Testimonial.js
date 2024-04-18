import PrimaryHeading from "@/__webComponents/headings/PrimaryHeading"
import { Box, Typography, colors } from "@mui/material";
import styles from "./HomeSections.module.css"
import Marquee from "react-fast-marquee";
import Image from "next/image";

import Arthur from "@/__webAssets/webp/testimonials/lifescript-customer-review-arthur-thompson.webp"
import Carlos from "@/__webAssets/webp/testimonials/lifescript-customer-review-carlos-martinez.webp"
import Derek from "@/__webAssets/webp/testimonials/lifescript-customer-review-derek-lee.webp"
import Eleanor from "@/__webAssets/webp/testimonials/lifescript-customer-review-eleanor-rodriguez.webp"
import George from "@/__webAssets/webp/testimonials/lifescript-customer-review-george-watkins.webp"
import Lilly from "@/__webAssets/webp/testimonials/lifescript-customer-review-lilly-thompson.webp"
import Linda from "@/__webAssets/webp/testimonials/lifescript-customer-review-linda-morris.webp"
import Margaret from "@/__webAssets/webp/testimonials/lifescript-customer-review-margaret-campbell.webp"
import Rachel from "@/__webAssets/webp/testimonials/lifescript-customer-review-rachel-nguyen.webp"
import Pin from "@/__webAssets/svgs/location-pin.svg"
import { pink } from "@mui/material/colors";

const Testimonial = () => {
  const Client = [
    {
      profile: Arthur,
      name: "Arthur Thompson, ",
      age: "67",
      location: "US",
      details: "Compiling my life stories in chronological order offered me a unique perspective on my journey. The insightful questions and the option to add my own made the experience very personal. It’s been a fascinating trip down memory lane and most importantly made me re-connect with my daughters on topics never discussed before."
    },
    {
      profile: Eleanor,
      name: "Eleanor Rodriguez, ",
      age: "79",
      location: "US",
      details: "It took me about 4 months to complete this wonderful gift from my granddaughter. I'm 84 years old and I relived my life during this project. I decided not to share with my extended family about this until I gifted each of them a book. They have now also received a copy and their reactions are heartwarming!"
    },
    {
      profile: Margaret,
      name: "Margaret Campbell,",
      age: "78",
      location: "US",
      details: "Received LifeScript as a gift from my grandkids. Delving into my past, sharing stories, and connecting dots I hadn't in years was enlightening. As I'm 86, I hope this book lets future generations say, 'Wow, I wish I'd known her!' It's a bridge to me for them, and that's priceless."
    },
    {
      profile: George,
      name: "George Watkins, ",
      age: "80",
      location: "UK",
      details: "Reflecting on my life was a humbling experience. I never imagined I had a story worth sharing. Family means the world to me, and with so much of our family history fading away, my story together with the family tree could serve as information for my grandkids and their kids."
    },
    {
      profile: Linda,
      name: "Linda Morris, ",
      age: "65",
      location: "AU",
      details: "Starting this project, I really didn't know much about writing but the how-to videos made everything so much simpler. Anytime I got stuck, the support team helped me out with so much patience and kindness. They really helped me through it. The book turned out great and feels high quality. I've even told my sister to try it!"
    },
    {
      profile: Derek,
      name: "Derek Lee, ",
      age: "61",
      location: "CA",
      details: "This was a really interesting experience. I liked that my normal answers were transformed into professional written text. I don’t have writing experience so narrative fusion and the auto grammar check really helped me get this done. Overall, I enjoyed the experience"
    },
    {
      profile: Lilly,
      name: "Samantha Jones, ",
      age: "53",
      location: "US",
      details: "I loved picking out the font size and style for my book – it made it feel so personal. And the whole idea? Genius. Hats off to the people behind this. They've made sharing my story not just easy, but really special."
    },
    {
      profile: Carlos,
      name: "Carlos Martinez, ",
      age: "70",
      location: "US",
      details: "I was worried it would take forever, but I finished in just 2 months without hurrying. Adding photos was simple, and they turned out even better in print. P.S. The paper in the printed version feels really good. Thanks!"
    },
    {
      profile: Rachel,
      name: "Rachel Nguyen, ",
      age: "47",
      location: "US",
      details: "First time writing and this was fun! Most of the questions felt adequate and provoked some nice memories, glad that I could pen them down before I forget them. Hardcover book looks professional!"
    },
  ]

  return (
    <Box sx={{ marginTop: { lg: "120px", sm: "150px", xs: "100px" } }}>
      <PrimaryHeading showStyle={false} marked="Testimonials" lineWidth="180px" />
      <Typography sx={{ color: "#495845", margin: { sm: "15px 0 100px", xs: "20px 0 50px" }, textAlign: "center", fontFamily: "Avenir" }}>
        What our customers say
      </Typography>

      <Marquee
        pauseOnHover={true}
      >
        {Client.map((item, index) => <ReviewCard
          key={index}
          profile={item.profile}
          age={item.age}
          name={item.name}
          location={item.location}
          details={item.details}
        />)}
      </Marquee>

    </Box >
  )
}

export default Testimonial

function ReviewCard({ profile, name, location, details, age }) {
  return (
    <Box sx={{
      boxShadow: " 0px 4px 15px 0px rgba(0, 0, 0, 0.10)",
      borderRadius: "4px",
      padding: { md: "25px 32px 35px 40px", sm: "20px 25px 30px", xs: "20px 20px 25px" },
      minWidth: { sm: "380px", xs: "330px" },
      height: { sm: "420px", xs: "390px" },
      bgcolor: "#F4F4F4",
      marginRight: { md: "38px", sm: "25px", xs: "20px" }
    }}>
      <Box sx={{
        paddingBottom: "15px",
        display: 'flex',
        columnGap: "15px",
        alignItems: "center",
        borderBottom: "1px solid #BFC4B5"
      }}>
        <Image
          src={profile}
          alt="image"
          className={styles.clientImg}
        />
        <Box>
          <Typography sx={{ fontSize: { sm: "20px", xs: "18px" }, color: "#E1683B", fontWeight: 800 }}>
            {name} <Typography sx={{ display: "inline", fontSize: "20px", fontWeight: 500 }}>{age}</Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px", columnGap: "4px" }}>
            <Image src={Pin} alt="pin" />
            <Typography sx={{ fontSize: { sm: "20px", xs: "18px" }, marginTop: "4px", lineHeight: "18px", color: "#BFC4B5", fontFamily: "Avenir" }}>
              {location}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography sx={{
        padding: { sm: "20px 20px 0 10px", xs: "10px 0 0 10px" }, lineHeight: "26px", fontSize: "16px", maxWidth: "300px",
        fontFamily: "Avenir"
      }}>
        &quot;{details}&quot;
      </Typography>
    </Box >
  )
}