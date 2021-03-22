import Container from '../components/container'
import Link from 'next/link'

export default function Bucket({id, icon, title, text, linkTarget, linkLabel}) {
    return (
        <div key={id} className="w-full px-4 mb-24 text-center md:w-1/3 bucket">
            
            <div className="relative flex items-center justify-center">
                <img className="absolute z-0" src="bucket-icon-bg.svg" alt="" />
                <img className="relative h-16" src={`icons/icon-${icon}.svg`} alt="" />
            </div>

            <div className="relative z-10 mt-20 lg:px-8 xl:px-20 ">
                <p className="text-lg tracking-widest uppercase">{title}</p>
                <p className="my-3 opacity-75">{text}</p>
                <Link href={`/${encodeURIComponent(linkTarget)}`}>
                    <a className="inline-flex items-center justify-center text-lg tracking-widest uppercase text-green-light">
                        {linkLabel}
                        <img className="w-4 ml-2 text-green" src="icons/icon-arrow-right.svg" alt={linkLabel} />
                    </a>
                </Link>
            </div>

        </div>
    )
}