import { occasionsData } from '@/lib/constants/data'
import OccasionCard from '@/components/features/OccasionCard'

const OccasionsSection = () => {

    return (
        <section className='flex space-x-6'>
            {/* occasions */}
            {occasionsData.map((occasion, index) => (
                // occasion card
                <OccasionCard key={index} occasion={occasion} height={270} />
            ))}
        </section>
    )
}

export default OccasionsSection;
