
import Link from 'next/link';
import { occasion } from "@/lib/constants/data";
import OccasionCard from "@/components/features/OccasionCard";
import OccasionsSlider from "@/components/features/OccasionsSlider";

const HeroSection = () => {

    return (
        <section className="grid grid-cols-7 gap-x-6">
            {/* shop now card */}
            <div className="col-span-2">
                <OccasionCard occasion={occasion} height={440}>
                    <Link href="/products">
                        {/* shop now button */}
                        <button className='bg-maroon-50 rounded-md p-2 text-maroon-600 mt-2'>
                            Shop Now
                        </button>
                    </Link>
                </OccasionCard>
            </div>
            {/* slider */}
            <div className="col-span-5">
                <OccasionsSlider />
            </div>
        </section>
    )
}

export default HeroSection
