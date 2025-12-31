import { motion } from 'framer-motion'
import { Link } from '@/i18n/routingConfig'
import MagneticButton from '@/components/ui/magnetic-button'
import HyperText from '@/components/ui/hyper-text'
import { useTranslations } from 'next-intl'
import { useGamification } from '@/context/GamificationContext'

export default function Hero() {
    const { unlock } = useGamification()
    const t = useTranslations('Hero')
    const title = t('title')

    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-background">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="z-10 text-center flex flex-col items-center">
                <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase text-foreground">
                    {title.split('|').map((line, i) => (
                        <div key={i} className="overflow-hidden flex justify-center">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                <HyperText
                                    text={line}
                                    className="text-[5vw] md:text-[7vw] xl:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase text-foreground"
                                    animateOnLoad={true}
                                    framerProps={{
                                        initial: { opacity: 1, y: 0 },
                                        animate: { opacity: 1, y: 0 },
                                        exit: { opacity: 1, y: 0 },
                                    }}
                                />
                            </motion.div>
                        </div>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-6 text-lg md:text-xl text-muted-foreground uppercase tracking-widest max-w-lg cursor-pointer hover:text-primary transition-colors duration-300"
                    onClick={() => unlock('WHO_AM_I')}
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-10 flex gap-6"
                >
                    <Link href="/work" className="block">
                        <MagneticButton variant="primary">
                            {t('cta_work')}
                        </MagneticButton>
                    </Link>
                    <Link href="/contact" className="block">
                        <MagneticButton variant="secondary">
                            {t('cta_contact')}
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

        </section>
    )
}
