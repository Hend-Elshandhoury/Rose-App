import { IBenefitsSection, IOccasionsSection } from "../types";
import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';

export const benefitsData: IBenefitsSection[] = [
    {
        title: "Free Delivery",
        description: "For orders above 120 EGP",
        icon: <Truck size={40} />,
    },
    {
        title: "Get Refund",
        description: "Refunds within 30 days",
        icon: <RefreshCw size={40} />,
    },
    {
        title: "Safe Payment",
        description: "100% Secure Payment",
        icon: <ShieldCheck size={40} />,
    },
    {
        title: "24/7 Support",
        description: "Contact us at any time",
        icon: <Headset size={40} />,
    }
];

export const occasionsData: IOccasionsSection[] = [
    {
        image: "/assets/images/image9.png",
        badge: "Wedding",
        title: "Celebrate Her Forever with a Gift She’ll Always Remember",
    },
    {
        image: "/assets/images/image7.png",
        badge: "Engagement",
        title: "Honor the Beginning of a Beautiful Journey Together",
    },
    {
        image: "/assets/images/image13.png",
        badge: "Anniversary",
        title: "Mark Every Year of Love with a Meaningful Surprise",
    },
];

export const occasionsSliderData: IOccasionsSection[] = [
    {
        image: "/assets/images/image2.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image10.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image7.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image13.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
];

export const occasion = {
    image: "/assets/images/image4.png",
    badge: "Staring from 10.99 EGP",
    title: "Special Gifts For The People You Love"
};