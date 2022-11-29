import React, { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { SlideCard } from "@components";
import { TRecipe } from "@types";

const HeroSlider = ({ recipes }: { recipes: TRecipe[] }): ReactElement => {
    return (
        <Swiper navigation={true} modules={[Navigation]}>
            {recipes.map((recipe) => (
                <SwiperSlide key={recipe.id}>
                    <SlideCard {...recipe} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroSlider;
